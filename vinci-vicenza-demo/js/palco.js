/* VINCI - collezione "da fuori e da dentro" (regia v5, fase 2)
   La sezione #collezione resta ferma a schermo mentre si scorre (position: sticky): lo scroll fa da telecomando.
   Niente blocchi dello scroll, niente animazioni a tempo: ogni stato dipende solo da quanto si e scorso (p da 0 a 1).
   Il taglio del Sole 3D lo legge js/scena3d.js da window.vinciPalco.taglio. */
(function () {
  'use strict';
  var sez = document.getElementById('collezione');
  if (!sez) return;
  window.vinciPalco = { p: 0, taglio: 0, lato: 0 };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // versione statica: tutto visibile, Sole intero
  sez.classList.add('palco-on');

  /* Sequenza: [inizio, fine] come frazione dello scroll della sezione. Una cosa alla volta. */
  var TEMPI = {
    testa:  [0.014, 0.072],
    taglio: [0.072, 0.216],        // il Sole si apre
    sole:   [0.187, 0.230],        // cartellino del Sole
    pezzi: {                       // entra: compare intero; dentro: passa alla foto in sezione
      'sole-dentro': { entra: [0.230, 0.288] },
      'luna':        { entra: [0.302, 0.360], dentro: [0.374, 0.418] },
      'monte':       { entra: [0.432, 0.490], dentro: [0.504, 0.547] },
      'papillon':    { entra: [0.562, 0.619] }
    },
    // panificati: le brioche lasciano il bancone, il Sole si richiude e si sposta di lato, arriva il pane
    escono: [0.66, 0.74],          // i pezzi sfumano e il Sole si richiude
    lato:   [0.74, 0.80],          // il Sole scivola in fondo al bancone
    pane:   [0.80, 0.88],          // entra il pane, cambia il titolo
    lama:   [0.90, 0.98]           // ci si avvicina all'incisione della lama
  };
  var testa = sez.querySelector('.palco-testa.t1'), testa2 = sez.querySelector('.palco-testa.t2'), cartSole = sez.querySelector('.cart-sole');
  var pane = sez.querySelector('.pane-pezzo');
  var pezzi = Array.prototype.slice.call(sez.querySelectorAll('.pezzo'));
  pezzi.sort(function (x, y) { return TEMPI.pezzi[x.getAttribute('data-pezzo')].entra[0] - TEMPI.pezzi[y.getAttribute('data-pezzo')].entra[0]; });   // in ordine di comparsa
  var telefono = window.matchMedia('(max-width: 900px)');
  function lim(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function liscia(t) { t = lim(t); return t * t * (3 - 2 * t); }
  function tra(p, ab) { return liscia((p - ab[0]) / (ab[1] - ab[0])); }

  function aggiorna() {
    var r = sez.getBoundingClientRect(), corsa = r.height - window.innerHeight;
    var p = corsa > 0 ? lim((74 - r.top) / corsa) : 0;
    var esce = tra(p, TEMPI.escono), arriva = tra(p, TEMPI.pane);
    window.vinciPalco.p = p;
    window.vinciPalco.taglio = tra(p, TEMPI.taglio) * (1 - esce);
    window.vinciPalco.lato = tra(p, TEMPI.lato);
    testa.style.setProperty('--a', (tra(p, TEMPI.testa) * (1 - esce)).toFixed(3));
    testa2.style.setProperty('--a', arriva.toFixed(3));
    cartSole.style.setProperty('--a', (tra(p, TEMPI.sole) * (1 - esce)).toFixed(3));
    var a = pezzi.map(function (el) { return tra(p, TEMPI.pezzi[el.getAttribute('data-pezzo')].entra); });
    pezzi.forEach(function (el, i) {
      var t = TEMPI.pezzi[el.getAttribute('data-pezzo')], v = a[i];
      if (telefono.matches && i < pezzi.length - 1) v *= 1 - a[i + 1];        // su telefono un pezzo alla volta
      el.style.setProperty('--a', (v * (1 - esce)).toFixed(3));
      el.style.setProperty('--d', (t.dentro ? tra(p, t.dentro) : 0).toFixed(3));
    });
    pane.style.setProperty('--a', arriva.toFixed(3));
    pane.style.setProperty('--l', tra(p, TEMPI.lama).toFixed(3));
  }
  var inAttesa = false;
  function chiedi() { if (!inAttesa) { inAttesa = true; requestAnimationFrame(function () { inAttesa = false; aggiorna(); }); } }
  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', chiedi);
  aggiorna();
})();
