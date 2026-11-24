/* Pizzeria 230 grammi - anteprima app interattiva (Studio Digital Italia). Tutto simulato. */
(function(){
  "use strict";
  var root=document.documentElement;
  var IMG="assets/img/pizze/";
  var MENU=[
    {c:"Classiche",n:"Margherita",d:"Pomodoro, fior di latte, basilico",p:6.5,i:IMG+"margherita.webp",a:"Glutine, latte"},
    {c:"Classiche",n:"Diavola",d:"Pomodoro, fior di latte, salame piccante",p:7.5,i:IMG+"diavola.webp",a:"Glutine, latte"},
    {c:"Classiche",n:"Prosciutto e funghi",d:"Pomodoro, fior di latte, cotto, funghi",p:8,i:IMG+"prosciutto-funghi.webp",a:"Glutine, latte"},
    {c:"Classiche",n:"Capricciosa",d:"Cotto, funghi, carciofi, olive",p:8.5,i:IMG+"capricciosa.webp",a:"Glutine, latte"},
    {c:"Speciali",n:"Mortadella e pistacchio",d:"Fior di latte, mortadella, burrata, pistacchio",p:10,i:IMG+"mortadella.webp",a:"Glutine, latte, frutta a guscio"},
    {c:"Speciali",n:"Saltimbocca Verde Bianco Rosso",d:"Pesto, crudo, pomodorini, rucola, bufala",p:9,i:"assets/img/foto/saltimbocca.webp",a:"Glutine, latte, frutta a guscio"},
    {c:"Fritti",n:"Crocchè",d:"Crocchette di patate",p:3,i:"assets/img/foto/fritti.webp",a:"Glutine, latte, uova"},
    {c:"Fritti",n:"Patatine",d:"Porzione",p:3,i:"assets/img/foto/fritti.webp",a:"Nessuno"},
    {c:"Bibite",n:"Acqua naturale 0,5 l",d:"",p:1.5,i:"",a:"Nessuno"},
    {c:"Bibite",n:"Bibita in lattina",d:"",p:2.5,i:"",a:"Nessuno"}
  ];
  var CATS=["Classiche","Speciali","Fritti","Bibite"];
  var SLOTS=[["19:00",0],["19:15",0],["19:30",1],["19:45",1],["20:00",1],["20:15",1],["20:30",0],["20:45",1],["21:00",1]];
  var st={cart:[],slot:"20:00",pay:"ritiro",mode:"ritiro",cat:"Classiche",stamps:7,num:128,stato:0,sel:null,dough:"Classico"};
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var eur=function(v){return "€ "+v.toFixed(2).replace(".",",")};

  /* ---------- Tema ---------- */
  function setT(t){root.setAttribute("data-t",t);try{localStorage.setItem("g230b-v",t)}catch(e){}$$(".tsel button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.t===t))});try{if(window.parent!==window)window.parent.postMessage({g230v:t},"*")}catch(e){}}
  $$(".tsel button").forEach(function(b){b.addEventListener("click",function(){setT(b.dataset.t)})});
  setT(root.getAttribute("data-t")||"1");
  var cl=$("#closeApp");
  if(cl)cl.addEventListener("click",function(){if(window.parent!==window)window.parent.postMessage({g230close:1},"*");else location.href="index.html"});

  /* ---------- Navigazione app ---------- */
  var scroller=$("#apScroll");
  function go(s){
    $$(".scr").forEach(function(x){x.classList.toggle("on",x.dataset.s===s)});
    $$(".tabs button").forEach(function(b){if(b.dataset.go===s)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
    if(s==="carrello")renderCart();
    scroller.scrollTop=0;
  }
  document.addEventListener("click",function(e){var b=e.target.closest("[data-go]");if(b&&b.closest(".ap")){go(b.dataset.go)}});
  var tt;function say(m){var t=$("#apToast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("show")},2600)}

  /* ---------- Menu ---------- */
  function renderCats(){$("#cats").innerHTML=CATS.map(function(c){return '<button type="button" aria-pressed="'+(c===st.cat)+'" data-cat="'+c+'">'+c+'</button>'}).join("")}
  function renderList(){
    $("#list").innerHTML=MENU.map(function(m,k){if(m.c!==st.cat)return "";return '<div class="it" data-k="'+k+'" role="button" tabindex="0">'+(m.i?'<img src="'+m.i+'" alt="">':'<img alt="" src="assets/img/logo-230.png" style="padding:8px;background:#fff">')+'<div class="tx"><b>'+m.n+'</b><small>'+m.d+'</small></div><span class="pr">'+eur(m.p)+'</span><span class="pl">+</span></div>'}).join("");
  }
  $("#cats").addEventListener("click",function(e){var b=e.target.closest("[data-cat]");if(b){st.cat=b.dataset.cat;renderCats();renderList()}});
  function openSheet(k){
    var m=MENU[k];st.sel=k;st.dough="Classico";
    $("#shImg").src=m.i||"assets/img/logo-230.png";$("#shName").textContent=m.n;$("#shDesc").textContent=m.d;$("#shAll").textContent="Allergeni: "+m.a;
    var isPizza=m.c==="Classiche"||m.c==="Speciali";
    $("#shDough").style.display=isPizza?"":"none";$("#shDough").previousElementSibling.style.display=isPizza?"":"none";
    $$("#shDough button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.d==="Classico"))});
    $("#sheet").classList.add("open");$("#sheet").setAttribute("aria-hidden","false");
  }
  function closeSheet(){$("#sheet").classList.remove("open");$("#sheet").setAttribute("aria-hidden","true")}
  $("#list").addEventListener("click",function(e){var r=e.target.closest(".it");if(r)openSheet(+r.dataset.k)});
  $("#list").addEventListener("keydown",function(e){var r=e.target.closest(".it");if(r&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openSheet(+r.dataset.k)}});
  $("#shDough").addEventListener("click",function(e){var b=e.target.closest("[data-d]");if(!b)return;st.dough=b.dataset.d;$$("#shDough button").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))})});
  $("#shX").addEventListener("click",closeSheet);
  $("#sheet").addEventListener("click",function(e){if(e.target.id==="sheet")closeSheet()});
  $("#shAdd").addEventListener("click",function(){
    var m=MENU[st.sel],isPizza=m.c==="Classiche"||m.c==="Speciali",d=isPizza?st.dough:"",p=m.p+(d==="Napoletano"?1.5:0);
    var ex=st.cart.filter(function(x){return x.n===m.n&&x.d===d})[0];
    if(ex)ex.q++;else st.cart.push({n:m.n,d:d,p:p,q:1});
    closeSheet();badge();say(m.n+(d?" ("+d.toLowerCase()+")":"")+" aggiunta all'ordine");
  });
  function count(){return st.cart.reduce(function(a,x){return a+x.q},0)}
  function badge(){var b=$("#badge"),n=count();b.hidden=!n;b.textContent=n}

  /* ---------- Carrello ---------- */
  function renderCart(){
    var cl=$("#cartList");
    if(!st.cart.length){cl.innerHTML='<p class="empty">Il carrello è vuoto. Vai al menu e scegli le tue pizze.</p>'}
    else cl.innerHTML=st.cart.map(function(x,k){return '<div class="cr"><div><b>'+x.n+'</b>'+(x.d?'<small>Impasto '+x.d.toLowerCase()+'</small>':'')+'</div><div class="q"><button type="button" data-m="'+k+'" aria-label="Togli uno">-</button>'+x.q+'<button type="button" data-p="'+k+'" aria-label="Aggiungi uno">+</button><b style="min-width:58px;text-align:right">'+eur(x.p*x.q)+'</b></div></div>'}).join("");
    $("#slots").innerHTML=SLOTS.map(function(s){return '<button type="button" '+(s[1]?'':'disabled ')+'aria-pressed="'+(s[0]===st.slot)+'" data-slot="'+s[0]+'">'+s[0]+'</button>'}).join("");
    var fee=st.mode==="consegna"&&st.cart.length?2.5:0;
    $("#tot").textContent=eur(st.cart.reduce(function(a,x){return a+x.p*x.q},0)+fee);
  }
  $("#cartList").addEventListener("click",function(e){var m=e.target.closest("[data-m]"),p=e.target.closest("[data-p]");if(m){var x=st.cart[+m.dataset.m];x.q--;if(!x.q)st.cart.splice(+m.dataset.m,1)}if(p)st.cart[+p.dataset.p].q++;badge();renderCart()});
  $("#slots").addEventListener("click",function(e){var b=e.target.closest("[data-slot]");if(b&&!b.disabled){st.slot=b.dataset.slot;renderCart()}});
  $$(".scr[data-s='carrello'] [data-pay]").forEach(function(b){b.addEventListener("click",function(){st.pay=b.dataset.pay;$$(".scr[data-s='carrello'] [data-pay]").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});if(st.pay==="online")say("In produzione: pagamento sicuro con carta, Apple Pay o Google Pay")})});

  $("#mode").addEventListener("click",function(e){var b=e.target.closest("[data-mode]");if(!b)return;st.mode=b.dataset.mode;var c=st.mode==="consegna";
    $$("#mode button").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    $("#addr").hidden=!c;$("#slotT").textContent=c?"Orario di consegna":"Orario di ritiro";$("#payLater").textContent=c?"Alla consegna":"Al ritiro";renderCart()});

  /* ---------- Conferma e stato ordine ---------- */
  var TXT={ritiro:{s:["Ricevuto dalla pizzeria","In preparazione","Pronto da ritirare","Ritirato"],n:["La pizzeria ha ricevuto il tuo ordine. Ti avvisiamo quando è pronto.","Le tue pizze sono in forno.","La tua pizza è pronta! Ti aspettiamo al banco.","Buon appetito! Timbro aggiunto alla Carta 230."],t:"🔔 La tua pizza è pronta!",k:["Pronto","Ritirato"]},
    consegna:{s:["Ricevuto dalla pizzeria","In preparazione","In consegna","Consegnato"],n:["La pizzeria ha ricevuto il tuo ordine. Ti avvisiamo quando parte.","Le tue pizze sono in forno.","Il fattorino è partito: arriva in pochi minuti.","Buon appetito! Timbro aggiunto alla Carta 230."],t:"🛵 Il fattorino è partito!",k:["In consegna","Consegnato"]}};
  var om="ritiro";
  $("#confirm").addEventListener("click",function(){
    if(!st.cart.length){say("Aggiungi almeno una pizza dal menu");go("menu");return}
    if($("#pausa").checked){say("La pizzeria ha messo in pausa gli ordini: riprova tra poco o chiama");return}
    st.num++;st.stato=0;
    $$("[data-num]").forEach(function(x){x.textContent=st.num});
    $("#oraRitiro").textContent=st.slot;om=st.mode;var c=om==="consegna";
    $("#modeLbl").textContent=c?"Consegna alle":"Ritiro alle";$("#modeAddr").textContent=c?"Via Roma 10, Vicenza":"Via Sebastiano Caboto 26";
    $$("#track li").forEach(function(li,k){li.textContent=TXT[om].s[k]});
    addKitchen();
    st.cart=[];badge();setStato(0);$("#liveCard").hidden=false;go("ordine");
    say("Ordine inviato! Guarda la vista cucina");
  });
  function setStato(n){
    st.stato=n;$$("#track li").forEach(function(li,k){li.classList.toggle("on",k<=n)});
    $("#trackNote").textContent=TXT[om].n[n];$$("[data-stato]").forEach(function(x){x.textContent=TXT[om].s[n]});
    if(n===2)say(TXT[om].t);
    if(n===3){st.stamps=Math.min(10,st.stamps+1);renderStamps();$("#liveCard").hidden=true}
  }

  /* ---------- Cucina ---------- */
  function addKitchen(){
    var items=st.cart.map(function(x){return x.q+" × "+x.n+(x.d?" ("+x.d.toLowerCase()+")":"")}).join("<br>");
    var d=document.createElement("div");d.className="ko new";d.dataset.num=st.num;d.dataset.mode=st.mode;
    d.innerHTML='<b>#'+st.num+' · '+st.slot+'</b><small>'+items+'<br>'+(st.mode==="consegna"?"🛵 Consegna: Via Roma 10":"Ritiro al banco")+'<br>Pagamento: '+(st.pay==="online"?"online, già pagato":(st.mode==="consegna"?"alla consegna":"al ritiro"))+'</small><button type="button" data-k="acc">Accetta</button>';
    $("#kNew").prepend(d);
    var cap=$("#cap");cap.textContent=Math.min(12,+cap.textContent+count());
  }
  $("#tablet").addEventListener("click",function(e){
    var b=e.target.closest("button[data-k]");if(!b)return;var card=b.closest(".ko");
    if(b.dataset.k==="acc"){card.classList.remove("new");$("#kPrep").prepend(card);b.dataset.k="ready";b.textContent=TXT[card.dataset.mode].k[0];setStato(1)}
    else if(b.dataset.k==="ready"){$("#kReady").prepend(card);b.dataset.k="done";b.textContent=TXT[card.dataset.mode].k[1];setStato(2)}
    else if(b.dataset.k==="done"){card.remove();setStato(3)}
  });

  /* ---------- Carta ---------- */
  function renderStamps(){
    $("#stampGrid").innerHTML=Array.apply(null,Array(10)).map(function(_,k){return '<span class="'+(k<st.stamps?"on":"")+'">'+(k===9?"🍕":(k<st.stamps?"✓":k+1))+'</span>'}).join("");
    $$("[data-stamps]").forEach(function(x){x.textContent=st.stamps});$$("[data-left]").forEach(function(x){x.textContent=10-st.stamps});
  }

  /* ---------- Vista cliente / cucina ---------- */
  $$(".seg button").forEach(function(b){b.addEventListener("click",function(){
    $$(".seg button").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    var k=b.dataset.view==="cucina";$("#tablet").hidden=!k;$(".hgrid").classList.toggle("kview",k);
    if(window.matchMedia("(max-width:980px)").matches){$("#phone").style.display=k?"none":""}
  })});

  /* ---------- Calcolatore ---------- */
  function calc(){
    var o=+$("#oIn").value,s=+$("#sIn").value,c=+$("#cIn").value/100;
    var per=s*c-(s*0.015+0.25)-0.25;
    $("#oOut").textContent=o;$("#sOut").textContent=s+" €";$("#cOut").textContent=Math.round(c*100)+"%";
    var f=function(v){return "€ "+Math.round(v).toLocaleString("it-IT")};
    $("#rOrd").textContent=eur(per);$("#rMese").textContent=f(per*o);$("#rAnno").textContent=f(per*o*12);
  }
  ["#oIn","#sIn","#cIn"].forEach(function(id){$(id).addEventListener("input",calc)});

  renderCats();renderList();renderStamps();badge();calc();
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeSheet()});
})();
/* protezione anti copia di base (anteprima privata) */
document.addEventListener("contextmenu",function(e){e.preventDefault()});
document.addEventListener("keydown",function(e){var k=(e.key||"").toLowerCase();if(e.key==="F12"||(e.ctrlKey&&(k==="u"||k==="s"))||(e.ctrlKey&&e.shiftKey&&(k==="i"||k==="j"||k==="c")))e.preventDefault()});
