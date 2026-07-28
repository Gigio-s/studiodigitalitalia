/* =====================================================================
   experiences.js — card esperienze, dettaglio, filtro e flusso richiesta.
   Dati da assets/data/experiences-data.js.
   ===================================================================== */
(function () {
  "use strict";
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var E = (window.MR && window.MR.experiences) || [];

  function cardHTML(x) {
    var link = ROOT + "esperienze/" + x.slug + ".html";
    return '<article class="card">' +
      '<a href="' + link + '" class="card__media"><span class="placeholder ' + x.ph + '" data-label="' + x.name + '"></span></a>' +
      '<div class="card__body">' +
        '<span class="chip chip--accent">' + x.category + '</span>' +
        '<h3 class="card__title"><a href="' + link + '" style="text-decoration:none;color:inherit">' + x.name + '</a></h3>' +
        '<p class="small muted">' + x.short + '</p>' +
        '<div class="card__meta"><span>⏱ ' + x.duration + '</span><span>📅 ' + x.period + '</span><span>👥 ' + x.minPeople + '–' + x.maxPeople + '</span></div>' +
        '<div class="card__foot"><span class="card__price">da €' + x.priceFrom + '</span>' +
        '<a class="btn btn--ghost btn--sm" href="' + link + '">Dettagli</a></div>' +
      '</div></article>';
  }

  function renderList() {
    var mount = document.querySelector("[data-experiences-list]");
    if (!mount) return;
    var filter = document.querySelector("[data-exp-filter]");
    function draw(cat) {
      var items = cat && cat !== "tutte" ? E.filter(function (x) { return x.category === cat; }) : E;
      mount.innerHTML = items.map(cardHTML).join("");
    }
    draw("tutte");
    if (filter) filter.addEventListener("change", function () { draw(filter.value); });
  }

  function renderDetail() {
    var mount = document.querySelector("[data-experience-detail]");
    if (!mount) return;
    var slug = mount.getAttribute("data-experience-detail");
    var x = E.filter(function (e) { return e.slug === slug; })[0];
    if (!x) { mount.innerHTML = "<p>Esperienza non trovata.</p>"; return; }
    document.title = x.name + " — Masseria Radice";
    set("[data-exp-name]", x.name); set("[data-exp-crumb]", x.name); set("[data-exp-intro]", x.short);
    var spec = [
      ["Categoria", x.category], ["Periodo", x.period], ["Durata", x.duration],
      ["Prezzo indicativo", "da €" + x.priceFrom + " a persona"], ["Partecipanti", x.minPeople + "–" + x.maxPeople],
      ["Età minima", x.minAge === 0 ? "Tutte le età" : x.minAge + "+"], ["Lingua", x.language],
      ["Meteo", x.weatherDependent ? "Dipende dal meteo" : "Al coperto / indipendente"]
    ].map(function (s) { return "<li><span>" + s[0] + "</span><b>" + s[1] + "</b></li>"; }).join("");
    q("[data-exp-spec]").innerHTML = spec;
    q("[data-exp-includes]").innerHTML = x.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("");
    var gal = q("[data-exp-gallery]");
    if (gal) gal.innerHTML = ["Attività","Ambiente","Dettaglio"].map(function (l) {
      return '<span class="placeholder ' + x.ph + '" data-label="' + x.name + " — " + l + '"></span>'; }).join("");
    var alt = q("[data-exp-alt]");
    if (alt) alt.innerHTML = E.filter(function (e) { return e.slug !== slug; }).slice(0, 3).map(cardHTML).join("");
    var book = q("[data-exp-book]");
    if (book) book.href = ROOT + "prenota-esperienza.html?exp=" + x.slug;
    window.trackEvent("experience_view", { slug: x.slug });

    function q(s) { return mount.querySelector(s); }
    function set(s, v) { var el = mount.querySelector(s); if (el) el.textContent = v; }
  }

  // popola la select nella pagina prenota-esperienza
  function fillExperienceSelect() {
    var sel = document.querySelector("[data-exp-select]");
    if (!sel) return;
    sel.innerHTML = '<option value="">Scegli un\'esperienza…</option>' +
      E.map(function (x) { return '<option value="' + x.slug + '">' + x.name + " (da €" + x.priceFrom + ")</option>"; }).join("");
    var params = new URLSearchParams(location.search);
    if (params.get("exp")) sel.value = params.get("exp");
  }

  function q(s) { return document.querySelector(s); }

  document.addEventListener("DOMContentLoaded", function () {
    renderList(); renderDetail(); fillExperienceSelect();
  });
})();
