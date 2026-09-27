/* Classico Vicenza - demo Studio Digital Italia
   Header e footer iniettati qui (funziona anche aprendo i file da disco). */
(function(){
'use strict';
var C = window.CLASSICO = window.CLASSICO || {};

/* Demo privata: protezione anti-copia attiva. Mettere false quando diventa il sito reale. */
C.protect = true;

C.info = {
  nome:'Classico Vicenza',
  payoff:['Food','Drink','Friends'],
  tel:'351 617 8115', telLink:'+393516178115',
  wa:'https://wa.me/393516178115',
  indirizzo:'Via San Carlo 10', citta:'36030 Costabissara (VI)',
  maps:'https://maps.google.com/?cid=5723719041893053075',
  ig:'https://www.instagram.com/classico.vicenza/',
  fb:'https://www.facebook.com/classico.vicenza'
};

/* 0 = domenica ... 6 = sabato. Orari dal 25/08/2026 (post Instagram) */
C.orari = [
  {g:'Domenica',  f:[['11:00','14:30'],['17:00','22:00']]},
  {g:'Lunedì',    f:[]},
  {g:'Martedì',   f:[['9:00','14:30'],['17:00','23:00']]},
  {g:'Mercoledì', f:[['10:00','14:30'],['17:00','00:00']]},
  {g:'Giovedì',   f:[['10:00','14:30'],['17:00','00:00']]},
  {g:'Venerdì',   f:[['10:00','14:30'],['17:00','01:00']]},
  {g:'Sabato',    f:[['11:00','14:30'],['17:00','01:00']]}
];

var I = {
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M8 7h8M8 11h6"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm8.4-18.3A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.5 11.9 11.9 0 0 0 8.4-20.3z"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 9l7 7 7-7"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  l:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
  r:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
};
C.icons = I;

function logo(){
  return '<span class="logo" aria-label="Classico"><b>classico</b><small class="dots"><span>Food</span><span>Drink</span><span>Friends</span></small></span>';
}
C.logo = logo;

function header(){
  var page = document.body.getAttribute('data-page') || '';
  var links = [['index.html','Home','home'],['menu.html','Menu','menu'],['eventi.html','Eventi','eventi'],['dove-siamo.html','Dove siamo','dove'],['galleria.html','Galleria','galleria']];
  var nav = links.map(function(l){ return '<a href="'+l[0]+'"'+(l[2]===page?' aria-current="page"':'')+'>'+l[1]+'</a>'; }).join('');
  return '<a class="skip" href="#main">Vai al contenuto</a>'+
  '<header class="hdr"><div class="wrap">'+
    '<a href="index.html" aria-label="Classico, torna alla home">'+logo()+'</a>'+
    '<nav class="nav" id="nav" aria-label="Menu principale">'+nav+'</nav>'+
    '<div class="hdr-cta">'+
      '<a class="ico-btn" href="tel:'+C.info.telLink+'" aria-label="Chiama '+C.info.tel+'">'+I.phone+'</a>'+
      '<a class="btn btn-amber" href="index.html#prenota">Prenota</a>'+
      '<button class="burger" aria-label="Apri il menu" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button>'+
    '</div>'+
  '</div></header>';
}

function footer(){
  var o = C.orari, rows = [1,2,3,4,5,6,0].map(function(i){
    return '<li><span>'+o[i].g.slice(0,3)+'</span><span>'+(o[i].f.length? o[i].f.map(function(f){return f[0]+'-'+f[1];}).join('<br>') : 'chiuso')+'</span></li>';
  }).join('');
  return '<footer class="ftr"><div class="wrap"><div class="ftr-grid">'+
    '<div>'+logo()+'<p style="margin-top:20px;max-width:280px">Il vostro posto del cuore. Buon cibo, drink e musica a Costabissara, a due passi da Vicenza.</p>'+
      '<div class="social"><a class="ico-btn" href="'+C.info.ig+'" target="_blank" rel="noopener" aria-label="Instagram">'+I.ig+'</a><a class="ico-btn" href="'+C.info.fb+'" target="_blank" rel="noopener" aria-label="Facebook">'+I.fb+'</a><a class="ico-btn" href="'+C.info.wa+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+I.wa+'</a></div></div>'+
    '<div><h5>Contatti</h5><ul>'+
      '<li>'+I.pin+'<a href="'+C.info.maps+'" target="_blank" rel="noopener">'+C.info.indirizzo+'<br>'+C.info.citta+'</a></li>'+
      '<li>'+I.phone+'<a href="tel:'+C.info.telLink+'">'+C.info.tel+'</a></li>'+
      '<li>'+I.ig+'<a href="'+C.info.ig+'" target="_blank" rel="noopener">@classico.vicenza</a></li></ul></div>'+
    '<div><h5>Orari</h5><ul class="oh">'+rows+'</ul></div>'+
    '<div><h5>Esplora</h5><ul><li><a href="menu.html">Il menu</a></li><li><a href="eventi.html">Eventi e aperitivi</a></li><li><a href="index.html#fidelity">Fidelity card</a></li><li><a href="index.html#prenota">Prenota un tavolo</a></li><li><a href="dove-siamo.html">Come arrivare</a></li><li><a href="galleria.html">Galleria</a></li></ul></div>'+
  '</div>'+
  '<div class="ftr-bot"><span>&copy; '+new Date().getFullYear()+' Classico Vicenza - Paola Cazzola S.r.l. - P.IVA da inserire</span><span><a href="privacy.html">Privacy e cookie</a> - Sito realizzato da <a href="https://studiodigitalitalia.it" target="_blank" rel="noopener">Studio Digital Italia</a></span></div>'+
  '</div></footer>'+
  '<a class="wa" href="'+C.info.wa+'?text='+encodeURIComponent('Ciao Classico! Vorrei informazioni')+'" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">'+I.wa+'</a>'+
  '<div class="demo-bar">Demo riservata - anteprima</div>';
}

/* ---------- Orari: tabella + aperto ora ---------- */
function toMin(t){ var p=t.split(':'); var m=+p[0]*60+ +p[1]; return m; }
function isOpen(d){
  var day=d.getDay(), m=d.getHours()*60+d.getMinutes();
  function inRange(f,shift){ var a=toMin(f[0]), b=toMin(f[1]); if(b<=a) b+=1440; return (m+shift)>=a && (m+shift)<b; }
  if (C.orari[day].f.some(function(f){return inRange(f,0);})) return true;
  var prev=(day+6)%7; /* fasce che passano la mezzanotte */
  return C.orari[prev].f.some(function(f){ return toMin(f[1])<=toMin(f[0]) && inRange(f,1440); });
}
function renderHours(){
  document.querySelectorAll('[data-hours]').forEach(function(t){
    var today=new Date().getDay();
    t.innerHTML=[1,2,3,4,5,6,0].map(function(i){
      var o=C.orari[i];
      return '<tr'+(i===today?' class="today"':'')+'><td>'+o.g+'</td><td>'+(o.f.length?o.f.map(function(f){return f[0]+' - '+f[1];}).join('<br>'):'<span class="closed">CHIUSO</span>')+'</td></tr>';
    }).join('');
  });
  document.querySelectorAll('[data-open-now]').forEach(function(el){
    var y=isOpen(new Date());
    el.classList.toggle('yes',y);
    el.innerHTML='<i></i>'+(y?'Adesso siamo aperti':'Adesso siamo chiusi, ti aspettiamo presto');
  });
}

/* ---------- Form prenotazione (demo: prepara il messaggio WhatsApp) ---------- */
function forms(){
  document.querySelectorAll('form[data-booking]').forEach(function(f){
    var d=f.querySelector('[name=data]'); if(d){ var t=new Date(); d.min=t.toISOString().slice(0,10); }
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(!f.checkValidity()){ f.reportValidity(); return; }
      var v=function(n){ var x=f.querySelector('[name='+n+']'); return x?x.value.trim():''; };
      var dt=v('data'); if(dt){ var p=dt.split('-'); dt=p[2]+'/'+p[1]+'/'+p[0]; }
      var msg='Ciao Classico! Vorrei prenotare un tavolo.\nNome: '+v('nome')+'\nPersone: '+v('persone')+'\nData: '+dt+'\nOra: '+v('ora')+'\nMomento: '+v('momento')+(v('messaggio')?'\nNote: '+v('messaggio'):'')+'\nTelefono: '+v('telefono');
      var ok=f.parentNode.querySelector('.form-ok');
      if(ok){ ok.classList.add('show'); ok.querySelector('a').href=C.info.wa+'?text='+encodeURIComponent(msg); ok.scrollIntoView({behavior:'smooth',block:'center'}); }
    });
  });
}

/* ---------- Menu (dati reali dal menu digitale del locale) ---------- */
function renderMenu(){
  var host=document.getElementById('menu-app'); if(!host || !window.CLASSICO_MENU) return;
  var M=window.CLASSICO_MENU;
  var tabs='<div class="tabs" role="tablist">'+M.map(function(g,i){ return '<button role="tab" aria-selected="'+(i===0)+'" data-g="'+i+'">'+g.titolo+'</button>'; }).join('')+'</div>';
  var groups=M.map(function(g,i){
    var secs=g.sezioni.map(function(s){
      return '<div class="msec"><h3>'+s.titolo+(s.nota?'<small>'+s.nota+'</small>':'')+'</h3>'+s.voci.map(function(v){
        return '<div class="item"><b>'+v[0]+'</b><span class="pr">'+(v[1]||'')+'</span>'+(v[2]?'<p>'+v[2]+'</p>':'')+(v[3]?'<span class="al">Allergeni: '+v[3]+'</span>':'')+'</div>';
      }).join('')+'</div>';
    }).join('');
    return '<div class="mgroup'+(i===0?' on':'')+'" role="tabpanel" data-p="'+i+'"><div class="mhead"><img src="'+g.img+'" alt="'+g.alt+'" loading="lazy"><div>'+secs+'</div></div></div>';
  }).join('');
  host.innerHTML=tabs+groups;
  host.querySelectorAll('.tabs button').forEach(function(b){
    b.addEventListener('click',function(){
      host.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-selected','false');});
      b.setAttribute('aria-selected','true');
      host.querySelectorAll('.mgroup').forEach(function(p){p.classList.toggle('on',p.getAttribute('data-p')===b.getAttribute('data-g'));});
    });
  });
}

/* ---------- Lightbox galleria ---------- */
function lightbox(){
  var links=[].slice.call(document.querySelectorAll('[data-lb]')); if(!links.length) return;
  var lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-label','Foto');
  lb.innerHTML='<img alt=""><button class="x" aria-label="Chiudi">'+I.x+'</button><button class="pv" aria-label="Foto precedente">'+I.l+'</button><button class="nx" aria-label="Foto successiva">'+I.r+'</button>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'), cur=0;
  function show(i){ cur=(i+links.length)%links.length; img.src=links[cur].getAttribute('href'); img.alt=(links[cur].querySelector('img')||{}).alt||''; lb.classList.add('open'); }
  links.forEach(function(a,i){ a.addEventListener('click',function(e){ e.preventDefault(); show(i); }); });
  lb.querySelector('.x').onclick=function(){ lb.classList.remove('open'); };
  lb.querySelector('.pv').onclick=function(){ show(cur-1); };
  lb.querySelector('.nx').onclick=function(){ show(cur+1); };
  lb.addEventListener('click',function(e){ if(e.target===lb) lb.classList.remove('open'); });
  document.addEventListener('keydown',function(e){ if(!lb.classList.contains('open')) return; if(e.key==='Escape') lb.classList.remove('open'); if(e.key==='ArrowLeft') show(cur-1); if(e.key==='ArrowRight') show(cur+1); });
}

/* ---------- Reveal on scroll ---------- */
function reveal(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }); },{threshold:.12});
  els.forEach(function(e){ io.observe(e); });
}

/* ---------- Protezione demo (standard Be Digital) ---------- */
function protezioneDemo(){
  if(!C.protect) return;
  var stop=function(e){ e.preventDefault(); return false; };
  document.addEventListener('contextmenu',stop);
  document.addEventListener('dragstart',function(e){ if(e.target.tagName==='IMG') e.preventDefault(); });
  document.addEventListener('copy',stop);
  document.addEventListener('selectstart',function(e){ if(!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) e.preventDefault(); });
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if(e.key==='F12' || ((e.ctrlKey||e.metaKey) && (k==='u'||k==='s'||k==='p')) || ((e.ctrlKey||e.metaKey) && e.shiftKey && (k==='i'||k==='j'||k==='c'))){ e.preventDefault(); }
  });
  document.documentElement.style.userSelect='none';
  try{ console.log('%cDemo riservata Studio Digital Italia - riproduzione non autorizzata','font:600 13px sans-serif;color:#AB4E17'); }catch(_){}
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded',function(){
  var h=document.getElementById('site-header'); if(h) h.outerHTML=header();
  var f=document.getElementById('site-footer'); if(f) f.outerHTML=footer();
  var b=document.querySelector('.burger');
  if(b) b.addEventListener('click',function(){ var o=document.body.classList.toggle('nav-open'); b.setAttribute('aria-expanded',o); b.setAttribute('aria-label',o?'Chiudi il menu':'Apri il menu'); });
  document.querySelectorAll('.nav a').forEach(function(a){ a.addEventListener('click',function(){ document.body.classList.remove('nav-open'); }); });
  document.querySelectorAll('[data-icon]').forEach(function(el){ el.innerHTML=I[el.getAttribute('data-icon')]||''; });
  renderHours(); forms(); renderMenu(); lightbox(); reveal(); protezioneDemo();
});
})();
