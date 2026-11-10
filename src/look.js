/* Last One Standing — il «look»: le parti del nuovo aspetto che chiedono codice.
 * - colore del testo sopra la tinta piena dell'arena (--key-ink), scelto per contrasto;
 * - il cursore di selezione che scivola tra le voci di navigazione e dei segmenti;
 * - il cut-in degli occhi di chi vince, alla fine della rivelazione dell'esito;
 * - gli effetti sonori, sintetizzati con WebAudio (spenti finché il giocatore non li accende).
 * Si aggancia a LOS_ANIM avvolgendone wipe, card e stage: ui.js non cambia. Va caricato dopo anim.js e prima di ui.js. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const AN = G.LOS_ANIM || {};
  const root = document.documentElement;
  const reduced = () => !!AN.reduced;
  const store = {
    get(k) { try { return G.localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { G.localStorage.setItem(k, v); } catch (e) { /* niente */ } },
  };

  /* ================= TINTA E INCHIOSTRO ================= */
  // --key è hsl(h 92% 54%): per ogni tinta si sceglie nero o carta, quello che contrasta di più
  function lum(h) {
    const s = 0.92, l = 0.54, a = s * Math.min(l, 1 - l);
    const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
    const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * lin(f(0)) + 0.7152 * lin(f(8)) + 0.0722 * lin(f(4));
  }
  let lastHue = null;
  function syncInk() {
    const h = parseFloat(getComputedStyle(root).getPropertyValue('--h'));
    if (isNaN(h) || h === lastHue) return;
    lastHue = h;
    const L = lum(((h % 360) + 360) % 360), onBlack = (L + 0.05) / 0.05, onPaper = 1.05 / (L + 0.05);
    root.style.setProperty('--key-ink', onBlack >= onPaper ? '#0a0a0c' : '#f7f5f0');
  }

  /* ================= EFFETTI SONORI ================= */
  // Tutto sintetizzato: niente file audio, niente suoni presi da altri giochi.
  const SFX = (() => {
    let ctx = null, master = null, on = store.get('los-sfx') === '1', lastUser = 0;
    const ensure = () => {
      if (ctx) return ctx;
      const C = G.AudioContext || G.webkitAudioContext; if (!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = 0.32; master.connect(ctx.destination); return ctx;
    };
    let noiseBuf = null;
    const noise = () => {
      if (noiseBuf) return noiseBuf;
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      return noiseBuf;
    };
    const env = (g, t, a, peak, dur) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); };
    function tone(type, f0, f1, dur, peak, at) {
      const t = ctx.currentTime + (at || 0), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
      env(g, t, 0.004, peak, dur); o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02);
    }
    function hiss(f0, f1, q, dur, peak, at, type) {
      const t = ctx.currentTime + (at || 0), s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = noise(); f.type = type || 'bandpass'; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      env(g, t, 0.01, peak, dur); s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.02);
    }
    const voices = {
      move() { tone('square', 1500, 950, 0.035, 0.12); },
      confirm() { tone('triangle', 660, 660, 0.07, 0.35); tone('triangle', 990, 990, 0.12, 0.3, 0.06); hiss(5000, 3000, 1, 0.05, 0.2); },
      cut() { hiss(500, 4200, 1.4, 0.26, 0.55); },
      stamp() { tone('sine', 140, 48, 0.2, 0.9); hiss(1800, 600, 0.8, 0.09, 0.5); },
      slash() { hiss(7000, 900, 2, 0.22, 0.6, 0, 'highpass'); tone('sawtooth', 880, 220, 0.18, 0.12); tone('sawtooth', 893, 230, 0.18, 0.1); },
    };
    const mark = () => { lastUser = Date.now(); };
    ['pointerdown', 'keydown'].forEach((e) => document.addEventListener(e, mark, true));
    return {
      get on() { return on; },
      set(v) { on = !!v; store.set('los-sfx', on ? '1' : '0'); if (on) { const c = ensure(); if (c && c.state === 'suspended') c.resume(); } },
      // userOnly: suona solo se il cambio arriva da un tocco o un tasto appena premuto (non dai cambi automatici)
      play(name, opt) {
        if (!on || !voices[name]) return;
        if (opt && opt.userOnly && Date.now() - lastUser > 700) return;
        const c = ensure(); if (!c) return; if (c.state === 'suspended') c.resume();
        const run = () => { try { voices[name](); } catch (e) { /* audio non disponibile */ } };
        if (opt && opt.at) setTimeout(run, opt.at); else run();
      },
    };
  })();

  function bindSfxButton() {
    const b = document.getElementById('sfxBtn'); if (!b) return;
    const show = () => { b.setAttribute('aria-pressed', SFX.on ? 'true' : 'false'); b.title = SFX.on ? 'Suoni accesi' : 'Suoni spenti'; };
    b.addEventListener('click', () => { SFX.set(!SFX.on); show(); SFX.play('confirm'); });
    show();
  }
  // conferma sui pulsanti principali
  document.addEventListener('click', (e) => { const b = e.target.closest && e.target.closest('.btn.primary'); if (b && !b.disabled) SFX.play('confirm'); }, true);

  /* ================= CURSORE DI SELEZIONE ================= */
  const BOX = '.steps, .seg';
  const SEL = ':scope > [aria-current="page"], :scope > [aria-pressed="true"]';
  const EASE = 'cubic-bezier(.16,1,.3,1)';
  function place(box, animate) {
    let cur = box.querySelector(':scope > .sel-cursor');
    if (!cur) { cur = document.createElement('span'); cur.className = 'sel-cursor'; cur.setAttribute('aria-hidden', 'true'); box.prepend(cur); }
    const sel = box.querySelector(SEL);
    if (!sel || !sel.offsetWidth) { box.classList.remove('has-cursor'); cur.__r = null; return; }
    const r = { left: sel.offsetLeft, top: sel.offsetTop, width: sel.offsetWidth, height: sel.offsetHeight };
    const px = (o) => ({ left: o.left + 'px', top: o.top + 'px', width: o.width + 'px', height: o.height + 'px' });
    const prev = cur.__r;
    const same = prev && prev.left === r.left && prev.top === r.top && prev.width === r.width && prev.height === r.height;
    Object.assign(cur.style, px(r)); cur.__r = r; box.classList.add('has-cursor');
    if (animate && prev && !same && !reduced() && cur.animate) {
      cur.getAnimations().forEach((a) => a.cancel());
      cur.animate([px(prev), px(r)], { duration: 210, easing: EASE });
      cur.animate([{ rotate: (r.left >= prev.left ? '-4deg' : '4deg') }, { rotate: '0deg' }], { duration: 300, easing: EASE });
    }
  }
  let pending = new Map(), raf = 0;
  const queue = (box, animate) => {
    pending.set(box, (pending.get(box) || false) || animate);
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; const p = pending; pending = new Map(); p.forEach((a, b) => b.isConnected && place(b, a)); });
  };
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver((es) => es.forEach((e) => queue(e.target, false))) : null;
  const watched = new WeakSet();
  const adopt = (box) => { if (!watched.has(box)) { watched.add(box); if (ro) ro.observe(box); } queue(box, false); };
  function scan(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.matches(BOX)) adopt(node);
    node.querySelectorAll(BOX).forEach(adopt);
  }
  function watchSelection() {
    scan(document.body);
    new MutationObserver((ms) => ms.forEach((m) => {
      if (m.type === 'attributes') {
        const box = m.target.parentElement; if (!box || !box.matches(BOX)) return;
        const isSel = m.target.getAttribute(m.attributeName) === 'true' || m.target.getAttribute(m.attributeName) === 'page';
        queue(box, true); if (isSel) SFX.play('move', { userOnly: true });
      } else m.addedNodes.forEach(scan);
    })).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-current', 'aria-pressed'] });
    const all = () => document.querySelectorAll(BOX).forEach((b) => queue(b, false));
    G.addEventListener('resize', all); G.addEventListener('hashchange', () => setTimeout(all, 50));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
  }

  /* ================= ASSET DIPINTI ================= */
  // forme, impatto e mezzitoni sono maschere: chiedono la stessa origine (o un data URI), come le pennellate di anim.js
  const FXA = (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {};
  const maskOk = (u) => !!u && (/^data:/.test(u) || (G.location && /^https?:$/.test(G.location.protocol)));
  const cssUrl = (u) => 'url("' + u + '")';
  function setupMasks() {
    const F = FXA.forme || {}, names = ['stella', 'freccia', 'fulmine', 'strappo', 'fascia'];
    const all = names.map((n) => F[n]).concat([FXA.impatto, FXA.mezzitoni]);
    if (!all.every(maskOk)) return;
    names.forEach((n) => root.style.setProperty('--fx-' + n, cssUrl(F[n])));
    root.style.setProperty('--fx-impatto', cssUrl(FXA.impatto));
    root.style.setProperty('--fx-mezzitoni', cssUrl(FXA.mezzitoni));
    root.classList.add('fx-forme');
  }
  // scelta stabile dentro un gruppo (volti, occhi, vincitori): stesso concorrente, stessa immagine; prima lo stesso genere
  function pickFor(group, g, key) {
    const all = Object.keys(group || {}); if (!all.length) return null;
    const gg = String(g || 'M').toLowerCase(), same = all.filter((k) => k[0] === gg), pool = same.length ? same : all;
    let h = 0; for (const c of String(key || '')) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return group[pool.sort()[h % pool.length]];
  }
  // un volto di riserva dentro un avatar senza foto
  function giveFace(av, group, cls) {
    if (!av || av.querySelector('img') || av.classList.contains('has-volto')) return;
    const u = pickFor(group, av.dataset.g, av.dataset.k || av.title); if (!u) return;
    const im = document.createElement('img'); im.className = cls; im.alt = ''; im.src = u; im.decoding = 'async';
    av.prepend(im); av.classList.add('has-volto');
  }
  const fondaleOf = (arena) => (FXA.fondali && arena && FXA.fondali[arena]) || null;
  // l'esito: fondale, mezzitoni, stella dietro il ritratto, volto e figura di riserva per chi vince senza foto
  function decorateWin(wh) {
    if (!wh || wh.__look) return; wh.__look = true;
    const f = fondaleOf(root.dataset.arena);
    if (f) { wh.style.setProperty('--fx-fondale-win', cssUrl(f)); const bg = document.createElement('div'); bg.className = 'fn-bg'; bg.setAttribute('aria-hidden', 'true'); wh.prepend(bg); wh.classList.add('has-fondale'); }
    if (root.classList.contains('fx-forme')) {
      const dots = document.createElement('i'); dots.className = 'fn-dots'; dots.setAttribute('aria-hidden', 'true'); wh.insertBefore(dots, wh.children[1] || null);
      const por = wh.querySelector('.fn-portrait'); if (por) { const st = document.createElement('i'); st.className = 'fn-star'; st.setAttribute('aria-hidden', 'true'); por.prepend(st); }
    }
    const av = wh.querySelector('.fn-portrait .av');
    if (av && !av.querySelector('img')) {
      giveFace(av, FXA.volti, 'volto');
      const u = pickFor(FXA.vincitori, av.dataset.g, av.dataset.k);
      if (u) { const fig = document.createElement('img'); fig.className = 'fn-figure'; fig.alt = ''; fig.src = u; fig.decoding = 'async'; fig.setAttribute('aria-hidden', 'true'); wh.appendChild(fig); wh.classList.add('has-figure'); }
    }
  }
  function watchWins() {
    const check = (n) => { if (n.nodeType !== 1) return; if (n.matches('.winhero.finale')) decorateWin(n); n.querySelectorAll && n.querySelectorAll('.winhero.finale').forEach(decorateWin); };
    check(document.body);
    new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(check))).observe(document.body, { subtree: true, childList: true });
  }

  /* ================= CUT-IN DEGLI OCCHI ================= */
  function cutin(host) {
    if (!host || !host.isConnected || reduced()) return;
    const av = host.querySelector('.fn-portrait .av'); if (!av) return;
    const img = av.querySelector('img:not(.volto)'), ini = (av.querySelector('.ini') || av).textContent.trim();
    host.querySelectorAll(':scope > .cutin').forEach((x) => x.remove());
    const el = document.createElement('div'); el.className = 'cutin'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<i class="ci-flash"></i>' + (root.classList.contains('fx-forme') ? '<i class="ci-bolt"></i>' : '') + '<div class="ci-band"><i class="ci-line t"></i><div class="ci-eyes"></div><i class="ci-line b"></i></div>';
    const eyes = el.querySelector('.ci-eyes'), reserve = !img && pickFor(FXA.occhi, av.dataset.g, av.dataset.k);
    // gli occhi stanno in un pannello 5:1 al centro della fascia: allargati a tutta la fascia diventerebbero una macchia
    const panel = (src, tint) => { const p = document.createElement('span'); p.className = 'ci-panel' + (tint ? ' tint' : ''); const im = document.createElement('img'); im.alt = ''; im.src = src; p.appendChild(im); eyes.appendChild(p); };
    if (img) panel(img.currentSrc || img.src, false);
    else if (reserve) panel(reserve, true);
    else { const s = document.createElement('b'); s.className = 'ci-ini'; s.textContent = ini; eyes.appendChild(s); }
    host.appendChild(el);
    SFX.play('slash'); SFX.play('stamp', { at: 140 });
    const end = () => el.remove();
    setTimeout(end, 1150);
    host.addEventListener('pointerdown', end, { once: true });
  }

  /* ================= AGGANCI A LOS_ANIM ================= */
  function wrap(name, fn) { const orig = AN[name]; if (typeof orig !== 'function') return; AN[name] = function () { fn.apply(this, arguments); return orig.apply(this, arguments); }; }
  wrap('wipe', () => { if (!reduced()) { SFX.play('cut'); SFX.play('stamp', { at: 230 }); } });
  wrap('card', (host, html, cls) => { if (reduced() || !host) return; SFX.play('cut'); SFX.play('stamp', { at: /stc-day|stc-cal/.test(cls || '') || /stc-cal/.test(html || '') ? 700 : 380 }); });
  function after(name, fn) { const orig = AN[name]; if (typeof orig !== 'function') return; AN[name] = function () { const r = orig.apply(this, arguments); try { fn.apply(this, arguments); } catch (e) { /* solo decorazione */ } return r; }; }
  // la lastra di tinta dello stacco prende il fondale dell'arena di arrivo
  after('wipe', (swap, opt) => {
    const st = document.querySelector('body > .stacco'); if (!st) return;
    const f = fondaleOf(opt && opt.arena);
    if (f) { root.style.setProperty('--fx-wf', cssUrl(f)); st.classList.add('has-fondale'); } else st.classList.remove('has-fondale');
  });
  // nel cartello dello scontro finale chi non ha foto riceve una fascia sugli occhi di riserva
  after('card', (host) => { if (host) host.querySelectorAll(':scope > .stc .stc-faces .av').forEach((av) => giveFace(av, FXA.occhi, 'volto')); });
  wrap('stage', (el, cls) => {
    if (cls !== 'fn-play' || reduced() || !el) return;
    // il cut-in arriva quando la rivelazione ha finito di entrare; un tocco che salta la regia lo annulla
    let skipped = false; const skip = () => { skipped = true; };
    el.addEventListener('pointerdown', skip, { once: true }); document.addEventListener('keydown', skip, { once: true });
    setTimeout(() => { el.removeEventListener('pointerdown', skip); document.removeEventListener('keydown', skip); if (!skipped && !(G.LOS_PALCO && G.LOS_PALCO.finale)) cutin(el); }, 1850); // con il palco la vittoria ha la sua sequenza a tutto schermo
  });

  function start() {
    syncInk();
    new MutationObserver(syncInk).observe(root, { attributes: true, attributeFilter: ['style', 'data-theme'] });
    setupMasks();
    bindSfxButton();
    watchSelection();
    watchWins();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  G.LOS_LOOK = { sfx: SFX, cutin, place, pickFor, fx: FXA };
})(typeof window !== 'undefined' ? window : globalThis);
