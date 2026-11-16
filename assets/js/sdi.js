// Studio Digital Italia - script condiviso pagine interne
(function(){
  var nav=document.getElementById('nav');
  if(nav){addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>30)},{passive:true});}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  var b=document.getElementById('burger'),m=document.getElementById('mnav');
  if(b&&m){var set=function(o){document.body.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',o);m.setAttribute('aria-hidden',!o)};
    b.onclick=function(){set(!document.body.classList.contains('menu-open'))};
    m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
    addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});}
  var end=document.querySelector('.endcta,.block.cta');
  if(end){new IntersectionObserver(function(es){document.body.classList.toggle('mbar-hide',es[0].isIntersecting)},{threshold:.2}).observe(end)}
  var t=document.getElementById('ptg');
  if(t){t.querySelectorAll('button').forEach(function(b){b.onclick=function(){t.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});
    document.getElementById('plans-siti').hidden=b.dataset.p!=='siti';document.getElementById('plans-man').hidden=b.dataset.p!=='man'}})}
})();
