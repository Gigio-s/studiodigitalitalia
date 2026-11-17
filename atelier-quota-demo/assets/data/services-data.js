/* ATELIER QUOTA — services-data.js  (DATI DIMOSTRATIVI) */
window.AQ_SERVICES = [
  {
    slug: "ristrutturazioni-residenziali", num: "01", name: "Ristrutturazioni residenziali",
    short: "Riorganizziamo case esistenti per migliorare luce, distribuzione, comfort e rapporto tra gli ambienti.",
    problem: "Molte case funzionano male non perché siano piccole, ma perché sono organizzate male: stanze buie, corridoi lunghi, spazi che non parlano tra loro. Prima di aggiungere, riordiniamo.",
    forWho: ["Chi vive una casa che sente stretta o poco luminosa", "Chi ha acquistato un immobile da rimettere a nuovo", "Chi vuole efficientare e riqualificare insieme"],
    includes: ["Sopralluogo e lettura dello stato di fatto", "Studio della nuova distribuzione", "Progetto architettonico e di interni", "Coordinamento delle pratiche", "Scelta materiali e finiture", "Supporto alla scelta dell'impresa", "Direzione lavori (su incarico)"],
    excludes: ["Il costo dei lavori e delle forniture, che dipende dall'impresa", "Le autorizzazioni, il cui esito dipende dagli enti", "Interventi strutturali senza il coinvolgimento di uno strutturista"],
    process: ["Primo confronto e fattibilità", "Rilievo ed esigenze", "Concept distributivo", "Progetto e pratiche", "Cantiere e direzione lavori", "Consegna"],
    deliverables: ["Relazione di fattibilità", "Piante di progetto", "Abaco materiali e finiture", "Elaborati per le pratiche", "Cronoprogramma di massima"],
    faq: [
      ["Posso restare in casa durante i lavori?", "Dipende dall'estensione dell'intervento. Lo valutiamo insieme in fase di fattibilità e organizziamo le fasi di conseguenza."],
      ["Vi occupate anche degli interni?", "Sì. Distribuzione, materiali, illuminazione e arredi su misura fanno parte dello stesso progetto."]
    ],
    related: ["casa-corte", "interno-san-marco", "casa-patio"]
  },
  {
    slug: "nuove-abitazioni", num: "02", name: "Nuove abitazioni",
    short: "Progettiamo case nuove a partire dal lotto, dall'orientamento e dal modo in cui una famiglia vive davvero.",
    problem: "Una casa nuova è un'occasione rara: va costruita sul terreno e sulle abitudini di chi la abiterà, non su un modello astratto. Partiamo dal luogo e dalle esigenze.",
    forWho: ["Chi possiede o sta valutando un lotto edificabile", "Chi vuole una casa su misura e a basso consumo", "Chi cerca un interlocutore unico dal progetto al cantiere"],
    includes: ["Analisi del lotto e dei vincoli", "Studio di orientamento e volumetria", "Progetto architettonico", "Coordinamento iter autorizzativo", "Progetto esecutivo", "Supporto alla scelta dell'impresa", "Direzione lavori (su incarico)"],
    excludes: ["Costi di costruzione e allacciamenti", "Esito delle autorizzazioni", "Indagini geologiche e strutturali, affidate a consulenti"],
    process: ["Fattibilità sul lotto", "Programma e esigenze", "Concept e volumi", "Progetto e autorizzazioni", "Esecutivo e impresa", "Cantiere e consegna"],
    deliverables: ["Studio di fattibilità urbanistica", "Progetto architettonico", "Elaborati per il permesso", "Progetto esecutivo", "Capitolato descrittivo"],
    faq: [
      ["Serve prima il progetto o l'impresa?", "Prima definiamo il progetto e le autorizzazioni, poi confrontiamo le imprese su un progetto chiaro: si ottengono offerte comparabili."],
      ["Quanto conta l'orientamento?", "Molto. Determina luce, consumi e comfort per tutta la vita della casa: lo studiamo fin dalle prime ipotesi."]
    ],
    related: ["casa-sul-monte", "casa-patio", "casa-corte"]
  },
  {
    slug: "interior-design", num: "03", name: "Interior design",
    short: "Layout, materiali, luce e arredi su misura per rendere gli spazi coerenti, funzionali e riconoscibili.",
    problem: "Un interno riuscito non è una somma di oggetti belli: è un insieme di scelte coordinate su spazio, luce e materiali. Ci occupiamo di tenerle insieme.",
    forWho: ["Chi ha spazi già definiti da valorizzare", "Chi vuole coordinare materiali, luce e arredi", "Studi e attività che cercano un'identità spaziale"],
    includes: ["Progetto della distribuzione interna", "Progetto illuminotecnico", "Selezione materiali e finiture", "Disegno di arredi su misura", "Coordinamento con falegnami e fornitori", "Direzione artistica in cantiere"],
    excludes: ["Fornitura diretta degli arredi (passa dai fornitori)", "Opere strutturali, se necessarie", "Acquisti effettuati dal cliente senza coordinamento"],
    process: ["Confronto e riferimenti", "Layout e funzioni", "Materiali e luce", "Disegni esecutivi arredi", "Coordinamento fornitori", "Posa e messa a punto"],
    deliverables: ["Moodboard e concept", "Piante arredate e prospetti", "Progetto illuminotecnico", "Disegni di dettaglio degli arredi", "Elenco materiali e fornitori"],
    faq: [
      ["Posso chiedere solo l'interior senza ristrutturare?", "Sì. L'interior design può essere un incarico a sé, coordinato con eventuali piccole opere."],
      ["Disegnate arredi su misura?", "Sì, quando servono a risolvere lo spazio: li disegniamo e li seguiamo con la falegnameria."]
    ],
    related: ["interno-san-marco", "studio-portici", "osteria-sottoportico"]
  },
  {
    slug: "restauro-e-recupero", num: "04", name: "Restauro e recupero",
    short: "Leggiamo l'edificio esistente, conserviamo ciò che ha valore e integriamo il nuovo in modo riconoscibile.",
    problem: "Recuperare non significa nascondere il vecchio né imitarlo: significa capire cosa vale la pena mantenere e come far dialogare passato e presente con onestà.",
    forWho: ["Chi possiede rustici, fienili o edifici storici", "Chi vuole riqualificare senza cancellare il carattere", "Chi cerca competenza sui vincoli e sull'esistente"],
    includes: ["Lettura e rilievo dell'esistente", "Analisi dei vincoli", "Strategia di conservazione e riuso", "Progetto di integrazione nuovo-antico", "Coordinamento consulenti specialistici", "Direzione lavori (su incarico)"],
    excludes: ["Esito dei pareri di enti e soprintendenze", "Interventi di consolidamento senza strutturista", "Diagnostica specialistica, affidata a laboratori"],
    process: ["Sopralluogo e diagnosi", "Vincoli e possibilità", "Strategia di conservazione", "Progetto e pareri", "Cantiere conservativo", "Consegna"],
    deliverables: ["Relazione sullo stato di fatto", "Progetto di recupero", "Elaborati per pareri e pratiche", "Abaco degli interventi conservativi"],
    faq: [
      ["Come si distingue il nuovo dall'antico?", "Con scelte di materiale e distacco: gli inserti nuovi restano leggibili, senza falsi storici, ma coerenti con l'edificio."],
      ["Lavorate su edifici vincolati?", "Sì, coordinando i pareri necessari. L'esito delle autorizzazioni resta di competenza degli enti."]
    ],
    related: ["fienile-27", "loft-lanificio", "interno-san-marco"]
  },
  {
    slug: "pratiche-edilizie", num: "05", name: "Pratiche edilizie",
    short: "Analizziamo la documentazione, verifichiamo lo stato e coordiniamo le pratiche necessarie all'intervento.",
    problem: "Prima di progettare conviene sapere da dove si parte: che titoli esistono, se lo stato di fatto è conforme, quali procedure servono. È un passaggio che evita sorprese in cantiere.",
    forWho: ["Chi deve ristrutturare o ampliare", "Chi ha dubbi sulla conformità dell'immobile", "Chi sta valutando un acquisto"],
    includes: ["Analisi documentale e catastale", "Verifica preliminare di conformità", "Predisposizione delle pratiche", "Coordinamento con tecnici e amministrazioni", "Aggiornamenti catastali (su incarico)"],
    excludes: ["Approvazioni e tempi, che dipendono dagli enti", "Sanatorie il cui esito non è garantito", "Accertamenti che richiedono accessi agli atti di terzi"],
    process: ["Raccolta documenti", "Verifica dello stato", "Individuazione delle procedure", "Predisposizione pratiche", "Deposito e coordinamento", "Chiusura"],
    deliverables: ["Check documentale", "Relazione preliminare di conformità", "Elaborati per le pratiche", "Quadro delle procedure necessarie"],
    faq: [
      ["Potete garantire l'approvazione?", "No. Prepariamo pratiche corrette e complete, ma l'esito e i tempi dipendono dagli enti competenti."],
      ["Serve prima di comprare casa?", "Spesso sì: una verifica preliminare aiuta a capire cosa è davvero possibile prima di impegnarsi."]
    ],
    related: ["casa-corte", "fienile-27", "casa-sul-monte"]
  },
  {
    slug: "direzione-lavori", num: "06", name: "Direzione lavori",
    short: "Seguiamo l'esecuzione per verificare che il cantiere realizzi ciò che è stato progettato e deciso.",
    problem: "Un buon progetto ha bisogno di essere seguito. La direzione lavori controlla che l'opera corrisponda al progetto e coordina le decisioni durante il cantiere, restando distinta dal lavoro dell'impresa.",
    forWho: ["Chi ha un progetto pronto per il cantiere", "Chi vuole un controllo indipendente dall'impresa", "Chi desidera un unico riferimento durante i lavori"],
    includes: ["Verifiche periodiche in cantiere", "Coordinamento tra impresa e consulenti", "Riunioni e verbali", "Controllo dell'esecuzione e delle finiture", "Gestione di varianti e imprevisti", "Documentazione dell'avanzamento"],
    excludes: ["L'esecuzione delle opere, che spetta all'impresa", "Le responsabilità della sicurezza, affidate al coordinatore", "La fornitura di materiali"],
    process: ["Avvio e programma", "Verifiche in corso d'opera", "Riunioni periodiche", "Gestione varianti", "Controllo finiture", "Verifiche finali"],
    deliverables: ["Verbali di cantiere", "Report di avanzamento", "Registro delle decisioni", "Documentazione di fine lavori"],
    faq: [
      ["La direzione lavori è come il capocantiere dell'impresa?", "No. La direzione lavori tutela il progetto e il committente; il capocantiere organizza il lavoro dell'impresa. Sono ruoli distinti."],
      ["Posso avere solo la direzione lavori?", "Sì, valutando il progetto esistente. In alcuni casi consigliamo verifiche preliminari."]
    ],
    related: ["fienile-27", "casa-corte", "studio-portici"]
  },
  {
    slug: "spazi-commerciali", num: "07", name: "Spazi commerciali",
    short: "Progettiamo negozi, uffici, ristoranti e piccole strutture ricettive tenendo insieme identità, funzione e flussi.",
    problem: "Uno spazio di lavoro o di accoglienza deve funzionare per chi ci lavora e comunicare a chi entra. Progettiamo l'esperienza e l'operatività insieme, non come reparti separati.",
    forWho: ["Negozi e showroom", "Studi professionali e uffici", "Ristoranti, osterie e piccoli hotel", "B&B e attività ricettive"],
    includes: ["Analisi dei flussi e delle funzioni", "Progetto di immagine e materiali", "Progetto illuminotecnico", "Arredi e allestimenti su misura", "Coordinamento pratiche di attività", "Direzione artistica"],
    excludes: ["Autorizzazioni sanitarie e amministrative (coordinate, non garantite)", "Fornitura diretta di attrezzature", "Gestione operativa dell'attività"],
    process: ["Brief e concept", "Layout e flussi", "Immagine e materiali", "Progetto e pratiche", "Realizzazione", "Apertura"],
    deliverables: ["Concept e moodboard", "Layout funzionale", "Progetto luce e materiali", "Disegni di arredi e allestimenti"],
    faq: [
      ["Seguite anche l'immagine del locale?", "Curiamo l'immagine spaziale — materiali, luce, dettagli. Per il marchio collaboriamo con grafici e consulenti."],
      ["Lavorate su piccoli spazi?", "Sì. Spesso è proprio nei piccoli spazi che una buona progettazione fa la differenza maggiore."]
    ],
    related: ["osteria-sottoportico", "studio-portici", "loft-lanificio"]
  }
];
