/* =====================================================================
   Studio Digital Italia — Widget WhatsApp + Chatbot guidato
   - Un solo file, incluso in ogni pagina con <script src="chat-widget.js" defer></script>
   - Bot "guidato" (nessun server, nessun costo): risposte predefinite + WhatsApp
   - La conversazione RESTA anche cambiando pagina (salvata in localStorage)
   ===================================================================== */
(function () {
  'use strict';

  var PHONE = '393277737115';                 // numero WhatsApp (formato internazionale, senza + e spazi)
  var WA_TEXT = 'Ciao! Vorrei informazioni su un sito web.';
  var WA_URL = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(WA_TEXT);
  var STORE = 'sdi_chat_v2';

  /* ---------- Stato persistente ---------- */
  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORE)) || { msgs: [], open: false }; }
    catch (e) { return { msgs: [], open: false }; }
  }
  function saveState() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }
  var state = loadState();

  /* ---------- Logica del bot (guidato) ---------- */
  var CHIPS = [
    { key: 'costo',      label: 'Quanto costa un sito?' },
    { key: 'tempi',      label: 'Quanto tempo serve?' },
    { key: 'settori',    label: 'Che siti fate?' },
    { key: 'preventivo', label: 'Voglio un preventivo' }
  ];

  var REPLIES = {
    costo: 'I nostri pacchetti sono chiari: Sito Base a 900 €, Sito Pro a 1.800 €, e preventivo su misura per progetti particolari. La gestione mensile (hosting, dominio e aggiornamenti) parte da 59 €/mese.',
    tempi: 'Il tuo sito è online in circa 7 giorni lavorativi da quando riceviamo testi e foto. Per progetti più grandi (e-commerce o molte pagine) può servire qualche giorno in più: te lo indichiamo sempre nel preventivo, senza sorprese.',
    settori: 'Realizziamo siti su misura per piccole imprese: B&B e strutture ricettive, ristoranti e bar, artigiani (idraulici, elettricisti, imprese edili), studi professionali e medici, negozi e attività locali. Ogni sito include versione mobile, SEO di base e Google Maps. Nella pagina “Settori” trovi gli esempi navigabili per categoria.',
    preventivo: 'Perfetto! Il modo più veloce è scriverci su WhatsApp con il pulsante verde qui sotto: ti rispondiamo noi. In alternativa usa il modulo nella sezione Contatti.',
    fallback: 'Non sono sicuro di aver capito bene. Per una risposta precisa scrivici su WhatsApp con il pulsante verde qui sotto, oppure scegli una delle domande rapide qui sopra.'
  };

  // Classificazione del testo LIBERO (i pulsanti vanno invece per intento esatto).
  // NB: "tempi" viene controllato PRIMA di "costo", così "quanto tempo" non finisce sui prezzi.
  function classify(text) {
    var t = (text || '').toLowerCase();
    if (/tempo|temp|giorn|quando|quanto ci|pront|consegn|veloc/.test(t)) return 'tempi';
    if (/prevent|contatt|chiam|parl|person|uman|whatsapp|telefon/.test(t)) return 'preventivo';
    if (/che sit|che tipo|cosa fat|che fat|servizi|b&b|bnb|airbnb|booking|ricettiv|affitt|ristorant|bar|idraul|elettric|edil|artigian|dentist|medic|studio|negozi|ottic|barbier|parrucch|settor|attivit/.test(t)) return 'settori';
    if (/cost|prezz|tarif|euro|budget|€|quanto/.test(t)) return 'costo';
    return 'fallback';
  }

  /* ---------- Stili ---------- */
  var css = '' +
  '.sdi-fab{position:fixed;right:20px;z-index:9999;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;transition:transform .15s}' +
  '.sdi-fab:hover{transform:scale(1.06)}' +
  '.sdi-wa{bottom:20px;right:20px;background:#25D366}' +
  '.sdi-chat-btn{bottom:20px;right:88px;background:#B8966A}' +
  '.sdi-fab svg{width:28px;height:28px}' +
  '.sdi-badge{position:absolute;top:-3px;right:-3px;background:#e23b3b;color:#fff;border-radius:50%;width:18px;height:18px;font:700 11px/18px system-ui;text-align:center}' +
  '.sdi-panel{position:fixed;right:20px;bottom:88px;z-index:10000;width:340px;max-width:calc(100vw - 40px);height:460px;max-height:calc(100vh - 130px);background:#fff;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif}' +
  '.sdi-panel.open{display:flex}' +
  '.sdi-head{background:#1E1F24;color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}' +
  '.sdi-head b{font:600 15px/1.2 Inter,system-ui;display:block}' +
  '.sdi-head small{color:rgba(255,255,255,.55);font-size:11.5px}' +
  '.sdi-head .sdi-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#25D366;margin-right:6px;vertical-align:middle}' +
  '.sdi-x{background:none;border:none;color:rgba(255,255,255,.7);font-size:20px;cursor:pointer;line-height:1}' +
  '.sdi-msgs{flex:1;overflow-y:auto;padding:14px;background:#F8F5EE;display:flex;flex-direction:column;gap:8px}' +
  '.sdi-m{max-width:82%;padding:9px 12px;border-radius:12px;font-size:13.5px;line-height:1.45;white-space:pre-wrap}' +
  '.sdi-bot{align-self:flex-start;background:#fff;color:#1A1C22;border:1px solid #E6E0D5;border-bottom-left-radius:4px}' +
  '.sdi-user{align-self:flex-end;background:#B8966A;color:#1E1F24;border-bottom-right-radius:4px}' +
  '.sdi-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;background:#F0ECE3;border-top:1px solid #E6E0D5}' +
  '.sdi-chip{background:#fff;border:1px solid #D8D2C6;color:#5b5348;border-radius:16px;padding:5px 11px;font-size:12px;cursor:pointer;transition:all .15s}' +
  '.sdi-chip:hover{background:#B8966A;color:#1E1F24;border-color:#B8966A}' +
  '.sdi-input{display:flex;gap:6px;padding:10px;border-top:1px solid #E6E0D5;background:#fff}' +
  '.sdi-input input{flex:1;border:1px solid #D8D2C6;border-radius:20px;padding:9px 13px;font-size:13px;outline:none}' +
  '.sdi-input input:focus{border-color:#B8966A}' +
  '.sdi-send{background:#1E1F24;color:#fff;border:none;border-radius:20px;padding:0 14px;font-size:13px;font-weight:600;cursor:pointer}' +
  '.sdi-wacta{display:block;text-align:center;background:#25D366;color:#fff;text-decoration:none;font:600 13px Inter,system-ui;padding:10px;border-top:1px solid #1fb457}' +
  '@media(max-width:480px){.sdi-panel{right:10px;left:10px;width:auto;height:60vh}}';

  /* ---------- Icone ---------- */
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.9 9.9 0 004.89 1.28h.01c5.5 0 9.97-4.47 9.97-9.97 0-2.66-1.04-5.17-2.92-7.05A9.93 9.93 0 0012.04 2zm0 18.2h-.01a8.28 8.28 0 01-4.21-1.15l-.3-.18-3.06.8.82-2.98-.2-.31a8.23 8.23 0 01-1.26-4.39c0-4.56 3.72-8.27 8.28-8.27 2.21 0 4.29.86 5.85 2.43a8.22 8.22 0 012.42 5.85c0 4.56-3.71 8.28-8.27 8.28zm4.54-6.2c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.25 3.74.59.26 1.05.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>';
  var CHAT_ICON = '<svg viewBox="0 0 24 24" fill="#1E1F24"><path d="M12 3C6.9 3 3 6.36 3 10.5c0 2.2 1.12 4.17 2.9 5.5-.13 1.02-.55 2.2-1.4 3.2 1.5-.15 2.9-.7 4-1.5.77.22 1.6.3 2.5.3 5.1 0 9-3.36 9-7.5S17.1 3 12 3z"/></svg>';
  var CLOSE_ICON = '&times;';

  /* ---------- Costruzione DOM ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  var style = el('style'); style.textContent = css; document.head.appendChild(style);

  // Pulsante WhatsApp
  var waBtn = el('a', 'sdi-fab sdi-wa', WA_ICON);
  waBtn.href = WA_URL; waBtn.target = '_blank'; waBtn.rel = 'noopener';
  waBtn.setAttribute('aria-label', 'Scrivici su WhatsApp');

  // Pulsante Chat
  var chatBtn = el('button', 'sdi-fab sdi-chat-btn', CHAT_ICON + '<span class="sdi-badge">1</span>');
  chatBtn.setAttribute('aria-label', 'Apri la chat');

  // Pannello chat
  var panel = el('div', 'sdi-panel');
  var head = el('div', 'sdi-head',
    '<div><b><span class="sdi-dot"></span>Assistente</b><small>Studio Digital Italia · di solito rispondiamo subito</small></div>');
  var xBtn = el('button', 'sdi-x', CLOSE_ICON); xBtn.setAttribute('aria-label', 'Chiudi la chat'); head.appendChild(xBtn);

  var msgs = el('div', 'sdi-msgs');
  var chips = el('div', 'sdi-chips');
  CHIPS.forEach(function (c) {
    var b = el('button', 'sdi-chip', c.label);
    b.addEventListener('click', function () { sendChip(c.key, c.label); });
    chips.appendChild(b);
  });

  var inputWrap = el('div', 'sdi-input');
  var input = el('input'); input.type = 'text'; input.placeholder = 'Scrivi un messaggio…'; input.setAttribute('aria-label', 'Messaggio');
  var send = el('button', 'sdi-send', 'Invia');
  inputWrap.appendChild(input); inputWrap.appendChild(send);

  var waCta = el('a', 'sdi-wacta', '💬  Continua su WhatsApp');
  waCta.href = WA_URL; waCta.target = '_blank'; waCta.rel = 'noopener';

  panel.appendChild(head); panel.appendChild(msgs); panel.appendChild(chips); panel.appendChild(inputWrap); panel.appendChild(waCta);

  document.body.appendChild(waBtn);
  document.body.appendChild(chatBtn);
  document.body.appendChild(panel);

  /* ---------- Render messaggi ---------- */
  function renderMsg(m) {
    var d = el('div', 'sdi-m ' + (m.who === 'user' ? 'sdi-user' : 'sdi-bot'));
    d.textContent = m.text;
    msgs.appendChild(d);
  }
  function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

  function seedIfEmpty() {
    if (!state.msgs.length) {
      state.msgs.push({ who: 'bot', text: 'Ciao! 👋 Sono l’assistente di Studio Digital Italia. Come posso aiutarti? Scegli una domanda qui sotto o scrivimi.' });
      saveState();
    }
  }
  function renderAll() { msgs.innerHTML = ''; state.msgs.forEach(renderMsg); scrollBottom(); }

  function addMsg(who, text) { state.msgs.push({ who: who, text: text }); saveState(); renderMsg(state.msgs[state.msgs.length - 1]); scrollBottom(); }

  // Pulsante rapido: intento certo, nessun equivoco
  function sendChip(key, label) {
    addMsg('user', label);
    setTimeout(function () { addMsg('bot', REPLIES[key] || REPLIES.fallback); }, 350);
  }
  // Testo libero: classificazione per parole chiave
  function handleUser(text) {
    text = (text || '').trim(); if (!text) return;
    addMsg('user', text);
    var key = classify(text);
    setTimeout(function () { addMsg('bot', REPLIES[key] || REPLIES.fallback); }, 350);
  }

  /* ---------- Apertura/chiusura ---------- */
  function openPanel() { panel.classList.add('open'); state.open = true; saveState(); var badge = chatBtn.querySelector('.sdi-badge'); if (badge) badge.style.display = 'none'; scrollBottom(); input.focus(); }
  function closePanel() { panel.classList.remove('open'); state.open = false; saveState(); }

  chatBtn.addEventListener('click', function () { panel.classList.contains('open') ? closePanel() : openPanel(); });
  xBtn.addEventListener('click', closePanel);
  send.addEventListener('click', function () { handleUser(input.value); input.value = ''; });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { handleUser(input.value); input.value = ''; } });

  /* ---------- Init ---------- */
  seedIfEmpty();
  renderAll();
  if (state.open) { panel.classList.add('open'); var b = chatBtn.querySelector('.sdi-badge'); if (b) b.style.display = 'none'; scrollBottom(); }

})();
