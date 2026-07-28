/* =====================================================================
   booking.js — motore di prenotazione SIMULATO in 5 passaggi.
   Nessun pagamento reale. Tutta la logica di prezzo è dimostrativa
   e commentata. Per la produzione va sostituita dal booking engine /
   channel manager reale (vedi README: Octorate, WuBook, Beds24, ...).
   ===================================================================== */
(function () {
  "use strict";
  var A = (window.MR && window.MR.accommodations) || [];

  /* ---------- Booking bar (homepage / pagine alloggio) ---------- */
  function setupBookingBar() {
    document.querySelectorAll("[data-booking-bar]").forEach(function (form) {
      var ci = form.querySelector('[name="checkin"]');
      var co = form.querySelector('[name="checkout"]');
      var today = new Date().toISOString().split("T")[0];
      if (ci) ci.min = today;
      if (co) co.min = today;
      // ripristina stato salvato
      try {
        var saved = JSON.parse(sessionStorage.getItem("mr_search") || "{}");
        Object.keys(saved).forEach(function (k) {
          var el = form.querySelector('[name="' + k + '"]'); if (el) el.value = saved[k];
        });
      } catch (e) {}
      if (ci && co) ci.addEventListener("change", function () {
        // checkout deve essere successivo al checkin
        var next = new Date(ci.value); next.setDate(next.getDate() + 1);
        co.min = next.toISOString().split("T")[0];
        if (co.value && co.value <= ci.value) co.value = co.min;
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        sessionStorage.setItem("mr_search", JSON.stringify(data));
        window.trackEvent("stay_search", data);
        var q = Object.keys(data).map(function (k) { return k + "=" + encodeURIComponent(data[k]); }).join("&");
        var root = (document.body.getAttribute("data-root")) || "";
        location.href = root + "prenota.html?" + q;
      });
    });
  }

  /* =====================================================================
     LOGICA PREZZO DIMOSTRATIVA
     - weekend (ven/sab) +20%
     - alta stagione (giugno–settembre) +30%
     - sconto soggiorni lunghi: 7+ notti -10%
     - alcune unità non disponibili in date predefinite (unavailable[])
     - bambini/animali secondo regole dichiarate nell'alloggio
     ===================================================================== */
  function nightsBetween(a, b) {
    var d1 = new Date(a), d2 = new Date(b);
    return Math.max(0, Math.round((d2 - d1) / 86400000));
  }
  function isHighSeason(dateStr) {
    var m = new Date(dateStr).getMonth(); // 0-11
    return m >= 5 && m <= 8; // giu-set
  }
  function isWeekend(dateStr) {
    var d = new Date(dateStr).getDay(); // 0 dom .. 6 sab
    return d === 5 || d === 6;
  }
  function priceForStay(acc, checkin, nights) {
    var total = 0, cursor = new Date(checkin);
    for (var i = 0; i < nights; i++) {
      var ds = cursor.toISOString().split("T")[0];
      var p = acc.priceFrom;
      if (isWeekend(ds)) p *= 1.2;
      if (isHighSeason(ds)) p *= 1.3;
      total += p;
      cursor.setDate(cursor.getDate() + 1);
    }
    if (nights >= 7) total *= 0.9; // sconto soggiorni lunghi
    return Math.round(total);
  }
  function isAvailable(acc, checkin, nights) {
    if (!acc.unavailable || !acc.unavailable.length) return true;
    var cursor = new Date(checkin);
    for (var i = 0; i < nights; i++) {
      var ds = cursor.toISOString().split("T")[0];
      if (acc.unavailable.indexOf(ds) !== -1) return false;
      cursor.setDate(cursor.getDate() + 1);
    }
    return true;
  }

  /* ---------- Stepper generico ---------- */
  function BookingEngine(rootEl) {
    var steps = Array.prototype.slice.call(rootEl.querySelectorAll(".step-panel"));
    var stepItems = Array.prototype.slice.call(rootEl.querySelectorAll(".stepper li"));
    var current = 0;
    var state = { search: {}, acc: null, meal: "colazione", extras: [], nights: 0 };

    // prefiltra da querystring / sessione
    var params = new URLSearchParams(location.search);
    ["checkin","checkout","adulti","bambini","animali"].forEach(function (k) {
      if (params.get(k)) state.search[k] = params.get(k);
    });
    try {
      var saved = JSON.parse(sessionStorage.getItem("mr_search") || "{}");
      Object.keys(saved).forEach(function (k) { if (!state.search[k]) state.search[k] = saved[k]; });
    } catch (e) {}

    function show(i) {
      current = i;
      steps.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
      stepItems.forEach(function (li, idx) {
        li.classList.toggle("done", idx < i);
        if (idx === i) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
      });
      rootEl.scrollIntoView({ behavior: "smooth", block: "start" });
      window.trackEvent("booking_step", { step: i + 1 });
    }

    // Step 1: date & ospiti
    var f1 = rootEl.querySelector("[data-step1]");
    if (f1) {
      var today = new Date().toISOString().split("T")[0];
      ["checkin","checkout"].forEach(function (n) { var el = f1.querySelector('[name="'+n+'"]'); if (el) el.min = today; });
      Object.keys(state.search).forEach(function (k) {
        var el = f1.querySelector('[name="' + k + '"]'); if (el) el.value = state.search[k];
      });
      f1.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = {}; new FormData(f1).forEach(function (v, k) { d[k] = v; });
        if (!d.checkin || !d.checkout || nightsBetween(d.checkin, d.checkout) < 1) {
          setStatus(f1, "Inserisci date valide: il check-out deve essere successivo al check-in."); return;
        }
        state.search = d; state.nights = nightsBetween(d.checkin, d.checkout);
        renderAccommodations();
        show(1);
      });
    }

    // Step 2: alloggio
    function renderAccommodations() {
      var list = rootEl.querySelector("[data-step2-list]");
      var nights = state.nights;
      var adults = parseInt(state.search.adulti || 2, 10);
      var kids = parseInt(state.search.bambini || 0, 10);
      var pets = (state.search.animali === "si" || state.search.animali === "1");
      var need = adults + kids;
      list.innerHTML = A.map(function (a) {
        var avail = isAvailable(a, state.search.checkin, nights);
        var fits = a.guests >= need;
        var petOk = !pets || a.allowsPet;
        var kidOk = kids === 0 || a.allowsChild;
        var minOk = nights >= a.minNights;
        var ok = avail && fits && petOk && kidOk && minOk;
        var price = priceForStay(a, state.search.checkin, nights);
        var reason = !fits ? "Capienza insufficiente" : !avail ? "Non disponibile nelle date scelte" :
          !petOk ? "Animali non ammessi" : !kidOk ? "Non adatta a bambini" :
          !minOk ? ("Minimo " + a.minNights + " notti") : "";
        return '<label class="option' + (ok ? "" : " is-unavailable") + '">' +
          '<input type="radio" name="acc" value="' + a.slug + '"' + (ok ? "" : " disabled") + '>' +
          '<span><span class="opt-title">' + a.name + '</span>' +
            '<span class="opt-meta">' + a.type + ' · ' + a.guests + ' ospiti · ' + a.size + ' m²' +
            (reason ? ' · <b style="color:var(--red-earth)">' + reason + '</b>' : '') + '</span></span>' +
          '<span class="opt-price">' + (ok ? "€" + price : "—") + '<small>' + nights + ' notti</small></span>' +
        '</label>';
      }).join("");
      list.querySelectorAll('input[name="acc"]').forEach(function (r) {
        r.addEventListener("change", function () {
          list.querySelectorAll(".option").forEach(function (o) { o.classList.remove("is-selected"); });
          r.closest(".option").classList.add("is-selected");
          state.acc = A.filter(function (x) { return x.slug === r.value; })[0];
          state.accPrice = priceForStay(state.acc, state.search.checkin, nights);
          window.trackEvent("accommodation_select", { slug: r.value });
        });
      });
    }
    bindNav(rootEl, "[data-step2-next]", function () {
      if (!state.acc) { setStatus(rootEl.querySelector("[data-step2]"), "Seleziona un alloggio disponibile per continuare."); return; }
      show(2);
    });
    bindNav(rootEl, "[data-step2-back]", function () { show(0); });

    // Step 3: pasti
    rootEl.querySelectorAll("[data-meal]").forEach(function (el) {
      el.addEventListener("click", function () {
        rootEl.querySelectorAll("[data-meal]").forEach(function (m) { m.classList.remove("is-selected"); });
        el.classList.add("is-selected");
        state.meal = el.getAttribute("data-meal");
        state.mealPrice = parseInt(el.getAttribute("data-price") || 0, 10);
      });
    });
    bindNav(rootEl, "[data-step3-next]", function () { show(3); });
    bindNav(rootEl, "[data-step3-back]", function () { show(1); });

    // Step 4: esperienze / extra
    rootEl.querySelectorAll("[data-extra]").forEach(function (el) {
      el.addEventListener("click", function () {
        el.classList.toggle("is-selected");
        var name = el.getAttribute("data-extra"), price = parseInt(el.getAttribute("data-price") || 0, 10);
        var idx = state.extras.findIndex(function (x) { return x.name === name; });
        if (idx === -1) state.extras.push({ name: name, price: price });
        else state.extras.splice(idx, 1);
      });
    });
    bindNav(rootEl, "[data-step4-next]", function () { renderSummary(); show(4); });
    bindNav(rootEl, "[data-step4-back]", function () { show(2); });

    // Step 5: riepilogo
    function renderSummary() {
      var nights = state.nights;
      var mealTotal = (state.mealPrice || 0) * nights;
      var extrasTotal = state.extras.reduce(function (n, e) { return n + e.price; }, 0);
      var taxes = Math.round((state.accPrice || 0) * 0.05); // placeholder imposta soggiorno
      var total = (state.accPrice || 0) + mealTotal + extrasTotal + taxes;
      var deposit = Math.round(total * 0.3);
      var lines = [
        ["Soggiorno · " + state.acc.name + " (" + nights + " notti)", "€" + state.accPrice],
        ["Piano pasti · " + labelMeal(state.meal), mealTotal ? "€" + mealTotal : "incluso/–"]
      ];
      state.extras.forEach(function (e) { lines.push(["Extra · " + e.name, "€" + e.price]); });
      lines.push(["Imposta di soggiorno (placeholder)", "€" + taxes]);
      var html = lines.map(function (l) { return '<li><span>' + l[0] + '</span><span>' + l[1] + '</span></li>'; }).join("");
      html += '<li class="total"><span>Totale stimato</span><span>€' + total + '</span></li>';
      html += '<li class="muted"><span>Caparra demo (30%)</span><span>€' + deposit + '</span></li>';
      rootEl.querySelector("[data-summary-lines]").innerHTML = html;
    }
    bindNav(rootEl, "[data-step5-back]", function () { show(3); });
    var finalForm = rootEl.querySelector("[data-step5-form]");
    if (finalForm) finalForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = rootEl.querySelector("[data-final-status]");
      s.className = "form-status ok"; s.setAttribute("role", "status");
      s.textContent = "Questa è una demo. Nessun pagamento è stato effettuato e nessuna richiesta è stata inviata.";
      window.trackEvent("booking_demo_complete", { acc: state.acc && state.acc.slug, nights: state.nights });
    });

    function labelMeal(k) {
      return { colazione: "Colazione inclusa", cena: "Cena una sera", mezza: "Mezza pensione", picnic: "Picnic", nessuno: "Nessun extra" }[k] || k;
    }
    show(0);
  }

  function bindNav(root, sel, fn) { var b = root.querySelector(sel); if (b) b.addEventListener("click", fn); }
  function setStatus(container, msg) {
    if (!container) return;
    var s = container.querySelector(".form-status") || document.createElement("p");
    s.className = "form-status"; s.style.background = "rgba(155,92,67,.12)"; s.style.color = "var(--red-earth)";
    s.setAttribute("role", "alert"); s.textContent = msg;
    if (!container.contains(s)) container.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupBookingBar();
    var engine = document.querySelector("[data-booking-engine]");
    if (engine) new BookingEngine(engine);
  });
})();
