/* Last One Standing — il «look»: le parti del nuovo aspetto che chiedono codice.
 * - colore del testo sopra la tinta piena dell'arena (--key-ink), scelto per contrasto;
 * - il cursore di selezione che scivola tra le voci di navigazione e dei segmenti;
 * - il cut-in degli occhi di chi vince, alla fine della rivelazione dell'esito;
 * - l'audio: un piccolo mixer WebAudio con gli effetti del sito e la musica di sottofondo (vedi SUONI E MUSICA).
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

  /* ================= SUONI E MUSICA =================
   * Un piccolo mixer WebAudio:
   *   effetti (campioni + sintesi) ─► busFx ───────────────────────┐
   *   musica (elemento <audio>) ─► passa-basso ─► busMusica ────────┼─► master ─► limitatore ─► uscita
   * - i campioni stanno in assets/audio (generati per il sito, vedi ASSETS.md), già normalizzati in fase di preparazione;
   *   qui ognuno ha il suo livello e, dove serve, un'intonazione diversa: lo stesso clic, più grave, diventa un timbro;
   * - la musica di sottofondo parte al primo gesto (i browser non lasciano partire l'audio da soli), entra in
   *   dissolvenza e gira in loop sotto tutto il resto, bassa; sotto i momenti forti (eliminazione, disastro, scontro
   *   finale, vittoria) si abbassa e si scurisce, poi torna; si ferma quando la scheda non si vede;
   * - i fruscii degli stacchi restano sintetizzati: non c'è un campione adatto.
   * Due interruttori nell'intestazione: tutto l'audio (los-sfx) e la sola musica (los-music). Acceso di default. */
  const AUD = (G.LOS_ASSETS && G.LOS_ASSETS.audio) || {};
  const SFX = (() => {
    let ctx = null, master = null, busFx = null, busMus = null, musLP = null, on = store.get('los-sfx') !== '0', lastUser = 0;
    let musicOn = store.get('los-music') !== '0', musicEl = null, musicStarted = false;
    const MUSIC = 0.2; // livello della musica: circa −30 LUFS, sotto i suoni e sotto la lettura
    const bufs = {}, active = new Set(); // le sorgenti che stanno suonando: spegnendo l'audio si fermano subito
    const ensure = () => {
      if (ctx) return ctx;
      const C = G.AudioContext || G.webkitAudioContext; if (!C) return null;
      ctx = new C();
      const lim = ctx.createDynamicsCompressor(); // limitatore morbido: i momenti forti non saturano mai
      lim.threshold.value = -10; lim.knee.value = 8; lim.ratio.value = 8; lim.attack.value = 0.003; lim.release.value = 0.18;
      master = ctx.createGain(); master.gain.value = 0.9; master.connect(lim).connect(ctx.destination);
      busFx = ctx.createGain(); busFx.gain.value = 1; busFx.connect(master);
      musLP = ctx.createBiquadFilter(); musLP.type = 'lowpass'; musLP.frequency.value = 18000; musLP.Q.value = 0.5;
      busMus = ctx.createGain(); busMus.gain.value = 0; musLP.connect(busMus).connect(master);
      // i campioni si decodificano una volta sola, in sottofondo
      Object.keys(AUD.sfx || {}).forEach((k) => {
        fetch(AUD.sfx[k]).then((r) => r.arrayBuffer()).then((a) => new Promise((ok, ko) => ctx.decodeAudioData(a, ok, ko))).then((b) => { bufs[k] = b; }).catch(() => { /* resta la sintesi */ });
      });
      return ctx;
    };
    // un campione nel bus degli effetti: livello, intonazione, porzione (offset/dur) e coda sfumata
    function sample(name, o) {
      const b = bufs[name]; if (!b) return false;
      o = o || {};
      const t = ctx.currentTime, s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = b; s.playbackRate.value = o.rate || 1; g.gain.value = o.gain == null ? 1 : o.gain;
      let tail = g;
      if (o.lp) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; g.connect(f); tail = f; }
      s.connect(g); tail.connect(busFx);
      active.add(s); s.onended = () => { active.delete(s); try { s.disconnect(); g.disconnect(); } catch (e) { /* già staccata */ } };
      if (o.dur) { g.gain.setValueAtTime(g.gain.value, t + Math.max(0, o.dur - (o.fade || 0.08))); g.gain.linearRampToValueAtTime(0, t + o.dur); s.start(t, o.offset || 0, o.dur + 0.02); } else s.start(t, o.offset || 0);
      return true;
    }
    // la musica si fa da parte: scende al livello dato (e si scurisce), resta giù per «hold» secondi, poi torna
    let duckUntil = 0;
    function duck(level, hold, dark) {
      if (!ctx || !musicStarted) return;
      const t = ctx.currentTime, end = t + hold;
      duckUntil = Math.max(duckUntil, end);
      busMus.gain.cancelScheduledValues(t); busMus.gain.setTargetAtTime(MUSIC * level, t, 0.05);
      musLP.frequency.cancelScheduledValues(t); musLP.frequency.setTargetAtTime(dark || 18000, t, 0.06);
      busMus.gain.setTargetAtTime(MUSIC * level, duckUntil - 0.01, 0.05);
      busMus.gain.setTargetAtTime(MUSIC, duckUntil, 0.45);
      musLP.frequency.setTargetAtTime(18000, duckUntil, 0.5);
    }
    function startMusic() {
      if (musicStarted || !on || !musicOn || !AUD.music || !ensure()) return;
      if (!musicEl) {
        musicEl = new Audio(); musicEl.src = AUD.music; musicEl.loop = true; musicEl.preload = 'auto';
        try { ctx.createMediaElementSource(musicEl).connect(musLP); } catch (e) { musicEl = null; return; }
      }
      const p = musicEl.play();
      musicStarted = true;
      const t = ctx.currentTime; busMus.gain.cancelScheduledValues(t); busMus.gain.setValueAtTime(0, t); busMus.gain.linearRampToValueAtTime(MUSIC, t + 3.5);
      if (p && p.catch) p.catch(() => { musicStarted = false; });
    }
    function stopMusic(fast) {
      if (!musicEl || !musicStarted) return;
      musicStarted = false;
      const t = ctx.currentTime; busMus.gain.cancelScheduledValues(t); busMus.gain.setTargetAtTime(0, t, fast ? 0.05 : 0.3);
      setTimeout(() => { if (!musicStarted && musicEl) musicEl.pause(); }, fast ? 250 : 1400);
    }
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
    // ogni voce usa il campione se è pronto, altrimenti la sintesi di prima; la riga dice cosa suona e dove
    const jit = () => 0.97 + Math.random() * 0.06; // un filo di variazione: lo stesso suono ripetuto non stanca
    const voices = {
      hover() { sample('hover', { gain: 0.22, rate: jit() }); },                                              // passaggio su un comando
      move() { sample('hover', { gain: 0.42, rate: 1.12 * jit() }) || tone('square', 1500, 950, 0.035, 0.12); },  // il cursore che scivola
      tick() { sample('tick', { gain: 0.26, rate: jit(), dur: 0.26, fade: 0.12 }) || tone('triangle', 1050, 1050, 0.06, 0.15); }, // comandi secondari
      confirm() { if (!sample('click', { gain: 0.62, rate: jit() })) { tone('triangle', 660, 660, 0.07, 0.35); tone('triangle', 990, 990, 0.12, 0.3, 0.06); } }, // comandi principali
      cut() { hiss(500, 4200, 1.4, 0.26, 0.42); },                                                              // fruscio degli stacchi
      // il timbro: il clic due ottave sotto, sopra un tonfo sintetico
      stamp() { tone('sine', 140, 48, 0.2, 0.75); sample('click', { gain: 0.7, rate: 0.48, lp: 2600 }) || hiss(1800, 600, 0.8, 0.09, 0.5); },
      // la lama: un fruscio acuto più l'attacco del colpo stilizzato, accorciato
      slash() { hiss(7000, 900, 2, 0.22, 0.45, 0, 'highpass'); sample('battle', { gain: 0.5, rate: 1.08, dur: 0.6, fade: 0.25 }) || tone('sawtooth', 880, 220, 0.18, 0.12); },
      kill() { (sample('heavy', { gain: 0.72 }) || voices.stamp()); duck(0.3, 2.2, 1400); },                // eliminazione
      disaster() { (sample('battle', { gain: 0.7 }) || voices.stamp()); duck(0.3, 3, 1100); },               // disastro
      finale() { (sample('heavy', { gain: 0.68, rate: 0.84 }) || voices.stamp()); duck(0.32, 3.2, 1200); },  // scontro finale
      victory() { (sample('jazz', { gain: 0.66 }) || voices.confirm()); duck(0.12, 5.6, 900); },             // vittoria
    };
    const mark = () => { lastUser = Date.now(); };
    ['pointerdown', 'keydown'].forEach((e) => document.addEventListener(e, mark, true));
    // il primo gesto sblocca l'audio: da lì parte la musica
    const unlock = (e) => {
      if (!on || (e && e.isTrusted === false)) return; // solo un gesto vero sblocca l'audio
      const c = ensure(); if (!c) return;
      const go = () => startMusic();
      if (c.state === 'suspended') c.resume().then(go, () => {}); else go();
    };
    ['pointerdown', 'keydown', 'touchend'].forEach((e) => document.addEventListener(e, unlock, true));
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) { stopMusic(true); ctx.suspend && ctx.suspend(); }
      else if (on) { ctx.resume().then(() => startMusic(), () => {}); }
    });
    return {
      get on() { return on; },
      get musicOn() { return musicOn; },
      get hasMusic() { return !!AUD.music; },
      set(v) {
        on = !!v; store.set('los-sfx', on ? '1' : '0');
        if (on) { const c = ensure(); if (c && c.state === 'suspended') c.resume(); startMusic(); }
        else { stopMusic(true); active.forEach((x) => { try { x.stop(); } catch (e) { /* già finita */ } }); active.clear(); }
      },
      setMusic(v) { musicOn = !!v; store.set('los-music', musicOn ? '1' : '0'); if (musicOn) startMusic(); else stopMusic(); },
      duck,
      // per le prove: lo stato del mixer, senza toccarlo
      state: () => ({ ctx: ctx && ctx.state, buffers: Object.keys(bufs), musicGain: busMus && +busMus.gain.value.toFixed(3), lowpass: musLP && Math.round(musLP.frequency.value),
        music: musicEl && { playing: !musicEl.paused, t: +musicEl.currentTime.toFixed(1), ready: musicEl.readyState, loop: musicEl.loop } }),
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
    const b = document.getElementById('sfxBtn'), m = document.getElementById('musicBtn');
    const show = () => {
      if (b) { b.setAttribute('aria-pressed', SFX.on ? 'true' : 'false'); b.title = SFX.on ? 'Audio acceso' : 'Audio spento'; }
      if (m) {
        m.hidden = !SFX.hasMusic; m.disabled = !SFX.on;
        m.setAttribute('aria-pressed', SFX.on && SFX.musicOn ? 'true' : 'false');
        m.title = !SFX.on ? 'Musica (audio spento)' : SFX.musicOn ? 'Musica accesa' : 'Musica spenta';
      }
    };
    if (b) b.addEventListener('click', () => { SFX.set(!SFX.on); show(); SFX.play('confirm'); });
    if (m) m.addEventListener('click', () => { SFX.setMusic(!SFX.musicOn); show(); SFX.play('tick'); });
    show();
  }
  // il mixaggio dei comandi: conferma sui principali, un rintocco leggero sui secondari, un soffio al passaggio.
  // Navigazione e segmenti hanno già il loro suono (lo stacco, il cursore che scivola).
  const OWN = '.steps a, .seg button, #sfxBtn, #musicBtn';
  const SECONDARY = '.btn, .iconbtn, [role="tab"], summary, .chip, .poster-card, .tile, .av[data-prof], .pbtn';
  document.addEventListener('click', (e) => {
    const t = e.target.closest && e.target.closest('.btn.primary, ' + SECONDARY); if (!t || t.disabled || t.closest(OWN)) return;
    SFX.play(t.matches('.btn.primary') ? 'confirm' : 'tick');
  }, true);
  if (G.matchMedia && G.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let lastHover = null, lastAt = 0;
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest && e.target.closest('.btn, .iconbtn, .steps a, [role="tab"], .poster-card, .tile, .pbtn');
      if (!t || t === lastHover || t.disabled) return;
      lastHover = t; const now = Date.now(); if (now - lastAt < 70) return; lastAt = now;
      SFX.play('hover');
    }, true);
    document.addEventListener('pointerout', (e) => { if (lastHover && !lastHover.contains(e.relatedTarget)) lastHover = null; }, true);
  }

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
  /* ritagli che sfumano: le figure di Midjourney toccano spesso i bordi dell'immagine (a destra, in basso, a volte a
   * sinistra) e lì il ritaglio è una linea dritta. Si misura su una miniatura quanta figura tocca ciascun bordo e si
   * sfuma solo quel lato, tanto più quanto più è pieno; i lati già trasparenti restano intatti. */
  const featherCache = new Map();
  function measureEdges(img) {
    const w = 48, h = Math.max(8, Math.round((48 * img.naturalHeight) / img.naturalWidth));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, w, h);
    const a = g.getImageData(0, 0, w, h).data, at = (x, y) => a[(y * w + x) * 4 + 3];
    // due pixel di profondità: il bordo antialiasato della miniatura non conta come vuoto
    const cov = (n, f) => { let k = 0; for (let i = 0; i < n; i++) if (f(i) > 96) k++; return k / n; };
    return {
      t: cov(w, (x) => Math.max(at(x, 0), at(x, 1))), b: cov(w, (x) => Math.max(at(x, h - 1), at(x, h - 2))),
      l: cov(h, (y) => Math.max(at(0, y), at(1, y))), r: cov(h, (y) => Math.max(at(w - 1, y), at(w - 2, y))),
    };
  }
  function feather(img) {
    if (!img) return;
    const apply = () => {
      try {
        let e = featherCache.get(img.src); if (!e) { e = measureEdges(img); featherCache.set(img.src, e); }
        const side = (cv, base, k) => (cv > 0.03 ? base + k * Math.min(1, cv) : 0).toFixed(1) + '%';
        img.style.setProperty('--fl', side(e.l, 12, 18)); img.style.setProperty('--fr', side(e.r, 12, 18));
        img.style.setProperty('--ft', side(e.t, 6, 10)); img.style.setProperty('--fb', side(e.b, 8, 14));
      } catch (err) { /* immagine non leggibile (file locale): restano le sfumature generiche del foglio di stile */ }
      img.classList.add('feather');
    };
    if (img.complete && img.naturalWidth) apply(); else img.addEventListener('load', apply, { once: true });
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
      if (u) { const fig = document.createElement('img'); fig.className = 'fn-figure'; fig.alt = ''; fig.src = u; fig.decoding = 'async'; fig.setAttribute('aria-hidden', 'true'); wh.appendChild(fig); wh.classList.add('has-figure'); feather(fig); }
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
  // (gli stacchi hanno i loro suoni in regia.js, che sostituisce LOS_ANIM.wipe)
  // i cartelli piccoli della diretta: se il palco li trasforma in un cartello a tutto schermo, suona quello e non questo
  wrap('card', (host, html, cls) => {
    if (reduced() || !host) return;
    setTimeout(() => { if (document.querySelector('body > .pb')) return; SFX.play('cut'); SFX.play('stamp', { at: /stc-day|stc-cal/.test(cls || '') || /stc-cal/.test(html || '') ? 680 : 360 }); }, 20);
  });
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

  G.LOS_LOOK = { sfx: SFX, cutin, place, pickFor, feather, fx: FXA };
})(typeof window !== 'undefined' ? window : globalThis);
