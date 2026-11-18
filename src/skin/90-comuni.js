/* Last One Standing — pelle · comuni: piccoli comportamenti condivisi.
 * - i cursori (input range) colorano la parte piena nella tinta (--fill);
 * - un suono leggero quando si apre un dialogo, se i suoni sono accesi. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const fill = (r) => {
    try {
      const min = parseFloat(r.min || 0), max = parseFloat(r.max || 100), v = parseFloat(r.value);
      r.style.setProperty('--fill', (((v - min) / (max - min || 1)) * 100).toFixed(1) + '%');
    } catch (e) { /* niente */ }
  };
  const scan = (root) => root.querySelectorAll && root.querySelectorAll('input[type="range"]').forEach(fill);
  document.addEventListener('input', (e) => { if (e.target && e.target.type === 'range') fill(e.target); }, true);
  function start() {
    scan(document);
    new MutationObserver((ms) => ms.forEach((m) => {
      if (m.type === 'attributes' && m.target.tagName === 'DIALOG' && m.target.open) { const L = G.LOS_LOOK; if (L && L.sfx) L.sfx.play('cut', { userOnly: true }); }
      m.addedNodes && m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.type === 'range') fill(n); else scan(n); } });
    })).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] });
    // i valori impostati dal codice (non dall'utente) non generano «input»: un controllo leggero ogni tanto
    setInterval(() => scan(document), 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
