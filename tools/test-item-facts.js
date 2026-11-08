const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const src = path.join(__dirname, '../src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js', 'replay.js']) require(path.join(src, f));
const Systems = require(path.join(src, 'engine-systems.js'));
const t = { id: 'a', hp: 20, en: 50, mo: 50, food: 95, pr: 0, st: { ferito: 0 }, infected: false }, owner = { ...t, id: 'b' }, med = { type: 'med', name: 'kit', how: 'dono', from: 'b' };
let phase = 0; const ledger = Systems.createItemLedger({ phase: () => phase });
ledger.use('heal', owner, t, med, () => { t.hp += 90; });
assert.equal(ledger.facts[0].before.hp, 20); assert.equal(ledger.facts[0].after.hp, 100); assert.equal(ledger.facts[0].owner, 'b'); assert.equal(ledger.facts[0].who, 'a');
assert.equal(ledger.facts[0].after.states.includes('ferito'), false); assert.equal(t.st.ferito, 0, 'osservare non modifica lo stato');
phase++; ledger.use('attack', owner, t, null, () => { t.hp = 12; }); assert.equal(ledger.facts.length, 1); assert.equal(t.hp, 12);
assert.equal(ledger.facts[0].after.hp, 100, 'i fatti precedenti sono copie indipendenti');
for (const theme of LOS_DATA.themes) {
  const result = LOS.simulate({ cast: LOS.randomCast(24, 'facts-cast', 2), theme: theme.id, seed: 'facts-' + theme.id, maxDays: 12 });
  assert.ok(LOS_REPLAY.validate(result), theme.id); assert.ok(result.itemFacts.length);
  assert.ok(result.itemFacts.every((f, i) => f.seq === i && f.ph < result.phases.length));
  const legacy = structuredClone(result); delete legacy.itemFacts; assert.ok(LOS_REPLAY.validate(legacy));
  for (const edit of [f => { f.ph = result.phases.length; }, f => { f.owner = 'missing'; }, f => { f.before.hp = 101; }, f => { f.seq = -1; }, f => { f.kind = 'inventato'; }]) {
    const bad = structuredClone(result); edit(bad.itemFacts[0]); assert.equal(LOS_REPLAY.validate(bad), false);
  }
}
console.log('OK: effetti saturati, proprietario e destinatario distinti, osservazione senza mutazioni, schema e compatibilità legacy in tutte le arene.');
