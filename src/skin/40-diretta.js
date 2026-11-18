/* PELLE · DIRETTA: piccole decorazioni che il solo CSS non può fare, senza toccare ui.js.
 *  - il numero del giorno accanto a ogni gruppo della linea dei giorni (calendario a numeri grandi);
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

  // «Giorno 3», «Notte 12», «Turno 2»: il numero finale dell'etichetta diventa il numero grande del gruppo
  const days = safe(() => {
    D.querySelectorAll('#timeline .tday').forEach((g) => {
      if (g.hasAttribute('data-n')) return;
      const l = g.querySelector('.tdl'); if (!l) return;
      const m = l.textContent.match(/(\d+)\s*$/);
      if (m) g.setAttribute('data-n', m[1]); else if (g.classList.contains('tfin')) g.setAttribute('data-n', 'F');
    });
  });

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

  const hints = safe(() => {
    const set = (id, t) => { const b = D.getElementById(id); if (b && !b.title) b.title = t; };
    set('prevBtn', 'Fase precedente (freccia sinistra)'); set('nextBtn', 'Avanti (freccia destra)'); set('playBtn', 'Riproduci o metti in pausa (barra spaziatrice)');
  });

  const start = safe(() => {
    const tl = D.getElementById('timeline'), ph = D.getElementById('bcPhase'), st = D.querySelector('#v-diretta .stabs');
    if (typeof MutationObserver === 'undefined') return;
    if (tl) { new MutationObserver(days).observe(tl, { childList: true }); days(); }
    if (ph) { new MutationObserver(progress).observe(ph, { childList: true, characterData: true, subtree: true }); progress(); }
    if (st) { new MutationObserver(tabs).observe(st, { attributes: true, subtree: true, attributeFilter: ['aria-selected'] }); tabs(); }
    hints();
  });
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
