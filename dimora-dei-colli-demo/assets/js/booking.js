/* =========================================================
   DIMORA DEI COLLI — booking.js
   Booking engine DIMOSTRATIVO in 4 passaggi.
   NON esegue pagamenti, NON invia dati, NON contatta server.
   Tutta la logica di prezzo e disponibilità è simulata e
   volutamente semplice e prevedibile: serve a far capire al
   cliente come funzionerà il flusso reale.
   ---------------------------------------------------------
   DOVE COLLEGARE UN BOOKING ENGINE VERO
   ---------------------------------------------------------
   Questo file va sostituito (o affiancato) dall'integrazione
   del PMS/channel manager scelto. Punti di aggancio:

   1) Cloudbeds        -> widget JS "myfrontdesk" oppure API
                          https://hotels.cloudbeds.com/reservation/XXXX
   2) Beds24           -> iframe/booking page con parametri
                          ?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&numadult=2
   3) Lodgify          -> script embed + property ID
   4) Amenitiz         -> redirect a booking.amenitiz.io/{slug}
   5) WuBook / Zak     -> widget WooDoo o link diretto
   6) Vertical Booking -> URL con id struttura e date
   7) Booking Expert   -> widget o deep link

   In tutti i casi la strada più semplice è:
   - mantenere questa pagina come "pre-selettore" (date, ospiti);
   - passare i parametri al motore esterno con un deep link
     (vedi funzione buildEngineUrl in fondo al file).
   ========================================================= */
(function () {
  'use strict';

  var DDC = window.DDC || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var root = $('#booking-app');
  if (!root) return; // lo script gira solo su prenota.html

  /* ---------- Stato ---------- */
  var state = {
    step: 1,
    checkin: '',
    checkout: '',
    guests: 2,
    notes: '',
    roomId: null,
    extras: []
  };

  var ROOMS = [];

  /* ---------- Extra disponibili (dati dimostrativi) ----------
     price      = prezzo unitario
     perNight   = true  -> moltiplicato per il numero di notti
     perStay    = true  -> addebitato una volta sola
  ------------------------------------------------------------- */
  var EXTRAS = [
    { id: 'vino', name: 'Bottiglia di vino dei Berici in camera', desc: 'Selezionata dalla cantina partner, servita all’arrivo.', price: 22, perStay: true },
    { id: 'romantico', name: 'Allestimento romantico', desc: 'Fiori freschi, candele e frutta secca all’arrivo in camera.', price: 45, perStay: true },
    { id: 'late', name: 'Late check-out fino alle 14', desc: 'Soggetto a disponibilità, confermato la sera prima.', price: 30, perStay: true },
    { id: 'ebike', name: 'Noleggio e-bike', desc: 'Due biciclette elettriche, caschi e traccia GPS inclusi.', price: 30, perNight: true },
    { id: 'degustazione', name: 'Degustazione in cantina', desc: 'Due ore, cinque etichette, a otto chilometri dalla dimora.', price: 35, perStay: true },
    { id: 'picnic', name: 'Cesto da picnic per due', desc: 'Formaggi dei Berici, sopressa, pane e una bottiglia.', price: 45, perStay: true },
    { id: 'transfer', name: 'Transfer privato dalla stazione di Vicenza', desc: 'Andata e ritorno, orari concordati.', price: 60, perStay: true }
  ];

  /* =========================================================
     LOGICA DEMO DI PREZZO E DISPONIBILITÀ
     ---------------------------------------------------------
     Regole volutamente semplici, documentate e riproducibili:

     A) WEEKEND — venerdì e sabato costano di più.
        Si applica room.weekendSupplement per quelle notti.

     B) ALTA STAGIONE — +18% sul totale notte in:
        giugno, luglio, agosto, settembre
        e dal 20 al 31 dicembre.

     C) MINIMO NOTTI — la Suite Belvedere richiede 2 notti
        (campo minNights in rooms.json).

     D) DISPONIBILITÀ SIMULATA — regola deterministica, così
        la demo si comporta sempre allo stesso modo:
        - Camera Vigna non è prenotabile se l'arrivo è di martedì;
        - Suite Belvedere non è prenotabile se il giorno del mese
          dell'arrivo è divisibile per 9 (es. 9, 18, 27).
        In produzione questa funzione va sostituita dalla
        risposta reale del channel manager.
  ========================================================= */

  function isWeekendNight(date) {
    var d = date.getDay(); // 0 dom ... 5 ven, 6 sab
    return d === 5 || d === 6;
  }

  function isHighSeason(date) {
    var m = date.getMonth(); // 0-11
    var day = date.getDate();
    if (m >= 5 && m <= 8) return true;          // giugno → settembre
    if (m === 11 && day >= 20) return true;      // 20–31 dicembre
    return false;
  }

  function nightsList(checkin, checkout) {
    var list = [];
    var cur = new Date(checkin + 'T12:00:00');
    var end = new Date(checkout + 'T12:00:00');
    while (cur < end) {
      list.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return list;
  }

  /* Calcola il prezzo totale del soggiorno per una camera. */
  function priceForRoom(room, checkin, checkout) {
    var nights = nightsList(checkin, checkout);
    var total = 0;
    nights.forEach(function (night) {
      var n = room.basePrice;
      if (isWeekendNight(night)) n += room.weekendSupplement;   // regola A
      if (isHighSeason(night)) n = Math.round(n * 1.18);        // regola B
      total += n;
    });
    return { total: total, nights: nights.length, avg: Math.round(total / nights.length) };
  }

  /* Disponibilità simulata — regola D. */
  function availability(room, checkin, checkout) {
    var inDate = new Date(checkin + 'T12:00:00');
    var nights = nightsList(checkin, checkout).length;

    if (nights < (room.minNights || 1)) {
      return { ok: false, reason: 'Soggiorno minimo di ' + room.minNights + ' notti in questa camera.' };
    }
    if (room.id === 'vigna' && inDate.getDay() === 2) {
      return { ok: false, reason: 'Non disponibile con arrivo di martedì (dato dimostrativo).' };
    }
    if (room.id === 'belvedere' && inDate.getDate() % 9 === 0) {
      return { ok: false, reason: 'Già occupata per queste date (dato dimostrativo).' };
    }
    return { ok: true, reason: '' };
  }

  /* ---------- Calcolo extra ---------- */
  function extrasTotal(nights) {
    return state.extras.reduce(function (sum, id) {
      var x = EXTRAS.filter(function (e) { return e.id === id; })[0];
      if (!x) return sum;
      return sum + (x.perNight ? x.price * nights : x.price);
    }, 0);
  }

  /* ---------- Riepilogo ---------- */
  function currentRoom() {
    return ROOMS.filter(function (r) { return r.id === state.roomId; })[0] || null;
  }

  function updateSummary() {
    var box = $('#summary-body');
    if (!box) return;

    var room = currentRoom();
    var nights = (state.checkin && state.checkout) ? DDC.nightsBetween(state.checkin, state.checkout) : 0;
    var stayTotal = (room && nights > 0) ? priceForRoom(room, state.checkin, state.checkout).total : 0;
    var extras = nights > 0 ? extrasTotal(nights) : 0;
    var total = stayTotal + extras;

    var rows = '';
    rows += '<li><span>Arrivo</span><span>' + (state.checkin ? DDC.formatDateIT(state.checkin) : '—') + '</span></li>';
    rows += '<li><span>Partenza</span><span>' + (state.checkout ? DDC.formatDateIT(state.checkout) : '—') + '</span></li>';
    rows += '<li><span>Notti</span><span>' + (nights > 0 ? nights : '—') + '</span></li>';
    rows += '<li><span>Ospiti</span><span>' + state.guests + '</span></li>';
    rows += '<li><span>Camera</span><span>' + (room ? room.name : 'Da scegliere') + '</span></li>';
    if (room && nights > 0) {
      rows += '<li><span>Soggiorno</span><span>' + DDC.euro(stayTotal) + '</span></li>';
    }
    state.extras.forEach(function (id) {
      var x = EXTRAS.filter(function (e) { return e.id === id; })[0];
      if (!x) return;
      var val = x.perNight ? x.price * nights : x.price;
      rows += '<li><span>' + x.name + '</span><span>' + DDC.euro(val) + '</span></li>';
    });

    box.innerHTML =
      '<ul class="summary__list">' + rows + '</ul>' +
      '<div class="summary__total"><span>Totale indicativo</span><strong>' + DDC.euro(total) + '</strong></div>' +
      '<p class="note" style="margin-top:.8rem">Importi dimostrativi, colazione inclusa, tassa di soggiorno esclusa. ' +
      (room ? room.cancellation : 'Le condizioni di cancellazione dipendono dalla camera scelta.') + '</p>';
  }

  /* ---------- Navigazione fra i passaggi ---------- */
  function goToStep(n) {
    state.step = n;
    $$('.step-panel', root).forEach(function (p) {
      p.classList.toggle('is-active', parseInt(p.getAttribute('data-step'), 10) === n);
    });
    $$('.steps li', root).forEach(function (li) {
      var s = parseInt(li.getAttribute('data-step'), 10);
      li.setAttribute('aria-current', s === n ? 'step' : 'false');
      li.classList.toggle('is-done', s < n);
    });
    updateSummary();
    var heading = $('.step-panel.is-active h2', root);
    if (heading) heading.setAttribute('tabindex', '-1');
    if (heading) heading.focus({ preventScroll: true });
    window.scrollTo({ top: root.offsetTop - 90, behavior: 'smooth' });
    if (DDC.trackEvent) DDC.trackEvent('booking_step', { step: n });
  }

  /* ---------- STEP 1 — date e ospiti ---------- */
  function initStep1() {
    var form = $('#step1-form', root);
    var checkin = $('[name="checkin"]', form);
    var checkout = $('[name="checkout"]', form);
    var guests = $('[name="guests"]', form);
    var notes = $('[name="notes"]', form);
    var status = $('#step1-status', root);

    var min = DDC.todayISO();
    checkin.min = min;
    checkout.min = DDC.addDaysISO(min, 1);

    // Precompila da query string (arrivo dalla booking bar) o da localStorage
    var params = new URLSearchParams(window.location.search);
    var saved = DDC.store.get('ddc_search') || {};
    var pre = {
      checkin: params.get('checkin') || saved.checkin || '',
      checkout: params.get('checkout') || saved.checkout || '',
      guests: params.get('guests') || saved.guests || '2',
      room: params.get('room') || ''
    };
    if (pre.checkin && pre.checkin >= min) checkin.value = pre.checkin;
    if (pre.checkout && pre.checkout > min) checkout.value = pre.checkout;
    if (pre.guests) guests.value = pre.guests;
    if (pre.room) state.roomId = pre.room;

    checkin.addEventListener('change', function () {
      if (!checkin.value) return;
      var minOut = DDC.addDaysISO(checkin.value, 1);
      checkout.min = minOut;
      if (!checkout.value || checkout.value <= checkin.value) checkout.value = minOut;
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      var errs = [];
      if (!checkin.value) errs.push('Indica la data di arrivo.');
      if (!checkout.value) errs.push('Indica la data di partenza.');
      if (checkin.value && checkout.value && checkout.value <= checkin.value) errs.push('La partenza deve essere successiva all’arrivo.');
      if (checkin.value && checkin.value < DDC.todayISO()) errs.push('Non è possibile selezionare una data passata.');

      if (errs.length) {
        status.className = 'form-status form-status--err';
        status.textContent = errs.join(' ');
        checkin.focus();
        return;
      }

      state.checkin = checkin.value;
      state.checkout = checkout.value;
      state.guests = parseInt(guests.value, 10) || 2;
      state.notes = (notes.value || '').trim();
      DDC.store.set('ddc_search', { checkin: state.checkin, checkout: state.checkout, guests: String(state.guests), rooms: '1' });

      renderRooms();
      goToStep(2);
    });
  }

  /* ---------- STEP 2 — scelta camera ---------- */
  function renderRooms() {
    var list = $('#rooms-list', root);
    if (!list) return;
    var nights = DDC.nightsBetween(state.checkin, state.checkout);

    list.innerHTML = ROOMS.map(function (room) {
      var av = availability(room, state.checkin, state.checkout);
      var p = priceForRoom(room, state.checkin, state.checkout);
      var selected = state.roomId === room.id && av.ok;

      return '' +
        '<article class="room-option' + (av.ok ? '' : ' is-unavailable') + (selected ? ' is-selected' : '') + '" data-room="' + room.id + '">' +
        '  <div class="room-option__media"><img src="' + room.image + '" alt="' + room.alt + '" width="400" height="300" loading="lazy" decoding="async"></div>' +
        '  <div class="room-option__body">' +
        '    <h3 style="margin:0">' + room.name + '</h3>' +
        '    <ul class="card__meta"><li>' + room.guests + ' ospiti</li><li>' + room.bed + '</li><li>' + room.size + ' m²</li><li>' + room.view + '</li></ul>' +
        (av.ok
          ? '    <p class="room-option__price">' + DDC.euro(p.total) + ' <small>totale per ' + nights + (nights === 1 ? ' notte' : ' notti') + ' · media ' + DDC.euro(p.avg) + ' a notte</small></p>' +
            '    <p class="note">' + room.cancellation + ' Colazione inclusa.</p>' +
            '    <div class="card__actions"><button type="button" class="btn ' + (selected ? 'btn--terracotta' : 'btn--primary') + ' btn--sm" data-select="' + room.id + '">' + (selected ? 'Camera selezionata' : 'Seleziona questa camera') + '</button>' +
            '    <a class="btn btn--outline btn--sm" href="' + room.url + '">Vedi la camera</a></div>'
          : '    <p class="note" role="status"><strong>Non disponibile.</strong> ' + av.reason + '</p>' +
            '    <div class="card__actions"><a class="btn btn--outline btn--sm" href="' + room.url + '">Vedi la camera</a></div>'
        ) +
        '  </div>' +
        '</article>';
    }).join('');

    $$('[data-select]', list).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.roomId = btn.getAttribute('data-select');
        if (DDC.trackEvent) DDC.trackEvent('booking_select_room', { room: state.roomId });
        renderRooms();
        updateSummary();
        var next = $('#to-step3');
        if (next) { next.disabled = false; next.focus(); }
      });
    });

    var next = $('#to-step3');
    if (next) next.disabled = !currentRoom();
  }

  /* ---------- STEP 3 — extra ---------- */
  function renderExtras() {
    var box = $('#extras-list', root);
    if (!box) return;
    box.innerHTML = EXTRAS.map(function (x) {
      return '' +
        '<label class="extra">' +
        '  <input type="checkbox" value="' + x.id + '"' + (state.extras.indexOf(x.id) > -1 ? ' checked' : '') + '>' +
        '  <span><span class="extra__name">' + x.name + '</span><br><span class="extra__desc">' + x.desc + '</span></span>' +
        '  <span class="extra__price">' + DDC.euro(x.price) + (x.perNight ? ' <small style="font-size:.7rem">/notte</small>' : '') + '</span>' +
        '</label>';
    }).join('');

    $$('input[type="checkbox"]', box).forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = cb.value;
        var i = state.extras.indexOf(id);
        if (cb.checked && i === -1) {
          state.extras.push(id);
          if (DDC.trackEvent) DDC.trackEvent('booking_add_extra', { extra: id });
        }
        if (!cb.checked && i > -1) state.extras.splice(i, 1);
        updateSummary();
      });
    });
  }

  /* ---------- STEP 4 — riepilogo e invio demo ---------- */
  function renderRecap() {
    var box = $('#recap-body', root);
    if (!box) return;
    var room = currentRoom();
    var nights = DDC.nightsBetween(state.checkin, state.checkout);
    if (!room || nights <= 0) { box.innerHTML = '<p>Completa i passaggi precedenti.</p>'; return; }

    var p = priceForRoom(room, state.checkin, state.checkout);
    var ex = extrasTotal(nights);

    var extraRows = state.extras.map(function (id) {
      var x = EXTRAS.filter(function (e) { return e.id === id; })[0];
      if (!x) return '';
      var val = x.perNight ? x.price * nights : x.price;
      return '<tr><th scope="row">' + x.name + '</th><td>' + DDC.euro(val) + '</td></tr>';
    }).join('');

    box.innerHTML =
      '<div class="table-wrap"><table class="spec-table">' +
      '<tr><th scope="row">Arrivo</th><td>' + DDC.formatDateIT(state.checkin) + ', dalle 15:00</td></tr>' +
      '<tr><th scope="row">Partenza</th><td>' + DDC.formatDateIT(state.checkout) + ', entro le 10:30</td></tr>' +
      '<tr><th scope="row">Notti</th><td>' + nights + '</td></tr>' +
      '<tr><th scope="row">Ospiti</th><td>' + state.guests + '</td></tr>' +
      '<tr><th scope="row">Camera</th><td>' + room.name + ' — ' + room.bed + ', ' + room.size + ' m²</td></tr>' +
      '<tr><th scope="row">Soggiorno</th><td>' + DDC.euro(p.total) + ' (media ' + DDC.euro(p.avg) + ' a notte)</td></tr>' +
      extraRows +
      (ex ? '<tr><th scope="row">Totale extra</th><td>' + DDC.euro(ex) + '</td></tr>' : '') +
      '<tr><th scope="row">Totale indicativo</th><td><strong>' + DDC.euro(p.total + ex) + '</strong></td></tr>' +
      (state.notes ? '<tr><th scope="row">Note</th><td>' + state.notes.replace(/[<>]/g, '') + '</td></tr>' : '') +
      '</table></div>' +
      '<p class="note" style="margin-top:1rem">' + room.cancellation + ' Colazione inclusa. Tassa di soggiorno da versare in struttura. ' +
      'Tutti gli importi sono dimostrativi.</p>';
  }

  /* Costruisce il deep link verso un motore esterno.
     Sostituire ENGINE_BASE con l'URL fornito dal proprio PMS.
     Esempi reali:
       Beds24:   https://beds24.com/booking2.php?propid=00000
       Cloudbeds: https://hotels.cloudbeds.com/reservation/XXXXX
       Amenitiz: https://booking.amenitiz.io/nome-struttura   */
  function buildEngineUrl() {
    var ENGINE_BASE = '#'; // <-- DA SOSTITUIRE prima della pubblicazione
    if (ENGINE_BASE === '#') return null;
    return ENGINE_BASE +
      '?checkin=' + encodeURIComponent(state.checkin) +
      '&checkout=' + encodeURIComponent(state.checkout) +
      '&adults=' + encodeURIComponent(state.guests) +
      '&room=' + encodeURIComponent(state.roomId || '');
  }

  function initFinalActions() {
    var sendBtn = $('#send-request');
    var engineBtn = $('#go-engine');
    var status = $('#final-status');

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        if (DDC.trackEvent) DDC.trackEvent('booking_request_submit', { room: state.roomId, extras: state.extras.join(',') });
        status.className = 'form-status form-status--ok';
        status.textContent = 'Richiesta registrata in locale. Questa è una demo: nessun dato è stato inviato, nessuna email è partita e nessun pagamento è stato effettuato. In un sito reale la struttura riceverebbe ora la richiesta e risponderebbe con la conferma.';
        status.focus && status.focus();
      });
    }

    if (engineBtn) {
      engineBtn.addEventListener('click', function () {
        var url = buildEngineUrl();
        if (!url) {
          status.className = 'form-status form-status--err';
          status.textContent = 'Nessun booking engine collegato in questa demo. In produzione questo pulsante porta al motore di prenotazione della struttura (Cloudbeds, Beds24, Lodgify, Amenitiz, WuBook, Vertical Booking o Booking Expert), già precompilato con date, ospiti e camera.';
          return;
        }
        window.location.href = url;
      });
    }
  }

  /* ---------- Bottoni avanti / indietro ---------- */
  function initNav() {
    $$('[data-goto]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = parseInt(btn.getAttribute('data-goto'), 10);
        if (target === 3) renderExtras();
        if (target === 4) renderRecap();
        goToStep(target);
      });
    });
  }

  /* ---------- Avvio ---------- */
  function boot(data) {
    ROOMS = data || (window.DDC_FALLBACK ? window.DDC_FALLBACK.rooms : []);
    if (!ROOMS.length) {
      root.innerHTML = '<p class="form-status form-status--err">Non è stato possibile caricare i dati delle camere. Verifica il file assets/data/rooms.json.</p>';
      return;
    }
    initStep1();
    initNav();
    initFinalActions();
    updateSummary();

    // Se si arriva da una pagina camera con ?room=... e date già salvate,
    // si può saltare direttamente al passaggio 2.
    var params = new URLSearchParams(window.location.search);
    if (params.get('checkin') && params.get('checkout')) {
      var f = $('#step1-form', root);
      if (f) f.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (DDC.loadData) {
      DDC.loadData('assets/data/rooms.json', 'rooms').then(boot);
    } else {
      boot(null);
    }
  });

})();
