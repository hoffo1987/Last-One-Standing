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
require(path.join(src, 'replay.js'));
const replay = globalThis.LOS_REPLAY, replayData = new Map();
globalThis.localStorage = { getItem: key => replayData.get(key) ?? null, setItem: (key, value) => replayData.set(key, value), key: index => [...replayData.keys()][index], get length() { return replayData.size; } };
function uiFixture() {
  const elements = new Map(), handlers = {};
  const el = selector => {
    if (!elements.has(selector)) elements.set(selector, { value: '', textContent: '', innerHTML: '', disabled: false, insertAdjacentHTML: (_position, value) => { el(selector).innerHTML += value; }, addEventListener: (event, fn) => { handlers[selector + ':' + event] = fn; } });
    return elements.get(selector);
  };
  const c = vm.createContext({ document: { querySelector: el, querySelectorAll: () => [], addEventListener() {} }, location: { hash: '#arena' } });
  vm.runInContext(studioCode, c);
  const state = { cast, settings: { theme: 'classico', adult: false }, seasons: [], initialRelations: [], followed: [], custom: [] };
  let serial = 0;
  const api = { S: state, L, D, REPLAY: { ...replay }, RUNNER: { simulate: async () => structuredClone(original), cancel() {} }, esc: String, plural: (n, s, p) => n + ' ' + (n === 1 ? s : p),
    save() {}, commitSeasons(next) { state.seasons = next; return true; }, toast() {}, inputId: prefix => prefix + (++serial), currentConfiguration: () => structuredClone(cfg),
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
    await Promise.resolve(); const saved = f.state.seasons[0]; assert.equal(saved.rounds.length, 1); assert.equal(saved.rounds[0].replaySaved, false);
    const warnings = [], restored = f.controller.restoreSeasons([JSON.parse(JSON.stringify(saved))], warnings);
    assert.equal(restored.length, 1); assert.equal(warnings.length, 0);
    const bad = structuredClone(saved); bad.rounds[0].participants[0].id = 'assente';
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
  await test('rivedere una svolta mostra tutta la fase anche con il filtro dei seguiti attivo', () => {
    const f = uiFixture(); let phase;
    f.state.settings.followOnly = true; f.api.go = value => { phase = value; };
    f.handlers['#resBody:click']({ target: { closest: () => ({ dataset: { storyPhase: '2' } }) } });
    assert.equal(f.state.settings.followOnly, false); assert.equal(phase, 2);
  });
  await test('il percorso personale rispetta la fase e conserva multipli oggetti identici', () => {
    const item = { t: 'med', n: 'medicina', h: 'trovato' };
    const p = (n, extra = {}) => ({ day: n + 1, title: 'Fase ' + n, events: [], snap: { alive: ['a'], inv: { a: [item] }, vit: { a: [90, 70, 60, 80, 0] }, st: { a: [] }, kills: { a: 0 }, rel: { a: { p: null } }, ...extra } });
    const result = { tributes: [{ id: 'a', mem: { b: [{ ph: 1, k: 'saved' }, { ph: 3, k: 'betrayed' }] }, diary: [{ ph: 2, h: 'pagina futura' }] }],
      phases: [p(0), p(1, { inv: { a: [item, item] }, vit: { a: [55, 70, 60, 80, 0] }, st: { a: ['ferito'] } }), p(2, { alive: [], vit: {} }), p(3, { alive: [], vit: {}, kills: { a: 1 } })] };
    const before = JSON.stringify(result), initial = Studio.personalTimeline(result, 'a', 0);
    assert.equal(initial.length, 1); assert.equal(initial[0].memories.length, 0); assert.equal(initial[0].diary.length, 0);
    const middle = Studio.personalTimeline(result, 'a', 1)[1];
    assert.equal(middle.changes.filter(c => c.kind === 'itemAdded').length, 1);
    assert.equal(middle.changes.find(c => c.kind === 'vital').after, 55);
    assert.equal(middle.changes.find(c => c.kind === 'statusAdded').state, 'ferito');
    assert.equal(middle.memories[0].k, 'saved'); assert.equal(middle.diary.length, 0);
    assert.equal(Studio.personalTimeline(result, 'a', 3).at(-1).changes.find(c => c.kind === 'credit').after, 1);
    assert.equal(Studio.personalTimeline(result, 'assente', 3).length, 0); assert.equal(JSON.stringify(result), before);
  });
  await test('le frequenze per caratteristica usano presenze, fasce vuote e vittorie di squadra', () => {
    const people = [{ id: 'a', attr: { for: 2, agi: 5 } }, { id: 'b', attr: { for: 9, agi: 5 } }, { id: 'c', attr: { for: 8, agi: 5 } }];
    const stats = { a: { wins: 1 }, b: { wins: 3 }, c: { wins: 2 } };
    const rows = Studio.attributeSummary(people, stats, 4, [{ id: 'for', name: 'Forza' }, { id: 'agi', name: 'Agilità' }]);
    assert.equal(rows[0].groups[0].frequency, 25); assert.equal(rows[0].groups[2].appearances, 8); assert.equal(rows[0].groups[2].frequency, 62.5); assert.equal(rows[0].difference, 37.5);
    assert.equal(rows[1].difference, null); assert.equal(rows[1].groups[1].frequency, 50);
    assert.equal(Studio.attributeSummary(people, {}, 0, [{ id: 'for' }])[0].difference, null);
  });
  await test('premi cumulativi e rivalità non inventano dettagli nei round precedenti', () => {
    const achievements = { saves: 2, nursed: 1, promisesKept: 0, testsPassed: 3, crafts: 0, betrayals: 0 };
    const detailed = { participants: cast.map(t => ({ id: t.id, achievements })), stories: [{ k: 'nemesi', a: 'a', b: 'b' }, { k: 'nemesi', a: 'b', b: 'a' }] };
    const season = { configuration: cfg, rounds: [{ participants: cast.map(t => ({ id: t.id })) }, detailed, { ...detailed, stories: [{ k: 'nemesi', a: 'b', b: 'a' }] }] };
    const h = Studio.seasonHighlights(season);
    assert.equal(h.detailed, 2); assert.equal(h.awards.find(a => a.key === 'saves').value, 4); assert.equal(h.awards.find(a => a.key === 'saves').people.length, 3);
    assert.equal(h.rivalries.length, 1); assert.equal(h.rivalries[0].rounds, 2);
  });
  await test('la stagione completa si trasferisce con replay veri, nuovi ID e stessi risultati', async () => {
    const f = uiFixture(); f.state.seasons = [{ id: 'season-original', name: 'Originale', configuration: structuredClone(cfg), rounds: [] }];
    const id = replay.createId(); await replay.save(id, original, { buildId: 'test', configuration: cfg });
    f.controller.recordResult({ ...cfg, seasonId: 'season-original' }, original, id, Promise.resolve(true)); await Promise.resolve();
    const exported = await f.controller.exportSeason('season-original', true), oldState = JSON.stringify(f.state), oldRun = f.api.getSIM();
    const target = uiFixture(), imported = await target.controller.importSeason(exported.raw), season = target.state.seasons[0];
    assert.notEqual(season.id, 'season-original'); assert.equal(imported.warnings.length, 0); assert.equal(imported.count, 1);
    assert.notEqual(season.rounds[0].replayId, id); assert.equal(season.rounds[0].replaySaved, true);
    assert.deepEqual(await replay.load(season.rounds[0].replayId), original); assert.deepEqual(Studio.seasonScores(season), Studio.seasonScores(f.state.seasons[0]));
    assert.equal(JSON.stringify(f.state), oldState); assert.equal(f.api.getSIM(), oldRun);
    const metadata = await f.controller.exportSeason('season-original', false), partial = uiFixture();
    const missing = await partial.controller.importSeason(metadata.raw); assert.equal(missing.count, 0); assert.equal(partial.state.seasons[0].rounds[0].replaySaved, false); assert.ok(missing.warnings.length);
  });
  await test('pacchetti invalidi o classifiche discordanti non modificano stato e archivio', async () => {
    const source = uiFixture(); source.state.seasons = [{ id: 's1', name: 'Fonte', configuration: structuredClone(cfg), rounds: [] }];
    const id = replay.createId(); await replay.save(id, original); source.controller.recordResult({ ...cfg, seasonId: 's1' }, original, id, Promise.resolve(true)); await Promise.resolve();
    const output = await source.controller.exportSeason('s1', true), valid = JSON.parse(output.raw), target = uiFixture();
    const before = JSON.stringify(target.state), archiveBefore = replayData.size;
    for (const bad of ['null', '{', JSON.stringify({ ...valid, version: 99 }), JSON.stringify({ ...valid, replays: [valid.replays[0], valid.replays[0]] })]) await assert.rejects(target.controller.importSeason(bad));
    const edited = structuredClone(valid); edited.season.rounds[0].participants[0].kills = (edited.season.rounds[0].participants[0].kills + 1) % cast.length;
    await assert.rejects(target.controller.importSeason(JSON.stringify(edited)), /non corrispondono/);
    const renamed = structuredClone(valid); renamed.season.configuration.cast[0].name = 'Un altro cast'; await assert.rejects(target.controller.importSeason(JSON.stringify(renamed)), /cast non corrisponde/);
    assert.equal(JSON.stringify(target.state), before); assert.equal(replayData.size, archiveBefore);
    target.api.commitSeasons = () => false; await assert.rejects(target.controller.importSeason(output.raw), /non è stata salvata/);
    assert.equal(JSON.stringify(target.state), before); assert.equal(replayData.size, archiveBefore);
  });
  await test('un errore durante il recupero dei replay conserva la classifica con un avviso', async () => {
    const source = uiFixture(); source.state.seasons = [{ id: 's1', name: 'Fonte', configuration: structuredClone(cfg), rounds: [] }];
    const id = replay.createId(); await replay.save(id, original); source.controller.recordResult({ ...cfg, seasonId: 's1' }, original, id, Promise.resolve(true)); await Promise.resolve();
    const output = await source.controller.exportSeason('s1', true), target = uiFixture(); target.api.REPLAY.importReplay = async () => { throw new Error('quota esaurita'); };
    const loaded = await target.controller.importSeason(output.raw); assert.ok(loaded.warnings.some(w => w.includes('quota esaurita')));
    assert.equal(target.state.seasons[0].rounds.length, 1); assert.equal(target.state.seasons[0].rounds[0].replaySaved, false);
    const quota = uiFixture(); quota.state.seasons = [{ id: 's1', name: 'Fonte', configuration: structuredClone(cfg), rounds: [] }]; quota.api.commitSeasons = () => false;
    quota.controller.recordResult({ ...cfg, seasonId: 's1' }, original, id, Promise.resolve(true)); await Promise.resolve(); assert.equal(quota.state.seasons[0].rounds.length, 0);
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni degli strumenti di gioco');
})().catch(e => { console.error(e); process.exitCode = 1; });
