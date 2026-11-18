/* Last One Standing — pelle · concorrenti: la regia che il solo CSS non può fare.
 * - quando la sezione entra (ui.js mette «castenter» sull'elenco) anche strumenti e numeri arrivano a strati,
 *   e il conto dei concorrenti sale da zero;
 * - quando editor o scheda si aprono, il contenuto entra a strati una volta sola (non a ogni ridisegno).
 * Non tocca il markup delle lastre: ui.js le aggiorna sul posto e toglierebbe ogni nodo aggiunto. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
  const reduced = () => { try { return !!(G.LOS_ANIM && G.LOS_ANIM.reduced); } catch (e) { return false; } };
  const flag = (el, cls, ms) => {
    el.classList.add(cls); clearTimeout(el['_' + cls]);
    el['_' + cls] = setTimeout(() => el.classList.remove(cls), ms);
  };
  function start() {
    try {
      const view = document.getElementById('v-cast'), list = document.getElementById('castList');
      if (view && list) {
        let had = false;
        new MutationObserver(() => {
          const on = list.classList.contains('castenter');
          if (on && !had && !reduced()) {
            flag(view, 'ck-enter', 1100);
            try {
              const b = view.querySelector('#ovStats .ovs:first-child b'), n = b && parseInt(b.textContent, 10);
              if (b && n > 0 && G.LOS_ANIM && G.LOS_ANIM.countTo) G.LOS_ANIM.countTo(b, n, { from: 0, dur: 620 });
            } catch (e) { /* il numero resta fermo */ }
          }
          had = on;
        }).observe(list, { attributes: true, attributeFilter: ['class'] });
      }
      ['editDlg', 'profDlg'].forEach((id) => {
        const d = document.getElementById(id); if (!d) return;
        new MutationObserver(() => { if (d.open && !reduced()) flag(d, 'ck-opening', 900); else d.classList.remove('ck-opening'); })
          .observe(d, { attributes: true, attributeFilter: ['open'] });
      });
    } catch (e) { /* la sezione funziona anche senza questa regia */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
