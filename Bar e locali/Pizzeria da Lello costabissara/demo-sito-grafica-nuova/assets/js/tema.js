/* Pizzeria da Lello - DEMO GRAFICA NUOVA (06/11/2026)
   Due versioni nello stesso sito, cambiabili da qui:
   - A "Napoli illustrata": fondo crema, rosso pomodoro e basilico, illustrazioni a linea
   - B "Le Fornaci": terracotta e blu maiolica, fasce di maiolica (riggiola)
   In entrambe il logo e' quello originale di Lello, ricolorato con la palette della versione.

   COME SI CAMBIA
   1) Versione predefinita: cambia TEMA_DEFAULT qui sotto ('a' oppure 'b').
   2) Per provarle senza toccare il codice: aggiungi ?tema=a oppure ?tema=b all'indirizzo
      (la scelta resta memorizzata nel browser), oppure usa il selettore "A | B" in basso a sinistra.
   3) Quando la grafica e' decisa: MOSTRA_SELETTORE=false e BLOCCA_TEMA=true, cosi' tutti vedono solo quella.
   Tutti i colori sono in assets/css/tema.css, le illustrazioni in assets/bg. */
(function(){
'use strict';
var TEMA_DEFAULT='a';
var MOSTRA_SELETTORE=true;
var BLOCCA_TEMA=false;
var TEMI={a:'Napoli illustrata',b:'Le Fornaci'};

var root=document.documentElement, tema=TEMA_DEFAULT;
function leggi(){ try{ return localStorage.getItem('lello-tema'); }catch(e){ return null; } }
function salva(t){ try{ localStorage.setItem('lello-tema',t); }catch(e){} }
if(!BLOCCA_TEMA){
  var q=(location.search.match(/[?&]tema=([ab])\b/i)||[])[1];
  if(q){ tema=q.toLowerCase(); salva(tema); }
  else { var m=leggi(); if(m==='a'||m==='b') tema=m; }
}
root.setAttribute('data-tema',tema);

var fermo=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* illustrazioni di sfondo per sezione: [file, lato, alto %, colore (1 = principale, 2 = secondario)] */
var DECO={
  hero:   [['vesuvio','l',58,1],['pomodorini','r',78,1],['basilico','l',12,2]],
  storia: [['forno','l',22,1],['basilico','r',60,2]],
  instagram:[['pala','r',18,1],['mozzarella','l',70,2]],
  prenota:[['maschera','l',30,1],['vesuvio','r',62,1]],
  dove:   [['vesuvio','r',20,1],['pomodorini','l',72,1]],
  faq:    [['basilico','l',18,2],['forno','r',66,1]],
  menu:   [['pala','l',40,1],['basilico','r',30,2]],
  legal:  [['maschera','r',10,1],['basilico','l',55,2]]
};
var VEL=[0.10,-0.08,0.06];

function deco(sec,lista){
  if(!sec || sec.querySelector(':scope > .deco-box')) return;
  var box=document.createElement('div'); box.className='deco-box'; box.setAttribute('aria-hidden','true');
  lista.forEach(function(d,i){
    var s=document.createElement('span');
    s.className='deco deco-'+d[1]+' deco-c'+d[3]+(i>1?' deco-x':'');
    var u='url(assets/bg/'+d[0]+'.svg)'; s.style.webkitMaskImage=u; s.style.maskImage=u;
    s.style.top=d[2]+'%';
    s.setAttribute('data-v',VEL[i%VEL.length]);
    box.appendChild(s);
  });
  sec.insertBefore(box,sec.firstChild);
  sec.classList.add('has-deco');
}

function fascia(){ var f=document.createElement('div'); f.className='riggiola'; f.setAttribute('aria-hidden','true'); return f; }

function selettore(){
  if(!MOSTRA_SELETTORE || BLOCCA_TEMA) return;
  var w=document.createElement('div'); w.className='tema-sw'; w.setAttribute('role','group'); w.setAttribute('aria-label','Demo: scegli la grafica');
  w.innerHTML='<span>Grafica</span>'+Object.keys(TEMI).map(function(k){
    return '<button type="button" data-t="'+k+'" title="'+TEMI[k]+'" aria-pressed="'+(k===tema)+'">'+k.toUpperCase()+'</button>'; }).join('');
  w.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    tema=b.getAttribute('data-t'); root.setAttribute('data-tema',tema); salva(tema); loghi();
    [].forEach.call(w.querySelectorAll('button'),function(x){ x.setAttribute('aria-pressed',String(x===b)); });
  });
  document.body.appendChild(w);
}

/* logo originale di Lello ricolorato con la palette del tema (assets/img/logo-lello-a|b...).
   Cambia tutte le immagini del logo: hero, storia, menu, footer, piu' il logo piccolo nell'header */
var LOGHI=[['logo-lello-chiaro-sm.webp','logo-lello-chiaro-'],['logo-lello-chiaro.webp','logo-lello-chiaro-'],['logo-lello-sm.webp','logo-lello-'],['logo-lello.webp','logo-lello-']];
function nomeLogo(file,t){
  for(var i=0;i<LOGHI.length;i++){ var o=LOGHI[i][0]; if(file.slice(-o.length)===o && file.slice(-o.length-1,-o.length)==='/') return file.slice(0,-o.length)+LOGHI[i][1]+t+(o.indexOf('-sm')>0?'-sm':'')+'.webp'; }
  return null;
}
function loghi(){
  [].forEach.call(document.querySelectorAll('img[data-logo], .hero-logo, .intro-logo, .cta-logo, .mu-firma, .ftr-logo, .hdr-mini'),function(im){
    if(!im.hasAttribute('data-logo')){ im.setAttribute('data-logo',im.getAttribute('src')); im.setAttribute('data-logo-set',im.getAttribute('srcset')||''); }
    var src=nomeLogo(im.getAttribute('data-logo'),tema); if(!src) return;
    var set=im.getAttribute('data-logo-set');
    if(set) im.setAttribute('srcset',set.replace(/[^ ,]+\.webp/g,function(u){ return nomeLogo(u,tema)||u; }));
    im.setAttribute('src',src);
  });
}

function avvia(){
  /* header: logo piccolo + scritta "Le Fornaci da Lello" ricolorata dal CSS */
  var hl=document.querySelector('.hdr-logo');
  if(hl && !hl.querySelector('.hdr-mini')){
    hl.insertAdjacentHTML('afterbegin','<img class="hdr-mini" src="assets/img/logo-lello-sm.webp" alt="" width="254" height="293" decoding="async">');
    hl.insertAdjacentHTML('beforeend','<span class="hdr-lock" aria-hidden="true"></span>');
  }
  loghi();
  /* illustrazioni di sfondo */
  deco(document.querySelector('.hero:not(.menu-hero)'),DECO.hero);
  deco(document.querySelector('.menu-hero'),DECO.menu);
  ['storia','instagram','prenota','dove','faq'].forEach(function(id){ deco(document.getElementById(id),DECO[id]); });
  var ultima=document.querySelector('body[data-page="menu"] main > section.sec:last-of-type'); if(ultima) deco(ultima,DECO.prenota);
  deco(document.querySelector('main.legal'),DECO.legal);
  /* fasce di maiolica tra le sezioni (visibili solo nella versione B) */
  [].forEach.call(document.querySelectorAll('main > section.sec'),function(s){
    if(s.id==='instagram') return;
    s.parentNode.insertBefore(fascia(),s);
  });
  var ftr=document.querySelector('.ftr'); if(ftr) ftr.parentNode.insertBefore(fascia(),ftr);
  selettore();
  if(!fermo) parallasse();
}

/* parallasse leggera: le illustrazioni scorrono un po' piu' piano o piu' veloci del testo */
function parallasse(){
  var el=[].slice.call(document.querySelectorAll('.deco')), att=false, vh=innerHeight;
  if(!el.length) return;
  function giro(){
    att=false;
    el.forEach(function(s){
      var sec=s.parentNode.parentNode, r=sec.getBoundingClientRect();
      if(r.bottom<-100 || r.top>vh+100) return;
      var y=(r.top+r.height/2-vh/2)*parseFloat(s.getAttribute('data-v'));
      s.style.setProperty('--py',Math.round(y)+'px');
    });
  }
  function chiedi(){ if(!att){ att=true; requestAnimationFrame(giro); } }
  addEventListener('scroll',chiedi,{passive:true});
  addEventListener('resize',function(){ vh=innerHeight; chiedi(); });
  giro();
}

/* parte dopo main.js, che disegna header e footer al DOMContentLoaded */
function dopo(){ setTimeout(avvia,0); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',dopo); else dopo();
})();
