// Continuità fisica e narrativa: il replay è controllato come una traccia,
// non soltanto come l'elenco di chi ha vinto.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=path.join(__dirname,'..','src');
for(const f of ['data-core.js','data-themes.js',...fs.readdirSync(path.join(src,'content')).filter(f=>f.endsWith('.js')).sort().map(f=>'content/'+f),'engine.js','replay.js','map-view.js','studio.js'])require(path.join(src,f));
const D=globalThis.LOS_DATA,L=globalThis.LOS,Geo=globalThis.LOS_GEOGRAPHY,Replay=globalThis.LOS_REPLAY,View=globalThis.LOS_MAP_VIEW;
let checks=0;const test=(name,fn)=>{fn();checks++;console.log('OK: '+name);};
const clone=structuredClone;
function stableCast(n=18){return L.randomCast(n,'geografia',2).map((t,i)=>({...t,id:'geo-'+i}));}
test('tutte le arene hanno un grafo connesso, reciproco e proprietà complete',()=>{
  for(const theme of D.themes){const z=Geo.describe(theme,D.eco.arenas[theme.id]);assert.equal(new Set(z.map(x=>x.name)).size,z.length);assert.ok(Geo.connected(z,new Set()));for(const node of z){assert.ok(node.description);assert.ok(node.links.length);for(const to of node.links)assert.ok(z[to].links.includes(node.id));assert.equal(Geo.path(z,node.id,node.id).length,1);}}
  for(const id of ['fantasy','zombie','horror','wasteland','liceo'])assert.equal(Geo.describe(D.themes.find(t=>t.id===id),D.eco.arenas[id]).length,7);
});
test('nomi generici e rifugi rispettano il luogo; Aula magna non viene confusa con le Aule',()=>{
  const fantasy=D.themes.find(t=>t.id==='fantasy'),zones=Geo.describe(fantasy,D.eco.arenas.fantasy),rng={pick:list=>list[0]};
  assert.equal(Geo.rule('{A} segue una luce nella palude.',zones).travel,4);
  assert.equal(Geo.mentions('una torre abbandonata',zones)[0].zone,0);
  assert.notEqual(Geo.pickLex({rifugio:['una torre abbandonata','un cerchio di funghi protettivo']},'rifugio',1,fantasy,zones,rng),'una torre abbandonata');
  assert.equal(Geo.pickLex({rifugio:['una torre abbandonata','un cerchio di funghi protettivo']},'rifugio',0,fantasy,zones,rng),'una torre abbandonata');
  const school=D.themes.find(t=>t.id==='liceo'),sz=Geo.describe(school,D.eco.arenas.liceo);
  assert.deepEqual(Geo.mentions('raggiunge l’Aula magna',sz).map(m=>m.zone),[5]);assert.equal(Geo.mentions('entra in classe',sz)[0].zone,6);
});
test('nessun incontro a distanza; un luogo scritto non trascina persone lontane',()=>{
  const theme=D.themes[0],zones=Geo.describe(theme,D.eco.arenas.classico),a={id:'a',zone:0,alive:true,hp:100,en:100},b={...a,id:'b',zone:1};
  const map=Geo.create({theme,zones,T:[a,b],closed:new Set(),phase:()=>0,hasMap:()=>false,onMap:()=>{}});
  const event=Geo.prepare(L.parseLine('2 al:AB | {A} e {B} fanno un patto.'),theme,zones);assert.equal(map.accepts(event,[a,b]),false);
  b.zone=0;assert.equal(map.accepts(event,[a,b]),true);
  const river=Geo.prepare(L.parseLine('1 +cibo:A | {A} pesca nel Fiume.'),theme,zones);assert.equal(map.accepts(river,[a]),false);a.zone=2;assert.equal(map.accepts(river,[a]),true);
  a.zone=0;const forest=Geo.prepare(L.parseLine('1 | {A} corre nel Bosco.'),theme,zones);assert.equal(forest.space[0].travel,1);assert.equal(map.accepts(forest,[a]),true);
  const far=Geo.prepare(L.parseLine('1 to:3 | {A} cambia luogo.'),theme,zones);assert.equal(map.accepts(far,[a]),false);
  assert.deepEqual(Geo.rule('{A} ferisce {B} di striscio e si dilegua.',zones).depart,[0]);
  assert.deepEqual(Geo.rule('{A} guarda. {B} si dilegua.',zones).depart,[1]);
});
test('ogni tratto costa energia, segue il grafo e rispetta budget e eliminazioni',()=>{
  const theme=D.themes[0],zones=Geo.describe(theme,D.eco.arenas.classico),a={id:'a',zone:0,alive:true,hp:100,en:100};let phase=0;
  const map=Geo.create({theme,zones,T:[a],closed:new Set(),phase:()=>phase,hasMap:()=>false,onMap:()=>{}});
  map.move(a,3,'Cerca un riparo');assert.equal(a.zone,1);assert.equal(a.en,95);assert.deepEqual(map.data.moves[0].path,[0,1]);
  map.move(a,3,'Continua il percorso');assert.equal(a.zone,3);assert.equal(map.move(a,4,'Troppo lontano'),null);
  phase++;map.reset();a.en=0;assert.equal(map.move(a,4,'Senza energie'),null);
  a.en=100;a.alive=false;assert.equal(map.move(a,4,'Già eliminato'),null);a.alive=true;a.hp=0;assert.equal(map.move(a,4,'Morente'),null);
});
test('la mappa oggetto riduce il costo reale; i pericoli interrompono un percorso lungo',()=>{
  const theme=D.themes[0],zones=Geo.describe(theme,D.eco.arenas.classico),a={id:'a',zone:0,alive:true,hp:100,en:100};let bonuses=0;
  const map=Geo.create({theme,zones,T:[a],closed:new Set(),phase:()=>0,hasMap:()=>true,onMap:()=>bonuses++,onEnter:t=>{t.hp=0;}});
  map.move(a,3,'Trasferimento forzato',{forced:true,mode:'gather'});assert.equal(a.zone,1);assert.equal(map.data.moves.length,1);assert.equal(bonuses,1);assert.equal(a.en,96.25);assert.equal(map.data.moves[0].cost,3.75);
});
test('chi fugge può attraversare una zona appena chiusa, pagando ogni tratto',()=>{
  const theme=D.themes.find(t=>t.id==='royale'),zones=Geo.describe(theme,D.eco.arenas.royale),closed=new Set([0,2,3,4]);
  const a={id:'a',zone:2,alive:true,hp:100,en:100};const visited=[];
  const map=Geo.create({theme,zones,T:[a],closed,phase:()=>0,hasMap:()=>false,onMap:()=>{},onEnter:t=>{visited.push(t.zone);if(closed.has(t.zone))t.hp-=8;}});
  assert.equal(map.move(a,1,'Percorso ordinario'),null);map.move(a,1,'Fuga dalla tempesta',{forced:true,mode:'evacuate'});
  assert.deepEqual(visited,[0,1]);assert.equal(a.zone,1);assert.equal(a.hp,92);assert.equal(a.en,90);assert.ok(map.data.moves.every(m=>m.mode==='evacuate'));
});
test('il gruppo sceglie lo stesso riparo: due alleati non si scambiano di posto all’infinito',()=>{
  const theme=D.themes[0],zones=Geo.describe(theme,D.eco.arenas.classico);
  const a=Geo.camp(zones,[0,1]),b=Geo.camp(zones,[1,0]);assert.equal(a,b);assert.ok(zones[a].shelter>=0.7);
  const closed=new Set([a]);assert.notEqual(Geo.camp(zones,[0,1],closed),a);
});
test('le varianti conservano tutti i requisiti, le prove e gli effetti, per tutti i repertori',()=>{
  let variants=0,templates=0;
  for(const theme of D.themes){const zones=Geo.describe(theme,D.eco.arenas[theme.id]),pools=L.buildPools(theme,[],true);for(const [key,list] of Object.entries(pools)){
    const events=key==='disasters'?list.flatMap(d=>d.out):Array.isArray(list)?list:[];
    for(const original of events){templates++;const before=JSON.stringify(original),e=Geo.prepare(original,theme,zones);assert.equal(JSON.stringify(original),before);for(const k of ['req','fx','kills','dies','tags','test','ok','ko'])assert.deepEqual(e[k],original[k],theme.id+' '+k);if(e.adapted)variants++;
      assert.equal(Geo.offTheme(e.text,theme),false,theme.id+': '+e.text);
      for(const gender of ['M','F','N'])assert.doesNotMatch(L.renderSample(e.text,theme.id,gender),/[{}\[\]§]|\bundefined\b/,e.text);
    }
  }const prepared=Geo.preparePools(pools,theme,zones);for(const d of prepared.disasters)assert.equal(Geo.offTheme(d.n+' '+d.intro,theme),false,theme.id+': '+d.intro);
  }assert.ok(variants>80);console.log('  '+templates+' modelli controllati, '+variants+' varianti coerenti.');
});
const games=[];
test('il caso casuale della trappola con autore già eliminato resta archiviabile',()=>{
  const fixture=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/geography-regression.json'),'utf8')),r=L.simulate(fixture.cfg);
  assert.ok(Replay.validate(r));const dead=new Set();for(const phase of r.phases)for(const e of phase.events){assert.ok(e.ids.every(id=>!dead.has(id)),e.plain);e.deaths.forEach(id=>dead.add(id));}
});
test('tracce, incontri, morti e istantanee coincidono in tutte le nove arene',()=>{
  for(const theme of D.themes)for(let i=0;i<4;i++){
    const cfg={cast:stableCast([2,12,24,36][i]),theme:theme.id,seed:'mappa-'+i,maxDays:6,adult:!!(i%2),teamsAllied:i>1,teamWin:i===3,difficulty:['bassa','normale','alta','massacro'][i]};
    const before=clone(cfg),r=L.simulate(cfg);assert.deepEqual(cfg,before);assert.ok(Replay.validate(r),theme.id+' '+i);assert.deepEqual(L.simulate(cfg),r);games.push(r);
    for(const p of r.phases)for(const e of p.events)if(!e.note&&e.origin!=='sys'){assert.ok(e.place);assert.ok(e.ids.every(id=>e.place.positions[id]===e.place.zone));}
    const closed=new Set();for(const c of r.spatial.closures){closed.add(c.zone);assert.ok(Geo.connected(r.spatial.zones,closed));}
  }
});
test('un replay corrotto non può inventare salti, morti o presenze',()=>{
  const r=games.find(r=>r.spatial.moves.length&&r.spatial.deaths.length);assert.ok(r);
  const mutations=[x=>x.spatial.moves[0].from=(x.spatial.moves[0].from+1)%x.spatial.zones.length,x=>x.spatial.moves[0].path=[0,0],x=>x.spatial.deaths[0].zone=(x.spatial.deaths[0].zone+1)%x.spatial.zones.length,x=>x.spatial.moves[0].ph=x.phases.length,x=>x.spatial.zones[0].links.push(0),x=>x.spatial.start[x.tributes[0].id]=999,x=>{const e=x.phases.flatMap(p=>p.events).find(e=>e.place&&e.ids.length);e.place.positions[e.ids[0]]=999;},x=>{x.phases[0].snap.zones[x.tributes[0].id]=999;}];
  for(const mutation of mutations){const bad=clone(r);mutation(bad);assert.equal(Replay.validate(bad),false);}
  const bad=clone(r),victim=bad.spatial.deaths[0],last=bad.phases.at(-1),seq=Math.max(...bad.spatial.moves.map(m=>m.seq),...bad.spatial.deaths.map(m=>m.seq),...bad.spatial.closures.map(m=>m.seq),...bad.phases.flatMap(p=>p.events.filter(e=>e.place).map(e=>e.place.seq)))+1;
  last.events.push({html:'Un autore già eliminato torna ad agire.',plain:'Un autore già eliminato torna ad agire.',ids:[victim.id],deaths:[],cat:'none',origin:'sys',echo:[],place:{seq,zone:victim.zone,positions:{[victim.id]:victim.zone}}});assert.equal(Replay.validate(bad),false);
});
test('mappa e percorso personale non espongono movimenti, trappole o fatti futuri',()=>{
  const r=clone(games.find(r=>r.phases.length>3)),theme=D.themes.find(t=>t.id===r.theme);
  r.spatial.moves.push({...r.spatial.moves[0],ph:2,reason:'SEGRETO_FUTURO'});r.phases[2].snap.terrain.traps.push({zone:0,owner:r.tributes[0].id,name:'TRAPPOLA_FUTURA'});
  r.phases[2].events.push({plain:'EVENTO_FUTURO',place:{zone:0,seq:999}});
  const html=View.render(r,0,{theme});assert.doesNotMatch(html,/SEGRETO_FUTURO|TRAPPOLA_FUTURA|EVENTO_FUTURO/);assert.match(html,/Posizioni a fine fase 1/);assert.match(html,/Riparo/);
  const timeline=globalThis.LOS_STUDIO.personalTimeline(r,r.tributes[0].id,0);assert.ok(timeline.every(p=>p.phase===0&&p.movements.every(m=>m.ph===0)));
});
test('i replay storici restano leggibili senza inventare percorsi',()=>{
  const theme=D.themes[0],r=L.simulate({cast:stableCast(6),theme:theme.id,seed:'legacy',maxDays:3,mapVersion:0});assert.ok(Replay.validate(r));assert.equal(r.spatial,undefined);
  const html=View.render(r,0,{theme,properties:D.eco.arenas.classico.zones});assert.match(html,/Replay storico/);assert.doesNotMatch(html,/arena-graph|Spostamenti della fase/);
});
test('nomi, luoghi e motivi importati restano testo inerte nella mappa',()=>{
  const r=clone(games.find(r=>r.spatial.moves.length)),id=r.tributes[0].id,theme=D.themes.find(t=>t.id===r.theme);r.tributes[0].name='<img src=x onerror=alert(1)>';r.spatial.zones[0].name='<script>luogo</script>';r.spatial.moves.push({...r.spatial.moves[0],ph:0,id,reason:'<iframe>motivo</iframe>'});
  const html=View.render(r,0,{theme});assert.doesNotMatch(html,/<img|<script|<iframe/);assert.match(html,/&lt;iframe&gt;motivo/);
});
console.log('\nOK: '+checks+' gruppi di verifiche della geografia.');
