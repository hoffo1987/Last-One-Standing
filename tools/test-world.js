// Verifica quantità, composizione, accessibilità e conseguenze del repertorio.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=path.join(__dirname,'../src');
for(const f of ['data-core.js','data-themes.js',...fs.readdirSync(path.join(src,'content')).filter(f=>f.endsWith('.js')).sort().map(f=>'content/'+f),'engine.js','replay.js'])require(path.join(src,f));
const D=LOS_DATA,Geo=LOS_GEOGRAPHY,ids=new Set(),categories=['events','traits','trials','deaths','disasters','dialogues','quotes','items'];
// Le prove storiche a una persona creano oggetti: non devono dichiarare
// furti a un rivale non assegnato, né una perdita nel suo inventario.
for(const theme of D.themes.filter(t=>!t.soft)){
  const zones=Geo.describe(theme,D.eco.arenas[theme.id]);
  const examples=(D.packs||[]).filter(p=>p.theme==='*').flatMap(p=>Object.values(p.ev||{}).flatMap(raw=>LOS.parseBlock(raw))).filter(e=>e.n===1&&e.test?.attr==='furt'&&e.ok.fx.some(f=>f.t==='gain'));
  assert.ok(examples.length>=4);
  for(const ev of examples)assert.doesNotMatch(Geo.prepare(ev,theme,zones).text,/rivale|accampamento nemico|altro concorrente|pesta (?:una mano|un piede)|ruba un kit/iu);
}
const station=D.themes.find(t=>t.id==='scifi');
assert.equal(Geo.adaptText('Un fulmine cade su {A}.',station),'Una scarica elettrica colpisce {A}.');
assert.equal(Geo.adaptText('dentro c\'è {cibo}',station),'all’interno trova {cibo}');
const school=D.themes.find(t=>t.id==='liceo'),schoolZones=Geo.describe(school,D.eco.arenas.liceo);
assert.equal(Geo.rule('{A} risponde a un\'interrogazione di filosofia.',schoolZones).at,6);
assert.equal(Geo.rule('{A} prende un due all\'interrogazione.',schoolZones).at,6);
assert.equal(Geo.rule('{A} usa il telefono durante la verifica.',schoolZones).at,6);
assert.equal(Geo.rule('{A} pensa alla verifica di domani.',schoolZones).at,null,'Un pensiero non è una verifica in corso');
assert.equal(Geo.adaptText('{A} ripassa matematica sul bus del ritorno.',school),'{A} ripassa matematica in un angolo tranquillo della scuola.');
let templates=0,renderings=0;
for(const theme of D.themes){
  const world=D.world.compile(theme),zones=Geo.describe(theme,D.eco.arenas[theme.id]),names=D.world.itemNames(world);
  assert.equal(world.scenes.length,30);assert.equal(new Set(world.scenes.map(s=>s.anchor)).size,30);
  assert.equal(new Set(world.scenes.map(s=>s.zone)).size,zones.length);
  for(const category of categories){
    assert.equal(world[category].length,300,theme.id+' '+category);
    const keys=world[category].map(x=>x.raw||x.name||x.n||x.text||x.lines.join(' '));
    assert.equal(new Set(keys).size,300,'Duplicati in '+theme.id+' '+category);
    for(const row of world[category]){assert.ok(!ids.has(row.id),row.id);ids.add(row.id);}
  }
  assert.equal(Object.keys(names).length,10);for(const list of Object.values(names))assert.equal(list.length,30);
  const rows=['events','traits','trials','deaths'].flatMap(k=>world[k]);
  for(const incident of world.disasters){
    assert.ok(zones[incident.zone]);const out=LOS.parseBlock(incident.out,'world');assert.equal(out.length,3);assert.ok(out[0].lethal);assert.equal(out[1].fx[0].s,'ferito');assert.ok(out[2].fx.some(f=>f.t==='vital'&&f.k==='en'&&f.v<0));
    rows.push(...incident.out.split('\n').map(raw=>({raw,zone:incident.zone})));
  }
  const trCounts={},atCounts={};
  for(const row of rows){
    const ev=LOS.parseLine(row.raw,'world'),prepared=Geo.prepare(ev,theme,zones);templates++;
    assert.equal(prepared.adapted,undefined,'Testo sostituito da ripiego: '+theme.id+' '+row.raw);
    assert.ok(prepared.space.every(s=>s.at===row.zone&&s.travel==null&&!s.depart.length&&!s.scatter),'Un testo locale non deve inventare un viaggio: '+row.raw);
    assert.equal(Geo.offTheme(ev.text,theme),false,theme.id+' '+ev.text);
    const roles=Array.from({length:ev.n},(_,i)=>({id:'p'+i,zone:row.zone,alive:true,hp:100,en:100}));
    const map=Geo.create({theme,zones,T:roles,closed:new Set(),phase:()=>0,hasMap:()=>false,onMap:()=>{}});
    assert.ok(map.accepts(prepared,roles),'Scena non eseguibile nella propria zona: '+row.raw);
    roles[0].zone=(row.zone+1)%zones.length;assert.equal(map.accepts(prepared,roles),false,'La scena non deve accadere altrove');
    for(const req of ev.req)if(req.t==='trait')trCounts[req.trait]=(trCounts[req.trait]||0)+1;
    if(ev.test)atCounts[ev.test.attr]=(atCounts[ev.test.attr]||0)+1;
    for(const gender of ['M','F','N']){
      const rendered=LOS.renderSample(ev.text,theme.id,gender);renderings++;
      assert.ok(!/[{}\[\]§]/.test(rendered),'Segnaposto: '+rendered);
      assert.ok(!/\s[,.]|(?<!\.)\.\.(?!\.)|  /.test(rendered),'Punteggiatura: '+rendered);
    }
  }
  for(const trait of D.traits)assert.equal(trCounts[trait.id],10,trait.id);
  for(const attr of D.attrs)assert.equal(atCounts[attr.id],30,attr.id);
  for(const row of world.dialogues.concat(world.quotes)){
    const text=row.text||row.lines.join(' ');assert.equal(Geo.offTheme(text,theme),false,text);
    assert.ok(Geo.mentions(text,zones).every(x=>x.zone===row.zone),text);
  }
  const a={id:'a',hp:100,st:{},owes:{}},b={id:'b',hp:100,st:{}};
  for(const z of zones)for(const kind of ['coppia','alleati','rivali','sconosciuti']){
    const available=D.world.dialogues(world,z.id,kind,a,b);
    assert.ok(available.length,theme.id+' '+kind+' '+z.name);
    assert.ok(available.every(x=>x.zone===z.id&&x.kind===kind&&!x.need));
  }
  const debt=world.dialogues.find(x=>x.need==='debt');a.owes.b='dono';assert.ok(D.world.dialogues(world,debt.zone,debt.kind,a,b).includes(debt));delete a.owes.b;
  assert.ok(!D.world.dialogues(world,debt.zone,debt.kind,a,b).includes(debt));
  const hurt=world.dialogues.find(x=>x.need==='hurt');b.hp=25;assert.ok(D.world.dialogues(world,hurt.zone,hurt.kind,a,b).includes(hurt));b.hp=100;
  assert.ok(!D.world.dialogues(world,hurt.zone,hurt.kind,a,b).includes(hurt));
  const follow=world.dialogues.find(x=>x.need==='aftermath');a.zone=follow.zone;b.zone=follow.zone;
  const history=[{kind:'dis',affectedZones:[follow.zone],worldIncident:{scene:follow.afterScene,exposed:['a','b']}}];
  assert.ok(D.world.dialogues(world,follow.zone,follow.kind,a,b,history).includes(follow));
  assert.equal(D.world.follows(follow.afterScene,follow.zone,[a,{...b,id:'c'}],history),false,'Nessun ricordo inventato per chi non era presente');
  assert.equal(D.world.follows(follow.afterScene+1,follow.zone,[a,b],history),false,'Nessun ricordo di un altro incidente');
  assert.equal(D.world.follows(follow.afterScene,follow.zone,[a,b],history.concat(Array(8).fill({}))),true,'Il fatto vissuto resta ricordato oltre otto fasi');
  assert.equal(D.world.follows(follow.afterScene,follow.zone,[a,{...b,zone:(follow.zone+1)%zones.length}],history),false,'Nessun dialogo a distanza');
  const pools=LOS.buildPools(theme,[],false),historical=LOS.buildPools(theme,[],false,false);
  assert.equal(pools.world,world);assert.equal(historical.world,undefined);
  assert.equal(pools.disasters.length-historical.disasters.length,300);
  for(const category of ['events','traits','trials','deaths'])for(const row of world[category])assert.ok(pools[row.phase].some(e=>e.contentId===row.id));
  for(const type of Object.keys(names))assert.ok(names[type].every(n=>pools.lex[type].includes(n)),theme.id+' oggetti '+type);
  console.log('OK: '+theme.id+' — 300 per ciascuno degli otto repertori, 30 situazioni, tutte le zone/tratti/caratteristiche.');
}
assert.equal(ids.size,21600);
console.log('OK: '+templates+' modelli e '+renderings+' accordi grammaticali; nessun ripiego geografico o contenuto irraggiungibile.');
// Il catalogo non deve mutare per effetto di una partita; gli esiti sono salvati.
const before=JSON.stringify(D.world.compile(D.themes[0])),localData=new Map();
globalThis.localStorage={getItem:k=>localData.get(k)||null,setItem:(k,v)=>localData.set(k,v)};
(async()=>{for(const theme of D.themes){
  const cfg={cast:LOS.randomCast(24,'mondo-cast',3),theme:theme.id,seed:'mondo-'+theme.id,maxDays:12};
  const result=LOS.simulate(cfg);assert.ok(LOS_REPLAY.validate(result),theme.id+' replay');assert.deepEqual(result,LOS.simulate(cfg));
  const selected=result.phases.flatMap(p=>p.events).filter(e=>e.contentId);
  assert.ok(selected.length>=3,theme.id+' espansione effettivamente estratta');
  assert.ok(selected.every(e=>e.place&&(ids.has(e.contentId)||e.contentCategory==='disasters')));
  for(const [ph,phase] of result.phases.entries()){
    for(const event of phase.events){
      const row=D.world.compile(theme).events.concat(D.world.compile(theme).dialogues).find(x=>x.id===event.contentId);
      if(row?.afterScene!=null)assert.ok(D.world.follows(row.afterScene,row.zone,event.ids.map(id=>({id,zone:event.place.positions[id]})),result.phases.slice(0,ph)),'Un seguito deve avere un antecedente effettivo');
    }
    if(!phase.contentId)continue;
    const incident=D.world.compile(theme).disasters.find(x=>x.id===phase.contentId);assert.ok(incident);assert.deepEqual(phase.affectedZones,[incident.zone]);
    for(const event of phase.events.filter(e=>e.contentCategory==='disasters'))assert.equal(event.place.zone,incident.zone);
    for(const corrupt of [r=>{r.worldIncident.scene=30;},r=>{r.worldIncident.exposed=['inesistente'];},r=>{r.worldIncident.exposed=[];},r=>{r.worldIncident.exposed.push(r.worldIncident.exposed[0]);}]){
      const bad=structuredClone(result);corrupt(bad.phases[ph]);assert.equal(LOS_REPLAY.validate(bad),false);
    }
  }
  const id=LOS_REPLAY.createId();await LOS_REPLAY.save(id,result);
  const encoded=await LOS_REPLAY.exportReplay(id);assert.deepEqual(LOS_REPLAY.inspectReplay(encoded).result,result);
  const imported=await LOS_REPLAY.importReplay(encoded);assert.deepEqual(await LOS_REPLAY.load(imported),result);
}
assert.equal(JSON.stringify(D.world.compile(D.themes[0])),before);
console.log('OK: nuove scene estratte nelle nove arene, determinismo completo, incidenti locali, esportazione/importazione e cataloghi immutati.');
})().catch(error=>{console.error(error);process.exitCode=1;});
