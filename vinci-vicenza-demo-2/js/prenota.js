/* VINCI demo v6 - prenotazione con ritiro in negozio.
   Scegli le brioche, il giorno del ritiro e lasci nome e telefono. Niente prezzi e niente pagamento online:
   si paga in negozio al ritiro (carte, bancomat, contanti). In questa demo la prenotazione non viene inviata:
   alla conferma compare il riepilogo. Il vassoio a destra mostra in 3D le brioche scelte (modelli in js/brioche-modelli.js). */
(function () {
  'use strict';
  var radice = document.documentElement;
  var PROD = window.VINCI_PRENOTABILI || [];
  var MAX_PEZZI = 12;                         // per prenotazioni piu grandi meglio chiamare il negozio
  var carrello = {};                          // id -> quantita
  var giorno = null;

  var lista = document.getElementById('scelta'), righe = document.getElementById('righe'), vuoto = document.getElementById('vuoto');
  var totale = document.querySelectorAll('[data-totale]'), giorni = document.getElementById('giorni'), oraGiorno = document.getElementById('ora-giorno');
  var modulo = document.getElementById('modulo'), avviso = document.getElementById('avviso'), barra = document.getElementById('barra-vassoio');
  if (!lista || !modulo) return;

  function trova(id) { for (var i = 0; i < PROD.length; i++) if (PROD[i].id === id) return PROD[i]; return null; }
  function pezzi() { var n = 0; for (var k in carrello) n += carrello[k]; return n; }

  /* ---------- prodotti ---------- */
  lista.innerHTML = PROD.map(function (p) {
    return '<article class="scegli" data-id="' + p.id + '" style="--c:' + p.c + '">' +
      '<div class="vetrina"><img src="assets/' + p.img + '" alt="' + p.nome + '" loading="lazy"></div>' +
      '<div class="t"><b>' + p.nome + '</b><small>' + p.sotto + '</small></div>' +
      '<div class="passo" role="group" aria-label="Quantita di ' + p.nome + '">' +
      '<button type="button" class="meno" aria-label="Togli una ' + p.nome + '">&minus;</button>' +
      '<output aria-live="polite">0</output>' +
      '<button type="button" class="piu-q" aria-label="Aggiungi una ' + p.nome + '">+</button></div></article>';
  }).join('');
  lista.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var id = b.closest('.scegli').getAttribute('data-id');
    cambia(id, b.classList.contains('meno') ? -1 : 1);
  });
  righe.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-id]'); if (!b) return;
    cambia(b.getAttribute('data-id'), +b.getAttribute('data-d'));
  });

  function cambia(id, d) {
    var q = (carrello[id] || 0) + d;
    if (d > 0 && pezzi() >= MAX_PEZZI) { mostraAvviso('Online si prenotano fino a ' + MAX_PEZZI + ' pezzi. Per ordini piu grandi chiamaci o passa in negozio.'); return; }
    if (q <= 0) delete carrello[id]; else carrello[id] = q;
    vassoio.apri();
    if (d > 0) vassoio.aggiungi(id); else vassoio.togli(id);
    disegna();
  }
  function disegna() {
    PROD.forEach(function (p) {
      var el = lista.querySelector('[data-id="' + p.id + '"]'), q = carrello[p.id] || 0;
      el.querySelector('output').textContent = q; el.classList.toggle('scelto', q > 0);
    });
    var ids = Object.keys(carrello);
    righe.innerHTML = ids.map(function (id) {
      var p = trova(id);
      return '<li><img src="assets/' + p.img + '" alt=""><span>' + p.nome + '</span>' +
        '<button type="button" data-id="' + id + '" data-d="-1" aria-label="Togli una ' + p.nome + '">&minus;</button><b>' + carrello[id] + '</b>' +
        '<button type="button" data-id="' + id + '" data-d="1" aria-label="Aggiungi una ' + p.nome + '">+</button></li>';
    }).join('');
    vuoto.hidden = ids.length > 0;
    var n = pezzi();
    totale.forEach(function (t) { t.textContent = n + (n === 1 ? ' pezzo' : ' pezzi'); });
    if (barra) barra.classList.toggle('su', n > 0 && !vassoioInVista);
  }

  /* ---------- giorno del ritiro: dal giorno dopo, per due settimane, lunedi chiuso ---------- */
  var GG = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'], MM = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  var GGL = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  function orari(d) { var g = d.getDay(); return g === 5 || g === 6 ? '9:00-13:00 e 17:00-20:00' : '9:00-13:00'; }
  function etichetta(d) { return GGL[d.getDay()] + ' ' + d.getDate() + ' ' + MM[d.getMonth()]; }
  var oggi = new Date(); oggi.setHours(12, 0, 0, 0);
  var html = '';
  for (var i = 1; i <= 15; i++) {
    var d = new Date(oggi.getTime() + i * 864e5);
    if (d.getDay() === 1) continue;
    html += '<button type="button" class="giorno" data-t="' + d.getTime() + '" aria-pressed="false"><small>' + GG[d.getDay()] + '</small><b>' + d.getDate() + '</b><small>' + MM[d.getMonth()] + '</small></button>';
  }
  giorni.innerHTML = html;
  giorni.addEventListener('click', function (e) {
    var b = e.target.closest('.giorno'); if (!b) return;
    giorni.querySelectorAll('.giorno').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    giorno = new Date(+b.getAttribute('data-t'));
    oraGiorno.textContent = 'Ritiro ' + etichetta(giorno) + ', ' + orari(giorno) + '.';
  });

  /* ---------- invio (demo) ---------- */
  function mostraAvviso(t) { avviso.textContent = t; avviso.hidden = !t; }
  modulo.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = modulo.nome.value.trim();
    /* DEMO: si puo inviare anche senza compilare. Quello che manca viene riempito con un esempio,
       cosi si vede tutto il percorso. Nella versione online qui tornano i controlli (brioche, giorno, nome e telefono, conferma). */
    var esempio = false;
    if (!pezzi()) { esempio = true; [['cassis', 2], ['sole', 1], ['barocco', 1]].forEach(function (x) { for (var q = 0; q < x[1]; q++) cambia(x[0], 1); }); }
    if (!giorno) { esempio = true; var primo = giorni.querySelector('.giorno'); if (primo) primo.click(); }
    if (!nome) { esempio = true; nome = 'Cliente di prova'; }
    mostraAvviso('');
    document.getElementById('conferma').classList.toggle('di-esempio', esempio);
    var codice = 'VN-' + (Math.random().toString(36).slice(2, 6)).toUpperCase();
    var dlg = document.getElementById('conferma');
    dlg.querySelector('[data-codice]').textContent = codice;
    dlg.querySelector('[data-quando]').textContent = etichetta(giorno) + ', ' + orari(giorno);
    dlg.querySelector('[data-chi]').textContent = nome;
    dlg.querySelector('[data-cosa]').innerHTML = Object.keys(carrello).map(function (id) { return '<li><b>' + carrello[id] + ' &times;</b> ' + trova(id).nome + '</li>'; }).join('');
    var bott = modulo.querySelector('.invia'); bott.disabled = true;
    document.querySelector('.scatola-wrap').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function () { vassoio.chiudi(function () {                // prima la scatola si chiude con il logo sopra, poi il riepilogo
      bott.disabled = false;
      dlg.hidden = false; radice.classList.add('dialogo-aperto');
      dlg.querySelector('.chiudi-conferma').focus();
    }); }, esempio ? 1500 : 550);            // con l'esempio aspetta che le brioche siano cadute nella scatola
  });
  document.getElementById('conferma').addEventListener('click', function (e) {
    if (e.target.closest('.chiudi-conferma') || e.target === this) { this.hidden = true; radice.classList.remove('dialogo-aperto'); }
  });
  document.addEventListener('keydown', function (e) { var c = document.getElementById('conferma'); if (e.key === 'Escape' && !c.hidden) { c.hidden = true; radice.classList.remove('dialogo-aperto'); } });
  var vassoioInVista = false;              // la barra in basso serve solo finche il vassoio non e sullo schermo
  new IntersectionObserver(function (es) { vassoioInVista = es[0].isIntersecting; if (barra) barra.classList.toggle('su', pezzi() > 0 && !vassoioInVista); }, { threshold: 0.08 }).observe(document.getElementById('vassoio'));
  if (barra) barra.addEventListener('click', function () { document.getElementById('vassoio').scrollIntoView({ behavior: 'smooth', block: 'start' }); });

  /* ---------- vassoio 3D ---------- */
  var vassoio = (function () {
    var canvas = document.getElementById('scatola'), MOD = window.VINCI_BRIOCHE || {};
    var finto = { aggiungi: function () {}, togli: function () {}, chiudi: function (f) { f(); }, apri: function () {} };
    function piatto() {                          // senza WebGL: le foto ritagliate dentro la scatola
      radice.classList.add('vassoio-piatto');
      var box = document.getElementById('scatola-foto');
      return { aggiungi: function () { aggiornaFoto(box); }, togli: function () { aggiornaFoto(box); }, chiudi: function (f) { f(); }, apri: function () {} };
    }
    function aggiornaFoto(box) {
      var h = ''; Object.keys(carrello).forEach(function (id) { for (var i = 0; i < carrello[id]; i++) h += '<img src="assets/' + trova(id).img + '" alt="">'; });
      box.innerHTML = h;
    }
    if (!canvas || !window.THREE || !THREE.GLTFLoader) return canvas ? piatto() : finto;
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch (e) { return piatto(); }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 7.2, 7.6); camera.lookAt(0, 0.1, 0);
    (function () {                               // stessa luce calda della home
      var env = new THREE.Scene();
      env.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.MeshBasicMaterial({ color: 0x6f695d, side: THREE.BackSide })));
      function pannello(x, y, z, w, h, f, t) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(t).multiplyScalar(f), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); }
      pannello(-20, 30, 25, 40, 26, 9, 0xfff3df); pannello(34, 6, 10, 16, 30, 4, 0xffe2b8); pannello(0, 40, -5, 60, 3, 14, 0xfff8ec); pannello(0, -30, 20, 60, 30, 1.2, 0xe9dcc4);
      var pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, 0.03).texture; pm.dispose();
    })();
    var luce = new THREE.DirectionalLight(0xfff0d8, 1.2); luce.position.set(-3, 6, 4); scene.add(luce);

    /* la scatola bianca di VINCI: cresce con il numero di brioche, logo e scritta sul fronte e sul coperchio */
    var giro = new THREE.Group(); scene.add(giro);
    var C = 1.05, BORDO = 0.32, HZ = 0.74, SP = 0.05;              // lato di un posto, margine, altezza pareti, spessore
    var GRIGLIE = [[1, 1], [2, 1], [2, 2], [2, 2], [3, 2], [3, 2], [3, 3], [3, 3], [3, 3], [4, 3], [4, 3], [4, 3]];
    var COL = 1, RIG = 1, LX = C + BORDO, LZ = C + BORDO, tLX = LX, tLZ = LZ;
    var carta = new THREE.MeshStandardMaterial({ color: 0xf8f5ef, roughness: 0.9, envMapIntensity: 0.8 });
    var dentro = new THREE.MeshStandardMaterial({ color: 0xefe9de, roughness: 0.95, envMapIntensity: 0.7 });
    var cubo = new THREE.BoxGeometry(1, 1, 1);
    function pezzo(m) { var o = new THREE.Mesh(cubo, m); giro.add(o); return o; }
    var fondo = pezzo(dentro), pf = pezzo(carta), pd = pezzo(carta), ps = pezzo(carta), pr = pezzo(carta);
    var ombra = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x38352f, transparent: true, opacity: 0.12, depthWrite: false }));
    ombra.rotation.x = -Math.PI / 2; ombra.position.y = -0.06; giro.add(ombra);
    var velina = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0xf3ede2, roughness: 1 }));
    velina.rotation.x = -Math.PI / 2; velina.position.y = 0.004; giro.add(velina);
    var cerniera = new THREE.Group(); giro.add(cerniera);             // coperchio: ruota attorno al bordo dietro
    var lastraC = new THREE.Mesh(cubo, carta); cerniera.add(lastraC);
    var APERTO = -(Math.PI / 2 + 0.38), angolo = APERTO, tAngolo = APERTO, chiusaFatto = null, moto = null;   // moto: animazione del coperchio a tempo

    /* logo VINCI disegnato su canvas: il rombo con le linee interne e la scritta */
    function rombo(g, cx, top, h, col) {
      var k = h / 60, W = 15 * k, bot = top + h, mid = top + h / 2;
      g.strokeStyle = col; g.lineWidth = Math.max(1.4, 1.15 * k); g.lineJoin = 'miter';
      g.beginPath(); g.moveTo(cx, top); g.lineTo(cx + W, mid); g.lineTo(cx, bot); g.lineTo(cx - W, mid); g.closePath(); g.stroke();
      [[0.72, 0.35], [0.5, 0.65], [0.28, 1]].forEach(function (L) {
        [-1, 1].forEach(function (lato) {
          g.beginPath();
          for (var q = 0; q <= 40; q++) { var sq = q / 40, off = W * L[0] * ((1 - L[1]) * (1 - Math.abs(2 * sq - 1)) + L[1] * Math.sin(Math.PI * sq)); var x = cx + lato * off, y = top + h * sq; if (q) g.lineTo(x, y); else g.moveTo(x, y); }
          g.stroke();
        });
      });
    }
    function etichetta3d(w, h, disegna) {
      var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      var t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
      function fai() { var g = cv.getContext('2d'); g.clearRect(0, 0, w, h); disegna(g); t.needsUpdate = true; }
      fai(); if (document.fonts && document.fonts.load) document.fonts.load('300 80px "Jost"').then(fai, function () {});
      return new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false });
    }
    var INCH = '#38352f';
    var fronteMat = etichetta3d(512, 160, function (g) {
      rombo(g, 92, 18, 124, INCH);
      g.fillStyle = INCH; g.font = '300 92px "Jost", "Futura", sans-serif'; g.textBaseline = 'middle'; g.letterSpacing = '14px'; g.fillText('VINCI', 150, 86);
    });
    var sopraMat = etichetta3d(512, 512, function (g) {
      rombo(g, 256, 40, 250, INCH);
      g.fillStyle = INCH; g.font = '300 118px "Jost", "Futura", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.letterSpacing = '18px'; g.fillText('VINCI', 265, 440); g.letterSpacing = '0px';
      g.font = '600 26px "Manrope", sans-serif'; g.fillText('C O R S O   F O G A Z Z A R O   1 4 2', 256, 488);
    });
    var fronte = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.3125), fronteMat); giro.add(fronte);
    var sopra = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), sopraMat); sopra.rotation.x = -Math.PI / 2; cerniera.add(sopra);
    var velinaRombo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.6), etichetta3d(128, 205, function (g) { g.globalAlpha = 0.22; rombo(g, 64, 6, 192, INCH); }));
    velinaRombo.rotation.x = -Math.PI / 2; velinaRombo.position.y = 0.006; giro.add(velinaRombo);

    function forma() {                         // pareti, fondo e coperchio seguono la misura attuale (LX, LZ)
      fondo.scale.set(LX, SP, LZ); fondo.position.set(0, -SP / 2, 0);
      pf.scale.set(LX, HZ, SP); pf.position.set(0, HZ / 2, LZ / 2);
      pd.scale.set(LX, HZ, SP); pd.position.set(0, HZ / 2, -LZ / 2);
      ps.scale.set(SP, HZ, LZ); ps.position.set(-LX / 2, HZ / 2, 0);
      pr.scale.set(SP, HZ, LZ); pr.position.set(LX / 2, HZ / 2, 0);
      ombra.scale.set(LX * 1.35, LZ * 1.45, 1); velina.scale.set(LX - 0.12, LZ - 0.12, 1);
      var fw = Math.min(LX * 0.62, 1.7); fronte.scale.set(fw, fw, 1); fronte.position.set(0, HZ * 0.52, LZ / 2 + SP / 2 + 0.004);
      cerniera.position.set(0, HZ + SP / 2, -LZ / 2); cerniera.rotation.x = angolo;
      lastraC.scale.set(LX + 0.04, SP, LZ + 0.04); lastraC.position.set(0, 0, LZ / 2);
      var sw = Math.min(LX, LZ) * 0.7; sopra.scale.set(sw, sw, 1); sopra.position.set(0, SP / 2 + 0.004, LZ / 2);
      var vw = Math.min(LX, LZ) * 0.22; velinaRombo.scale.set(vw, vw, 1);
    }
    forma();

    /* modelli: decodifica pigra, uno per tipo, poi istanze */
    var modelli = {}, attesa = {}, pezziScena = [];
    function daBase64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }
    function inFloat(a) { var n = a.count, k = a.itemSize, o = new Float32Array(n * k), get = ['getX', 'getY', 'getZ', 'getW']; for (var i = 0; i < n; i++) for (var j = 0; j < k; j++) o[i * k + j] = a[get[j]](i); return new THREE.BufferAttribute(o, k); }
    function carica(id, fatto) {
      if (modelli[id]) return fatto(modelli[id]);
      if (attesa[id]) return attesa[id].push(fatto);
      attesa[id] = [fatto];
      if (!MOD[id]) { modelli[id] = null; attesa[id].forEach(function (f) { f(null); }); return; }
      new THREE.GLTFLoader().parse(daBase64(MOD[id]), '', function (gltf) {
        var mesh = null; gltf.scene.updateMatrixWorld(true); gltf.scene.traverse(function (o) { if (o.isMesh && !mesh) mesh = o; });
        var geo = new THREE.BufferGeometry();
        ['position', 'normal', 'uv'].forEach(function (n) { if (mesh.geometry.attributes[n]) geo.setAttribute(n, inFloat(mesh.geometry.attributes[n])); });
        if (mesh.geometry.index) geo.setIndex(mesh.geometry.index.clone());
        geo.applyMatrix4(mesh.matrixWorld); geo.computeBoundingBox();
        var bb = geo.boundingBox, c = new THREE.Vector3(); bb.getCenter(c);
        var k = 1 / Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z);
        geo.translate(-c.x, -bb.min.y, -c.z); geo.scale(k, k, k);
        if (!geo.attributes.normal) geo.computeVertexNormals();
        var map = mesh.material.map; if (map) map.colorSpace = THREE.SRGBColorSpace;
        modelli[id] = { h: (bb.max.y - bb.min.y) * k, geo: geo, mat: new THREE.MeshStandardMaterial({ map: map, roughness: 0.62, envMapIntensity: 0.9 }) };
        attesa[id].forEach(function (f) { f(modelli[id]); });
      }, function () { modelli[id] = null; attesa[id].forEach(function (f) { f(null); }); });
    }
    /* posti nella scatola: la griglia cresce con i pezzi (fino a 4 x 3) */
    function posto(i) { var c = i % COL, r = Math.floor(i / COL) % RIG; return new THREE.Vector3((c - (COL - 1) / 2) * C, 0, (r - (RIG - 1) / 2) * C); }
    function sistema() {
      var g = GRIGLIE[Math.max(0, Math.min(GRIGLIE.length, pezziScena.length) - 1)];
      COL = g[0]; RIG = g[1]; tLX = COL * C + BORDO; tLZ = RIG * C + BORDO;
      pezziScena.forEach(function (p, i) { p.meta = posto(i); });
    }
    function aggiungi(id) {
      carica(id, function (m) {
        var o;
        if (m) { o = new THREE.Mesh(m.geo, m.mat); }
        else {                                     // ripiego: la foto ritagliata in piedi
          var tex = new THREE.TextureLoader().load('assets/' + trova(id).img); tex.colorSpace = THREE.SRGBColorSpace;
          o = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); o.geometry.translate(0, 0.5, 0); o.rotation.x = -0.6;
        }
        var s = Math.min(C * 0.86, m ? (HZ - 0.06) / Math.max(0.01, m.h) : C * 0.86); o.userData = { id: id, s: s, t0: performance.now(), via: false, giro: (Math.random() - 0.5) * 0.9 };
        o.scale.setScalar(s); o.rotation.y = o.userData.giro; o.position.set(0, 6, 0);
        giro.add(o); pezziScena.push(o); sistema();
        o.position.copy(o.meta).setY(4.2);
      });
    }
    function togli(id) {
      for (var i = pezziScena.length - 1; i >= 0; i--) if (pezziScena[i].userData.id === id && !pezziScena[i].userData.via) {
        pezziScena[i].userData.via = performance.now(); var p = pezziScena.splice(i, 1)[0]; uscita.push(p); sistema(); return;
      }
    }
    var uscita = [];
    function ridimensiona() {                   // inquadratura pensata per la scatola piu grande: con poche brioche la scatola e piccola e poi cresce
      var r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix();
      inquadra();
    }
    function inquadra() {                       // zoom sulla scatola: segue la misura attuale, con un po' di margine verso la scatola piu grande
      var MX = 4 * C + BORDO, MZ = 3 * C + BORDO, q = 0.1;
      var fx = LX + (MX - LX) * q, fz = LZ + (MZ - LZ) * q;
      var t = Math.tan(camera.fov * Math.PI / 360), dist = Math.max((fx * 0.5) / (t * camera.aspect), (fz * 0.88) / t, 2.3);
      camera.position.set(0, 0.74, 0.68).normalize().multiplyScalar(dist); camera.lookAt(0, 0.2, 0);
    }
    addEventListener('resize', ridimensiona); ridimensiona();
    /* trascina per girare la scatola */
    var yaw = -0.35, yawM = -0.35, giu = null;
    canvas.addEventListener('pointerdown', function (e) { giu = { x: e.clientX, y: yawM }; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', function (e) { if (giu) yawM = giu.y + (e.clientX - giu.x) * 0.008; });
    canvas.addEventListener('pointerup', function () { giu = null; });
    var visibile = true;
    new IntersectionObserver(function (es) { visibile = es[0].isIntersecting; }).observe(canvas);
    var ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function passo(ora) {
      requestAnimationFrame(passo);
      if (!visibile) return;
      yaw += (yawM - yaw) * 0.08; giro.rotation.y = yaw;
      var v = ridotto ? 1 : 0.12;
      LX += (tLX - LX) * v; LZ += (tLZ - LZ) * v;
      if (moto) {
        var mt = ridotto ? 1 : Math.min(1, (ora - moto.t0) / moto.dur), me = mt < 0.5 ? 4 * mt * mt * mt : 1 - Math.pow(-2 * mt + 2, 3) / 2;
        angolo = moto.da + (moto.a - moto.da) * me;
        if (mt >= 1) { moto = null; if (chiusaFatto) { var f = chiusaFatto; chiusaFatto = null; setTimeout(f, 350); } }
      }
      forma(); inquadra();
      pezziScena.forEach(function (o) {
        var t = ridotto ? 1 : Math.min(1, (ora - o.userData.t0) / 700), e = 1 - Math.pow(1 - t, 3);
        var rimb = t < 1 ? Math.abs(Math.sin(t * Math.PI * 2.2)) * (1 - t) * 0.35 : 0;
        o.position.x += (o.meta.x - o.position.x) * 0.18; o.position.z += (o.meta.z - o.position.z) * 0.18;
        o.position.y = 4.2 * (1 - e) + rimb;
      });
      for (var i = uscita.length - 1; i >= 0; i--) {
        var o = uscita[i], t = Math.min(1, (ora - o.userData.via) / 260);
        o.scale.setScalar(o.userData.s * (1 - t)); o.position.y += 0.03;
        if (t >= 1) { giro.remove(o); uscita.splice(i, 1); }
      }
      renderer.render(scene, camera);
    })(performance.now());
    /* invio: la scatola si chiude e si gira verso chi guarda, poi parte la conferma */
    function muovi(a, dur) { if (tAngolo === a && !moto) return; tAngolo = a; moto = { da: angolo, a: a, t0: performance.now(), dur: dur }; }
    function chiudi(fatto) {
      yawM = 0; chiusaFatto = fatto; muovi(0, 1100);
      setTimeout(function () { if (chiusaFatto) { var f = chiusaFatto; chiusaFatto = null; angolo = 0; moto = null; f(); } }, 3000);   // per sicurezza
    }
    function apri() { muovi(APERTO, 700); }
    return { aggiungi: aggiungi, togli: togli, chiudi: chiudi, apri: apri };
  })();

  /* arrivo da una scheda prodotto: prenota.html#cassis */
  var h = location.hash.slice(1); if (trova(h)) cambia(h, 1);
  disegna();
})();
