/* =====================================================================
   fiori-shop.js - Onoranze Funebri Serafin (SITO DIMOSTRATIVO)
   Vetrina fiori con carrello e checkout SIMULATO.
   Nessun pagamento reale, nessun dato inviato o salvato: tutto avviene
   in memoria nel browser e viene azzerato al ricaricamento della pagina.
   Studio Digital Italia.
   ===================================================================== */
(function () {
  "use strict";

  var root = document.getElementById("shop-root");
  var ui   = document.getElementById("shop-ui");
  if (!root || !ui) return;

  var IMG = "https://d8j0ntlcm91z4.cloudfront.net/user_3Fp93g3AABsPKODQxzIxBVAjWHa/";
  var DELIVERY = 15; // contributo consegna (demo)

  var PRODUCTS = [
    { id: "corona",   nome: "Corona classica",           tag: "Rose bianche e verde",     prezzo: 160, img: IMG + "hf_20260916_203853_edd540c0-a57c-4dc7-b30e-a01421e228e5_min.webp", desc: "Corona tradizionale di rose bianche e fresco fogliame, con nastro personalizzabile." },
    { id: "cuscino",  nome: "Cuscino floreale avorio",   tag: "Fiori misti chiari",       prezzo: 120, img: IMG + "hf_20260916_203808_f1601d33-dbb9-4c5c-985e-d318444e0066_min.webp", desc: "Composizione da appoggio in tonalita avorio e crema, elegante e raccolta." },
    { id: "cuore",    nome: "Cuore di fiori",            tag: "Bianco e rosa tenue",      prezzo: 140, img: IMG + "hf_20260916_203933_c638a0a8-8dc7-4bf9-a928-7788b170765f_min.webp", desc: "Cuore floreale nei toni del bianco e del rosa, un pensiero delicato e affettuoso." },
    { id: "copri",    nome: "Copri-feretro di gigli e rose", tag: "Composizione lunga",   prezzo: 220, img: IMG + "hf_20260916_203808_7d2992f1-dbc8-4714-ad0c-a93a11bb3d63_min.webp", desc: "Ampio manto floreale di gigli e rose bianche che riveste il cofano, su misura." },
    { id: "mazzo",    nome: "Mazzo di commiato",         tag: "Bouquet",                  prezzo: 45,  img: IMG + "hf_20260916_203853_fb3cfc8f-a027-4b0a-bde1-66887eb4f62e_min.webp", desc: "Bouquet raccolto di fiori bianchi e crema, da portare con se al momento del saluto." },
    { id: "classica", nome: "Composizione classica",     tag: "Rose, lilium ed eucalipto",prezzo: 90,  img: IMG + "hf_20260916_192226_711b73a4-a0e9-4752-9f5a-3134ea841f4c_min.webp", desc: "Composizione sobria di rose, lilium ed eucalipto, adatta a ogni cerimonia." },
    { id: "gigli",    nome: "Gigli e rose bianche",      tag: "Fiori freschi",            prezzo: 75,  img: IMG + "hf_20260916_192214_63cfae8a-0b66-4acf-b28d-e845f9532931_min.webp", desc: "Delicata composizione di gigli e rose bianche, luminosa e raffinata." },
    { id: "urna",     nome: "Omaggio con urna",          tag: "Piccola composizione",     prezzo: 110, img: IMG + "hf_20260916_203933_bec6815c-6327-4bc6-b3dc-cf654dea433a_min.webp", desc: "Piccola composizione bianca pensata per accompagnare l'urna, discreta e curata." }
  ];

  var cart = {}; // id -> quantita

  /* ---------- helpers ---------- */
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function eur(n) { return "€ " + n.toFixed(2).replace(".", ","); }
  function count() { var c = 0; for (var k in cart) c += cart[k]; return c; }
  function subtotal() { var s = 0; for (var k in cart) s += byId(k).prezzo * cart[k]; return s; }
  function esc(t) { return (t || "").replace(/[<>&"]/g, function (c) { return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]; }); }

  /* ---------- griglia prodotti ---------- */
  function renderGrid() {
    var head = '<div class="center narrow"><p class="eyebrow">Le composizioni</p><h2>Scegliete un omaggio floreale</h2>' +
      '<p class="lead">Prezzi indicativi, IVA inclusa. Ogni composizione e realizzata a mano con fiori freschi di stagione.</p></div>';
    var cards = PRODUCTS.map(function (p) {
      return '<article class="card prod">' +
        '<div class="card__media"><img data-fallback loading="lazy" src="' + p.img + '" alt="' + esc(p.nome) + ' - ' + esc(p.tag) + '"></div>' +
        '<div class="card__body">' +
          '<div class="card__tag">' + esc(p.tag) + '</div>' +
          '<h3>' + esc(p.nome) + '</h3><p>' + esc(p.desc) + '</p>' +
          '<div class="prod__foot">' +
            '<span class="card__price">' + eur(p.prezzo) + '</span>' +
            '<button type="button" class="btn btn--primary btn--sm" data-add="' + p.id + '">Aggiungi</button>' +
          '</div>' +
        '</div></article>';
    }).join("");
    root.innerHTML = head + '<div class="grid grid-3 shop-grid" style="margin-top:44px">' + cards + '</div>';
    if (window.__serafinAttachFallback)
      Array.prototype.forEach.call(root.querySelectorAll("img[data-fallback]"), window.__serafinAttachFallback);
  }

  /* ---------- UI: barra, drawer, checkout ---------- */
  function buildUI() {
    ui.innerHTML =
      '<button type="button" class="cart-bar" id="cart-bar" hidden aria-label="Apri il carrello">' +
        '<span class="cart-bar__ico" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h2l2.2 11.2a1 1 0 001 .8h8.2a1 1 0 001-.8L21 8H7"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>' +
          '<em class="cart-bar__badge" id="cart-badge">0</em></span>' +
        '<span class="cart-bar__txt">Vedi il carrello</span>' +
        '<span class="cart-bar__tot" id="cart-bar-tot">' + eur(0) + '</span>' +
      '</button>' +

      '<div class="drawer-scrim" id="drawer-scrim" hidden></div>' +
      '<aside class="cart-drawer" id="cart-drawer" aria-label="Carrello" aria-hidden="true">' +
        '<div class="cart-drawer__head"><b>Il tuo carrello</b>' +
          '<button type="button" class="cart-drawer__close" id="cart-close" aria-label="Chiudi">&times;</button></div>' +
        '<div class="cart-drawer__body" id="cart-body"></div>' +
        '<div class="cart-drawer__foot" id="cart-foot"></div>' +
      '</aside>' +

      '<div class="co-scrim" id="co-scrim" hidden>' +
        '<div class="co-modal" role="dialog" aria-modal="true" aria-labelledby="co-title">' +
          '<button type="button" class="co-close" id="co-close" aria-label="Chiudi">&times;</button>' +
          '<div id="co-stage"></div>' +
        '</div>' +
      '</div>';

    document.getElementById("cart-bar").addEventListener("click", openDrawer);
    document.getElementById("cart-close").addEventListener("click", closeDrawer);
    document.getElementById("drawer-scrim").addEventListener("click", closeDrawer);
    document.getElementById("co-close").addEventListener("click", closeCheckout);
    document.getElementById("co-scrim").addEventListener("click", function (e) { if (e.target === this) closeCheckout(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); closeCheckout(); } });
  }

  /* ---------- aggiornamenti ---------- */
  function updateBar() {
    var bar = document.getElementById("cart-bar");
    var n = count();
    document.getElementById("cart-badge").textContent = n;
    document.getElementById("cart-bar-tot").textContent = eur(subtotal());
    bar.hidden = n === 0;
  }

  function renderDrawer() {
    var body = document.getElementById("cart-body");
    var foot = document.getElementById("cart-foot");
    var ids = Object.keys(cart);
    if (!ids.length) {
      body.innerHTML = '<p class="cart-empty">Il carrello e vuoto.<br>Aggiungete una composizione per procedere.</p>';
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = ids.map(function (id) {
      var p = byId(id), q = cart[id];
      return '<div class="cart-item">' +
        '<img src="' + p.img + '" alt="" class="cart-item__img">' +
        '<div class="cart-item__info"><div class="cart-item__name">' + esc(p.nome) + '</div>' +
          '<div class="cart-item__price">' + eur(p.prezzo) + '</div>' +
          '<div class="qty"><button type="button" class="qty__btn" data-dec="' + id + '" aria-label="Riduci">-</button>' +
            '<span class="qty__n">' + q + '</span>' +
            '<button type="button" class="qty__btn" data-inc="' + id + '" aria-label="Aumenta">+</button>' +
            '<button type="button" class="cart-item__rm" data-rm="' + id + '">Rimuovi</button></div>' +
        '</div>' +
        '<div class="cart-item__line">' + eur(p.prezzo * q) + '</div>' +
      '</div>';
    }).join("");
    var sub = subtotal();
    foot.innerHTML =
      '<div class="cart-row"><span>Subtotale</span><span>' + eur(sub) + '</span></div>' +
      '<div class="cart-row"><span>Consegna</span><span>' + eur(DELIVERY) + '</span></div>' +
      '<div class="cart-row cart-row--tot"><span>Totale</span><span>' + eur(sub + DELIVERY) + '</span></div>' +
      '<button type="button" class="btn btn--primary btn--block" id="go-checkout" style="margin-top:16px">Procedi al pagamento</button>' +
      '<p class="cart-demo">Pagamento simulato - dimostrativo</p>';
    document.getElementById("go-checkout").addEventListener("click", openCheckout);
  }

  function refresh() { updateBar(); renderDrawer(); }

  /* ---------- azioni carrello ---------- */
  function add(id) { cart[id] = (cart[id] || 0) + 1; refresh(); flashBar(); }
  function inc(id) { cart[id] = (cart[id] || 0) + 1; refresh(); }
  function dec(id) { cart[id] = (cart[id] || 0) - 1; if (cart[id] <= 0) delete cart[id]; refresh(); }
  function rm(id)  { delete cart[id]; refresh(); }

  function flashBar() {
    var bar = document.getElementById("cart-bar");
    bar.classList.remove("pulse"); void bar.offsetWidth; bar.classList.add("pulse");
  }

  /* ---------- drawer open/close ---------- */
  function openDrawer() {
    if (!count()) return;
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
    document.getElementById("drawer-scrim").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    var d = document.getElementById("cart-drawer");
    if (!d) return;
    d.classList.remove("open"); d.setAttribute("aria-hidden", "true");
    document.getElementById("drawer-scrim").hidden = true;
    if (document.getElementById("co-scrim").hidden) document.body.style.overflow = "";
  }

  /* ---------- checkout ---------- */
  function openCheckout() {
    if (!count()) return;
    renderCheckoutForm();
    document.getElementById("co-scrim").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeCheckout() {
    document.getElementById("co-scrim").hidden = true;
    if (!document.getElementById("cart-drawer").classList.contains("open")) document.body.style.overflow = "";
  }

  function renderCheckoutForm() {
    var sub = subtotal(), tot = sub + DELIVERY;
    var righe = Object.keys(cart).map(function (id) {
      var p = byId(id); return '<li>' + cart[id] + '  x  ' + esc(p.nome) + '<span>' + eur(p.prezzo * cart[id]) + '</span></li>';
    }).join("");
    var stage = document.getElementById("co-stage");
    stage.innerHTML =
      '<span class="co-badge">Checkout dimostrativo</span>' +
      '<h2 id="co-title" class="co-h">Completa l\'ordine</h2>' +
      '<div class="co-summary"><ul>' + righe +
        '<li class="co-sub">Consegna<span>' + eur(DELIVERY) + '</span></li>' +
        '<li class="co-tot">Totale<span>' + eur(tot) + '</span></li></ul></div>' +
      '<form id="co-form" novalidate>' +
        '<h3 class="co-sec">Consegna</h3>' +
        '<div class="field"><label for="f-luogo">Dove consegnare</label>' +
          '<select id="f-luogo" required><option value="">Seleziona...</option>' +
          '<option>Chiesa / luogo della cerimonia</option><option>Casa Funeraria Serafin</option>' +
          '<option>Cimitero</option><option>Altro indirizzo</option></select></div>' +
        '<div class="field"><label for="f-ind">Indirizzo o nome del luogo</label><input id="f-ind" type="text" required placeholder="Es. Chiesa di S. Marco, Vicenza"></div>' +
        '<div class="co-two">' +
          '<div class="field"><label for="f-data">Data della consegna</label><input id="f-data" type="date" required></div>' +
          '<div class="field"><label for="f-fam">Per la famiglia / il defunto</label><input id="f-fam" type="text" placeholder="Es. Famiglia Rossi"></div>' +
        '</div>' +
        '<div class="field"><label for="f-nastro">Messaggio sul nastro (facoltativo)</label><input id="f-nastro" type="text" maxlength="80" placeholder="Es. Con affetto, la famiglia Bianchi"></div>' +

        '<h3 class="co-sec">I tuoi dati</h3>' +
        '<div class="co-two">' +
          '<div class="field"><label for="f-nome">Nome e cognome</label><input id="f-nome" type="text" autocomplete="name" required></div>' +
          '<div class="field"><label for="f-tel">Telefono</label><input id="f-tel" type="tel" autocomplete="tel" required></div>' +
        '</div>' +
        '<div class="field"><label for="f-email">Email</label><input id="f-email" type="email" autocomplete="email" required></div>' +

        '<h3 class="co-sec">Pagamento <span class="co-lock">simulato</span></h3>' +
        '<div class="field"><label for="f-card">Numero carta</label><input id="f-card" type="text" inputmode="numeric" autocomplete="off" placeholder="0000 0000 0000 0000" maxlength="19" required></div>' +
        '<div class="co-two">' +
          '<div class="field"><label for="f-exp">Scadenza</label><input id="f-exp" type="text" inputmode="numeric" placeholder="MM/AA" maxlength="5" required></div>' +
          '<div class="field"><label for="f-cvc">CVC</label><input id="f-cvc" type="text" inputmode="numeric" placeholder="123" maxlength="4" required></div>' +
        '</div>' +
        '<div class="field"><label for="f-hold">Intestatario carta</label><input id="f-hold" type="text" autocomplete="off" required></div>' +

        '<label class="co-consent"><input type="checkbox" id="f-priv" required> Ho letto l\'<a href="privacy.html" target="_blank">informativa privacy</a> e acconsento al trattamento dei dati.</label>' +
        '<p class="co-err" id="co-err" hidden></p>' +
        '<button type="submit" class="btn btn--primary btn--block" id="co-pay">Paga ' + eur(tot) + '</button>' +
        '<p class="cart-demo">Nessun addebito reale: i dati della carta non vengono inviati ne salvati.</p>' +
      '</form>';

    // formattazioni campo carta
    var card = document.getElementById("f-card");
    card.addEventListener("input", function () {
      var v = card.value.replace(/\D/g, "").slice(0, 16);
      card.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
    var exp = document.getElementById("f-exp");
    exp.addEventListener("input", function () {
      var v = exp.value.replace(/\D/g, "").slice(0, 4);
      exp.value = v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v;
    });
    document.getElementById("f-cvc").addEventListener("input", function (e) { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4); });
    // data minima = oggi
    document.getElementById("f-data").min = new Date().toISOString().slice(0, 10);

    document.getElementById("co-form").addEventListener("submit", submitOrder);
  }

  function submitOrder(e) {
    e.preventDefault();
    var err = document.getElementById("co-err");
    var f = document.getElementById("co-form");
    var card = f.querySelector("#f-card").value.replace(/\s/g, "");
    var exp = f.querySelector("#f-exp").value;
    var cvc = f.querySelector("#f-cvc").value;

    // validazioni base (demo)
    if (!f.checkValidity()) { showErr("Compilate tutti i campi obbligatori."); f.reportValidity(); return; }
    if (card.length < 15) { showErr("Il numero della carta non e valido."); return; }
    if (!/^\d{2}\/\d{2}$/.test(exp) || parseInt(exp.slice(0, 2), 10) > 12 || parseInt(exp.slice(0, 2), 10) < 1) { showErr("La scadenza non e valida (formato MM/AA)."); return; }
    if (cvc.length < 3) { showErr("Il codice CVC non e valido."); return; }
    err.hidden = true;

    var btn = document.getElementById("co-pay");
    btn.disabled = true; btn.textContent = "Elaborazione in corso...";
    setTimeout(function () { showConfirmation(); }, 1100); // finta elaborazione
    function showErr(m) { err.textContent = m; err.hidden = false; err.scrollIntoView({ block: "nearest" }); }
  }

  function showConfirmation() {
    var num = "SRF-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    var tot = subtotal() + DELIVERY;
    var stage = document.getElementById("co-stage");
    stage.innerHTML =
      '<div class="order-ok">' +
        '<div class="order-ok__ic" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="21"/><path d="M15 24.5l6 6 12-13"/></svg></div>' +
        '<h2 class="co-h">Ordine confermato</h2>' +
        '<p>Grazie. Il vostro ordine floreale e stato registrato correttamente.</p>' +
        '<div class="order-ok__num">Numero ordine<br><b>' + num + '</b></div>' +
        '<p class="order-ok__tot">Totale simulato: <b>' + eur(tot) + '</b></p>' +
        '<p class="cart-demo">Promemoria: questa e una dimostrazione. Nessun pagamento e stato eseguito e nessuna email di conferma verra inviata. Per un ordine reale, chiamateci allo +39 0444 000 000.</p>' +
        '<button type="button" class="btn btn--primary" id="ok-done">Chiudi</button>' +
      '</div>';
    cart = {};
    refresh();
    document.getElementById("ok-done").addEventListener("click", function () { closeCheckout(); closeDrawer(); });
  }

  /* ---------- deleghe eventi ---------- */
  root.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]"); if (b) add(b.getAttribute("data-add"));
  });
  ui.addEventListener("click", function (e) {
    var t = e.target.closest("[data-inc],[data-dec],[data-rm]"); if (!t) return;
    if (t.hasAttribute("data-inc")) inc(t.getAttribute("data-inc"));
    else if (t.hasAttribute("data-dec")) dec(t.getAttribute("data-dec"));
    else if (t.hasAttribute("data-rm")) rm(t.getAttribute("data-rm"));
  });

  /* ---------- init ---------- */
  renderGrid();
  buildUI();
  refresh();
})();
