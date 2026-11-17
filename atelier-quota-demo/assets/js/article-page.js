/* ATELIER QUOTA — article-page.js
   Costruisce l'articolo del Journal da articles-data.js
   (document.body.dataset.slug). Inietta JSON-LD Article + FAQPage. */
(function () {
  "use strict";
  var slug = document.body.dataset.slug;
  var A = window.AQ_ARTICLES || [];
  var esc = window.AQ.esc;
  var BASE = document.body.dataset.base || "";
  var root = document.getElementById("article-root");
  if (!root || !slug) return;

  var a = A.find(function (x) { return x.slug === slug; });
  if (!a) { root.innerHTML = "<div class='wrap section'><p>Articolo non trovato.</p></div>"; return; }

  var dateFmt = new Date(a.date).toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" });

  var toc = a.toc && a.toc.length
    ? '<nav class="toc" aria-label="Indice"><h2>In questo articolo</h2><ol>' +
      a.toc.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol></nav>"
    : "";

  var faqHTML = (a.faq || []).map(function (f, i) {
    var pid = "art-faq-" + i;
    return '<div class="accordion-item"><h3 style="margin:0"><button class="accordion-trigger" aria-expanded="false" aria-controls="' + pid + '">' +
      esc(f[0]) + '<span class="ico" aria-hidden="true"></span></button></h3>' +
      '<div class="accordion-panel" id="' + pid + '" role="region"><div class="inner"><p>' + esc(f[1]) + '</p></div></div></div>';
  }).join("");

  var related = (a.related || []).map(function (rs) {
    var ra = A.find(function (x) { return x.slug === rs; });
    if (!ra) return "";
    return '<article class="project-card"><a href="' + BASE + 'articoli/' + ra.slug + '.html">' +
      '<div class="media ratio-3-2"><div class="ph tone-moss ratio-3-2" role="img" aria-label="' + esc(ra.title) + '"><span class="ph-tag">Journal</span></div></div>' +
      '<h3 style="font-size:var(--step-1);margin-top:1rem">' + esc(ra.title) + '</h3>' +
      '<p style="font-size:var(--step--1);color:var(--graphite)">' + esc(ra.excerpt) + '</p></a></article>';
  }).join("");

  root.innerHTML =
    '<nav class="breadcrumb wrap" aria-label="Percorso"><ol>' +
      '<li><a href="' + BASE + 'index.html">Home</a></li>' +
      '<li><a href="' + BASE + 'journal.html">Journal</a></li>' +
      '<li aria-current="page">' + esc(a.title) + '</li></ol></nav>' +

    '<header class="article-header wrap-narrow">' +
      '<span class="eyebrow">Journal</span>' +
      '<h1 style="margin:1rem 0">' + esc(a.title) + '</h1>' +
      '<p class="lead">' + esc(a.excerpt) + '</p>' +
      '<div class="article-meta"><span>' + esc(a.author) + '</span><span>' + dateFmt + '</span><span>' + esc(a.readingTime) + ' di lettura</span></div>' +
    '</header>' +

    '<div class="article-hero wrap" style="margin-bottom:2rem"><div class="media"><div class="ph tone-clay ratio-16-9" role="img" aria-label="Immagine dimostrativa dell\'articolo"><span class="ph-tag">Immagine demo</span></div></div></div>' +

    '<div class="article-body wrap-narrow">' +
      toc +
      a.html +
      (a.callout ? '<div class="callout" style="margin:2rem 0"><p style="margin:0"><strong>In sintesi:</strong> ' + esc(a.callout) + "</p></div>" : "") +
      '<p class="notice"><strong>Nota.</strong> Questo articolo ha finalità informativa e non costituisce consulenza legale, fiscale o tecnica: ogni caso va verificato in concreto.</p>' +
      (faqHTML ? '<h2>Domande frequenti</h2><div class="accordion">' + faqHTML + "</div>" : "") +
    '</div>' +

    '<section class="section section--paper-light"><div class="wrap-narrow center">' +
      '<h2 class="serif">Hai un progetto in mente?</h2>' +
      '<p class="lead" style="margin:1rem auto">Compila il brief: bastano pochi minuti per aiutarci a capire come possiamo esserti utili.</p>' +
      '<a class="btn btn--primary" href="' + BASE + 'avvia-progetto.html">Avvia il brief <span class="arrow">→</span></a>' +
    '</div></section>' +

    (related ? '<section class="section wrap"><div class="section-head"><span class="eyebrow">Continua a leggere</span></div><div class="related-grid">' + related + '</div></section>' : "");

  window.trackEvent && trackEvent("guide_open", { slug: a.slug });

  var ldArticle = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": a.title, "description": a.excerpt,
    "author": { "@type": "Organization", "name": a.author },
    "publisher": { "@type": "Organization", "name": "Atelier Quota" },
    "datePublished": a.date, "inLanguage": "it-IT"
  };
  var sc = document.createElement("script"); sc.type = "application/ld+json";
  sc.textContent = JSON.stringify(ldArticle); document.head.appendChild(sc);
  if (a.faq && a.faq.length) {
    var ldFaq = { "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": a.faq.map(function (f) { return { "@type": "Question", "name": f[0], "acceptedAnswer": { "@type": "Answer", "text": f[1] } }; }) };
    var sc2 = document.createElement("script"); sc2.type = "application/ld+json";
    sc2.textContent = JSON.stringify(ldFaq); document.head.appendChild(sc2);
  }
})();
