// studio dgtl: header compatto e menu "Accedi" sulle pagine interne
(function(){
  var nav=document.getElementById('nav');
  if(nav){var c=false;var f=function(){var y=scrollY;if(!c&&y>80){c=true;nav.classList.add('is-compact')}else if(c&&y<40){c=false;nav.classList.remove('is-compact')}};addEventListener('scroll',f,{passive:true});f();}
  var lg=document.getElementById('bLogin');
  if(lg){var bt=lg.querySelector('button'),mm=document.getElementById('bLoginM');
    bt.onclick=function(e){e.stopPropagation();mm.hidden=!mm.hidden;bt.setAttribute('aria-expanded',!mm.hidden)};
    document.addEventListener('click',function(e){if(!lg.contains(e.target)){mm.hidden=true;bt.setAttribute('aria-expanded','false')}})}
})();
