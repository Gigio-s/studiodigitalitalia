/* REAGENCY · Bifamiliare Dueville — interazioni */
(function () {
  'use strict';

  /* header scrolled state */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* reveal on scroll */
  var revs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revs.forEach(function (el) { io.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('in'); });
  }

  /* mobile nav */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mnav');
  var mclose = document.querySelector('.mnav .close');
  function openNav() { mnav.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeNav() { mnav.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openNav);
  if (mclose) mclose.addEventListener('click', closeNav);
  if (mnav) mnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });

  /* smooth anchor + header offset */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* lightbox galleria */
  var lb = document.querySelector('.lb');
  var lbImg = lb ? lb.querySelector('img') : null;
  var lbClose = lb ? lb.querySelector('.close') : null;
  document.querySelectorAll('[data-lb]').forEach(function (el) {
    el.addEventListener('click', function (ev) {
      ev.preventDefault();
      var src = el.getAttribute('data-lb');
      if (lbImg) lbImg.src = src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb() { if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } }
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* form (demo, nessun invio reale) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.querySelector('.form-note');
      if (note) { note.style.display = 'block'; }
      form.reset();
    });
  }
})();

/* =========================================================
   ESPLORA LA CASA — video-scrub DENTRO l'hero
   - senza cliccare: hero normale (video fermo sul 1° frame, scritte + tasti)
   - click su "Esplora la casa": spariscono le scritte, la rotella scorre
     il video stanza per stanza
   - arrivati alla fine (= frame iniziale) le scritte e i tasti ritornano
   ========================================================= */
(function esploraHero() {
  var hero    = document.getElementById('top');
  var video   = document.getElementById('hero-video');
  var openBtn = document.getElementById('btn-explore');
  var hint    = document.getElementById('hero-hint');
  if (!hero || !video || !openBtn) return;

  var exploring = false;
  var targetProg = 0;      // 0..1 posizione desiderata nel video
  var curTime = 0;         // tempo attuale (smorzato)
  var seeking = false;     // evita di accodare seek: uno alla volta
  var SCRUB_DISTANCE = 2600; // px di rotella per attraversare tutto il video

  // PAUSE (dwell): quando il video arriva su queste tappe si ferma DWELL_MS,
  // poi la rotella riprende. Valori = frazione 0..1 del video (~10,1s).
  // soggiorno ~3,8s · camera ~6,4s · vista finale ~9,3s
  var HOLDS = [0.376, 0.634, 0.921];
  var DWELL_MS = 2000;
  var holdIdx = 0, holding = false, holdUntil = 0;

  // etichette mostrate su ogni pausa (allineate a HOLDS)
  var LABELS = [
    { t: 'Zona giorno',  s: 'Soggiorno' },
    { t: 'Zona notte',   s: 'Camera' },
    { t: 'Area esterna', s: 'Visuale sul retro con l’auto' }
  ];

  // etichetta creata al volo
  var label = document.createElement('div');
  label.className = 'hero-label';
  label.innerHTML = '<span class="t"></span><span class="s"></span>';
  hero.appendChild(label);
  var labelT = label.querySelector('.t');
  var labelS = label.querySelector('.s');

  // il tasto "Esplora la casa" e le scritte hero visibili SUBITO (niente scroll)
  document.querySelectorAll('.hero .reveal').forEach(function (el) { el.classList.add('in'); });

  // il video parte fermo sul primo frame (fa da "foto" dell'hero)
  video.pause();
  video.addEventListener('loadedmetadata', function () {
    try { video.currentTime = 0; } catch (e) {}
  });
  // quando un seek finisce, siamo liberi di chiederne un altro
  video.addEventListener('seeked', function () { seeking = false; });

  function enter() {
    if (exploring) return;
    exploring = true;
    hero.classList.add('exploring');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    targetProg = 0; curTime = 0; seeking = false;
    holdIdx = 0; holding = false;
    if (hint) hint.classList.remove('gone');
    try { video.pause(); video.currentTime = 0; } catch (e) {}
    requestAnimationFrame(tick);
  }

  function exit() {
    if (!exploring) return;
    exploring = false;
    holding = false;
    label.classList.remove('on');
    hero.classList.remove('exploring');
    document.body.style.overflow = '';
    // resta fermo sul frame in cui siamo (niente salti)
  }

  function tick() {
    if (!exploring) return;
    if (video.duration) {
      var want = targetProg * video.duration;
      curTime += (want - curTime) * 0.12;   // easing morbido
      if (Math.abs(want - curTime) < 0.004) curTime = want;
      // chiedi un nuovo frame solo se il precedente seek è finito (niente coda)
      if (video.readyState >= 2 && !seeking && Math.abs(video.currentTime - curTime) > 0.008) {
        seeking = true;
        try { video.currentTime = curTime; } catch (e) { seeking = false; }
      }

      // arrivo su una tappa -> pausa di DWELL_MS
      if (!holding && holdIdx < HOLDS.length) {
        var hs = HOLDS[holdIdx] * video.duration;
        if (curTime >= hs - 0.05) {
          holding = true; holdUntil = performance.now() + DWELL_MS;
          var L = LABELS[holdIdx] || { t: '', s: '' };
          labelT.textContent = L.t; labelS.textContent = L.s;
          label.classList.add('on');            // mostra etichetta stanza
          if (hint) hint.classList.add('gone');
        }
      }
      // fine pausa -> sblocca la tappa successiva (o esci se era l'ultima)
      if (holding && performance.now() >= holdUntil) {
        holding = false;
        label.classList.remove('on');           // via etichetta, si riparte
        holdIdx++;
        if (holdIdx >= HOLDS.length) { exit(); return; }
      }
    }
    requestAnimationFrame(tick);
  }

  function advance(delta) {
    if (holding) return;                       // durante la pausa la rotella è inerte
    targetProg += delta / SCRUB_DISTANCE;
    if (targetProg < 0) targetProg = 0;
    // non superare la prossima tappa finché la pausa non è stata fatta
    if (holdIdx < HOLDS.length && targetProg > HOLDS[holdIdx]) targetProg = HOLDS[holdIdx];
    if (hint && targetProg > 0.02) hint.classList.add('gone');
    if (holdIdx >= HOLDS.length && targetProg >= 1) { targetProg = 1; exit(); }
  }

  // ROTELLA: durante l'esplorazione blocca lo scroll pagina e fa scrub
  window.addEventListener('wheel', function (e) {
    if (!exploring) return;
    e.preventDefault();
    var d = e.deltaY;
    if (e.deltaMode === 1) d *= 16;                  // alcuni mouse mandano "righe"
    else if (e.deltaMode === 2) d *= window.innerHeight;
    advance(d);
  }, { passive: false });

  // TOUCH (mobile): trascinamento verticale = scrub
  var lastY = null;
  window.addEventListener('touchstart', function (e) {
    if (!exploring) return;
    lastY = e.touches[0].clientY;
  }, { passive: false });
  window.addEventListener('touchmove', function (e) {
    if (!exploring) return;
    e.preventDefault();
    var y = e.touches[0].clientY;
    if (lastY !== null) advance((lastY - y) * 2.2);
    lastY = y;
  }, { passive: false });

  openBtn.addEventListener('click', function (e) { e.preventDefault(); enter(); });
  document.addEventListener('keydown', function (e) {
    if (exploring && e.key === 'Escape') exit();
  });
})();
