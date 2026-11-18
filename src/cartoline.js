/* Last One Standing — cartoline da condividere (src/cartoline.js).
 * Immagini 1080×1350 (formato dei social) disegnate su canvas con la grafica del sito: il vincitore, un'eliminazione,
 * il riepilogo della partita, una carta dell'album, un trofeo. Si condividono col menu del telefono dove esiste,
 * altrimenti si scaricano come PNG. Più il link per rivedere la stessa partita (seme, cast e scelte, senza foto).
 * Il disegno: fondo nero con i mezzitoni nella tinta, lastre inclinate, titoli enormi in corsivo con l'ombra piena,
 * una fascia nella tinta in fondo. Le immagini vengono dalla stessa origine (o sono data URI): la tela resta pulita. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const W = 1080, H = 1350;
  const css = (v, d) => { try { return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || d; } catch (e) { return d; } };
  const DISP = () => css('--f-display', 'Archivo, sans-serif'), BODY = () => css('--f-body', 'Figtree, sans-serif');
  const KEY = () => css('--key', '#f61e42'), KEYINK = () => css('--key-ink', '#0a0a0c');
  const VOID = '#0a0a0c', PAPER = '#f4f1ea', KILL = '#e5482f';
  const loadImg = (src) => new Promise((res) => { if (!src) return res(null); const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
  const FXA = () => (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {};
  const up = (s) => String(s == null ? '' : s).toUpperCase();
  const oggi = () => new Date().toLocaleDateString('it-IT');

  /* ---------- strumenti di disegno ---------- */
  function canvas() { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.textBaseline = 'alphabetic'; g.lineJoin = 'miter'; return [c, g]; }
  // i due caratteri: il titolo (corsivo, nero, largo dove il browser lo sa fare) e il testo
  function disp(g, size) { try { g.fontStretch = 'expanded'; } catch (e) { /* niente */ } g.font = 'italic 900 ' + size + 'px ' + DISP(); }
  function body(g, size, weight) { try { g.fontStretch = 'normal'; } catch (e) { /* niente */ } g.font = (weight || 700) + ' ' + size + 'px ' + BODY(); }
  function spazio(g, v) { try { g.letterSpacing = v; } catch (e) { /* niente */ } }
  function para(g, x, y, w, h, lean) { g.beginPath(); g.moveTo(x + lean, y); g.lineTo(x + w, y); g.lineTo(x + w - lean, y + h); g.lineTo(x, y + h); g.closePath(); }
  // un rettangolo con due angoli tagliati (in alto a destra e in basso a sinistra), come le carte del sito
  function tagliato(g, x, y, w, h, c) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + w - c, y); g.lineTo(x + w, y + c); g.lineTo(x + w, y + h); g.lineTo(x + c, y + h); g.lineTo(x, y + h - c); g.closePath(); }
  function esagono(g, cx, cy, r) { g.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k - Math.PI / 2; g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 1.04); } g.closePath(); }
  // mezzitoni: pallini che crescono lungo la diagonale, dentro un'area
  function mezzitoni(g, x, y, w, h, col, alpha, passo, r0, r1) {
    g.save(); g.fillStyle = col; g.globalAlpha = alpha;
    for (let j = 0, yy = y; yy < y + h; yy += passo, j++) for (let xx = x + (j % 2 ? passo / 2 : 0); xx < x + w; xx += passo) {
      const k = ((xx - x) / w + (yy - y) / h) / 2, r = r0 + (r1 - r0) * k * k; if (r < 0.4) continue;
      g.beginPath(); g.arc(xx, yy, r, 0, Math.PI * 2); g.fill();
    }
    g.restore();
  }
  // la stella dell'impatto: punte irregolari, sempre le stesse
  function raggi(g, cx, cy, r1, r2, n, col) {
    g.fillStyle = col; g.beginPath();
    for (let k = 0; k < n * 2; k++) { const a = Math.PI * k / n - Math.PI / 2 + 0.12, r = k % 2 ? r2 * (0.9 + 0.1 * ((k * 5) % 7) / 6) : r1 * (0.8 + 0.2 * ((k * 3) % 7) / 6); g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
    g.closePath(); g.fill();
  }
  // il fondo, la scena dietro al soggetto, la parola in contorno e la testata
  function frame(g, kicker, opt) {
    opt = opt || {};
    const key = opt.key || KEY();
    g.fillStyle = VOID; g.fillRect(0, 0, W, H);
    mezzitoni(g, 0, 0, W, H, key, 0.34, 22, -1.5, 8.5);
    if (opt.ghost) {
      g.save(); g.translate(W / 2, opt.ghostY || 760); g.rotate(-0.16); disp(g, opt.ghostSize || 330); g.textAlign = 'center';
      g.lineWidth = 3; g.strokeStyle = 'rgba(244,241,234,.13)'; g.strokeText(up(opt.ghost), 0, 0); g.strokeText(up(opt.ghost), -90, 330); g.strokeText(up(opt.ghost), 90, -330); g.restore();
    }
    if (opt.stage === 'raggi') raggi(g, opt.cx || 540, opt.cy || 580, opt.r || 640, (opt.r || 640) * 0.66, 13, key);
    else if (opt.stage === 'lama') { g.fillStyle = key; g.beginPath(); g.moveTo(0, (opt.cy || 700) + 60); g.lineTo(W, (opt.cy || 700) - 200); g.lineTo(W, (opt.cy || 700) + 120); g.lineTo(0, (opt.cy || 700) + 380); g.closePath(); g.fill(); }
    // testata: il nome del gioco su una lastra di carta, sotto la targhetta nella tinta
    g.textAlign = 'left'; disp(g, 33); spazio(g, '1px');
    const lw = g.measureText('LAST ONE STANDING').width + 64;
    g.fillStyle = PAPER; para(g, 40, 44, lw, 62, 18); g.fill();
    g.fillStyle = VOID; g.fillText('LAST ONE STANDING', 70, 88);
    spazio(g, '0px');
    if (kicker) targa(g, kicker, 40, 116, { size: 25, bg: key, fg: opt.key ? VOID : KEYINK(), max: W - 100 });
  }
  // la fascia in fondo, nella tinta
  function footer(g, txt, opt) {
    opt = opt || {};
    const key = opt.key || KEY(), ink = opt.key ? VOID : KEYINK();
    g.fillStyle = key; g.beginPath(); g.moveTo(0, H - 96); g.lineTo(W, H - 118); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
    g.fillStyle = PAPER; g.beginPath(); g.moveTo(0, H - 104); g.lineTo(W, H - 126); g.lineTo(W, H - 118); g.lineTo(0, H - 96); g.closePath(); g.fill();
    g.fillStyle = ink; g.textAlign = 'left'; body(g, 26, 800); spazio(g, '1px');
    let t = up(txt); while (t.length > 4 && g.measureText(t).width > W - 190) t = t.slice(0, -2);
    g.fillText(t, 56, H - 38); spazio(g, '0px');
    // tre rombi a destra
    for (let k = 0; k < 3; k++) { const x = W - 64 - k * 34, y = H - 50; g.beginPath(); g.moveTo(x, y - 13); g.lineTo(x + 13, y); g.lineTo(x, y + 13); g.lineTo(x - 13, y); g.closePath(); g.fill(); }
  }
  // il carattere dei titoli alla misura più grande che sta nella larghezza
  function fit(g, text, max, size, min) { let s = size; for (;;) { disp(g, s); if (g.measureText(text).width <= max || s <= (min || 30)) break; s -= 4; } return s; }
  // un titolo enorme con l'ombra piena sfalsata
  function titolo(g, text, x, y, max, size, opt) {
    opt = opt || {};
    const t = up(text), s = fit(g, t, max, size, opt.min), d = Math.max(4, Math.round(s * 0.055));
    g.textAlign = opt.align || 'left';
    // sopra la stella nella tinta l'ombra nella tinta sparirebbe: sotto ce n'è una seconda, nera
    if (opt.deep) { g.fillStyle = VOID; g.fillText(t, x + d * 2, y + d * 2); }
    g.fillStyle = opt.shadow || KEY(); g.fillText(t, x + d, y + d);
    g.fillStyle = opt.color || PAPER; g.fillText(t, x, y);
    g.textAlign = 'left';
    return s;
  }
  // una targhetta inclinata con il testo dentro; y è il bordo alto. Restituisce la larghezza
  function targa(g, text, x, y, opt) {
    opt = opt || {};
    const size = opt.size || 30, t = up(text), hh = Math.round(size * 1.9), lean = Math.round(hh * 0.28);
    let s = size; for (;;) { disp(g, s); if (!opt.max || g.measureText(t).width + size * 1.9 <= opt.max || s <= 16) break; s -= 2; }
    const w = g.measureText(t).width + size * 1.9;
    para(g, x, y, w, hh, lean);
    if (opt.outline) { g.lineWidth = 4; g.strokeStyle = opt.fg || PAPER; g.stroke(); } else { g.fillStyle = opt.bg || KEY(); g.fill(); }
    g.fillStyle = opt.fg || KEYINK(); g.textAlign = 'left'; g.fillText(t, x + size * 0.95, y + hh / 2 + s * 0.35);
    return w;
  }
  // testo su più righe; l'ultima riga che non basta finisce con i puntini. Restituisce le righe scritte
  function wrap(g, text, x, y, max, lh, lines) {
    const words = String(text).split(/\s+/).filter(Boolean), out = []; let line = '';
    for (let i = 0; i < words.length; i++) {
      const t = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(t).width > max && line) { out.push(line); line = words[i]; } else line = t;
    }
    if (line) out.push(line);
    if (out.length > lines) { out.length = lines; let l = out[lines - 1]; while (l.length > 2 && g.measureText(l + '…').width > max) l = l.slice(0, -1); out[lines - 1] = l.replace(/[\s,.;:]+$/, '') + '…'; }
    out.forEach((l, n) => g.fillText(l, x, y + n * lh));
    return out.length;
  }
  // il volto: la foto, oppure il volto di riserva del sito (stesso concorrente, stessa faccia), dentro una lastra inclinata
  // con il bordo di carta, i mezzitoni che salgono dal fondo e l'ombra piena
  async function face(g, t, x, y, w, h, opt) {
    opt = opt || {};
    const LK = G.LOS_LOOK, lean = opt.lean == null ? 60 : opt.lean, sh = opt.depth == null ? 20 : opt.depth;
    const riserva = (LK && LK.fx && LK.pickFor && LK.pickFor(LK.fx.volti, t.gender, t.id)) || '';
    const im = (await loadImg(t.img)) || (await loadImg(riserva));
    if (sh) { g.fillStyle = opt.shadow || KEY(); para(g, x + sh, y + sh, w, h, lean); g.fill(); }
    g.save(); para(g, x, y, w, h, lean); g.clip();
    g.fillStyle = t.color || '#444'; g.fillRect(x, y, w, h);
    if (im) {
      const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), iw = im.naturalWidth * s, ih = im.naturalHeight * s;
      g.drawImage(im, x + (w - iw) / 2, y + (h - ih) * 0.3, iw, ih);
    } else { g.fillStyle = PAPER; disp(g, Math.round(h * 0.4)); g.textAlign = 'center'; g.fillText(up((t.name || '?').slice(0, 2)), x + w / 2, y + h * 0.64); g.textAlign = 'left'; }
    // in bianco e nero senza filtri (funziona ovunque): si toglie la saturazione, poi un po' di contrasto
    if (opt.grey) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'overlay'; g.fillStyle = 'rgba(40,40,44,.5)'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    if (opt.tint) { g.globalCompositeOperation = 'multiply'; g.fillStyle = opt.tint; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    // il fondo della foto sfuma nel nero con i mezzitoni: il titolo che la sfiora resta leggibile
    const gr = g.createLinearGradient(0, y + h * 0.62, 0, y + h); gr.addColorStop(0, 'rgba(10,10,12,0)'); gr.addColorStop(1, 'rgba(10,10,12,.72)');
    g.fillStyle = gr; g.fillRect(x, y + h * 0.62, w, h * 0.38);
    mezzitoni(g, x, y + h * 0.7, w, h * 0.3, opt.shadow || KEY(), 0.5, 16, -2, 6);
    g.restore();
    g.lineWidth = opt.border == null ? 8 : opt.border; if (g.lineWidth) { g.strokeStyle = PAPER; para(g, x, y, w, h, lean); g.stroke(); }
  }
  // un numero grande su una tessera inclinata, con la sua etichetta
  function stat(g, x, y, w, num, label, color) {
    const col = color || KEY();
    g.fillStyle = 'rgba(244,241,234,.1)'; para(g, x, y, w, 150, 26); g.fill();
    g.fillStyle = col; para(g, x, y, 40, 150, 26); g.fill();
    g.textAlign = 'left'; fit(g, String(num), w - 96, 92, 40); g.fillStyle = PAPER; g.fillText(String(num), x + 52, y + 94);
    body(g, 22, 800); spazio(g, '2px'); g.fillStyle = PAPER; g.fillText(up(label), x + 40, y + 130); spazio(g, '0px');
  }
  const genre = (t, m, f, n) => (t && t.gender === 'F' ? f : t && t.gender === 'N' ? n : m);
  // un blocco di titoli inclinato: si disegna dentro una rotazione attorno al suo angolo
  function inclinato(g, x, y, ang, fn) { g.save(); g.translate(x, y); g.rotate(ang); fn(); g.restore(); }
  // l'oro delle leggendarie: una sfumatura e, sopra, la lamina (pallini d'oro su nero: «screen» lascia solo l'oro)
  async function oro(g, traccia) {
    const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#a8741a'); gr.addColorStop(0.3, '#e9b84a'); gr.addColorStop(0.55, '#c9922e'); gr.addColorStop(0.8, '#f3cf6b'); gr.addColorStop(1, '#b07c1e');
    traccia(); g.fillStyle = gr; g.fill();
    const foil = await loadImg(FXA().foil); if (!foil) return;
    const p = g.createPattern(foil, 'repeat'); if (!p) return;
    g.save(); traccia(); g.clip(); g.globalCompositeOperation = 'screen'; g.fillStyle = p; g.fillRect(0, 0, W, H); g.restore();
  }

  // l'emblema di un trofeo: se il fondo dell'immagine non è del tutto trasparente (un velo scuro uniforme) lo si toglie,
  // così sullo scudo non resta un quadrato. Restituisce qualcosa da disegnare (l'immagine stessa se è già pulita)
  function pulisci(im) {
    try {
      const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
      const x = c.getContext('2d'); x.drawImage(im, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data, w = c.width, h = c.height;
      const a = (px, py) => p[(py * w + px) * 4 + 3], velo = Math.max(a(1, 1), a(w - 2, 1), a(1, h - 2), a(w - 2, h - 2));
      if (velo < 6 || velo > 120) return im;
      const t = velo + 14;
      for (let i = 3; i < p.length; i += 4) p[i] = p[i] <= t ? 0 : Math.round((p[i] - t) * 255 / (255 - t));
      x.putImageData(d, 0, 0);
      return c;
    } catch (e) { return im; }
  }

  /* ---------- le cartoline ---------- */
  async function vincitore(SIM, theme) {
    const [c, g] = canvas();
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), Wn = SIM.winners.map((id) => by[id]).filter(Boolean);
    frame(g, theme.name + ' · ' + SIM.days + (SIM.days === 1 ? ' giorno' : ' giorni'), { ghost: 'Vince', stage: 'raggi', cy: 560, r: 660 });
    if (Wn.length === 1) {
      const w = Wn[0];
      await face(g, w, 150, 226, 780, 690, { lean: 70, shadow: VOID, depth: 24 });
      const kills = w.kills + (theme.soft ? (w.kills === 1 ? ' eliminazione' : ' eliminazioni') : (w.kills === 1 ? ' uccisione' : ' uccisioni'));
      inclinato(g, 48, 1000, -0.045, () => {
        targa(g, genre(w, 'Ultimo in piedi', 'Ultima in piedi', 'Ultimə in piedi'), 0, -66, { size: 44, bg: PAPER, fg: VOID });
        titolo(g, w.name, -4, 152, 980, 168, { min: 56, deep: true });
        const a = targa(g, kills, 0, 184, { size: 27 });
        targa(g, 'su ' + SIM.tributes.length + ' concorrenti', a + 8, 184, { size: 27, outline: true, fg: PAPER });
      });
    } else if (Wn.length) {
      const n = Wn.length, cw = Math.min(430, (960 - (n - 1) * 14) / n + 40);
      for (let k = 0; k < n; k++) await face(g, Wn[k], 60 + k * (cw - 40 + 14), 250, cw, 610, { lean: 40, shadow: VOID, depth: 16, border: 6 });
      inclinato(g, 48, 980, -0.045, () => {
        targa(g, 'Vince la squadra ' + Wn[0].team, 0, -66, { size: 44, bg: PAPER, fg: VOID });
        const nomi = Wn.map((t) => t.name).join(' · ');
        disp(g, 62);
        if (g.measureText(up(nomi)).width <= 980) titolo(g, nomi, -4, 120, 980, 110, { min: 56, deep: true });
        else { g.fillStyle = KEY(); wrap(g, up(nomi), 4, 94, 970, 66, 3); g.fillStyle = PAPER; wrap(g, up(nomi), 0, 90, 970, 66, 3); }
      });
    } else {
      inclinato(g, 60, 760, -0.045, () => { titolo(g, 'Nessun', 0, 0, 960, 220); titolo(g, 'superstite', 0, 190, 960, 220); });
    }
    footer(g, 'Chi resterà in piedi? · ' + oggi());
    return c;
  }
  async function eliminazione(SIM, id, theme) {
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), t = by[id]; if (!t) return null;
    const [c, g] = canvas(); frame(g, theme.soft ? 'Fuori dai giochi' : 'Eliminazione', { ghost: 'Fuori', key: KILL, stage: 'lama', cy: 520 });
    await face(g, t, 150, 226, 780, 600, { lean: 70, grey: true, shadow: VOID, depth: 24 });
    // il timbro, di traverso sulla lastra
    inclinato(g, 700, 770, -0.16, () => {
      g.fillStyle = VOID; para(g, -262, -72, 540, 150, 40); g.fill();
      g.fillStyle = KILL; para(g, -276, -86, 540, 150, 40); g.fill();
      g.fillStyle = '#fff'; disp(g, 118); g.textAlign = 'center'; g.fillText('FUORI', -8, 32); g.textAlign = 'left';
    });
    inclinato(g, 48, 1000, -0.035, () => {
      titolo(g, t.name, -4, 0, 980, 150, { shadow: KILL, min: 56 });
      const a = targa(g, t.rank + 'º su ' + SIM.tributes.length, 0, 28, { size: 30, bg: KILL, fg: VOID });
      targa(g, 'Giorno ' + (t.deathDay || '?'), a + 8, 28, { size: 30, outline: true, fg: PAPER });
    });
    const killer = (t.killerIds || []).map((k) => by[k]).find(Boolean);
    const txt = (t.deathText || (killer ? 'Per mano di ' + killer.name + '.' : '')).replace(/<[^>]+>/g, '');
    g.fillStyle = PAPER; body(g, 32, 600); wrap(g, txt, 56, 1136, 960, 42, 2);
    footer(g, theme.name + ' · Last One Standing', { key: KILL });
    return c;
  }
  async function riepilogo(SIM, theme, extra) {
    extra = extra || {};
    const [c, g] = canvas(); frame(g, 'La partita', { ghost: 'Diretta', ghostY: 900, stage: 'lama', cy: 760 });
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), Wn = SIM.winners.map((id) => by[id]).filter(Boolean);
    inclinato(g, 52, 330, -0.03, () => titolo(g, theme.name, 0, 0, 970, 132, { min: 52 }));
    const st = SIM.stats || {};
    stat(g, 52, 380, 312, SIM.days, SIM.days === 1 ? 'giorno' : 'giorni'); stat(g, 384, 380, 312, SIM.tributes.length, 'concorrenti'); stat(g, 716, 380, 312, st.betrayals || 0, 'tradimenti');
    if (Wn[0]) {
      await face(g, Wn[0], 52, 590, 400, 440, { lean: 40, shadow: VOID, depth: 16, border: 6 });
      targa(g, Wn.length > 1 ? 'Vincono' : 'Vince', 478, 596, { size: 30, bg: PAPER, fg: VOID });
      // un nome solo sta grande su una riga; una squadra dai nomi lunghi va su due
      const nomi = Wn.map((t) => t.name).join(', ');
      disp(g, 48);
      if (g.measureText(up(nomi)).width <= 560) titolo(g, nomi, 474, 742, 560, 92, { shadow: VOID, min: 48 });
      else { disp(g, 44); g.fillStyle = VOID; wrap(g, up(nomi), 478, 704, 560, 50, 2); g.fillStyle = PAPER; wrap(g, up(nomi), 474, 700, 560, 50, 2); }
    }
    const top = SIM.tributes.slice().sort((a, b) => b.kills - a.kills).filter((t) => t.kills).slice(0, 3);
    if (top.length) {
      targa(g, theme.soft ? 'Chi ha eliminato di più' : 'Chi ha ucciso di più', 474, 794, { size: 22, bg: VOID, fg: PAPER });
      top.forEach((t, k) => {
        const y = 852 + k * 62;
        g.fillStyle = k ? PAPER : VOID; para(g, 474, y, 86, 52, 14); g.fill();
        g.fillStyle = k ? VOID : PAPER; disp(g, 36); g.textAlign = 'center'; g.fillText(String(t.kills), 517, y + 39); g.textAlign = 'left';
        fit(g, up(t.name), 450, 40, 24); g.fillStyle = VOID; g.fillText(up(t.name), 581, y + 43); g.fillStyle = PAPER; g.fillText(up(t.name), 578, y + 40);
      });
    }
    if (extra.tu) {
      inclinato(g, 52, 1100, -0.02, () => {
        g.fillStyle = VOID; para(g, 10, 10, 976, 104, 28); g.fill();
        g.fillStyle = PAPER; para(g, 0, 0, 976, 104, 28); g.fill();
        g.fillStyle = VOID; fit(g, up(extra.tu), 880, 42, 22); g.fillText(up(extra.tu), 50, 68);
      });
    }
    footer(g, 'Last One Standing · ' + oggi());
    return c;
  }
  async function carta(x, rar) {
    const [c, g] = canvas();
    const leg = rar.k === 'leggendaria';
    const col = { comune: '#b9b6ae', rara: '#5db8f2', epica: '#b784f5', leggendaria: '#f0c453' }[rar.k] || KEY();
    frame(g, 'Album dei concorrenti', { ghost: rar.nome, ghostSize: leg || rar.k === 'comune' ? 210 : 300, key: col });
    const X = 130, Y = 196, CW = 820, CH = 1010, cut = 54;
    // la carta: l'ombra piena, la cornice nel colore della rarità (d'oro e di lamina se è leggendaria), il fondo scuro
    g.fillStyle = PAPER; tagliato(g, X + 20, Y + 20, CW, CH, cut); g.fill();
    if (leg) await oro(g, () => tagliato(g, X, Y, CW, CH, cut));
    else { const gr = g.createLinearGradient(X, Y, X + CW, Y + CH); gr.addColorStop(0, col); gr.addColorStop(0.5, '#ffffff'); gr.addColorStop(0.56, col); gr.addColorStop(1, col); tagliato(g, X, Y, CW, CH, cut); g.fillStyle = gr; g.fill(); }
    const fondo = g.createLinearGradient(0, Y, 0, Y + CH); fondo.addColorStop(0, '#26221c'); fondo.addColorStop(0.55, VOID);
    tagliato(g, X + 16, Y + 16, CW - 32, CH - 32, cut - 8); g.fillStyle = fondo; g.fill();
    g.save(); tagliato(g, X + 16, Y + 16, CW - 32, CH - 32, cut - 8); g.clip(); mezzitoni(g, X, Y, CW, CH, col, 0.3, 20, -1, 6); g.restore();
    // il ritratto
    await face(g, Object.assign({ color: col }, x), X + 44, Y + 92, CW - 88, 560, { lean: 0, shadow: col, depth: 0, border: 0 });
    g.lineWidth = 6; g.strokeStyle = col; g.strokeRect(X + 44, Y + 92, CW - 88, 560);
    // la targa della rarità, a cavallo dell'angolo
    const rombi = { rara: ' ◆', epica: ' ◆◆', leggendaria: ' ◆◆◆' }[rar.k] || '';
    if (leg) { disp(g, 34); const tw = g.measureText(up(rar.nome) + rombi).width + 34 * 1.9; await oro(g, () => para(g, X - 14, Y - 10, tw, 65, 18)); g.fillStyle = VOID; g.fillText(up(rar.nome) + rombi, X - 14 + 32, Y - 10 + 44); }
    else targa(g, rar.nome + rombi, X - 14, Y - 10, { size: 34, bg: col, fg: VOID });
    // il nome e i numeri
    titolo(g, x.name, X + 44, Y + 776, CW - 100, 118, { shadow: leg ? '#a8741a' : col, min: 44 });
    const cw = (CW - 88) / 3;
    [[x.partite, x.partite === 1 ? 'partita' : 'partite'], [x.vittorie, x.vittorie === 1 ? 'vittoria' : 'vittorie'], [x.uccisioni, x.uccisioni === 1 ? 'eliminazione' : 'eliminazioni']].forEach((s, k) => {
      const sx = X + 44 + k * cw;
      g.fillStyle = col; g.fillRect(sx, Y + 812, cw - 14, 5);
      fit(g, String(s[0]), cw - 30, 96, 40); g.fillStyle = col; g.fillText(String(s[0]), sx, Y + 908);
      body(g, 22, 800); spazio(g, '2px'); g.fillStyle = PAPER; g.fillText(up(s[1]), sx + 2, Y + 946); spazio(g, '0px');
    });
    footer(g, 'Last One Standing · ' + oggi(), { key: col });
    return c;
  }
  async function trofeo(t, quando) {
    const [c, g] = canvas();
    const leg = t.id === 'leggenda', T = FXA().trofei || {};
    frame(g, 'Trofeo sbloccato', { ghost: 'Trofeo', ghostY: 700, stage: 'raggi', cy: 530, r: 600 });
    // lo scudo a sei lati: il bordo nero, l'interno di carta (d'oro per «Leggenda»), l'emblema del trofeo
    const cx = 540, cy = 530;
    esagono(g, cx + 20, cy + 22, 318); g.fillStyle = PAPER; g.fill();
    esagono(g, cx, cy, 318); g.fillStyle = VOID; g.fill();
    if (leg) await oro(g, () => esagono(g, cx, cy, 290)); else { esagono(g, cx, cy, 290); g.fillStyle = PAPER; g.fill(); }
    g.save(); esagono(g, cx, cy, 290); g.clip(); mezzitoni(g, cx - 300, cy - 310, 600, 620, leg ? '#7a5210' : KEY(), 0.5, 20, -2, 7); g.restore();
    const im = (await loadImg(T[t.id])) || (await loadImg(T.coppa));
    if (im) { const s = Math.min(470 / im.naturalWidth, 470 / im.naturalHeight), iw = im.naturalWidth * s, ih = im.naturalHeight * s; g.drawImage(pulisci(im), cx - iw / 2, cy - ih / 2 - 6, iw, ih); }
    else { g.fillStyle = VOID; disp(g, 300); g.textAlign = 'center'; g.fillText('★', cx, cy + 100); g.textAlign = 'left'; }
    inclinato(g, 48, 1010, -0.04, () => {
      if (t.cat) targa(g, t.cat, 0, -196, { size: 30, bg: PAPER, fg: VOID });
      titolo(g, t.nome, -4, 0, 980, 132, { min: 48, deep: true });
    });
    g.fillStyle = PAPER; body(g, 36, 600); wrap(g, t.desc, 56, 1090, 960, 46, 3);
    footer(g, quando ? 'Sbloccato il ' + new Date(quando).toLocaleDateString('it-IT') : 'Last One Standing');
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
