/* VINCI demo v6 - Cassis 3D della home: modello generato con Higgsfield dalle foto della Cassis (js/cassis-modello.js).
   Percorso con lo scroll, come il cocco di Palmo: hero -> "Il cuore di ogni strato" (si apre a meta) -> "Cassis"
   -> "Strato su strato" (al centro tra le parole). Poi resta li e scorre via con la pagina.
   Posizioni lette dagli elementi [data-ancora]. Il taglio usa la foto vera della sezione (sfoglia al cassis, croustillant, crumble). */
(function () {
  'use strict';
  var canvas = document.getElementById('scena');
  var ancore = Array.prototype.slice.call(document.querySelectorAll('[data-ancora]'));
  var DATI = window.VINCI_CASSIS;
  if (!canvas || !window.THREE || !THREE.GLTFLoader || !DATI || !ancore.length) { document.documentElement.classList.add('no-3d'); return; }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { document.documentElement.classList.add('no-3d'); return; }
  document.documentElement.classList.add('con-3d');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.localClippingEnabled = true;

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

  var sole_luce = new THREE.DirectionalLight(0xfff0d8, 1.3);
  sole_luce.position.set(-2, 3, 4); scene.add(sole_luce);

  /* ---------- la Cassis: modello GLB incorporato ---------- */
  var dolce = new THREE.Group();      // posizione, scala, inclinazione
  var perno = new THREE.Group();      // rotazione sul proprio asse
  dolce.add(perno); scene.add(dolce);
  // due meta dello stesso modello: A (sinistra) resta "da fuori", B (destra) si gira e mostra il taglio
  var pianoA = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e6), pianoB = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e6);
  var metaA = null, metaB = null, caricatoT = 0;

  function daBase64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }
  function inFloat(attr) {                        // il modello e quantizzato: torna a numeri pieni prima di spostarlo
    var n = attr.count, k = attr.itemSize, out = new Float32Array(n * k), get = ['getX', 'getY', 'getZ', 'getW'];
    for (var i = 0; i < n; i++) for (var j = 0; j < k; j++) out[i * k + j] = attr[get[j]](i);
    return new THREE.BufferAttribute(out, k);
  }
  /* profilo della sezione a x = 0, letto dal modello stesso: per ogni fascia di z il punto piu alto e piu basso */
  function profiloSezione(geo) {
    var p = geo.attributes.position, idx = geo.index, N = 160, alto = [], basso = [], i, e;
    for (i = 0; i < N; i++) { alto.push(-9); basso.push(9); }
    var n = idx ? idx.count : p.count, a = [0, 0, 0], seg = [];
    function v(q) { return idx ? idx.getX(q) : q; }
    function segna(z, y) { var q = Math.max(0, Math.min(N - 1, Math.floor((z + 1) / 2 * N))); if (y > alto[q]) alto[q] = y; if (y < basso[q]) basso[q] = y; }
    for (i = 0; i < n; i += 3) {               // ogni triangolo che attraversa il piano lascia un segmento
      a[0] = v(i); a[1] = v(i + 1); a[2] = v(i + 2); seg.length = 0;
      for (e = 0; e < 3; e++) {
        var u = a[e], w = a[(e + 1) % 3], xu = p.getX(u), xw = p.getX(w);
        if ((xu < 0) === (xw < 0)) continue;
        var t = xu / (xu - xw);
        seg.push(p.getZ(u) + (p.getZ(w) - p.getZ(u)) * t, p.getY(u) + (p.getY(w) - p.getY(u)) * t);
      }
      if (seg.length < 4) continue;
      var z0 = seg[0], y0 = seg[1], z1 = seg[2], y1 = seg[3], passi = Math.max(1, Math.ceil(Math.abs(z1 - z0) / 2 * N * 2));
      for (e = 0; e <= passi; e++) { var f = e / passi; segna(z0 + (z1 - z0) * f, y0 + (y1 - y0) * f); }
    }
    var su = [], giu = [];
    for (i = 0; i < N; i++) if (alto[i] > -9) { var zc = (i + 0.5) / N * 2 - 1; su.push([zc, alto[i]]); giu.push([zc, basso[i]]); }
    function liscio(l) { return l.map(function (q, j) { var s = 0, c = 0; for (var d = -2; d <= 2; d++) { var r = l[j + d]; if (r) { s += r[1]; c++; } } return [q[0], s / c]; }); }
    su = liscio(su); giu = liscio(giu);
    return su.concat(giu.reverse());
  }
  function creaSezione(geo) {
    var pts = profiloSezione(geo), forma = new THREE.Shape(), zmin = 9, zmax = -9, ymin = 9, ymax = -9;
    pts.forEach(function (q, n) { if (n) forma.lineTo(q[0] * 0.992, q[1] * 0.992); else forma.moveTo(q[0] * 0.992, q[1] * 0.992);
      zmin = Math.min(zmin, q[0]); zmax = Math.max(zmax, q[0]); ymin = Math.min(ymin, q[1]); ymax = Math.max(ymax, q[1]); });
    var img = new Image(), tex = new THREE.Texture(img);
    img.onload = function () { tex.needsUpdate = true; };
    img.src = DATI.sezione;                        // foto della sezione vera, incorporata come dato (funziona anche da file)
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    tex.repeat.set(1 / (zmax - zmin), 1 / (ymax - ymin)); tex.offset.set(-zmin / (zmax - zmin), -ymin / (ymax - ymin));
    var g = new THREE.ShapeGeometry(forma); g.rotateY(-Math.PI / 2);          // dal piano XY al piano di taglio (ZY)
    return { geo: g, mat: new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, side: THREE.DoubleSide, envMapIntensity: 0.6 }) };
  }
  function meta(geo, mappa, sez, piano, lato) {
    var g = new THREE.Group();
    var m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ map: mappa, roughness: 0.6, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.45, envMapIntensity: 0.85, clippingPlanes: [piano] }));
    var faccia = new THREE.Mesh(sez.geo, sez.mat); faccia.position.x = lato * 0.004;
    g.add(m, faccia); g.userData.faccia = faccia; perno.add(g); return g;
  }
  new THREE.GLTFLoader().parse(daBase64(DATI.glb), '', function (gltf) {
    var mesh = null; gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse(function (o) { if (o.isMesh && !mesh) mesh = o; });
    if (!mesh) return;
    var geo = new THREE.BufferGeometry();
    ['position', 'normal', 'uv'].forEach(function (n) { if (mesh.geometry.attributes[n]) geo.setAttribute(n, inFloat(mesh.geometry.attributes[n])); });
    if (mesh.geometry.index) geo.setIndex(mesh.geometry.index.clone());
    geo.applyMatrix4(mesh.matrixWorld);
    geo.computeBoundingBox();
    var bb = geo.boundingBox, c = new THREE.Vector3(); bb.getCenter(c);
    var k = 2 / Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z);
    geo.translate(-c.x, -c.y, -c.z); geo.scale(k, k, k);
    if (!geo.attributes.normal) geo.computeVertexNormals();
    var mappa = mesh.material.map; if (mappa) { mappa.colorSpace = THREE.SRGBColorSpace; mappa.anisotropy = 8; }
    var sez = creaSezione(geo); 
    metaA = meta(geo, mappa, sez, pianoA, -1); metaB = meta(geo, mappa, sez, pianoB, 1);
    caricatoT = performance.now();
  }, function () { document.documentElement.classList.add('no-3d'); });

  var qTmp = new THREE.Quaternion(), pTmp = new THREE.Vector3(), nTmp = new THREE.Vector3();
  function aggiornaTaglio(o) {                   // o: 0 = Cassis intera, 1 = aperta
    if (!metaA) return;
    var aperto = o > 0.002;
    metaB.visible = aperto; metaA.userData.faccia.visible = aperto;
    metaA.position.x = -0.62 * o; metaA.rotation.y = -0.30 * o;
    metaB.position.x = 0.62 * o; metaB.rotation.y = Math.PI / 2 * o;         // la sezione si gira verso chi guarda
    dolce.updateMatrixWorld(true);
    if (!aperto) { pianoA.constant = 1e6; return; }
    metaA.getWorldQuaternion(qTmp); metaA.getWorldPosition(pTmp); pianoA.setFromNormalAndCoplanarPoint(nTmp.set(-1, 0, 0).applyQuaternion(qTmp), pTmp);
    metaB.getWorldQuaternion(qTmp); metaB.getWorldPosition(pTmp); pianoB.setFromNormalAndCoplanarPoint(nTmp.set(1, 0, 0).applyQuaternion(qTmp), pTmp);
  }

  /* ---------- regia ---------- */
  var ORDINE = ['eroe', 'cuore', 'prodotto', 'strato'];
  var POSE = {                      // rx: inclinazione (PI/2 = spirale di fronte), rz: rollio, k: scala rispetto all'ancora
    eroe:     { rx: 0.62, rz: -0.20, k: 1.00 },
    cuore:    { rx: 0.42, rz: 0.00,  k: 0.86 },
    prodotto: { rx: 1.42, rz: 0.10,  k: 1.00 },
    strato:   { rx: 1.10, rz: -0.14, k: 1.00 }
  };
  var GIRO = 0.35;                  // radianti al secondo
  var A = ORDINE.map(function (n) { return document.querySelector('[data-ancora="' + n + '"]'); });
  var sezCuore = document.querySelector('.cuore');
  var ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches, vw = 1, vh = 1;
  function ridimensiona() {
    vw = innerWidth; vh = innerHeight; renderer.setSize(vw, vh, false);
    camera.left = -vw / 2; camera.right = vw / 2; camera.top = vh / 2; camera.bottom = -vh / 2; camera.updateProjectionMatrix();
  }
  addEventListener('resize', ridimensiona); ridimensiona();
  var mouse = { x: 0, y: 0 }, mx = 0, my = 0;
  addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; mouse.x = e.clientX / vw * 2 - 1; mouse.y = e.clientY / vh * 2 - 1; }, { passive: true });
  function lim(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function liscia(t) { t = lim(t); return t * t * (3 - 2 * t); }
  function tra(p, a, b) { return liscia((p - a) / (b - a)); }

  var giro = 0, prec = 0, ultimoY = scrollY, spinta = 0, st = null;
  function fotogramma(ora) {
    requestAnimationFrame(fotogramma);
    if (!prec) prec = ora;
    var dt = Math.min(0.05, (ora - prec) / 1000); prec = ora;
    var sy = scrollY;
    // arrivo di ogni ancora: scroll a cui e "a casa" e quanto ci resta (la sezione del cuore resta ferma)
    var R = A.map(function (el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, s: Math.min(r.width, r.height) / 2, r: r }; });
    var T = [], D = [];
    A.forEach(function (el, i) {
      if (i === 0) { T.push(0); D.push(vh * 0.12); return; }
      var sp = el.closest('[data-pin]');                 // sezioni ferme (cuore, prodotto): la Cassis resta li per tutta la corsa
      if (sp && sp.offsetHeight > vh * 1.2) { T.push(sp.getBoundingClientRect().top + sy); D.push(sp.offsetHeight - vh); return; }
      T.push(R[i].y + sy - vh / 2); D.push(vh * 0.12);
    });
    for (var i = 1; i < T.length; i++) T[i] = Math.max(T[i], T[i - 1] + D[i - 1] + 1);
    var k = A.length - 1, t = 0;
    for (i = 0; i < A.length - 1; i++) if (sy < T[i + 1]) { k = i; t = lim((sy - (T[i] + D[i])) / (T[i + 1] - T[i] - D[i])); break; }
    var a = R[k], b = R[Math.min(k + 1, A.length - 1)], pa = POSE[ORDINE[k]], pb = POSE[ORDINE[Math.min(k + 1, A.length - 1)]];
    var e = liscia(t), arco = Math.sin(Math.PI * t);
    var x = a.x + (b.x - a.x) * e, y = a.y + (b.y - a.y) * e - arco * vh * 0.04;
    var s = (a.s * pa.k + (b.s * pb.k - a.s * pa.k) * e) * (1 - 0.15 * arco);
    var rx = pa.rx + (pb.rx - pa.rx) * e, rz = pa.rz + (pb.rz - pa.rz) * e + arco * 0.25;

    // nel cuore: la Cassis si ferma sempre sullo stesso lato e si apre a meta, poi si richiude
    var pc = (window.vinci && window.vinci.pin && window.vinci.pin.cuore) || 0, nelCuore = k === 1 && t === 0 && sy >= T[1];
    var o = nelCuore ? tra(pc, 0.12, 0.36) * (1 - tra(pc, 0.74, 0.92)) : 0;
    var blocca = nelCuore ? tra(pc, 0, 0.1) * (1 - tra(pc, 0.92, 1)) : 0;

    // entrata dopo il caricamento
    var nasce = 1;
    if (window.vinci && !ridotto) nasce = window.vinci.pronto && caricatoT ? liscia((performance.now() - Math.max(window.vinci.prontoT, caricatoT)) / 900) : 0;
    if (!metaA) nasce = 0;

    var ds = sy - ultimoY; ultimoY = sy; spinta += (ds * 0.004 - spinta) * 0.1;
    if (!ridotto) giro += (dt * GIRO + spinta) * (1 - blocca);
    var fermo = Math.round(giro / (Math.PI * 2)) * Math.PI * 2;
    mx += (mouse.x - mx) * 0.05; my += (mouse.y - my) * 0.05;
    if (!st) st = { x: x, y: y };
    st.x = x; st.y = y;
    var ultimo = R[A.length - 1].r;
    dolce.visible = nasce > 0.01 && !(k === A.length - 1 && ultimo.bottom < -vh * 0.2);
    dolce.position.set(x - vw / 2, vh / 2 - y, 0);
    dolce.scale.setScalar(Math.max(0.001, s * (1 - STRINGI * o) * nasce));
    dolce.rotation.set(rx + my * 0.12, 0, rz + mx * 0.08, 'ZXY');
    perno.rotation.y = giro + (fermo - giro) * blocca + mx * 0.5 * (1 - blocca) + (1 - nasce) * 3;
    aggiornaTaglio(o);
    renderer.render(scene, camera);
  }
  var STRINGI = 0.22;
  requestAnimationFrame(fotogramma);
})();
