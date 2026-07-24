/* =========================================================
   DIMORA DEI COLLI — rooms.js
   1) Dati di fallback (identici ai file in assets/data/)
      necessari per far funzionare il sito anche aprendo
      index.html con doppio clic (protocollo file://),
      dove fetch() dei JSON viene bloccato dal browser.
   2) Rendering delle card camere / esperienze / recensioni
      nei contenitori che espongono data-render.

   PER MODIFICARE I DATI: aggiornare PRIMA i file JSON in
   assets/data/ e poi replicare qui sotto. Sono la stessa
   struttura, campo per campo.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. FALLBACK DATI ---------- */
  window.DDC_FALLBACK = {
    rooms: [
      {
        id: 'olivo',
        name: 'Camera Olivo',
        url: 'camera-olivo.html',
        image: 'assets/img/camera-olivo.svg',
        alt: 'Camera Olivo: letto matrimoniale con testiera in legno e finestra sul giardino',
        teaser: 'La camera più tranquilla della casa, affacciata sul giardino e sugli ulivi che il nonno di Anna piantò negli anni Sessanta.',
        guests: 2,
        bed: 'Matrimoniale 160×200',
        size: 22,
        view: 'Giardino e uliveto',
        floor: 'Piano terra',
        bathroom: 'Bagno privato con doccia',
        features: ['Ingresso indipendente dal giardino', 'Scrittoio in noce', 'Bollitore e tè sfusi', 'Aria condizionata'],
        basePrice: 135,
        weekendSupplement: 25,
        minNights: 1,
        cancellation: 'Cancellazione gratuita fino a 7 giorni prima dell’arrivo.'
      },
      {
        id: 'vigna',
        name: 'Camera Vigna',
        url: 'camera-vigna.html',
        image: 'assets/img/camera-vigna.svg',
        alt: 'Camera Vigna: letto queen size e piccolo balcone affacciato sui filari',
        teaser: 'Un piccolo balcone sui filari: al mattino si fa colazione guardando il lavoro nei vigneti, in autunno si sente la vendemmia.',
        guests: 2,
        bed: 'Queen size 180×200',
        size: 24,
        view: 'Vigneti a sud',
        floor: 'Primo piano',
        bathroom: 'Bagno privato con doccia a filo pavimento',
        features: ['Balcone con due sedute', 'Armadio a muro restaurato', 'Tende oscuranti', 'Aria condizionata'],
        basePrice: 149,
        weekendSupplement: 25,
        minNights: 1,
        cancellation: 'Cancellazione gratuita fino a 7 giorni prima dell’arrivo.'
      },
      {
        id: 'lavanda',
        name: 'Camera Lavanda',
        url: 'camera-lavanda.html',
        image: 'assets/img/camera-lavanda.svg',
        alt: 'Camera Lavanda: ambiente romantico con doccia ampia e tessuti chiari',
        teaser: 'La più raccolta e la più richiesta dalle coppie: tessuti chiari, luce calda e una doccia ampia in pietra di Vicenza.',
        guests: 2,
        bed: 'Matrimoniale 160×200',
        size: 20,
        view: 'Corte interna e colli',
        floor: 'Primo piano',
        bathroom: 'Bagno privato con doccia ampia in pietra',
        features: ['Illuminazione regolabile', 'Poltroncina di lettura', 'Set cortesia artigianale', 'Aria condizionata'],
        basePrice: 129,
        weekendSupplement: 20,
        minNights: 1,
        cancellation: 'Cancellazione gratuita fino a 7 giorni prima dell’arrivo.'
      },
      {
        id: 'belvedere',
        name: 'Suite Belvedere',
        url: 'suite-belvedere.html',
        image: 'assets/img/suite-belvedere.svg',
        alt: 'Suite Belvedere: zona soggiorno e terrazza privata con vista sui Colli Berici',
        teaser: 'Trentacinque metri quadrati con zona soggiorno e terrazza privata: la stanza da cui si vedono i Berici cambiare colore.',
        guests: 2,
        bed: 'Matrimoniale 180×200',
        size: 35,
        view: 'Panoramica sui Colli Berici',
        floor: 'Secondo piano',
        bathroom: 'Bagno privato con vasca freestanding e doccia',
        features: ['Terrazza privata 12 m²', 'Zona soggiorno con divano', 'Macchina da caffè', 'Aria condizionata e travi a vista'],
        basePrice: 210,
        weekendSupplement: 35,
        minNights: 2,
        cancellation: 'Cancellazione gratuita fino a 14 giorni prima dell’arrivo.'
      }
    ],

    experiences: [
      {
        id: 'degustazione',
        name: 'Degustazione in cantina',
        image: 'assets/img/esperienza-cantina.svg',
        alt: 'Bicchieri e bottiglie durante una degustazione in cantina',
        desc: 'Visita guidata e assaggio di cinque etichette in una cantina di famiglia a otto chilometri dalla dimora. Si arriva in auto o con transfer.',
        duration: '2 ore',
        price: 35,
        priceLabel: '35 € a persona',
        season: 'Tutto l’anno, su prenotazione',
        partner: 'Cantina Ai Filari (partner dimostrativo)',
        booking: 'Su richiesta, almeno 48 ore prima'
      },
      {
        id: 'ebike',
        name: 'Tour in e-bike sui Berici',
        image: 'assets/img/esperienza-ebike.svg',
        alt: 'Bicicletta elettrica appoggiata a un muretto tra i vigneti',
        desc: 'Anello di 32 chilometri tra creste, borghi e strade bianche. Consegniamo bici, caschi e una traccia GPS già pronta sul telefono.',
        duration: 'Mezza giornata',
        price: 30,
        priceLabel: '30 € a bici, mezza giornata',
        season: 'Marzo – novembre',
        partner: 'Noleggio interno',
        booking: 'Su richiesta, anche il giorno prima'
      },
      {
        id: 'picnic',
        name: 'Picnic tra gli ulivi',
        image: 'assets/img/esperienza-picnic.svg',
        alt: 'Cesto da picnic con plaid appoggiato sull’erba tra gli ulivi',
        desc: 'Cesto preparato al mattino con formaggi dei Berici, sopressa, pane e una bottiglia. Plaid e tavolino pieghevole inclusi.',
        duration: 'A piacere',
        price: 45,
        priceLabel: '45 € per due persone',
        season: 'Aprile – ottobre',
        partner: 'Bottega di Barbarano (partner dimostrativo)',
        booking: 'Su richiesta entro le 18 del giorno prima'
      },
      {
        id: 'ville',
        name: 'Itinerario nelle ville venete',
        image: 'assets/img/esperienza-ville.svg',
        alt: 'Colonnato di una villa palladiana',
        desc: 'Mezza giornata tra La Rotonda, Villa Valmarana ai Nani e una villa minore poco frequentata. Prepariamo orari, biglietti e parcheggi.',
        duration: '4 ore',
        price: 0,
        priceLabel: 'Itinerario gratuito, ingressi esclusi',
        season: 'Tutto l’anno',
        partner: 'Curato dai gestori',
        booking: 'Su richiesta al momento della prenotazione'
      },
      {
        id: 'cena',
        name: 'Cena romantica presso ristorante partner',
        image: 'assets/img/esperienza-cena.svg',
        alt: 'Tavolo apparecchiato per due con candela',
        desc: 'Tavolo riservato in un ristorante a chilometro zero a dieci minuti d’auto. Menù di quattro portate, vini dei Berici in abbinamento.',
        duration: 'Serata',
        price: 65,
        priceLabel: 'da 65 € a persona',
        season: 'Tutto l’anno, chiuso il martedì',
        partner: 'Osteria del Pozzo (partner dimostrativo)',
        booking: 'Su richiesta, almeno 24 ore prima'
      },
      {
        id: 'benessere',
        name: 'Massaggio in camera',
        image: 'assets/img/esperienza-benessere.svg',
        alt: 'Oli essenziali e asciugamani arrotolati',
        desc: 'Trattamento rilassante di cinquanta minuti eseguito in camera da una massaggiatrice della zona. Lettino e oli portati da lei.',
        duration: '50 minuti',
        price: 70,
        priceLabel: '70 € a persona',
        season: 'Tutto l’anno',
        partner: 'Professionista locale (partner dimostrativo)',
        booking: 'Su richiesta, almeno 24 ore prima'
      },
      {
        id: 'cucina',
        name: 'Corso di cucina veneta',
        image: 'assets/img/esperienza-cucina.svg',
        alt: 'Mani che stendono la pasta su un tagliere infarinato',
        desc: 'Tre ore in cucina con Anna: bigoli tirati al torchio, baccalà alla vicentina e una torta di mandorle. Si cena con quello che si è preparato.',
        duration: '3 ore',
        price: 85,
        priceLabel: '85 € a persona, minimo 2',
        season: 'Ottobre – aprile',
        partner: 'Cucina della dimora',
        booking: 'Su richiesta, almeno 3 giorni prima'
      },
      {
        id: 'transfer',
        name: 'Transfer privato',
        image: 'assets/img/esperienza-transfer.svg',
        alt: 'Auto scura parcheggiata davanti a un muro in pietra',
        desc: 'Da e per la stazione di Vicenza, gli aeroporti di Venezia e Verona o le cantine, per chi arriva senza automobile.',
        duration: 'Variabile',
        price: 35,
        priceLabel: 'da 35 € a tratta',
        season: 'Tutto l’anno',
        partner: 'NCC convenzionato (partner dimostrativo)',
        booking: 'Su richiesta, almeno 48 ore prima'
      }
    ],

    reviews: [
      {
        name: 'Elena e Marco',
        from: 'Milano',
        trip: 'Weekend di coppia',
        rating: 5,
        text: 'Siamo arrivati tardi, di venerdì, e ci hanno lasciato la luce accesa e due bicchieri sul tavolo della cucina. La mattina dopo la torta era ancora calda. Non serve altro.',
        source: 'Recensione dimostrativa'
      },
      {
        name: 'Familie Berger',
        from: 'Monaco di Baviera',
        trip: 'Vacanza in bicicletta',
        rating: 5,
        text: 'Le e-bike erano già cariche e la traccia GPS pronta sul telefono. Ci hanno consigliato una strada che non avremmo mai trovato da soli.',
        source: 'Recensione dimostrativa'
      },
      {
        name: 'Giulia R.',
        from: 'Bologna',
        trip: 'Anniversario',
        rating: 5,
        text: 'La Suite Belvedere vale il supplemento: la terrazza al tramonto è il motivo per cui siamo rimasti una notte in più.',
        source: 'Recensione dimostrativa'
      },
      {
        name: 'Pierre & Camille',
        from: 'Lione',
        trip: 'Viaggio enogastronomico',
        rating: 4,
        text: 'Colazione eccellente e cantine consigliate perfette. Unica nota: la strada di accesso è stretta, meglio arrivare con luce.',
        source: 'Recensione dimostrativa'
      },
      {
        name: 'Stefano D.',
        from: 'Padova',
        trip: 'Fuga infrasettimanale',
        rating: 5,
        text: 'A quaranta minuti da casa e sembrava di essere altrove. Silenzio vero la sera, solo grilli e qualche campana.',
        source: 'Recensione dimostrativa'
      },
      {
        name: 'Anna e Luca',
        from: 'Trieste',
        trip: 'Weekend lento',
        rating: 5,
        text: 'Ci hanno preparato un itinerario su misura, con orari e parcheggi. Abbiamo visto tre ville senza mai fare una coda.',
        source: 'Recensione dimostrativa'
      }
    ]
  };

  /* ---------- 2. RENDERING ---------- */
  var DDC = window.DDC || {};
  function euro(n) { return DDC.euro ? DDC.euro(n) : n + ' €'; }

  function roomCard(room) {
    return '' +
      '<article class="card" data-reveal>' +
      '  <a class="card__media" href="' + room.url + '" aria-label="Scopri ' + room.name + '">' +
      '    <img src="' + room.image + '" alt="' + room.alt + '" width="800" height="600" loading="lazy" decoding="async">' +
      '  </a>' +
      '  <div class="card__body">' +
      '    <h3 class="card__title"><a href="' + room.url + '" style="text-decoration:none">' + room.name + '</a></h3>' +
      '    <ul class="card__meta">' +
      '      <li>' + room.guests + ' ospiti</li>' +
      '      <li>' + room.bed + '</li>' +
      '      <li>' + room.size + ' m²</li>' +
      '      <li>' + room.view + '</li>' +
      '    </ul>' +
      '    <p class="card__text">' + room.teaser + '</p>' +
      '    <p class="card__price">Tariffe indicative a partire da <strong>' + euro(room.basePrice) + '</strong> per notte, colazione inclusa.</p>' +
      '    <div class="card__actions">' +
      '      <a class="btn btn--outline btn--sm" href="' + room.url + '">Dettagli camera</a>' +
      '      <a class="btn btn--primary btn--sm" href="prenota.html?room=' + room.id + '" data-track="cta_prenota_camera">Verifica disponibilità</a>' +
      '    </div>' +
      '  </div>' +
      '</article>';
  }

  function experienceCard(x) {
    return '' +
      '<article class="card" data-reveal>' +
      '  <div class="card__media"><img src="' + x.image + '" alt="' + x.alt + '" width="800" height="600" loading="lazy" decoding="async"></div>' +
      '  <div class="card__body">' +
      '    <h3 class="card__title">' + x.name + '</h3>' +
      '    <ul class="card__meta"><li>' + x.duration + '</li><li>' + x.season + '</li></ul>' +
      '    <p class="card__text">' + x.desc + '</p>' +
      '    <p class="card__price"><strong>' + x.priceLabel + '</strong><br><span class="note">' + x.booking + '</span></p>' +
      '    <div class="card__actions"><a class="btn btn--outline btn--sm" href="contatti.html?esperienza=' + x.id + '" data-track="cta_esperienza">Richiedi</a></div>' +
      '  </div>' +
      '</article>';
  }

  function reviewCard(r) {
    var stars = '';
    for (var i = 0; i < 5; i++) stars += i < r.rating ? '★' : '☆';
    return '' +
      '<article class="review" data-reveal>' +
      '  <p class="review__stars" aria-label="Valutazione ' + r.rating + ' su 5">' + stars + '</p>' +
      '  <p class="review__text">«' + r.text + '»</p>' +
      '  <p class="review__meta">' + r.name + ' — ' + r.from + ' · ' + r.trip + '<br>' +
      '     <span class="review__source">' + r.source + '</span></p>' +
      '</article>';
  }

  function render(container, items, fn, limit) {
    var list = limit ? items.slice(0, limit) : items;
    container.innerHTML = list.map(fn).join('');
    // riattiva il reveal sugli elementi appena inseriti
    if (window.IntersectionObserver && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, { threshold: 0.08 });
      Array.prototype.forEach.call(container.querySelectorAll('[data-reveal]'), function (el) { io.observe(el); });
    } else {
      Array.prototype.forEach.call(container.querySelectorAll('[data-reveal]'), function (el) { el.classList.add('is-visible'); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var roomsBox = document.querySelector('[data-render="rooms"]');
    var expBox = document.querySelector('[data-render="experiences"]');
    var revBox = document.querySelector('[data-render="reviews"]');

    if (roomsBox && DDC.loadData) {
      DDC.loadData('assets/data/rooms.json', 'rooms').then(function (data) {
        if (data) render(roomsBox, data, roomCard, parseInt(roomsBox.getAttribute('data-limit') || '0', 10) || 0);
      });
    }
    if (expBox && DDC.loadData) {
      DDC.loadData('assets/data/experiences.json', 'experiences').then(function (data) {
        if (data) render(expBox, data, experienceCard, parseInt(expBox.getAttribute('data-limit') || '0', 10) || 0);
      });
    }
    if (revBox && DDC.loadData) {
      DDC.loadData('assets/data/reviews.json', 'reviews').then(function (data) {
        if (data) render(revBox, data, reviewCard, parseInt(revBox.getAttribute('data-limit') || '0', 10) || 0);
      });
    }
  });

})();
