/* ATELIER QUOTA — projects.js
   Rendering delle schede progetto (home + portfolio) dai dati locali. */
(function () {
  "use strict";
  window.AQ = window.AQ || {};
  var L = window.AQ_LABELS || {};
  var BASE = (document.body && document.body.dataset.base) || "";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  }); }
  AQ.esc = esc;

  function placeholder(p, ratio, tag) {
    return '<div class="ph ' + p.tone + ' ' + ratio + '" role="img" aria-label="' + esc(p.name) +
      ' — immagine dimostrativa">' +
      '<span class="ph-num">' + p.num + '</span>' +
      '<span class="ph-tag">' + esc(tag || p.location) + '</span></div>';
  }
  AQ.placeholder = placeholder;

  function cardHTML(p, cls) {
    var typeLabel = (L.type && L.type[p.type[0]]) || p.type[0];
    var statusLabel = (L.status && L.status[p.status]) || p.status;
    var href = BASE + "progetti/" + p.slug + ".html";
    return '<article class="project-card ' + (cls || "") + '" ' +
      'data-type="' + p.type.join(" ") + '" data-services="' + p.services.join(" ") + '" ' +
      'data-status="' + p.status + '" data-area="' + p.area.join(" ") + '" ' +
      'data-name="' + esc(p.name.toLowerCase()) + '" data-year="' + p.year + '">' +
      '<a href="' + href + '" onclick="if(window.trackEvent)trackEvent(\'project_open\',{slug:\'' + p.slug + '\'})">' +
        '<div class="media ratio-4-3">' + placeholder(p, "ratio-4-3") + '</div>' +
        '<div class="pc-meta"><span>' + esc(typeLabel) + '</span><span>' + esc(String(p.year)) + '</span></div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(p.summary) + '</p>' +
        '<div class="pc-foot"><span class="tag">' + esc(p.location) + '</span>' +
        '<span class="tag">' + esc(statusLabel) + '</span>' +
        '<span class="link-arrow" style="margin-left:auto">Apri il progetto <span aria-hidden="true">→</span></span></div>' +
      '</a></article>';
  }
  AQ.cardHTML = cardHTML;

  // Home: griglia editoriale con dimensioni variabili
  AQ.renderHomeGrid = function (containerId) {
    var el = document.getElementById(containerId);
    if (!el || !window.AQ_PROJECTS) return;
    var order = ["feature", "small", "", "", "feature", "small"];
    el.innerHTML = window.AQ_PROJECTS.slice(0, 6).map(function (p, i) {
      return cardHTML(p, order[i] || "");
    }).join("");
  };

  // Portfolio: griglia piena (usata anche dai filtri)
  AQ.renderAll = function (containerId, list) {
    var el = document.getElementById(containerId);
    if (!el) return;
    list = list || window.AQ_PROJECTS || [];
    el.innerHTML = list.map(function (p) { return cardHTML(p, ""); }).join("");
  };
})();
