/* =====================================================================
   accommodations-data.js — DATI DIMOSTRATIVI
   Otto alloggi. Prezzi, metrature e disponibilità sono di esempio e
   vanno SOSTITUITI con i dati reali del cliente prima della messa online.
   Nessun dato reale di strutture terze è utilizzato.
   ===================================================================== */
window.MR = window.MR || {};
window.MR.accommodations = [
  {
    slug: "camera-ulivo",
    name: "Camera Ulivo",
    type: "Camera doppia",
    guests: 2, size: 24, bed: "Letto king",
    outdoor: "Patio con vista uliveto", kitchen: false, accessible: false,
    priceFrom: 140, ph: "ph-olive",
    short: "Camera luminosa con patio privato affacciato sugli ulivi secolari.",
    features: ["Aria condizionata", "Bagno con doccia", "Wi-Fi", "Colazione inclusa", "Set cortesia della masseria"],
    included: ["Colazione contadina", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale"],
    // stagionalità e regole demo — vedi booking.js per l'uso
    minNights: 2, allowsChild: false, allowsPet: false,
    unavailable: ["2026-08-08", "2026-08-09", "2026-08-15"]
  },
  {
    slug: "camera-grano",
    name: "Camera Grano",
    type: "Camera doppia",
    guests: 2, size: 22, bed: "Letto matrimoniale",
    outdoor: "Accesso al giardino", kitchen: false, accessible: true,
    priceFrom: 130, ph: "ph-wheat",
    short: "Camera dai toni caldi con accesso diretto al giardino di erbe aromatiche.",
    features: ["Accessibile", "Aria condizionata", "Bagno con doccia a filo", "Wi-Fi", "Colazione inclusa"],
    included: ["Colazione contadina", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale"],
    minNights: 2, allowsChild: false, allowsPet: true,
    unavailable: ["2026-08-15", "2026-08-16"]
  },
  {
    slug: "camera-carrubo",
    name: "Camera Carrubo",
    type: "Camera Superior",
    guests: 2, size: 26, bed: "Letto queen",
    outdoor: "Piccolo salotto interno", kitchen: false, accessible: false,
    priceFrom: 150, ph: "ph-sage",
    short: "Camera più ampia con angolo salotto, ideale per soggiorni lenti.",
    features: ["Angolo lettura", "Aria condizionata", "Bagno con doccia", "Wi-Fi", "Colazione inclusa"],
    included: ["Colazione contadina", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale"],
    minNights: 2, allowsChild: false, allowsPet: false,
    unavailable: []
  },
  {
    slug: "camera-fico",
    name: "Camera Fico",
    type: "Camera famiglia",
    guests: 3, size: 28, bed: "Matrimoniale + divano letto",
    outdoor: "Spazio esterno condiviso", kitchen: false, accessible: false,
    priceFrom: 165, ph: "ph-earth",
    short: "Pensata per 2 adulti e 1 bambino, con divano letto e spazio esterno.",
    features: ["Divano letto", "Aria condizionata", "Bagno con doccia", "Wi-Fi", "Colazione inclusa", "Adatta a famiglie"],
    included: ["Colazione contadina", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale"],
    minNights: 2, allowsChild: true, allowsPet: false,
    unavailable: ["2026-08-10", "2026-08-11", "2026-08-12"]
  },
  {
    slug: "suite-lamia",
    name: "Suite Lamia",
    type: "Suite",
    guests: 2, size: 36, bed: "Letto king",
    outdoor: "Patio privato con vasca esterna", kitchen: false, accessible: false,
    priceFrom: 220, ph: "ph-dark",
    short: "Suite in una lamia recuperata, con vasca e patio privato. Fascia alta.",
    features: ["Vasca", "Patio privato", "Aria condizionata", "Wi-Fi", "Colazione inclusa", "Ideale coppie"],
    included: ["Colazione servita in patio", "Acqua della casa", "Amenities premium all'olio EVO", "Bottiglia di benvenuto", "Guida stagionale"],
    minNights: 2, allowsChild: false, allowsPet: false,
    unavailable: ["2026-08-14", "2026-08-15", "2026-08-16"]
  },
  {
    slug: "suite-trullo",
    name: "Suite Trullo",
    type: "Suite",
    guests: 2, size: 32, bed: "Letto queen",
    outdoor: "Corte con sedute", kitchen: false, accessible: false,
    priceFrom: 210, ph: "ph-stone",
    short: "Un trullo restaurato con nicchia soggiorno e volta in pietra a vista.",
    features: ["Edificio storico", "Nicchia soggiorno", "Aria condizionata", "Wi-Fi", "Colazione inclusa"],
    included: ["Colazione contadina", "Acqua della casa", "Amenities all'olio EVO", "Guida stagionale"],
    minNights: 2, allowsChild: false, allowsPet: false,
    unavailable: []
  },
  {
    slug: "appartamento-corte",
    name: "Appartamento Corte",
    type: "Appartamento",
    guests: 4, size: 55, bed: "2 matrimoniali",
    outdoor: "Corte privata", kitchen: true, accessible: false,
    priceFrom: 240, ph: "ph-olive",
    short: "Due ambienti, cucina attrezzata e corte privata: perfetto per famiglie o amici.",
    features: ["Cucina attrezzata", "2 camere", "Corte privata", "Aria condizionata", "Wi-Fi", "Adatto a famiglie"],
    included: ["Cestino colazione al primo giorno", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale"],
    minNights: 3, allowsChild: true, allowsPet: true,
    unavailable: ["2026-08-08", "2026-08-09", "2026-08-10", "2026-08-11"]
  },
  {
    slug: "casa-frantoio",
    name: "Casa del Frantoio",
    type: "Casa indipendente",
    guests: 4, size: 70, bed: "2 camere matrimoniali",
    outdoor: "Giardino privato e portico", kitchen: true, accessible: false,
    priceFrom: 280, ph: "ph-earth",
    short: "Unità indipendente su un antico frantoio: due camere, cucina e soggiorno.",
    features: ["Unità indipendente", "Cucina completa", "Soggiorno", "Giardino privato", "Wi-Fi", "Adatta a famiglie"],
    included: ["Cestino colazione al primo giorno", "Acqua della casa", "Prodotti da bagno all'olio EVO", "Guida stagionale", "Legna per il camino in inverno"],
    minNights: 3, allowsChild: true, allowsPet: true,
    unavailable: ["2026-08-14", "2026-08-15", "2026-08-16", "2026-08-17"]
  }
];
