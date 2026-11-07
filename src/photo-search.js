/* Ricerca delle foto dei concorrenti, senza chiavi né server propri.
   Fonti: Wikipedia (persone note, prima in italiano e poi in inglese), Openverse (foto con licenza libera)
   e Wikimedia Commons (archivio). Tutte rispondono al browser con CORS, quindi la foto scelta si può
   ritagliare in un canvas e salvare come data URL, come una foto caricata dal dispositivo.
   Se un sito non concede l'immagine al canvas, si riprova una volta attraverso il proxy d'immagini wsrv.nl. */
(function (G) {
  'use strict';
  const PAGE = 18;
  const SOURCES = {
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
    const d = await getJSON('https://' + lang + '.wikipedia.org/w/api.php?' + qs({ action: 'query', format: 'json', origin: '*', generator: 'search', gsrsearch: q, gsrnamespace: 0, gsrlimit: PAGE, gsroffset: offset, prop: 'pageimages|description', piprop: 'thumbnail', pithumbsize: 480, pilimit: PAGE }), signal);
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

  const ENGINES = { wiki, free, commons };
  function search(source, q, cursor, signal) {
    const fn = ENGINES[source]; if (!fn) return Promise.reject(new Error('fonte sconosciuta'));
    return fn(String(q || '').trim().slice(0, 120), cursor || null, signal);
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
  async function toDataURL(src, size) {
    size = size || 160;
    const tries = /^(data|blob):/.test(src) ? [src] : [src, proxy(src, size)];
    let last;
    for (const u of tries) { try { return crop(await loadImage(u), size); } catch (e) { last = e; } }
    throw last || new Error('load');
  }

  G.LOS_PHOTO = { SOURCES, search, toDataURL, crop, loadImage, isURL };
})(typeof window !== 'undefined' ? window : globalThis);
