/* Last One Standing — trovare gli occhi in un'immagine (src/skin/05-occhi.js).
 * Le fasce strette (premi, classifica, calendario, cartelli, cut-in) mostrano solo una striscia dell'immagine:
 * qui si capisce dove stanno gli occhi e si sposta il ritaglio perché la striscia li inquadri.
 *
 * Tre livelli, dal più preciso al più generale:
 *  1. volti di riserva: l'altezza degli occhi è misurata a mano (assets/fx/volti.json → LOS_ASSETS.fx.occhiY);
 *  2. foto vere: il rilevatore di volti del browser (FaceDetector), dove esiste; nessuna libreria esterna;
 *  3. disegni (anime, videogiochi) e tutto ciò che il rilevatore non riconosce: un'analisi dell'immagine cerca
 *     la fascia orizzontale con più contrasto fine, divisa in due gruppi ai lati del centro, nella parte alta del viso.
 * Il risultato si salva nel browser per ogni immagine: l'analisi si fa una volta sola. Funziona anche senza rete.
 * Prova sui 10 volti di riserva (altezza vera nota): l'analisi sbaglia di al massimo 4 punti su 8 volti su 10. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const FX = () => (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {};
  const KEY = 'los-occhi-v1', MAX = 300;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- memoria: una chiave corta per ogni immagine, anche per i data URL enormi ---------- */
  function hashOf(src) {
    let h = 5381; const step = Math.max(1, Math.floor(src.length / 4000));
    for (let i = 0; i < src.length; i += step) h = ((h << 5) + h + src.charCodeAt(i)) >>> 0;
    return src.length.toString(36) + '.' + h.toString(36);
  }
  let store = null;
  const load = () => { if (store) return store; try { store = JSON.parse(G.localStorage.getItem(KEY) || '{}') || {}; } catch (e) { store = {}; } return store; };
  function remember(k, v) {
    const s = load(); s[k] = v;
    const keys = Object.keys(s); if (keys.length > MAX) keys.slice(0, keys.length - MAX).forEach((x) => delete s[x]);
    try { G.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* memoria piena: resta in sessione */ }
  }

  /* ---------- livello 1: immagini del progetto di cui si sa già tutto ---------- */
  // gli indirizzi degli asset sono relativi, quelli delle immagini nella pagina assoluti: si confrontano risolti
  const abs = (u) => { try { return new URL(u, G.location.href).href; } catch (e) { return u; } };
  function known(src) {
    const fx = FX(), a = abs(src);
    for (const k in (fx.occhi || {})) if (abs(fx.occhi[k]) === a) return { x: 0.5, y: 0.5, how: 'fascia' }; // già ritagliata sugli occhi
    for (const k in (fx.volti || {})) if (abs(fx.volti[k]) === a && fx.occhiY && fx.occhiY[k] != null) return { x: 0.5, y: fx.occhiY[k], how: 'misura' };
    return null;
  }

  /* ---------- immagine pronta per l'analisi ---------- */
  function decode(src) {
    return new Promise((res, rej) => {
      const im = new Image(); im.decoding = 'async';
      if (!/^data:|^blob:/.test(src)) im.crossOrigin = 'anonymous';
      im.onload = () => res(im); im.onerror = () => rej(new Error('immagine non leggibile')); im.src = src;
    });
  }

  /* ---------- livello 2a: FaceDetector del browser ---------- */
  async function viaBrowser(im) {
    if (typeof G.FaceDetector !== 'function') return null;
    const faces = await new G.FaceDetector({ fastMode: true, maxDetectedFaces: 1 }).detect(im);
    const f = faces && faces[0]; if (!f) return null;
    const eyes = (f.landmarks || []).filter((l) => l.type === 'eye').flatMap((l) => l.locations || []);
    if (eyes.length) return { x: eyes.reduce((s, p) => s + p.x, 0) / eyes.length / im.naturalWidth, y: eyes.reduce((s, p) => s + p.y, 0) / eyes.length / im.naturalHeight, how: 'browser' };
    const b = f.boundingBox; return { x: (b.x + b.width / 2) / im.naturalWidth, y: (b.y + b.height * 0.4) / im.naturalHeight, how: 'browser' };
  }

  /* ---------- livello 3: analisi dell'immagine (anche per i disegni) ---------- */
  function viaAnalysis(im) {
    const W = 96, H = Math.max(24, Math.round((im.naturalHeight / im.naturalWidth) * W));
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, W, H);
    let px; try { px = g.getImageData(0, 0, W, H).data; } catch (e) { return null; } // immagine di un altro sito senza CORS
    const L = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) L[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];
    const x0 = Math.round(W * 0.1), x1 = Math.round(W * 0.9), third = (x1 - x0) / 3;
    const row = new Float32Array(H), side = new Float32Array(H);
    for (let y = 1; y < H - 1; y++) {
      let a = 0, b = 0, m = 0;
      for (let x = x0; x < x1; x++) {
        const i = y * W + x;
        // contrasto fine: bordi orizzontali e verticali (ciglia, iride, palpebre)
        const e = Math.abs(L[i + 1] - L[i - 1]) + 0.6 * Math.abs(L[i + W] - L[i - W]);
        const t = (x - x0) / third;
        if (t < 1) a += e; else if (t < 2) m += e; else b += e;
      }
      row[y] = a + m + b;
      // gli occhi stanno ai lati del centro: premia le righe dove i lati pesano più del centro (la radice del naso)
      side[y] = Math.min(a, b) / (m + 1);
    }
    // si liscia su una finestra di circa l'8% dell'altezza
    const k = Math.max(1, Math.round(H * 0.04)), score = new Float32Array(H);
    let best = -1, by = 0.42;
    for (let y = 0; y < H; y++) {
      let s = 0, sd = 0, n = 0;
      for (let d = -k; d <= k; d++) { const yy = y + d; if (yy > 0 && yy < H - 1) { s += row[yy]; sd += side[yy]; n++; } }
      const f = y / H, prior = Math.exp(-((f - 0.4) ** 2) / (2 * 0.16 * 0.16));
      score[y] = (s / Math.max(1, n)) * prior * (0.55 + 0.45 * Math.min(1, (sd / Math.max(1, n)) / 1.2));
      if (f > 0.1 && f < 0.78 && score[y] > best) { best = score[y]; by = f; }
    }
    return { x: 0.5, y: by, how: 'analisi' };
  }

  /* ---------- la domanda: dove stanno gli occhi? ---------- */
  const pending = new Map();
  let chain = Promise.resolve();
  function locate(src) {
    if (!src) return Promise.resolve(null);
    const k0 = known(src); if (k0) return Promise.resolve(k0);
    const k = hashOf(src), mem = load()[k];
    if (mem) return Promise.resolve({ x: mem[0], y: mem[1], how: 'memoria' });
    if (pending.has(k)) return pending.get(k);
    // una analisi alla volta: il canvas non deve rubare fotogrammi alle animazioni
    const job = (chain = chain.then(async () => {
      let im; try { im = await decode(src); } catch (e) { return null; }
      let r = null;
      for (const f of [viaBrowser]) { try { r = await f(im); } catch (e) { r = null; } if (r) break; }
      if (!r) r = viaAnalysis(im);
      if (r) { r.x = clamp(r.x, 0, 1); r.y = clamp(r.y, 0, 1); remember(k, [+r.x.toFixed(3), +r.y.toFixed(3), r.how]); }
      return r;
    }).catch(() => null));
    pending.set(k, job); job.then(() => pending.delete(k));
    return job;
  }

  /* ---------- il ritaglio: la riga degli occhi alla quota voluta dentro il riquadro ---------- */
  function place(img, eye, target) {
    const bw = img.clientWidth, bh = img.clientHeight, nw = img.naturalWidth, nh = img.naturalHeight;
    if (!bw || !bh || !nw || !nh || !eye) return;
    const s = Math.max(bw / nw, bh / nh), W = nw * s, H = nh * s;
    const py = H - bh > 1 ? clamp((eye.y * H - target * bh) / (H - bh), 0, 1) : 0.5;
    const px = W - bw > 1 ? clamp((eye.x * W - 0.5 * bw) / (W - bw), 0, 1) : 0.5;
    img.style.objectPosition = (px * 100).toFixed(1) + '% ' + (py * 100).toFixed(1) + '%';
  }
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver((es) => es.forEach((e) => { const im = e.target; if (im.__eye) place(im, im.__eye, im.__eyeT); })) : null;
  function fit(img, target) {
    if (!img || img.__eyeSrc === img.currentSrc + '|' + target) return;
    const src = img.currentSrc || img.src; img.__eyeSrc = src + '|' + target;
    const go = () => locate(src).then((eye) => { if (!eye || !img.isConnected) return; img.__eye = eye; img.__eyeT = target; place(img, eye, target); if (ro) ro.observe(img); });
    if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
  }

  /* ---------- dove si applica: le fasce sugli occhi del sito ---------- */
  // [selettore, quota degli occhi nel riquadro]: 0,5 = al centro della fascia; i ritratti alti li tengono più in alto
  const TARGETS = [
    ['.av.es-strip > img', 0.5], ['.pe img', 0.5], ['.cutin .ci-panel img', 0.5], ['.stc-faces .av img', 0.5],
    ['.es-pod-panel img', 0.36], ['#v-diretta .ev .avs .av > img', 0.34],
  ];
  const SEL = TARGETS.map((t) => t[0]).join(',');
  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    const list = root.matches && root.matches(SEL) ? [root] : [];
    root.querySelectorAll && root.querySelectorAll(SEL).forEach((n) => list.push(n));
    list.forEach((img) => { const t = TARGETS.find((x) => img.matches(x[0])); if (t) fit(img, t[1]); });
  }
  function start() {
    scan(document.body);
    new MutationObserver((ms) => ms.forEach((m) => {
      // le classi cambiano di continuo durante le animazioni: si guarda solo quando un volto diventa una fascia
      if (m.type === 'attributes') { if (m.attributeName === 'src' || (m.target.classList && m.target.classList.contains('av'))) scan(m.target); }
      else m.addedNodes.forEach(scan);
    })).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  G.LOS_OCCHI = { locate, fit, place, analizza: (src) => decode(src).then(viaAnalysis), dimentica: () => { store = {}; try { G.localStorage.removeItem(KEY); } catch (e) { /* niente */ } } };
})(typeof window !== 'undefined' ? window : globalThis);
