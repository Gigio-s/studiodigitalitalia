/* ATELIER QUOTA — forms.js
   Form contatti DIMOSTRATIVO. Non invia dati. Validazione accessibile.
   Per collegare un backend reale (Formspree / Netlify Forms / Web3Forms /
   endpoint / CRM) vedi i commenti in fondo e il README. */
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("contact-status");

  function setError(field, msg) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    wrap.classList.toggle("invalid", !!msg);
    var em = wrap.querySelector(".error-msg");
    if (em) em.textContent = msg || "";
    field.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validate() {
    var ok = true;
    var name = form.querySelector("#c-name");
    var email = form.querySelector("#c-email");
    var msg = form.querySelector("#c-message");
    var consent = form.querySelector("#c-consent");

    if (!name.value.trim()) { setError(name, "Inserisci il tuo nome."); ok = false; } else setError(name, "");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { setError(email, "Inserisci un'email valida."); ok = false; } else setError(email, "");
    if (!msg.value.trim()) { setError(msg, "Scrivi un messaggio."); ok = false; } else setError(msg, "");
    if (!consent.checked) { setError(consent, "È necessario il consenso per procedere."); ok = false; } else setError(consent, "");
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = form.querySelector(".field.invalid input, .field.invalid textarea");
      if (firstErr) firstErr.focus();
      return;
    }
    window.trackEvent && trackEvent("contact_submit_demo", { subject: (form.querySelector("#c-subject") || {}).value });

    // --- INTEGRAZIONE REALE (esempi) ---
    // 1) Formspree:   form.action = "https://formspree.io/f/XXXX"; form.method = "POST"; (rimuovere e.preventDefault)
    // 2) Web3Forms:   fetch("https://api.web3forms.com/submit", { method:"POST", body:new FormData(form) })
    // 3) Netlify:     aggiungere netlify a <form> e rimuovere questo handler in produzione
    // 4) Endpoint:    fetch("/api/contact", { method:"POST", headers:{...}, body:JSON.stringify(...) })

    status.className = "form-status ok";
    status.hidden = false;
    status.setAttribute("role", "status");
    status.textContent = "Questa è una demo. Il messaggio non è stato trasmesso. In produzione verrà collegato un servizio di invio (vedi README).";
    form.reset();
    status.focus && status.focus();
  });
})();
