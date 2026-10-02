/* VINCI - scena 3D, regia v5 "dalla tecnica all'opera"
   Fase 1 (questo file): ingresso + hero. Collezione, panificati e mostra arrivano nelle fasi successive.
   Il Sole e generato in codice (nessun file modello, nessuna texture esterna): la pagina si apre con doppio clic.
   - Ingresso: nasce dal rombo del logo mentre il negozio "si accende", poi va a posarsi sul bancone dell'hero.
   - Hero: fermo sul bancone, ruota lento come un pezzo esposto. Leggera reazione al mouse. Nient'altro si muove. */
(function () {
  'use strict';
  var canvas = document.getElementById('scena3d');
  var ancore = Array.prototype.slice.call(document.querySelectorAll('[data-ancora-3d]'));
  if (!canvas || !window.THREE || !ancore.length) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { document.documentElement.classList.add('no-3d'); return; }
  document.documentElement.classList.add('con-3d');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.localClippingEnabled = true;
  /* la brioche "opera" della mostra in corso (js/mostre.js): forma, finitura e colore sono parametri */
  var OPERA = (window.VINCI_MOSTRA && window.VINCI_MOSTRA.brioche) || { forma: 'sfera', finitura: 'rigata', colore: '#4d3022' };       // serve per tagliare il Sole a meta

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  camera.position.z = 1000;

  /* ambiente luminoso costruito in codice: una stanza chiara color calce con tre pannelli luce */
  (function () {
    var env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16),
      new THREE.MeshBasicMaterial({ color: 0x6f695d, side: THREE.BackSide })));
    function pannello(x, y, z, w, h, forza, tinta) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(tinta).multiplyScalar(forza), side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
    }
    pannello(-20, 30, 25, 40, 26, 9, 0xfff3df);   // finestra alta a sinistra
    pannello(34, 6, 10, 16, 30, 4, 0xffe2b8);     // rimbalzo caldo a destra
    pannello(0, 40, -5, 60, 3, 14, 0xfff8ec);     // la linea LED del negozio
    pannello(0, -30, 20, 60, 30, 1.2, 0xe9dcc4);  // bancone in calce dal basso
    var pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, 0.03).texture;
    pm.dispose();
  })();
  var sole_luce = new THREE.DirectionalLight(0xfff0d8, 1.6);
  sole_luce.position.set(-2, 3, 4); scene.add(sole_luce);

  /* ---------- geometria del lievitato ---------- */
  function rumore(a, b) {
    return Math.sin(a * 3.1 + b * 1.7) * 0.5 + Math.sin(a * 7.3 - b * 2.9 + 1.3) * 0.3 + Math.sin(a * 13.7 + b * 5.1 + 4.2) * 0.2;
  }
  function creaSfoglia() {
    var NU = 420, NT = 288, H = 0.40, ESP = 0.36, PASSO = 0.082;
    // profilo (da centro sopra a centro sotto) e lunghezza d'arco
    var pr = [], py = [], ps = [0], i, j;
    for (i = 0; i <= NU; i++) {
      var phi = Math.PI / 2 - Math.PI * i / NU, c = Math.cos(phi), s = Math.sin(phi);
      var r = Math.pow(Math.abs(c), ESP), y = H * Math.pow(Math.abs(s), ESP) * (s < 0 ? -1 : 1);
      if (s > 0) { y += 0.07 * (1 - r * r); var k = Math.max(0, 1 - r / 0.36); y -= 0.11 * k * k * (3 - 2 * k); }
      else y *= 0.86;
      pr.push(r); py.push(y);
      if (i) ps.push(ps[i - 1] + Math.hypot(r - pr[i - 1], y - py[i - 1]));
    }
    var pos = new Float32Array((NU + 1) * NT * 3), col = new Float32Array((NU + 1) * NT * 3), idx = [];
    var opera = new Float32Array((NU + 1) * NT * 3);            // la stessa superficie, vertice per vertice, nella forma "opera"
    var chiaro = new THREE.Color(0xd08a35), ambra = new THREE.Color(0x9c4c14), cotto = new THREE.Color(0x5a2609), tmp = new THREE.Color();
    for (i = 0; i <= NU; i++) {
      var i0 = Math.max(0, i - 1), i1 = Math.min(NU, i + 1);
      var tx = pr[i1] - pr[i0], ty = py[i1] - py[i0], tl = Math.hypot(tx, ty) || 1;
      var nx = -ty / tl * -1, ny = tx / tl * -1;           // normale del profilo verso l'esterno
      if (nx * pr[i] + ny * py[i] < 0) { nx = -nx; ny = -ny; }
      var sotto = py[i] < -0.05 && pr[i] < 0.93;
      for (j = 0; j < NT; j++) {
        var th = j / NT * Math.PI * 2;
        var ond = rumore(th, ps[i] * 2.2);
        var fase = (ps[i] / PASSO) * Math.PI * 2 - th + ond * 0.9;
        var cr = 0.5 + 0.5 * Math.cos(fase);                 // 1 = cresta dello strato
        var cresta = Math.pow(cr, 0.4);
        var amp = (sotto ? 0.008 : 0.03) * Math.min(1, pr[i] * 6 + 0.15);
        var d = amp * (cresta - 0.5) + 0.012 * rumore(th * 2 + 5, ps[i] * 3);
        var rr = pr[i] * (1 + 0.018 * Math.sin(th * 3 + 1) + 0.012 * Math.sin(th * 5)) + nx * d;
        var yy = py[i] + ny * d;
        var o = (i * NT + j) * 3;
        pos[o] = rr * Math.cos(th); pos[o + 1] = yy; pos[o + 2] = rr * Math.sin(th);
        var lat = Math.PI / 2 - Math.PI * i / NU, rilievo;
        if (OPERA.finitura === 'martellata') rilievo = -0.035 * Math.pow(Math.max(0, Math.sin(lat * 13 + 1) * Math.sin(th * Math.max(3, Math.round(13 * Math.cos(lat))))), 0.7);
        else rilievo = 0.022 * (Math.pow(0.5 + 0.5 * Math.sin(lat * 46 + ond * 1.6), 0.6) - 0.5) + 0.008 * rumore(th * 2 + 3, lat * 5);
        if (OPERA.forma === 'sole') {
          opera[o] = (rr + nx * rilievo) * Math.cos(th); opera[o + 1] = yy + ny * rilievo; opera[o + 2] = (rr + nx * rilievo) * Math.sin(th);
        } else {
          var R = 0.72 * (1 + rilievo);
          opera[o] = R * Math.cos(lat) * Math.cos(th); opera[o + 1] = R * Math.sin(lat) * 0.93; opera[o + 2] = R * Math.cos(lat) * Math.sin(th);
        }
        // colore: solchi chiari, creste ambrate, bordo e base piu cotti
        tmp.copy(chiaro).lerp(ambra, Math.pow(cr, 1.1));
        var bordo = Math.pow(pr[i], 6) * (py[i] > -0.2 ? 0.55 : 0.75);
        tmp.lerp(cotto, Math.min(0.85, bordo * (0.45 + 0.55 * cr) + Math.max(0, ond) * 0.18 + (sotto ? 0.35 : 0)));
        col[o] = tmp.r; col[o + 1] = tmp.g; col[o + 2] = tmp.b;
      }
    }
    for (i = 0; i < NU; i++) for (j = 0; j < NT; j++) {
      var a = i * NT + j, b = i * NT + (j + 1) % NT, c2 = (i + 1) * NT + j, e = (i + 1) * NT + (j + 1) % NT;
      idx.push(a, b, c2, b, e, c2);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(idx); g.computeVertexNormals();
    var g2 = new THREE.BufferGeometry();                           // normali della forma "opera"
    g2.setAttribute('position', new THREE.BufferAttribute(opera, 3)); g2.setIndex(idx); g2.computeVertexNormals();
    g.morphAttributes.position = [g2.attributes.position]; g.morphAttributes.normal = [g2.attributes.normal];
    return g;
  }
  function creaCaramello() {
    var g = new THREE.SphereGeometry(1, 96, 48), p = g.attributes.position, v = new THREE.Vector3(), i;
    for (i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      var th = Math.atan2(v.z, v.x), r = Math.hypot(v.x, v.z);
      var giro = 0.5 + 0.5 * Math.cos(r * 9 - th * 1 + 0.6);           // ricciolo a spirale
      var f = 1 + 0.13 * giro * (v.y > 0 ? 1 : 0.2) + 0.05 * rumore(th, r * 3);
      var lob = 1 + 0.10 * Math.sin(th * 2 + 0.7) + 0.06 * Math.sin(th * 3);
      p.setXYZ(i, v.x * 0.33 * lob, v.y * 0.13 * f + 0.03 * giro * (v.y > 0 ? 1 : 0), v.z * 0.29 * lob);
    }
    g.computeVertexNormals();
    return g;
  }

  /* Sezione del Sole: disegnata su canvas (nessun file immagine), applicata al piano di taglio.
     Strati di sfoglia, alveoli e la tasca di caramello. E un'illustrazione: la foto vera del taglio sta accanto, in pagina. */
  function profiloSole() {                       // stesso profilo di creaSfoglia, senza le creste
    var NU = 120, H = 0.40, ESP = 0.36, pts = [], i;
    for (i = 0; i <= NU; i++) {
      var phi = Math.PI / 2 - Math.PI * i / NU, c = Math.cos(phi), sn = Math.sin(phi);
      var r = Math.pow(Math.abs(c), ESP), y = H * Math.pow(Math.abs(sn), ESP) * (sn < 0 ? -1 : 1);
      if (sn > 0) { y += 0.07 * (1 - r * r); var k = Math.max(0, 1 - r / 0.36); y -= 0.11 * k * k * (3 - 2 * k); } else y *= 0.86;
      pts.push([r, y]);
    }
    return pts;
  }
  function creaSezione() {
    var pts = profiloSole(), forma = new THREE.Shape(), i, W = 1024, Hc = 488;
    var contorno = pts.map(function (p) { return [p[0], p[1]]; }).concat(pts.slice().reverse().map(function (p) { return [-p[0], p[1]]; }));
    contorno.forEach(function (p, n) { if (n) forma.lineTo(p[0], p[1]); else forma.moveTo(p[0], p[1]); });
    var cv = document.createElement('canvas'); cv.width = W; cv.height = Hc;
    var g = cv.getContext('2d'), X = function (x) { return (x + 1.05) / 2.1 * W; }, Y = function (y) { return (0.5 - y) * Hc; };
    var seme = 7; function rnd() { seme = (seme * 16807) % 2147483647; return seme / 2147483647; }
    function traccia(f, dy) { g.beginPath(); contorno.forEach(function (p, n) { var px = X(p[0] * f), py = Y(p[1] * f + (dy || 0)); if (n) g.lineTo(px, py); else g.moveTo(px, py); }); g.closePath(); }
    g.fillStyle = '#7a3f12'; g.fillRect(0, 0, W, Hc);
    traccia(1); g.save(); g.clip();
    var gr = g.createRadialGradient(W / 2, Hc / 2, 20, W / 2, Hc / 2, W * 0.5); gr.addColorStop(0, '#f6e2ae'); gr.addColorStop(0.7, '#e9c47c'); gr.addColorStop(1, '#cf9645');
    g.fillStyle = gr; g.fillRect(0, 0, W, Hc);
    for (i = 1; i < 13; i++) {                   // strati della laminazione
      traccia(1 - i * 0.07, 0); g.strokeStyle = 'rgba(150,88,30,' + (0.42 - i * 0.02) + ')'; g.lineWidth = 2.2 - i * 0.08; g.stroke();
    }
    for (i = 0; i < 300; i++) {                  // alveoli: piu grandi verso il centro
      var ax = (rnd() * 2 - 1), ay = (rnd() - 0.5) * 0.8, cen = 1 - Math.min(1, Math.abs(ax));
      var rx = 5 + rnd() * 20 * (0.4 + cen), ry = rx * (0.28 + rnd() * 0.3);
      g.save(); g.translate(X(ax), Y(ay)); g.rotate((rnd() - 0.5) * 0.5);
      g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); g.fillStyle = 'rgba(128,74,26,' + (0.35 + rnd() * 0.3) + ')'; g.fill();
      g.beginPath(); g.ellipse(0, ry * 0.25, rx * 0.9, ry * 0.8, 0, 0, Math.PI * 2); g.strokeStyle = 'rgba(255,238,196,0.55)'; g.lineWidth = 1.2; g.stroke();
      g.restore();
    }
    var cg = g.createRadialGradient(X(-0.03), Y(0.14), 4, X(0), Y(0.06), 150); cg.addColorStop(0, '#dca253'); cg.addColorStop(0.6, '#b57228'); cg.addColorStop(1, '#8a4d17');
    g.fillStyle = cg; g.beginPath();              // tasca di caramello con una colatura
    g.ellipse(X(0.01), Y(0.13), 150, 62, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse(X(0.10), Y(-0.02), 46, 78, 0.15, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse(X(-0.16), Y(0.02), 34, 50, -0.2, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,240,205,0.5)'; g.beginPath(); g.ellipse(X(-0.08), Y(0.19), 52, 9, -0.05, 0, Math.PI * 2); g.fill();
    g.restore();
    traccia(0.985); g.strokeStyle = '#8a4a17'; g.lineWidth = 15; g.stroke();   // crosta
    traccia(0.955); g.strokeStyle = 'rgba(181,106,37,0.8)'; g.lineWidth = 5; g.stroke();
    var tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    tex.repeat.set(1 / 2.1, 1); tex.offset.set(0.5, 0.5); tex.anisotropy = 4;
    var geo = new THREE.ShapeGeometry(forma); geo.rotateY(-Math.PI / 2);         // dal piano XY al piano di taglio (ZY)
    return { geo: geo, mat: new THREE.MeshStandardMaterial({ map: tex, roughness: 0.82, side: THREE.DoubleSide, envMapIntensity: 0.7 }) };
  }

  var dolce = new THREE.Group();      // posizione, scala, inclinazione
  var perno = new THREE.Group();      // rotazione sul proprio asse
  dolce.add(perno); scene.add(dolce);
  // due meta dello stesso modello: A (sinistra) resta "da fuori", B (destra) si gira e mostra il taglio
  var pianoA = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e6), pianoB = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e6);
  var geoSfoglia = creaSfoglia(), geoCaramello = creaCaramello(), sez = creaSezione();
  function meta(piano, lato) {
    var g = new THREE.Group();
    var sf = new THREE.Mesh(geoSfoglia, new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.5, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.35, envMapIntensity: 1.0, clippingPlanes: [piano] }));
    var ca = new THREE.Mesh(geoCaramello, new THREE.MeshPhysicalMaterial({ color: 0xb27a3c, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.25, clippingPlanes: [piano] }));
    ca.position.set(0.015, 0.385, -0.01);
    var faccia = new THREE.Mesh(sez.geo, sez.mat); faccia.position.x = lato * 0.004; faccia.scale.setScalar(0.985);
    g.add(sf, ca, faccia); g.userData.faccia = faccia; g.userData.sf = sf; g.userData.ca = ca; perno.add(g); return g;
  }
  var metaA = meta(pianoA, -1), metaB = meta(pianoB, 1);
  var qTmp = new THREE.Quaternion(), pTmp = new THREE.Vector3(), nTmp = new THREE.Vector3();
  var BIANCO = new THREE.Color(0xffffff), TINTA = new THREE.Color(OPERA.colore), materiaPrima = -1;
  function aggiornaMateria(m) {                  // m: 0 = Sole, 1 = brioche "opera"
    if (Math.abs(m - materiaPrima) < 0.0005) return; materiaPrima = m;
    [metaA, metaB].forEach(function (g) {
      var sf = g.userData.sf, ca = g.userData.ca;
      sf.morphTargetInfluences[0] = m;
      sf.material.color.copy(BIANCO).lerp(TINTA, Math.min(1, m * 1.25));
      sf.material.roughness = 0.5 - 0.16 * m; sf.material.clearcoat = 0.55 + 0.35 * m;
      ca.visible = m < 0.98; ca.scale.setScalar(Math.max(0.001, 1 - m)); ca.position.y = 0.385 - 0.2 * m;
    });
  }
  function aggiornaTaglio(o) {                   // o: 0 = Sole intero, 1 = aperto
    var aperto = o > 0.002;
    metaB.visible = aperto; metaA.userData.faccia.visible = aperto;
    metaA.position.x = -0.66 * o; metaA.rotation.y = -0.30 * o;
    metaB.position.x = 0.66 * o; metaB.rotation.y = Math.PI / 2 * o;         // la sezione si gira verso chi guarda
    dolce.updateMatrixWorld(true);
    if (!aperto) { pianoA.constant = 1e6; return; }
    metaA.getWorldQuaternion(qTmp); metaA.getWorldPosition(pTmp); pianoA.setFromNormalAndCoplanarPoint(nTmp.set(-1, 0, 0).applyQuaternion(qTmp), pTmp);
    metaB.getWorldQuaternion(qTmp); metaB.getWorldPosition(pTmp); pianoB.setFromNormalAndCoplanarPoint(nTmp.set(1, 0, 0).applyQuaternion(qTmp), pTmp);
  }

  /* ---------- regia ---------- */
  var POSA = { x: 0.50, z: 0.0 };          // inclinazione del Sole sul bancone (x = PI/2 lo mostrerebbe di fronte)
  var POSA_PALCO = { x: 0.40, z: 0.0 }, STRINGE = 0.26;   // posa nella collezione; quanto si rimpicciolisce quando e aperto
  var GIRO_LENTO = 0.22;                    // radianti al secondo: un giro ogni 28 s circa
  var ancora = document.querySelector('[data-ancora-3d="ingresso"]');
  var palco = document.querySelector('[data-ancora-3d="palco"]'), palcoLato = document.querySelector('[data-ancora-3d="palco-lato"]'), ancMostra = document.querySelector('[data-ancora-3d="mostra"]'), ancFinale = document.querySelector('[data-ancora-3d="finale"]'), sezPalco = document.getElementById('collezione');
  var radice = document.documentElement, ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vw = 1, vh = 1;
  function ridimensiona() {
    vw = window.innerWidth; vh = window.innerHeight;
    renderer.setSize(vw, vh, false);
    camera.left = -vw / 2; camera.right = vw / 2; camera.top = vh / 2; camera.bottom = -vh / 2;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', ridimensiona); ridimensiona();

  var mouse = { x: 0, y: 0 }, mx = 0, my = 0;
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;                         // su telefono niente inseguimento del dito
    mouse.x = e.clientX / vw * 2 - 1; mouse.y = e.clientY / vh * 2 - 1;
  }, { passive: true });

  function lim(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function liscia(t) { t = lim(t); return t * t * (3 - 2 * t); }

  var giro = 0, prec = 0, rombo = null;
  function fotogramma(ora) {
    requestAnimationFrame(fotogramma);
    if (!prec) prec = ora;
    var dt = Math.min(0.05, (ora - prec) / 1000); prec = ora;
    if (!ancora) return;
    var r = ancora.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2, s = Math.min(r.width, r.height) / 2, rx = POSA.x, rz = POSA.z, libero = 1;

    // ingresso: i tempi li detta index.html (window.vinciIntro), qui il Sole li segue
    var I = window.vinciIntro;
    if (I && I.attiva) {
      var p = (performance.now() - I.t0) / 1000;
      if (!rombo) { var im = document.querySelector('#intro img'), q = im.getBoundingClientRect(); rombo = { x: q.left + q.width / 2, y: q.top + q.height * 0.34, s: q.width * 0.13 }; }
      var nasce = liscia((p - I.nasce[0]) / (I.nasce[1] - I.nasce[0])), va = liscia((p - I.posa[0]) / (I.posa[1] - I.posa[0]));
      x = rombo.x + (x - rombo.x) * va; y = rombo.y + (y - rombo.y) * va;
      s = rombo.s * nasce + (s - rombo.s) * va;
      rx = 1.5 + (rx - 1.5) * va; libero = va;                      // nasce di fronte, come un sole, poi si adagia
    }

    // collezione: scendendo, il Sole lascia il bancone e va al centro del palco; li lo scroll lo apre
    var o = 0, viaggio = 0;
    if (palco && sezPalco && !(I && I.attiva)) {
      var q2 = palco.getBoundingClientRect(), sy = window.scrollY;
      var inizio = vh * 0.15, arrivo = Math.max(inizio + 1, sezPalco.getBoundingClientRect().top + sy - 74);
      viaggio = liscia((sy - inizio) / (arrivo - inizio));
      var sP = Math.min(q2.width, q2.height) / 2 * (parseFloat(palco.getAttribute('data-scala')) || 1);
      o = (window.vinciPalco && window.vinciPalco.taglio) || 0;
      x += (q2.left + q2.width / 2 - x) * viaggio; y += (q2.top + q2.height / 2 - y) * viaggio;
      s += (sP * (1 - STRINGE * o) - s) * viaggio; rx += (POSA_PALCO.x - rx) * viaggio;
      libero = 1 - 0.7 * viaggio;
      var lato = (window.vinciPalco && window.vinciPalco.lato) || 0;      // panificati: il Sole, richiuso, fa posto al pane
      if (lato > 0 && palcoLato) {
        var q3 = palcoLato.getBoundingClientRect(), e3 = liscia(lato);
        x += (q3.left + q3.width / 2 - x) * e3; y += (q3.top + q3.height / 2 - y) * e3; s += (Math.min(q3.width, q3.height) / 2 - s) * e3;
      }
      r = viaggio > 0.5 ? q2 : r;
    }

    // mostra: finito il palco il Sole si alza dal bancone, cambia forma e materia e si posa accanto all'opera
    var materia = 0, inChiusura = false;
    if (ancMostra && sezPalco && viaggio >= 1) {
      var q4 = ancMostra.getBoundingClientRect(), sy2 = window.scrollY;
      var fineP = sezPalco.getBoundingClientRect().bottom + sy2 - vh;
      var arrM = Math.max(fineP + 1, q4.top + sy2 + q4.height / 2 - vh * 0.6);
      var tM = lim((sy2 - fineP) / (arrM - fineP)), eM = liscia(tM);
      if (tM > 0) {
        x += (q4.left + q4.width / 2 - x) * eM; y += (q4.top + q4.height / 2 - y) * eM - Math.sin(Math.PI * tM) * vh * 0.08;
        s += (Math.min(q4.width, q4.height) / 2 - s) * eM; rx += (0.3 - rx) * eM;
        materia = liscia((tM - 0.2) / 0.6); if (tM > 0.5) r = q4;
      }
    }
    // chiusura: la brioche nera, piccola e ferma, come firma
    if (ancFinale) {
      var q5 = ancFinale.getBoundingClientRect();
      if (q5.top < vh * 1.3 && (!ancMostra || ancMostra.getBoundingClientRect().bottom < -vh * 0.2)) {
        x = q5.left + q5.width / 2; y = q5.top + q5.height / 2; s = Math.min(q5.width, q5.height) / 2; rx = 0.3;
        materia = 1; inChiusura = true; libero = 0; r = q5;
      }
    }

    // il giro lento si ferma, sempre sullo stesso lato, prima del taglio
    if (!ridotto && !inChiusura) giro += dt * GIRO_LENTO * ((1 - viaggio) + materia * 0.8);
    var fermo = Math.round(giro / (Math.PI * 2)) * Math.PI * 2, angolo = giro + (fermo - giro) * liscia(viaggio * 1.4) * (1 - materia);
    mx += (mouse.x - mx) * 0.04; my += (mouse.y - my) * 0.04;
    dolce.visible = s > 0.5 && r.bottom > -vh && r.top < vh * 2;
    dolce.position.set(x - vw / 2, vh / 2 - y, 0);
    dolce.scale.setScalar(Math.max(0.001, s));
    dolce.rotation.set(rx + my * 0.07 * libero, 0, rz + mx * 0.05 * libero, 'ZXY');
    perno.rotation.y = angolo + mx * 0.35 * libero;
    aggiornaMateria(materia);
    aggiornaTaglio(o);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(fotogramma);
})();
