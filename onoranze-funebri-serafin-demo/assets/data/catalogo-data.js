/* =====================================================================
   catalogo-data.js - dati DIMOSTRATIVI del catalogo Serafin.
   Nomi di fantasia ispirati (non copiati) alle categorie tipiche del
   settore. Prezzi indicativi "a partire da", da sostituire.
   Immagini: foto Pexels (licenza libera). "img" e' l'ID Pexels;
   l'URL viene costruito nel render. Fallback SVG gestito qui e in main.js.
   ===================================================================== */
window.CATALOGO = {
  cofani: {
    titolo: "Cofani",
    intro: "Una selezione curata di cofani artigianali, dalle essenze classiche alle linee contemporanee, fino alle soluzioni per la cremazione.",
    items: [
      { nome: "Cofano Assisi", tag: "Rovere massello", desc: "Linea classica in rovere con finitura naturale opaca e maniglie in metallo brunito.", prezzo: "da 1.190 euro", img: "326311" },
      { nome: "Cofano Verona", tag: "Noce nazionale", desc: "Elegante profilo in noce lucidato, intagli sobri e imbottitura in raso avorio.", prezzo: "da 1.480 euro", img: "129733" },
      { nome: "Cofano Firenze", tag: "Mogano intarsiato", desc: "Lavorazione di pregio con intarsi a mano e ferramenta dorata.", prezzo: "da 2.150 euro", img: "18947396" },
      { nome: "Cofano Siena", tag: "Ciliegio", desc: "Tonalita calde del ciliegio, forma arrotondata e finitura satinata.", prezzo: "da 1.390 euro", img: "1098764" },
      { nome: "Cofano Aurora", tag: "Laccato avorio", desc: "Superficie laccata chiara dallo stile lineare e luminoso.", prezzo: "da 1.560 euro", img: "163999" },
      { nome: "Cofano Essenza", tag: "Linea moderna - frassino", desc: "Design essenziale in frassino chiaro, senza fronzoli, molto contemporaneo.", prezzo: "da 1.320 euro", img: "314073" },
      { nome: "Cofano Terra", tag: "Ecologico - cremazione", desc: "Materiali naturali a basso impatto, pensato per il rito della cremazione.", prezzo: "da 690 euro", img: "236763" }
    ]
  },
  urne: {
    titolo: "Urne cinerarie",
    intro: "Urne per la conservazione, la tumulazione o la dispersione delle ceneri, in materiali e forme diverse.",
    items: [
      { nome: "Urna Petra", tag: "Marmo", desc: "Blocco in marmo levigato, sobrio e duraturo, per nicchia o abitazione.", prezzo: "da 320 euro", img: "5461549" },
      { nome: "Urna Nube", tag: "Ceramica avorio", desc: "Ceramica artigianale dalle linee morbide, finitura opaca.", prezzo: "da 240 euro", img: "27180805" },
      { nome: "Urna Foglia", tag: "Biodegradabile", desc: "Materiali vegetali per la dispersione in natura, nel pieno rispetto ambientale.", prezzo: "da 150 euro", img: "11975310" },
      { nome: "Urna Bronzo", tag: "Bronzo classico", desc: "Fusione dai dettagli cesellati, dal gusto tradizionale.", prezzo: "da 380 euro", img: "27180805" },
      { nome: "Urna Ricordo", tag: "Mini urna", desc: "Piccola urna da tenere con se o da condividere tra i familiari.", prezzo: "da 90 euro", img: "11975310" }
    ]
  },
  auto: {
    titolo: "Auto funebri",
    intro: "Un parco mezzi curato e sempre in ordine, per un accompagnamento decoroso su tutto il territorio, anche verso l'estero.",
    items: [
      { nome: "Autofuneraria Classe E", tag: "Berlina carro", desc: "Vettura di rappresentanza dalle linee sobrie, per il trasporto del feretro in citta e fuori.", prezzo: "Su richiesta", img: "195636" },
      { nome: "Autofuneraria Classe V", tag: "Furgonata", desc: "Ampia e discreta, ideale per i trasferimenti sulle lunghe distanze.", prezzo: "Su richiesta", img: "3457780" },
      { nome: "Auto di seguito", tag: "Accompagnamento familiari", desc: "Vettura riservata ai familiari per seguire il corteo con la giusta riservatezza.", prezzo: "Su richiesta", img: "93632" }
    ]
  },
  fiori: {
    titolo: "Composizioni floreali",
    intro: "Composizioni realizzate su misura con fiori freschi di stagione, per ogni tipo di cerimonia.",
    items: [
      { nome: "Cuscino di commiato", tag: "Fiori freschi", desc: "Composizione da appoggio, elegante e raccolta, in tonalita chiare.", prezzo: "da 120 euro", img: "273941" },
      { nome: "Corona classica", tag: "Rose e lilium", desc: "Corona tradizionale con rose bianche e lilium, con nastro personalizzabile.", prezzo: "da 160 euro", img: "30325205" },
      { nome: "Copri-feretro", tag: "Composizione lunga", desc: "Manto floreale che riveste il cofano, su misura per la cerimonia.", prezzo: "da 220 euro", img: "1033141" },
      { nome: "Mazzo di saluto", tag: "Bouquet", desc: "Bouquet raccolto da portare con se al momento del commiato.", prezzo: "da 45 euro", img: "6794613" }
    ]
  },
  imbottiture: {
    titolo: "Imbottiture",
    intro: "Interni realizzati con tessuti pregiati, per una cura discreta di ogni dettaglio.",
    items: [
      { nome: "Raso Avorio", tag: "Raso", desc: "Interno classico in raso color avorio, luminoso e delicato.", prezzo: "Inclusa", img: "6843237" },
      { nome: "Cotone Naturale", tag: "Cotone", desc: "Tessuto naturale non trattato, scelta sobria ed ecologica.", prezzo: "Inclusa", img: "14380626" },
      { nome: "Damascato", tag: "Tessuto lavorato", desc: "Tessuto con motivi in rilievo, dal gusto tradizionale.", prezzo: "Supplemento", img: "14380626" },
      { nome: "Seta Pregiata", tag: "Seta", desc: "Interno in pura seta per la massima finezza del dettaglio.", prezzo: "Supplemento", img: "6843237" }
    ]
  }
};

/* Render nella pagina catalogo */
(function () {
  var root = document.getElementById("catalogo-root");
  if (!root || !window.CATALOGO) return;
  var order = ["cofani", "urne", "auto", "fiori", "imbottiture"];
  function pexels(id){ return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id + ".jpeg?auto=compress&cs=tinysrgb&w=640"; }
  var html = order.map(function (key) {
    var c = window.CATALOGO[key];
    var cards = c.items.map(function (it) {
      return '<article class="card">' +
        '<div class="card__media"><img data-fallback loading="lazy" src="' + pexels(it.img) + '" alt="' + it.nome + ' - ' + it.tag + '"></div>' +
        '<div class="card__body">' +
          '<div class="card__tag">' + it.tag + '</div>' +
          '<h3>' + it.nome + '</h3><p>' + it.desc + '</p>' +
          '<div class="card__price">' + it.prezzo + '</div>' +
        '</div></article>';
    }).join("");
    return '<section class="section ' + (order.indexOf(key)%2 ? "section--cream2":"section--paper") + '" id="' + key + '"><div class="wrap">' +
      '<div class="center narrow"><p class="eyebrow">Catalogo</p><h2>' + c.titolo + '</h2><p class="lead">' + c.intro + '</p></div>' +
      '<div class="grid grid-3" style="margin-top:44px">' + cards + '</div>' +
      '</div></section>';
  }).join("");
  root.innerHTML = html;
  // riaggancia il fallback alle immagini appena create
  Array.prototype.forEach.call(root.querySelectorAll("img[data-fallback]"), function (img) {
    img.addEventListener("error", function () {
      if (img.dataset.done) return; img.dataset.done = "1";
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="#e9e2d5"/>' +
        '<rect x="1" y="1" width="638" height="478" fill="none" stroke="#e0d8ca"/>' +
        '<text x="320" y="250" font-family="Georgia,serif" font-size="20" fill="#2c2823" text-anchor="middle">' +
        (img.getAttribute("alt")||"").replace(/[<>&]/g,"") + '</text></svg>');
    });
  });
})();
