/* Last One Standing — motore delle animazioni.
 * Atmosfere per arena (canvas), effetti legati agli eventi, transizioni di fase,
 * numeri che scorrono, titoli cinetici, inclinazione delle locandine, coriandoli a tema.
 * Rispetta prefers-reduced-motion: in quel caso tutto resta fermo e leggibile. */
(function (G) {
  'use strict';
  const motionQuery = G.matchMedia ? G.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let preference = false, reduced = !!(motionQuery && motionQuery.matches);
  const TAU = Math.PI * 2;
  const R = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* ================= ATMOSFERE PER ARENA ================= */
  // Ogni atmosfera: n (particelle a riposo), spawn(w,h), step(p,dt,w,h), draw(g,p), extra(g,w,h,t,f) per effetti globali.
  const shapes = {
    leaf(g, p) { g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.beginPath(); g.ellipse(0, 0, p.r * 1.6, p.r * 0.7, 0, 0, TAU); g.fill(); g.restore(); },
    glow(g, p) { const a = p.o * (0.55 + 0.45 * Math.sin(p.t * p.f)); g.globalAlpha = Math.max(0, a); const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4); gr.addColorStop(0, p.c); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, p.r * 4, 0, TAU); g.fill(); g.globalAlpha = 1; },
    spark(g, p) { const a = p.o * (0.4 + 0.6 * Math.abs(Math.sin(p.t * p.f))); g.globalAlpha = a; g.strokeStyle = p.c; g.lineWidth = 1.2; g.beginPath(); g.moveTo(p.x - p.r, p.y); g.lineTo(p.x + p.r, p.y); g.moveTo(p.x, p.y - p.r); g.lineTo(p.x, p.y + p.r); g.stroke(); g.globalAlpha = 1; },
    streak(g, p) { g.globalAlpha = p.o; g.strokeStyle = p.c; g.lineWidth = p.r; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(p.x - p.vx * 0.06, p.y - p.vy * 0.06); g.stroke(); g.globalAlpha = 1; },
    dot(g, p) { g.globalAlpha = p.o; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill(); g.globalAlpha = 1; },
    fog(g, p) { const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); gr.addColorStop(0, p.c); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.globalAlpha = p.o; g.fillStyle = gr; g.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); g.globalAlpha = 1; },
    plane(g, p) { g.save(); g.translate(p.x, p.y); g.rotate(Math.atan2(p.vy, p.vx)); g.fillStyle = p.c; g.globalAlpha = p.o; g.beginPath(); g.moveTo(p.r * 2, 0); g.lineTo(-p.r * 1.4, -p.r); g.lineTo(-p.r * 0.6, 0); g.lineTo(-p.r * 1.4, p.r); g.closePath(); g.fill(); g.restore(); },
    sheet(g, p) { g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.scale(Math.cos(p.t * 1.7), 1); g.fillStyle = p.c; g.globalAlpha = p.o; g.fillRect(-p.r, -p.r * 1.3, p.r * 2, p.r * 2.6); g.fillStyle = 'rgba(0,0,0,.15)'; for (let i = -1; i <= 1; i++) g.fillRect(-p.r * 0.7, i * p.r * 0.6, p.r * 1.4, 1); g.restore(); },
    heart(g, p) { g.save(); g.translate(p.x, p.y); g.scale(p.r / 8, p.r / 8); g.fillStyle = p.c; g.globalAlpha = p.o; g.beginPath(); g.moveTo(0, 3); g.bezierCurveTo(-8, -3, -4, -9, 0, -5); g.bezierCurveTo(4, -9, 8, -3, 0, 3); g.fill(); g.restore(); },
    bat(g, p) { const fl = Math.sin(p.t * 18) * 0.6; g.save(); g.translate(p.x, p.y); g.fillStyle = p.c; g.globalAlpha = p.o; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(-p.r, -p.r * (0.6 + fl), -p.r * 2, -p.r * 0.2); g.quadraticCurveTo(-p.r, 0, 0, p.r * 0.4); g.quadraticCurveTo(p.r, 0, p.r * 2, -p.r * 0.2); g.quadraticCurveTo(p.r, -p.r * (0.6 + fl), 0, 0); g.fill(); g.restore(); },
    chute(g, p) { g.save(); g.translate(p.x, p.y); g.globalAlpha = p.o; g.fillStyle = p.c; g.beginPath(); g.arc(0, 0, p.r, Math.PI, 0); g.fill(); g.strokeStyle = p.c; g.lineWidth = 0.8; g.beginPath(); g.moveTo(-p.r, 0); g.lineTo(0, p.r * 1.6); g.lineTo(p.r, 0); g.stroke(); g.fillRect(-1.5, p.r * 1.6, 3, 3); g.restore(); },
  };
  const wrap = (p, w, h, m) => { m = m || 20; if (p.x < -m) p.x = w + m; if (p.x > w + m) p.x = -m; if (p.y < -m) p.y = h + m; if (p.y > h + m) p.y = -m; };
  const AMB = {
    brand: { n: 46, spawn: (w, h) => ({ x: R(0, w), y: R(0, h), vx: R(-6, 6), vy: R(-22, -8), r: R(1, 2.6), c: pick(['#3df2b8', '#7dffd6', '#f6efe0']), o: R(0.35, 0.8), t: R(0, 9), f: R(1, 3), s: 'glow' }), step: (p, dt, w, h) => { p.x += (p.vx + Math.sin(p.t) * 6) * dt; p.y += p.vy * dt; wrap(p, w, h); } },
    classico: { n: 34, spawn: (w, h) => Math.random() < 0.6 ? { s: 'glow', x: R(0, w), y: R(h * 0.3, h), vx: R(-8, 8), vy: R(-8, 8), r: R(1, 2), c: '#ffd36b', o: R(0.5, 1), t: R(0, 9), f: R(1.5, 4) } : { s: 'leaf', x: R(0, w), y: R(-h, 0), vx: R(8, 24), vy: R(14, 30), r: R(2.5, 4.5), c: pick(['#b8651f', '#d98a2b', '#7a3b1a', '#e0a64a']), a: R(0, 6), va: R(-2, 2), o: 1, t: 0 },
      step: (p, dt, w, h) => { if (p.s === 'leaf') { p.x += (p.vx + Math.sin(p.t * 2) * 12) * dt; p.y += p.vy * dt; p.a += p.va * dt; } else { p.x += Math.sin(p.t * 0.8) * 10 * dt + p.vx * dt * 0.3; p.y += Math.cos(p.t * 0.6) * 8 * dt; } wrap(p, w, h); } },
    fantasy: { n: 44, spawn: (w, h) => ({ s: Math.random() < 0.5 ? 'spark' : 'glow', x: R(0, w), y: R(0, h), vx: R(-5, 5), vy: R(-26, -8), r: R(1.5, 3.5), c: pick(['#d8a7ff', '#ffd98a', '#9fd5ff', '#ff9ee8']), o: R(0.4, 0.95), t: R(0, 9), f: R(2, 5) }), step: (p, dt, w, h) => { p.x += (p.vx + Math.sin(p.t * 1.3) * 8) * dt; p.y += p.vy * dt; wrap(p, w, h); },
      extra(g, w, h, t, f) { if (!f.star || f.star.life <= 0) { if (Math.random() < 0.004 * f.k) f.star = { x: R(w * 0.2, w), y: R(0, h * 0.3), life: 1 }; return; } const s = f.star; s.life -= 0.02; s.x -= 9; s.y += 3; g.globalAlpha = s.life; g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.moveTo(s.x, s.y); g.lineTo(s.x + 60, s.y - 20); g.stroke(); g.globalAlpha = 1; } },
    scifi: { n: 70, spawn: (w, h) => { const z = R(0.2, 1); return { s: 'streak', x: R(0, w), y: R(0, h), vx: -60 * z - 20, vy: 0, r: z * 1.6, c: z > 0.8 ? '#bff4ff' : '#5fb7d6', o: z * 0.9, t: 0 }; }, step: (p, dt, w, h) => { p.x += p.vx * dt; wrap(p, w, h, 30); },
      extra(g, w, h, t, f) { const y = ((t * 0.18) % 1.4) * h; if (y < h) { const gr = g.createLinearGradient(0, y - 30, 0, y); gr.addColorStop(0, 'rgba(95,220,255,0)'); gr.addColorStop(1, 'rgba(95,220,255,.22)'); g.fillStyle = gr; g.fillRect(0, y - 30, w, 30); g.fillStyle = 'rgba(160,240,255,.5)'; g.fillRect(0, y, w, 1); } } },
    zombie: { n: 40, spawn: (w, h) => ({ s: Math.random() < 0.75 ? 'glow' : 'fog', x: R(0, w), y: R(0, h), vx: R(-6, 6), vy: R(-14, -3), r: R(1.2, 3), c: pick(['#b7ff3c', '#7dff6b', '#d6f06b']), o: R(0.25, 0.7), t: R(0, 9), f: R(0.5, 2) }), step: (p, dt, w, h) => { if (p.s === 'fog') { p.r = 70; p.o = 0.06; p.c = '#9bd84a'; } p.x += (p.vx + Math.sin(p.t) * 5) * dt; p.y += p.vy * dt; wrap(p, w, h, 80); },
      extra(g, w, h, t, f) { if (Math.random() < 0.006 * f.k) f.flick = 6; if (f.flick > 0) { f.flick--; g.fillStyle = 'rgba(0,0,0,' + (f.flick % 2 ? 0.25 : 0.05) + ')'; g.fillRect(0, 0, w, h); } } },
    royale: { n: 30, spawn: (w, h) => Math.random() < 0.85 ? { s: 'streak', x: R(0, w), y: R(0, h), vx: R(90, 160), vy: R(20, 40), r: 1, c: '#ffffff', o: R(0.15, 0.4), t: 0 } : { s: 'chute', x: R(0, w), y: R(-h, 0), vx: R(4, 12), vy: R(10, 18), r: R(4, 7), c: pick(['#ffffff', '#ffd59a', '#ff8a5c']), o: 0.9, t: 0 },
      step: (p, dt, w, h) => { p.x += (p.vx + (p.s === 'chute' ? Math.sin(p.t * 1.5) * 8 : 0)) * dt; p.y += p.vy * dt; wrap(p, w, h, 40); },
      extra(g, w, h, t) { const r = (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.15 + 0.35; g.strokeStyle = 'rgba(255,255,255,.18)'; g.setLineDash([8, 10]); g.lineWidth = 2; g.beginPath(); g.ellipse(w * 0.62, h * 0.62, w * r, h * r * 0.9, 0, 0, TAU); g.stroke(); g.setLineDash([]); } },
    horror: { n: 18, spawn: (w, h) => Math.random() < 0.7 ? { s: 'fog', x: R(0, w), y: R(h * 0.4, h), vx: R(4, 14), vy: 0, r: R(60, 130), c: '#d9c7d9', o: R(0.05, 0.1), t: 0 } : { s: 'bat', x: R(-w, 0), y: R(0, h * 0.5), vx: R(50, 90), vy: R(-6, 6), r: R(3, 6), c: '#09050a', o: 0.9, t: R(0, 9) },
      step: (p, dt, w, h) => { p.x += p.vx * dt; p.y += (p.vy + (p.s === 'bat' ? Math.sin(p.t * 3) * 10 : 0)) * dt; wrap(p, w, h, 140); },
      extra(g, w, h, t, f) { if (Math.random() < 0.0035 * f.k) f.bolt = 10; if (f.bolt > 0) { f.bolt--; if (f.bolt === 9 || f.bolt === 6) { g.fillStyle = 'rgba(235,225,255,.55)'; g.fillRect(0, 0, w, h); } } } },
    wasteland: { n: 60, spawn: (w, h) => Math.random() < 0.8 ? { s: 'streak', x: R(0, w), y: R(0, h), vx: R(120, 220), vy: R(-6, 10), r: R(0.8, 1.6), c: pick(['#f4c27a', '#e08a3c', '#ffe1a8']), o: R(0.2, 0.55), t: 0 } : { s: 'glow', x: R(0, w), y: R(h * 0.5, h), vx: R(10, 30), vy: R(-30, -12), r: R(1, 2), c: '#ff7a2a', o: R(0.5, 1), t: R(0, 9), f: 6 },
      step: (p, dt, w, h) => { p.x += p.vx * dt; p.y += p.vy * dt; wrap(p, w, h, 30); },
      extra(g, w, h, t) { g.fillStyle = 'rgba(240,138,36,' + (0.05 + Math.sin(t * 0.9) * 0.03) + ')'; g.fillRect(0, h * 0.65, w, h * 0.35); } },
    liceo: { n: 22, spawn: (w, h) => Math.random() < 0.45 ? { s: 'plane', x: R(-w, 0), y: R(0, h * 0.7), vx: R(40, 80), vy: R(-10, 6), r: R(3, 5), c: '#ffffff', o: 0.9, t: 0 } : { s: Math.random() < 0.5 ? 'heart' : 'spark', x: R(0, w), y: R(0, h), vx: R(-4, 4), vy: R(-16, -6), r: R(3, 6), c: pick(['#ff7aa8', '#fff3c4', '#ffb3c7']), o: R(0.4, 0.8), t: R(0, 9), f: 3 },
      step: (p, dt, w, h) => { p.x += p.vx * dt; p.y += (p.vy + (p.s === 'plane' ? Math.sin(p.t * 2) * 14 : 0)) * dt; wrap(p, w, h, 40); } },
    ufficio: { n: 20, spawn: (w, h) => ({ s: Math.random() < 0.7 ? 'sheet' : 'dot', x: R(0, w), y: R(-h, h), vx: R(6, 22), vy: R(10, 26), r: R(3, 6), c: pick(['#ffffff', '#fff6a8', '#c9fff1']), a: R(-0.6, 0.6), o: R(0.5, 0.9), t: R(0, 9) }),
      step: (p, dt, w, h) => { if (p.s === 'dot') { p.vy = -6; p.o = 0.4 + 0.4 * Math.sin(p.t * 3); p.c = '#7ff5d8'; p.r = 1.6; } p.x += (p.vx + Math.sin(p.t * 1.2) * 14) * dt; p.y += p.vy * dt; p.a += Math.sin(p.t) * 0.01; wrap(p, w, h, 30); } },
    // Night City: pioggia leggera (strisce ciano), scintille gialle e magenta dalle insegne, e ogni tanto un glitch orizzontale
    cyberpunk: { n: 64, spawn: (w, h) => Math.random() < 0.78 ? { s: 'streak', x: R(0, w), y: R(-h, h), vx: R(-30, -14), vy: R(260, 380), r: R(0.6, 1.2), c: pick(['#9ff6ff', '#3ff0ff', '#cfefff']), o: R(0.12, 0.35), t: 0 } : { s: 'spark', x: R(0, w), y: R(0, h * 0.6), vx: R(-6, 6), vy: R(10, 40), r: R(1.5, 3), c: pick(['#e8ff3a', '#ff4fd8', '#3ff0ff']), o: R(0.4, 0.9), t: R(0, 9), f: R(4, 9) },
      step: (p, dt, w, h) => { p.x += p.vx * dt; p.y += p.vy * dt; wrap(p, w, h, 40); },
      extra(g, w, h, t, f) { if (!f.glitch && Math.random() < 0.004 * f.k) f.glitch = 8; if (f.glitch > 0) { f.glitch--; const y = (f.glitch * 37 % 10) / 10 * h; g.fillStyle = f.glitch % 2 ? 'rgba(255,79,216,.18)' : 'rgba(63,240,255,.16)'; g.fillRect(0, y, w, 3 + (f.glitch % 3) * 4); g.fillStyle = 'rgba(232,255,58,.08)'; g.fillRect(w * 0.1, y + 8, w * 0.5, 2); } } },
    celebrate: { n: 0, spawn: () => ({}), step: () => {} },
  };

  /* Un campo animato su un canvas sopra (o sotto) un contenitore */
  const fields = new Set();
  class Field {
    constructor(host, theme, opts) {
      opts = opts || {};
      this.host = host; this.theme = AMB[theme] ? theme : 'brand'; this.k = opts.intensity || 1; this.extraP = [];
      this.cv = document.createElement('canvas'); this.cv.className = 'fx-field' + (opts.cls ? ' ' + opts.cls : ''); this.cv.setAttribute('aria-hidden', 'true');
      host.appendChild(this.cv); this.g = this.cv.getContext('2d'); this.t = 0; this.visible = true;
      this.resize(); this.seed();
      if ('IntersectionObserver' in G) { this.io = new IntersectionObserver((es) => es.forEach((e) => (this.visible = e.isIntersecting))); this.io.observe(this.cv); }
      fields.add(this); loop();
    }
    resize() { const r = this.host.getBoundingClientRect(), d = Math.min(1.5, G.devicePixelRatio || 1); this.w = Math.max(10, r.width); this.h = Math.max(10, r.height); this.cv.width = this.w * d; this.cv.height = this.h * d; this.g.setTransform(d, 0, 0, d, 0, 0); }
    seed() { const A = AMB[this.theme]; this.ps = []; const n = Math.round(A.n * Math.min(2.5, this.k) * Math.min(1.4, Math.max(0.5, this.w / 900))); for (let i = 0; i < n; i++) { const p = A.spawn(this.w, this.h); p.t = p.t || R(0, 9); this.ps.push(p); } }
    setTheme(theme, intensity) { theme = AMB[theme] ? theme : 'brand'; const ch = theme !== this.theme || (intensity && Math.abs(intensity - this.k) > 0.3); this.theme = theme; if (intensity) this.k = intensity; if (ch) this.seed(); }
    burst(kind, x, y, n) { for (let i = 0; i < (n || 16); i++) this.extraP.push(burstParticle(kind, x != null ? x : this.w / 2, y != null ? y : this.h / 2)); }
    frame(dt) {
      if (!this.host.isConnected) { this.destroy(); return; }
      if (!this.visible || this.host.offsetParent === null) return;
      const r = this.host.getBoundingClientRect(); if (Math.abs(r.width - this.w) > 2 || Math.abs(r.height - this.h) > 2) { this.resize(); this.seed(); }
      const A = AMB[this.theme], g = this.g; this.t += dt; g.clearRect(0, 0, this.w, this.h);
      const sp = 0.6 + this.k * 0.4;
      for (const p of this.ps) { p.t += dt; A.step(p, dt * sp, this.w, this.h); shapes[p.s] && shapes[p.s](g, p); }
      if (A.extra) A.extra(g, this.w, this.h, this.t, this);
      this.extraP = this.extraP.filter((p) => { p.life -= dt; p.t += dt; p.vy += (p.grav || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a = (p.a || 0) + (p.va || 0) * dt; p.o = Math.max(0, Math.min(1, p.life / p.life0)); shapes[p.s](g, p); return p.life > 0; });
    }
    destroy() { fields.delete(this); if (this.io) this.io.disconnect(); this.cv.remove(); }
  }
  function burstParticle(kind, x, y) {
    const base = { x, y, t: 0, life: R(0.9, 1.6), a: R(0, 6), va: R(-4, 4) };
    const k = { hearts: { s: 'heart', c: pick(['#ff6fa6', '#ff9ec4', '#ffd1e3']), vx: R(-60, 60), vy: R(-120, -40), r: R(4, 8), grav: 40 },
      sparks: { s: 'spark', c: pick(['#fff3b0', '#ffd36b', '#ffffff']), vx: R(-160, 160), vy: R(-160, 60), r: R(2, 5), grav: 120, f: 9 },
      blood: { s: 'dot', c: pick(['#ff3b30', '#c0392b', '#8e1b12']), vx: R(-180, 180), vy: R(-180, 20), r: R(1.5, 4), grav: 420 },
      heal: { s: 'glow', c: '#59c98b', vx: R(-40, 40), vy: R(-90, -30), r: R(1.5, 3), grav: 0, f: 4 },
      embers: { s: 'glow', c: pick(['#ff7a2a', '#ffd36b']), vx: R(-30, 30), vy: R(-120, -40), r: R(1.2, 2.6), grav: -10, f: 6 },
      leaves: { s: 'leaf', c: pick(['#b8651f', '#d98a2b', '#e0a64a']), vx: R(-120, 120), vy: R(-140, -20), r: R(3, 5), grav: 140 } }[kind] || {};
    const p = Object.assign(base, k); p.life0 = p.life; p.o = 1; return p;
  }
  let raf = 0, last = 0;
  function setReduced(value) {
    preference = !!value; reduced = preference || !!(motionQuery && motionQuery.matches);
    document.documentElement.toggleAttribute('data-reduced-motion', reduced);
    if (reduced) { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
    else loop();
  }
  if (motionQuery && motionQuery.addEventListener) motionQuery.addEventListener('change', () => setReduced(preference));
  function loop() {
    if (reduced || raf) return;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      if (!document.hidden) fields.forEach((f) => f.frame(dt));
      raf = fields.size ? requestAnimationFrame(tick) : 0; if (!raf) last = 0;
    };
    raf = requestAnimationFrame(tick);
  }
  function field(host, theme, opts) {
    if (reduced || !host) return null;
    let f = host.__field; if (f && f.host.isConnected) { f.setTheme(theme, opts && opts.intensity); return f; }
    f = new Field(host, theme, opts); host.__field = f; return f;
  }

  /* ================= TESTI E NUMERI ================= */
  function countTo(el, to, opts) {
    if (!el) return; opts = opts || {};
    const from = opts.from != null ? opts.from : parseFloat(el.textContent) || 0;
    if (reduced || from === to) { el.textContent = to; return; }
    const dur = opts.dur || 900, t0 = performance.now();
    const step = (now) => { if (reduced) { el.textContent = to; return; } const k = Math.max(0, Math.min(1, (now - t0) / dur)), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function kinetic(el, style) {
    if (!el || reduced) return;
    const text = el.textContent; el.setAttribute('aria-label', text); el.innerHTML = '';
    [...text].forEach((ch, i) => { const s = document.createElement('span'); s.className = 'kc kc-' + (style || 'drop'); s.style.setProperty('--i', i); s.setAttribute('aria-hidden', 'true'); s.textContent = ch === ' ' ? ' ' : ch; el.appendChild(s); });
  }
  function dice(el, roll, dc, pass) {
    if (!el || reduced) return;
    const n = el.querySelector('.roll'); if (!n) return;
    let k = 0; el.classList.add('rolling');
    const id = setInterval(() => { n.textContent = 2 + Math.floor(Math.random() * 18); if (++k > 9) { clearInterval(id); n.textContent = roll; el.classList.remove('rolling'); el.classList.add(pass ? 'won' : 'lost'); } }, 55);
  }

  /* ================= EFFETTI SUGLI ELEMENTI ================= */
  function domBurst(el, kind, n) {
    if (reduced || !el) return;
    const r = el.getBoundingClientRect(); const host = document.body;
    const glyph = { hearts: '♥', sparks: '✦', skulls: '✖', heal: '+', stars: '★', coins: '●' }[kind] || '✦';
    for (let i = 0; i < (n || 8); i++) {
      const s = document.createElement('span'); s.className = 'dom-burst db-' + kind; s.textContent = glyph;
      s.style.left = r.left + R(r.width * 0.05, r.width * 0.35) + 'px'; s.style.top = r.top + r.height / 2 + 'px';
      s.style.setProperty('--dx', R(-50, 50) + 'px'); s.style.setProperty('--dy', R(-90, -30) + 'px'); s.style.setProperty('--rot', R(-40, 40) + 'deg'); s.style.animationDelay = R(0, 0.25) + 's';
      host.appendChild(s); setTimeout(() => s.remove(), 1600);
    }
  }
  function tilt(root, sel) {
    if (reduced || !root || root.__tilt || matchMedia('(hover: none)').matches) return; root.__tilt = true;
    root.addEventListener('pointermove', (e) => { if (reduced) return; const c = e.target.closest(sel); if (!c) return; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg'); c.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg'); c.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%'); c.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%'); c.classList.add('tilting'); });
    root.addEventListener('pointerleave', () => root.querySelectorAll('.tilting').forEach((c) => { c.classList.remove('tilting'); c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); }), true);
    root.addEventListener('pointerout', (e) => { const c = e.target.closest(sel); if (c && !c.contains(e.relatedTarget)) { c.classList.remove('tilting'); c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });
  }
  function parallax(host, layer) {
    if (reduced || !host || host.__par || matchMedia('(hover: none)').matches) return; host.__par = true;
    host.addEventListener('pointermove', (e) => { if (reduced) return; const r = host.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; layer.style.setProperty('--px', (x * -18).toFixed(1) + 'px'); layer.style.setProperty('--py', (y * -10).toFixed(1) + 'px'); });
  }
  function ripple(root) {
    if (reduced || root.__ripple) return; root.__ripple = true;
    root.addEventListener('pointerdown', (e) => { if (reduced) return; const b = e.target.closest('.btn, .pbtn, .poster-card'); if (!b) return; const r = b.getBoundingClientRect(); const s = document.createElement('span'); s.className = 'ripple'; const d = Math.max(r.width, r.height) * 2; s.style.width = s.style.height = d + 'px'; s.style.left = e.clientX - r.left - d / 2 + 'px'; s.style.top = e.clientY - r.top - d / 2 + 'px'; b.appendChild(s); setTimeout(() => s.remove(), 650); });
  }
  let revealIO = null;
  function reveal(els) {
    if (reduced || !('IntersectionObserver' in G)) return;
    revealIO = revealIO || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealIO.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el, i) => { if (el.__rev) return; el.__rev = true; el.classList.add('reveal'); el.style.setProperty('--ri', i % 6); revealIO.observe(el); });
  }

  /* ================= TRANSIZIONI DI FASE ================= */
  // colore e stile del disastro per arena
  const DIS = { classico: 'fire', fantasy: 'shock', scifi: 'alarm', zombie: 'toxic', royale: 'bomb', horror: 'lightning', wasteland: 'sand', liceo: 'bell', ufficio: 'glitch', cyberpunk: 'glitch' };
  function phaseFx(bc, kind, theme, forward, opt) {
    if (!bc) return;
    bc.dataset.kind = kind; bc.dataset.dis = DIS[theme] || 'fire';
    if (reduced || !forward) return;
    bc.classList.remove('fx-phase'); void bc.offsetWidth; bc.classList.add('fx-phase');
    const f = bc.querySelector('.bc-scene') && bc.querySelector('.bc-scene').__field;
    if (f) {
      if (kind === 'dis') f.burst(theme === 'classico' || theme === 'wasteland' ? 'embers' : 'sparks', null, null, theme === 'cyberpunk' ? 56 : 40);
      if (kind === 'f') f.burst('sparks', null, null, 30);
      if (kind === 'fallen' && opt && opt.deaths) f.burst('embers', null, null, 12 + opt.deaths * 4);
    }
  }
  function intensityFor(kind, aliveRatio) {
    const base = { b: 1.6, d: 1, n: 0.8, f: 1.5, dis: 2.4, fallen: 0.7, finale: 2 }[kind] || 1;
    return base * (1 + (1 - aliveRatio) * 0.6);
  }

  /* ================= CORIANDOLI A TEMA ================= */
  const CONF = {
    classico: { colors: ['#e0a64a', '#b8651f', '#ffd36b', '#7a3b1a'], shape: 'leaf' }, fantasy: { colors: ['#d8a7ff', '#ffd98a', '#9fd5ff', '#ff9ee8'], shape: 'star' },
    scifi: { colors: ['#5fdcff', '#bff4ff', '#ffffff', '#ff6b6b'], shape: 'rect' }, zombie: { colors: ['#b7ff3c', '#7dff6b', '#2b3a1f', '#ffffff'], shape: 'drop' },
    royale: { colors: ['#ffd36b', '#ffffff', '#ff8a5c', '#5fb7ff'], shape: 'coin' }, horror: { colors: ['#c0392b', '#f6e7d0', '#1a0710', '#8e1b12'], shape: 'bat' },
    wasteland: { colors: ['#f08a24', '#ffd36b', '#9c3d14', '#f4c27a'], shape: 'rect' }, liceo: { colors: ['#ff7aa8', '#fff3c4', '#ffb3c7', '#ffffff'], shape: 'heart' },
    ufficio: { colors: ['#ffffff', '#fff6a8', '#c9fff1', '#7ff5d8'], shape: 'paper' },
    cyberpunk: { colors: ['#e8ff3a', '#3ff0ff', '#ff4fd8', '#ffffff'], shape: 'rect' },
  };
  function confetti(theme, hue) {
    if (reduced) return;
    const C = CONF[theme] || { colors: ['hsl(' + hue + ' 90% 60%)', '#fff', '#ffd36b'], shape: 'rect' };
    const cv = document.createElement('canvas'); cv.className = 'confetti'; const d = Math.min(1.5, devicePixelRatio || 1);
    cv.width = innerWidth * d; cv.height = innerHeight * d; document.body.appendChild(cv);
    const g = cv.getContext('2d'); g.scale(d, d); const P = [];
    const burst = (x) => { for (let i = 0; i < 90; i++) P.push({ x, y: innerHeight * 0.32, vx: R(-9, 9), vy: R(-15, -5), r: R(5, 10), a: R(0, 6), va: R(-0.25, 0.25), c: pick(C.colors), t: 0, w: R(0, 9) }); };
    burst(innerWidth * 0.3); setTimeout(() => burst(innerWidth * 0.7), 260); setTimeout(() => burst(innerWidth * 0.5), 560);
    let t = 0;
    (function frame() {
      if (reduced) { cv.remove(); return; }
      t++; g.clearRect(0, 0, innerWidth, innerHeight);
      P.forEach((p) => {
        p.vy += 0.32; p.vx *= 0.985; p.x += p.vx + Math.sin((t + p.w * 20) / 12) * 0.8; p.y += p.vy; p.a += p.va;
        g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.globalAlpha = Math.max(0, 1 - t / 220); g.fillStyle = p.c;
        const s = C.shape, r = p.r;
        if (s === 'leaf') { g.beginPath(); g.ellipse(0, 0, r, r * 0.45, 0, 0, TAU); g.fill(); }
        else if (s === 'star') { g.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r; g.lineTo(Math.cos(i * Math.PI / 5) * rr, Math.sin(i * Math.PI / 5) * rr); } g.fill(); }
        else if (s === 'drop') { g.beginPath(); g.moveTo(0, -r); g.quadraticCurveTo(r * 0.8, 0, 0, r * 0.7); g.quadraticCurveTo(-r * 0.8, 0, 0, -r); g.fill(); }
        else if (s === 'coin') { g.scale(Math.cos(t / 6 + p.w), 1); g.beginPath(); g.arc(0, 0, r * 0.6, 0, TAU); g.fill(); }
        else if (s === 'bat') { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(-r, -r * 0.8, -r * 1.6, -r * 0.1); g.quadraticCurveTo(-r * 0.6, 0, 0, r * 0.3); g.quadraticCurveTo(r * 0.6, 0, r * 1.6, -r * 0.1); g.quadraticCurveTo(r, -r * 0.8, 0, 0); g.fill(); }
        else if (s === 'heart') { g.scale(r / 9, r / 9); g.beginPath(); g.moveTo(0, 3); g.bezierCurveTo(-8, -3, -4, -9, 0, -5); g.bezierCurveTo(4, -9, 8, -3, 0, 3); g.fill(); }
        else if (s === 'paper') { g.scale(Math.cos(t / 9 + p.w), 1); g.fillRect(-r * 0.6, -r * 0.8, r * 1.2, r * 1.6); }
        else g.fillRect(-r / 2, -r / 4, r, r / 2);
        g.restore();
      });
      if (t < 220) requestAnimationFrame(frame); else cv.remove();
    })();
  }

  G.LOS_ANIM = { get reduced() { return reduced; }, setReduced, field, countTo, kinetic, dice, domBurst, tilt, parallax, ripple, reveal, phaseFx, intensityFor, confetti };
})(typeof window !== 'undefined' ? window : globalThis);
