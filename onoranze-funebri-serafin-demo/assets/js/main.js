/* =====================================================================
   main.js - Onoranze Funebri Serafin (SITO DIMOSTRATIVO)
   Shell condivisa: header (logo + hamburger + menu overlay) e footer,
   iniettati via JS (funziona da file://). Stile ispirato a Magnani.
   Studio Digital Italia.
   ===================================================================== */
(function () {
  "use strict";

  var TEL = "+39 0444 000 000";
  var TEL_HREF = "tel:+390444000000";
  var WA = "https://wa.me/390000000000";
  var MAIL = "info@onoranzefunebriserafin.example";
  var CURRENT = (document.body && document.body.getAttribute("data-page")) || "";

  /* Logo: cipresso stilizzato + piccola fiamma dorata */
  var LOGO =
    '<svg viewBox="0 0 44 52" aria-hidden="true" focusable="false">' +
    '<path d="M22 4 C15 16 15 30 18 42 L26 42 C29 30 29 16 22 4 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<line x1="22" y1="14" x2="22" y2="40" stroke="currentColor" stroke-width="1.1" opacity=".5"/>' +
    '<rect x="19.4" y="42" width="5.2" height="6" rx="1" fill="currentColor" opacity=".85"/>' +
    '<path d="M22 2 C20.4 4.2 20.2 6 22 7.4 C23.8 6 23.6 4.2 22 2 Z" fill="#9c8a6f"/>' +
    '</svg>';

  var NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "Chi siamo", href: "chi-siamo.html", key: "chi-siamo" },
    { label: "Servizi", href: "servizi.html", key: "servizi" },
    { label: "Casa Funeraria", href: "casa-funeraria.html", key: "casa-funeraria" },
    { label: "Catalogo", href: "catalogo.html", key: "catalogo" },
    { label: "In caso di lutto", href: "cosa-fare.html", key: "cosa-fare" },
    { label: "Necrologi", href: "necrologi.html", key: "necrologi" },
    { label: "Contatti", href: "contatti.html", key: "contatti" }
  ];

  var SOCIAL =
    '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.4.2-.5.6-.5H14z"/></svg></a>' +
    '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg></a>' +
    '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM3 8.5h3.9V21H3zM9 8.5h3.7v1.7h.05c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.5 4.7 5.9V21h-3.9v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9z"/></svg></a>';

  function header() {
    var navLinks = NAV.map(function (it) {
      return '<a href="' + it.href + '"' + (it.key === CURRENT ? ' class="current"' : '') + '>' + it.label + '</a>';
    }).join("");
    var ovLinks = NAV.map(function (it) {
      return '<a href="' + it.href + '"' + (it.key === CURRENT ? ' style="color:#9c8a6f"' : '') + '>' + it.label + '</a>';
    }).join("");

    return '' +
    '<div class="demo-flag">Sito <strong>DIMOSTRATIVO</strong> realizzato da Studio Digital Italia - nome, dati e immagini di esempio</div>' +
    '<header class="site-header"><div class="wrap header-inner">' +
      '<a class="brand" href="index.html" aria-label="Onoranze Funebri Serafin - home">' + LOGO +
        '<span class="brand-name"><b>Serafin</b><small>Onoranze Funebri dal 1962</small></span></a>' +
      '<div class="header-right">' +
        '<nav class="primary-nav" aria-label="Navigazione principale">' + navLinks + '</nav>' +
        '<div class="social">' + SOCIAL + '</div>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Apri il menu" aria-expanded="false" aria-controls="nav-overlay"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</div></header>' +
    '<nav class="nav-overlay" id="nav-overlay" aria-label="Menu principale">' +
      '<button class="nav-close" id="nav-close" aria-label="Chiudi il menu">&times;</button>' +
      ovLinks +
      '<a class="ov-tel" href="' + TEL_HREF + '">Chiama ora: ' + TEL + '</a>' +
    '</nav>';
  }

  function footer() {
    var col = function (t, items) {
      return '<div><h4>' + t + '</h4><ul>' + items.map(function (i) {
        return '<li><a href="' + i[1] + '">' + i[0] + '</a></li>';
      }).join("") + '</ul></div>';
    };
    return '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<span class="brand-name"><b>Onoranze Funebri Serafin</b></span>' +
          '<p>Un\'impresa a conduzione familiare che dal 1962 accompagna le famiglie con discrezione, rispetto e attenzione, sette giorni su sette.</p>' +
          '<p style="margin-top:16px"><a class="btn btn--bronze btn--sm" href="' + TEL_HREF + '">Reperibilita 24h: ' + TEL + '</a></p>' +
        '</div>' +
        col("Onoranze", [["Chi siamo","chi-siamo.html"],["I nostri servizi","servizi.html"],["Casa Funeraria","casa-funeraria.html"],["Catalogo","catalogo.html"]]) +
        col("Assistenza", [["In caso di lutto","cosa-fare.html"],["Necrologi","necrologi.html"],["Cremazione","servizi.html#cremazione"],["Contatti","contatti.html"]]) +
        col("Contatti", [["Tel: " + TEL, TEL_HREF],["WhatsApp", WA],["Scrivici","mailto:" + MAIL],["Dove siamo","contatti.html"]]) +
      '</div>' +
      '<div class="footer-legal">' +
        '<div><!-- DATI DIMOSTRATIVI - SOSTITUIRE PRIMA DELLA PUBBLICAZIONE -->' +
          'Onoranze Funebri Serafin di [Titolare] - P.IVA [00000000000] - Sede: Via degli Ulivi [demo], Vicenza (VI) - Autorizzazione comunale n. [-]' +
        '</div>' +
        '<div>' +
          '<a href="privacy.html">Privacy</a> &nbsp;-&nbsp; <a href="cookie-policy.html">Cookie</a> &nbsp;-&nbsp; ' +
          'Copyright <span data-year></span> Onoranze Funebri Serafin - demo <a href="https://studiodigitalitalia.it">Studio Digital Italia</a>' +
        '</div>' +
      '</div>' +
    '</div></footer>';
  }

  /* ---- mount ---- */
  var h = document.getElementById("site-header-mount");
  if (h) h.innerHTML = header();
  var f = document.getElementById("site-footer-mount");
  if (f) f.innerHTML = footer();

  /* ---- anno ---- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- menu overlay ---- */
  var toggle = document.getElementById("nav-toggle");
  var overlay = document.getElementById("nav-overlay");
  var closeBtn = document.getElementById("nav-close");
  function openMenu(){ if(!overlay)return; overlay.classList.add("open"); if(toggle){toggle.classList.add("open");toggle.setAttribute("aria-expanded","true");} document.body.style.overflow="hidden"; }
  function closeMenu(){ if(!overlay)return; overlay.classList.remove("open"); if(toggle){toggle.classList.remove("open");toggle.setAttribute("aria-expanded","false");} document.body.style.overflow=""; }
  if (toggle) toggle.addEventListener("click", function(){ overlay.classList.contains("open") ? closeMenu() : openMenu(); });
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) Array.prototype.forEach.call(overlay.querySelectorAll("a"), function(a){ a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMenu(); });

  /* ---- immagini: fallback elegante se un hotlink non carica ---- */
  function attachFallback(img){
    img.addEventListener("error", function () {
      if (img.dataset.done) return; img.dataset.done = "1";
      var label = (img.getAttribute("alt") || "Immagine").replace(/[<>&]/g,"");
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
        '<rect width="800" height="600" fill="#e9e2d5"/>' +
        '<rect x="1" y="1" width="798" height="598" fill="none" stroke="#e0d8ca"/>' +
        '<g fill="none" stroke="#9c8a6f" stroke-width="2" opacity="0.7" transform="translate(370,236)">' +
        '<path d="M30 0 C18 24 18 52 24 76 L36 76 C42 52 42 24 30 0 Z"/></g>' +
        '<text x="400" y="360" font-family="Georgia,serif" font-size="26" fill="#2c2823" text-anchor="middle">Onoranze Funebri Serafin</text>' +
        '<text x="400" y="392" font-family="sans-serif" font-size="14" fill="#6a625a" text-anchor="middle">' + label + '</text>' +
        '</svg>');
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("img[data-fallback]"), attachFallback);
  window.__serafinAttachFallback = attachFallback;

  /* ---- form demo: nessun invio reale ---- */
  Array.prototype.forEach.call(document.querySelectorAll("form[data-demo-form]"), function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector("[data-form-msg]");
      if (msg) msg.hidden = false;
    });
  });

  /* ---- widget flottanti: WhatsApp + chatbot (demo) ---- */
  var WA_ICON = '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.6 1.8 6.6L3 29l7.3-2.3c1.9 1 3.7 1.5 5.7 1.5 7 0 12.5-5.5 12.5-12.5S23 3 16 3zm0 22.8c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-4.3 1.3 1.4-4.2-.3-.4c-1-1.6-1.6-3.6-1.6-5.6C5.6 9.8 10.3 5.2 16 5.2s10.4 4.6 10.4 10.3S21.7 25.8 16 25.8zm5.7-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2-.4.2-.7 0c-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5 0-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/></svg>';
  var CHAT_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 3.2V17H4a1 1 0 01-1-1V5a1 1 0 011-1zm3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm5 0a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm5 0a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>';
  var SEND_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11l17-7-7 17-2.5-6.5L3 11z"/></svg>';

  var QUICK = [
    ["Reperibilita 24h", "reperibilita"],
    ["In caso di lutto", "lutto"],
    ["Dove siete", "dove"],
    ["I vostri servizi", "servizi"]
  ];

  function botReply(text) {
    var t = (text || "").toLowerCase();
    if (/reper|24|h24|notte|urgen|subito/.test(t))
      return "Siamo reperibili giorno e notte, tutti i giorni dell'anno. Potete chiamarci in qualsiasi momento allo " + TEL + ".";
    if (/lutto|decess|mancat|caro|defunt|morte/.test(t))
      return "In caso di lutto la prima cosa da fare e chiamarci: ci occupiamo noi di ogni adempimento. Trovate una guida passo passo nella pagina 'In caso di lutto'.";
    if (/dove|indirizz|sede|mappa|orari|aperto|quando/.test(t))
      return "Ci trovate in Via degli Ulivi (demo), Vicenza. Mappa, orari e recapiti sono nella pagina Contatti. Reperibilita telefonica sempre attiva.";
    if (/serviz|cremazion|traspor|fiori|cofan|urna|catalog|cerimoni/.test(t))
      return "Ci occupiamo di cerimonie, trasporto, cremazione, composizioni floreali e pratiche. Trovate tutto nelle pagine Servizi e Catalogo.";
    if (/prezzo|costo|preventiv|quanto|spesa/.test(t))
      return "I costi dipendono dalle scelte. Vi prepariamo un preventivo chiaro e senza impegno: chiamateci allo " + TEL + ".";
    if (/ciao|salve|buongiorno|buonasera|grazie/.test(t))
      return "Buongiorno. Sono qui per aiutarvi. Per assistenza immediata siamo reperibili allo " + TEL + ".";
    return "Grazie per il messaggio. Questo e un assistente dimostrativo: per una risposta certa vi invitiamo a chiamarci allo " + TEL + " oppure a scriverci su WhatsApp.";
  }

  function buildWidgets() {
    var quickBtns = QUICK.map(function (q) {
      return '<button type="button" class="chip" data-q="' + q[1] + '">' + q[0] + '</button>';
    }).join("");
    var html =
      '<div class="fab-stack">' +
        '<a class="fab fab--wa" href="' + WA + '" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">' + WA_ICON + '</a>' +
        '<button class="fab fab--chat" id="chat-toggle" aria-label="Apri la chat" aria-expanded="false">' + CHAT_ICON + '</button>' +
      '</div>' +
      '<section class="chatbox" id="chatbox" aria-label="Assistente virtuale">' +
        '<div class="chatbox__head"><span class="brand-name"><b>Assistente Serafin</b></span>' +
          '<span class="chatbox__tag">demo</span>' +
          '<button class="chatbox__close" id="chat-close" aria-label="Chiudi la chat">&times;</button></div>' +
        '<div class="chatbox__body" id="chat-body" aria-live="polite"></div>' +
        '<div class="chatbox__quick" id="chat-quick">' + quickBtns + '</div>' +
        '<form class="chatbox__input" id="chat-form">' +
          '<input id="chat-in" type="text" autocomplete="off" placeholder="Scrivi un messaggio...">' +
          '<button type="submit" aria-label="Invia">' + SEND_ICON + '</button>' +
        '</form>' +
      '</section>';
    document.body.insertAdjacentHTML("beforeend", html);

    var box = document.getElementById("chatbox");
    var body = document.getElementById("chat-body");
    var toggle = document.getElementById("chat-toggle");
    var closeB = document.getElementById("chat-close");
    var form = document.getElementById("chat-form");
    var input = document.getElementById("chat-in");
    var started = false;

    function add(text, who) {
      var m = document.createElement("div");
      m.className = "msg msg--" + who;
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function botSays(text) { setTimeout(function () { add(text, "bot"); }, 350); }
    function openChat() {
      box.classList.add("open"); toggle.setAttribute("aria-expanded", "true");
      if (!started) {
        started = true;
        add("Buongiorno, sono l'assistente virtuale (dimostrativo) delle Onoranze Funebri Serafin. Come posso aiutarvi? Per assistenza immediata siamo reperibili 24 ore su 24 allo " + TEL + ".", "bot");
      }
      setTimeout(function () { input.focus(); }, 200);
    }
    function closeChat() { box.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }

    toggle.addEventListener("click", function () { box.classList.contains("open") ? closeChat() : openChat(); });
    closeB.addEventListener("click", closeChat);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim(); if (!v) return;
      add(v, "user"); input.value = ""; botSays(botReply(v));
    });
    document.getElementById("chat-quick").addEventListener("click", function (e) {
      var b = e.target.closest("[data-q]"); if (!b) return;
      add(b.textContent, "user"); botSays(botReply(b.getAttribute("data-q")));
    });
  }
  buildWidgets();

})();
