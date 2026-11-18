/* PELLE · DIRETTA: piccole decorazioni che il solo CSS non può fare, senza toccare ui.js.
 *  - la linea di avanzamento sul controller (--dx-prog), solo se la durata totale non è nascosta;
 *  - il cambio di piano del pannello laterale quando si cambia scheda (classe .dx-swap, con la direzione);
 *  - i suggerimenti dei tasti sui comandi di riproduzione.
 * Tutto è decorazione: ogni passo è protetto e non fa nulla se l'elemento atteso manca. */
(function (G) {
  'use strict';
  if (!G.document) return;
  const D = G.document;
  const safe = (fn) => function () { try { return fn.apply(this, arguments); } catch (e) { /* solo decorazione */ } };
  const reduced = () => D.documentElement.hasAttribute('data-reduced-motion') || (G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // «Fase 7 di 31» → 7/31; con le fasi future nascoste («Fase 7») la linea resta spenta
  const progress = safe(() => {
    const p = D.getElementById('bcPhase'), bar = D.querySelector('#v-diretta .playerin'); if (!p || !bar) return;
    const m = p.textContent.match(/(\d+)\D+(\d+)/);
    if (m && +m[2] > 0) bar.style.setProperty('--dx-prog', Math.max(0, Math.min(1, +m[1] / +m[2])).toFixed(4)); else bar.style.removeProperty('--dx-prog');
  });

  // cambio di scheda: il contenuto entra dal lato verso cui ci si sposta
  let lastTab = null, swapTimer = 0;
  const tabs = safe(() => {
    const all = [...D.querySelectorAll('#v-diretta .stabs [role="tab"]')], body = D.getElementById('sideBody'); if (!all.length || !body) return;
    const now = all.findIndex((b) => b.getAttribute('aria-selected') === 'true'); if (now < 0) return;
    if (lastTab != null && now !== lastTab && !reduced()) {
      body.style.setProperty('--dx-dir', now > lastTab ? '1' : '-1');
      body.classList.remove('dx-swap'); void body.offsetWidth; body.classList.add('dx-swap');
      clearTimeout(swapTimer); swapTimer = setTimeout(() => body.classList.remove('dx-swap'), 420);
    }
    lastTab = now;
  });

  /* i momenti della partita: a ogni riga appena entrata (.ev.in) si aggiunge uno strato di effetti, disegnato e
   * temporizzato nel CSS (40-diretta.css, sezione 8) con lo stesso ritardo --d della riga. Non cambia il contenuto,
   * non sposta niente, non aggiunge attese e si toglie da solo a effetto finito; con il movimento ridotto non viene nemmeno creato. */
  const rnd = (a, b) => Math.round(a + Math.random() * (b - a));
  const LAYERS = {
    kill: () => '<i class="k-tone"></i><i class="k-ghost"></i><i class="k-line"></i><i class="k-frame"></i>' + [0, 1, 2, 3].map(() => '<b class="k-chip" style="top:' + rnd(22, 72) + '%;--x:' + rnd(22, 110) + 'px;--y:' + rnd(-44, 44) + 'px;--r:' + rnd(-170, 170) + 'deg"></b>').join(''),
    death: () => '<i class="d-blind"></i><i class="d-flat"></i><i class="d-blip"></i>' + [0, 1, 2, 3].map((i) => '<b class="d-ash" style="left:' + rnd(8 + i * 22, 24 + i * 22) + 'px;--y:' + rnd(-70, -34) + 'px;--r:' + rnd(-120, 120) + 'deg"></b>').join(''),
    betray: () => '<i class="b-half a"></i><i class="b-half b"></i><i class="b-tear"></i>',
    gift: () => '<i class="g-beam"></i><i class="g-drop"></i>' + [[18, 22], [74, 58], [46, 12]].map((p) => '<b class="g-star" style="left:calc(var(--sp) * ' + (p[0] / 100) + ' + ' + rnd(-6, 26) + 'px);top:' + (p[1] + rnd(-6, 6)) + '%"></b>').join(''),
    mentor: () => '<i class="m-band"></i><i class="m-run"></i>',
    regia: () => '<i class="r-clap"></i><i class="r-run"></i>',
  };
  const kindOf = (r) => { const c = r.classList; return c.contains('ev-regia') ? 'regia' : c.contains('fx-kill') ? 'kill' : c.contains('fx-death') ? 'death' : c.contains('fx-betray') ? 'betray' : c.contains('fx-sponsor') || c.contains('ev-dono') ? 'gift' : c.contains('ev-mentor') ? 'mentor' : null; };
  const moments = safe((rows) => {
    if (reduced()) return;
    rows.forEach((r) => {
      if (!r.classList || !r.classList.contains('ev') || !r.classList.contains('in') || r.querySelector(':scope > .dx-fx')) return;
      const k = kindOf(r); if (!k) return;
      const fx = D.createElement('i'); fx.className = 'dx-fx dx-fx-' + k + (r.classList.contains('ev-ko') ? ' ko' : ''); fx.setAttribute('aria-hidden', 'true'); fx.innerHTML = LAYERS[k]();
      r.appendChild(fx);
      // nessun timer: lo strato si toglie da solo quando l'ultimo dei suoi pezzi ha finito
      fx.addEventListener('animationend', () => { if (!fx.getAnimations({ subtree: true }).some((a) => a.playState !== 'finished')) fx.remove(); });
    });
  });

  const hints = safe(() => {
    const set = (id, t) => { const b = D.getElementById(id); if (b && !b.title) b.title = t; };
    set('prevBtn', 'Fase precedente (freccia sinistra)'); set('nextBtn', 'Avanti (freccia destra)'); set('playBtn', 'Riproduci o metti in pausa (barra spaziatrice)');
  });

  const start = safe(() => {
    const ph = D.getElementById('bcPhase'), st = D.querySelector('#v-diretta .stabs');
    if (typeof MutationObserver === 'undefined') return;
    if (ph) { new MutationObserver(progress).observe(ph, { childList: true, characterData: true, subtree: true }); progress(); }
    if (st) { new MutationObserver(tabs).observe(st, { attributes: true, subtree: true, attributeFilter: ['aria-selected'] }); tabs(); }
    const feed = D.getElementById('phBody');
    if (feed) new MutationObserver((ms) => { const rows = []; ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1 && n.parentNode === feed) rows.push(n); })); if (rows.length) moments(rows); }).observe(feed, { childList: true });
    hints();
  });
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
