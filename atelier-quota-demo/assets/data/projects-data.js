/* ATELIER QUOTA — projects-data.js
   Dati dei progetti DIMOSTRATIVI. Nessun progetto è reale.
   Caricato come modulo globale (niente fetch) per compatibilità file://.
   Per aggiungere un progetto: copia un oggetto, aggiorna i campi e crea la
   pagina shell in /progetti/<slug>.html (vedi README). */
window.AQ_PROJECTS = [
  {
    slug: "casa-corte", num: "01", name: "Casa Corte",
    location: "Vicenza", area: ["vicenza"], year: 2024, status: "realizzato",
    size: "180 m²", type: ["residenziale"], services: ["architettura", "interior"],
    tone: "tone-clay",
    summary: "Casa urbana riorganizzata attorno a una corte interna, con un asse visivo continuo tra ingresso, cucina e giardino.",
    brief: "Una casa a schiera in centro, con ambienti frammentati e un rapporto quasi assente con la corte sul retro. La famiglia chiedeva più luce, una cucina vivibile e continuità tra dentro e fuori.",
    problem: "Gli spazi erano divisi da troppe pareti portanti apparenti e da una scala che occupava il cuore della casa. La corte, unico affaccio silenzioso, restava inutilizzata.",
    constraints: "Alcuni setti murari non eliminabili, altezze ridotte al piano terra e la necessità di mantenere l'accesso indipendente al piano superiore.",
    concept: "Abbiamo individuato un asse est-ovest che attraversa la casa e termina sulla corte. Tutto il piano giorno è stato riorganizzato lungo questa linea, liberando la vista.",
    solution: "La cucina diventa il fulcro centrale, affiancata da una zona pranzo che si apre con una vetrata scorrevole verso la corte. La scala è stata spostata e alleggerita con gradini in rovere a sbalzo.",
    spaces: "Piano terra continuo giorno-corte; piano primo con tre camere e un bagno rivisto; sottotetto recuperato a studio.",
    light: "La vetrata sulla corte e un nuovo lucernario sopra la scala portano luce naturale fino al centro della pianta, prima buia a mezzogiorno.",
    materials: "Rovere naturale per pavimenti e falegnamerie, intonaco a calce chiara, pietra locale per la soglia verso la corte.",
    sustainability: "Cappotto interno mirato, serramenti a taglio termico, ventilazione naturale trasversale favorita dal nuovo asse.",
    tech: { struttura: "Muratura esistente + micro-rinforzi (demo)", impianti: "Impianto radiante a pavimento (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografo demo", partner: "Strutturista demo, Termotecnico demo" },
    related: ["interno-san-marco", "casa-patio", "studio-portici"]
  },
  {
    slug: "casa-sul-monte", num: "02", name: "Casa sul Monte",
    location: "Arcugnano", area: ["provincia"], year: 2025, status: "progetto",
    size: "240 m²", type: ["residenziale", "nuove-costruzioni"], services: ["architettura"],
    tone: "tone-moss",
    summary: "Nuova abitazione su un lotto in pendenza sui Colli Berici, con volumi parzialmente interrati e orientamento studiato sulla luce.",
    brief: "Una coppia con lotto in forte pendenza e vista aperta sui Colli Berici. L'obiettivo: una casa che si appoggi al terreno senza dominarlo, con spazi luminosi e a basso consumo.",
    problem: "La pendenza rende difficile un impianto planimetrico tradizionale e impone attenzione al drenaggio, agli accessi e al rapporto tra piani.",
    constraints: "Indici urbanistici del lotto, vincolo paesaggistico dell'area collinare, necessità di limitare i movimenti terra.",
    concept: "La casa si articola su due livelli che seguono il declivio: la zona giorno affacciata sulla vista, la zona notte protetta e più raccolta a monte.",
    solution: "Un volume parzialmente interrato assorbe il dislivello e ospita servizi e cantina; sopra, una piastra abitabile con grande apertura verso valle e un porticato che gestisce l'irraggiamento estivo.",
    spaces: "Livello valle: giorno, cucina, porticato; livello monte: tre camere, studio, servizi. Collegamento con scala e lucernario.",
    light: "Grandi vetrate a sud-ovest schermate dal porticato; tagli di luce a nord per un'illuminazione stabile degli spazi di lavoro.",
    materials: "Intonaco chiaro, legno per i serramenti e le schermature, pietra a spacco per i muri di contenimento.",
    sustainability: "Involucro molto isolato, massa dei volumi interrati come inerzia termica, predisposizione per fotovoltaico e pompa di calore.",
    tech: { struttura: "Cemento armato per la parte interrata, legno per la copertura (demo)", impianti: "Pompa di calore + radiante (demo)", impresa: "Da definire", fotografia: "Render di progetto (demo)", partner: "Geologo demo, Strutturista demo" },
    related: ["casa-corte", "fienile-27", "casa-patio"]
  },
  {
    slug: "interno-san-marco", num: "03", name: "Interno San Marco",
    location: "Vicenza, centro storico", area: ["vicenza"], year: 2023, status: "realizzato",
    size: "120 m²", type: ["appartamenti", "residenziale"], services: ["interior", "architettura"],
    tone: "tone-ink",
    summary: "Appartamento in un edificio storico del centro, con una ridistribuzione contemporanea che convive con pavimenti e porte originali recuperati.",
    brief: "Un appartamento in palazzo storico, ereditato e mai aggiornato. Il cliente voleva spazi attuali senza cancellare la memoria dell'edificio.",
    problem: "Distribuzione a corridoio, bagno unico e sottodimensionato, elementi storici degradati ma di valore.",
    constraints: "Edificio in centro storico, elementi da conservare, impossibilità di modificare le aperture sulla facciata.",
    concept: "Mantenere e restaurare ciò che racconta l'edificio — pavimenti alla veneziana, porte, cornici — e inserire i nuovi elementi come volumi riconoscibili e leggeri.",
    solution: "Un blocco attrezzato in rovere organizza cucina, ripostiglio e secondo bagno; il corridoio diventa una galleria illuminata che collega gli ambienti restaurati.",
    spaces: "Ingresso-galleria, soggiorno con pavimento storico, cucina nel blocco nuovo, due camere, due bagni.",
    light: "Le nuove aperture interne e specchiature riflettono la luce delle finestre esistenti lungo la galleria centrale.",
    materials: "Pavimenti alla veneziana restaurati, rovere per il blocco nuovo, ottone spazzolato per i dettagli.",
    sustainability: "Recupero dei materiali esistenti, serramenti interni performanti nel rispetto del vincolo, illuminazione a LED a basso consumo.",
    tech: { struttura: "Invariata (demo)", impianti: "Rifacimento elettrico e idraulico (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografo demo", partner: "Restauratore demo" },
    related: ["casa-corte", "loft-lanificio", "studio-portici"]
  },
  {
    slug: "fienile-27", num: "04", name: "Fienile 27",
    location: "Lonigo", area: ["provincia"], year: 2025, status: "in-cantiere",
    size: "210 m²", type: ["recupero"], services: ["restauro", "architettura", "direzione-lavori"],
    tone: "tone-clay",
    summary: "Conversione di un fienile in abitazione: la struttura esistente è conservata e resa leggibile, i nuovi elementi restano chiaramente distinti.",
    brief: "Un fienile in pietra e legno da trasformare in casa, mantenendo il carattere dell'edificio rurale e raggiungendo buone prestazioni energetiche.",
    problem: "Struttura lignea da consolidare, ampie aperture da chiudere senza tradire il volume, umidità di risalita nelle murature.",
    constraints: "Sagoma e volume da conservare, orditura del tetto storica, distanze e vincoli dell'area agricola.",
    concept: "Trattare il fienile come un guscio: dentro, una 'casa nella casa' in legno che ospita gli spazi riscaldati; fuori, la pietra resta a vista.",
    solution: "Le grandi aperture sono tamponate con vetrate arretrate rispetto al filo murario, così la muratura originale continua a leggersi come cornice.",
    spaces: "Doppia altezza centrale con soggiorno; blocco a due livelli in legno per cucina e camere; loggia riparata verso la campagna.",
    light: "La doppia altezza distribuisce la luce dall'alto; le vetrate arretrate creano soglie in ombra che riducono il surriscaldamento.",
    materials: "Pietra e legno esistenti, nuovo legno chiaro per gli inserti, ferro per le passerelle interne.",
    sustainability: "Isolamento dall'interno, tetto ventilato, recupero delle acque, impianto a pompa di calore.",
    tech: { struttura: "Consolidamento ligneo + cordoli discreti (demo)", impianti: "Pompa di calore + radiante (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografie di cantiere (demo)", partner: "Strutturista demo, Direttore lavori Atelier Quota" },
    related: ["loft-lanificio", "casa-sul-monte", "casa-corte"]
  },
  {
    slug: "casa-patio", num: "05", name: "Casa Patio",
    location: "Padova", area: ["padova"], year: 2024, status: "realizzato",
    size: "200 m²", type: ["residenziale"], services: ["architettura"],
    tone: "tone-moss",
    summary: "Ampliamento di una villetta con una nuova stanza all'aperto: un patio centrale che riordina il rapporto tra zona giorno e giardino.",
    brief: "Una casa anni Ottanta con giardino sottoutilizzato e zona giorno chiusa. La richiesta: più continuità con l'esterno e un ambiente in più per la famiglia.",
    problem: "La casa dava le spalle al giardino; l'ampliamento rischiava di ridurre ancora lo spazio aperto utile.",
    constraints: "Confini stretti, distanze dai vicini, necessità di non aumentare eccessivamente la superficie coperta.",
    concept: "Anziché aggiungere solo volume, abbiamo aggiunto un vuoto: un patio che porta luce e verde dentro la casa e diventa il centro della vita quotidiana.",
    solution: "Il nuovo corpo abbraccia il patio su tre lati; la zona giorno si apre completamente su questo spazio protetto, utilizzabile gran parte dell'anno.",
    spaces: "Soggiorno e cucina affacciati sul patio, nuova stanza polifunzionale, collegamento diretto al giardino esistente.",
    light: "Il patio porta luce da sud anche negli ambienti retrostanti; una pergola regolabile controlla l'ombra in estate.",
    materials: "Cotto per il patio, intonaco chiaro, legno per gli infissi, verde rampicante come quarta parete.",
    sustainability: "Ventilazione naturale attraverso il patio, ombreggiamento vegetale, raccolta acqua piovana per l'irrigazione.",
    tech: { struttura: "Muratura e c.a. per l'ampliamento (demo)", impianti: "Integrazione con impianto esistente (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografo demo", partner: "Progettista del verde demo" },
    related: ["casa-corte", "casa-sul-monte", "interno-san-marco"]
  },
  {
    slug: "loft-lanificio", num: "06", name: "Loft Lanificio",
    location: "Schio", area: ["provincia"], year: 2025, status: "progetto",
    size: "260 m²", type: ["recupero", "residenziale"], services: ["architettura", "interior"],
    tone: "tone-ink",
    summary: "Riuso di un ex spazio produttivo come abitazione e studio: la struttura industriale resta visibile e ordina i nuovi ambienti.",
    brief: "Un'unità in un ex lanificio da trasformare in casa-studio per chi lavora da remoto, mantenendo il carattere industriale dello spazio.",
    problem: "Grande volume unico difficile da riscaldare e da abitare, poca privacy tra vita e lavoro, illuminazione da ripensare.",
    constraints: "Pilastri e travi in ghisa da conservare, unico fronte finestrato, altezze notevoli da gestire.",
    concept: "Inserire pochi volumi bassi e autoportanti dentro il grande spazio, lasciando leggere la struttura come una griglia continua.",
    solution: "Un volume-servizi al centro separa la zona lavoro dalla casa senza toccare il soffitto; un soppalco leggero recupera la zona notte.",
    spaces: "Studio sul fronte finestrato, cucina-soggiorno centrale, soppalco notte, servizi nel volume centrale.",
    light: "Il fronte vetrato esistente illumina lo studio; il soppalco è arretrato per non ostacolare la luce che raggiunge il fondo.",
    materials: "Ghisa e mattone esistenti, acciaio e legno per gli inserti, pavimento in resina continua.",
    sustainability: "Isolamento del fronte e della copertura, volumi tecnici come 'stanze calde', impianti concentrati per efficienza.",
    tech: { struttura: "Acciaio esistente + soppalco leggero (demo)", impianti: "Split idronici + VMC (demo)", impresa: "Da definire", fotografia: "Studi e render (demo)", partner: "Strutturista demo" },
    related: ["fienile-27", "interno-san-marco", "studio-portici"]
  },
  {
    slug: "studio-portici", num: "07", name: "Studio Portici",
    location: "Vicenza", area: ["vicenza"], year: 2023, status: "realizzato",
    size: "160 m²", type: ["uffici"], services: ["interior", "arredi", "architettura"],
    tone: "tone-moss",
    summary: "Uffici professionali flessibili sotto i portici del centro, con attenzione all'acustica, alla luce e ad arredi su misura.",
    brief: "Uno studio professionale che cresce e chiede spazi di lavoro flessibili, sale riunioni riservate e un'immagine sobria ma riconoscibile.",
    problem: "Open space rumoroso, poca separazione tra concentrazione e riunioni, luce non controllata sulle postazioni.",
    constraints: "Affaccio sui portici con luce diretta variabile, impianti a vista da riordinare, budget definito.",
    concept: "Costruire una sequenza chiara di ambienti — accoglienza, lavoro, riunione, pausa — separati con elementi acustici e leggeri.",
    solution: "Cabine acustiche vetrate per le riunioni, controsoffitti fonoassorbenti, arredi su misura che integrano archivio e cablaggi.",
    spaces: "Reception, area operativa, due sale riunioni, phone booth, area caffè.",
    light: "Tende tecniche e superfici chiare distribuiscono la luce dei portici; illuminazione lineare uniforme sulle postazioni.",
    materials: "Rovere chiaro, feltro fonoassorbente, vetro, dettagli in metallo verniciato.",
    sustainability: "Illuminazione a controllo di presenza, materiali a bassa emissione, arredi durevoli e riparabili.",
    tech: { struttura: "Invariata (demo)", impianti: "Nuovo impianto elettrico e clima (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografo demo", partner: "Consulente acustico demo" },
    related: ["osteria-sottoportico", "interno-san-marco", "loft-lanificio"]
  },
  {
    slug: "osteria-sottoportico", num: "08", name: "Osteria Sottoportico",
    location: "Bassano del Grappa", area: ["provincia"], year: 2024, status: "realizzato",
    size: "140 m²", type: ["hospitality", "retail"], services: ["interior", "architettura"],
    tone: "tone-clay",
    summary: "Un'osteria contemporanea in un edificio storico: identità materica, illuminazione calda e flussi di servizio studiati con la cucina.",
    brief: "Un ristoratore vuole aprire un'osteria che parli del territorio senza cadere nel rustico da cartolina, in uno spazio storico con vincoli.",
    problem: "Sala unica poco flessibile, cucina distante dalla sala, acustica dura e illuminazione inadeguata al servizio serale.",
    constraints: "Edificio storico con volte da conservare, spazi di servizio ridotti, normative su cucina e locali pubblici.",
    concept: "Un fondale materico continuo — legno e intonaco caldo — che unifica la sala; le volte restano protagoniste e vengono illuminate dal basso.",
    solution: "Bancone come cerniera tra ingresso, sala e passaggio in cucina; sedute modulari per gestire coperti diversi; luce puntuale sui tavoli.",
    spaces: "Ingresso con bancone, sala principale sotto le volte, saletta riservata, servizi e passaggio cucina ottimizzato.",
    light: "Illuminazione a più livelli: volte, tavoli e bancone; temperatura calda per il servizio serale.",
    materials: "Legno di recupero, intonaco a calce, ottone, tessuti fonoassorbenti per l'acustica.",
    sustainability: "Recupero di arredi e legno, LED dimmerabili, materiali locali e riparabili.",
    tech: { struttura: "Invariata, volte conservate (demo)", impianti: "Impianto cucina e aerazione (demo)", impresa: "Impresa demo S.r.l.", fotografia: "Fotografo demo", partner: "Consulente cucine demo, Acustico demo" },
    related: ["studio-portici", "interno-san-marco", "fienile-27"]
  }
];

/* Etichette leggibili per filtri e schede */
window.AQ_LABELS = {
  type: {
    "residenziale": "Residenziale", "appartamenti": "Appartamenti",
    "nuove-costruzioni": "Nuove costruzioni", "recupero": "Recupero",
    "uffici": "Uffici", "retail": "Retail", "hospitality": "Hospitality"
  },
  services: {
    "architettura": "Architettura", "interior": "Interior design",
    "fattibilita": "Fattibilità", "restauro": "Restauro",
    "direzione-lavori": "Direzione lavori", "arredi": "Arredi su misura"
  },
  status: {
    "realizzato": "Realizzato", "in-cantiere": "In cantiere",
    "progetto": "Progetto", "ricerca": "Ricerca"
  },
  area: {
    "vicenza": "Vicenza", "provincia": "Provincia di Vicenza",
    "padova": "Padova", "verona": "Verona", "veneto": "Veneto"
  }
};
