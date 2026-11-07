/* Ricerca d'immagini sul web per le foto dei concorrenti, come funzione serverless di Vercel.
   Usa la Brave Search API (endpoint immagini). È spenta finché nelle impostazioni del progetto Vercel
   non c'è la variabile d'ambiente BRAVE_API_KEY: la chiave resta sul server e non arriva mai al browser.
   GET /api/immagini?ping=1  -> { enabled }
   GET /api/immagini?q=...   -> { items: [{ src, full, title, site, link }] } */
'use strict';

const LIMIT = 50;
const clean = (s) => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

module.exports = async function handler(req, res) {
  const key = process.env.BRAVE_API_KEY;
  const query = req.query || {};
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'metodo' }); }
  if (query.ping) { res.setHeader('Cache-Control', 'public, max-age=300'); return res.status(200).json({ enabled: !!key }); }
  if (!key) { res.setHeader('Cache-Control', 'no-store'); return res.status(503).json({ error: 'spenta', enabled: false }); }

  // solo dalle pagine di questo sito: evita che altri consumino il credito della chiave
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  const from = String(req.headers.origin || req.headers.referer || '');
  if (from && host && !from.replace(/^https?:\/\//, '').startsWith(host)) return res.status(403).json({ error: 'origine' });

  const q = clean(query.q).slice(0, 120);
  if (q.length < 2) return res.status(400).json({ error: 'testo' });

  try {
    const url = 'https://api.search.brave.com/res/v1/images/search?' + new URLSearchParams({ q, count: String(LIMIT), safesearch: 'strict', spellcheck: '1' });
    const r = await fetch(url, { headers: { Accept: 'application/json', 'X-Subscription-Token': key } });
    if (!r.ok) { res.setHeader('Cache-Control', 'no-store'); return res.status(r.status === 429 ? 429 : 502).json({ error: 'brave ' + r.status }); }
    const d = await r.json();
    const items = (d.results || []).map((x) => ({
      src: (x.thumbnail && x.thumbnail.src) || (x.properties && x.properties.url) || '',
      full: (x.properties && x.properties.url) || '',
      title: clean(x.title).slice(0, 140),
      site: clean(x.source || (x.meta_url && x.meta_url.hostname) || ''),
      link: x.url || '',
    })).filter((x) => /^https:\/\//.test(x.src));
    // la stessa ricerca resta in cache un giorno sulla rete di Vercel: meno richieste a Brave
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({ items });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'rete' });
  }
};
