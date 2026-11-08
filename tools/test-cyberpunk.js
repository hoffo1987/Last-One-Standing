// Night City — Zona Rossa: regressioni mirate della decima arena.
// node tools/test-cyberpunk.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(src, f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA, Geo = globalThis.LOS_GEOGRAPHY;
let n = 0; const ok = (m) => { n++; console.log('  OK ' + m); };
const theme = D.themes.find((t) => t.id === 'cyberpunk'), eco = D.eco.arenas.cyberpunk;

// 1. aggiunta in coda: le nove arene storiche restano nello stesso ordine
assert.deepStrictEqual(D.themes.map((t) => t.id), ['classico', 'fantasy', 'scifi', 'zombie', 'royale', 'horror', 'wasteland', 'liceo', 'ufficio', 'cyberpunk']);
assert.equal(theme.name, 'Night City — Zona Rossa');
ok('decima arena in coda, ordine storico intatto');

// 2. geografia: sette zone con ID stabili, grafo bidirezionale e connesso, partenza, consegna e finale espliciti
const zones = Geo.describe(theme, eco);
assert.deepStrictEqual(zones.map((z) => z.name), ['il Mercato di Kabuki', 'il Megablocco', 'la Clinica del ripperdoc', 'il Club della braindance', "l'Officina dei Maelstrom", 'il Nodo dati corporativo', 'la Piazza della torre']);
for (const z of zones) for (const l of z.links) assert.ok(zones[l].links.includes(z.id), 'collegamento a senso unico ' + z.id + '-' + l);
assert.ok(Geo.connected(zones, new Set()));
const def = Geo.definitions.cyberpunk; assert.deepStrictEqual([def.start, def.feast, def.finale], [6, 0, 6]);
assert.ok(zones[0].resources > 1.3 && zones[0].shelter < 0.4, 'Mercato ricco ed esposto');
assert.ok(zones[2].shelter >= 0.8 && zones[2].danger < 1, 'Clinica riparata');
assert.ok(zones[4].danger >= 1.6, 'Officina pericolosa');
assert.deepStrictEqual(zones.filter((z) => z.features.includes('water') || z.features.includes('trees')).map((z) => z.id), [], 'niente acqua né alberi in città');
for (const word of ['la Cornucopia', 'una foresta', 'un incantesimo', 'un alieno', 'la decompressione', 'il deserto']) assert.ok(Geo.offTheme('{A} trova ' + word + '.', theme), word);
ok('7 zone, grafo bidirezionale, partenza e finale in Piazza, consegna al Mercato, incompatibilità attive');

// 3. indicatore: configurazione documentata e soglie
const M = eco.meter;
assert.deepStrictEqual([M.id, M.name, M.st, M.thr, M.dmg, M.cure, M.noDecay, M.resist.join()], ['sovraccarico', 'Sovraccarico neurale', 'sovraccarico', 65, 12, 40, true, 'res,emp']);
assert.deepStrictEqual(M.gain, { b: 8, d: 10, n: 5, dis: 14, f: 6 });
for (const k of ['+8', '+10', '+5', '+6', '+14', '−40', '−24', '−14', 'Da 65', 'A 100', '12 punti']) assert.ok(M.desc.includes(k), 'la guida descrive ' + k);
assert.equal(D.eco.statusLabel.sovraccarico, 'In sovraccarico');
ok('Sovraccarico neurale: guadagni, soglia 65, danno a saturazione e descrizione esatta');

// 4. meteo e condizioni urbane con effetti veri
const KEYS = new Set(['pr', 'stl', 'en', 'food', 'forage', 'beast', 'lethal', 'tb', 'heal', 'fame', 'trap', 'storm']);
assert.ok(eco.meteo.length >= 9);
for (const w of eco.meteo) { assert.ok(Object.keys(w.fx).length >= 1 && Object.keys(w.fx).every((k) => KEYS.has(k)), w.n); }
for (const name of ['Pioggia acida', 'Smog denso', 'Blackout di quartiere', 'Interferenze di rete', 'Allerta pattuglia', 'Consegna di scorte', 'Caldo dei condizionatori', 'Tregua del quartiere', 'Disturbi ottici']) assert.ok(eco.meteo.some((w) => w.n === name), name);
ok(eco.meteo.length + ' condizioni con effetti applicati dal motore');

// 5. contenuti d'autore: almeno 100 eventi, 12 disastri, prove di hacking, sabotaggio e diagnosi
const packs = D.packs.filter((p) => p.theme === 'cyberpunk');
const own = packs.flatMap((p) => Object.values(p.ev || {}).flatMap((raw) => LOS.parseBlock(raw))).concat(Object.values(theme.extra).flatMap((raw) => LOS.parseBlock(raw)));
const dis = theme.disasters.length + packs.reduce((s, p) => s + (p.dis ? p.dis.trim().split('\n').length : 0), 0);
assert.ok(own.length >= 100, 'eventi d’autore: ' + own.length); assert.ok(dis >= 12, 'disastri d’autore: ' + dis);
const tests = own.filter((e) => e.test);
const hacking = tests.filter((e) => e.test.attr === 'int' && /ICE|terminale|presa|rete/.test(e.okText + e.koText));
const sabotage = tests.filter((e) => /sabota|manomette|picco|shard infetto/.test(e.okText + e.koText));
const diagnosis = tests.filter((e) => /diagnos|riavvio|riavvia|raffredda/.test(e.okText + e.koText) && e.ok.fx.some((f) => f.t === 'vital' && f.k === 'pr' && f.v < 0));
assert.ok(hacking.length >= 4 && sabotage.length >= 3 && diagnosis.length >= 4, [hacking.length, sabotage.length, diagnosis.length].join('/'));
for (const e of tests) assert.ok(e.okText && e.koText && e.okText !== e.koText, 'prova a due esiti: ' + e.text);
// il sovraccarico cala solo con cure o diagnosi: ogni riga che lo abbassa lo dice
for (const e of own) for (const [txt, fx] of [[e.text, e.fx], [e.okText, e.ok.fx], [e.koText, e.ko.fx]]) {
  if (fx.some((f) => f.t === 'vital' && f.k === 'pr' && f.v < 0)) assert.ok(/sovraccarico|impianti|diagnos/.test(txt || e.text), 'calo non raccontato: ' + (txt || e.text));
  if (fx.some((f) => f.t === 'vital' && f.k === 'pr' && f.v > 0)) assert.ok(/sovraccarico|impianti|ICE|ottiche|scarica|impulso|picco|virus|insegna|megaschermo|cromo|fixer|diretta|ricordi/i.test(txt || e.text), 'aumento non raccontato: ' + (txt || e.text));
}
// nessuna riga d'autore viene riscritta dal filtro geografico
for (const e of own) assert.equal(Geo.prepare(e, theme, zones).adapted, undefined, 'riscritta: ' + e.text);
// le azioni da netrunner su un'altra persona avvengono sul posto, con un contatto fisico
for (const e of own.filter((x) => x.n >= 2 && /ICE|virus|shard|presa|picco/.test(x.text))) assert.ok(/presa|cavo|terminale|infila|collega/.test(e.text), 'azione a distanza: ' + e.text);
ok(own.length + ' eventi e ' + dis + ' disastri d’autore; ' + hacking.length + ' prove di hacking, ' + sabotage.length + ' di sabotaggio, ' + diagnosis.length + ' di diagnosi');

// 6. oggetti: tutte le 13 famiglie con scheda; gli impianti sono dichiarati e non trasferibili
const pools = LOS.buildPools(theme, [], true);
for (const type of ['arma', 'armatura', 'attrezzo', 'mappa', 'trap', 'med', 'amuleto', 'valore', 'ricordo', 'cibo', 'veleno', 'esplosivo', 'alcol']) {
  const names = pools.lex[type] || [];
  assert.ok(names.length, 'famiglia vuota: ' + type);
  for (const name of names) { const i = D.itemInfo('cyberpunk', type, name); assert.ok(i.known && i.d.length > 15, 'scheda mancante: ' + type + '/' + name); assert.ok(/^(un|uno|una|un’|un'|delle|dei|degli|del|della|il|la|lo|l')\b|^un’/.test(name), 'nome incompleto: ' + name); }
}
const implants = ['una placcatura subdermale', 'un rivestimento dermico ignifugo', 'un’interfaccia neurale da polso', 'un’ottica cartografica', 'un defibrillatore sottocutaneo'];
const typeOf = { 'una placcatura subdermale': 'armatura', 'un rivestimento dermico ignifugo': 'armatura', 'un’interfaccia neurale da polso': 'attrezzo', 'un’ottica cartografica': 'mappa', 'un defibrillatore sottocutaneo': 'amuleto' };
for (const name of implants) { const i = D.itemInfo('cyberpunk', typeOf[name], name); assert.equal(i.p.impianto, 1, name); assert.ok(D.itemUses(i).some((u) => /non si può rubare/.test(u)), name); }
assert.ok(D.itemHasImplants('cyberpunk')); for (const t of D.themes) if (t.id !== 'cyberpunk') assert.ok(!D.itemHasImplants(t.id), t.id);
assert.equal(D.itemInfo('cyberpunk', 'armatura', 'una placcatura subdermale con gel antiurto').p.usi, 1, 'finiture proprie dell’arena');
ok('13 famiglie di oggetti con scheda; ' + implants.length + ' impianti dichiarati, solo a Night City');

// 7. partite: impianti mai passati di mano, indicatore che cala solo per motivi raccontati, nessuna parola fuori tema
const MOVED = new Set(['rubato', 'bottino', 'dono', 'scambio', 'eredita', 'zaino']);
let games = 0, finals = 0, implantSeen = 0, alarms = 0, saturated = 0, rests = 0, drops = 0;
for (let i = 0; i < 24; i++) {
  const cfg = { cast: LOS.randomCast(i % 2 ? 24 : 16, 'nc-cast-' + i, 2), theme: 'cyberpunk', seed: 'notte-' + i };
  const r = LOS.simulate(cfg); games++; rests += r.stats.meterRest || 0;
  if (i < 3) assert.deepStrictEqual(JSON.parse(JSON.stringify(r)), JSON.parse(JSON.stringify(LOS.simulate(cfg))), 'determinismo');
  assert.equal(r.phases[0].title, 'Il contratto saltato');
  r.phases.forEach((p, k) => {
    Object.entries(p.snap.inv || {}).forEach(([id, inv]) => inv.forEach((it) => {
      if (!D.itemInfo('cyberpunk', it.t, it.n).p.impianto) return;
      implantSeen++; assert.ok(!MOVED.has(it.h), 'impianto passato di mano: ' + it.n + ' (' + it.h + ')');
    }));
    Object.entries(p.snap.st || {}).forEach(([, st]) => { if (st.includes('sovraccarico')) alarms++; });
    if (k === 0) return;
    const prev = r.phases[k - 1].snap.vit || {};
    Object.entries(p.snap.vit || {}).forEach(([id, v]) => {
      if (!prev[id] || !p.snap.alive.includes(id)) return;
      if (v[4] >= 100) saturated++;
      if (v[4] < prev[id][4]) { drops++; assert.ok(p.events.some((e) => (e.ids || []).includes(id)), 'il sovraccarico di ' + id + ' cala senza un evento che lo coinvolga (fase ' + k + ')'); }
    });
    for (const e of p.events) { const t = String(e.plain || ''); assert.ok(!/\b(?:Cornucopia|cannone|paracadute)\b|\bsponsor\b/i.test(t), 'fuori tema: ' + t); }
  });
  const fin = r.phases.filter((p) => p.kind === 'finale');
  if (fin.length && aliveBefore(r) > 2) { finals++; assert.equal(fin[0].title, 'La stretta corporativa'); assert.ok(/stretta corporativa/.test(fin[0].intro)); }
}
function aliveBefore(r) { const f = r.phases.find((p) => p.kind === 'finale'); const before = r.phases[r.phases.indexOf(f) - 1]; return before ? before.snap.alive.length : 0; }
assert.ok(implantSeen > 0, 'nessun impianto comparso'); assert.ok(finals > 0, 'nessun finale a più atti'); assert.ok(alarms > 0 && saturated > 0 && rests > 0 && drops > 0, [alarms, saturated, rests, drops].join('/'));
ok(games + ' partite: impianti mai rubati né ceduti (' + implantSeen + ' presenze), ' + rests + ' riposi assistiti, ' + drops + ' cali sempre legati a un evento, nessun testo fuori tema');

// 8. i titoli del finale a più atti e il calendario restano coerenti
assert.deepStrictEqual(theme.climax.titles.slice(0, 1), ['La stretta corporativa']);
assert.equal(theme.phase.f, 'La consegna del fixer');
ok('finale a più atti con i nomi di Night City');

console.log('\nOK: ' + n + ' gruppi di regressioni di Night City — Zona Rossa');
