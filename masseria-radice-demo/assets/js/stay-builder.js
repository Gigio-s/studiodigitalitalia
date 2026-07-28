/* =====================================================================
   stay-builder.js — "Componi il soggiorno" multistep accessibile.
   Genera un itinerario dimostrativo a partire dalle scelte dell'utente.
   ===================================================================== */
(function () {
  "use strict";
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var A = (window.MR && window.MR.accommodations) || [];
  var E = (window.MR && window.MR.experiences) || [];
  var S = (window.MR && window.MR.seasons) || {};

  function setup() {
    var root = document.querySelector("[data-stay-builder]");
    if (!root) return;
    var panels = Array.prototype.slice.call(root.querySelectorAll(".step-panel"));
    var items = Array.prototype.slice.call(root.querySelectorAll(".stepper li"));
    var i = 0;
    var state = { who: "coppia", rhythm: [], interests: [], season: "", needs: [] };
    window.trackEvent("stay_builder_start", {});

    function show(n) {
      i = n;
      panels.forEach(function (p, idx) { p.classList.toggle("active", idx === n); });
      items.forEach(function (li, idx) {
        li.classList.toggle("done", idx < n);
        if (idx === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
      });
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // toggle chips (multi)
    root.querySelectorAll("[data-multi]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.getAttribute("data-multi"), val = btn.getAttribute("data-val");
        btn.setAttribute("aria-pressed", btn.getAttribute("aria-pressed") === "true" ? "false" : "true");
        var arr = state[group];
        var idx = arr.indexOf(val);
        if (idx === -1) arr.push(val); else arr.splice(idx, 1);
      });
    });
    // single select (who, season)
    root.querySelectorAll("[data-single]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.getAttribute("data-single");
        root.querySelectorAll('[data-single="' + group + '"]').forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        state[group] = btn.getAttribute("data-val");
      });
    });

    root.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { show(Math.min(i + 1, panels.length - 1)); if (i === panels.length - 1) buildResult(); }); });
    root.querySelectorAll("[data-back]").forEach(function (b) { b.addEventListener("click", function () { show(Math.max(i - 1, 0)); }); });

    function buildResult() {
      var out = root.querySelector("[data-builder-result]");
      // scelta alloggio: famiglia/gruppo -> unità grandi
      var acc;
      if (state.who === "famiglia" || state.who === "gruppo") acc = A.filter(function (a) { return a.guests >= 4; })[0];
      else if (state.interests.indexOf("wellness") !== -1) acc = A.filter(function (a) { return a.slug === "suite-lamia"; })[0];
      else acc = A.filter(function (a) { return a.guests <= 2; })[0];
      acc = acc || A[0];

      // esperienze in base a interessi
      var picks = [];
      var map = { cucina: "corso-cucina", olio: "degustazione-olio", bicicletta: "e-bike", animali: "visita-fattoria", artigianato: "produttori-locali", fotografia: "e-bike", vino: "produttori-locali", wellness: "picnic-ulivi" };
      state.interests.forEach(function (k) { if (map[k] && picks.indexOf(map[k]) === -1) picks.push(map[k]); });
      if (state.who === "famiglia") picks.unshift("esperienza-famiglia");
      if (!picks.length) picks = ["visita-fattoria", "degustazione-olio"];
      picks = picks.slice(0, 2).map(function (s) { return E.filter(function (e) { return e.slug === s; })[0]; }).filter(Boolean);

      var seasonKey = state.season && S[state.season] ? state.season : window.MR.monthToSeason(new Date().getMonth());
      var season = S[seasonKey];

      var expHTML = picks.map(function (e) {
        return '<li><b>' + e.name + '</b> — ' + e.duration + ', da €' + e.priceFrom + ' · <a href="' + ROOT + 'esperienze/' + e.slug + '.html">dettagli</a></li>';
      }).join("");

      out.innerHTML =
        '<div class="note-demo">Il suggerimento è automatico e dimostrativo. Disponibilità e adeguatezza vanno confermate dalla struttura.</div>' +
        '<h3>Il tuo soggiorno su misura</h3>' +
        '<div class="split" style="margin-top:1rem"><div class="split__media"><span class="placeholder ' + acc.ph + '" data-label="' + acc.name + '"></span></div>' +
        '<div><span class="chip chip--olive">Alloggio consigliato</span><h4 style="font-size:1.6rem;margin:.4rem 0">' + acc.name + '</h4>' +
        '<p class="muted">' + acc.short + ' Da €' + acc.priceFrom + ' / notte.</p>' +
        '<h4 style="margin-top:1rem">Due esperienze per te</h4><ul class="stack">' + expHTML + '</ul>' +
        '<p><b>Un pasto:</b> cena stagionale al ristorante agricolo — piatto simbolo: ' + season.dish + '.</p>' +
        '<p><b>Nel territorio:</b> mezza giornata tra i borghi bianchi della Valle d\'Itria.</p>' +
        '<p><b>Prodotto da portare a casa:</b> ' + season.product + '.</p>' +
        '<a class="btn btn--primary" href="' + ROOT + 'prenota.html?alloggio=' + acc.slug + '">Prenota questo soggiorno</a></div></div>';

      window.trackEvent("stay_builder_complete", { who: state.who, season: seasonKey });
    }

    show(0);
  }
  document.addEventListener("DOMContentLoaded", setup);
})();
