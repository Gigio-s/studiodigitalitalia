/* =====================================================================
   necrologi-store.js - archivio necrologi condiviso (DEMO)
   - SEED: necrologi dimostrativi (nominativi inventati, senza foto)
   - pubblicati: salvati nel browser (localStorage), cosi restano
   - funzioni: all/get/add/remove, renderCard, annuncioHTML, makePDF
   Nessuna dipendenza (jsPDF richiesto solo per makePDF).
   ===================================================================== */
window.NECRO = (function () {
  "use strict";
  var KEY = "serafin_necrologi_v1";

  /* necrologi dimostrativi di base (nomi inventati, nessuna foto) */
  var SEED = [
    { id:"s1", nome:"Maria Bianchi",   anni:"1941 - 2026", citta:"Vicenza",              rito:"croce",
      apertura:"E mancata all'affetto dei suoi cari", familiari:["i figli Luca e Paola con le rispettive famiglie"],
      commiato:"ne danno il triste annuncio", esGiorno:"giovedi", esOra:"10.00", esLuogo:"Chiesa di S. Marco, Vicenza", note:"", seed:true },
    { id:"s2", nome:"Giuseppe Rossi",  anni:"1946 - 2026", citta:"Creazzo",              rito:"croce",
      apertura:"Serenamente si e spento", familiari:["la moglie Elena","i figli e i nipoti"],
      commiato:"lo annunciano con dolore", esGiorno:"venerdi", esOra:"15.30", esLuogo:"Duomo di Vicenza", note:"", seed:true },
    { id:"s3", nome:"Anna Marchetti",  anni:"1935 - 2026", citta:"Altavilla Vicentina",  rito:"croce",
      apertura:"E mancata all'affetto dei suoi cari", familiari:["i nipoti tutti"],
      commiato:"ne danno il triste annuncio", esGiorno:"sabato", esOra:"9.30", esLuogo:"Chiesa parrocchiale, Altavilla Vicentina", note:"", seed:true },
    { id:"s4", nome:"Renzo Fabris",    anni:"1949 - 2026", citta:"Sovizzo",              rito:"croce",
      apertura:"E mancato all'affetto dei suoi cari", familiari:["la moglie e i figli"],
      commiato:"ne danno il triste annuncio", esGiorno:"lunedi", esOra:"15.00", esLuogo:"Chiesa di S. Giovanni, Sovizzo", note:"", seed:true },
    { id:"s5", nome:"Teresa Dal Maso", anni:"1937 - 2026", citta:"Vicenza",              rito:"croce",
      apertura:"E mancata all'affetto dei suoi cari", familiari:["la sorella Rita"],
      commiato:"ne da il triste annuncio", esGiorno:"martedi", esOra:"10.30", esLuogo:"Santuario di Monte Berico, Vicenza", note:"", seed:true },
    { id:"s6", nome:"Luigi Zampieri",  anni:"1944 - 2026", citta:"Costabissara",         rito:"croce",
      apertura:"Serenamente si e spento", familiari:["la moglie e i figli con le famiglie"],
      commiato:"lo annunciano con dolore", esGiorno:"mercoledi", esOra:"15.00", esLuogo:"Chiesa di S. Giorgio, Costabissara", note:"", seed:true },
    { id:"s7", nome:"Rosa Peruzzo",    anni:"1932 - 2026", citta:"Caldogno",             rito:"croce",
      apertura:"E mancata all'affetto dei suoi cari", familiari:["i figli e i nipoti"],
      commiato:"ne danno il triste annuncio", esGiorno:"giovedi", esOra:"9.30", esLuogo:"Chiesa parrocchiale, Caldogno", note:"", seed:true },
    { id:"s8", nome:"Antonio Busato",  anni:"1940 - 2026", citta:"Torri di Quartesolo",  rito:"croce",
      apertura:"E mancato all'affetto dei suoi cari", familiari:["la moglie Luigia e i figli"],
      commiato:"ne danno il triste annuncio", esGiorno:"venerdi", esOra:"15.30", esLuogo:"Chiesa di S. Maria, Torri di Quartesolo", note:"", seed:true },
    { id:"s9", nome:"Elena Carraro",   anni:"1953 - 2026", citta:"Arcugnano",            rito:"croce",
      apertura:"E mancata all'affetto dei suoi cari", familiari:["il marito e i figli"],
      commiato:"ne danno il triste annuncio", esGiorno:"sabato", esOra:"10.00", esLuogo:"Chiesa di S. Antonio, Arcugnano", note:"", seed:true }
  ];

  function published() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  function all() { return published().concat(SEED); }           // pubblicati piu recenti in cima
  function add(obj) {
    var l = published();
    obj.id = "n" + Date.now();
    obj.createdAt = new Date().toISOString();
    l.unshift(obj);
    save(l);
    return obj.id;
  }
  function get(id) {
    var a = all();
    for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i];
    return null;
  }
  function remove(id) { save(published().filter(function (x) { return x.id !== id; })); }

  function esequieText(o) {
    var p = [];
    if (o.esGiorno || o.esOra) p.push("I funerali avranno luogo " + [o.esGiorno, o.esOra ? "alle ore " + o.esOra : ""].filter(Boolean).join(" "));
    if (o.esLuogo) p.push("presso " + o.esLuogo);
    return p.join(" ") + (p.length ? "." : "");
  }

  /* SVG simbolo (croce o fiore) per le schede senza foto */
  function symbol(rito) {
    if (rito === "neutro")
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3c-2 4-2 8 0 12 2-4 2-8 0-12zM12 15v6M8 21h8"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 3v18M7 8h10"/></svg>';
  }

  function esc(s){ return (s == null ? "" : String(s)).replace(/[<>&]/g, function(c){return {"<":"&lt;",">":"&gt;","&":"&amp;"}[c];}); }

  /* scheda per la griglia necrologi */
  function renderCard(o) {
    var media = o.foto
      ? '<div class="card__media" style="aspect-ratio:3/4"><img src="' + o.foto + '" alt="Ricordo di ' + esc(o.nome) + '"></div>'
      : '';
    var sym = o.foto ? "" : '<span class="n-sym" aria-hidden="true">' + symbol(o.rito) + '</span>';
    return '<article class="card" data-name="' + esc(o.nome).toLowerCase() + '">' + media +
      '<div class="card__body">' + sym +
        '<div class="n-name">' + esc(o.nome) + '</div>' +
        '<div class="n-dates">' + esc(o.anni) + '</div>' +
        (o.citta ? '<div class="n-town">' + esc(o.citta) + '</div>' : '') +
        '<div class="n-when">Esequie ' + esc(o.esGiorno) + (o.esOra ? ", ore " + esc(o.esOra) : "") + (o.esLuogo ? "<br>" + esc(o.esLuogo) : "") + '</div>' +
        '<a class="btn btn--ghost btn--sm" href="necrologio.html?id=' + encodeURIComponent(o.id) + '">Apri il necrologio</a>' +
      '</div></article>';
  }

  /* annuncio completo (pagina di dettaglio e anteprima) */
  function annuncioHTML(o) {
    var fam = (o.familiari || []).filter(Boolean).map(esc).join("<br>");
    return '<div class="annuncio">' +
      '<div class="annuncio__sym">' + symbol(o.rito) + '</div>' +
      (o.foto ? '<div class="annuncio__foto"><img src="' + o.foto + '" alt="' + esc(o.nome) + '"></div>' : '') +
      (o.apertura ? '<p class="annuncio__apertura">' + esc(o.apertura) + '</p>' : '') +
      '<h2 class="annuncio__nome">' + esc(o.nome) + '</h2>' +
      '<p class="annuncio__anni">' + esc(o.anni) + (o.citta ? " &nbsp;-&nbsp; " + esc(o.citta) : "") + '</p>' +
      (fam ? '<p class="annuncio__fam">' + fam + '</p>' : '') +
      (o.commiato ? '<p class="annuncio__commiato">' + esc(o.commiato) + '.</p>' : '') +
      '<p class="annuncio__esequie">' + esc(esequieText(o)) + '</p>' +
      (o.note ? '<p class="annuncio__note">' + esc(o.note) + '</p>' : '') +
      '<p class="annuncio__firma">Onoranze Funebri Serafin</p>' +
    '</div>';
  }

  /* genera e scarica il PDF (manifesto). Richiede jsPDF caricato nella pagina. */
  function makePDF(o) {
    if (!window.jspdf || !window.jspdf.jsPDF) { alert("Libreria PDF non caricata."); return; }
    var doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    var W = 210, cx = W / 2, y = 26, gray = 90, dark = 30;

    function center(txt, size, font, style, color) {
      doc.setFont(font || "helvetica", style || "normal");
      doc.setFontSize(size);
      doc.setTextColor(color == null ? dark : color);
      var lines = doc.splitTextToSize(txt, 165);
      lines.forEach(function (ln) { doc.text(ln, cx, y, { align: "center" }); y += size * 0.42 + 2; });
    }

    // simbolo
    doc.setDrawColor(gray); doc.setLineWidth(0.7);
    if (o.rito !== "neutro") { doc.line(cx, 16, cx, 30); doc.line(cx - 6, 21, cx + 6, 21); }
    else { doc.line(cx - 8, 24, cx + 8, 24); }
    y = 40;

    // foto
    if (o.foto) {
      try {
        var fmt = /png/i.test(o.foto) ? "PNG" : "JPEG";
        doc.addImage(o.foto, fmt, cx - 24, y, 48, 48);
        y += 56;
      } catch (e) { y += 4; }
    }

    center(o.apertura || "", 13, "helvetica", "normal", gray); y += 3;
    center(o.nome || "", 30, "times", "bold", dark); y += 4;
    center(o.anni + (o.citta ? "   -   " + o.citta : ""), 12, "helvetica", "normal", gray); y += 8;

    (o.familiari || []).filter(Boolean).forEach(function (f) { center(f, 12.5, "helvetica", "normal", dark); });
    y += 2;
    if (o.commiato) { center(o.commiato + ".", 12.5, "helvetica", "italic", dark); }
    y += 6;
    center(esequieText(o), 12, "helvetica", "normal", dark); y += 8;
    if (o.note) { center(o.note, 11, "helvetica", "italic", gray); y += 4; }

    // footer
    doc.setDrawColor(180); doc.line(cx - 30, 276, cx + 30, 276);
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(dark);
    doc.text("ONORANZE FUNEBRI SERAFIN", cx, 283, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(gray);
    doc.text("Vicenza - Reperibili 24h - +39 0444 000 000", cx, 289, { align: "center" });

    var slug = (o.nome || "necrologio").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    doc.save("necrologio-" + slug + ".pdf");
  }

  return { SEED: SEED, all: all, get: get, add: add, remove: remove, published: published,
           renderCard: renderCard, annuncioHTML: annuncioHTML, esequieText: esequieText, makePDF: makePDF };
})();
