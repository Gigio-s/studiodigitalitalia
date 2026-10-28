/* Versione 4 "Dal forno" - Pizzeria da Lello (demo Studio Digital Italia)
   - hero: una pizza grande che gira piano con alone caldo dietro
   - lista verticale: le pizze entrano una alla volta dal basso ruotando
   - tocco: la pizza si sposta di lato e gli ingredienti compaiono intorno come etichette
   - storia: linea del tempo che si riempie scorrendo */
(function(){
'use strict';
var P=(window.LELLO_PIZZE||[]).filter(function(p){ return !!p.img; });
var FILTRI=[['tutte','Tutte'],['classiche','Classiche'],['eccellenze','Eccellenze'],['calzoni','Calzoni'],['sottili','Sottili'],['altro','Altro']];
function gruppo(p){ return {'Classiche napoletane':'classiche','Eccellenze napoletane':'eccellenze','Calzoni':'calzoni','Pizze sottili':'sottili'}[p.cat]||'altro'; }
function euro(n){ return (typeof n==='number') ? n.toFixed(2).replace('.',',')+' €' : (n||'Prezzo da confermare'); }
function norm(t){ return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/['".,]/g,' '); }
function testo(p){ if(!p._t) p._t=norm([p.nome,p.cat,p.frase].concat((p.ing||[]).map(function(x){ return x.join(' '); })).join(' ')); return p._t; }
function reduced(){ return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
function esc(t){ return String(t).replace(/"/g,'&quot;'); }

var items=P.slice(), filtro='tutte', q='', PASSO=8, mostrati=PASSO;

/* ---------- HERO ---------- */
function hero(){
  var b=document.querySelector('[data-fz-hero]'); if(!b||!P.length) return;
  var star=P.filter(function(p){ return p.id==='margherita'; })[0]||P[0];
  var img=b.querySelector('img'); img.src=star.img; img.alt=star.nome;
  b.setAttribute('aria-label','Guarda la '+star.nome);
  b.addEventListener('click',function(){ apri(star.id); });
}

/* ---------- LISTA ---------- */
var list, io;
function render(){
  list.innerHTML=items.slice(0,mostrati).map(function(p,i){
    return '<article class="fz-item'+(p.forma==='calzone'?' is-calzone':'')+'" data-id="'+p.id+'">'+
      '<button class="fz-pizza" type="button" data-open="'+p.id+'" aria-label="'+esc(p.nome)+': guarda gli ingredienti"><span class="fz-alone"></span><img src="'+p.img+'" alt="'+esc(p.nome)+'" loading="lazy" width="440" height="440"></button>'+
      '<div class="fz-txt"><span class="fz-c">'+p.cat+'</span><h3>'+p.nome+'</h3>'+(p.conferma?'<em class="tbc">(nome da confermare)</em>':'')+
      (p.frase?'<p>'+p.frase+'</p>':'')+
      '<div class="fz-row"><span class="fz-pr">'+euro(p.prezzo)+'</span><button class="fz-see" type="button" data-open="'+p.id+'">Guardala</button></div></div></article>';
  }).join('');
  document.querySelector('.fz-none').style.display=items.length?'none':'block';
  var resto=items.length-mostrati, m=document.querySelector('.fz-more');
  if(!m){ m=document.createElement('button'); m.type='button'; m.className='fz-more'; list.parentNode.insertBefore(m,list.nextSibling);
    m.addEventListener('click',function(){ var da=mostrati; mostrati+=PASSO*2; render(); var n=list.children[da]; if(n) n.querySelector('.fz-see').focus({preventScroll:true}); }); }
  m.hidden=resto<=0; m.innerHTML='Mostra altre pizze <small>'+Math.max(resto,0)+'</small>';
  osserva();
}
function osserva(){
  var els=list.querySelectorAll('.fz-item');
  if(reduced() || !('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); }); return; }
  if(io) io.disconnect();
  io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }); },{rootMargin:'0px 0px -12% 0px',threshold:.15});
  els.forEach(function(e){ io.observe(e); });
}
function applica(){
  var w=norm(q).split(/\s+/).filter(Boolean);
  mostrati=PASSO;
  items=P.filter(function(p){ if(filtro!=='tutte' && gruppo(p)!==filtro) return false; var t=testo(p); return w.every(function(x){ return t.indexOf(x)>-1; }); });
  render();
}
function strumenti(){
  var f=document.querySelector('.fz-filt');
  f.innerHTML=FILTRI.filter(function(x){ return x[0]==='tutte'||P.some(function(p){ return gruppo(p)===x[0]; }); }).map(function(x){
    var n=x[0]==='tutte'?P.length:P.filter(function(p){ return gruppo(p)===x[0]; }).length;
    return '<button role="tab" data-f="'+x[0]+'" aria-selected="'+(x[0]==='tutte')+'">'+x[1]+' <small>'+n+'</small></button>'; }).join('');
  f.addEventListener('click',function(e){ var b=e.target.closest('[data-f]'); if(!b) return; filtro=b.getAttribute('data-f');
    f.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-selected',x===b); }); applica(); });
  var inp=document.querySelector('.fz-search input'), t;
  inp.addEventListener('input',function(){ clearTimeout(t); t=setTimeout(function(){ q=inp.value.trim(); applica(); },140); });
  inp.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); inp.blur(); if(items[0]) apri(items[0].id); } });
}

/* ---------- SCHEDA: pizza di lato, ingredienti intorno ---------- */
var sh, cur=-1, ultimoFocus;
function apri(id){
  var i=-1; items.forEach(function(p,k){ if(p.id===id) i=k; });
  if(i<0){ filtro='tutte'; q=''; var inp=document.querySelector('.fz-search input'); if(inp) inp.value='';
    document.querySelectorAll('.fz-filt button').forEach(function(x){ x.setAttribute('aria-selected',x.getAttribute('data-f')==='tutte'); });
    applica(); items.forEach(function(p,k){ if(p.id===id) i=k; }); }
  if(i<0) return;
  ultimoFocus=document.activeElement;
  riempi(i);
  sh.hidden=false; document.documentElement.classList.add('fz-lock');
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ sh.classList.add('open'); }); });
  sh.querySelector('.fz-x').focus({preventScroll:true});
}
function chiudi(){
  sh.classList.remove('open','tags-in'); document.documentElement.classList.remove('fz-lock');
  setTimeout(function(){ sh.hidden=true; },reduced()?0:420);
  try{ if(ultimoFocus) ultimoFocus.focus({preventScroll:true}); }catch(_){}
}
function riempi(i){
  cur=i; var p=items[i];
  sh.classList.toggle('is-calzone',p.forma==='calzone');
  sh.querySelector('.fz-big').src=p.img; sh.querySelector('.fz-big').alt=p.nome;
  sh.querySelector('.fz-cat').textContent=p.cat;
  sh.querySelector('.fz-name').textContent=p.nome;
  sh.querySelector('.fz-tbc').style.display=p.conferma?'':'none';
  sh.querySelector('.fz-frase').textContent=p.frase||'';
  var pr=sh.querySelector('.fz-price'); pr.textContent=euro(p.prezzo); pr.classList.toggle('na',typeof p.prezzo!=='number');
  /* etichette disposte ad arco intorno alla pizza */
  var ing=p.ing||[], n=ing.length, ul=sh.querySelector('.fz-tags');
  ul.innerHTML=ing.map(function(x,k){
    var a=n>1 ? (-75+150*k/(n-1)) : 0;                 /* da -75 a +75 gradi, sul lato destro */
    return '<li style="--a:'+a.toFixed(1)+'deg;--k:'+k+'"><span><b>'+x[0]+'</b>'+(x[1]?'<small>'+x[1]+'</small>':'')+'</span></li>';
  }).join('');
  sh.classList.remove('tags-in'); void ul.offsetWidth;
  setTimeout(function(){ sh.classList.add('tags-in'); },reduced()?0:380);
}
function passo(d){ if(cur<0||!items.length) return; riempi((cur+d+items.length)%items.length); }
function scheda(){
  sh=document.querySelector('[data-fz-sheet]'); if(!sh) return;
  sh.addEventListener('click',function(e){ if(e.target.closest('[data-fz-close]')) chiudi(); if(e.target.closest('[data-fz-prev]')) passo(-1); if(e.target.closest('[data-fz-next]')) passo(1); });
  document.addEventListener('keydown',function(e){ if(sh.hidden) return; if(e.key==='Escape') chiudi(); if(e.key==='ArrowRight') passo(1); if(e.key==='ArrowLeft') passo(-1); });
  /* swipe orizzontale per cambiare pizza */
  var x0=null; sh.addEventListener('touchstart',function(e){ x0=e.touches[0].clientX; },{passive:true});
  sh.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>60) passo(dx<0?1:-1); x0=null; },{passive:true});
}

/* ---------- STORIA: linea del tempo che si riempie ---------- */
function tempo(){
  var t=document.querySelector('[data-fz-time]'); if(!t) return;
  var li=t.querySelectorAll('li'), raf=null;
  function upd(){
    raf=null; var r=t.getBoundingClientRect(), vh=window.innerHeight;
    var p=Math.min(1,Math.max(0,(vh*0.75-r.top)/(r.height)));
    t.style.setProperty('--p',p.toFixed(3));
    li.forEach(function(l,k){ l.classList.toggle('on',p>=(k/(li.length-1))*0.98-0.02); });
  }
  window.addEventListener('scroll',function(){ if(!raf) raf=requestAnimationFrame(upd); },{passive:true});
  window.addEventListener('resize',upd); upd();
}

/* ---------- HEADER: si nasconde scorrendo in giu, torna scorrendo in su ---------- */
function nascondiHeader(){
  var H=document.documentElement, y0=window.pageYOffset, raf=null;
  function upd(){
    raf=null; var y=window.pageYOffset, d=y-y0;
    if(H.classList.contains('nav-open') || y<window.innerHeight*0.6){ H.classList.remove('fz-hide-hdr'); y0=y; return; }
    if(d>8){ H.classList.add('fz-hide-hdr'); y0=y; }
    else if(d<-8){ H.classList.remove('fz-hide-hdr'); y0=y; }
  }
  window.addEventListener('scroll',function(){ if(!raf) raf=requestAnimationFrame(upd); },{passive:true});
}

document.addEventListener('DOMContentLoaded',function(){
  list=document.querySelector('[data-fz-list]');
  if(list){ strumenti(); render(); list.addEventListener('click',function(e){ var b=e.target.closest('[data-open]'); if(b) apri(b.getAttribute('data-open')); }); }
  hero(); scheda(); tempo(); nascondiHeader();
});
window.LelloForno={apri:function(id){ apri(id); }};
})();
