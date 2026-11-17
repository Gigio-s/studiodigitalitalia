/* ATELIER QUOTA — analytics.js
   trackEvent: in modalità demo scrive solo in console. Nessun dato inviato.
   Per collegare GA4 o Matomo vedi README (sezione "Analytics"). */
(function () {
  "use strict";

  // DEV = true quando aperto in locale (file:// o localhost). Metti false in produzione
  // dopo aver collegato un provider reale.
  var DEV = (location.protocol === "file:" ||
             /^(localhost|127\.0\.0\.1)$/.test(location.hostname));

  window.AQ = window.AQ || {};

  window.trackEvent = function trackEvent(eventName, eventData) {
    eventData = eventData || {};
    var payload = Object.assign({ event: eventName, ts: Date.now(), path: location.pathname }, eventData);

    if (DEV) {
      // eslint-disable-next-line no-console
      console.info("[trackEvent]", eventName, eventData);
      return;
    }

    // --- GA4 (decommenta dopo aver incluso gtag.js) ---
    // if (typeof gtag === "function") { gtag("event", eventName, eventData); }

    // --- Matomo (decommenta dopo aver incluso matomo.js) ---
    // if (window._paq) { window._paq.push(["trackEvent", "site", eventName, JSON.stringify(eventData)]); }
  };

  // Tracciamento automatico di alcuni click utili
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("tel:") === 0) window.trackEvent("phone_click", { href: href });
    else if (href.indexOf("mailto:") === 0) window.trackEvent("email_click", { href: href });
  });
})();
