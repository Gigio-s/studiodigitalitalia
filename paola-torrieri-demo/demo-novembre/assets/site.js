/* Paola Torrieri - demo novembre 2026 (Studio Digital Italia)
   Funzioni dimostrative: in produzione Calendly, Stripe e newsletter sono reali. */
(function () {
  var V_NAMES = { 1: ["Classica", "Marcellus + Open Sans"], 2: ["Cipria", "Gilda + Lato"], 3: ["Editoriale", "Prata + Hind"], 4: ["Naturale", "Alegreya"] };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function setV(v) {
    document.documentElement.setAttribute("data-v", v);
    store("pt-v", v);
    document.querySelectorAll(".switcher [data-set]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.set === String(v) ? "true" : "false"); });
    // i link interni portano con se la versione scelta
    document.querySelectorAll("a[href$='.html'], a[href*='.html#']").forEach(function (a) {
      var h = a.getAttribute("href"); if (/^https?:/.test(h)) return;
      var parts = h.split("#"); a.setAttribute("href", parts[0].split("?")[0] + "?v=" + v + (parts[1] ? "#" + parts[1] : ""));
    });
  }


  var HELP = '<header><h2>Cosa abbiamo fatto nel tuo sito</h2><p>Le tue richieste di ottobre, una per una</p><button class="hx" aria-label="Chiudi">×</button></header><div class="hb">'
  + '<p style="margin-top:16px">Paola, qui trovi come abbiamo trasformato il tuo documento <em>"Nuovo sito: cosa desidero"</em> in questa demo. Puoi tenere aperto il pannello mentre navighi: i link portano alle pagine giuste.</p>'
  + '<h3><span>1.</span> Quattro stili da confrontare</h3><ul>'
  + '<li>Stessi contenuti, 4 stili diversi per caratteri, colori e impaginazione. Li cambi dal riquadro <strong>"Versione di stile"</strong> in basso a sinistra.</li>'
  + '<li>Classica, Cipria, Editoriale, Naturale: tutti partono dai colori del tuo Instagram (crema, rosa cipria, verde salvia, mocha).</li>'
  + '<li>Dicci quale preferisci. Si possono anche combinare: per esempio i colori di una con i caratteri di un\'altra.</li></ul>'
  + '<h3><span>2.</span> Un posizionamento forte</h3><ul>'
  + '<li><span class="ok">✓</span> Il tuo nome come brand: <strong>Paola Torrieri</strong> in alto, nel titolo delle pagine e su Google, al posto di "Mamma Modello Base".</li>'
  + '<li><span class="ok">✓</span> La qualifica esatta: <em>Dott.ssa in Psicologia Magistrale · Counselor Dinamico Relazionale · Spirituale</em>. Nel sito non compaiono mai "psicologa", "supporto psicologico" o "counseling psicologico".</li>'
  + '<li><span class="ok">✓</span> MammaModelloBase non sparisce: in <a href="chi-sono.html">Chi sono</a> c\'è la tua storia con il logo, e il racconto di come il lavoro di oggi nasce da lì.</li>'
  + '<li><span class="ok">✓</span> <a href="chi-sono.html#formazione">Formazione e titoli</a> aggiornabile nel tempo, già con Operatrice Essenziale (novembre 2026) e Costellatrice Familiare (giugno 2027).</li>'
  + '<li><span class="ok">✓</span> Tutte le pagine che hai chiesto: <a href="counseling-vicenza.html">Counseling a Vicenza e online</a>, <a href="psicoaromaterapia.html">Psicoaromaterapia e strumenti evolutivi</a>, <a href="bioanalogia-essenziali.html">Bioanalogia ed Essenziali</a>, <a href="tutor-apprendimento.html">Tutor dell\'apprendimento</a>, <a href="adolescenza-genitorialita.html">Adolescenza e genitorialità</a>, <a href="corsi.html">Corsi</a>, <a href="blog.html">Blog</a>, <a href="contatti.html">Contatti</a>, <a href="privacy-cookie.html">Privacy e cookie</a>.</li>'
  + '<li><span class="ok">✓</span> Aggiunte su nostro consiglio: <a href="faq.html">FAQ</a>, <a href="condizioni-vendita.html">Condizioni di vendita</a>, <a href="newsletter.html">pagina Newsletter</a>, <a href="corso.html">modello di scheda corso</a>.</li>'
  + '<li><span class="ok">✓</span> Per Google: la pagina "Counseling a Vicenza e online" è pensata per chi cerca un counselor a Vicenza.</li>'
  + '<li><span class="ok">✓</span> Link all\'<a href="https://accademiaessenziale.it/tutor-bioanalogia" target="_blank" rel="noopener">Accademia Essenziale</a> in Home, Chi sono e Bioanalogia.</li>'
  + '<li><span class="ok">✓</span> Pulizia: nessun riferimento al Centro Ines, niente citazioni a fondo pagina né rimandi a sitomonopagina.it, social aggiornati.</li>'
  + '<li><span class="ok">✓</span> In fondo a ogni pagina la frase: <em>"Il counseling è un percorso di crescita personale e non sostituisce la psicoterapia né il parere medico."</em> Nei testi nessuna affermazione sanitaria, oli compresi.</li>'
  + '<li>Dominio: il sito andrà su <strong>paolatorrieri.it</strong> e mammamodellobase.it rimanderà lì. Lo impostiamo alla pubblicazione.</li></ul>'
  + '<h3><span>3.</span> Vendere corsi</h3><ul>'
  + '<li><span class="ok">✓</span> Pagina <a href="corsi.html">Corsi</a> con i filtri per le tue 3 tipologie: in presenza, online solo registrati, online in diretta e registrati.</li>'
  + '<li><span class="ok">✓</span> Ogni corso ha la stessa scheda, sul modello che ci hai indicato: titolo, a chi è rivolto, programma, durata, formato, prezzo, attestato e pulsante di acquisto. Guarda la <a href="corso.html">scheda di esempio</a>.</li>'
  + '<li><span class="ok">✓</span> Il pulsante "Iscriviti" porta al pagamento con i tuoi link Stripe. Niente più WhatsApp.</li>'
  + '<li><span class="ok">✓</span> Per i corsi registrati, al momento dell\'acquisto c\'è la casella per l\'accesso immediato con rinuncia al recesso (art. 59 Codice del Consumo). Per gli altri vale il recesso di 14 giorni.</li>'
  + '<li><span class="ok">✓</span> Area riservata per i contenuti acquistati e libro in PDF in regalo.</li>'
  + '<li><span class="ok">✓</span> Nuovi corsi: ogni mese ci mandi la scheda compilata con il link Stripe e la pubblichiamo noi, con la stessa grafica.</li>'
  + '<li><span class="ok">✓</span> <a href="blog.html">Blog</a> con un articolo al mese, per esempio <a href="articolo-olio-del-mese.html">l\'olio del mese</a>, che rimanda ai corsi e al tuo negozio doTERRA.</li></ul>'
  + '<h3><span>4.</span> Far crescere la newsletter</h3><ul>'
  + '<li><span class="ok">✓</span> Modulo di iscrizione in Home, in fondo a ogni pagina, negli articoli del blog e nella pagina Corsi.</li>'
  + '<li><span class="ok">✓</span> Consenso privacy su ogni modulo.</li>'
  + '<li><span class="ok">✓</span> <a href="newsletter.html">Pagina Newsletter</a> con il link da mettere nella bio di Instagram.</li>'
  + '<li><span class="ok">✓</span> Spazio per il regalo di benvenuto: meditazione guidata o mini-guida su oli ed emozioni.</li>'
  + '<li>Lo strumento (MailerLite o Brevo) si collega al sito. Le mail le invii tu.</li></ul>'
  + '<h3><span>5.</span> Fissare appuntamenti online</h3><ul>'
  + '<li><span class="ok">✓</span> Pulsante <strong>"Prenota il tuo incontro conoscitivo gratuito"</strong> in Home, in ogni pagina dei percorsi, in Contatti e in alto nel menu.</li>'
  + '<li><span class="ok">✓</span> Si apre il tuo calendario Calendly: 15 minuti su Zoom, già collegato a Stripe e Zoom. <a href="#" data-book>Provalo</a>.</li>'
  + '<li><span class="ok">✓</span> Nella Home ci sono anche i 3 passi del primo incontro, per chi ti scopre per la prima volta.</li></ul>'
  + '<h3><span>6.</span> In più</h3><ul>'
  + '<li>Sito pensato prima di tutto per il telefono: menu a scomparsa, bottoni grandi, telefono sempre raggiungibile.</li>'
  + '<li>Leggibile e accessibile: testi con il giusto contrasto, navigabile anche da tastiera, animazioni ridotte per chi le disattiva.</li>'
  + '<li>Banner dei cookie: Calendly, YouTube e Maps si attivano solo con il consenso.</li>'
  + '<li>Link doTERRA dedicati nella pagina Psicoaromaterapia e negli articoli sull\'olio del mese.</li></ul>'
  + '<div class="todo"><strong>Cosa ci serve da te</strong><ul>'
  + '<li>La versione di stile che preferisci</li><li>I testi su Bioanalogia ed Essenziali e il racconto completo della tua storia</li>'
  + '<li>L\'indirizzo dello studio</li><li>Foto recenti (il tuo volto è il miglior biglietto da visita)</li>'
  + '<li>I corsi veri con i link Stripe</li><li>Strumento newsletter e regalo di benvenuto</li><li>Gli accessi ai domini</li></ul></div>'
  + '<p class="fine">Questa è una demo: prenotazioni, pagamenti e iscrizioni sono simulati, i corsi e gli articoli sono di esempio. Studio Digital Italia</p></div>';

  document.addEventListener("DOMContentLoaded", function () {
    /* Selettore versioni */
    var sw = document.createElement("div");
    sw.className = "switcher"; sw.setAttribute("aria-label", "Scegli la versione di stile");
    var html = '<button class="tog" aria-label="Riduci" title="Riduci">–</button><b>Versione di stile</b><div class="opts">';
    for (var i = 1; i <= 4; i++) html += '<button data-set="' + i + '" aria-pressed="false">' + i + ". " + V_NAMES[i][0] + "<small>" + V_NAMES[i][1] + "</small></button>";
    sw.innerHTML = html + '</div><p class="note">Stessi contenuti, 4 stili. La scelta resta attiva su tutte le pagine.</p>';
    document.body.appendChild(sw);
    if (window.innerWidth < 700) { sw.classList.add("min"); sw.querySelector(".tog").textContent = "+"; }
    sw.querySelectorAll("[data-set]").forEach(function (b) { b.addEventListener("click", function () { setV(b.dataset.set); }); });
    sw.querySelector(".tog").addEventListener("click", function () { sw.classList.toggle("min"); this.textContent = sw.classList.contains("min") ? "+" : "–"; });
    setV(document.documentElement.getAttribute("data-v") || "1");

    /* Pulsante ? e pannello laterale */
    var hb = document.createElement("button"); hb.className = "help-btn"; hb.setAttribute("aria-label", "Cosa abbiamo fatto nel sito"); hb.setAttribute("aria-controls", "help"); hb.setAttribute("aria-expanded", "false");
    hb.innerHTML = '?<span class="lbl">Cosa abbiamo fatto</span>';
    var ov = document.createElement("div"); ov.className = "help-ov";
    var hp = document.createElement("aside"); hp.className = "help"; hp.id = "help"; hp.setAttribute("aria-label", "Cosa abbiamo fatto nel sito"); hp.innerHTML = HELP;
    document.body.appendChild(hb); document.body.appendChild(ov); document.body.appendChild(hp);
    function helpOpen(o) { hp.classList.toggle("show", o); ov.classList.toggle("show", o); document.body.classList.toggle("noscroll", o); hb.setAttribute("aria-expanded", o); if (o) hp.querySelector(".hx").focus(); }
    hb.addEventListener("click", function () { helpOpen(true); });
    document.querySelectorAll(".help-h").forEach(function (x) { x.addEventListener("click", function () { helpOpen(true); }); });
    ov.addEventListener("click", function () { helpOpen(false); });
    hp.querySelector(".hx").addEventListener("click", function () { helpOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && hp.classList.contains("show")) helpOpen(false); });
    if (/[?&]info=1/.test(location.search)) helpOpen(true);
    setV(document.documentElement.getAttribute("data-v") || "1");

    /* Menu mobile */
    var burger = document.querySelector(".burger"), menu = document.querySelector(".menu");
    if (burger) burger.addEventListener("click", function () { var o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });

    /* Accordion FAQ */
    document.querySelectorAll(".acc button").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function () {
        var it = b.parentNode, a = it.querySelector(".ans"), o = it.classList.toggle("open");
        b.setAttribute("aria-expanded", o); a.style.maxHeight = o ? a.scrollHeight + "px" : null;
      });
    });

    /* Comparsa leggera */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .1 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });

    /* Modali */
    function open(id) { var m = document.getElementById(id); if (m) { m.classList.add("show"); var f = m.querySelector("button, input"); if (f) f.focus(); } }
    function close(m) { m.classList.remove("show"); }
    document.querySelectorAll(".modal").forEach(function (m) {
      m.addEventListener("click", function (e) { if (e.target === m || e.target.classList.contains("x") || e.target.hasAttribute("data-close")) close(m); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".modal.show").forEach(close); });
    function toast(t) { var el = document.querySelector(".toast"); el.textContent = t; el.classList.add("show"); setTimeout(function () { el.classList.remove("show"); }, 4200); }

    /* Calendly (simulato) */
    document.querySelectorAll("[data-book]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); if (hp.classList.contains("show")) helpOpen(false); open("m-book"); }); });
    var cal = document.querySelector("#m-book .cal"), slots = document.querySelector("#m-book .slots");
    if (cal) {
      var d = new Date(), days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"], n = 0;
      while (n < 10) { d.setDate(d.getDate() + 1); if (d.getDay() === 0) continue;
        var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-pressed", "false");
        b.textContent = days[d.getDay()] + " " + d.getDate() + "/" + (d.getMonth() + 1); cal.appendChild(b); n++; }
      cal.addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") return;
        cal.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); e.target.setAttribute("aria-pressed", "true");
        slots.innerHTML = ""; ["10:00", "11:30", "15:00", "17:30"].forEach(function (t) { var s = document.createElement("button"); s.type = "button"; s.textContent = t; s.setAttribute("aria-pressed", "false"); slots.appendChild(s); });
      });
      slots.addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") return;
        close(document.getElementById("m-book"));
        toast("Incontro conoscitivo prenotato (demo). In produzione: conferma Calendly e link Zoom via email.");
      });
    }

    /* Acquisto corso (simulato Stripe) */
    document.querySelectorAll("[data-buy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var m = document.getElementById("m-buy");
        m.querySelector(".what").textContent = b.dataset.buy;
        var rec = m.querySelector(".rec"); rec.style.display = b.dataset.type === "reg" ? "flex" : "none";
        open("m-buy");
      });
    });
    var go = document.querySelector("#m-buy .go");
    if (go) go.addEventListener("click", function () {
      var m = document.getElementById("m-buy"), rec = m.querySelector(".rec");
      if (rec.style.display !== "none" && !rec.querySelector("input").checked) { toast("Per i corsi registrati serve accettare l'accesso immediato."); return; }
      close(m); toast("Demo: qui si apre il pagamento Stripe. Dopo il pagamento arriva l'email con l'accesso al corso e il libro in PDF.");
    });

    /* Filtri corsi */
    document.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        document.querySelectorAll(".course").forEach(function (c) { c.classList.toggle("hide", b.dataset.f !== "all" && c.dataset.type !== b.dataset.f); });
      });
    });

    /* Form dimostrativi */
    document.querySelectorAll("form[data-demo]").forEach(function (f) {
      f.addEventListener("submit", function (e) { e.preventDefault(); toast(f.dataset.demo || "Grazie! (invio dimostrativo)"); f.reset(); });
    });

    /* Cookie banner */
    var ck = document.querySelector(".cookie");
    if (ck && !store("pt-ck")) ck.classList.add("show");
    document.querySelectorAll("[data-ck]").forEach(function (b) { b.addEventListener("click", function () { store("pt-ck", b.dataset.ck); ck.classList.remove("show"); }); });

    /* Torna su */
    var tt = document.querySelector(".totop");
    window.addEventListener("scroll", function () { tt.classList.toggle("show", window.scrollY > 900 && !(ck && ck.classList.contains("show"))); }, { passive: true });
    tt.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  });
})();
