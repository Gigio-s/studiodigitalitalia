/* =====================================================================
   analytics.js — layer analytics DEMO.
   La funzione window.trackEvent è definita in main.js e, di default,
   scrive solo in console in ambiente di sviluppo (localhost/file://).

   INTEGRAZIONI FUTURE (da attivare solo dopo consenso cookie):
   -----------------------------------------------------------------
   GA4:
     window.trackEvent = function (name, data) {
       if (window.gtag) gtag('event', name, data || {});
     };
   Matomo:
     window.trackEvent = function (name, data) {
       if (window._paq) _paq.push(['trackEvent', 'MasseriaRadice', name, JSON.stringify(data||{})]);
     };
   CRM / lead (es. invio a endpoint proprio):
     fetch('/api/lead', { method:'POST', body: JSON.stringify(data) })

   Nessuno di questi è attivo nella demo: privacy by default.
   Eventi tracciati: stay_search, accommodation_view, accommodation_select,
   booking_step, booking_demo_complete, restaurant_view, table_search,
   table_request_demo, experience_view, experience_select,
   experience_request_demo, stay_builder_start, stay_builder_complete,
   product_view, add_to_cart, gift_card_start, event_lead_start,
   wedding_lead_demo, contact_submit_demo, phone_click, email_click,
   whatsapp_click, language_change.
   ===================================================================== */
(function () {
  "use strict";
  // Traccia click su telefono/email/whatsapp automaticamente.
  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (href.indexOf("tel:") === 0) window.trackEvent("phone_click", {});
      else if (href.indexOf("mailto:") === 0) window.trackEvent("email_click", {});
      else if (href.indexOf("wa.me") !== -1 || href.indexOf("whatsapp") !== -1) window.trackEvent("whatsapp_click", {});
    });
  });
})();
