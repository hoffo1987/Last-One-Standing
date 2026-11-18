/* ================= PELLE · ESITO =================
 * Decora la sezione «Esito» sotto la testata della vittoria e l'archivio partite, senza toccare ui.js:
 * - marca i blocchi (data-es) e li numera nell'ordine in cui si leggono;
 * - il podio diventa una scena: tre lastre inclinate con il volto tagliato e il numero enorme;
 * - premi e classifica ricevono la fascia degli occhi al posto del tondo, i numeri dei premi diventano protagonisti;
 * - il grafico prende retino e segnaposto, la locandina viene appesa, il seme diventa un'etichetta;
 * - dalla classifica nasce il calendario dei caduti;
 * - l'archivio diventa un elenco di salvataggi (data, arena, vincitore);
 * - la regia d'ingresso parte quando la testata ha finito (sequenza di vittoria o stacco di sezione).
 * Solo decorazione: ogni passo è protetto e, se manca qualcosa, resta il disegno di prima. */
(function (G) {
  'use strict';
  const doc = G.document; if (!doc) return;
  const root = doc.documentElement;
  const LOOK = () => G.LOS_LOOK || {}, FX = () => LOOK().fx || {};
  const reduced = () => !!((G.LOS_ANIM && G.LOS_ANIM.reduced) || root.hasAttribute('data-reduced-motion'));
  const sfx = (n, o) => { try { const s = LOOK().sfx; if (s && s.play) s.play(n, o); } catch (e) { /* niente */ } };
  const h = (tag, cls, txt) => { const el = doc.createElement(tag); if (cls) el.className = cls; if (txt != null) el.textContent = txt; return el; };
  const safe = (fn) => { try { fn(); } catch (e) { /* solo decorazione */ } };
  const pick = (group, av) => { const f = LOOK().pickFor; return f && av ? f(group, av.dataset.g, av.dataset.k || av.title) : null; };
  const two = (n) => (n < 10 ? '0' : '') + n;

  /* ---------- volti ---------- */
  // il tondo diventa una fascia sugli occhi: la foto ritagliata, oppure una fascia di riserva tinta
  function strip(av) {
    if (!av || av.classList.contains('es-strip')) return;
    av.classList.add('es-strip');
    if (av.querySelector('img') || av.classList.contains('has-volto')) return;
    const u = pick(FX().occhi, av); if (!u) return;
    const im = h('img', 'volto'); im.alt = ''; im.decoding = 'async'; im.loading = 'lazy'; im.src = u;
    av.prepend(im); av.classList.add('has-volto');
  }

  /* ---------- podio ---------- */
  function podium(body) {
    body.querySelectorAll('.podium .pod').forEach((pod) => {
      if (pod.classList.contains('es-pod')) return;
      const av = pod.querySelector('.av'); if (!av) return;
      const panel = h('span', 'es-pod-panel'); panel.setAttribute('aria-hidden', 'true');
      const photo = av.querySelector('img:not(.volto)'), reserve = !photo && pick(FX().volti, av);
      if (photo || reserve) { const im = h('img', photo ? 'es-photo' : 'es-tint'); im.alt = ''; im.decoding = 'async'; im.src = photo ? (photo.currentSrc || photo.src) : reserve; panel.appendChild(im); }
      else panel.appendChild(h('b', 'es-ini', ((av.querySelector('.ini') || av).textContent || '').trim()));
      if (av.classList.contains('dead')) pod.classList.add('es-dead');
      pod.prepend(panel);
      // «3 uccisioni · finale»: il numero diventa grande, il momento una targhetta
      const sm = pod.querySelector('small');
      if (sm) {
        const parts = sm.textContent.split(' · '), m = parts[0].match(/^(\d+)\s+(.+)$/);
        if (m) {
          sm.textContent = '';
          const k = h('span', 'es-k'); k.appendChild(h('b', '', m[1])); k.appendChild(doc.createTextNode(' ' + m[2])); sm.appendChild(k);
          if (parts[1]) { sm.appendChild(h('span', 'es-sep', ' · ')); sm.appendChild(h('span', 'es-when', parts.slice(1).join(' · '))); }
        }
      }
      pod.classList.add('es-pod');
    });
  }

  /* ---------- premi ---------- */
  function awards(body) {
    body.querySelectorAll('.awards .award').forEach((a, i) => {
      if (a.classList.contains('es-aw')) return;
      a.classList.add('es-aw'); if (i === 0) a.classList.add('es-top');
      a.style.setProperty('--k', Math.min(i, 14));
      strip(a.querySelector('.av'));
      const sm = a.querySelector('small'); if (!sm) return;
      const m = sm.textContent.match(/^(\d+)\s+(.+)$/);
      if (m) { sm.textContent = ''; sm.appendChild(h('b', 'es-n', m[1])); sm.appendChild(doc.createTextNode(' ')); sm.appendChild(h('span', '', m[2])); a.classList.add('es-num'); }
    });
  }

  /* ---------- grafico ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  function chart(body) {
    const svg = body.querySelector('.chart svg'); if (!svg || svg.__es) return; svg.__es = true;
    const paths = svg.querySelectorAll('path'), area = paths[0], line = paths[1], dot = svg.querySelector('circle');
    const s = (tag, at) => { const el = doc.createElementNS(NS, tag); Object.keys(at || {}).forEach((k) => el.setAttribute(k, at[k])); return el; };
    const defs = s('defs'), pat = s('pattern', { id: 'esRetino', width: 7, height: 7, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
    pat.appendChild(s('circle', { cx: 3.5, cy: 3.5, r: 2.1, class: 'es-dot' })); defs.appendChild(pat); svg.prepend(defs);
    if (area) { area.classList.add('es-area'); area.style.fill = 'url(#esRetino)'; }
    if (line) { line.classList.add('es-line'); line.setAttribute('pathLength', '1'); }
    if (dot) {
      const x = +dot.getAttribute('cx'), y = +dot.getAttribute('cy'), r = 8;
      svg.appendChild(s('path', { class: 'es-end', d: 'M' + (x - r) + ' ' + y + ' L' + x + ' ' + (y - r) + ' L' + (x + r) + ' ' + y + ' L' + x + ' ' + (y + r) + ' Z' }));
    }
    svg.classList.add('es-chart');
  }

  /* ---------- classifica ---------- */
  function ranking(body) {
    const table = body.querySelector('.block[data-es="classifica"] table'); if (!table || table.__es) return; table.__es = true;
    const heads = [...table.querySelectorAll('thead th')].map((th) => th.textContent.trim());
    [...table.querySelectorAll('tbody tr')].forEach((tr, i) => {
      tr.style.setProperty('--k', Math.min(i, 16));
      [...tr.children].forEach((td, c) => { if (heads[c]) td.dataset.l = heads[c]; });
      strip(tr.querySelector('.who .av'));
    });
  }

  /* ---------- calendario dei caduti (dalla classifica) ---------- */
  function calendar(body) {
    const blk = body.querySelector('.block[data-es="classifica"]'); if (!blk || body.querySelector('.block[data-es="caduti"]')) return;
    const days = new Map();
    [...blk.querySelectorAll('tbody tr')].reverse().forEach((tr) => {
      if (tr.classList.contains('win') || tr.children.length < 6) return;
      const when = tr.children[5].textContent.trim(), who = tr.querySelector('.who'); if (!when || !who) return;
      if (!days.has(when)) days.set(when, []);
      days.get(when).push({ id: who.dataset.prof, name: [...who.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim() || who.textContent.trim(), av: who.querySelector('.av'), arena: !tr.children[4].querySelector('b') && !!tr.children[4].querySelector('.muted') });
    });
    if (!days.size) return;
    const sec = h('section', 'block card'); sec.dataset.es = 'caduti';
    sec.appendChild(h('h2', '', 'Il calendario dei caduti'));
    const grid = h('div', 'es-cal'); grid.setAttribute('role', 'list');
    let i = 0;
    days.forEach((list, when) => {
      const m = when.match(/^(.*?)(\d+)\s*$/), cell = h('div', 'es-day' + (m ? '' : ' es-fin') + (list.length >= 3 ? ' es-strage' : ''));
      cell.setAttribute('role', 'listitem'); cell.style.setProperty('--k', Math.min(i++, 14));
      const head = h('div', 'es-dh');
      head.appendChild(h('span', 'es-du', m ? m[1].trim() : when));
      head.appendChild(h('b', 'es-dn', m ? m[2] : '✕'));
      const cnt = h('span', 'es-dc'); cnt.appendChild(h('b', '', String(list.length))); cnt.appendChild(doc.createTextNode(' fuori')); head.appendChild(cnt);
      cell.appendChild(head);
      const ul = h('div', 'es-dl');
      list.forEach((t) => {
        const b = h('button', 'es-dw' + (t.arena ? ' es-arena' : '')); b.type = 'button'; if (t.id) b.dataset.prof = t.id;
        if (t.av) { const a = t.av.cloneNode(true); a.removeAttribute('title'); a.classList.remove('es-strip'); b.appendChild(a); strip(a); }
        b.appendChild(h('span', '', t.name)); ul.appendChild(b);
      });
      cell.appendChild(ul); grid.appendChild(cell);
    });
    sec.appendChild(grid);
    blk.parentNode.insertBefore(sec, blk);
  }

  /* ---------- locandina e seme ---------- */
  function poster(body) {
    const im = body.querySelector('#posterImg'); if (!im || im.parentNode.classList.contains('es-poster')) return;
    const fig = h('span', 'es-poster'); im.parentNode.insertBefore(fig, im);
    const t1 = h('i', 'es-tape a'), t2 = h('i', 'es-tape b'); t1.setAttribute('aria-hidden', 'true'); t2.setAttribute('aria-hidden', 'true');
    fig.appendChild(im); fig.appendChild(t1); fig.appendChild(t2);
  }
  function seed(body) {
    const s = body.querySelector('.resactions > .help.mono'); if (!s || s.classList.contains('es-seed')) return;
    const m = s.textContent.match(/^(\S+)\s+(.+)$/); if (!m) return;
    s.textContent = ''; s.appendChild(h('i', '', m[1])); s.appendChild(doc.createTextNode(' ')); s.appendChild(h('b', '', m[2])); s.classList.add('es-seed');
  }

  /* ---------- blocchi: nome, numero, colonne ---------- */
  const KIND = [['.podium', 'podio'], ['.awards', 'premi'], ['.highlights', 'salienti'], ['table', 'classifica'], ['.chart', 'andamento'], ['.bstories', 'storie'], ['.bars', 'uccisioni'], ['#posterImg', 'locandina']];
  const ORDER = ['svolte', 'podio', 'premi', 'salienti', 'andamento', 'storie', 'uccisioni', 'locandina', 'caduti', 'classifica'];
  function tag(body) {
    const grid = body.querySelector('.resgrid'); if (!grid) return false;
    if (grid.children[0]) grid.children[0].classList.add('es-colA');
    if (grid.children[1]) grid.children[1].classList.add('es-colB');
    grid.querySelectorAll('.block').forEach((b) => { if (b.dataset.es) return; const k = KIND.find((x) => b.querySelector(':scope > ' + x[0] + ', :scope > * > ' + x[0])); if (k) b.dataset.es = k[1]; });
    const cr = body.querySelector('#causalReport'); if (cr) cr.dataset.es = 'svolte';
    return true;
  }
  function number(body) {
    let n = 0;
    ORDER.forEach((k) => { const b = body.querySelector('.block[data-es="' + k + '"]'), t = b && b.querySelector(':scope > h2'); if (t) t.dataset.n = two(++n); });
    body.querySelectorAll('.bars .bar').forEach((b, i) => b.style.setProperty('--k', i));
    body.querySelectorAll('.kstats .kstat').forEach((b, i) => b.style.setProperty('--k', i));
  }

  /* ---------- regia d'ingresso ---------- */
  // niente IntersectionObserver: in una scheda che non compone fotogrammi non avvisa mai e il blocco resterebbe nascosto.
  // Si misura a mano, allo scorrimento e con un battito lento finché resta qualcosa da mostrare.
  let stopWatch = null, waitMo = null, waitT = 0;
  function stageIn(body) {
    if (stopWatch) stopWatch(); if (waitMo) { waitMo.disconnect(); waitMo = null; } clearTimeout(waitT);
    const units = [...body.querySelectorAll('.resactions, #causalReport, .resgrid .block')];
    units.forEach((u) => u.classList.add('es-unit'));
    if (reduced()) { units.forEach((u) => u.classList.add('es-in')); body.classList.add('es-go'); return; }
    let gone = false;
    const go = () => {
      if (gone || !body.isConnected) return; gone = true;
      if (waitMo) { waitMo.disconnect(); waitMo = null; } clearTimeout(waitT);
      body.classList.add('es-go');
      let left = units.slice(), tick = 0;
      const check = () => {
        if (!body.isConnected || body.hidden) return;
        const vh = G.innerHeight || root.clientHeight, all = reduced();
        left = left.filter((u) => {
          const r = u.getBoundingClientRect();
          if (!all && (r.top > vh * 0.9 || r.bottom < 0) && (r.width || r.height)) return true;
          u.classList.add('es-in');
          if (!all && u.matches('.resactions')) sfx('move');
          else if (!all && u.dataset.es === 'podio') { sfx('cut'); sfx('stamp', { at: 520 }); }
          return false;
        });
        if (!left.length) stop();
      };
      const stop = () => { G.removeEventListener('scroll', check); G.removeEventListener('resize', check); clearInterval(tick); stopWatch = null; };
      G.addEventListener('scroll', check, { passive: true }); G.addEventListener('resize', check);
      tick = setInterval(check, 350); stopWatch = stop;
      check();
    };
    // la sequenza di vittoria copre tutto: si parte quando si strappa via
    const pf = doc.querySelector('body > .pf');
    if (pf) {
      waitMo = new MutationObserver(() => { if (!pf.isConnected) go(); });
      waitMo.observe(doc.body, { childList: true });
      waitT = setTimeout(go, 12000);
      return;
    }
    // lo stacco di sezione copre la pagina: si parte quando la sezione entra
    const lx = doc.querySelector('.lx');
    if (lx && !lx.hidden) { doc.addEventListener('los:enter', () => setTimeout(go, 60), { once: true }); waitT = setTimeout(go, 1400); return; }
    waitT = setTimeout(go, 40);
  }

  function decorate(body) {
    const grid = body.querySelector('.resgrid'); if (!grid) return;
    const fresh = !grid.__es; grid.__es = true;
    if (fresh) body.classList.remove('es-go');
    if (!tag(body)) return;
    body.classList.add('es-on');
    safe(() => podium(body)); safe(() => awards(body)); safe(() => chart(body)); safe(() => ranking(body)); safe(() => calendar(body));
    safe(() => poster(body)); safe(() => seed(body)); safe(() => number(body));
    if (fresh) safe(() => stageIn(body));
  }

  /* ================= ARCHIVIO ================= */
  const MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  const winners = new Map(); let queue = Promise.resolve();
  function winnerOf(id) {
    if (winners.has(id)) return Promise.resolve(winners.get(id));
    const R = G.LOS_REPLAY; if (!R || !R.entry) return Promise.resolve(null);
    const job = queue.then(() => R.entry(id)).then((e) => {
      const r = e && e.result; if (!r) return null;
      const names = (r.winners || []).map((w) => (r.tributes.find((t) => t.id === w) || {}).name).filter(Boolean);
      const first = names.length > 1 ? r.tributes.find((t) => t.id === r.winners[0]) : null;
      const v = !names.length ? { k: 'Esito', v: 'Nessun superstite' } : names.length === 1 ? { k: 'Vince', v: names[0] } : { k: 'Vince la squadra ' + (first ? first.team : ''), v: names.join(', ') };
      winners.set(id, v); return v;
    }).catch(() => null);
    queue = job; return job;
  }
  function archive(list) {
    [...list.querySelectorAll('.archive-entry')].forEach((row, i) => {
      if (row.classList.contains('es-save')) return;
      row.classList.add('es-save'); row.style.setProperty('--k', Math.min(i, 12));
      const p = row.querySelector(':scope > p.help'); if (!p) return;
      const parts = p.textContent.split(' · ').map((x) => x.trim()), d = parts[0].match(/(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s*(\d{1,2})[:.](\d{2})/);
      if (!d || parts.length < 4) return;
      const date = h('div', 'es-date');
      date.appendChild(h('b', '', two(+d[1]))); date.appendChild(h('i', '', MONTHS[+d[2] - 1] || '')); date.appendChild(h('span', '', d[3] + ' · ' + two(+d[4]) + ':' + d[5]));
      const meta = h('div', 'es-meta');
      meta.appendChild(h('span', 'es-arena', parts[3]));
      meta.appendChild(h('span', '', parts[1])); meta.appendChild(h('span', '', parts[2]));
      if (parts[4]) meta.appendChild(h('span', 'es-adult', parts[4]));
      const win = h('span', 'es-win'); win.hidden = true; meta.appendChild(win);
      row.insertBefore(date, p); row.insertBefore(meta, p); p.classList.add('es-src');
      if (i < 40 && row.dataset.replay) winnerOf(row.dataset.replay).then((w) => { if (!w || !win.isConnected) return; win.appendChild(h('i', '', w.k)); win.appendChild(doc.createTextNode(' ')); win.appendChild(h('b', '', w.v)); win.hidden = false; });
    });
  }

  /* ================= AVVIO ================= */
  function start() {
    const body = doc.getElementById('resBody');
    if (body) {
      const run = () => safe(() => decorate(body));
      new MutationObserver(run).observe(body, { childList: true });
      run();
    }
    const list = doc.getElementById('archiveList');
    if (list) {
      const run = () => safe(() => archive(list));
      new MutationObserver(run).observe(list, { childList: true });
      run();
    }
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start); else start();
})(typeof window === 'object' ? window : globalThis);
