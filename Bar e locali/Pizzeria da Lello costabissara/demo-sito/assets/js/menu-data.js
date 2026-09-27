/* Pizzeria da Lello Le Fornaci - dati menu
   Fonte: menu sfogliabile ufficiale pizzeriadalello.it (settembre 2026).
   Per modificare prezzi o ingredienti basta cambiare questo file. */

var CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3Fp93g3AABsPKODQxzIxBVAjWHa/';

/* ---------- Le protagoniste della ruota (foto ricreate con Higgsfield, sfondo trasparente) ---------- */
window.LELLO_PIZZE = [
  { id:'bpm', nome:'La B.P.M.', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_fdee03d1-a056-42a8-92d5-9b0011a53727_min.webp',
    frase:'Mortadella, pistacchio di Bronte e burrata: la pizza che fa girare la testa.',
    ing:[['Fior di latte','100% latte italiano'],['Mortadella','dopo cottura'],['Pesto di pistacchi','di Bronte'],['Granella di pistacchi',''],['Zest di limone','BIO'],['Burrata','di Andria pugliese']] },
  { id:'gioia', nome:'La Gioia', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_00a888b8-7ad8-4879-a541-a2cfe38e5d90_min.webp',
    frase:'Colori del Vesuvio e una burrata al centro. Fresca, allegra, estiva.',
    ing:[['Fior di latte','100% latte italiano'],['Pomodorino giallo','del Vesuvio'],['Pomodoro a freddo','"Oro del Vesuvio"'],['Pesto di basilico',''],['Burrata','di Andria']] },
  { id:'giovipiz', nome:'La Giovi Piz', cat:'Eccellenze napoletane', prezzo:10, img:CDN+'hf_20260925_120520_20cdb4f7-e5fa-42c4-b3cc-60833f67bcc7_min.webp',
    frase:'Base bianca, provola e salamino piccante. Semplice e decisa.',
    ing:[['Base bianca',''],['Fior di latte','100% latte italiano'],['Provola fresca','di Agerola'],['Salamino piccante',''],['Pepe',''],['Basilico fresco','']] },
  { id:'quattropomodori', nome:'Ai Quattro Pomodori', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_c34957ab-f970-4065-aedc-1f2b81e17064_min.webp',
    frase:'Quattro pomodori campani, quattro sapori in un solo disco.',
    ing:[['Fior di latte','100% latte italiano'],['Pomodoro pelato','"Oro del Vesuvio"'],['Pomodoro rosso','del Piennolo D.O.P.'],['Pomodoro giallo','del Monte Somma D.O.P.'],['Pomodoro secco','semi dry'],['Olio EVO','"Nino Centonze"'],['Basilico fresco','']] },
  { id:'costiera', nome:'La Costiera', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_121053_997e5257-bea5-429d-be5f-8f46a5bf4cad_min.webp',
    frase:'Salsiccia, Piennolo e scaglie di provolone del Monaco.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Salsiccia fresca',''],['Pomodoro rosso','del Piennolo D.O.P.'],['Provolone del Monaco','D.O.P., a scaglie'],['Olio EVO','"Nino Centonze"']] },
  { id:'pulcinella', nome:'La Pulcinella', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_401d2e32-0cc2-4687-a928-5c997b1ee5aa_min.webp',
    frase:'Bianca, con cicoli napoletani e ricotta di bufala. Napoli in purezza.',
    ing:[['Fior di latte','100% latte italiano'],['Cicoli napoletani','Salumificio Barbato'],['Provola fresca','di Agerola'],['Ricotta di bufala',''],['Basilico',''],['Pepe',''],['Olio EVO','"Nino Centonze"']] },
  { id:'toto', nome:'La Totò', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_121053_f565e0f1-af60-4e77-88d8-3166065594e8_min.webp',
    frase:'Friarielli e salame napoletano, con la ricotta di bufala a chiudere.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Friarielli','napoletani'],['Salame napoletano','Salumificio Barbato'],['Ricotta di bufala',''],['Basilico fresco',''],['Pepe',''],['Olio EVO','"Nino Centonze"']] },
  { id:'napule', nome:'Napulè', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_121052_bc4b1432-01f3-41b5-8d75-979845430b78_min.webp',
    frase:'Tonno a tranci e pistacchio: il mare che incontra la terra.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Pomodorini','semi dry'],['Tonno','a tranci'],['Pesto di pistacchi','di Bronte'],['Basilico',''],['Origano',''],['Aglio','']] },
  { id:'rock', nome:'La Rock', cat:'Eccellenze napoletane', prezzo:13, img:CDN+'hf_20260925_121053_6d529ecc-7386-451e-9ab3-2586f7d39e42_min.webp',
    frase:'Divisa in quattro: gli ingredienti li sceglie Lello, al momento.',
    ing:[['Spicchio 1','scelto da Lello'],['Spicchio 2','scelto da Lello'],['Spicchio 3','scelto da Lello'],['Spicchio 4','scelto da Lello'],['Ingredienti eccellenti','sempre diversi']] },
  { id:'scudetto', nome:'Lo Scudetto', cat:'Eccellenze napoletane', prezzo:10, img:CDN+'hf_20260925_121616_2237ff56-8084-418b-8dfa-fd9eac77c639_min.webp',
    frase:'Cornicione ripieno di ricotta e il tricolore sopra.',
    ing:[['Fior di latte','100% latte italiano'],['Cornicione ripieno','di ricotta'],['Pomodoro a freddo','"Oro del Vesuvio"'],['Pesto di basilico',''],['Olio EVO','"Nino Centonze"'],['Basilico fresco','']] },
  { id:'superverace', nome:'Super Verace', cat:'Classiche napoletane', prezzo:10, img:CDN+'hf_20260925_121052_df99cd77-d719-473c-ba72-c69fdaef6afa_min.webp',
    frase:'La verace con la bufala e il cornicione ripieno di ricotta.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Bufala campana','D.O.P., a fine cottura'],['Basilico fresco',''],['Cornicione ripieno','di ricotta fresca'],['Olio EVO','"Nino Centonze"']] },
  { id:'calzonenapoli', nome:'Calzone Napoli', cat:'I nostri calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120816_68f31af1-f99c-40d2-8436-bd07d3f74408_min.webp',
    frase:'Al forno, ripieno come una volta.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Prosciutto',''],['Salame Napoli','di Barbato'],['Ricotta fresca',''],['Provola fresca','di Agerola'],['Pepe','']] },
  { id:'calzonefritto', nome:'Calzone Fritto', cat:'I nostri calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120817_3f138852-675d-4c45-9c4a-db25065bba1c_min.webp',
    frase:'Il Napoli, ma fritto. Dorato fuori, filante dentro.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Prosciutto',''],['Salame Napoli','di Barbato'],['Ricotta fresca',''],['Provola fresca','di Agerola'],['Fritto','al momento']] },
  { id:'calzoneterry', nome:'Calzone Terry', cat:'I nostri calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120817_3c8df9b4-81a0-4780-b908-1e8957f10889_min.webp',
    frase:'Scarola, capperi di Salina, olive e bufala. Al forno o fritto.',
    ing:[['Fior di latte','100% latte italiano'],['Scarola saltata','con aglio'],['Capperi','di Salina'],['Olive taggiasche',''],['Bufala campana','D.O.P.']] }
];

/* ---------- Menu completo ---------- */
window.LELLO_MENU = [
  { titolo:'Classiche napoletane', nota:'La bufala la mettiamo a fine cottura. Tutte le Napoli anche con cornicione ripieno (+2,50 €).', voci:[
    ['Margherita',7,'Pomodoro pelato "Oro del Vesuvio", fior di latte 100% latte italiano, basilico fresco, olio EVO "Nino Centonze"'],
    ['Marinara',6,'Pomodoro pelato "Oro del Vesuvio", aglio, origano di Salina, basilico fresco, olio EVO'],
    ['La Verace',8,'Pomodoro pelato "Oro del Vesuvio", bufala campana D.O.P., basilico fresco, olio EVO'],
    ['Super Verace',10,'Pomodoro pelato, bufala campana D.O.P., basilico, cornicione ripieno di ricotta fresca, olio EVO','superverace'],
    ["Friariell' e Sasicc'",10,'Fior di latte, friarielli saltati con aglio e peperoncino, salsiccia fresca, basilico, olio EVO'],
    ['Provola e Pepe',8,'Pomodoro "Oro del Vesuvio", fior di latte, provola fresca di Agerola, pepe, basilico, olio EVO'],
    ['Margherita a Ruota di Carro',8,'Più grande e tirata, con meno bordo: come da vera tradizione napoletana']
  ]},
  { titolo:'Eccellenze napoletane', nota:'Le pizze firmate da Lello, con prodotti D.O.P. campani.', voci:[
    ['La Costiera',12,'Pomodoro "Oro del Vesuvio", fior di latte, salsiccia fresca, pomodoro del Piennolo D.O.P., scaglie di provolone del Monaco D.O.P., olio EVO','costiera'],
    ['Eccellenza',12,'Pomodoro "Oro del Vesuvio", fior di latte, melanzane fritte "a funghetto", pomodorino giallo, provolone del Monaco D.O.P., olio EVO'],
    ['La B.P.M.',12,'Fior di latte. Dopo cottura: mortadella, pesto di pistacchi di Bronte, granella di pistacchi, zest di limone BIO, burrata di Andria','bpm'],
    ['Arcobaleno',12,'Fior di latte, peperoni al forno, melanzane fritte "a funghetto", olive taggiasche, burrata'],
    ['Ai Quattro Pomodori',12,'Fior di latte, pomodoro "Oro del Vesuvio", pomodoro del Piennolo D.O.P., pomodoro giallo del Monte Somma D.O.P., pomodoro semi dry, basilico','quattropomodori'],
    ['Nonno Rafele',10,'Pomodoro "Oro del Vesuvio", fior di latte, scarola saltata con aglio e capperi di Salina, olive taggiasche, olio EVO'],
    ['La Rock',13,'Pizza divisa in 4 parti con ingredienti eccellenti scelti al momento da Lello','rock'],
    ['La Pulcinella',12,'Fior di latte, cicoli napoletani Barbato, provola di Agerola, ricotta di bufala, basilico, pepe, olio EVO','pulcinella'],
    ['La Totò',12,'Pomodoro "Oro del Vesuvio", fior di latte, friarielli, salame napoletano Barbato, ricotta di bufala, basilico, pepe','toto'],
    ['Le Bellezze del Sud',12,'Fior di latte, tonno lavorato a mano "Delfino Battista", pomodorino semisecco. Dopo cottura: pesto di pistacchi di Bronte, burrata'],
    ['Posillipo',12,'Fior di latte, pomodorino datterino, rucola selvatica, burrata di Andria, olio EVO'],
    ['San Gennaro',12,'Fior di latte, salame napoletano dolce, ricotta di bufala, tarallo napoletano sbriciolato, pesto di pistacchi di Bronte'],
    ['Regina Sofia',12,'Fior di latte, pomodorino giallo "Oro del Vesuvio", provola di Agerola, olive taggiasche, scaglie di Grana D.O.P., basilico'],
    ['Lo Scudetto',10,'Fior di latte, cornicione ripieno di ricotta, pomodoro "Oro del Vesuvio" a freddo, pesto di basilico, basilico','scudetto'],
    ['La Gioia',12,'Fior di latte, pomodorino giallo del Vesuvio, pomodoro "Oro del Vesuvio" a freddo, pesto di basilico, burrata di Andria','gioia'],
    ['La Giovi Piz',10,'Base bianca, fior di latte, provola di Agerola, salamino piccante, pepe, basilico','giovipiz'],
    ['Napulè',12,'Pomodoro "Oro del Vesuvio", pomodorini semi dry, tonno a tranci, pesto di pistacchi di Bronte, basilico, origano, aglio','napule'],
    ['Mergellina',12,'Fior di latte, pomodorini datterino, provola di Agerola, bufala campana D.O.P., basilico, olio EVO'],
    ['Maruzzella',10,'Pomodoro "Oro del Vesuvio", fior di latte, olive taggiasche, alici di Cetara "Delfino Battista", basilico'],
    ['La Scugnizzo',13,'Cornicione ripieno di salsiccia, metà pomodoro "Oro del Vesuvio" e metà pomodoro giallo del Monte Somma. Dopo cottura: pesto di basilico, tarallo sbriciolato, pepe'],
    ['Margherita Gold',8,'Passata di pomodoro giallo del Monte Somma, fior di latte, basilico, olio EVO'],
    ['Super Gold',11,'Cornicione ripieno di ricotta, pomodoro giallo del Monte Somma, bufala campana D.O.P., basilico'],
    ['Tarantella',8,'Metà pomodoro "Oro del Vesuvio", metà pomodoro giallo del Monte Somma, fior di latte, basilico']
  ]},
  { titolo:'Calzoni', nota:'Al forno oppure fritti.', voci:[
    ['Calzone Napoli',10,'Pomodoro "Oro del Vesuvio", fior di latte, prosciutto, salame Napoli di Barbato, ricotta fresca, pepe, provola di Agerola','calzonenapoli'],
    ['Calzone Fritto',10,'Il Calzone Napoli, fritto al momento','calzonefritto'],
    ['Calzone Vesuvio',10,'Pomodoro "Oro del Vesuvio", ricotta fresca, cicoli "Barbato Napoli", pepe, provola di Agerola'],
    ['Calzone Terry',10,'Fior di latte, scarola saltata con aglio e capperi di Salina, olive taggiasche, bufala campana D.O.P.','calzoneterry']
  ]},
  { titolo:'Pizze sottili', nota:'Tutte le tradizionali si possono fare alla napoletana (+1 €). Base senza glutine su richiesta (+3,50 €).', voci:[
    ['Marinara',5,'Pomodoro, aglio e origano'],['Margherita',6,'Pomodoro, mozzarella'],['Diavola',7,'Pomodoro, mozzarella, salamino piccante'],
    ['Romana',8,'Pomodoro, mozzarella, capperi e acciughe'],['Giusy',9,'Pomodoro, mozzarella, pomodorini, bufala, rucola'],['Golosa',9,'Pomodoro, mozzarella, provola, pancetta'],
    ['Montanara',9,'Pomodoro, mozzarella, porcini, asiago, salamino'],['Calzone',9,'Pomodoro, mozzarella, prosciutto, funghi, carciofi'],['Tonno e Cipolla di Tropea',9,'Pomodoro, mozzarella, tonno, cipolla'],
    ['Verdure',9,'Pomodoro, mozzarella, melanzane, zucchine, cipolla, asparagi, radicchio, peperoni'],['Quattro Formaggi',9,'Pomodoro, mozzarella, verde, asiago, grana, provola'],
    ['Capricciosa',10,'Pomodoro, mozzarella, prosciutto, funghi, carciofi, salamino'],['Los Angeles',10,'Pomodoro, mozzarella, porcini, porchetta, grana'],
    ['Saporita',10,'Pomodoro, mozzarella, melanzane, porchetta, asiago, funghi'],['Tirolese',10,'Pomodoro, mozzarella, speck, panna, funghi porcini'],
    ['Vegetariana',10,'Pomodoro, mozzarella, melanzane, zucchine, funghi porcini'],['Mare e Monti',10,'Pomodoro, mozzarella, frutti di mare, funghi porcini'],
    ['Lello',10,'Pomodoro, mozzarella, prosciutto, funghi, carciofi, peperoni, wurstel, salamino, asparagi'],['Fornaci',10,'Pomodoro, mozzarella, radicchio, salsiccia, pancetta'],
    ['Dipinta',10,'Pomodoro, mozzarella, gamberetti in salsa rosa, rucola'],['Lilly',10,'Pomodoro, mozzarella, friarielli, zucchine, melanzane, radicchio'],
    ['Burrata e Crudo',10,'Pomodoro, mozzarella, burrata, crudo'],['Burrata, Pomodorini e Rucola',10,'Pomodoro, mozzarella, burrata, pomodorini, rucola'],
    ['Nostromo',10,'Pomodoro, mozzarella, tonno, cipolla, acciughe, olive taggiasche, pomodorini'],['San Valentino',10,'Pomodoro, mozzarella, bufala, pomodorini, porcini'],
    ['Fashion',10,'Pomodoro, mozzarella, bufala, prosciutto cotto, porcini'],['Ischia (bianca)',10,'Mozzarella, pomodorini, bufala, olive taggiasche, origano'],
    ["O' Sarracino",10,'Pomodoro, mozzarella, capperi, pomodorini, acciughe, olive taggiasche, origano'],
    ['Sostanziosa (bianca)',12,'Mozzarella, funghi porcini, burrata, crudo'],['Burrata, Speck e Porcini',12,'Pomodoro, mozzarella, burrata, speck, porcini'],
    ['Frutti di Mare',12,'Pomodoro, mozzarella, frutti di mare, cozze'],['Amalfi',15,'Pomodoro, mozzarella, seppie, polipi, gamberetti, gamberone, scampo, capesante']
  ]},
  { titolo:'Fritti e antipasti', nota:'* Alcuni prodotti possono essere surgelati: chiedi al personale.', voci:[
    ['Le Montanare',7,'Pizzette fritte napoletane con pomodoro "Oro del Vesuvio", Grana Padano, basilico'],
    ['Cuoppo Napoletano',8,'Il cartoccio di fritti della tradizione'],
    ['Crocchè di patate',7,''],['Frittatine di pasta (4 pz)',7,''],['Piatto Cazzilli alla Giovanni',7,''],
    ['Olive ascolane (10 pz)',5,''],['Mozzarelline (10 pz)',5,''],['Alghette di mare (10 pz)',5,''],['Patate fritte',5,''],['Patate dippers',5,''],
    ['Frittura mista di pesce',17,'Calamari, anelli, gamberetti'],['Frittura del Golfo',20,'Calamari, anelli, gamberetti, scampo, gamberone'],
    ['Piatto crudo',14,'Burrata o bufala con focaccia al rosmarino'],['Insalata di mare',14,'Polipo, seppie, gamberetti'],
    ['Cocktail di gamberetti',14,''],['Capesante gratin (4 pz)',14,''],
    ['Scarole',5,''],['Friarielli',5,''],['Insalata mista',4,'']
  ]},
  { titolo:'Insalatone', voci:[
    ['Positano',12,'Misticanza, pomodorini, tonno, olive taggiasche, mozzarella di bufala'],
    ['Amalfitana',14,'Misticanza, rucola, gamberetti, pomodorini, polipo, seppie'],
    ['Agerolese',10,'Misticanza, tonno, peperoni al forno, scaglie di grana, olive taggiasche'],
    ['Furore',10,'Misticanza, carciofi, funghi, mais, pomodorini']
  ]},
  { titolo:'Per i piccoli', voci:[
    ['Cotoletta di pollo e patatine',6,''],['Wurstel di pollo e tacchino e patatine',6,''],['Hamburger di manzo e patatine',6,''],
    ['Pasta panna e prosciutto',6,''],['Pasta al pomodoro',6,''],['Hamburger e patate (per i grandi)',14,'Hamburger di scottona da 200 g e patate dippers']
  ]},
  { titolo:'Da bere', voci:[
    ['Birra bionda alla spina','3,50 / 5,00','30 cl / 50 cl'],['Birra rossa','4,50 / 5,50','33 cl / 50 cl'],['Birra bianca','4,00 / 5,50','25 cl / 50 cl'],
    ['Weissbier','5,50','50 cl'],['Moretti','4,50','66 cl'],['Birre artigianali','6,50','50 cl'],['Radler','4,50','33 cl'],['Birra analcolica','3,50','33 cl'],
    ['Spritz Aperol o Campari','4,00',''],['Spritz Select','3,50',''],['Americano / Gin Tonic','6,00',''],
    ['Vino frizzante alla spina','2 / 4 / 8','¼ l / ½ l / 1 l'],['Bottiglie di vino','da 15,00','Soave, Passerina, Falanghina, Valpolicella, Merlot, Prosecco DOCG'],
    ['Coca Cola alla spina','3,00 / 4,00','piccola / media'],['Acqua 75 cl','3,00',''],['Bibite in lattina','3,00',''],
    ['Caffè','1,50',''],['Liquori della Costiera Amalfitana','3,00',''],['Dolci al carrello','da 5,00','']
  ]}
];
