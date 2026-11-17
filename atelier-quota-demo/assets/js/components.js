/* ATELIER QUOTA — components.js
   Inietta header + footer condivisi, gestisce menu mobile, header allo scroll,
   selettore lingua (IT attivo, EN in preparazione) e barra cookie essenziale.
   L'iniezione avviene al load (non dopo interazione): i contenuti principali
   restano comunque inline in ciascuna pagina. */
(function () {
  "use strict";

  var BASE = (document.body && document.body.dataset.base) || "";
  var NAV = (document.body && document.body.dataset.nav) || "";
  var B = function (p) { return BASE + p; };

  var navItems = [
    ["progetti", "Progetti", "progetti.html"],
    ["servizi", "Servizi", "servizi.html"],
    ["metodo", "Metodo", "metodo.html"],
    ["studio", "Studio", "studio.html"],
    ["journal", "Journal", "journal.html"],
    ["contatti", "Contatti", "contatti.html"]
  ];

  function logoSVG() {
    return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<line x1="3" y1="27" x2="29" y2="27" stroke="currentColor" stroke-width="1.4"/>' +
      '<line x1="3" y1="27" x2="3" y2="5" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M3 27 L16 8 L29 27" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
      '<circle cx="16" cy="8" r="1.6" fill="currentColor"/>' +
      '<line x1="16" y1="8" x2="16" y2="27" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/>' +
      '</svg>';
  }

  function navLinks(cls) {
    return navItems.map(function (it) {
      var cur = (NAV === it[0]) ? ' aria-current="page"' : "";
      return '<li><a href="' + B(it[2]) + '"' + cur + '>' + it[1] + "</a></li>";
    }).join("");
  }

  function buildHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap header-inner">' +
        '<a class="logo" href="' + B("index.html") + '" aria-label="Atelier Quota — home">' +
          logoSVG() + '<span class="logo-text">Atelier Quota</span>' +
        '</a>' +
        '<nav class="main-nav" aria-label="Principale"><ul>' + navLinks() + '</ul></nav>' +
        '<div class="header-actions">' +
          '<div class="lang-switch" role="group" aria-label="Lingua">' +
            '<button type="button" aria-pressed="true">IT</button>' +
            '<button type="button" aria-pressed="false" disabled title="English version in preparation">EN</button>' +
          '</div>' +
          '<a class="btn btn--primary" href="' + B("avvia-progetto.html") + '">Avvia un progetto</a>' +
          '<button class="nav-toggle" aria-expanded="false" aria-controls="mobile-panel" aria-label="Apri il menu">' +
            '<span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';

    // Mobile panel
    var panel = document.createElement("div");
    panel.className = "mobile-panel";
    panel.id = "mobile-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML =
      '<div class="mobile-panel-head">' +
        '<span class="logo-text">Atelier Quota</span>' +
        '<button class="close-btn" aria-label="Chiudi il menu">&times;</button>' +
      '</div>' +
      '<nav aria-label="Menu mobile"><ul>' + navLinks() +
        '<li><a href="' + B("avvia-progetto.html") + '">Avvia un progetto</a></li>' +
      '</ul></nav>' +
      '<a class="btn btn--primary" href="' + B("contatti.html") + '">Parliamo del progetto</a>';
    document.body.appendChild(panel);

    var toggle = el.querySelector(".nav-toggle");
    var closeBtn = panel.querySelector(".close-btn");
    var lastFocus = null;

    function focusables() {
      return panel.querySelectorAll('a[href], button:not([disabled])');
    }
    function openMenu() {
      lastFocus = document.activeElement;
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      var f = focusables(); if (f.length) f[0].focus();
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      if (lastFocus) lastFocus.focus();
    }
    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) {
      if (!panel.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key === "Tab") {
        var f = Array.prototype.slice.call(focusables());
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Header allo scroll: solido + compatto (senza layout shift, usa classi)
    var lastY = 0;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      el.classList.toggle("is-solid", y > 12);
      el.classList.toggle("is-compact", y > 220);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function buildFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    el.className = "site-footer";
    el.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-cta">' +
          '<span class="eyebrow">Iniziamo</span>' +
          '<h2 class="serif">Un buon progetto comincia da un confronto chiaro.</h2>' +
          '<div class="btn-row" style="margin-top:1.5rem">' +
            '<a class="btn btn--light" href="' + B("avvia-progetto.html") + '">Avvia il brief <span class="arrow">→</span></a>' +
            '<a class="btn btn--ghost" style="color:var(--paper-light);border-color:rgba(255,255,255,.3)" href="' + B("contatti.html") + '">Scrivi allo studio</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<span class="logo-text">Atelier Quota</span>' +
            '<p>Studio di architettura e interni a Vicenza. Progettiamo case, interni e luoghi di lavoro con un processo chiaro, dalla fattibilità alla realizzazione.</p>' +
          '</div>' +
          '<div><h4>Studio</h4><ul class="footer-links">' +
            '<li><a href="' + B("studio.html") + '">Chi siamo</a></li>' +
            '<li><a href="' + B("metodo.html") + '">Metodo</a></li>' +
            '<li><a href="' + B("journal.html") + '">Journal</a></li>' +
            '<li><a href="' + B("guida-ristrutturazione.html") + '">Guida alla ristrutturazione</a></li>' +
          '</ul></div>' +
          '<div><h4>Servizi</h4><ul class="footer-links">' +
            '<li><a href="' + B("servizi/ristrutturazioni-residenziali.html") + '">Ristrutturazioni</a></li>' +
            '<li><a href="' + B("servizi/nuove-abitazioni.html") + '">Nuove abitazioni</a></li>' +
            '<li><a href="' + B("servizi/interior-design.html") + '">Interior design</a></li>' +
            '<li><a href="' + B("servizi/direzione-lavori.html") + '">Direzione lavori</a></li>' +
          '</ul></div>' +
          '<div><h4>Contatti</h4><ul class="footer-links">' +
            '<li><a href="tel:+390444000000">+39 0444 000 000</a></li>' +
            '<li><a href="mailto:studio@atelierquota.example">studio@atelierquota.example</a></li>' +
            '<li>Contrà della Quota 27<br>36100 Vicenza (VI)</li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-legal">' +
          '<span>&copy; <span id="yr"></span> Atelier Quota — Dati dimostrativi. P.IVA IT00000000000 · Arch. iscr. Ordine APPC Vicenza n. 0000</span>' +
          '<span>' +
            '<a href="' + B("privacy.html") + '">Privacy</a> · ' +
            '<a href="' + B("cookie-policy.html") + '">Cookie</a> · ' +
            '<a href="' + B("accessibilita.html") + '">Accessibilità</a>' +
          '</span>' +
        '</div>' +
      '</div>';
    var yr = el.querySelector("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  }

  function buildPromoBar() {
    if (document.querySelector(".promo-bar")) return;
    var bar = document.createElement("div");
    bar.className = "promo-bar";
    bar.setAttribute("role", "note");
    bar.innerHTML =
      '<img class="promo-bar__logo" src="' + B("logo-completo.jpg") + '" alt="Studio Digital Italia">' +
      '<span>Demo realizzata da <strong>Studio Digital Italia</strong> &middot; vuoi un sito così per la tua attività? ' +
      '<a href="https://studiodigitalitalia.it" target="_blank" rel="noopener noreferrer">studiodigitalitalia.it</a></span>';
    var hdr = document.getElementById("site-header");
    if (hdr) document.body.insertBefore(bar, hdr);
    else document.body.insertBefore(bar, document.body.firstChild);
  }

  function init() {
    buildPromoBar();
    buildHeader();
    buildFooter();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
