/* =====================================================================
   main.js — shell condivisa (header + footer), navigazione, stagione,
   analytics demo, badge carrello. Vanilla JS, nessuna dipendenza.
   Funziona da file:// (nessun fetch): header/footer iniettati da JS.
   Le pagine in sottocartelle impostano <body data-root="../">.
   ===================================================================== */
(function () {
  "use strict";
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";

  /* ---------- Logo SVG (radice + arco della masseria) ---------- */
  var LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">' +
    '<path d="M6 30 Q20 6 34 30" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="20" y1="17" x2="20" y2="34" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M20 26 C15 26 13 30 10 34 M20 22 C25 22 27 27 30 32 M20 30 C18 32 17 34 16 36 M20 30 C22 32 23 34 24 36" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
    '</svg>';

  /* ---------- Struttura navigazione ---------- */
  var NAV = [
    { label: "Soggiorna", href: "soggiorna.html", mega: [
      ["Camere e appartamenti", "camere.html"],
      ["Offerte e pacchetti", "offerte.html"],
      ["Componi il soggiorno", "componi-soggiorno.html"],
      ["Gift card", "gift-card.html"]
    ]},
    { label: "Mangia", href: "ristorante.html", mega: [
      ["Il ristorante agricolo", "ristorante.html"],
      ["Menu stagionale", "menu-stagionale.html"],
      ["Prenota un tavolo", "prenota-tavolo.html"]
    ]},
    { label: "Vivi la masseria", href: "esperienze.html", mega: [
      ["Esperienze", "esperienze.html"],
      ["Le stagioni", "stagioni.html"],
      ["Per le famiglie", "esperienze/esperienza-famiglia.html"],
      ["Calendario stagionale", "stagioni.html#matrice"]
    ]},
    { label: "Azienda agricola", href: "azienda-agricola.html" },
    { label: "Prodotti", href: "prodotti.html" },
    { label: "Territorio", href: "territorio.html" },
    { label: "Eventi", href: "eventi.html", mega: [
      ["Eventi in masseria", "eventi.html"],
      ["Matrimoni", "matrimoni.html"],
      ["Ritiri e aziende", "ritiri.html"]
    ]},
    { label: "Diario", href: "diario.html" }
  ];

  function buildHeader() {
    var lis = NAV.map(function (item, i) {
      var link = ROOT + item.href;
      if (item.mega) {
        var sub = item.mega.map(function (m) {
          return '<li><a href="' + ROOT + m[1] + '">' + m[0] + '</a></li>';
        }).join("");
        return '<li class="nav-item has-mega">' +
          '<a class="nav-link" href="' + link + '" aria-expanded="false" aria-haspopup="true">' + item.label + '</a>' +
          '<div class="mega"><ul>' + sub + '</ul></div></li>';
      }
      return '<li class="nav-item"><a class="nav-link" href="' + link + '">' + item.label + '</a></li>';
    }).join("");

    return '' +
    '<div class="demo-flag">Sito <strong>DIMOSTRATIVO</strong> di Studio Digital Italia · dati e immagini di esempio · nessun pagamento reale</div>' +
    '<header class="site-header"><div class="wrap header-inner">' +
      '<a class="brand" href="' + ROOT + 'index.html" aria-label="Masseria Radice — home">' + LOGO +
        '<span class="brand-name">Masseria Radice<small>Valle d\'Itria · Puglia</small></span></a>' +
      '<nav class="primary-nav" id="primary-nav" aria-label="Navigazione principale"><ul>' + lis + '</ul>' +
        '<a class="btn btn--primary btn--block nav-cta" href="' + ROOT + 'prenota.html">Prenota soggiorno</a>' +
        '<a class="btn btn--ghost btn--block nav-cta" href="' + ROOT + 'prenota-tavolo.html">Prenota tavolo</a>' +
      '</nav>' +
      '<div class="header-cta">' +
        '<a class="btn btn--ghost btn--sm btn--desktop" href="' + ROOT + 'prenota-tavolo.html">Prenota tavolo</a>' +
        '<a class="btn btn--primary btn--desktop" href="' + ROOT + 'prenota.html">Prenota soggiorno</a>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Apri il menu" aria-expanded="false" aria-controls="primary-nav"><span></span></button>' +
      '</div>' +
    '</div></header>' +
    '<div class="nav-backdrop" id="nav-backdrop"></div>';
  }

  function buildFooter() {
    var col = function (title, items) {
      return '<div><h4>' + title + '</h4><ul>' + items.map(function (i) {
        return '<li><a href="' + ROOT + i[1] + '">' + i[0] + '</a></li>';
      }).join("") + '</ul></div>';
    };
    return '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand"><span class="brand-name">Masseria Radice</span>' +
          '<p>Agriturismo biologico, cucina di campagna ed esperienze rurali nella Valle d\'Itria, tra Ostuni e Ceglie Messapica.</p>' +
          '<form class="newsletter" data-demo-form aria-label="Iscrizione newsletter (demo)">' +
            '<label class="visually-hidden" for="nl">La tua email</label>' +
            '<input id="nl" type="email" placeholder="La tua email" autocomplete="email">' +
            '<button class="btn btn--light btn--sm" type="submit">Iscriviti</button>' +
          '</form>' +
        '</div>' +
        col("Soggiorna", [["Camere e appartamenti","camere.html"],["Offerte","offerte.html"],["Componi il soggiorno","componi-soggiorno.html"],["Prenota","prenota.html"]]) +
        col("Vivi", [["Ristorante","ristorante.html"],["Esperienze","esperienze.html"],["Stagioni","stagioni.html"],["Prodotti","prodotti.html"]]) +
        col("Info", [["Chi siamo","chi-siamo.html"],["Territorio","territorio.html"],["FAQ","faq.html"],["Contatti","contatti.html"]]) +
      '</div>' +
      '<div class="footer-legal">' +
        '<div><!-- DATI DIMOSTRATIVI - SOSTITUIRE PRIMA DELLA PUBBLICAZIONE -->' +
          'Masseria Radice di [Titolare] · P.IVA [00000000000] · CIN [IT000000000000000000] · Cod. regionale [—]<br>' +
          'Contrada Radice [demo], Valle d\'Itria (BR) · +39 000 000 0000 · ciao@masseriaradice.example' +
        '</div>' +
        '<div>' +
          '<a href="' + ROOT + 'privacy.html">Privacy</a> · ' +
          '<a href="' + ROOT + 'cookie-policy.html">Cookie</a> · ' +
          '<a href="' + ROOT + 'termini-prenotazione.html">Termini prenotazione</a> · ' +
          '<a href="' + ROOT + 'termini-vendita.html">Termini vendita</a> · ' +
          '<a href="' + ROOT + 'accessibilita.html">Accessibilità</a><br>' +
          '© <span data-year></span> Masseria Radice — demo Studio Digital Italia' +
        '</div>' +
      '</div>' +
    '</div></footer>';
  }

  /* ---------- Mobile menu ---------- */
  function setupNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    var backdrop = document.getElementById("nav-backdrop");
    if (!toggle || !nav) return;

    function open() {
      nav.classList.add("open"); backdrop.classList.add("show");
      toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Chiudi il menu");
      document.body.style.overflow = "hidden";
      var first = nav.querySelector("a"); if (first) first.focus();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      nav.classList.remove("open"); backdrop.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Apri il menu");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Escape") { close(); toggle.focus(); }
      if (e.key === "Tab" && nav.classList.contains("open")) {
        var f = nav.querySelectorAll("a, button");
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? close() : open();
    });
    backdrop.addEventListener("click", close);

    // Mega menu: click su desktop e mobile
    nav.querySelectorAll(".has-mega > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1040) {
          e.preventDefault();
          var li = link.parentElement;
          var isOpen = li.classList.toggle("open");
          link.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
      });
    });
    // hover desktop
    nav.querySelectorAll(".has-mega").forEach(function (li) {
      li.addEventListener("mouseenter", function () { if (window.innerWidth > 1040) li.classList.add("open"); });
      li.addEventListener("mouseleave", function () { if (window.innerWidth > 1040) li.classList.remove("open"); });
    });
  }

  /* ---------- Header compatto allo scroll ---------- */
  function setupScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Segnala pagina attiva ---------- */
  function markActive() {
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(function (a) {
      var target = a.getAttribute("href").split("/").pop();
      if (target === here) { a.setAttribute("aria-current", "page"); a.style.color = "var(--accent)"; }
    });
  }

  /* ---------- Anno + carrello badge ---------- */
  function fillYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
  function updateCartBadge() {
    try {
      var cart = JSON.parse(localStorage.getItem("mr_cart") || "[]");
      var count = cart.reduce(function (n, i) { return n + (i.qty || 1); }, 0);
      document.querySelectorAll("[data-cart-count]").forEach(function (el) {
        el.textContent = count; el.style.display = count ? "inline-grid" : "none";
      });
    } catch (e) {}
  }
  window.MR = window.MR || {};
  window.MR.updateCartBadge = updateCartBadge;

  /* ---------- Analytics demo ---------- */
  window.trackEvent = function (eventName, eventData) {
    // In produzione: inoltrare a GA4 / Matomo / CRM (vedi README).
    // Di default, in questa demo scrive solo in console.
    var isDev = ["localhost", "127.0.0.1", ""].indexOf(location.hostname) !== -1 ||
      location.protocol === "file:";
    if (isDev && window.console) console.log("[trackEvent]", eventName, eventData || {});
  };

  /* ---------- "La stagione adesso" ---------- */
  function renderSeason(seasonKey, container) {
    if (!window.MR.seasons) return;
    var s = window.MR.seasons[seasonKey];
    if (!s) return;
    var facts = [
      ["Cosa cresce", s.growing], ["Si raccoglie", s.harvest], ["In cucina", s.dish],
      ["Esperienza", s.experience], ["Prodotto del mese", s.product], ["Clima", s.climate]
    ].map(function (f) { return '<li><b>' + f[0] + '</b><span>' + f[1] + '</span></li>'; }).join("");
    container.querySelector("[data-season-title]").textContent = "La masseria in " + s.label.toLowerCase();
    container.querySelector("[data-season-facts]").innerHTML = facts;
    var pk = container.querySelector("[data-season-pkg]");
    if (pk) pk.textContent = s.package;
    var sw = container.querySelectorAll("[data-season-btn]");
    sw.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-season-btn") === seasonKey ? "true" : "false"); });
  }
  function setupSeason() {
    var container = document.querySelector("[data-season-now]");
    if (!container) return;
    var current = window.MR.monthToSeason(new Date().getMonth());
    renderSeason(current, container);
    container.querySelectorAll("[data-season-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        renderSeason(btn.getAttribute("data-season-btn"), container);
        window.trackEvent("season_switch", { season: btn.getAttribute("data-season-btn") });
      });
    });
  }

  /* ---------- Demo form generici (newsletter footer ecc.) ---------- */
  function setupDemoForms() {
    document.querySelectorAll("[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = form.querySelector(".form-status") || document.createElement("p");
        status.className = "form-status ok"; status.setAttribute("role", "status");
        status.textContent = "Questa è una demo. Il messaggio non è stato trasmesso.";
        if (!form.contains(status)) form.appendChild(status);
        form.reset();
        window.trackEvent("contact_submit_demo", { form: form.getAttribute("data-demo-form") || "generic" });
      });
    });
  }

  /* ---------------------------------------------------------
     PROTEZIONE DEMO — deterrente anti-copia
     ---------------------------------------------------------
     NOTA ONESTA: nessun sito può nascondere davvero HTML/CSS —
     il browser deve scaricarli per mostrarli. Questi sono
     DETERRENTI: fermano il copia-incolla pigro (tasto destro,
     salva pagina, visualizza sorgente, ispeziona) e lasciano
     un watermark. Un tecnico determinato li aggira; la maggior
     parte delle persone no.
     Per DISATTIVARE (es. quando diventa il sito reale del
     cliente) impostare qui sotto:  MR.protect = false;
  --------------------------------------------------------- */
  window.MR = window.MR || {};
  window.MR.protect = (window.MR.protect !== false); // demo protetta di default

  (function protezioneDemo() {
    if (!window.MR.protect) return;

    // Watermark nel codice sorgente (prova di paternità)
    try {
      document.documentElement.insertBefore(
        document.createComment(' © Studio Digital Italia — studiodigitalitalia.it — Demo dimostrativa. Copia non autorizzata vietata. '),
        document.documentElement.firstChild
      );
    } catch (e) {}

    // Watermark in console
    try {
      console.log('%c© Studio Digital Italia', 'color:#9b5c43;font-size:13px;font-weight:700');
      console.log('%cQuesta è una demo dimostrativa. Il codice è protetto da copyright. studiodigitalitalia.it', 'color:#888;font-size:11px');
    } catch (e) {}

    // Blocco selezione testo (deterrente copia-incolla)
    try {
      var css = 'body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}' +
        'input,textarea,select,[contenteditable]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}';
      var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    } catch (e) {}

    // Blocco tasto destro (menu contestuale → "salva immagine", "visualizza sorgente")
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);

    // Blocco trascinamento delle immagini
    document.addEventListener('dragstart', function (e) {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    }, false);

    // Blocco copia/taglio del testo di pagina
    document.addEventListener('copy', function (e) {
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA') return; // lascia i campi form
      e.preventDefault();
    }, false);

    // Blocco scorciatoie: F12, Ctrl+U (sorgente), Ctrl+S (salva),
    // Ctrl+Shift+I/J/C (strumenti sviluppatore)
    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      var blocca =
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && k === 'u') ||
        ((e.ctrlKey || e.metaKey) && k === 's') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'));
      if (blocca) { e.preventDefault(); e.stopPropagation(); return false; }
    }, false);
  })();

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var h = document.getElementById("site-header-mount");
    if (h) h.innerHTML = buildHeader();
    var f = document.getElementById("site-footer-mount");
    if (f) f.innerHTML = buildFooter();
    setupNav(); setupScroll(); markActive(); fillYear();
    updateCartBadge(); setupSeason(); setupDemoForms();
  });
})();
