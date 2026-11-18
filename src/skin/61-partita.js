/* ================= PELLE · LA PARTITA GIOCATA (regia) =================
 * I ganci grafici che partita.js e ui.js chiamano se esistono: window.LOS_PARTITA_FX = { card, bet, gift }.
 * - card: il cartello delle scelte entra come un evento (titolo parola per parola, scelte a cascata, ritratto grande);
 * - bet: quando una puntata si chiude cade un timbro vicino alla barra del giocatore;
 * - gift: una cassa col paracadute parte dal pulsante del dono verso il racconto.
 * In più, senza toccare ui.js: i crediti della barra contano quando cambiano e i numeri di «La tua partita»
 * nell'Esito contano alla prima comparsa.
 * Solo decorazione: ogni passo è protetto, niente blocca i comandi, tutto si toglie da solo. Con il movimento
 * ridotto non si muove niente. Gli stili sono in 60-partita.css. */
(function (G) {
  'use strict';
  const doc = G.document; if (!doc) return;
  const root = doc.documentElement;
  const LOOK = () => G.LOS_LOOK || {};
  const reduced = () => !!((G.LOS_ANIM && G.LOS_ANIM.reduced) || root.hasAttribute('data-reduced-motion'));
  const sfx = (n, o) => { try { const s = LOOK().sfx; if (s && s.play) s.play(n, o); } catch (e) { /* niente audio */ } };
  const h = (tag, cls, txt) => { const el = doc.createElement(tag); if (cls) el.className = cls; if (txt != null) el.textContent = txt; return el; };
  const safe = (fn) => { try { return fn(); } catch (e) { /* solo decorazione */ } };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fine = () => !!(G.matchMedia && G.matchMedia('(hover: hover) and (pointer: fine)').matches);

  /* ---------- 1 · il cartello ---------- */
  // il titolo entra parola per parola; il testo intero resta in aria-label
  function words(el) {
    if (!el || el.querySelector('.sc-w')) return;
    const text = el.textContent; if (!text.trim()) return;
    el.setAttribute('aria-label', text); el.textContent = '';
    let i = 0;
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(doc.createTextNode(' ')); return; }
      const w = h('span', 'sc-w', part); w.setAttribute('aria-hidden', 'true'); w.style.setProperty('--i', i++); el.appendChild(w);
    });
  }
  // ritratto grande: chi non ha una foto riceve un volto di riserva tinto (lo stesso che ha altrove), se ci sono
  function face(av) {
    if (!av || av.querySelector('img') || av.classList.contains('has-volto')) return;
    const fx = LOOK().fx || {}, pick = LOOK().pickFor; if (!pick || !fx.volti) return;
    const u = pick(fx.volti, av.dataset.g, av.dataset.k || av.title); if (!u) return;
    const im = h('img', 'volto'); im.alt = ''; im.decoding = 'async'; im.src = u;
    av.prepend(im); av.classList.add('has-volto');
  }
  function card(el, opts) {
    if (!el) return;
    const o = opts || {};
    // se arriva subito dopo un altro cartello aspetta che il colpo sulla scelta appena fatta si sia visto
    if (!reduced() && doc.querySelector('.sc.sc-out')) el.style.setProperty('--sc-d', '150ms');
    safe(() => el.querySelectorAll('.sc-opt').forEach((b, k) => b.style.setProperty('--k', o.grid ? Math.min(k, 22) : Math.min(k, 8))));
    if (/\bsc-(mentor|gift|interview)\b/.test(el.className)) safe(() => face(el.querySelector('.sc-faces .av')));
    if (!reduced()) safe(() => words(el.querySelector('.sc-t')));
    sfx('cut');
    // un soffio passando sulle scelte (solo mouse), la conferma quando si sceglie
    if (fine()) {
      let last = null;
      el.addEventListener('pointerover', (e) => { const b = e.target.closest && e.target.closest('.sc-opt:not(:disabled), .sc-stake button:not(:disabled)'); if (!b || b === last) return; last = b; sfx('hover'); });
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest && e.target.closest('.sc-opt, .sc-stake button, .sc-skip'); if (!b || b.disabled) return;
      sfx(b.classList.contains('sc-opt') ? 'confirm' : 'tick');
    });
  }

  /* ---------- 2 · la barra: i crediti contano ---------- */
  // la fascia sugli occhi al posto della sagoma, per chi non ha una foto (la stessa riserva dell'Esito)
  function eyes(av) {
    if (!av || av.querySelector('img') || av.classList.contains('has-volto')) return;
    const fx = LOOK().fx || {}, pick = LOOK().pickFor; if (!pick || !fx.occhi) return;
    const u = pick(fx.occhi, av.dataset.g, av.dataset.k || av.title); if (!u) return;
    const im = h('img', 'volto'); im.alt = ''; im.decoding = 'async'; im.src = u;
    av.prepend(im); av.classList.add('has-volto');
  }
  // ui.js riscrive la barra a ogni fase: il conteggio non sta sul nodo ma qui, e continua sul numero nuovo
  let hudMo = null, hudEl = null, cnt = null, cntRaf = 0, cntGuard = 0;
  const cntNow = (now) => { const k = clamp((now - cnt.t0) / cnt.dur, 0, 1); return k >= 1 ? cnt.to : Math.round(cnt.from + (cnt.to - cnt.from) * (1 - Math.pow(1 - k, 3))); };
  function cntEnd() {
    cancelAnimationFrame(cntRaf); clearTimeout(cntGuard);
    const b = hudEl && hudEl.querySelector('.pt-cr b');
    if (b && cnt) b.textContent = cnt.to;
    cnt = null; if (hudEl) hudEl.removeAttribute('aria-busy');
  }
  function cntStep(now) {
    if (!cnt) return;
    const b = hudEl && hudEl.querySelector('.pt-cr b');
    if (!b || reduced() || now - cnt.t0 >= cnt.dur) return cntEnd();
    b.textContent = cntNow(now); cntRaf = requestAnimationFrame(cntStep);
  }
  function countCredits(hud) {
    const b = hud.querySelector('.pt-cr b'); if (!b) return;
    const to = parseInt(b.textContent, 10); if (!Number.isFinite(to)) return;
    // una partita nuova non conta dal saldo della precedente
    const sameRun = hud.dataset.ptRun === (hud.dataset.run || '');
    const from = sameRun && hud.dataset.ptCr != null ? parseInt(hud.dataset.ptCr, 10) : NaN, now = performance.now();
    hud.dataset.ptCr = String(to); hud.dataset.ptRun = hud.dataset.run || '';
    // stessa cifra d'arrivo, barra ridisegnata: il conteggio in corso prosegue sul nodo nuovo
    if (cnt && cnt.to === to) { b.textContent = cntNow(now); b.parentNode.classList.add(cnt.to > cnt.from ? 'pt-up' : 'pt-down'); return; }
    if (!Number.isFinite(from) || from === to || reduced() || doc.hidden) { if (cnt) cntEnd(); return; }
    const start = cnt ? cntNow(now) : from;
    cancelAnimationFrame(cntRaf); clearTimeout(cntGuard);
    cnt = { from: start, to, t0: now, dur: clamp(Math.abs(to - start) * 14, 380, 900) };
    b.parentNode.classList.add(to > start ? 'pt-up' : 'pt-down');
    // mentre conta, i lettori di schermo aspettano il numero finale
    hud.setAttribute('aria-busy', 'true');
    b.textContent = start; cntRaf = requestAnimationFrame(cntStep);
    // se i fotogrammi non arrivano (scheda nascosta) il numero vero torna comunque
    cntGuard = setTimeout(cntEnd, cnt.dur + 400);
  }
  function watchHud() {
    const hud = doc.getElementById('ptHud');
    if (!hud || hud === hudEl) return;
    if (hudMo) hudMo.disconnect();
    hudEl = hud;
    const on = () => { if (hud.hidden) { if (cnt) cntEnd(); delete hud.dataset.ptCr; return; } safe(() => eyes(hud.querySelector('.pt-men .av'))); safe(() => countCredits(hud)); };
    // si guarda solo la riscrittura dell'interno, non i numeri che cambiano mentre contano
    hudMo = new MutationObserver(on);
    hudMo.observe(hud, { childList: true, attributes: true, attributeFilter: ['hidden'] });
    on();
  }

  /* ---------- 3 · il timbro della puntata ---------- */
  let stamps = 0;
  function bet(b, hud) {
    if (!b) return;
    const kind = b.esito === 'vinta' ? 'vinta' : b.esito === 'persa' ? 'persa' : 'nulla';
    const el = h('div', 'pt-stamp ' + kind); el.setAttribute('aria-hidden', 'true');
    const big = h('b', '', kind === 'vinta' ? 'Vinta' : kind === 'persa' ? 'Persa' : 'Annullata');
    if (kind === 'vinta') big.appendChild(h('i', '', '+' + b.vincita));
    else if (kind === 'persa') big.appendChild(h('i', '', '−' + b.posta));
    el.appendChild(big);
    if (b.testo) el.appendChild(h('small', '', b.testo));
    doc.body.appendChild(el);
    // sulla barra se si vede, altrimenti sotto l'intestazione; mai fuori dallo schermo
    const r = hud && !hud.hidden ? hud.getBoundingClientRect() : null, w = el.offsetWidth, hh = el.offsetHeight, vw = root.clientWidth, vh = G.innerHeight;
    const top = doc.querySelector('.top'), minY = (top ? Math.max(0, top.getBoundingClientRect().bottom) : 0) + 16;
    const visible = r && r.bottom > minY + 10 && r.top < vh - 120;
    // sopra il fondo della fascia, dove non c'è testo; un secondo timbro si sposta un po' più in là
    let x = visible ? r.right - w - 46 : vw - w - 28, y = visible ? r.top + (r.height - hh) / 2 : minY;
    x -= (stamps % 3) * 26; y += (stamps % 3) * 12;
    el.style.left = clamp(x, 14, Math.max(14, vw - w - 18)) + 'px';
    el.style.top = clamp(y, minY, Math.max(minY, vh - hh - 150)) + 'px';
    stamps++;
    sfx(kind === 'vinta' ? 'stamp' : 'tick');
    setTimeout(() => { el.remove(); stamps = Math.max(0, stamps - 1); }, reduced() ? 2200 : 2320);
  }

  /* ---------- 4 · il lancio del dono ---------- */
  const NOMI = { cibo: 'Provviste', med: 'Medicine', arma: 'Arma', armatura: 'Protezione', attrezzo: 'Attrezzi', mappa: 'Mappa', amuleto: 'Portafortuna' };
  const CASSA = '<svg viewBox="0 0 96 112" aria-hidden="true"><g class="pd-chute">' +
    '<path class="pd-k" d="M6 44C8 18 26 4 48 4s40 14 42 40c-7-6-14-6-21 0-7-6-14-6-21 0-7-6-14-6-21 0-7-6-14-6-21 0z"/>' +
    '<path class="pd-p" d="M27 44C28 22 36 8 48 4c12 4 20 18 21 40-7-6-14-6-21 0-7-6-14-6-21 0z" opacity=".9"/>' +
    '<path class="pd-l" d="M6 44C8 18 26 4 48 4s40 14 42 40c-7-6-14-6-21 0-7-6-14-6-21 0-7-6-14-6-21 0-7-6-14-6-21 0z"/>' +
    '<path class="pd-lp" d="M6 44 34 78M27 44l11 34M69 44 58 78M90 44 62 78"/></g>' +
    '<g class="pd-box"><path class="pd-p" d="M26 76h44v32H26z"/><path class="pd-k" d="M26 88h44v8H26z"/><path class="pd-v" d="M44 76h8v32h-8z"/><path class="pd-l" d="M26 76h44v32H26z"/></g></svg>';
  function gift(t, kind, btn) {
    if (btn) { btn.classList.remove('pt-sent'); void btn.offsetWidth; btn.classList.add('pt-sent'); setTimeout(() => btn.classList.remove('pt-sent'), 600); }
    if (reduced() || !btn || !doc.body.animate) return;
    const b = btn.getBoundingClientRect(); if (!b.width) return;
    const vw = root.clientWidth, vh = G.innerHeight;
    // verso il racconto: l'ultima riga visibile della diretta, o il centro della colonna
    const rows = [...doc.querySelectorAll('#v-diretta .ev')].map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.bottom > 90 && r.top < b.top - 60);
    const last = rows[rows.length - 1];
    const tx = clamp(last ? last.left + last.width * 0.5 : vw / 2, 70, vw - 70), ty = clamp(last ? last.bottom + 6 : vh * 0.42, 150, Math.max(150, b.top - 90));
    const sx = b.left + b.width / 2, sy = b.top + 6, mx = sx + (tx - sx) * 0.45, my = Math.min(sy, ty) - Math.min(120, vh * 0.16);
    const el = h('div', 'pt-drop'); el.setAttribute('aria-hidden', 'true');
    const inn = h('div', 'pt-drop-in'); inn.innerHTML = CASSA;
    inn.appendChild(h('span', 'pd-tag', NOMI[kind] || 'Dono'));
    el.appendChild(inn); doc.body.appendChild(el);
    const T = 940;
    safe(() => {
      el.animate([
        { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(.25) rotate(-22deg)', opacity: 0, offset: 0, easing: 'cubic-bezier(.3,.5,.4,1)' },
        { opacity: 1, offset: 0.1 },
        { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1.08) rotate(10deg)', offset: 0.42, easing: 'cubic-bezier(.4,0,.6,1)' },
        { transform: 'translate(' + (tx + (mx - tx) * 0.2) + 'px,' + (ty - 26) + 'px) scale(1) rotate(-6deg)', offset: 0.74, easing: 'cubic-bezier(.3,0,.5,1)' },
        { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(0deg)', opacity: 1, offset: 0.86 },
        { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1.06, .9) rotate(0deg)', opacity: 1, offset: 0.92 },
        { transform: 'translate(' + tx + 'px,' + (ty + 4) + 'px) scale(.9) rotate(0deg)', opacity: 0, offset: 1 },
      ], { duration: T, easing: 'linear', fill: 'both' });
      // il paracadute si apre in volo e si affloscia all'arrivo
      const chute = el.querySelector('.pd-chute');
      if (chute) chute.animate([{ transform: 'scale(.2, .1)', offset: 0 }, { transform: 'scale(1.1, 1.05)', offset: 0.3 }, { transform: 'scale(1, 1)', offset: 0.45 }, { transform: 'scale(1, 1)', offset: 0.84 }, { transform: 'scale(1.15, .2)', offset: 1 }], { duration: T, fill: 'both' });
    });
    sfx('move');
    setTimeout(() => el.remove(), T + 80);
  }

  /* ---------- 6 · «La tua partita»: i numeri contano alla prima comparsa ---------- */
  function countStat(b, delay) {
    const text = b.textContent, nums = text.match(/\d+/g); if (!nums || !nums.some((n) => +n > 0)) return;
    const parts = text.split(/(\d+)/), t0 = performance.now() + delay, dur = 900;
    const draw = (e) => { b.textContent = parts.map((p) => (/^\d+$/.test(p) ? String(Math.round(+p * e)) : p)).join(''); };
    const step = (now) => {
      if (!b.isConnected) return;
      const k = clamp((now - t0) / dur, 0, 1);
      if (k >= 1 || reduced()) { b.textContent = text; return; }
      draw(1 - Math.pow(1 - k, 3)); requestAnimationFrame(step);
    };
    // lo zero si scrive solo dentro un fotogramma: se la scheda non ne compone, resta il numero vero
    requestAnimationFrame((now) => { draw(0); step(now); });
    setTimeout(() => { if (b.isConnected) b.textContent = text; }, delay + dur + 500);
  }
  let sumStop = null;
  function summary() {
    const s = doc.getElementById('playerSummary'); if (!s || s.__pt) return; s.__pt = true;
    if (sumStop) { sumStop(); sumStop = null; }
    s.querySelectorAll('.ps-st').forEach((st, k) => st.style.setProperty('--k', k));
    safe(() => eyes(s.querySelector('.ps-men .av')));
    if (reduced()) return;
    // niente IntersectionObserver (in una scheda che non compone fotogrammi non avvisa): si misura allo scorrimento
    let off = false; const born = Date.now(), body = doc.getElementById('resBody');
    const go = () => {
      if (off || !s.isConnected) { stop(); return; }
      // la sequenza di vittoria copre tutto: si aspetta che se ne vada (es-go lo mette 50-esito.js; dopo 8 secondi si parte comunque)
      if (Date.now() - born < 8000 && (doc.querySelector('body > .pf') || (body && body.classList.contains('es-on') && !body.classList.contains('es-go')))) return;
      const r = s.getBoundingClientRect(); if (!r.height || r.top > G.innerHeight * 0.9 || r.bottom < 0) return;
      stop(); s.classList.add('ps-go');
      s.querySelectorAll('.ps-st b').forEach((b, k) => countStat(b, 120 + k * 70));
    };
    const stop = () => { off = true; G.removeEventListener('scroll', go, true); G.removeEventListener('resize', go); clearInterval(beat); };
    G.addEventListener('scroll', go, { capture: true, passive: true }); G.addEventListener('resize', go);
    const beat = setInterval(go, 400);
    sumStop = stop; setTimeout(go, 90); // dopo che 50-esito.js e il palco hanno preparato la scena
  }
  function watchEsito() {
    const body = doc.getElementById('resBody'); if (!body || body.__pt) return; body.__pt = true;
    new MutationObserver(() => safe(summary)).observe(body, { childList: true });
    safe(summary);
  }

  function boot() { safe(watchHud); safe(watchEsito); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
  G.LOS_PARTITA_FX = { card(el, o) { safe(watchHud); safe(() => card(el, o)); }, bet(b, hud) { safe(watchHud); safe(() => bet(b, hud)); }, gift(t, k, btn) { safe(() => gift(t, k, btn)); } };
})(typeof window !== 'undefined' ? window : globalThis);
