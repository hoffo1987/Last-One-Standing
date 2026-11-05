// Archivio dei replay: risultati reali, immutabilità e guasti delle API del browser.
// node tools/test-replay.js
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f), 'engine.js']) require(path.join(src, f));
const L = globalThis.LOS, D = globalThis.LOS_DATA, code = fs.readFileSync(path.join(src, 'replay.js'), 'utf8');
function storage() {
  const data = new Map();
  return { data, quota: Infinity, get length() { return data.size; }, key: (i) => [...data.keys()][i] || null, getItem: (k) => data.has(k) ? data.get(k) : null,
    setItem(k, v) { if (Buffer.byteLength(v) > this.quota) throw new Error('QuotaExceededError'); data.set(k, String(v)); } };
}
function indexedDB() {
  const data = new Map(), api = { data, failOpen: false, failWrites: false, hangOpen: false };
  const db = { objectStoreNames: { contains: () => true }, createObjectStore() {}, close() {}, transaction(name, mode) {
    assert.equal(name, 'replays');
    const pending = new Map(); let active = 0, done = false;
    const tx = { error: null, abort() { if (done) return; done = true; queueMicrotask(() => tx.onabort?.()); } };
    const finish = () => {
      if (active || done) return;
      if (mode === 'readwrite' && api.failWrites) { tx.error = new Error('QuotaExceededError'); tx.abort(); return; }
      done = true; pending.forEach((v, k) => data.set(k, structuredClone(v))); tx.oncomplete?.();
    };
    const request = (action) => {
      const req = {}; active++;
      queueMicrotask(() => {
        if (done) return;
        try { req.result = action(); req.onsuccess?.(); }
        catch (e) { tx.error = req.error = e; req.onerror?.(); tx.abort(); }
        active--; queueMicrotask(finish);
      }); return req;
    };
    tx.objectStore = () => ({ get: (id) => request(() => data.has(id) ? structuredClone(data.get(id)) : undefined),
      getAll: () => request(() => [...data.values()].map((x) => structuredClone(x))),
      put: (value, id) => request(() => { pending.set(id, structuredClone(value)); return id; }),
      add: (value, id) => request(() => { if (data.has(id) || pending.has(id)) throw new Error('ConstraintError'); pending.set(id, structuredClone(value)); return id; }) });
    return tx;
  } };
  api.open = () => {
    const req = {};
    if (api.hangOpen) return req;
    queueMicrotask(() => { if (api.failOpen) { req.error = new Error('SecurityError'); req.onerror?.(); } else { req.result = db; req.onupgradeneeded?.(); req.onsuccess?.(); } });
    return req;
  };
  return api;
}
function context({ idb, local = storage(), buildId = 'build-originale' } = {}) {
  const c = { LOS_DATA: D, LOS_BUILD: buildId, structuredClone, indexedDB: idb, localStorage: local,
    setTimeout: (f, ms) => setTimeout(f, Math.min(ms, 20)), clearTimeout,
    crypto: { randomUUID: () => require('node:crypto').randomUUID() } };
  vm.createContext(c); vm.runInContext(code, c); return { c, replay: c.LOS_REPLAY, local };
}
function result(theme = 'classico', i = 0) {
  const cast = L.randomCast(12, 'replay-' + i, 2).map((t, n) => ({ ...t, id: 't' + n }));
  cast[0].img = 'data:image/png;base64,AQ==';
  return L.simulate({ cast, theme, seed: 'replay-' + i, adult: i % 2 === 1, teamsAllied: true, maxDays: 10 });
}
let passed = 0;
async function test(name, run) { await run(); passed++; console.log('  OK ' + name); }
(async () => {
  const original = result();
  await test('Il validatore accetta risultati veri di tutte le arene e i relativi stati', () => {
    const { replay } = context();
    for (const t of D.themes) for (let i = 0; i < 2; i++) assert.equal(replay.validate(result(t.id, i)), true, t.id + '/' + i);
  });
  await test('IndexedDB conserva un risultato completo e ogni lettura restituisce una copia', async () => {
    const idb = indexedDB(), { replay } = context({ idb });
    const copy = structuredClone(original), before = structuredClone(copy), id = replay.createId();
    const pending = replay.save(id, copy, { createdAt: 123, buildId: 'prima-build' });
    copy.phases[0].events[0].plain = 'Modificato dopo save';
    const meta = await pending;
    assert.equal(meta.storage, 'indexedDB'); assert.equal(meta.createdAt, 123);
    const loaded = await replay.load(id); assert.deepEqual(loaded, before);
    loaded.tributes[0].img = ''; loaded.phases[0].events[0].html = 'Modificato dopo load';
    assert.deepEqual(await replay.load(id), before);
  });
  await test('I risultati rimangono identici dopo aggiornamenti del motore e dei contenuti', async () => {
    const idb = indexedDB(), local = storage(), first = context({ idb, local }), id = first.replay.createId();
    await first.replay.save(id, original);
    const second = context({ idb, local, buildId: 'build-nuova' });
    second.c.LOS = { simulate() { throw new Error('Non deve risimulare'); } };
    assert.deepEqual(await second.replay.load(id), original);
    assert.equal(idb.data.get(id).buildId, 'build-originale');
  });
  await test('Una partita archiviata non può essere sostituita e i salvataggi identici sono idempotenti', async () => {
    const idb = indexedDB(), { replay } = context({ idb }), id = replay.createId();
    await replay.save(id, original, { createdAt: 123 });
    const meta = await replay.save(id, original, { createdAt: 999 }); assert.equal(meta.createdAt, 123);
    const changed = structuredClone(original); changed.seed = 'diverso';
    await assert.rejects(replay.save(id, changed), /non può essere sostituita/);
    assert.deepEqual(await replay.load(id), original);
  });
  await test('Un fallimento IndexedDB non cancella né altera la partita precedente', async () => {
    const idb = indexedDB(), { replay } = context({ idb }), id = replay.createId();
    await replay.save(id, original); idb.failWrites = true;
    await assert.rejects(replay.save(replay.createId(), result('fantasy')), /Impossibile salvare/);
    assert.equal(idb.data.size, 1); assert.deepEqual(await replay.load(id), original);
  });
  await test('Il ripiego locale preserva anche undefined, foto e snapshot del risultato', async () => {
    const { replay, local } = context(), id = replay.createId();
    const meta = await replay.save(id, original); assert.equal(meta.storage, 'localStorage');
    assert.equal(local.data.size, 1); assert.deepEqual(await replay.load(id), original);
    const again = await replay.save(id, original); assert.equal(again.createdAt, meta.createdAt);
    const changed = structuredClone(original); changed.seed = 'diverso';
    await assert.rejects(replay.save(id, changed), /non può essere sostituita/);
  });
  await test('La quota locale esaurita conserva tutti i replay salvati con successo', async () => {
    const { replay, local } = context(), id = replay.createId(); await replay.save(id, original);
    const previous = [...local.data.entries()]; local.quota = 0;
    await assert.rejects(replay.save(replay.createId(), result('horror')), /Quota/);
    assert.deepEqual([...local.data.entries()], previous); assert.deepEqual(await replay.load(id), original);
  });
  await test('Un replay locale resta leggibile e immutabile quando IndexedDB torna disponibile', async () => {
    const local = storage(), first = context({ local }), id = first.replay.createId(); await first.replay.save(id, original);
    const idb = indexedDB(), second = context({ idb, local });
    assert.deepEqual(await second.replay.load(id), original);
    const changed = structuredClone(original); changed.seed = 'diverso';
    await assert.rejects(second.replay.save(id, changed), /non può essere sostituita/);
    assert.equal(idb.data.size, 0);
  });
  await test('IndexedDB negato usa il ripiego locale; nessuno dei due archivi richiede la rete', async () => {
    const idb = indexedDB(); idb.failOpen = true;
    const { replay } = context({ idb }), id = replay.createId();
    assert.equal((await replay.save(id, original)).storage, 'localStorage');
    assert.deepEqual(await replay.load(id), original);
  });
  await test('Un’apertura IndexedDB senza risposta non lascia il ripristino in attesa', async () => {
    const idb = indexedDB(); idb.hangOpen = true;
    const { replay } = context({ idb }), id = replay.createId();
    assert.equal((await replay.save(id, original)).storage, 'localStorage');
    assert.deepEqual(await replay.load(id), original);
  });
  await test('ID mancanti, record corrotti e schemi sconosciuti non vengono mostrati', async () => {
    const idb = indexedDB(), { replay } = context({ idb }), id = replay.createId();
    assert.equal(await replay.load(id), null); assert.equal(await replay.load('../non-valido'), null);
    await replay.save(id, original);
    idb.data.get(id).schema = 99; assert.equal(await replay.load(id), null);
    idb.data.get(id).schema = 1; idb.data.get(id).result.tributes[1].id = original.tributes[0].id;
    assert.equal(await replay.load(id), null);
    const fallback = context(), localId = fallback.replay.createId(); await fallback.replay.save(localId, original);
    const key = [...fallback.local.data.keys()][0]; fallback.local.data.set(key, '{'); assert.equal(await fallback.replay.load(localId), null);
  });
  await test('HTML e classi eseguibili, riferimenti rotti e stati incompleti vengono rifiutati', async () => {
    const { replay } = context();
    const changes = [
      (r) => { r.phases[0].events[0].html = '<img src=x onerror=alert(1)>'; },
      (r) => { r.phases[0].events[0].html = '<b onclick="alert(1)">test</b>'; },
      (r) => { r.phases[0].events[0].echo = [{ html: 'test', plain: 'test', cls: '" onmouseover="alert(1)' }]; },
      (r) => { r.phases[0].events[0].ids.push('inesistente'); },
      (r) => { r.phases[0].snap.inv[r.tributes[0].id] = [{ t: 'arma', n: 'arma', q: -1 }]; },
      (r) => { r.phases[0].snap.vit[r.phases[0].snap.alive[0]][0] = NaN; },
      (r) => { r.phases[0].snap.rel[r.tributes[0].id].top = null; },
      (r) => { r.stats.stories = [null]; },
    ];
    for (const change of changes) { const r = structuredClone(original); change(r); assert.equal(replay.validate(r), false); await assert.rejects(replay.save(replay.createId(), r), /non è valido/); }
  });
  await test('L’archivio elenca e rinomina senza modificare risultato, regole o impronta', async () => {
    const idb = indexedDB(), { replay } = context({ idb }), id = replay.createId();
    const configuration = { theme: 'classico', seed: original.seed, custom: [], difficulty: 'alta', teamWin: true };
    await replay.save(id, original, { title: 'Prima partita', configuration, createdAt: 123 });
    await replay.save(replay.createId(), result('scifi'), { title: 'Seconda partita', createdAt: 456 });
    const entries = await replay.list(); assert.equal(entries.length, 2); assert.equal(entries[0].title, 'Seconda partita');
    await replay.rename(id, 'La mia partita');
    assert.equal((await replay.list())[1].title, 'La mia partita'); assert.deepEqual(await replay.load(id), original);
    assert.deepEqual((await replay.entry(id)).configuration, configuration); assert.equal((await replay.entry(id)).createdAt, 123);
    idb.failWrites = true; await assert.rejects(replay.rename(id, 'Non salvato'));
    assert.equal((await replay.entry(id)).title, 'La mia partita');
  });
  await test('Il replay esportato si importa con un nuovo ID conservando la storia completa', async () => {
    const first = context({ idb: indexedDB() }).replay, id = first.createId();
    await first.save(id, original, { title: 'Viaggio', createdAt: 123, buildId: 'origine', configuration: { custom: [], seed: original.seed } });
    const raw = await first.exportReplay(id), second = context({ idb: indexedDB() }).replay;
    const inspected = second.inspectReplay(raw); assert.deepEqual(structuredClone(inspected.result), original); assert.equal((await second.list()).length, 0);
    inspected.result.seed = 'modifica alla copia'; assert.equal(second.inspectReplay(raw).result.seed, original.seed);
    const importedId = await second.importReplay(raw); assert.notEqual(importedId, id);
    assert.deepEqual(await second.load(importedId), original);
    const e = await second.entry(importedId); assert.equal(e.title, 'Viaggio'); assert.equal(e.buildId, 'origine'); assert.equal(e.createdAt, 123);
    const corrupt = JSON.parse(raw); corrupt.snapshot.result.phases[0].events[0].html = '<img src=x onerror=alert(1)>';
    await assert.rejects(second.importReplay(JSON.stringify(corrupt)), /non valido/);
    await assert.rejects(second.importReplay('null'), /non valido/);
    assert.equal((await second.list()).length, 1); assert.deepEqual(await second.load(importedId), original);
  });
  await test('Elenco, nome ed esportazione funzionano anche nel ripiego locale', async () => {
    const { replay, local } = context(), id = replay.createId(); await replay.save(id, original);
    assert.equal((await replay.list()).length, 1); await replay.rename(id, 'Portatile');
    assert.equal((await replay.entry(id)).title, 'Portatile');
    const imported = await replay.importReplay(await replay.exportReplay(id)); assert.deepEqual(await replay.load(imported), original);
    assert.equal((await replay.list()).length, 2);
    local.data.set('last-one-standing:replay:v1:rotto', '{'); assert.equal((await replay.list()).length, 2);
  });
  await test('Il digest di build precede il modulo replay, che precede l’interfaccia', () => {
    const build = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');
    assert.ok(build.includes("'replay.js', 'studio.js', 'ui.js'")); assert.ok(build.includes("createHash('sha256')"));
    assert.ok(build.includes('window.LOS_BUILD = '));
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni dell’archivio replay');
})().catch((e) => { console.error(e); process.exitCode = 1; });
