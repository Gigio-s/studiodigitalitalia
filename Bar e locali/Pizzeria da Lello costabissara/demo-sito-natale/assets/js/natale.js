/* Pizzeria da Lello - VESTE NATALIZIA, versioni A e B (19/11/2026)
   Si accende da sola dal 1 dicembre al 6 gennaio e si spegne da sola dopo l'Epifania.
   Prova in qualsiasi giorno: ?natale=1 (resta attiva in quella scheda), ?natale=0 per spegnerla.
   VERSIONE: quella che vedono i clienti ('a' o 'b'). In anteprima (?natale=1) compare in basso
   a sinistra il selettore "Natale A | B" per cambiare al volo; ?nv=a o ?nv=b fa lo stesso.
   Grafica in assets/css/natale.css, immagini in assets/img/sfondi/natale-* e assets/img/natale,
   disegni in assets/bg/natale (A) e assets/bg/natale-b (B). */
(function(){
'use strict';
var SEMPRE=null;              /* null = segue le date, true = sempre accesa, false = sempre spenta */
var DAL=[12,1], AL=[1,6];     /* [mese, giorno] */
var VERSIONE='a';             /* versione scelta per il sito online */

var on=SEMPRE, prova=false, v=VERSIONE;
try{
  var q=(location.search.match(/[?&]natale=([01])\b/)||[])[1];
  if(q){ sessionStorage.setItem('lello-natale',q); }
  q=q||sessionStorage.getItem('lello-natale');
  if(q!==null && q!==undefined){ on=(q==='1'); prova=on; }
  var w=(location.search.match(/[?&]nv=([ab])\b/)||[])[1];
  if(w){ sessionStorage.setItem('lello-natale-v',w); }
  w=w||sessionStorage.getItem('lello-natale-v');
  if(w==='a'||w==='b') v=w;
}catch(e){}
if(window.NATALE_DEMO){ on=true; prova=true; }   /* pagina demo per il cliente: sempre accesa, selettore visibile */
if(on===null){
  var d=new Date(), m=d.getMonth()+1, g=d.getDate();
  on=(m===DAL[0]&&g>=DAL[1])||(m===AL[0]&&g<=AL[1]);
}
if(!on) return;
var root=document.documentElement;
root.setAttribute('data-stagione','natale');
root.setAttribute('data-natale',v);
if(window.NATALE_DEMO) root.classList.add('nat-demo');

var mobile=function(){ return innerWidth<700; };
var calma=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var DIS={a:['natale/stella','natale/agrifoglio','natale/abete','natale/pallina','natale/campanella'],
         b:['natale-b/cometa','natale-b/fiocco','natale-b/struffoli','natale-b/candela','natale-b/regalo','natale-b/corno']};
var orig=[];

/* disegni a linea natalizi al posto di quelli normali (stessa posizione, stessa parallasse) */
function addobbi(){
  var k=0, lista=DIS[v];
  [].forEach.call(document.querySelectorAll('.deco'),function(s,i){
    if(orig[i]===undefined) orig[i]=s.style.maskImage||'';
    s.classList.remove('deco-c3n');
    if(k%3===2 && v==='a'){ s.style.webkitMaskImage=orig[i]; s.style.maskImage=orig[i]; return k++; }
    var u='url(assets/bg/'+lista[k%lista.length]+'.svg)';
    s.style.webkitMaskImage=u; s.style.maskImage=u;
    if(v==='a' ? k%4===1 : k%2===0) s.classList.add('deco-c3n');
    k++;
  });
}
function el(tag,cls,html){ var e=document.createElement(tag); e.className=cls; e.setAttribute('aria-hidden','true'); if(html) e.innerHTML=html; return e; }
function r(a,b){ return a+Math.random()*(b-a); }

/* A: neve piu fitta nella hero, con fiocchi veri e neve posata in fondo */
function neve(h){
  if(calma) return;
  var n=mobile()?40:90, html='';
  for(var i=0;i<n;i++){
    var f=Math.random()<.35, s=f?r(12,22):r(5,10);
    html+='<i class="'+(f?'f':'')+'" style="left:'+r(0,100).toFixed(1)+'%;--s:'+s.toFixed(1)+'px;--o:'+r(.6,1).toFixed(2)+
      ';--d:'+r(8,17).toFixed(1)+'s;--r:-'+r(0,17).toFixed(1)+'s;--x:'+r(-30,30).toFixed(0)+'px"></i>';
  }
  h.insertBefore(el('div','neve na',html),h.firstChild);
}
/* A: palline appese ai lati della hero e delle sezioni */
var COL=['#B3261E','#B8860B','#1F4D3A','#B3261E','#C9A227'];
function pallina(c,stella){
  return stella
   ? '<svg viewBox="0 0 40 40"><path d="M20 3l4.9 10.6 11.6 1.3-8.6 7.9 2.4 11.4L20 28.4 9.7 34.2l2.4-11.4L3.5 14.9l11.6-1.3z" fill="'+c+'"/></svg>'
   : '<svg viewBox="0 0 40 46"><rect x="15" y="0" width="10" height="7" rx="1.5" fill="#C9A227"/><circle cx="20" cy="26" r="18" fill="'+c+'"/><ellipse cx="13" cy="19" rx="5" ry="3.2" fill="#fff" opacity=".35" transform="rotate(-35 13 19)"/><path d="M4 26c8 4 24 4 32 0" stroke="#fff" stroke-opacity=".45" stroke-width="2" fill="none"/></svg>';
}
function appese(box,quante,piccole,lati){
  lati=lati||['l','r']; var html='';
  lati.forEach(function(lato,j){
    for(var i=0;i<quante;i++){
      var x=(piccole?3:2)+i*(piccole?9:5.2)+r(-1,1), lung=(piccole?30:60)+((i+j)%3)*(piccole?22:46)+r(0,20);
      var c=COL[(i+j*2)%COL.length], st=(i===quante-1 && !piccole);
      html+='<span class="pend" style="'+(lato==='l'?'left':'right')+':'+x.toFixed(1)+'%;--l:'+lung.toFixed(0)+'px;--w:'+(piccole?18:r(26,36)).toFixed(0)+'px;--t:'+r(3.2,5).toFixed(1)+'s;--dl:-'+r(0,4).toFixed(1)+'s">'+pallina(c,st)+'</span>';
    }
  });
  box.innerHTML=html;
}
/* B: lucine colorate lungo un filo + stelline che brillano + cometa */
function lucine(n){
  var html='<svg class="filo" viewBox="0 0 1000 40" preserveAspectRatio="none"><path d="M0 6 Q 50 34 100 6 T 200 6 T 300 6 T 400 6 T 500 6 T 600 6 T 700 6 T 800 6 T 900 6 T 1000 6" fill="none" stroke="#3A2E22" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
  var cc=['#F2C14E','#D9412B','#3E8E5A','#F2C14E','#E9E4D0'];
  for(var i=0;i<n;i++){
    var t=(i+.5)/n, u=(t*10)%1, y=6+56*u*(1-u);
    html+='<b style="left:'+(t*100).toFixed(2)+'%;top:'+y.toFixed(1)+'px;--c:'+cc[i%cc.length]+';--dl:-'+r(0,3).toFixed(1)+'s"></b>';
  }
  return html;
}
function stelle(h){
  var n=mobile()?16:34, html='';
  for(var i=0;i<n;i++) html+='<i style="left:'+r(0,100).toFixed(1)+'%;top:'+r(4,70).toFixed(1)+'%;--s:'+r(6,13).toFixed(0)+'px;--d:'+r(2,4.5).toFixed(1)+'s;--dl:-'+r(0,4).toFixed(1)+'s"></i>';
  if(!calma) html+='<em class="cometa"></em>';
  h.insertBefore(el('div','stelle nb',html),h.firstChild);
}

function monta(){
  var h=document.querySelector('.hero');
  /* versione A */
  if(h && !h.querySelector('.na')){
    neve(h);
    h.appendChild(el('div','ghirlanda na'));
    h.appendChild(el('div','cumulo na'));
    var p=el('div','appese na'); appese(p,mobile()?2:4,mobile()); h.appendChild(p);
  }
  ['storia','dove','faq'].forEach(function(id,i){
    var s=document.getElementById(id); if(!s || s.querySelector('.na')) return;
    s.appendChild(el('div','rametto na '+(i%2?'rametto-r':'rametto-l')));
    var p=el('div','appese na appese-sec'); appese(p,mobile()?1:3,true,[i%2?'l':'r']); s.appendChild(p);
  });
  var pr=document.getElementById('prenota')||document.querySelector('body[data-page="menu"] main > section.sec:last-of-type');
  if(pr && !pr.querySelector('.ghirlanda')) pr.appendChild(el('div','ghirlanda ghirlanda-sec na'));
  var f=document.querySelector('.ftr'); if(f && !f.querySelector('.ghirlanda')) f.appendChild(el('div','ghirlanda ghirlanda-ftr na'));
  /* versione B */
  if(h && !h.querySelector('.nb')){
    stelle(h);
    h.appendChild(el('div','lucine nb',lucine(mobile()?14:30)));
  }
  ['storia','prenota','faq'].forEach(function(id){
    var s=document.getElementById(id); if(!s || s.querySelector('.lucine')) return;
    s.appendChild(el('div','lucine lucine-sec nb',lucine(mobile()?12:26)));
  });
  addobbi();
}

/* selettore A | B, solo in anteprima (?natale=1), mai per i clienti */
function selettore(){
  if(!prova || document.querySelector('.nat-sel')) return;
  var b=document.createElement('div'); b.className='nat-sel'+(window.NATALE_DEMO?' nat-sel-demo':'');
  b.innerHTML='<span>'+(window.NATALE_DEMO?'Versione natalizia':'Natale')+'</span><button type="button" data-v="a">A</button><button type="button" data-v="b">B</button>';
  function seg(){ [].forEach.call(b.querySelectorAll('button'),function(x){ x.setAttribute('aria-pressed',x.getAttribute('data-v')===v); }); }
  b.addEventListener('click',function(e){
    var t=e.target.closest('button'); if(!t) return;
    v=t.getAttribute('data-v'); root.setAttribute('data-natale',v);
    try{ sessionStorage.setItem('lello-natale-v',v); }catch(x){}
    addobbi(); seg();
  });
  seg(); document.body.appendChild(b);
}
/* parte dopo main.js e tema.js, che disegnano testata, footer e decorazioni */
function via(){ setTimeout(function(){ monta(); selettore(); },60); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',via); else via();
})();
