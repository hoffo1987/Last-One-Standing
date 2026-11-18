/* Last One Standing — la regia degli stacchi, seconda versione.
 * Sostituisce LOS_ANIM.wipe con un motore vettoriale: niente immagini stirate, ogni forma è disegnata in SVG
 * alla risoluzione dello schermo, quindi resta nitida a ogni densità di pixel.
 * Principi (dai menu Atlus osservati fotogramma per fotogramma, vedi docs-dev/look-persona.md):
 * - una grammatica sola: tre colori (nero, tinta dell'arena, carta), le stesse curve, la stessa griglia di tempi;
 * - varietà dentro la grammatica: quattro famiglie (lame, schegge, sipario, esplosione), geometria rigenerata
 *   ogni volta (angoli, numero di pezzi, bordi strappati), mai la stessa famiglia due volte di fila;
 * - il contesto decide: la sezione d'arrivo sceglie la famiglia preferita, la direzione segue la navigazione
 *   (avanti verso destra, indietro verso sinistra), l'esplosione parte dal punto toccato;
 * - entrata e uscita hanno geometrie diverse; la pagina nuova entra a strati mentre la copertura se ne va;
 * - il nome della sezione arriva lettera per lettera su una lastra di carta, resta fermo il tempo di leggerlo.
 * Con il movimento ridotto il contenuto cambia subito. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const AN = G.LOS_ANIM; if (!AN) return;
  const root = document.documentElement;
  const NS = 'http://www.w3.org/2000/svg';
  const R = (a, b) => a + Math.random() * (b - a);
  const RI = (a, b) => Math.floor(R(a, b + 1));
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rad = (d) => (d * Math.PI) / 180;
  const emit = (name, detail) => { try { document.dispatchEvent(new CustomEvent(name, { detail })); } catch (e) { /* niente */ } };
  const sfx = (n, o) => { const L = G.LOS_LOOK; if (L && L.sfx) L.sfx.play(n, o); };

  /* ---------- token di movimento: gli stessi per tutto il sito ---------- */
  const E = {
    out: 'cubic-bezier(.16,1,.3,1)',     // si entra veloci e si frena
    in: 'cubic-bezier(.7,0,.84,0)',      // si esce accelerando
    io: 'cubic-bezier(.76,0,.24,1)',     // coperture: partenza e arrivo decisi
    kick: 'cubic-bezier(.34,1.56,.64,1)', // solo dove c'è un impatto
  };
  const ORDER = ['home', 'cast', 'arena', 'diretta', 'esito', 'trofei'];
  const LABEL_SUB = { home: 'Simulatore di arena', cast: 'Passo 1 di 4', arena: 'Passo 2 di 4', diretta: 'Passo 3 di 4', esito: 'Passo 4 di 4' };
  const viewOf = (h) => { const v = (h || '').replace(/^#/, ''); return ORDER.includes(v) ? v : 'home'; };
  let lastView = viewOf(G.location && G.location.hash), lastFamily = null, busy = false;
  let lastPointer = null;
  document.addEventListener('pointerdown', (e) => { lastPointer = { x: e.clientX, y: e.clientY, t: Date.now() }; }, true);

  /* ---------- geometria ---------- */
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const pts = (a) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  // un bordo strappato tra due punti: rumore perpendicolare, più fitto dove serve
  function jag(x0, y0, x1, y1, amp, step) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), n = Math.max(2, Math.round(len / step));
    const nx = -dy / len, ny = dx / len, out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, k = i === 0 || i === n ? 0 : (Math.random() - 0.5) * 2 * amp * (Math.random() < 0.18 ? 2.2 : 1);
      out.push([x0 + dx * t + nx * k, y0 + dy * t + ny * k]);
    }
    return out;
  }
  function palette(hue) {
    const h = hue == null ? parseFloat(getComputedStyle(root).getPropertyValue('--h')) || 38 : hue;
    return { void: '#0a0a0c', paper: '#f7f5f0', key: 'hsl(' + h + ' 92% 54%)', deep: 'hsl(' + h + ' 85% 30%)', light: 'hsl(' + h + ' 95% 72%)', hue: h };
  }
  // mezzitoni vettoriali: puntini veri, nitidi a ogni zoom
  function halftone(defs, id, color, size, r, angle) {
    const p = el('pattern', { id, width: size, height: size, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(' + angle + ')' }, defs);
    el('circle', { cx: size / 2, cy: size / 2, r, fill: color }, p);
    return 'url(#' + id + ')';
  }

  /* ---------- le quattro famiglie ----------
   * Ognuna riceve il gruppo SVG, le misure, la direzione (1 o -1), la tavolozza e l'origine,
   * e restituisce { cover(): Promise, uncover(): Promise }. */
  const anim = (n, kf, o) => n.animate(kf, Object.assign({ fill: 'both' }, o));
  const all = (a) => Promise.all(a.map((x) => x.finished)).catch(() => {});

  // linee di velocità: barre sottili di carta e di tinta che attraversano tutto lo schermo più veloci delle lastre,
  // sopra di esse, e spariscono; danno il senso dello spostamento a coperture fatte di sole superfici piene
  function speed(g, W, H, P, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const y = R(-0.05, 1.05) * H, h = Math.random() < 0.7 ? R(1.5, 4) : R(6, 12), w = W * R(0.18, 0.55);
      const r = el('rect', { x: -w, y: y.toFixed(1), width: w.toFixed(0), height: h.toFixed(1), fill: Math.random() < 0.6 ? P.paper : P.light }, g);
      out.push({ r, w });
    }
    return () => out.map(({ r, w }) => r.animate([{ transform: 'translateX(0)', opacity: 0.9 }, { transform: 'translateX(' + (W + w * 2).toFixed(0) + 'px)', opacity: 0.9 }], { duration: R(220, 360), delay: R(0, 260), easing: 'cubic-bezier(.5,0,.6,1)', fill: 'none' }));
  }

  /* ---------- ornamenti ----------
   * Strati in più sopra le coperture: fili di luce, contorni, onde, raggi, pennellate, mezzitoni, grana.
   * Regola fissa: ogni ornamento parte e finisce dentro la finestra di tempo del pezzo che accompagna (stessa durata
   * di base, ritardo mai oltre quello del pezzo), non entra nelle promesse e non aggiunge attese: i tempi dello
   * stacco restano identici, cambia solo quanta roba si muove dentro. Tutto vive dentro .lx e sparisce con lui. */
  const fit = (win, delay, dur) => { const d = Math.max(0, Math.min(delay, win - 60)); return { delay: d, duration: Math.max(60, Math.min(dur, win - d)) }; };
  const deco = (fn) => { try { return fn(); } catch (e) { return null; } };

  function lame(g, W, H, dir, P, defs) {
    const ang = R(13, 23), sl = H * Math.tan(rad(ang)), span = W + sl * 2;
    const n = RI(4, 6), wts = Array.from({ length: n }, () => R(0.6, 1.4)), sum = wts.reduce((a, b) => a + b, 0);
    const dots = halftone(defs, 'lxh' + Date.now(), P.key, RI(9, 13), R(1.6, 2.6), R(20, 50));
    const fills = [P.void, P.key, P.void, P.deep, P.key, P.void];
    let x = -sl; const blades = [], rims = [];
    for (let i = 0; i < n; i++) {
      const w = (span * wts[i]) / sum + 24, m = 40; // 24 px di sovrapposizione: il bordo strappato non lascia fessure
      const right = jag(x + w + sl, -m, x + w, H + m, i % 2 ? R(3, 9) : R(1, 3), R(18, 34));
      const poly = [[x + sl, -m]].concat(right, [[x - 2, H + m]]);
      const b = el('polygon', { points: pts(poly), fill: fills[(i + RI(0, 1)) % fills.length] }, g);
      blades.push(b); rims.push({ b, xp: x + w });
      if (b.getAttribute('fill') === P.void && Math.random() < 0.7) { const o = el('polygon', { points: pts(poly), fill: dots, opacity: R(0.35, 0.6) }, g); blades.push(o); o.__twin = b; }
      // una lama sottile di carta sul bordo di qualche lastra
      if (Math.random() < 0.55) { const t = R(5, 12), xp = x + w; blades.push(el('polygon', { points: pts([[xp + sl - t, -m], [xp + sl, -m], [xp, H + m], [xp - t, H + m]]), fill: P.paper }, g)); }
      x += w - 24;
    }
    const off = span + sl, fly = speed(g, W, H, P, RI(7, 11));
    blades.forEach((b, i) => { b.__i = b.__twin ? b.__twin.__i : blades.length - i; });
    // ornamento: un filo di luce corre davanti al bordo di ogni lama, frena prima di lei e si spegne quando la lama arriva
    const glints = rims.map(({ b, xp }, k) => { const t = R(2, 5), gap = R(14, 36); const l = el('polygon', { class: 'lx-x', points: pts([[xp + sl + gap, -40], [xp + sl + gap + t, -40], [xp + gap + t, H + 40], [xp + gap, H + 40]]), fill: k % 2 ? P.light : P.paper }, g); l.__b = b; return l; });
    const glintIn = () => glints.forEach((l) => anim(l, [{ transform: 'translateX(' + -off + 'px)', opacity: 1 }, { opacity: 1, offset: 0.72 }, { transform: 'translateX(0)', opacity: 0 }], { duration: 300, delay: Math.max(0, l.__b.__i * 26 - 34), easing: E.out }));
    const glintOut = () => glints.forEach((l) => anim(l, [{ transform: 'translateX(0)', opacity: 0 }, { opacity: 0.9, offset: 0.25 }, { transform: 'translateX(' + off + 'px)', opacity: 0.9 }], { duration: 360, delay: (blades.length - l.__b.__i) * 18, easing: E.in }));
    return {
      cover: () => (fly(), deco(glintIn), all(blades.map((b) => anim(b, [{ transform: 'translateX(' + -off + 'px)' }, { transform: 'translateX(0)' }], { duration: 300, delay: b.__i * 26 + R(0, 14), easing: E.io })))),
      uncover: () => (deco(glintOut), all(blades.map((b) => anim(b, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + off + 'px)' }], { duration: 360, delay: (blades.length - b.__i) * 18 + R(0, 12), easing: E.in, composite: 'replace' })))),
    };
  }

  function schegge(g, W, H, dir, P, defs, origin) {
    const cols = RI(5, 7), rows = RI(3, 5), grid = [];
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
      const edgeX = c === 0 || c === cols, edgeY = r === 0 || r === rows;
      grid.push([(c / cols) * W + (edgeX ? (c ? 40 : -40) : R(-0.32, 0.32) * (W / cols)), (r / rows) * H + (edgeY ? (r ? 40 : -40) : R(-0.32, 0.32) * (H / rows))]);
    }
    const at = (r, c) => grid[r * (cols + 1) + c], shards = [];
    const ox = origin ? origin.x : dir > 0 ? 0 : W, oy = origin ? origin.y : H * R(0.2, 0.8), far = Math.hypot(W, H);
    const dots = halftone(defs, 'lxs' + Date.now(), P.void, RI(8, 11), R(1.5, 2.3), R(10, 60));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const a = at(r, c), b = at(r, c + 1), d = at(r + 1, c + 1), e = at(r + 1, c), flip = Math.random() < 0.5;
      const tris = flip ? [[a, b, d], [a, d, e]] : [[a, b, e], [b, d, e]];
      tris.forEach((t) => {
        const cx = (t[0][0] + t[1][0] + t[2][0]) / 3, cy = (t[0][1] + t[1][1] + t[2][1]) / 3, roll = Math.random();
        const fill = roll < 0.62 ? P.key : roll < 0.86 ? P.void : roll < 0.95 ? P.deep : P.paper;
        const s = el('polygon', { points: pts(t), fill, stroke: fill, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
        s.style.transformOrigin = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px';
        s.__d = Math.hypot(cx - ox, cy - oy) / far; s.__v = [(cx - ox) / far, (cy - oy) / far];
        shards.push(s);
        if (fill === P.key && Math.random() < 0.3) { const o = el('polygon', { points: pts(t), fill: dots, opacity: 0.35 }, g); o.style.transformOrigin = s.style.transformOrigin; o.__d = s.__d; o.__v = s.__v; shards.push(o); }
      });
    }
    // ornamenti: il contorno di qualche scheggia lampeggia mentre si chiude e vola via per primo quando si riapre;
    // un'onda di carta parte dal punto d'origine e arriva al bordo insieme all'ultima scheggia
    const maxD = shards.reduce((a, s) => Math.max(a, s.__d), 0);
    const edges = shards.filter((s) => s.hasAttribute('stroke') && Math.random() < 0.3).map((s) => { const o = el('polygon', { class: 'lx-x', points: s.getAttribute('points'), fill: 'none', stroke: s.getAttribute('fill') === P.paper ? P.void : P.paper, 'stroke-width': 2.5, 'stroke-linejoin': 'round', opacity: 0 }, g); o.style.transformOrigin = s.style.transformOrigin; o.__d = s.__d; o.__v = s.__v; return o; });
    const wave = el('circle', { class: 'lx-x', cx: ox.toFixed(1), cy: oy.toFixed(1), r: (far * Math.max(0.4, maxD)).toFixed(1), fill: 'none', stroke: P.paper, 'stroke-width': 7, opacity: 0 }, g); wave.style.transformOrigin = ox.toFixed(1) + 'px ' + oy.toFixed(1) + 'px';
    const decoIn = () => {
      edges.forEach((o) => anim(o, [{ transform: 'rotate(' + R(-50, 50) + 'deg) scale(0)', opacity: 0 }, { opacity: 1, offset: 0.5 }, { transform: 'rotate(0) scale(1)', opacity: 0 }], { duration: 250, delay: o.__d * 260, easing: E.out }));
      anim(wave, [{ transform: 'scale(0)', opacity: 1, strokeWidth: 16 }, { opacity: 1, offset: 0.7 }, { transform: 'scale(1)', opacity: 0, strokeWidth: 2 }], { duration: Math.round(250 + maxD * 260), easing: E.out });
    };
    const decoOut = () => edges.forEach((o) => { const k = R(0.5, 0.9) * far; anim(o, [{ transform: 'translate(0,0) scale(1)', opacity: 0 }, { opacity: 0.9, offset: 0.2 }, { transform: 'translate(' + o.__v[0] * k + 'px,' + o.__v[1] * k + 'px) rotate(' + R(-40, 40) + 'deg) scale(1.15)', opacity: 0 }], { duration: 380, delay: o.__d * 160, easing: E.out }); });
    return {
      cover: () => (deco(decoIn), all(shards.map((s) => anim(s, [{ transform: 'rotate(' + R(-50, 50) + 'deg) scale(0)', opacity: 0 }, { opacity: 1, offset: 0.4 }, { transform: 'rotate(0) scale(1)', opacity: 1 }], { duration: 250, delay: s.__d * 260 + R(0, 30), easing: E.out })))),
      uncover: () => (deco(decoOut), all(shards.map((s) => { const k = R(0.25, 0.6) * far; return anim(s, [{ transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 }, { transform: 'translate(' + s.__v[0] * k + 'px,' + s.__v[1] * k + 'px) rotate(' + R(-90, 90) + 'deg) scale(' + R(0.3, 0.7) + ')', opacity: 0 }], { duration: 380, delay: s.__d * 160 + R(0, 40), easing: E.in }); }))),
    };
  }

  function sipario(g, W, H, dir, P, defs) {
    const dots = halftone(defs, 'lxp' + Date.now(), P.key, RI(9, 12), R(1.6, 2.4), R(-30, 30));
    const n = RI(6, 9), wts = Array.from({ length: n }, () => R(0.5, 1.5)), sum = wts.reduce((a, b) => a + b, 0);
    const tilt = R(6, 14), strips = [], seams = [];
    let y = -30;
    for (let i = 0; i < n; i++) {
      const h = ((H + 60) * wts[i]) / sum + 2, side = (i % 2 ? 1 : -1) * dir, sl = h * Math.tan(rad(tilt)) * (Math.random() < 0.5 ? 1 : -1);
      const lead = jag(W + 60 + sl, y, W + 60, y + h, R(4, 10), R(10, 18));
      const poly = [[-60, y]].concat(lead, [[-60 - sl, y + h]]);
      const fill = i % 3 === 1 ? P.key : i % 3 === 2 ? P.deep : P.void;
      const s = el('polygon', { points: pts(poly), fill }, g); s.__side = side; s.__i = i; strips.push(s);
      if (fill !== P.key && Math.random() < 0.6) strips.push(Object.assign(el('polygon', { points: pts(poly), fill: dots, opacity: R(0.3, 0.55) }, g), { __side: side, __i: i }));
      if (Math.random() < 0.4) { const t = R(4, 8); strips.push(Object.assign(el('rect', { x: -60, y: y + h - t, width: W + 140, height: t, fill: P.paper }, g), { __side: side, __i: i })); }
      // ornamento: un filo di luce sulla cucitura alta di ogni striscia, che arriva frenando prima della striscia
      seams.push(Object.assign(el('rect', { class: 'lx-x', x: -60, y: (y - 1).toFixed(1), width: W + 140, height: R(1.5, 3).toFixed(1), fill: i % 2 ? P.light : P.paper }, g), { __side: side, __i: i }));
      y += h - 2;
    }
    const off = W + 160, fly = speed(g, W, H, P, RI(6, 9));
    const seamIn = () => seams.forEach((s) => anim(s, [{ transform: 'translateX(' + -s.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 290, delay: s.__i * 24, easing: E.out }));
    const seamOut = () => seams.forEach((s) => anim(s, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + s.__side * off + 'px)' }], { duration: 340, delay: (n - 1 - s.__i) * 20, easing: E.in }));
    return {
      cover: () => (fly(), deco(seamIn), all(strips.map((s) => anim(s, [{ transform: 'translateX(' + -s.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 290, delay: s.__i * 24 + R(0, 16), easing: E.io })))),
      uncover: () => (deco(seamOut), all(strips.map((s) => anim(s, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + s.__side * off + 'px)' }], { duration: 340, delay: (n - 1 - s.__i) * 20 + R(0, 14), easing: E.in })))),
    };
  }

  function esplosione(g, W, H, dir, P, defs, origin) {
    const ox = origin ? origin.x : W * R(0.35, 0.65), oy = origin ? origin.y : H * R(0.35, 0.65);
    const far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy), Math.hypot(ox, H - oy), Math.hypot(W - ox, H - oy)) * 1.06;
    const burst = (inner, outer, spikes, fill) => {
      const p = [], rot = R(0, Math.PI);
      for (let i = 0; i < spikes * 2; i++) { const a = rot + (i / (spikes * 2)) * Math.PI * 2, r = i % 2 ? inner * R(0.98, 1.02) : outer * R(0.85, 1.15); p.push([ox + Math.cos(a) * r, oy + Math.sin(a) * r]); }
      const b = el('polygon', { points: pts(p), fill }, g); b.style.transformOrigin = ox + 'px ' + oy + 'px'; return b;
    };
    const dots = halftone(defs, 'lxe' + Date.now(), P.void, 12, 2.4, 45);
    const layers = [burst(far, far * 1.35, RI(14, 20), P.void), burst(far, far * 1.3, RI(16, 24), P.key), burst(far, far * 1.25, RI(18, 26), dots), burst(far * 0.3, far * 0.42, RI(10, 14), P.paper)];
    const ring = layers[3];
    let halves = null;
    // ornamento: raggi sottili partono dal centro mentre lo scoppio si apre, e sono già spenti quando si ferma
    const rays = [], nr = RI(10, 14), r0 = R(0, Math.PI * 2);
    for (let i = 0; i < nr; i++) {
      const a = r0 + (i / nr) * Math.PI * 2 + R(-0.12, 0.12), w = R(0.008, 0.02), L = far * R(0.7, 1.05);
      const p = el('polygon', { class: 'lx-x', points: pts([[ox, oy], [ox + Math.cos(a - w) * L, oy + Math.sin(a - w) * L], [ox + Math.cos(a + w) * L, oy + Math.sin(a + w) * L]]), fill: i % 3 ? P.paper : P.light, opacity: 0 }, g);
      p.style.transformOrigin = ox + 'px ' + oy + 'px'; rays.push(p);
    }
    const raysIn = () => rays.forEach((p, i) => anim(p, [{ transform: 'scale(.08)', opacity: 0 }, { opacity: 0.95, offset: 0.3 }, { transform: 'scale(1)', opacity: 0 }], { duration: 260, delay: (i % 3) * 55, easing: E.out }));
    return {
      at: [ox, oy],
      cover: () => (deco(raysIn), all(layers.map((b, i) => anim(b, [{ transform: 'rotate(' + R(-40, -20) + 'deg) scale(0)' }, { transform: 'rotate(0) scale(1)' }], { duration: i === 3 ? 260 : 340, delay: i * 55, easing: E.out })))),
      uncover: () => {
        // il colpo finale: un taglio diagonale, le due metà si separano
        ring.remove();
        const a = rad(R(-35, -15) + (dir < 0 ? 180 : 0)), nx = -Math.sin(a), ny = Math.cos(a), L = Math.hypot(W, H) * 2;
        const half = (s) => {
          const id = 'lxc' + Math.random().toString(36).slice(2), cp = el('clipPath', { id }, defs);
          el('polygon', { points: pts([[ox - Math.cos(a) * L, oy - Math.sin(a) * L], [ox + Math.cos(a) * L, oy + Math.sin(a) * L], [ox + Math.cos(a) * L + nx * L * s, oy + Math.sin(a) * L + ny * L * s], [ox - Math.cos(a) * L + nx * L * s, oy - Math.sin(a) * L + ny * L * s]]) }, cp);
          const h = el('g', { 'clip-path': 'url(#' + id + ')' }, g);
          layers.slice(0, 3).forEach((b) => h.appendChild(b.cloneNode(true)));
          return h;
        };
        halves = [half(1), half(-1)];
        layers.slice(0, 3).forEach((b) => b.remove());
        const flash = el('line', { x1: ox - Math.cos(a) * L, y1: oy - Math.sin(a) * L, x2: ox + Math.cos(a) * L, y2: oy + Math.sin(a) * L, stroke: P.paper, 'stroke-width': 10 }, g);
        const k = Math.max(W, H) * 0.9;
        // ornamento: schegge di carta saltano via dal taglio, dentro i 420 ms delle due metà
        deco(() => { for (let i = 0; i < 10; i++) {
          const t = R(-0.5, 0.5) * Math.min(W, H) * 1.2, sx = ox + Math.cos(a) * t, sy = oy + Math.sin(a) * t, sd = i % 2 ? 1 : -1, r = R(5, 12), fl = R(60, 190);
          const c = el('polygon', { class: 'lx-x', points: pts([[sx, sy - r], [sx + r * 0.45, sy], [sx, sy + r], [sx - r * 0.45, sy]]), fill: i % 3 ? P.paper : P.light }, g);
          c.style.transformOrigin = sx.toFixed(1) + 'px ' + sy.toFixed(1) + 'px';
          anim(c, [{ transform: 'translate(0,0) rotate(0) scale(.3)', opacity: 1 }, { opacity: 1, offset: 0.6 }, { transform: 'translate(' + (nx * sd * fl).toFixed(1) + 'px,' + (ny * sd * fl).toFixed(1) + 'px) rotate(' + R(-120, 120).toFixed(0) + 'deg) scale(1)', opacity: 0 }], { duration: 300, delay: 70 + (i % 4) * 12, easing: E.out });
        } });
        return all([
          anim(flash, [{ opacity: 1, strokeWidth: 14 }, { opacity: 0, strokeWidth: 0 }], { duration: 220, easing: E.out }),
          anim(halves[0], [{ transform: 'translate(0,0)' }, { transform: 'translate(' + nx * k + 'px,' + ny * k + 'px)' }], { duration: 420, delay: 70, easing: E.in }),
          anim(halves[1], [{ transform: 'translate(0,0)' }, { transform: 'translate(' + -nx * k + 'px,' + -ny * k + 'px)' }], { duration: 420, delay: 70, easing: E.in }),
        ]);
      },
    };
  }

  // retino: un mezzitono che cresce fino a coprire tutto, dal punto toccato o da un angolo
  function retino(g, W, H, dir, P, defs, origin) {
    const s = Math.max(W, H) / RI(11, 15), cols = Math.ceil(W / s) + 2, rows = Math.ceil(H / (s * 0.9)) + 2; // una riga e una colonna in più: i bordi restano coperti
    const ox = origin ? origin.x : dir > 0 ? 0 : W, oy = origin ? origin.y : pick([0, H]), far = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy));
    const base = [], ink = [], ga = R(0, Math.PI * 2), gx = Math.cos(ga), gy = Math.sin(ga);
    const dot = (cx, cy, r, fill, list) => { const c = el('circle', { cx: cx.toFixed(1), cy: cy.toFixed(1), r: r.toFixed(1), fill }, g); c.style.transformOrigin = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px'; c.__d = Math.hypot(cx - ox, cy - oy) / far; list.push(c); };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dot(c * s + (r % 2 ? s / 2 : 0), r * s * 0.9, s * 0.8, P.key, base);
    // sopra, puntini neri di grandezza crescente lungo una diagonale: il retino vero e proprio
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cx = c * s + (r % 2 ? 0 : s / 2), cy = r * s * 0.9 + s * 0.45, t = ((cx / W - 0.5) * gx + (cy / H - 0.5) * gy) + 0.5;
      if (t > 0.18) dot(cx, cy, s * Math.min(0.46, 0.06 + 0.42 * t), P.void, ink);
    }
    // ornamento: un'onda di carta corre dal punto d'origine davanti ai puntini che crescono, e torna indietro quando si ritirano
    const maxD = base.reduce((a, c) => Math.max(a, c.__d), 0);
    const wave = el('circle', { class: 'lx-x', cx: ox.toFixed(1), cy: oy.toFixed(1), r: (far * Math.max(0.4, maxD)).toFixed(1), fill: 'none', stroke: P.paper, 'stroke-width': 6, opacity: 0 }, g); wave.style.transformOrigin = ox.toFixed(1) + 'px ' + oy.toFixed(1) + 'px';
    const waveIn = () => anim(wave, [{ transform: 'scale(0)', opacity: 1, strokeWidth: 18 }, { opacity: 1, offset: 0.75 }, { transform: 'scale(1)', opacity: 0, strokeWidth: 2 }], { duration: Math.round(300 + maxD * 300), easing: E.out });
    const waveOut = () => anim(wave, [{ transform: 'scale(1)', opacity: 0, strokeWidth: 2 }, { opacity: 0.9, offset: 0.2 }, { transform: 'scale(0)', opacity: 0.9, strokeWidth: 14 }], { duration: 300, delay: 60, easing: E.in });
    return {
      cover: () => (deco(waveIn), all(base.map((c) => anim(c, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 300, delay: c.__d * 300 + R(0, 20), easing: E.out }))
        .concat(ink.map((c) => anim(c, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 260, delay: 120 + c.__d * 300 + R(0, 20), easing: E.kick }))))),
      uncover: () => (deco(waveOut), all(ink.map((c) => anim(c, [{ transform: 'scale(1)' }, { transform: 'scale(0)' }], { duration: 180, delay: (1 - c.__d) * 140, easing: E.in }))
        .concat(base.map((c) => anim(c, [{ transform: 'scale(1)' }, { transform: 'scale(0)' }], { duration: 300, delay: 60 + (1 - c.__d) * 280 + R(0, 20), easing: E.in }))))),
    };
  }

  // titoli: fasce di testo che scorrono, la parola della sezione ripetuta a tutta larghezza
  function titoli(g, W, H, dir, P) {
    const n = RI(5, 7), hh = (H * 1.3) / n, word = ((P.label || 'Last One Standing') + ' ').toUpperCase(), rows = [];
    for (let i = 0; i < n; i++) {
      const y = -H * 0.15 + i * hh, row = el('g', {}, g), dark = i % 2 === 0, side = (i % 2 ? 1 : -1) * dir;
      el('rect', { x: -W * 0.3, y: y - 1, width: W * 1.6, height: hh + 2, fill: dark ? P.void : i % 4 === 1 ? P.key : P.deep }, row);
      const fs = hh * 0.86, t = el('text', { x: -W * 0.3 - R(0, fs * 2), y: y + hh * 0.8, 'font-size': fs.toFixed(0), 'font-weight': 900, 'font-style': 'italic', fill: dark ? 'none' : P.void, 'fill-opacity': dark ? 1 : 0.28, stroke: dark ? P.key : 'none', 'stroke-width': dark ? 2 : 0, 'stroke-opacity': 0.75 }, row);
      t.style.fontFamily = "Archivo, 'Bricolage Grotesque', sans-serif"; t.style.fontStretch = '118%'; t.style.letterSpacing = '-.02em';
      t.textContent = word.repeat(Math.ceil((W * 1.7) / (fs * 0.62 * word.length)) + 1);
      if (i % 3 === 2) el('rect', { x: -W * 0.3, y: y + hh - 5, width: W * 1.6, height: 5, fill: P.paper }, row);
      // ornamento: dietro il testo, un cursore attraversa la fascia nel verso opposto mentre la fascia entra (parallasse)
      const cur = el('rect', { class: 'lx-x', x: (W * 0.43).toFixed(0), y: (y + hh * 0.1).toFixed(1), width: (W * R(0.1, 0.18)).toFixed(0), height: (hh * 0.8).toFixed(1), fill: dark ? P.paper : P.void, opacity: dark ? 0.13 : 0.2 });
      row.insertBefore(cur, t); row.__c = cur;
      row.__side = side; row.__i = i; row.__t = t; rows.push(row);
    }
    const off = W * 1.7;
    return {
      cover: () => all(rows.map((r) => {
        // il testo continua a scorrere finché la fascia resta in scena
        r.__t.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(' + -r.__side * 160 + 'px)' }], { duration: 1600, easing: 'linear', fill: 'both' });
        deco(() => anim(r.__c, [{ transform: 'translateX(' + (r.__side * W * 0.85).toFixed(0) + 'px) skewX(-14deg)' }, { transform: 'translateX(' + (-r.__side * W * R(0.12, 0.3)).toFixed(0) + 'px) skewX(-14deg)' }], { duration: 320, delay: r.__i * 30, easing: E.out }));
        return anim(r, [{ transform: 'translateX(' + -r.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 320, delay: r.__i * 30 + R(0, 16), easing: E.io });
      })),
      uncover: () => all(rows.map((r) => anim(r, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + r.__side * off + 'px)' }], { duration: 360, delay: (n - 1 - r.__i) * 24 + R(0, 14), easing: E.in }))),
    };
  }

  const FAMILIES = { lame, schegge, sipario, esplosione, retino, titoli };
  // la sezione d'arrivo ha una famiglia di casa; ogni tanto si cambia, ma mai la stessa due volte di fila
  const HOME = { home: ['titoli', 'lame'], cast: ['sipario', 'retino'], arena: ['schegge', 'titoli'], diretta: ['lame', 'retino'], esito: ['esplosione', 'schegge'] };
  function choose(view) {
    if (G.LOS_REGIA && FAMILIES[G.LOS_REGIA.force]) return (lastFamily = G.LOS_REGIA.force); // solo per provare
    const pref = HOME[view] || ['lame'];
    let f = Math.random() < 0.55 ? pref[0] : pick(pref.concat(Object.keys(FAMILIES)));
    if (f === lastFamily) f = pref.find((x) => x !== lastFamily) || Object.keys(FAMILIES).find((x) => x !== lastFamily);
    lastFamily = f; return f;
  }

  /* ---------- ornamenti a tutto schermo ----------
   * Sopra la copertura e sotto il cartello: la grana della carta, una pennellata che attraversa (lame, sipario,
   * titoli), una macchia d'impatto al centro dello scoppio, un angolo di mezzitoni (schegge, retino), una lama di luce
   * mentre il cartello entra e un respiro del cartello durante la pausa. Le durate sono quelle di base della famiglia. */
  const BASE = { lame: [300, 360], schegge: [250, 380], sipario: [290, 340], esplosione: [340, 420], retino: [300, 300], titoli: [320, 360] };
  function ornaments(host, fam, dir, P, shape) {
    const T = BASE[fam] || [290, 340], has = (c) => root.classList.contains(c);
    const mk = (cls, css) => { const n = document.createElement('i'); n.className = cls; if (css) n.style.cssText = css; host.appendChild(n); return n; };
    const grana = has('fx-grana') ? mk('lx-grana') : null;
    let ink = null, tone = null, splat = null;
    if (has('fx-pen') && (fam === 'lame' || fam === 'sipario' || fam === 'titoli')) { const k = RI(1, 4); ink = mk('lx-ink', 'top:' + R(6, 50).toFixed(0) + '%;height:' + R(28, 40).toFixed(0) + '%;-webkit-mask-image:var(--fx-pen' + k + ');mask-image:var(--fx-pen' + k + ')'); }
    else if (has('fx-forme') && fam === 'esplosione' && shape && shape.at) splat = mk('lx-splat', 'left:' + shape.at[0].toFixed(0) + 'px;top:' + shape.at[1].toFixed(0) + 'px');
    else if (has('fx-forme')) tone = mk('lx-tone', (dir > 0 ? 'right' : 'left') + ':-20vmax;' + (Math.random() < 0.5 ? 'top' : 'bottom') + ':-24vmax');
    const pass = (n, color, dur, easing) => { n.style.background = color; anim(n, [{ transform: 'translateX(' + -dir * 135 + '%) scaleX(' + dir + ')' }, { transform: 'translateX(' + dir * 135 + '%) scaleX(' + dir + ')' }], { duration: dur, easing }); };
    return {
      cover() {
        if (grana) anim(grana, [{ opacity: 0 }, { opacity: 0.2 }], { duration: T[0], easing: 'linear' });
        if (ink) pass(ink, P.void, T[0], E.io);
        if (splat) { splat.style.background = P.paper; anim(splat, [{ transform: 'scale(.15) rotate(-30deg)', opacity: 0 }, { opacity: 0.95, offset: 0.3 }, { transform: 'scale(1.6) rotate(8deg)', opacity: 0 }], { duration: T[0], easing: E.out }); }
        if (tone) { tone.style.background = P.paper; anim(tone, [{ transform: 'translate(' + dir * 9 + '%, 0) scale(.9)', opacity: 0 }, { opacity: 0.55, offset: 0.5 }, { transform: 'translate(0, 0) scale(1)', opacity: 0.34 }], { duration: T[0], easing: E.out }); }
      },
      // mentre il cartello entra: una lama di luce attraversa la copertura, sotto il cartello, e finisce prima delle lettere
      rest(capEl, tin) {
        const s = document.createElement('i'); s.className = 'lx-sweep'; host.insertBefore(s, capEl || null);
        anim(s, [{ transform: 'translateX(' + (dir > 0 ? -130 : 430) + '%) skewX(-18deg)' }, { transform: 'translateX(' + (dir > 0 ? 430 : -130) + '%) skewX(-18deg)' }], Object.assign(fit(tin, 30, 380), { easing: E.io }));
      },
      // la pausa: il cartello si assesta, per tutta e sola la durata della pausa
      settle(capEl, hold) { if (capEl) capEl.animate([{ scale: '1.026' }, { scale: '1' }], { duration: hold, easing: E.out }); },
      uncover() {
        if (grana) anim(grana, [{ opacity: 0.2 }, { opacity: 0 }], { duration: T[1], easing: 'linear' });
        if (ink) { ink.style.top = R(20, 62).toFixed(0) + '%'; ink.style.height = R(12, 18).toFixed(0) + '%'; pass(ink, P.paper, T[1], E.in); }
        if (tone) anim(tone, [{ transform: 'translate(0, 0) scale(1)', opacity: 0.34 }, { transform: 'translate(' + -dir * 10 + '%, 0) scale(1.06)', opacity: 0 }], { duration: T[1], easing: E.in });
      },
    };
  }

  /* ---------- l'accento della destinazione ----------
   * Stessa grammatica (carta, nero, tinta), un carattere per sezione: la Diretta è una regia TV (targhetta «In onda»,
   * livelli audio, riga di scansione), l'Esito un verdetto (due filetti che si chiudono e un punzone), i Trofei un
   * riflesso d'oro con le stelle, i Concorrenti un appello a caselle, l'Arena un mirino, la Home tre frecce.
   * Entra dentro la finestra d'entrata delle lettere (tin) ed esce in 140 ms, meno dell'uscita più breve del cartello. */
  const STAR_AT = [[-7, -42], [21, 112], [57, -50], [93, 100], [103, -18]];
  const ACC = {
    diretta: '<b class="lx-live"><i class="lx-dot"></i>In onda<span class="lx-bars"><i></i><i></i><i></i><i></i><i></i></span></b><i class="lx-scan"></i>',
    esito: '<i class="lx-rule t"></i><i class="lx-rule b"></i><i class="lx-punch"></i>',
    trofei: '<i class="lx-foilbox"><i class="lx-foil"></i></i>' + STAR_AT.map((p, i) => '<i class="lx-star" style="left:' + p[0] + '%;top:' + p[1] + '%;--k:' + (i % 2 ? 0.7 : 1) + '"></i>').join(''),
    cast: '<i class="lx-slots">' + '<i></i>'.repeat(7) + '</i>',
    arena: '<i class="lx-brk tl"></i><i class="lx-brk tr"></i><i class="lx-brk bl"></i><i class="lx-brk br"></i>',
    home: '<i class="lx-chev"><i></i><i></i><i></i></i>',
  };
  function accent(cap, view, dir, tin) {
    if (!ACC[view]) return null;
    const a = document.createElement('i'); a.className = 'lx-acc lx-a-' + view; a.innerHTML = ACC[view];
    cap.insertBefore(a, cap.querySelector('.lx-word'));
    const q = (s) => [...a.querySelectorAll(s)], go = (n, kf, delay, dur, easing) => anim(n, kf, Object.assign(fit(tin, delay, dur), { easing: easing || E.out }));
    if (view === 'diretta') {
      q('.lx-live').forEach((n) => go(n, [{ clipPath: 'inset(-30% 105% -30% -5%)' }, { clipPath: 'inset(-30% -5% -30% -5%)' }], 110, 200));
      q('.lx-dot').forEach((n) => go(n, [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 200, 220, 'steps(3, end)'));
      q('.lx-bars i').forEach((n, i) => go(n, [{ transform: 'scaleY(.15)' }, { transform: 'scaleY(1)', offset: 0.45 }, { transform: 'scaleY(' + R(0.35, 0.9).toFixed(2) + ')' }], 170 + i * 28, 220));
      q('.lx-scan').forEach((n) => go(n, [{ transform: 'translateY(0)', opacity: 0.45 }, { transform: 'translateY(.97em)', opacity: 0.45, offset: 0.9 }, { transform: 'translateY(.97em)', opacity: 0 }], 90, 300, 'linear'));
    } else if (view === 'esito') {
      q('.lx-rule').forEach((n, i) => go(n, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 60 + i * 50, 220, E.io));
      q('.lx-punch').forEach((n) => go(n, [{ transform: 'rotate(-90deg) scale(2.2)', opacity: 0 }, { opacity: 1, offset: 0.4 }, { transform: 'rotate(0deg) scale(1)', opacity: 1 }], 170, 240, E.kick));
    } else if (view === 'trofei') {
      q('.lx-foil').forEach((n) => go(n, [{ transform: 'translateX(-130%) skewX(-20deg)' }, { transform: 'translateX(330%) skewX(-20deg)' }], 110, 320, E.io));
      q('.lx-star').forEach((n, i) => go(n, [{ transform: 'scale(0) rotate(-60deg)' }, { transform: 'scale(calc(var(--k) * 1.3)) rotate(0deg)', offset: 0.55 }, { transform: 'scale(var(--k)) rotate(12deg)' }], 110 + i * 42, 260));
    } else if (view === 'cast') {
      const s = q('.lx-slots i'); s.forEach((n, i) => go(n, [{ transform: 'skewX(-24deg) scaleX(0)' }, { transform: 'skewX(-24deg) scaleX(1)' }], 90 + (dir > 0 ? i : s.length - 1 - i) * 30, 150));
    } else if (view === 'arena') {
      const off = { tl: '-.3em -.3em', tr: '.3em -.3em', bl: '-.3em .3em', br: '.3em .3em' };
      q('.lx-brk').forEach((n, i) => go(n, [{ translate: off[n.classList[1]], opacity: 0 }, { translate: '0 0', opacity: 1 }], 80 + i * 35, 220, E.kick));
    } else if (view === 'home') {
      q('.lx-chev i').forEach((n, i) => go(n, [{ translate: (-dir * 0.4).toFixed(1) + 'em 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], 120 + i * 45, 170));
    }
    return { out: () => anim(a, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: E.in }) };
  }

  /* ---------- il cartello: lastra di carta, lettere una per una ---------- */
  function caption(host, opt, view, fam, P, dir) {
    const cap = document.createElement('div'); cap.className = 'lx-cap lx-' + fam;
    const word = (opt.label || '').trim(); if (!word) return null;
    const sub = LABEL_SUB[view] || '';
    cap.innerHTML = '<i class="lx-slab"></i><b class="lx-word"></b>' + (sub ? '<small class="lx-sub"></small>' : '');
    const w = cap.querySelector('.lx-word');
    [...word].forEach((ch) => { const s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch; w.appendChild(s); });
    if (sub) cap.querySelector('.lx-sub').textContent = sub;
    const rot = R(-9, -4) * (fam === 'sipario' ? -0.6 : 1);
    cap.style.setProperty('--rot', rot.toFixed(1) + 'deg');
    cap.style.setProperty('--lx-key', P.key);
    // la posizione cambia con la famiglia: il testo sta dove la geometria lascia spazio
    const place = { lame: [dir > 0 ? 34 : 66, 58], schegge: [50, 50], sipario: [dir > 0 ? 60 : 40, 42], esplosione: [50, 50] }[fam] || [50, 50];
    cap.style.left = place[0] + '%'; cap.style.top = place[1] + '%';
    host.appendChild(cap);
    // il cartello resta sempre dentro lo schermo: le parole lunghe si stringono, poi si sposta il centro
    const W = G.innerWidth, fit = () => cap.getBoundingClientRect();
    let r = fit();
    if (r.width > W * 0.8) { cap.style.fontSize = 'calc(clamp(40px, 10vw, 138px) * ' + ((W * 0.8) / r.width).toFixed(3) + ')'; r = fit(); }
    const pad = W * 0.06;
    if (r.left < pad) cap.style.left = 'calc(' + place[0] + '% + ' + (pad - r.left).toFixed(0) + 'px)';
    else if (r.right > W - pad) cap.style.left = 'calc(' + place[0] + '% - ' + (r.right - W + pad).toFixed(0) + 'px)';
    const letters = [...w.children];
    const slab = cap.querySelector('.lx-slab'), subEl = cap.querySelector('.lx-sub');
    const inA = [
      anim(slab, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 200, delay: 40, easing: E.out }),
      ...letters.map((s, i) => anim(s, [{ transform: 'translateY(-.55em) rotate(' + R(-24, 24) + 'deg) scale(1.5)', opacity: 0 }, { opacity: 1, offset: 0.35 }, { transform: 'none', opacity: 1 }], { duration: 240, delay: 90 + i * 22 + R(0, 10), easing: E.kick })),
    ];
    if (subEl) inA.push(anim(subEl, [{ transform: 'translateX(' + -dir * 24 + 'px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 240, delay: 160 + letters.length * 22, easing: E.out }));
    // la finestra d'entrata garantita (l'ultima lettera, senza la parte casuale): gli ornamenti stanno qui dentro
    const tin = 90 + Math.max(0, letters.length - 1) * 22 + 240;
    const acc = deco(() => accent(cap, view, dir, tin));
    return {
      el: cap, tin,
      shown: all(inA),
      out: () => (deco(() => acc && acc.out()), all([
        ...letters.map((s, i) => anim(s, [{ transform: 'none', opacity: 1 }, { transform: 'translateX(' + dir * 0.6 + 'em) skewX(-20deg)', opacity: 0 }], { duration: 150, delay: i * 9, easing: E.in })),
        anim(slab, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)', transformOrigin: dir > 0 ? '100% 50%' : '0 50%' }], { duration: 200, delay: 60, easing: E.in }),
        ...(subEl ? [anim(subEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: E.in })] : []),
      ])),
    };
  }

  /* ---------- il timbro dell'arena ----------
   * Prima era un'ombra nera al 32% sotto il cartello: si vedeva appena. Ora è un timbro vero, accanto al cartello:
   * una lastra di carta dal bordo irregolare, il sigillo in inchiostro nero con una seconda passata nella tinta
   * dell'arena appena fuori registro, il nome dell'arena su un nastro. Cade dall'alto con l'ombra che si stringe
   * (sollevato → premuto), e all'impatto: due onde, schizzi d'inchiostro, la lastra che slitta, la scena che trema. */
  function stamp(host, url, P, opt, capEl) {
    const W = G.innerWidth, H = G.innerHeight;
    const S = Math.round(Math.max(124, Math.min(Math.min(W, H) * 0.4, 320)));
    const st = document.createElement('div'); st.className = 'lx-stamp';
    st.style.setProperty('--seal', 'url("' + url + '")'); st.style.setProperty('--lx-key', P.key); st.style.setProperty('--S', S + 'px');
    st.style.setProperty('--srot', (R(-14, -6) * (Math.random() < 0.25 ? -1 : 1)).toFixed(1) + 'deg');
    const edge = [];
    for (let i = 0; i < 64; i++) { const a = (i / 64) * Math.PI * 2, r = 50 - R(0, 1.6) - (Math.random() < 0.14 ? R(0.6, 2.2) : 0); edge.push((50 + Math.cos(a) * r).toFixed(2) + '% ' + (50 + Math.sin(a) * r).toFixed(2) + '%'); }
    const name = String(opt.arenaName || '').trim();
    st.innerHTML = '<svg class="lx-st-fx" viewBox="-100 -100 200 200"></svg><div class="lx-st-body"><i class="lx-st-plate"></i><i class="lx-st-mis"></i><i class="lx-st-ink"></i>' + (name ? '<b class="lx-st-name"></b>' : '') + '</div>';
    if (name) { st.querySelector('.lx-st-name').textContent = name; if (name.length > 15) st.style.setProperty('--rf', (15 / name.length).toFixed(3)); } // i nomi lunghi stringono il nastro
    st.querySelector('.lx-st-plate').style.clipPath = 'polygon(' + edge.join(',') + ')';
    host.appendChild(st);
    // accanto al cartello, sopra l'angolo destro (o sotto, se sopra non c'è posto), sempre dentro lo schermo
    let cx = W * 0.5, cy = H * 0.26;
    if (capEl) { const r = capEl.getBoundingClientRect(); cx = r.right - S * 0.12; cy = r.top > S * 0.95 ? r.top - S * 0.58 : r.bottom + S * 0.6; }
    const pad = 10 + S / 2;
    st.style.left = Math.min(W - pad, Math.max(pad, cx)).toFixed(0) + 'px'; st.style.top = Math.min(H - pad, Math.max(pad, cy)).toFixed(0) + 'px';
    const body = st.querySelector('.lx-st-body'), mis = st.querySelector('.lx-st-mis'), fx = st.querySelector('.lx-st-fx'), rib = st.querySelector('.lx-st-name');
    const T0 = 110, DUR = 300, IMP = T0 + DUR * 0.6;
    const sh = Math.max(5, Math.round(S * 0.03)), pressed = 'drop-shadow(' + sh + 'px ' + Math.round(sh * 1.15) + 'px 0 #0a0a0c)';
    const fall = anim(body, [
      { transform: 'rotate(calc(var(--srot) - 28deg)) scale(2.5)', opacity: 0, filter: 'drop-shadow(26px 34px 16px rgb(0 0 0 / .55))', easing: 'cubic-bezier(.55,0,1,.45)' },
      { transform: 'rotate(var(--srot)) scale(.9)', opacity: 1, filter: pressed, offset: 0.6, easing: E.out },
      { transform: 'rotate(calc(var(--srot) - 2deg)) scale(1.035)', offset: 0.8 },
      { transform: 'rotate(var(--srot)) scale(1)', opacity: 1, filter: pressed },
    ], { duration: DUR, delay: T0 });
    const slip = (S * 0.022).toFixed(1);
    anim(mis, [{ translate: '0 0' }, { translate: '0 0', offset: 0.6 }, { translate: slip + 'px -' + slip + 'px' }], { duration: DUR, delay: T0, easing: E.out });
    // l'impatto: due onde e gli schizzi, nelle unità della lastra (raggio 50)
    const wave = (color, w, delay, dur) => { const c = el('circle', { cx: 0, cy: 0, r: 51, fill: 'none', stroke: color, 'stroke-width': w }, fx); anim(c, [{ transform: 'scale(.94)', opacity: 0, strokeWidth: w }, { opacity: 1, offset: 0.06 }, { transform: 'scale(1.9)', opacity: 0, strokeWidth: 0.6 }], { duration: dur, delay, easing: E.out }); };
    wave(P.paper, 5, IMP, 460); wave(P.key, 8, IMP + 60, 540);
    for (let i = 0; i < 24; i++) {
      const a = R(0, Math.PI * 2), d = R(54, 96), r = i < 6 ? R(3, 4.6) : R(0.9, 2.6), dot = el('ellipse', { cx: 0, cy: 0, rx: (r * R(1.2, 2.2)).toFixed(1), ry: r.toFixed(1), fill: Math.random() < 0.62 ? P.void : P.key }, fx);
      const deg = ((a * 180) / Math.PI).toFixed(0);
      anim(dot, [{ transform: 'translate(' + (Math.cos(a) * 44).toFixed(1) + 'px,' + (Math.sin(a) * 44).toFixed(1) + 'px) rotate(' + deg + 'deg) scale(0)' }, { transform: 'translate(' + (Math.cos(a) * d).toFixed(1) + 'px,' + (Math.sin(a) * d).toFixed(1) + 'px) rotate(' + deg + 'deg) scale(1)' }], { duration: R(200, 300), delay: IMP + R(0, 30), easing: E.out });
    }
    host.animate([{ translate: '0 0' }, { translate: '-7px 5px' }, { translate: '6px -4px' }, { translate: '-3px 2px' }, { translate: '0 0' }], { duration: 220, delay: IMP, easing: 'steps(4, end)' });
    if (rib) anim(rib, [{ clipPath: 'inset(0 100% 0 0)', letterSpacing: '.5em' }, { clipPath: 'inset(0 0 0 0)', letterSpacing: '.18em' }], { duration: 280, delay: IMP + 50, easing: E.out });
    sfx('stamp', { at: IMP });
    return {
      landed: fall.finished.catch(() => {}),
      out: () => all([
        anim(body, [{ transform: 'rotate(var(--srot)) scale(1)', opacity: 1 }, { transform: 'rotate(calc(var(--srot) + 7deg)) scale(1.14)', opacity: 0 }], { duration: 210, easing: E.in }),
        anim(fx, [{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: E.in }),
      ]),
    };
  }

  /* ---------- la pagina nuova entra a strati ---------- */
  const ENTER = '.pagehead > div > p, h2, .card, .poster-card, .facts > *, .cta, .lead, .kicker, .hh-board, .broadcast, .winhero, .podium, .block, .award, .steps-hint, .arena-grid > *, .rules > *, .dock';
  function enter(view, dir) {
    const sec = document.getElementById('v-' + view); if (!sec) return;
    const vh = G.innerHeight, list = [];
    sec.querySelectorAll(ENTER).forEach((n) => {
      if (list.some((p) => p.contains(n))) return; // un blocco alla volta: i figli si muovono col padre
      if (n.getAnimations && n.getAnimations().some((a) => a.playState === 'running')) return; // ha già una sua regia
      const r = n.getBoundingClientRect(); if (!r.width || r.top > vh || r.bottom < 0) return;
      list.push(n);
    });
    list.sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.top - rb.top || ra.left - rb.left; });
    list.slice(0, 18).forEach((n, i) => {
      n.animate([{ translate: dir * 56 + 'px 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], { duration: 460, delay: 40 + i * 36, easing: E.out, fill: 'backwards' });
    });
  }

  /* ---------- il nuovo stacco ---------- */
  let layer = null;
  function wipe(swap, opt) {
    opt = opt || {};
    const body = document.body;
    const to = viewOf(G.location && G.location.hash), from = lastView;
    lastView = to;
    // pagina in secondo piano: le animazioni sono ferme, il cambio avviene subito
    if (AN.reduced || busy || !body || typeof body.animate !== 'function' || document.hidden) { swap(); return; }
    busy = true;
    const dir = ORDER.indexOf(to) >= ORDER.indexOf(from) ? 1 : -1;
    const W = G.innerWidth, H = G.innerHeight, P = palette(opt.hue); P.label = opt.label;
    if (!layer || !layer.isConnected) { layer = document.createElement('div'); layer.className = 'lx'; layer.setAttribute('aria-hidden', 'true'); body.appendChild(layer); }
    layer.innerHTML = ''; layer.hidden = false;
    const svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, class: 'lx-svg' });
    const defs = el('defs', {}, svg), g = el('g', {}, svg);
    layer.appendChild(svg);
    const fam = choose(to);
    const recent = lastPointer && Date.now() - lastPointer.t < 1200 ? lastPointer : null;
    const shape = FAMILIES[fam](g, W, H, dir, P, defs, recent);
    const orn = deco(() => ornaments(layer, fam, dir, P, shape)); // strati in più: nessuna attesa aggiunta
    // lo specchio per la direzione: le lame e il sipario arrivano dal lato giusto
    if (dir < 0 && (fam === 'lame')) g.setAttribute('transform', 'translate(' + W + ',0) scale(-1,1)');
    // il sipario non è mai dritto: qualche grado d'inclinazione, ingrandito quanto basta a coprire gli angoli
    if (fam === 'sipario' || fam === 'titoli') g.setAttribute('transform', 'translate(' + W / 2 + ' ' + H / 2 + ') rotate(' + (R(3, 7) * -dir).toFixed(1) + ') scale(1.22) translate(' + -W / 2 + ' ' + -H / 2 + ')');
    // il sigillo dell'arena: un timbro vero accanto al cartello (vedi stamp)
    const FX = (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {}, sealUrl = opt.arena && FX.sigilli && FX.sigilli[opt.arena];
    const canSeal = !!(sealUrl && (/^data:/.test(sealUrl) || /^https?:$/.test(G.location.protocol)));
    let seal = null;
    let swapped = false;
    const doSwap = () => { if (swapped) return; swapped = true; try { swap(); } catch (e) { setTimeout(() => { throw e; }); } };
    sfx('cut');
    let cap = null;
    const t0 = performance.now();
    // rete di sicurezza con i tempi di sempre: se le animazioni non arrivano in fondo, il cambio avviene lo stesso
    const guard = setTimeout(doSwap, 1400), clean = setTimeout(() => { doSwap(); layer.hidden = true; layer.innerHTML = ''; busy = false; }, 4500);
    deco(() => orn && orn.cover());
    shape.cover()
      .then(() => {
        cap = caption(layer, opt, to, fam, P, dir);
        deco(() => orn && cap && orn.rest(cap.el, cap.tin));
        if (canSeal) seal = stamp(layer, sealUrl, P, opt, cap && cap.el);
        else sfx('stamp', { at: 80 });
        doSwap();
        emit('los:cover', { view: to, dir, hue: P.hue });
        return Promise.all([cap ? cap.shown : null, seal ? seal.landed : null, new Promise((r) => setTimeout(r, 140))]);
      })
      // con il timbro il cartello resta fermo un po' di più: il tempo di leggere nome e sigillo
      .then(() => { const hold = opt.hold || (seal ? 420 : 110); deco(() => orn && cap && orn.settle(cap.el, hold)); return new Promise((r) => setTimeout(r, hold)); })
      .then(() => {
        const outs = [cap ? cap.out() : null];
        if (seal) outs.push(seal.out());
        enter(to, dir);
        emit('los:enter', { view: to, dir });
        return Promise.all(outs.concat([new Promise((r) => setTimeout(r, 70)).then(() => { deco(() => orn && orn.uncover()); return shape.uncover(); })]));
      })
      .catch(() => {})
      .then(() => { clearTimeout(guard); clearTimeout(clean); doSwap(); layer.hidden = true; layer.innerHTML = ''; busy = false; if (performance.now() - t0 > 4000) lastFamily = null; });
  }
  AN.wipe = wipe;

  /* ---------- i cartelli della diretta: fascia vettoriale strappata, diversa ogni volta ---------- */
  const card0 = AN.card;
  if (typeof card0 === 'function') AN.card = function (host) {
    const r = card0.apply(this, arguments);
    try {
      const st = host && host.querySelector(':scope > .stc:last-of-type'); if (!st) return r;
      const edge = (y0, amp) => { const a = []; const n = RI(16, 26); for (let i = 0; i <= n; i++) a.push([(i / n) * 100, y0 + (i && i < n ? R(-amp, amp) : 0)]); return a; };
      const top = edge(R(2, 8), R(1.5, 4)), bot = edge(R(92, 98), R(1.5, 4)).reverse();
      const clip = 'polygon(' + top.concat(bot).map((p) => p[0].toFixed(1) + '% ' + p[1].toFixed(1) + '%').join(',') + ')';
      st.style.setProperty('--lx-clip', clip);
      st.style.setProperty('--lx-tilt', R(-3.2, -1.4).toFixed(2) + 'deg');
      st.classList.add('lx-cut');
    } catch (e) { /* solo decorazione */ }
    return r;
  };

  G.LOS_REGIA = { wipe, families: Object.keys(FAMILIES), E };
})(typeof window !== 'undefined' ? window : globalThis);
