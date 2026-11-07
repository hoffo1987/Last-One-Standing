/* Last One Standing — interfaccia */
(function () {
  'use strict';
  const D = window.LOS_DATA, L = window.LOS, ART = window.LOS_ART, AN = window.LOS_ANIM, REPLAY = window.LOS_REPLAY, RUNNER = window.LOS_SIMULATOR;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const THEMES = Object.fromEntries(D.themes.map((t) => [t.id, t]));
  const resultTheme = result => result?.spatial ? { ...THEMES[result.theme], lex:{...THEMES[result.theme].lex,luogo:result.spatial.zones.map(z=>z.name)} } : THEMES[result.theme];
  let mapSelection=null;
  let lastSideResult=null,lastSidePhase=-1,lastSideTab='';
  const TRAITS = Object.fromEntries(D.traits.map((t) => [t.id, t]));
  const own = (o, k) => typeof k === 'string' && Object.prototype.hasOwnProperty.call(o, k);
  const record = (x) => x != null && typeof x === 'object' && !Array.isArray(x);
  const validId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 40 && !/[{}]/.test(id) && !own(Object.prototype, id) && id !== 'prototype';
  let inputSerial = 0;
  const inputId = (prefix) => prefix + Date.now().toString(36) + (++inputSerial).toString(36) + Math.random().toString(36).slice(2, 7);
  const KEY = 'last-one-standing:v1';
  const SPEED = { lenta: 7000, normale: 3800, veloce: 1700 };
  const G3 = (g, m, f, n) => (g === 'F' ? f : g === 'N' ? n : m);
  const COUNTS = L.countTemplates();

  /* ---------------- icone ---------------- */
  const sv = (p, extra) => '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '>' + p + '</svg>';
  const SKULL = '<path d="M12 3a8 8 0 0 0-8 8c0 2.8 1.4 4.6 3 5.6V20h10v-3.4c1.6-1 3-2.8 3-5.6a8 8 0 0 0-8-8z"/><circle cx="9" cy="11.5" r="1.6" fill="currentColor"/><circle cx="15" cy="11.5" r="1.6" fill="currentColor"/><path d="M10.5 20v-2.5M13.5 20v-2.5"/>';
  const IC = {
    b: sv('<path d="M5 21V4h11l-2 4 2 4H5"/>'),
    d: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>'),
    n: sv('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>'),
    f: sv('<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>'),
    dis: sv('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
    fallen: sv(SKULL),
    finale: sv('<path d="M3 18h18l-2-10-5 4-2-7-2 7-5-4z"/><path d="M3 21h18"/>'),
    kill: sv('<circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>'),
    death: sv(SKULL),
    betray: sv('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/><path d="m12.5 7.5-2 3.5 3 2-2 3.5"/>'),
    ally: sv('<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>'),
    heal: sv('<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/>'),
    item: sv('<rect x="5" y="7" width="14" height="14" rx="3"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7M9 13h6"/>'),
    hurt: sv('<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>'),
    love: sv('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor" fill-opacity=".25"/>'),
    cam: sv('<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
    pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>',
  };
  const GRIP = '<svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="2.5" cy="3" r="1.4"/><circle cx="7.5" cy="3" r="1.4"/><circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/><circle cx="2.5" cy="13" r="1.4"/><circle cx="7.5" cy="13" r="1.4"/></svg>';
  const CAT = {
    kill: ['Uccisione', 'Eliminazione'], death: ['Morte', 'Fuori'], betray: ['Tradimento', 'Tradimento'], ally: ['Alleanza', 'Alleanza'],
    heal: ['Aiuto', 'Aiuto'], item: ['Bottino', 'Asso nella manica'], hurt: ['Guaio', 'Colpo basso'], love: ['Amore', 'Amore'], none: ['', ''],
  };
  const ATTRN = Object.fromEntries(D.attrs.map((a) => [a.id, a.name]));
  const WHY = { carattere: 'Carattere', vendetta: 'Vendetta', debito: 'Debito', coppia: 'Coppia', lutto: 'Lutto', fama: 'Fama', reputazione: 'Reputazione', oggetto: 'Oggetto', condizione: 'Conseguenza',
    legame: 'Legame', cotta: 'Cotta segreta', complotto: 'Complotto', obiettivo: 'Obiettivo', meteo: 'Meteo', conseguenza: 'Conseguenza', ferite: 'Ferite', stenti: 'Stenti', infezione: 'Infezione', tempesta: 'Tempesta', predatori: 'Pericolo notturno', trappola: 'Trappola', alleanza: 'Alleanza', cure: 'Cure', morale: 'Morale', riposo: 'Notte', esplorazione: 'Esplorazione', bottino: 'Bottino', incidente: 'Incidente' };
  const ECO = D.eco || { arenas: {} };
  const ITM = D.items || { types: {}, how: {}, order: [] }, MND = D.mind || { goals: {}, rel: {}, mem: {} };
  const ITIC = {
    arma: sv('<path d="M14.5 3.5 20.5 9.5 10 20l-4.5 1 1-4.5z"/><path d="m4 20 3-3"/>'), armatura: sv('<path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6z"/>'),
    med: sv('<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5h6v2M12 10.5v6M9 13.5h6"/>'), cibo: sv('<path d="M12 6c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"/><path d="M12 6c0-2 1-3 3-3"/>'),
    attrezzo: sv('<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.5-.5-.5-2.5z"/>'), mappa: sv('<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    trap: sv('<path d="M3 17h18M5 17l2-7 2 7 2-7 2 7 2-7 2 7 2-7"/>'), esplosivo: sv('<circle cx="11" cy="14" r="6"/><path d="m15 9 3-3M18 6l2-1M18 6l1 2"/>'),
    veleno: sv('<path d="M9 3h6M10 3v5l-4 8a3 3 0 0 0 2.7 4.3h6.6A3 3 0 0 0 18 16l-4-8V3"/><path d="M8 14h8"/>'), amuleto: sv('<path d="M8 3h8l-4 5z"/><circle cx="12" cy="15" r="6"/><path d="m12 12 1 2.2 2.4.3-1.8 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.6 2.4-.3z"/>'),
    alcol: sv('<path d="M10 3h4M10.5 3v4L8 10v10h8V10l-2.5-3V3"/><path d="M8 14h8"/>'), valore: sv('<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5"/>'),
    ricordo: sv('<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 4v4l1.5-1 1.5 1V4M8.5 13h7M8.5 16h5"/>'),
  };
  const nmOf = (id) => (BY[id] ? BY[id].name : 'qualcuno');
  const fill = (tpl, ids) => tpl.replace(/\{(\d)\}/g, (_, k) => esc(nmOf(ids[+k])));
  function goalLabel(m) { const g = (MND.goals || {})[m.g]; return g ? g.label.replace('{1}', m.tg ? nmOf(m.tg) : '') : ''; }
  function bagHTML(items, theme) {
    if (!items.length) return '<p class="help">Zaino vuoto.</p>';
    const order = ITM.order || [];
    return '<div class="bag">' + items.slice().sort((a, b) => order.indexOf(a.t) - order.indexOf(b.t)).map((it) => {
      const ty = (theme.soft && (ITM.typesSoft || {})[it.t]) || (ITM.types || {})[it.t] || { label: it.t, desc: '' };
      const how = ((ITM.how || {})[it.h] || 'Trovato').replace('{1}', esc(nmOf(it.f))) + (it.d ? ' · G' + it.d : '');
      const stars = it.q ? '<span class="stars" title="Qualità">' + '★'.repeat(it.q) + '<i>' + '★'.repeat(3 - it.q) + '</i></span>' : '';
      const uses = it.u != null && it.m ? '<span class="uses" title="Usura: ' + it.u + ' su ' + it.m + '"><b style="width:' + Math.round((it.u / it.m) * 100) + '%"></b></span>' : '';
      const tag = it.x === 'veleno' ? '<span class="itag bad">Avvelenata</span>' : it.x === 'bomba' ? '<span class="itag bad">Esplosiva</span>' : '';
      return '<div class="bitem t-' + esc(it.t) + '"><span class="bic">' + (ITIC[it.t] || ITIC.valore) + '</span><div class="bbody"><div class="btop"><b>' + esc(it.n) + '</b>' + stars + tag + '</div>' +
        '<div class="bmeta"><span class="btype">' + esc(ty.label) + '</span><span>' + how + '</span>' + uses + '</div><p>' + esc(ty.desc) + '</p></div></div>';
    }).join('') + '</div>';
  }
  const BDS = D.bonds || { labels: {}, dims: {}, mem: {}, promises: { kinds: {} } };
  const NET_CLS = [['love', 'Amore'], ['friend', 'Amicizia'], ['ally', 'Alleanza'], ['hate', 'Odio'], ['fear', 'Paura'], ['rival', 'Rivalità'], ['plot', 'Segreti']];
  let netOff = new Set();
  // la mappa dei legami: un grafo dei vivi, colorato per tipo di legame
  let netSel = null;
  function netHTML(ph) {
    const ids = ph.snap.alive.slice();
    if (ids.length < 2) return '';
    if (netSel && !ids.includes(netSel)) netSel = null;
    const al = ph.snap.allies;
    ids.sort((a, b) => ((al[a] != null ? al[a] : 999) - (al[b] != null ? al[b] : 999)) || (BY[a].team - BY[b].team));
    const n = ids.length, R = n > 16 ? 128 : 112, C = 160, pos = {}, ang = {};
    ids.forEach((id, k) => { const a = -Math.PI / 2 + (2 * Math.PI * k) / n; ang[id] = a; pos[id] = [C + R * Math.cos(a), C + R * Math.sin(a)]; });
    const T0 = SIM.tributes, L2 = BDS.labels || {};
    const all = (ph.snap.edges || []).filter((e) => T0[e[0]] && T0[e[1]] && pos[T0[e[0]].id] && pos[T0[e[1]].id]);
    const count = {}; all.forEach((e) => (count[e[2]] = (count[e[2]] || 0) + 1));
    const es = all.filter((e) => !netOff.has(e[2]));
    const touches = (e) => netSel && (T0[e[0]].id === netSel || T0[e[1]].id === netSel);
    const lines = es.map((e) => {
      const a = T0[e[0]], b = T0[e[1]];
      let [x1, y1] = pos[a.id], [x2, y2] = pos[b.id];
      if (e[4] === 2) { [x1, y1, x2, y2] = [x2, y2, x1, y1]; }
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, cx = mx + (C - mx) * 0.35, cy = my + (C - my) * 0.35;
      const sw = (1.2 + Math.min(2.6, e[3] / 40)).toFixed(1);
      const cls = 'edge e-' + e[2] + (netSel ? (touches(e) ? ' on' : ' faded') : '');
      return '<path class="' + cls + '" data-a="' + esc(a.id) + '" data-b="' + esc(b.id) + '" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" stroke-width="' + sw + '"' + (e[4] ? ' marker-end="url(#arr-' + e[2] + ')"' : '') + '/>';
    }).join('');
    const linked = new Set(); if (netSel) all.forEach((e) => { if (touches(e)) { linked.add(T0[e[0]].id); linked.add(T0[e[1]].id); } });
    const showNames = n <= 14;
    const nodes = ids.map((id) => {
      const t = BY[id], [x, y] = pos[id], deg = all.filter((e) => T0[e[0]].id === id || T0[e[1]].id === id).length;
      const cls = 'node' + (netSel === id ? ' sel' : netSel ? (linked.has(id) ? ' near' : ' faded') : '');
      const c = Math.cos(ang[id]), lx = C + (R + 19) * c, ly = C + (R + 19) * Math.sin(ang[id]) + 3, anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle';
      return '<g class="' + cls + '" data-net-node="' + esc(id) + '" tabindex="0" role="button" aria-pressed="' + (netSel === id) + '" aria-label="' + esc(t.name) + ': ' + plural(deg, 'legame', 'legami') + '">' +
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="13" style="fill:' + esc(t.color || '#888') + '"/><text class="ini" x="' + x.toFixed(1) + '" y="' + (y + 3).toFixed(1) + '">' + esc(initials(t.name)) + '</text>' +
        ((netSel ? (netSel === id || linked.has(id)) : showNames) ? '<text class="nm nm-' + anchor + '" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '">' + esc(t.name) + '</text>' : '') + '</g>';
    }).join('');
    const marks = NET_CLS.map(([c]) => '<marker id="arr-' + c + '" viewBox="0 0 8 8" refX="22" refY="4" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L8 4L0 8z" class="mk-' + c + '"/></marker>').join('');
    const legend = '<div class="netlegend" role="group" aria-label="Mostra o nascondi i tipi di legame">' + NET_CLS.filter(([c]) => count[c]).map(([c, l]) => '<button type="button" class="nl e-' + c + (netOff.has(c) ? ' off' : '') + '" data-net="' + c + '" aria-pressed="' + !netOff.has(c) + '"><i></i>' + l + '<b>' + count[c] + '</b></button>').join('') + '</div>';
    // la scheda della persona scelta: tutti i suoi legami, in parole
    let focus = '';
    if (netSel) {
      const me = BY[netSel], mine = all.filter(touches);
      const row = (e) => {
        const mineIsA = T0[e[0]].id === netSel, other = mineIsA ? T0[e[1]] : T0[e[0]];
        const out = (L2[mineIsA ? e[5] : e[6]] || {}).n, back = (L2[mineIsA ? e[6] : e[5]] || {}).n;
        return '<li class="nf-row">' + avHTML(BY[other.id], { btn: true }) + '<span class="nf-txt"><b>' + esc(other.name) + '</b>' +
          '<span><em class="e-' + e[2] + '">' + esc(out || 'nessun legame') + '</em> da ' + esc(me.name) + '</span>' +
          '<span class="nf-back">' + (back ? '<em class="e-' + e[2] + '">' + esc(back) + '</em> in risposta' : 'non ricambiato') + '</span></span></li>';
      };
      focus = '<div class="netfocus">' + '<div class="nf-head">' + avHTML(me, { btn: true }) + '<span><b>' + esc(me.name) + '</b><span>' + plural(mine.length, 'legame', 'legami') + '</span></span><button type="button" class="btn sm" data-prof="' + esc(me.id) + '">Apri la scheda</button><button type="button" class="nf-x" data-net-node="' + esc(me.id) + '" aria-label="Chiudi">×</button></div>' +
        (mine.length ? '<ul class="nf-list">' + mine.sort((a, b) => b[3] - a[3]).map(row).join('') + '</ul>' : '<p class="help">Nessun legame forte con chi è ancora in gara.</p>') + '</div>';
    }
    return '<div class="netwrap"><div class="nw-head"><h4>Mappa dei legami</h4><span class="help">' + (netSel ? 'Tocca di nuovo per deselezionare' : 'Tocca un volto per vedere i suoi legami') + '</span></div>' +
      '<svg class="net' + (netSel ? ' focus' : '') + '" viewBox="-40 -6 400 332" role="group" aria-label="Mappa dei legami tra i concorrenti in gara"><defs>' + marks + '</defs>' + lines + nodes + '</svg>' + legend + focus +
      '<p class="help nw-note">Le frecce indicano un sentimento non ricambiato; lo spessore, quanto è forte.</p></div>';
  }
  function dimsHTML(d) {
    if (!d) return '';
    const DN = BDS.dims || {};
    const rows = [['f', d.f, true], ['r', d.r, true], ['p', d.p, false], ['t', d.t, false], ['k', d.k, false]].filter(([, v]) => Math.abs(v) >= 10);
    if (!rows.length) return '';
    return '<div class="dims">' + rows.map(([k, v, signed]) => '<span class="dim d-' + k + (v < 0 ? ' neg' : '') + '" title="' + esc(DN[k] || k) + ' ' + v + '"><em>' + esc(DN[k] || k) + '</em><i>' + (signed ? '<b style="' + (v >= 0 ? 'left:50%;width:' + v / 2 + '%' : 'left:' + (50 + v / 2) + '%;width:' + -v / 2 + '%') + '"></b>' : '<b style="left:0;width:' + v + '%"></b>') + '</i></span>').join('') + '</div>';
  }
  function promisesHTML(t, i, atRes) {
    const K = (BDS.promises || {}).kinds || {};
    const deathAt = (x) => x && Number.isInteger(x.deathPhase) && x.deathPhase >= 0 ? x.deathPhase : Infinity;
    const st = (q, from, to) => {
      if (!q.done) return 'in corso';
      if (atRes) return q.done;
      // Nei vecchi risultati mancava la fase di scioglimento. La vendetta può
      // continuare dopo la morte del destinatario, le altre promesse no.
      const end = q.end != null ? q.end : q.done === 'sciolta' ? Math.min(deathAt(from), q.k === 'vendetta' ? Infinity : deathAt(to)) : Infinity;
      return end <= i ? q.done : 'in corso';
    };
    const made = (t.promises || []).filter((q) => q.ph <= i);
    const got = []; SIM.tributes.forEach((x) => (x.promises || []).forEach((q) => { if (q.to === t.id && q.ph <= i) got.push([x, q]); }));
    if (!made.length && !got.length) return '';
    const row = (who, q, dir) => { const s2 = st(q, dir ? t : who, dir ? who : t); return '<div class="prom s-' + s2.replace(' ', '') + '"><span class="pk">' + esc(K[q.k] || q.k) + '</span><span>' + (dir ? 'a ' : 'da ') + '<b>' + esc(who.name) + '</b> · G' + q.d + '</span><span class="ps2">' + s2 + '</span></div>'; };
    return '<div><div class="sub" style="margin-bottom:8px">Promesse</div><div class="proms">' + made.map((q) => row(BY[q.to] || { name: '?' }, q, true)).join('') + got.map(([x, q]) => row(x, q, false)).join('') + '</div></div>';
  }
  function nowHTML(t, snap, i, theme) {
    const m = (snap.mind || {})[t.id]; const v = (snap.vit || {})[t.id]; const st = snap.st[t.id] || [];
    const zone = theme.lex.luogo[snap.zones[t.id]] || '';
    const bits = [];
    if (v) { if (v[0] < 25) bits.push(theme.soft ? 'con la reputazione a pezzi' : 'ridott' + G3(t.gender, 'o', 'a', 'ə') + ' male'); else if (v[0] < 55) bits.push(statusLabel('ferito', t, theme).toLowerCase()); if (v[3] < 25) bits.push('affamat' + G3(t.gender, 'o', 'a', 'ə')); if (v[1] < 22) bits.push('sfinit' + G3(t.gender, 'o', 'a', 'ə')); if (v[2] < 22) bits.push('a pezzi'); else if (v[2] >= 80) bits.push('carichissim' + G3(t.gender, 'o', 'a', 'ə')); }
    if (st.includes('ubriaco')) bits.push(statusLabel('ubriaco', t, theme).toLowerCase());
    const allies = snap.allies[t.id] != null ? snap.alive.filter((x) => x !== t.id && snap.allies[x] === snap.allies[t.id]).length : 0;
    const partner=snap.rel?.[t.id]?.p;
    const nearby=snap.alive.filter(id=>id!==t.id&&snap.zones[id]===snap.zones[t.id]&&(snap.allies[t.id]!=null&&snap.allies[id]===snap.allies[t.id]||id===partner)).length;
    const where = zone ? zone.replace(/^(il |lo |la |l'|i |gli |le )/i, (a) => a.toLowerCase()) : '';
    const lead = (where ? 'A ' + where : 'In gara') + (bits.length ? ', ' + bits.join(', ') : '') + (allies ? ', in alleanza con ' + plural(allies, 'alleato', 'alleati') : ', senza alleati') + '.';
    const g = m ? (MND.goals || {})[m.g] : null;
    return '<div class="nowcard"><div class="sub">Adesso</div><p class="nowlead">' + esc(fixA(lead)) + '</p><p class="help">'+(nearby?plural(nearby,'compagno presente','compagni presenti')+' in questa zona.':'Nessun compagno presente in questa zona.')+'</p>' +
      (m && g ? '<div class="goal' + (g.secret ? ' secret' : '') + '"><span class="glbl">Obiettivo</span><b>' + esc(goalLabel(m)) + '</b>' + (g.secret ? '<span class="gsec" title="Gli altri concorrenti non lo sanno">segreto</span>' : '') + (m.since != null && m.since < i ? '<span class="gsince">da G' + (SIM.phases[m.since] ? SIM.phases[m.since].day || 1 : 1) + '</span>' : '') + '</div>' : '') +
      (m && m.th ? '<blockquote class="thought">' + linkify(m.th) + '</blockquote>' : '') + '</div>';
  }
  // «a il Fiume» → «al Fiume» per i testi composti qui
  function fixA(s) { return s.replace(/^A (il|lo|la|i|gli|le|l') ?/, (m, a) => ({ il: 'Al ', lo: 'Allo ', la: 'Alla ', i: 'Ai ', gli: 'Agli ', le: 'Alle ', "l'": "All'" }[a])); }
  function peopleHTML(t, snap, i) {
    const top = ((snap.rel || {})[t.id] || {}).top || [];
    if (!top.length) return '';
    const soft2 = SIM && THEMES[SIM.theme].soft;
    const L2 = MND.rel || {}, MM = Object.assign({}, MND.mem || {}, BDS.mem || {}, soft2 ? Object.assign({}, MND.memSoft || {}, BDS.memSoft || {}) : {});
    const LB = BDS.labels || {};
    const rows = top.map(([id, a, lbl, dims, back]) => {
      const mem = ((t.mem || {})[id] || []).filter((m) => m.ph <= i).slice(-3).reverse();
      const pct = Math.round((a + 100) / 2);
      const info = LB[lbl] || { n: L2[lbl] || lbl, c: 'none', d: '' };
      const bk = back ? (LB[back] || {}).n || back : '';
      const asym = (lbl === 'cotta' && back !== 'cotta' && back !== 'amore') ? 'Non ricambiat' + G3(t.gender, 'o', 'a', 'ə') : '';
      return '<div class="person c-' + esc(info.c) + '">' + avHTML(BY[id], { btn: true }) + '<div class="pbody"><div class="ptop"><b>' + esc(nmOf(id)) + '</b><span class="plbl" title="' + esc(info.d) + '">' + esc(info.n) + '</span>' + (asym ? '<span class="asym">' + asym + '</span>' : '') + '</div>' +
        '<span class="affbar" title="Affetto ' + a + '"><b style="left:' + pct + '%"></b></span>' + dimsHTML(dims) +
        '<span class="back">Per ' + esc(nmOf(id)) + ': <b>' + esc(bk || 'indifferenza') + '</b></span>' +
        (mem.length ? '<ul class="pmem">' + mem.filter((m) => MM[m.k]).map((m) => '<li>«' + fill(MM[m.k] || '', [t.id, id, m.x]) + '» <span>' + esc(whenLabel(resultTheme(SIM), m.ph, SIM.phases[m.ph] ? SIM.phases[m.ph].day || 1 : 1)) + '</span></li>').join('') + '</ul>' : '') + '</div></div>';
    }).join('');
    return '<div><div class="sub" style="margin-bottom:8px">Cosa prova per gli altri</div><div class="people">' + rows + '</div></div>';
  }
  function diaryHTML(t, i) {
    const all = (t.diary || []).filter((d) => d.ph <= i);
    if (!all.length) return '<div><div class="sub" style="margin-bottom:6px">Diario segreto</div><p class="help">Ancora nessuna pagina.</p></div>';
    const K = { segreto: 'Segreto', pensiero: 'Pensiero', fatto: 'Fuori onda', mossa: 'Mossa' };
    const days = {}; all.forEach((d) => (days[d.d] = days[d.d] || []).push(d));
    const ds = Object.keys(days).map(Number).sort((a, b) => b - a);
    return '<div><div class="sub" style="margin-bottom:6px">Diario segreto · ' + plural(all.length, 'pagina', 'pagine') + '</div><p class="help" style="margin-bottom:8px">Quello che la diretta non mostra: pensieri, segreti e fatti fuori onda.</p><div class="diary">' +
      ds.map((d) => '<div class="dday"><span class="dd">' + esc(whenLabel(resultTheme(SIM), null, d || 1)) + '</span><div>' + days[d].slice().reverse().map((x) => '<p class="dk-' + esc(x.k) + '"><span class="dk">' + (K[x.k] || '') + '</span>' + linkify(x.h) + '</p>').join('') + '</div></div>').join('') + '</div></div>';
  }
  const arenaOf = (id) => ECO.arenas[id] || {};
  const vitLabels = (th) => (th && th.soft ? ECO.labelsSoft : ECO.labels) || { hp: 'Salute', en: 'Energia', mo: 'Morale', food: 'Sazietà' };
  const whyLabel = (e, theme) => (e.why === 'arena' && arenaOf(theme.id).meter ? arenaOf(theme.id).meter.name : WHY[e.why] || '');
  const CAUSE_TXT = { wound: 'ferite', starve: 'fame', exhaust: 'sfinimento', poison: 'veleno', sick: 'malattia', infect: 'infezione', storm: 'tempesta', beast: 'aggressione notturna', trap: 'trappola', accident: 'incidente' };
  const CAUSE_SOFT = { wound: 'perdita di reputazione', starve: 'mancanza di energie', exhaust: 'sfinimento', poison: 'malessere', sick: 'malessere', trap: 'sabotaggio', accident: 'imprevisto' };
  const causeTxt = (t, theme) => (t.deathCause === 'meter' && arenaOf(theme.id).meter ? arenaOf(theme.id).meter.name.toLowerCase() : (theme.soft ? CAUSE_SOFT[t.deathCause] : CAUSE_TXT[t.deathCause]) || '');
  function statusLabel(s, t, theme) {
    if (theme.soft && s === 'ferito') return 'In difficoltà';
    if (theme.soft && (s === 'avvelenato' || s === 'malato')) return 'Indisposizione';
    if (theme.soft && s === 'ubriaco') return 'Poca lucidità';
    if (theme.soft && s === 'lutto') return 'Scoss' + G3(t.gender, 'o', 'a', 'ə') + ' per un\'eliminazione';
    const stems = { ferito: 'Ferit', avvelenato: 'Avvelenat', malato: 'Malat', affamato: 'Affamat', ubriaco: 'Ubriac', sconvolto: 'Sconvolt', esausto: 'Esaust', disperato: 'Disperat', assiderato: 'Assiderat', maledetto: 'Maledett', infetto: 'Infett', terrorizzato: 'Terrorizzat', irradiato: 'Irradiat', stressato: 'Stressat' };
    return own(stems, s) ? stems[s] + G3(t.gender, 'o', 'a', 'ə') : L.STATUS_LABEL[s] || s;
  }
  function vbars(v, theme, full) {
    if (!v) return '';
    const lb = vitLabels(theme), m = arenaOf(theme.id).meter;
    const rows = [['hp', lb.hp, v[0]], ['en', lb.en, v[1]], ['mo', lb.mo, v[2]], ['food', lb.food, v[3]]];
    if (m && v[4] >= 0) rows.push(['pr', m.name, v[4]]);
    if (!full) return '<span class="vmini" aria-hidden="true">' + rows.slice(0, 3).map(([k, , x]) => '<i class="' + k + (x < 25 ? ' low' : '') + '"><b style="width:' + x + '%"></b></i>').join('') + '</span>';
    return '<div class="vbars">' + rows.map(([k, n, x]) => { const bad = k === 'pr' ? x >= (m.thr || 60) : x < 25; return '<div class="vbar ' + k + (bad ? ' bad' : '') + '"><span>' + esc(n) + '</span><i><b style="width:' + x + '%"></b></i><em>' + x + '</em></div>'; }).join('') + '</div>';
  }
  const KIND = { b: 'Apertura', d: 'Giorno', n: 'Notte', f: 'Evento speciale', dis: 'Disastro', fallen: 'Bilancio', finale: 'Finale' };
  /* ---------------- calendario: nomi di giorni, notti, bilanci e finale, nel lessico di ogni arena ---------------- */
  const ORD = ['', 'primo', 'secondo', 'terzo', 'quarto', 'quinto', 'sesto', 'settimo', 'ottavo', 'nono', 'decimo', 'undicesimo', 'dodicesimo', 'tredicesimo', 'quattordicesimo', 'quindicesimo', 'sedicesimo', 'diciassettesimo', 'diciottesimo', 'diciannovesimo', 'ventesimo'];
  const ordinal = (n, fem) => (ORD[n] ? (fem ? ORD[n].slice(0, -1) + 'a' : ORD[n]) : n + (fem ? 'ª' : 'º'));
  const capW = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  // ogni arena: come si chiamano il giorno, la notte, l'unità di tempo e il bilancio dei caduti
  const CAL = {
    _: { unit: 'giorno', units: 'giorni', short: (d) => 'Giorno ' + d, day: (d) => capW(ordinal(d)) + ' giorno', night: (d) => capW(ordinal(d, true)) + ' notte', of: (d) => 'del ' + ordinal(d) + ' giorno', recap: 'Il bilancio' },
    classico: { recap: 'I colpi di cannone' },
    fantasy: { recap: 'Le campane del reame' },
    scifi: { unit: 'ciclo', units: 'cicli', short: (d) => 'Ciclo ' + d, day: (d) => capW(ordinal(d)) + ' ciclo diurno', night: (d) => capW(ordinal(d)) + ' ciclo notturno', of: (d) => 'del ' + ordinal(d) + ' ciclo', recap: 'Il rapporto di bordo' },
    zombie: { recap: 'L’appello via radio' },
    royale: { recap: 'Il contatore dei giocatori' },
    horror: { recap: 'I rintocchi del pendolo' },
    wasteland: { recap: 'Il fumo all’orizzonte' },
    liceo: { day: (d) => capW(ordinal(d)) + ' giorno di scuola', night: (d) => 'Dopo scuola del ' + ordinal(d) + ' giorno', recap: 'L’appello del mattino' },
    ufficio: { day: (d) => capW(ordinal(d)) + ' giorno di lavoro', night: (d) => 'Straordinari del ' + ordinal(d) + ' giorno', recap: 'Le scrivanie vuote' },
  };
  const calOf = (theme) => Object.assign({}, CAL._, CAL[theme.id] || {});
  // il limite di giorni scelto prima della partita (null se non si conosce, per esempio in un replay vecchio)
  function runMaxDays() { const m = S.run && S.run.cfg && +S.run.cfg.maxDays; return m ? Math.max(3, Math.min(60, m)) : null; }
  // nome, sottotitolo e gruppo di ogni fase, senza i nomignoli «G1»
  function phaseInfo(P, k, theme, hideTotal) {
    const p = P[k], c = calOf(theme), d = p.day || 1, meteo = p.meteo && p.meteo.n ? p.meteo.n : '';
    const firstFinale = P.findIndex((x) => x.kind === 'finale');
    const inFinale = firstFinale >= 0 && k >= firstFinale;
    const group = inFinale ? { key: 'finale', label: 'Finale' } : { key: 'd' + d, label: c.short(d) };
    const join = (...xs) => xs.filter(Boolean).join(' · ');
    if (p.kind === 'b') return { title: p.title, kicker: join(capW(ordinal(d)) + ' ' + c.unit, 'l’inizio', meteo), short: p.title, group };
    if (p.kind === 'd') return { title: c.day(d), kicker: meteo, short: c.day(d), group };
    if (p.kind === 'n') return { title: c.night(d), kicker: meteo, short: c.night(d), group };
    if (p.kind === 'f') return { title: p.title, kicker: join('Evento speciale', c.of(d)), short: p.title, group };
    if (p.kind === 'dis') return { title: p.title, kicker: join('Disastro', c.of(d)), short: 'Disastro: ' + p.title, group };
    if (p.kind === 'finale') {
      const acts = P.filter((x) => x.kind === 'finale').length, n = k - firstFinale + 1;
      return { title: p.title, kicker: 'Scontro finale · atto ' + n + (hideTotal ? '' : ' di ' + acts), short: 'Finale, atto ' + n + ': ' + p.title, group };
    }
    if (p.kind === 'fallen') {
      if (inFinale) return { title: 'Il verdetto', kicker: c.recap + ' · dopo lo scontro finale', short: 'Il verdetto', group };
      return { title: c.recap, kicker: 'Bilancio ' + c.of(d), short: c.recap + ', ' + c.of(d).replace(/^del /, ''), group };
    }
    return { title: p.title, kicker: KIND[p.kind] || '', short: p.title, group };
  }
  // perché è scattato lo scontro finale: il limite di giorni, pochi superstiti o due innamorati
  function finaleReason(P, theme) {
    const f = P.findIndex((x) => x.kind === 'finale'); if (f < 0) return '';
    const c = calOf(theme), max = runMaxDays(), before = f > 0 ? P[f - 1].snap.alive.length : P[f].snap.alive.length;
    if (P[f].title === 'L\'ultimo atto') return 'Restano solo due concorrenti, e si amano: l’arena prepara il loro ultimo atto.';
    if (max && P[f].day >= max) return 'Si è arrivati al limite di ' + max + ' ' + c.units + ' scelto prima della partita: chi è ancora in gara va allo scontro finale, che si gioca dopo l’ultima notte.';
    return 'Restano solo ' + before + ' concorrenti: l’arena non aspetta ' + (max ? 'il limite di ' + max + ' ' + c.units : 'la fine del calendario') + ' e chiama lo scontro finale.';
  }
  // un giorno detto per esteso, per tabelle e schede («3º giorno», «finale»)
  // la durata detta chiaramente: quanti giorni, rispetto al limite scelto
  function durTxt(theme) { const c = calOf(theme), m = runMaxDays(); return plural(SIM.days, c.unit, c.units) + (m ? (SIM.days >= m ? ' (il limite scelto)' : ' su ' + m + ' al massimo') : ''); }
  // lo stesso nome di fase per gli strumenti facoltativi (studio.js)
  if (typeof window !== 'undefined') window.LOS_PHASE_NAME = (result, k) => { try { return result && result.phases[k] ? phaseInfo(result.phases, k, resultTheme(result), false).short : ''; } catch (e) { return ''; } };
  function whenLabel(theme, phaseIndex, day) {
    const P = SIM && SIM.phases; const f = P ? P.findIndex((x) => x.kind === 'finale') : -1;
    if (f >= 0 && phaseIndex != null && phaseIndex >= f) return 'Finale';
    return capW(calOf(theme).short(day || 1).toLowerCase());
  }
  const DIFFS = [
    ['bassa', 'Bassa', 'Partite lunghe, pochi morti', 1], ['normale', 'Normale', 'L\'equilibrio classico', 2],
    ['alta', 'Alta', 'L\'arena non perdona', 3], ['massacro', 'Massacro', 'Finisce in pochi giorni', 4],
  ];
  function difficultyCopy(v, theme) {
    const base = DIFFS.find((d) => d[0] === v) || DIFFS[1];
    if (!theme.soft) return base;
    return [base[0], v === 'massacro' ? 'Spietata' : base[1], { bassa: 'Poche eliminazioni, ritmo tranquillo', normale: 'L\'equilibrio classico', alta: 'La competizione non perdona', massacro: 'Eliminazioni più frequenti' }[base[0]], base[3]];
  }
  function renderDifficulty() {
    $('#diffSeg').innerHTML = DIFFS.map(([v]) => difficultyCopy(v, THEMES[S.settings.theme])).map(([v, n, d, k]) => '<button type="button" role="radio" data-v="' + v + '" aria-checked="' + (S.settings.difficulty === v) + '"><span class="dtop"><b>' + n + '</b><span class="dmeter" aria-hidden="true">' + [1, 2, 3, 4].map((x) => '<i' + (x <= k ? ' class="on"' : '') + '></i>').join('') + '</span></span><small>' + d + '</small></button>').join('');
    radioFocus($('#diffSeg'));
  }

  /* ---------------- stato ---------------- */
  const S = {
    cast: [],
    settings: { theme: 'classico', difficulty: 'normale', seed: '', maxDays: 20, teamsAllied: true, teamWin: false, speed: 'normale', teamSize: 2, view: 'grid', adult: false, hideFuture: true, adaptivePlay: true, reduceMotion: false, followOnly: false, read: { density: 'comoda', size: 'normale', order: 'storia', echo: true, place: true, why: true, context: false, faces: true } },
    initialRelations: [], followed: [], seasons: [],
    custom: [],
    run: null,
    ui: null,
  };
  let SIM = null, BY = {}, playTimer = null, playing = false, lastRendered = -1, sideTab = 'map', editId = null, photoTarget = null;
  let runGeneration = 0;

  function newSeed() {
    const w = ['aurora', 'brace', 'cenere', 'duna', 'eco', 'falco', 'gelo', 'lampo', 'nebbia', 'ombra', 'quarzo', 'rovo', 'selce', 'tuono', 'vento', 'zolfo', 'ferro', 'corvo', 'lupo', 'brina'];
    return w[Math.floor(Math.random() * w.length)] + '-' + Math.floor(Math.random() * 9000 + 1000);
  }
  const teamColor = (team) => L.PALETTE[(Math.max(1, team) - 1) % L.PALETTE.length];

  let saveTimer = null, warnedQuota = false;
  function storeState(state) {
    const imgs = Object.fromEntries(state.cast.map((t) => [t.id, t.img]));
    const out = state.run && state.run.cfg ? Object.assign({}, state, { run: Object.assign({}, state.run, { cfg: Object.assign({}, state.run.cfg, { cast: state.run.cfg.cast.map((t) => (t.img && imgs[t.id] === t.img ? Object.assign({}, t, { img: '@cast' }) : t)) }) }) }) : state;
    try { localStorage.setItem(KEY, JSON.stringify(out)); warnedQuota = false; return true; }
    catch (e) { if (!warnedQuota) { warnedQuota = true; toast('Lo spazio del browser è pieno: le ultime modifiche non sono state salvate. Esporta i dati importanti o prova con foto più piccole.'); } return false; }
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => storeState(S), 250);
  }
  function commitSeasons(seasons) {
    clearTimeout(saveTimer);
    if (!storeState({ ...S, seasons })) return false;
    S.seasons = seasons; return true;
  }
  function persistRun(run, result) {
    if (!REPLAY) return Promise.resolve(false);
    run.replayId = run.replayId || REPLAY.createId();
    run.replaySaved = false;
    return REPLAY.save(run.replayId, result, { configuration: run.cfg }).then(() => {
      run.replaySaved = true;
      if (S.run === run) save();
      return true;
    }).catch(() => {
      if (S.run === run) toast('La partita non è stata salvata. Mantieni aperta questa pagina per continuare.');
      return false;
    });
  }
  function load() {
    load.warning = '';
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (!record(d)) return false;
      const warnings = [];
      const next = { cast: Array.isArray(d.cast) ? normalizeCast(d.cast) : S.cast,
        settings: sanitizeSettings(d.settings), custom: S.custom,
        run: null, ui: d.ui === 'light' || d.ui === 'dark' ? d.ui : S.ui };
      next.followed = Array.isArray(d.followed) ? [...new Set(d.followed.filter(validId))].slice(0, 2000) : [];
      try { next.initialRelations = d.initialRelations == null ? [] : L.normalizeInitialRelations(d.initialRelations, next.cast); }
      catch (e) { next.initialRelations = []; warnings.push('Legami iniziali non validi esclusi: ' + e.message); }
      next.seasons = Array.isArray(d.seasons) && typeof studio !== 'undefined' && studio ? studio.restoreSeasons(d.seasons, warnings) : [];
      if (own(d, 'custom')) {
        // I vecchi salvataggi potevano contenere eventi accettati senza tutti i controlli.
        // Si recuperano quelli validi; l'importazione di un nuovo file resta invece atomica.
        next.custom = [];
        const list = Array.isArray(d.custom) ? d.custom : [], used = new Set();
        const reserved = new Set(list.filter((c) => record(c) && validId(c.id)).map((c) => c.id));
        let discarded = Array.isArray(d.custom) ? 0 : 1;
        list.forEach((c) => {
          const out = sanitizeCustom(c);
          if (!out || used.has(out.id)) { discarded++; return; }
          if (c.id == null || c.id === '') while (used.has(out.id) || reserved.has(out.id)) out.id = inputId('e');
          used.add(out.id); next.custom.push(out);
        });
        if (discarded) warnings.push('Cast e regole recuperati; ' + discarded + (discarded === 1 ? ' evento personalizzato non valido escluso.' : ' eventi personalizzati non validi esclusi.'));
      }
      if (record(d.run) && record(d.run.cfg) && Array.isArray(d.run.cfg.cast) && own(THEMES, d.run.cfg.theme)) {
        // Una partita danneggiata non deve impedire di recuperare cast e impostazioni.
        try {
          const imgs = Object.fromEntries(next.cast.map((t) => [t.id, t.img]));
          const cast = normalizeCast(d.run.cfg.cast.map((t) => record(t) && t.img === '@cast' ? Object.assign({}, t, { img: imgs[t.id] || '' }) : t));
          const custom = d.run.cfg.custom == null ? [] : normalizeCustoms(d.run.cfg.custom);
          if (d.run.replayId != null && !validId(d.run.replayId)) throw new Error('Riferimento alla partita non valido.');
          const initialRelations = L.normalizeInitialRelations(d.run.cfg.initialRelations, cast);
          if (cast.length >= 2) next.run = Object.assign({}, d.run, { cfg: Object.assign({}, d.run.cfg, { cast, custom, initialRelations }) });
        } catch (e) { warnings.push('La partita salvata contiene dati non validi e non è stata ripresa.'); }
      }
      Object.assign(S, next);
      load.warning = warnings.join(' ');
      return true;
    } catch (e) {
      load.warning = 'Salvataggio non caricato: ' + e.message + ' I dati conservati nel browser non sono stati modificati.';
      return false;
    }
  }

  // preferenze di lettura della diretta, sempre complete e valide
  function readPrefs(r) {
    const d = { density: 'comoda', size: 'normale', order: 'storia', echo: true, place: true, why: true, context: false, faces: true }, o = Object.assign({}, d);
    if (!r || typeof r !== 'object') return o;
    if (['comoda', 'compatta'].includes(r.density)) o.density = r.density;
    if (['normale', 'grande'].includes(r.size)) o.size = r.size;
    if (['storia', 'gravi'].includes(r.order)) o.order = r.order;
    ['echo', 'place', 'why', 'context', 'faces'].forEach((k) => { if (typeof r[k] === 'boolean') o[k] = r[k]; });
    return o;
  }
  function sanitizeSettings(x, base) {
    const st = Object.assign({}, base || S.settings);
    if (!record(x)) return st;
    if (own(THEMES, x.theme)) st.theme = x.theme;
    if (own(L.DIFF, x.difficulty)) st.difficulty = x.difficulty;
    if (typeof x.seed === 'string') st.seed = x.seed.slice(0, 60);
    if (+x.maxDays >= 5 && +x.maxDays <= 40) st.maxDays = Math.round(+x.maxDays);
    if (own(SPEED, x.speed)) st.speed = x.speed;
    if ([1, 2, 3, 4].includes(+x.teamSize)) st.teamSize = +x.teamSize;
    if (x.view === 'grid' || x.view === 'team') st.view = x.view;
    ['teamsAllied', 'teamWin', 'adult', 'hideFuture', 'adaptivePlay', 'reduceMotion', 'followOnly'].forEach((k) => { if (typeof x[k] === 'boolean') st[k] = x[k]; });
    st.read = readPrefs(record(x.read) ? Object.assign({}, st.read, x.read) : st.read);
    return st;
  }
  function sanitizeTribute(t, i) {
    if (!record(t)) return null;
    const attr = {};
    D.attrs.forEach((a) => { const v = Math.round(+((t.attr || {})[a.id])); attr[a.id] = v >= 1 && v <= 10 ? v : 5; });
    const team = Math.max(1, Math.min(99, Math.round(+t.team) || (i || 0) + 1));
    return {
      id: validId(t.id) ? t.id : inputId('c'),
      name: String(t.name || '').slice(0, 40), gender: ['M', 'F', 'N'].includes(t.gender) ? t.gender : 'M', team, color: teamColor(team),
      img: typeof t.img === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(t.img) && t.img.length < 400000 ? t.img : '',
      traits: [...new Set((Array.isArray(t.traits) ? t.traits : []).filter((x) => own(TRAITS, x)))].slice(0, 3), attr,
    };
  }
  function normalizeCast(cast) {
    if (!Array.isArray(cast)) throw new Error('Il cast deve essere un elenco di concorrenti.');
    const used = new Set();
    cast.forEach((t, i) => {
      if (!record(t)) throw new Error('Concorrente ' + (i + 1) + ': dati non validi.');
      if (t.id == null || t.id === '') return;
      if (!validId(t.id)) throw new Error('Concorrente ' + (i + 1) + ': identificativo non valido (massimo 40 caratteri, senza parentesi graffe o nomi riservati).');
      if (used.has(t.id)) throw new Error('Identificativo duplicato nel cast: ' + t.id + '. Ogni concorrente deve averne uno diverso.');
      used.add(t.id);
    });
    return cast.map((t, i) => {
      const out = sanitizeTribute(t, i);
      if (t.id == null || t.id === '') { while (used.has(out.id)) out.id = inputId('c'); used.add(out.id); }
      return out;
    });
  }
  function sanitizeCustom(c) {
    if (!record(c)) return null;
    if (c.raw != null) {
      if (validateCustom(c)) return null;
      const ev = L.parseLine(c.raw, 'custom');
      const advanced = { id: c.id == null || c.id === '' ? inputId('e') : c.id, phase: c.phase == null ? 'tutte' : c.phase, raw: c.raw.trim(), n: ev.n, text: ev.text, dies: [], killer: '' };
      return validId(advanced.id) ? advanced : null;
    }
    const out = { id: c.id == null || c.id === '' ? inputId('e') : c.id,
      phase: c.phase == null ? 'tutte' : c.phase, n: c.n == null ? 1 : +c.n,
      text: typeof c.text === 'string' ? c.text.trim() : c.text,
      dies: c.dies == null ? [] : c.dies, killer: c.killer == null ? '' : c.killer };
    if (!validId(out.id) || validateCustom(out)) return null;
    out.dies = out.dies.slice();
    return out;
  }
  function normalizeCustoms(custom) {
    if (!Array.isArray(custom)) throw new Error('Gli eventi personalizzati devono essere un elenco.');
    const used = new Set();
    // Si riservano prima gli ID presenti, così quelli nuovi non possono sostituirli.
    custom.forEach((c, i) => {
      if (!record(c)) throw new Error('Evento ' + (i + 1) + ': dati non validi.');
      if (c.id == null || c.id === '') return;
      if (!validId(c.id)) throw new Error('Evento ' + (i + 1) + ': identificativo non valido.');
      if (used.has(c.id)) throw new Error('Identificativo duplicato negli eventi: ' + c.id + '.');
      used.add(c.id);
    });
    return custom.map((c, i) => {
      const out = sanitizeCustom(c);
      if (!out) throw new Error('Evento ' + (i + 1) + ': ' + (validateCustom(c) || 'dati non validi.'));
      if (c.id == null || c.id === '') { while (used.has(out.id)) out.id = inputId('e'); used.add(out.id); }
      return out;
    });
  }

  /* ---------------- utilità ---------------- */
  function initials(name) {
    const p = String(name || '?').trim().split(/\s+/).filter(Boolean);
    return ((p[0] || '?')[0] + (p.length > 1 ? p[p.length - 1][0] : (p[0] || '')[1] || '')).toUpperCase();
  }
  function avHTML(t, opt) {
    opt = opt || {};
    const sil = !t.img && ART.assets.sagome && ART.assets.sagome.length ? silIndex(t.id) : -1;
    const inner = t.img ? '<img src="' + esc(t.img) + '" alt="">' : sil >= 0 ? '<i class="sil sil-' + sil + '" aria-hidden="true"></i><span class="ini">' + esc(initials(t.name)) + '</span>' : esc(initials(t.name));
    const cls = 'av' + (opt.dead ? ' dead' : '') + (sil >= 0 ? ' has-sil' : '');
    const st = 'style="--c:' + esc(t.color || teamColor(t.team || 1)) + '"';
    if (opt.btn) return '<button type="button" class="' + cls + '" ' + st + ' data-prof="' + esc(t.id) + '" title="' + esc(t.name) + '" aria-label="Scheda di ' + esc(t.name) + '">' + inner + '</button>';
    return '<span class="' + cls + '" ' + st + ' title="' + esc(t.name) + '">' + inner + '</span>';
  }
  function silIndex(id) { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % ART.assets.sagome.length; }
  const linkify = (html) => html.replace(/<b class="nm" data-id="/g, '<button type="button" class="nm" data-prof="').replace(/<\/b>/g, '</button>');
  let toastTimer;
  // un messaggio breve, con un'azione facoltativa (per esempio «Annulla»)
  function toast(msg, action) {
    const el = $('#toast'); el.textContent = msg; el.classList.toggle('withact', !!action);
    if (action) { const b = document.createElement('button'); b.type = 'button'; b.className = 'tact'; b.textContent = action.label; b.addEventListener('click', () => { el.hidden = true; action.fn(); }); el.appendChild(b); }
    el.hidden = false; if (!AN.reduced) el.animate([{ opacity: 0, transform: 'translate(-50%, 12px)' }, { opacity: 1, transform: 'translate(-50%, 0)' }], { duration: 220, easing: 'ease-out' });
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), action ? 6000 : 3400);
  }
  function copyText(text, okMsg) {
    const fallback = () => {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* niente */ }
      ta.remove(); toast(ok ? okMsg : 'Il browser ha bloccato la copia: seleziona il testo e copialo a mano.');
    };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(okMsg), fallback); else fallback(); }
    catch (e) { fallback(); }
  }
  const nTeams = () => new Set(S.cast.map((t) => t.team)).size;
  const plural = (n, s, p) => n + ' ' + (n === 1 ? s : p);
  function setHue(id) { const t = THEMES[id]; if (t) document.documentElement.style.setProperty('--h', t.hue); }

  /* ---------------- tema chiaro/scuro ---------------- */
  function applyUi() { if (S.ui) document.documentElement.dataset.theme = S.ui; else delete document.documentElement.dataset.theme; }
  $('#themeBtn').addEventListener('click', () => {
    const cur = S.ui || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    S.ui = cur === 'dark' ? 'light' : 'dark'; applyUi(); save();
  });

  /* ---------------- navigazione ---------------- */
  const VIEWS = ['home', 'cast', 'arena', 'diretta', 'esito'];
  let curView = '';
  function radioFocus(group) {
    if (!group) return;
    $$('[role="radio"]', group).forEach((b) => { b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1; });
  }
  document.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const b = e.target.closest('[role="radio"], [role="tab"]'); if (!b) return;
    const group = b.closest('[role="radiogroup"], [role="tablist"]'); if (!group) return;
    const options = $$('[role="radio"], [role="tab"]', group).filter((x) => !x.disabled);
    const current = options.indexOf(b); if (current < 0) return;
    const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
    const at = e.key === 'Home' ? 0 : e.key === 'End' ? options.length - 1 : (current + step + options.length) % options.length;
    e.preventDefault(); options[at].click(); options[at].focus();
  });
  function route() {
    let v = (location.hash || '').slice(1);
    if (!VIEWS.includes(v)) v = 'home';
    const changed = v !== curView; curView = v;
    VIEWS.forEach((x) => ($('#v-' + x).hidden = x !== v));
    const order = ['cast', 'arena', 'diretta', 'esito'];
    const reached = { cast: S.cast.length > 1, arena: !!SIM, diretta: !!SIM && S.run && (S.run.seen || 0) >= SIM.phases.length - 1, esito: false };
    $$('.steps a').forEach((a) => {
      a.dataset.tab === v ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
      a.classList.toggle('done', !!reached[a.dataset.tab] && order.indexOf(a.dataset.tab) < order.indexOf(v));
    });
    $('#liveDot').hidden = !SIM;
    if (v !== 'diretta') stopPlay();
    if (v !== 'home') stopHomeLoop();
    if (v === 'home' && ART.assets.logo) document.documentElement.style.setProperty('--h', 162);
    else setHue((v === 'diretta' || v === 'esito') && SIM ? SIM.theme : S.settings.theme);
    if (v === 'home') renderHome();
    if (v === 'cast') { renderCast(); if (changed) playEntrance('castenter'); }
    if (v === 'arena') renderArena();
    if (v === 'diretta') renderLive(true);
    if (v === 'esito') renderResults();
    if (changed) { window.scrollTo({ top: 0, behavior: 'auto' }); const sec = $('#v-' + v); sec.classList.remove('view-enter'); void sec.offsetWidth; sec.classList.add('view-enter'); const title = $('h1, h2', sec) || sec; title.tabIndex = -1; title.focus({ preventScroll: true }); }
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('click', (e) => {
    const q = e.target.closest('[data-quick]'); if (q) { e.preventDefault(); quickPlay(); return; }
    const p = e.target.closest('[data-prof]'); if (p && SIM) { e.preventDefault(); openProfile(p.dataset.prof); return; }
    const c = e.target.closest('[data-close]'); if (c) c.closest('dialog').close();
  });
  $$('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  /* =============== HOME =============== */
  let homeTimer = null, demo = null, demoI = 0, demoPending = false;
  function renderHome() {
    if (typeof studio !== 'undefined' && studio) studio.renderSeasons();
    $('#facts').innerHTML = [[COUNTS.events, 'modelli di evento, più ' + COUNTS.adultEvents + ' per adulti'], [COUNTS.disasters, 'disastri, più ' + COUNTS.adultDisasters + ' per adulti'], [D.themes.length, 'arene da esplorare'], [D.traits.length + ' · ' + D.attrs.length, 'tratti e caratteristiche che cambiano la storia']]
      .map(([n, l]) => '<div class="fact"><b>' + n + '</b><span>' + l + '</span></div>').join('');
    $('#arenaStrip').innerHTML = D.themes.map((t) => posterHTML(t, false, 'a')).join('');
    const r = $('#resume');
    if (SIM) {
      const th = THEMES[SIM.theme]; const done = (S.run.seen || 0) >= SIM.phases.length - 1;
      r.hidden = false; r.className = 'resume card';
      r.innerHTML = '<div class="rtext"><div class="eyebrow">' + (done ? 'Ultima partita' : 'Partita in corso') + '</div><b>' + esc(th.name) + '</b><div class="muted">' + SIM.tributes.length + ' concorrenti · fase ' + ((S.run.phase || 0) + 1) + (S.settings.hideFuture && !done ? '' : ' di ' + SIM.phases.length) + '</div></div>' +
        '<a class="btn primary" href="#diretta">' + (done ? 'Rivedi la diretta' : 'Riprendi la diretta') + '</a>' + (done ? '<a class="btn" href="#esito">Vedi l\'esito</a>' : '');
    } else r.hidden = true;
    startHomeLoop();
    renderStories();
    $$('#facts .fact b').forEach((b) => { const n = parseInt(b.textContent, 10); if (!isNaN(n) && /^\d+$/.test(b.textContent)) AN.countTo(b, n, { from: 0, dur: 1400 }); });
    AN.field($('.homehero'), 'brand', { cls: 'fx-hero' });
    AN.parallax($('.homehero'), $('#heroScenes'));
    AN.tilt($('#arenaStrip'), '.poster-card');
    AN.reveal($$('#v-home .how, #v-home .story, #v-home .pillar, #v-home .poster-card, #v-home .stories-head'));
  }
  function posterHTML(t, selectable, tag) {
    const inner = '<span class="pscene" aria-hidden="true">' + ART.scene(t.id) + '</span><span class="pcheck" aria-hidden="true">✓</span><span class="picon" aria-hidden="true">' + ART.icon(t.id, 18) + '</span>' +
      (t.soft ? '<span class="psoft">Senza morti</span>' : '') + '<b>' + esc(t.name) + '</b><small>' + esc(t.tag) + '</small>';
    if (tag === 'a') return '<a class="poster-card" href="#arena" data-theme="' + t.id + '" style="--ph:' + t.hue + '">' + inner + '</a>';
    return '<button type="button" class="poster-card" role="radio" aria-checked="' + !!selectable + '" data-theme="' + t.id + '" style="--ph:' + t.hue + '">' + inner + '</button>';
  }
  $('#arenaStrip').addEventListener('click', (e) => { const a = e.target.closest('[data-theme]'); if (a) { S.settings.theme = a.dataset.theme; save(); } });
  function startHomeLoop() {
    stopHomeLoop();
    if (!demo) {
      // la partita dimostrativa si calcola quando il browser è libero, per non rallentare il primo caricamento
      if (demoPending) return;
      demoPending = true;
      (window.requestIdleCallback || ((f) => setTimeout(f, 120)))(() => {
        demoPending = false;
        try { demo = L.simulate({ cast: L.randomCast(24, 'vetrina', 2), theme: S.settings.theme, seed: 'vetrina', difficulty: 'alta', teamsAllied: true }); } catch (e) { demo = null; }
        if (demo && curView === 'home') startHomeLoop();
      }, { timeout: 700 });
      return;
    }
    const evs = []; demo.phases.forEach((p) => p.events.forEach((e) => evs.push({ e, p })));
    const total = demo.tributes.length;
    const draw = () => {
      if (demoI >= evs.length) demoI = 0;
      const { e, p } = evs[demoI];
      const deadSoFar = new Set();
      for (let k = 0; k <= demoI; k++) evs[k].e.deaths.forEach((id) => deadSoFar.add(id));
      $('#hbAlive').textContent = total - deadSoFar.size;
      $('#hbDay').textContent = (KIND[p.kind] === 'Apertura' ? 'Apertura' : 'Giorno ' + p.day);
      $('#hbTally').innerHTML = '<i class="d"></i>'.repeat(deadSoFar.size) + '<i></i>'.repeat(total - deadSoFar.size);
      $('#hbLine').innerHTML = e.html.replace(/<b class="nm"[^>]*>/g, '<b>');
      demoI++;
    };
    draw();
    if (!AN.reduced) homeTimer = setInterval(draw, 2300);
  }
  function stopHomeLoop() { if (homeTimer) { clearInterval(homeTimer); homeTimer = null; } }
  function quickPlay() {
    const themes = D.themes.map((t) => t.id);
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const cast = L.randomCast(24, Math.random().toString(36), 2).map(sanitizeTribute);
    runSim({ cast, theme, difficulty: 'normale', seed: newSeed(), maxDays: 20, teamsAllied: true, teamWin: false, custom: S.custom.slice(), adult: !!S.settings.adult });
    toast('Partita lampo: ' + THEMES[theme].name + ' con 24 concorrenti casuali. Il tuo cast non è stato toccato.');
  }
  $('#quickPlay').addEventListener('click', quickPlay);

  /* =============== CONCORRENTI =============== */
  const ATTR_SHORT = { for: 'FOR', agi: 'AGI', int: 'INT', car: 'CAR', fort: 'FRT', res: 'RES', furt: 'FUR', cor: 'COR', emp: 'EMP', sop: 'SOP' };
  // il punto forte e il punto debole, in parole
  function profileLine(t) {
    const a = D.attrs.map((x) => [x, t.attr[x.id] != null ? t.attr[x.id] : 5]);
    const hi = a.slice().sort((x, y) => y[1] - x[1])[0], lo = a.slice().sort((x, y) => x[1] - y[1])[0];
    const avg = a.reduce((s2, x) => s2 + x[1], 0) / a.length;
    if (hi[1] - lo[1] <= 2) return { txt: '<span class="pl-eq">Equilibrat' + G3(t.gender, 'o', 'a', 'ə') + ' in tutto</span>', avg };
    return { txt: '<span class="pl-hi">Forte in <b>' + esc(hi[0].name) + '</b></span>' + (lo[1] <= 4 ? '<span class="pl-lo">Debole in <b>' + esc(lo[0].name) + '</b></span>' : ''), avg };
  }
  function attrStrip(t) {
    return '<span class="astrip" aria-hidden="true">' + D.attrs.map((a) => { const v = t.attr[a.id] != null ? t.attr[a.id] : 5; return '<i class="' + (v >= 8 ? 'hi' : v <= 3 ? 'lo' : '') + '" style="--v:' + v + '" title="' + esc(a.name) + ' ' + v + '"></i>'; }).join('') + '</span>';
  }
  function tileHTML(t, i, showOrder) {
    const traits = t.traits.map((id) => '<span class="chip" title="' + esc(TRAITS[id].desc) + '">' + esc(TRAITS[id].name) + '</span>').join('') +
      (t.traits.length < 3 ? '<button type="button" class="chip addtrait" data-act="edit">+ ' + (t.traits.length ? 'tratto' : 'Aggiungi un tratto') + '</button>' : '');
    const pf = profileLine(t);
    const gi = { M: 0, F: 1, N: 2 }[t.gender] || 0;
    return '<article class="tile" data-id="' + esc(t.id) + '" style="--ti:' + Math.min(i, 30) + ';--c:' + esc(t.color || teamColor(t.team)) + '">' +
      '<button class="grip" type="button" aria-label="Trascina per riordinare" title="Trascina per riordinare">' + GRIP + '</button>' +
      '<div class="thead">' +
        '<button class="avbtn" type="button" data-act="photo" aria-label="' + (t.img ? 'Cambia la foto di ' : 'Cerca o carica una foto per ') + esc(t.name || 'questo concorrente') + '">' + avHTML(t) + '<span class="cam">' + IC.cam + '</span></button>' +
        '<div class="tid"><input class="tname" type="text" id="name-' + esc(t.id) + '" data-f="name" value="' + esc(t.name) + '" placeholder="Nome" aria-label="Nome" maxlength="40" autocomplete="off">' +
        '<div class="tsub"><span class="teamchip"><i></i>Squadra ' + t.team + '</span></div></div>' +
      '</div>' +
      '<div class="tprofile">' + attrStrip(t) + '<span class="tpl">' + pf.txt + '</span></div>' +
      '<div class="chips">' + traits + '</div>' +
      '<div class="tfoot">' +
        '<div class="gsel" role="group" aria-label="Genere" style="--gi:' + gi + '">' + ['M', 'F', 'N'].map((g) => '<button type="button" data-act="g" data-v="' + g + '" aria-pressed="' + (t.gender === g) + '">' + G3(g, 'Lui', 'Lei', 'Neutro') + '</button>').join('') + '</div>' +
        '<button class="btn sm tedit" type="button" data-act="edit"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>Modifica</button>' +
        '<button class="tmenu" type="button" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="Altre azioni per ' + esc(t.name || 'questo concorrente') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg></button>' +
      '</div>' +
      '<div class="tpop" role="menu" hidden>' +
        (showOrder ? '<button type="button" role="menuitem" data-act="up"' + (i === 0 ? ' disabled' : '') + '>↑ Sposta prima</button><button type="button" role="menuitem" data-act="down"' + (i === S.cast.length - 1 ? ' disabled' : '') + '>↓ Sposta dopo</button>' : '') +
        '<button type="button" role="menuitem" data-act="dup">Duplica</button>' +
        '<button type="button" role="menuitem" data-act="rand">Caratteristiche casuali</button>' +
        '<button type="button" role="menuitem" data-act="del" class="danger">Elimina</button>' +
      '</div>' +
    '</article>';
  }
  // aggiorna il DOM sul posto: le schede già presenti restano gli stessi nodi
  // (niente foto ricaricate, niente animazioni ripartite), cambiano solo i pezzi diversi
  function morph(a, b) {
    if (a.isEqualNode(b)) return;
    for (const at of [...a.attributes]) if (!b.hasAttribute(at.name)) a.removeAttribute(at.name);
    for (const at of [...b.attributes]) if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value);
    if (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA') { if (a !== document.activeElement && a.value !== b.value) a.value = b.value; return; }
    morphKids(a, b);
  }
  function morphKids(a, b) {
    const ac = [...a.childNodes], bc = [...b.childNodes];
    const keyed = bc.some((n) => n.nodeType === 1 && n.dataset.id);
    if (keyed) {
      const old = new Map(); ac.forEach((n) => { if (n.nodeType === 1 && n.dataset && n.dataset.id) old.set(n.dataset.id, n); });
      const next = bc.map((n) => { const o = n.nodeType === 1 && n.dataset.id && old.get(n.dataset.id); if (o) { old.delete(n.dataset.id); morph(o, n); return o; } return n; });
      // sposta solo i nodi fuori posto, così chi resta fermo non viene staccato
      ac.forEach((n) => { if (!next.includes(n)) n.remove(); });
      next.forEach((n, k) => { if (a.childNodes[k] !== n) a.insertBefore(n, a.childNodes[k] || null); });
      return;
    }
    if (ac.length !== bc.length || ac.some((n, k) => n.nodeType !== bc[k].nodeType || n.nodeName !== bc[k].nodeName || (n.nodeType === 1 && n.className !== bc[k].className && !n.classList.contains('tile')))) { a.replaceChildren(...bc); return; }
    ac.forEach((n, k) => { if (n.nodeType === 1) morph(n, bc[k]); else if (n.data !== bc[k].data) n.data = bc[k].data; });
  }
  function patchHTML(el, html) {
    const tmp = document.createElement(el.tagName); tmp.innerHTML = html; morphKids(el, tmp);
  }
  // animazioni della griglia: chi si sposta scivola, chi arriva entra, chi esce svanisce
  function castRects() { const m = new Map(); $$('#castList .tile').forEach((el) => m.set(el.dataset.id, el.getBoundingClientRect())); return m; }
  function castFlip(before, fresh) {
    if (AN.reduced || !before) return;
    $$('#castList .tile').forEach((el) => {
      const a = before.get(el.dataset.id), b = el.getBoundingClientRect();
      if (a) {
        const dx = a.left - b.left, dy = a.top - b.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
      } else if (!fresh || fresh.has(el.dataset.id)) {
        el.animate([{ opacity: 0, transform: 'scale(.86) translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1.25)' });
        el.classList.add('fresh'); setTimeout(() => el.classList.remove('fresh'), 1400);
      }
    });
  }
  function rerender(fresh) { const before = castRects(); renderCast(); castFlip(before, fresh); }
  // l'ingresso delle schede si vede una volta sola: poi la classe sparisce,
  // così le schede ridisegnate più tardi non rifanno l'animazione
  let entranceTimer = null;
  function playEntrance(cls) {
    const cl = $('#castList'); clearTimeout(entranceTimer);
    cl.classList.remove('castenter', 'castdeal');
    if (AN.reduced) return;
    void cl.offsetWidth; cl.classList.add(cls);
    entranceTimer = setTimeout(() => cl.classList.remove(cls), 1400 + Math.min(S.cast.length, 30) * 35);
  }
  function castLeave(id, done) {
    const el = $('#castList .tile[data-id="' + CSS.escape(id) + '"]');
    if (!el || AN.reduced) return done();
    el.style.pointerEvents = 'none';
    el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.85) rotate(-2deg)' }], { duration: 260, easing: 'ease-in', fill: 'forwards' }).onfinish = done;
  }
  function renderCast() {
    if (typeof studio !== 'undefined' && studio) studio.renderRelations();
    $$('#viewSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.settings.view));
    $('#teamSize').value = String(S.settings.teamSize || 2);
    const add = '<button class="addtile" type="button" id="addOne"><span class="plus" aria-hidden="true">+</span><span>Aggiungi concorrente</span></button>';
    closeMenus();
    if (!S.cast.length) {
      $('#castOverview').hidden = true;
      $('#castList').innerHTML = '<div class="castempty card"><div class="ce-art" aria-hidden="true">' + (ART.assets.sagome || []).slice(0, 3).map((u, k) => '<i class="sil sil-' + k + '"></i>').join('') + '</div><h2>Ancora nessun concorrente</h2><p>Genera un cast casuale, incolla un elenco di nomi oppure aggiungili uno alla volta.</p>' +
        '<div class="row center"><button class="btn primary lg" type="button" data-empty="gen">Genera ' + $('#presetSize').value + ' concorrenti</button><button class="btn lg" type="button" data-empty="bulk">Incolla un elenco</button><button class="btn lg" type="button" data-empty="add">Aggiungi a mano</button></div></div>';
      updateCounts(); return;
    }
    if (S.settings.view === 'team') {
      const teams = {};
      S.cast.forEach((t, i) => (teams[t.team] = teams[t.team] || []).push([t, i]));
      patchHTML($('#castList'), '<div class="teamwrap">' + Object.keys(teams).sort((a, b) => a - b).map((k) => {
        const ms = teams[k].map((x) => x[0]);
        const avg = ms.reduce((s2, t) => s2 + D.attrs.reduce((q, a) => q + (t.attr[a.id] || 5), 0) / D.attrs.length, 0) / ms.length;
        return '<section class="teamblock card" style="--c:' + teamColor(+k) + '"><h3><i></i><b>Squadra ' + k + '</b><span class="tbcount"><em class="fcount">' + plural(ms.length, 'concorrente', 'concorrenti') + '</em><em class="fcount">Media <b>' + avg.toFixed(1).replace('.', ',') + '</b></em></span>' +
          '<button type="button" class="teamadd" data-team="' + k + '" aria-label="Aggiungi un concorrente alla squadra ' + k + '">+</button></h3><div class="castgrid">' + teams[k].map(([t, i]) => tileHTML(t, i, false)).join('') + '</div></section>';
      }).join('') + '</div><div class="castgrid" style="margin-top:14px">' + add + '</div>');
    } else {
      patchHTML($('#castList'), '<div class="castgrid">' + S.cast.map((t, i) => tileHTML(t, i, true)).join('') + add + '</div>');
    }
    updateCounts(); renderOverview(); applySearch();
  }
  let castQuery = '';
  // la panoramica del cast: numeri, generi, squadre, tratti, ricerca
  function renderOverview() {
    const n = S.cast.length, el = $('#castOverview'); el.hidden = !n; if (!n) return;
    const g = { M: 0, F: 0, N: 0 }; S.cast.forEach((t) => g[t.gender]++);
    const photos = S.cast.filter((t) => t.img).length;
    const tc = {}; S.cast.forEach((t) => t.traits.forEach((x) => (tc[x] = (tc[x] || 0) + 1)));
    const topT = Object.entries(tc).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const teams = [...new Set(S.cast.map((t) => t.team))].sort((a, b) => a - b);
    const avg = S.cast.reduce((s2, t) => s2 + D.attrs.reduce((q, a) => q + (t.attr[a.id] || 5), 0) / D.attrs.length, 0) / n;
    const had = !!$('#ovSearch');
    if (!had) el.innerHTML = '<label class="ovsearch"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><input type="search" id="ovSearch" placeholder="Cerca per nome, tratto o squadra" aria-label="Cerca tra i concorrenti" autocomplete="off"></label><div class="ovstats" id="ovStats"></div>';
    const stat = (v, l, extra) => '<div class="ovs"><b>' + v + '</b><span>' + l + '</span>' + (extra || '') + '</div>';
    $('#ovStats').innerHTML =
      '<div class="ovnums">' +
        stat(n, n === 1 ? 'Concorrente' : 'Concorrenti') +
        stat(teams.length, teams.length === 1 ? 'Squadra' : 'Squadre', '<span class="ovteams" aria-hidden="true">' + teams.slice(0, 16).map((k) => '<i style="--c:' + teamColor(k) + '"></i>').join('') + '</span>') +
        stat(g.M, 'Lui') + stat(g.F, 'Lei') + (g.N ? stat(g.N, g.N === 1 ? 'Neutro' : 'Neutri') : '') +
        stat(avg.toFixed(1).replace('.', ','), 'Media caratteristiche') +
        (photos ? stat(photos, 'Con foto') : '') +
      '</div>' +
      '<div class="ovtr">' + (topT.length ? '<span>Tratti più diffusi</span>' + topT.map(([x, c]) => '<span class="ovchip">' + esc(TRAITS[x].name) + '<i>' + c + '</i></span>').join('') : '<span>Nessun tratto assegnato: aprite <b>Modifica</b> per dare un carattere ai concorrenti.</span>') + '</div>';
  }
  function applySearch() {
    const q = castQuery.trim().toLowerCase();
    let shown = 0;
    $$('#castList .tile').forEach((el) => {
      const t = S.cast.find((x) => x.id === el.dataset.id); if (!t) return;
      const hay = (t.name + ' squadra ' + t.team + ' ' + t.traits.map((x) => TRAITS[x].name).join(' ')).toLowerCase();
      const ok = !q || hay.includes(q); el.classList.toggle('nomatch', !ok); if (ok) shown++;
    });
    $$('#castList .teamblock').forEach((b) => b.classList.toggle('nomatch', !!q && !b.querySelector('.tile:not(.nomatch)')));
    let nr = $('#castNoRes');
    if (q && !shown) { if (!nr) { nr = document.createElement('p'); nr.id = 'castNoRes'; nr.className = 'help noresult'; $('#castList').prepend(nr); } nr.textContent = 'Nessun concorrente corrisponde a «' + castQuery.trim() + '».'; }
    else if (nr) nr.remove();
  }
  $('#castOverview').addEventListener('input', (e) => { if (e.target.id === 'ovSearch') { castQuery = e.target.value; applySearch(); } });
  let lastCount = null;
  function updateCounts() {
    const n = S.cast.length;
    $('#tabCount').textContent = n || '';
    $('#castSummary').innerHTML = '<b id="dockN">' + n + '</b> ' + (n === 1 ? 'concorrente' : 'concorrenti') + ' · ' + plural(nTeams(), 'squadra', 'squadre');
    if (lastCount != null && lastCount !== n && curView === 'cast') { AN.countTo($('#dockN'), n, { from: lastCount, dur: 500 }); const d = $('.dockin'); if (d && !AN.reduced) d.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.015)' }, { transform: 'scale(1)' }], { duration: 300 }); }
    lastCount = n;
    const names = S.cast.map((t) => t.name.trim().toLowerCase()).filter(Boolean);
    const dup = names.filter((x, i) => names.indexOf(x) !== i);
    const empty = S.cast.filter((t) => !t.name.trim()).length;
    const msgs = [];
    if (n < 2) msgs.push('Servono almeno 2 concorrenti per giocare.');
    if (dup.length) msgs.push('Ci sono nomi ripetuti: ' + [...new Set(dup)].slice(0, 3).join(', ') + '. Nella diretta sarà difficile distinguerli.');
    if (empty) msgs.push(plural(empty, 'concorrente non ha', 'concorrenti non hanno') + ' un nome: verrà usato un nome provvisorio.');
    $('#castNotice').hidden = !msgs.length; $('#castNotice').textContent = msgs.join(' ');
  }
  const findT = (el) => { const c = el.closest('.tile'); return c ? S.cast.find((t) => t.id === c.dataset.id) : null; };
  function refreshTile(id) {
    const i = S.cast.findIndex((t) => t.id === id);
    const el = $('.tile[data-id="' + CSS.escape(id) + '"]');
    if (i < 0 || !el) return renderCast();
    const tmp = document.createElement('div'); tmp.innerHTML = tileHTML(S.cast[i], i, S.settings.view !== 'team');
    morph(el, tmp.firstChild);
    renderOverview(); applySearch();
  }
  function newName(g) { const used = new Set(S.cast.map((t) => t.name)); return D.names[g].find((x) => !used.has(x)) || 'Concorrente ' + (S.cast.length + 1); }
  function addTribute(open, team) {
    const g = S.cast.length % 2 ? 'M' : 'F';
    const ts = +S.settings.teamSize || 1;
    const t = sanitizeTribute({ name: newName(g), gender: g, team: team || Math.floor(S.cast.length / ts) + 1, traits: [], attr: {} });
    D.attrs.forEach((a) => (t.attr[a.id] = 3 + Math.floor(Math.random() * 6)));
    if (team) { const last = S.cast.map((x) => x.team).lastIndexOf(team); S.cast.splice(last + 1, 0, t); } else S.cast.push(t);
    rerender(new Set([t.id]));
    save();
    const el = $('.tile[data-id="' + CSS.escape(t.id) + '"]'); if (el) el.scrollIntoView({ block: 'nearest', behavior: AN.reduced ? 'auto' : 'smooth' });
    if (open) openEditor(t.id);
    else { const inp = $('#name-' + CSS.escape(t.id)); if (inp) { inp.focus({ preventScroll: true }); inp.select(); } }
  }
  // menu delle azioni di ogni scheda
  function closeMenus(except) { $$('#castList .tpop:not([hidden])').forEach((m) => { if (m !== except) { m.hidden = true; const b = m.parentElement.querySelector('.tmenu'); if (b) b.setAttribute('aria-expanded', 'false'); m.parentElement.classList.remove('menuopen'); } }); }
  document.addEventListener('click', (e) => { if (!e.target.closest('.tpop') && !e.target.closest('.tmenu')) closeMenus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const open = $('#castList .tpop:not([hidden])'); if (open) { closeMenus(); const b = open.parentElement.querySelector('.tmenu'); if (b) b.focus(); } } });
  let undoCast = null;
  $('#btnAdd').addEventListener('click', () => addTribute(true));
  $('#castList').addEventListener('click', (e) => {
    const em = e.target.closest('[data-empty]');
    if (em) { if (em.dataset.empty === 'gen') $('#btnRandom').click(); else if (em.dataset.empty === 'bulk') $('#btnBulk').click(); else addTribute(true); return; }
    if (e.target.closest('#addOne')) return addTribute(false);
    const ta = e.target.closest('.teamadd'); if (ta) return addTribute(false, +ta.dataset.team);
    const b = e.target.closest('[data-act]'); if (!b) return;
    const t = findT(b); if (!t) return;
    const i = S.cast.indexOf(t);
    const tile = b.closest('.tile');
    switch (b.dataset.act) {
      case 'edit': return openEditor(t.id);
      case 'photo': return openPhoto(t.id);
      case 'menu': {
        const m = tile.querySelector('.tpop'); const open = m.hidden;
        closeMenus(m); m.hidden = !open; b.setAttribute('aria-expanded', String(open)); tile.classList.toggle('menuopen', open);
        if (open) { const f = m.querySelector('button:not([disabled])'); if (f) f.focus(); if (!AN.reduced) m.animate([{ opacity: 0, transform: 'translateY(6px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 160, easing: 'ease-out' }); }
        return;
      }
      case 'g': {
        // il genere cambia sul posto: l'indicatore scivola
        t.gender = b.dataset.v; const gs = b.closest('.gsel');
        gs.style.setProperty('--gi', { M: 0, F: 1, N: 2 }[t.gender]);
        $$('button', gs).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const pl = tile.querySelector('.tpl'); if (pl) pl.innerHTML = profileLine(t).txt;
        renderOverview(); break;
      }
      case 'up': if (i > 0) { [S.cast[i - 1], S.cast[i]] = [S.cast[i], S.cast[i - 1]]; rerender(); $('.tile[data-id="' + CSS.escape(t.id) + '"] .tmenu')?.focus(); } break;
      case 'down': if (i < S.cast.length - 1) { [S.cast[i + 1], S.cast[i]] = [S.cast[i], S.cast[i + 1]]; rerender(); $('.tile[data-id="' + CSS.escape(t.id) + '"] .tmenu')?.focus(); } break;
      case 'dup': {
        const c = sanitizeTribute(JSON.parse(JSON.stringify(Object.assign({}, t, { id: undefined, name: (t.name + ' bis').slice(0, 40) }))));
        S.cast.splice(i + 1, 0, c); rerender(new Set([c.id])); toast(t.name + ' duplicat' + G3(t.gender, 'o', 'a', 'ə') + '.');
        break;
      }
      case 'rand': {
        D.attrs.forEach((a) => (t.attr[a.id] = 1 + Math.floor(Math.random() * 10)));
        refreshTile(t.id);
        const nt = $('.tile[data-id="' + CSS.escape(t.id) + '"]'); if (nt && !AN.reduced) { nt.classList.add('rolled'); setTimeout(() => nt.classList.remove('rolled'), 900); }
        break;
      }
      case 'del': {
        undoCast = { t, i }; closeMenus();
        castLeave(t.id, () => { S.cast = S.cast.filter((x) => x !== t); rerender(); save(); });
        toast(t.name + ' eliminat' + G3(t.gender, 'o', 'a', 'ə') + '.', { label: 'Annulla', fn: () => { if (!undoCast) return; S.cast.splice(Math.min(undoCast.i, S.cast.length), 0, undoCast.t); const id = undoCast.t.id; undoCast = null; rerender(new Set([id])); save(); } });
        return;
      }
      default: return;
    }
    save();
  });
  $('#castList').addEventListener('input', (e) => {
    if (e.target.dataset.f !== 'name') return;
    const t = findT(e.target); if (!t) return;
    t.name = e.target.value.slice(0, 40);
    const av = e.target.closest('.tile').querySelector('.avbtn .av');
    if (av && !t.img) { const ini = av.querySelector('.ini'); if (ini) ini.textContent = initials(t.name); else av.textContent = initials(t.name); }
    save();
  });
  $('#castList').addEventListener('change', (e) => { if (e.target.dataset.f === 'name') { updateCounts(); renderOverview(); } });
  // trascinamento
  let dragId = null;
  $('#castList').addEventListener('pointerdown', (e) => { const g = e.target.closest('.grip'); if (g) g.closest('.tile').draggable = true; });
  $('#castList').addEventListener('dragstart', (e) => {
    const c = e.target.closest('.tile'); if (!c) return;
    dragId = c.dataset.id; c.classList.add('dragging');
    try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', dragId); } catch (err) { /* niente */ }
  });
  $('#castList').addEventListener('dragover', (e) => {
    const c = e.target.closest('.tile'); if (!c || !dragId) return;
    e.preventDefault();
    $$('.tile.over').forEach((x) => x !== c && x.classList.remove('over'));
    if (c.dataset.id !== dragId) c.classList.add('over');
  });
  $('#castList').addEventListener('drop', (e) => {
    const c = e.target.closest('.tile'); if (!c || !dragId) return;
    e.preventDefault();
    const from = S.cast.findIndex((t) => t.id === dragId);
    const target = S.cast.find((t) => t.id === c.dataset.id);
    const [m] = S.cast.splice(from, 1);
    let to = S.cast.indexOf(target);
    const rect = c.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width / 2) to += 1;
    if (S.settings.view === 'team' && target) { m.team = target.team; m.color = teamColor(m.team); }
    S.cast.splice(to, 0, m);
    rerender(); save();
  });
  $('#castList').addEventListener('dragend', () => { dragId = null; $$('.tile').forEach((c) => { c.draggable = false; c.classList.remove('dragging', 'over'); }); });
  /* ---------- foto: ricerca sul web (Wikipedia, Openverse, Wikimedia Commons), file, incolla, trascina ---------- */
  const PH = window.LOS_PHOTO;
  let photoSrc0 = 'anime'; try { photoSrc0 = localStorage.getItem('los-photo-src') || 'anime'; } catch (e) { /* niente */ }
  const photo = { src: photoSrc0, q: '', items: [], next: null, ctl: null, cache: new Map(), timer: 0, web: false };
  // le fonti disponibili: «Web» solo se il sito ha la sua funzione di ricerca attiva
  const photoSources = () => Object.keys(PH.SOURCES).filter((k) => !PH.SOURCES[k].server || photo.web);
  function setPhotoSrc(k) {
    photo.src = photoSources().includes(k) ? k : 'anime';
    try { localStorage.setItem('los-photo-src', photo.src); } catch (e) { /* niente */ }
  }
  const photoT = () => S.cast.find((x) => x.id === photoTarget);
  function setPhoto(t, data) {
    t.img = data; save();
    if ($('#editDlg').open && editId === t.id) renderEditor();
    refreshTile(t.id);
    const nt = $('.tile[data-id="' + CSS.escape(t.id) + '"] .avbtn'); if (nt && !AN.reduced) nt.animate([{ transform: 'scale(.6) rotate(-12deg)' }, { transform: 'scale(1.12)' }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1.3)' });
  }
  function photoDone(t, how) { if ($('#photoDlg').open) $('#photoDlg').close(); toast('Foto ' + how + ' per ' + (t.name || 'il concorrente') + '.'); }
  function applyPhotoFile(f) {
    const t = photoT(); if (!f || !t) return;
    if (!/^image\//.test(f.type)) return toast('Il file scelto non è un\'immagine.');
    const rd = new FileReader();
    rd.onload = () => PH.loadImage(rd.result).then((img) => { setPhoto(t, PH.crop(img, 160)); photoDone(t, 'caricata'); }, () => toast('Non riesco a leggere questa immagine.'));
    rd.readAsDataURL(f);
  }
  async function applyPhotoSrc(src, el) {
    const t = photoT(); if (!t) return;
    if (el) { el.classList.add('loading'); el.setAttribute('aria-busy', 'true'); }
    $('#phMsg').textContent = 'Scarico la foto…';
    try { setPhoto(t, await PH.toDataURL(src, 160)); photoDone(t, 'applicata'); }
    catch (e) { $('#phMsg').textContent = 'Questa immagine non si lascia scaricare: scegline un’altra.'; if (el) el.classList.add('failed'); }
    finally { if (el) { el.classList.remove('loading'); el.removeAttribute('aria-busy'); } }
  }
  function renderPhotoHead() {
    const t = photoT(); if (!t) return;
    $('#h-photo').textContent = 'Foto di ' + (t.name || 'questo concorrente');
    $('#phHead').innerHTML = avHTML(t) + '<div><b>' + esc(t.name || 'Senza nome') + '</b><span class="help">' + (t.img ? 'Scegli una nuova foto per sostituire quella attuale.' : 'Cerca una foto e toccala: viene scaricata, ritagliata e applicata.') + '</span></div>' + (t.img ? '<button class="btn sm ghost" type="button" id="phRemove">Togli la foto</button>' : '');
  }
  function renderPhotoSrc() {
    if (!photoSources().includes(photo.src)) photo.src = 'anime';
    $('#phSrc').innerHTML = photoSources().map((k) => '<button type="button" data-phsrc="' + k + '" aria-pressed="' + (photo.src === k) + '">' + esc(PH.SOURCES[k].label) + '</button>').join('');
    $('#phHint').textContent = PH.SOURCES[photo.src].hint;
    $('#phSeriesRow').hidden = photo.src !== 'anime';
  }
  const phItemHTML = (it, k) => '<button type="button" class="ph-item" data-ph="' + k + '" style="--i:' + (k % PH_PAGE) + '" title="' + esc([it.title, it.note, it.credit].filter(Boolean).join(' · ')) + '" aria-label="Usa la foto: ' + esc([it.title, it.note].filter(Boolean).join(', ')) + '"><img src="' + esc(it.src) + '" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="ph-cap">' + esc(it.title) + (it.note ? '<small>' + esc(it.note) + '</small>' : '') + '</span></button>';
  const PH_PAGE = 18;
  function photoEmpty(msg) {
    const others = photoSources().filter((k) => k !== photo.src);
    $('#phGrid').innerHTML = '<div class="ph-empty"><p>' + esc(msg) + '</p>' + (photo.q ? '<div class="row">' + others.map((k) => '<button class="btn sm" type="button" data-phsrc="' + k + '">Cerca in ' + esc(PH.SOURCES[k].label) + '</button>').join('') + '</div>' : '') + '</div>';
  }
  async function runPhotoSearch(more) {
    if (!PH) return;
    const q = $('#phQuery').value.trim();
    clearTimeout(photo.timer);
    if (!q) { photo.q = ''; photo.items = []; photo.next = null; $('#phMore').hidden = true; $('#phMsg').textContent = ''; photoEmpty('Scrivi chi o che cosa cercare: il nome di una persona nota, un personaggio, un animale, un mestiere.'); return; }
    if (PH.isURL(q)) { photoEmpty('Provo a usare l’immagine del link…'); return applyPhotoSrc(q, null); }
    if (!more) { photo.q = q; photo.items = []; photo.next = null; }
    const series = photo.src === 'anime' ? $('#phSeries').value.trim().slice(0, 60) : '';
    const cursor = more ? photo.next : null, key = photo.src + '|' + q + '|' + series + '|' + JSON.stringify(cursor);
    if (photo.ctl) photo.ctl.abort();
    const ctl = (photo.ctl = typeof AbortController === 'function' ? new AbortController() : { signal: undefined, abort() {} });
    const grid = $('#phGrid'), src = PH.SOURCES[photo.src];
    grid.setAttribute('aria-busy', 'true'); $('#phMore').disabled = true;
    if (!more) grid.innerHTML = Array.from({ length: 6 }, () => '<span class="ph-skel" aria-hidden="true"></span>').join('');
    $('#phMsg').textContent = 'Cerco «' + q + '» in ' + src.name + '…';
    try {
      const r = photo.cache.get(key) || (await PH.search(photo.src, q, cursor, ctl.signal, { series }));
      photo.cache.set(key, r);
      if (ctl !== photo.ctl) return;
      const seen = new Set(photo.items.map((x) => x.src)), start = photo.items.length;
      photo.items = photo.items.concat(r.items.filter((x) => !seen.has(x.src) && (seen.add(x.src), true)));
      photo.next = r.next;
      if (!photo.items.length) { photoEmpty('Nessuna immagine per «' + q + '» in ' + src.name + '. Prova un’altra fonte o un nome più preciso.'); $('#phMsg').textContent = 'Nessun risultato.'; }
      else {
        const html = photo.items.slice(start).map((it, k) => phItemHTML(it, start + k)).join('');
        if (more) grid.insertAdjacentHTML('beforeend', html); else grid.innerHTML = html;
        $('#phMsg').textContent = photo.items.length + (photo.items.length === 1 ? ' immagine' : ' immagini') + ' da ' + src.name + '. Tocca quella giusta.';
      }
      $('#phMore').hidden = !photo.next;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      photoEmpty(navigator.onLine === false ? 'Sei offline: la ricerca ha bisogno di internet. Puoi sempre caricare una foto dal dispositivo.' : src.name + ' non risponde in questo momento. Riprova tra poco o cambia fonte.');
      $('#phMsg').textContent = 'Ricerca non riuscita.'; $('#phMore').hidden = true;
    } finally { if (ctl === photo.ctl) { grid.removeAttribute('aria-busy'); $('#phMore').disabled = false; } }
  }
  async function openPhoto(id) {
    const t = S.cast.find((x) => x.id === id); if (!t) return;
    photoTarget = id;
    if (!PH) { $('#avatarFile').click(); return; }
    renderPhotoHead(); renderPhotoSrc();
    PH.webAvailable().then((on) => { if (on === photo.web) return; photo.web = on; renderPhotoSrc(); });
    const name = (t.name || '').trim();
    $('#phQuery').value = name; $('#phMore').hidden = true; $('#phMsg').textContent = '';
    $('#photoDlg').showModal();
    // un nome e cognome è probabilmente una persona nota: si cerca subito; un nome solo darebbe risultati a caso
    if (name.split(/\s+/).length >= 2) runPhotoSearch(false);
    else { photo.q = ''; photo.items = []; photoEmpty(name ? 'Premi Cerca per trovare «' + name + '», oppure scrivi chi o che cosa vuoi come foto.' : 'Scrivi chi o che cosa cercare.'); }
    $('#phQuery').focus(); $('#phQuery').select();
  }
  if (PH) {
    $('#phForm').addEventListener('submit', (e) => { e.preventDefault(); runPhotoSearch(false); });
    $('#phQuery').addEventListener('input', () => {
      clearTimeout(photo.timer); const v = $('#phQuery').value.trim();
      if (v.length >= 3 && !PH.isURL(v) && v !== photo.q) photo.timer = setTimeout(() => runPhotoSearch(false), 700);
    });
    $('#phMore').addEventListener('click', () => runPhotoSearch(true));
    $('#phSeries').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runPhotoSearch(false); } });
    $('#phSeries').addEventListener('change', () => { if ($('#phQuery').value.trim()) runPhotoSearch(false); });
    $('#phFile').addEventListener('click', () => $('#avatarFile').click());
    $('#photoDlg').addEventListener('click', (e) => {
      const s = e.target.closest('[data-phsrc]');
      if (s) { setPhotoSrc(s.dataset.phsrc); renderPhotoSrc(); if ($('#phQuery').value.trim()) runPhotoSearch(false); else $('#phQuery').focus(); return; }
      const it = e.target.closest('[data-ph]');
      if (it && !it.classList.contains('loading')) { const x = photo.items[+it.dataset.ph]; if (x) applyPhotoSrc(x.src, it); return; }
      if (e.target.closest('#phRemove')) { const t = photoT(); if (t) { t.img = ''; save(); if ($('#editDlg').open && editId === t.id) renderEditor(); refreshTile(t.id); renderPhotoHead(); toast('Foto tolta.'); } }
    });
    // le anteprime che non si caricano spariscono dalla griglia
    $('#phGrid').addEventListener('error', (e) => { const b = e.target.tagName === 'IMG' && e.target.closest('.ph-item'); if (b) b.classList.add('broken'); }, true);
    $('#photoDlg').addEventListener('paste', (e) => {
      const f = e.clipboardData && [...e.clipboardData.files].find((x) => /^image\//.test(x.type));
      if (f) { e.preventDefault(); applyPhotoFile(f); }
    });
    const drop = $('#photoDlg');
    drop.addEventListener('dragover', (e) => { if (e.dataTransfer && [...e.dataTransfer.types].includes('Files')) { e.preventDefault(); drop.classList.add('drop'); } });
    drop.addEventListener('dragleave', (e) => { if (e.target === drop || !drop.contains(e.relatedTarget)) drop.classList.remove('drop'); });
    drop.addEventListener('drop', (e) => { drop.classList.remove('drop'); const f = e.dataTransfer && e.dataTransfer.files[0]; if (f) { e.preventDefault(); applyPhotoFile(f); } });
    $('#photoDlg').addEventListener('close', () => {
      if (photo.ctl) photo.ctl.abort(); clearTimeout(photo.timer); $('#photoDlg').classList.remove('drop');
      const back = $('#editDlg').open ? $('#editDlg .avbtn') : photoTarget && $('.tile[data-id="' + CSS.escape(photoTarget) + '"] .avbtn'); if (back) back.focus();
    });
  }
  $('#avatarFile').addEventListener('change', (e) => { const f = e.target.files[0]; e.target.value = ''; applyPhotoFile(f); });
  // barra strumenti
  $('#btnRandom').addEventListener('click', () => {
    S.cast = L.randomCast(+$('#presetSize').value, Math.random().toString(36), +S.settings.teamSize || 2).map(sanitizeTribute);
    castQuery = ''; if ($('#ovSearch')) $('#ovSearch').value = '';
    renderCast(); save(); toast('Cast generato: ' + S.cast.length + ' concorrenti.');
    playEntrance('castdeal');
  });
  $('#teamSize').addEventListener('change', (e) => { S.settings.teamSize = +e.target.value; save(); });
  $('#btnRegroup').addEventListener('click', () => {
    const ts = +S.settings.teamSize || 1;
    S.cast.forEach((t, i) => { t.team = Math.floor(i / ts) + 1; t.color = teamColor(t.team); });
    rerender(); save(); toast('Squadre ricomposte in ordine, da ' + ts + '.');
  });
  $('#viewSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b || S.settings.view === b.dataset.v) return; S.settings.view = b.dataset.v; save(); rerender(); });
  // sul telefono le opzioni secondarie si aprono a richiesta
  $('#toolMore').addEventListener('click', () => { const g = $('#toolSecondary'), open = !g.classList.contains('open'); g.classList.toggle('open', open); $('#toolMore').setAttribute('aria-expanded', String(open)); if (open && !AN.reduced) g.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: 'ease-out' }); });
  $('#btnClear').addEventListener('click', () => ($('#clearConfirm').hidden = false));
  $('#clearNo').addEventListener('click', () => ($('#clearConfirm').hidden = true));
  $('#clearYes').addEventListener('click', () => {
    const old = S.cast.slice(); $('#clearConfirm').hidden = true;
    const done = () => { S.cast = []; renderCast(); save(); toast(plural(old.length, 'concorrente eliminato', 'concorrenti eliminati') + '.', { label: 'Annulla', fn: () => { S.cast = old; renderCast(); save(); playEntrance('castdeal'); } }); };
    const tiles = $$('#castList .tile'); if (AN.reduced || !tiles.length) return done();
    tiles.forEach((el, k) => el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(18px) scale(.9)' }], { duration: 260, delay: Math.min(k, 20) * 14, easing: 'ease-in', fill: 'forwards' }));
    setTimeout(done, 260 + Math.min(tiles.length, 20) * 14);
  });

  // scheda di modifica
  function openEditor(id) { editId = id; const t0 = S.cast.find((x) => x.id === id); editTeam0 = t0 ? t0.team : null; renderEditor(); if (!$('#editDlg').open) $('#editDlg').showModal(); }
  // tratti che si contraddicono: non si possono avere insieme
  const CLASH = [['leale', 'traditore'], ['pacifista', 'spietato'], ['pacifista', 'bruto'], ['fortunato', 'sfortunato'], ['clemente', 'vendicativo'], ['generoso', 'avido'], ['leader', 'solitario'], ['codardo', 'impulsivo']];
  const clashOf = (t, id) => { for (const [a, b] of CLASH) { if (a === id && t.traits.includes(b)) return b; if (b === id && t.traits.includes(a)) return a; } return null; };
  const PRESETS = [
    ['Combattente', { for: 9, agi: 8, cor: 8, res: 7 }], ['Stratega', { int: 9, furt: 7, car: 6, sop: 6 }], ['Sopravvissuto', { sop: 9, res: 8, fort: 6, agi: 6 }],
    ['Ombra', { furt: 9, agi: 8, int: 6 }], ['Leader', { car: 9, cor: 7, emp: 7, int: 6 }], ['Cuore d\'oro', { emp: 9, car: 7, res: 6 }], ['Fortunato', { fort: 10, agi: 6 }],
  ];
  // il radar delle dieci caratteristiche
  function radarPts(t, R) { const n = D.attrs.length; return D.attrs.map((a, k) => { const ang = -Math.PI / 2 + (2 * Math.PI * k) / n, v = (t.attr[a.id] || 5) / 10; return [110 + Math.cos(ang) * R * v, 110 + Math.sin(ang) * R * v]; }); }
  function radarHTML(t) {
    const n = D.attrs.length, R = 84;
    const ring = (f) => D.attrs.map((a, k) => { const ang = -Math.PI / 2 + (2 * Math.PI * k) / n; return (110 + Math.cos(ang) * R * f).toFixed(1) + ',' + (110 + Math.sin(ang) * R * f).toFixed(1); }).join(' ');
    const axes = D.attrs.map((a, k) => { const ang = -Math.PI / 2 + (2 * Math.PI * k) / n, x = 110 + Math.cos(ang) * (R + 15), y = 110 + Math.sin(ang) * (R + 15); return '<line x1="110" y1="110" x2="' + (110 + Math.cos(ang) * R).toFixed(1) + '" y2="' + (110 + Math.sin(ang) * R).toFixed(1) + '"/><text x="' + x.toFixed(1) + '" y="' + (y + 3).toFixed(1) + '">' + ATTR_SHORT[a.id] + '</text>'; }).join('');
    return '<svg class="radar" viewBox="0 0 220 220" role="img" aria-label="Profilo delle caratteristiche"><g class="rg">' + [0.25, 0.5, 0.75, 1].map((f) => '<polygon points="' + ring(f) + '"/>').join('') + axes + '</g><polygon class="rv" id="radarPoly" points="' + radarPts(t, R).map((p) => p.map((x) => x.toFixed(1)).join(',')).join(' ') + '"/>' + radarPts(t, R).map((p, k) => '<circle class="rp" data-k="' + D.attrs[k].id + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3"/>').join('') + '</svg>';
  }
  function updateRadar(t) {
    const pts = radarPts(t, 84), poly = $('#radarPoly'); if (!poly) return;
    poly.setAttribute('points', pts.map((p) => p.map((x) => x.toFixed(1)).join(',')).join(' '));
    $$('#editBody .rp').forEach((c, k) => { c.setAttribute('cx', pts[k][0].toFixed(1)); c.setAttribute('cy', pts[k][1].toFixed(1)); });
    const pl = $('#editProfile'); if (pl) pl.innerHTML = profileLine(t).txt;
  }
  function renderEditor() {
    const t = S.cast.find((x) => x.id === editId); if (!t) return $('#editDlg').close();
    const sum = D.attrs.reduce((s2, a) => s2 + t.attr[a.id], 0);
    $('#editBody').innerHTML =
      '<div class="dh"><h2 id="h-edit">' + esc(t.name || 'Senza nome') + '</h2><button class="iconbtn" data-close type="button" aria-label="Chiudi">✕</button></div>' +
      '<div class="db">' +
        '<div class="profhead edhead" style="--c:' + esc(t.color) + '"><button class="avbtn" type="button" data-e="photo" aria-label="Carica una foto">' + avHTML(t) + '<span class="cam">' + IC.cam + '</span></button>' +
          '<div class="ps"><span class="edmeta"><i style="background:' + esc(t.color || teamColor(t.team)) + '"></i>Squadra ' + t.team + '</span><span class="edprof" id="editProfile">' + profileLine(t).txt + '</span><div class="row">' + (t.img ? '<button class="btn sm" type="button" data-e="rmphoto">Togli la foto</button><button class="btn sm" type="button" data-e="photo">Cambia foto</button>' : '<button class="btn sm" type="button" data-e="photo">Carica una foto</button>') + '</div><small class="help">La foto resta solo in questo browser.</small></div></div>' +
        '<label class="field" for="e-name"><span>Nome</span><input type="text" id="e-name" value="' + esc(t.name) + '" maxlength="40" autocomplete="off"></label>' +
        '<div class="row" style="gap:16px;align-items:flex-end">' +
          '<div class="field"><span>Genere (per le frasi)</span><div class="seg" role="group" aria-label="Genere">' + ['M', 'F', 'N'].map((g) => '<button type="button" data-e="g" data-v="' + g + '" aria-pressed="' + (t.gender === g) + '">' + G3(g, 'Lui', 'Lei', 'Neutro') + '</button>').join('') + '</div></div>' +
          '<label class="field" for="e-team" style="width:110px"><span>Squadra</span><input type="number" id="e-team" min="1" max="99" value="' + t.team + '"></label>' +
        '</div>' +
        '<div class="field"><span class="fhead">Tratti <em class="fcount">' + t.traits.length + ' su 3</em></span><div class="traitpick">' + D.traits.map((x) => { const on = t.traits.includes(x.id), cl = !on && clashOf(t, x.id); const off = !on && (t.traits.length >= 3 || cl); return '<button type="button" data-e="trait" data-v="' + x.id + '" aria-pressed="' + on + '"' + (off ? ' disabled' : '') + ' title="' + esc(cl ? 'In contrasto con ' + TRAITS[cl].name : x.desc) + '"' + (cl ? ' class="clash"' : '') + '>' + esc(x.name) + '</button>'; }).join('') + '</div><p class="help traitdesc" id="traitDesc">' + (t.traits.length ? t.traits.map((x) => '<b>' + esc(TRAITS[x].name) + '</b>: ' + esc(TRAITS[x].desc)).join(' ') : 'Passa sopra un tratto per leggerne l\'effetto. Alcuni tratti si escludono a vicenda.') + '</p></div>' +
        '<div class="field"><span class="fhead">Caratteristiche <em class="fcount">Totale <b id="attrSum">' + sum + '</b></em><em class="fcount">Media <b id="attrAvg">' + (sum / D.attrs.length).toFixed(1).replace('.', ',') + '</b></em></span>' +
          '<div class="edstats">' + radarHTML(t) + '<div class="presets"><span class="help">Profili pronti</span>' + PRESETS.map(([n], k) => '<button class="btn sm" type="button" data-e="preset" data-v="' + k + '">' + esc(n) + '</button>').join('') + '<button class="btn sm" type="button" data-e="avg">Tutti a 5</button><button class="btn sm" type="button" data-e="rattr">Casuali</button></div></div>' +
          '<div class="attrgrid">' + D.attrs.map((a) => '<label for="ea-' + a.id + '" title="' + esc((D.attrDesc || {})[a.id] || '') + '">' + a.name + '</label><input type="range" min="1" max="10" id="ea-' + a.id + '" data-k="' + a.id + '" value="' + t.attr[a.id] + '" style="--v:' + t.attr[a.id] + '"><output class="' + (t.attr[a.id] >= 8 ? 'hi' : t.attr[a.id] <= 3 ? 'lo' : '') + '">' + t.attr[a.id] + '</output>').join('') + '</div>' +
          '<p class="help" id="attrHelp">' + esc((D.attrDesc || {}).for || '') + '</p></div>' +
        '<div class="row" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:14px"><button class="btn danger ghost" type="button" data-e="del">Elimina concorrente</button><button class="btn primary" type="button" data-close>Fatto</button></div>' +
        '<div class="confirm" id="delConfirm" hidden>Eliminare ' + esc(t.name || 'questo concorrente') + '? <button class="btn danger sm" type="button" data-e="delyes">Elimina</button></div>' +
      '</div>';
  }
  let prevAttr = {};
  $('#editDlg').addEventListener('click', (e) => {
    const b = e.target.closest('[data-e]'); if (!b) return;
    const t = S.cast.find((x) => x.id === editId); if (!t) return;
    prevAttr = Object.assign({}, t.attr);
    switch (b.dataset.e) {
      case 'photo': return openPhoto(t.id);
      case 'rmphoto': t.img = ''; break;
      case 'g': t.gender = b.dataset.v; break;
      case 'trait': t.traits.includes(b.dataset.v) ? (t.traits = t.traits.filter((x) => x !== b.dataset.v)) : t.traits.length < 3 && t.traits.push(b.dataset.v); break;
      case 'rattr': D.attrs.forEach((a) => (t.attr[a.id] = 1 + Math.floor(Math.random() * 10))); break;
      case 'avg': D.attrs.forEach((a) => (t.attr[a.id] = 5)); break;
      case 'preset': { const pr = PRESETS[+b.dataset.v][1]; D.attrs.forEach((a) => (t.attr[a.id] = pr[a.id] || 4)); break; }
      case 'del': $('#delConfirm').hidden = false; return;
      case 'delyes': { const i0 = S.cast.indexOf(t); S.cast = S.cast.filter((x) => x.id !== t.id); save(); $('#editDlg').close(); renderCast(); toast(t.name + ' eliminat' + G3(t.gender, 'o', 'a', 'ə') + '.', { label: 'Annulla', fn: () => { S.cast.splice(Math.min(i0, S.cast.length), 0, t); rerender(new Set([t.id])); save(); } }); return; }
      default: return;
    }
    // i valori cambiano con un'animazione del radar, invece di saltare
    const old = /preset|avg|rattr/.test(b.dataset.e) ? radarPts(Object.assign({}, t, { attr: Object.assign({}, prevAttr) }), 84) : null;
    save(); renderEditor();
    if (old && !AN.reduced) {
      const to = radarPts(t, 84), poly = $('#radarPoly'), dots = $$('#editBody .rp'), t0 = performance.now();
      const step = (now) => { const k = Math.min(1, (now - t0) / 420), e2 = 1 - Math.pow(1 - k, 3); const pts = to.map((p, j) => [old[j][0] + (p[0] - old[j][0]) * e2, old[j][1] + (p[1] - old[j][1]) * e2]); if (poly) poly.setAttribute('points', pts.map((p) => p.map((x) => x.toFixed(1)).join(',')).join(' ')); dots.forEach((c, j) => { c.setAttribute('cx', pts[j][0].toFixed(1)); c.setAttribute('cy', pts[j][1].toFixed(1)); }); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
      $$('#editBody .attrgrid output').forEach((o, k) => o.animate([{ transform: 'scale(1.35)' }, { transform: 'none' }], { duration: 300, delay: k * 18 }));
    }
    const again = $('#editBody [data-e="' + b.dataset.e + '"]' + (b.dataset.v ? '[data-v="' + b.dataset.v + '"]' : '')); if (again) again.focus();
  });
  $('#editDlg').addEventListener('input', (e) => {
    const t = S.cast.find((x) => x.id === editId); if (!t) return;
    if (e.target.id === 'e-name') { t.name = e.target.value.slice(0, 40); $('#h-edit').textContent = t.name || 'Senza nome'; }
    else if (e.target.id === 'e-team') { const v = Math.round(+e.target.value); if (v >= 1 && v <= 99) { t.team = v; t.color = teamColor(v); const av = $('#editBody .profhead .av'); if (av) av.style.setProperty('--c', t.color); } }
    else if (e.target.dataset.k) {
      const v = +e.target.value, o = e.target.nextElementSibling; t.attr[e.target.dataset.k] = v; o.textContent = v; o.className = v >= 8 ? 'hi' : v <= 3 ? 'lo' : '';
      e.target.style.setProperty('--v', v);
      const sm = D.attrs.reduce((s2, a) => s2 + t.attr[a.id], 0); $('#attrSum').textContent = sm; $('#attrAvg').textContent = (sm / D.attrs.length).toFixed(1).replace('.', ',');
      updateRadar(t); const dot = $('#editBody .rp[data-k="' + e.target.dataset.k + '"]'); if (dot && !AN.reduced) dot.animate([{ r: 3 }, { r: 6 }, { r: 3 }], { duration: 260 });
      $('#attrHelp').textContent = (D.attrDesc || {})[e.target.dataset.k] || '';
    }
    save();
  });
  $('#editDlg').addEventListener('mouseover', (e) => {
    const b = e.target.closest('[data-e="trait"]'); if (b) { const x = TRAITS[b.dataset.v], t = S.cast.find((y) => y.id === editId), cl = t && !t.traits.includes(x.id) && clashOf(t, x.id); $('#traitDesc').innerHTML = '<b>' + esc(x.name) + '</b>: ' + esc(x.desc) + (cl ? ' <span class="clashnote">In contrasto con ' + esc(TRAITS[cl].name) + '.</span>' : ''); }
    const r = e.target.closest('.attrgrid input, .attrgrid label'); if (r) { const k = r.dataset.k || (r.getAttribute('for') || '').replace('ea-', ''); if ((D.attrDesc || {})[k]) $('#attrHelp').textContent = D.attrDesc[k]; }
  });
  $('#editDlg').addEventListener('focusin', (e) => { const b = e.target.closest('[data-e="trait"]'); if (b) { const x = TRAITS[b.dataset.v]; $('#traitDesc').innerHTML = '<b>' + esc(x.name) + '</b>: ' + esc(x.desc); } });
  let editTeam0 = null;
  $('#editDlg').addEventListener('close', () => {
    if (curView !== 'cast') return;
    const t = S.cast.find((x) => x.id === editId);
    const tile = t && $('.tile[data-id="' + CSS.escape(t.id) + '"]');
    // se è cambiata la squadra nella vista per squadra la scheda deve spostarsi; altrimenti basta aggiornarla
    if (!t || !tile) renderCast();
    else if (S.settings.view === 'team' && t.team !== editTeam0) rerender(new Set([t.id]));
    else { refreshTile(t.id); updateCounts(); }
    const el = t && $('.tile[data-id="' + CSS.escape(t.id) + '"]'); if (el && !AN.reduced) { el.classList.add('fresh'); setTimeout(() => el.classList.remove('fresh'), 1200); }
  });

  // elenco incollato
  $('#btnBulk').addEventListener('click', () => { $('#bulkMsg').textContent = ''; $('#bulkDlg').showModal(); $('#bulkText').focus(); });
  $('#bulkGo').addEventListener('click', () => {
    const lines = $('#bulkText').value.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) { $('#bulkMsg').textContent = 'Scrivi almeno un nome.'; return; }
    const G = { lui: 'M', m: 'M', maschio: 'M', uomo: 'M', lei: 'F', f: 'F', femmina: 'F', donna: 'F', neutro: 'N', n: 'N', loro: 'N' };
    const base = $('#bulkReplace').checked ? [] : S.cast.slice();
    const ts = +S.settings.teamSize || 1;
    const added = lines.slice(0, 200).map((l, k) => {
      const [name, g, team] = l.split(/[,;\t]/).map((x) => (x || '').trim());
      const i = base.length + k;
      const t = sanitizeTribute({ name, gender: G[(g || '').toLowerCase()] || (i % 2 ? 'M' : 'F'), team: +team || Math.floor(i / ts) + 1, traits: [] });
      D.attrs.forEach((a) => (t.attr[a.id] = 3 + Math.floor(Math.random() * 6)));
      return t;
    });
    S.cast = base.concat(added); save(); renderCast();
    $('#bulkDlg').close(); $('#bulkText').value = '';
    toast(plural(added.length, 'concorrente aggiunto', 'concorrenti aggiunti') + '.');
  });

  // importa / esporta
  const exportJSON = () => JSON.stringify({ app: 'last-one-standing', versione: 2, cast: S.cast, regole: S.settings, eventi: S.custom, legami: S.initialRelations || [] }, null, 2);
  function importJSON(text) {
    let d; try { d = JSON.parse(text); } catch (e) { return 'Il testo non è un JSON valido.'; }
    if (!record(d) && !Array.isArray(d)) return 'Il JSON deve contenere una configurazione o un elenco di concorrenti.';
    const cast = Array.isArray(d) ? d : d.cast;
    if (!Array.isArray(cast) || !cast.length) return 'Non trovo un elenco di concorrenti ("cast") nel testo.';
    if (cast.length > 200) return 'Puoi importare al massimo 200 concorrenti per volta: riduci il cast nel file.';
    let next;
    try {
      next = { cast: normalizeCast(cast), settings: Object.assign({}, S.settings), custom: S.custom };
      const r = own(d, 'regole') ? d.regole : own(d, 'settings') ? d.settings : undefined;
      if (r !== undefined) {
        if (!record(r)) return 'Le regole devono essere un oggetto JSON.';
        // La conferma per adulti resta una scelta esplicita nell'interfaccia.
        next.settings = sanitizeSettings({ ...r, adult: S.settings.adult });
      }
      const ev = own(d, 'eventi') ? d.eventi : own(d, 'custom') ? d.custom : undefined;
      if (ev !== undefined) {
        if (!Array.isArray(ev)) return 'Gli eventi personalizzati devono essere un elenco.';
        if (ev.length > 200) return 'Puoi importare al massimo 200 eventi personalizzati per volta: riduci l’elenco nel file.';
        next.custom = normalizeCustoms(ev);
      }
      const ids = new Set(next.cast.map((t) => t.id));
      next.initialRelations = own(d, 'legami') ? L.normalizeInitialRelations(d.legami, next.cast) : (S.initialRelations || []).filter((r) => ids.has(r.from) && ids.has(r.to));
    } catch (e) { return e.message; }
    // Nessuna parte della configurazione cambia finché tutti gli elementi sono validi.
    Object.assign(S, next);
    renderCast(); save(); return null;
  }
  $('#btnIO').addEventListener('click', () => { $('#ioText').value = exportJSON(); $('#ioMsg').textContent = ''; $('#ioDlg').showModal(); });
  $('#ioCopy').addEventListener('click', () => copyText($('#ioText').value, 'Configurazione copiata negli appunti.'));
  $('#ioImport').addEventListener('click', () => { const err = importJSON($('#ioText').value); if (err) $('#ioMsg').textContent = err; else { AN.setReduced(S.settings.reduceMotion); $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); } });
  $('#ioFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { $('#ioText').value = rd.result; const err = importJSON(rd.result); if (err) $('#ioMsg').textContent = err; else { AN.setReduced(S.settings.reduceMotion); $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); } };
    rd.readAsText(f);
  });

  /* ---------------- archivio dei risultati ---------------- */
  async function renderArchive() {
    const entries = await REPLAY.list();
    $('#archiveList').innerHTML = entries.length ? entries.map((e) => '<article class="archive-entry" data-replay="' + esc(e.id) + '">' +
      '<label class="archive-select"><input type="checkbox" data-compare value="' + esc(e.id) + '"> Confronta</label>' +
      '<label>Nome della partita<input data-title maxlength="100" value="' + esc(e.title || THEMES[e.theme].name + ' · ' + e.seed) + '"></label>' +
      '<p class="help">' + esc(new Date(e.createdAt).toLocaleString('it-IT')) + ' · ' + e.count + ' concorrenti · ' + plural(e.days, 'giorno', 'giorni') + ' · ' + esc(THEMES[e.theme].name) + (e.adult ? ' · 18+' : '') + '</p>' +
      '<div class="row"><button class="btn sm" type="button" data-archive="open">Rivedi dall’inizio</button><button class="btn sm" type="button" data-archive="rename">Salva nome</button><button class="btn sm" type="button" data-archive="export">Esporta replay</button></div></article>').join('') :
      '<p class="help">Nessuna partita archiviata. Le nuove partite vengono aggiunte automaticamente; puoi anche importare un replay completo.</p>';
  }
  async function openArchive() {
    if (!REPLAY) return toast('Archivio non disponibile.');
    stopPlay(); $('#archiveMsg').textContent = ''; $('#archiveComparison').innerHTML = ''; $('#archiveList').textContent = 'Caricamento…';
    $('#archiveDlg').showModal();
    try { await renderArchive(); } catch (e) { $('#archiveMsg').textContent = 'Archivio non disponibile: ' + e.message; }
  }
  function archiveConfiguration(entry) {
    const result = entry.result, raw = entry.configuration || (S.run && S.run.replayId === entry.id ? S.run.cfg : null) || {};
    const settings = sanitizeSettings(raw, S.settings);
    const cast = result.tributes.map((t) => ({ id: t.id, name: t.name, gender: t.gender, team: t.team, color: t.color, img: t.img, traits: t.traits.slice(), attr: { ...t.attr } }));
    return { cast, theme: result.theme, seed: result.seed, adult: result.adult && S.settings.adult, difficulty: settings.difficulty, maxDays: settings.maxDays,
      teamsAllied: settings.teamsAllied, teamWin: settings.teamWin, custom: raw.custom == null ? [] : normalizeCustoms(raw.custom), initialRelations: L.normalizeInitialRelations(raw.initialRelations, cast) };
  }
  async function openSavedReplay(id) {
    const generation = runGeneration, entry = await REPLAY.entry(id); if (!entry) throw new Error('Partita non disponibile.');
    if (entry.result.adult && !S.settings.adult) throw new Error('Per aprire questo replay attiva i contenuti 18+ nelle opzioni dell’arena.');
    const cfg = archiveConfiguration(entry); if (generation !== runGeneration) return;
    runGeneration++; if (RUNNER) RUNNER.cancel(); simulationBusy(false); stopPlay();
    SIM = entry.result; BY = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
    S.run = { cfg, phase: 0, seen: 0, replayId: id, replaySaved: true }; lastRendered = -1; save();
    $('#archiveDlg').close(); if (location.hash === '#diretta') route(); else location.hash = '#diretta';
  }
  $('#btnArchive').addEventListener('click', openArchive);
  $('#archiveList').addEventListener('click', async (e) => {
    const button = e.target.closest('[data-archive]'); if (!button) return;
    const row = button.closest('[data-replay]'), id = row.dataset.replay;
    button.disabled = true;
    try {
      if (button.dataset.archive === 'rename') {
        await REPLAY.rename(id, $('[data-title]', row).value); $('#archiveMsg').textContent = 'Nome salvato.';
      } else if (button.dataset.archive === 'export') {
        $('#replayText').value = await REPLAY.exportReplay(id); $('#replayIO').open = true;
        $('#archiveMsg').textContent = 'Replay completo pronto da copiare o scaricare.';
      } else {
        await openSavedReplay(id);
      }
    } catch (error) { $('#archiveMsg').textContent = error.message; }
    finally { button.disabled = false; }
  });
  $('#archiveImport').addEventListener('click', async () => {
    const button = $('#archiveImport'); button.disabled = true;
    try { await REPLAY.importReplay($('#replayText').value); await renderArchive(); $('#archiveMsg').textContent = 'Replay importato. La partita in corso è rimasta invariata.'; }
    catch (e) { $('#archiveMsg').textContent = e.message; }
    finally { button.disabled = false; }
  });
  $('#archiveCopy').addEventListener('click', () => copyText($('#replayText').value, 'Replay copiato negli appunti.'));
  let replayDownloadUrl = null;
  $('#archiveDownload').addEventListener('click', () => {
    if (!$('#replayText').value.trim()) { $('#archiveMsg').textContent = 'Esporta prima una partita dall’elenco.'; return; }
    if (replayDownloadUrl) URL.revokeObjectURL(replayDownloadUrl);
    replayDownloadUrl = URL.createObjectURL(new Blob([$('#replayText').value], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = replayDownloadUrl; link.download = 'last-one-standing-replay.json'; link.click();
  });
  $('#archiveDlg').addEventListener('close', () => { if (replayDownloadUrl) URL.revokeObjectURL(replayDownloadUrl); replayDownloadUrl = null; });
  $('#archiveCompare').addEventListener('click', async () => {
    const ids = $$('#archiveList [data-compare]:checked').map((x) => x.value);
    if (ids.length !== 2) { $('#archiveMsg').textContent = 'Seleziona esattamente due partite da confrontare.'; return; }
    try {
      const entries = await Promise.all(ids.map((id) => REPLAY.entry(id)));
      if (entries.some((e) => !e)) throw new Error('Una delle partite non è disponibile.');
      if (entries.some((e) => e.result.adult) && !S.settings.adult) throw new Error('Attiva i contenuti 18+ prima di confrontare questi replay.');
      const headers = entries.map((e) => '<th scope="col">' + esc(e.title || e.result.seed) + '</th>').join('');
      const rows = [['Arena', (r) => THEMES[r.theme].name], ['Seme', (r) => r.seed], ['Concorrenti', (r) => r.tributes.length], ['Durata', (r) => plural(r.days, 'giorno', 'giorni')],
        ['Vittoria', (r) => r.winners.map((id) => r.tributes.find((t) => t.id === id).name).join(', ')], ['Eliminazioni attribuite', (r) => r.stats.killDeaths], ['Eliminazioni dell’arena', (r) => r.stats.envDeaths], ['Eventi', (r) => r.stats.events]];
      $('#archiveComparison').innerHTML = '<div class="tablewrap"><table><caption>Confronto delle partite selezionate</caption><thead><tr><th scope="col">Dato</th>' + headers + '</tr></thead><tbody>' +
        rows.map(([label, get]) => '<tr><th scope="row">' + label + '</th>' + entries.map((e) => '<td>' + esc(get(e.result)) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      $('#archiveMsg').textContent = 'Confronto aggiornato.';
    } catch (e) { $('#archiveMsg').textContent = e.message; }
  });

  /* =============== ARENA =============== */
  function renderArena() {
    $('#arenaSub').textContent = 'Ogni arena ha luoghi, armi, pericoli e disastri propri. In tutto ' + COUNTS.events + ' modelli di evento e ' + COUNTS.disasters + ' disastri, più quelli che scrivi tu.';
    $('#themeList').innerHTML = D.themes.map((t) => posterHTML(t, S.settings.theme === t.id)).join('');
    radioFocus($('#themeList'));
    AN.tilt($('#themeList'), '.poster-card');
    renderDifficulty();
    $('#maxDays').value = S.settings.maxDays; $('#maxDaysOut').textContent = S.settings.maxDays; rangeFill($('#maxDays'));
    $('#seed').value = S.settings.seed;
    $('#teamsAllied').checked = !!S.settings.teamsAllied; $('#teamWin').checked = !!S.settings.teamWin;
    renderAdult();
    renderPreview(); renderCustomForm(); renderCustomList(); renderStartSum();
    requestAnimationFrame(() => centerPoster($('#themeList [aria-checked="true"]'), false));
  }
  // la guida dell'arena: intestazione illustrata e cinque capitoli (mappa, clima, minacce, zaino, anteprima)
  const ATL = window.LOS_ATLAS;
  let dxCh = 'mappa', sampleN = 0, dzOpen = null, dzAll = false, dzQuery = '', invSel = 'arma';
  const CH_ICON = {
    mappa: '<path d="M4 6.5 9 4l6 2.5L20 4v13.5L15 20l-6-2.5L4 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
    clima: '<path d="M7 17.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.6 4 4 0 0 0 7 17.5z"/><path d="M12 2v1.5M4.2 4.7l1 1M19.8 4.7l-1 1"/>',
    minacce: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-3.7 2.4-4.8.3 1.7 1.2 2.6 2.1 2.8C11 8.6 11 5.6 12 3z"/>',
    zaino: '<path d="M8 6V5a4 4 0 0 1 8 0v1"/><rect x="5" y="6" width="14" height="15" rx="4"/><path d="M9 13h6v3H9z"/>',
    anteprima: '<rect x="3" y="5" width="18" height="13" rx="3"/><path d="M10.5 9.2v5.6l4.6-2.8z"/><path d="M8 21h8"/>',
  };
  const CHAPTERS = [['mappa', 'Mappa'], ['clima', 'Clima'], ['minacce', 'Minacce'], ['zaino', 'Zaino'], ['anteprima', 'Anteprima']];
  const stripArt = (x) => x.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '');
  const capFirst = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  const chIcon = (k) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + CH_ICON[k] + '</svg>';
  function renderPreview() {
    const t = THEMES[S.settings.theme], pt = COUNTS.perTheme[t.id], A = arenaOf(t.id);
    const adult = S.settings.adult && !t.noAdult;
    const prev = $$('#arenaPreview .dx-stat b').map((x) => parseInt(x.textContent, 10));
    const stat = (v, l) => '<div class="dx-stat"><b>' + v + '</b><span>' + l + '</span></div>';
    dzOpen = null; dzAll = false; dzQuery = '';
    $('#arenaPreview').innerHTML =
      '<header class="dx-hero"><div class="apv-banner" aria-hidden="true">' + ART.scene(t.id) + '</div>' +
        '<div class="dx-title"><span class="dx-kicker">Guida all\'arena</span><h2>' + esc(t.name) + '</h2><p>' + esc(t.tag) + '</p>' + (t.soft ? '<span class="dx-soft">Nessuno muore: si esce dai giochi</span>' : '') + '</div></header>' +
      '<div class="dx-stats">' + stat(pt.events + (adult ? pt.adultEvents : 0), 'Eventi') + stat(pt.disasters + (adult ? pt.adultDisasters : 0), 'Disastri') + stat(window.LOS_GEOGRAPHY.describe(t,A).length, 'Zone') + stat((A.meteo || []).length, 'Tipi di meteo') + '</div>' +
      '<nav class="dx-nav" role="tablist" aria-label="Capitoli della guida">' + CHAPTERS.map(([k, l]) => '<button type="button" role="tab" id="dxt-' + k + '" data-dx="' + k + '" aria-controls="dxp-' + k + '" aria-selected="' + (dxCh === k) + '" tabindex="' + (dxCh === k ? 0 : -1) + '">' + chIcon(k) + '<span>' + l + '</span></button>').join('') + '</nav>' +
      CHAPTERS.map(([k]) => '<section class="dx-panel" role="tabpanel" id="dxp-' + k + '" aria-labelledby="dxt-' + k + '"' + (dxCh === k ? '' : ' hidden') + '>' + (dxCh === k ? chapter(k, t) : '') + '</section>').join('');
    AN.field($('#arenaPreview .apv-banner'), t.id, { intensity: 1.2 });
    const ap = $('#arenaPreview'); ap.classList.remove('swap'); void ap.offsetWidth; ap.classList.add('swap');
    if (prev.length && !AN.reduced) $$('#arenaPreview .dx-stat b').forEach((b, i) => { const n = parseInt(b.textContent, 10); if (!isNaN(prev[i]) && prev[i] !== n) AN.countTo(b, n, { from: prev[i], dur: 600 }); });
  }
  const chHead = (title, text, extra) => '<div class="ch-head"><div><h3>' + title + '</h3><p>' + text + '</p></div>' + (extra || '') + '</div>';
  function chapter(k, t) {
    if (k === 'mappa') return chMap(t);
    if (k === 'clima') return chClimate(t);
    if (k === 'minacce') return chThreats(t);
    if (k === 'zaino') return chBag(t);
    if (k === 'anteprima') return chSample(t);
    return '';
  }

  /* ----- Mappa: zone, regola speciale, armeria, pericoli ----- */
  const LEVEL = (v, hi, mid) => (v >= hi ? 2 : v >= mid ? 1 : 0);
  function meterRow(label, v, max, words, tone) {
    const pc = Math.max(8, Math.min(100, v / max * 100));
    return '<div class="zm ' + tone + '"><span>' + label + '</span><i><b style="width:' + pc.toFixed(0) + '%"></b></i><em>' + words + '</em></div>';
  }
  function chMap(t) {
    const A = arenaOf(t.id), geography=window.LOS_GEOGRAPHY.describe(t,A);
    t=window.LOS_GEOGRAPHY.enrich(t,geography);
    const Z = geography.map(z=>[z.resources,z.danger,z.shelter]);
    const best = (j, dir) => Z.reduce((bi, z, i) => (dir * z[j] > dir * Z[bi][j] ? i : bi), 0);
    const rich = best(0, 1), risk = best(1, 1), safe = best(2, 1);
    const zones = t.lex.luogo.map((name, i) => {
      const z = Z[i], nm = capFirst(stripArt(name));
      const tags = [i === rich ? '<span class="ztg good">Più ricca</span>' : '', i === risk ? '<span class="ztg bad">Più pericolosa</span>' : '', i === safe ? '<span class="ztg calm">Miglior riparo</span>' : ''].join('');
      return '<article class="zc" style="--i:' + i + '">' + ATL.pic(t.id, 'luoghi', name, t.hue, { index: i }) +
        '<div class="zc-body"><h4>' + esc(nm) + '</h4><p class="help">'+esc(geography[i].description)+'</p><p class="help">Passaggi: '+esc(geography[i].links.map(z=>stripArt(geography[z].name)).join(', '))+'</p>' + (tags ? '<div class="ztgs">' + tags + '</div>' : '') +
        meterRow('Risorse', z[0], 1.8, ['Scarse', 'Medie', 'Ricche'][LEVEL(z[0], 1.35, 0.95)], 'res') +
        meterRow('Pericolo', z[1], 1.8, ['Basso', 'Medio', 'Alto'][LEVEL(z[1], 1.35, 0.95)], 'dng') +
        meterRow('Riparo', z[2], 1, ['Scarso', 'Discreto', 'Buono'][LEVEL(z[2], 0.7, 0.45)], 'shl') + '</div></article>';
    }).join('');
    const m = A.meter, lb = vitLabels(t);
    const gauge = m ? '<div class="gauge" aria-hidden="true"><svg viewBox="0 0 120 72"><path d="M10 64 A50 50 0 0 1 110 64" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="12" stroke-linecap="round"/><path class="gz" d="M10 64 A50 50 0 0 1 110 64" fill="none" stroke-width="12" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="' + (100 - (m.thr || 60)) + '"/><path class="gn" d="M60 64 L60 22" stroke-width="3.5" stroke-linecap="round" style="transform:rotate(' + (((m.thr || 60) / 100) * 180 - 90) + 'deg)"/><circle cx="60" cy="64" r="6"/></svg><b>' + esc(m.name) + '</b><span>Diventa grave oltre ' + (m.thr || 60) + '</span></div>' : '';
    const plaque = A.rule ? '<section class="plaque">' + gauge + '<div class="pl-body"><span class="dx-kicker">Regola speciale</span><h4>' + esc(A.rule) + '</h4><p>' + esc(A.desc) + '</p>' +
      (m ? '<p class="pl-meter"><b>' + esc(m.name) + '.</b> ' + esc(m.desc) + '</p>' : '') +
      '<div class="pl-cols"><div><h5>Contano di più</h5><ol class="pl-keys">' + (A.key || []).map((k) => '<li>' + esc(ECO.attrNames[k] || k) + '</li>').join('') + '</ol></div>' +
      '<div><h5>Da tenere d\'occhio</h5><div class="chips">' + [lb.hp, lb.en, lb.mo, lb.food].map((x) => '<span class="chip dim">' + esc(x) + '</span>').join('') + (m ? '<span class="chip st">' + esc(m.name) + '</span>' : '') + '</div></div></div></div></section>' : '';
    const arms = t.lex.arma.slice(0, 10).map((x) => '<li class="arm">' + ATL.pic(t.id, 'armi', x, t.hue) + '<span>' + esc(capFirst(stripArt(x))) + '</span></li>').join('');
    const beasts = t.lex.mostro.map((x, i) => '<article class="wanted" style="--r:' + ((i % 2 ? 1 : -1) * (1 + i % 3)) + 'deg">' + ATL.pic(t.id, 'pericoli', x, t.hue) + '<div class="wd-body"><span class="wd-tag">' + (t.soft ? 'Attenzione' : 'Pericolo') + '</span><h4>' + esc(capFirst(stripArt(x))) + '</h4></div></article>').join('');
    return chHead('Il campo di gioco', plural(Z.length, 'zona', 'zone') + ' collegate da passaggi. Gli spostamenti consumano energia e gli incontri richiedono la presenza nello stesso luogo. Le zone ricche aiutano a trovare cibo; di notte il riparo e i compagni presenti favoriscono il recupero. Gli imprevisti locali coinvolgono chi è sul posto e possono riemergere nei dialoghi delle fasi successive.') +
      '<div class="zboard">' + zones + '</div>' + plaque +
      '<div class="dx-split"><section class="arsenal"><div class="ch-sub"><h4>' + (t.soft ? 'Armi improprie' : 'Armeria') + '</h4><p>' + (t.soft ? 'Con queste si fanno fuori i rivali, senza versare sangue.' : 'Si raccolgono in giro, si rubano agli altri o arrivano dagli sponsor.') + '</p></div><ul class="rack">' + arms + '</ul></section>' +
      '<section class="bestiary"><div class="ch-sub"><h4>' + (t.soft ? 'Da evitare' : 'Pericoli') + '</h4><p>' + (t.soft ? 'Girano per i corridoi: chi resta da solo rischia di finire nei guai.' : 'Di notte attaccano chi dorme da solo, soprattutto nelle zone pericolose.') + '</p></div><div class="wanted-grid">' + beasts + '</div></section></div>';
  }

  /* ----- Clima: ogni meteo con i suoi effetti veri ----- */
  function fxChips(fx, m) {
    const out = [], add = (txt, tone) => out.push('<li class="fx ' + tone + '">' + (tone === 'good' ? '↑' : tone === 'bad' ? '↓' : '•') + ' ' + txt + '</li>');
    const f = fx || {};
    if (f.forage) f.forage > 1 ? add('Più cibo da trovare', 'good') : add('Cibo più scarso', 'bad');
    if (f.food) f.food > 1 ? add('La fame cresce in fretta', 'bad') : add('La fame si sente meno', 'good');
    if (f.en) f.en > 1 ? add('Si fa più fatica', 'bad') : add('Ci si riposa meglio', 'good');
    if (f.heal) f.heal > 1 ? add('Le ferite guariscono meglio', 'good') : add('Le ferite guariscono peggio', 'bad');
    if (f.lethal) f.lethal > 1 ? add('Scontri più letali', 'bad') : add('Scontri meno letali', 'good');
    if (f.stl) f.stl > 1 ? add('Agguati più facili', 'neutral') : add('Difficile nascondersi', 'neutral');
    if (f.beast) f.beast > 1 ? add('Pericoli più attivi', 'bad') : add('Pericoli più tranquilli', 'good');
    if (f.trap) add('Trappole più efficaci', 'neutral');
    if (f.fame) f.fame > 1 ? add('Più attenzione del pubblico', 'good') : add('Il pubblico guarda altrove', 'neutral');
    if (f.storm) add('Tempesta nelle zone aperte', 'bad');
    if (f.pr && m) f.pr > 0 ? add(m.name + ' in salita', 'bad') : add(m.name + ' in calo', 'good');
    if (f.tb) Object.entries(f.tb).forEach(([a, v]) => add('Prove di ' + (ECO.attrNames[a] || a) + (v > 0 ? ' più facili' : ' più difficili'), v > 0 ? 'good' : 'bad'));
    return out.length ? '<ul class="fxs">' + out.join('') + '</ul>' : '<ul class="fxs"><li class="fx neutral">• Nessun effetto particolare</li></ul>';
  }
  function chClimate(t) {
    const A = arenaOf(t.id);
    const cards = (A.meteo || []).map((w, i) => '<article class="wxc" style="--i:' + i + '">' + ATL.pic(t.id, 'meteo', w.n, t.hue, { extra: w.d }) + '<div class="wxc-body"><h4>' + esc(w.n) + '</h4><p>' + esc(w.d) + '</p>' + fxChips(w.fx, A.meter) + '</div></article>').join('');
    return chHead('Il meteo dell\'arena', 'Ogni giorno il cielo può cambiare. Ecco cosa può capitare e cosa cambia davvero per i concorrenti.') + '<div class="wx-board">' + (cards || '<p class="help">In questa arena il tempo non cambia mai.</p>') + '</div>';
  }

  /* ----- Minacce: i disastri e i tre destini ----- */
  const dzList = (t) => L.buildPools(t, [], S.settings.adult && !t.noAdult).disasters;
  function sampleName(text, t) {
    const who = S.cast[0] || { name: 'Alfa', gender: 'F' }, other = S.cast[1] || { name: 'Beta' };
    return esc(L.renderSample(text, t.id, who.gender || 'M')).replace(/\bAlfa\b/g, '<b>' + esc(who.name) + '</b>').replace(/\bBeta\b/g, '<b>' + esc(other.name) + '</b>');
  }
  function fates(d, t) {
    const pick = (c) => d.out.find((o) => o.cat === c);
    const dead = pick('death'), hurt = pick('hurt'), safe = pick('none');
    const st = hurt && (hurt.fx || []).find((f) => f.t === 'status');
    const row = (cls, icon, label, o) => o ? '<li class="fate ' + cls + '"><span class="fi" aria-hidden="true">' + icon + '</span><div><b>' + label + '</b><p>' + sampleName(o.text, t) + '</p></div></li>' : '';
    return '<ol class="fates">' +
      row('f-dead', '✕', t.soft ? 'Fuori dai giochi' : 'Non sopravvive', dead) +
      row('f-hurt', '!', 'Ne esce ' + (st ? (L.STATUS_LABEL[st.s] || st.s).toLowerCase() : 'malconcio'), hurt) +
      row('f-safe', '✓', 'Si salva', safe) + '</ol>';
  }
  function dzCard(d, i, t) {
    const open = dzOpen === d.n;
    return '<article class="dzc' + (open ? ' open' : '') + '" style="--i:' + i + '">' +
      '<button type="button" class="dzc-btn" data-dz="' + esc(d.n) + '" aria-expanded="' + open + '">' + ATL.pic(t.id, 'disastri', d.n, t.hue, { extra: d.intro }) +
      '<span class="dzc-txt"><b>' + esc(d.n) + '</b><span>' + esc(d.intro || '') + '</span><em>' + (open ? 'Chiudi' : 'Vedi come può finire') + '</em></span></button>' +
      (open ? '<div class="dzc-more">' + fates(d, t) + '</div>' : '') + '</article>';
  }
  function dzGrid(t) {
    const all = dzList(t), q = norm(dzQuery.trim());
    const list = q ? all.filter((d) => norm(d.n + ' ' + (d.intro || '')).includes(q)) : all;
    const shown = q || dzAll ? list : list.slice(0, 9);
    return '<div class="dz-board">' + (shown.map((d, i) => dzCard(d, i, t)).join('') || '<p class="help">Nessun disastro corrisponde a «' + esc(dzQuery.trim()) + '».</p>') + '</div>' +
      (!q && !dzAll && list.length > 9 ? '<div class="dz-more"><button type="button" class="btn" data-dz-all>Mostra tutti i ' + list.length + ' disastri</button></div>' : '');
  }
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function chThreats(t) {
    return chHead('I disastri', 'Quando arriva un disastro, ognuno può ' + (t.soft ? 'finire fuori dai giochi' : 'morire') + ', uscirne malconcio o salvarsi: decidono caratteristiche, oggetti e un po\' di fortuna. Tocca un disastro per vedere i tre destini.',
      '<label class="dz-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><input type="search" id="dzSearch" placeholder="Cerca un disastro" aria-label="Cerca tra i disastri" autocomplete="off" value="' + esc(dzQuery) + '"></label>') +
      '<div id="dzWrap">' + dzGrid(t) + '</div>';
  }

  /* ----- Zaino: inventario a caselle con la scheda dell'oggetto ----- */
  function bagNames(t) {
    const names = Object.assign({}, (ITM.names || {})._ || {}, (ITM.names || {})[t.id] || {});
    const lex = Object.assign({}, D.lexDefault || {}, t.lex || {});
    (D.packs || []).forEach((pk) => { if (pk.lex && (pk.theme === t.id)) Object.assign(lex, pk.lex); });
    return (k) => (names[k] || (k === 'med' ? ['un kit medico'] : k === 'trap' ? ['una trappola'] : lex[k]) || []).slice(0, 4).map((x) => capFirst(stripArt(x)));
  }
  const itemType = (t, k) => (t.soft && (ITM.typesSoft || {})[k]) || ITM.types[k] || { label: k, desc: '' };
  function bagDetail(t) {
    const ty = itemType(t, invSel), ex = bagNames(t)(invSel);
    return '<div class="inv-art">' + ATL.pic(t.id, 'oggetti', invSel, t.hue) + '</div><div class="inv-txt"><span class="dx-kicker">Nello zaino</span><h4>' + esc(ty.label) + '</h4>' +
      (ex.length ? '<div class="inv-ex"><span>In questa arena</span><div class="chips">' + ex.map((x) => '<span class="chip">' + esc(x) + '</span>').join('') + '</div></div>' : '') + '<p>' + esc(ty.desc) + '</p></div>';
  }
  function chBag(t) {
    const slots = (ITM.order || []).map((k, i) => '<button type="button" class="slot" data-inv="' + k + '" aria-pressed="' + (invSel === k) + '" style="--i:' + i + '">' + ATL.pic(t.id, 'oggetti', k, t.hue) + '<span>' + esc(itemType(t, k).label) + '</span></button>').join('');
    return chHead('Lo zaino', (ITM.order || []).length + ' tipi di oggetto, ognuno con nomi propri in questa arena. ' + (t.soft ? 'Aiutano a restare in gara' : 'Possono decidere uno scontro') + ': si trovano, si scambiano e si rubano.') +
      '<div class="inv"><div class="inv-grid" role="group" aria-label="Oggetti">' + slots + '</div><div class="inv-detail" id="invDetail" aria-live="polite">' + bagDetail(t) + '</div></div>';
  }

  /* ----- Anteprima: una mini diretta ----- */
  function chSample(t) {
    let evs = [];
    try {
      const cast = (S.cast.length >= 4 ? S.cast.slice(0, 8) : L.randomCast(8, 'anteprima', 2));
      const r = L.simulate({ cast, theme: t.id, seed: 'anteprima-' + t.id + (sampleN ? '-' + sampleN : ''), difficulty: 'normale', teamsAllied: false });
      const all = r.phases.flatMap((p) => p.events).filter((e) => !e.note);
      evs = [all.find((e) => e.cat === 'kill' || e.cat === 'death'), all.find((e) => e.cat === 'ally'), all.find((e) => e.cat === 'item' || e.cat === 'none')].filter(Boolean).map((e) => evHTML(e, r.tributes, t, false, true));
    } catch (e) { evs = []; }
    return chHead('Un assaggio', S.cast.length >= 4 ? 'Tre momenti da una partita breve con i primi concorrenti del tuo cast.' : 'Tre momenti da una partita breve con concorrenti casuali.') +
      '<div class="tv"><div class="tv-top"><span class="onair"><span class="rec"></span>In diretta</span><span class="tv-arena">' + ART.icon(t.id, 14) + ' ' + esc(t.name) + '</span></div>' +
      '<div class="tv-feed">' + (evs.length ? evs.map((h, i) => h.replace('class="ev', 'style="--d:' + (i * 420) + 'ms" class="ev in')).join('') : '<p class="help">Nessun assaggio disponibile per questa arena.</p>') + '</div>' +
      '<div class="tv-actions"><button class="btn primary sm" type="button" data-sample-again><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>Un altro assaggio</button></div></div>';
  }

  function showChapter(k, focus) {
    dxCh = k; const t = THEMES[S.settings.theme];
    $$('#arenaPreview [data-dx]').forEach((b) => { const on = b.dataset.dx === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); if (on) b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: AN.reduced ? 'auto' : 'smooth' }); });
    $$('#arenaPreview .dx-panel').forEach((p) => { const on = p.id === 'dxp-' + k; p.hidden = !on; p.innerHTML = on ? chapter(k, t) : ''; });
  }
  function refreshThreats(focusSel) {
    const w = $('#dzWrap'); if (!w) return;
    w.innerHTML = dzGrid(THEMES[S.settings.theme]);
    if (focusSel) { const el = w.querySelector(focusSel); if (el) el.focus({ preventScroll: true }); }
  }
  $('#arenaPreview').addEventListener('click', (e) => {
    const t = THEMES[S.settings.theme];
    const ch = e.target.closest('[data-dx]'); if (ch) return showChapter(ch.dataset.dx);
    const dz = e.target.closest('[data-dz]');
    if (dz) {
      dzOpen = dzOpen === dz.dataset.dz ? null : dz.dataset.dz; refreshThreats('[data-dz="' + CSS.escape(dz.dataset.dz) + '"]');
      const card = $('#dzWrap .dzc.open'); if (card) { if (!AN.reduced) card.querySelector('.dzc-more').animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'ease-out' }); card.scrollIntoView({ block: 'nearest', behavior: AN.reduced ? 'auto' : 'smooth' }); }
      return;
    }
    if (e.target.closest('[data-dz-all]')) { dzAll = true; refreshThreats(); return; }
    const sl = e.target.closest('[data-inv]');
    if (sl) {
      invSel = sl.dataset.inv; $$('#arenaPreview [data-inv]').forEach((b) => b.setAttribute('aria-pressed', b === sl));
      const d = $('#invDetail'); d.innerHTML = bagDetail(t);
      if (!AN.reduced) d.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.3,1.2)' });
      if (matchMedia('(max-width: 760px)').matches) d.scrollIntoView({ block: 'nearest', behavior: AN.reduced ? 'auto' : 'smooth' });
      return;
    }
    if (e.target.closest('[data-sample-again]')) { sampleN++; showChapter('anteprima'); const b = $('#arenaPreview [data-sample-again]'); if (b) b.focus(); }
  });
  $('#arenaPreview').addEventListener('input', (e) => { if (e.target.id === 'dzSearch') { dzQuery = e.target.value; dzOpen = null; refreshThreats(); } });
  $('#arenaPreview').addEventListener('keydown', (e) => {
    const tb = e.target.closest('[data-dx]'); if (!tb || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const ks = CHAPTERS.map((x) => x[0]), i = ks.indexOf(tb.dataset.dx);
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? ks.length - 1 : (i + (e.key === 'ArrowLeft' ? -1 : 1) + ks.length) % ks.length;
    e.preventDefault(); showChapter(ks[n], true);
  });
  function renderStartSum() {
    const t = THEMES[S.settings.theme];
    $('#startSum').innerHTML = '<span class="ss-icon" aria-hidden="true">' + ART.icon(t.id, 20) + '</span><span class="ss-text"><b>' + esc(t.name) + '</b><span class="ss-chips"><span>' + plural(S.cast.length, 'concorrente', 'concorrenti') + '</span><span>' + esc(difficultyCopy(S.settings.difficulty, t)[1]) + '</span><span>Fino a ' + plural(S.settings.maxDays, 'giorno', 'giorni') + '</span>' + (S.settings.adult && !t.noAdult ? '<span class="tag18">18+</span>' : '') + '</span></span>';
    $('#startMsg').textContent = S.cast.length < 2 ? 'Servono almeno 2 concorrenti: aggiungili nella sezione Concorrenti, oppure prova una partita lampo.' : '';
    $('#btnStart').disabled = S.cast.length < 2;
  }
  $('#themeList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-theme]'); if (!b) return;
    S.settings.theme = b.dataset.theme; save(); setHue(S.settings.theme);
    $$('#themeList [data-theme]').forEach((x) => x.setAttribute('aria-checked', x === b));
    radioFocus($('#themeList'));
    renderDifficulty(); renderPreview(); renderStartSum(); renderCustomForm(); renderCustomList(); renderAdult();
    centerPoster(b, true);
    if (!AN.reduced) b.animate([{ scale: '1' }, { scale: '.96' }, { scale: '1.02' }, { scale: '1' }], { duration: 420, easing: 'cubic-bezier(.2,.8,.3,1.3)' });
  });
  // sul telefono le locandine scorrono in orizzontale: la scelta resta al centro
  function centerPoster(el, smooth) {
    const box = $('#themeList'); if (!el || box.scrollWidth <= box.clientWidth + 2) return;
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: smooth && !AN.reduced ? 'smooth' : 'auto' });
  }
  $('.apick-nav').addEventListener('click', (e) => {
    const b = e.target.closest('[data-dir]'); if (!b) return;
    const box = $('#themeList'), card = box.querySelector('.poster-card');
    box.scrollBy({ left: +b.dataset.dir * (card ? card.offsetWidth + 12 : box.clientWidth * 0.8), behavior: AN.reduced ? 'auto' : 'smooth' });
  });
  $('#diffSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.difficulty = b.dataset.v; save(); $$('#diffSeg button').forEach((x) => x.setAttribute('aria-checked', x === b)); radioFocus($('#diffSeg')); renderStartSum(); });
  $('#maxDays').addEventListener('input', (e) => { S.settings.maxDays = +e.target.value; $('#maxDaysOut').textContent = e.target.value; rangeFill(e.target); save(); renderStartSum(); });
  function rangeFill(r) { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); }
  $('#seed').addEventListener('input', (e) => { S.settings.seed = e.target.value.slice(0, 60); save(); });
  $('#seedNew').addEventListener('click', () => { S.settings.seed = newSeed(); $('#seed').value = S.settings.seed; save(); });
  $('#teamsAllied').addEventListener('change', (e) => { S.settings.teamsAllied = e.target.checked; save(); });
  function renderAdult() {
    const t = THEMES[S.settings.theme], pt = COUNTS.perTheme[t.id];
    $('#adult').checked = !!S.settings.adult && !t.noAdult; $('#adultConfirm').hidden = true;
    $('#adultBox').classList.toggle('off', !!t.noAdult);
    $('#adult').disabled = !!t.noAdult;
    $('#adultNote').textContent = t.noAdult ? 'Non disponibili nel Liceo: i personaggi sono studenti.' :
      'Violenza esplicita, linguaggio volgare, alcol e sostanze, allusioni sessuali tra adulti. In questa arena: ' + pt.adultEvents + ' eventi e ' + pt.adultDisasters + ' disastri in più.';
  }
  $('#adult').addEventListener('change', (e) => {
    if (e.target.checked) { e.target.checked = false; $('#adultConfirm').hidden = false; $('#adultYes').focus(); return; }
    S.settings.adult = false; save(); renderArena();
  });
  $('#adultYes').addEventListener('click', () => { S.settings.adult = true; save(); renderArena(); toast('Contenuti 18+ attivi per le prossime partite.'); });
  $('#adultNo').addEventListener('click', () => { $('#adultConfirm').hidden = true; });
  $('#teamWin').addEventListener('change', (e) => { S.settings.teamWin = e.target.checked; save(); if (e.target.checked && nTeams() < 2) toast('Con una sola squadra la vittoria di squadra finisce subito: dividi il cast in più squadre.'); });

  // eventi personalizzati
  const PH_LABEL = { tutte: 'Sempre', b: 'Inizio', d: 'Giorno', n: 'Notte', f: 'Festino' };
  function renderCustomForm() {
    const soft = !!THEMES[S.settings.theme].soft;
    $('#cKillerLabel').textContent = soft ? 'Chi elimina' : 'Chi uccide';
    $('#cDiesLabel').textContent = soft ? 'Chi viene eliminato' : 'Chi muore';
    const n = +$('#cN').value, ls = 'ABCD'.slice(0, n).split('');
    const prevDies = $$('#cDies input:checked').map((x) => x.value), prevK = $('#cKiller').value;
    $('#cDies').innerHTML = ls.map((l) => '<label for="cd-' + l + '"><input type="checkbox" id="cd-' + l + '" value="' + l + '"' + (prevDies.includes(l) ? ' checked' : '') + '>' + l + '</label>').join('');
    $('#cKiller').innerHTML = '<option value="">Nessuno</option>' + ls.map((l) => '<option' + (prevK === l ? ' selected' : '') + '>' + l + '</option>').join('');
    updatePreview();
  }
  const readCustom = () => ({ phase: $('#cPhase').value, n: +$('#cN').value, text: $('#cText').value.trim(), dies: $$('#cDies input:checked').map((x) => x.value), killer: $('#cKiller').value });
  function validateCustom(c) {
    if (record(c) && c.raw != null) {
      if (!['tutte', 'b', 'd', 'n', 'f'].includes(c.phase == null ? 'tutte' : c.phase)) return 'La fase dell\'evento non è valida.';
      try { L.parseLine(L.customToLine(c), 'custom'); return null; } catch (e) { return e.message; }
    }
    if (!record(c) || typeof c.text !== 'string' || !c.text.trim()) return 'Scrivi il testo dell\'evento.';
    if (c.text.trim().length > 240) return 'Il testo dell\'evento può contenere al massimo 240 caratteri.';
    const n = c.n == null ? 1 : +c.n;
    if (!Number.isInteger(n) || n < 1 || n > 4) return 'Scegli da 1 a 4 concorrenti per l\'evento.';
    const phase = c.phase == null ? 'tutte' : c.phase;
    if (!['tutte', 'b', 'd', 'n', 'f'].includes(phase)) return 'La fase dell\'evento non è valida.';
    const letters = 'ABCD'.slice(0, n).split(''), dies = c.dies == null ? [] : c.dies, killer = c.killer == null ? '' : c.killer;
    if (!Array.isArray(dies) || dies.some((x) => !letters.includes(x)) || new Set(dies).size !== dies.length) return 'Indica solo concorrenti presenti nell\'evento, una volta ciascuno, tra chi muore.';
    if (killer !== '' && !letters.includes(killer)) return 'Chi uccide deve essere uno dei concorrenti dell\'evento.';
    for (const l of letters) if (!c.text.includes('{' + l + '}')) return 'Con ' + n + ' concorrenti il testo deve nominare anche {' + l + '}.';
    if (killer && !dies.filter((x) => x !== killer).length) return 'Hai scelto chi uccide: indica anche chi muore.';
    if (killer && dies.includes(killer)) return 'Chi uccide non può morire nello stesso evento.';
    try { L.parseLine(L.customToLine(Object.assign({}, c, { n, dies, killer })), 'custom'); } catch (e) { return e.message; }
    return null;
  }
  function updatePreview() {
    const c = readCustom();
    if (!c.text) { $('#cPreview').textContent = 'L\'anteprima apparirà qui mentre scrivi.'; return; }
    try { $('#cPreview').innerHTML = L.previewCustom(c, S.settings.theme); } catch (e) { $('#cPreview').textContent = e.message; }
  }
  function renderCustomList() {
    $('#customCount').textContent = S.custom.length ? '· ' + S.custom.length : '';
    $('#cList').innerHTML = S.custom.length
      ? S.custom.map((c) => '<div class="citem" data-id="' + esc(c.id) + '"><span class="tag">' + PH_LABEL[c.phase] + ' · ' + c.n + (c.raw ? ' · avanzato' : c.dies.length ? (THEMES[S.settings.theme].soft ? ' · con eliminazioni' : ' · letale') : '') + '</span><span class="txt">' + esc(c.text) + '</span><button class="btn sm" type="button" data-act="cedit">Modifica</button><button class="btn sm" type="button" data-act="cdup">Duplica</button><button class="x" type="button" data-act="cdel" aria-label="Elimina evento">✕</button></div>').join('')
      : '<p class="help">Nessun evento personalizzato. Gli eventi del modulo semplice hanno peso doppio; nell’editor avanzato puoi scegliere il peso.</p>';
    if (typeof studio !== 'undefined' && studio) studio.previewAdvanced();
  }
  $('#cN').addEventListener('change', renderCustomForm);
  ['cText', 'cKiller', 'cPhase'].forEach((id) => $('#' + id).addEventListener('input', updatePreview));
  $('#cDies').addEventListener('change', updatePreview);
  $('#cAdd').addEventListener('click', () => {
    const c = readCustom(), err = validateCustom(c);
    if (err) { $('#cMsg').textContent = err; return; }
    S.custom.push(sanitizeCustom(c)); save();
    $('#cText').value = ''; $('#cMsg').textContent = 'Evento aggiunto.';
    renderCustomList(); updatePreview();
  });
  $('#cList').addEventListener('click', (e) => { const b = e.target.closest('[data-act="cdel"]'); if (!b) return; S.custom = S.custom.filter((c) => c.id !== b.closest('.citem').dataset.id); save(); renderCustomList(); });

  // avvio
  function simulationBusy(busy) {
    $('#simProgress').hidden = !busy;
    $('main').setAttribute('aria-busy', busy);
    $$('#btnStart, #quickPlay, #rAgain, button[data-quick]').forEach((b) => { b.disabled = busy || b.id === 'btnStart' && S.cast.length < 2; });
  }
  $('#cancelSim').addEventListener('click', () => { runGeneration++; if (RUNNER) RUNNER.cancel(); simulationBusy(false); toast('Calcolo annullato.'); });
  async function runSim(cfg) {
    const generation = ++runGeneration;
    if (typeof studio !== 'undefined' && studio) studio.beforeSimulation();
    if (RUNNER) RUNNER.cancel(); stopPlay(); simulationBusy(true);
    let result;
    try { result = RUNNER ? await RUNNER.simulate(cfg) : L.simulate(cfg); }
    catch (e) { if (generation === runGeneration && e.name !== 'AbortError') toast('Simulazione non riuscita: ' + e.message); return false; }
    finally { if (generation === runGeneration) simulationBusy(false); }
    if (generation !== runGeneration) return false;
    SIM = result;
    BY = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
    S.run = { cfg, phase: 0, seen: 0 }; lastRendered = -1;
    const run = S.run, stored = persistRun(run, SIM);
    if (typeof studio !== 'undefined' && studio) studio.recordResult(cfg, SIM, run.replayId, stored);
    save();
    if (location.hash === '#diretta') route(); else location.hash = '#diretta';
    return true;
  }
  function startRun(seed) {
    if (S.cast.length < 2) { toast('Servono almeno 2 concorrenti.'); location.hash = '#cast'; return; }
    S.cast.forEach((t, i) => { if (!t.name.trim()) t.name = 'Concorrente ' + (i + 1); });
    S.settings.seed = seed || S.settings.seed || newSeed();
    runSim(currentConfiguration());
  }
  function currentConfiguration() { return { cast: JSON.parse(JSON.stringify(S.cast)), theme: S.settings.theme, difficulty: S.settings.difficulty, seed: S.settings.seed || newSeed(), maxDays: S.settings.maxDays, teamsAllied: S.settings.teamsAllied, teamWin: S.settings.teamWin, custom: JSON.parse(JSON.stringify(S.custom)), adult: !!S.settings.adult, initialRelations: L.normalizeInitialRelations(S.initialRelations, S.cast) }; }
  $('#btnStart').addEventListener('click', () => startRun());

  /* =============== DIRETTA =============== */
  function evHTML(e, tributes, theme, anim, plain, delay) {
    const by = tributes ? Object.fromEntries(tributes.map((t) => [t.id, t])) : BY;
    if (e.note) return '<div class="ev note' + (e.meteo ? ' meteo' : '') + (anim ? ' in' : '') + '" style="--d:' + (delay || 0) + 'ms"><span class="note-ic" aria-hidden="true">' + (e.meteo ? '<svg viewBox="0 0 24 24"><path d="M7 17.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.6 4 4 0 0 0 7 17.5z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0zM12 8v5M12 16v.5"/></svg>') + '</span><p>' + e.html + '</p></div>';
    const cat = e.cat || 'none';
    const lbl = CAT[cat][theme.soft ? 1 : 0];
    const avs = '<span class="avs">' + e.ids.slice(0, 4).map((id) => avHTML(by[id], { dead: e.deaths.includes(id), btn: !plain })).join('') + '</span>';
    const chip = lbl ? '<span class="cat">' + IC[cat] + (e.deaths.length > 1 && (cat === 'kill' || cat === 'death') ? e.deaths.length + ' ' + (theme.soft ? 'fuori' : 'morti') : lbl) + '</span>' : '';
    const fix = (h) => (plain ? h.replace(/<b class="nm"[^>]*>/g, '<b>') : linkify(h));
    const why = e.duel ? 'Confronto di ' + esc(ATTRN[e.duel.attr] || e.duel.attr) + ' · ' + esc(by[e.duel.a].name) + ' ' + e.duel.left + ' / ' + esc(by[e.duel.b].name) + ' ' + e.duel.right : e.test ? (e.intrigue ? 'Piano rivelato · ' : '') + '<span title="Tiro ' + e.test.roll + ' contro soglia ' + e.test.dc + '">Prova di ' + esc(ATTRN[e.test.attr] || e.test.attr) + ' · <span class="dice"><span class="roll">' + e.test.roll + '</span>/' + e.test.dc + '</span> · ' + (e.test.pass ? 'superata' : 'fallita') + '</span>' : e.sponsor ? 'Sponsor' : e.whyTxt ? esc(e.whyTxt) : whyLabel(e, theme);
    const echo = ((e.echo || []).length ? '<ul class="echo">' + e.echo.map((x) => '<li class="' + (x.cls || '') + '">' + fix(x.html) + '</li>').join('') + '</ul>' : '') +
      (e.reason ? '<details class="event-reason"><summary>Il contesto</summary><p>' + esc(e.reason) + '</p></details>' : '');
    const pin = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.5 8 14.5 8 14.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></svg>';
    const place=e.place?(e.place.zone!=null?'<span class="event-place">'+pin+esc(capFirst(stripArt(theme.lex.luogo[e.place.zone]||'Zona')))+'</span>':'<span class="event-place">'+pin+'Zone diverse</span>'):'';
    return '<div class="ev c-' + cat + (!tributes && (S.followed || []).some((id) => e.ids.includes(id)) ? ' followed' : '') + (e.deaths.length ? ' lethal' : '') + (anim ? ' in fx-' + cat + (e.sponsor ? ' fx-sponsor' : '') : '') + '"'+(e.place?' data-map-step="'+e.place.seq+'"':'')+' style="--cc:var(--c-' + cat + ');--d:' + (delay || 0) + 'ms">' + avs + '<div class="evbody">' + (chip || place ? '<div class="ev-meta">' + chip + place + '</div>' : '') + (why ? '<span class="why' + (e.test ? (e.test.pass ? ' ok' : ' ko') : '') + '">' + why + '</span>' : '') + '<p>' + fix(e.html) + '</p>' + echo + '</div><span class="ev-mark" aria-hidden="true">' + (IC[cat] || '') + '</span></div>';
  }
  function timelineHTML(P, i, seenAt, hideFuture) {
    const theme = resultTheme(SIM), groups = [];
    P.forEach((p, k) => {
      if (hideFuture && k > seenAt + 1) return;
      const masked = hideFuture && k > seenAt, inf = phaseInfo(P, k, theme, true);
      const key = masked ? 'next' : inf.group.key, label = masked ? 'Da scoprire' : inf.group.label;
      let g = groups.find((x) => x.key === key); if (!g) groups.push((g = { key, label, ks: [] })); g.ks.push(k);
    });
    return groups.map((g) => '<div class="tday' + (g.key === 'finale' ? ' tfin' : g.key === 'next' ? ' tnext' : '') + (g.ks.includes(i) ? ' tcur' : '') + '"><span class="tdl">' + esc(g.label) + '</span><div>' + g.ks.map((k) => {
      const p = P[k]; const dn = p.kind === 'fallen' ? p.deaths.length : p.events.reduce((s, e) => s + e.deaths.length, 0);
      const seen = k <= (seenAt || 0);
      const hidden = hideFuture && !seen, title = hidden ? 'Prossima fase' : phaseInfo(P, k, theme, true).short;
      return '<button type="button" class="tph k-' + p.kind + (k === i ? ' cur' : seen ? ' seen' : ' locked') + '" data-k="' + k + '"' + (k === i ? ' aria-current="step"' : '') + ' title="' + esc(title) + '" aria-label="Fase ' + (k + 1) + ': ' + esc(title) + '">' + (hidden ? '<span aria-hidden="true">?</span>' : IC[p.kind]) + (dn && seen && p.kind !== 'fallen' ? '<span class="dn">' + dn + '</span>' : '') + '</button>';
    }).join('') + '</div></div>').join('');
  }
  const EV_FILTERS = [['dead', ['Morti', 'Eliminati'], ['kill', 'death']], ['betray', ['Tradimenti', 'Tradimenti'], ['betray']], ['ally', ['Alleanze', 'Alleanze'], ['ally']], ['love', ['Amore', 'Amore'], ['love']], ['heal', ['Aiuti', 'Aiuti'], ['heal']], ['item', ['Oggetti', 'Assi nella manica'], ['item']], ['hurt', ['Guai', 'Colpi bassi'], ['hurt']], ['none', ['Altro', 'Altro'], ['none']]];
  let evFilter = null;
  const evMatch = (e, f) => { if (f === 'followed') return (S.followed || []).some((id) => e.ids.includes(id)); const F = EV_FILTERS.find((x) => x[0] === f); return !F || F[2].includes(e.cat || 'none'); };
  function readbarHTML(ph, theme, events) {
    const real = events.filter((e) => !e.note), soft = !!theme.soft;
    const chip = (key, label, n, icon) => '<button type="button" class="rbc' + (key ? ' f-' + key : '') + '" data-evf="' + (key || '') + '" aria-pressed="' + (evFilter === key) + '">' + (icon || '') + '<span>' + label + '</span><b>' + n + '</b></button>';
    const list = EV_FILTERS.map(([k, l, cats]) => [k, l[soft ? 1 : 0], real.filter((e) => cats.includes(e.cat || 'none')).length, IC[cats[0]] || '']).filter((x) => x[2] || evFilter === x[0]);
    const fol = real.filter((e) => evMatch(e, 'followed')).length;
    return chip(null, 'Tutti', real.length) + list.map(([k, l, n, ic]) => chip(k, l, n, ic)).join('') + (fol || evFilter === 'followed' ? chip('followed', 'Seguiti', fol, '') : '');
  }
  function syncReadControls() {
    const r = S.settings.read = readPrefs(S.settings.read);
    $$('#densSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === r.density));
    $$('#sizeSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === r.size));
    $$('#orderSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === r.order));
    $$('#rbPanel [data-read]').forEach((c) => { c.checked = !!r[c.dataset.read]; });
    const body = $('#phBody');
    body.classList.toggle('dens-compatta', r.density === 'compatta'); body.classList.toggle('size-grande', r.size === 'grande');
    ['echo', 'place', 'why', 'faces'].forEach((k) => body.classList.toggle('no-' + k, !r[k]));
  }
  function renderLive(fromRoute) {
    $('#liveEmpty').hidden = !!SIM; $('#liveBody').hidden = !SIM;
    if (!SIM) return;
    const theme = resultTheme(SIM), soft = !!theme.soft;
    const P = SIM.phases, i = Math.max(0, Math.min(P.length - 1, S.run.phase || 0));
    S.run.phase = i; S.run.seen = Math.max(S.run.seen || 0, i);
    const ph = P[i], total = SIM.tributes.length;
    const R0 = S.settings.read = readPrefs(S.settings.read);
    const followedEvents = ph.events.filter((e) => e.note || !S.settings.followOnly || (S.followed || []).some((id) => e.ids.includes(id)));
    let visibleEvents = followedEvents.filter((e) => e.note || !evFilter || evMatch(e, evFilter));
    if (R0.order === 'gravi') visibleEvents = visibleEvents.map((e, k) => [e, k]).sort((a, b) => (Number(!!b[0].note) - Number(!!a[0].note)) || (b[0].deaths.length - a[0].deaths.length) || (Number(b[0].cat === 'betray') - Number(a[0].cat === 'betray')) || (a[1] - b[1])).map((x) => x[0]);
    const forward = !fromRoute && i === lastRendered + 1;
    lastRendered = i;

    $('#bcArena').innerHTML = ART.icon(theme.id, 14) + ' ' + esc(theme.name) + (SIM.adult ? ' <span class="bc-18">18+</span>' : '');
    const bcs = $('#bcScene'); if (bcs.dataset.t !== theme.id) { bcs.innerHTML = ART.scene(theme.id); bcs.dataset.t = theme.id; }
    const prevAlive = i > 0 ? P[i - 1].snap.alive.length : total;
    AN.field(bcs, theme.id, { intensity: AN.intensityFor(ph.kind, ph.snap.alive.length / total) });
    AN.phaseFx($('.broadcast'), ph.kind, theme.id, forward, { deaths: ph.kind === 'fallen' ? ph.deaths.length : 0 });
    const hideTotal = S.settings.hideFuture && S.run.seen < P.length - 1;
    const info = phaseInfo(P, i, theme, hideTotal), maxD = runMaxDays();
    $('#bcPhase').textContent = 'Fase ' + (i + 1) + (hideTotal ? '' : ' di ' + P.length);
    $('#bcLimit').hidden = !maxD;
    if (maxD) $('#bcLimit').textContent = 'Limite: ' + maxD + ' ' + calOf(theme).units;
    $('#bcKind').textContent = info.kicker;
    $('#phTitle').textContent = info.title; if (forward) AN.kinetic($('#phTitle'), ph.kind === 'dis' ? 'shake' : ph.kind === 'n' ? 'fade' : 'drop');
    $('#phIntro').textContent = ph.intro || '';
    if (forward) AN.countTo($('#aliveBig'), ph.snap.alive.length, { from: prevAlive, dur: 1100 }); else $('#aliveBig').textContent = ph.snap.alive.length; $('#aliveTot').textContent = '/' + total;
    $('#aliveLbl').textContent = soft ? 'ancora in gioco' : 'superstiti';
    const deadNow = SIM.tributes.filter((t) => !t.alive && t.deathPhase <= i).sort((a, b) => a.order - b.order);
    const newly = new Set(ph.kind === 'fallen' ? [] : ph.events.flatMap((e) => e.deaths));
    $('#tally').innerHTML = deadNow.map((t) => '<i class="d' + (newly.has(t.id) && forward ? ' new' : '') + '" title="' + esc(t.name) + '"></i>').join('') + '<i></i>'.repeat(total - deadNow.length);

    $('#timeline').innerHTML = timelineHTML(P, i, S.run.seen, S.settings.hideFuture);
    const cur = $('#timeline .tph.cur'); if (cur) { const tl = $('#timeline'); tl.scrollLeft = Math.max(0, cur.offsetLeft - tl.clientWidth / 2); }

    // contenuto
    if (ph.kind === 'fallen') {
      $('#phBody').innerHTML = '<div class="memorial' + (forward ? ' rise' : '') + '"><h2>' + (soft ? 'Fuori dai giochi' : 'In memoria') + '</h2>' +
        (ph.deaths.length ? '<div class="memgrid">' + ph.deaths.map((id) => { const t = BY[id]; return '<button type="button" class="mem" data-prof="' + esc(id) + '">' + avHTML(t, { dead: true }) + '<b>' + esc(t.name) + '</b><small>Squadra ' + t.team + (t.killerIds.length ? '<br>per mano di ' + esc(t.killerIds.map((k) => BY[k].name).join(', ')) : '<br>vittima dell\'arena') + '</small><span class="mono">' + (ph.snap.kills[t.id] || 0) + ' ' + (soft ? 'elim.' : 'ucc.') + '</span></button>'; }).join('') + '</div>' : '<div class="emptyday">' + esc(ph.intro) + '</div>') + '</div>';
    } else {
      const why = ph.kind === 'finale' && P.findIndex((x) => x.kind === 'finale') === i ? '<div class="ev note finale-why"><p><b>Perché lo scontro finale.</b> ' + esc(finaleReason(P, theme)) + '</p></div>' : '';
      const empty = evFilter ? '<div class="ev-empty"><p>Nessun evento di questo tipo in questa fase.</p><button type="button" class="btn sm" data-evf="">Mostra tutti</button></div>' : '<p class="help">Nessun evento per i concorrenti seguiti in questa fase. Puoi seguirne uno dalla sua scheda o disattivare il filtro nelle opzioni.</p>';
      $('#phBody').innerHTML = why + (visibleEvents.filter((e) => !e.note).length || !evFilter ? visibleEvents.map((e, k) => evHTML(e, null, theme, forward, false, Math.min(k * 90, 1800))).join('') : '') + (!visibleEvents.filter((e) => !e.note).length && (evFilter || S.settings.followOnly) ? empty : '');
      if (R0.context) $$('#phBody .event-reason').forEach((d) => (d.open = true));
    }
    renderSide(i);
    $('#rbChips').innerHTML = ph.kind === 'fallen' ? '<span class="rb-note">' + esc(phaseInfo(P, i, theme, true).kicker) + '</span>' : readbarHTML(ph, theme, followedEvents);
    syncReadControls();
    $('#phaseAnnouncement').textContent = 'Fase ' + (i + 1) + ': ' + ph.title + '. ' + plural(visibleEvents.length, 'evento visibile', 'eventi visibili') + ', ' + plural(ph.snap.alive.length, 'concorrente in gara', 'concorrenti in gara') + '.';
    ['hideFuture', 'adaptivePlay', 'reduceMotion', 'followOnly'].forEach((k) => { $('#' + k).checked = !!S.settings[k]; });
    if (forward && !AN.reduced && ph.kind !== 'fallen') {
      const cards = $$('#phBody .ev');
      visibleEvents.forEach((e, k) => {
        const c = cards[k]; if (!c) return;
        const at = Math.min(k * 90, 1800) + 260;
        setTimeout(() => {
          if (!c.isConnected) return;
          if (e.test) { const w = c.querySelector('.why'); AN.dice(w, e.test.roll, e.test.dc, e.test.pass); }
          if (e.cat === 'love') AN.domBurst(c, 'hearts', 7);
          else if (e.cat === 'heal') AN.domBurst(c, 'heal', 5);
          else if (e.sponsor) AN.domBurst(c, 'stars', 6);
          else if (e.deaths.length >= 2) AN.domBurst(c, 'skulls', 3 + e.deaths.length);
          if ((e.echo || []).some((x) => x.cls === 'twist')) AN.domBurst(c, 'sparks', 10);
        }, at);
      });
    }

    const last = i === P.length - 1;
    $('#prevBtn').disabled = i === 0;
    $('#nextLbl').textContent = last ? 'Esito' : 'Avanti';
    $$('#speedSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.settings.speed));
    syncPlay();
    save();
  }
  function renderSide(i) {
    const theme = resultTheme(SIM), ph = SIM.phases[i], soft = !!theme.soft;
    $$('.stabs button').forEach((b) => { const active = b.dataset.s === sideTab; b.setAttribute('aria-selected', active); b.tabIndex = active ? 0 : -1; });
    $('#sideBody').setAttribute('aria-labelledby', 'side-tab-' + sideTab);
    $('.stabs [data-s="fallen"]').textContent = soft ? (theme.id === 'ufficio' ? 'Licenziati' : 'Eliminati') : 'Caduti';
    const aliveSet = new Set(ph.snap.alive);
    let h = '';
    if (sideTab === 'map') {
      h=window.LOS_MAP_VIEW.render(SIM,i,{theme,properties:arenaOf(theme.id).zones,selected:mapSelection,avatar:t=>avHTML(t,{btn:true}),zonePic:z=>window.LOS_ATLAS?window.LOS_ATLAS.pic(theme.id,'luoghi',z.name,theme.hue,{index:z.id}):''});
    } else if (sideTab === 'fallen') {
      const dead = SIM.tributes.filter((t) => !t.alive && t.deathPhase <= i).sort((a, b) => b.order - a.order);
      h = dead.length ? '<div class="plist">' + dead.map((t) => '<button type="button" class="prow" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: true }) + '<span style="min-width:0"><span class="pn">' + esc(t.name) + '</span><span class="ps">' + (t.killerIds.length ? 'per mano di ' + esc(t.killerIds.map((k) => BY[k].name).join(', ')) + (causeTxt(t, theme) ? ' · ' + causeTxt(t, theme) : '') : causeTxt(t, theme) ? 'per ' + causeTxt(t, theme) : 'vittima dell\'arena') + '</span></span><span class="pk">' + esc(whenLabel(theme, t.deathPhase, t.deathDay)) + '</span></button>').join('') + '</div>' : '<p class="help">Ancora nessuno.</p>';
    } else if (sideTab === 'alive') {
      const al = SIM.tributes.filter((t) => aliveSet.has(t.id)).sort((a, b) => Number((S.followed || []).includes(b.id)) - Number((S.followed || []).includes(a.id)) || (ph.snap.kills[b.id] || 0) - (ph.snap.kills[a.id] || 0));
      h = '<div class="plist">' + al.map((t) => {
        const st = ph.snap.st[t.id] || [], inv = ph.snap.inv[t.id] || [];
        const m = (ph.snap.mind || {})[t.id], g = m && (MND.goals || {})[m.g];
        const sub = [st.length ? st.map((s) => statusLabel(s, t, theme)).join(', ') : 'in forma', g && !g.secret && m.g !== 'sopravvivere' ? goalLabel(m) : '', inv.length ? plural(inv.length, 'oggetto', 'oggetti') : ''].filter(Boolean).join(' · ');
        const fresh = (t.diary || []).some((d) => d.ph === i);
        return '<button type="button" class="prow" data-prof="' + esc(t.id) + '">' + avHTML(t) + '<span style="min-width:0"><span class="pn">' + esc(t.name) + (fresh ? '<span class="newdiary" title="Nuova pagina nel diario segreto">diario</span>' : '') + '</span><span class="ps">' + esc(sub) + '</span>' + vbars((ph.snap.vit || {})[t.id], theme, false) + '</span><span class="pk">' + (ph.snap.kills[t.id] || 0) + (soft ? ' elim.' : ' ucc.') + '</span></button>';
      }).join('') + '</div>';
    } else {
      const groups = {};
      ph.snap.alive.forEach((id) => { const g = ph.snap.allies[id]; if (g != null) (groups[g] = groups[g] || []).push(id); });
      const gs = Object.values(groups).filter((g) => g.length > 1);
      const solo = ph.snap.alive.filter((id) => ph.snap.allies[id] == null);
      const R = ph.snap.rel || {}, alive = new Set(ph.snap.alive);
      const av = (id) => avHTML(BY[id], { btn: true });
      const couples = [], seenC = new Set();
      ph.snap.alive.forEach((id) => { const p = R[id] && R[id].p; if (p && alive.has(p) && !seenC.has(p)) { seenC.add(id); couples.push([id, p]); } });
      const grudges = [], debts = [];
      ph.snap.alive.forEach((id) => { const r = R[id]; if (!r) return; r.g.forEach(([t, why, v]) => alive.has(t) && grudges.push([id, t, why, v])); r.o.forEach((t) => alive.has(t) && debts.push([id, t])); });
      const whyTxt = (why, v) => why === 'kill' && v && BY[v] ? 'per ' + esc(BY[v].name) : { betray: 'per un tradimento', steal: 'per un furto', attack: 'per un agguato', kill: 'per un lutto' }[why] || '';
      const stat = (v, l) => '<div class="rs"><b>' + v + '</b><span>' + l + '</span></div>';
      const sec = (cls, title, rows, empty) => '<section class="rsec ' + cls + '"><h4>' + title + '<span>' + rows.length + '</span></h4>' + (rows.length ? '<div class="rel">' + rows.join('') + '</div>' : '<p class="help">' + empty + '</p>') + '</section>';
      const nameOf = (id) => '<button type="button" class="rname" data-prof="' + esc(id) + '">' + esc(BY[id].name) + '</button>';
      const pair = (a, b, icon, text) => '<div class="relrow"><span class="rpair">' + av(a) + '<span class="ricon">' + icon + '</span>' + av(b) + '</span><span class="rtxt">' + text + '</span></div>';
      h = '<div class="rstats">' + stat(gs.length, gs.length === 1 ? 'Alleanza' : 'Alleanze') + stat(couples.length, couples.length === 1 ? 'Coppia' : 'Coppie') + stat(grudges.length, grudges.length === 1 ? 'Vendetta' : 'Vendette') + stat(debts.length, debts.length === 1 ? 'Debito' : 'Debiti') + '</div>' +
        netHTML(ph) +
        '<section class="rsec r-ally"><h4>Alleanze<span>' + gs.length + '</span></h4>' + (gs.length ? '<div class="rally">' + gs.map((g, k) => '<div class="rteam"><span class="rt-n">' + (k + 1) + '</span><div class="rt-faces">' + g.map(av).join('') + '</div><p>' + g.map(nameOf).join(', ') + '</p></div>').join('') + '</div>' : '<p class="help">Nessuna alleanza attiva.</p>') + '</section>' +
        sec('r-love', 'Coppie', couples.map(([a, b]) => pair(a, b, '♥', nameOf(a) + ' e ' + nameOf(b) + ' stanno insieme')), 'Ancora nessuna coppia.') +
        sec('r-hate', 'Vendette giurate', grudges.slice(0, 14).map(([a, b, why, v]) => pair(a, b, '→', nameOf(a) + ' vuole vendicarsi di ' + nameOf(b) + (whyTxt(why, v) ? ' <span class="rwhy">' + whyTxt(why, v) + '</span>' : ''))), 'Nessuno ha ancora giurato vendetta.') +
        sec('r-debt', 'Debiti', debts.slice(0, 10).map(([a, b]) => pair(a, b, '⇢', nameOf(a) + ' deve un favore a ' + nameOf(b))), 'Nessun debito in sospeso.') +
        (solo.length ? '<section class="rsec r-solo"><h4>Senza alleati<span>' + solo.length + '</span></h4><div class="rt-faces">' + solo.map(av).join('') + '</div></section>' : '');
    }
    $('#sideBody').innerHTML = h;
    if(lastSideResult!==SIM||lastSidePhase!==i||lastSideTab!==sideTab)$('#sideBody').scrollTop=0;
    lastSideResult=SIM;lastSidePhase=i;lastSideTab=sideTab;
  }
  // mappa dei legami: filtri per tipo ed evidenziazione al passaggio
  $('#sideBody').addEventListener('click', (e) => {
    const zone=e.target.closest('[data-map-zone]');
    if(zone&&SIM){mapSelection=zone.dataset.mapZone==='all'?null:+zone.dataset.mapZone;renderSide(S.run.phase);$('#sideBody').scrollTop=0;$('#sideBody .map-node[data-map-zone="'+mapSelection+'"]')?.focus({preventScroll:true});return;}
    const event=e.target.closest('[data-map-event]');
    if(event&&SIM){const ev=SIM.phases[S.run.phase].events[+event.dataset.mapEvent];if(!ev?.place)return;stopPlay();if(S.settings.followOnly&&!ev.ids.some(id=>(S.followed||[]).includes(id))){S.settings.followOnly=false;renderLive(true);}const card=$('#phBody [data-map-step="'+ev.place.seq+'"]');if(card){card.tabIndex=-1;card.scrollIntoView({block:'center',behavior:AN.reduced?'auto':'smooth'});card.focus({preventScroll:true});}return;}
    const nn = e.target.closest('[data-net-node]');
    if (nn && SIM) { const id = nn.dataset.netNode; netSel = netSel === id ? null : id; renderSide(S.run.phase); const back = $('#sideBody .net [data-net-node="' + CSS.escape(id) + '"]'); if (back) back.focus({ preventScroll: true }); return; }
    const b = e.target.closest('[data-net]'); if (!b || !SIM) return;
    const c = b.dataset.net; if (netOff.has(c)) netOff.delete(c); else netOff.add(c);
    renderSide(S.run.phase);
  });
  const netFocus = (id) => {
    const svg = $('#sideBody .net'); if (!svg || netSel) return;
    svg.classList.toggle('focus', !!id);
    $$('.edge', svg).forEach((p) => p.classList.toggle('on', !!id && (p.dataset.a === id || p.dataset.b === id)));
    $$('.node', svg).forEach((g) => g.classList.toggle('on', g.dataset.netNode === id));
  };
  $('#sideBody').addEventListener('mouseover', (e) => {
    const g = e.target.closest('.net .node'); netFocus(g ? g.dataset.netNode : null);
    // mappa delle zone: al passaggio si accendono i passaggi della zona
    const z = e.target.closest('.map-node'), svg = $('#sideBody .arena-graph svg');
    if (svg) $$('.link', svg).forEach((l) => l.classList.toggle('hl', !!z && (l.dataset.a === z.dataset.mapZone || l.dataset.b === z.dataset.mapZone)));
  });
  $('#sideBody').addEventListener('focusin', (e) => { const g = e.target.closest('.net .node'); if (g) netFocus(g.dataset.netNode); });
  $('#sideBody').addEventListener('mouseleave', () => netFocus(null));
  $('#sideBody').addEventListener('keydown', (e) => { const g = e.target.closest('.net .node'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
  $('.stabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b || !SIM) return; sideTab = b.dataset.s; renderSide(S.run.phase); });
  function go(k) { if (!SIM) return; S.run.phase = Math.max(0, Math.min(SIM.phases.length - 1, k)); renderLive(false); if (playing) schedulePlay(); }
  function next() {
    if (!SIM) return;
    if (S.run.phase >= SIM.phases.length - 1) { stopPlay(); location.hash = '#esito'; return; }
    go(S.run.phase + 1);
    if (S.run.phase >= SIM.phases.length - 1) stopPlay();
    if (window.scrollY > 300 && !playTimer) $('.broadcast').scrollIntoView({ behavior: AN.reduced ? 'auto' : 'smooth' });
  }
  function phaseReadDelay(ph, speed, adaptive) {
    if (!adaptive) return SPEED[speed] || SPEED.normale;
    const text = [ph.title, ph.intro, ...ph.events.flatMap((e) => [e.plain, ...(e.echo || []).map((x) => x.plain)])].filter(Boolean).join(' ');
    const words = text.trim().split(/\s+/).length + (ph.deaths || []).length * 4;
    const factor = { lenta: 1, normale: 2, veloce: 4 }[speed] || 2;
    return Math.min(180000, Math.max(7000, 2000 + words * 285) / factor);
  }
  function syncPlay() { $('#playIcon').innerHTML = playing ? IC.pause : IC.play; $('#playBtn').setAttribute('aria-label', playing ? 'Pausa' : 'Riproduci'); }
  function stopPlay() { playing = false; if (playTimer) { clearTimeout(playTimer); playTimer = null; } if ($('#playIcon')) syncPlay(); }
  function schedulePlay() {
    if (playTimer) clearTimeout(playTimer);
    playTimer = setTimeout(() => { playTimer = null; if (playing) next(); }, phaseReadDelay(SIM.phases[S.run.phase], S.settings.speed, S.settings.adaptivePlay));
  }
  function startPlay() { stopPlay(); if (!SIM || document.hidden || S.run.phase >= SIM.phases.length - 1) return; playing = true; schedulePlay(); syncPlay(); }
  $('#nextBtn').addEventListener('click', () => { stopPlay(); next(); });
  $('#prevBtn').addEventListener('click', () => { stopPlay(); lastRendered = -2; go(S.run.phase - 1); });
  $('#playBtn').addEventListener('click', () => { if (!SIM) return; if (playing) return stopPlay(); if (S.run.phase >= SIM.phases.length - 1) go(0); startPlay(); next(); });
  $('#speedSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.speed = b.dataset.v; save(); $$('#speedSeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); if (playing) startPlay(); });
  $('#readBar').addEventListener('click', (e) => {
    const f = e.target.closest('[data-evf]');
    if (f) { const k = f.dataset.evf || null; evFilter = evFilter === k ? null : k; if (SIM) renderLive(true); const back = $('#rbChips [data-evf="' + (evFilter || '') + '"]'); if (back) back.focus({ preventScroll: true }); return; }
    const m = e.target.closest('#rbMore'); if (m) { const p = $('#rbPanel'); p.hidden = !p.hidden; m.setAttribute('aria-expanded', String(!p.hidden)); return; }
    const sg = e.target.closest('#densSeg button, #sizeSeg button, #orderSeg button');
    if (sg) { const key = { densSeg: 'density', sizeSeg: 'size', orderSeg: 'order' }[sg.parentElement.id]; S.settings.read = readPrefs(Object.assign({}, S.settings.read, { [key]: sg.dataset.v })); save(); if (SIM) renderLive(true); else syncReadControls(); }
  });
  $('#rbPanel').addEventListener('change', (e) => { const c = e.target.closest('[data-read]'); if (!c) return; S.settings.read = readPrefs(Object.assign({}, S.settings.read, { [c.dataset.read]: c.checked })); save(); if (SIM) renderLive(true); });
  $('#phBody').addEventListener('click', (e) => { const f = e.target.closest('.ev-empty [data-evf]'); if (f) { evFilter = null; if (SIM) renderLive(true); } });
  ['hideFuture', 'adaptivePlay', 'reduceMotion', 'followOnly'].forEach((key) => $('#' + key).addEventListener('change', (e) => {
    S.settings[key] = e.target.checked; save();
    if (key === 'reduceMotion') AN.setReduced(S.settings.reduceMotion);
    if (SIM && curView === 'diretta') renderLive(true);
    if (playing) schedulePlay();
  }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stopPlay(); stopHomeLoop(); } else if (curView === 'home') renderHome(); });
  $('#timeline').addEventListener('click', (e) => { const b = e.target.closest('.tph'); if (!b) return; stopPlay(); lastRendered = -2; go(+b.dataset.k); });
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || $('#v-diretta').hidden || /input|textarea|select/i.test(e.target.tagName) || $$('dialog').some((d) => d.open)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); stopPlay(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); lastRendered = -2; go(S.run.phase - 1); }
    else if (e.key === ' ' && e.target === document.body) { e.preventDefault(); $('#playBtn').click(); }
  });

  /* =============== SCHEDA CONCORRENTE =============== */
  function openProfile(id) {
    const t = BY[id]; if (!t) return;
    stopPlay();
    const theme = resultTheme(SIM), soft = !!theme.soft;
    const atRes = curView === 'esito';
    const i = atRes ? SIM.phases.length - 1 : S.run.phase || 0;
    const snap = SIM.phases[i].snap;
    const dead = !t.alive && t.deathPhase <= i;
    const kills = atRes ? t.kills : snap.kills[id] || 0;
    const hist = [];
    SIM.phases.slice(0, i + 1).forEach((p, k) => p.events.forEach((e) => { if (e.ids.includes(id)) hist.push({ e, p, k }); }));
    const ally = snap.allies[id] != null && !dead ? snap.alive.filter((x) => x !== id && snap.allies[x] === snap.allies[id]) : [];
    const st = dead ? [] : snap.st[id] || [], inv = dead ? [] : snap.inv[id] || [];
    const winner = atRes && t.alive;
    $('#profBody').innerHTML =
      '<div class="dh"><h2 id="h-prof">' + esc(t.name) + '</h2><button class="iconbtn" data-close type="button" aria-label="Chiudi">✕</button></div>' +
      '<div class="db">' +
        '<div class="profhead">' + avHTML(t, { dead }) + '<div class="ps"><span class="status-pill ' + (dead ? 'dead' : 'alive') + '">' + (winner ? (soft ? 'Ha vinto' : G3(t.gender, 'Vincitore', 'Vincitrice', 'Vincitorə')) : dead ? (soft ? 'Fuori dai giochi' : G3(t.gender, 'Morto', 'Morta', 'Mortə')) + ' · giorno ' + t.deathDay : 'In gara') + '</span>' +
          '<span class="muted">Squadra ' + t.team + (atRes ? ' · ' + t.rank + '° posto' : '') + '</span>' +
          '<div class="chips">' + (t.traits.length ? t.traits.map((x) => '<span class="chip" title="' + esc(TRAITS[x].desc) + '">' + esc(TRAITS[x].name) + '</span>').join('') : '<span class="chip dim">Nessun tratto</span>') + '</div></div></div>' +
        '<div class="pstats"><div><b>' + kills + '</b><span>' + (soft ? 'eliminazioni' : 'uccisioni') + '</span></div><div><b>' + hist.length + '</b><span>eventi vissuti</span></div><div><b>' + (dead ? t.deathDay : SIM.phases[i].day || 1) + '</b><span>' + (dead ? 'giorno dell\'uscita' : 'giorni in gara') + '</span></div></div>' +
        (dead ? '<div><div class="sub" style="margin-bottom:6px">Come è andata</div><div class="ev lethal" style="--cc:var(--c-kill);grid-template-columns:minmax(0,1fr)"><p>' + linkify(t.deathHtml) + '</p></div></div>' : '') +
        (!dead ? nowHTML(t, snap, i, theme) : '') +
        (!dead && snap.vit && snap.vit[id] ? '<div><div class="sub" style="margin-bottom:8px">Condizione fisica</div>' + vbars(snap.vit[id], theme, true) + '</div>' : '') +
        (dead && t.deathCause && causeTxt(t, theme) ? '<p class="help">Causa: ' + esc(causeTxt(t, theme)) + (t.killerIds.length ? ', per mano di ' + esc(t.killerIds.map((k) => BY[k].name).join(', ')) : '') + '.</p>' : '') +
        (!dead ? '<div class="row" style="gap:16px;align-items:flex-start">' +
          '<div style="flex:1;min-width:140px"><div class="sub" style="margin-bottom:6px">Condizioni</div><div class="chips">' + (st.length ? st.map((s) => '<span class="chip st">' + esc(statusLabel(s, t, theme)) + '</span>').join('') : '<span class="chip dim">In forma</span>') + '</div></div>' +
          '</div>' +
          '<div><div class="sub" style="margin-bottom:8px">Zaino · ' + plural(inv.length, 'oggetto', 'oggetti') + '</div>' + bagHTML(inv, theme) + '</div>' +
          '<div><div class="sub" style="margin-bottom:6px">Alleati</div><div class="row">' + (ally.length ? ally.map((x) => avHTML(BY[x], { btn: true })).join('') : '<span class="help">Nessuno, per ora.</span>') + '</div></div>' : '') +
        relHTML(id, snap, dead, atRes) +
        (!dead ? peopleHTML(t, snap, i) : '') +
        promisesHTML(t, dead ? t.deathPhase : i, atRes) +
        diaryHTML(t, dead ? t.deathPhase : i) +
        attrHTML(t, theme, i, atRes) +
        '<div><div class="sub" style="margin-bottom:8px">La sua storia' + (atRes ? '' : ' finora') + '</div><div class="ptl">' + (hist.length ? hist.map(({ e, p }) => '<div class="it" style="--cc:var(--c-' + (e.cat || 'none') + ')"><span>' + esc(phaseInfo(SIM.phases, SIM.phases.indexOf(p), resultTheme(SIM), true).short) + '</span><p>' + linkify(e.html) + '</p></div>').join('') : '<p class="help">Nessun evento ancora.</p>') + '</div></div>' +
      '</div>';
    if (typeof studio !== 'undefined' && studio) studio.renderProfile(t, i);
    if (!$('#profDlg').open) $('#profDlg').showModal();
    $('#profDlg').scrollTop = 0;
  }

  function attrHTML(t, theme, i, atRes) {
    if (!t.attr) return '';
    let total = t.tests || 0, passed = t.testsPassed || 0;
    if (!atRes) {
      total = 0; passed = 0;
      SIM.phases.slice(0, i + 1).forEach((p) => p.events.forEach((e) => {
        if (e.test && e.test.who === t.id) { total++; if (e.test.pass) passed++; }
      }));
    }
    const tests = total ? ' · prove superate ' + passed + ' su ' + total : '';
    const key = theme ? arenaOf(theme.id).key || [] : [];
    return '<div><div class="sub" style="margin-bottom:8px">Caratteristiche' + tests + (key.length ? ' · <span class="keymark">★</span> contano di più in quest\'arena' : '') + '</div><div class="abars">' +
      D.attrs.map((a) => { const v = t.attr[a.id] != null ? t.attr[a.id] : 5; return '<div class="abar' + (key.includes(a.id) ? ' key' : '') + '" title="' + esc((D.attrDesc || {})[a.id] || '') + '"><span>' + (key.includes(a.id) ? '<span class="keymark">★</span> ' : '') + a.name + '</span><i><b style="width:' + v * 10 + '%" class="' + (v >= 8 ? 'hi' : v <= 3 ? 'lo' : '') + '"></b></i><em>' + v + '</em></div>'; }).join('') + '</div></div>';
  }
  function relHTML(id, snap, dead, atRes) {
    const r = (snap.rel || {})[id]; if (!r) return '';
    const alive = new Set(snap.alive), av = (x) => avHTML(BY[x], { btn: true });
    const t = BY[id], rows = [], badges = [];
    if (r.f >= 5) badges.push('<span class="badge2 star">Beniamin' + G3(t.gender, 'o', 'a', 'ə') + ' del pubblico</span>');
    else if (r.f >= 3) badges.push('<span class="badge2 star">Popolare</span>');
    if ((snap.kills[id] || 0) >= 3) badges.push('<span class="badge2 hot">Temut' + G3(t.gender, 'o', 'a', 'ə') + '</span>');
    if (r.tr) badges.push('<span class="badge2 hot">' + G3(t.gender, 'Traditore', 'Traditrice', 'Traditorə') + '</span>');
    if (r.p && BY[r.p]) badges.push('<span class="badge2 love">In coppia</span>');
    if (!dead) {
      if (r.p && BY[r.p]) rows.push('<div class="relrow"><span class="lbl">Ama</span>' + av(r.p) + '<span>' + esc(BY[r.p].name) + '</span></div>');
      else if (r.lost && BY[r.lost]) rows.push('<div class="relrow"><span class="lbl">Ha perso</span>' + avHTML(BY[r.lost], { dead: true, btn: true }) + '<span>' + esc(BY[r.lost].name) + '</span></div>');
      r.g.filter(([x]) => alive.has(x)).forEach(([x, why, v]) => rows.push('<div class="relrow"><span class="lbl">Vuole vendetta su</span>' + av(x) + '<span class="lbl">' + (why === 'kill' && v && BY[v] ? 'per ' + esc(BY[v].name) : why === 'betray' ? 'per un tradimento' : why === 'steal' ? 'per un furto' : 'per un agguato') + '</span></div>'));
      r.o.filter((x) => alive.has(x)).forEach((x) => rows.push('<div class="relrow"><span class="lbl">Deve un favore a</span>' + av(x) + '</div>'));
      const hunters = snap.alive.filter((x) => x !== id && snap.rel[x] && snap.rel[x].g.some(([y]) => y === id));
      if (hunters.length) rows.push('<div class="relrow"><span class="lbl">Ricercat' + G3(t.gender, 'o', 'a', 'ə') + ' da</span>' + hunters.map(av).join('') + '</div>');

    }
    if (!badges.length && !rows.length) return '';
    return '<div><div class="sub" style="margin-bottom:8px">Legami e reputazione' + (atRes ? '' : ' adesso') + '</div>' + (badges.length ? '<div class="badges" style="margin-bottom:8px">' + badges.join('') + '</div>' : '') + (rows.length ? '<div class="rel">' + rows.join('') + '</div>' : '') + '</div>';
  }

  /* =============== ESITO =============== */
  const STORY = {
    amore: ['La grande storia d\'amore', { insieme: 'Hanno attraversato l\'arena insieme.', tragico: 'Entrambe le persone sono uscite dai giochi.', spezzato: 'Una delle due persone non ce l\'ha fatta.', finito: 'La relazione è finita prima della fine della partita.' }],
    amicizia: ['L\'amicizia più forte', { armi: 'Hanno combattuto fianco a fianco.' }],
    nemesi: ['La nemesi', {}], tradimento: ['Il tradimento più crudele', { pagato: 'Chi ha tradito non è arrivato alla fine.' }],
    pieta: ['Un gesto di pietà', {}], nonCorrisposto: ['Amore non corrisposto', { respinto: 'Una dichiarazione. Risposta: no.' }],
    mentore: ['Una guida preziosa', {}], odio: ['L\'odio più profondo', {}], paura: ['La paura più grande', {}],
  };
  const STORY_LINE = { amore: '{a} e {b}', amicizia: '{a} e {b}', nemesi: '{a} contro {b}', tradimento: '{a} ha tradito {b}', pieta: '{a} ha risparmiato {b}', nonCorrisposto: '{a} per {b}', mentore: '{a} ha insegnato a {b}', odio: '{a} e {b}', paura: '{a} aveva paura di {b}' };
  function storiesHTML(st, soft) {
    const list = (st.stories || []).filter((x) => BY[x.a] && BY[x.b]);
    if (!list.length) return '';
    const MM = Object.assign({}, MND.mem || {}, BDS.mem || {}, soft ? Object.assign({}, MND.memSoft || {}, BDS.memSoft || {}) : {});
    const quotes = (a, b) => { const l = ((BY[a].mem || {})[b] || []).filter((m) => MM[m.k]).slice(-2).map((m) => '<li><b>' + esc(BY[a].name) + ':</b> «' + fill(MM[m.k], [a, b, m.x]) + '»</li>'); return l; };
    return '<section class="block card"><h2>Le storie della partita</h2><p class="help" style="margin-bottom:12px">I legami che hanno segnato questa partita, tra chi c\'è ancora e chi non c\'è più.</p><div class="bstories">' +
      list.map((x) => {
        const [title, notes] = STORY[x.k] || [x.k, {}];
        const line = (STORY_LINE[x.k] || '{a} e {b}').replace('{a}', esc(BY[x.a].name)).replace('{b}', esc(BY[x.b].name));
        const q = quotes(x.a, x.b).concat(quotes(x.b, x.a)).slice(0, 3);
        return '<article class="story2 k-' + esc(x.k) + '"><div class="s2av">' + avHTML(BY[x.a], { btn: true, dead: !BY[x.a].alive }) + avHTML(BY[x.b], { btn: true, dead: !BY[x.b].alive }) + '</div><div><span class="eyebrow">' + esc(title) + '</span><b>' + line + '</b>' + (notes[x.note] ? '<p class="help">' + esc(notes[x.note]) + '</p>' : '') + (q.length ? '<ul>' + q.join('') + '</ul>' : '') + '</div></article>';
      }).join('') + '</div></section>';
  }
  function ecoSummary(st, theme) {
    if (!st.causes) return '';
    const m = arenaOf(theme.id).meter;
    const lbl = theme.soft ? { wound: 'per perdita di reputazione', starve: 'per mancanza di energie', exhaust: 'per sfinimento', poison: 'per malessere', sick: 'per malessere', trap: 'per sabotaggio', accident: 'per un imprevisto', meter: m ? 'per ' + m.name.toLowerCase() : 'per le prove dell\'arena' } : { wound: 'per le ferite', starve: 'di fame', exhaust: 'di sfinimento', poison: 'di veleno', sick: 'di malattia', infect: 'per infezione', storm: 'nella tempesta', beast: 'per un\'aggressione notturna', trap: 'in trappola', accident: 'per incidente', meter: m ? 'per ' + m.name.toLowerCase() : 'per l\'arena' };
    const c = Object.entries(st.causes).filter(([k]) => lbl[k]).map(([k, v]) => v + ' ' + lbl[k]);
    const bits = [];
    if (st.shared) bits.push(plural(st.shared, 'pasto condiviso', 'pasti condivisi'));
    if (st.nursed) bits.push(plural(st.nursed, 'concorrente aiutato', 'concorrenti aiutati'));
    if (st.foraged) bits.push(plural(st.foraged, 'ricerca di cibo riuscita', 'ricerche di cibo riuscite'));
    if (st.trapsSet) bits.push(plural(st.trapsSet, 'trappola piazzata', 'trappole piazzate') + ' (' + plural(st.trapHits || 0, 'scatto', 'scatti') + ')');
    if (st.beasts) bits.push(plural(st.beasts, 'aggressione notturna', 'aggressioni notturne'));
    if (st.infected) bits.push(plural(st.infected, 'contagio', 'contagi') + ', ' + plural(st.cured || 0, 'cura riuscita', 'cure riuscite'));
    if (st.tough) bits.push(plural(st.tough, 'eliminazione evitata per un soffio', 'eliminazioni evitate per un soffio'));
    if (st.broken) bits.push(plural(st.broken, 'arma rotta', 'armi rotte'));
    if (st.looted) bits.push(plural(st.looted, 'oggetto razziato', 'oggetti razziati'));
    if (st.trades) bits.push(plural(st.trades, 'scambio', 'scambi'));
    if (st.promises) bits.push(plural(st.promises, 'promessa', 'promesse') + ' (' + plural(st.promisesKept || 0, 'mantenuta', 'mantenute') + ', ' + plural(st.promisesBroken || 0, 'tradita', 'tradite') + ')');
    if (st.spared) bits.push(plural(st.spared, theme.soft ? 'rivale risparmiato' : 'vita risparmiata', theme.soft ? 'rivali risparmiati' : 'vite risparmiate'));
    if (st.gossip) bits.push(plural(st.gossip, 'voce di corridoio', 'voci di corridoio'));
    if (st.breakups) bits.push(plural(st.breakups, 'rottura', 'rotture'));
    if (st.coalitions) bits.push(plural(st.coalitions, 'coalizione', 'coalizioni'));
    const met = (st.meteo || []).map((x) => x.n + ' (giorno ' + x.day + ')');
    if (!c.length && !bits.length && !met.length) return '';
    return '<div class="help eco-sum">' + (c.length ? '<p><b>Cause registrate</b>' + esc(c.join(', ')) + '</p>' : '') + (bits.length ? '<p><b>Conseguenze</b>' + esc(bits.join(', ')) + '</p>' : '') + (met.length ? '<p><b>Meteo</b>' + esc(met.join(', ')) + '</p>' : '') + '</div>';
  }
  function resultStats(st, soft) {
    const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
    const items = [
      [st.killDeaths, soft ? 'eliminazioni attribuite a un rivale' : 'morti per mano altrui', soft ? 'eliminazione attribuita a un rivale' : 'morte per mano altrui', true],
      [st.envDeaths, soft ? 'eliminazioni dovute all\'arena' : 'morti dovute all\'arena', soft ? 'eliminazione dovuta all\'arena' : 'morte dovuta all\'arena', true],
      [st.alliances, 'alleanze', 'alleanza'], [st.betrayals, 'tradimenti', 'tradimento'], [st.revenges, 'vendette', 'vendetta'],
      [st.couples, 'coppie', 'coppia'], [st.debtsRepaid, 'debiti saldati', 'debito saldato'], [st.amulets, 'salvataggi miracolosi', 'salvataggio miracoloso'],
      [st.sponsors, 'doni degli sponsor', 'dono degli sponsor'],
    ].filter((x) => x[3] || x[0]).map(([v, many, one]) => [v || 0, cap((v || 0) === 1 ? one : many)]);
    if (st.tests) items.push([(st.testsPassed || 0) + '<small>/' + st.tests + '</small>', 'Prove superate']);
    items.push([st.events, 'Eventi']);
    return '<div class="kstats">' + items.map(([v, l]) => '<div class="kstat"><b>' + v + '</b><span>' + l + '</span></div>').join('') + '</div>';
  }
  function renderResults() {
    $('#resEmpty').hidden = !!SIM; $('#resBody').hidden = !SIM;
    if (!SIM) return;
    const theme = resultTheme(SIM), soft = !!theme.soft, st = SIM.stats;
    const W = SIM.winners.map((id) => BY[id]);
    const kN = (n) => n + ' ' + (soft ? (n === 1 ? 'eliminazione' : 'eliminazioni') : (n === 1 ? 'uccisione' : 'uccisioni'));
    let hero;
    if (W.length === 1) {
      const w = W[0];
      hero = '<div class="winhero"><div class="wscene" aria-hidden="true">' + ART.scene(theme.id) + '</div>' + avHTML(w, { btn: true }) + '<div style="min-width:0"><div class="eyebrow">' + ART.icon(theme.id, 13) + ' ' + esc(theme.name) + ' · ' + durTxt(theme) + ' · ' + SIM.tributes.length + ' concorrenti</div>' +
        '<h1>' + esc(w.name) + '</h1><p><b style="color:var(--screen-ink)">' + G3(w.gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi.</b> Squadra ' + w.team + (w.traits.length ? ' · ' + w.traits.map((x) => TRAITS[x].name).join(', ') : '') + '.</p>' +
        '<div class="wstats"><div><b>' + w.kills + '</b><span>' + (soft ? 'eliminazioni' : 'uccisioni') + '</span></div><div><b>' + w.events + '</b><span>eventi vissuti</span></div><div><b>' + w.alliancesFormed + '</b><span>alleanze</span></div><div><b>' + w.items + '</b><span>oggetti trovati</span></div></div></div></div>';
    } else if (W.length > 1) {
      hero = '<div class="winhero" style="grid-template-columns:minmax(0,1fr)"><div class="wscene" aria-hidden="true">' + ART.scene(theme.id) + '</div><div><div class="eyebrow">' + ART.icon(theme.id, 13) + ' ' + esc(theme.name) + ' · ' + durTxt(theme) + '</div><h1>Vince la squadra ' + W[0].team + '</h1><div class="teamavs">' + W.map((w) => avHTML(w, { btn: true })).join('') + '</div><p style="margin-top:12px">' + W.map((w) => esc(w.name) + ' (' + kN(w.kills) + ')').join(' · ') + '</p></div></div>';
    } else hero = '<div class="winhero" style="grid-template-columns:minmax(0,1fr)"><div><h1>Nessun superstite</h1><p>L\'arena non ha risparmiato nessuno.</p></div></div>';

    const ranked = SIM.tributes.slice().sort((a, b) => a.rank - b.rank || b.kills - a.kills);
    const podiumT = ranked.slice(0, 3);
    const podium = podiumT.length >= 3 ? '<div class="podium">' + [podiumT[1], podiumT[0], podiumT[2]].map((t, k) => { const p = [2, 1, 3][k]; return '<button type="button" class="pod p' + p + '" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: !t.alive }) + '<b>' + esc(t.name) + '</b><small>' + kN(t.kills) + (t.alive ? '' : ' · G' + t.deathDay) + '</small><span class="step">' + p + '</span></button>'; }).join('') + '</div>' : '';

    const awards = [];
    const maxBy = (f) => SIM.tributes.slice().sort((a, b) => f(b) - f(a) || a.rank - b.rank)[0];
    const killer = maxBy((t) => t.kills); if (killer && killer.kills) awards.push([G3(killer.gender, 'Il più', 'La più', 'Lə più') + (soft ? ' temibile' : ' letale'), killer, kN(killer.kills)]);
    if (st.firstBlood) { const v = BY[st.firstBlood.victim]; awards.push([soft ? G3(v.gender, 'Primo', 'Prima', 'Primə') + ' a uscire' : 'Primo sangue', v, st.firstBlood.killers.length ? (soft ? 'eliminazione attribuita a ' : 'per mano di ') + st.firstBlood.killers.map((k) => BY[k].name).join(', ') : 'vittima dell\'arena']); }
    const trait = maxBy((t) => t.betrayals); if (trait && trait.betrayals) awards.push([G3(trait.gender, 'Il', 'La', 'Lə') + ' voltagabbana', trait, plural(trait.betrayals, 'tradimento', 'tradimenti')]);
    const soc = maxBy((t) => t.alliancesFormed); if (soc && soc.alliancesFormed) awards.push([G3(soc.gender, 'Il diplomatico', 'La diplomatica', 'Lə diplomaticə'), soc, plural(soc.alliancesFormed, 'alleanza stretta', 'alleanze strette')]);
    const rev = maxBy((t) => t.revenges); if (rev && rev.revenges) awards.push([G3(rev.gender, 'Il vendicatore', 'La vendicatrice', 'Lə vendicatorə'), rev, plural(rev.revenges, 'vendetta compiuta', 'vendette compiute')]);
    const fam = maxBy((t) => t.fame); if (fam && fam.fame >= 3) awards.push(['Beniamin' + G3(fam.gender, 'o', 'a', 'ə') + ' del pubblico', fam, fam.fame + ' punti di fama']);
    const sav = maxBy((t) => t.saves); if (sav && sav.saves) awards.push(['L\'angelo custode', sav, plural(sav.saves, 'aiuto prestato', 'aiuti prestati')]);
    const lucky = maxBy((t) => t.amulets); if (lucky && lucky.amulets) awards.push(['Miracolat' + G3(lucky.gender, 'o', 'a', 'ə'), lucky, 'salvat' + G3(lucky.gender, 'o', 'a', 'ə') + ' da un portafortuna']);
    const ab = maxBy((t) => t.testsPassed * 10 - (t.tests - t.testsPassed)); if (ab && ab.testsPassed) awards.push([G3(ab.gender, 'Il più abile', 'La più abile', 'Lə più abile'), ab, plural(ab.testsPassed, 'prova superata', 'prove superate') + ' su ' + ab.tests]);
    const hunter = maxBy((t) => t.foraged || 0); if (hunter && hunter.foraged >= 2) awards.push([soft ? G3(hunter.gender, 'Lo scroccone', 'La scroccona', 'Lə scrocconə') : G3(hunter.gender, 'Il cacciatore', 'La cacciatrice', 'Lə cacciatorə'), hunter, plural(hunter.foraged, 'pasto procurato', 'pasti procurati')]);
    const nurse = maxBy((t) => t.nursed || 0); if (nurse && nurse.nursed) awards.push([soft ? 'La spalla' : G3(nurse.gender, 'L\'infermiere', 'L\'infermiera', 'L\'infermierə'), nurse, plural(nurse.nursed, 'concorrente rimesso in sesto', 'concorrenti rimessi in sesto')]);
    const trapper = maxBy((t) => (t.trapKills || 0) * 3 + (t.trapsSet || 0)); if (trapper && trapper.trapsSet) awards.push(['Maestr' + G3(trapper.gender, 'o', 'a', 'ə') + ' di tranelli', trapper, plural(trapper.trapsSet, 'trappola piazzata', 'trappole piazzate') + (trapper.trapKills ? ', ' + kN(trapper.trapKills) : '')]);
    const merch = maxBy((t) => t.trades || 0); if (merch && merch.trades >= 2) awards.push([G3(merch.gender, 'Il mercante', 'La mercante', 'Lə mercante'), merch, plural(merch.trades, 'scambio', 'scambi')]);
    const inv2 = maxBy((t) => t.crafts || 0); if (inv2 && inv2.crafts) awards.push([G3(inv2.gender, 'L\'inventore', 'L\'inventrice', 'L\'inventorə'), inv2, plural(inv2.crafts, 'oggetto costruito o modificato', 'oggetti costruiti o modificati')]);
    const heart = maxBy((t) => t.rejected || 0); if (heart && heart.rejected) awards.push(['Cuore infranto', heart, plural(heart.rejected, 'dichiarazione respinta', 'dichiarazioni respinte')]);
    const soul = maxBy((t) => (t.diary || []).filter((d) => d.k === 'segreto').length); if (soul && (soul.diary || []).some((d) => d.k === 'segreto')) awards.push([G3(soul.gender, 'Il più misterioso', 'La più misteriosa', 'Lə più misteriosə'), soul, plural(soul.diary.filter((d) => d.k === 'segreto').length, 'segreto nel diario', 'segreti nel diario')]);
    const busy = maxBy((t) => t.events); if (busy) awards.push(['Sempre in mezzo', busy, plural(busy.events, 'evento vissuto', 'eventi vissuti')]);
    const loot = maxBy((t) => t.items); if (loot && loot.items) awards.push([G3(loot.gender, 'Il collezionista', 'La collezionista', 'Lə collezionistə'), loot, plural(loot.items, 'oggetto trovato', 'oggetti trovati')]);
    const awardsH = '<div class="awards">' + awards.map(([a, t, d]) => '<button type="button" class="award card" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: !t.alive }) + '<span style="min-width:0"><span class="at">' + a + '</span><b>' + esc(t.name) + '</b><small>' + esc(d) + '</small></span></button>').join('') + '</div>';

    // grafico dei superstiti
    const P = SIM.phases, total = SIM.tributes.length;
    const Wd = 640, Hd = 200, pl = 34, pr = 10, pt = 12, pb = 26;
    const xs = (k) => pl + (P.length > 1 ? (k / (P.length - 1)) * (Wd - pl - pr) : 0);
    const ys = (n) => pt + (1 - n / total) * (Hd - pt - pb);
    const pts = P.map((p, k) => [xs(k), ys(p.snap.alive.length)]);
    let path = 'M' + xs(0) + ' ' + ys(total);
    pts.forEach(([x, y]) => (path += ' L' + x.toFixed(1) + ' ' + y.toFixed(1)));
    const area = path + ' L' + xs(P.length - 1) + ' ' + ys(0) + ' L' + xs(0) + ' ' + ys(0) + ' Z';
    const ticks = [];
    let lastDay = 0; P.forEach((p, k) => { if (p.day !== lastDay) { lastDay = p.day; ticks.push('<line x1="' + xs(k) + '" x2="' + xs(k) + '" y1="' + pt + '" y2="' + (Hd - pb) + '" stroke="var(--line)" stroke-dasharray="2 3"/><text x="' + (xs(k) + 3) + '" y="' + (Hd - 8) + '">' + p.day + '</text>'); } });
    const yl = [total, Math.round(total / 2), 0].map((n) => '<text x="' + (pl - 6) + '" y="' + (ys(n) + 4) + '" text-anchor="end">' + n + '</text><line x1="' + pl + '" x2="' + (Wd - pr) + '" y1="' + ys(n) + '" y2="' + ys(n) + '" stroke="var(--line)"/>').join('');
    const chart = '<div class="chart"><svg viewBox="0 0 ' + Wd + ' ' + Hd + '" role="img" aria-label="Concorrenti in gara fase per fase">' + yl + ticks.join('') + '<path d="' + area + '" fill="var(--accent)" fill-opacity=".14"/><path d="' + path + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="' + pts[pts.length - 1][0] + '" cy="' + pts[pts.length - 1][1] + '" r="5" fill="var(--accent)"/></svg></div>';

    // momenti salienti
    const all = []; P.forEach((p, k) => p.events.forEach((e) => all.push({ e, p, k })));
    const hl = [];
    const add = (x) => x && !hl.includes(x) && hl.push(x);
    add(all.find((x) => x.e.deaths.length));
    all.filter((x) => x.e.deaths.length >= 2).slice(0, 2).forEach(add);
    all.filter((x) => x.e.cat === 'betray' && x.e.deaths.length).slice(0, 2).forEach(add);
    all.filter((x) => x.e.why === 'vendetta' && x.e.deaths.length).slice(0, 2).forEach(add);
    all.filter((x) => (x.e.echo || []).some((y) => y.cls === 'twist')).slice(0, 1).forEach(add);
    all.filter((x) => x.e.cat === 'love').slice(0, 1).forEach(add);
    all.filter((x) => x.p.kind === 'dis' && x.e.deaths.length).slice(0, 1).forEach(add);
    add([...all].reverse().find((x) => x.e.deaths.length));
    hl.sort((a, b) => a.k - b.k);
    const hlH = '<div class="highlights">' + hl.slice(0, 9).map((x) => evHTML(x.e, null, theme, false).replace('<p>', '<p><span class="sub" style="display:block;margin-bottom:2px">' + esc(x.p.title) + '</span>')).join('') + '</div>';

    const rows = ranked.map((t) => '<tr class="' + (t.alive ? 'win' : '') + '"><td class="n">' + t.rank + '°</td><td><button type="button" class="who" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: !t.alive }) + esc(t.name) + '</button></td><td class="n">' + t.team + '</td><td class="n">' + t.kills + '</td>' +
      '<td>' + (t.alive ? '<b>' + (W.length > 1 ? 'Squadra vincitrice' : G3(t.gender, 'Vincitore', 'Vincitrice', 'Vincitorə')) + '</b>' : t.killerIds.length ? esc(t.killerIds.map((k) => BY[k].name).join(', ')) : '<span class="muted">L\'arena</span>') + '</td>' +
      '<td class="n">' + (t.alive ? '–' : esc(whenLabel(theme, t.deathPhase, t.deathDay))) + '</td><td class="cause">' + (t.alive ? '' : linkify(t.deathHtml)) + '</td></tr>').join('');
    const killers = SIM.tributes.filter((t) => t.kills > 0).sort((a, b) => b.kills - a.kills).slice(0, 8);
    const maxK = Math.max(1, ...killers.map((t) => t.kills));
    const kbars = killers.length ? killers.map((t) => '<div class="bar"><span class="lbl">' + esc(t.name) + '</span><span class="tr"><i style="width:' + (100 * t.kills / maxK) + '%;background:' + esc(t.color) + '"></i></span><span class="v">' + t.kills + '</span></div>').join('') : '<p class="help">Nessuno ha eliminato un rivale.</p>';

    $('#resBody').innerHTML = hero +
      '<div class="resactions"><button class="btn" type="button" id="rArchive">Archivio partite</button><button class="btn primary lg" type="button" id="rAgain">Rigioca con un nuovo seme</button><button class="btn" type="button" id="rCopy">Copia il riepilogo</button><a class="btn" href="#diretta">Rivedi la diretta</a><a class="btn" href="#cast">Nuova partita</a><span class="help mono">seme ' + esc(SIM.seed) + '</span></div>' +
      '<div class="resgrid"><div>' +
        (podium ? '<section class="block card"><h2>Il podio</h2>' + podium + '</section>' : '') +
        '<section class="block card"><h2>I premi della partita</h2>' + awardsH + '</section>' +
        '<section class="block card"><h2>Momenti salienti</h2>' + hlH + '</section>' +
        '<section class="block card"><h2>Classifica completa</h2><div class="tablewrap"><table><thead><tr><th>Pos.</th><th>Concorrente</th><th>Sq.</th><th>' + (soft ? 'Elim.' : 'Ucc.') + '</th><th>' + (soft ? 'Eliminazione attribuita a' : 'Per mano di') + '</th><th>Giorno</th><th>Come è andata</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
      '</div><div>' +
        '<section class="block card"><h2>Concorrenti in gara nel tempo</h2>' + chart + resultStats(st, soft) + ecoSummary(st, theme) + '</section>' + storiesHTML(st, soft) +
        '<section class="block card"><h2>' + (soft ? 'Chi ha eliminato di più' : 'Chi ha ucciso di più') + '</h2><div class="bars">' + kbars + '</div></section>' +
        '<section class="block card posterbox"><h2>Locandina</h2><img id="posterImg" alt="Locandina della partita"><p class="help" style="margin-top:8px">Tieni premuto sull\'immagine, o clic destro, per salvarla.</p></section>' +
      '</div></div>';
    $('#rAgain').addEventListener('click', () => { const cfg = Object.assign({}, S.run.cfg, { seed: newSeed() }); delete cfg.seasonId; runSim(cfg); });
    $('#rArchive').addEventListener('click', openArchive);
    $('#rCopy').addEventListener('click', () => copyText(summaryText(), 'Riepilogo copiato negli appunti.'));
    if (typeof studio !== 'undefined' && studio) studio.renderResults();
    drawPoster().then((url) => { const im = $('#posterImg'); if (im && url) im.src = url; });
    const wh = $('#resBody .winhero');
    if (wh) { AN.field(wh, theme.id, { intensity: 1.6, cls: 'fx-win' }); }
    const first = S.run && !S.run.celebrated;
    if (first && !AN.reduced) {
      $('#resBody').classList.add('ceremony');
      setTimeout(() => $('#resBody') && $('#resBody').classList.remove('ceremony'), 4000);
      $$('#resBody .wstats b').forEach((b) => { const n = parseInt(b.textContent, 10); if (!isNaN(n)) AN.countTo(b, n, { from: 0, dur: 1600 }); });
      const wn = $('#resBody .winhero h1'); if (wn) AN.kinetic(wn, 'rise');
    }
    AN.reveal($$('#resBody .block, #resBody .award'));
    if (first && W.length) { S.run.celebrated = true; save(); setTimeout(() => AN.confetti(theme.id, theme.hue), 650); }
  }
  function summaryText() {
    const theme = resultTheme(SIM), W = SIM.winners.map((id) => BY[id]);
    const lines = ['LAST ONE STANDING · ' + theme.name, SIM.tributes.length + ' concorrenti · ' + plural(SIM.days, 'giorno', 'giorni') + ' · seme ' + SIM.seed, ''];
    if (W.length === 1) lines.push(G3(W[0].gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi: ' + W[0].name + ' (' + W[0].kills + ')');
    else if (W.length) lines.push('Vince la squadra ' + W[0].team + ': ' + W.map((w) => w.name).join(', '));
    lines.push('', 'Classifica:');
    SIM.tributes.slice().sort((a, b) => a.rank - b.rank).forEach((t) => lines.push(t.rank + '. ' + t.name + ' · ' + t.kills + (t.alive ? '' : ' · ' + t.deathText)));
    return lines.join('\n');
  }
  async function drawPoster() {
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* niente */ }
    const theme = resultTheme(SIM), W = SIM.winners.map((id) => BY[id]), h = theme.hue;
    const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
    const g = cv.getContext('2d');
    const acc = 'hsl(' + h + ' 90% 62%)', ink = '#eef0f4', mute = 'hsl(' + h + ' 10% 66%)';
    g.fillStyle = 'hsl(' + h + ' 30% 6%)'; g.fillRect(0, 0, 1080, 1350);
    const scn = await new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ART.sceneDataUri(theme.id); });
    if (scn) { g.globalAlpha = 0.55; g.drawImage(scn, -270, 300, 1620, 810); g.globalAlpha = 1; const fade = g.createLinearGradient(0, 300, 0, 1110); fade.addColorStop(0, 'hsla(' + h + ',30%,6%,1)'); fade.addColorStop(0.35, 'hsla(' + h + ',30%,6%,0.2)'); fade.addColorStop(1, 'hsla(' + h + ',30%,6%,1)'); g.fillStyle = fade; g.fillRect(0, 300, 1080, 810); }
    const rg = g.createRadialGradient(540, 560, 40, 540, 560, 760); rg.addColorStop(0, 'hsla(' + h + ',90%,55%,.45)'); rg.addColorStop(1, 'hsla(' + h + ',90%,55%,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 1080, 1350);
    g.save(); g.translate(540, 560); g.fillStyle = 'hsla(' + h + ',80%,60%,.06)';
    for (let a = 0; a < 30; a++) { g.rotate(Math.PI * 2 / 30); g.beginPath(); g.moveTo(0, 0); g.lineTo(900, -40); g.lineTo(900, 40); g.closePath(); g.fill(); }
    g.restore();
    const total = SIM.tributes.length, tw = Math.min(20, 900 / total);
    SIM.tributes.slice().sort((a, b) => (a.alive ? 1 : 0) - (b.alive ? 1 : 0) || a.order - b.order).forEach((t, i) => { g.fillStyle = t.alive ? acc : '#ff5b4b'; g.globalAlpha = t.alive ? 1 : 0.7; g.fillRect(90 + i * tw, 1172, Math.max(3, tw - 5), 46); });
    g.globalAlpha = 1;
    const disp = '"Bricolage Grotesque", Figtree, sans-serif', mono = 'Figtree, sans-serif', body = 'Figtree, sans-serif';
    g.fillStyle = mute; g.font = '600 30px ' + mono; g.textAlign = 'left';
    g.fillText(theme.name + ' · ' + plural(SIM.days, 'giorno', 'giorni') + ' · ' + total + ' concorrenti', 90, 120);
    g.fillStyle = acc; g.font = '800 92px ' + disp;
    g.fillText(W.length === 1 ? G3(W[0].gender, 'Ultimo in piedi', 'Ultima in piedi', 'Ultimə in piedi') : W.length ? 'Squadra ' + W[0].team : 'Nessun superstite', 84, 226);
    const loadImg = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    async function avatar(t, x, y, r) {
      g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.closePath(); g.fillStyle = t.color || '#888'; g.fill(); g.clip();
      const im = t.img ? await loadImg(t.img) : null;
      if (im) g.drawImage(im, x - r, y - r, r * 2, r * 2);
      else { g.fillStyle = '#fff'; g.font = '800 ' + Math.round(r * 0.8) + 'px ' + disp; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(initials(t.name), x, y + r * 0.04); }
      g.restore(); g.textBaseline = 'alphabetic'; g.textAlign = 'left';
    }
    if (W.length === 1) {
      const w = W[0];
      g.strokeStyle = acc; g.lineWidth = 12; g.beginPath(); g.arc(540, 560, 240, 0, Math.PI * 2); g.stroke();
      await avatar(w, 540, 560, 224);
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '800 ' + (w.name.length > 14 ? 78 : 108) + 'px ' + disp;
      g.fillText(w.name, 540, 935);
      g.fillStyle = mute; g.font = '500 38px ' + body;
      g.fillText(w.kills + ' ' + (theme.soft ? (w.kills === 1 ? 'eliminazione' : 'eliminazioni') : (w.kills === 1 ? 'uccisione' : 'uccisioni')) + ' · squadra ' + w.team, 540, 998);
    } else if (W.length) {
      const r = Math.min(150, 420 / W.length);
      for (let k = 0; k < W.length; k++) await avatar(W[k], 540 + (k - (W.length - 1) / 2) * (r * 2.2), 560, r);
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '800 56px ' + disp;
      g.fillText(W.map((w) => w.name).join(' · ').slice(0, 40), 540, 900);
    }
    g.textAlign = 'left';
    const top = SIM.tributes.filter((t) => t.kills > 0 && !t.alive).sort((a, b) => b.kills - a.kills).slice(0, 3);
    if (top.length) { g.fillStyle = mute; g.font = '600 26px ' + mono; g.fillText('I più pericolosi tra gli sconfitti', 90, 1076); g.fillStyle = ink; g.font = '700 34px ' + body; g.fillText(top.map((t) => t.name + ' ' + t.kills).join('   ·   '), 90, 1124); }
    g.fillStyle = mute; g.font = '500 23px ' + mono;
    const wm = ART.assets.logo ? await loadImg(ART.assets.logo) : null;
    if (wm) { g.drawImage(wm, 660, 1236, 330, 330 * wm.height / wm.width); g.fillText('Seme ' + String(SIM.seed).slice(0, 24), 90, 1282); }
    else g.fillText('Last One Standing · seme ' + String(SIM.seed).slice(0, 30), 90, 1282);
    try { return cv.toDataURL('image/png'); } catch (e) { return ''; }
  }

  /* ---------------- avvio ---------------- */
  function renderStories() {
    if (!demo) return;
    const evs = [];
    demo.phases.forEach((p) => p.events.forEach((e) => { if ((e.echo || []).length && e.ids.length) evs.push({ e, p }); }));
    const pick = [evs.find((x) => x.e.why === 'vendetta'), evs.find((x) => x.e.cat === 'love'), evs.find((x) => (x.e.echo || []).some((y) => y.cls === 'twist')) || evs.find((x) => x.e.why === 'debito') || evs.find((x) => x.e.test)].filter(Boolean);
    while (pick.length < 3 && evs.length) { const x = evs.shift(); if (!pick.includes(x)) pick.push(x); }
    const tributes = demo.tributes, theme = THEMES[demo.theme];
    $('#storyGrid').innerHTML = pick.slice(0, 3).map(({ e, p }) => '<article class="story card"><div class="sub">' + esc(theme.name) + ' · ' + esc(p.title) + '</div>' + evHTML(e, tributes, theme, false, true) + '</article>').join('');
  }
  async function restoreRun() {
    if (S.run && S.run.cfg) {
      const run = S.run, generation = runGeneration;
      try {
        let restored;
        if (run.replayId) {
          if (!REPLAY) throw new Error('Replay non disponibile.');
          restored = await REPLAY.load(run.replayId);
          if (!restored || !own(THEMES, restored.theme)) throw new Error('Partita salvata non disponibile.');
        } else {
          // I salvataggi precedenti contengono soltanto le regole: si migrano una volta.
          restored = RUNNER ? await RUNNER.simulate(run.cfg) : L.simulate(run.cfg);
          load.warning = [load.warning, 'La partita precedente è stata ricostruita con la versione attuale e salvata per le prossime riaperture.'].filter(Boolean).join(' ');
        }
        if (generation !== runGeneration || S.run !== run) return false;
        SIM = restored; BY = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
        if (!run.replayId) {
          const stored = await persistRun(run, SIM);
          if (!stored) load.warning = 'La partita precedente è stata ricostruita, ma non è stato possibile salvarla. Mantieni aperta questa pagina per continuare.';
        } else run.replaySaved = true;
        if (generation !== runGeneration || S.run !== run) return false;
      } catch (e) {
        if (generation !== runGeneration || S.run !== run) return false;
        SIM = null; S.run = null;
        load.warning = [load.warning, 'La partita salvata non è disponibile. Cast e impostazioni sono stati conservati; avvia una nuova partita.'].filter(Boolean).join(' ');
      }
    }
    return true;
  }
  async function boot(hot) {
    const had = load();
    AN.setReduced(S.settings.reduceMotion);
    if (!had) { S.cast = L.randomCast(24, 'benvenuto', 2).map(sanitizeTribute); S.settings.seed = 'benvenuto-2026'; }
    if (!S.settings.seed) S.settings.seed = newSeed();
    applyUi();
    if (ART.assets.logo) {
      $('#brandLogo').innerHTML = ART.wordmark('wordmark'); document.querySelector('.brand').classList.add('has-wordmark');
      $('#heroLogo').innerHTML = ART.wordmark('wordmark-hero');
      $('#footLogo').innerHTML = ART.emblem(48);
    } else {
      $('#brandLogo').innerHTML = ART.logo(34, { bg: 'var(--screen)', ink: 'var(--screen-ink)', accent: 'var(--screen-accent)' });
      $('#footLogo').innerHTML = ART.logo(40, { bg: 'var(--screen)', ink: 'var(--screen-ink)', accent: 'var(--screen-accent)' });
      $('#heroLogo').innerHTML = ART.logo(76, { bg: 'var(--screen-2)', ink: 'var(--screen-ink)', accent: 'var(--screen-accent)' });
    }
    if (ART.assets.panoramica) { $('#heroScenes').innerHTML = '<img class="hero-pano" src="' + ART.assets.panoramica + '" alt="" draggable="false">'; $('#heroScenes').classList.add('pano'); }
    else $('#heroScenes').innerHTML = ['classico', 'fantasy', 'scifi', 'zombie', 'royale', 'horror', 'wasteland', 'liceo', 'ufficio'].map((t) => ART.scene(t)).join('');
    if (ART.assets.sagome && ART.assets.sagome.length) { const st = document.createElement('style'); st.textContent = ART.assets.sagome.map((u, k) => '.sil-' + k + '{-webkit-mask-image:url(' + u + ');mask-image:url(' + u + ')}').join(''); document.head.appendChild(st); }
    AN.ripple(document.body);
    try { const ic = document.createElement('link'); ic.rel = 'icon'; ic.href = ART.logoDataUri('#e3b04b'); document.head.appendChild(ic); } catch (e) { /* niente */ }
    updateCounts();
    if (!await restoreRun()) return;
    if (hot && typeof hot.phase === 'number' && S.run) S.run.phase = hot.phase;
    updateCounts();
    route();
    if (load.warning) toast(load.warning);
  }
  const studio = window.LOS_STUDIO ? window.LOS_STUDIO.init({ S, L, D, REPLAY, RUNNER, save, commitSeasons, toast, esc, plural, inputId, normalizeCast, normalizeCustoms, sanitizeSettings, renderCustomList, currentConfiguration, runSim, simulationBusy, copyText, openSavedReplay, causeTxt, statusLabel, vitLabels, fill, linkify, getSIM: () => SIM, renderLive, go, openProfile }) : null;
  const H = window.claude && window.claude.hot;
  if (H && typeof H.snapshot === 'function') { try { H.snapshot(() => ({ phase: S.run ? S.run.phase : 0 })); } catch (e) { /* niente */ } }
  if (H && typeof H.ready === 'function') H.ready(boot); else boot((H && H.data) || {});
})();
