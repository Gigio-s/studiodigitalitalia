/* VINCI demo v6 - comportamenti comuni alle tre pagine:
   caricamento 0-100%, menu, comparse, sezioni ferme guidate dallo scroll, adesivi, contatore, schede prodotto,
   nastro Instagram, giostra dei prodotti, polaroid in parallasse, racconto orizzontale. */
(function () {
  'use strict';
  var radice = document.documentElement, ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function lim(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function liscia(t) { t = lim(t); return t * t * (3 - 2 * t); }
  window.vinci = { lim: lim, liscia: liscia, pronto: false };

  /* ---------- caricamento ---------- */
  var conta = document.querySelector('#carica .conta span'), barra = document.querySelector('#carica .barra');
  var durata = radice.classList.contains('rapido') ? 600 : 1500, t0 = performance.now();
  function fine() {
    radice.classList.add('pronto'); window.vinci.pronto = true; window.vinci.prontoT = performance.now();
    try { sessionStorage.setItem('vinciVisto', '1'); } catch (e) {}
    document.dispatchEvent(new Event('vinci:pronto'));
  }
  if (ridotto || !conta) fine();
  else (function passo(ora) {
    var k = lim((ora - t0) / durata), v = Math.round(100 * (1 - Math.pow(1 - k, 2.2)));
    conta.textContent = v; barra.style.setProperty('--c', v + '%');
    if (k < 1) requestAnimationFrame(passo); else setTimeout(fine, 180);
  })(t0);

  /* ---------- menu ---------- */
  var apri = document.getElementById('apri-menu'), chiudi = document.getElementById('chiudi-menu');
  function menu(si) { radice.classList.toggle('menu-aperto', si); apri.setAttribute('aria-expanded', si); if (si) chiudi.focus(); else apri.focus(); }
  apri.addEventListener('click', function () { menu(true); });
  chiudi.addEventListener('click', function () { menu(false); });
  document.querySelectorAll('#menu a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && radice.classList.contains('menu-aperto')) menu(false); });

  /* ---------- comparse ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* ---------- schede prodotto (+) ---------- */
  document.querySelectorAll('.card .piu').forEach(function (b) {
    b.addEventListener('click', function () { var c = b.closest('.card'), si = !c.classList.contains('aperta'); c.classList.toggle('aperta', si); b.setAttribute('aria-expanded', si); });
  });

  /* ---------- nastro Instagram ---------- */
  var nastro = document.querySelector('.nastro');
  document.querySelectorAll('[data-nastro]').forEach(function (b) {
    b.addEventListener('click', function () { nastro.scrollBy({ left: (+b.getAttribute('data-nastro')) * nastro.clientWidth * 0.7, behavior: 'smooth' }); });
  });

  /* ---------- giostra "oggi sul bancone" ---------- */
  var gi = Array.prototype.slice.call(document.querySelectorAll('.giostra img')), nomeG = document.querySelector('.box.cacao .nome'), ig = 0;
  function mostra(i) { ig = (i + gi.length) % gi.length; gi.forEach(function (im, k) { im.classList.toggle('su', k === ig); }); if (nomeG) nomeG.textContent = gi[ig].getAttribute('data-nome'); }
  if (gi.length) {
    mostra(0);
    document.querySelector('.box.cacao .prec').addEventListener('click', function () { mostra(ig - 1); });
    document.querySelector('.box.cacao .succ').addEventListener('click', function () { mostra(ig + 1); });
  }

  /* ---------- scroll: sezioni ferme, adesivi, contatore, parallasse, testata ---------- */
  var pin = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var avanza = Array.prototype.slice.call(document.querySelectorAll('[data-avanza]'));
  var paral = Array.prototype.slice.call(document.querySelectorAll('[data-parallasse]'));
  var adesivi = Array.prototype.slice.call(document.querySelectorAll('.adesivo'));
  var testata = document.querySelector('.testata'), scuri = Array.prototype.slice.call(document.querySelectorAll('.scuro'));
  window.vinci.pin = {};
  function aggiorna() {
    var vh = innerHeight, sy = scrollY;
    pin.forEach(function (s) {
      var r = s.getBoundingClientRect(), corsa = r.height - vh, p = corsa > 0 ? lim(-r.top / corsa) : 0;
      s.style.setProperty('--p', p.toFixed(4));
      s.querySelectorAll('[data-da]').forEach(function (el) { el.classList.toggle('visto', ridotto || p >= +el.getAttribute('data-da')); });
      if (s.classList.contains('cuore')) window.vinci.pin.cuore = p;
      if (s.hasAttribute('data-binario')) binario(s, p);
    });
    avanza.forEach(function (s) {
      var r = s.getBoundingClientRect(), p, v, c = s.querySelector('[data-cifra]');
      if (s.hasAttribute('data-pin') && r.height > vh * 1.2) {          // sezione ferma: la barra si carica da 0 a 100 mentre scorri
        p = lim(-r.top / (r.height - vh)); v = Math.round(liscia((p - 0.06) / 0.8) * 100);
      } else { p = lim((vh - r.top) / (r.height + vh * 0.2)); v = Math.round(liscia(p * 1.3) * 100); }
      if (c) c.textContent = ('00' + v).slice(-3);
      var bar = s.querySelector('.contatore i'); if (bar) bar.style.setProperty('--c', v + '%');
    });
    paral.forEach(function (el) { var r = el.getBoundingClientRect(); el.style.setProperty('--py', (((r.top + r.height / 2) / vh - 0.5) * +el.getAttribute('data-parallasse')).toFixed(1)); });
    adesivi.forEach(function (el) { el.style.setProperty('--g', (sy * 0.06 % 360).toFixed(1) + 'deg'); });
    var sopraScuro = scuri.some(function (s) { var r = s.getBoundingClientRect(); return r.top < 40 && r.bottom > 40; });
    testata.classList.toggle('chiara', sopraScuro && !radice.classList.contains('menu-aperto'));
  }
  /* racconto orizzontale (storia): il binario scorre mentre la sezione e ferma */
  function binario(s, p) {
    var b = s.querySelector('.binario'), cap = b.children, n = cap.length;
    var passo = cap[0].getBoundingClientRect().width + parseFloat(getComputedStyle(b).gap || 0);
    var pos = liscia(p * 1.08) * (n - 1);
    b.style.transform = 'translateX(' + (-pos * passo).toFixed(1) + 'px)';
    var att = Math.min(n - 1, Math.round(pos));
    s.querySelector('[data-indice]').textContent = '0' + (att + 1);
    s.querySelectorAll('.tacche i').forEach(function (t, k) { t.classList.toggle('su', k === att); });
  }
  var attesa = false;
  function chiedi() { if (!attesa) { attesa = true; requestAnimationFrame(function () { attesa = false; aggiorna(); }); } }
  addEventListener('scroll', chiedi, { passive: true }); addEventListener('resize', chiedi); aggiorna();
})();
