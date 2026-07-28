/* =====================================================================
   forms.js — validazione accessibile e invio DEMO per tutti i form
   lead (contatti, esperienze, matrimoni, ritiri, eventi). Anteprima
   gift card. Nessun invio reale. Integrazioni CRM/email: vedi README.
   ===================================================================== */
(function () {
  "use strict";

  function validate(form) {
    var ok = true, firstBad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var group = el.closest(".field") || el.parentElement;
      var err = group.querySelector(".error-msg");
      var bad = false;
      if (el.type === "checkbox") bad = !el.checked;
      else if (el.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      else bad = !el.value.trim();
      if (bad) {
        ok = false; el.setAttribute("aria-invalid", "true");
        if (err) { err.textContent = el.getAttribute("data-error") || "Campo obbligatorio."; }
        if (!firstBad) firstBad = el;
      } else {
        el.removeAttribute("aria-invalid");
        if (err) err.textContent = "";
      }
    });
    if (firstBad) firstBad.focus();
    return ok;
  }

  function setupLeadForms() {
    document.querySelectorAll("[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = form.querySelector("[data-form-status]");
        if (!validate(form)) {
          if (status) { status.className = "form-status"; status.style.background = "rgba(155,92,67,.12)"; status.style.color = "var(--red-earth)"; status.setAttribute("role", "alert"); status.textContent = "Controlla i campi evidenziati."; }
          return;
        }
        var kind = form.getAttribute("data-lead-form");
        var evt = {
          contatti: "contact_submit_demo", esperienza: "experience_request_demo",
          matrimonio: "wedding_lead_demo", ritiro: "event_lead_start", evento: "event_lead_start",
          giftcard: "gift_card_start"
        }[kind] || "contact_submit_demo";
        window.trackEvent(evt, { form: kind });
        if (status) {
          status.className = "form-status ok"; status.style.background = ""; status.style.color = "";
          status.setAttribute("role", "status");
          status.textContent = "Questa è una demo. Il messaggio non è stato trasmesso.";
        }
        form.reset();
        form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
      });
    });
  }

  /* Gift card: anteprima live */
  function setupGiftCard() {
    var form = document.querySelector("[data-giftcard-form]");
    if (!form) return;
    var pv = {
      value: document.querySelector("[data-gc-value]"),
      to: document.querySelector("[data-gc-to]"),
      from: document.querySelector("[data-gc-from]"),
      msg: document.querySelector("[data-gc-msg]"),
      type: document.querySelector("[data-gc-type]")
    };
    function upd() {
      var t = form.querySelector('[name="tipo"]');
      var custom = form.querySelector('[name="importo"]');
      if (pv.type && t) pv.type.textContent = t.options[t.selectedIndex].text;
      if (pv.value && custom) pv.value.textContent = "€" + (custom.value || "—");
      if (pv.to) pv.to.textContent = form.querySelector('[name="destinatario"]').value || "Per…";
      if (pv.from) pv.from.textContent = form.querySelector('[name="mittente"]').value || "Da…";
      if (pv.msg) pv.msg.textContent = form.querySelector('[name="messaggio"]').value || "Il tuo messaggio apparirà qui.";
    }
    form.querySelectorAll("input, select, textarea").forEach(function (el) { el.addEventListener("input", upd); });
    upd();
  }

  document.addEventListener("DOMContentLoaded", function () { setupLeadForms(); setupGiftCard(); });
})();
