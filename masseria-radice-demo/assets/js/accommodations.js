/* =====================================================================
   accommodations.js — rende le card degli alloggi e la pagina dettaglio.
   Dati da assets/data/accommodations-data.js. Nessun fetch.
   ===================================================================== */
(function () {
  "use strict";
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var A = (window.MR && window.MR.accommodations) || [];

  function euro(n) { return "€" + n; }

  function cardHTML(a) {
    var link = ROOT + "alloggi/" + a.slug + ".html";
    var meta = [
      '<span>👤 ' + a.guests + " ospiti</span>",
      "<span>▢ " + a.size + " m²</span>",
      "<span>🛏 " + a.bed + "</span>"
    ];
    if (a.kitchen) meta.push("<span>🍳 Cucina</span>");
    if (a.accessible) meta.push("<span>♿ Accessibile</span>");
    return '<article class="card">' +
      '<a href="' + link + '" class="card__media"><span class="placeholder ' + a.ph + '" data-label="' + a.name + '"></span></a>' +
      '<div class="card__body">' +
        '<span class="chip chip--olive">' + a.type + "</span>" +
        '<h3 class="card__title"><a href="' + link + '" style="text-decoration:none;color:inherit">' + a.name + "</a></h3>" +
        '<p class="small muted">' + a.short + "</p>" +
        '<div class="card__meta">' + meta.join("") + "</div>" +
        '<div class="card__foot">' +
          '<span class="card__price">da ' + euro(a.priceFrom) + " <small>/ notte</small></span>" +
          '<a class="btn btn--ghost btn--sm" href="' + link + '">Scopri</a>' +
        "</div>" +
      "</div></article>";
  }

  function renderList() {
    var mount = document.querySelector("[data-accommodations-list]");
    if (!mount) return;
    mount.innerHTML = A.map(cardHTML).join("");
    A.forEach(function () {});
  }

  function renderDetail() {
    var mount = document.querySelector("[data-accommodation-detail]");
    if (!mount) return;
    var slug = mount.getAttribute("data-accommodation-detail");
    var a = A.filter(function (x) { return x.slug === slug; })[0];
    if (!a) { mount.innerHTML = "<p>Alloggio non trovato.</p>"; return; }

    document.title = a.name + " — Masseria Radice";
    var h1 = document.querySelector("[data-acc-name]"); if (h1) h1.textContent = a.name;
    var bc = document.querySelector("[data-acc-crumb]"); if (bc) bc.textContent = a.name;
    var intro = document.querySelector("[data-acc-intro]"); if (intro) intro.textContent = a.short;

    var spec = [
      ["Ospiti", a.guests], ["Metratura", a.size + " m²"], ["Letto", a.bed],
      ["Spazio esterno", a.outdoor], ["Cucina", a.kitchen ? "Sì" : "No"],
      ["Accessibilità", a.accessible ? "Accessibile" : "Non completamente accessibile"],
      ["Soggiorno minimo", a.minNights + " notti"], ["Bambini", a.allowsChild ? "Ammessi" : "Non ideale"],
      ["Animali", a.allowsPet ? "Ammessi su richiesta" : "Non ammessi"]
    ].map(function (s) { return "<li><span>" + s[0] + "</span><b>" + s[1] + "</b></li>"; }).join("");
    mount.querySelector("[data-acc-spec]").innerHTML = spec;

    mount.querySelector("[data-acc-features]").innerHTML =
      a.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
    mount.querySelector("[data-acc-included]").innerHTML =
      a.included.map(function (f) { return "<li>" + f + "</li>"; }).join("");
    mount.querySelector("[data-acc-price]").innerHTML = "da <b>" + euro(a.priceFrom) + "</b> / notte";

    var gal = mount.querySelector("[data-acc-gallery]");
    if (gal) {
      var labels = ["Ambiente", "Bagno", "Vista", "Dettaglio"];
      gal.innerHTML = labels.map(function (l) {
        return '<span class="placeholder ' + a.ph + '" data-label="' + a.name + " — " + l + '"></span>';
      }).join("");
    }

    // alloggi alternativi
    var alt = mount.querySelector("[data-acc-alt]");
    if (alt) {
      alt.innerHTML = A.filter(function (x) { return x.slug !== slug; }).slice(0, 3).map(cardHTML).join("");
    }

    // link prenota con parametro
    var book = mount.querySelector("[data-acc-book]");
    if (book) book.href = ROOT + "prenota.html?alloggio=" + a.slug;

    window.trackEvent("accommodation_view", { slug: a.slug });
  }

  document.addEventListener("DOMContentLoaded", function () { renderList(); renderDetail(); });
})();
