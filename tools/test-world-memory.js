const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=path.join(__dirname,'../src');
for(const f of ['data-core.js','data-themes.js',...fs.readdirSync(path.join(src,'content')).filter(f=>f.endsWith('.js')).sort().map(f=>'content/'+f),'engine.js','replay.js','map-view.js'])require(path.join(src,f));
const Systems=require('../src/engine-systems.js'),m=Systems.createWorldMemory();
const event=(ids,zone,cat,plain,deaths=[])=>({ids,cat,plain,deaths,place:{zone,positions:Object.fromEntries(ids.map(id=>[id,zone])),seq:0}});
const first=event(['a','b'],0,'heal','Aiuto reale');m.record(first,0,1);
for(let i=0;i<60;i++)m.record(event(['a'],1,'none','Altra esperienza '+i),i+1,2);
assert.equal(m.previous(['a','b'],0)[0].id,0,'Un rapporto non sparisce dopo quaranta fatti');
assert.equal(m.risk('estraneo',0),0);
m.record(event(['a','b'],0,'hurt','Scontro reale'),62,3);
assert.ok(m.risk('a',0)>0);assert.equal(m.risk('estraneo',0),0,'Nessuna conoscenza onnisciente');
assert.ok(m.weight({lethal:true},{id:'a',zone:0,traits:['codardo']})<1);
assert.equal(m.weight({lethal:true},{id:'estraneo',zone:0,traits:['codardo']}),1);
assert.equal(m.data.facts.length,62,'Archivio completo, senza cancellare fatti vecchi');
const remote=event(['estraneo','a'],2,'none','Una fonte citata da lontano');remote.place.positions.a=0;
const localFact=m.record(remote,63,3);
assert.deepEqual(localFact.actors,['estraneo'],'Una fonte remota non diventa un testimone');
assert.deepEqual(localFact.parents,[],'I ricordi della fonte remota non diventano antecedenti del testimone');
for(const theme of LOS_DATA.themes){
 const cfg={cast:LOS.randomCast(20,'memoria',3),theme:theme.id,seed:'memoria-'+theme.id,maxDays:10},r=LOS.simulate(cfg);
 assert.ok(LOS_REPLAY.validate(r),theme.id);
 assert.deepEqual(r,LOS.simulate(cfg));
 for(const [ph,p]of r.phases.entries())for(const e of p.events)if(e.place?.zone!=null&&e.ids.length&&!e.note){assert.ok(Number.isInteger(e.memoryId),theme.id+' fatto senza memoria');const f=r.chronicle.facts[e.memoryId];assert.equal(f.ph,ph);assert.equal(f.plain,e.plain);for(const parent of f.parents){assert.ok(parent<f.id);assert.ok(r.chronicle.facts[parent].actors.some(id=>f.actors.includes(id)));}}
 const bad=structuredClone(r);bad.chronicle.facts[0].parents=[0];assert.equal(LOS_REPLAY.validate(bad),false);
 const future=structuredClone(r);future.chronicle.facts.push({...future.chronicle.facts[0],id:future.chronicle.facts.length,ph:99,plain:'MEMORIA_FUTURA'});
 assert.doesNotMatch(LOS_MAP_VIEW.render(future,0,{theme}),/MEMORIA_FUTURA/);
 const attack=structuredClone(r);attack.chronicle.facts[0].plain='<img src=x onerror=alert(1)>';
 assert.doesNotMatch(LOS_MAP_VIEW.render(attack,0,{theme}),/<img src=x/);
 console.log('OK: '+theme.id+' — memoria completa, antecedenti reali, determinismo, nessuna fuga dal futuro.');
}
