/* VINCI demo v6 - gioco nel piede: i dolci saltano dal fondo, passandoci sopra con il mouse (o il dito) si tagliano a meta.
   Solo decorativo: nessun dato salvato. Su telefono si attiva toccando "Taglio disattivato": la pagina si ferma sul piede
   finche il gioco e attivo, poi toccando "Taglio attivato" si spegne e lo scroll torna libero. */
(function () {
  'use strict';
  var cv = document.getElementById('gioco'), piede = document.querySelector('.piede-sito');
  if (!cv || !cv.getContext) return;
  var g = cv.getContext('2d'), punti = document.getElementById('punti'), titolo = piede.querySelector('.gioco-tit');
  var FOTO = ['c-cassis.webp', 'c-sole.webp', 'c-luna.webp', 'c-monte.webp', 'c-papillon-cotta.webp', 'c-pane-primo.webp', 'c-ira.webp', 'c-cacao.webp', 'c-treccia.webp'].map(function (f) { var im = new Image(); im.src = 'assets/' + f; return im; });
  var W = 0, H = 0, dpr = 1, pezzi = [], meta = [], briciole = [], scia = [], conta = 0, attivo = false, ultimo = 0, prossimo = 0;
  var modoTel = matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)'), tocco = false, giocando = true;   // telefono o finestra stretta
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function misura() { var r = piede.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
  addEventListener('resize', misura); misura();
  new IntersectionObserver(function (es) { attivo = es[0].isIntersecting; if (attivo) { ultimo = performance.now(); requestAnimationFrame(passo); } }, { threshold: 0.15 }).observe(piede);

  var bott = piede.querySelector('.interruttore'), nomeT = bott && bott.querySelector('.tit'), notaT = bott && bott.querySelector('.solo-tocco');
  var radice = document.documentElement;
  function imposta(si) {                     // solo in modalita telefono: acceso = pagina ferma sul piede
    giocando = si; piede.classList.toggle('giocando', si);
    radice.classList.toggle('gioco-fermo', si);
    if (bott) bott.setAttribute('aria-pressed', si);
    if (nomeT) nomeT.textContent = si ? 'Taglio attivato' : 'Taglio disattivato';
    if (notaT) notaT.textContent = si ? 'trascina il dito · tocca per uscire' : 'tocca per giocare';
    if (si) { var r = piede.getBoundingClientRect(); scrollTo(0, scrollY + r.bottom - innerHeight); misura(); }
    if (titolo) titolo.style.opacity = 1;
  }
  function modo() {
    tocco = modoTel.matches; radice.classList.toggle('tocco', tocco);
    if (tocco) imposta(false);
    else { giocando = true; piede.classList.remove('giocando'); radice.classList.remove('gioco-fermo'); if (nomeT) nomeT.textContent = 'Taglio attivato'; }
  }
  modo();
  if (modoTel.addEventListener) modoTel.addEventListener('change', modo); else modoTel.addListener(modo);
  if (bott) bott.addEventListener('click', function () { if (tocco) imposta(!giocando); });
  function fermo(e) { if (tocco && giocando && e.cancelable) e.preventDefault(); }      // niente scroll mentre si gioca
  addEventListener('touchmove', fermo, { passive: false });
  addEventListener('wheel', fermo, { passive: false });
  addEventListener('keydown', function (e) { if (tocco && giocando && /^(ArrowUp|ArrowDown|PageUp|PageDown|Home|End| )$/.test(e.key)) e.preventDefault(); });

  function lancia() {
    var im = FOTO[(Math.random() * FOTO.length) | 0], dim = Math.min(W, H) * (0.1 + Math.random() * 0.05) + 40;
    pezzi.push({ im: im, x: W * (0.15 + Math.random() * 0.7), y: H + dim, vx: (Math.random() - 0.5) * W * 0.18, vy: -H * (1.05 + Math.random() * 0.3), r: Math.random() * 6, vr: (Math.random() - 0.5) * 3, d: dim });
  }
  function punto(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }; }
  cv.addEventListener('pointermove', function (e) { if (!giocando) return; scia.push(punto(e)); if (scia.length > 24) scia.shift(); taglia(); }, { passive: true });
  cv.addEventListener('pointerleave', function () { scia.length = 0; });

  function distSeg(px, py, a, b) {           // distanza del centro del pezzo dal segmento della scia
    var dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / l));
    return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
  }
  function taglia() {
    if (scia.length < 2) return;
    var a = scia[scia.length - 2], b = scia[scia.length - 1];
    if (Math.hypot(b.x - a.x, b.y - a.y) < 6) return;
    for (var i = pezzi.length - 1; i >= 0; i--) {
      var p = pezzi[i];
      if (distSeg(p.x, p.y, a, b) < p.d * 0.42) {
        var ang = Math.atan2(b.y - a.y, b.x - a.x);
        [-1, 1].forEach(function (lato) {
          meta.push({ im: p.im, x: p.x, y: p.y, d: p.d, r: p.r, ang: ang, lato: lato, vx: p.vx + Math.cos(ang + Math.PI / 2) * lato * 120, vy: p.vy * 0.4 + Math.sin(ang + Math.PI / 2) * lato * 120, vr: lato * 2.5, a: 1 });
        });
        for (var k = 0; k < 14; k++) briciole.push({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 420, vy: (Math.random() - 0.9) * 380, v: 1, c: Math.random() < 0.5 ? '#e3d5be' : '#a16d48' });
        pezzi.splice(i, 1); conta++; punti.textContent = conta;
        if (titolo && !tocco) titolo.style.opacity = 0.25;
      }
    }
  }
  function disegnaPezzo(p) {
    if (!p.im.complete || !p.im.naturalWidth) return;
    var w = p.im.naturalWidth, h = p.im.naturalHeight, sc = p.d / Math.max(w, h);
    g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.drawImage(p.im, -w * sc / 2, -h * sc / 2, w * sc, h * sc); g.restore();
  }
  function disegnaMeta(m) {
    if (!m.im.naturalWidth) return;
    var w = m.im.naturalWidth, h = m.im.naturalHeight, sc = m.d / Math.max(w, h);
    g.save(); g.globalAlpha = m.a; g.translate(m.x, m.y);
    g.rotate(m.ang); g.beginPath(); g.rect(-m.d, m.lato > 0 ? 0 : -m.d, m.d * 2, m.d); g.clip(); g.rotate(-m.ang);   // meta dell'immagine dal lato del taglio
    g.rotate(m.r); g.drawImage(m.im, -w * sc / 2, -h * sc / 2, w * sc, h * sc); g.restore();
  }
  function passo(ora) {
    if (!attivo) return;
    requestAnimationFrame(passo);
    var dt = Math.min(0.04, (ora - ultimo) / 1000); ultimo = ora;
    if (ora > prossimo) { lancia(); if (Math.random() < 0.3) lancia(); prossimo = ora + 700 + Math.random() * 600; }
    var G = H * 1.6;
    g.clearRect(0, 0, W, H);
    pezzi = pezzi.filter(function (p) { p.vy += G * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; disegnaPezzo(p); return p.y < H + p.d * 1.5; });
    meta = meta.filter(function (m) { m.vy += G * dt; m.x += m.vx * dt; m.y += m.vy * dt; m.r += m.vr * dt; m.a -= dt * 0.6; disegnaMeta(m); return m.a > 0 && m.y < H + m.d; });
    briciole = briciole.filter(function (b) { b.vy += G * 0.7 * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.v -= dt * 1.4; g.globalAlpha = Math.max(0, b.v); g.fillStyle = b.c; g.fillRect(b.x, b.y, 4, 4); g.globalAlpha = 1; return b.v > 0; });
    var ora2 = performance.now(); scia = scia.filter(function (s) { return ora2 - s.t < 140; });
    if (scia.length > 1) {                      // la scia della lama
      g.lineCap = 'round'; g.strokeStyle = 'rgba(255,248,232,.9)';
      for (var i = 1; i < scia.length; i++) { g.lineWidth = 1 + 5 * i / scia.length; g.beginPath(); g.moveTo(scia[i - 1].x, scia[i - 1].y); g.lineTo(scia[i].x, scia[i].y); g.stroke(); }
    }
  }
})();
