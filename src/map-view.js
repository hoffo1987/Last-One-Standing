/* Lettura della geografia registrata, senza ricostruire la partita. */
(function(G){
  'use strict';
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bare=s=>s.replace(/^(?:il |lo |la |l['’]|i |gli |le )/i,'');
  const level=(v,kind)=>kind==='shelter'?(v>=0.7?'buono':v>=0.45?'discreto':'scarso'):(v>=1.35?'alte':v>=0.95?'medie':'basse');
  function graph(zones,closed,counts,selected){
    const points=zones.map((z,i)=>i===6?[180,160]:[180+126*Math.sin(i*Math.PI/3),160-123*Math.cos(i*Math.PI/3)]);
    const lines=zones.flatMap(z=>z.links.filter(to=>to>z.id).map(to=>{
      const a=points[z.id],b=points[to],cls=closed.has(z.id)||closed.has(to)?'shut':'',dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
      const acrossHub=zones.length===7&&z.id!==6&&to!==6&&Math.abs(dx*(160-a[1])-dy*(180-a[0]))/length<27;
      if(acrossHub)return '<path d="M '+a[0]+' '+a[1]+' Q '+((a[0]+b[0])/2-dy/length*90)+' '+((a[1]+b[1])/2+dx/length*90)+' '+b[0]+' '+b[1]+'" class="'+cls+'"/>';
      return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" class="'+cls+'"/>';
    })).join('');
    return '<div class="arena-graph" role="group" aria-label="Collegamenti tra le zone: le linee tratteggiate indicano i passaggi chiusi"><svg viewBox="0 0 360 320" aria-hidden="true">'+lines+'</svg>'+zones.map((z,i)=>{const occupancy=counts[i]+' '+(counts[i]===1?'presente':'presenti');return '<button type="button" class="map-node'+(closed.has(i)?' shut':'')+(selected===i?' selected':'')+'" style="left:'+(points[i][0]/3.6)+'%;top:'+(points[i][1]/3.2)+'%" data-map-zone="'+i+'" aria-pressed="'+(selected===i)+'" aria-label="'+esc(bare(z.name))+': '+occupancy+(closed.has(i)?', zona chiusa':'')+'"><b>'+(i+1)+'</b><span>'+esc(bare(z.name))+'</span><small>'+occupancy+'</small></button>';}).join('')+'</div>';
  }
  function render(result,phaseIndex,options={}){
    const phase=result.phases[phaseIndex];if(!phase)return '';
    const spatial=result.spatial,theme=options.theme,by=Object.fromEntries(result.tributes.map(t=>[t.id,t]));
    const zones=spatial?.zones||theme.lex.luogo.map((name,id)=>({id,name,links:[],resources:options.properties?.[id]?.[0]??1,danger:options.properties?.[id]?.[1]??1,shelter:options.properties?.[id]?.[2]??0.5,description:''}));
    const closureReason=id=>spatial?.closures.filter(c=>c.zone===id&&c.ph<=phaseIndex).at(-1)?.reason;
    const closed=new Set(phase.snap.closed||[]),selected=zones[options.selected]?options.selected:null;
    const present=z=>phase.snap.alive.filter(id=>phase.snap.zones[id]===z);
    const name=id=>by[id]?.name||'Concorrente';
    const person=id=>'<button type="button" class="map-person" data-prof="'+esc(id)+'">'+esc(name(id))+'</button>';
    const deaths=spatial?.deaths.filter(d=>d.ph===phaseIndex)||[];
    const moves=spatial?.moves.filter(m=>m.ph===phaseIndex)||[];
    const locations=phase.events.map((e,index)=>({e,index})).filter(({e})=>e.place&&e.place.zone!=null);
    const traps=phase.snap.terrain?.traps||[],loot=phase.snap.terrain?.loot||[];
    const cards=zones.filter(z=>selected==null||selected===z.id).map(z=>{
      const here=present(z.id),fallen=deaths.filter(d=>d.zone===z.id),events=locations.filter(x=>x.e.place.zone===z.id&&!x.e.note);
      const tz=traps.filter(t=>t.zone===z.id),lz=loot.find(x=>x.zone===z.id),affected=phase.affectedZones?.includes(z.id);
      return '<article class="zone'+(closed.has(z.id)?' closed':'')+(fallen.length?' hot':'')+'"><h4><button type="button" data-map-zone="'+z.id+'">'+(z.id+1)+'. '+esc(bare(z.name))+'</button></h4><p class="help">'+esc(z.description)+'</p><p class="map-properties">Risorse '+level(z.resources)+' · Pericolo '+level(z.danger).replace('alte','alto').replace('medie','medio').replace('basse','basso')+' · Riparo '+level(z.shelter,'shelter')+'</p>'+(closed.has(z.id)?'<p class="ztag">'+(closureReason(z.id)==='finale'?'Accesso chiuso per lo scontro finale':'Zona chiusa dalla tempesta')+'</p>':'')+(affected?'<p class="ztag">Area del disastro in questa fase</p>':'')+'<div class="dots">'+here.map(id=>options.avatar?options.avatar(by[id]):person(id)).join('')+'</div><p class="help">'+(here.length?here.map(id=>esc(name(id))).join(', '):'Nessun concorrente presente a fine fase.')+'</p>'+(fallen.length?'<p class="map-fallen">'+(theme.soft?'Usciti dai giochi qui':'Morti qui')+': '+fallen.map(d=>person(d.id)).join(', ')+'</p>':'')+(tz.length?'<details><summary>'+tz.length+' '+(theme.soft?(tz.length===1?'tranello':'tranelli'):(tz.length===1?'trappola':'trappole'))+(tz.length===1?(theme.soft?' ancora attivo':' ancora attiva'):' ancora attivi')+'</summary><ul>'+tz.map(t=>'<li>'+esc(t.name)+' · '+person(t.owner)+'</li>').join('')+'</ul></details>':'')+(lz?'<p class="help">Bottino rimasto: '+lz.count+' '+(lz.count===1?'oggetto':'oggetti')+'.</p>':'')+(spatial?'<p class="map-links">Passaggi: '+z.links.map(id=>'<button type="button" data-map-zone="'+id+'">'+esc(bare(zones[id].name))+(closed.has(id)?' (chiuso)':'')+'</button>').join(' · ')+'</p>':'')+(events.length?'<details><summary>'+events.length+' '+(events.length===1?'fatto avvenuto qui':'fatti avvenuti qui')+'</summary><ol class="map-events">'+events.sort((a,b)=>a.e.place.seq-b.e.place.seq).map(({e,index})=>'<li><button type="button" data-map-event="'+index+'">'+esc(e.plain)+'</button></li>').join('')+'</ol></details>':'')+'</article>';
    }).join('');
    const journeys=moves.filter(m=>selected==null||m.path.includes(selected));
    const remembered=(result.chronicle?.facts||[]).filter(f=>f.ph<=phaseIndex&&(selected==null||f.zone===selected));
    const history=remembered.length?'<details class="map-memory"><summary>Memoria '+(selected==null?'dell’arena':'del luogo')+' · '+remembered.length+' fatti</summary><ol>'+remembered.map(f=>'<li><b>G'+f.day+' · Fase '+(f.ph+1)+' · '+esc(bare(zones[f.zone].name))+'</b><p>'+esc(f.plain)+'</p></li>').join('')+'</ol></details>':'';
    return '<div class="map-view"><p class="map-caption"><b>Posizioni a fine fase '+(phaseIndex+1)+'</b><br>'+ (spatial?'I fatti e i percorsi sotto raccontano anche i passaggi precedenti della stessa fase. Le linee indicano i collegamenti, non distanze in metri.':'Replay storico: sono disponibili le posizioni salvate a fine fase. Percorsi e luoghi dei singoli eventi non erano registrati.')+'</p>'+(spatial?graph(zones,closed,zones.map(z=>present(z.id).length),selected):'')+(selected!=null?'<button class="btn sm" type="button" data-map-zone="all">Mostra tutte le zone</button>':'')+'<div class="map">'+cards+'</div>'+history+(spatial?'<details class="map-journeys"'+(journeys.length<9?' open':'')+'><summary>Spostamenti della fase'+(selected!=null?' in questa zona':'')+' · '+journeys.length+'</summary>'+(journeys.length?'<ol>'+journeys.sort((a,b)=>a.seq-b.seq).map(m=>'<li>'+person(m.id)+'<span class="map-route">'+m.path.map(z=>esc(bare(zones[z].name))).join(' → ')+'</span><span class="help">'+esc(m.reason)+' · Energia −'+m.cost.toLocaleString('it-IT')+'</span></li>').join('')+'</ol>':'<p class="help">Nessun cambio di zona registrato in questa fase.</p>')+'</details>':'')+'</div>';
  }
  G.LOS_MAP_VIEW={render,graph};if(typeof module==='object'&&module.exports)module.exports=G.LOS_MAP_VIEW;
})(typeof window!=='undefined'?window:globalThis);
