const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js']) require(path.join(src, f));
const L = globalThis.LOS, D = globalThis.LOS_DATA, studioCode = fs.readFileSync(path.join(src, 'studio.js'), 'utf8');
const ctx = vm.createContext({}); vm.runInContext(studioCode, ctx); const Studio = ctx.LOS_STUDIO;
let passed = 0;
async function test(name, run) { await run(); passed++; console.log('OK: ' + name); }
const cast = L.randomCast(3, 'legami', 1).map((t, i) => ({ ...t, id: ['a', 'b', 'c'][i], name: ['Ada', 'Bruno', 'Carla'][i] }));
const cfg = { cast, theme: 'classico', seed: 'studio', difficulty: 'normale', custom: [], maxDays: 10, teamsAllied: false, teamWin: false };
const original = L.simulate(cfg);
function uiFixture() {
  const elements = new Map(), handlers = {};
  const el = selector => {
    if (!elements.has(selector)) elements.set(selector, { value: '', textContent: '', innerHTML: '', disabled: false, addEventListener: (event, fn) => { handlers[selector + ':' + event] = fn; } });
    return elements.get(selector);
  };
  const c = vm.createContext({ document: { querySelector: el, querySelectorAll: () => [], addEventListener() {} }, location: { hash: '#arena' } });
  vm.runInContext(studioCode, c);
  const state = { cast, settings: { theme: 'classico', adult: false }, seasons: [], initialRelations: [], followed: [], custom: [] };
  const api = { S: state, L, D, RUNNER: { simulate: async () => structuredClone(original), cancel() {} }, esc: String, plural: (n, s, p) => n + ' ' + (n === 1 ? s : p),
    save() {}, toast() {}, inputId: prefix => prefix + Date.now().toString(36), currentConfiguration: () => structuredClone(cfg),
    normalizeCast: value => { if (!Array.isArray(value)) throw new Error('Cast non valido'); return structuredClone(value); }, normalizeCustoms: value => { if (!Array.isArray(value)) throw new Error('Eventi non validi'); return structuredClone(value); },
    sanitizeSettings: value => structuredClone(value), simulationBusy(value) { this.busy = value; }, getSIM: () => original, copyText() {} };
  const controller = c.LOS_STUDIO.init(api);
  return { state, api, controller, el, handlers };
}
(async () => {
  await test('legami invalidi, duplicati, riferimenti mancanti e coppie sovrapposte sono rifiutati', () => {
    assert.deepEqual(L.normalizeInitialRelations(undefined, cast), []);
    assert.throws(() => L.normalizeInitialRelations([{ from: 'a', to: 'a', type: 'amicizia' }], cast));
    assert.throws(() => L.normalizeInitialRelations([{ from: 'a', to: 'x', type: 'fiducia' }], cast));
    assert.throws(() => L.normalizeInitialRelations([{ from: 'a', to: 'b', type: 'coppia' }, { from: 'a', to: 'c', type: 'coppia' }], cast), /sola coppia/);
    assert.throws(() => L.normalizeInitialRelations([{ from: 'a', to: 'b', type: 'amicizia' }, { from: 'b', to: 'a', type: 'amicizia' }], cast), /duplicato/);
    assert.throws(() => L.normalizeInitialRelations([{ from: 'a', to: 'b', type: 'attrazione' }, { from: 'a', to: 'c', type: 'attrazione' }], cast), /sola cotta/);
    assert.equal(L.normalizeInitialRelations([{ from: 'a', to: 'b', type: 'fiducia' }, { from: 'b', to: 'a', type: 'fiducia' }], cast).length, 2);
  });
  await test('i rapporti iniziali entrano nello stato e nella memoria della prima fase', () => {
    const themes = D.themes, packs = D.packs, more = D.more;
    try {
      D.themes = [{ ...themes[0], id: 'audit-relations', soft: true, pool: { b: '1 | {A} aspetta.', d: '1 | {A} aspetta.', n: '1 | {A} riposa.', finale: '2 k:A>B | {A} elimina {B}.', fallback: '1 | {A} aspetta.' }, disasters: [], extra: {} }];
      D.packs = []; D.more = {}; D.eco.arenas['audit-relations'] = { key: [], drain: { food: 0, en: 0, mo: 0 }, mods: { beast: 0 }, zones: [], meteo: [], meter: null };
      const input = { ...cfg, cast: cast.map(t => ({ ...t, traits: [], attr: Object.fromEntries(D.attrs.map(a => [a.id, 5])) })), theme: 'audit-relations', maxDays: 3,
        initialRelations: [{ from: 'a', to: 'b', type: 'coppia' }, { from: 'c', to: 'a', type: 'fiducia' }] };
      const result = L.simulate(input);
      assert.equal(result.phases[0].snap.rel.a.p, 'b'); assert.equal(result.phases[0].snap.rel.b.p, 'a');
      assert.ok(result.tributes.find(t => t.id === 'a').mem.b.some(m => m.k === 'love' && m.ph === 0));
      assert.ok(result.tributes.find(t => t.id === 'c').mem.a.some(m => m.k === 'initialTrust' && m.ph === 0));
      assert.deepEqual(L.simulate(input), result);
    } finally { D.themes = themes; D.packs = packs; D.more = more; }
  });
  await test('gli eventi avanzati usano il parser completo e conservano i due esiti', () => {
    const raw = '2 test:A=int12 ok:save:A>B ko:hp:A-10 | {A} aiuta {B}. || {A} non riesce ad aiutare {B}.';
    assert.equal(L.customToLine({ raw }), raw);
    const ev = L.parseLine(raw); assert.equal(ev.ok.fx[0].t, 'save'); assert.equal(ev.ko.fx[0].t, 'vital');
    assert.ok(L.buildPools(D.themes[0], [{ raw, phase: 'd' }], false).d.some(e => e.origin === 'custom' && e.text.includes('non riesce')));
    for (const bad of ['1 s:A=inesistente | {A} aspetta.', '1 test:A=toString ok:hp:A+1 | {A} aspetta. || {A} riposa.', '1 trait:A=toString | {A} aspetta.', '1 con:A=inesistente | {A} aspetta.']) assert.throws(() => L.parseLine(bad));
    assert.throws(() => L.customToLine({ raw: raw + '\n' + raw }));
  });
  await test('i punteggi stagionali derivano dai risultati, comprese le vittorie di squadra', () => {
    const season = { configuration: cfg, rounds: [{ participants: [{ id: 'a', rank: 1, kills: 1, winner: true }, { id: 'b', rank: 1, kills: 0, winner: true }, { id: 'c', rank: 3, kills: 0, winner: false }] }] };
    const rows = Studio.seasonScores(season);
    assert.equal(rows.find(r => r.id === 'a').points, 5); assert.equal(rows.find(r => r.id === 'b').points, 4); assert.equal(rows.find(r => r.id === 'c').points, 1);
    assert.equal(rows.reduce((sum, r) => sum + r.wins, 0), 2);
  });
  await test('un risultato stagionale si registra una sola volta e ricorda gli errori di salvataggio', async () => {
    const f = uiFixture(), season = { id: 's1', name: 'Stagione', configuration: structuredClone(cfg), rounds: [] }; f.state.seasons = [season];
    f.controller.recordResult({ ...cfg, seasonId: 's1' }, original, 'r1', Promise.resolve(false));
    f.controller.recordResult({ ...cfg, seasonId: 's1' }, original, 'r1', Promise.resolve(true));
    await Promise.resolve(); assert.equal(season.rounds.length, 1); assert.equal(season.rounds[0].replaySaved, false);
    const warnings = [], restored = f.controller.restoreSeasons([JSON.parse(JSON.stringify(season))], warnings);
    assert.equal(restored.length, 1); assert.equal(warnings.length, 0);
    const bad = structuredClone(season); bad.rounds[0].participants[0].id = 'assente';
    assert.equal(f.controller.restoreSeasons([bad], warnings).length, 0); assert.ok(warnings.length);
  });
  await test('il laboratorio usa semi distinti e non sostituisce la partita aperta', async () => {
    const f = uiFixture(), seeds = []; f.el('#labCount').value = '5';
    f.api.RUNNER.simulate = async input => { seeds.push(input.seed); return structuredClone(original); };
    await f.handlers['#labRun:click']();
    assert.equal(new Set(seeds).size, 5); assert.match(f.el('#labMsg').textContent, /5 \/ 5/);
    assert.equal(f.api.getSIM(), original); assert.equal(f.api.busy, false); assert.equal(f.el('#labRun').disabled, false);
  });
  await test('annullare il laboratorio ferma il campione senza scrivere un nuovo risultato', async () => {
    const f = uiFixture(); let reject;
    f.el('#labCount').value = '5'; f.api.RUNNER.simulate = () => new Promise((_, fail) => { reject = fail; });
    f.api.RUNNER.cancel = () => reject?.(Object.assign(new Error('annullato'), { name: 'AbortError' }));
    const pending = f.handlers['#labRun:click'](); f.handlers['#labCancel:click'](); await pending;
    assert.match(f.el('#labMsg').textContent, /interrotto/); assert.equal(f.api.busy, false); assert.equal(f.api.getSIM(), original);
  });
  await test('il resoconto cita soltanto eventi e fasi presenti nel risultato', () => {
    const steps = Studio.causalSteps(original, original.winners[0]);
    for (const step of steps) { assert.equal(step.plain, original.phases[step.phase].events[step.event].plain); assert.equal(step.reason, original.phases[step.phase].events[step.event].reason || ''); }
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni degli strumenti di gioco');
})().catch(e => { console.error(e); process.exitCode = 1; });
