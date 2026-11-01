/* Last One Standing — grafica vettoriale: logo, icone delle arene, illustrazioni.
 * Tutto è SVG generato in codice: nessuna immagine esterna. */
(function (G) {
  'use strict';
  let uid = 0;
  const id = (p) => p + (++uid);
  // generatore pseudo-casuale deterministico per stelle e finestre
  const rnd = (seed) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

  /* ---------- logo: cinque tacche, quattro cadute, una in piedi e incoronata ---------- */
  function logo(size, opt) {
    opt = opt || {};
    const s = size || 32;
    const bg = opt.bg || 'currentColor', acc = opt.accent || 'var(--accent)', ink = opt.ink || 'var(--panel)';
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 64 64" aria-hidden="true">' +
      '<rect x="2" y="2" width="60" height="60" rx="16" fill="' + bg + '"/>' +
      '<g stroke="' + ink + '" stroke-width="5" stroke-linecap="round" opacity=".55">' +
      '<path d="M13 50 L19 44"/><path d="M20 51 L28 47"/><path d="M29 52 L37 50"/><path d="M50 51 L43 45"/></g>' +
      '<path d="M32 46 V22" stroke="' + acc + '" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M24 19 L26.5 11 L30 15.5 L32 9 L34 15.5 L37.5 11 L40 19 Z" fill="' + acc + '" stroke="' + acc + '" stroke-width="1.5" stroke-linejoin="round"/>' +
      '</svg>';
  }
  // logo ufficiale (scritta) ed emblema, se presenti negli asset
  function wordmark(cls) { return ASSETS.logo ? '<img class="' + (cls || 'wordmark') + '" src="' + ASSETS.logo + '" alt="Last One Standing" draggable="false">' : ''; }
  function emblem(size) { return ASSETS.emblema ? '<img class="emblem" src="' + ASSETS.emblema + '" width="' + size + '" height="' + size + '" alt="" draggable="false">' : logo(size); }
  function logoDataUri(acc) {
    if (ASSETS.favicon) return ASSETS.favicon;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="2" y="2" width="60" height="60" rx="16" fill="#14100c"/><g stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"><path d="M13 50 L19 44"/><path d="M20 51 L28 47"/><path d="M29 52 L37 50"/><path d="M50 51 L43 45"/></g><path d="M32 46 V22" stroke="' + acc + '" stroke-width="6" stroke-linecap="round"/><path d="M24 19 L26.5 11 L30 15.5 L32 9 L34 15.5 L37.5 11 L40 19 Z" fill="' + acc + '" stroke="' + acc + '" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* ---------- icone delle arene (tratto 2px, 24×24) ---------- */
  const ICONS = {
    classico: '<path d="M4 20 20 4"/><path d="M15 4h5v5"/><path d="M4 15v5h5"/><path d="M8 8l-3-3M5 8h3V5"/>',
    fantasy: '<path d="M6 21V9l2-2 2 2v3h4V9l2-2 2 2v12"/><path d="M6 9V5M18 9V5M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M4 21h16"/>',
    scifi: '<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)"/>',
    zombie: '<path d="M9 21v-4l-2-1 1-5 4-2 4 2 1 5-2 1v4"/><path d="M10 13h.01M14 13h.01"/><path d="M7 11 4 8M17 11l3-3M4 8l-1-2M20 8l1-2"/>',
    royale: '<path d="M4 10a8 8 0 0 1 16 0"/><path d="M4 10l8 7 8-7M8 10l4 7 4-7"/><rect x="10" y="17" width="4" height="4" rx="1"/>',
    horror: '<path d="M6 21V10a6 6 0 0 1 12 0v11l-2-2-2 2-2-2-2 2-2-2z"/><path d="M10 11h.01M14 11h.01"/>',
    wasteland: '<path d="M3 18c3-2 6-2 9 0s6 2 9 0"/><path d="M3 21h18"/><circle cx="12" cy="10" r="4"/><path d="M12 3v1.5M5.5 6 6.6 7.1M18.5 6l-1.1 1.1"/>',
    liceo: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5"/><path d="M21 9v6"/>',
    ufficio: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18M11 13v2h2v-2"/>',
  };
  function icon(themeId, size) {
    const s = size || 20;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[themeId] || ICONS.classico) + '</svg>';
  }

  /* ---------- illustrazioni (viewBox 400×200) ---------- */
  function sky(gid, top, bottom) {
    return '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/></linearGradient></defs><rect width="400" height="200" fill="url(#' + gid + ')"/>';
  }
  function stars(n, seed, color, maxY) {
    const r = rnd(seed); let o = '';
    for (let i = 0; i < n; i++) o += '<circle cx="' + (r() * 400).toFixed(1) + '" cy="' + (r() * (maxY || 110)).toFixed(1) + '" r="' + (r() * 1.1 + 0.3).toFixed(2) + '" fill="' + color + '" opacity="' + (r() * 0.6 + 0.3).toFixed(2) + '"/>';
    return o;
  }
  function pines(y0, n, seed, color, hMin, hMax) {
    const r = rnd(seed); let o = '';
    for (let i = 0; i < n; i++) {
      const x = (i / n) * 420 - 10 + r() * 10, h = hMin + r() * (hMax - hMin), w = h * 0.42;
      o += '<path d="M' + x.toFixed(1) + ' ' + (y0 - h).toFixed(1) + 'L' + (x - w).toFixed(1) + ' ' + y0 + 'H' + (x + w).toFixed(1) + 'Z" fill="' + color + '"/>';
    }
    return o + '<rect y="' + y0 + '" width="400" height="' + (200 - y0) + '" fill="' + color + '"/>';
  }
  function skyline(y0, n, seed, color, win, hMin, hMax) {
    const r = rnd(seed); let o = '', x = -5;
    for (let i = 0; i < n && x < 405; i++) {
      const w = 18 + r() * 26, h = hMin + r() * (hMax - hMin);
      o += '<rect x="' + x.toFixed(1) + '" y="' + (y0 - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (h + 200).toFixed(1) + '" fill="' + color + '"/>';
      if (win) for (let wy = y0 - h + 6; wy < y0 - 6; wy += 9) for (let wx = x + 4; wx < x + w - 5; wx += 7) if (r() < 0.28) o += '<rect x="' + wx.toFixed(1) + '" y="' + wy.toFixed(1) + '" width="3" height="4" fill="' + win + '" opacity="' + (0.5 + r() * 0.5).toFixed(2) + '"/>';
      x += w + 2 + r() * 4;
    }
    return o;
  }
  const hills = (pts, color, op) => '<path d="M0 200 ' + pts + ' L400 200Z" fill="' + color + '"' + (op ? ' opacity="' + op + '"' : '') + '/>';

  const SCENES = {
    classico: () => { const g = id('s'); return sky(g, '#1b1430', '#c96b2c') + stars(40, 3, '#fff', 70) +
      '<circle cx="300" cy="62" r="26" fill="#ffd9a0" opacity=".9"/>' +
      hills('L0 120 Q60 80 120 115 T240 100 T400 110', '#4a2f3c', '.8') +
      pines(150, 28, 7, '#24182a', 30, 70) +
      '<path d="M170 150 q30 -40 70 -30 q-10 5 -14 12 q-28 -4 -46 18z" fill="#f0b443"/><path d="M230 121 l10 -3 -4 9z" fill="#ffe2a0"/>' +
      '<path d="M178 150 l-6 -8 M200 150 l4 -9" stroke="#ffe2a0" stroke-width="2"/>'; },
    fantasy: () => { const g = id('s'); return sky(g, '#120a2e', '#7b3fa8') + stars(60, 11, '#fff', 120) +
      '<circle cx="80" cy="45" r="20" fill="#f5e9ff" opacity=".9"/><circle cx="118" cy="62" r="9" fill="#d9b8ff" opacity=".85"/>' +
      hills('L0 130 Q80 90 160 128 T320 110 T400 125', '#3a1d5c', '.9') +
      '<g fill="#1a0d2e"><rect x="230" y="80" width="18" height="90"/><path d="M226 80l13-22 13 22z"/><rect x="250" y="105" width="60" height="70"/><rect x="306" y="70" width="20" height="100"/><path d="M302 70l14-26 14 26z"/>' +
      '<path d="M250 105v-8h6v8h6v-8h6v8h6v-8h6v8h6v-8h6v8h6v-8h6v8z"/></g><rect x="275" y="135" width="10" height="16" rx="5" fill="#ffc86b"/><rect x="236" y="98" width="5" height="8" fill="#ffc86b"/><rect x="313" y="92" width="5" height="8" fill="#ffc86b"/>' +
      '<path d="M120 105 q20 -18 40 -6 q10 -14 26 -10 q-12 4 -14 14 q14 2 22 12 q-18 -6 -30 0 q-10 8 -26 4 q10 -6 4 -10z" fill="#1a0d2e"/>' +
      hills('L0 170 Q100 150 200 168 T400 160', '#12081f'); },
    scifi: () => { const g = id('s'); return sky(g, '#020611', '#0b2a44') + stars(110, 23, '#bfe8ff', 200) +
      '<circle cx="90" cy="150" r="80" fill="#0f4f6e"/><circle cx="90" cy="150" r="80" fill="url(#' + g + ')" opacity=".35"/><path d="M20 120 q70 30 150 0" stroke="#6fd3ff" stroke-width="1.5" fill="none" opacity=".4"/>' +
      '<g transform="translate(285 75)"><ellipse rx="70" ry="18" fill="none" stroke="#9fe7ff" stroke-width="6" opacity=".9"/><ellipse rx="70" ry="18" fill="none" stroke="#0b2a44" stroke-width="2" opacity=".6"/>' +
      '<rect x="-8" y="-40" width="16" height="80" rx="6" fill="#d9f4ff"/><rect x="-30" y="-6" width="60" height="12" rx="4" fill="#9fe7ff"/><circle r="10" fill="#fff"/><circle r="4" fill="#ff6b6b"/></g>' +
      '<path d="M180 40 l22 -6 -6 10z" fill="#d9f4ff"/><path d="M178 40 h-30" stroke="#6fd3ff" stroke-width="1.5" opacity=".6"/>'; },
    zombie: () => { const g = id('s'); return sky(g, '#0d1a0e', '#6f8a2a') + stars(20, 5, '#e9ffb0', 60) +
      '<circle cx="320" cy="55" r="24" fill="#e7f5a6" opacity=".85"/><circle cx="320" cy="55" r="40" fill="#e7f5a6" opacity=".12"/>' +
      skyline(150, 14, 9, '#203018', '#d6f06b', 30, 80) + skyline(175, 16, 19, '#0f1a0c', '#b7ff3c', 15, 45) +
      '<g fill="#08100a"><path d="M60 200v-28l4-10 6 3-2 10 6 25z"/><path d="M66 165l-14 -10 3 -3 14 8z"/><circle cx="66" cy="158" r="5"/>' +
      '<path d="M120 200v-24l5-12 5 2-1 12 4 22z"/><path d="M126 168l12 -12 3 3 -12 12z"/><circle cx="125" cy="160" r="5"/>' +
      '<path d="M300 200v-26l4-10 6 2-1 12 5 22z"/><path d="M306 168l-13 -8 2 -4 13 7z"/><path d="M308 166l12 -9 2 3 -12 9z"/><circle cx="305" cy="158" r="5"/></g>'; },
    royale: () => { const g = id('s'); return sky(g, '#0d3b66', '#f4a259') +
      '<circle cx="80" cy="150" r="34" fill="#ffe0a3" opacity=".9"/><rect y="150" width="400" height="50" fill="#0f5c7a"/><path d="M0 158 h400" stroke="#ffd59a" stroke-width="2" opacity=".5" stroke-dasharray="6 8"/>' +
      '<path d="M150 155 q60 -40 150 -12 q40 6 70 14z" fill="#1f3d2b"/>' +
      '<g stroke="#12261a" stroke-width="3" fill="none"><path d="M220 140 q4 -26 -2 -44"/><path d="M290 145 q2 -22 6 -36"/></g>' +
      '<g fill="#12261a"><path d="M218 96 q-20 -2 -28 10 q14 -6 28 -6z"/><path d="M218 96 q18 -8 30 4 q-14 -4 -30 -2z"/><path d="M218 96 q-4 -14 6 -22 q-2 12 -4 22z"/><path d="M296 109 q-18 -4 -26 6 q12 -4 26 -4z"/><path d="M296 109 q16 -8 28 2 q-14 -2 -28 0z"/></g>' +
      '<ellipse cx="255" cy="140" rx="130" ry="52" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="7 7" opacity=".55"/>' +
      '<g transform="translate(110 40) rotate(-8)"><path d="M0 0 h60 l10 -4 v8 l-10 -2 h-60z" fill="#eef4f7"/><path d="M26 0 l-12 -14 h8 l18 14z M26 2 l-12 12 h8 l18 -12z" fill="#cfdce3"/></g>' +
      '<g fill="#fff"><path d="M190 62 a10 10 0 0 1 20 0z"/><path d="M190 62 l10 14 10 -14" stroke="#fff" fill="none"/><path d="M240 50 a8 8 0 0 1 16 0z"/><path d="M240 50 l8 11 8 -11" stroke="#fff" fill="none"/></g>'; },
    horror: () => { const g = id('s'); return sky(g, '#07040a', '#5a0f1c') + stars(30, 31, '#ffd6d6', 80) +
      '<circle cx="290" cy="58" r="34" fill="#f6e7d0"/><circle cx="302" cy="52" r="34" fill="#5a0f1c" opacity=".18"/>' +
      hills('L0 160 Q100 140 200 158 T400 150', '#1a0710') +
      '<g fill="#0a0307"><rect x="120" y="90" width="140" height="80"/><path d="M110 92 l40 -34 40 34z"/><path d="M190 92 l35 -28 35 28z"/><rect x="150" y="48" width="12" height="20"/><rect x="236" y="60" width="10" height="20"/></g>' +
      '<g fill="#ffb347"><rect x="138" y="110" width="12" height="16"/><rect x="230" y="110" width="12" height="16" opacity=".5"/><rect x="183" y="140" width="14" height="30"/><rect x="168" y="80" width="10" height="12" opacity=".7"/></g>' +
      '<path d="M40 170 q4 -40 -6 -70 M34 120 q-16 -10 -24 -26 M36 110 q14 -12 30 -14 M30 140 q-10 -4 -18 0" stroke="#0a0307" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<g fill="#0a0307"><path d="M330 100 q6 -6 12 0 q4 -6 10 -2 q-6 0 -8 6 q-4 -4 -8 0 q-2 -6 -6 -4z"/><path d="M90 60 q5 -5 10 0 q3 -5 8 -2 q-5 0 -6 5 q-3 -3 -6 0 q-2 -5 -6 -3z"/></g>'; },
    wasteland: () => { const g = id('s'); return sky(g, '#3a1408', '#f08a24') +
      '<circle cx="200" cy="120" r="70" fill="#ffd36b"/>' +
      [0, 1, 2, 3, 4].map((i) => '<rect x="120" y="' + (128 + i * 11) + '" width="160" height="' + (3 + i) + '" fill="#f08a24"/>').join('') +
      hills('L0 150 Q60 128 140 148 T290 140 T400 146', '#9c3d14') + hills('L0 172 Q90 156 180 172 T400 165', '#5b1f0b') +
      '<g fill="#2a0e05"><path d="M290 172 l6 -14 h30 l8 8 h14 l4 6z"/><circle cx="300" cy="174" r="6"/><circle cx="335" cy="174" r="6"/>' +
      '<path d="M60 172 l14 -60 h4 l14 60z M64 150 h24 M68 130 h16" stroke="#2a0e05" stroke-width="3"/><path d="M76 112 l-22 10 4 4z"/></g>'; },
    liceo: () => { const g = id('s'); return sky(g, '#ffb3c7', '#ffe8b0') +
      '<circle cx="80" cy="50" r="22" fill="#fff6d6"/>' +
      '<g fill="#5b2a4a"><rect x="110" y="95" width="200" height="90"/><rect x="185" y="55" width="50" height="50"/><path d="M180 57 l30 -22 30 22z"/><rect x="208" y="20" width="3" height="18"/></g>' +
      '<path d="M211 20 h18 l-4 5 4 5 h-18z" fill="#ff5c8a"/><circle cx="210" cy="78" r="13" fill="#fff6d6"/><path d="M210 70 v8 h6" stroke="#5b2a4a" stroke-width="2"/>' +
      [0, 1, 2, 3, 4, 5].map((i) => '<rect x="' + (122 + i * 31) + '" y="112" width="16" height="20" rx="2" fill="#ffe8b0" opacity=".85"/><rect x="' + (122 + i * 31) + '" y="145" width="16" height="20" rx="2" fill="#ffe8b0" opacity=".6"/>').join('') +
      '<path d="M320 60 l30 8 -30 8 6 -8z" fill="#fff"/><path d="M60 110 l24 6 -24 6 5 -6z" fill="#fff" opacity=".9"/>' +
      '<rect y="185" width="400" height="15" fill="#3c1a31"/>'; },
    ufficio: () => { const g = id('s'); return sky(g, '#0b2b2a', '#2fb39a') +
      skyline(200, 10, 41, '#0f3f3a', '#c9fff1', 60, 140) + skyline(200, 12, 47, '#082624', '#7ff5d8', 30, 80) +
      '<g transform="translate(300 60)"><circle r="22" fill="#e8fff8"/><path d="M0 -14 v14 h10" stroke="#0b2b2a" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
      '<g fill="#fff" opacity=".85"><rect x="70" y="40" width="16" height="20" transform="rotate(-15 78 50)"/><rect x="200" y="28" width="14" height="18" transform="rotate(12 207 37)"/><rect x="140" y="70" width="12" height="16" transform="rotate(-30 146 78)"/></g>'; },
  };
  const ASSETS = G.LOS_ASSETS || { arene: {} };
  function scene(themeId, cls) {
    const img = ASSETS.arene && ASSETS.arene[themeId];
    if (img) return '<img class="' + (cls || 'scene') + '" src="' + img + '" alt="" decoding="async" draggable="false">';
    const f = SCENES[themeId] || SCENES.classico;
    return '<svg class="' + (cls || 'scene') + '" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + f() + '</svg>';
  }
  function sceneDataUri(themeId) {
    if (ASSETS.arene && ASSETS.arene[themeId]) return ASSETS.arene[themeId];
    const f = SCENES[themeId] || SCENES.classico;
    return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">' + f() + '</svg>');
  }

  /* ---------- coriandoli ---------- */
  function confetti(colors) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = document.createElement('canvas');
    cv.className = 'confetti'; cv.width = innerWidth; cv.height = innerHeight;
    document.body.appendChild(cv);
    const g = cv.getContext('2d'), P = [];
    for (let i = 0; i < 160; i++) P.push({ x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: colors[i % colors.length] });
    let t = 0;
    (function frame() {
      t++; g.clearRect(0, 0, cv.width, cv.height);
      P.forEach((p) => { p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.globalAlpha = Math.max(0, 1 - t / 160); g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); g.restore(); });
      if (t < 160) requestAnimationFrame(frame); else cv.remove();
    })();
  }

  G.LOS_ART = { logo, wordmark, emblem, assets: ASSETS, logoDataUri, icon, scene, sceneDataUri, confetti };
})(typeof window !== 'undefined' ? window : globalThis);
