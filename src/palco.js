/* Last One Standing — il «palco»: la regia a tutto schermo sopra il look.
 * - un fondale vivo dietro ogni pagina: fasce di testo che scorrono, il numero del passo, una scheggia a mezzitoni,
 *   tutto in parallasse con il puntatore;
 * - le testate delle sezioni che entrano lettera per lettera;
 * - una scintilla vettoriale a ogni tocco;
 * - la diretta a tutto schermo: calendario del giorno, disastro, scontro finale e cut-in delle eliminazioni
 *   con gli occhi di chi colpisce e di chi cade;
 * - la sequenza di vittoria: taglio, occhi, cartellone con figura, titolo e nome.
 * Tutto è decorazione: non blocca i comandi (tranne la vittoria, che un tocco o un tasto salta),
 * e con il movimento ridotto non parte niente. Va caricato dopo look.js e regia.js, prima di ui.js. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const AN = G.LOS_ANIM; if (!AN) return;
  const root = document.documentElement;
  const LOOK = () => G.LOS_LOOK || {};
  const FX = () => LOOK().fx || {};
  const reduced = () => !!AN.reduced;
  const sfx = (n, o) => { const L = LOOK(); if (L.sfx) L.sfx.play(n, o); };
  const E = Object.assign({ out: 'cubic-bezier(.16,1,.3,1)', in: 'cubic-bezier(.7,0,.84,0)', io: 'cubic-bezier(.76,0,.24,1)', kick: 'cubic-bezier(.34,1.56,.64,1)' }, (G.LOS_REGIA && G.LOS_REGIA.E) || {});
  const R = (a, b) => a + Math.random() * (b - a);
  const RI = (a, b) => Math.floor(R(a, b + 1));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const anim = (n, kf, o) => n.animate(kf, Object.assign({ fill: 'both' }, o));
  const ORDER = ['home', 'cast', 'arena', 'diretta', 'esito'];
  const viewOf = (x) => { const v = (x || '').replace(/^#/, ''); return ORDER.includes(v) ? v : 'home'; };
  // un bordo strappato come clip-path: diverso a ogni cartello
  function torn(top, bot, amp) {
    const edge = (y) => { const a = [], n = RI(18, 28); for (let i = 0; i <= n; i++) a.push([(i / n) * 100, y + (i && i < n ? R(-amp, amp) : 0)]); return a; };
    return 'polygon(' + edge(top).concat(edge(bot).reverse()).map((p) => p[0].toFixed(1) + '% ' + p[1].toFixed(1) + '%').join(',') + ')';
  }
  // una stella a punte irregolari come clip-path
  function star(spikes, inner) {
    const p = [], rot = R(0, Math.PI);
    for (let i = 0; i < spikes * 2; i++) { const a = rot + (i / (spikes * 2)) * Math.PI * 2, r = i % 2 ? inner * R(0.9, 1.1) : R(0.86, 1); p.push((50 + Math.cos(a) * r * 50).toFixed(1) + '% ' + (50 + Math.sin(a) * r * 50).toFixed(1) + '%'); }
    return 'polygon(' + p.join(',') + ')';
  }

  /* ================= FONDALE VIVO ================= */
  const WORD = { home: 'Last One Standing', cast: 'Concorrenti', arena: 'Arena', diretta: 'In diretta', esito: 'Esito' };
  let stage = null;
  function buildStage() {
    stage = h('div', null, '<i class="pl-shard"></i><i class="pl-shard pl-s2"></i><div class="pl-band pl-b1"><span></span></div><div class="pl-band pl-b2"><span></span></div><b class="pl-num"></b>');
    stage.id = 'palco'; stage.setAttribute('aria-hidden', 'true');
    const atmo = document.getElementById('atmo');
    if (atmo && atmo.parentNode) atmo.parentNode.insertBefore(stage, atmo.nextSibling); else document.body.prepend(stage);
    setStage(viewOf(G.location.hash), false);
    // parallasse: il fondale segue piano il puntatore (solo con un mouse vero)
    if (G.matchMedia && G.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const tick = () => { cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06; stage.style.setProperty('--px', cx.toFixed(2)); stage.style.setProperty('--py', cy.toFixed(2)); raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0; };
      G.addEventListener('pointermove', (e) => { if (reduced()) return; tx = e.clientX / G.innerWidth - 0.5; ty = e.clientY / G.innerHeight - 0.5; if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    }
  }
  function setStage(view, animate) {
    if (!stage) return;
    const word = (WORD[view] || WORD.home).toUpperCase(), line = (word + ' • ').repeat(view === 'home' ? 4 : 8);
    stage.querySelectorAll('.pl-band span').forEach((s) => { s.textContent = line + line; });
    const num = stage.querySelector('.pl-num'), n = ORDER.indexOf(view);
    num.textContent = n > 0 ? String(n) : '';
    stage.dataset.view = view;
    if (animate && !reduced()) {
      anim(num, [{ transform: 'translate(30%, 20%) rotate(-8deg) scale(1.4)', opacity: 0 }, { transform: 'translate(0,0) rotate(-8deg) scale(1)', opacity: 1 }], { duration: 700, easing: E.out, fill: 'backwards' });
      stage.querySelectorAll('.pl-shard').forEach((s, i) => anim(s, [{ translate: (i ? -40 : 40) + '% 0' }, { translate: '0 0' }], { duration: 800, delay: i * 80, easing: E.out, fill: 'backwards' }));
    }
  }

  /* ================= TESTATE DELLE SEZIONI ================= */
  function split(hd) {
    if (hd.__letters) return hd.__letters;
    const letters = [];
    hd.setAttribute('aria-label', hd.textContent.replace(/\s+/g, ' ').trim());
    [...hd.childNodes].forEach((n) => {
      if (n.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
        const ws = h('span', 'pk-w'); ws.setAttribute('aria-hidden', 'true');
        [...w].forEach((ch) => { const s = h('span', 'pk-l'); s.textContent = ch; ws.appendChild(s); letters.push(s); });
        frag.appendChild(ws);
      });
      n.replaceWith(frag);
    });
    return (hd.__letters = letters);
  }
  function headIn(view, dir) {
    const sec = document.getElementById('v-' + view); if (!sec || reduced()) return;
    const head = sec.querySelector('.pagehead');
    if (head) {
      const eb = head.querySelector('.eyebrow'), h1 = head.querySelector('h1');
      if (eb) anim(eb, [{ clipPath: 'inset(0 100% 0 0)', translate: -dir * 30 + 'px 0' }, { clipPath: 'inset(0 0 0 0)', translate: '0 0' }], { duration: 360, delay: 60, easing: E.out, fill: 'backwards' });
      if (h1) {
        split(h1).forEach((s, i) => anim(s, [{ transform: 'translateY(' + R(50, 90) + '%) rotate(' + R(-16, 16) + 'deg) scale(1.3)', opacity: 0 }, { opacity: 1, offset: 0.4 }, { transform: 'none', opacity: 1 }], { duration: 420, delay: 110 + i * 26 + R(0, 12), easing: E.kick, fill: 'backwards' }));
        head.classList.remove('pk-go'); void head.offsetWidth; head.classList.add('pk-go');
      }
    } else if (view === 'home') {
      const h1 = sec.querySelector('.homehero h1'), k = sec.querySelector('.kicker');
      if (h1) anim(h1, [{ clipPath: 'polygon(0 0, 0 0, -20% 100%, -20% 100%)', translate: '-24px 0' }, { clipPath: 'polygon(0 0, 130% 0, 110% 100%, -20% 100%)', translate: '0 0' }], { duration: 620, delay: 80, easing: E.out, fill: 'backwards' });
      if (k) anim(k, [{ opacity: 0, translate: '-20px 0' }, { opacity: 1, translate: '0 0' }], { duration: 300, easing: E.out, fill: 'backwards' });
    }
  }

  /* ================= SCINTILLA AL TOCCO ================= */
  const NS = 'http://www.w3.org/2000/svg';
  function spark(x, y) {
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'pk-spark'); svg.setAttribute('viewBox', '-60 -60 120 120'); svg.setAttribute('aria-hidden', 'true');
    svg.style.left = x + 'px'; svg.style.top = y + 'px';
    const n = RI(6, 8), rot = R(0, 360);
    for (let i = 0; i < n; i++) {
      const a = rot + (i / n) * 360 + R(-8, 8), len = R(16, 30), w = R(3, 6);
      const p = document.createElementNS(NS, 'polygon');
      p.setAttribute('points', '0,' + -w / 2 + ' ' + len + ',0 0,' + w / 2);
      p.setAttribute('class', i % 3 === 0 ? 'k2' : 'k1');
      svg.appendChild(p);
      anim(p, [{ transform: 'rotate(' + a + 'deg) translateX(6px) scaleX(.2)', opacity: 1 }, { transform: 'rotate(' + a + 'deg) translateX(' + R(26, 40) + 'px) scaleX(1)', opacity: 1, offset: 0.6 }, { transform: 'rotate(' + a + 'deg) translateX(' + R(40, 54) + 'px) scaleX(0)', opacity: 0 }], { duration: R(300, 420), easing: E.out });
    }
    document.body.appendChild(svg);
    setTimeout(() => svg.remove(), 460);
  }
  document.addEventListener('pointerdown', (e) => {
    if (reduced() || e.button > 0) return;
    const t = e.target.closest && e.target.closest('a, button, summary, label.btn, [role="tab"], [role="radio"], .poster-card');
    if (t && !t.disabled) spark(e.clientX, e.clientY);
  }, true);

  /* ================= OCCHI ================= */
  // il pannello con gli occhi di un concorrente: la foto, una fascia di riserva tinta, oppure le iniziali
  function eyes(av, cls) {
    const p = h('span', 'pe ' + (cls || ''));
    const img = av && av.querySelector('img:not(.volto)');
    const name = (av && (av.getAttribute('title') || (av.getAttribute('aria-label') || '').replace(/^Scheda di /, ''))) || '';
    const reserve = !img && av && LOOK().pickFor && LOOK().pickFor(FX().occhi, av.dataset.g, av.dataset.k);
    if (img) { const im = h('img'); im.alt = ''; im.src = img.currentSrc || img.src; p.appendChild(im); }
    else if (reserve) { const im = h('img', 'tint'); im.alt = ''; im.src = reserve; p.appendChild(im); }
    else { const ini = av ? ((av.querySelector('.ini') || av).textContent || '').trim() : '?'; p.appendChild(h('b', 'pe-ini', esc(ini))); p.classList.add('pe-noimg'); }
    if (av && av.style.getPropertyValue('--c')) p.style.setProperty('--c', av.style.getPropertyValue('--c'));
    p.dataset.name = name;
    return p;
  }

  /* ================= CARTELLI A TUTTO SCHERMO (diretta) ================= */
  let board = null, boardBusy = 0, boardTimer = 0;
  function openBoard(cls, dur) {
    closeBoard();
    board = h('div', 'pb ' + cls); board.setAttribute('aria-hidden', 'true');
    document.body.appendChild(board);
    boardBusy = Date.now() + dur;
    boardTimer = setTimeout(closeBoard, dur + 80);
    return board;
  }
  function closeBoard() { clearTimeout(boardTimer); if (board) { board.remove(); board = null; } boardBusy = 0; }
  // un comando della diretta chiude subito il cartello: non si resta mai ad aspettare un'animazione
  document.addEventListener('pointerdown', (e) => { if (board && e.target.closest && e.target.closest('.pbtn, #speedSeg, .steps a')) closeBoard(); }, true);
  document.addEventListener('keydown', () => { if (board) closeBoard(); }, true);

  // calendario: la striscia dei giorni scorre di un posto, il nuovo giorno si ferma nel selettore
  function dayBoard(unit, prev, next, sub) {
    const D = 1500, b = openBoard('pb-day', D);
    const nums = [prev - 1, prev, next, next + 1, next + 2].map((n) => (n > 0 ? n : ''));
    b.innerHTML = '<i class="pb-veil"></i><div class="pb-band"><i class="pb-bg"></i><div class="pb-rail"><span>' + (esc(unit) + ' • ').repeat(24) + '</span></div>' +
      '<i class="pb-sel"></i><div class="pb-strip">' + nums.map((n, i) => '<b class="' + (i === 1 ? 'o' : i === 2 ? 'n' : '') + '">' + n + '</b>').join('') + '</div>' +
      '<div class="pb-cap"><span class="pb-k">' + esc(unit) + ' ' + next + '</span>' + (sub ? '<span class="pb-sub">' + esc(sub) + '</span>' : '') + '</div></div>';
    const band = b.querySelector('.pb-band'), strip = b.querySelector('.pb-strip'), sel = b.querySelector('.pb-sel'), o = strip.querySelector('.o'), n = strip.querySelector('.n'), cap = b.querySelector('.pb-cap');
    b.querySelector('.pb-bg').style.clipPath = torn(R(3, 8), R(92, 97), 2.2);
    const tilt = R(-5, -3).toFixed(1);
    band.style.setProperty('--tilt', tilt + 'deg');
    anim(b.querySelector('.pb-veil'), [{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1, offset: 0.82 }, { opacity: 0 }], { duration: D });
    anim(band, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 260, easing: E.io });
    anim(band, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 0 100%)' }], { duration: 240, delay: D - 250, easing: E.in });
    // la striscia parte con il giorno vecchio al centro e scorre di un posto
    anim(strip, [{ transform: 'translateX(var(--slot))' }, { transform: 'translateX(0)' }], { duration: 460, delay: 300, easing: E.io });
    anim(sel, [{ transform: 'translate(-50%,-50%) skewX(-12deg) scaleX(0)' }, { transform: 'translate(-50%,-50%) skewX(-12deg) scaleX(1)' }], { duration: 240, delay: 160, easing: E.out });
    anim(sel, [{ transform: 'translate(-50%,-50%) skewX(-12deg) scale(1)' }, { transform: 'translate(-50%,-50%) skewX(-12deg) scale(1.16)' }, { transform: 'translate(-50%,-50%) skewX(-12deg) scale(1)' }], { duration: 260, delay: 740, easing: E.out, fill: 'none' });
    anim(o, [{ opacity: 1, transform: 'scale(1.5)' }, { opacity: 0.32, transform: 'scale(1)' }], { duration: 460, delay: 300, easing: E.io });
    anim(n, [{ opacity: 0.32, transform: 'scale(1)' }, { opacity: 1, transform: 'scale(1.72)' }, { opacity: 1, transform: 'scale(1.5)' }], { duration: 560, delay: 300, easing: E.out });
    anim(cap, [{ opacity: 0, translate: '40px 0' }, { opacity: 1, translate: '0 0' }], { duration: 300, delay: 760, easing: E.out });
    sfx('cut'); sfx('stamp', { at: 740 });
  }

  // disastro: nastro di pericolo, titolo che cade, pagina che trema
  function disBoard(title) {
    const D = 1700, b = openBoard('pb-dis', D);
    b.innerHTML = '<i class="pb-veil"></i><div class="pb-band"><i class="pb-tape t"></i><i class="pb-bg"></i><i class="pb-tape b"></i><div class="pb-cap"><span class="pb-k">Disastro</span><b class="pb-t"></b></div></div>';
    const band = b.querySelector('.pb-band'), t = b.querySelector('.pb-t');
    b.querySelector('.pb-bg').style.clipPath = torn(R(2, 6), R(94, 98), 2.6);
    band.style.setProperty('--tilt', R(2.5, 4.5).toFixed(1) + 'deg');
    String(title || '').split(/\s+/).forEach((w, i, a) => { const s = h('span', null, esc(w)); t.appendChild(s); if (i < a.length - 1) t.appendChild(document.createTextNode(' ')); });
    anim(b.querySelector('.pb-veil'), [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.84 }, { opacity: 0 }], { duration: D });
    anim(band, [{ transform: 'rotate(var(--tilt)) scaleY(0)' }, { transform: 'rotate(var(--tilt)) scaleY(1)' }], { duration: 200, easing: E.out });
    anim(band, [{ transform: 'rotate(var(--tilt)) scaleY(1)', opacity: 1 }, { transform: 'rotate(var(--tilt)) scaleY(0)', opacity: 1 }], { duration: 200, delay: D - 210, easing: E.in });
    anim(b.querySelector('.pb-k'), [{ translate: '-60px 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], { duration: 240, delay: 140, easing: E.out });
    [...t.children].forEach((s, i) => anim(s, [{ transform: 'translateY(-120%) rotate(' + R(-10, 10) + 'deg) scale(1.6)', opacity: 0 }, { opacity: 1, offset: 0.5 }, { transform: 'none', opacity: 1 }], { duration: 300, delay: 260 + i * 90, easing: E.kick }));
    const main = document.querySelector('main');
    if (main) main.animate([0, 1, 2, 3, 4, 5, 6].map((i) => ({ translate: (i === 6 ? 0 : R(-9, 9) * (1 - i / 7)).toFixed(1) + 'px ' + (i === 6 ? 0 : R(-6, 6) * (1 - i / 7)).toFixed(1) + 'px' })), { duration: 520, delay: 280, easing: 'steps(7, end)' });
    sfx('cut'); sfx('stamp', { at: 280 }); sfx('stamp', { at: 420 });
  }

  // scontro finale: gli occhi di chi resta, da lati alterni
  function finBoard(avs) {
    const list = avs.slice(0, 6), D = 1900 + list.length * 60, b = openBoard('pb-fin', D);
    b.innerHTML = '<i class="pb-veil"></i><div class="pb-rows"></div><div class="pb-head"><span class="pb-k">Scontro finale</span></div>';
    const rows = b.querySelector('.pb-rows');
    list.forEach((av, i) => {
      const row = h('div', 'pb-row ' + (i % 2 ? 'r' : 'l')), p = eyes(av);
      row.appendChild(p); row.appendChild(h('span', 'pb-name', esc(p.dataset.name)));
      row.style.setProperty('--i', i); rows.appendChild(row);
      anim(row, [{ transform: 'translateX(' + (i % 2 ? 110 : -110) + '%) skewX(-10deg)' }, { transform: 'translateX(0) skewX(-10deg)' }], { duration: 300, delay: 160 + i * 70, easing: E.out });
      anim(row, [{ transform: 'translateX(0) skewX(-10deg)' }, { transform: 'translateX(' + (i % 2 ? -110 : 110) + '%) skewX(-10deg)' }], { duration: 240, delay: D - 300 + i * 20, easing: E.in });
      setTimeout(() => sfx('move'), 160 + i * 70);
    });
    const head = b.querySelector('.pb-head');
    anim(b.querySelector('.pb-veil'), [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.86 }, { opacity: 0 }], { duration: D });
    anim(head, [{ transform: 'translate(-50%,-50%) rotate(-6deg) scale(2.2)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 1 }], { duration: 260, delay: 220 + list.length * 70, easing: E.kick });
    anim(head, [{ opacity: 1 }, { opacity: 0 }], { duration: 160, delay: D - 260, easing: E.in });
    sfx('cut'); sfx('stamp', { at: 240 + list.length * 70 });
  }

  // cut-in di un'eliminazione: chi colpisce a sinistra, chi cade a destra, un taglio in mezzo e il timbro
  let lastKill = 0;
  function killCut(row) {
    if (reduced() || Date.now() < boardBusy || Date.now() - lastKill < 1500) return;
    const avs = [...row.querySelectorAll('.avs .av')], dead = avs.filter((a) => a.classList.contains('dead')), live = avs.filter((a) => !a.classList.contains('dead'));
    if (!dead.length) return;
    lastKill = Date.now();
    const D = 1150, b = openBoard('pb-kill' + (live.length ? '' : ' solo'), D);
    const label = ((row.querySelector('.cat') || {}).textContent || 'Fuori').trim();
    b.innerHTML = '<div class="pb-band"><i class="pb-bg"></i><div class="pb-duel"></div><i class="pb-cutline"></i><b class="pb-stamp">' + esc(label) + '</b></div>';
    const band = b.querySelector('.pb-band'), duel = b.querySelector('.pb-duel'), stamp = b.querySelector('.pb-stamp'), line = b.querySelector('.pb-cutline');
    b.querySelector('.pb-bg').style.clipPath = torn(R(4, 9), R(91, 96), 2.4);
    band.style.setProperty('--tilt', R(-5.5, -3.5).toFixed(1) + 'deg');
    const side = (av, cls) => { const s = h('div', 'pb-side ' + cls), p = eyes(av); s.appendChild(p); s.appendChild(h('span', 'pb-name', esc(p.dataset.name))); duel.appendChild(s); return s; };
    const L = live.length ? side(live[0], 'atk') : null, Rt = side(dead[0], 'vic');
    anim(band, [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 200, easing: E.io });
    anim(band, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 100% 0 0)' }], { duration: 200, delay: D - 210, easing: E.in });
    if (L) anim(L, [{ transform: 'translateX(-60%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, delay: 90, easing: E.out });
    anim(Rt, [{ transform: 'translateX(60%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, delay: 130, easing: E.out });
    // il taglio: una lama di carta attraversa, il pannello di chi cade si spezza in due metà sfalsate
    anim(line, [{ transform: 'translate(-50%,-50%) rotate(-58deg) scaleX(0)', opacity: 1 }, { transform: 'translate(-50%,-50%) rotate(-58deg) scaleX(1)', opacity: 1, offset: 0.5 }, { transform: 'translate(-50%,-50%) rotate(-58deg) scaleX(1)', opacity: 0 }], { duration: 280, delay: 400, easing: E.out });
    setTimeout(() => { if (Rt.isConnected) Rt.classList.add('cut'); }, 480);
    anim(stamp, [{ transform: 'translate(-50%,-50%) rotate(-9deg) scale(2.6)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-9deg) scale(1)', opacity: 1 }], { duration: 220, delay: 520, easing: E.kick });
    const feed = document.getElementById('phBody');
    if (feed) feed.animate([{ translate: '0 0' }, { translate: '-7px 3px' }, { translate: '6px -3px' }, { translate: '-3px 2px' }, { translate: '0 0' }], { duration: 260, delay: 500, easing: 'steps(4, end)' });
    sfx('slash', { at: 400 }); sfx('stamp', { at: 540 });
  }
  function watchKills() {
    const feed = document.getElementById('phBody'); if (!feed) return;
    new MutationObserver((ms) => {
      let hit = null;
      ms.forEach((m) => m.addedNodes.forEach((n) => { if (hit || n.nodeType !== 1) return; hit = n.matches('.ev.in.lethal') ? n : n.querySelector('.ev.in.lethal'); }));
      if (!hit) return;
      // prima le uccisioni con un colpevole: sono quelle con due volti
      const best = [...feed.querySelectorAll('.ev.in.lethal')].find((r) => r.querySelector('.avs .av:not(.dead)') && r.querySelector('.avs .av.dead')) || hit;
      // l'osservatore scatta a fine disegno della fase: se c'è un cartello (giorno, disastro, finale) è già aperto e ha la precedenza
      killCut(best);
    }).observe(feed, { childList: true, subtree: true });
  }

  // i cartelli della diretta (anim.js → card) diventano cartelli a tutto schermo
  const card0 = AN.card;
  if (typeof card0 === 'function') AN.card = function (host, html, cls) {
    const r = card0.apply(this, arguments);
    if (reduced() || !host || !host.classList.contains('broadcast')) return r;
    try {
      const st = host.querySelector(':scope > .stc'); if (!st) return r;
      const q = (s) => { const n = st.querySelector(s); return n ? n.textContent.trim() : ''; };
      if (/stc-fin/.test(cls || '')) finBoard([...st.querySelectorAll('.stc-faces .av')]);
      else if (/stc-dis/.test(cls || '')) disBoard(q('.stc-t'));
      else if (st.querySelector('.stc-num')) dayBoard(q('.stc-k'), parseInt(q('.stc-num .o'), 10) || 0, parseInt(q('.stc-num .n'), 10) || 0, q('.stc-sub'));
      else return r;
      st.classList.add('pb-moved'); // il cartello piccolo nel banner lascia il posto a quello grande
    } catch (e) { closeBoard(); }
    return r;
  };

  // il contatore dei superstiti accusa il colpo quando scende
  const count0 = AN.countTo;
  if (typeof count0 === 'function') AN.countTo = function (el, n, opt) {
    const r = count0.apply(this, arguments);
    try {
      if (el && el.id === 'aliveBig' && opt && opt.from > n && !reduced()) {
        el.animate([{ transform: 'scale(1)', color: 'inherit' }, { transform: 'scale(1.28) rotate(-4deg)', color: 'var(--c-kill)', offset: 0.25 }, { transform: 'scale(.96)', offset: 0.6 }, { transform: 'scale(1)', color: 'inherit' }], { duration: 520, delay: (opt.dur || 0) * 0.85, easing: E.out });
      }
    } catch (e) { /* solo decorazione */ }
    return r;
  };

  /* ================= SEQUENZA DI VITTORIA ================= */
  let finaleOn = null;
  function victory(wh) {
    if (reduced() || finaleOn || !wh || wh.classList.contains('none')) return;
    const team = wh.classList.contains('team');
    const av = wh.querySelector('.fn-portrait .av'), crew = [...wh.querySelectorAll('.fn-crew .av')];
    const title = ((wh.querySelector('.fn-title') || {}).textContent || 'Vittoria').trim();
    const name = team ? ((wh.querySelector('h1') || {}).textContent || '').trim() : (av && av.getAttribute('title')) || ((wh.querySelector('h1') || {}).getAttribute('aria-label')) || ((wh.querySelector('h1') || {}).textContent || '').trim();
    const sub = ((wh.querySelector('.fn-sub') || {}).textContent || '').trim();
    const tag = [((wh.querySelector('.fn-arena') || {}).textContent || '').trim()].concat([...wh.querySelectorAll('.fn-meta span')].map((s) => s.textContent.trim())).filter(Boolean).join(' • ');
    const photo = av && av.querySelector('img:not(.volto)');
    const figure = !team && !photo && av && LOOK().pickFor ? LOOK().pickFor(FX().vincitori, av.dataset.g, av.dataset.k) : null;
    const words = title.split(/\s+/), lines = words.length > 1 ? [words[0], words.slice(1).join(' ')] : [title];
    const o = h('div', 'pf'); o.setAttribute('aria-hidden', 'true');
    o.innerHTML = '<i class="pf-black"></i><i class="pf-slash"></i>' +
      '<div class="pf-eyes"><i class="pf-speed"></i></div>' +
      '<div class="pf-card"><i class="pf-bg"></i><i class="pf-shard"></i><i class="pf-dots"></i><i class="pf-burst"></i>' +
      '<div class="pf-rib a"><span>' + (esc(title) + ' • ').repeat(16) + '</span></div><div class="pf-rib b"><span>' + (esc(name) + ' • ').repeat(16) + '</span></div>' +
      '<div class="pf-figure"></div>' +
      '<div class="pf-txt"><span class="pf-tag">' + esc(tag) + '</span><div class="pf-head">' + lines.map((l) => '<b><span>' + esc(l) + '</span></b>').join('') + '</div>' +
      '<div class="pf-name"><i class="pf-nslab"></i><span class="pf-nword"></span></div>' + (sub ? '<span class="pf-sub">' + esc(sub) + '</span>' : '') + '</div>' +
      '<span class="pf-skip">Tocca per continuare</span></div><i class="pf-flash"></i>';
    const card = o.querySelector('.pf-card'), hero = o.querySelector('.pf-figure'), nword = o.querySelector('.pf-nword'), eyesBand = o.querySelector('.pf-eyes');
    // gli occhi di chi vince (o dei primi della squadra)
    (team ? crew.slice(0, 3) : [av]).forEach((a) => { if (a) eyesBand.appendChild(eyes(a)); });
    // l'eroe: figura intera di riserva, foto in cornice inclinata, squadra in fila, oppure le iniziali
    if (team) { hero.classList.add('crew'); crew.slice(0, 6).forEach((a) => { const c = a.cloneNode(true); c.removeAttribute('data-prof'); c.tabIndex = -1; hero.appendChild(c); }); }
    else if (figure) { const im = h('img', 'pf-fig'); im.alt = ''; im.src = figure; hero.appendChild(im); }
    else if (photo) { const f = h('div', 'pf-photo'); const im = h('img'); im.alt = ''; im.src = photo.currentSrc || photo.src; f.appendChild(im); hero.appendChild(f); }
    else hero.appendChild(h('b', 'pf-ini', esc(((av && (av.querySelector('.ini') || av).textContent) || '').trim())));
    [...name].forEach((ch) => { const s = h('span'); s.textContent = ch === ' ' ? ' ' : ch; nword.appendChild(s); });
    // il nome riempie la sua colonna, qualunque sia la lunghezza
    o.style.setProperty('--nfs', 'min(' + (team ? 9 : 15) + 'vw, ' + (52 / Math.max(3, name.length * 0.66)).toFixed(2) + 'vw, 30vh)');
    o.style.setProperty('--nfsm', 'min(22vw, ' + (60 / Math.max(3, name.length * 0.78)).toFixed(2) + 'vw)');
    o.querySelector('.pf-burst').style.clipPath = star(RI(14, 20), R(0.52, 0.64));
    document.body.appendChild(o);
    finaleOn = o;

    const T = [], later = (ms, fn) => T.push(setTimeout(fn, ms));
    const q = (s) => o.querySelector(s), qa = (s) => [...o.querySelectorAll(s)];
    // 1 · il taglio
    anim(q('.pf-slash'), [{ transform: 'translate(-50%,-50%) rotate(-24deg) scaleX(0)' }, { transform: 'translate(-50%,-50%) rotate(-24deg) scaleX(1)' }], { duration: 170, easing: E.io });
    anim(q('.pf-slash'), [{ opacity: 1 }, { opacity: 0 }], { duration: 160, delay: 190 });
    sfx('slash');
    // 2 · gli occhi
    anim(eyesBand, [{ clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 180, delay: 150, easing: E.out });
    qa('.pf-eyes .pe').forEach((p, i) => anim(p, [{ transform: 'translateX(' + (i % 2 ? -1 : 1) * 46 + '%) skewX(-10deg)', opacity: 0 }, { transform: 'translateX(0) skewX(-10deg)', opacity: 1 }], { duration: 280, delay: 170 + i * 60, easing: E.out }));
    qa('.pf-eyes .pe img').forEach((im) => anim(im, [{ transform: 'scale(1.16) translateX(-3%)' }, { transform: 'scale(1.04) translateX(2%)' }], { duration: 900, delay: 170, easing: 'linear' }));
    // 3 · il cartellone
    later(840, () => { sfx('stamp'); });
    anim(q('.pf-flash'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 760, easing: 'steps(3, end)' });
    anim(card, [{ visibility: 'hidden' }, { visibility: 'visible' }], { duration: 1, delay: 860 });
    anim(eyesBand, [{ visibility: 'visible' }, { visibility: 'hidden' }], { duration: 1, delay: 860 });
    anim(q('.pf-shard'), [{ transform: 'translateX(-70%) skewX(-18deg)' }, { transform: 'translateX(0) skewX(-18deg)' }], { duration: 520, delay: 860, easing: E.out });
    anim(q('.pf-burst'), [{ transform: 'translate(-50%,-50%) rotate(-70deg) scale(0)' }, { transform: 'translate(-50%,-50%) rotate(0deg) scale(1)' }], { duration: 620, delay: 880, easing: E.out });
    anim(hero, [{ transform: 'translateX(46%) skewX(-12deg)', opacity: 0 }, { opacity: 1, offset: 0.3 }, { transform: 'translateX(-2.5%) skewX(2deg)', opacity: 1, offset: 0.72 }, { transform: 'none', opacity: 1 }], { duration: 560, delay: 900, easing: E.out });
    qa('.pf-rib').forEach((r, i) => anim(r, [{ clipPath: i ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 420, delay: 940 + i * 90, easing: E.io }));
    anim(q('.pf-tag'), [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 300, delay: 1020, easing: E.out });
    qa('.pf-head b').forEach((b, i) => {
      anim(b, [{ clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-40px)' }, { clipPath: 'inset(0 0 0 0)', transform: 'none' }], { duration: 300, delay: 1090 + i * 100, easing: E.out });
      later(1090 + i * 100, () => sfx('move'));
    });
    anim(q('.pf-nslab'), [{ transform: 'skewX(-10deg) scaleX(0)' }, { transform: 'skewX(-10deg) scaleX(1)' }], { duration: 260, delay: 1300, easing: E.out });
    [...nword.children].forEach((s, i) => anim(s, [{ transform: 'translateY(-70%) rotate(' + R(-22, 22) + 'deg) scale(1.9)', opacity: 0 }, { opacity: 1, offset: 0.4 }, { transform: 'none', opacity: 1 }], { duration: 300, delay: 1380 + i * 44 + R(0, 14), easing: E.kick }));
    later(1380, () => sfx('stamp'));
    later(1380 + name.length * 44 + 120, () => { sfx('confirm'); card.classList.add('breathe'); });
    const subEl = q('.pf-sub'); if (subEl) anim(subEl, [{ opacity: 0, translate: '-24px 0' }, { opacity: 1, translate: '0 0' }], { duration: 300, delay: 1500 + name.length * 44, easing: E.out });
    anim(q('.pf-skip'), [{ opacity: 0 }, { opacity: 0.8 }], { duration: 400, delay: 2200 });

    // 4 · l'uscita: il cartellone si strappa via in diagonale e sotto riparte la regia dell'esito
    let closing = false;
    const close = () => {
      if (closing) return; closing = true;
      T.forEach(clearTimeout);
      document.removeEventListener('keydown', onKey, true);
      try { wh.classList.remove('fn-play'); void wh.offsetWidth; wh.classList.add('fn-play'); setTimeout(() => wh.classList.remove('fn-play'), 3200); } catch (e) { /* niente */ }
      sfx('cut');
      const a = o.animate([{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }, { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 130% 100%)' }], { duration: 440, easing: E.io, fill: 'forwards' });
      const done = () => { o.remove(); finaleOn = null; };
      a.finished.then(done, done);
    };
    const onKey = (e) => { if (e.key !== 'Tab') close(); };
    later(1200, () => { o.addEventListener('pointerdown', close); document.addEventListener('keydown', onKey, true); });
    if (!(G.LOS_PALCO && G.LOS_PALCO.hold)) later(Math.max(4300, 2700 + name.length * 44), close); // hold: solo per provare
  }
  const stage0 = AN.stage;
  if (typeof stage0 === 'function') AN.stage = function (el, cls) {
    const r = stage0.apply(this, arguments);
    try { if (cls === 'fn-play' && el && el.matches('.winhero.finale')) victory(el); } catch (e) { if (finaleOn) { finaleOn.remove(); finaleOn = null; } }
    return r;
  };

  /* ================= AVVIO ================= */
  document.addEventListener('los:cover', (e) => setStage(e.detail.view, true));
  document.addEventListener('los:enter', (e) => headIn(e.detail.view, e.detail.dir));
  G.addEventListener('hashchange', () => { if (reduced()) setStage(viewOf(G.location.hash), false); });
  function start() {
    buildStage(); watchKills();
    // il primo ingresso, senza stacco
    setTimeout(() => headIn(viewOf(G.location.hash), 1), 120);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  G.LOS_PALCO = { finale: true, victory, dayBoard, disBoard, finBoard, killCut, setStage };
})(typeof window !== 'undefined' ? window : globalThis);
