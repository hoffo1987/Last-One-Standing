/* Last One Standing — cartoline da condividere (src/cartoline.js).
 * Immagini 1080×1350 (formato dei social) disegnate su canvas con la grafica del sito: il vincitore, un'eliminazione,
 * il riepilogo della partita, una carta dell'album, un trofeo. Si condividono col menu del telefono dove esiste,
 * altrimenti si scaricano come PNG. Più il link per rivedere la stessa partita (seme, cast e scelte, senza foto). */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const W = 1080, H = 1350;
  const css = (v, d) => { try { return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || d; } catch (e) { return d; } };
  const DISP = () => css('--f-display', 'Archivo, sans-serif'), BODY = () => css('--f-body', 'Figtree, sans-serif');
  const KEY = () => css('--key', '#f61e42'), KEYINK = () => css('--key-ink', '#0a0a0c');
  const VOID = '#0a0a0c', PAPER = '#f4f1ea', KILL = '#e5482f';
  const loadImg = (src) => new Promise((res) => { if (!src) return res(null); const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });

  /* ---------- strumenti di disegno ---------- */
  function canvas() { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; }
  function para(g, x, y, w, h, lean) { g.beginPath(); g.moveTo(x + lean, y); g.lineTo(x + w, y); g.lineTo(x + w - lean, y + h); g.lineTo(x, y + h); g.closePath(); }
  function frame(g, kicker) {
    g.fillStyle = VOID; g.fillRect(0, 0, W, H);
    // mezzitoni in diagonale
    g.fillStyle = 'rgba(255,255,255,.05)';
    for (let y = 0; y < H; y += 18) for (let x = (y / 18) % 2 ? 9 : 0; x < W; x += 18) { const r = 1.2 + 3.2 * (x + y) / (W + H); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
    // la lama nella tinta
    g.fillStyle = KEY(); g.beginPath(); g.moveTo(0, 210); g.lineTo(W, 120); g.lineTo(W, 168); g.lineTo(0, 258); g.closePath(); g.fill();
    // testata
    g.fillStyle = PAPER; g.font = 'italic 900 34px ' + DISP(); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillText('LAST ONE STANDING', 64, 92);
    if (kicker) { g.font = '800 26px ' + BODY(); const w = g.measureText(kicker.toUpperCase()).width + 44; g.fillStyle = KEY(); para(g, 64, 112, w, 46, 12); g.fill(); g.fillStyle = KEYINK(); g.fillText(kicker.toUpperCase(), 86, 145); }
  }
  function footer(g, txt) {
    g.fillStyle = PAPER; g.globalAlpha = 0.6; g.font = '700 24px ' + BODY(); g.textAlign = 'left';
    g.fillText(txt, 64, H - 52); g.globalAlpha = 1;
  }
  function fit(g, text, max, size, weight, font) { let s = size; do { g.font = (weight || 'italic 900') + ' ' + s + 'px ' + (font || DISP()); if (g.measureText(text).width <= max) break; s -= 4; } while (s > 24); return s; }
  function wrap(g, text, x, y, max, lh, lines) {
    const words = String(text).split(/\s+/); let line = '', n = 0;
    for (let i = 0; i < words.length; i++) {
      const t = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(t).width > max && line) { g.fillText(line, x, y + n * lh); n++; line = words[i]; if (n >= lines) return n; } else line = t;
    }
    if (line && n < lines) { g.fillText(line, x, y + n * lh); n++; }
    return n;
  }
  // il volto: la foto, oppure il volto di riserva del sito (stesso concorrente, stessa faccia), dentro una lastra inclinata
  async function face(g, t, x, y, w, h, opt) {
    opt = opt || {};
    const LK = G.LOS_LOOK, src = t.img || (LK && LK.fx && LK.pickFor(LK.fx.volti, t.gender, t.id)) || '';
    g.save(); para(g, x, y, w, h, opt.lean == null ? 60 : opt.lean); g.clip();
    g.fillStyle = t.color || '#444'; g.fillRect(x, y, w, h);
    const im = await loadImg(src);
    if (im) {
      const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), iw = im.naturalWidth * s, ih = im.naturalHeight * s;
      if (opt.grey) g.filter = 'grayscale(1) contrast(1.15)';
      g.drawImage(im, x + (w - iw) / 2, y + (h - ih) * 0.3, iw, ih); g.filter = 'none';
    } else { g.fillStyle = PAPER; g.font = 'italic 900 ' + Math.round(h * 0.4) + 'px ' + DISP(); g.textAlign = 'center'; g.fillText((t.name || '?').slice(0, 2).toUpperCase(), x + w / 2, y + h * 0.62); g.textAlign = 'left'; }
    if (opt.tint) { g.globalCompositeOperation = 'multiply'; g.fillStyle = opt.tint; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    g.restore();
    // ombra dura nella tinta
    g.save(); g.globalCompositeOperation = 'destination-over'; g.fillStyle = opt.shadow || KEY(); para(g, x + 18, y + 18, w, h, opt.lean == null ? 60 : opt.lean); g.fill(); g.restore();
  }
  function stat(g, x, y, num, label, color) {
    g.fillStyle = color || KEY(); g.font = 'italic 900 88px ' + DISP(); g.textAlign = 'left'; g.fillText(String(num), x, y);
    g.fillStyle = PAPER; g.font = '800 22px ' + BODY(); g.fillText(label.toUpperCase(), x + 4, y + 36);
  }
  const genre = (t, m, f, n) => (t && t.gender === 'F' ? f : t && t.gender === 'N' ? n : m);

  /* ---------- le cartoline ---------- */
  async function vincitore(SIM, theme) {
    const [c, g] = canvas(); frame(g, theme.name + ' · ' + SIM.days + (SIM.days === 1 ? ' giorno' : ' giorni'));
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), Wn = SIM.winners.map((id) => by[id]);
    if (Wn.length === 1) {
      const w = Wn[0];
      await face(g, w, 120, 300, 840, 640);
      g.fillStyle = PAPER; g.font = 'italic 900 64px ' + DISP(); g.fillText(genre(w, 'ULTIMO IN PIEDI', 'ULTIMA IN PIEDI', 'ULTIMƏ IN PIEDI'), 64, 1030);
      fit(g, w.name.toUpperCase(), 950, 150); g.fillStyle = KEY(); g.fillText(w.name.toUpperCase(), 60, 1170);
      g.fillStyle = PAPER; g.font = '700 32px ' + BODY(); g.fillText(w.kills + (theme.soft ? (w.kills === 1 ? ' eliminazione' : ' eliminazioni') : (w.kills === 1 ? ' uccisione' : ' uccisioni')) + ' · su ' + SIM.tributes.length + ' concorrenti', 64, 1225);
    } else {
      const n = Math.max(1, Wn.length), cw = Math.min(420, 900 / n);
      for (let k = 0; k < Wn.length; k++) await face(g, Wn[k], 90 + k * (cw + 20), 340, cw, 560, { lean: 40 });
      g.fillStyle = PAPER; g.font = 'italic 900 70px ' + DISP(); g.fillText(Wn.length ? 'VINCE LA SQUADRA ' + Wn[0].team : 'NESSUN SUPERSTITE', 64, 1040);
      g.fillStyle = KEY(); g.font = 'italic 900 46px ' + DISP(); wrap(g, Wn.map((t) => t.name).join(' · ').toUpperCase(), 64, 1110, 950, 56, 2);
    }
    footer(g, 'Chi resterà in piedi? · ' + new Date().toLocaleDateString('it-IT'));
    return c;
  }
  async function eliminazione(SIM, id, theme) {
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), t = by[id]; if (!t) return null;
    const [c, g] = canvas(); frame(g, theme.soft ? 'Fuori dai giochi' : 'Eliminazione');
    await face(g, t, 120, 300, 840, 600, { grey: true, shadow: KILL });
    // il timbro
    g.save(); g.translate(720, 820); g.rotate(-0.14); g.fillStyle = KILL; para(g, -250, -70, 500, 120, 30); g.fill();
    g.fillStyle = '#fff'; g.font = 'italic 900 96px ' + DISP(); g.textAlign = 'center'; g.fillText('FUORI', 0, 22); g.restore(); g.textAlign = 'left';
    fit(g, t.name.toUpperCase(), 950, 130); g.fillStyle = PAPER; g.fillText(t.name.toUpperCase(), 60, 1030);
    g.fillStyle = KEY(); g.font = 'italic 900 44px ' + DISP(); g.fillText(t.rank + 'º SU ' + SIM.tributes.length + ' · GIORNO ' + (t.deathDay || '?'), 64, 1090);
    const killer = (t.killerIds || []).map((k) => by[k]).find(Boolean);
    g.fillStyle = PAPER; g.font = '600 34px ' + BODY();
    const txt = (t.deathText || (killer ? 'Per mano di ' + killer.name + '.' : '')).replace(/<[^>]+>/g, '');
    wrap(g, txt, 64, 1150, 950, 44, 3);
    footer(g, theme.name + ' · Last One Standing');
    return c;
  }
  async function riepilogo(SIM, theme, extra) {
    extra = extra || {};
    const [c, g] = canvas(); frame(g, 'La partita');
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), Wn = SIM.winners.map((id) => by[id]);
    fit(g, theme.name.toUpperCase(), 950, 110); g.fillStyle = PAPER; g.fillText(theme.name.toUpperCase(), 60, 380);
    const st = SIM.stats || {};
    stat(g, 64, 520, SIM.days, SIM.days === 1 ? 'giorno' : 'giorni'); stat(g, 360, 520, SIM.tributes.length, 'concorrenti'); stat(g, 700, 520, st.betrayals || 0, 'tradimenti');
    if (Wn[0]) { await face(g, Wn[0], 64, 640, 360, 420, { lean: 36 }); g.fillStyle = KEY(); g.font = '800 26px ' + BODY(); g.fillText(Wn.length > 1 ? 'VINCONO' : 'VINCE', 470, 700); fit(g, Wn.map((t) => t.name).join(', ').toUpperCase(), 540, 80); g.fillStyle = PAPER; g.fillText(Wn.map((t) => t.name).join(', ').toUpperCase(), 466, 780); }
    const top = SIM.tributes.slice().sort((a, b) => b.kills - a.kills).filter((t) => t.kills).slice(0, 3);
    g.fillStyle = PAPER; g.font = '800 24px ' + BODY(); g.fillText(theme.soft ? 'CHI HA ELIMINATO DI PIÙ' : 'CHI HA UCCISO DI PIÙ', 470, 860);
    top.forEach((t, k) => { g.font = 'italic 900 40px ' + DISP(); g.fillStyle = k ? PAPER : KEY(); g.fillText(t.kills + '  ' + t.name.toUpperCase(), 470, 915 + k * 52); });
    if (extra.tu) { g.fillStyle = KEY(); para(g, 64, 1110, 952, 110, 24); g.fill(); g.fillStyle = KEYINK(); g.font = 'italic 900 40px ' + DISP(); wrap(g, extra.tu.toUpperCase(), 100, 1178, 880, 46, 1); }
    footer(g, 'Last One Standing · ' + new Date().toLocaleDateString('it-IT'));
    return c;
  }
  async function carta(x, rar) {
    const [c, g] = canvas(); frame(g, 'Album · ' + rar.nome);
    const col = { comune: '#9a9a9a', rara: '#5aa9e6', epica: '#b06ce0', leggendaria: '#e3b04b' }[rar.k] || KEY();
    await face(g, Object.assign({ color: col }, x), 140, 300, 800, 660, { shadow: col });
    fit(g, x.name.toUpperCase(), 950, 130); g.fillStyle = PAPER; g.fillText(x.name.toUpperCase(), 60, 1080);
    stat(g, 64, 1210, x.partite, x.partite === 1 ? 'partita' : 'partite', col); stat(g, 380, 1210, x.vittorie, x.vittorie === 1 ? 'vittoria' : 'vittorie', col); stat(g, 700, 1210, x.uccisioni, 'eliminazioni', col);
    return c;
  }
  async function trofeo(t, quando) {
    const [c, g] = canvas(); frame(g, 'Trofeo sbloccato');
    g.save(); g.translate(540, 640); g.fillStyle = KEY(); g.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k - Math.PI / 2; g.lineTo(Math.cos(a) * 260, Math.sin(a) * 260); } g.closePath(); g.fill();
    g.fillStyle = VOID; g.font = 'italic 900 200px ' + DISP(); g.textAlign = 'center'; g.fillText('★', 0, 70); g.restore(); g.textAlign = 'left';
    fit(g, t.nome.toUpperCase(), 950, 110); g.fillStyle = PAPER; g.fillText(t.nome.toUpperCase(), 60, 1040);
    g.font = '600 38px ' + BODY(); wrap(g, t.desc, 64, 1110, 950, 48, 3);
    footer(g, (t.cat || '') + (quando ? ' · ' + new Date(quando).toLocaleDateString('it-IT') : ''));
    return c;
  }

  /* ---------- condividere ---------- */
  function blob(c) { return new Promise((res) => c.toBlob((b) => res(b), 'image/png')); }
  async function condividi(c, nome, titolo) {
    const b = await blob(c); if (!b) return 'errore';
    const file = new File([b], nome + '.png', { type: 'image/png' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: titolo || 'Last One Standing' }); return 'condivisa'; } }
    catch (e) { if (e && e.name === 'AbortError') return 'annullata'; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nome + '.png'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    return 'scaricata';
  }

  /* ---------- il link della partita: configurazione compressa nell'indirizzo (senza foto) ---------- */
  const b64u = (bytes) => { let s = ''; bytes.forEach((x) => (s += String.fromCharCode(x))); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const unb64u = (s) => { const b = atob(s.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, (c) => c.charCodeAt(0)); };
  async function pipe(bytes, Stream) { const r = new Response(new Blob([bytes]).stream().pipeThrough(new Stream('deflate-raw'))); return new Uint8Array(await r.arrayBuffer()); }
  async function codifica(cfg) {
    const lean = Object.assign({}, cfg, { cast: cfg.cast.map((t) => Object.assign({}, t, { img: '' })) });
    const raw = new TextEncoder().encode(JSON.stringify(lean));
    return typeof CompressionStream === 'function' ? 'z' + b64u(await pipe(raw, CompressionStream)) : 'j' + b64u(raw);
  }
  async function decodifica(s) {
    const kind = s[0], bytes = unb64u(s.slice(1));
    const raw = kind === 'z' ? await pipe(bytes, DecompressionStream) : bytes;
    return JSON.parse(new TextDecoder().decode(raw));
  }

  G.LOS_CARTOLINE = { vincitore, eliminazione, riepilogo, carta, trofeo, condividi, codifica, decodifica };
})(typeof window !== 'undefined' ? window : globalThis);
