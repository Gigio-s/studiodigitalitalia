/* Ruota delle pizze - Pizzeria da Lello (demo Studio Digital Italia)
   Carosello orizzontale di pizze scontornate che ruotano in senso orario.
   Al click la pizza scivola a sinistra roteando e a destra escono gli ingredienti. */
(function(){
'use strict';

function euro(n){ return (typeof n==='number') ? n.toFixed(2).replace('.',',')+' €' : n; }
function reduced(){ return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }

function Wheel(root){
  var self=this;
  this.root=root;
  this.items=(window.LELLO_PIZZE||[]).filter(function(p){ return !!p.img; });
  if(!this.items.length) return;
  this.cur=-1; this.busy=false;

  root.insertAdjacentHTML('beforeend',
    '<div class="wh-rail">'+
      '<button class="wh-arrow prev" aria-label="Pizze precedenti"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>'+
      '<div class="wh-track" role="list"></div>'+
      '<button class="wh-arrow next" aria-label="Pizze successive"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>'+
    '</div>'+
    '<div class="wh-stage" aria-hidden="true">'+
      '<div class="wh-left"><div class="wh-glow"></div><div class="wh-move"><div class="wh-spin"><img class="wh-img" alt=""></div></div></div>'+
      '<div class="wh-right" aria-live="polite">'+
        '<span class="wh-cat"></span><h2 class="wh-name"></h2><p class="wh-frase"></p>'+
        '<ol class="wh-ing"></ol>'+
        '<div class="wh-foot"><span class="wh-price"></span><a class="btn btn-red" href="index.html#prenota">Prenota e assaggiala</a></div>'+
      '</div>'+
      '<div class="wh-nav">'+
        '<button class="wh-back"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>Tutte le pizze</button>'+
        '<span class="wh-count"></span>'+
        '<span class="wh-pn"><button class="wh-p" aria-label="Pizza precedente"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button><button class="wh-n" aria-label="Pizza successiva"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button></span>'+
      '</div>'+
    '</div>');

  this.track=root.querySelector('.wh-track');
  this.stage=root.querySelector('.wh-stage');
  this.move=root.querySelector('.wh-move');
  this.img=root.querySelector('.wh-img');

  this.track.innerHTML=this.items.map(function(p,i){
    return '<button class="pz'+(p.forma==='calzone'?' is-calzone':'')+'" role="listitem" data-i="'+i+'" aria-label="'+p.nome+', '+euro(p.prezzo)+'. Scopri gli ingredienti">'+
      '<span class="pz-disc"><span class="pz-spin" style="animation-delay:-'+(i*3.7).toFixed(1)+'s"><img src="'+p.img+'" alt="'+p.nome+'" loading="'+(i<5?'eager':'lazy')+'" draggable="false"></span></span>'+
      '<b>'+p.nome+'</b><small>'+euro(p.prezzo)+'</small></button>';
  }).join('');
  this.btns=[].slice.call(this.track.querySelectorAll('.pz'));

  /* click / tap su una pizza (ignorato se era un trascinamento) */
  this.btns.forEach(function(b){
    b.addEventListener('click',function(e){ if(self.dragged){ e.preventDefault(); return; } self.open(+b.getAttribute('data-i')); });
  });
  root.querySelector('.wh-arrow.prev').onclick=function(){ self.scrollBy(-1); };
  root.querySelector('.wh-arrow.next').onclick=function(){ self.scrollBy(1); };
  root.querySelector('.wh-back').onclick=function(){ self.close(); };
  root.querySelector('.wh-p').onclick=function(){ self.step(-1); };
  root.querySelector('.wh-n').onclick=function(){ self.step(1); };
  document.addEventListener('keydown',function(e){
    if(self.cur<0) return;
    if(e.key==='Escape') self.close();
    if(e.key==='ArrowRight') self.step(1);
    if(e.key==='ArrowLeft') self.step(-1);
  });

  this.drag();
  this.track.addEventListener('scroll',function(){ self.focusFx(); },{passive:true});
  window.addEventListener('resize',function(){ self.focusFx(); });
  setTimeout(function(){ self.center(Math.min(2,self.items.length-1),false); self.focusFx(); },60);
}

/* trascinamento con il mouse (su touch lo scroll e' nativo) */
Wheel.prototype.drag=function(){
  var t=this.track, self=this, down=false, x0=0, s0=0;
  t.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse') return; down=true; self.dragged=false; x0=e.clientX; s0=t.scrollLeft; t.classList.add('grab'); });
  window.addEventListener('pointermove',function(e){ if(!down) return; var dx=e.clientX-x0; if(Math.abs(dx)>6) self.dragged=true; t.scrollLeft=s0-dx; });
  window.addEventListener('pointerup',function(){ if(!down) return; down=false; t.classList.remove('grab'); setTimeout(function(){ self.dragged=false; },0); });
};

Wheel.prototype.scrollBy=function(dir){
  var w=this.btns[0].getBoundingClientRect().width;
  this.track.scrollBy({left:dir*w*2,behavior:'smooth'});
};
Wheel.prototype.center=function(i,smooth){
  var b=this.btns[i]; if(!b) return;
  var left=b.offsetLeft - (this.track.clientWidth - b.offsetWidth)/2;
  this.track.scrollTo({left:left,behavior:smooth===false?'auto':'smooth'});
};
/* la pizza al centro e' piu' grande, quelle ai lati si allontanano */
Wheel.prototype.focusFx=function(){
  var self=this; if(this.raf) return;
  this.raf=requestAnimationFrame(function(){
    self.raf=null;
    var r=self.track.getBoundingClientRect(), c=r.left+r.width/2;
    self.btns.forEach(function(b){
      var br=b.getBoundingClientRect(), d=Math.min(1,Math.abs((br.left+br.width/2)-c)/(r.width/2));
      b.style.setProperty('--f',(1-d).toFixed(3));
    });
  });
};

Wheel.prototype.fill=function(p,i){
  var r=this.root;
  r.querySelector('.wh-cat').textContent=p.cat;
  r.querySelector('.wh-name').textContent=p.nome;
  r.querySelector('.wh-frase').textContent=p.frase||'';
  r.querySelector('.wh-price').textContent=euro(p.prezzo);
  r.querySelector('.wh-count').textContent=(i+1)+' / '+this.items.length;
  var ol=r.querySelector('.wh-ing');
  ol.classList.remove('in');
  ol.innerHTML=p.ing.map(function(x,k){
    return '<li style="--k:'+k+'"><span class="dot"></span><b>'+x[0]+'</b>'+(x[1]?'<small>'+x[1]+'</small>':'')+'</li>';
  }).join('');
  this.img.src=p.img; this.img.alt=p.nome;
  this.stage.classList.toggle('is-calzone',p.forma==='calzone');
  void ol.offsetWidth; /* riavvia l'animazione */
  requestAnimationFrame(function(){ ol.classList.add('in'); });
};

/* APRI: la pizza vola dal carosello alla sinistra roteando */
Wheel.prototype.open=function(i){
  if(this.busy) return; this.busy=true;
  var self=this, p=this.items[i], src=this.btns[i].querySelector('.pz-disc').getBoundingClientRect();
  this.cur=i;
  this.root.classList.add('is-open');
  this.stage.setAttribute('aria-hidden','false');
  this.fill(p,i);
  var sec=this.root.closest('section'), mob=window.matchMedia('(max-width:980px)').matches;
  if(sec && (mob || sec.getBoundingClientRect().top<-40)) window.scrollTo({top:sec.getBoundingClientRect().top+window.pageYOffset,behavior:mob?'auto':'smooth'});
  var dst=this.move.getBoundingClientRect();
  var dx=(src.left+src.width/2)-(dst.left+dst.width/2), dy=(src.top+src.height/2)-(dst.top+dst.height/2), s=src.width/dst.width;
  if(reduced()){ this.busy=false; return; }
  var a=this.move.animate([
    {transform:'translate('+dx+'px,'+dy+'px) scale('+s+') rotate(0deg)'},
    {transform:'translate(0,0) scale(1) rotate(360deg)'}
  ],{duration:1050,easing:'cubic-bezier(.22,.8,.24,1)'});
  a.onfinish=function(){ self.busy=false; };
};

/* CHIUDI: la pizza torna al suo posto nel carosello */
Wheel.prototype.close=function(){
  if(this.cur<0 || this.busy) return; this.busy=true;
  var self=this, i=this.cur;
  this.center(i,false);
  var dst=this.btns[i].querySelector('.pz-disc').getBoundingClientRect(), src=this.move.getBoundingClientRect();
  var dx=(dst.left+dst.width/2)-(src.left+src.width/2), dy=(dst.top+dst.height/2)-(src.top+src.height/2), s=dst.width/src.width;
  this.root.querySelector('.wh-ing').classList.remove('in');
  function done(){
    self.root.classList.remove('is-open'); self.stage.setAttribute('aria-hidden','true');
    self.cur=-1; self.busy=false; self.focusFx();
    try{ self.btns[i].focus({preventScroll:true}); }catch(_){}
  }
  if(reduced() || dst.width<2){ /* mobile: il carosello e' nascosto, niente volo di ritorno */
    if(!reduced()){ var f=this.move.animate([{transform:'rotate(0) scale(1)',opacity:1},{transform:'rotate(-120deg) scale(.6)',opacity:0}],{duration:380,easing:'ease-in'}); f.onfinish=done; }
    else done();
    return;
  }
  this.root.classList.add('is-closing');
  var a=this.move.animate([
    {transform:'translate(0,0) scale(1) rotate(0deg)'},
    {transform:'translate('+dx+'px,'+dy+'px) scale('+s+') rotate(-300deg)'}
  ],{duration:750,easing:'cubic-bezier(.6,0,.3,1)'});
  a.onfinish=function(){ self.root.classList.remove('is-closing'); done(); };
};

/* AVANTI / INDIETRO: la pizza esce rotolando, la nuova entra */
Wheel.prototype.step=function(dir){
  if(this.busy || this.cur<0) return; this.busy=true;
  var self=this, n=(this.cur+dir+this.items.length)%this.items.length;
  var out=dir>0?'-60%':'60%', inn=dir>0?'60%':'-60%';
  this.root.querySelector('.wh-ing').classList.remove('in');
  var pre=new Image(); pre.src=this.items[n].img;
  if(reduced()){ this.cur=n; this.fill(this.items[n],n); this.center(n); this.busy=false; return; }
  var a=this.move.animate([
    {transform:'translateX(0) rotate(0deg)',opacity:1},
    {transform:'translateX('+out+') rotate('+(dir>0?-200:200)+'deg)',opacity:0}
  ],{duration:420,easing:'cubic-bezier(.5,0,.8,.4)'});
  a.onfinish=function(){
    self.cur=n; self.fill(self.items[n],n); self.center(n);
    var b=self.move.animate([
      {transform:'translateX('+inn+') rotate('+(dir>0?200:-200)+'deg)',opacity:0},
      {transform:'translateX(0) rotate(0deg)',opacity:1}
    ],{duration:620,easing:'cubic-bezier(.2,.8,.25,1)'});
    b.onfinish=function(){ self.busy=false; };
  };
};

/* apre una pizza per id (usato dal menu completo) */
Wheel.prototype.openId=function(id){
  var i=-1; this.items.forEach(function(p,k){ if(p.id===id) i=k; });
  if(i<0) return false;
  var self=this;
  if(this.cur>=0){ this.cur=i; this.fill(this.items[i],i); this.center(i); return true; }
  this.center(i,false);
  setTimeout(function(){ self.open(i); },30);
  return true;
};

window.LelloWheel=Wheel;
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-wheel]').forEach(function(el){ el.wheel=new Wheel(el); });
});
})();
