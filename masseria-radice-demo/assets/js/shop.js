/* =====================================================================
   shop.js — shop dimostrativo + carrello in localStorage.
   Nessun ordine reale. Integrazioni future: WooCommerce, Shopify,
   Snipcart, Stripe Payment Links (vedi README).
   ===================================================================== */
(function () {
  "use strict";
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var P = (window.MR && window.MR.products) || [];
  var KEY = "mr_cart";

  function getCart() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(KEY, JSON.stringify(c)); if (window.MR.updateCartBadge) window.MR.updateCartBadge(); }
  function addToCart(slug, qty) {
    var c = getCart(), row = c.filter(function (x) { return x.slug === slug; })[0];
    if (row) row.qty += qty; else c.push({ slug: slug, qty: qty });
    saveCart(c);
    var p = P.filter(function (x) { return x.slug === slug; })[0];
    window.trackEvent("add_to_cart", { slug: slug, qty: qty, value: p ? p.price * qty : 0 });
  }

  function productCard(p) {
    var link = ROOT + "prodotti.html#" + p.slug;
    return '<article class="card product-card" id="' + p.slug + '">' +
      '<span class="card__media"><span class="placeholder ' + p.ph + '" data-label="' + p.name + '"></span></span>' +
      '<div class="card__body">' +
        '<span class="chip chip--olive">' + p.cat + '</span>' +
        '<h3 class="card__title" style="font-size:1.2rem">' + p.name + '</h3>' +
        '<p class="small muted">' + p.desc + '</p>' +
        '<p class="small muted" style="margin:0"><b>Formato:</b> ' + p.format + ' · <b>Allergeni:</b> ' + p.allergens + '</p>' +
        '<div class="card__foot"><span class="card__price">€' + p.price + '</span>' +
        '<button class="btn btn--primary btn--sm" data-add="' + p.slug + '">Aggiungi</button></div>' +
      '</div></article>';
  }

  function renderProducts() {
    var mount = document.querySelector("[data-products-list]");
    if (!mount) return;
    var filter = document.querySelector("[data-product-filter]");
    function draw(cat) {
      var items = cat && cat !== "tutti" ? P.filter(function (p) { return p.cat === cat; }) : P;
      mount.innerHTML = items.map(productCard).join("");
      mount.querySelectorAll("[data-add]").forEach(function (b) {
        b.addEventListener("click", function () {
          addToCart(b.getAttribute("data-add"), 1);
          b.textContent = "Aggiunto ✓";
          setTimeout(function () { b.textContent = "Aggiungi"; }, 1200);
        });
      });
    }
    draw("tutti");
    if (filter) filter.addEventListener("change", function () { draw(filter.value); });
  }

  function renderCart() {
    var mount = document.querySelector("[data-cart]");
    if (!mount) return;
    function draw() {
      var c = getCart();
      var body = mount.querySelector("[data-cart-body]");
      var sumEl = mount.querySelector("[data-cart-summary]");
      if (!c.length) {
        body.innerHTML = '<div class="cart-empty"><p>Il carrello è vuoto.</p><a class="btn btn--ghost" href="' + ROOT + 'prodotti.html">Vai ai prodotti</a></div>';
        if (sumEl) sumEl.innerHTML = "";
        return;
      }
      var subtotal = 0;
      body.innerHTML = c.map(function (row) {
        var p = P.filter(function (x) { return x.slug === row.slug; })[0];
        if (!p) return "";
        var line = p.price * row.qty; subtotal += line;
        return '<div class="cart-line" data-row="' + p.slug + '">' +
          '<span class="placeholder ' + p.ph + '" data-label=""></span>' +
          '<div><div class="name">' + p.name + '</div><div class="small muted">' + p.format + ' · €' + p.price + '</div>' +
          '<button class="rm" data-rm="' + p.slug + '">Rimuovi</button></div>' +
          '<div style="text-align:right"><div class="qty"><button data-dec="' + p.slug + '" aria-label="Riduci">−</button>' +
          '<input type="text" value="' + row.qty + '" readonly aria-label="Quantità"><button data-inc="' + p.slug + '" aria-label="Aumenta">+</button></div>' +
          '<div class="card__price" style="margin-top:.4rem">€' + line + '</div></div></div>';
      }).join("");
      var shipping = subtotal >= 60 ? 0 : 7; // spedizione demo
      var total = subtotal + shipping;
      if (sumEl) sumEl.innerHTML =
        '<h3>Riepilogo</h3><ul class="summary-lines">' +
        '<li><span>Subtotale</span><span>€' + subtotal + '</span></li>' +
        '<li><span>Spedizione (demo)</span><span>' + (shipping ? "€" + shipping : "Gratis") + '</span></li>' +
        '<li class="total"><span>Totale</span><span>€' + total + '</span></li></ul>' +
        '<div class="note-demo">Negozio dimostrativo. Nessun ordine verrà effettuato.</div>' +
        '<button class="btn btn--primary btn--block" data-checkout>Vai al pagamento (demo)</button>';

      body.querySelectorAll("[data-inc]").forEach(function (b) { b.onclick = function () { change(b.getAttribute("data-inc"), 1); }; });
      body.querySelectorAll("[data-dec]").forEach(function (b) { b.onclick = function () { change(b.getAttribute("data-dec"), -1); }; });
      body.querySelectorAll("[data-rm]").forEach(function (b) { b.onclick = function () { remove(b.getAttribute("data-rm")); }; });
      var co = sumEl && sumEl.querySelector("[data-checkout]");
      if (co) co.onclick = function () {
        var s = mount.querySelector("[data-checkout-status]");
        if (s) { s.className = "form-status ok"; s.textContent = "Questa è una demo. Nessun pagamento è stato elaborato."; }
      };
    }
    function change(slug, delta) {
      var c = getCart(), row = c.filter(function (x) { return x.slug === slug; })[0];
      if (!row) return; row.qty += delta;
      if (row.qty < 1) c = c.filter(function (x) { return x.slug !== slug; });
      saveCart(c); draw();
    }
    function remove(slug) { saveCart(getCart().filter(function (x) { return x.slug !== slug; })); draw(); }
    draw();
  }

  document.addEventListener("DOMContentLoaded", function () { renderProducts(); renderCart(); });
})();
