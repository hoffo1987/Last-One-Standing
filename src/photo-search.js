/* Ricerca delle foto dei concorrenti, senza chiavi né server propri.
   Fonti: Wikipedia (persone note, prima in italiano e poi in inglese), Openverse (foto con licenza libera)
   e Wikimedia Commons (archivio). Tutte rispondono al browser con CORS, quindi la foto scelta si può
   ritagliare in un canvas e salvare come data URL, come una foto caricata dal dispositivo.
   Se un sito non concede l'immagine al canvas, si riprova una volta attraverso il proxy d'immagini wsrv.nl. */
(function (G) {
  'use strict';
  const PAGE = 18;
  // «web» compare solo se il sito ha la funzione /api/immagini attiva (vedi api/immagini.js)
  const SOURCES = {
    web: { label: 'Web', name: 'il web (Brave Search)', hint: 'Tutto il web, come un motore di ricerca: personaggi, meme, qualunque cosa.', server: true },
    anime: { label: 'Anime e giochi', name: 'AniList, Fandom e Wikipedia', hint: 'Personaggi di anime, manga e videogiochi. Aggiungi la serie o il gioco per trovare anche i minori.' },
    wiki: { label: 'Persone note', name: 'Wikipedia', hint: 'Attori, sportivi, musicisti, personaggi storici e di fantasia.' },
    free: { label: 'Foto libere', name: 'Openverse', hint: 'Foto con licenza libera: animali, mestieri, costumi, oggetti, ritratti.' },
    commons: { label: 'Archivio', name: 'Wikimedia Commons', hint: 'L’archivio di Wikipedia: ritratti d’epoca, eventi, luoghi.' },
  };
  const qs = (o) => Object.keys(o).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(o[k])).join('&');
  const clean = (s) => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const shortTxt = (s, n) => (s.length > n ? s.slice(0, n - 1).trim() + '…' : s);
  async function getJSON(url, signal) {
    const r = await fetch(url, { signal, credentials: 'omit' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }
  // le pagine di una query MediaWiki nell'ordine della ricerca
  const pagesOf = (d) => Object.values((d && d.query && d.query.pages) || {}).sort((a, b) => (a.index || 0) - (b.index || 0));

  async function wiki(q, cur, signal) {
    const lang = (cur && cur.lang) || 'it', offset = (cur && cur.offset) || 0;
    const d = await getJSON('https://' + lang + '.wikipedia.org/w/api.php?' + qs({ action: 'query', format: 'json', origin: '*', generator: 'search', gsrsearch: q, gsrnamespace: 0, gsrlimit: PAGE, gsroffset: offset, prop: 'pageimages|description', piprop: 'thumbnail', pithumbsize: 480, pilimit: PAGE, pilicense: 'any' }), signal);
    const items = pagesOf(d).filter((p) => p.thumbnail && p.thumbnail.source && !/\.svg/i.test(p.thumbnail.source)).map((p) => ({
      id: 'w' + lang + p.pageid, src: p.thumbnail.source, title: clean(p.title), note: shortTxt(clean(p.description), 80),
      credit: 'Wikipedia (' + lang + ')', link: 'https://' + lang + '.wikipedia.org/?curid=' + p.pageid,
    }));
    // finite le pagine italiane, si continua su quella inglese
    const next = d.continue && d.continue.gsroffset ? { lang, offset: d.continue.gsroffset } : lang === 'it' ? { lang: 'en', offset: 0 } : null;
    return { items, next };
  }

  async function free(q, cur, signal) {
    const page = (cur && cur.page) || 1;
    const d = await getJSON('https://api.openverse.org/v1/images/?' + qs({ q, page, page_size: PAGE, mature: 'false' }), signal);
    const items = (d.results || []).filter((r) => r.thumbnail || r.url).map((r) => ({
      id: 'o' + r.id, src: r.thumbnail || r.url, title: shortTxt(clean(r.title) || 'Senza titolo', 70), note: '',
      credit: [clean(r.creator), r.license ? (r.license === 'cc0' || r.license === 'pdm' ? r.license.toUpperCase() : 'CC ' + r.license.toUpperCase() + (r.license_version ? ' ' + r.license_version : '')) : ''].filter(Boolean).join(' · '),
      link: r.foreign_landing_url || '',
    }));
    return { items, next: page < Math.min(+d.page_count || 0, 12) ? { page: page + 1 } : null };
  }

  async function commons(q, cur, signal) {
    const offset = (cur && cur.offset) || 0;
    const d = await getJSON('https://commons.wikimedia.org/w/api.php?' + qs({ action: 'query', format: 'json', origin: '*', generator: 'search', gsrsearch: q + ' filetype:bitmap', gsrnamespace: 6, gsrlimit: PAGE, gsroffset: offset, prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: 480, iiextmetadatafilter: 'Artist|LicenseShortName|ObjectName' }), signal);
    const items = pagesOf(d).map((p) => {
      const ii = p.imageinfo && p.imageinfo[0]; if (!ii || !ii.thumburl) return null;
      const m = ii.extmetadata || {}, val = (k) => clean(m[k] && m[k].value);
      return {
        id: 'c' + p.pageid, src: ii.thumburl, title: shortTxt(val('ObjectName') || String(p.title || '').replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' '), 70), note: '',
        credit: [shortTxt(val('Artist'), 40), val('LicenseShortName')].filter(Boolean).join(' · '), link: ii.descriptionurl || '',
      };
    }).filter(Boolean);
    return { items, next: d.continue && d.continue.gsroffset ? { offset: d.continue.gsroffset } : null };
  }

  /* ---------- anime, manga e videogiochi ---------- */
  const words = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  async function anilist(q, page, signal) {
    const query = 'query($q:String,$p:Int){Page(page:$p,perPage:' + PAGE + '){pageInfo{hasNextPage} characters(search:$q,sort:[SEARCH_MATCH,FAVOURITES_DESC]){id name{full native} image{large} siteUrl media(perPage:1,sort:POPULARITY_DESC){nodes{title{romaji english}}}}}}';
    const r = await fetch('https://graphql.anilist.co', { method: 'POST', signal, credentials: 'omit', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ query, variables: { q, p: page } }) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const P = ((await r.json()).data || {}).Page || {};
    const items = (P.characters || []).filter((c) => c.image && c.image.large && !/\/default\./.test(c.image.large)).map((c) => {
      const m = c.media && c.media.nodes && c.media.nodes[0], serie = m ? clean(m.title.english || m.title.romaji) : '';
      return { id: 'a' + c.id, src: c.image.large, full: c.image.large.replace('/medium/', '/large/'), title: clean(c.name.full || c.name.native), note: serie ? shortTxt(serie, 60) : '', credit: 'AniList', link: c.siteUrl || '' };
    });
    return { items, more: !!(P.pageInfo && P.pageInfo.hasNextPage) };
  }
  async function jikan(q, page, signal) {
    const d = await getJSON('https://api.jikan.moe/v4/characters?' + qs({ q, page, limit: PAGE, order_by: 'favorites', sort: 'desc' }), signal);
    const items = (d.data || []).map((c) => { const u = c.images && ((c.images.webp && c.images.webp.image_url) || (c.images.jpg && c.images.jpg.image_url)); return u && !/questionmark/.test(u) ? { id: 'j' + c.mal_id, src: u, full: (c.images.jpg && c.images.jpg.image_url) || '', title: clean(c.name), note: '', credit: 'MyAnimeList', link: c.url || '' } : null; }).filter(Boolean);
    return { items, more: !!(d.pagination && d.pagination.has_next_page) };
  }
  // il wiki Fandom di una serie: prima i nomi noti, poi le forme più comuni del sottodominio
  const FANDOM = { 'the legend of zelda': 'zelda', 'legend of zelda': 'zelda', 'genshin': 'genshin-impact', 'genshin impact': 'genshin-impact', 'dragon ball': 'dragonball', 'dragon ball z': 'dragonball', 'demon slayer': 'kimetsu-no-yaiba', 'kimetsu no yaiba': 'kimetsu-no-yaiba', 'jujutsu kaisen': 'jujutsu-kaisen', 'chainsaw man': 'chainsaw-man', 'honkai star rail': 'honkai-star-rail', 'star rail': 'honkai-star-rail', 'super mario': 'mario', 'super smash bros': 'supersmashbros', 'smash bros': 'supersmashbros', 'persona': 'megamitensei', 'shin megami tensei': 'megamitensei', 'the witcher': 'witcher', 'grand theft auto': 'gta', 'jojo s bizarre adventure': 'jojo', 'le bizzarre avventure di jojo': 'jojo', 'attacco dei giganti': 'attackontitan', 'l attacco dei giganti': 'attackontitan', 'shingeki no kyojin': 'attackontitan', 'pokemon': 'pokemon', 'boku no hero academia': 'myheroacademia', 'my hero academia': 'myheroacademia', 'neon genesis evangelion': 'evangelion', 'cavalieri dello zodiaco': 'saintseiya', 'saint seiya': 'saintseiya', 'lupin': 'lupin', 'lupin iii': 'lupin', 'detective conan': 'detectiveconan', 'dragon quest': 'dragonquest', 'final fantasy': 'finalfantasy', 'resident evil': 'residentevil', 'street fighter': 'streetfighter', 'mortal kombat': 'mortalkombat', 'league of legends': 'leagueoflegends', 'hunter x hunter': 'hunterxhunter', 'spy x family': 'spyxfamily', 'one piece': 'onepiece', 'sailor moon': 'sailormoon', 'elden ring': 'eldenring', 'dark souls': 'darksouls', 'kingdom hearts': 'kingdomhearts', 'fire emblem': 'fireemblem', 'metal gear': 'metalgear', 'metal gear solid': 'metalgear', 'apex legends': 'apexlegends', 'baldur s gate': 'baldursgate', 'hollow knight': 'hollowknight', 'death note': 'deathnote', 'blue lock': 'bluelock', 'fairy tail': 'fairytail', 'tokyo ghoul': 'tokyoghoul', 'sword art online': 'swordartonline', 'fullmetal alchemist': 'fma', 'cowboy bebop': 'cowboybebop' };
  function fandomWikis(series) {
    const w = words(series); if (!w) return [];
    const parts = w.split(' '), out = [];
    if (FANDOM[w]) out.push(FANDOM[w]);
    out.push(parts.join(''), parts.join('-'));
    if (parts.length > 1 && parts[0].length > 3) out.push(parts[0]);
    return [...new Set(out)].filter((x) => /^[a-z0-9-]{2,60}$/.test(x)).slice(0, 4);
  }
  const NOT_ART = /(icon|logo|symbol|emblem|flag|signature|button|banner|map|sprite sheet|favicon|wordmark|_ui|\bui\b|\.svg)/i;
  async function fandomWiki(sub, q, signal) {
    const api = 'https://' + sub + '.fandom.com/api.php?', base = { action: 'query', format: 'json', origin: '*' };
    const d = await getJSON(api + qs(Object.assign({}, base, { generator: 'search', gsrsearch: q, gsrnamespace: 0, gsrlimit: 8, prop: 'pageimages', piprop: 'thumbnail', pithumbsize: 480, pilicense: 'any' })), signal);
    const pages = pagesOf(d); if (!pages.length) return [];
    const name = sub.replace(/-/g, ' ');
    const items = pages.filter((p) => p.thumbnail && p.thumbnail.source && !NOT_ART.test(p.thumbnail.source)).map((p) => ({ id: 'f' + sub + p.pageid, src: p.thumbnail.source, title: clean(p.title), note: 'Fandom: ' + name, credit: sub + '.fandom.com', link: 'https://' + sub + '.fandom.com/?curid=' + p.pageid }));
    // poche anteprime: si prendono le immagini delle pagine più pertinenti (artwork, ritratti, screenshot)
    if (items.length < 6) {
      const titles = pages.slice(0, 3).map((p) => p.title).join('|');
      const d2 = await getJSON(api + qs(Object.assign({}, base, { generator: 'images', titles, gimlimit: 40, prop: 'imageinfo', iiprop: 'url|size|mime', iiurlwidth: 480 })), signal).catch(() => null);
      const want = words(q).split(' ').filter((x) => x.length > 2);
      const imgs = pagesOf(d2).map((p) => ({ p, ii: p.imageinfo && p.imageinfo[0] }))
        .filter((x) => x.ii && x.ii.thumburl && /image\/(jpeg|png|webp)/.test(x.ii.mime || '') && x.ii.width >= 140 && x.ii.height >= 140 && !NOT_ART.test(x.p.title))
        .map((x) => ({ x, score: want.filter((w) => words(x.p.title).includes(w)).length }))
        .sort((a, b) => b.score - a.score).slice(0, PAGE)
        .map(({ x }) => ({ id: 'f' + sub + x.p.pageid, src: x.ii.thumburl, title: shortTxt(clean(String(x.p.title).replace(/^[^:]+:/, '').replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' ')), 60), note: 'Fandom: ' + name, credit: sub + '.fandom.com', link: x.ii.descriptionurl || '' }));
      items.push(...imgs);
    }
    return items;
  }
  async function fandom(q, series, signal) {
    for (const sub of fandomWikis(series)) {
      try { const it = await fandomWiki(sub, q, signal); if (it.length) return it; } catch (e) { if (e && e.name === 'AbortError') throw e; }
    }
    return [];
  }
  // la voce inglese di Wikipedia ha spesso il ritratto ufficiale dei personaggi più famosi
  async function wikiCharacters(q, series, signal) {
    const r = await wiki((q + ' ' + (series || '')).trim(), { lang: 'en', offset: 0 }, signal);
    return r.items.slice(0, 6).map((x) => Object.assign({}, x, { credit: 'Wikipedia (en)' }));
  }
  async function anime(q, cur, signal, opt) {
    const page = (cur && cur.page) || 1, series = (opt && opt.series) || '';
    const jobs = [
      anilist(q, page, signal).catch((e) => { if (e && e.name === "AbortError") throw e; return jikan(q, page, signal); }),
      page === 1 && series ? fandom(q, series, signal) : Promise.resolve([]),
      page === 1 ? wikiCharacters(q, series, signal) : Promise.resolve([]),
    ];
    const [a, f, w] = await Promise.allSettled(jobs);
    if ([a, f, w].some((x) => x.status === 'rejected' && x.reason && x.reason.name === 'AbortError')) { const e = new Error('abort'); e.name = 'AbortError'; throw e; }
    if (a.status === 'rejected' && f.status === 'rejected' && w.status === 'rejected') throw a.reason;
    let ani = a.status === 'fulfilled' ? a.value.items : [];
    // con la serie indicata, i personaggi di AniList di quella serie vengono prima
    if (series) { const sw = words(series); ani = ani.map((x, k) => ({ x, k, hit: words(x.note).includes(sw.split(' ')[0]) ? 0 : 1 })).sort((m, n) => m.hit - n.hit || m.k - n.k).map((m) => m.x); }
    const items = [].concat(f.status === 'fulfilled' ? f.value : [], ani, w.status === 'fulfilled' ? w.value : []);
    return { items, next: a.status === 'fulfilled' && a.value.more ? { page: page + 1 } : null };
  }

  /* ---------- il web, tramite la funzione del sito (la chiave resta sul server) ---------- */
  // stato della fonte Web: 'on' attiva, 'nokey' funzione senza chiave, 'missing' funzione assente, 'local' file aperto dal disco
  let webOn = false;
  async function webStatus() {
    if (webOn) return 'on';
    if (typeof location === 'undefined' || !/^https?:$/.test(location.protocol)) return 'local';
    try {
      const r = await fetch('/api/immagini?ping=1&t=' + Date.now(), { credentials: 'omit', cache: 'no-store' });
      if (!r.ok) return 'missing';
      const d = await r.json().catch(() => null);
      if (!d || typeof d.enabled !== 'boolean') return 'missing';
      webOn = d.enabled; return d.enabled ? 'on' : 'nokey';
    } catch (e) { return 'missing'; }
  }
  const webAvailable = () => webStatus().then((x) => x === 'on');
  async function web(q, cur, signal) {
    const r = await fetch('/api/immagini?' + qs({ q }), { signal, credentials: 'same-origin' });
    if (!r.ok) { const e = new Error('HTTP ' + r.status); e.web = r.status === 503 ? 'nokey' : r.status === 404 ? 'missing' : r.status === 429 ? 'limit' : 'error'; throw e; }
    const d = await r.json();
    return { items: (d.items || []).filter((x) => x && x.src).map((x, k) => ({ id: 'web' + k + x.src, src: x.src, full: x.full || '', title: shortTxt(clean(x.title) || 'Immagine', 70), note: clean(x.site), credit: clean(x.site), link: x.link || '' })), next: null };
  }

  const ENGINES = { web, anime, wiki, free, commons };
  function search(source, q, cursor, signal, opt) {
    const fn = ENGINES[source]; if (!fn) return Promise.reject(new Error('fonte sconosciuta'));
    return fn(String(q || '').trim().slice(0, 120), cursor || null, signal, opt || {});
  }

  const isURL = (s) => /^https?:\/\/\S+$/i.test(String(s || '').trim());
  const proxy = (u, size) => 'https://wsrv.nl/?' + qs({ url: u, w: size * 2, h: size * 2, fit: 'cover', a: 'attention', output: 'jpg', q: 85 });
  function loadImage(src, timeout) {
    return new Promise((resolve, reject) => {
      const img = new Image(); let done = false;
      const end = (fn, v) => { if (done) return; done = true; clearTimeout(timer); fn(v); };
      const timer = setTimeout(() => { end(reject, new Error('timeout')); img.src = ''; }, timeout || 12000);
      if (!/^(data|blob):/.test(src)) { img.crossOrigin = 'anonymous'; img.referrerPolicy = 'no-referrer'; }
      img.onload = () => end(resolve, img); img.onerror = () => end(reject, new Error('load'));
      img.src = src;
    });
  }
  // ritaglio quadrato; nei ritratti verticali si tiene la parte alta, dove di solito c'è il volto
  function crop(img, size) {
    const W = img.naturalWidth || img.width, H = img.naturalHeight || img.height; if (!W || !H) throw new Error('vuota');
    const cv = document.createElement('canvas'); cv.width = cv.height = size;
    const k = Math.max(size / W, size / H), w = W * k, h = H * k;
    const x = (size - w) / 2, y = h > w * 1.05 ? (size - h) * 0.22 : (size - h) / 2;
    const ctx = cv.getContext('2d'); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, x, y, w, h);
    return cv.toDataURL('image/jpeg', 0.85); // lancia SecurityError se il sito non concede l'immagine
  }
  // il proxy del sito (api/immagine.js) esiste solo sul sito pubblicato, non nel file aperto dal disco
  const ownProxy = (u) => (typeof location !== 'undefined' && /^https?:$/.test(location.protocol) ? '/api/immagine?' + qs({ u }) : null);
  // un'immagine passa al ritaglio se il sito la concede al canvas; altrimenti la si chiede al proxy del sito,
  // poi a wsrv.nl; se la miniatura proprio non arriva, si riprova con l'immagine originale
  async function toDataURL(src, size, alts) {
    size = size || 160;
    if (/^(data|blob):/.test(src)) return crop(await loadImage(src), size);
    const urls = [src].concat((alts || []).filter((x) => x && x !== src && /^https:\/\//.test(x)));
    const tries = [];
    urls.forEach((u, k) => { if (!k) tries.push([u, 7000]); const own = ownProxy(u); if (own) tries.push([own, 12000]); tries.push([proxy(u, size), 12000]); });
    let last;
    for (const [u, ms] of tries) { try { return crop(await loadImage(u, ms), size); } catch (e) { last = e; } }
    throw last || new Error('load');
  }

  G.LOS_PHOTO = { SOURCES, search, toDataURL, crop, loadImage, isURL, webAvailable, webStatus, fandomWikis };
})(typeof window !== 'undefined' ? window : globalThis);
