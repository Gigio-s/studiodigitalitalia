/* ATELIER QUOTA — brief.js
   Brief multi-step accessibile. Salvataggio temporaneo in localStorage,
   validazione, riepilogo modificabile, "Stato di preparazione del progetto",
   conferma demo (nessun invio), reset e cancellazione dati.
   Messaggi via aria-live. Evento analytics per ogni passaggio. */
(function () {
  "use strict";
  var root = document.getElementById("brief");
  if (!root) return;

  var STORAGE_KEY = "aq_brief_v1";
  var steps = Array.prototype.slice.call(root.querySelectorAll(".brief-step"));
  var total = steps.length;
  var current = 0;

  var bar = document.getElementById("brief-progress-bar");
  var progressLabel = document.getElementById("brief-progress-label");
  var live = document.getElementById("brief-live");
  var btnPrev = document.getElementById("brief-prev");
  var btnNext = document.getElementById("brief-next");
  var btnSubmit = document.getElementById("brief-submit");
  var summaryWrap = document.getElementById("brief-summary");
  var readinessWrap = document.getElementById("brief-readiness");
  var confirmWrap = document.getElementById("brief-confirm");

  /* ---------- Storage ---------- */
  function save() {
    try {
      var data = collect();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }
  function collect() {
    var data = {};
    root.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (!el.name) return;
      if (el.type === "checkbox") {
        if (!data[el.name]) data[el.name] = [];
        if (el.checked) data[el.name].push(el.value);
      } else if (el.type === "radio") {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    });
    return data;
  }
  function restore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      root.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (!el.name || !(el.name in data)) return;
        var v = data[el.name];
        if (el.type === "checkbox") el.checked = Array.isArray(v) && v.indexOf(el.value) !== -1;
        else if (el.type === "radio") el.checked = (el.value === v);
        else el.value = v;
      });
      announce("Abbiamo ripristinato le risposte salvate su questo dispositivo.");
    } catch (e) {}
  }

  /* ---------- Navigation ---------- */
  function announce(msg) { if (live) live.textContent = msg; }

  function showStep(i, focus) {
    current = Math.max(0, Math.min(total - 1, i));
    steps.forEach(function (s, idx) {
      s.hidden = idx !== current;
      s.setAttribute("aria-hidden", String(idx !== current));
    });
    var pct = Math.round(((current + 1) / total) * 100);
    if (bar) { bar.style.width = pct + "%"; bar.parentElement.setAttribute("aria-valuenow", String(current + 1)); }
    if (progressLabel) progressLabel.textContent = "Passaggio " + (current + 1) + " di " + total + " — " + (steps[current].dataset.title || "");
    if (btnPrev) btnPrev.hidden = current === 0;
    var isLast = current === total - 1;
    if (btnNext) btnNext.hidden = isLast;
    if (btnSubmit) btnSubmit.hidden = !isLast;
    if (isLast) { buildSummary(); buildReadiness(); }
    if (focus) {
      var h = steps[current].querySelector("h2, h3, legend");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
    }
    window.trackEvent && trackEvent("brief_step", { step: current + 1, title: steps[current].dataset.title });
  }

  function validateStep(i) {
    var step = steps[i];
    var ok = true;
    step.querySelectorAll("[required], [data-required]").forEach(function (el) {
      var group = el.closest(".field, fieldset");
      if (el.type === "radio") {
        var name = el.name;
        var any = step.querySelector('input[name="' + name + '"]:checked');
        if (!any) { markGroup(group, false); ok = false; } else markGroup(group, true);
      } else if (el.type === "checkbox") {
        // checkbox richiesto singolo (es. consenso)
        if (!el.checked) { markGroup(group, false); ok = false; } else markGroup(group, true);
      } else if (!el.value.trim()) {
        markGroup(group, false); ok = false;
      } else markGroup(group, true);
    });
    if (!ok) announce("Alcuni campi obbligatori non sono compilati in questo passaggio.");
    return ok;
  }
  function markGroup(group, valid) {
    if (!group) return;
    group.classList.toggle("invalid", !valid);
    var em = group.querySelector(".error-msg");
    if (em && !valid && !em.textContent) em.textContent = "Campo obbligatorio.";
  }

  /* ---------- Summary ---------- */
  var LABELS = {
    "tipo-progetto": "Tipo di progetto", "immobile-localita": "Località",
    "immobile-tipologia": "Tipologia immobile", "immobile-superficie": "Superficie indicativa",
    "immobile-proprieta": "Proprietà", "immobile-stato": "Stato attuale",
    "immobile-docs": "Documentazione", "obiettivi-problema": "Cosa non funziona",
    "obiettivi-risultato": "Cosa si vuole ottenere", "obiettivi-ambienti": "Ambienti interessati",
    "obiettivi-extra": "Esigenze particolari", "fase": "Fase attuale",
    "budget": "Budget lavori (orientativo)", "tempistiche": "Tempistiche",
    "servizi": "Servizi richiesti", "nome": "Nome", "email": "Email",
    "telefono": "Telefono", "contatto-modalita": "Modalità preferita",
    "contatto-fascia": "Fascia oraria", "consenso": "Consenso privacy"
  };
  function buildSummary() {
    if (!summaryWrap) return;
    var data = collect();
    var rows = Object.keys(LABELS).map(function (k) {
      var v = data[k];
      if (Array.isArray(v)) v = v.join(", ");
      if (k === "consenso") v = (v && v.length) ? "Sì" : "—";
      if (!v) v = "—";
      return '<div class="row"><dt>' + LABELS[k] + "</dt><dd>" + window.AQ.esc(v) + "</dd></div>";
    }).join("");
    summaryWrap.innerHTML = '<dl class="tech-sheet">' + rows + "</dl>";
  }

  /* ---------- Project readiness ---------- */
  function buildReadiness() {
    if (!readinessWrap) return;
    var d = collect();
    var score = 0;
    if (d["immobile-localita"]) score++;
    if (d["immobile-proprieta"] === "acquistata") score++;
    if (d["immobile-docs"] && d["immobile-docs"] !== "no") score++;
    if (d["budget"] && d["budget"] !== "da-definire") score++;
    if (d["obiettivi-risultato"]) score++;
    if (d["tempistiche"] && d["tempistiche"] !== "senza-scadenza") score++;

    var result, note;
    if (score <= 1) { result = "Fase esplorativa"; note = "Stai iniziando a mettere a fuoco l'idea. Un primo confronto può aiutarti a chiarire le priorità."; }
    else if (score <= 3) { result = "Progetto da chiarire"; note = "Alcuni elementi ci sono, altri vanno definiti. Utile un confronto per completare il quadro."; }
    else if (score <= 4) { result = "Pronto per uno studio di fattibilità"; note = "Ci sono le condizioni per verificare cosa è possibile con uno studio preliminare."; }
    else { result = "Pronto per un confronto operativo"; note = "Il quadro è chiaro: possiamo passare a un confronto concreto sulle fasi."; }

    readinessWrap.innerHTML =
      '<span class="demo-badge">Indicatore orientativo</span>' +
      '<h3 class="serif">' + result + "</h3>" +
      "<p class=\"muted\">" + note + "</p>" +
      '<p class="notice"><strong>Nota:</strong> il risultato è orientativo e non sostituisce una verifica tecnica.</p>';
  }

  /* ---------- Events ---------- */
  root.addEventListener("input", save);
  root.addEventListener("change", save);

  if (btnNext) btnNext.addEventListener("click", function () {
    if (!validateStep(current)) {
      var f = steps[current].querySelector(".invalid input, .invalid select, .invalid textarea");
      if (f) f.focus();
      return;
    }
    showStep(current + 1, true);
  });
  if (btnPrev) btnPrev.addEventListener("click", function () { showStep(current - 1, true); });

  root.addEventListener("submit", function (e) {
    e.preventDefault();
    // Se l'invio parte da un passaggio non finale (es. Invio in un campo testo),
    // avanza invece di inviare.
    if (current !== total - 1) {
      if (validateStep(current)) showStep(current + 1, true);
      return;
    }
    if (!validateStep(current)) return;
    save();
    window.trackEvent && trackEvent("brief_complete_demo", {});
    root.querySelectorAll(".brief-step, .brief-nav").forEach(function (el) { el.hidden = true; });
    if (confirmWrap) {
      confirmWrap.hidden = false;
      confirmWrap.setAttribute("tabindex", "-1");
      confirmWrap.focus();
    }
  });

  // Salta a un passaggio dal riepilogo ("modifica")
  root.addEventListener("click", function (e) {
    var edit = e.target.closest("[data-goto]");
    if (edit) { e.preventDefault(); showStep(parseInt(edit.dataset.goto, 10), true); }
  });

  var clearBtn = document.getElementById("brief-clear");
  if (clearBtn) clearBtn.addEventListener("click", function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    root.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (el.type === "checkbox" || el.type === "radio") el.checked = false; else el.value = "";
    });
    announce("I dati salvati sono stati cancellati da questo dispositivo.");
    showStep(0, true);
  });

  /* ---------- Init ---------- */
  restore();
  showStep(0, false);
})();
