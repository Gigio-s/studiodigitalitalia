/* =====================================================================
   experiences-data.js — DATI DIMOSTRATIVI
   Esperienze in masseria. Prezzi, durate, partner e disponibilità sono
   di esempio: da confermare con la struttura prima della pubblicazione.
   ===================================================================== */
window.MR = window.MR || {};
window.MR.experiences = [
  {
    slug: "degustazione-olio", name: "Degustazione dell'olio",
    category: "Gusto", ph: "ph-wheat",
    duration: "90 minuti", period: "Tutto l'anno", priceFrom: 25,
    minAge: 12, minPeople: 2, maxPeople: 12, language: "IT / EN",
    weatherDependent: false, seasons: ["primavera","estate","autunno","inverno"],
    short: "Introduzione sensoriale all'olio EVO, passeggiata tra gli ulivi e assaggi guidati con pane e prodotti della masseria.",
    includes: ["Visita agli ulivi", "3 assaggi guidati", "Pane e prodotti", "Scheda sensoriale"]
  },
  {
    slug: "corso-cucina", name: "Corso di cucina pugliese",
    category: "Gusto", ph: "ph-earth",
    duration: "3 ore", period: "Tutto l'anno", priceFrom: 75,
    minAge: 10, minPeople: 2, maxPeople: 8, language: "IT / EN",
    weatherDependent: false, seasons: ["primavera","estate","autunno","inverno"],
    short: "Orecchiette o focaccia con verdure dell'orto: raccolta, impasto, cottura e pranzo o cena finale insieme.",
    includes: ["Raccolta nell'orto", "Grembiule", "Pasto finale", "Ricette da portare a casa", "Un calice di vino locale"]
  },
  {
    slug: "visita-fattoria", name: "Visita all'azienda agricola",
    category: "Fattoria", ph: "ph-olive",
    duration: "75 minuti", period: "Tutto l'anno", priceFrom: 15,
    minAge: 0, minPeople: 1, maxPeople: 15, language: "IT / EN",
    weatherDependent: true, seasons: ["primavera","estate","autunno","inverno"],
    short: "Orto, animali da cortile, uliveto e laboratorio: un giro guidato per capire come funziona la masseria stagione per stagione.",
    includes: ["Guida dedicata", "Incontro con gli animali", "Assaggio di stagione"]
  },
  {
    slug: "raccolta-olive", name: "Raccolta delle olive",
    category: "Fattoria", ph: "ph-sage",
    duration: "Mezza giornata", period: "Ottobre – novembre", priceFrom: 40,
    minAge: 8, minPeople: 2, maxPeople: 10, language: "IT / EN",
    weatherDependent: true, seasons: ["autunno"],
    short: "Solo nel periodo del raccolto: si raccolgono le olive con la squadra, si porta il prodotto al frantoio partner e si assaggia l'olio nuovo.",
    includes: ["Attrezzatura", "Pranzo contadino", "Visita al frantoio partner", "Bottiglia di olio nuovo"]
  },
  {
    slug: "picnic-ulivi", name: "Picnic tra gli ulivi",
    category: "All'aperto", ph: "ph-sage",
    duration: "Flessibile", period: "Aprile – ottobre", priceFrom: 30,
    minAge: 0, minPeople: 2, maxPeople: 6, language: "IT / EN",
    weatherDependent: true, seasons: ["primavera","estate","autunno"],
    short: "Un cestino preparato con prodotti della masseria e un luogo all'ombra tra gli ulivi. Opzioni vegetariane e per bambini.",
    includes: ["Cestino per 2", "Plaid", "Acqua e vino", "Opzioni alimentari a scelta"]
  },
  {
    slug: "e-bike", name: "Giro in e-bike",
    category: "All'aperto", ph: "ph-stone",
    duration: "2 – 3 ore", period: "Marzo – novembre", priceFrom: 35,
    minAge: 14, minPeople: 1, maxPeople: 8, language: "IT / EN",
    weatherDependent: true, seasons: ["primavera","estate","autunno"],
    short: "Percorso tra muretti a secco e trulli verso i borghi della Valle d'Itria, con e-bike a noleggio da partner locale.",
    includes: ["Noleggio e-bike", "Casco", "Mappa del percorso", "Assistenza partner"]
  },
  {
    slug: "esperienza-famiglia", name: "Giornata in fattoria per famiglie",
    category: "Famiglie", ph: "ph-olive",
    duration: "Mezza giornata", period: "Tutto l'anno", priceFrom: 20,
    minAge: 3, minPeople: 3, maxPeople: 12, language: "IT / EN",
    weatherDependent: true, seasons: ["primavera","estate","autunno","inverno"],
    short: "Attività pensate per età diverse: cura degli animali, semina nell'orto e un piccolo laboratorio in cucina, sempre con supervisione.",
    includes: ["Attività per bambini", "Merenda", "Kit del piccolo contadino", "Supervisione"]
  },
  {
    slug: "produttori-locali", name: "In giro dai produttori locali",
    category: "Territorio", ph: "ph-earth",
    duration: "Mezza giornata", period: "Tutto l'anno", priceFrom: 55,
    minAge: 12, minPeople: 2, maxPeople: 8, language: "IT / EN",
    weatherDependent: false, seasons: ["primavera","estate","autunno","inverno"],
    short: "Caseificio, apicoltore, ceramista e vignaiolo: un itinerario tra artigiani e piccoli produttori partner della masseria.",
    includes: ["Trasferimenti", "Guida", "Degustazioni", "Incontro con i produttori"]
  }
];
