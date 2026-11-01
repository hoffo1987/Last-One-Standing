/* Last One Standing — interfaccia */
(function () {
  'use strict';
  const D = window.LOS_DATA, L = window.LOS, ART = window.LOS_ART, AN = window.LOS_ANIM;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const THEMES = Object.fromEntries(D.themes.map((t) => [t.id, t]));
  const TRAITS = Object.fromEntries(D.traits.map((t) => [t.id, t]));
  const KEY = 'last-one-standing:v1';
  const SPEED = { lenta: 7000, normale: 3800, veloce: 1700 };
  const G3 = (g, m, f, n) => (g === 'F' ? f : g === 'N' ? n : m);
  const COUNTS = L.countTemplates();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    cotta: 'Cotta segreta', complotto: 'Complotto', obiettivo: 'Obiettivo', meteo: 'Meteo', conseguenza: 'Conseguenza', ferite: 'Ferite', stenti: 'Stenti', infezione: 'Infezione', tempesta: 'Tempesta', predatori: 'Pericolo notturno', trappola: 'Trappola', alleanza: 'Alleanza', cure: 'Cure', morale: 'Morale', riposo: 'Notte', esplorazione: 'Esplorazione', bottino: 'Bottino', incidente: 'Incidente' };
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
      const ty = (ITM.types || {})[it.t] || { label: it.t, desc: '' };
      const how = ((ITM.how || {})[it.h] || 'Trovato').replace('{1}', esc(nmOf(it.f))) + (it.d ? ' · G' + it.d : '');
      const stars = it.q ? '<span class="stars" title="Qualità">' + '★'.repeat(it.q) + '<i>' + '★'.repeat(3 - it.q) + '</i></span>' : '';
      const uses = it.u != null && it.m ? '<span class="uses" title="Usura: ' + it.u + ' su ' + it.m + '"><b style="width:' + Math.round((it.u / it.m) * 100) + '%"></b></span>' : '';
      const tag = it.x === 'veleno' ? '<span class="itag bad">Avvelenata</span>' : it.x === 'bomba' ? '<span class="itag bad">Esplosiva</span>' : '';
      return '<div class="bitem t-' + esc(it.t) + '"><span class="bic">' + (ITIC[it.t] || ITIC.valore) + '</span><div class="bbody"><div class="btop"><b>' + esc(it.n) + '</b>' + stars + tag + '</div>' +
        '<div class="bmeta"><span class="btype">' + esc(ty.label) + '</span><span>' + how + '</span>' + uses + '</div><p>' + esc(ty.desc) + '</p></div></div>';
    }).join('') + '</div>';
  }
  function nowHTML(t, snap, i, theme) {
    const m = (snap.mind || {})[t.id]; const v = (snap.vit || {})[t.id]; const st = snap.st[t.id] || [];
    const zone = theme.lex.luogo[snap.zones[t.id]] || '';
    const bits = [];
    if (v) { if (v[0] < 25) bits.push('ridott' + G3(t.gender, 'o', 'a', 'ə') + ' male'); else if (v[0] < 55) bits.push('ferit' + G3(t.gender, 'o', 'a', 'ə')); if (v[3] < 25) bits.push('affamat' + G3(t.gender, 'o', 'a', 'ə')); if (v[1] < 22) bits.push('sfinit' + G3(t.gender, 'o', 'a', 'ə')); if (v[2] < 22) bits.push('a pezzi'); else if (v[2] >= 80) bits.push('carichissim' + G3(t.gender, 'o', 'a', 'ə')); }
    if (st.includes('ubriaco')) bits.push('ubriac' + G3(t.gender, 'o', 'a', 'ə'));
    const allies = snap.allies[t.id] != null ? snap.alive.filter((x) => x !== t.id && snap.allies[x] === snap.allies[t.id]).length : 0;
    const where = zone ? zone.replace(/^(il |lo |la |l'|i |gli |le )/i, (a) => a.toLowerCase()) : '';
    const lead = (where ? 'A ' + where : 'In gara') + (bits.length ? ', ' + bits.join(', ') : '') + (allies ? ', con ' + plural(allies, 'alleato', 'alleati') : ', da sol' + G3(t.gender, 'o', 'a', 'ə')) + '.';
    const g = m ? (MND.goals || {})[m.g] : null;
    return '<div class="nowcard"><div class="sub">Adesso</div><p class="nowlead">' + esc(fixA(lead)) + '</p>' +
      (m && g ? '<div class="goal' + (g.secret ? ' secret' : '') + '"><span class="glbl">Obiettivo</span><b>' + esc(goalLabel(m)) + '</b>' + (g.secret ? '<span class="gsec" title="Gli altri concorrenti non lo sanno">segreto</span>' : '') + (m.since != null && m.since < i ? '<span class="gsince">da G' + (SIM.phases[m.since] ? SIM.phases[m.since].day || 1 : 1) + '</span>' : '') + '</div>' : '') +
      (m && m.th ? '<blockquote class="thought">' + linkify(m.th) + '</blockquote>' : '') + '</div>';
  }
  // «a il Fiume» → «al Fiume» per i testi composti qui
  function fixA(s) { return s.replace(/^A (il|lo|la|i|gli|le|l') ?/, (m, a) => ({ il: 'Al ', lo: 'Allo ', la: 'Alla ', i: 'Ai ', gli: 'Agli ', le: 'Alle ', "l'": "All'" }[a])); }
  function peopleHTML(t, snap, i) {
    const top = ((snap.rel || {})[t.id] || {}).top || [];
    if (!top.length) return '';
    const L2 = MND.rel || {}, MM = Object.assign({}, MND.mem || {}, SIM && THEMES[SIM.theme].soft ? MND.memSoft || {} : {});
    const rows = top.map(([id, a, lbl]) => {
      const mem = ((t.mem || {})[id] || []).filter((m) => m.ph <= i).slice(-3).reverse();
      const pct = Math.round((a + 100) / 2);
      return '<div class="person l-' + esc(lbl) + '">' + avHTML(BY[id], { btn: true }) + '<div class="pbody"><div class="ptop"><b>' + esc(nmOf(id)) + '</b><span class="plbl">' + esc(L2[lbl] || lbl) + '</span></div>' +
        '<span class="affbar" title="Affinità ' + a + '"><b style="left:' + pct + '%"></b></span>' +
        (mem.length ? '<ul class="pmem">' + mem.map((m) => '<li>«' + fill(MM[m.k] || '', [t.id, id, m.x]) + '» <span>G' + (SIM.phases[m.ph] ? SIM.phases[m.ph].day || 1 : '') + '</span></li>').join('') + '</ul>' : '') + '</div></div>';
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
      ds.map((d) => '<div class="dday"><span class="dd">G' + (d || 1) + '</span><div>' + days[d].slice().reverse().map((x) => '<p class="dk-' + esc(x.k) + '"><span class="dk">' + (K[x.k] || '') + '</span>' + linkify(x.h) + '</p>').join('') + '</div></div>').join('') + '</div></div>';
  }
  const arenaOf = (id) => ECO.arenas[id] || {};
  const vitLabels = (th) => (th && th.soft ? ECO.labelsSoft : ECO.labels) || { hp: 'Salute', en: 'Energia', mo: 'Morale', food: 'Sazietà' };
  const whyLabel = (e, theme) => (e.why === 'arena' && arenaOf(theme.id).meter ? arenaOf(theme.id).meter.name : WHY[e.why] || '');
  const CAUSE_TXT = { wound: 'ferite', starve: 'fame', exhaust: 'sfinimento', poison: 'veleno', sick: 'malattia', infect: 'infezione', storm: 'tempesta', beast: 'aggressione notturna', trap: 'trappola', accident: 'incidente' };
  const causeTxt = (t, theme) => (t.deathCause === 'meter' && arenaOf(theme.id).meter ? arenaOf(theme.id).meter.name.toLowerCase() : CAUSE_TXT[t.deathCause] || '');
  function vbars(v, theme, full) {
    if (!v) return '';
    const lb = vitLabels(theme), m = arenaOf(theme.id).meter;
    const rows = [['hp', lb.hp, v[0]], ['en', lb.en, v[1]], ['mo', lb.mo, v[2]], ['food', lb.food, v[3]]];
    if (m && v[4] >= 0) rows.push(['pr', m.name, v[4]]);
    if (!full) return '<span class="vmini" aria-hidden="true">' + rows.slice(0, 3).map(([k, , x]) => '<i class="' + k + (x < 25 ? ' low' : '') + '"><b style="width:' + x + '%"></b></i>').join('') + '</span>';
    return '<div class="vbars">' + rows.map(([k, n, x]) => { const bad = k === 'pr' ? x >= (m.thr || 60) : x < 25; return '<div class="vbar ' + k + (bad ? ' bad' : '') + '"><span>' + esc(n) + '</span><i><b style="width:' + x + '%"></b></i><em>' + x + '</em></div>'; }).join('') + '</div>';
  }
  const KIND = { b: 'Apertura', d: 'Giorno', n: 'Notte', f: 'Evento speciale', dis: 'Disastro', fallen: 'Bilancio', finale: 'Finale' };
  const DIFFS = [
    ['bassa', 'Bassa', 'Partite lunghe, pochi morti', 1], ['normale', 'Normale', 'L\'equilibrio classico', 2],
    ['alta', 'Alta', 'L\'arena non perdona', 3], ['massacro', 'Massacro', 'Finisce in pochi giorni', 4],
  ];

  /* ---------------- stato ---------------- */
  const S = {
    cast: [],
    settings: { theme: 'classico', difficulty: 'normale', seed: '', maxDays: 20, teamsAllied: true, teamWin: false, speed: 'normale', teamSize: 2, view: 'grid', adult: false },
    custom: [],
    run: null,
    ui: null,
  };
  let SIM = null, BY = {}, playTimer = null, lastRendered = -1, sideTab = 'map', editId = null, photoTarget = null;

  function newSeed() {
    const w = ['aurora', 'brace', 'cenere', 'duna', 'eco', 'falco', 'gelo', 'lampo', 'nebbia', 'ombra', 'quarzo', 'rovo', 'selce', 'tuono', 'vento', 'zolfo', 'ferro', 'corvo', 'lupo', 'brina'];
    return w[Math.floor(Math.random() * w.length)] + '-' + Math.floor(Math.random() * 9000 + 1000);
  }
  const teamColor = (team) => L.PALETTE[(Math.max(1, team) - 1) % L.PALETTE.length];

  let saveTimer = null, warnedQuota = false;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      // le foto della partita in corso sono quasi sempre quelle del cast: si salvano una volta sola
      const imgs = Object.fromEntries(S.cast.map((t) => [t.id, t.img]));
      const out = S.run && S.run.cfg ? Object.assign({}, S, { run: Object.assign({}, S.run, { cfg: Object.assign({}, S.run.cfg, { cast: S.run.cfg.cast.map((t) => (t.img && imgs[t.id] === t.img ? Object.assign({}, t, { img: '@cast' }) : t)) }) }) }) : S;
      try { localStorage.setItem(KEY, JSON.stringify(out)); }
      catch (e) { if (!warnedQuota) { warnedQuota = true; toast('Lo spazio del browser è pieno: le ultime modifiche non sono state salvate. Prova con foto più piccole.'); } }
    }, 250);
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (Array.isArray(d.cast)) S.cast = d.cast.map(sanitizeTribute).filter(Boolean);
      if (d.settings && typeof d.settings === 'object') sanitizeSettings(d.settings);
      if (Array.isArray(d.custom)) S.custom = d.custom.map(sanitizeCustom).filter(Boolean);
      if (d.run && d.run.cfg && Array.isArray(d.run.cfg.cast) && THEMES[d.run.cfg.theme]) {
        const imgs = Object.fromEntries((Array.isArray(d.cast) ? d.cast : []).map((t) => [t && t.id, t && t.img]));
        d.run.cfg.cast.forEach((t) => { if (t && t.img === '@cast') t.img = imgs[t.id] || ''; });
        d.run.cfg.cast = d.run.cfg.cast.map(sanitizeTribute).filter(Boolean); d.run.cfg.custom = (d.run.cfg.custom || []).map(sanitizeCustom).filter(Boolean); S.run = d.run; }
      if (d.ui === 'light' || d.ui === 'dark') S.ui = d.ui;
      return true;
    } catch (e) { return false; }
  }

  function sanitizeSettings(x) {
    const st = S.settings;
    if (THEMES[x.theme]) st.theme = x.theme;
    if (L.DIFF[x.difficulty]) st.difficulty = x.difficulty;
    if (typeof x.seed === 'string') st.seed = x.seed.slice(0, 60);
    if (+x.maxDays >= 5 && +x.maxDays <= 40) st.maxDays = Math.round(+x.maxDays);
    if (SPEED[x.speed]) st.speed = x.speed;
    if ([1, 2, 3, 4].includes(+x.teamSize)) st.teamSize = +x.teamSize;
    if (x.view === 'grid' || x.view === 'team') st.view = x.view;
    ['teamsAllied', 'teamWin', 'adult'].forEach((k) => { if (typeof x[k] === 'boolean') st[k] = x[k]; });
  }
  function sanitizeTribute(t, i) {
    if (!t || typeof t !== 'object') return null;
    const attr = {};
    D.attrs.forEach((a) => { const v = Math.round(+((t.attr || {})[a.id])); attr[a.id] = v >= 1 && v <= 10 ? v : 5; });
    const team = Math.max(1, Math.min(99, Math.round(+t.team) || (i || 0) + 1));
    return {
      id: typeof t.id === 'string' && t.id ? t.id.slice(0, 40) : 'c' + Math.random().toString(36).slice(2, 10),
      name: String(t.name || '').slice(0, 40), gender: ['M', 'F', 'N'].includes(t.gender) ? t.gender : 'M', team, color: teamColor(team),
      img: typeof t.img === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(t.img) && t.img.length < 400000 ? t.img : '',
      traits: (Array.isArray(t.traits) ? t.traits : []).filter((x) => TRAITS[x]).slice(0, 3), attr,
    };
  }
  function sanitizeCustom(c) {
    if (!c || typeof c.text !== 'string' || !c.text.trim()) return null;
    const n = Math.max(1, Math.min(4, Math.round(+c.n) || 1));
    const letters = 'ABCD'.slice(0, n).split('');
    const out = { id: c.id || 'e' + Math.random().toString(36).slice(2, 9), phase: ['tutte', 'b', 'd', 'n', 'f'].includes(c.phase) ? c.phase : 'tutte', n, text: c.text.trim().slice(0, 240), dies: (Array.isArray(c.dies) ? c.dies : []).filter((x) => letters.includes(x)), killer: letters.includes(c.killer) ? c.killer : '' };
    try { L.parseLine(L.customToLine(out), 'custom'); } catch (e) { return null; }
    return out;
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
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 3400);
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
    if (v === 'cast') { renderCast(); if (changed) { const cl = $('#castList'); cl.classList.remove('castenter'); void cl.offsetWidth; cl.classList.add('castenter'); } }
    if (v === 'arena') renderArena();
    if (v === 'diretta') renderLive(true);
    if (v === 'esito') renderResults();
    if (changed) { window.scrollTo({ top: 0, behavior: 'auto' }); const sec = $('#v-' + v); sec.classList.remove('view-enter'); void sec.offsetWidth; sec.classList.add('view-enter'); }
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
    $('#facts').innerHTML = [[COUNTS.events, 'modelli di evento, più ' + COUNTS.adultEvents + ' per adulti'], [COUNTS.disasters, 'disastri, più ' + COUNTS.adultDisasters + ' per adulti'], [D.themes.length, 'arene da esplorare'], [D.traits.length + ' · ' + D.attrs.length, 'tratti e caratteristiche che cambiano la storia']]
      .map(([n, l]) => '<div class="fact"><b>' + n + '</b><span>' + l + '</span></div>').join('');
    $('#arenaStrip').innerHTML = D.themes.map((t) => posterHTML(t, false, 'a')).join('');
    const r = $('#resume');
    if (SIM) {
      const th = THEMES[SIM.theme]; const done = (S.run.seen || 0) >= SIM.phases.length - 1;
      r.hidden = false; r.className = 'resume card';
      r.innerHTML = '<div class="rtext"><div class="eyebrow">' + (done ? 'Ultima partita' : 'Partita in corso') + '</div><b>' + esc(th.name) + '</b><div class="muted">' + SIM.tributes.length + ' concorrenti · fase ' + ((S.run.phase || 0) + 1) + ' di ' + SIM.phases.length + '</div></div>' +
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
    const pt = COUNTS.perTheme[t.id];
    const inner = '<span class="pscene" aria-hidden="true">' + ART.scene(t.id) + '</span><span class="pcheck" aria-hidden="true">✓</span><span class="picon" aria-hidden="true">' + ART.icon(t.id, 18) + '</span>' +
      (t.soft ? '<span class="psoft">Senza morti</span>' : '') + '<span class="pmeta">' + (pt.events + (S.settings.adult ? pt.adultEvents : 0)) + ' eventi · ' + (pt.disasters + (S.settings.adult ? pt.adultDisasters : 0)) + ' disastri</span><b>' + esc(t.name) + '</b><small>' + esc(t.tag) + '</small>';
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
      $('#hbDay').textContent = (KIND[p.kind] === 'Apertura' ? 'APERTURA' : 'GIORNO ' + p.day);
      $('#hbTally').innerHTML = '<i class="d"></i>'.repeat(deadSoFar.size) + '<i></i>'.repeat(total - deadSoFar.size);
      $('#hbLine').innerHTML = e.html.replace(/<b class="nm"[^>]*>/g, '<b>');
      demoI++;
    };
    draw();
    if (!reduced) homeTimer = setInterval(draw, 2300);
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
  function tileHTML(t, i, showOrder) {
    const traits = t.traits.length ? t.traits.map((id) => '<span class="chip" title="' + esc(TRAITS[id].desc) + '">' + esc(TRAITS[id].name) + '</span>').join('') : '<span class="chip dim">Nessun tratto</span>';
    return '<article class="tile" data-id="' + esc(t.id) + '" style="--ti:' + Math.min(i, 24) + '">' +
      '<button class="grip" type="button" aria-label="Trascina per riordinare" title="Trascina per riordinare">' + GRIP + '</button>' +
      '<div class="thead">' +
        '<button class="avbtn" type="button" data-act="photo" aria-label="Carica una foto per ' + esc(t.name || 'questo concorrente') + '">' + avHTML(t) + '<span class="cam">' + IC.cam + '</span></button>' +
        '<div style="min-width:0;flex:1"><input class="tname" type="text" id="name-' + esc(t.id) + '" data-f="name" value="' + esc(t.name) + '" placeholder="Nome" aria-label="Nome" maxlength="40">' +
        '<div class="tsub"><span class="teamchip" style="--c:' + esc(t.color) + '"><i></i>Squadra ' + t.team + '</span></div></div>' +
      '</div>' +
      '<div class="chips">' + traits + '</div>' +
      '<div class="tfoot">' +
        '<div class="gsel" role="group" aria-label="Genere">' + ['M', 'F', 'N'].map((g) => '<button type="button" data-act="g" data-v="' + g + '" aria-pressed="' + (t.gender === g) + '">' + G3(g, 'Lui', 'Lei', 'Neutro') + '</button>').join('') + '</div>' +
        '<div class="tacts">' +
          '<button class="btn sm tedit" type="button" data-act="edit"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>Modifica</button>' +
          (showOrder ? '<div class="ord"><button type="button" data-act="up" aria-label="Sposta prima"' + (i === 0 ? ' disabled' : '') + '>↑</button><button type="button" data-act="down" aria-label="Sposta dopo"' + (i === S.cast.length - 1 ? ' disabled' : '') + '>↓</button></div>' : '') +
        '</div>' +
      '</div>' +
    '</article>';
  }
  function renderCast() {
    $$('#viewSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.settings.view));
    $('#teamSize').value = String(S.settings.teamSize || 2);
    const add = '<button class="addtile" type="button" id="addOne"><span>+ Aggiungi concorrente</span></button>';
    if (!S.cast.length) {
      $('#castList').innerHTML = '<div class="castempty card"><div class="ce-art" aria-hidden="true">' + (ART.assets.sagome || []).slice(0, 3).map((u, k) => '<i class="sil sil-' + k + '"></i>').join('') + '</div><h2>Ancora nessun concorrente</h2><p>Genera un cast casuale, incolla un elenco di nomi oppure aggiungili uno alla volta.</p>' +
        '<div class="row center"><button class="btn primary lg" type="button" data-empty="gen">Genera ' + $('#presetSize').value + ' concorrenti</button><button class="btn lg" type="button" data-empty="bulk">Incolla un elenco</button><button class="btn lg" type="button" data-empty="add">Aggiungi a mano</button></div></div>';
      updateCounts(); return;
    }
    if (S.settings.view === 'team') {
      const teams = {};
      S.cast.forEach((t, i) => (teams[t.team] = teams[t.team] || []).push([t, i]));
      $('#castList').innerHTML = '<div class="teamwrap">' + Object.keys(teams).sort((a, b) => a - b).map((k) => '<section class="teamblock card" style="--c:' + teamColor(+k) + '"><h3><i></i>Squadra ' + k + ' <span>' + plural(teams[k].length, 'concorrente', 'concorrenti') + '</span></h3><div class="castgrid">' + teams[k].map(([t, i]) => tileHTML(t, i, false)).join('') + '</div></section>').join('') + '</div><div class="castgrid" style="margin-top:14px">' + add + '</div>';
    } else {
      $('#castList').innerHTML = '<div class="castgrid">' + S.cast.map((t, i) => tileHTML(t, i, true)).join('') + add + '</div>';
    }
    updateCounts();
  }
  function updateCounts() {
    const n = S.cast.length;
    $('#tabCount').textContent = n || '';
    $('#castSummary').innerHTML = '<b>' + n + '</b> ' + (n === 1 ? 'concorrente' : 'concorrenti') + ' · ' + plural(nTeams(), 'squadra', 'squadre');
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
    el.replaceWith(tmp.firstChild);
  }
  function addTribute(open) {
    const used = new Set(S.cast.map((t) => t.name));
    const g = S.cast.length % 2 ? 'M' : 'F';
    const name = D.names[g].find((x) => !used.has(x)) || 'Concorrente ' + (S.cast.length + 1);
    const ts = +S.settings.teamSize || 1;
    const team = Math.floor(S.cast.length / ts) + 1;
    const t = sanitizeTribute({ name, gender: g, team, traits: [], attr: {} });
    D.attrs.forEach((a) => (t.attr[a.id] = 3 + Math.floor(Math.random() * 6)));
    S.cast.push(t); renderCast(); save();
    if (open) openEditor(t.id);
    else { const inp = $('#name-' + CSS.escape(t.id)); if (inp) { inp.focus(); inp.select(); } }
  }
  $('#btnAdd').addEventListener('click', () => addTribute(true));
  $('#castList').addEventListener('click', (e) => {
    const em = e.target.closest('[data-empty]');
    if (em) { if (em.dataset.empty === 'gen') $('#btnRandom').click(); else if (em.dataset.empty === 'bulk') $('#btnBulk').click(); else addTribute(true); return; }
    if (e.target.closest('#addOne')) return addTribute(false);
    const b = e.target.closest('[data-act]'); if (!b) return;
    const t = findT(b); if (!t) return;
    const i = S.cast.indexOf(t);
    switch (b.dataset.act) {
      case 'edit': return openEditor(t.id);
      case 'photo': photoTarget = t.id; $('#avatarFile').click(); return;
      case 'g': t.gender = b.dataset.v; refreshTile(t.id); break;
      case 'up': if (i > 0) { [S.cast[i - 1], S.cast[i]] = [S.cast[i], S.cast[i - 1]]; renderCast(); $('.tile[data-id="' + CSS.escape(t.id) + '"] [data-act="up"]')?.focus(); } break;
      case 'down': if (i < S.cast.length - 1) { [S.cast[i + 1], S.cast[i]] = [S.cast[i], S.cast[i + 1]]; renderCast(); $('.tile[data-id="' + CSS.escape(t.id) + '"] [data-act="down"]')?.focus(); } break;
      default: return;
    }
    save();
  });
  $('#castList').addEventListener('input', (e) => {
    if (e.target.dataset.f !== 'name') return;
    const t = findT(e.target); if (!t) return;
    t.name = e.target.value.slice(0, 40);
    const av = e.target.closest('.tile').querySelector('.avbtn .av'); if (av && !t.img) av.textContent = initials(t.name);
    save();
  });
  $('#castList').addEventListener('change', (e) => { if (e.target.dataset.f === 'name') updateCounts(); });
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
    renderCast(); save();
  });
  $('#castList').addEventListener('dragend', () => { dragId = null; $$('.tile').forEach((c) => { c.draggable = false; c.classList.remove('dragging', 'over'); }); });
  // foto
  $('#avatarFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; e.target.value = '';
    const t = S.cast.find((x) => x.id === photoTarget); if (!f || !t) return;
    if (!/^image\//.test(f.type)) return toast('Il file scelto non è un\'immagine.');
    const rd = new FileReader();
    rd.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = 160, cv = document.createElement('canvas'); cv.width = cv.height = s;
        const k = Math.max(s / img.width, s / img.height), w = img.width * k, h = img.height * k;
        cv.getContext('2d').drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
        t.img = cv.toDataURL('image/jpeg', 0.82);
        save(); if ($('#editDlg').open && editId === t.id) renderEditor(); refreshTile(t.id);
      };
      img.onerror = () => toast('Non riesco a leggere questa immagine.');
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  });
  // barra strumenti
  $('#btnRandom').addEventListener('click', () => {
    S.cast = L.randomCast(+$('#presetSize').value, Math.random().toString(36), +S.settings.teamSize || 2).map(sanitizeTribute);
    renderCast(); save(); toast('Cast generato: ' + S.cast.length + ' concorrenti.');
    const cl = $('#castList'); cl.classList.remove('castenter'); void cl.offsetWidth; cl.classList.add('castenter');
  });
  $('#teamSize').addEventListener('change', (e) => { S.settings.teamSize = +e.target.value; save(); });
  $('#btnRegroup').addEventListener('click', () => {
    const ts = +S.settings.teamSize || 1;
    S.cast.forEach((t, i) => { t.team = Math.floor(i / ts) + 1; t.color = teamColor(t.team); });
    renderCast(); save(); toast('Squadre ricomposte in ordine, da ' + ts + '.');
  });
  $('#viewSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.view = b.dataset.v; save(); renderCast(); });
  $('#btnClear').addEventListener('click', () => ($('#clearConfirm').hidden = false));
  $('#clearNo').addEventListener('click', () => ($('#clearConfirm').hidden = true));
  $('#clearYes').addEventListener('click', () => { S.cast = []; $('#clearConfirm').hidden = true; renderCast(); save(); });

  // scheda di modifica
  function openEditor(id) { editId = id; renderEditor(); if (!$('#editDlg').open) $('#editDlg').showModal(); }
  function renderEditor() {
    const t = S.cast.find((x) => x.id === editId); if (!t) return $('#editDlg').close();
    const sum = D.attrs.reduce((s, a) => s + t.attr[a.id], 0);
    $('#editBody').innerHTML =
      '<div class="dh"><h2 id="h-edit">' + esc(t.name || 'Senza nome') + '</h2><button class="iconbtn" data-close type="button" aria-label="Chiudi">✕</button></div>' +
      '<div class="db">' +
        '<div class="profhead"><button class="avbtn" type="button" data-e="photo" aria-label="Carica una foto">' + avHTML(t) + '<span class="cam">' + IC.cam + '</span></button>' +
          '<div class="ps"><div class="row">' + (t.img ? '<button class="btn sm" type="button" data-e="rmphoto">Togli la foto</button>' : '<button class="btn sm" type="button" data-e="photo">Carica una foto</button>') + '</div><small class="help">La foto resta solo in questo browser.</small></div></div>' +
        '<label class="field" for="e-name"><span>Nome</span><input type="text" id="e-name" value="' + esc(t.name) + '" maxlength="40"></label>' +
        '<div class="row" style="gap:16px;align-items:flex-end">' +
          '<div class="field"><span>Genere (per le frasi)</span><div class="seg" role="group" aria-label="Genere">' + ['M', 'F', 'N'].map((g) => '<button type="button" data-e="g" data-v="' + g + '" aria-pressed="' + (t.gender === g) + '">' + G3(g, 'Lui', 'Lei', 'Neutro') + '</button>').join('') + '</div></div>' +
          '<label class="field" for="e-team" style="width:110px"><span>Squadra</span><input type="number" id="e-team" min="1" max="99" value="' + t.team + '"></label>' +
        '</div>' +
        '<div class="field"><span>Tratti · ' + t.traits.length + ' di 3</span><div class="traitpick">' + D.traits.map((x) => '<button type="button" data-e="trait" data-v="' + x.id + '" aria-pressed="' + t.traits.includes(x.id) + '"' + (!t.traits.includes(x.id) && t.traits.length >= 3 ? ' disabled' : '') + ' title="' + esc(x.desc) + '">' + esc(x.name) + '</button>').join('') + '</div><p class="help traitdesc" id="traitDesc">' + (t.traits.length ? t.traits.map((x) => '<b>' + esc(TRAITS[x].name) + '</b>: ' + esc(TRAITS[x].desc)).join(' ') : 'Passa sopra un tratto per leggerne l\'effetto.') + '</p></div>' +
        '<div class="field"><span>Caratteristiche · totale <b id="attrSum">' + sum + '</b></span><div class="attrgrid">' + D.attrs.map((a) => '<label for="ea-' + a.id + '" title="' + esc((D.attrDesc || {})[a.id] || '') + '">' + a.name + '</label><input type="range" min="1" max="10" id="ea-' + a.id + '" data-k="' + a.id + '" value="' + t.attr[a.id] + '"><output>' + t.attr[a.id] + '</output>').join('') + '</div>' +
          '<div class="row" style="margin-top:6px"><button class="btn sm" type="button" data-e="rattr">Valori casuali</button><button class="btn sm" type="button" data-e="avg">Tutti a 5</button></div></div>' +
        '<div class="row" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:14px"><button class="btn danger ghost" type="button" data-e="del">Elimina concorrente</button><button class="btn primary" type="button" data-close>Fatto</button></div>' +
        '<div class="confirm" id="delConfirm" hidden>Eliminare ' + esc(t.name || 'questo concorrente') + '? <button class="btn danger sm" type="button" data-e="delyes">Elimina</button></div>' +
      '</div>';
  }
  $('#editDlg').addEventListener('click', (e) => {
    const b = e.target.closest('[data-e]'); if (!b) return;
    const t = S.cast.find((x) => x.id === editId); if (!t) return;
    switch (b.dataset.e) {
      case 'photo': photoTarget = t.id; $('#avatarFile').click(); return;
      case 'rmphoto': t.img = ''; break;
      case 'g': t.gender = b.dataset.v; break;
      case 'trait': t.traits.includes(b.dataset.v) ? (t.traits = t.traits.filter((x) => x !== b.dataset.v)) : t.traits.length < 3 && t.traits.push(b.dataset.v); break;
      case 'rattr': D.attrs.forEach((a) => (t.attr[a.id] = 1 + Math.floor(Math.random() * 10))); break;
      case 'avg': D.attrs.forEach((a) => (t.attr[a.id] = 5)); break;
      case 'del': $('#delConfirm').hidden = false; return;
      case 'delyes': S.cast = S.cast.filter((x) => x.id !== t.id); save(); $('#editDlg').close(); renderCast(); return;
      default: return;
    }
    save(); renderEditor();
    const again = $('#editBody [data-e="' + b.dataset.e + '"]' + (b.dataset.v ? '[data-v="' + b.dataset.v + '"]' : '')); if (again) again.focus();
  });
  $('#editDlg').addEventListener('input', (e) => {
    const t = S.cast.find((x) => x.id === editId); if (!t) return;
    if (e.target.id === 'e-name') { t.name = e.target.value.slice(0, 40); $('#h-edit').textContent = t.name || 'Senza nome'; }
    else if (e.target.id === 'e-team') { const v = Math.round(+e.target.value); if (v >= 1 && v <= 99) { t.team = v; t.color = teamColor(v); const av = $('#editBody .profhead .av'); if (av) av.style.setProperty('--c', t.color); } }
    else if (e.target.dataset.k) { t.attr[e.target.dataset.k] = +e.target.value; e.target.nextElementSibling.textContent = e.target.value; $('#attrSum').textContent = D.attrs.reduce((s, a) => s + t.attr[a.id], 0); }
    save();
  });
  $('#editDlg').addEventListener('mouseover', (e) => { const b = e.target.closest('[data-e="trait"]'); if (b) { const x = TRAITS[b.dataset.v]; $('#traitDesc').innerHTML = '<b>' + esc(x.name) + '</b>: ' + esc(x.desc); } });
  $('#editDlg').addEventListener('focusin', (e) => { const b = e.target.closest('[data-e="trait"]'); if (b) { const x = TRAITS[b.dataset.v]; $('#traitDesc').innerHTML = '<b>' + esc(x.name) + '</b>: ' + esc(x.desc); } });
  $('#editDlg').addEventListener('close', () => { if (curView === 'cast') renderCast(); });

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
  const exportJSON = () => JSON.stringify({ app: 'last-one-standing', versione: 2, cast: S.cast, regole: S.settings, eventi: S.custom }, null, 2);
  function importJSON(text) {
    let d; try { d = JSON.parse(text); } catch (e) { return 'Il testo non è un JSON valido.'; }
    const cast = Array.isArray(d) ? d : d.cast;
    if (!Array.isArray(cast) || !cast.length) return 'Non trovo un elenco di concorrenti ("cast") nel testo.';
    S.cast = cast.slice(0, 200).map(sanitizeTribute).filter(Boolean);
    const r = d.regole || d.settings;
    if (r && typeof r === 'object') {
      sanitizeSettings(Object.assign({}, r, { adult: S.settings.adult }));
      if (THEMES[r.theme]) S.settings.theme = r.theme;
      if (L.DIFF[r.difficulty]) S.settings.difficulty = r.difficulty;
      if (typeof r.seed === 'string') S.settings.seed = r.seed.slice(0, 60);
      if (+r.maxDays >= 5 && +r.maxDays <= 40) S.settings.maxDays = +r.maxDays;
      ['teamsAllied', 'teamWin'].forEach((k) => typeof r[k] === 'boolean' && (S.settings[k] = r[k]));
    }
    const ev = d.eventi || d.custom;
    if (Array.isArray(ev)) S.custom = ev.slice(0, 200).map(sanitizeCustom).filter(Boolean);
    renderCast(); save(); return null;
  }
  $('#btnIO').addEventListener('click', () => { $('#ioText').value = exportJSON(); $('#ioMsg').textContent = ''; $('#ioDlg').showModal(); });
  $('#ioCopy').addEventListener('click', () => copyText($('#ioText').value, 'Configurazione copiata negli appunti.'));
  $('#ioImport').addEventListener('click', () => { const err = importJSON($('#ioText').value); if (err) $('#ioMsg').textContent = err; else { $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); } });
  $('#ioFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { $('#ioText').value = rd.result; const err = importJSON(rd.result); if (err) $('#ioMsg').textContent = err; else { $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); } };
    rd.readAsText(f);
  });

  /* =============== ARENA =============== */
  function renderArena() {
    $('#arenaSub').textContent = 'Ogni arena ha luoghi, armi, pericoli e disastri propri. In tutto ' + COUNTS.events + ' modelli di evento e ' + COUNTS.disasters + ' disastri, più quelli che scrivi tu.';
    $('#themeList').innerHTML = D.themes.map((t) => posterHTML(t, S.settings.theme === t.id)).join('');
    AN.tilt($('#themeList'), '.poster-card');
    $('#diffSeg').innerHTML = DIFFS.map(([v, n, d, k]) => '<button type="button" role="radio" data-v="' + v + '" aria-checked="' + (S.settings.difficulty === v) + '"><b>' + n + ' <span class="sk" aria-hidden="true">' + '✖'.repeat(k) + '</span></b><small>' + d + '</small></button>').join('');
    $('#maxDays').value = S.settings.maxDays; $('#maxDaysOut').textContent = S.settings.maxDays;
    $('#seed').value = S.settings.seed;
    $('#teamsAllied').checked = !!S.settings.teamsAllied; $('#teamWin').checked = !!S.settings.teamWin;
    renderAdult();
    renderPreview(); renderCustomForm(); renderCustomList(); renderStartSum();
  }
  function renderPreview() {
    const t = THEMES[S.settings.theme], pt = COUNTS.perTheme[t.id];
    const strip = (s) => s.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '');
    const pools = L.buildPools(t, []);
    const dz = pools.disasters.map((d) => d.n);
    let sample = '';
    try {
      const cast = (S.cast.length >= 4 ? S.cast.slice(0, 8) : L.randomCast(8, 'anteprima', 2));
      const r = L.simulate({ cast, theme: t.id, seed: 'anteprima-' + t.id, difficulty: 'normale', teamsAllied: false });
      const evs = r.phases.flatMap((p) => p.events).filter((e) => !e.note);
      const pick = [evs.find((e) => e.cat === 'kill' || e.cat === 'death'), evs.find((e) => e.cat === 'ally'), evs.find((e) => e.cat === 'item' || e.cat === 'none')].filter(Boolean);
      sample = pick.map((e) => evHTML(e, r.tributes, t, false, true)).join('');
    } catch (e) { sample = ''; }
    $('#arenaPreview').innerHTML =
      '<div class="apv-banner" aria-hidden="true">' + ART.scene(t.id) + '</div>' +
      '<div class="apv-head"><span class="gl" aria-hidden="true">' + ART.icon(t.id, 28) + '</span><div><div class="eyebrow">' + pt.events + ' eventi · ' + pt.disasters + ' disastri' + (t.soft ? ' · nessuno muore' : '') + '</div><h2>' + esc(t.name) + '</h2></div></div>' +
      '<p class="muted">' + esc(t.intro.b) + ' ' + esc(t.tag) + '</p>' +
      '<div class="apv-grid">' +
        '<div><h3>Luoghi</h3><ul>' + t.lex.luogo.map((x) => '<li>' + esc(strip(x)) + '</li>').join('') + '</ul></div>' +
        '<div><h3>' + (t.soft ? 'Armi improprie' : 'Armi') + '</h3><ul>' + t.lex.arma.slice(0, 6).map((x) => '<li>' + esc(strip(x)) + '</li>').join('') + '</ul></div>' +
        '<div><h3>Pericoli</h3><ul>' + t.lex.mostro.map((x) => '<li>' + esc(strip(x)) + '</li>').join('') + '</ul></div>' +
      '</div>' +
      rulesHTML(t) + itemsHTML(t) +
      '<div><h3 class="sub" style="margin-bottom:8px">Alcuni disastri</h3><div class="chips">' + dz.slice(0, 10).map((x) => '<span class="chip dim">' + esc(x) + '</span>').join('') + '<span class="chip dim">e altri ' + Math.max(0, dz.length - 10) + '</span></div></div>' +
      (sample ? '<div class="sample"><h3 class="sub">Un assaggio' + (S.cast.length >= 4 ? ' con il tuo cast' : '') + '</h3>' + sample + '</div>' : '');
    AN.field($('#arenaPreview .apv-banner'), t.id, { intensity: 1.2 });
    const ap = $('#arenaPreview'); ap.classList.remove('swap'); void ap.offsetWidth; ap.classList.add('swap');
  }
  function itemsHTML(t) {
    const names = Object.assign({}, (ITM.names || {})._ || {}, (ITM.names || {})[t.id] || {});
    const lex = Object.assign({}, D.lexDefault || {}, t.lex || {});
    (D.packs || []).forEach((pk) => { if (pk.lex && (pk.theme === t.id)) Object.assign(lex, pk.lex); });
    const ex = (k) => (names[k] || (k === 'med' ? ['un kit medico'] : k === 'trap' ? ['una trappola'] : lex[k]) || []).slice(0, 2).map((x) => x.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '')).join(', ');
    return '<details class="items-arena"><summary><span class="eyebrow">Zaino</span><b>Gli oggetti e a cosa servono</b><span class="help">' + (ITM.order || []).length + ' tipi</span></summary><div class="ia-grid">' +
      (ITM.order || []).map((k) => { const ty = ITM.types[k]; return '<div class="ia"><span class="bic">' + (ITIC[k] || '') + '</span><div><b>' + esc(ty.label) + '</b>' + (ex(k) ? '<span class="iaex">' + esc(ex(k)) + '</span>' : '') + '<p>' + esc(ty.desc) + '</p></div></div>'; }).join('') + '</div></details>';
  }
  function rulesHTML(t) {
    const A = arenaOf(t.id); if (!A.rule) return '';
    const m = A.meter, lb = vitLabels(t);
    return '<div class="rules-arena"><div class="ra-head"><span class="eyebrow">Regole dell\'arena</span><h3>' + esc(A.rule) + '</h3></div><p>' + esc(A.desc) + '</p>' +
      '<div class="ra-grid"><div><h4>Contano di più</h4><div class="chips">' + (A.key || []).map((k, i) => '<span class="chip' + (i === 0 ? ' st' : '') + '">' + esc(ECO.attrNames[k] || k) + '</span>').join('') + '</div></div>' +
      '<div><h4>Da tenere d\'occhio</h4><div class="chips"><span class="chip dim">' + esc(lb.hp) + '</span><span class="chip dim">' + esc(lb.en) + '</span><span class="chip dim">' + esc(lb.mo) + '</span><span class="chip dim">' + esc(lb.food) + '</span>' + (m ? '<span class="chip st" title="' + esc(m.desc) + '">' + esc(m.name) + '</span>' : '') + '</div></div></div>' +
      (m ? '<p class="help"><b>' + esc(m.name) + ':</b> ' + esc(m.desc) + '</p>' : '') +
      ((A.meteo || []).length ? '<div><h4>Meteo possibile</h4><div class="chips">' + A.meteo.map((x) => '<span class="chip dim" title="' + esc(x.d) + '">' + esc(x.n) + '</span>').join('') + '</div></div>' : '') + '</div>';
  }
  function renderStartSum() {
    const t = THEMES[S.settings.theme];
    $('#startSum').innerHTML = '<b>' + S.cast.length + '</b> concorrenti · <b>' + esc(t.name) + '</b> · difficoltà <b>' + (DIFFS.find((d) => d[0] === S.settings.difficulty) || DIFFS[1])[1].toLowerCase() + '</b>' + (S.settings.adult && !t.noAdult ? ' · <span class="tag18">18+</span>' : '');
    $('#startMsg').textContent = S.cast.length < 2 ? 'Servono almeno 2 concorrenti: aggiungili nella sezione Concorrenti, oppure prova una partita lampo.' : '';
    $('#btnStart').disabled = S.cast.length < 2;
  }
  $('#themeList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-theme]'); if (!b) return;
    S.settings.theme = b.dataset.theme; save(); setHue(S.settings.theme);
    $$('#themeList [data-theme]').forEach((x) => x.setAttribute('aria-checked', x === b));
    renderPreview(); renderStartSum(); updatePreview(); renderAdult();
  });
  $('#diffSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.difficulty = b.dataset.v; save(); $$('#diffSeg button').forEach((x) => x.setAttribute('aria-checked', x === b)); renderStartSum(); });
  $('#maxDays').addEventListener('input', (e) => { S.settings.maxDays = +e.target.value; $('#maxDaysOut').textContent = e.target.value; save(); });
  $('#seed').addEventListener('input', (e) => { S.settings.seed = e.target.value.slice(0, 60); save(); });
  $('#seedNew').addEventListener('click', () => { S.settings.seed = newSeed(); $('#seed').value = S.settings.seed; save(); });
  $('#teamsAllied').addEventListener('change', (e) => { S.settings.teamsAllied = e.target.checked; save(); });
  function renderAdult() {
    const t = THEMES[S.settings.theme], pt = COUNTS.perTheme[t.id];
    $('#adult').checked = !!S.settings.adult; $('#adultConfirm').hidden = true;
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
    const n = +$('#cN').value, ls = 'ABCD'.slice(0, n).split('');
    const prevDies = $$('#cDies input:checked').map((x) => x.value), prevK = $('#cKiller').value;
    $('#cDies').innerHTML = ls.map((l) => '<label for="cd-' + l + '"><input type="checkbox" id="cd-' + l + '" value="' + l + '"' + (prevDies.includes(l) ? ' checked' : '') + '>' + l + '</label>').join('');
    $('#cKiller').innerHTML = '<option value="">Nessuno</option>' + ls.map((l) => '<option' + (prevK === l ? ' selected' : '') + '>' + l + '</option>').join('');
    updatePreview();
  }
  const readCustom = () => ({ phase: $('#cPhase').value, n: +$('#cN').value, text: $('#cText').value.trim(), dies: $$('#cDies input:checked').map((x) => x.value), killer: $('#cKiller').value });
  function validateCustom(c) {
    if (!c.text) return 'Scrivi il testo dell\'evento.';
    for (const l of 'ABCD'.slice(0, c.n)) if (!c.text.includes('{' + l + '}')) return 'Con ' + c.n + ' concorrenti il testo deve nominare anche {' + l + '}.';
    if (c.killer && !c.dies.filter((x) => x !== c.killer).length) return 'Hai scelto chi uccide: indica anche chi muore.';
    if (c.killer && c.dies.includes(c.killer)) return 'Chi uccide non può morire nello stesso evento.';
    try { L.parseLine(L.customToLine(c), 'custom'); } catch (e) { return e.message; }
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
      ? S.custom.map((c) => '<div class="citem" data-id="' + esc(c.id) + '"><span class="tag">' + PH_LABEL[c.phase] + ' · ' + c.n + (c.dies.length ? ' · letale' : '') + '</span><span class="txt">' + esc(c.text) + '</span><button class="x" type="button" data-act="cdel" aria-label="Elimina evento">✕</button></div>').join('')
      : '<p class="help">Nessun evento personalizzato. Quelli che aggiungi escono più spesso di quelli di base.</p>';
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
  function runSim(cfg) {
    try { SIM = L.simulate(cfg); } catch (e) { toast('Simulazione non riuscita: ' + e.message); return false; }
    BY = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
    S.run = { cfg, phase: 0, seen: 0 }; lastRendered = -1; save();
    if (location.hash === '#diretta') route(); else location.hash = '#diretta';
    return true;
  }
  function startRun(seed) {
    if (S.cast.length < 2) { toast('Servono almeno 2 concorrenti.'); location.hash = '#cast'; return; }
    S.cast.forEach((t, i) => { if (!t.name.trim()) t.name = 'Concorrente ' + (i + 1); });
    S.settings.seed = seed || S.settings.seed || newSeed();
    runSim({ cast: JSON.parse(JSON.stringify(S.cast)), theme: S.settings.theme, difficulty: S.settings.difficulty, seed: S.settings.seed, maxDays: S.settings.maxDays, teamsAllied: S.settings.teamsAllied, teamWin: S.settings.teamWin, custom: S.custom.slice(), adult: !!S.settings.adult });
  }
  $('#btnStart').addEventListener('click', () => startRun());

  /* =============== DIRETTA =============== */
  function evHTML(e, tributes, theme, anim, plain, delay) {
    const by = tributes ? Object.fromEntries(tributes.map((t) => [t.id, t])) : BY;
    if (e.note) return '<div class="ev note' + (e.meteo ? ' meteo' : '') + (anim ? ' in' : '') + '" style="--d:' + (delay || 0) + 'ms"><p>' + e.html + '</p></div>';
    const cat = e.cat || 'none';
    const lbl = CAT[cat][theme.soft ? 1 : 0];
    const avs = '<span class="avs">' + e.ids.slice(0, 4).map((id) => avHTML(by[id], { dead: e.deaths.includes(id), btn: !plain })).join('') + '</span>';
    const chip = lbl ? '<span class="cat">' + IC[cat] + (e.deaths.length > 1 && (cat === 'kill' || cat === 'death') ? e.deaths.length + ' ' + (theme.soft ? 'fuori' : 'morti') : lbl) + '</span>' : '<span></span>';
    const fix = (h) => (plain ? h.replace(/<b class="nm"[^>]*>/g, '<b>') : linkify(h));
    const why = e.test ? '<span title="Tiro ' + e.test.roll + ' contro soglia ' + e.test.dc + '">Prova di ' + esc(ATTRN[e.test.attr] || e.test.attr) + ' · <span class="dice"><span class="roll">' + e.test.roll + '</span>/' + e.test.dc + '</span> · ' + (e.test.pass ? 'superata' : 'fallita') + '</span>' : e.sponsor ? 'Sponsor' : e.whyTxt ? esc(e.whyTxt) : whyLabel(e, theme);
    const echo = (e.echo || []).length ? '<ul class="echo">' + e.echo.map((x) => '<li class="' + (x.cls || '') + '">' + fix(x.html) + '</li>').join('') + '</ul>' : '';
    return '<div class="ev' + (e.deaths.length ? ' lethal' : '') + (anim ? ' in fx-' + cat + (e.sponsor ? ' fx-sponsor' : '') : '') + '" style="--cc:var(--c-' + cat + ');--d:' + (delay || 0) + 'ms">' + avs + '<div class="evbody">' + (why ? '<span class="why' + (e.test ? (e.test.pass ? ' ok' : ' ko') : '') + '">' + why + '</span>' : '') + '<p>' + fix(e.html) + '</p>' + echo + '</div>' + chip + '</div>';
  }
  function renderLive(fromRoute) {
    $('#liveEmpty').hidden = !!SIM; $('#liveBody').hidden = !SIM;
    if (!SIM) return;
    const theme = THEMES[SIM.theme], soft = !!theme.soft;
    const P = SIM.phases, i = Math.max(0, Math.min(P.length - 1, S.run.phase || 0));
    S.run.phase = i; S.run.seen = Math.max(S.run.seen || 0, i);
    const ph = P[i], total = SIM.tributes.length;
    const forward = !fromRoute && i === lastRendered + 1;
    lastRendered = i;

    $('#bcArena').innerHTML = ART.icon(theme.id, 14) + ' ' + esc(theme.name) + (SIM.adult ? ' <span class="bc-18">18+</span>' : '');
    const bcs = $('#bcScene'); if (bcs.dataset.t !== theme.id) { bcs.innerHTML = ART.scene(theme.id); bcs.dataset.t = theme.id; }
    const prevAlive = i > 0 ? P[i - 1].snap.alive.length : total;
    AN.field(bcs, theme.id, { intensity: AN.intensityFor(ph.kind, ph.snap.alive.length / total) });
    AN.phaseFx($('.broadcast'), ph.kind, theme.id, forward, { deaths: ph.kind === 'fallen' ? ph.deaths.length : 0 });
    $('#bcPhase').textContent = 'Fase ' + (i + 1) + ' / ' + P.length;
    $('#bcKind').textContent = KIND[ph.kind] + (ph.day ? ' · giorno ' + ph.day : '') + (ph.meteo && ph.meteo.n ? ' · ' + ph.meteo.n : '');
    $('#phTitle').textContent = ph.title; if (forward) AN.kinetic($('#phTitle'), ph.kind === 'dis' ? 'shake' : ph.kind === 'n' ? 'fade' : 'drop');
    $('#phIntro').textContent = ph.intro || '';
    if (forward) AN.countTo($('#aliveBig'), ph.snap.alive.length, { from: prevAlive, dur: 1100 }); else $('#aliveBig').textContent = ph.snap.alive.length; $('#aliveTot').textContent = '/' + total;
    $('#aliveLbl').textContent = soft ? 'ancora in gioco' : 'superstiti';
    const deadNow = SIM.tributes.filter((t) => !t.alive && t.deathPhase <= i).sort((a, b) => a.order - b.order);
    const newly = new Set(ph.kind === 'fallen' ? [] : ph.events.flatMap((e) => e.deaths));
    $('#tally').innerHTML = deadNow.map((t) => '<i class="d' + (newly.has(t.id) && forward ? ' new' : '') + '" title="' + esc(t.name) + '"></i>').join('') + '<i></i>'.repeat(total - deadNow.length);

    // timeline per giorno
    const days = [];
    P.forEach((p, k) => { const d = p.day || 1; let g = days.find((x) => x.d === d); if (!g) days.push((g = { d, ks: [] })); g.ks.push(k); });
    $('#timeline').innerHTML = days.map((g) => '<div class="tday"><span>G' + g.d + '</span><div>' + g.ks.map((k) => {
      const p = P[k]; const dn = p.kind === 'fallen' ? p.deaths.length : p.events.reduce((s, e) => s + e.deaths.length, 0);
      const seen = k <= (S.run.seen || 0);
      return '<button type="button" class="tph' + (k === i ? ' cur' : seen ? ' seen' : ' locked') + '" data-k="' + k + '" title="' + esc(p.title) + '" aria-label="Fase ' + (k + 1) + ': ' + esc(p.title) + '">' + IC[p.kind] + (dn && seen && p.kind !== 'fallen' ? '<span class="dn">' + dn + '</span>' : '') + '</button>';
    }).join('') + '</div></div>').join('');
    const cur = $('#timeline .tph.cur'); if (cur) { const tl = $('#timeline'); tl.scrollLeft = Math.max(0, cur.offsetLeft - tl.clientWidth / 2); }

    // contenuto
    if (ph.kind === 'fallen') {
      $('#phBody').innerHTML = '<div class="memorial' + (forward ? ' rise' : '') + '"><h2>' + (soft ? 'Fuori dai giochi' : 'In memoria') + '</h2>' +
        (ph.deaths.length ? '<div class="memgrid">' + ph.deaths.map((id) => { const t = BY[id]; return '<button type="button" class="mem" data-prof="' + esc(id) + '">' + avHTML(t, { dead: true }) + '<b>' + esc(t.name) + '</b><small>Squadra ' + t.team + (t.killerIds.length ? '<br>per mano di ' + esc(t.killerIds.map((k) => BY[k].name).join(', ')) : '<br>vittima dell\'arena') + '</small><span class="mono">' + t.kills + ' ' + (soft ? 'elim.' : 'ucc.') + '</span></button>'; }).join('') + '</div>' : '<div class="emptyday">' + esc(ph.intro) + '</div>') + '</div>';
    } else {
      $('#phBody').innerHTML = ph.events.map((e, k) => evHTML(e, null, theme, forward, false, Math.min(k * 90, 1800))).join('');
    }
    renderSide(i);
    if (forward && !AN.reduced && ph.kind !== 'fallen') {
      const cards = $$('#phBody .ev');
      ph.events.forEach((e, k) => {
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
    const theme = THEMES[SIM.theme], ph = SIM.phases[i], soft = !!theme.soft;
    $$('.stabs button').forEach((b) => b.setAttribute('aria-selected', b.dataset.s === sideTab));
    const aliveSet = new Set(ph.snap.alive);
    let h = '';
    if (sideTab === 'map') {
      const zones = theme.lex.luogo.map((z) => z.replace(/^(il |lo |la |l'|i |gli |le )/i, ''));
      const hot = {};
      ph.events.forEach((e) => e.deaths.length && e.ids.forEach((id) => (hot[ph.snap.zones[id]] = 1)));
      const ZP = arenaOf(theme.id).zones || [], shut = new Set(ph.snap.closed || []);
      const dots = (v) => { const n = v >= 1.35 ? 3 : v >= 0.95 ? 2 : 1; return '<b class="zl" aria-label="' + ['bassa', 'media', 'alta'][n - 1] + '">' + '●'.repeat(n) + '<span>' + '●'.repeat(3 - n) + '</span></b>'; };
      h = '<div class="map">' + zones.map((z, zi) => {
        const here = ph.snap.alive.filter((id) => ph.snap.zones[id] === zi);
        const p = ZP[zi] || [1, 1, 0.5];
        return '<div class="zone' + (hot[zi] ? ' hot' : '') + (shut.has(zi) ? ' closed' : '') + '"><span class="zn"><span>' + esc(z) + '</span></span><div class="dots">' + here.map((id) => avHTML(BY[id], { btn: true })).join('') + '</div>' +
          '<span class="zprops" title="Risorse e pericolo della zona"><span>risorse ' + dots(p[0]) + '</span><span>pericolo ' + dots(p[1]) + '</span>' + (shut.has(zi) ? '<span class="ztag">tempesta</span>' : '') + '</span></div>';
      }).join('') + '</div><p class="help" style="margin-top:10px">Le zone ricche danno più cibo, quelle pericolose più agguati' + (shut.size ? '; in grigio quelle inghiottite dalla tempesta' : '') + '. Tocca un volto per aprire la scheda.</p>';
    } else if (sideTab === 'fallen') {
      const dead = SIM.tributes.filter((t) => !t.alive && t.deathPhase <= i).sort((a, b) => b.order - a.order);
      h = dead.length ? '<div class="plist">' + dead.map((t) => '<button type="button" class="prow" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: true }) + '<span style="min-width:0"><span class="pn">' + esc(t.name) + '</span><span class="ps">' + (t.killerIds.length ? 'per mano di ' + esc(t.killerIds.map((k) => BY[k].name).join(', ')) + (causeTxt(t, theme) ? ' · ' + causeTxt(t, theme) : '') : causeTxt(t, theme) ? 'per ' + causeTxt(t, theme) : 'vittima dell\'arena') + '</span></span><span class="pk">G' + t.deathDay + '</span></button>').join('') + '</div>' : '<p class="help">Ancora nessuno.</p>';
    } else if (sideTab === 'alive') {
      const al = SIM.tributes.filter((t) => aliveSet.has(t.id)).sort((a, b) => (ph.snap.kills[b.id] || 0) - (ph.snap.kills[a.id] || 0));
      h = '<div class="plist">' + al.map((t) => {
        const st = ph.snap.st[t.id] || [], inv = ph.snap.inv[t.id] || [];
        const m = (ph.snap.mind || {})[t.id], g = m && (MND.goals || {})[m.g];
        const sub = [st.length ? st.map((s) => L.STATUS_LABEL[s] || s).join(', ') : 'in forma', g && !g.secret && m.g !== 'sopravvivere' ? goalLabel(m) : '', inv.length ? plural(inv.length, 'oggetto', 'oggetti') : ''].filter(Boolean).join(' · ');
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
      const sec = (title, rows, empty) => '<div class="agroup"><h4>' + title + ' · ' + rows.length + '</h4>' + (rows.length ? '<div class="rel">' + rows.join('') + '</div>' : '<p class="help">' + empty + '</p>') + '</div>';
      h = (gs.length ? gs.map((g, k) => '<div class="agroup"><h4>Alleanza ' + (k + 1) + ' · ' + g.length + '</h4><div class="row">' + g.map(av).join('') + '</div></div>').join('') : '<p class="help" style="margin-bottom:10px">Nessuna alleanza attiva.</p>') +
        sec('Coppie', couples.map(([a, b]) => '<div class="relrow">' + av(a) + '<span class="arrow" style="color:var(--c-love)">♥</span>' + av(b) + '<span class="lbl">' + esc(BY[a].name) + ' e ' + esc(BY[b].name) + '</span></div>'), 'Ancora nessuna coppia.') +
        sec('Vendette giurate', grudges.slice(0, 14).map(([a, b, why, v]) => '<div class="relrow">' + av(a) + '<span class="arrow">→</span>' + av(b) + '<span class="lbl">' + whyTxt(why, v) + '</span></div>'), 'Nessuno ha ancora giurato vendetta.') +
        sec('Debiti', debts.slice(0, 10).map(([a, b]) => '<div class="relrow">' + av(a) + '<span class="lbl">deve un favore a</span>' + av(b) + '</div>'), 'Nessun debito in sospeso.') +
        (solo.length ? '<div class="agroup"><h4>Senza alleati · ' + solo.length + '</h4><div class="row">' + solo.map(av).join('') + '</div></div>' : '');
    }
    $('#sideBody').innerHTML = h;
  }
  $('.stabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b || !SIM) return; sideTab = b.dataset.s; renderSide(S.run.phase); });
  function go(k) { if (!SIM) return; S.run.phase = Math.max(0, Math.min(SIM.phases.length - 1, k)); renderLive(false); }
  function next() {
    if (!SIM) return;
    if (S.run.phase >= SIM.phases.length - 1) { stopPlay(); location.hash = '#esito'; return; }
    go(S.run.phase + 1);
    if (S.run.phase >= SIM.phases.length - 1) stopPlay();
    if (window.scrollY > 300 && !playTimer) $('.broadcast').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
  function syncPlay() { $('#playIcon').innerHTML = playTimer ? IC.pause : IC.play; $('#playBtn').setAttribute('aria-label', playTimer ? 'Pausa' : 'Riproduci'); }
  function stopPlay() { if (playTimer) { clearInterval(playTimer); playTimer = null; } if ($('#playIcon')) syncPlay(); }
  function startPlay() { stopPlay(); playTimer = setInterval(next, SPEED[S.settings.speed] || 3800); syncPlay(); }
  $('#nextBtn').addEventListener('click', next);
  $('#prevBtn').addEventListener('click', () => { stopPlay(); lastRendered = -2; go(S.run.phase - 1); });
  $('#playBtn').addEventListener('click', () => { if (playTimer) return stopPlay(); if (S.run.phase >= SIM.phases.length - 1) go(0); startPlay(); next(); });
  $('#speedSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.speed = b.dataset.v; save(); $$('#speedSeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); if (playTimer) startPlay(); });
  $('#timeline').addEventListener('click', (e) => { const b = e.target.closest('.tph'); if (!b) return; stopPlay(); lastRendered = -2; go(+b.dataset.k); });
  document.addEventListener('keydown', (e) => {
    if ($('#v-diretta').hidden || /input|textarea|select/i.test(e.target.tagName) || $$('dialog').some((d) => d.open)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); lastRendered = -2; go(S.run.phase - 1); }
    else if (e.key === ' ' && e.target === document.body) { e.preventDefault(); $('#playBtn').click(); }
  });

  /* =============== SCHEDA CONCORRENTE =============== */
  function openProfile(id) {
    const t = BY[id]; if (!t) return;
    const theme = THEMES[SIM.theme], soft = !!theme.soft;
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
          '<div style="flex:1;min-width:140px"><div class="sub" style="margin-bottom:6px">Condizioni</div><div class="chips">' + (st.length ? st.map((s) => '<span class="chip st">' + esc(L.STATUS_LABEL[s] || s) + '</span>').join('') : '<span class="chip dim">In forma</span>') + '</div></div>' +
          '</div>' +
          '<div><div class="sub" style="margin-bottom:8px">Zaino · ' + plural(inv.length, 'oggetto', 'oggetti') + '</div>' + bagHTML(inv, theme) + '</div>' +
          '<div><div class="sub" style="margin-bottom:6px">Alleati</div><div class="row">' + (ally.length ? ally.map((x) => avHTML(BY[x], { btn: true })).join('') : '<span class="help">Nessuno, per ora.</span>') + '</div></div>' : '') +
        relHTML(id, snap, dead, atRes) +
        (!dead ? peopleHTML(t, snap, i) : '') +
        diaryHTML(t, dead ? t.deathPhase : i) +
        attrHTML(t, theme) +
        '<div><div class="sub" style="margin-bottom:8px">La sua storia' + (atRes ? '' : ' finora') + '</div><div class="ptl">' + (hist.length ? hist.map(({ e, p }) => '<div class="it" style="--cc:var(--c-' + (e.cat || 'none') + ')"><span>' + (p.kind === 'b' ? 'Inizio' : 'G' + p.day + ' ' + (p.kind === 'n' ? 'notte' : p.kind === 'd' ? 'giorno' : KIND[p.kind].toLowerCase())) + '</span><p>' + linkify(e.html) + '</p></div>').join('') : '<p class="help">Nessun evento ancora.</p>') + '</div></div>' +
      '</div>';
    if (!$('#profDlg').open) $('#profDlg').showModal();
    $('#profDlg').scrollTop = 0;
  }

  function attrHTML(t, theme) {
    if (!t.attr) return '';
    const tests = t.tests ? ' · prove superate ' + t.testsPassed + ' su ' + t.tests : '';
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
    if (r.tr) badges.push('<span class="badge2 hot">Traditor' + G3(t.gender, 'e', 'e', 'ə') + '</span>');
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
  function ecoSummary(st, theme) {
    if (!st.causes) return '';
    const m = arenaOf(theme.id).meter;
    const lbl = { wound: 'per le ferite', starve: 'di fame', exhaust: 'di sfinimento', poison: 'di veleno', sick: 'di malattia', infect: 'trasformati', storm: 'nella tempesta', beast: 'aggrediti nella notte', trap: 'in trappola', accident: 'per incidente', meter: m ? 'per ' + m.name.toLowerCase() : 'per l\'arena' };
    const c = Object.entries(st.causes).filter(([k]) => lbl[k]).map(([k, v]) => v + ' ' + lbl[k]);
    const bits = [];
    if (st.shared) bits.push(plural(st.shared, 'pasto condiviso', 'pasti condivisi'));
    if (st.nursed) bits.push(plural(st.nursed, 'ferito curato', 'feriti curati'));
    if (st.foraged) bits.push(plural(st.foraged, 'ricerca di cibo riuscita', 'ricerche di cibo riuscite'));
    if (st.trapsSet) bits.push(plural(st.trapsSet, 'trappola piazzata', 'trappole piazzate') + ' (' + (st.trapHits || 0) + ' scattate)');
    if (st.beasts) bits.push(plural(st.beasts, 'aggressione notturna', 'aggressioni notturne'));
    if (st.infected) bits.push(st.infected + ' contagiati, ' + (st.cured || 0) + ' curati in tempo');
    if (st.tough) bits.push(plural(st.tough, 'sopravvissuto per un soffio', 'sopravvissuti per un soffio'));
    if (st.broken) bits.push(plural(st.broken, 'arma rotta', 'armi rotte'));
    if (st.looted) bits.push(plural(st.looted, 'oggetto razziato', 'oggetti razziati'));
    if (st.trades) bits.push(plural(st.trades, 'scambio', 'scambi'));
    const met = (st.meteo || []).map((x) => 'G' + x.day + ' ' + x.n);
    if (!c.length && !bits.length && !met.length) return '';
    return '<p class="help eco-sum">' + (c.length ? '<b>Uccisi dall\'arena:</b> ' + esc(c.join(', ')) + '. ' : '') + (bits.length ? '<b>Conseguenze:</b> ' + esc(bits.join(' · ')) + '. ' : '') + (met.length ? '<b>Meteo:</b> ' + esc(met.join(' · ')) + '.' : '') + '</p>';
  }
  function renderResults() {
    $('#resEmpty').hidden = !!SIM; $('#resBody').hidden = !SIM;
    if (!SIM) return;
    const theme = THEMES[SIM.theme], soft = !!theme.soft, st = SIM.stats;
    const W = SIM.winners.map((id) => BY[id]);
    const kN = (n) => n + ' ' + (soft ? (n === 1 ? 'eliminazione' : 'eliminazioni') : (n === 1 ? 'uccisione' : 'uccisioni'));
    let hero;
    if (W.length === 1) {
      const w = W[0];
      hero = '<div class="winhero"><div class="wscene" aria-hidden="true">' + ART.scene(theme.id) + '</div>' + avHTML(w, { btn: true }) + '<div style="min-width:0"><div class="eyebrow">' + ART.icon(theme.id, 13) + ' ' + esc(theme.name) + ' · ' + plural(SIM.days, 'giorno', 'giorni') + ' · ' + SIM.tributes.length + ' concorrenti</div>' +
        '<h1>' + esc(w.name) + '</h1><p><b style="color:var(--screen-ink)">' + G3(w.gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi.</b> Squadra ' + w.team + (w.traits.length ? ' · ' + w.traits.map((x) => TRAITS[x].name).join(', ') : '') + '.</p>' +
        '<div class="wstats"><div><b>' + w.kills + '</b><span>' + (soft ? 'eliminazioni' : 'uccisioni') + '</span></div><div><b>' + w.events + '</b><span>eventi vissuti</span></div><div><b>' + w.alliancesFormed + '</b><span>alleanze</span></div><div><b>' + w.items + '</b><span>oggetti trovati</span></div></div></div></div>';
    } else if (W.length > 1) {
      hero = '<div class="winhero" style="grid-template-columns:minmax(0,1fr)"><div class="wscene" aria-hidden="true">' + ART.scene(theme.id) + '</div><div><div class="eyebrow">' + ART.icon(theme.id, 13) + ' ' + esc(theme.name) + ' · ' + plural(SIM.days, 'giorno', 'giorni') + '</div><h1>Vince la squadra ' + W[0].team + '</h1><div class="teamavs">' + W.map((w) => avHTML(w, { btn: true })).join('') + '</div><p style="margin-top:12px">' + W.map((w) => esc(w.name) + ' (' + kN(w.kills) + ')').join(' · ') + '</p></div></div>';
    } else hero = '<div class="winhero" style="grid-template-columns:minmax(0,1fr)"><div><h1>Nessun superstite</h1><p>L\'arena non ha risparmiato nessuno.</p></div></div>';

    const ranked = SIM.tributes.slice().sort((a, b) => a.rank - b.rank || b.kills - a.kills);
    const podiumT = ranked.slice(0, 3);
    const podium = podiumT.length >= 3 ? '<div class="podium">' + [podiumT[1], podiumT[0], podiumT[2]].map((t, k) => { const p = [2, 1, 3][k]; return '<button type="button" class="pod p' + p + '" data-prof="' + esc(t.id) + '">' + avHTML(t, { dead: !t.alive }) + '<b>' + esc(t.name) + '</b><small>' + kN(t.kills) + (t.alive ? '' : ' · G' + t.deathDay) + '</small><span class="step">' + p + '</span></button>'; }).join('') + '</div>' : '';

    const awards = [];
    const maxBy = (f) => SIM.tributes.slice().sort((a, b) => f(b) - f(a) || a.rank - b.rank)[0];
    const killer = maxBy((t) => t.kills); if (killer && killer.kills) awards.push([soft ? 'La più temibile' : 'Il più letale', killer, kN(killer.kills)]);
    if (st.firstBlood) { const v = BY[st.firstBlood.victim]; awards.push([soft ? 'Prima a uscire' : 'Primo sangue', v, st.firstBlood.killers.length ? 'per mano di ' + st.firstBlood.killers.map((k) => BY[k].name).join(', ') : 'vittima dell\'arena']); }
    const trait = maxBy((t) => t.betrayals); if (trait && trait.betrayals) awards.push(['Il voltagabbana', trait, plural(trait.betrayals, 'tradimento', 'tradimenti')]);
    const soc = maxBy((t) => t.alliancesFormed); if (soc && soc.alliancesFormed) awards.push(['Il diplomatico', soc, plural(soc.alliancesFormed, 'alleanza stretta', 'alleanze strette')]);
    const rev = maxBy((t) => t.revenges); if (rev && rev.revenges) awards.push(['Il vendicatore', rev, plural(rev.revenges, 'vendetta compiuta', 'vendette compiute')]);
    const fam = maxBy((t) => t.fame); if (fam && fam.fame >= 3) awards.push(['Beniamino del pubblico', fam, fam.fame + ' punti di fama']);
    const sav = maxBy((t) => t.saves); if (sav && sav.saves) awards.push(['L\'angelo custode', sav, plural(sav.saves, 'vita salvata o curata', 'vite salvate o curate')]);
    const lucky = maxBy((t) => t.amulets); if (lucky && lucky.amulets) awards.push(['Miracolat' + G3(lucky.gender, 'o', 'a', 'ə'), lucky, 'salvat' + G3(lucky.gender, 'o', 'a', 'ə') + ' da un portafortuna']);
    const ab = maxBy((t) => t.testsPassed * 10 - (t.tests - t.testsPassed)); if (ab && ab.testsPassed) awards.push(['Il più abile', ab, ab.testsPassed + ' prove superate su ' + ab.tests]);
    const hunter = maxBy((t) => t.foraged || 0); if (hunter && hunter.foraged >= 2) awards.push([soft ? 'Lo scroccone' : 'Il cacciatore', hunter, plural(hunter.foraged, 'pasto procurato', 'pasti procurati')]);
    const nurse = maxBy((t) => t.nursed || 0); if (nurse && nurse.nursed) awards.push([soft ? 'La spalla' : 'L\'infermiere', nurse, plural(nurse.nursed, 'compagno rimesso in sesto', 'compagni rimessi in sesto')]);
    const trapper = maxBy((t) => (t.trapKills || 0) * 3 + (t.trapsSet || 0)); if (trapper && trapper.trapsSet) awards.push(['Il trappolaio', trapper, plural(trapper.trapsSet, 'trappola piazzata', 'trappole piazzate') + (trapper.trapKills ? ', ' + trapper.trapKills + ' a segno' : '')]);
    const merch = maxBy((t) => t.trades || 0); if (merch && merch.trades >= 2) awards.push(['Il mercante', merch, plural(merch.trades, 'scambio', 'scambi')]);
    const inv2 = maxBy((t) => t.crafts || 0); if (inv2 && inv2.crafts) awards.push(['L\'inventore', inv2, plural(inv2.crafts, 'oggetto costruito o modificato', 'oggetti costruiti o modificati')]);
    const heart = maxBy((t) => t.rejected || 0); if (heart && heart.rejected) awards.push(['Cuore infranto', heart, plural(heart.rejected, 'dichiarazione respinta', 'dichiarazioni respinte')]);
    const soul = maxBy((t) => (t.diary || []).filter((d) => d.k === 'segreto').length); if (soul && (soul.diary || []).some((d) => d.k === 'segreto')) awards.push(['Il più misterioso', soul, plural(soul.diary.filter((d) => d.k === 'segreto').length, 'segreto nel diario', 'segreti nel diario')]);
    const busy = maxBy((t) => t.events); if (busy) awards.push(['Sempre in mezzo', busy, plural(busy.events, 'evento vissuto', 'eventi vissuti')]);
    const loot = maxBy((t) => t.items); if (loot && loot.items) awards.push(['Il collezionista', loot, plural(loot.items, 'oggetto trovato', 'oggetti trovati')]);
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
    let lastDay = 0; P.forEach((p, k) => { if (p.day !== lastDay) { lastDay = p.day; ticks.push('<line x1="' + xs(k) + '" x2="' + xs(k) + '" y1="' + pt + '" y2="' + (Hd - pb) + '" stroke="var(--line)" stroke-dasharray="2 3"/><text x="' + (xs(k) + 3) + '" y="' + (Hd - 8) + '">G' + p.day + '</text>'); } });
    const yl = [total, Math.round(total / 2), 0].map((n) => '<text x="' + (pl - 6) + '" y="' + (ys(n) + 4) + '" text-anchor="end">' + n + '</text><line x1="' + pl + '" x2="' + (Wd - pr) + '" y1="' + ys(n) + '" y2="' + ys(n) + '" stroke="var(--line)"/>').join('');
    const chart = '<div class="chart"><svg viewBox="0 0 ' + Wd + ' ' + Hd + '" role="img" aria-label="Superstiti fase per fase">' + yl + ticks.join('') + '<path d="' + area + '" fill="var(--accent)" fill-opacity=".14"/><path d="' + path + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="' + pts[pts.length - 1][0] + '" cy="' + pts[pts.length - 1][1] + '" r="5" fill="var(--accent)"/></svg></div>';

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
      '<td class="n">' + (t.alive ? '–' : 'G' + t.deathDay) + '</td><td class="cause">' + (t.alive ? '' : linkify(t.deathHtml)) + '</td></tr>').join('');
    const killers = SIM.tributes.filter((t) => t.kills > 0).sort((a, b) => b.kills - a.kills).slice(0, 8);
    const maxK = Math.max(1, ...killers.map((t) => t.kills));
    const kbars = killers.length ? killers.map((t) => '<div class="bar"><span class="lbl">' + esc(t.name) + '</span><span class="tr"><i style="width:' + (100 * t.kills / maxK) + '%;background:' + esc(t.color) + '"></i></span><span class="v">' + t.kills + '</span></div>').join('') : '<p class="help">Nessuno ha eliminato un rivale.</p>';

    $('#resBody').innerHTML = hero +
      '<div class="resactions"><button class="btn primary lg" type="button" id="rAgain">Rigioca con un nuovo seme</button><button class="btn" type="button" id="rCopy">Copia il riepilogo</button><a class="btn" href="#diretta">Rivedi la diretta</a><a class="btn" href="#cast">Nuova partita</a><span class="help mono">seme ' + esc(SIM.seed) + '</span></div>' +
      '<div class="resgrid"><div>' +
        (podium ? '<section class="block card"><h2>Il podio</h2>' + podium + '</section>' : '') +
        '<section class="block card"><h2>I premi della partita</h2>' + awardsH + '</section>' +
        '<section class="block card"><h2>Momenti salienti</h2>' + hlH + '</section>' +
        '<section class="block card"><h2>Classifica completa</h2><div class="tablewrap"><table><thead><tr><th>Pos.</th><th>Concorrente</th><th>Sq.</th><th>' + (soft ? 'Elim.' : 'Ucc.') + '</th><th>Per mano di</th><th>Giorno</th><th>Come è andata</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
      '</div><div>' +
        '<section class="block card"><h2>Superstiti nel tempo</h2>' + chart + '<p class="help" style="margin-top:8px">' + st.killDeaths + ' ' + (soft ? 'eliminati da un rivale' : 'morti per mano altrui') + ', ' + st.envDeaths + ' per colpa dell\'arena · ' + st.alliances + ' alleanze · ' + st.betrayals + ' tradimenti · ' + (st.revenges || 0) + ' vendette · ' + (st.couples || 0) + ' coppie · ' + (st.debtsRepaid || 0) + ' debiti saldati · ' + (st.amulets || 0) + ' salvataggi miracolosi · ' + (st.sponsors || 0) + ' doni degli sponsor · ' + (st.testsPassed || 0) + ' prove superate su ' + (st.tests || 0) + ' · ' + st.events + ' eventi.</p>' + ecoSummary(st, theme) + '</section>' +
        '<section class="block card"><h2>' + (soft ? 'Chi ha eliminato di più' : 'Chi ha ucciso di più') + '</h2><div class="bars">' + kbars + '</div></section>' +
        '<section class="block card posterbox"><h2>Locandina</h2><img id="posterImg" alt="Locandina della partita"><p class="help" style="margin-top:8px">Tieni premuto sull\'immagine, o clic destro, per salvarla.</p></section>' +
      '</div></div>';
    $('#rAgain').addEventListener('click', () => { const cfg = Object.assign({}, S.run.cfg, { seed: newSeed() }); runSim(cfg); });
    $('#rCopy').addEventListener('click', () => copyText(summaryText(), 'Riepilogo copiato negli appunti.'));
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
    const theme = THEMES[SIM.theme], W = SIM.winners.map((id) => BY[id]);
    const lines = ['LAST ONE STANDING · ' + theme.name, SIM.tributes.length + ' concorrenti · ' + SIM.days + ' giorni · seme ' + SIM.seed, ''];
    if (W.length === 1) lines.push(G3(W[0].gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi: ' + W[0].name + ' (' + W[0].kills + ')');
    else if (W.length) lines.push('Vince la squadra ' + W[0].team + ': ' + W.map((w) => w.name).join(', '));
    lines.push('', 'Classifica:');
    SIM.tributes.slice().sort((a, b) => a.rank - b.rank).forEach((t) => lines.push(t.rank + '. ' + t.name + ' · ' + t.kills + (t.alive ? '' : ' · ' + t.deathText)));
    return lines.join('\n');
  }
  async function drawPoster() {
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* niente */ }
    const theme = THEMES[SIM.theme], W = SIM.winners.map((id) => BY[id]), h = theme.hue;
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
    const disp = '"Big Shoulders Display", "Arial Narrow", sans-serif', mono = '"JetBrains Mono", monospace', body = 'Barlow, sans-serif';
    g.fillStyle = mute; g.font = '500 26px ' + mono; g.textAlign = 'left';
    g.fillText((theme.name + ' · ' + SIM.days + ' giorni · ' + total + ' concorrenti').toUpperCase(), 90, 120);
    g.fillStyle = acc; g.font = '900 118px ' + disp;
    g.fillText(W.length === 1 ? G3(W[0].gender, 'ULTIMO IN PIEDI', 'ULTIMA IN PIEDI', 'ULTIMƏ IN PIEDI') : W.length ? 'SQUADRA ' + W[0].team : 'NESSUN SUPERSTITE', 84, 236);
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
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '900 ' + (w.name.length > 14 ? 96 : 132) + 'px ' + disp;
      g.fillText(w.name.toUpperCase(), 540, 935);
      g.fillStyle = mute; g.font = '500 38px ' + body;
      g.fillText(w.kills + ' ' + (theme.soft ? (w.kills === 1 ? 'eliminazione' : 'eliminazioni') : (w.kills === 1 ? 'uccisione' : 'uccisioni')) + ' · squadra ' + w.team, 540, 998);
    } else if (W.length) {
      const r = Math.min(150, 420 / W.length);
      for (let k = 0; k < W.length; k++) await avatar(W[k], 540 + (k - (W.length - 1) / 2) * (r * 2.2), 560, r);
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '800 64px ' + disp;
      g.fillText(W.map((w) => w.name).join(' · ').toUpperCase().slice(0, 40), 540, 900);
    }
    g.textAlign = 'left';
    const top = SIM.tributes.filter((t) => t.kills > 0 && !t.alive).sort((a, b) => b.kills - a.kills).slice(0, 3);
    if (top.length) { g.fillStyle = mute; g.font = '500 23px ' + mono; g.fillText('I PIÙ PERICOLOSI TRA GLI SCONFITTI', 90, 1076); g.fillStyle = ink; g.font = '700 34px ' + body; g.fillText(top.map((t) => t.name + ' ' + t.kills).join('   ·   '), 90, 1124); }
    g.fillStyle = mute; g.font = '500 23px ' + mono;
    const wm = ART.assets.logo ? await loadImg(ART.assets.logo) : null;
    if (wm) { g.drawImage(wm, 660, 1236, 330, 330 * wm.height / wm.width); g.fillText('SEME ' + String(SIM.seed).toUpperCase().slice(0, 24), 90, 1282); }
    else g.fillText('LAST ONE STANDING · SEME ' + String(SIM.seed).toUpperCase().slice(0, 30), 90, 1282);
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
  function boot(hot) {
    const had = load();
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
    if (S.run && S.run.cfg) {
      try { SIM = L.simulate(S.run.cfg); BY = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])); } catch (e) { SIM = null; S.run = null; }
    }
    if (hot && typeof hot.phase === 'number' && S.run) S.run.phase = hot.phase;
    updateCounts();
    route();
  }
  const H = window.claude && window.claude.hot;
  if (H && typeof H.snapshot === 'function') { try { H.snapshot(() => ({ phase: S.run ? S.run.phase : 0 })); } catch (e) { /* niente */ } }
  if (H && typeof H.ready === 'function') H.ready(boot); else boot((H && H.data) || {});
})();
