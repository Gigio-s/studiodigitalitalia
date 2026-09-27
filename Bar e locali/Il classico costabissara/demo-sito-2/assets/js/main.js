/* Classico Vicenza - demo 2 "Universo Classico" - Studio Digital Italia */
(function(){
'use strict';
var C = window.CLASSICO = window.CLASSICO || {};
C.protect = true; /* demo privata: mettere false per il sito reale */

C.info = { tel:'351 617 8115', telLink:'+393516178115', wa:'https://wa.me/393516178115',
  indirizzo:'Via San Carlo 10', citta:'36030 Costabissara (VI)', maps:'https://maps.google.com/?cid=5723719041893053075',
  ig:'https://www.instagram.com/classico.vicenza/', fb:'https://www.facebook.com/classico.vicenza' };

C.orari = [
  {g:'Domenica',f:[['11:00','14:30'],['17:00','22:00']]},
  {g:'Lunedì',f:[]},
  {g:'Martedì',f:[['9:00','14:30'],['17:00','23:00']]},
  {g:'Mercoledì',f:[['10:00','14:30'],['17:00','00:00']]},
  {g:'Giovedì',f:[['10:00','14:30'],['17:00','00:00']]},
  {g:'Venerdì',f:[['10:00','14:30'],['17:00','01:00']]},
  {g:'Sabato',f:[['11:00','14:30'],['17:00','01:00']]}
];

/* Cocktail in evidenza: nomi, ingredienti e prezzi dal menu reale; note di gusto descrittive */
C.drinks = [
  {n:'Paloma',p:'€ 9',img:'drink-paloma.jpg',i:'Tequila, lime, sciroppo d\'agave, soda al pompelmo rosa',t:'Agrumato, frizzante, dissetante'},
  {n:'Espresso Martini',p:'€ 10',img:'drink-espresso.jpg',i:'Vodka, liquore al caffè, caffè, zucchero',t:'Intenso, vellutato, tostato'},
  {n:'Gin Basil',p:'€ 10',img:'drink-basil.jpg',i:'Gin, succo di limone, zucchero, basilico',t:'Erbaceo, fresco, aromatico'},
  {n:'Negroni Premium',p:'€ 8 / 10',img:'drink-negroni.jpg',i:'Bitter, Vermouth, Gin',t:'Amaro, rotondo, classico'},
  {n:'Moscow Mule',p:'€ 9',img:'drink-mule.jpg',i:'Vodka, lime, ginger beer',t:'Speziato, vivace, citrico'},
  {n:'Bellini Peach Fizz',p:'€ 6',img:'drink-bellini.jpg',i:'Purea di pesca, Prosecco, Organics Peach Fizz',t:'Fruttato, morbido, estivo'},
  {n:'Boulevardier',p:'€ 10',img:'cocktail.jpg',i:'Bitter, Vermouth, Bourbon',t:'Caldo, avvolgente, legnoso'}
];

var I = {
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm8.4-18.3A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.5 11.9 11.9 0 0 0 8.4-20.3z"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  l:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 18l-6-6 6-6"/></svg>',
  r:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18l6-6-6-6"/></svg>'
};
function logo(){ return '<span class="logo"><b>classico</b><small class="dots"><span>Food</span><span>Drink</span><span>Friends</span></small></span>'; }

function header(){
  var pg=document.body.getAttribute('data-page');
  var L=[['index.html#universo','Universo'],['index.html#cocktail','Cocktail'],['menu.html','Menu'],['index.html#eventi','Eventi'],['index.html#dove','Dove siamo']];
  return '<a class="skip" href="#main">Vai al contenuto</a><header class="hdr'+(pg!=='home'?' solid':'')+'"><div class="wrap">'+
    '<a href="index.html" aria-label="Classico, home">'+logo()+'</a>'+
    '<nav class="nav" id="nav" aria-label="Menu principale">'+L.map(function(l){return '<a href="'+l[0]+'"'+(pg==='menu'&&l[1]==='Menu'?' aria-current="page"':'')+'>'+l[1]+'</a>';}).join('')+'<a href="#" data-rsv>Prenota</a></nav>'+
    '<button class="burger" aria-label="Apri il menu" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button>'+
  '</div></header><button class="rsv-tab" data-rsv>Prenota</button>';
}
function footer(){
  var rows=[1,2,3,4,5,6,0].map(function(i){var o=C.orari[i];return '<li><span>'+o.g.slice(0,3)+'</span><span>'+(o.f.length?o.f.map(function(f){return f[0]+'-'+f[1];}).join('<br>'):'chiuso')+'</span></li>';}).join('');
  return '<footer class="ftr"><div class="wrap"><div class="ftr-grid">'+
    '<div>'+logo()+'<p style="margin-top:20px;max-width:290px">Il vostro posto del cuore. Buon cibo, drink e musica a Costabissara, a due passi da Vicenza.</p><div class="social"><a href="'+C.info.ig+'" target="_blank" rel="noopener" aria-label="Instagram">'+I.ig+'</a><a href="'+C.info.fb+'" target="_blank" rel="noopener" aria-label="Facebook">'+I.fb+'</a><a href="'+C.info.wa+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+I.wa+'</a></div></div>'+
    '<div><h5>Contatti</h5><ul><li><a href="'+C.info.maps+'" target="_blank" rel="noopener">'+C.info.indirizzo+'<br>'+C.info.citta+'</a></li><li><a href="tel:'+C.info.telLink+'">'+C.info.tel+'</a></li><li><a href="'+C.info.ig+'" target="_blank" rel="noopener">@classico.vicenza</a></li></ul></div>'+
    '<div><h5>Orari</h5><ul class="oh">'+rows+'</ul></div>'+
    '<div><h5>Esplora</h5><ul><li><a href="menu.html">Menu completo</a></li><li><a href="index.html#cocktail">Cocktail</a></li><li><a href="index.html#eventi">Eventi</a></li><li><a href="#" data-rsv>Prenota un tavolo</a></li><li><a href="privacy.html">Privacy e cookie</a></li></ul></div>'+
  '</div><div class="ftr-bot"><span>&copy; '+new Date().getFullYear()+' Classico Vicenza - Paola Cazzola S.r.l. - P.IVA da inserire</span><span>Sito realizzato da <a href="https://studiodigitalitalia.it" target="_blank" rel="noopener">Studio Digital Italia</a></span></div></div></footer>'+
  '<a class="wa" href="'+C.info.wa+'?text='+encodeURIComponent('Ciao Classico! Vorrei informazioni')+'" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">'+I.wa+'</a><div class="demo-bar">Demo riservata - anteprima</div>'+
  modal();
}
function modal(){
  return '<div class="modal" id="rsv" role="dialog" aria-modal="true" aria-labelledby="rsv-t"><div class="modal-box"><button class="x" aria-label="Chiudi">'+I.x+'</button>'+
  '<h2 id="rsv-t">Prenota il tuo tavolo</h2><p class="sub">Niente attese: scegli giorno e ora, ti ricontattiamo per confermare.</p>'+
  '<form class="form" data-booking novalidate>'+
   '<div><label for="r-nome">Nome</label><input id="r-nome" name="nome" required autocomplete="name"></div>'+
   '<div><label for="r-tel">Telefono</label><input id="r-tel" name="telefono" type="tel" required autocomplete="tel"></div>'+
   '<div><label for="r-data">Data</label><input id="r-data" name="data" type="date" required></div>'+
   '<div><label for="r-ora">Ora</label><input id="r-ora" name="ora" type="time" required></div>'+
   '<div><label for="r-pers">Persone</label><select id="r-pers" name="persone" required><option value="">Quante?</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7-10</option><option>Più di 10</option></select></div>'+
   '<div><label for="r-mom">Momento</label><select id="r-mom" name="momento"><option>Pranzo</option><option selected>Aperitivo</option><option>Dopocena</option><option>Evento o festa</option></select></div>'+
   '<div class="full"><label for="r-msg">Note</label><textarea id="r-msg" name="messaggio" placeholder="Compleanno, tavolo fuori, esigenze particolari"></textarea></div>'+
   '<label class="full priv"><input type="checkbox" required><span>Ho letto l\'<a href="privacy.html">informativa privacy</a> e acconsento a essere ricontattato.</span></label>'+
   '<div class="full"><button class="btn btn-fill" type="submit">Invia la richiesta</button></div>'+
  '</form><div class="form-ok" role="status"><p>Richiesta pronta. Nella demo la prenotazione arriva al locale su WhatsApp, già compilata.</p><a class="btn btn-fill" style="margin-top:14px" target="_blank" rel="noopener" href="#">Invia su WhatsApp</a></div></div></div>';
}

/* ---------- Universo: stelle + parallasse (come data-scroll-speed di Paradiso) ---------- */
function universe(){
  var st=document.querySelector('.u-stars');
  if(st){ var h=''; for(var i=0;i<70;i++){ var big=i<6; h+='<i class="'+(big?'big':'')+'" style="left:'+(Math.random()*100).toFixed(2)+'%;top:'+(Math.random()*62).toFixed(2)+'%;animation-delay:'+(Math.random()*3).toFixed(2)+'s;animation-duration:'+(2+Math.random()*3).toFixed(2)+'s"></i>'; } st.innerHTML=h; }
  var word=document.querySelector('.u-word');
  if(word){ var t=word.textContent; word.innerHTML=t.split('').map(function(c,i){ return '<span style="animation-delay:'+(1.6+i*0.28).toFixed(2)+'s">'+c+'</span>'; }).join(''); }
  var items=[].slice.call(document.querySelectorAll('[data-speed]'));
  var hdr=document.querySelector('.hdr'), ticking=false, reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function upd(){
    var y=window.pageYOffset;
    if(!reduce) items.forEach(function(el){
      var s=parseFloat(el.getAttribute('data-speed')), p=el.parentElement.getBoundingClientRect();
      if(p.bottom<-200||p.top>innerHeight+200) return;
      /* nell'universo: come Paradiso (scroll assoluto); altrove: relativo al centro della sezione */
      var d = el.closest('.universe') ? -(y/s) : -((p.top+p.height/2-innerHeight/2)/s);
      el.style.transform='translate3d(0,'+d.toFixed(1)+'px,0)'+(el.tagName==='IMG'?' scale(1.12)':'');
    });
    if(hdr && document.body.getAttribute('data-page')==='home') hdr.classList.toggle('solid',y>innerHeight*.6);
    ticking=false;
  }
  window.addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(upd); ticking=true; } },{passive:true});
  upd();
}

/* ---------- Testo che si ricompone lettera per lettera (SplitText di Paradiso) ---------- */
function splitChars(){
  document.querySelectorAll('.split-chars').forEach(function(el){
    var words=el.textContent.trim().split(/\s+/);
    el.innerHTML=words.map(function(w){ return '<span style="display:inline-block;white-space:nowrap">'+w.split('').map(function(c){
      var k=Math.min(1,innerWidth/1200), x=((Math.random()*600-300)*k)|0, y=((Math.random()*400-200)*k)|0, r=(Math.random()*90-45)|0;
      return '<span class="ch" style="opacity:0;transform:translate('+x+'px,'+y+'px) rotate('+r+'deg) scale(.2)">'+c+'</span>';
    }).join('')+'</span>'; }).join(' ');
    el.classList.add('pending');
  });
}
function playSplit(el){
  el.querySelectorAll('.ch').forEach(function(ch,i){ ch.style.transition='opacity 1.4s ease '+(i*0.025).toFixed(3)+'s, transform 1.8s cubic-bezier(.2,.8,.2,1) '+(i*0.025).toFixed(3)+'s'; requestAnimationFrame(function(){ ch.style.opacity='1'; ch.style.transform='none'; }); });
}

/* ---------- Reveal ---------- */
function reveal(){
  var els=document.querySelectorAll('.rv, .split-chars');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); if(e.classList.contains('split-chars')) playSplit(e); }); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); if(x.target.classList.contains('split-chars')) playSplit(x.target); io.unobserve(x.target); } }); },{threshold:.15});
  els.forEach(function(e){ io.observe(e); });
}

/* ---------- Galleria cocktail ---------- */
function drinks(){
  var tr=document.getElementById('track'); if(!tr) return;
  tr.innerHTML=C.drinks.map(function(d){ return '<article class="drink"><figure><img src="assets/img/'+d.img+'" alt="'+d.n+'" loading="lazy"></figure><div class="drink-b"><h3>'+d.n+'<small>'+d.p+'</small></h3><p>'+d.i+'</p><div class="notes">'+d.t+'</div></div></article>'; }).join('');
  var step=function(){ var c=tr.querySelector('.drink'); return c? c.getBoundingClientRect().width+28 : 400; };
  var p=document.querySelector('[data-prev]'), n=document.querySelector('[data-next]');
  if(p) p.innerHTML=I.l; if(n) n.innerHTML=I.r;
  if(p) p.onclick=function(){ tr.scrollBy({left:-step()}); };
  if(n) n.onclick=function(){ tr.scrollBy({left:step()}); };
}

/* ---------- Orari ---------- */
function toMin(t){ var p=t.split(':'); return +p[0]*60+ +p[1]; }
function isOpen(d){ var day=d.getDay(), m=d.getHours()*60+d.getMinutes();
  function inR(f,s){ var a=toMin(f[0]), b=toMin(f[1]); if(b<=a) b+=1440; return m+s>=a && m+s<b; }
  if(C.orari[day].f.some(function(f){return inR(f,0);})) return true;
  return C.orari[(day+6)%7].f.some(function(f){ return toMin(f[1])<=toMin(f[0]) && inR(f,1440); }); }
function hours(){
  var today=new Date().getDay();
  document.querySelectorAll('[data-hours]').forEach(function(t){ t.innerHTML=[1,2,3,4,5,6,0].map(function(i){var o=C.orari[i];return '<tr'+(i===today?' class="today"':'')+'><td>'+o.g+'</td><td>'+(o.f.length?o.f.map(function(f){return f[0]+' - '+f[1];}).join('<br>'):'<span class="closed">CHIUSO</span>')+'</td></tr>';}).join(''); });
  document.querySelectorAll('[data-open-now]').forEach(function(el){ var y=isOpen(new Date()); el.classList.toggle('yes',y); el.innerHTML='<i></i>'+(y?'Adesso siamo aperti':'Ora chiusi, a presto'); });
}

/* ---------- Modale + form ---------- */
function booking(){
  var m=document.getElementById('rsv'); if(!m) return;
  function open(e){ if(e) e.preventDefault(); document.body.classList.remove('nav-open'); m.classList.add('open'); setTimeout(function(){ var f=m.querySelector('input'); if(f) f.focus(); },100); }
  function close(){ m.classList.remove('open'); }
  document.querySelectorAll('[data-rsv]').forEach(function(b){ b.addEventListener('click',open); });
  m.querySelector('.x').onclick=close;
  m.addEventListener('click',function(e){ if(e.target===m) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  if(location.hash==='#prenota') open();
  var f=m.querySelector('form'), d=f.querySelector('[name=data]'); d.min=new Date().toISOString().slice(0,10);
  f.addEventListener('submit',function(e){ e.preventDefault(); if(!f.checkValidity()){ f.reportValidity(); return; }
    var v=function(n){ var x=f.querySelector('[name='+n+']'); return x?x.value.trim():''; };
    var dt=v('data').split('-').reverse().join('/');
    var msg='Ciao Classico! Vorrei prenotare un tavolo.\nNome: '+v('nome')+'\nPersone: '+v('persone')+'\nData: '+dt+'\nOra: '+v('ora')+'\nMomento: '+v('momento')+(v('messaggio')?'\nNote: '+v('messaggio'):'')+'\nTelefono: '+v('telefono');
    var ok=m.querySelector('.form-ok'); ok.classList.add('show'); ok.querySelector('a').href=C.info.wa+'?text='+encodeURIComponent(msg); });
}

/* ---------- Menu completo ---------- */
function menu(){
  var host=document.getElementById('menu-app'); if(!host||!window.CLASSICO_MENU) return;
  var M=window.CLASSICO_MENU;
  host.innerHTML='<div class="tabs" role="tablist">'+M.map(function(g,i){return '<button role="tab" aria-selected="'+(i===0)+'" data-g="'+i+'">'+g.titolo+'</button>';}).join('')+'</div>'+
  M.map(function(g,i){ return '<div class="mgroup'+(i===0?' on':'')+'" data-p="'+i+'"><div class="mhead"><img src="'+g.img+'" alt="'+g.alt+'" loading="lazy"><div>'+g.sezioni.map(function(s){ return '<div class="msec"><h3>'+s.titolo+(s.nota?'<small>'+s.nota+'</small>':'')+'</h3>'+s.voci.map(function(v){ return '<div class="item"><b>'+v[0]+'</b><span class="pr">'+(v[1]||'')+'</span>'+(v[2]?'<p>'+v[2]+'</p>':'')+(v[3]?'<span class="al">Allergeni: '+v[3]+'</span>':'')+'</div>'; }).join('')+'</div>'; }).join('')+'</div></div></div>'; }).join('');
  host.querySelectorAll('.tabs button').forEach(function(b){ b.onclick=function(){ host.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-selected','false');}); b.setAttribute('aria-selected','true'); host.querySelectorAll('.mgroup').forEach(function(p){ p.classList.toggle('on',p.getAttribute('data-p')===b.getAttribute('data-g')); }); window.scrollTo({top:host.offsetTop-120,behavior:'smooth'}); }; });
}

/* ---------- Protezione demo ---------- */
function protezioneDemo(){
  if(!C.protect) return;
  var stop=function(e){ e.preventDefault(); };
  document.addEventListener('contextmenu',stop);
  document.addEventListener('copy',stop);
  document.addEventListener('dragstart',function(e){ if(e.target.tagName==='IMG') e.preventDefault(); });
  document.addEventListener('selectstart',function(e){ if(!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) e.preventDefault(); });
  document.addEventListener('keydown',function(e){ var k=(e.key||'').toLowerCase(); if(e.key==='F12'||((e.ctrlKey||e.metaKey)&&(k==='u'||k==='s'||k==='p'))||((e.ctrlKey||e.metaKey)&&e.shiftKey&&(k==='i'||k==='j'||k==='c'))) e.preventDefault(); });
  try{ console.log('%cDemo riservata Studio Digital Italia - riproduzione non autorizzata','font:600 13px sans-serif;color:#AD9F8D'); }catch(_){}
}

document.addEventListener('DOMContentLoaded',function(){
  var h=document.getElementById('site-header'); if(h) h.outerHTML=header();
  var f=document.getElementById('site-footer'); if(f) f.outerHTML=footer();
  var b=document.querySelector('.burger');
  if(b) b.onclick=function(){ var o=document.body.classList.toggle('nav-open'); b.setAttribute('aria-expanded',o); };
  document.querySelectorAll('.nav a').forEach(function(a){ a.addEventListener('click',function(){ document.body.classList.remove('nav-open'); }); });
  universe(); drinks(); splitChars(); hours(); booking(); menu(); reveal(); protezioneDemo();
});
})();
