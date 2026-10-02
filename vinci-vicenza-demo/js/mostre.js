/* VINCI - mostre e collaborazioni (regia v5)
   Un oggetto per mostra: per aggiornare il sito basta cambiare i dati qui sotto, il resto si compone da solo.
   La mostra mostrata e la prima che non e "conclusa" (se sono tutte concluse, l'ultima).
   I campi con null sono dati che non abbiamo ancora: in pagina compaiono come "da confermare". */
window.VINCI_MOSTRE = [
  {
    numero: 1,
    titolo: 'IRA',
    stato: 'in corso',                    // 'in arrivo' | 'in corso' | 'conclusa'   [da confermare con Vinci]
    date: { dal: null, al: null },        // es. { dal: '12 settembre 2026', al: '30 novembre 2026' }
    sottotitolo: "un'opera in acciaio, <em>un dolce che le risponde</em>",
    partner: {
      nome: 'Superfine',
      chi: 'marchio specializzato in arredi di lusso per animali domestici',
      link: 'https://www.instagram.com/superfinepetluxury/'
    },
    opera: { nome: 'IRA', cosa: "un'opera di design in acciaio" },
    dolce: { nome: 'IRA', ingredienti: ['cioccolato', 'praliné di mandorle', 'crema alle nocciole'] },
    media: {
      locandina: 'assets/ira-poster.webp',
      video: 'assets/ira-2.mp4',
      poster: 'assets/ira-2-poster.jpg',
      dolce: 'assets/ira-dolce.webp'      // foto del dolce, usata dove il 3D non c'e
    },
    /* La brioche "opera": in cosa si trasforma il Sole quando arriva alla mostra.
       forma:    'sfera' (come il dolce IRA) | 'sole' (resta della sua forma)
       finitura: 'rigata' (righe sottili, come il dolce IRA) | 'martellata' (come l'acciaio dell'opera)
       colore:   tinta che si moltiplica sulla sfoglia: piu e scura, piu la brioche diventa nera */
    brioche: { forma: 'sfera', finitura: 'rigata', colore: '#4d3022' }
  }
];

(function () {
  'use strict';
  var lista = window.VINCI_MOSTRE || [], m = lista.filter(function (x) { return x.stato !== 'conclusa'; })[0] || lista[lista.length - 1];
  window.VINCI_MOSTRA = m;
  var posto = document.querySelector('#mostra .mostra-grid');
  if (!m || !posto) return;
  var ORD = ['', 'Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta', 'Sesta', 'Settima', 'Ottava', 'Nona', 'Decima'];
  var numero = (ORD[m.numero] || ('Mostra n. ' + m.numero)) + (ORD[m.numero] ? ' mostra' : '');
  var date = (m.date && m.date.dal) ? ('Dal ' + m.date.dal + (m.date.al ? ' al ' + m.date.al : '')) : '<span class="da-conf">date da confermare</span>';
  var ing = m.dolce.ingredienti.join(', ').replace(/, ([^,]*)$/, ' e $1');
  posto.innerHTML =
    '<div class="rv">' +
      '<p class="eyebrow">' + numero + ' <span class="stato stato-' + m.stato.replace(/\s/g, '-') + '">' + m.stato + '</span></p>' +
      '<h2>' + m.titolo + ': ' + m.sottotitolo + '</h2>' +
      '<p>VINCI ospita ' + m.opera.nome + ', ' + m.opera.cosa + ' di ' + m.partner.nome + ', ' + m.partner.chi + '.</p>' +
      '<p>Alla mostra si accompagna il dolce ' + m.dolce.nome + ", ispirato all'opera: " + ing + '.</p>' +
      '<dl class="scheda"><dt>Partner</dt><dd>' + m.partner.nome + '</dd><dt>Opera</dt><dd>' + m.opera.nome + '</dd><dt>Dolce</dt><dd>' + m.dolce.nome + '</dd><dt>Date</dt><dd>' + date + '</dd></dl>' +
      '<div class="cta" style="margin-top:26px"><a class="btn btn-line" href="' + m.partner.link + '" target="_blank" rel="noopener">Scopri ' + m.partner.nome + '</a></div>' +
    '</div>' +
    '<div class="mostra-fig rv">' +
      '<img src="' + m.media.locandina + '" loading="lazy" alt="Locandina della mostra ' + m.titolo + ' da VINCI">' +
      '<div class="ira-slot"><video autoplay loop muted playsinline preload="metadata" poster="' + m.media.poster + '" aria-label="Il dolce e l\'opera della mostra ' + m.titolo + '"><source src="' + m.media.video + '" type="video/mp4"></video></div>' +
      '<div class="mostra-dolce">' +
        '<div class="ancora" data-ancora-3d="mostra"></div>' +
        '<img class="statica" src="' + m.media.dolce + '" alt="Il dolce ' + m.dolce.nome + '" loading="lazy">' +
        '<span class="ombra" aria-hidden="true"></span>' +
        '<div class="cartellino"><b>' + m.dolce.nome + '</b><span class="lato">Il dolce della mostra</span></div>' +
      '</div>' +
    '</div>';
})();
