/* ATELIER QUOTA — project-page.js
   Costruisce la pagina del singolo progetto dai dati locali, in base a
   document.body.dataset.slug. Inietta anche il JSON-LD (CreativeWork+Breadcrumb). */
(function () {
  "use strict";
  var slug = document.body.dataset.slug;
  var P = window.AQ_PROJECTS || [];
  var L = window.AQ_LABELS || {};
  var esc = window.AQ.esc;
  var ph = window.AQ.placeholder;
  var BASE = document.body.dataset.base || "";
  var root = document.getElementById("project-root");
  if (!root || !slug) return;

  var idx = P.findIndex(function (p) { return p.slug === slug; });
  var p = P[idx];
  if (!p) { root.innerHTML = "<div class='wrap section'><p>Progetto non trovato.</p></div>"; return; }

  var prev = P[(idx - 1 + P.length) % P.length];
  var next = P[(idx + 1) % P.length];
  var lbl = function (m, k) { return (L[m] && L[m][k]) || k; };

  function narrative(label, title, body) {
    if (!body) return "";
    var paras = Array.isArray(body) ? body : [body];
    return '<section class="narrative reveal"><div class="n-label">' + esc(label) + '</div>' +
      '<div class="n-body">' + (title ? "<h2>" + esc(title) + "</h2>" : "") +
      paras.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div></section>";
  }

  var facts = [
    ["Località", p.location], ["Anno", p.year], ["Stato", lbl("status", p.status)],
    ["Superficie", p.size], ["Tipologia", p.type.map(function (t) { return lbl("type", t); }).join(", ")],
    ["Servizi", p.services.map(function (s) { return lbl("services", s); }).join(", ")]
  ];

  var gallery =
    '<div class="gallery reveal">' +
      '<figure class="g-wide"><div class="media ratio-16-9">' + ph(p, "ratio-16-9", "Vista principale") + '</div>' +
        '<figcaption>Vista principale — immagine dimostrativa da sostituire.</figcaption></figure>' +
      '<figure class="g-half"><div class="media ratio-4-3">' + ph(p, "ratio-4-3", "Interno") + '</div><figcaption>Interno — demo.</figcaption></figure>' +
      '<figure class="g-half"><div class="media ratio-4-3">' + ph(p, "ratio-4-3", "Dettaglio") + '</div><figcaption>Dettaglio materico — demo.</figcaption></figure>' +
      '<figure class="g-third"><div class="media ratio-3-4">' + ph(p, "ratio-3-4", "Pianta") + '</div><figcaption>Pianta — demo.</figcaption></figure>' +
      '<figure class="g-third"><div class="media ratio-3-4">' + ph(p, "ratio-3-4", "Sezione") + '</div><figcaption>Sezione — demo.</figcaption></figure>' +
      '<figure class="g-third"><div class="media ratio-3-4">' + ph(p, "ratio-3-4", "Schizzo") + '</div><figcaption>Schizzo di studio — demo.</figcaption></figure>' +
    '</div>';

  var techRows = [
    ["Località", p.location], ["Anno", p.year], ["Stato", lbl("status", p.status)],
    ["Superficie", p.size], ["Tipologia", p.type.map(function (t){return lbl("type",t);}).join(", ")],
    ["Incarico", p.services.map(function (s){return lbl("services",s);}).join(", ")],
    ["Struttura", p.tech.struttura], ["Impianti", p.tech.impianti],
    ["Impresa", p.tech.impresa], ["Fotografia", p.tech.fotografia], ["Consulenti", p.tech.partner]
  ];

  var related = (p.related || []).map(function (rs) {
    var rp = P.find(function (x) { return x.slug === rs; });
    return rp ? window.AQ.cardHTML(rp, "") : "";
  }).join("");

  root.innerHTML =
    '<nav class="breadcrumb wrap" aria-label="Percorso"><ol>' +
      '<li><a href="' + BASE + 'index.html">Home</a></li>' +
      '<li><a href="' + BASE + 'progetti.html">Progetti</a></li>' +
      '<li aria-current="page">' + esc(p.name) + '</li>' +
    '</ol></nav>' +

    '<header class="project-header wrap">' +
      '<div class="project-title-row">' +
        '<div><span class="project-index num">Progetto ' + esc(p.num) + '</span>' +
          '<h1>' + esc(p.name) + '</h1>' +
          '<p class="lead">' + esc(p.summary) + '</p></div>' +
        '<span class="demo-badge">Progetto dimostrativo</span>' +
      '</div>' +
      '<dl class="project-facts" style="margin-top:2rem">' +
        facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + esc(String(f[1])) + "</dd></div>"; }).join("") +
      '</dl>' +
    '</header>' +

    '<div class="project-hero wrap" style="margin-bottom:1rem">' +
      '<div class="media">' + ph(p, "ratio-16-9", p.location + " · " + p.year) + '</div>' +
    '</div>' +

    '<div class="wrap">' +
      narrative("Brief", "Il punto di partenza", p.brief) +
      narrative("Problema", "", p.problem) +
      narrative("Vincoli", "", p.constraints) +
      narrative("Concept", "L'idea di progetto", p.concept) +
      '<div class="section--tight">' + gallery + '</div>' +
      narrative("Soluzione", "", p.solution) +
      narrative("Spazi", "", p.spaces) +
      narrative("Luce", "", p.light) +
      narrative("Materiali", "", p.materials) +
      narrative("Sostenibilità", "", p.sustainability) +
    '</div>' +

    '<section class="section--tight wrap">' +
      '<h2 class="serif" style="margin-bottom:1.5rem">Dati tecnici</h2>' +
      '<dl class="tech-sheet">' +
        techRows.map(function (r) { return '<div class="row"><dt>' + r[0] + '</dt><dd>' + esc(String(r[1])) + '</dd></div>'; }).join("") +
      '</dl>' +
      '<p class="notice" style="margin-top:1.5rem"><strong>Dati dimostrativi.</strong> Nomi di impresa, consulenti e fotografo sono placeholder da sostituire prima della pubblicazione.</p>' +
    '</section>' +

    '<section class="section section--paper-light"><div class="wrap-narrow center">' +
      '<span class="eyebrow">Un progetto simile?</span>' +
      '<h2 class="serif" style="margin:1rem 0">Stai affrontando un intervento simile?</h2>' +
      '<p class="lead" style="margin-inline:auto">Descrivi l\'immobile e la fase in cui ti trovi. Ti ricontatteremo per capire se possiamo essere lo studio giusto.</p>' +
      '<div class="btn-row" style="justify-content:center;margin-top:1.5rem">' +
        '<a class="btn btn--primary" href="' + BASE + 'avvia-progetto.html">Raccontaci il progetto <span class="arrow">→</span></a>' +
      '</div></div>' +
    '</section>' +

    '<nav class="project-nav wrap" aria-label="Altri progetti">' +
      '<a class="prev" href="' + BASE + 'progetti/' + prev.slug + '.html"><span class="dir">← Precedente</span><br><span class="ttl">' + esc(prev.name) + '</span></a>' +
      '<a class="next" href="' + BASE + 'progetti/' + next.slug + '.html"><span class="dir">Successivo →</span><br><span class="ttl">' + esc(next.name) + '</span></a>' +
    '</nav>' +

    '<section class="section wrap"><div class="section-head"><span class="eyebrow">Progetti correlati</span></div>' +
      '<div class="related-grid">' + related + '</div></section>';

  // JSON-LD
  var ld = {
    "@context": "https://schema.org", "@type": "CreativeWork",
    "name": p.name + " — progetto dimostrativo",
    "creator": { "@type": "Organization", "name": "Atelier Quota" },
    "locationCreated": { "@type": "Place", "name": p.location },
    "dateCreated": String(p.year),
    "description": p.summary,
    "keywords": p.type.concat(p.services).join(", ")
  };
  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
