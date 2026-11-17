/* ATELIER QUOTA — service-page.js
   Costruisce la pagina del singolo servizio da services-data.js
   (document.body.dataset.slug). Inietta JSON-LD Service + FAQPage. */
(function () {
  "use strict";
  var slug = document.body.dataset.slug;
  var S = window.AQ_SERVICES || [];
  var P = window.AQ_PROJECTS || [];
  var esc = window.AQ.esc;
  var BASE = document.body.dataset.base || "";
  var root = document.getElementById("service-root");
  if (!root || !slug) return;

  var s = S.find(function (x) { return x.slug === slug; });
  if (!s) { root.innerHTML = "<div class='wrap section'><p>Servizio non trovato.</p></div>"; return; }

  function list(items, cls) { return '<ul class="' + (cls || "") + '">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"; }

  var processHTML = s.process.map(function (step, i) {
    return '<div class="process-step reveal"><div class="p-index num">' + ("0" + (i + 1)).slice(-2) + '</div>' +
      '<div><h3>' + esc(step) + '</h3></div></div>';
  }).join("");

  var faqHTML = s.faq.map(function (f, i) {
    var pid = "svc-faq-" + i;
    return '<div class="accordion-item"><h3 style="margin:0"><button class="accordion-trigger" aria-expanded="false" aria-controls="' + pid + '">' +
      esc(f[0]) + '<span class="ico" aria-hidden="true"></span></button></h3>' +
      '<div class="accordion-panel" id="' + pid + '" role="region"><div class="inner"><p>' + esc(f[1]) + '</p></div></div></div>';
  }).join("");

  var related = (s.related || []).map(function (rs) {
    var rp = P.find(function (x) { return x.slug === rs; });
    return rp ? window.AQ.cardHTML(rp, "") : "";
  }).join("");

  root.innerHTML =
    '<nav class="breadcrumb wrap" aria-label="Percorso"><ol>' +
      '<li><a href="' + BASE + 'index.html">Home</a></li>' +
      '<li><a href="' + BASE + 'servizi.html">Servizi</a></li>' +
      '<li aria-current="page">' + esc(s.name) + '</li></ol></nav>' +

    '<header class="page-hero wrap">' +
      '<span class="eyebrow">Servizio ' + esc(s.num) + '</span>' +
      '<h1>' + esc(s.name) + '</h1>' +
      '<p class="lead">' + esc(s.short) + '</p>' +
    '</header>' +

    '<section class="section--tight wrap"><div class="grid cols-2">' +
      '<div><h2 class="serif">Il problema che risolve</h2><p class="muted" style="margin-top:1rem">' + esc(s.problem) + '</p></div>' +
      '<div class="callout"><h3 class="serif" style="font-size:var(--step-1)">Per chi è</h3>' + list(s.forWho, "check-list") + '</div>' +
    '</div></section>' +

    '<section class="section wrap"><div class="grid cols-2">' +
      '<div><h2 class="serif" style="margin-bottom:1rem">Cosa comprende</h2>' + list(s.includes, "check-list") + '</div>' +
      '<div><h2 class="serif" style="margin-bottom:1rem">Cosa non comprende automaticamente</h2>' + list(s.excludes, "check-list") +
        '<p class="hint" style="margin-top:1rem">Alcune attività dipendono da terzi (imprese, enti, consulenti) e vengono coordinate ma non garantite.</p></div>' +
    '</div></section>' +

    '<section class="section section--paper-light wrap"><div class="section-head"><span class="eyebrow">Come procediamo</span><h2 class="serif">Il processo</h2></div>' +
      '<div class="process">' + processHTML + '</div>' +
      '<div style="margin-top:2.5rem"><h3 class="serif" style="margin-bottom:1rem">Cosa ricevi</h3><div class="deliverables">' +
        s.deliverables.map(function (d) { return '<div class="check-list"><li style="border:none">' + esc(d) + '</li></div>'; }).join("") +
      '</div></div>' +
    '</section>' +

    (related ? '<section class="section wrap"><div class="section-head"><span class="eyebrow">Progetti</span><h2 class="serif">Progetti correlati</h2></div><div class="related-grid">' + related + '</div></section>' : "") +

    '<section class="section wrap"><div class="section-head"><span class="eyebrow">Domande</span><h2 class="serif">Domande frequenti</h2></div>' +
      '<div class="accordion">' + faqHTML + '</div></section>' +

    '<section class="section section--ink"><div class="wrap grid cols-2" style="align-items:center">' +
      '<div><h2 class="serif">Parliamone</h2><p class="muted" style="margin-top:1rem">Raccontaci l\'immobile e la fase in cui ti trovi: capiamo insieme se questo servizio è adatto.</p>' +
        '<div class="btn-row" style="margin-top:1.5rem"><a class="btn btn--light" href="' + BASE + 'avvia-progetto.html">Avvia il brief <span class="arrow">→</span></a>' +
        '<a class="btn btn--ghost" style="color:var(--paper-light);border-color:rgba(255,255,255,.3)" href="' + BASE + 'contatti.html">Scrivici</a></div></div>' +
      '<form class="stack" onsubmit="event.preventDefault();this.querySelector(\'.form-status\').hidden=false;window.trackEvent&&trackEvent(\'service_cta\',{slug:\'' + s.slug + '\'});" style="background:var(--paper-light);color:var(--ink);padding:1.5rem;border-radius:3px">' +
        '<div class="field"><label for="sv-name">Nome</label><input id="sv-name" name="name" required></div>' +
        '<div class="field"><label for="sv-email">Email</label><input id="sv-email" type="email" name="email" required></div>' +
        '<div class="field"><label for="sv-msg">In breve, il tuo progetto</label><textarea id="sv-msg" name="msg"></textarea></div>' +
        '<button class="btn btn--primary" type="submit">Invia richiesta</button>' +
        '<p class="form-status ok" hidden role="status">Questa è una demo. La richiesta non è stata trasmessa.</p>' +
      '</form>' +
    '</div></section>';

  window.trackEvent && trackEvent("service_view", { slug: s.slug });

  // JSON-LD Service + FAQPage
  var ldService = {
    "@context": "https://schema.org", "@type": "Service",
    "serviceType": s.name, "provider": { "@type": "Organization", "name": "Atelier Quota" },
    "areaServed": ["Vicenza", "Padova", "Verona", "Veneto"], "description": s.short
  };
  var ldFaq = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": s.faq.map(function (f) {
      return { "@type": "Question", "name": f[0], "acceptedAnswer": { "@type": "Answer", "text": f[1] } };
    })
  };
  [ldService, ldFaq].forEach(function (o) {
    var sc = document.createElement("script"); sc.type = "application/ld+json";
    sc.textContent = JSON.stringify(o); document.head.appendChild(sc);
  });
})();
