/* Lettura della geografia registrata, senza ricostruire la partita.
   Mappa interattiva: zone come segnaposti (grandezza = presenti, anello = pericolo), passaggi,
   percorsi della fase; sotto, l'elenco delle zone oppure la scheda della zona scelta. */
(function (G) {
  'use strict';
  const esc = (x) => String(x ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bare = (s) => String(s).replace(/^(?:il |lo |la |l['’]|i |gli |le )/i, '');
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const lv = (v, kind) => (kind === 'shelter' ? (v >= 0.7 ? 2 : v >= 0.45 ? 1 : 0) : (v >= 1.35 ? 2 : v >= 0.95 ? 1 : 0));
  const WORDS = { resources: ['scarse', 'medie', 'ricche'], danger: ['basso', 'medio', 'alto'], shelter: ['scarso', 'discreto', 'buono'] };
  const LABEL = { resources: 'Risorse', danger: 'Pericolo', shelter: 'Riparo' };
  const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);
  const ICON = {
    skull: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-3.3 0-5.5 2.3-5.5 5.2 0 1.7.8 3.1 2 4V13h1.6v-1.3h.9V13h2v-1.3h.9V13h1.6v-2.3c1.2-.9 2-2.3 2-4C13.5 3.8 11.3 1.5 8 1.5zM5.6 8.6a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4.8 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"/></svg>',
    trap: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 11h13v1.6h-13zM2.5 10 4 5l1.5 3L8 3l2.5 5L12 5l1.5 5z"/></svg>',
    lock: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 7V5.3a3.5 3.5 0 0 1 7 0V7h1v7h-9V7zm1.6 0h3.8V5.3a1.9 1.9 0 0 0-3.8 0z"/></svg>',
    bolt: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 1 3 9h4l-1 6 6-8H8z"/></svg>',
  };

  // tre barre corte con la parola accanto (per l'elenco e per la scheda)
  function meters(z, wide) {
    return '<span class="zmeters' + (wide ? ' wide' : '') + '">' + ['resources', 'danger', 'shelter'].map((k) => {
      const v = z[k] ?? (k === 'shelter' ? 0.5 : 1), n = lv(v, k), pc = Math.max(10, Math.min(100, (k === 'shelter' ? v : v / 1.8) * 100));
      return '<span class="zm zm-' + k + '" title="' + LABEL[k] + ' ' + WORDS[k][n] + '"><span class="zm-l">' + LABEL[k] + '</span><i><b style="width:' + pc.toFixed(0) + '%"></b></i><em>' + WORDS[k][n] + '</em></span>';
    }).join('') + '</span>';
  }

  function graph(zones, closed, counts, selected, extra) {
    extra = extra || {};
    const points = zones.map((z, i) => (i === 6 ? [180, 150] : [180 + 122 * Math.sin(i * Math.PI / 3), 150 - 112 * Math.cos(i * Math.PI / 3)]));
    const curve = (a, b, bend) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      const mx = (a[0] + b[0]) / 2 - dy / len * bend, my = (a[1] + b[1]) / 2 + dx / len * bend;
      return 'M ' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q ' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
    };
    const bendFor = (z, to) => {
      const a = points[z], b = points[to], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      // i passaggi che taglierebbero il centro si curvano attorno
      const nearHub = zones.length === 7 && z !== 6 && to !== 6 && Math.abs(dx * (150 - a[1]) - dy * (180 - a[0])) / len < 27;
      return nearHub ? 80 : 14;
    };
    const lines = zones.flatMap((z) => z.links.filter((to) => to > z.id).map((to) => {
      const shut = closed.has(z.id) || closed.has(to), touch = selected != null && (z.id === selected || to === selected);
      const cls = 'link' + (shut ? ' shut' : '') + (touch ? ' on' : selected != null ? ' faded' : '');
      return '<path class="' + cls + '" data-a="' + z.id + '" data-b="' + to + '" d="' + curve(points[z.id], points[to], bendFor(z.id, to)) + '"/>';
    })).join('');
    // percorsi della fase: ogni tratto, più spesso se percorso da più concorrenti
    const seg = {};
    (extra.moves || []).forEach((m) => { for (let k = 1; k < m.path.length; k++) { const a = m.path[k - 1], b = m.path[k]; if (a === b) continue; const key = a + '>' + b; seg[key] = (seg[key] || 0) + 1; } });
    const routes = Object.entries(seg).map(([key, n]) => {
      const [a, b] = key.split('>').map(Number); if (!points[a] || !points[b]) return '';
      const touch = selected == null || a === selected || b === selected;
      return '<path class="route' + (touch ? '' : ' faded') + '" d="' + curve(points[a], points[b], bendFor(Math.min(a, b), Math.max(a, b)) * (a < b ? 1 : -1)) + '" style="stroke-width:' + Math.min(6, 1.6 + n * 0.8).toFixed(1) + '" marker-end="url(#mv-arrow)"/>';
    }).join('');
    const nodes = zones.map((z, i) => {
      const n = counts[i] || 0, size = Math.round(40 + Math.min(n, 10) * 3), d = lv(z.danger ?? 1);
      const deaths = (extra.deaths || []).filter((x) => x.zone === i).length, traps = (extra.traps || []).filter((x) => x.zone === i).length;
      const badges = (closed.has(i) ? '<i class="mb mb-lock" title="Zona chiusa">' + ICON.lock + '</i>' : '') + (deaths ? '<i class="mb mb-dead" title="' + deaths + ' in questa fase">' + ICON.skull + (deaths > 1 ? '<u>' + deaths + '</u>' : '') + '</i>' : '') +
        (traps ? '<i class="mb mb-trap" title="' + plural(traps, 'trappola', 'trappole') + '">' + ICON.trap + '</i>' : '') + ((extra.affected || []).includes(i) ? '<i class="mb mb-dis" title="Area del disastro">' + ICON.bolt + '</i>' : '');
      const label = esc(cap(bare(z.name))) + ': ' + plural(n, 'presente', 'presenti') + (closed.has(i) ? ', zona chiusa' : '') + (deaths ? ', ' + deaths + ' fuori in questa fase' : '');
      return '<button type="button" class="map-node d' + d + (closed.has(i) ? ' shut' : '') + (selected === i ? ' selected' : '') + (selected != null && selected !== i ? ' faded' : '') + (n ? '' : ' empty') + '" style="left:' + (points[i][0] / 3.6).toFixed(2) + '%;top:' + (points[i][1] / 3).toFixed(2) + '%;--s:' + size + 'px" data-map-zone="' + i + '" aria-pressed="' + (selected === i) + '" aria-label="' + label + '">' +
        '<span class="mn-disc"><b>' + n + '</b>' + (badges ? '<span class="mn-badges">' + badges + '</span>' : '') + '</span><span class="mn-name">' + esc(cap(bare(z.name))) + '</span></button>';
    }).join('');
    return '<div class="arena-graph" role="group" aria-label="Mappa delle zone: ogni cerchio è una zona con il numero di presenti; le linee sono i passaggi, tratteggiate se chiusi; le frecce colorate sono gli spostamenti di questa fase">' +
      '<svg viewBox="0 0 360 300" aria-hidden="true"><defs><marker id="mv-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="mv-arrow"/></marker></defs>' + lines + routes + '</svg>' + nodes + '</div>';
  }

  function render(result, phaseIndex, options = {}) {
    const phase = result.phases[phaseIndex]; if (!phase) return '';
    const spatial = result.spatial, theme = options.theme, soft = !!(theme && theme.soft), by = Object.fromEntries(result.tributes.map((t) => [t.id, t]));
    const zones = spatial?.zones || theme.lex.luogo.map((name, id) => ({ id, name, links: [], resources: options.properties?.[id]?.[0] ?? 1, danger: options.properties?.[id]?.[1] ?? 1, shelter: options.properties?.[id]?.[2] ?? 0.5, description: '' }));
    const closureReason = (id) => spatial?.closures.filter((c) => c.zone === id && c.ph <= phaseIndex).at(-1)?.reason;
    const closed = new Set(phase.snap.closed || []), selected = zones[options.selected] ? options.selected : null;
    const present = (z) => phase.snap.alive.filter((id) => phase.snap.zones[id] === z);
    const name = (id) => by[id]?.name || 'Concorrente';
    const person = (id) => '<button type="button" class="map-person" data-prof="' + esc(id) + '">' + esc(name(id)) + '</button>';
    const face = (id) => (options.avatar && by[id] ? options.avatar(by[id]) : person(id));
    const deaths = spatial?.deaths.filter((d) => d.ph === phaseIndex) || [];
    const moves = spatial?.moves.filter((m) => m.ph === phaseIndex) || [];
    const locations = phase.events.map((e, index) => ({ e, index })).filter(({ e }) => e.place && e.place.zone != null);
    const traps = phase.snap.terrain?.traps || [], loot = phase.snap.terrain?.loot || [];
    const zname = (id) => esc(cap(bare(zones[id]?.name || '')));
    const outWord = soft ? 'Fuori dai giochi' : 'Caduti';

    // elenco compatto di tutte le zone
    const list = () => '<div class="zlist" role="list">' + zones.map((z) => {
      const n = present(z.id).length, f = deaths.filter((d) => d.zone === z.id).length, tz = traps.filter((t) => t.zone === z.id).length;
      const flags = [closed.has(z.id) ? '<span class="zflag lock">' + ICON.lock + 'chiusa</span>' : '', f ? '<span class="zflag dead">' + ICON.skull + f + '</span>' : '', tz ? '<span class="zflag trap">' + ICON.trap + tz + '</span>' : ''].join('');
      return '<div role="listitem"><button type="button" class="zrow' + (closed.has(z.id) ? ' closed' : '') + '" data-map-zone="' + z.id + '">' +
        '<span class="zr-num">' + (z.id + 1) + '</span><span class="zr-main"><span class="zr-name">' + zname(z.id) + (flags ? '<span class="zflags">' + flags + '</span>' : '') + '</span>' + meters(z) + '</span>' +
        '<span class="zr-count"><b>' + n + '</b><small>' + (n === 1 ? 'presente' : 'presenti') + '</small></span></button></div>';
    }).join('') + '</div>';

    // scheda della zona scelta
    const card = (z) => {
      const here = present(z.id), fallen = deaths.filter((d) => d.zone === z.id), events = locations.filter((x) => x.e.place.zone === z.id && !x.e.note);
      const tz = traps.filter((t) => t.zone === z.id), lz = loot.find((x) => x.zone === z.id), affected = phase.affectedZones?.includes(z.id);
      const pic = options.zonePic ? options.zonePic(z) : '';
      const tags = (closed.has(z.id) ? '<span class="ztag2 lock">' + ICON.lock + (closureReason(z.id) === 'finale' ? 'Accesso chiuso per lo scontro finale' : 'Zona chiusa dalla tempesta') + '</span>' : '') + (affected ? '<span class="ztag2 dis">' + ICON.bolt + 'Area del disastro in questa fase</span>' : '');
      return '<article class="zcard' + (closed.has(z.id) ? ' closed' : '') + (fallen.length ? ' hot' : '') + '">' +
        '<header class="zc-head">' + (pic ? '<span class="zc-pic">' + pic + '</span>' : '') + '<span class="zc-title"><span class="zc-num">' + (z.id + 1) + '</span><h4>' + zname(z.id) + '</h4></span></header>' +
        '<div class="zc-in">' + (z.description ? '<p class="zc-desc">' + esc(z.description) + '</p>' : '') + (tags ? '<div class="ztags2">' + tags + '</div>' : '') + meters(z, true) +
        '<section class="zc-sec"><h5>Presenti a fine fase <span>' + here.length + '</span></h5>' + (here.length ? '<div class="zc-faces">' + here.map((id) => '<span class="zc-face">' + face(id) + '<span>' + esc(name(id)) + '</span></span>').join('') + '</div>' : '<p class="help">Nessun concorrente presente a fine fase.</p>') + '</section>' +
        (fallen.length ? '<section class="zc-sec zc-out"><h5>' + (soft ? 'Usciti dai giochi qui' : 'Morti qui') + ' <span>' + fallen.length + '</span></h5><p>' + fallen.map((d) => person(d.id)).join(', ') + '</p></section>' : '') +
        (tz.length ? '<section class="zc-sec"><h5>' + (soft ? (tz.length === 1 ? 'Tranello ancora attivo' : 'Tranelli ancora attivi') : (tz.length === 1 ? 'Trappola ancora attiva' : 'Trappole ancora attive')) + ' <span>' + tz.length + '</span></h5><ul class="zc-traps">' + tz.map((t) => '<li>' + esc(t.name) + ' <span class="help">di</span> ' + person(t.owner) + '</li>').join('') + '</ul></section>' : '') +
        (lz ? '<p class="zc-loot">Bottino rimasto: <b>' + plural(lz.count, 'oggetto', 'oggetti') + '</b></p>' : '') +
        (spatial && z.links.length ? '<section class="zc-sec"><h5>Passaggi</h5><div class="zc-links">' + z.links.map((id) => '<button type="button" class="zc-link' + (closed.has(id) ? ' shut' : '') + '" data-map-zone="' + id + '">' + zname(id) + (closed.has(id) ? ' <small>chiuso</small>' : '') + ' <span aria-hidden="true">→</span></button>').join('') + '</div></section>' : '') +
        (events.length ? '<section class="zc-sec"><h5>Fatti avvenuti qui <span>' + events.length + '</span></h5><ol class="map-events">' + events.sort((a, b) => a.e.place.seq - b.e.place.seq).map(({ e, index }) => '<li><button type="button" data-map-event="' + index + '">' + esc(e.plain) + '</button></li>').join('') + '</ol></section>' : '') +
        '</div></article>';
    };

    const journeys = moves.filter((m) => selected == null || m.path.includes(selected));
    const remembered = (result.chronicle?.facts || []).filter((f) => f.ph <= phaseIndex && (selected == null || f.zone === selected));
    const history = remembered.length ? '<details class="map-memory mv-fold"><summary><span>Memoria ' + (selected == null ? 'dell’arena' : 'del luogo') + '</span><b>' + remembered.length + '</b></summary><ol>' + remembered.map((f) => '<li><span class="mm-when">Giorno ' + f.day + ' · fase ' + (f.ph + 1) + ' · ' + zname(f.zone) + '</span><p>' + esc(f.plain) + '</p></li>').join('') + '</ol></details>' : '';
    const route = (m) => '<li>' + person(m.id) + '<span class="map-route">' + m.path.map((z) => '<span class="mr-stop">' + zname(z) + '</span>').join('<span class="mr-arrow" aria-hidden="true">→</span>') + '</span><span class="mr-why">' + esc(m.reason) + ' · energia −' + m.cost.toLocaleString('it-IT') + '</span></li>';
    const travel = spatial ? '<details class="map-journeys mv-fold"' + (journeys.length && journeys.length < 9 ? ' open' : '') + '><summary><span>Spostamenti della fase' + (selected != null ? ' in questa zona' : '') + '</span><b>' + journeys.length + '</b></summary>' + (journeys.length ? '<ol>' + journeys.sort((a, b) => a.seq - b.seq).map(route).join('') + '</ol>' : '<p class="help">Nessun cambio di zona registrato in questa fase.</p>') + '</details>' : '';

    const totalHere = phase.snap.alive.length;
    const head = '<div class="mv-head"><div><b class="mv-title">Posizioni a fine fase ' + (phaseIndex + 1) + '</b><span class="mv-sub">' + plural(totalHere, 'concorrente in gara', 'concorrenti in gara') + (deaths.length ? ' · ' + deaths.length + ' ' + outWord.toLowerCase() + ' in questa fase' : '') + '</span></div>' +
      (selected != null ? '<button class="btn sm mv-all" type="button" data-map-zone="all"><span aria-hidden="true">←</span> Tutte le zone</button>' : '') + '</div>';
    const legend = spatial ? '<p class="mv-legend"><span><i class="lg-node"></i>presenti</span><span><i class="lg-route"></i>spostamenti</span><span><i class="lg-shut"></i>passaggio chiuso</span><span><i class="lg-ring"></i>anello: pericolo</span></p>' : '<p class="help mv-note">Replay storico: sono disponibili le posizioni salvate a fine fase. Percorsi e luoghi dei singoli eventi non erano registrati.</p>';
    return '<div class="map-view">' + head +
      (spatial ? graph(zones, closed, zones.map((z) => present(z.id).length), selected, { moves, deaths, traps, affected: phase.affectedZones || [] }) : '') + legend +
      (selected != null ? card(zones[selected]) : list()) + travel + history + '</div>';
  }
  G.LOS_MAP_VIEW = { render, graph }; if (typeof module === 'object' && module.exports) module.exports = G.LOS_MAP_VIEW;
})(typeof window !== 'undefined' ? window : globalThis);
