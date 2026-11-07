/* Proxy d'immagini del sito, per le foto dei concorrenti.
   Alcuni siti (wiki Fandom, MyAnimeList…) mostrano le immagini ma non le concedono al canvas del browser:
   qui il server le scarica e le restituisce dallo stesso dominio del sito, così si possono ritagliare.
   Nessuna chiave. Protezioni: solo https, solo indirizzi pubblici, solo immagini, al massimo 6 MB,
   solo richieste dalle pagine di questo sito.
   GET /api/immagine?u=<url dell'immagine> */
'use strict';

const dns = require('node:dns').promises;
const net = require('node:net');
const MAX = 6 * 1024 * 1024;

function privateIP(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const x = ip.toLowerCase();
  if (x.startsWith('::ffff:')) return privateIP(x.slice(7));
  return x === '::1' || x === '::' || x.startsWith('fc') || x.startsWith('fd') || x.startsWith('fe80');
}
async function publicURL(raw) {
  let u; try { u = new URL(String(raw || '')); } catch (e) { return null; }
  if (u.protocol !== 'https:' || u.username || u.password || (u.port && u.port !== '443')) return null;
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (!host.includes('.') || /\.(local|internal|localhost)$/i.test(host)) return null;
  if (net.isIP(host)) return privateIP(host) ? null : u;
  try { const all = await dns.lookup(host, { all: true }); if (!all.length || all.some((a) => privateIP(a.address))) return null; } catch (e) { return null; }
  return u;
}

module.exports = async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'metodo' }); }
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  const from = String(req.headers.origin || req.headers.referer || '');
  if (from && host && !from.replace(/^https?:\/\//, '').startsWith(host)) return res.status(403).json({ error: 'origine' });
  let u = await publicURL((req.query || {}).u);
  if (!u) return res.status(400).json({ error: 'indirizzo' });
  try {
    let r, hops = 0;
    // i reindirizzamenti si seguono a mano, controllando ogni volta che l'indirizzo sia pubblico
    for (;;) {
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 9000);
      r = await fetch(u, { redirect: 'manual', signal: ctl.signal, headers: { Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8', 'User-Agent': 'Mozilla/5.0 (compatible; LastOneStanding/1.0; foto dei concorrenti)' } }).finally(() => clearTimeout(timer));
      if (r.status >= 300 && r.status < 400 && r.headers.get('location') && hops++ < 3) { u = await publicURL(new URL(r.headers.get('location'), u).href); if (!u) return res.status(400).json({ error: 'indirizzo' }); continue; }
      break;
    }
    if (!r.ok) return res.status(502).json({ error: 'origine ' + r.status });
    const type = String(r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!/^image\/(jpeg|png|webp|gif|avif)$/.test(type)) return res.status(415).json({ error: 'non è un’immagine' });
    if (+r.headers.get('content-length') > MAX) return res.status(413).json({ error: 'troppo grande' });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > MAX) return res.status(413).json({ error: 'troppo grande' });
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
    return res.status(200).send(buf);
  } catch (e) {
    return res.status(504).json({ error: 'tempo scaduto' });
  }
};
module.exports.publicURL = publicURL;
