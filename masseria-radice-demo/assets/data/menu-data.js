/* =====================================================================
   menu-data.js — DATI DIMOSTRATIVI
   Quattro menu stagionali. Piatti, allergeni e prezzi di esempio.
   Gli allergeni vanno SEMPRE confermati direttamente con la struttura.
   Legenda provenienza: farm = prodotto in masseria, local = produttore
   locale, ita = provenienza italiana, season = solo di stagione.
   ===================================================================== */
window.MR = window.MR || {};
window.MR.menu = {
  primavera: {
    label: "Primavera",
    intro: "Il campo si sveglia: fave, piselli, carciofi ed erbe spontanee.",
    dishes: [
      { name: "Fave e cicorie", desc: "Purè di fave con cicorie di campo e olio nuovo.", ingredients: "Fave, cicorie, olio EVO", origin: ["farm","season"], allergens: "—", diet: "vegano", price: 11 },
      { name: "Frittata di erbe spontanee", desc: "Uova del pollaio ed erbe raccolte al mattino.", ingredients: "Uova, erbe, cipollotto", origin: ["farm"], allergens: "Uova", diet: "vegetariano", price: 10 },
      { name: "Orecchiette con carciofi", desc: "Pasta fresca con carciofi brasati e mollica.", ingredients: "Semola, carciofi, pane", origin: ["farm","local"], allergens: "Glutine", diet: "vegetariano", price: 14 },
      { name: "Agnello alle erbe (su prenotazione)", desc: "Da allevamento locale, con patate ed erbe.", ingredients: "Agnello, patate, erbe", origin: ["local"], allergens: "—", diet: "carne", price: 22 },
      { name: "Crostata di fragole", desc: "Prime fragole del frutteto e confettura di casa.", ingredients: "Farina, fragole, uova", origin: ["farm","season"], allergens: "Glutine, uova", diet: "vegetariano", price: 7 }
    ]
  },
  estate: {
    label: "Estate",
    intro: "Pomodori, melanzane, zucchine e fichi: la tavola più colorata.",
    dishes: [
      { name: "Pomodori dell'orto e stracciatella", desc: "Pomodori raccolti al mattino, stracciatella del caseificio partner.", ingredients: "Pomodori, stracciatella, basilico", origin: ["farm","local","season"], allergens: "Latte", diet: "vegetariano", price: 12 },
      { name: "Orecchiette al pomodoro fresco", desc: "Sugo crudo di pomodoro dell'orto e cacioricotta.", ingredients: "Semola, pomodoro, cacioricotta", origin: ["farm","local"], allergens: "Glutine, latte", diet: "vegetariano", price: 13 },
      { name: "Parmigiana leggera", desc: "Melanzane grigliate, non fritte, con pomodoro e basilico.", ingredients: "Melanzane, pomodoro, formaggio", origin: ["farm"], allergens: "Latte", diet: "vegetariano", price: 13 },
      { name: "Pesce del giorno (su disponibilità)", desc: "Dai mercati costieri, secondo pesca.", ingredients: "Pesce, verdure, olio EVO", origin: ["local","season"], allergens: "Pesce", diet: "pesce", price: 24 },
      { name: "Fichi e miele", desc: "Fichi del frutteto con miele dei partner.", ingredients: "Fichi, miele, mandorle", origin: ["farm","local","season"], allergens: "Frutta a guscio", diet: "vegetariano", price: 7 }
    ]
  },
  autunno: {
    label: "Autunno",
    intro: "Tempo di olive e di olio nuovo: sapori caldi e zuppe.",
    dishes: [
      { name: "Pane e olio nuovo", desc: "Pane cotto in casa e assaggio dell'olio appena franto.", ingredients: "Pane, olio EVO nuovo", origin: ["farm","season"], allergens: "Glutine", diet: "vegano", price: 8 },
      { name: "Zuppa di legumi", desc: "Ceci e lenticchie con verdure autunnali.", ingredients: "Legumi, verdure, olio EVO", origin: ["farm","ita"], allergens: "—", diet: "vegano", price: 12 },
      { name: "Cavatelli con zucca", desc: "Pasta fresca con zucca dell'orto e cacioricotta.", ingredients: "Semola, zucca, cacioricotta", origin: ["farm","local"], allergens: "Glutine, latte", diet: "vegetariano", price: 13 },
      { name: "Brasato al vino locale", desc: "Carne locale cotta lentamente nel vino dei partner.", ingredients: "Manzo, vino, verdure", origin: ["local"], allergens: "Solfiti", diet: "carne", price: 20 },
      { name: "Torta di melagrana", desc: "Con la melagrana del frutteto.", ingredients: "Farina, melagrana, uova", origin: ["farm","season"], allergens: "Glutine, uova", diet: "vegetariano", price: 7 }
    ]
  },
  inverno: {
    label: "Inverno",
    intro: "Cime di rapa, agrumi e legumi accanto al camino acceso.",
    dishes: [
      { name: "Orecchiette e cime di rapa", desc: "Il classico invernale con acciuga e mollica.", ingredients: "Semola, cime di rapa, acciuga", origin: ["farm","ita"], allergens: "Glutine, pesce", diet: "pesce", price: 13 },
      { name: "Vellutata di cavolo", desc: "Cavoli dell'orto e crostini all'olio.", ingredients: "Cavolo, patata, olio EVO", origin: ["farm"], allergens: "Glutine", diet: "vegano", price: 11 },
      { name: "Purè di fave e agrumi", desc: "Fave essiccate d'estate con agrumi invernali.", ingredients: "Fave, arance, olio EVO", origin: ["farm","season"], allergens: "—", diet: "vegano", price: 11 },
      { name: "Involtini di carne locale", desc: "Con formaggio e verdure di stagione.", ingredients: "Carne, formaggio, verdure", origin: ["local"], allergens: "Latte", diet: "carne", price: 19 },
      { name: "Dolce agli agrumi", desc: "Con arance e limoni della campagna.", ingredients: "Farina, agrumi, uova", origin: ["farm","season"], allergens: "Glutine, uova", diet: "vegetariano", price: 7 }
    ]
  }
};
