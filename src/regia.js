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
  const ORDER = ['home', 'cast', 'arena', 'diretta', 'esito'];
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
    const off = span + sl;
    blades.forEach((b, i) => { b.__i = b.__twin ? b.__twin.__i : blades.length - i; });
    return {
      cover: () => all(blades.map((b) => anim(b, [{ transform: 'translateX(' + -off + 'px)' }, { transform: 'translateX(0)' }], { duration: 300, delay: b.__i * 26 + R(0, 14), easing: E.io }))),
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
    const off = W + 160;
    return {
      cover: () => all(strips.map((s) => anim(s, [{ transform: 'translateX(' + -s.__side * off + 'px)' }, { transform: 'translateX(0)' }], { duration: 290, delay: s.__i * 24 + R(0, 16), easing: E.io }))),
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
    return {
      shown: all(inA),
      out: () => all([
        ...letters.map((s, i) => anim(s, [{ transform: 'none', opacity: 1 }, { transform: 'translateX(' + dir * 0.6 + 'em) skewX(-20deg)', opacity: 0 }], { duration: 150, delay: i * 9, easing: E.in })),
        anim(slab, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)', transformOrigin: dir > 0 ? '100% 50%' : '0 50%' }], { duration: 200, delay: 60, easing: E.in }),
        ...(subEl ? [anim(subEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: E.in })] : []),
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
    if (AN.reduced || busy || !body || typeof body.animate !== 'function') { swap(); return; }
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
    // lo specchio per la direzione: le lame e il sipario arrivano dal lato giusto
    if (dir < 0 && (fam === 'lame')) g.setAttribute('transform', 'translate(' + W + ',0) scale(-1,1)');
    // il sipario non è mai dritto: qualche grado d'inclinazione, ingrandito quanto basta a coprire gli angoli
    if (fam === 'sipario' || fam === 'titoli') g.setAttribute('transform', 'translate(' + W / 2 + ' ' + H / 2 + ') rotate(' + (R(3, 7) * -dir).toFixed(1) + ') scale(1.22) translate(' + -W / 2 + ' ' + -H / 2 + ')');
    // il sigillo dell'arena, timbrato vicino al nome (piccolo: la sorgente è di 320 px)
    const FX = (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {}, sealUrl = opt.arena && FX.sigilli && FX.sigilli[opt.arena];
    let seal = null;
    if (sealUrl && (/^data:/.test(sealUrl) || /^https?:$/.test(G.location.protocol))) {
      seal = document.createElement('i'); seal.className = 'lx-seal'; seal.style.setProperty('--seal', 'url("' + sealUrl + '")'); seal.style.setProperty('--lx-key', P.key); layer.appendChild(seal);
    }
    let swapped = false;
    const doSwap = () => { if (swapped) return; swapped = true; try { swap(); } catch (e) { setTimeout(() => { throw e; }); } };
    sfx('cut');
    let cap = null;
    const t0 = performance.now();
    shape.cover()
      .then(() => {
        cap = caption(layer, opt, to, fam, P, dir);
        if (seal) seal.animate([{ transform: 'translate(-50%,-50%) rotate(-28deg) scale(1.7)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-10deg) scale(1)', opacity: 0.9 }], { duration: 220, easing: E.out, fill: 'both' });
        sfx('stamp', { at: 80 });
        doSwap();
        emit('los:cover', { view: to, dir, hue: P.hue });
        return Promise.all([cap ? cap.shown : null, new Promise((r) => setTimeout(r, 140))]);
      })
      .then(() => new Promise((r) => setTimeout(r, opt.hold || 110)))
      .then(() => {
        const outs = [cap ? cap.out() : null];
        if (seal) outs.push(all([seal.animate([{ opacity: 0.9 }, { opacity: 0, transform: 'translate(-50%,-50%) rotate(-4deg) scale(.9)' }], { duration: 160, easing: E.in, fill: 'both' })]));
        enter(to, dir);
        emit('los:enter', { view: to, dir });
        return Promise.all(outs.concat([new Promise((r) => setTimeout(r, 70)).then(() => shape.uncover())]));
      })
      .catch(() => {})
      .then(() => { doSwap(); layer.hidden = true; layer.innerHTML = ''; busy = false; if (performance.now() - t0 > 4000) lastFamily = null; });
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
