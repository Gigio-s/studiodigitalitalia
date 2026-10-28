/* Pizzeria da Lello Le Fornaci - dati menu
   Fonte: menu sfogliabile ufficiale pizzeriadalello.it (settembre 2026).
   Per modificare prezzi o ingredienti basta cambiare questo file. */

var CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3Fp93g3AABsPKODQxzIxBVAjWHa/';

/* ---------- Le protagoniste della ruota (foto ricreate con Higgsfield, sfondo trasparente) ---------- */
window.LELLO_PIZZE = [
  /* Foto inviate da Lello il 27/10/2026, ricreate con Higgsfield. conferma:true = nome da far confermare al cliente */
  { id:'bpm', nome:'La B.P.M.', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092012_09c5a702-381f-476d-80b0-db5a65fe8800_min.webp',
    frase:'Mortadella, pistacchio di Bronte e burrata: la pizza che fa girare la testa.',
    ing:[['Fior di latte','100% latte italiano'],['Mortadella','dopo cottura'],['Pesto di pistacchi','di Bronte'],['Granella di pistacchi',''],['Zest di limone','BIO'],['Burrata','di Andria pugliese']] },
  { id:'sangennaro', nome:'San Gennaro', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092042_147e1b9d-ae71-4f28-92ad-970903999107_min.webp',
    frase:'Bianca con salame dolce, ricotta di bufala, tarallo e pistacchio.',
    ing:[['Fior di latte','100% latte italiano'],['Salame napoletano','dolce'],['Ricotta di bufala','fresca'],['Tarallo napoletano','sbriciolato'],['Pesto di pistacchi','di Bronte']] },
  { id:'superverace', nome:'Super Verace', conferma:true, cat:'Classiche napoletane', prezzo:10, img:CDN+'hf_20261027_092115_2e6fd1f8-0144-4281-a83c-009d6cfeeeb3_min.webp',
    frase:'La verace con la bufala e il cornicione ripieno di ricotta.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Bufala campana','D.O.P., a fine cottura'],['Basilico fresco',''],['Cornicione ripieno','di ricotta fresca'],['Olio EVO','"Nino Centonze"']] },
  { id:'posillipo', nome:'Posillipo', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092011_98ae4c15-6ee3-4178-b7cf-450befe4d87b_min.webp',
    frase:'Datterini, rucola selvatica e una burrata intera al centro.',
    ing:[['Fior di latte','100% latte italiano'],['Pomodorino datterino',''],['Rucola selvatica',''],['Burrata','di Andria pugliese'],['Olio EVO','"Nino Centonze"']] },
  { id:'toto', nome:'La Totò', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092212_d6aaeb02-ccbd-42b8-8188-9f3e1c8aa72c_min.webp',
    frase:'Friarielli e salame napoletano, con la ricotta di bufala a chiudere.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Friarielli','napoletani'],['Salame napoletano','Salumificio Barbato'],['Ricotta di bufala',''],['Basilico fresco',''],['Pepe',''],['Olio EVO','"Nino Centonze"']] },
  { id:'supergold', nome:'Super Gold', conferma:true, cat:'Eccellenze napoletane', prezzo:11, img:CDN+'hf_20261027_092306_ba1f346a-6860-4d26-852c-8c9adf2f2ed7_min.webp',
    frase:'Pomodoro giallo del Monte Somma, bufala e cornicione ripieno.',
    ing:[['Cornicione ripieno','di ricotta'],['Pomodoro giallo','del Monte Somma'],['Bufala campana','D.O.P.'],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'friarielli', nome:"Friariell' e Sasicc'", conferma:true, cat:'Classiche napoletane', prezzo:10, img:CDN+'hf_20261027_092115_a0da25be-0003-433c-b608-32453534e0da_min.webp',
    frase:'Il classico napoletano: friarielli saltati e salsiccia fresca.',
    ing:[['Fior di latte','100% latte italiano'],['Friarielli','saltati con aglio e peperoncino'],['Salsiccia fresca',''],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'bellezze', nome:'Le Bellezze del Sud', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092712_6a7b9fb7-bff8-4965-8d7b-17c7fd532de7_min.webp',
    frase:'Tonno lavorato a mano, pomodorino semisecco, pistacchio e burrata.',
    ing:[['Fior di latte','100% latte italiano'],['Tonno','"Delfino Battista"'],['Pomodorino','semisecco'],['Pesto di pistacchi','dopo cottura'],['Burrata','dopo cottura']] },
  { id:'scugnizzo', nome:'La Scugnizzo', conferma:true, cat:'Eccellenze napoletane', prezzo:13, img:CDN+'hf_20261027_092712_beaea023-d47d-4e9d-afb3-d9c60e87995d_min.webp',
    frase:'Metà rossa e metà gialla, con il cornicione ripieno di salsiccia.',
    ing:[['Cornicione ripieno','di salsiccia'],['Pomodoro','"Oro del Vesuvio" (metà)'],['Pomodoro giallo','del Monte Somma (metà)'],['Pesto di basilico','dopo cottura'],['Tarallo napoletano','sbriciolato'],['Pepe','']] },
  { id:'pulcinella', nome:'La Pulcinella', conferma:true, cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20261027_092712_a9a40476-1679-4476-8d1c-6195c6c7ca2a_min.webp',
    frase:'Bianca, con cicoli napoletani e ricotta di bufala. Napoli in purezza.',
    ing:[['Fior di latte','100% latte italiano'],['Cicoli napoletani','Salumificio Barbato'],['Provola fresca','di Agerola'],['Ricotta di bufala',''],['Basilico',''],['Pepe',''],['Olio EVO','"Nino Centonze"']] },
  { id:'crocche', nome:'Crocchè', conferma:true, cat:'Novità', prezzo:null, img:CDN+'hf_20261027_092211_4672b3bd-4822-4b80-b00c-d4f188a27ad1_min.webp',
    frase:'Cremosa, filante e super golosa, con le crocchette di patate sopra.',
    ing:[['Panna',''],['Fiordilatte',''],['Prosciutto cotto',''],['Crocchette di patate',''],['Basilico fresco','']] },
  { id:'nuovagialla', nome:'Nuova pizza (base gialla)', conferma:true, cat:'Novità', prezzo:null, img:CDN+'hf_20261027_092213_691715a6-78f7-40fa-bd62-94d4926866ee_min.webp',
    frase:'Ingredienti ricavati dalla foto: da confermare con la pizzeria.',
    ing:[['Crema gialla','da confermare'],['Fior di latte',''],['Gorgonzola','da confermare'],['Salame',''],['Granella','di frutta secca'],['Basilico','']] },
  { id:'margherita', nome:'Margherita', conferma:true, cat:'Classiche napoletane', prezzo:7, img:CDN+'hf_20261027_092012_25355dc3-4854-4616-8a07-52dab8f41e35_min.webp',
    frase:'La regina: pomodoro, fior di latte e basilico.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'ruota', nome:'Margherita a Ruota di Carro', conferma:true, cat:'Classiche napoletane', prezzo:8, img:CDN+'hf_20261027_092115_04f692b2-9a0b-42a7-b46d-699e01a4d1e0_min.webp',
    frase:'Più grande e tirata, con meno bordo: come da vera tradizione napoletana.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'verace', nome:'La Verace', conferma:true, cat:'Classiche napoletane', prezzo:8, img:CDN+'hf_20261027_092116_0b98ded4-7155-4b9a-bb0e-1d290e685d9d_min.webp',
    frase:'Pomodoro e bufala campana messa a fine cottura.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Bufala campana','D.O.P., a fine cottura'],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'provola', nome:'Provola e Pepe', conferma:true, cat:'Classiche napoletane', prezzo:8, img:CDN+'hf_20261027_092214_9bb3d0a7-c5c6-4279-868c-68474b49f3e2_min.webp',
    frase:'Provola di Agerola e una bella macinata di pepe.',
    ing:[['Pomodoro','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Provola fresca','di Agerola'],['Pepe',''],['Basilico',''],['Olio EVO','"Nino Centonze"']] },
  { id:'marinara', nome:'Marinara', conferma:true, cat:'Classiche napoletane', prezzo:6, img:CDN+'hf_20261027_092713_30918b4c-4d0d-43dd-a899-852e303ba279_min.webp',
    frase:'Pomodoro, aglio e origano: la più antica di tutte.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Aglio',''],['Origano','di Salina'],['Basilico fresco',''],['Olio EVO','"Nino Centonze"']] },
  { id:'cazzilli', nome:'Piatto Cazzilli alla Giovanni', conferma:true, cat:'Fritti e antipasti', prezzo:7, img:CDN+'hf_20261027_092012_4f13073f-967e-43cd-a787-69fe787e94de_min.webp',
    frase:'Pomodoro, aglio, origano e salamino piccante.',
    ing:[['Pomodoro','"Oro del Vesuvio"'],['Aglio',''],['Origano','di Salina'],['Salamino piccante',''],['Olio EVO','"Nino Centonze"']] }
];

/* ---------- Altre pizze del menu (27/10/2026) ----------
   Le 10 ricreate a settembre + 41 nuove generate con Higgsfield dal testo del menu ufficiale. */
window.LELLO_PIZZE = window.LELLO_PIZZE.concat([
  { id:'costiera', nome:'La Costiera', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_121053_997e5257-bea5-429d-be5f-8f46a5bf4cad_min.webp',
    frase:'Salsiccia, Piennolo e scaglie di provolone del Monaco.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Salsiccia fresca',''],['Pomodoro rosso','del Piennolo D.O.P.'],['Provolone del Monaco','D.O.P., a scaglie'],['Olio EVO','"Nino Centonze"']] },
  { id:'quattropomodori', nome:'Ai Quattro Pomodori', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_c34957ab-f970-4065-aedc-1f2b81e17064_min.webp',
    frase:'Quattro pomodori campani, quattro sapori in un solo disco.',
    ing:[['Fior di latte','100% latte italiano'],['Pomodoro pelato','"Oro del Vesuvio"'],['Pomodoro rosso','del Piennolo D.O.P.'],['Pomodoro giallo','del Monte Somma D.O.P.'],['Pomodoro secco','semi dry'],['Olio EVO','"Nino Centonze"'],['Basilico fresco','']] },
  { id:'rock', nome:'La Rock', cat:'Eccellenze napoletane', prezzo:13, img:CDN+'hf_20260925_121053_6d529ecc-7386-451e-9ab3-2586f7d39e42_min.webp',
    frase:'Divisa in quattro: gli ingredienti li sceglie Lello, al momento.',
    ing:[['Spicchio 1','scelto da Lello'],['Spicchio 2','scelto da Lello'],['Spicchio 3','scelto da Lello'],['Spicchio 4','scelto da Lello'],['Ingredienti eccellenti','sempre diversi']] },
  { id:'scudetto', nome:'Lo Scudetto', cat:'Eccellenze napoletane', prezzo:10, img:CDN+'hf_20260925_121616_2237ff56-8084-418b-8dfa-fd9eac77c639_min.webp',
    frase:'Cornicione ripieno di ricotta e il tricolore sopra.',
    ing:[['Fior di latte','100% latte italiano'],['Cornicione ripieno','di ricotta'],['Pomodoro a freddo','"Oro del Vesuvio"'],['Pesto di basilico',''],['Olio EVO','"Nino Centonze"'],['Basilico fresco','']] },
  { id:'gioia', nome:'La Gioia', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_120817_00a888b8-7ad8-4879-a541-a2cfe38e5d90_min.webp',
    frase:'Colori del Vesuvio e una burrata al centro. Fresca, allegra, estiva.',
    ing:[['Fior di latte','100% latte italiano'],['Pomodorino giallo','del Vesuvio'],['Pomodoro a freddo','"Oro del Vesuvio"'],['Pesto di basilico',''],['Burrata','di Andria']] },
  { id:'giovipiz', nome:'La Giovi Piz', cat:'Eccellenze napoletane', prezzo:10, img:CDN+'hf_20260925_120520_20cdb4f7-e5fa-42c4-b3cc-60833f67bcc7_min.webp',
    frase:'Base bianca, provola e salamino piccante. Semplice e decisa.',
    ing:[['Base bianca',''],['Fior di latte','100% latte italiano'],['Provola fresca','di Agerola'],['Salamino piccante',''],['Pepe',''],['Basilico fresco','']] },
  { id:'napule', nome:'Napulè', cat:'Eccellenze napoletane', prezzo:12, img:CDN+'hf_20260925_121052_bc4b1432-01f3-41b5-8d75-979845430b78_min.webp',
    frase:'Tonno a tranci e pistacchio: il mare che incontra la terra.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Pomodorini','semi dry'],['Tonno','a tranci'],['Pesto di pistacchi','di Bronte'],['Basilico',''],['Origano',''],['Aglio','']] },
  { id:'calzonenapoli', nome:'Calzone Napoli', cat:'Calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120816_68f31af1-f99c-40d2-8436-bd07d3f74408_min.webp',
    frase:'Al forno, ripieno come una volta.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Prosciutto',''],['Salame Napoli','di Barbato'],['Ricotta fresca',''],['Provola fresca','di Agerola'],['Pepe','']] },
  { id:'calzonefritto', nome:'Calzone Fritto', cat:'Calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120817_3f138852-675d-4c45-9c4a-db25065bba1c_min.webp',
    frase:'Il Napoli, ma fritto. Dorato fuori, filante dentro.',
    ing:[['Pomodoro pelato','"Oro del Vesuvio"'],['Fior di latte','100% latte italiano'],['Prosciutto',''],['Salame Napoli','di Barbato'],['Ricotta fresca',''],['Provola fresca','di Agerola'],['Fritto','al momento']] },
  { id:'calzoneterry', nome:'Calzone Terry', cat:'Calzoni', prezzo:10, forma:'calzone', img:CDN+'hf_20260925_120817_3c8df9b4-81a0-4780-b908-1e8957f10889_min.webp',
    frase:'Scarola, capperi di Salina, olive e bufala. Al forno o fritto.',
    ing:[['Fior di latte','100% latte italiano'],['Scarola saltata','con aglio'],['Capperi','di Salina'],['Olive taggiasche',''],['Bufala campana','D.O.P.']] },
  {"id": "eccellenza", "nome": "Eccellenza", "cat": "Eccellenze napoletane", "prezzo": 12, "img": CDN+'hf_20261027_102930_d9d972cb-c4ac-4b83-99c1-05886df27dce_min.webp', "frase": "Melanzane a funghetto, pomodorino giallo e provolone del Monaco.", "ing": [["Pomodoro \"Oro del Vesuvio\"", ""], ["Fior di latte", ""], ["Melanzane fritte \"a funghetto\"", ""], ["Pomodorino giallo", ""], ["Provolone del Monaco D", ""], ["O", ""], ["P", ""], ["Olio EVO", ""]]},
  {"id": "arcobaleno", "nome": "Arcobaleno", "cat": "Eccellenze napoletane", "prezzo": 12, "img": CDN+'hf_20261027_102930_759b522e-e2e3-4e36-93db-14aea320bdd9_min.webp', "frase": "Peperoni, melanzane, olive e una burrata intera al centro.", "ing": [["Fior di latte", ""], ["Peperoni al forno", ""], ["Melanzane fritte \"a funghetto\"", ""], ["Olive taggiasche", ""], ["Burrata", ""]]},
  {"id": "nonnorafele", "nome": "Nonno Rafele", "cat": "Eccellenze napoletane", "prezzo": 10, "img": CDN+'hf_20261027_102931_c68fb89d-10fe-4db8-8582-fd4201ab07eb_min.webp', "frase": "Scarola saltata con capperi e olive, come la faceva il nonno.", "ing": [["Pomodoro \"Oro del Vesuvio\"", ""], ["Fior di latte", ""], ["Scarola saltata con aglio e capperi di Salina", ""], ["Olive taggiasche", ""], ["Olio EVO", ""]]},
  {"id": "reginasofia", "nome": "Regina Sofia", "cat": "Eccellenze napoletane", "prezzo": 12, "img": CDN+'hf_20261027_102930_fcad41a3-3acd-4187-b268-0e768f2f8342_min.webp', "frase": "Pomodorino giallo, provola, olive e scaglie di Grana.", "ing": [["Fior di latte", ""], ["Pomodorino giallo \"Oro del Vesuvio\"", ""], ["Provola di Agerola", ""], ["Olive taggiasche", ""], ["Scaglie di Grana D", ""], ["O", ""], ["P", ""], ["Basilico", ""]]},
  {"id": "mergellina", "nome": "Mergellina", "cat": "Eccellenze napoletane", "prezzo": 12, "img": CDN+'hf_20261027_103202_00ed1c2d-7d8f-4f3f-bb08-97292d32260d_min.webp', "frase": "Datterini, provola di Agerola e bufala campana.", "ing": [["Fior di latte", ""], ["Pomodorini datterino", ""], ["Provola di Agerola", ""], ["Bufala campana D", ""], ["O", ""], ["P", ""], ["Basilico", ""], ["Olio EVO", ""]]},
  {"id": "maruzzella", "nome": "Maruzzella", "cat": "Eccellenze napoletane", "prezzo": 10, "img": CDN+'hf_20261027_103113_b6e9891d-ab91-448a-8c99-280c299782e7_min.webp', "frase": "Olive taggiasche e alici di Cetara: il mare di Napoli.", "ing": [["Pomodoro \"Oro del Vesuvio\"", ""], ["Fior di latte", ""], ["Olive taggiasche", ""], ["Alici di Cetara \"Delfino Battista\"", ""], ["Basilico", ""]]},
  {"id": "margheritagold", "nome": "Margherita Gold", "cat": "Eccellenze napoletane", "prezzo": 8, "img": CDN+'hf_20261027_103113_6fcc6f41-f106-423c-b75b-701f2e19c0b0_min.webp', "frase": "La margherita con il pomodoro giallo del Monte Somma.", "ing": [["Passata di pomodoro giallo del Monte Somma", ""], ["Fior di latte", ""], ["Basilico", ""], ["Olio EVO", ""]]},
  {"id": "tarantella", "nome": "Tarantella", "cat": "Eccellenze napoletane", "prezzo": 8, "img": CDN+'hf_20261027_103113_a3609447-575a-4e6d-b32e-d1d9e73c31da_min.webp', "frase": "Metà rossa e metà gialla: due pomodori, una sola pizza.", "ing": [["Metà pomodoro \"Oro del Vesuvio\"", ""], ["Metà pomodoro giallo del Monte Somma", ""], ["Fior di latte", ""], ["Basilico", ""]]},
  {"id": "calzonevesuvio", "nome": "Calzone Vesuvio", "cat": "Calzoni", "prezzo": 10, "img": CDN+'hf_20261027_103201_7f0eb25f-532f-4fc8-aeba-0fd300f31874_min.webp', "frase": "Ricotta, cicoli e provola: il calzone che scotta.", "ing": [["Pomodoro \"Oro del Vesuvio\"", ""], ["Ricotta fresca", ""], ["Cicoli \"Barbato Napoli\"", ""], ["Pepe", ""], ["Provola di Agerola", ""]], "forma": "calzone"},
  {"id": "s-marinara", "nome": "Marinara", "cat": "Pizze sottili", "prezzo": 5, "img": CDN+'hf_20261027_103201_b0c09884-1152-46b4-8240-a9bedbd60439_min.webp', "frase": "Sottile e croccante: pomodoro, aglio e origano.", "ing": [["Pomodoro", ""], ["Aglio e origano", ""]]},
  {"id": "s-margherita", "nome": "Margherita", "cat": "Pizze sottili", "prezzo": 6, "img": CDN+'hf_20261027_103201_9af324c2-655c-412c-ab42-2ed5650a14a7_min.webp', "frase": "La sottile più semplice: pomodoro e mozzarella.", "ing": [["Pomodoro", ""], ["Mozzarella", ""]]},
  {"id": "s-diavola", "nome": "Diavola", "cat": "Pizze sottili", "prezzo": 7, "img": CDN+'hf_20261027_103113_fcf435db-9a2f-49a8-96c8-342a960da612_min.webp', "frase": "Sottile e croccante: salamino piccante.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Salamino piccante", ""]]},
  {"id": "s-romana", "nome": "Romana", "cat": "Pizze sottili", "prezzo": 8, "img": CDN+'hf_20261027_103243_653ce0ff-6826-4044-8908-2e469a5e6233_min.webp', "frase": "Sottile e croccante: capperi e acciughe.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Capperi e acciughe", ""]]},
  {"id": "s-giusy", "nome": "Giusy", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103243_7a61c3e5-159f-4089-827a-baccb5aac88e_min.webp', "frase": "Sottile e croccante: pomodorini, bufala, rucola.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Pomodorini", ""], ["Bufala", ""], ["Rucola", ""]]},
  {"id": "s-golosa", "nome": "Golosa", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103243_7ded89b8-ef97-40c2-975c-c9ce9cede334_min.webp', "frase": "Sottile e croccante: provola, pancetta.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Provola", ""], ["Pancetta", ""]]},
  {"id": "s-montanara", "nome": "Montanara", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103243_decc4687-64db-4f05-8a12-e30712f2bd22_min.webp', "frase": "Sottile e croccante: porcini, asiago, salamino.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Porcini", ""], ["Asiago", ""], ["Salamino", ""]]},
  {"id": "s-calzone", "nome": "Calzone", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103323_fce43067-fa23-4c16-8736-32f44f9f76a5_min.webp', "frase": "Sottile e croccante: prosciutto, funghi, carciofi.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Prosciutto", ""], ["Funghi", ""], ["Carciofi", ""]], "forma": "calzone"},
  {"id": "s-tonnocipolla", "nome": "Tonno e Cipolla di Tropea", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103323_fa418f5f-c423-4283-8785-6987100b5353_min.webp', "frase": "Sottile e croccante: tonno, cipolla.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Tonno", ""], ["Cipolla", ""]]},
  {"id": "s-verdure", "nome": "Verdure", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103323_256bb531-a487-47d3-97b3-47a8f4d20999_min.webp', "frase": "Sottile e croccante: melanzane, zucchine, cipolla, asparagi, radicchio, peperoni.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Melanzane", ""], ["Zucchine", ""], ["Cipolla", ""], ["Asparagi", ""], ["Radicchio", ""], ["Peperoni", ""]]},
  {"id": "s-quattroformaggi", "nome": "Quattro Formaggi", "cat": "Pizze sottili", "prezzo": 9, "img": CDN+'hf_20261027_103322_5774ed0c-fd71-4779-a052-24ae2f17d075_min.webp', "frase": "Sottile e croccante: verde, asiago, grana, provola.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Verde", ""], ["Asiago", ""], ["Grana", ""], ["Provola", ""]]},
  {"id": "s-capricciosa", "nome": "Capricciosa", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103410_a6bbbbc4-b906-44f4-96c9-b14dfd69da61_min.webp', "frase": "Sottile e croccante: prosciutto, funghi, carciofi, salamino.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Prosciutto", ""], ["Funghi", ""], ["Carciofi", ""], ["Salamino", ""]]},
  {"id": "s-losangeles", "nome": "Los Angeles", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103410_f829441c-6cae-4435-96df-69bc3f37a579_min.webp', "frase": "Sottile e croccante: porcini, porchetta, grana.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Porcini", ""], ["Porchetta", ""], ["Grana", ""]]},
  {"id": "s-saporita", "nome": "Saporita", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103411_5b9745ab-b724-4ea7-a175-f3e3074a93d7_min.webp', "frase": "Sottile e croccante: melanzane, porchetta, asiago, funghi.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Melanzane", ""], ["Porchetta", ""], ["Asiago", ""], ["Funghi", ""]]},
  {"id": "s-tirolese", "nome": "Tirolese", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103412_71bfd66c-9a9b-48a5-86f1-d5a7f03c6aa2_min.webp', "frase": "Sottile e croccante: speck, panna, funghi porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Speck", ""], ["Panna", ""], ["Funghi porcini", ""]]},
  {"id": "s-vegetariana", "nome": "Vegetariana", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103453_cb977d99-58ef-4372-84e6-6fd22e84da6c_min.webp', "frase": "Sottile e croccante: melanzane, zucchine, funghi porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Melanzane", ""], ["Zucchine", ""], ["Funghi porcini", ""]]},
  {"id": "s-maremonti", "nome": "Mare e Monti", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103454_b187f317-2433-4e2e-866c-bf1647ba7338_min.webp', "frase": "Sottile e croccante: frutti di mare, funghi porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Frutti di mare", ""], ["Funghi porcini", ""]]},
  {"id": "s-lello", "nome": "Lello", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103453_bcb28450-fb35-4fca-9238-45a36e95b89b_min.webp', "frase": "Sottile e croccante: prosciutto, funghi, carciofi, peperoni, wurstel, salamino, asparagi.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Prosciutto", ""], ["Funghi", ""], ["Carciofi", ""], ["Peperoni", ""], ["Wurstel", ""], ["Salamino", ""], ["Asparagi", ""]]},
  {"id": "s-fornaci", "nome": "Fornaci", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103453_909e78a9-2123-4612-b97b-4f633333d458_min.webp', "frase": "Sottile e croccante: radicchio, salsiccia, pancetta.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Radicchio", ""], ["Salsiccia", ""], ["Pancetta", ""]]},
  {"id": "s-dipinta", "nome": "Dipinta", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103535_552ee71a-72c7-4c74-bd33-7518b5b57178_min.webp', "frase": "Sottile e croccante: gamberetti in salsa rosa, rucola.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Gamberetti in salsa rosa", ""], ["Rucola", ""]]},
  {"id": "s-lilly", "nome": "Lilly", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103535_733aec9e-7888-46d2-be1b-f639863232fa_min.webp', "frase": "Sottile e croccante: friarielli, zucchine, melanzane, radicchio.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Friarielli", ""], ["Zucchine", ""], ["Melanzane", ""], ["Radicchio", ""]]},
  {"id": "s-burratacrudo", "nome": "Burrata e Crudo", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103535_cc021f3d-8953-4808-8ada-a296415dd858_min.webp', "frase": "Sottile e croccante: burrata, crudo.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Burrata", ""], ["Crudo", ""]]},
  {"id": "s-burratapomodorini", "nome": "Burrata, Pomodorini e Rucola", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103534_939109ad-88e0-4c42-ad6c-0b6367a7f28e_min.webp', "frase": "Sottile e croccante: burrata, pomodorini, rucola.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Burrata", ""], ["Pomodorini", ""], ["Rucola", ""]]},
  {"id": "s-nostromo", "nome": "Nostromo", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103619_98fe690e-4928-48d5-b39d-e84c371f34ff_min.webp', "frase": "Sottile e croccante: tonno, cipolla, acciughe, olive taggiasche, pomodorini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Tonno", ""], ["Cipolla", ""], ["Acciughe", ""], ["Olive taggiasche", ""], ["Pomodorini", ""]]},
  {"id": "s-sanvalentino", "nome": "San Valentino", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103618_8cfdfd02-acd1-445a-b8f8-564a2acfadc6_min.webp', "frase": "Sottile e croccante: bufala, pomodorini, porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Bufala", ""], ["Pomodorini", ""], ["Porcini", ""]]},
  {"id": "s-fashion", "nome": "Fashion", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103618_01f98d6b-5d3a-44ef-a848-14ebb0e86698_min.webp', "frase": "Sottile e croccante: bufala, prosciutto cotto, porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Bufala", ""], ["Prosciutto cotto", ""], ["Porcini", ""]]},
  {"id": "s-ischia", "nome": "Ischia (bianca)", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103619_c486c5c0-3026-4413-a627-17ad186fc404_min.webp', "frase": "Sottile e croccante: pomodorini, bufala, olive taggiasche, origano.", "ing": [["Mozzarella", ""], ["Pomodorini", ""], ["Bufala", ""], ["Olive taggiasche", ""], ["Origano", ""]]},
  {"id": "s-osarracino", "nome": "O' Sarracino", "cat": "Pizze sottili", "prezzo": 10, "img": CDN+'hf_20261027_103657_427fc1bc-e7d4-47e2-9ec7-5c2aa6a68d7e_min.webp', "frase": "Sottile e croccante: capperi, pomodorini, acciughe, olive taggiasche, origano.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Capperi", ""], ["Pomodorini", ""], ["Acciughe", ""], ["Olive taggiasche", ""], ["Origano", ""]]},
  {"id": "s-sostanziosa", "nome": "Sostanziosa (bianca)", "cat": "Pizze sottili", "prezzo": 12, "img": CDN+'hf_20261027_103657_2f23b290-b668-4a3f-aeec-85391e8af427_min.webp', "frase": "Sottile e croccante: funghi porcini, burrata, crudo.", "ing": [["Mozzarella", ""], ["Funghi porcini", ""], ["Burrata", ""], ["Crudo", ""]]},
  {"id": "s-burrataspeck", "nome": "Burrata, Speck e Porcini", "cat": "Pizze sottili", "prezzo": 12, "img": CDN+'hf_20261027_103656_34a0498d-9c70-410c-a42e-54dd23b78393_min.webp', "frase": "Sottile e croccante: burrata, speck, porcini.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Burrata", ""], ["Speck", ""], ["Porcini", ""]]},
  {"id": "s-fruttidimare", "nome": "Frutti di Mare", "cat": "Pizze sottili", "prezzo": 12, "img": CDN+'hf_20261027_103656_d179c8e7-5cf3-4f16-a9f1-4e27f9abfdee_min.webp', "frase": "Sottile e croccante: frutti di mare, cozze.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Frutti di mare", ""], ["Cozze", ""]]},
  {"id": "s-amalfi", "nome": "Amalfi", "cat": "Pizze sottili", "prezzo": 15, "img": CDN+'hf_20261027_103730_59fe6a2f-3671-43b6-b2e3-9a0d63c247ac_min.webp', "frase": "Sottile e croccante: seppie, polipi, gamberetti, gamberone, scampo, capesante.", "ing": [["Pomodoro", ""], ["Mozzarella", ""], ["Seppie", ""], ["Polipi", ""], ["Gamberetti", ""], ["Gamberone", ""], ["Scampo", ""], ["Capesante", ""]]}
]);
/* ordine della ruota: come il menu (classiche, eccellenze, calzoni, sottili, altro) */
(function(){
  var ord={'Classiche napoletane':0,'Eccellenze napoletane':1,'Calzoni':2,'Pizze sottili':3};
  window.LELLO_PIZZE=window.LELLO_PIZZE.map(function(p,i){ return [p,i]; }).sort(function(a,b){
    var x=(a[0].cat in ord)?ord[a[0].cat]:9, y=(b[0].cat in ord)?ord[b[0].cat]:9; return x-y || a[1]-b[1];
  }).map(function(x){ return x[0]; });
})();

/* ---------- Menu completo, nello stile del menu ufficiale ----------
   Ogni sezione: t1 (parola sottile) + t2 (parola in grassetto), col = colore fascia, ink = colore nomi.
   Voce: [nome, prezzo, ingredienti/formato, id pizza della ruota]. Prezzo: numero oppure testo.
   Voce ['§','Titoletto'] = sottotitolo dentro la sezione. */
window.LELLO_MENU = [
  { id:'classiche', titolo:'Classiche napoletane', t1:'Classiche', t2:'Napoletane', col:'#B48E76', ink:'#8A6750',
    pill:'<b>Su tutte le pizze</b> la bufala la mettiamo a fine cottura. <b>Tutte le pizze Napoli</b> si possono richiedere con il <b>cornicione ripieno</b> (+2,50 €) di: ricotta fresca, provola affumicata, fior di latte 100% latte italiano, friarielli saltati, scarola saltata, cicoli.', voci:[
    ['Margherita',7,'Pomodoro pelato "Oro del Vesuvio", fior di latte 100% latte italiano, basilico fresco, olio EVO "Nino Centonze"','margherita'],
    ['Marinara',6,'Pomodoro pelato "Oro del Vesuvio", aglio, origano di Salina, basilico fresco, olio EVO','marinara'],
    ['La Verace',8,'Pomodoro pelato "Oro del Vesuvio", bufala campana D.O.P., basilico fresco, olio EVO','verace'],
    ['Super Verace',10,'Pomodoro pelato, bufala campana D.O.P., basilico, cornicione ripieno di ricotta fresca, olio EVO','superverace'],
    ["Friariell' e Sasicc'",10,'Fior di latte, friarielli saltati con aglio e peperoncino, salsiccia fresca, basilico, olio EVO','friarielli'],
    ['Provola e Pepe',8,'Pomodoro "Oro del Vesuvio", fior di latte, provola fresca di Agerola, pepe, basilico, olio EVO','provola'],
    ['Margherita a Ruota di Carro',8,'Più grande e tirata, con meno bordo: come da vera tradizione napoletana','ruota']
  ]},
  { id:'eccellenze', titolo:'Eccellenze napoletane', t1:'Eccellenze', t2:'Napoletane', col:'#D07A30', ink:'#B35F17',
    nota:'Le pizze firmate da Lello, con prodotti D.O.P. campani.', voci:[
    ['La Costiera',12,'Pomodoro "Oro del Vesuvio", fior di latte, salsiccia fresca, pomodoro del Piennolo D.O.P., scaglie di provolone del Monaco D.O.P., olio EVO','costiera'],
    ['Eccellenza',12,'Pomodoro "Oro del Vesuvio", fior di latte, melanzane fritte "a funghetto", pomodorino giallo, provolone del Monaco D.O.P., olio EVO'],
    ['La B.P.M.',12,'Fior di latte. Dopo cottura: mortadella, pesto di pistacchi di Bronte, granella di pistacchi, zest di limone BIO, burrata di Andria','bpm'],
    ['Arcobaleno',12,'Fior di latte, peperoni al forno, melanzane fritte "a funghetto", olive taggiasche, burrata'],
    ['Ai Quattro Pomodori',12,'Fior di latte, pomodoro "Oro del Vesuvio", pomodoro del Piennolo D.O.P., pomodoro giallo del Monte Somma D.O.P., pomodoro semi dry, basilico','quattropomodori'],
    ['Nonno Rafele',10,'Pomodoro "Oro del Vesuvio", fior di latte, scarola saltata con aglio e capperi di Salina, olive taggiasche, olio EVO'],
    ['La Rock',13,'Pizza divisa in 4 parti con ingredienti eccellenti scelti al momento da Lello','rock'],
    ['La Pulcinella',12,'Fior di latte, cicoli napoletani Barbato, provola di Agerola, ricotta di bufala, basilico, pepe, olio EVO','pulcinella'],
    ['La Totò',12,'Pomodoro "Oro del Vesuvio", fior di latte, friarielli, salame napoletano Barbato, ricotta di bufala, basilico, pepe','toto'],
    ['Le Bellezze del Sud',12,'Fior di latte, tonno lavorato a mano "Delfino Battista", pomodorino semisecco. Dopo cottura: pesto di pistacchi di Bronte, burrata','bellezze'],
    ['Posillipo',12,'Fior di latte, pomodorino datterino, rucola selvatica, burrata di Andria, olio EVO','posillipo'],
    ['San Gennaro',12,'Fior di latte, salame napoletano dolce, ricotta di bufala, tarallo napoletano sbriciolato, pesto di pistacchi di Bronte','sangennaro'],
    ['Regina Sofia',12,'Fior di latte, pomodorino giallo "Oro del Vesuvio", provola di Agerola, olive taggiasche, scaglie di Grana D.O.P., basilico'],
    ['Lo Scudetto',10,'Fior di latte, cornicione ripieno di ricotta, pomodoro "Oro del Vesuvio" a freddo, pesto di basilico, basilico','scudetto'],
    ['La Gioia',12,'Fior di latte, pomodorino giallo del Vesuvio, pomodoro "Oro del Vesuvio" a freddo, pesto di basilico, burrata di Andria','gioia'],
    ['La Giovi Piz',10,'Base bianca, fior di latte, provola di Agerola, salamino piccante, pepe, basilico','giovipiz'],
    ['Napulè',12,'Pomodoro "Oro del Vesuvio", pomodorini semi dry, tonno a tranci, pesto di pistacchi di Bronte, basilico, origano, aglio','napule'],
    ['Mergellina',12,'Fior di latte, pomodorini datterino, provola di Agerola, bufala campana D.O.P., basilico, olio EVO'],
    ['Maruzzella',10,'Pomodoro "Oro del Vesuvio", fior di latte, olive taggiasche, alici di Cetara "Delfino Battista", basilico'],
    ['La Scugnizzo',13,'Cornicione ripieno di salsiccia, metà pomodoro "Oro del Vesuvio" e metà pomodoro giallo del Monte Somma. Dopo cottura: pesto di basilico, tarallo sbriciolato, pepe','scugnizzo'],
    ['Margherita Gold',8,'Passata di pomodoro giallo del Monte Somma, fior di latte, basilico, olio EVO'],
    ['Super Gold',11,'Cornicione ripieno di ricotta, pomodoro giallo del Monte Somma, bufala campana D.O.P., basilico','supergold'],
    ['Tarantella',8,'Metà pomodoro "Oro del Vesuvio", metà pomodoro giallo del Monte Somma, fior di latte, basilico']
  ]},
  { id:'calzoni', titolo:'Calzoni', t1:'I nostri', t2:'Calzoni', col:'#8C2B2B', ink:'#8C2B2B', nota:'Al forno oppure fritti.', voci:[
    ['Calzone Napoli',10,'Pomodoro "Oro del Vesuvio", fior di latte, prosciutto, salame Napoli di Barbato, ricotta fresca, pepe, provola di Agerola','calzonenapoli'],
    ['Calzone Fritto',10,'Il Calzone Napoli, fritto al momento','calzonefritto'],
    ['Calzone Vesuvio',10,'Pomodoro "Oro del Vesuvio", ricotta fresca, cicoli "Barbato Napoli", pepe, provola di Agerola'],
    ['Calzone Terry',10,'Fior di latte, scarola saltata con aglio e capperi di Salina, olive taggiasche, bufala campana D.O.P.','calzoneterry']
  ]},
  { id:'sottili', titolo:'Pizze sottili', t1:'Pizze', t2:'Sottili', col:'#3BAA47', ink:'#258A33',
    nota:'Tutte le tradizionali si possono fare con impasto Napoli (+1 €). Base senza glutine su richiesta (+3,50 €).', voci:[
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
  { id:'antipasti', titolo:'Antipasti e fritti', t1:'Antipasti', t2:'e Fritti', col:'#4F7FA0', ink:'#36688A',
    nota:'* Alcuni prodotti possono essere surgelati: chiedi al personale.', voci:[
    ['Le Montanare',7,'Pizzette fritte napoletane con pomodoro "Oro del Vesuvio", Grana Padano, basilico'],
    ['Cuoppo Napoletano',8,'Il cartoccio di fritti della tradizione'],
    ['Crocchè di patate',7,''],['Frittatine di pasta (4 pz)',7,''],['Piatto Cazzilli alla Giovanni',7,'','cazzilli'],
    ['Olive ascolane (10 pz)',5,''],['Mozzarelline (10 pz)',5,''],['Alghette di mare (10 pz)',5,''],['Patate fritte',5,''],['Patate dippers',5,''],
    ['Frittura mista di pesce',17,'Calamari, anelli, gamberetti'],['Frittura del Golfo',20,'Calamari, anelli, gamberetti, scampo, gamberone'],
    ['Piatto crudo',14,'Burrata o bufala con focaccia al rosmarino'],['Insalata di mare',14,'Polipo, seppie, gamberetti'],
    ['Cocktail di gamberetti',14,''],['Capesante gratin (4 pz)',14,''],
    ['Scarole',5,''],['Friarielli',5,''],['Insalata mista',4,'']
  ]},
  { id:'insalatone', titolo:'Insalatone', t1:'Le nostre', t2:'Insalatone', col:'#8DBF43', ink:'#5E8F1F', voci:[
    ['Positano',12,'Misticanza, pomodorini, tonno, olive taggiasche, mozzarella di bufala'],
    ['Amalfitana',14,'Misticanza, rucola, gamberetti, pomodorini, polipo, seppie'],
    ['Agerolese',10,'Misticanza, tonno, peperoni al forno, scaglie di grana, olive taggiasche'],
    ['Furore',10,'Misticanza, carciofi, funghi, mais, pomodorini']
  ]},
  { id:'piccoli', titolo:'Per i piccoli', t1:'Per i', t2:'Piccoli', col:'#E07AA6', ink:'#C24F82', voci:[
    ['Cotoletta di pollo e patatine',6,''],['Wurstel di pollo e tacchino e patatine',6,''],['Hamburger di manzo e patatine',6,''],
    ['Pasta panna e prosciutto',6,''],['Pasta al pomodoro',6,''],['Hamburger e patate (per i grandi)',14,'Hamburger di scottona da 200 g e patate dippers']
  ]},
  { id:'birre', titolo:'Birre', t1:'Le nostre', t2:'Birre', col:'#D9BE6A', ink:'#94761C', fg:'#1d1a1b', voci:[
    ['§','Alla spina'],
    ['Bionda','3,50 · 5,00','30 cl · 50 cl'],['Rossa','4,50 · 5,50','33 cl · 50 cl'],['Bianca','4,00 · 5,50','25 cl · 50 cl'],
    ['§','In bottiglia'],
    ['Moretti',4.5,'66 cl'],['Weissbier',5.5,'50 cl'],['Radler','3,50 · 4,50','33 cl · 50 cl'],['Birra analcolica',3.5,'33 cl'],
    ['§','Artigianali "la Villana" · 50 cl'],
    ['Rude',6.5,'American Pale Ale · 5,2%'],['Dumper',6.5,'India Pale Ale · 6,8%'],['Cinque',6.5,'Kölsch Style · 4,8%'],
    ['Gatsby',6.5,'Extra Special Bitter · 5,1%'],['Peonia',6.5,'Blanche · 4,8%'],['Squillo',6.5,'Pils · 5,0%']
  ]},
  { id:'aperitivi', titolo:'Aperitivi', t1:'Gli', t2:'Aperitivi', col:'#C8479A', ink:'#B0307F', voci:[
    ['Spritz Aperol',4,''],['Spritz Campari',4,''],['Spritz Select',3.5,''],['Spritz liscio',3,''],
    ['Americano',6,''],['Gin Tonic',6,''],['Gingerino o Crodino',3,''],['Gingerino o Crodino con Prosecco',3.5,'']
  ]},
  { id:'bibite', titolo:'Bibite e caffè', t1:'Bibite', t2:'e Caffè', col:'#7F7F7F', ink:'#555555', voci:[
    ['Acqua gassata o naturale',3,'75 cl'],['Bibite in lattina',3,'33 cl'],['Coca Cola alla spina','3,00 · 4,00','piccola · media'],
    ['Amari vari',3.5,''],['Grappe varie',4.5,''],['Liquori della Costiera Amalfitana',3,''],['Sorbetto al limone analcolico',3.5,''],
    ['§','Caffetteria'],
    ['Caffè',1.5,''],['Orzo, macchiato o deca',2,''],['Caffè corretto',2.5,'']
  ]},
  { id:'vini', titolo:'Vini e dolci', t1:'Vini', t2:'e Dolci', col:'#5F5F5F', ink:'#444444', voci:[
    ['Vino frizzante alla spina','2,00 · 4,00 · 8,00','¼ l · ½ l · 1 l'],
    ['§','In bottiglia · bottiglia 75 cl · calice'],
    ['Soave Classico DOC','15,00 · 3,50',''],['Passerina','15,00 · 3,50',''],['Falanghina IGT','15,00 · 3,50',''],
    ['Valpolicella Classico Superiore','15,00 · 3,50',''],['Prosecco DOCG Valdobbiadene Brut','15,00 · 3,50',''],['Merlot','20,00 · 4,00',''],
    ['§','Dolci'],
    ['Dolci al carrello','5,00 · 6,00','chiedi al personale le proposte del giorno'],['Servizio torta',10,'']
  ]}
];
window.LELLO_EXTRA = ['Aggiunte da 1 a 3 €','Impasto Napoli +1 €','Cornicione ripieno +2,50 €','Base senza glutine +3,50 €','Pizza baby -0,50 €'];

/* collega automaticamente le voci del menu alle pizze della ruota con lo stesso nome */
(function(){
  var map={classiche:'Classiche napoletane',eccellenze:'Eccellenze napoletane',calzoni:'Calzoni',sottili:'Pizze sottili'};
  window.LELLO_MENU.forEach(function(g){
    var c=map[g.id]; if(!c) return;
    g.voci.forEach(function(v){
      if(v[0]==='§' || v[3]) return;
      window.LELLO_PIZZE.forEach(function(p){ if(!v[3] && p.cat===c && p.nome===v[0]) v[3]=p.id; });
    });
  });
})();

/* miniature locali per il menu e il PDF (assets/img/menu/<id>.webp) */
window.LELLO_PIZZE.forEach(function(p){ p.thumb='assets/img/menu/'+p.id+'.webp'; });
