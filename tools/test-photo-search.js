// Ricerca delle foto: fonti, unione dei risultati e funzione /api/immagini, senza rete (fetch simulato).
const assert = require('node:assert'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.join(__dirname, '..');
let passed = 0;
const test = async (name, fn) => { await fn(); passed++; console.log('  OK ' + name); };
const json = (body, status) => ({ ok: (status || 200) < 400, status: status || 200, json: async () => body });

function load(fetchImpl) {
  const ctx = { fetch: fetchImpl, URLSearchParams, console, setTimeout, clearTimeout };
  ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'src/photo-search.js'), 'utf8'), ctx);
  return ctx.LOS_PHOTO;
}

(async () => {
  await test('Wikipedia chiede anche le immagini non libere e scarta le pagine senza foto', async () => {
    const urls = [];
    const PH = load(async (u) => { urls.push(String(u)); return json({ query: { pages: { 1: { pageid: 1, index: 2, title: 'B', thumbnail: { source: 'https://x/b.jpg' } }, 2: { pageid: 2, index: 1, title: 'A', thumbnail: { source: 'https://x/a.jpg' } }, 3: { pageid: 3, index: 3, title: 'Logo', thumbnail: { source: 'https://x/l.svg' } }, 4: { pageid: 4, index: 4, title: 'Vuota' } } } }); });
    const r = await PH.search('wiki', 'Mario', null);
    assert.deepEqual(r.items.map((x) => x.title), ['A', 'B']);
    assert.match(urls[0], /pilicense=any/); assert.match(urls[0], /^https:\/\/it\.wikipedia\.org/);
    assert.deepEqual(JSON.parse(JSON.stringify(r.next)), { lang: 'en', offset: 0 });
  });
  await test('I wiki Fandom si ricavano dal nome della serie, anche con accenti e nomi noti', () => {
    const PH = load(async () => json({}));
    assert.deepEqual([...PH.fandomWikis('Final Fantasy')], ['finalfantasy', 'final-fantasy', 'final']);
    assert.equal(PH.fandomWikis('Genshin Impact')[0], 'genshin-impact');
    assert.equal(PH.fandomWikis('Pokémon')[0], 'pokemon');
    assert.equal(PH.fandomWikis('Demon Slayer')[0], 'kimetsu-no-yaiba');
    assert.equal(PH.fandomWikis('').length, 0);
    assert.ok(PH.fandomWikis('a/b?c').every((x) => /^[a-z0-9-]+$/.test(x)));
  });
  await test('Anime e giochi unisce Fandom, AniList e Wikipedia e regge una fonte caduta', async () => {
    const PH = load(async (u, o) => {
      u = String(u);
      if (u.startsWith('https://graphql.anilist.co')) return json({}, 500);
      if (u.startsWith('https://api.jikan.moe/')) return json({ data: [{ mal_id: 7, name: 'Tifa', url: 'https://mal/7', images: { jpg: { image_url: 'https://cdn/7.jpg' } } }], pagination: { has_next_page: true } });
      if (u.includes('.fandom.com/')) { if (!u.startsWith('https://finalfantasy.')) throw new TypeError('rete'); return json({ query: { pages: { 1: { pageid: 1, index: 1, title: 'Tifa Lockhart', thumbnail: { source: 'https://wikia/tifa.png' } } } } }); }
      if (u.includes('wikipedia.org')) return json({ query: { pages: { 9: { pageid: 9, index: 1, title: 'Tifa Lockhart', thumbnail: { source: 'https://wm/tifa.png' } } } } });
      throw new Error('inatteso ' + u);
    });
    const r = await PH.search('anime', 'Tifa', null, undefined, { series: 'Final Fantasy' });
    assert.deepEqual(r.items.map((x) => x.credit), ['finalfantasy.fandom.com', 'MyAnimeList', 'Wikipedia (en)']);
    assert.deepEqual(JSON.parse(JSON.stringify(r.next)), { page: 2 });
  });
  await test('Senza serie non si interroga Fandom', async () => {
    const hosts = [];
    const PH = load(async (u) => { hosts.push(new URL(String(u)).hostname); if (String(u).includes('anilist')) return json({ data: { Page: { pageInfo: { hasNextPage: false }, characters: [] } } }); return json({ query: { pages: {} } }); });
    const r = await PH.search('anime', 'Goku', null, undefined, {});
    assert.equal(r.items.length, 0); assert.equal(r.next, null);
    assert.ok(!hosts.some((h) => h.endsWith('fandom.com')));
  });
  await test('La fonte Web resta nascosta fuori da un sito http(s)', async () => {
    const PH = load(async () => json({ enabled: true }));
    assert.equal(await PH.webAvailable(), false);
    assert.ok(PH.SOURCES.web.server);
  });

  const handler = require(path.join(root, 'api/immagini.js'));
  const call = async (query, headers) => { const res = { code: 0, body: null, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } }; await handler({ method: 'GET', query, headers: headers || {} }, res); return res; };
  await test('La funzione /api/immagini è spenta senza chiave e lo dice', async () => {
    delete process.env.BRAVE_API_KEY;
    assert.deepEqual((await call({ ping: '1' })).body, { enabled: false });
    assert.equal((await call({ q: 'tifa' })).code, 503);
  });
  await test('Con la chiave chiama Brave, ripulisce i risultati e accetta solo il proprio sito', async () => {
    process.env.BRAVE_API_KEY = 'segreta';
    const real = globalThis.fetch; let seen;
    globalThis.fetch = async (u, o) => { seen = { u: String(u), k: o.headers['X-Subscription-Token'] }; return json({ results: [{ title: '<b>Tifa</b>', url: 'https://p', source: 'p.it', thumbnail: { src: 'https://t/1.jpg' }, properties: { url: 'https://f/1.jpg' } }, { title: 'senza https', thumbnail: { src: 'http://t/2.jpg' } }] }); };
    try {
      assert.deepEqual((await call({ ping: '1' })).body, { enabled: true });
      const ok = await call({ q: 'Tifa Lockhart' }, { host: 'los.vercel.app', referer: 'https://los.vercel.app/#cast' });
      assert.equal(ok.code, 200); assert.equal(seen.k, 'segreta'); assert.match(seen.u, /q=Tifa\+Lockhart/); assert.match(seen.u, /safesearch=strict/);
      assert.deepEqual(ok.body.items, [{ src: 'https://t/1.jpg', full: 'https://f/1.jpg', title: 'Tifa', site: 'p.it', link: 'https://p' }]);
      assert.ok(!JSON.stringify(ok.body).includes('segreta'));
      assert.equal((await call({ q: 'Tifa' }, { host: 'los.vercel.app', origin: 'https://altro.it' })).code, 403);
      assert.equal((await call({ q: 'x' }, { host: 'los.vercel.app' })).code, 400);
    } finally { globalThis.fetch = real; delete process.env.BRAVE_API_KEY; }
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni della ricerca delle foto');
})().catch((e) => { console.error(e); process.exit(1); });
