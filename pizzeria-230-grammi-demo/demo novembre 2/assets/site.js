/* Pizzeria 230 grammi - demo novembre 2 (Studio Digital Italia) */
(function(){
  "use strict";
  var KEY="g230b-v",root=document.documentElement;

  /* ---------- Toast funzioni simulate ---------- */
  var toast=document.getElementById("toast"),tt;
  function say(m){if(!toast)return;toast.textContent=m;toast.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("show")},4200)}
  document.addEventListener("click",function(e){var el=e.target.closest("a[data-demo],button[data-demo]");if(el){e.preventDefault();say(el.getAttribute("data-demo"))}});
  document.addEventListener("submit",function(e){var f=e.target;if(f.hasAttribute("data-demo")){e.preventDefault();say(f.getAttribute("data-demo"))}});

  /* ---------- V1 menu a schermo intero ---------- */
  var ov=document.getElementById("v1menu");
  document.querySelectorAll("[data-v1menu]").forEach(function(b){b.addEventListener("click",function(){ov.classList.toggle("open")})});
  document.querySelectorAll("[data-v1close]").forEach(function(a){a.addEventListener("click",function(){ov.classList.remove("open")})});

  /* ---------- V3 carosello ---------- */
  var car=document.querySelector(".s3 .car");
  if(car){
    var imgs=car.querySelectorAll(".stage img"),dots=car.querySelectorAll(".dots i"),nome=car.querySelector(".nome"),i=0,timer;
    function go(n){i=(n+imgs.length)%imgs.length;imgs.forEach(function(x,k){x.classList.toggle("on",k===i)});dots.forEach(function(x,k){x.classList.toggle("on",k===i)});nome.textContent=imgs[i].dataset.n}
    car.querySelectorAll("[data-car]").forEach(function(b){b.addEventListener("click",function(){go(i+parseInt(b.dataset.car,10));clearInterval(timer)})});
    if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches)timer=setInterval(function(){if(root.getAttribute("data-v")==="3")go(i+1)},3500);
  }

  /* ---------- Selettore versione ---------- */
  function setV(v){
    root.setAttribute("data-v",v);try{localStorage.setItem(KEY,v)}catch(e){}
    document.querySelectorAll(".vsel [data-v]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.v===v))});
    if(ov)ov.classList.remove("open");
    window.scrollTo(0,0);
  }
  document.querySelectorAll(".vsel [data-v]").forEach(function(b){b.addEventListener("click",function(){setV(b.dataset.v)})});
  var cur=root.getAttribute("data-v")||"1";
  document.querySelectorAll(".vsel [data-v]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.v===cur))});
  var vsel=document.getElementById("vsel"),vmin=document.getElementById("vselMin");
  if(vsel&&window.matchMedia("(max-width:900px)").matches){vsel.classList.add("min");if(vmin)vmin.textContent="+"}
  if(vmin)vmin.addEventListener("click",function(){vsel.classList.toggle("min");vmin.textContent=vsel.classList.contains("min")?"+":"-"});

  /* ---------- Pannello "Cosa abbiamo fatto" ---------- */
  var info=document.getElementById("info");
  function openInfo(){info.classList.add("open");info.querySelector(".close").focus()}
  function closeInfo(){info.classList.remove("open")}
  document.querySelectorAll("[data-open-info]").forEach(function(b){b.addEventListener("click",openInfo)});
  document.querySelectorAll("[data-close-info]").forEach(function(b){b.addEventListener("click",closeInfo)});
  info.addEventListener("click",function(e){if(e.target===info)closeInfo()});
  if(/[?&]info=1/.test(location.search))openInfo();

  /* ---------- Anteprima app (pagina app.html a schermo intero) ---------- */
  var ov2=document.getElementById("appov"),fr=document.getElementById("appframe");
  function openApp(){fr.src="app.html?v="+(root.getAttribute("data-v")||"1");ov2.classList.add("open");document.body.classList.add("noscroll")}
  function closeApp(){ov2.classList.remove("open");document.body.classList.remove("noscroll");fr.src="about:blank"}
  document.addEventListener("click",function(e){var a=e.target.closest("[data-app]");if(a){e.preventDefault();openApp()}},true);
  window.addEventListener("message",function(e){var d=e.data||{};if(d.g230close)closeApp();if(d.g230v)setV(String(d.g230v))});
  if(/[?&]app=1/.test(location.search))openApp();

  /* ---------- Protezione anti copia (demo privata) ---------- */
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){closeInfo();if(ov)ov.classList.remove("open");if(ov2&&ov2.classList.contains("open"))closeApp()}
    var k=(e.key||"").toLowerCase();
    if(e.key==="F12"||(e.ctrlKey&&(k==="u"||k==="s"))||(e.ctrlKey&&e.shiftKey&&(k==="i"||k==="j"||k==="c")))e.preventDefault();
  });
  document.addEventListener("contextmenu",function(e){e.preventDefault()});
})();
