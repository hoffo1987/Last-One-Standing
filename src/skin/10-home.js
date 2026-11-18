/* Last One Standing — pelle · home: il titolo diviso in due lastre.
 * «Chi resterà<br>in piedi?» diventa due righe separate, così il CSS le mette su carta e su tinta.
 * Il testo resta lo stesso e il titolo conserva il suo nome per i lettori di schermo. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  function split() {
    const h = document.querySelector('#v-home .homehero h1');
    if (!h || h.querySelector('.hl')) return;
    const parts = []; let cur = [];
    [...h.childNodes].forEach((n) => { if (n.nodeName === 'BR') { parts.push(cur); cur = []; } else cur.push(n); });
    parts.push(cur);
    if (parts.length < 2) return;
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    h.textContent = '';
    parts.forEach((nodes, i) => {
      const line = document.createElement('span'); line.className = 'hl hl' + (i + 1); line.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); nodes.forEach((n) => inner.appendChild(n)); line.appendChild(inner); h.appendChild(line);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', split); else split();
})(typeof window !== 'undefined' ? window : globalThis);
