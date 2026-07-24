/* =========================================================
   DIMORA DEI COLLI — main.js
   Comportamenti globali: navigazione, header, reveal,
   accordion, gallery, form, booking bar, i18n, tracking.
   JavaScript vanilla, nessuna dipendenza, caricato con defer.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. TRACKING — funzione generica di eventi
     ---------------------------------------------------------
     Oggi scrive solo in console (se DDC.debug === true).
     Per collegare GA4 in futuro:
       1) inserire il tag gtag.js nell'<head> DOPO il consenso;
       2) sostituire il corpo di trackEvent con:
          if (typeof gtag === 'function') gtag('event', name, data);
     Per Matomo:
          if (window._paq) _paq.push(['trackEvent', 'B&B', name, JSON.stringify(data)]);
     Nessun tracciamento è attivo di default: nessun cookie
     non essenziale viene scritto da questo sito.
  --------------------------------------------------------- */
  var DDC = window.DDC = window.DDC || {};
  DDC.debug = false; // impostare true in sviluppo per vedere gli eventi

  function trackEvent(eventName, eventData) {
    var payload = eventData || {};
    if (DDC.debug && window.console) {
      console.info('[trackEvent]', eventName, payload);
    }
    // Hook futuro GA4 / Matomo / Meta Pixel — DISATTIVATO di default.
    // if (typeof gtag === 'function') { gtag('event', eventName, payload); }
  }
  DDC.trackEvent = trackEvent;

  /* ---------------------------------------------------------
     2. UTILITY
  --------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  DDC.$ = $; DDC.$$ = $$;

  function todayISO() {
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  }
  function addDaysISO(iso, days) {
    var d = new Date(iso + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function nightsBetween(a, b) {
    var d1 = new Date(a + 'T12:00:00'), d2 = new Date(b + 'T12:00:00');
    return Math.round((d2 - d1) / 86400000);
  }
  function formatDateIT(iso) {
    if (!iso) return '—';
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
  }
  function euro(n) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  }
  DDC.todayISO = todayISO;
  DDC.addDaysISO = addDaysISO;
  DDC.nightsBetween = nightsBetween;
  DDC.formatDateIT = formatDateIT;
  DDC.euro = euro;

  /* Carica un JSON con fallback integrato.
     Motivo: aprendo il sito con doppio clic (protocollo file://)
     fetch() viene bloccato dal browser. In quel caso usiamo i dati
     replicati in assets/js/rooms.js (window.DDC_FALLBACK). */
  function loadData(path, fallbackKey) {
    var fallback = (window.DDC_FALLBACK || {})[fallbackKey];
    if (location.protocol === 'file:') {
      return Promise.resolve(fallback || null);
    }
    return fetch(path, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch(function () { return fallback || null; });
  }
  DDC.loadData = loadData;

  /* Storage sicuro (alcuni browser bloccano localStorage su file://) */
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* no-op */ } }
  };
  DDC.store = store;

  /* ---------------------------------------------------------
     3. HEADER — compattamento allo scroll
  --------------------------------------------------------- */
  var header = $('.site-header');
  if (header) {
    var lastState = false;
    var onScroll = function () {
      var scrolled = window.scrollY > 24;
      if (scrolled !== lastState) {
        header.classList.toggle('is-scrolled', scrolled);
        lastState = scrolled;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     4. MENU MOBILE accessibile
  --------------------------------------------------------- */
  var navToggle = $('.nav-toggle');
  var nav = $('.nav');
  if (navToggle && nav) {
    var closeNav = function (focusToggle) {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (focusToggle) navToggle.focus();
    };
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      if (open) { closeNav(false); return; }
      nav.classList.add('nav--open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = $('.nav__link', nav);
      if (first) first.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') closeNav(true);
    });
    $$('.nav__link', nav).forEach(function (a) {
      a.addEventListener('click', function () { closeNav(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && navToggle.getAttribute('aria-expanded') === 'true') closeNav(false);
    });
  }

  /* ---------------------------------------------------------
     5. REVEAL leggero al primo ingresso in viewport
  --------------------------------------------------------- */
  var revealables = $$('[data-reveal]');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------------------------------------------------------
     6. ACCORDION FAQ
  --------------------------------------------------------- */
  $$('.accordion__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) panel.classList.toggle('is-open', !open);
      if (!open) trackEvent('faq_open', { question: btn.textContent.trim().slice(0, 60) });
    });
  });

  /* ---------------------------------------------------------
     7. GALLERY camere (thumb -> immagine principale)
  --------------------------------------------------------- */
  $$('.gallery').forEach(function (gallery) {
    var main = $('.gallery__main img', gallery);
    if (!main) return;
    $$('.gallery__thumb', gallery).forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var img = $('img', thumb);
        if (!img) return;
        main.src = img.getAttribute('data-full') || img.src;
        main.alt = img.alt;
        $$('.gallery__thumb', gallery).forEach(function (t) { t.setAttribute('aria-current', 'false'); });
        thumb.setAttribute('aria-current', 'true');
      });
    });
  });

  /* ---------------------------------------------------------
     8. BOOKING BAR — validazione e passaggio parametri
     I valori vengono salvati in localStorage e passati in query
     string a prenota.html, dove il booking demo li riprende.
  --------------------------------------------------------- */
  function setupBookingBar(form) {
    var checkin = $('[name="checkin"]', form);
    var checkout = $('[name="checkout"]', form);
    var guests = $('[name="guests"]', form);
    var rooms = $('[name="rooms"]', form);
    var status = $('.form-status', form);

    var min = todayISO();
    if (checkin) { checkin.min = min; }
    if (checkout) { checkout.min = addDaysISO(min, 1); }

    // Ripristina eventuali selezioni precedenti
    var saved = store.get('ddc_search');
    if (saved) {
      if (checkin && saved.checkin && saved.checkin >= min) checkin.value = saved.checkin;
      if (checkout && saved.checkout && saved.checkout > min) checkout.value = saved.checkout;
      if (guests && saved.guests) guests.value = saved.guests;
      if (rooms && saved.rooms) rooms.value = saved.rooms;
    }

    if (checkin) {
      checkin.addEventListener('change', function () {
        if (!checkin.value) return;
        var minOut = addDaysISO(checkin.value, 1);
        if (checkout) {
          checkout.min = minOut;
          if (!checkout.value || checkout.value <= checkin.value) checkout.value = minOut;
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form-status'; }

      var errors = [];
      if (!checkin || !checkin.value) errors.push('Indica la data di arrivo.');
      if (!checkout || !checkout.value) errors.push('Indica la data di partenza.');
      if (checkin && checkout && checkin.value && checkout.value && checkout.value <= checkin.value) {
        errors.push('La partenza deve essere successiva all’arrivo.');
      }
      if (checkin && checkin.value && checkin.value < todayISO()) {
        errors.push('Non è possibile selezionare una data passata.');
      }

      if (errors.length) {
        if (status) {
          status.className = 'form-status form-status--err';
          status.textContent = errors.join(' ');
        }
        if (checkin) checkin.focus();
        return;
      }

      var data = {
        checkin: checkin.value,
        checkout: checkout.value,
        guests: guests ? guests.value : '2',
        rooms: rooms ? rooms.value : '1'
      };
      store.set('ddc_search', data);
      trackEvent('booking_bar_submit', data);

      var qs = 'checkin=' + encodeURIComponent(data.checkin) +
               '&checkout=' + encodeURIComponent(data.checkout) +
               '&guests=' + encodeURIComponent(data.guests) +
               '&rooms=' + encodeURIComponent(data.rooms);
      var base = form.getAttribute('data-target') || 'prenota.html';
      window.location.href = base + '?' + qs;
    });
  }
  $$('.booking-bar__form').forEach(setupBookingBar);

  /* ---------------------------------------------------------
     9. FORM DI CONTATTO / RICHIESTA — validazione + conferma demo
     ---------------------------------------------------------
     NESSUN dato viene inviato a un server: è una demo.
     Per attivarlo davvero, tre strade:
       a) Formspree  -> <form action="https://formspree.io/f/XXXX" method="POST">
                        e rimuovere e.preventDefault();
       b) Netlify Forms -> aggiungere netlify e name="contatti" al <form>;
       c) backend proprio -> fetch('/api/contatti', {method:'POST', body:new FormData(form)}).
     Ricordarsi di aggiungere honeypot/antispam e informativa privacy.
  --------------------------------------------------------- */
  $$('form[data-demo-form]').forEach(function (form) {
    var status = $('.form-status', form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = null;
      var messages = [];

      $$('[data-required]', form).forEach(function (input) {
        var wrap = input.closest('.field');
        var errEl = wrap ? $('.field__error', wrap) : null;
        var value = (input.value || '').trim();
        var msg = '';

        if (!value) {
          msg = 'Campo obbligatorio.';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          msg = 'Inserisci un indirizzo email valido.';
        } else if (input.type === 'tel' && !/^[+0-9\s().-]{6,}$/.test(value)) {
          msg = 'Inserisci un numero di telefono valido.';
        } else if (input.type === 'checkbox' && !input.checked) {
          msg = 'È necessario il consenso per procedere.';
        }

        if (input.type === 'checkbox' && !input.checked) msg = 'È necessario il consenso per procedere.';

        if (wrap) wrap.classList.toggle('field--error', !!msg);
        if (errEl) errEl.textContent = msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (msg) {
          messages.push(msg);
          if (!invalid) invalid = input;
        }
      });

      if (invalid) {
        if (status) {
          status.className = 'form-status form-status--err';
          status.textContent = 'Controlla i campi evidenziati: alcune informazioni mancano o non sono valide.';
        }
        invalid.focus();
        return;
      }

      trackEvent('form_submit_demo', { form: form.getAttribute('name') || 'contatti' });

      if (status) {
        status.className = 'form-status form-status--ok';
        status.textContent = 'Richiesta registrata. Questa è una demo: nessun dato è stato inviato e nessuna email è partita. In un sito reale riceveresti conferma entro poche ore.';
      }
      form.reset();
      if (status) status.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  /* ---------------------------------------------------------
     10. TRACKING dei click principali
  --------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (el.hasAttribute('data-track')) {
      trackEvent(el.getAttribute('data-track'), { label: el.textContent.trim().slice(0, 60) });
    }
    if (href.indexOf('tel:') === 0) trackEvent('click_telefono', { value: href });
    if (href.indexOf('mailto:') === 0) trackEvent('click_email', { value: href });
    if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp') > -1) trackEvent('click_whatsapp', {});
  });

  /* ---------------------------------------------------------
     11. i18n MINIMALE IT / EN
     ---------------------------------------------------------
     Traducono gli elementi con attributo data-i18n.
     La versione italiana è quella completa e nativa.
     L'inglese copre navigazione, hero, booking bar, CTA e le
     etichette principali: è un'impalcatura pronta per essere
     estesa duplicando le pagine in /en/ oppure ampliando
     l'oggetto DICT qui sotto.
  --------------------------------------------------------- */
  var DICT = {
    en: {
      'nav.home': 'Home',
      'nav.rooms': 'Rooms',
      'nav.experiences': 'Experiences',
      'nav.offers': 'Offers',
      'nav.area': 'The area',
      'nav.about': 'The house',
      'nav.contact': 'Contact',
      'nav.book': 'Book',
      'cta.check': 'Check availability',
      'cta.discover': 'Discover the house',
      'cta.details': 'Details',
      'cta.request': 'Send request',
      'bar.checkin': 'Check-in',
      'bar.checkout': 'Check-out',
      'bar.guests': 'Guests',
      'bar.rooms': 'Rooms',
      'hero.place': 'Colli Berici · Vicenza',
      'hero.title': 'Your retreat in the Venetian hills',
      'hero.sub': 'Four rooms, homemade breakfasts and slow days among vineyards, Venetian villas and small towns.',
      'hero.direct': 'Book on our site: more flexible conditions and a local experience included.',
      'trust.rating': 'Demo rating',
      'trust.reviews': 'demo reviews',
      'trust.parking': 'Private parking',
      'trust.breakfast': 'Breakfast included',
      'trust.secure': 'Secure booking',
      'trust.support': 'Direct assistance',
      'section.rooms': 'Our four rooms',
      'section.experiences': 'Experiences',
      'section.offers': 'Packages',
      'section.area': 'The area',
      'section.reviews': 'Guest words',
      'section.faq': 'Frequently asked questions',
      'book.step1': 'Dates and guests',
      'book.step2': 'Room',
      'book.step3': 'Extras',
      'book.step4': 'Summary',
      'book.next': 'Continue',
      'book.back': 'Back',
      'book.total': 'Total',
      'book.demo': 'This is a demo. No payment will be taken.',
      'footer.legal': 'Demo website — data and images are placeholders.'
    }
  };

  function applyLang(lang) {
    var dict = DICT[lang];
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!el.hasAttribute('data-i18n-it')) {
        el.setAttribute('data-i18n-it', el.textContent);
      }
      if (lang === 'it') {
        el.textContent = el.getAttribute('data-i18n-it');
      } else if (dict && dict[key]) {
        el.textContent = dict[key];
      }
    });
    document.documentElement.lang = lang;
    $$('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    store.set('ddc_lang', lang);
  }

  $$('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      applyLang(lang);
      trackEvent('lang_switch', { lang: lang });
    });
  });

  var savedLang = store.get('ddc_lang');
  if (savedLang === 'en') applyLang('en');

  /* ---------------------------------------------------------
     12. Anno corrente nel footer
  --------------------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------------------------------------------------------
     13. PROTEZIONE DEMO — deterrente anti-copia
     ---------------------------------------------------------
     NOTA ONESTA: nessun sito può nascondere davvero HTML/CSS —
     il browser deve scaricarli per mostrarli. Questi sono
     DETERRENTI: fermano il copia-incolla pigro (tasto destro,
     salva pagina, visualizza sorgente, ispeziona) e lasciano
     un watermark. Un tecnico determinato li aggira; la maggior
     parte delle persone no. La protezione vera resta:
     accesso con password + noindex + copyright legale.

     Per DISATTIVARE (es. quando diventa il sito reale del
     cliente) basta impostare qui sotto:  DDC.protect = false;
  --------------------------------------------------------- */
  // Demo pubblica di portfolio: nessun blocco anti-copia (tasto destro/F12 restano liberi).
  // Per riattivare i deterrenti su una demo PRIVATA, impostare: DDC.protect = true;
  DDC.protect = (DDC.protect === true);

  (function protezioneDemo() {
    if (!DDC.protect) return;

    // Watermark nel codice sorgente (prova di paternità)
    try {
      document.documentElement.insertBefore(
        document.createComment(' © Studio Digital Italia — studiodigitalitalia.it — Demo dimostrativa. Copia non autorizzata vietata. '),
        document.documentElement.firstChild
      );
    } catch (e) {}

    // Watermark in console
    try {
      var style = 'color:#c9a24b;font-size:13px;font-weight:700';
      console.log('%c© Studio Digital Italia', style);
      console.log('%cQuesta è una demo dimostrativa. Il codice è protetto da copyright. studiodigitalitalia.it', 'color:#888;font-size:11px');
    } catch (e) {}

    // Blocco tasto destro (menu contestuale → "salva immagine", "visualizza sorgente")
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);

    // Blocco trascinamento delle immagini
    document.addEventListener('dragstart', function (e) {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
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

})();
