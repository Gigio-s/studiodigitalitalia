/* =====================================================================
   seasons-data.js — DATI DIMOSTRATIVI
   Contenuto stagionale usato in homepage ("La stagione adesso"),
   stagioni.html e per suggerire pacchetti. Clima generale, NON meteo
   in tempo reale (nessuna API esterna).
   ===================================================================== */
window.MR = window.MR || {};

// mese (0-11) -> stagione demo
window.MR.monthToSeason = function (m) {
  if (m >= 2 && m <= 4) return "primavera";
  if (m >= 5 && m <= 7) return "estate";
  if (m >= 8 && m <= 10) return "autunno";
  return "inverno";
};

window.MR.seasons = {
  primavera: {
    label: "Primavera",
    climate: "Giornate miti, 16–23°C. Campagna in fiore.",
    growing: "Fave, piselli, carciofi, erbe aromatiche, prime fragole",
    harvest: "Verdure a foglia, erbe, primi ortaggi",
    dish: "Fave e cicorie, frittata di erbe spontanee",
    experience: "Corso di cucina con le verdure dell'orto",
    product: "Sale alle erbe",
    package: "Cucina e orto",
    pack: ["Riposo tra fioriture", "Cammini nella campagna", "Corsi di cucina"]
  },
  estate: {
    label: "Estate",
    climate: "Caldo secco, 28–34°C. Sere lunghe, cene all'aperto.",
    growing: "Pomodori, zucchine, melanzane, peperoni, fichi",
    harvest: "Pomodori da conserva, ortaggi estivi, fichi",
    dish: "Orecchiette al pomodoro dell'orto, parmigiana leggera",
    experience: "Picnic tra gli ulivi al tramonto",
    product: "Conserva di pomodoro",
    package: "Masseria per due",
    pack: ["Piscina tra gli ulivi", "Cene in campo", "Picnic e mare vicino"]
  },
  autunno: {
    label: "Autunno",
    climate: "Tiepido, 15–24°C. Colori caldi, aria della raccolta.",
    growing: "Olive, uva, melagrane, zucca, cavoli",
    harvest: "Olive per l'olio nuovo, uva, frutta autunnale",
    dish: "Zuppa di legumi, pane e olio nuovo",
    experience: "Raccolta delle olive con la squadra",
    product: "Olio EVO nuovo",
    package: "Tempo di raccolta",
    pack: ["Raccolta delle olive", "Olio nuovo", "Borghi in bassa stagione"]
  },
  inverno: {
    label: "Inverno",
    climate: "Fresco, 6–14°C. Camini accesi, quiete.",
    growing: "Cavoli, cime di rapa, agrumi, erbe resistenti",
    harvest: "Agrumi, ortaggi invernali, olive tardive",
    dish: "Cime di rapa, legumi, agrumi della campagna",
    experience: "Degustazione dell'olio accanto al camino",
    product: "Confettura di agrumi",
    package: "Lavorare dalla campagna",
    pack: ["Soggiorni lunghi e lenti", "Degustazioni", "Lavoro dalla campagna"]
  }
};

// matrice esperienza x mesi (per stagioni.html) — 1 = disponibile
window.MR.seasonMatrix = [
  { name: "Degustazione olio", months: [1,1,1,1,1,1,1,1,1,1,1,1], weather: false, kids: true },
  { name: "Corso di cucina",   months: [1,1,1,1,1,1,1,1,1,1,1,1], weather: false, kids: true },
  { name: "Visita fattoria",   months: [1,1,1,1,1,1,1,1,1,1,1,1], weather: true,  kids: true },
  { name: "Raccolta olive",    months: [0,0,0,0,0,0,0,0,0,1,1,0], weather: true,  kids: true },
  { name: "Picnic tra gli ulivi", months:[0,0,0,1,1,1,1,1,1,1,0,0], weather: true, kids: true },
  { name: "E-bike",            months: [0,0,1,1,1,1,1,1,1,1,1,0], weather: true,  kids: false },
  { name: "Famiglie",          months: [1,1,1,1,1,1,1,1,1,1,1,1], weather: true,  kids: true },
  { name: "Produttori locali", months: [1,1,1,1,1,1,1,1,1,1,1,1], weather: false, kids: true }
];
