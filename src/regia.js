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
 * - Diretta, Esito e Trofei hanno uno stacco di firma (in onda, verdetto, lustro), sempre lo stesso;
 * - tutto lo stacco dura circa 700 ms e va a tempo con i timer: la pagina cambia sempre, una volta sola, anche se
 *   le animazioni sono ferme (scheda o pannello nascosti), e in quel caso lo stacco si chiude subito.
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
  const LABEL_SUB = { home: 'Simulatore di arena', cast: 'Passo 1 di 4', arena: 'Passo 2 di 4', diretta: 'Passo 3 di 4', esito: 'Passo 4 di 4', trofei: 'La tua bacheca' };
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
  const all = (a) => a.filter(Boolean);

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

  function lame(g, W, H, dir, P, defs) {
    const ang = R(13, 23), sl = H * Math.tan(rad(ang)), span = W + sl * 2;
    const n = RI(4, 6), wts = Array.from({ length: n }, () => R(0.6, 1.4)), sum = wts.reduce((a, b) => a + b, 0);
    const dots = halftone(defs, 'lxh' + Date.now(), P.key, RI(9, 13), R(1.6, 2.6), R(20, 50));
    const fills = [P.void, P.key, P.void, P.deep, P.key, P.void];
    let x = -sl; const blades = [];
    for (let i = 0; i < n; i++) {
      const w = (span * wts[i]) / sum + 24, m = 40; // 24 px di sovrapposizione: il bordo strappato non lascia fessure
      const right = jag(x + w + sl, -m, x + w, H + m, i % 2 ? R(3, 9) : R(1, 3), R(18, 34));
      const poly = [[x + sl, -m]].concat(right, [[x - 2, H + m]]);
      const b = el('polygon', { points: pts(poly), fill: fills[(i + RI(0, 1)) % fills.length] }, g);
      blades.push(b);
      if (b.getAttribute('fill') === P.void && Math.random() < 0.7) { const o = el('polygon', { points: pts(poly), fill: dots, opacity: R(0.35, 0.6) }, g); blades.push(o); o.__twin = b; }
      // una lama sottile di carta sul bordo di qualche lastra
      if (Math.random() < 0.55) { const t = R(5, 12), xp = x + w; blades.push(el('polygon', { points: pts([[xp + sl - t, -m], [xp + sl, -m], [xp, H + m], [xp - t, H + m]]), fill: P.paper }, g)); }
      x += w - 24;
    }
    const off = span + sl, fly = speed(g, W, H, P, RI(7, 11));
    blades.forEach((b, i) => { b.__i = b.__twin ? b.__twin.__i : blades.length - i; });
    return {
      cover: () => fly().concat(blades.map((b) => anim(b, [{ transform: 'translateX(' + -off + 'px)' }, { transform: 'translateX(0)' }], { duration: 300, delay: b.__i * 26 + R(0, 14), easing: E.io }))),
      uncover: () => all(blades.map((b) => anim(b, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + off + 'px)' }], { duration: 360, delay: (blades.length - b.__i) * 18 + R(0, 12), easing: E.in, composite: 'replace' }))),
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
    return {
      cover: () => all(shards.map((s) => anim(s, [{ transform: 'rotate(' + R(-50, 50) + 'deg) scale(0)', opacity: 0 }, { opacity: 1, offset: 0.4 }, { transform: 'rotate(0) scale(1)', opacity: 1 }], { duration: 250, delay: s.__d * 260 + R(0, 30), easing: E.out }))),
      uncover: () => all(shards.map((s) => { const k = R(0.25, 0.6) * far; return anim(s, [{ transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 }, { transform: 'translate(' + s.__v[0] * k + 'px,' + s.__v[1] * k + 'px) rotate(' + R(-90, 90) + 'deg) scale(' + R(0.3, 0.7) + ')', opacity: 0 }], { duration: 380, delay: s.__d * 160 + R(0, 40), easing: E.in }); })),
    };
  }

  function sipario(g, W, H, dir, P, defs) {
    const dots = halftone(defs, 'lxp' + Date.now(), P.key, RI(9, 12), R(1.6, 2.4), R(-30, 30));
    const n = RI(6, 9), wts = Array.from({ length: n }, () => R(0.5, 1.5)), sum = wts.reduce((a, b) => a + b, 0);
    const tilt = R(6, 14), strips = [];
    let y = -30;
    for (let i = 0; i < n; i++) {
      const h = ((H + 60) * wts[i]) / sum + 2, side = (i % 2 ? 1 : -1) * dir, sl = h * Math.tan(rad(tilt)) * (Math.random() < 0.5 ? 1 : -1);
      const lead = jag(W + 60 + sl, y, W + 60, y + h, R(4, 10), R(10, 18));
      const poly = [[-60, y]].concat(lead, [[-60 - sl, y + h]]);
      const fill = i % 3 === 1 ? P.key : i % 3 === 2 ? P.deep : P.void;
      const s = el('polygon', { points: pts(poly), fill }, g); s.__side = side; s.__i = i; strips.push(s);
      if (fill !== P.key && Math.random() < 0.6) strips.push(Object.assign(el('polygon', { points: pts(poly), fill: dots, opacity: R(0.3, 0.55) }, g), { __side: side, __i: i }));
      if (Math.random() < 0.4) { const t = R(4, 8); strips.push(Object.assign(el('rect', { x: -60, y: y + h - t, width: W + 140, height: t, fill: P.paper }, g), { __side: side, __i: i })); }
      y += h - 2;
    }
    const off = W + 160, fly = speed(g, W, H, P, RI(6, 9));
    return {
      cover: () => fly().concat(strips.map((s) => anim(s, [{ transform: 'translateX(' + -s.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 290, delay: s.__i * 24 + R(0, 16), easing: E.io }))),
      uncover: () => all(strips.map((s) => anim(s, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + s.__side * off + 'px)' }], { duration: 340, delay: (n - 1 - s.__i) * 20 + R(0, 14), easing: E.in }))),
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
    return {
      cover: () => all(layers.map((b, i) => anim(b, [{ transform: 'rotate(' + R(-40, -20) + 'deg) scale(0)' }, { transform: 'rotate(0) scale(1)' }], { duration: i === 3 ? 260 : 340, delay: i * 55, easing: E.out }))),
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
    return {
      cover: () => all(base.map((c) => anim(c, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 300, delay: c.__d * 300 + R(0, 20), easing: E.out }))
        .concat(ink.map((c) => anim(c, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 260, delay: 120 + c.__d * 300 + R(0, 20), easing: E.kick })))),
      uncover: () => all(ink.map((c) => anim(c, [{ transform: 'scale(1)' }, { transform: 'scale(0)' }], { duration: 180, delay: (1 - c.__d) * 140, easing: E.in }))
        .concat(base.map((c) => anim(c, [{ transform: 'scale(1)' }, { transform: 'scale(0)' }], { duration: 300, delay: 60 + (1 - c.__d) * 280 + R(0, 20), easing: E.in })))),
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
      row.__side = side; row.__i = i; row.__t = t; rows.push(row);
    }
    const off = W * 1.7;
    return {
      cover: () => all(rows.map((r) => {
        // il testo continua a scorrere finché la fascia resta in scena
        r.__t.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(' + -r.__side * 160 + 'px)' }], { duration: 1600, easing: 'linear', fill: 'both' });
        return anim(r, [{ transform: 'translateX(' + -r.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 320, delay: r.__i * 30 + R(0, 16), easing: E.io });
      })),
      uncover: () => all(rows.map((r) => anim(r, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + r.__side * off + 'px)' }], { duration: 360, delay: (n - 1 - r.__i) * 24 + R(0, 14), easing: E.in }))),
    };
  }

  /* ---------- le tre famiglie «di firma»: ognuna appartiene a una sola destinazione ---------- */

  // in onda (Diretta): due saracinesche nere si chiudono dall'alto e dal basso come un ciak, sulla giunta si accende
  // una fascia nella tinta con le righe del monitor e le barre colore; si riapre come un televisore che si accende
  function onair(g, W, H, dir, P, defs) {
    const m = 60, s = H * R(0.035, 0.07) * dir, cy = H * R(0.46, 0.54), th = Math.max(90, H * R(0.26, 0.34));
    const top = el('polygon', { points: pts([[-m, -m], [W + m, -m], [W + m, cy - s + 2], [-m, cy + s + 2]]), fill: P.void }, g);
    const bot = el('polygon', { points: pts([[-m, cy + s - 2], [W + m, cy - s - 2], [W + m, H + m], [-m, H + m]]), fill: P.void }, g);
    const id = 'lxo' + Date.now(), pat = el('pattern', { id, width: 6, height: 6, patternUnits: 'userSpaceOnUse' }, defs);
    el('rect', { x: 0, y: 0, width: 6, height: 2.4, fill: P.void }, pat);
    const band = el('g', {}, g); band.style.transformOrigin = (W / 2).toFixed(0) + 'px ' + cy.toFixed(0) + 'px';
    const bp = pts([[-m, cy + s - th / 2], [W + m, cy - s - th / 2], [W + m, cy - s + th / 2], [-m, cy + s + th / 2]]);
    el('polygon', { points: bp, fill: P.key }, band);
    el('polygon', { points: bp, fill: 'url(#' + id + ')', opacity: 0.16 }, band);
    el('polygon', { points: pts([[-m, cy + s - th / 2], [W + m, cy - s - th / 2], [W + m, cy - s - th / 2 + 7], [-m, cy + s - th / 2 + 7]]), fill: P.paper }, band);
    // le barre colore lungo il bordo basso della fascia
    const cols = [P.paper, P.light, P.key, P.deep, P.paper, P.light, P.void, P.key], bw = (W + m * 2) / cols.length, bars = [];
    cols.forEach((c, i) => {
      const x0 = -m + i * bw, y0 = cy + s - (2 * s * (x0 + m)) / (W + m * 2) + th / 2, y1 = cy + s - (2 * s * (x0 + bw + m)) / (W + m * 2) + th / 2;
      const b = el('polygon', { points: pts([[x0, y0 - 16], [x0 + bw + 1, y1 - 16], [x0 + bw + 1, y1], [x0, y0]]), fill: c }, band);
      b.style.transformOrigin = x0.toFixed(0) + 'px ' + y0.toFixed(0) + 'px'; b.__i = dir > 0 ? i : cols.length - 1 - i; bars.push(b);
    });
    const line = el('polygon', { points: pts([[-m, cy + s - 3], [W + m, cy - s - 3], [W + m, cy - s + 3], [-m, cy + s + 3]]), fill: P.paper, opacity: 0 }, g);
    line.style.transformOrigin = (W / 2).toFixed(0) + 'px ' + cy.toFixed(0) + 'px';
    const fly = speed(g, W, H, P, RI(4, 6)), K = H * 0.62 + m;
    return {
      cover: () => fly().concat([
        anim(top, [{ transform: 'translateY(' + -K + 'px)' }, { transform: 'translateY(0)' }], { duration: 210, easing: E.io }),
        anim(bot, [{ transform: 'translateY(' + K + 'px)' }, { transform: 'translateY(0)' }], { duration: 210, delay: 24, easing: E.io }),
        anim(band, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 200, delay: 170, easing: E.kick }),
      ], bars.map((b) => anim(b, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 120, delay: 240 + b.__i * 16, easing: E.out }))),
      uncover: () => [
        anim(band, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 150, easing: E.in }),
        anim(line, [{ opacity: 1, transform: 'scaleX(1)' }, { opacity: 1, transform: 'scaleX(1)', offset: 0.45 }, { opacity: 0, transform: 'scaleX(0)' }], { duration: 300, delay: 90, easing: E.out }),
        anim(top, [{ transform: 'translateY(0)' }, { transform: 'translateY(' + -K + 'px)' }], { duration: 250, delay: 110, easing: E.in }),
        anim(bot, [{ transform: 'translateY(0)' }, { transform: 'translateY(' + K + 'px)' }], { duration: 250, delay: 110, easing: E.in }),
      ],
    };
  }

  // verdetto (Esito): due metà, una nera e una nella tinta, si chiudono lungo una diagonale come una sentenza;
  // all'impatto un lampo di carta sulla giunta, poi le due metà si separano
  function verdetto(g, W, H, dir, P, defs) {
    const a = rad(R(-30, -18) * dir), ux = Math.cos(a), uy = Math.sin(a), nx = -uy, ny = ux, L = Math.hypot(W, H) * 1.3, cx = W / 2, cy = H / 2;
    const dots = halftone(defs, 'lxv' + Date.now(), P.void, RI(9, 12), R(1.8, 2.6), R(15, 50));
    const half = (s, fill) => pts([[cx - ux * L - nx * 3 * s, cy - uy * L - ny * 3 * s], [cx + ux * L - nx * 3 * s, cy + uy * L - ny * 3 * s], [cx + ux * L + nx * L * s, cy + uy * L + ny * L * s], [cx - ux * L + nx * L * s, cy - uy * L + ny * L * s]]);
    const A = el('g', {}, g), B = el('g', {}, g);
    el('polygon', { points: half(-1), fill: P.void }, A);
    el('polygon', { points: half(1), fill: P.key }, B);
    el('polygon', { points: half(1), fill: dots, opacity: 0.3 }, B);
    // un filo di carta sul bordo di ciascuna metà: la giunta si legge anche a metà corsa
    const rim = (s, par) => el('polygon', { points: pts([[cx - ux * L, cy - uy * L], [cx + ux * L, cy + uy * L], [cx + ux * L + nx * 9 * s, cy + uy * L + ny * 9 * s], [cx - ux * L + nx * 9 * s, cy - uy * L + ny * 9 * s]]), fill: P.paper }, par);
    rim(-1, A); rim(1, B);
    const flash = el('line', { x1: cx - ux * L, y1: cy - uy * L, x2: cx + ux * L, y2: cy + uy * L, stroke: P.paper, 'stroke-width': 26, opacity: 0 }, g);
    const K = Math.hypot(W, H) * 0.62, tr = (k) => 'translate(' + (nx * k).toFixed(0) + 'px,' + (ny * k).toFixed(0) + 'px)';
    return {
      cover: () => [
        anim(A, [{ transform: tr(-K) }, { transform: tr(0) }], { duration: 230, easing: 'cubic-bezier(.6,0,.9,.4)' }),
        anim(B, [{ transform: tr(K) }, { transform: tr(0) }], { duration: 230, delay: 20, easing: 'cubic-bezier(.6,0,.9,.4)' }),
        anim(flash, [{ opacity: 0, strokeWidth: 40 }, { opacity: 1, strokeWidth: 30, offset: 0.2 }, { opacity: 0, strokeWidth: 0 }], { duration: 230, delay: 225, easing: E.out }),
        // il contraccolpo: tutto il piano rimbalza di qualche pixel lungo la diagonale
        anim(g, [{ translate: '0 0' }, { translate: (ux * 10).toFixed(1) + 'px ' + (uy * 10).toFixed(1) + 'px' }, { translate: (-ux * 6).toFixed(1) + 'px ' + (-uy * 6).toFixed(1) + 'px' }, { translate: '0 0' }], { duration: 150, delay: 250, easing: 'steps(3, end)', fill: 'none' }),
      ],
      uncover: () => [
        anim(A, [{ transform: tr(0) }, { transform: tr(-K * 1.25) }], { duration: 300, easing: E.in }),
        anim(B, [{ transform: tr(0) }, { transform: tr(K * 1.25) }], { duration: 300, delay: 26, easing: E.in }),
      ],
    };
  }

  // lustro (Trofei): un ventaglio di raggi si apre dal basso come dietro una coppa, un riflesso di carta
  // attraversa tutto lo schermo e restano accese alcune scintille
  function lustro(g, W, H, dir, P, defs) {
    const ox = W * R(0.42, 0.58), oy = H * 1.14, far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy)) * 1.08;
    const n = RI(10, 14), a0 = -8, a1 = 188, fills = [P.key, P.void, P.deep, P.void], rays = [];
    const dots = halftone(defs, 'lxl' + Date.now(), P.key, RI(9, 12), R(1.6, 2.4), R(20, 50));
    for (let i = 0; i < n; i++) {
      const t0 = rad(a0 + ((a1 - a0) * i) / n - 0.7), t1 = rad(a0 + ((a1 - a0) * (i + 1)) / n + 0.7), fill = fills[i % fills.length];
      const poly = pts([[ox, oy], [ox + Math.cos(t0) * far, oy - Math.sin(t0) * far], [ox + Math.cos(t1) * far, oy - Math.sin(t1) * far]]);
      const k = dir > 0 ? n - 1 - i : i; // il ventaglio si apre nel verso della navigazione
      [el('polygon', { points: poly, fill }, g)].concat(fill === P.void && i % 2 ? [el('polygon', { points: poly, fill: dots, opacity: 0.45 }, g)] : []).forEach((r) => { r.style.transformOrigin = ox.toFixed(0) + 'px ' + oy.toFixed(0) + 'px'; r.__i = k; rays.push(r); });
    }
    // il riflesso: una lama di carta inclinata, con un filo più sottile accanto
    const sw = Math.max(70, W * 0.13), sl = H * 0.42, shine = el('g', { opacity: 0.92 }, g);
    el('polygon', { points: pts([[-sw + sl, -40], [sl, -40], [-sl, H + 40], [-sw - sl, H + 40]]), fill: P.paper }, shine);
    el('polygon', { points: pts([[-sw * 1.5 + sl, -40], [-sw * 1.32 + sl, -40], [-sw * 1.32 - sl, H + 40], [-sw * 1.5 - sl, H + 40]]), fill: P.light }, shine);
    shine.style.opacity = 0;
    // le scintille: stelle a quattro punte di carta e di luce
    const stars = [];
    for (let i = 0; i < RI(7, 10); i++) {
      const x = R(0.06, 0.94) * W, y = R(0.08, 0.86) * H, r = R(14, 40) * Math.max(0.7, Math.min(1.4, W / 900)), q = r * 0.2;
      const st = el('polygon', { points: pts([[x, y - r], [x + q, y - q], [x + r, y], [x + q, y + q], [x, y + r], [x - q, y + q], [x - r, y], [x - q, y - q]]), fill: i % 3 ? P.paper : P.light }, g);
      st.style.transformOrigin = x.toFixed(0) + 'px ' + y.toFixed(0) + 'px'; st.style.opacity = 0; st.__x = x / W; stars.push(st);
    }
    const sx = (W + sw * 2 + sl * 2);
    return {
      cover: () => rays.map((r) => anim(r, [{ transform: 'rotate(' + -dir * 24 + 'deg) scale(0)' }, { transform: 'rotate(0) scale(1)' }], { duration: 190, delay: r.__i * 8 + R(0, 8), easing: E.out })).concat(
        [anim(shine, [{ transform: 'translateX(' + (dir > 0 ? -sl : sx) + 'px)', opacity: 0.92 }, { transform: 'translateX(' + (dir > 0 ? sx : -sl) + 'px)', opacity: 0.92 }], { duration: 300, delay: 150, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'none' })],
        stars.map((st) => anim(st, [{ transform: 'scale(0) rotate(-40deg)', opacity: 1 }, { transform: 'scale(1) rotate(0)', opacity: 1 }], { duration: 170, delay: 200 + (dir > 0 ? st.__x : 1 - st.__x) * 210, easing: E.kick }))),
      uncover: () => stars.map((st) => anim(st, [{ transform: 'scale(1) rotate(0)', opacity: 1 }, { transform: 'scale(0) rotate(50deg)', opacity: 1 }], { duration: 150, delay: R(0, 70), easing: E.in })).concat(
        rays.map((r) => anim(r, [{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(' + dir * 16 + 'deg) scale(0)' }], { duration: 250, delay: 40 + (n - 1 - r.__i) * 12 + R(0, 8), easing: E.in }))),
    };
  }

  const FAMILIES = { lame, schegge, sipario, esplosione, retino, titoli, onair, verdetto, lustro };
  // la sezione d'arrivo ha una famiglia di casa. Diretta, Esito e Trofei hanno uno stacco di firma, sempre quello;
  // le altre sezioni ogni tanto cambiano, ma mai la stessa famiglia due volte di fila
  const HOME = { home: ['titoli', 'lame'], cast: ['sipario', 'retino'], arena: ['schegge', 'lame'], diretta: ['onair'], esito: ['verdetto'], trofei: ['lustro'] };
  const SIGN = { onair: 150, verdetto: 150, lustro: 190 }; // millisecondi di coda dopo la copertura
  const COMMON = ['lame', 'schegge', 'sipario', 'retino', 'titoli', 'esplosione'];
  function choose(view) {
    if (G.LOS_REGIA && FAMILIES[G.LOS_REGIA.force]) return (lastFamily = G.LOS_REGIA.force); // solo per provare
    const pref = HOME[view] || ['lame'];
    if (pref.length === 1) return (lastFamily = pref[0]);
    let f = Math.random() < 0.7 ? pref[0] : pick(pref.concat(COMMON));
    if (f === lastFamily) f = pref.find((x) => x !== lastFamily) || COMMON.find((x) => x !== lastFamily);
    lastFamily = f; return f;
  }
  // stringe (o allunga) un gruppo di animazioni perché finisca in `total` millisecondi: ogni famiglia tiene
  // il suo ritmo interno, ma tutte stanno nella stessa griglia dei tempi
  function fit(list, total) {
    let end = 0;
    list.forEach((a) => { try { end = Math.max(end, a.effect.getComputedTiming().endTime); } catch (e) { /* niente */ } });
    if (end > 0 && Math.abs(end - total) > 8) list.forEach((a) => { try { a.playbackRate = end / total; } catch (e) { /* niente */ } });
    return list;
  }

  /* ---------- il cartello: lastra di carta, lettere una per una ---------- */
  function caption(host, opt, view, fam, P, dir) {
    const cap = document.createElement('div'); cap.className = 'lx-cap lx-' + fam;
    const word = (opt.label || '').trim(); if (!word) return null;
    const sub = LABEL_SUB[view] || '';
    // la Diretta ha in più la spia «in onda»
    cap.innerHTML = (fam === 'onair' ? '<em class="lx-live"><i></i>In onda</em>' : '') + '<i class="lx-slab"></i><b class="lx-word"></b>' + (sub ? '<small class="lx-sub"></small>' : '');
    const w = cap.querySelector('.lx-word');
    [...word].forEach((ch) => { const s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch; w.appendChild(s); });
    if (sub) cap.querySelector('.lx-sub').textContent = sub;
    const rot = R(-9, -4) * (fam === 'sipario' ? -0.6 : 1);
    cap.style.setProperty('--rot', rot.toFixed(1) + 'deg');
    cap.style.setProperty('--lx-key', P.key);
    // la posizione cambia con la famiglia: il testo sta dove la geometria lascia spazio
    const place = { lame: [dir > 0 ? 34 : 66, 58], schegge: [50, 50], sipario: [dir > 0 ? 60 : 40, 42], esplosione: [50, 50], lustro: [50, 44] }[fam] || [50, 50];
    if (fam === 'onair') cap.style.setProperty('--rot', (R(-3.5, -2) * dir).toFixed(1) + 'deg');
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
    const slab = cap.querySelector('.lx-slab'), subEl = cap.querySelector('.lx-sub'), live = cap.querySelector('.lx-live');
    let inA;
    if (fam === 'verdetto') {
      // la sentenza cade tutta insieme, come un timbro: niente lettere una per una
      inA = [
        anim(cap, [{ scale: '2.4', opacity: 0, easing: 'cubic-bezier(.55,0,1,.45)' }, { scale: '.94', opacity: 1, offset: 0.62, easing: E.out }, { scale: '1', opacity: 1 }], { duration: 230, delay: 150 }),
        anim(slab, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1)' }], { duration: 10 }),
      ];
    } else {
      inA = [
        anim(slab, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 170, delay: 20, easing: E.out }),
        ...letters.map((s, i) => anim(s, [{ transform: 'translateY(-.55em) rotate(' + R(-24, 24) + 'deg) scale(1.5)', opacity: 0 }, { opacity: 1, offset: 0.35 }, { transform: 'none', opacity: 1 }], { duration: 200, delay: 60 + i * 15 + R(0, 8), easing: E.kick })),
      ];
    }
    if (subEl) inA.push(anim(subEl, [{ transform: 'translateX(' + -dir * 24 + 'px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 180, delay: 110 + Math.min(letters.length, 10) * 12, easing: E.out }));
    if (live) {
      inA.push(anim(live, [{ transform: 'translateX(' + -dir * 30 + 'px) skewX(-12deg)', opacity: 0 }, { transform: 'skewX(-12deg)', opacity: 1 }], { duration: 160, delay: 40, easing: E.out }));
      anim(live.firstChild, [{ opacity: 1 }, { opacity: 0.15 }, { opacity: 1 }], { duration: 260, iterations: 4, easing: 'steps(2, end)', fill: 'none' });
    }
    return {
      el: cap,
      shown: inA,
      out: () => [
        ...letters.map((s, i) => anim(s, [{ transform: 'none', opacity: 1 }, { transform: 'translateX(' + dir * 0.6 + 'em) skewX(-20deg)', opacity: 0 }], { duration: 130, delay: Math.min(i * 7, 70), easing: E.in })),
        anim(slab, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)', transformOrigin: dir > 0 ? '100% 50%' : '0 50%' }], { duration: 170, delay: 40, easing: E.in }),
        ...(subEl ? [anim(subEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 110, easing: E.in })] : []),
        ...(live ? [anim(live, [{ opacity: 1 }, { opacity: 0 }], { duration: 110, easing: E.in })] : []),
      ],
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
    if (capEl) { const r = capEl.getBoundingClientRect(); cx = r.right - S * 0.12; cy = r.top > S * 1.02 ? r.top - S * 0.66 : r.bottom + S * 0.66; }
    const pad = 10 + S / 2;
    st.style.left = Math.min(W - pad, Math.max(pad, cx)).toFixed(0) + 'px'; st.style.top = Math.min(H - pad, Math.max(pad, cy)).toFixed(0) + 'px';
    const body = st.querySelector('.lx-st-body'), mis = st.querySelector('.lx-st-mis'), fx = st.querySelector('.lx-st-fx'), rib = st.querySelector('.lx-st-name');
    const T0 = 20, DUR = 230, IMP = T0 + DUR * 0.6;
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
    wave(P.paper, 5, IMP, 300); wave(P.key, 8, IMP + 40, 340);
    for (let i = 0; i < 24; i++) {
      const a = R(0, Math.PI * 2), d = R(54, 96), r = i < 6 ? R(3, 4.6) : R(0.9, 2.6), dot = el('ellipse', { cx: 0, cy: 0, rx: (r * R(1.2, 2.2)).toFixed(1), ry: r.toFixed(1), fill: Math.random() < 0.62 ? P.void : P.key }, fx);
      const deg = ((a * 180) / Math.PI).toFixed(0);
      anim(dot, [{ transform: 'translate(' + (Math.cos(a) * 44).toFixed(1) + 'px,' + (Math.sin(a) * 44).toFixed(1) + 'px) rotate(' + deg + 'deg) scale(0)' }, { transform: 'translate(' + (Math.cos(a) * d).toFixed(1) + 'px,' + (Math.sin(a) * d).toFixed(1) + 'px) rotate(' + deg + 'deg) scale(1)' }], { duration: R(150, 220), delay: IMP + R(0, 24), easing: E.out });
    }
    host.animate([{ translate: '0 0' }, { translate: '-7px 5px' }, { translate: '6px -4px' }, { translate: '-3px 2px' }, { translate: '0 0' }], { duration: 180, delay: IMP, easing: 'steps(4, end)' });
    if (rib) anim(rib, [{ clipPath: 'inset(0 100% 0 0)', letterSpacing: '.5em' }, { clipPath: 'inset(0 0 0 0)', letterSpacing: '.18em' }], { duration: 190, delay: IMP + 30, easing: E.out });
    sfx('stamp', { at: IMP });
    return {
      landed: fall,
      out: () => [
        anim(body, [{ transform: 'rotate(var(--srot)) scale(1)', opacity: 1 }, { transform: 'rotate(calc(var(--srot) + 7deg)) scale(1.14)', opacity: 0 }], { duration: 170, easing: E.in }),
        anim(fx, [{ opacity: 1 }, { opacity: 0 }], { duration: 130, easing: E.in }),
      ],
    };
  }

  /* ---------- la pagina nuova entra a strati ----------
   * I blocchi visibili entrano uno dopo l'altro dal lato della navigazione mentre la copertura se ne va. Si muovono
   * solo `translate` e `opacity` (proprietà indipendenti: le inclinazioni dei blocchi restano le loro), l'opacità è
   * piena a un terzo della corsa e i ritardi hanno un tetto: a stacco finito il testo si legge già tutto. */
  const ENTER = '.pagehead > div > p, h2, .card, .poster-card, .facts > *, .cta, .lead, .kicker, .hh-board, .broadcast, .winhero, .podium, .block, .award, .steps-hint, .arena-grid > *, .rules > *, .dock, .bc-tabs';
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
    const far = Math.min(84, Math.max(40, G.innerWidth * 0.07));
    list.slice(0, 18).forEach((n, i) => {
      const y = i % 2 ? 10 : -6;
      n.animate([{ translate: (dir * far).toFixed(0) + 'px ' + y + 'px', opacity: 0 }, { opacity: 1, offset: 0.34 }, { translate: '0 0', opacity: 1 }], { duration: 360, delay: 20 + Math.min(i, 9) * 24, easing: E.out, fill: 'backwards' });
    });
  }

  /* ---------- il nuovo stacco ----------
   * Griglia dei tempi (ms): copertura 0→COVER, cambio pagina a COVER (il punto di mezzo), cartello fermo per HOLD,
   * uscita in UNCOVER; in tutto 660 ms (710 con il timbro dell'arena). La regia va a tempo con i timer, non con la fine delle animazioni:
   * così `swap` viene chiamata sempre, una volta sola e presto, anche quando la scheda o il pannello sono nascosti
   * e le animazioni restano ferme al primo fotogramma. In quel caso (documento nascosto, oppure nessun fotogramma
   * entro FROZEN ms) lo stacco si chiude subito: la pagina cambia e la copertura viene tolta. */
  const COVER = 210, HOLD = 170, HOLD_SEAL = 220, UNCOVER = 280, FROZEN = 150;
  let layer = null, cut = 0, finish = null;
  function wipe(swap, opt) {
    opt = opt || {};
    const body = document.body;
    const to = viewOf(G.location && G.location.hash), from = lastView;
    lastView = to;
    const dir = ORDER.indexOf(to) >= ORDER.indexOf(from) ? 1 : -1;
    let swapped = false;
    const doSwap = () => { if (swapped) return; swapped = true; try { swap(); } catch (e) { setTimeout(() => { throw e; }); } };
    // niente movimento, pagina nascosta, uno stacco già in corso: la pagina cambia subito
    if (AN.reduced || busy || !body || typeof body.animate !== 'function' || document.hidden) {
      doSwap();
      emit('los:cover', { view: to, dir, hue: opt.hue, still: true }); emit('los:enter', { view: to, dir, still: true });
      return;
    }
    busy = true;
    const my = ++cut, timers = [];
    const later = (ms, fn) => { const id = setTimeout(() => { if (my === cut && busy) fn(); }, ms); timers.push(id); return id; };
    let stage = 0, cap = null, seal = null, shape = null, fam = null, P = null;
    // se nel frattempo si è cambiata ancora sezione (stacco saltato perché questo era in corso), vale quella di adesso
    const here = () => viewOf(G.location && G.location.hash);
    const mid = (still) => { if (stage >= 1) return; stage = 1; doSwap(); emit('los:cover', { view: here(), dir, hue: P ? P.hue : opt.hue, still: !!still }); };
    const open = () => {
      mid(); if (stage >= 2) return; stage = 2;
      try {
        if (cap) cap.out(); if (seal) seal.out();
        enter(here(), dir);
        fit(shape.uncover(), UNCOVER);
      } catch (e) { /* solo decorazione: la chiusura arriva comunque dal timer */ }
      emit('los:enter', { view: here(), dir });
    };
    const end = (still) => {
      if (stage >= 3) return;
      mid(still); if (stage < 2) emit('los:enter', { view: here(), dir, still: !!still });
      stage = 3; timers.forEach(clearTimeout); document.removeEventListener('visibilitychange', onVis);
      if (layer) { layer.hidden = true; layer.innerHTML = ''; }
      busy = false; finish = null;
    };
    finish = end;
    const onVis = () => { if (document.hidden) end(true); };
    // con il timbro il cartello resta fermo un po' di più: il tempo di leggere nome e sigillo
    const FX = (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {}, sealUrl = opt.arena && FX.sigilli && FX.sigilli[opt.arena];
    const canSeal = !!(sealUrl && (/^data:/.test(sealUrl) || /^https?:$/.test(G.location.protocol)));
    const hold = (canSeal ? HOLD_SEAL : HOLD) + (opt.hold || 0);
    // i timer partono prima di disegnare: nessun errore nel disegno può fermare il cambio di pagina
    // LOS_REGIA.hold ('cover' oppure 'open') ferma lo stacco a quel punto per poterlo guardare: solo per provare; LOS_REGIA.done() lo chiude
    const stop = G.LOS_REGIA && G.LOS_REGIA.hold;
    later(COVER, () => mid());
    if (stop !== 'cover') later(COVER + hold, open);
    if (!stop) later(COVER + hold + UNCOVER + 40, () => end());
    document.addEventListener('visibilitychange', onVis);
    // la sentinella dei fotogrammi: se entro FROZEN ms non ne arriva nessuno, le animazioni sono ferme
    let framed = false;
    try { requestAnimationFrame(() => { framed = true; }); } catch (e) { /* niente */ }
    if (!stop) later(FROZEN, () => { if (!framed) end(true); });
    try {
      const W = G.innerWidth, H = G.innerHeight; P = palette(opt.hue); P.label = opt.label;
      if (!layer || !layer.isConnected) { layer = document.createElement('div'); layer.className = 'lx'; layer.setAttribute('aria-hidden', 'true'); body.appendChild(layer); }
      layer.innerHTML = ''; layer.hidden = false;
      const svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, class: 'lx-svg' });
      const defs = el('defs', {}, svg), g = el('g', {}, svg);
      layer.appendChild(svg);
      fam = choose(to);
      const recent = lastPointer && Date.now() - lastPointer.t < 1200 ? lastPointer : null;
      shape = FAMILIES[fam](g, W, H, dir, P, defs, recent);
      // lo specchio per la direzione: le lame arrivano dal lato giusto
      if (dir < 0 && (fam === 'lame')) g.setAttribute('transform', 'translate(' + W + ',0) scale(-1,1)');
      // il sipario non è mai dritto: qualche grado d'inclinazione, ingrandito quanto basta a coprire gli angoli
      if (fam === 'sipario' || fam === 'titoli') g.setAttribute('transform', 'translate(' + W / 2 + ' ' + H / 2 + ') rotate(' + (R(3, 7) * -dir).toFixed(1) + ') scale(1.22) translate(' + -W / 2 + ' ' + -H / 2 + ')');
      sfx('cut');
      // le firme hanno una coda (fascia, lampo, scintille) che cade a pagina già coperta
      fit(shape.cover(), COVER + (SIGN[fam] || 0));
      // il cartello parte mentre le lastre stanno ancora arrivando: a copertura chiusa si legge già
      later(90, () => {
        try {
          cap = caption(layer, opt, to, fam, P, dir);
          if (cap) fit(cap.shown, fam === 'verdetto' ? 260 : 230);
          // il sigillo dell'arena: un timbro vero accanto al cartello (vedi stamp)
          if (canSeal) seal = stamp(layer, sealUrl, P, opt, cap && cap.el); else sfx('stamp', { at: 120 });
        } catch (e) { /* solo decorazione */ }
      });
    } catch (e) { end(true); setTimeout(() => { throw e; }); }
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

  G.LOS_REGIA = { wipe, families: Object.keys(FAMILIES), E, done: () => { if (finish) finish(true); } };
})(typeof window !== 'undefined' ? window : globalThis);
