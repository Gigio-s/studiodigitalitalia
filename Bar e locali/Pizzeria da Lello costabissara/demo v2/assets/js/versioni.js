/* Selettore versioni della demo (solo per la presentazione al cliente: togliere prima della pubblicazione).
   La Versione 2 sta nella cartella principale, le altre nelle sottocartelle v3, v4...
   Per aggiungere una versione basta aggiungere una riga qui sotto e la cartella corrispondente. */
(function(){
  var VERSIONI=[
    {n:2, dir:'',    nome:'Versione 2'},
    {n:3, dir:'v3/', nome:'Versione 3'},
    {n:4, dir:'v4/', nome:'Versione 4'}
  ];
  var me=document.currentScript, cur=+(me && me.getAttribute('data-v') || 2);
  var base=cur===2?'':'../';               /* dalla sottocartella si risale alla principale */
  var pag=(location.pathname.split('/').pop()||'index.html');
  function vai(n){
    var v=VERSIONI.filter(function(x){ return x.n===n; })[0]; if(!v) return;
    location.href=base+v.dir+pag+location.search+location.hash;
  }
  function crea(){
    var box=document.createElement('div');
    box.className='vsel';
    box.innerHTML='<label for="vsel-s">Demo</label><select id="vsel-s" aria-label="Scegli la versione della demo">'+
      VERSIONI.map(function(v){ return '<option value="'+v.n+'"'+(v.n===cur?' selected':'')+'>'+v.nome+'</option>'; }).join('')+'</select>';
    var st=document.createElement('style');
    st.textContent='.vsel{position:fixed;left:12px;bottom:12px;z-index:90;display:flex;align-items:center;gap:8px;padding:6px 6px 6px 12px;border-radius:999px;background:#231F20;color:#fff;font:600 11px/1 Montserrat,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 8px 24px -8px rgba(0,0,0,.5)}'+
      '.vsel select{min-height:34px;padding:6px 28px 6px 12px;border:0;border-radius:999px;background:#BF1E2E url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272.5%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E") right 9px center/12px no-repeat;color:#fff;font:600 13px/1 Montserrat,system-ui,sans-serif;-webkit-appearance:none;appearance:none;cursor:pointer}'+
      '@media (max-width:980px){.vsel{bottom:calc(70px + env(safe-area-inset-bottom));left:6px;padding:3px;opacity:.92}.vsel label{display:none}.vsel select{min-height:32px;padding:6px 24px 6px 10px;font-size:11.5px;background-position:right 7px center}}'+
      '@media (max-height:520px) and (orientation:landscape){.vsel{bottom:10px}}';
    document.head.appendChild(st); document.body.appendChild(box);
    box.querySelector('select').addEventListener('change',function(){ vai(+this.value); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',crea); else crea();
})();
