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
  const dnsP = require('node:dns').promises, realLookup = dnsP.lookup;
  const proxyFn = require(path.join(root, 'api/immagine.js'));
  const callP = async (u, headers) => { const res = { code: 0, body: null, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; }, send(b) { this.body = b; return this; } }; await proxyFn({ method: 'GET', query: { u }, headers: headers || { host: 'los.vercel.app', referer: 'https://los.vercel.app/' } }, res); return res; };
  await test('Il proxy d’immagini rifiuta indirizzi interni, http e indirizzi privati dietro un nome', async () => {
    dnsP.lookup = async (h) => (h === 'interno.esempio.it' ? [{ address: '10.0.0.5' }] : [{ address: '93.184.216.34' }]);
    try {
      for (const u of ['http://cdn.esempio.it/a.png', 'https://127.0.0.1/a.png', 'https://localhost/a.png', 'https://[::1]/a.png', 'https://interno.esempio.it/a.png', 'https://user:pw@cdn.esempio.it/a.png', 'https://cdn.esempio.it:8443/a.png', 'nonunurl']) assert.equal((await callP(u)).code, 400, u);
      assert.equal((await callP('https://cdn.esempio.it/a.png', { host: 'los.vercel.app', origin: 'https://altro.it' })).code, 403);
    } finally { dnsP.lookup = realLookup; }
  });
  await test('Il proxy restituisce solo immagini e controlla anche i reindirizzamenti', async () => {
    dnsP.lookup = async (h) => (h === 'interno.esempio.it' ? [{ address: '192.168.1.2' }] : [{ address: '93.184.216.34' }]);
    const real = globalThis.fetch;
    const hdr = (o) => ({ get: (k) => o[k.toLowerCase()] || null });
    globalThis.fetch = async (u) => { u = String(u);
      if (u.endsWith('/ok.png')) return { ok: true, status: 200, headers: hdr({ 'content-type': 'image/png' }), arrayBuffer: async () => new Uint8Array([137, 80, 78, 71]).buffer };
      if (u.endsWith('/pagina')) return { ok: true, status: 200, headers: hdr({ 'content-type': 'text/html' }), arrayBuffer: async () => new ArrayBuffer(4) };
      if (u.endsWith('/vai')) return { ok: false, status: 302, headers: hdr({ location: 'https://cdn.esempio.it/ok.png' }) };
      if (u.endsWith('/dentro')) return { ok: false, status: 302, headers: hdr({ location: 'https://interno.esempio.it/x.png' }) };
      return { ok: false, status: 404, headers: hdr({}) }; };
    try {
      const ok = await callP('https://cdn.esempio.it/ok.png'); assert.equal(ok.code, 200); assert.equal(ok.headers['Content-Type'], 'image/png'); assert.equal(ok.body.length, 4);
      assert.equal((await callP('https://cdn.esempio.it/pagina')).code, 415);
      assert.equal((await callP('https://cdn.esempio.it/vai')).code, 200);
      assert.equal((await callP('https://cdn.esempio.it/dentro')).code, 400);
      assert.equal((await callP('https://cdn.esempio.it/manca.png')).code, 502);
    } finally { globalThis.fetch = real; dnsP.lookup = realLookup; }
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni della ricerca delle foto');
})().catch((e) => { console.error(e); process.exit(1); });
