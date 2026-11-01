/* Last One Standing — motore di simulazione deterministico.
 * Funziona sia nel browser (window.LOS) sia in Node (globalThis.LOS). */
(function (G) {
  'use strict';
  const D = G.LOS_DATA;

  /* ---------------- RNG con seme ---------------- */
  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seed) {
    const r = mulberry32(xmur3(String(seed))());
    return {
      f: r,
      int: (n) => Math.floor(r() * n),
      pick: (a) => a[Math.floor(r() * a.length)],
      chance: (p) => r() < p,
      shuffle(a) {
        const b = a.slice();
        for (let i = b.length - 1; i > 0; i--) {
          const j = Math.floor(r() * (i + 1));
          [b[i], b[j]] = [b[j], b[i]];
        }
        return b;
      },
      wpick(items, wf) {
        let tot = 0;
        const ws = items.map((it) => { const w = Math.max(0, wf(it) || 0); tot += w; return w; });
        if (tot <= 0) return null;
        let x = r() * tot;
        for (let i = 0; i < items.length; i++) { x -= ws[i]; if (x <= 0) return items[i]; }
        return items[items.length - 1];
      },
    };
  }

  /* ---------------- Parser del formato eventi ---------------- */
  const L = (c) => c.charCodeAt(0) - 65;
  const letters = (s) => [...s].map(L);
  const ITEMS = 'arma|cibo|med|trap|veleno|mappa|amuleto|esplosivo';
  const LEXKEYS = 'arma|cibo|luogo|mostro|trappola|rifugio|dono|amuleto|alcol|veleno|mappa|esplosivo';
  const LEX_RE = new RegExp('\\{(' + LEXKEYS + ')\\}', 'g');
  const POSS_RE = /\{(arma|amuleto|veleno|mappa|esplosivo|cibo|med|trap):([A-F])\}/g;
  const ID = (m) => [L(m)];

  function catOf(ev) {
    const has = (t) => ev.fx.some((f) => f.t === t);
    return ev.kills.some((k) => k.betray) ? 'betray' : ev.kills.length ? 'kill' : ev.dies.length ? 'death' :
      has('br') ? 'betray' : has('love') ? 'love' : has('al') ? 'ally' : has('cure') || has('save') ? 'heal' :
      has('status') || has('hit') ? 'hurt' : has('gain') || has('steal') || has('give') ? 'item' : 'none';
  }
  function parseLine(line, origin) {
    const bar = line.indexOf('|');
    if (bar < 0) throw new Error('Manca "|" in: ' + line);
    const head = line.slice(0, bar).trim().split(/\s+/);
    const text = line.slice(bar + 1).trim();
    const ev = { n: +head[0], text, kills: [], dies: [], req: [], fx: [], tags: [], w: 1, origin: origin || 'base', ok: { kills: [], dies: [], fx: [] }, ko: { kills: [], dies: [], fx: [] } };
    if (!(ev.n >= 1 && ev.n <= 6)) throw new Error('Numero di concorrenti non valido in: ' + line);
    let m;
    for (let tok of head.slice(1)) {
      let tgt = ev;
      if (/^(ok|ko):/.test(tok)) { tgt = tok[1] === 'k' ? ev.ok : ev.ko; tok = tok.slice(3); }
      if ((m = tok.match(/^test:([A-F])=(\w+?)(\d+)?$/))) { ev.test = { r: L(m[1]), attr: m[2], dc: m[3] ? +m[3] : 11 }; continue; }
      if ((m = tok.match(/^att:([A-F])([<>])(\w+?)(\d+)$/))) { ev.req.push({ t: 'att', r: ID(m[1]), op: m[2], attr: m[3], v: +m[4] }); continue; }
      if ((m = tok.match(/^(no)?trait:([A-F])=(\w+)$/))) { ev.req.push({ t: m[1] ? 'notrait' : 'trait', r: ID(m[2]), trait: m[3] }); continue; }
      if (tok[0] === '@') { ev.tags.push(tok.slice(1)); continue; }
      if (tok[0] === '*') { ev.w = parseFloat(tok.slice(1)); continue; }
      if ((m = tok.match(/^(k|tr):([A-F]+)>([A-F]+)$/))) {
        const k = { by: letters(m[2]), v: letters(m[3]), betray: m[1] === 'tr' };
        tgt.kills.push(k);
        if (k.betray) { ev.req.push({ t: 'ally', r: [k.by[0], k.v[0]] }); ev.tags.push('betray'); }
        else ev.req.push({ t: 'foe', a: k.by, b: k.v });
        continue;
      }
      if ((m = tok.match(/^d:([A-F]+)$/))) { tgt.dies.push(...letters(m[1])); continue; }
      if ((m = tok.match(/^al:([A-F]+)$/))) { const r = letters(m[1]); tgt.fx.push({ t: 'al', r }); ev.req.push({ t: 'canAlly', r }); continue; }
      if ((m = tok.match(/^ally:([A-F]+)$/))) { ev.req.push({ t: 'ally', r: letters(m[1]) }); continue; }
      if ((m = tok.match(/^br:([A-F])$/))) { const r = ID(m[1]); tgt.fx.push({ t: 'br', r }); ev.req.push({ t: 'hasAlly', r }); ev.tags.push('betray'); continue; }
      if ((m = tok.match(/^w:([A-F])$/))) { ev.req.push({ t: 'has', item: 'arma', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^con:([A-F])=(\w+)$/))) { ev.req.push({ t: 'has', item: m[2], r: ID(m[1]) }); continue; }
      if ((m = tok.match(new RegExp('^\\+(' + ITEMS + '):([A-F])$')))) { tgt.fx.push({ t: 'gain', item: m[1], r: ID(m[2]) }); continue; }
      if ((m = tok.match(new RegExp('^-(' + ITEMS + '):([A-F])$')))) { tgt.fx.push({ t: 'lose', item: m[1], r: ID(m[2]) }); ev.req.push({ t: 'has', item: m[1], r: ID(m[2]) }); continue; }
      if ((m = tok.match(/^(cibo|med|trap|veleno|esplosivo):([A-F])$/))) { const r = ID(m[2]); ev.req.push({ t: 'has', item: m[1], r }); tgt.fx.push({ t: 'lose', item: m[1], r }); continue; }
      if ((m = tok.match(/^steal:([A-F])<([A-F])$/))) { ev.req.push({ t: 'has', item: 'arma', r: ID(m[2]) }); tgt.fx.push({ t: 'steal', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^give:([A-F])>([A-F])=(\w+)$/))) { tgt.fx.push({ t: 'give', r: [L(m[1]), L(m[2])], item: m[3] }); continue; }
      if ((m = tok.match(/^s:([A-F])=(\w+)$/))) { tgt.fx.push({ t: 'status', r: ID(m[1]), s: m[2] }); continue; }
      if ((m = tok.match(/^need:([A-F])=(\w+|\*)$/))) { ev.req.push({ t: 'need', r: ID(m[1]), s: m[2] }); continue; }
      if ((m = tok.match(/^cure:([A-F])$/))) { tgt.fx.push({ t: 'cure', r: ID(m[1]) }); continue; }
      // legami e conseguenze
      if ((m = tok.match(/^hit:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'hit', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'foe', a: ID(m[1]), b: ID(m[2]) }); continue; }
      if ((m = tok.match(/^save:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'save', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^love:([A-F])([A-F])$/))) { tgt.fx.push({ t: 'love', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'canLove', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^couple:([A-F])([A-F])$/))) { ev.req.push({ t: 'couple', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^single:([A-F])$/))) { ev.req.push({ t: 'single', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^grudge:([A-F])>([A-F])$/))) { ev.req.push({ t: 'grudge', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^owe:([A-F])>([A-F])$/))) { ev.req.push({ t: 'owe', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^forgive:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'forgive', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'grudge', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^repay:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'repay', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'owe', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^debt:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'debt', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^friend:([A-F])([A-F])$/))) { ev.req.push({ t: 'friend', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^enemy:([A-F])([A-F])$/))) { ev.req.push({ t: 'enemy', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^rel:([A-F])([A-F])([+-]\d+)$/))) { tgt.fx.push({ t: 'rel', r: [L(m[1]), L(m[2])], v: +m[3] }); continue; }
      if ((m = tok.match(/^fame:([A-F])$/))) { ev.req.push({ t: 'fame', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^feared:([A-F])$/))) { ev.req.push({ t: 'feared', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^lost:([A-F])$/))) { ev.req.push({ t: 'lost', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^star:([A-F])$/))) { tgt.fx.push({ t: 'star', r: ID(m[1]) }); continue; }
      if ((m = tok.match(/^traitor:([A-F])$/))) { ev.req.push({ t: 'traitor', r: ID(m[1]) }); continue; }
      throw new Error('Etichetta sconosciuta "' + tok + '" in: ' + line);
    }
    if (ev.test) {
      const parts = text.split(' || ');
      if (parts.length !== 2) throw new Error('Una prova richiede due testi separati da " || ": ' + line);
      ev.okText = parts[0]; ev.koText = parts[1];
      if (ev.test.r >= ev.n) throw new Error('Prova su un concorrente inesistente: ' + line);
      [ev.ok, ev.ko].forEach((b) => { const v = new Set(b.dies); b.kills.forEach((k) => k.v.forEach((x) => v.add(x))); b.victims = [...v]; });
      ev.risky = ev.ok.victims.length > 0 || ev.ko.victims.length > 0;
    } else if (ev.ok.fx.length || ev.ko.fx.length || ev.ok.kills.length || ev.ko.kills.length || ev.ok.dies.length || ev.ko.dies.length) {
      throw new Error('Etichette ok:/ko: senza prova (test:) in: ' + line);
    }
    const vic = new Set(ev.dies);
    ev.kills.forEach((k) => k.v.forEach((v) => vic.add(v)));
    ev.victims = [...vic];
    ev.lethal = ev.victims.length > 0;
    ev.cat = catOf(ev);
    const has = (t) => ev.fx.concat(ev.ok.fx, ev.ko.fx).some((f) => f.t === t);
    const rq = (t) => ev.req.some((r) => r.t === t);
    // indole implicita, letta dai tratti
    if (has('love') || rq('couple')) ev.tags.push('love');
    if (rq('grudge')) ev.tags.push('revenge');
    if (has('forgive')) ev.tags.push('forgive');
    if (has('give') || has('save')) ev.tags.push('give');
    if (has('steal')) ev.tags.push('steal');
    if (has('al')) ev.tags.push('ally');
    if (ev.fx.some((f) => f.item === 'cibo') || ev.req.some((r) => r.item === 'cibo')) ev.tags.push('food');
    if (ev.test) ev.tags.push('test:' + ev.test.attr);
    // perché accade: la conseguenza che l'ha reso possibile
    ev.why = ev.test ? 'prova' : rq('att') || rq('trait') ? 'carattere' : rq('grudge') ? 'vendetta' : rq('owe') ? 'debito' : rq('couple') ? 'coppia' : rq('lost') ? 'lutto' :
      ev.req.some((r) => r.t === 'need' && r.s === 'lutto') ? 'lutto' : rq('traitor') ? 'reputazione' : rq('feared') ? 'reputazione' : rq('fame') ? 'fama' :
      ev.req.some((r) => r.t === 'has' && /veleno|mappa|amuleto|esplosivo|trap/.test(r.item)) ? 'oggetto' : ev.req.some((r) => r.t === 'need' && r.s !== '*') ? 'condizione' : '';
    const used = new Set();
    for (const re of [/\{([A-F])\}/g, /\{\w+:([A-F])\}/g, /\[([A-F]+):/g]) {
      let mm; while ((mm = re.exec(text))) [...mm[1]].forEach((ch) => used.add(ch));
    }
    for (const r of ev.req.concat(ev.fx)) (r.r || []).concat(r.a || [], r.b || []).forEach((i) => used.add(String.fromCharCode(65 + i)));
    ev.kills.forEach((k) => k.by.concat(k.v).forEach((i) => used.add(String.fromCharCode(65 + i))));
    ev.dies.forEach((i) => used.add(String.fromCharCode(65 + i)));
    for (const ch of used) if (L(ch) >= ev.n) throw new Error('Il testo usa {' + ch + '} ma l\'evento ha solo ' + ev.n + ' concorrenti: ' + line);
    return ev;
  }

  function parseBlock(src, origin) {
    if (!src) return [];
    return src.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => parseLine(l, origin));
  }
  function customToLine(c) {
    const toks = [String(c.n)];
    const dies = (c.dies || []).filter((x) => x !== c.killer);
    if (c.killer && dies.length) toks.push('k:' + c.killer + '>' + dies.join(''));
    else if (dies.length) toks.push('d:' + dies.join(''));
    toks.push('*2');
    return toks.join(' ') + ' | ' + c.text;
  }

  const PHASES = ['b', 'd', 'n', 'f', 'finale', 'ds', 'fallback', 'sponsor', 'lovers'];
  function parseDisasters(src, origin) {
    if (!src) return [];
    return src.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => {
      const p = l.split('|').map((x) => x.trim());
      if (p.length < 5) throw new Error('Disastro incompleto: ' + l);
      const st = p[5] || 'ferito';
      return { n: p[0], intro: p[1], out: parseBlock('1 d:A | ' + p[2] + '\n1 s:A=' + st + ' | ' + p[3] + '\n1 | ' + p[4], origin) };
    });
  }
  const packsFor = (theme, adult) => (D.packs || []).filter((pk) => {
    const okTheme = pk.theme === theme.id || (pk.theme === '*' && !theme.soft) || pk.theme === 'tutte' || (Array.isArray(pk.theme) && pk.theme.includes(theme.id));
    return okTheme && (!pk.adult || (adult && !theme.noAdult));
  });
  const poolCache = {};
  function buildPools(theme, custom, adult) {
    const key = theme.id + '|' + (adult ? 1 : 0) + '|' + JSON.stringify(custom || []);
    if (poolCache[key]) return poolCache[key];
    const src = theme.soft ? theme.pool : D.core;
    const more = (D.more || {})[theme.id] || {};
    const packs = packsFor(theme, adult);
    const pools = {};
    for (const k of PHASES) {
      pools[k] = parseBlock(src[k], theme.soft ? theme.id : 'base');
      if (!theme.soft && D.coreExtra && D.coreExtra[k]) pools[k] = pools[k].concat(parseBlock(D.coreExtra[k], 'base'));
      if (!theme.soft && theme.extra && theme.extra[k]) pools[k] = pools[k].concat(parseBlock(theme.extra[k], theme.id));
      if (more.extra && more.extra[k]) pools[k] = pools[k].concat(parseBlock(more.extra[k], theme.id));
      packs.forEach((pk) => { if (pk.ev && pk.ev[k]) pools[k] = pools[k].concat(parseBlock(pk.ev[k], pk.adult ? 'adult' : pk.theme === theme.id ? theme.id : 'base')); });
    }
    (custom || []).forEach((c) => {
      if (!c || !c.text) return;
      let ev;
      try { ev = parseLine(customToLine(c), 'custom'); } catch (e) { return; }
      const targets = c.phase === 'tutte' ? ['b', 'd', 'n', 'f'] : [c.phase];
      targets.forEach((p) => pools[p] && pools[p].push(ev));
    });
    pools.disasters = (theme.disasters || []).map((d) => ({ n: d.n, intro: d.intro, out: parseBlock(d.out, theme.id) }))
      .concat(parseDisasters(more.dis, theme.id));
    packs.forEach((pk) => { if (pk.dis) pools.disasters = pools.disasters.concat(parseDisasters(pk.dis, pk.adult ? 'adult' : theme.id).map((d) => Object.assign(d, { adult: !!pk.adult }))); });
    pools.lex = Object.assign({}, D.lexDefault || {}, theme.lex);
    packs.forEach((pk) => { if (pk.lex) Object.keys(pk.lex).forEach((k) => (pools.lex[k] = pk.lex[k])); });
    const ks = Object.keys(poolCache); if (ks.length > 40) delete poolCache[ks[0]];
    poolCache[key] = pools;
    return pools;
  }

  function countTemplates() {
    const cnt = (s) => (s ? s.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('|')).length : 0);
    const cntDis = (s) => (s ? s.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).length : 0);
    const perTheme = {};
    let events = 0, disasters = 0, adultEvents = 0, adultDis = 0, outcomes = 0;
    const seen = new Set();
    const add = (key, n, isDis, adult) => {
      if (seen.has(key)) return; seen.add(key);
      if (isDis) { if (adult) adultDis += n; else disasters += n; outcomes += n * 3; }
      else if (adult) adultEvents += n; else events += n;
    };
    PHASES.forEach((k) => { add('core' + k, cnt(D.core[k])); add('cx' + k, cnt((D.coreExtra || {})[k])); });
    (D.packs || []).forEach((pk, i) => {
      PHASES.forEach((k) => add('p' + i + k, cnt((pk.ev || {})[k]), false, pk.adult));
      add('pd' + i, cntDis(pk.dis), true, pk.adult);
    });
    D.themes.forEach((t) => {
      const more = (D.more || {})[t.id] || {};
      if (t.soft) PHASES.forEach((k) => add('soft' + t.id + k, cnt(t.pool[k])));
      if (!t.soft && t.extra) Object.keys(t.extra).forEach((k) => add('tx' + t.id + k, cnt(t.extra[k])));
      if (more.extra) Object.keys(more.extra).forEach((k) => add('mx' + t.id + k, cnt(more.extra[k])));
      add('td' + t.id, (t.disasters || []).length, true);
      add('md' + t.id, cntDis(more.dis), true);
      // conteggio per arena (quello che quella partita può usare)
      let e = 0, d = (t.disasters || []).length + cntDis(more.dis), ea = 0, da = 0;
      if (t.soft) PHASES.forEach((k) => (e += cnt(t.pool[k])));
      else { PHASES.forEach((k) => (e += cnt(D.core[k]) + cnt((D.coreExtra || {})[k]))); if (t.extra) Object.values(t.extra).forEach((s) => (e += cnt(s))); }
      if (more.extra) Object.values(more.extra).forEach((s) => (e += cnt(s)));
      packsFor(t, true).forEach((pk) => {
        let pe = 0; PHASES.forEach((k) => (pe += cnt((pk.ev || {})[k])));
        if (pk.adult) { ea += pe; da += cntDis(pk.dis); } else { e += pe; d += cntDis(pk.dis); }
      });
      perTheme[t.id] = { events: e, disasters: d, adultEvents: ea, adultDisasters: da };
    });
    return { events, disasters, adultEvents, adultDisasters: adultDis, outcomes, themes: D.themes.length, perTheme };
  }

  /* ---------------- Grammatica ---------------- */
  function genderPick(group, opts) {
    const o = opts.split('/');
    const gs = group.map((t) => t.gender || 'M');
    if (gs.every((g) => g === 'F')) return o[1] !== undefined ? o[1] : o[0];
    if (gs.every((g) => g === 'N')) return o[2] !== undefined ? o[2] : 'ə';
    return o[0];
  }
  const ART = /^(un'|una |uno |un |il |lo |la |l'|i |gli |le |delle |dei |degli |del |della |dell')/i;
  function possessive(item, fallback) {
    if (!item) return fallback || 'la sua arma';
    const s = item.name;
    const m = s.match(ART);
    const bare = m ? s.slice(m[0].length) : s;
    const a = m ? m[0].toLowerCase() : '';
    if (/^(delle |le )/.test(a)) return 'le sue ' + bare;
    if (/^(dei |degli |i |gli )/.test(a)) return 'i suoi ' + bare;
    const fem = /^(una |un'|la |della |dell')/.test(a);
    return (fem ? 'la sua ' : 'il suo ') + bare;
  }
  const PREP = { in: 'ne', di: 'de', a: 'a', da: 'da', su: 'su' };
  const ARTI = { lo: 'llo', la: 'lla', "l'": "ll'", gli: 'gli', le: 'lle' };
  function artPrep(s) {
    return s.replace(/(^|[^\p{L}'])(in|di|a|da|su) (il(?= )|lo(?= )|la(?= )|i(?= )|gli(?= )|le(?= )|l'(?=\p{L}))/gu, (m, pre, p, a) => {
      const P = PREP[p];
      return pre + (a === 'il' ? P + 'l' : a === 'i' ? P + 'i' : P + ARTI[a]);
    });
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const edFix = (s) => s.replace(/ e ((?:<b[^>]*>)?)(?=[Ee][^\s])/g, ' ed $1');
  const nameTag = (t) => '<b class="nm" data-id="' + esc(t.id) + '" style="--c:' + esc(t.color || '#888') + '">' + esc(t.name) + '</b>';

  /* ---------------- Simulazione ---------------- */
  const DIFF = { bassa: 0.6, normale: 1, alta: 1.45, massacro: 2.2 };
  const BASE_P = { b: 0.3, d: 0.15, n: 0.1, f: 0.38, dis: 0.26 };
  const STATUS_LABEL = { ferito: 'Ferito', avvelenato: 'Avvelenato', malato: 'Malato', affamato: 'Affamato', lutto: 'In lutto', ubriaco: 'Ubriaco', sconvolto: 'Sconvolto' };
  const STATUS_TTL = { ubriaco: 2, lutto: 6, sconvolto: 5 };
  const ITEM_NAME = { med: 'un kit medico', trap: 'una trappola' };

  function simulate(cfg) {
    const theme = D.themes.find((t) => t.id === cfg.theme) || D.themes[0];
    const seed = cfg.seed == null || cfg.seed === '' ? String(Date.now()) : String(cfg.seed);
    const rng = makeRng(seed + '|' + theme.id);
    const adult = !!cfg.adult && !theme.noAdult;
    const pools = buildPools(theme, cfg.custom, adult);
    const LEX = pools.lex;
    const E = Object.assign({}, D.echo || {}, theme.soft ? D.echoSoft || {} : {});
    const diff = DIFF[cfg.difficulty] || 1;
    const maxDays = Math.max(3, Math.min(60, cfg.maxDays || 20));
    const traitMap = Object.fromEntries(D.traits.map((t) => [t.id, t]));
    const zoneCount = theme.lex.luogo.length;

    const T = (cfg.cast || []).map((c, i) => ({
      id: c.id || 't' + i, name: (c.name || 'Concorrente ' + (i + 1)).trim(), gender: c.gender || 'M',
      team: c.team || i + 1, color: c.color, img: c.img || '',
      traits: (c.traits || []).filter((x) => traitMap[x]),
      attr: Object.assign({ for: 5, agi: 5, int: 5, car: 5, fort: 5, res: 5, furt: 5, cor: 5, emp: 5, sop: 5 }, c.attr || {}),
      alive: true, zone: 0, inv: [], st: {}, kills: 0, killIds: [], allyId: null,
      deathPhase: -1, deathDay: 0, deathText: '', deathHtml: '', killerIds: [], order: 0,
      events: 0, alliancesFormed: 0, betrayals: 0, items: 0,
      partner: null, exPartner: null, lost: null, grudges: {}, owes: {}, fame: 0, traitor: false, fed: 0,
      revenges: 0, saves: 0, repaid: 0, amulets: 0, tests: 0, testsPassed: 0,
    }));
    if (T.length < 2) throw new Error('Servono almeno 2 concorrenti.');
    T.forEach((t) => (t.zone = rng.int(zoneCount)));
    const byId = Object.fromEntries(T.map((t) => [t.id, t]));

    // affinità reciproca (-100 … 100)
    const AFF = new Map();
    const akey = (a, b) => (a.id < b.id ? a.id + '|' + b.id : b.id + '|' + a.id);
    const aff = (a, b) => AFF.get(akey(a, b)) || 0;
    const addAff = (a, b, d) => { if (a === b) return; AFF.set(akey(a, b), Math.max(-100, Math.min(100, aff(a, b) + d))); };

    const alliances = new Map();
    let nextAlly = 1;
    function joinAlliance(ts) {
      let gid = ts.map((t) => t.allyId).find((x) => x != null);
      if (gid == null) { gid = nextAlly++; alliances.set(gid, new Set()); }
      ts.forEach((t) => {
        if (t.allyId != null && t.allyId !== gid) leaveAlliance(t);
        t.allyId = gid; alliances.get(gid).add(t.id);
      });
    }
    function leaveAlliance(t) {
      if (t.allyId == null) return;
      const g = alliances.get(t.allyId);
      if (g) {
        g.delete(t.id);
        if (g.size === 1) { const last = byId[[...g][0]]; last.allyId = null; alliances.delete(t.allyId); }
        else if (g.size === 0) alliances.delete(t.allyId);
      }
      t.allyId = null;
    }
    if (cfg.teamsAllied) {
      const teams = {};
      T.forEach((t) => (teams[t.team] = teams[t.team] || []).push(t));
      Object.values(teams).forEach((ms) => { if (ms.length > 1) { joinAlliance(ms); ms.forEach((a) => ms.forEach((b) => a.id < b.id && addAff(a, b, 35))); } });
    }

    const alive = () => T.filter((t) => t.alive);
    const phases = [];
    let day = 0, deathCounter = 0, pendingFallen = [], noDeathStreak = 0;
    const stats = { events: 0, alliances: 0, betrayals: 0, firstBlood: null, deathsByDay: [], envDeaths: 0, killDeaths: 0, items: 0, revenges: 0, couples: 0, debtsRepaid: 0, amulets: 0, sponsors: 0, echoes: 0, tests: 0, testsPassed: 0 };

    const hasItem = (t, it) => t.inv.some((x) => x.type === it);
    const itemOf = (t, it) => t.inv.find((x) => x.type === it);
    const statusCount = (t) => Object.keys(t.st).filter((s) => s !== 'lutto').length;
    const traitSum = (t, key) => t.traits.reduce((s, id) => s + ((traitMap[id] && traitMap[id][key]) || 0), 0);
    const combat = (t) => t.attr.for + t.attr.agi + 0.5 * t.attr.int + 0.3 * t.attr.res + 0.2 * t.attr.fort +
      (hasItem(t, 'arma') ? 4 : 0) + (hasItem(t, 'esplosivo') ? 2 : 0) - (t.st.ferito != null ? 3 : 0) - (t.st.malato != null ? 2 : 0) -
      (t.st.ubriaco != null ? 2 : 0) - (t.st.affamato != null ? 1.5 : 0) - (t.st.sconvolto != null ? 1 : 0) + (t.st.lutto != null ? 1.5 : 0) + traitSum(t, 'c') + Math.min(3, t.kills * 0.5);
    const survival = (t) => 0.4 * t.attr.res + 0.3 * t.attr.fort + 0.2 * t.attr.agi + 0.3 * t.attr.sop + 0.1 * t.attr.cor + traitSum(t, 's') - 1.5 * statusCount(t) + (hasItem(t, 'amuleto') ? 2 : 0);
    const hasTrait = (t, id) => t.traits.includes(id);
    // prova di abilità: caratteristica + dado + fortuna + tratti − condizioni
    function rollTest(t, attr, dc) {
      const base = t.attr[attr] != null ? t.attr[attr] : 5;
      let bonus = Math.round((t.attr.fort - 5) / 3) + traitSum(t, 'tb');
      if (hasTrait(t, 'fortunato')) bonus += 1; if (hasTrait(t, 'sfortunato')) bonus -= 2;
      if (t.st.ferito != null) bonus -= 2; if (t.st.ubriaco != null) bonus -= 2; if (t.st.affamato != null) bonus -= 1;
      if (t.st.sconvolto != null) bonus -= 1; if (t.st.malato != null || t.st.avvelenato != null) bonus -= 1; if (t.st.lutto != null && attr === 'for') bonus += 1;
      if ((attr === 'int' || attr === 'sop') && hasItem(t, 'mappa')) bonus += 2;
      if (attr === 'for' && hasItem(t, 'arma')) bonus += 1;
      const die = 1 + rng.int(6) + rng.int(6);
      const roll = base + die + bonus;
      return { roll, dc, pass: roll >= dc, bonus };
    }

    function isEnded() {
      const a = alive();
      if (a.length <= 1) return true;
      if (cfg.teamWin && a.every((t) => t.team === a[0].team)) return true;
      return false;
    }

    function checkReq(ev, roles) {
      for (const r of ev.req) {
        const A = roles[r.r ? r.r[0] : 0], B = r.r && r.r[1] != null ? roles[r.r[1]] : null;
        switch (r.t) {
          case 'ally': {
            const g = A.allyId;
            if (g == null || !r.r.every((i) => roles[i].allyId === g)) return false;
            break;
          }
          case 'canAlly': {
            const ts = r.r.map((i) => roles[i]);
            const gids = new Set(ts.map((t) => t.allyId).filter((x) => x != null));
            if (gids.size > 1) return false;
            if (gids.size === 1 && ts.every((t) => t.allyId != null)) return false;
            const size = gids.size ? alliances.get([...gids][0]).size + ts.filter((t) => t.allyId == null).length : ts.length;
            if (size > (ts.some((t) => hasTrait(t, 'leader')) ? 6 : 5)) return false;
            if (cfg.teamWin && new Set(ts.map((t) => t.team)).size > 1 && cfg.teamsAllied) return false;
            for (const a of ts) for (const b of ts) if (a !== b && (a.grudges[b.id] || aff(a, b) <= -40)) return false;
            break;
          }
          case 'hasAlly': if (A.allyId == null) return false; break;
          case 'has': if (!hasItem(A, r.item)) return false; break;
          case 'need': if (r.s === '*' ? statusCount(A) === 0 : A.st[r.s] == null) return false; break;
          case 'foe':
            for (const a of r.a) for (const b of r.b) {
              const X = roles[a], Y = roles[b];
              if (X.allyId != null && X.allyId === Y.allyId) return false;
              if (cfg.teamWin && X.team === Y.team) return false;
              if (X.partner === Y.id) return false;
            }
            break;
          case 'canLove': if (A.partner || B.partner || A.grudges[B.id] || B.grudges[A.id] || aff(A, B) < -10 || A.exPartner === B.id) return false; break;
          case 'couple': if (A.partner !== B.id) return false; break;
          case 'single': if (A.partner) return false; break;
          case 'grudge': if (!A.grudges[B.id]) return false; break;
          case 'owe': if (!A.owes[B.id]) return false; break;
          case 'friend': if (aff(A, B) < 40) return false; break;
          case 'enemy': if (aff(A, B) > -40 && !A.grudges[B.id] && !B.grudges[A.id]) return false; break;
          case 'fame': if (A.fame < 3) return false; break;
          case 'feared': if (A.kills < 3) return false; break;
          case 'lost': if (!A.lost) return false; break;
          case 'traitor': if (!A.traitor) return false; break;
          case 'att': { const v = A.attr[r.attr] != null ? A.attr[r.attr] : 5; if (r.op === '>' ? v < r.v : v > r.v) return false; break; }
          case 'trait': if (!hasTrait(A, r.trait)) return false; break;
          case 'notrait': if (hasTrait(A, r.trait)) return false; break;
        }
      }
      return true;
    }

    function weightFor(ev, P) {
      let w = ev.w;
      for (const tag of ev.tags) {
        for (const id of P.traits) { const m = traitMap[id].m[tag]; if (m != null) w *= m; }
        if (tag === 'soc') w *= 0.6 + P.attr.car / 12;
        else if (tag === 'stl') w *= 0.6 + P.attr.furt / 12;
        else if (tag === 'int' || tag === 'heal') w *= 0.6 + P.attr.int / 12;
        else if (tag === 'luck') w *= 0.5 + P.attr.fort / 10;
        else if (tag === 'agg') w *= 0.7 + P.attr.for / 15;
        else if (tag === 'mad') w *= P.st.ubriaco != null || P.st.sconvolto != null ? 2.5 : 1;
        else if (tag === 'gift') w *= 1 + P.fame * 0.4;
        else if (tag === 'betray') w *= (Object.keys(P.owes).length ? 0.3 : 1) * (P.partner ? 0.5 : 1);
        else if (tag === 'drunk') w *= P.st.ubriaco != null ? 3 : 1;
        else if (tag === 'cow') w *= Math.max(0.2, 1.6 - P.attr.cor / 10);
        else if (tag === 'give') w *= 0.5 + P.attr.emp / 10;
        else if (tag === 'love') w *= 0.6 + P.attr.car / 15 + P.attr.emp / 20;
        else if (tag === 'food') w *= 0.6 + P.attr.sop / 10;
        else if (tag === 'show') w *= 0.6 + P.attr.car / 10;
        else if (tag === 'steal') w *= 0.6 + P.attr.furt / 10;
        else if (tag === 'ally') w *= 0.7 + P.attr.car / 15;
        else if (tag.startsWith('test:')) { const a = tag.slice(5); const v = P.attr[a] != null ? P.attr[a] : 5; w *= 0.7 + Math.abs(v - 5) / 6; }
        if (tag === 'agg') w *= 0.7 + P.attr.cor / 20;
      }
      for (const r of ev.req) {
        if (r.t === 'need' && (r.s === '*' ? statusCount(P) > 0 : P.st[r.s] != null)) w *= 3 * (ev.lethal ? Math.max(0.35, 1.5 - P.attr.res / 10) : 1);
        else if ((r.t === 'att' || r.t === 'trait' || r.t === 'notrait') && r.r[0] != null) { const fake = [P]; w *= checkReq({ req: [Object.assign({}, r, { r: [0] })] }, fake) ? 2.5 : 1; }
        else if (r.t === 'has' && hasItem(P, r.item)) w *= r.item === 'arma' || r.item === 'cibo' ? 1.6 : 3;
        else if (r.t === 'ally' && P.allyId != null) w *= 1.4;
        else if (r.t === 'grudge' && Object.keys(P.grudges).some((id) => byId[id].alive)) w *= 7;
        else if (r.t === 'owe' && (Object.keys(P.owes).length || T.some((t) => t.alive && t.owes[P.id]))) w *= 4;
        else if (r.t === 'couple' && P.partner) w *= 3.5;
        else if (r.t === 'lost' && P.lost) w *= 3;
        else if (r.t === 'fame' && P.fame >= 3) w *= 2;
        else if (r.t === 'traitor' && T.some((t) => t.alive && t.traitor && t !== P)) w *= 2;
        else if (r.t === 'feared' && T.some((t) => t.alive && t.kills >= 3 && t !== P)) w *= 2;
        else if (r.t === 'canLove' && !P.partner) w *= 1.2;
      }
      if (ev.origin === 'custom') w *= 1.5;
      else if (ev.origin === 'adult') w *= 1.25;
      else if (ev.origin !== 'base') w *= 1.3;
      return w;
    }

    function relKey(P, t) {
      let k = (t.zone === P.zone ? 0 : 1) + rng.f() * 1.3;
      if (P.grudges[t.id]) k -= 2.2;
      if (P.partner === t.id) k -= 1.6;
      if (P.owes[t.id] || t.owes[P.id]) k -= 1.1;
      if (t.grudges[P.id]) k -= 0.9;
      const a = aff(P, t); if (a >= 40) k -= 0.7; else if (a <= -40) k -= 0.5;
      return k;
    }
    function assign(ev, P, un) {
      const others = [];
      un.forEach((id) => id !== P.id && byId[id].alive && others.push(byId[id]));
      if (others.length < ev.n - 1) return null;
      let best = null, bestScore = -Infinity;
      for (let attempt = 0; attempt < 12; attempt++) {
        const keyed = others.map((t) => [t, relKey(P, t)]).sort((a, b) => a[1] - b[1]);
        const group = keyed.slice(0, ev.n - 1).map((x) => x[0]);
        const roles = attempt % 2 === 0 ? [P].concat(rng.shuffle(group)) : rng.shuffle([P].concat(group));
        if (!checkReq(ev, roles)) continue;
        let score = rng.f() * 6;
        for (const k of ev.kills) {
          score += 0.6 * (k.by.reduce((s, i) => s + combat(roles[i]), 0) / k.by.length - k.v.reduce((s, i) => s + combat(roles[i]), 0) / k.v.length);
          k.v.forEach((i) => (score -= 0.5 * survival(roles[i])));
          k.by.forEach((i) => k.v.forEach((j) => { if (roles[i].grudges[roles[j].id]) score += 6; }));
        }
        ev.dies.forEach((i) => (score -= survival(roles[i])));
        if (score > bestScore) { bestScore = score; best = roles; }
      }
      return best;
    }

    // ---------- testo ----------
    function grudgePhrase(A, B) {
      const g = A.grudges[B.id];
      if (!g) return 'tutto quello che ha fatto';
      if (g.victim && byId[g.victim]) return '{@' + g.victim + '}';
      return { betray: 'il tradimento subito', steal: 'il furto subito', attack: 'l\'agguato subito', love: 'il cuore spezzato' }[g.why] || 'tutto quello che ha fatto';
    }
    function render(text, roles, lexPick, ev) {
      let s = text
        .replace(/\{caro:([A-F])\}/g, (_, c) => {
          const A = roles[L(c)];
          const r = ev && ev.req.find((x) => x.t === 'grudge' && x.r[0] === L(c));
          if (r) return grudgePhrase(A, roles[r.r[1]]);
          const anyId = Object.keys(A.grudges)[0];
          return anyId ? grudgePhrase(A, byId[anyId]) : 'il passato';
        })
        .replace(/\{(perso|partner):([A-F])\}/g, (_, k, c) => { const A = roles[L(c)]; const id = k === 'perso' ? A.lost : A.partner || A.exPartner; return id && byId[id] ? '{@' + id + '}' : 'chi non c\'è più'; })
        .replace(/\[([A-F]+):([^\]]*)\]/g, (_, ls, opts) => genderPick(letters(ls).map((i) => roles[i]), opts))
        .replace(POSS_RE, (_, it, c) => possessive(itemOf(roles[L(c)], it), it === 'arma' ? 'la sua arma' : 'il suo bottino'))
        .replace(LEX_RE, (_, k) => lexPick(k));
      s = cap(artPrep(s));
      const nm = (str, f) => str.replace(/\{@([^}]+)\}/g, (_, id) => f(byId[id])).replace(/\{([A-F])\}/g, (_, c) => f(roles[L(c)]));
      return { plain: edFix(nm(s, (t) => t.name)), html: edFix(nm(esc(s), nameTag)) };
    }
    function echo(list, people, cls) {
      if (!list || !list.length) return null;
      const tpl = rng.pick(list);
      let s = tpl.replace(/\[(\d):([^\]]*)\]/g, (_, i, o) => genderPick([people[+i]], o));
      s = cap(artPrep(s));
      stats.echoes++;
      return { plain: edFix(s.replace(/\{(\d)\}/g, (_, i) => people[+i].name)), html: edFix(esc(s).replace(/\{(\d)\}/g, (_, i) => nameTag(people[+i]))), cls: cls || '' };
    }

    // ---------- conseguenze ----------
    function addGrudge(X, K, why, victim) {
      if (!X.alive || X === K) return false;
      const had = !!X.grudges[K.id];
      X.grudges[K.id] = { why, victim: victim ? victim.id : null, phase: phases.length };
      addAff(X, K, why === 'kill' ? -60 : -45);
      return !had;
    }
    function kill(v, killers, txt, out) {
      if (!v.alive) return;
      v.alive = false;
      v.deathPhase = phases.length; v.deathDay = day; v.order = ++deathCounter;
      v.deathText = txt.plain; v.deathHtml = txt.html;
      v.killerIds = killers.map((k) => k.id);
      const oldAlly = v.allyId;
      leaveAlliance(v);
      pendingFallen.push(v.id);
      stats.deathsByDay[day] = (stats.deathsByDay[day] || 0) + 1;
      if (killers.length) {
        stats.killDeaths++;
        killers.forEach((k) => {
          k.kills++; k.killIds.push(v.id); k.fame += 1;
          if (k.grudges[v.id]) {
            const g = k.grudges[v.id]; delete k.grudges[v.id]; k.revenges++; stats.revenges++; k.fame += 2;
            const e = g.victim && byId[g.victim] ? echo(E.revenge, [k, v, byId[g.victim]], 'good') : echo(E.revengeAny, [k, v], 'good');
            if (e) out.push(e);
          }
          if (k.kills === 3) { const e = echo(E.feared, [k], 'warn'); if (e) out.push(e); }
          if (k.partner === v.id) { k.partner = null; k.exPartner = v.id; }
        });
        if (!stats.firstBlood) stats.firstBlood = { killers: v.killerIds.slice(), victim: v.id, day };
      } else {
        stats.envDeaths++;
        if (!stats.firstBlood) stats.firstBlood = { killers: [], victim: v.id, day };
      }
      // chi amava o stimava la vittima reagisce
      let echoed = 0;
      T.forEach((X) => {
        if (!X.alive || killers.includes(X) || X === v) return;
        const lover = X.partner === v.id;
        const thr = 45 - (X.attr.emp - 5) * 3 - (hasTrait(X, 'vendicativo') ? 15 : 0) + (hasTrait(X, 'clemente') ? 20 : 0);
        const close = lover || aff(X, v) >= thr || (oldAlly != null && X.allyId === oldAlly && !hasTrait(X, 'clemente'));
        if (!close) return;
        if (lover) { X.partner = null; X.exPartner = v.id; X.st.lutto = phases.length; }
        else if (aff(X, v) >= 60 - (X.attr.emp - 5) * 4) X.st.lutto = phases.length;
        X.lost = v.id;
        killers.forEach((K) => {
          if (addGrudge(X, K, 'kill', v) && echoed < 2) { const e = echo(lover ? E.grudgeLover : E.grudgeKill, [X, K, v], 'warn'); if (e) { out.push(e); echoed++; } }
        });
        if (!killers.length && lover && echoed < 2) { const e = echo(E.griefOnly, [X, v], 'warn'); if (e) { out.push(e); echoed++; } }
      });
      if (v.partner) { const p = byId[v.partner]; if (p) { p.partner = null; p.exPartner = v.id; } v.partner = null; }
    }
    function giveItem(t, type, ctx, lexPick, name) {
      const nm = name || (type === 'arma' ? lexPick('arma') : type === 'cibo' ? ctx.cibo || 'delle provviste' : ITEM_NAME[type] || lexPick(type));
      if (type === 'arma') { const old = t.inv.findIndex((x) => x.type === 'arma'); if (old >= 0) t.inv.splice(old, 1); }
      t.inv.push({ type, name: nm }); t.items++; stats.items++;
      if (type === 'cibo') { t.fed = day; delete t.st.affamato; }
      while (t.inv.length > 7) t.inv.shift();
    }

    function resolveTest(ev, roles) {
      const who = roles[ev.test.r];
      let res = rollTest(who, ev.test.attr, ev.test.dc);
      const br = res.pass ? ev.ok : ev.ko;
      if (br.victims.some((i) => roles[i].alive) && alive().length - br.victims.length < 1) res = Object.assign({}, res, { pass: true, forced: true });
      const b = res.pass ? ev.ok : ev.ko;
      const out = Object.assign({}, ev, { text: res.pass ? ev.okText : ev.koText, kills: ev.kills.concat(b.kills), dies: ev.dies.concat(b.dies), fx: ev.fx.concat(b.fx) });
      const v = new Set(out.dies); out.kills.forEach((k) => k.v.forEach((x) => v.add(x)));
      out.victims = [...v]; out.lethal = out.victims.length > 0; out.cat = catOf(out);
      who.tests++; if (res.pass) who.testsPassed++; stats.tests++; if (res.pass) stats.testsPassed++;
      out.testRes = { who: who.id, attr: ev.test.attr, roll: res.roll, dc: res.dc, pass: res.pass };
      return out;
    }
    function apply(ev, roles) {
      if (ev.test) ev = resolveTest(ev, roles);
      const ctx = {};
      const lexPick = (k) => (ctx[k] != null ? ctx[k] : (ctx[k] = rng.pick(LEX[k] || ['qualcosa'])));
      const txt = render(ev.text, roles, lexPick, ev);
      const out = [];
      const z = ctx.luogo != null ? theme.lex.luogo.indexOf(ctx.luogo) : roles[0].zone;
      roles.forEach((t) => { t.events++; if (z >= 0) t.zone = z; });
      // amuleti: salvano una volta da qualunque morte
      const saved = new Set();
      ev.victims.forEach((i) => {
        const v = roles[i], am = itemOf(v, 'amuleto');
        if (v.alive && am && (hasTrait(v, 'superstizioso') || rng.chance(0.85))) {
          saved.add(i); v.inv.splice(v.inv.indexOf(am), 1); v.amulets++; stats.amulets++;
          const e = echo(theme.soft ? E.amuletSoft : E.amulet, [v], 'twist');
          if (e) out.push({ plain: e.plain.replace('§', possessive(am)), html: e.html.replace('§', esc(possessive(am))), cls: 'twist' });
          v.st.ferito = phases.length;
          ev.kills.forEach((k) => { if (k.v.includes(i)) k.by.forEach((b) => addGrudge(v, roles[b], 'attack')); });
        }
      });
      for (const k of ev.kills) {
        const killers = k.by.map((i) => roles[i]);
        k.v.forEach((i) => { if (!saved.has(i)) kill(roles[i], killers, txt, out); });
        if (k.betray) {
          stats.betrayals++;
          killers.forEach((t) => { t.betrayals++; t.traitor = true; leaveAlliance(t); });
        }
      }
      ev.dies.forEach((i) => { if (!saved.has(i)) kill(roles[i], [], txt, out); });
      for (const f of ev.fx) {
        const t = roles[f.r[0]], u = f.r[1] != null ? roles[f.r[1]] : null;
        if (!t.alive && f.t !== 'rel') continue;
        switch (f.t) {
          case 'al': {
            const ts = f.r.map((i) => roles[i]).filter((x) => x.alive);
            if (ts.length > 1) { joinAlliance(ts); stats.alliances++; ts.forEach((x) => { x.alliancesFormed++; ts.forEach((y) => x.id < y.id && addAff(x, y, Math.round(25 * (0.7 + (x.attr.car + y.attr.car) / 30)))); }); }
            break;
          }
          case 'br': {
            const g = t.allyId != null ? [...(alliances.get(t.allyId) || [])].map((id) => byId[id]).filter((x) => x !== t && x.alive) : [];
            leaveAlliance(t); t.betrayals++; t.traitor = true; stats.betrayals++;
            let n = 0; g.forEach((x) => { if (addGrudge(x, t, 'betray') && n++ < 1) { const e = echo(E.betray, [x, t], 'warn'); if (e) out.push(e); } });
            break;
          }
          case 'gain': giveItem(t, f.item, ctx, lexPick); break;
          case 'lose': { const i = t.inv.findIndex((x) => x.type === f.item); if (i >= 0) t.inv.splice(i, 1); if (f.item === 'cibo') { t.fed = day; delete t.st.affamato; } break; }
          case 'steal': {
            const i = u.inv.findIndex((x) => x.type === 'arma');
            if (i >= 0) { const [it] = u.inv.splice(i, 1); giveItem(t, 'arma', ctx, lexPick, it.name); if (u.alive && addGrudge(u, t, 'steal')) { const e = echo(E.steal, [u, t], 'warn'); if (e) out.push(e); } }
            break;
          }
          case 'give': {
            if (!u.alive) break;
            const own = itemOf(t, f.item);
            if (own) t.inv.splice(t.inv.indexOf(own), 1);
            giveItem(u, f.item, ctx, lexPick, own ? own.name : null);
            u.owes[t.id] = 'dono'; addAff(t, u, 20);
            if (rng.chance(0.6)) { const e = echo(E.debt, [u, t], ''); if (e) out.push(e); }
            break;
          }
          case 'status': t.st[f.s] = phases.length; if (f.s === 'ubriaco') t.fame += 1; break;
          case 'cure': {
            t.st = t.st.lutto != null ? { lutto: t.st.lutto } : {};
            const helper = roles.find((x) => x !== t && x.alive);
            if (helper && ev.n > 1) { t.owes[helper.id] = 'cura'; addAff(t, helper, 30); helper.saves++; if (rng.chance(0.5)) { const e = echo(E.debt, [t, helper], ''); if (e) out.push(e); } }
            break;
          }
          case 'hit': if (u.alive) { u.st.ferito = phases.length; if (addGrudge(u, t, 'attack') && rng.chance(0.6)) { const e = echo(E.hit, [u, t], 'warn'); if (e) out.push(e); } } break;
          case 'save': if (u.alive) { u.owes[t.id] = 'vita'; addAff(t, u, 40); t.saves++; t.fame += 1; const e = echo(E.saved, [u, t], 'good'); if (e) out.push(e); } break;
          case 'forgive': delete t.grudges[u.id]; addAff(t, u, 35); break;
          case 'love': if (u.alive) {
            t.partner = u.id; u.partner = t.id; addAff(t, u, 70); stats.couples++; t.fame += 1; u.fame += 1;
            if (!cfg.teamWin && (t.allyId == null || u.allyId == null || t.allyId === u.allyId)) { const g = t.allyId != null ? alliances.get(t.allyId) : u.allyId != null ? alliances.get(u.allyId) : null; if (!g || g.size < 5) joinAlliance([t, u]); } const e = echo(E.couple, [t, u], 'love'); if (e) out.push(e); } break;
          case 'repay': if (u) { delete t.owes[u.id]; addAff(t, u, 20); t.repaid++; stats.debtsRepaid++; const e = echo(E.repay, [t, u], 'good'); if (e) out.push(e); } break;
          case 'debt': if (u) t.owes[u.id] = 'favore'; break;
          case 'rel': if (u) addAff(t, u, f.v); break;
          case 'star': t.fame += 2; if (t.fame >= 5 && !t.starred) { t.starred = true; const e = echo(E.star, [t], 'good'); if (e) out.push(e); } break;
        }
      }
      // l'evento lascia il segno sui rapporti
      if (ev.tags.includes('show')) roles.forEach((t) => { if (t.alive) { t.fame += 1 + (hasTrait(t, 'esibizionista') ? 1 : 0) + (t.attr.car >= 8 ? 1 : 0); if (t.fame >= 5 && !t.starred) { t.starred = true; const e = echo(E.star, [t], 'good'); if (e) out.push(e); } } });
      if (!ev.lethal && ev.req.some((r) => r.t === 'ally')) for (const a of roles) for (const b of roles) if (a.id < b.id) addAff(a, b, 6);
      if (ev.lethal) {
        roles.forEach((x) => {
          if (x.alive && !ev.kills.some((k) => k.by.some((i) => roles[i] === x)) && rng.chance(Math.max(0.05, 0.35 * (1.5 - x.attr.cor / 10))) && x.st.sconvolto == null) {
            x.st.sconvolto = phases.length; if (out.length < 3 && rng.chance(0.5)) { const e = echo(E.shock, [x], ''); if (e) out.push(e); }
          }
        });
      }
      stats.events++;
      return { html: txt.html, plain: txt.plain, ids: roles.map((t) => t.id), deaths: roles.filter((t, i) => ev.victims.includes(i) && !t.alive).map((t) => t.id), lethal: ev.lethal, origin: ev.origin, cat: ev.cat, why: ev.why, echo: out.slice(0, 3), test: ev.testRes || null };
    }

    function lethalProb(kind) {
      let p = (BASE_P[kind] || 0.2) * diff;
      if (kind !== 'b') p *= 1 + 0.1 * (day - 1);
      if (noDeathStreak >= 3) p *= 1.7;
      if (alive().length <= 4) p *= 1.25;
      return Math.min(0.9, Math.max(0.03, p));
    }

    function snapshot() {
      const zones = {}, allies = {}, st = {}, inv = {}, kills = {}, rel = {};
      T.forEach((t) => {
        zones[t.id] = t.zone; allies[t.id] = t.allyId; st[t.id] = Object.keys(t.st); inv[t.id] = t.inv.map((x) => x.name); kills[t.id] = t.kills;
        const friends = T.filter((u) => u !== t && u.alive && aff(t, u) >= 40).map((u) => u.id);
        const enemies = T.filter((u) => u !== t && u.alive && aff(t, u) <= -40 && !t.grudges[u.id]).map((u) => u.id);
        rel[t.id] = { p: t.partner, g: Object.keys(t.grudges).filter((id) => byId[id].alive).map((id) => [id, t.grudges[id].why, t.grudges[id].victim]), o: Object.keys(t.owes).filter((id) => byId[id].alive), f: t.fame, tr: t.traitor, fr: friends, en: enemies, lost: t.lost };
      });
      return { alive: alive().map((t) => t.id), zones, allies, st, inv, kills, rel };
    }

    function tickStatus() {
      alive().forEach((t) => Object.keys(STATUS_TTL).forEach((s) => { if (t.st[s] != null && phases.length - t.st[s] >= STATUS_TTL[s]) delete t.st[s]; }));
    }
    function maybeDissolve(events) {
      const a = alive();
      if (cfg.teamWin || a.length < 2) return;
      const g = a[0].allyId;
      if (g != null && a.every((t) => t.allyId === g)) {
        a.forEach((t) => leaveAlliance(t));
        const s = 'Rimasti soli, gli ultimi alleati si guardano con sospetto: l\'alleanza è finita.';
        events.push({ html: s, plain: s, ids: a.map((t) => t.id), deaths: [], lethal: false, note: true });
      }
    }
    function sponsorDrop(events) {
      if (!pools.sponsor.length) return;
      const cands = alive().filter((t) => t.fame >= 3).sort((a, b) => b.fame - a.fame);
      if (!cands.length || !rng.chance(Math.min(0.75, 0.25 + cands[0].fame * 0.06))) return;
      const P = cands[0];
      const opts = pools.sponsor.filter((e) => e.n === 1 && checkReq(e, [P]));
      const ev = rng.wpick(opts, (e) => weightFor(e, P));
      if (!ev) return;
      const r = apply(ev, [P]); r.why = r.why || 'fama'; r.sponsor = true; events.push(r); stats.sponsors++;
    }

    function runPhase(kind, pool, title, intro, opt) {
      const events = [];
      tickStatus();
      maybeDissolve(events);
      if (kind === 'd' && day >= 2) sponsorDrop(events);
      const before = alive().length;
      const order = rng.shuffle(alive());
      const un = new Set(order.map((t) => t.id));
      const fallback = pools.fallback.length ? pools.fallback : parseBlock(D.core.fallback);
      for (const P of order) {
        if (!un.has(P.id) || !P.alive) continue;
        let done = false;
        let pL = lethalProb(kind);
        if (kind === 'dis') pL *= (hasItem(P, 'mappa') ? 0.35 : 1) * Math.max(0.5, 1.25 - P.attr.sop / 20);
        for (let attempt = 0; attempt < 25 && !done; attempt++) {
          const nAlive = alive().length;
          const wantLethal = nAlive > 1 && rng.chance(pL);
          const n = [...un].filter((id) => byId[id].alive).length;
          const cand = pool.filter((e) => e.lethal === wantLethal && e.n <= n && (!e.lethal || e.victims.length < nAlive) && (!e.risky || (!wantLethal && nAlive > 2)));
          const ev = rng.wpick(cand, (e) => weightFor(e, P));
          if (!ev) continue;
          const roles = assign(ev, P, un);
          if (!roles) continue;
          if (ev.lethal && alive().length - ev.victims.length < 1) continue;
          events.push(apply(ev, roles));
          roles.forEach((t) => un.delete(t.id));
          done = true;
        }
        if (!done) { events.push(apply(rng.pick(fallback), [P])); un.delete(P.id); }
      }
      const died = before - alive().length;
      noDeathStreak = died ? 0 : noDeathStreak + 1;
      phases.push(Object.assign({ kind, day, title, intro, events, snap: snapshot() }, opt || {}));
    }

    function runLovers() {
      const [A, B] = alive();
      const pool = pools.lovers.filter((e) => e.n === 2);
      if (!pool.length) return false;
      const events = [];
      for (let k = 0; k < 10 && !isEnded(); k++) {
        const ev = rng.wpick(pool, (e) => e.w);
        const roles = rng.chance(0.5) ? [A, B] : [B, A];
        if (!checkReq(ev, roles)) continue;
        events.push(apply(ev, roles));
      }
      if (!isEnded()) return false;
      phases.push({ kind: 'finale', day, title: 'L\'ultimo atto', intro: 'Restano in due, e si amano. L\'arena ha previsto anche questo.', events, snap: snapshot() });
      return true;
    }

    function runFinale() {
      const events = [];
      alive().forEach((t) => leaveAlliance(t));
      const pool = pools.finale;
      let rounds = 0;
      while (!isEnded() && rounds++ < 40) {
        const order = rng.shuffle(alive());
        for (let i = 0; i + 1 < order.length; i += 2) {
          const A = order[i], B = order[i + 1];
          if (!A.alive || !B.alive || isEnded()) continue;
          if (cfg.teamWin && A.team === B.team) continue;
          for (let k = 0; k < 10; k++) {
            const ev = rng.wpick(pool, (e) => weightFor(e, A));
            const roles = combat(A) + rng.f() * 8 > combat(B) + rng.f() * 8 ? [A, B] : [B, A];
            const save = { pa: A.partner, pb: B.partner };
            if (A.partner === B.id) { A.partner = null; B.partner = null; }
            if (!checkReq(ev, roles)) { A.partner = save.pa; B.partner = save.pb; continue; }
            events.push(apply(ev, roles));
            break;
          }
        }
        if (cfg.teamWin && !isEnded() && rounds > 30) break;
      }
      phases.push({ kind: 'finale', day, title: 'Lo scontro finale', intro: theme.intro.finale, events, snap: snapshot() });
    }

    function endOfDay() {
      // la fame: chi non mangia da due giorni si indebolisce, chi ha cibo lo usa
      alive().forEach((t) => {
        if (day - t.fed >= 1 && hasItem(t, 'cibo')) { const i = t.inv.findIndex((x) => x.type === 'cibo'); t.inv.splice(i, 1); t.fed = day; delete t.st.affamato; }
        else if (day - t.fed >= (hasTrait(t, 'goloso') ? 1 : t.attr.sop >= 8 ? 3 : 2) && t.st.affamato == null) t.st.affamato = phases.length;
      });
      // i debiti troppo vecchi si trasformano in risentimento
      alive().forEach((t) => Object.keys(t.owes).forEach((id) => { if (!byId[id].alive) delete t.owes[id]; }));
    }
    function pushFallen() {
      const n = pendingFallen.length;
      const fl = theme.fallen;
      const text = (n === 0 ? fl[0] : n === 1 ? fl[1] : fl[2]).replace('{n}', n);
      phases.push({ kind: 'fallen', day, title: (theme.labels && theme.labels.fallen) || 'I caduti', intro: text, events: [], deaths: pendingFallen.slice(), snap: snapshot() });
      pendingFallen = [];
    }
    const loversEnd = () => { const a = alive(); return !cfg.teamWin && a.length === 2 && a[0].partner === a[1].id && runLovers(); };

    let feastDone = false, lastDisaster = -9;
    const usedDisasters = new Set();
    while (true) {
      day++;
      if (day === 1) runPhase('b', pools.b, theme.phase.b, theme.intro.b);
      if (isEnded() || loversEnd()) break;
      runPhase('d', pools.d, theme.phase.d + ' ' + day, theme.intro.d);
      if (isEnded() || loversEnd()) break;
      const a = alive().length;
      if (!feastDone && day >= 3 && a >= 4 && (rng.chance(0.35) || day >= 6)) {
        feastDone = true;
        runPhase('f', pools.f, theme.phase.f, theme.intro.f);
      } else if (day >= 2 && pools.disasters.length && day - lastDisaster > 1 && rng.chance(0.32 * Math.min(1.5, diff))) {
        let opts = pools.disasters.filter((d) => !usedDisasters.has(d.n));
        if (!opts.length) { usedDisasters.clear(); opts = pools.disasters; }
        const dz = rng.pick(opts);
        usedDisasters.add(dz.n); lastDisaster = day;
        runPhase('dis', dz.out.concat(pools.ds), dz.n, dz.intro, { adult: !!dz.adult });
      }
      if (isEnded() || loversEnd()) break;
      runPhase('n', pools.n, theme.phase.n + ' ' + day, theme.intro.n);
      endOfDay();
      if (isEnded() || loversEnd()) break;
      pushFallen();
      if (day >= maxDays) { runFinale(); break; }
    }
    if (pendingFallen.length) pushFallen();

    const winners = alive();
    const ranking = T.slice().sort((a, b) => (a.alive === b.alive ? (b.order - a.order) : a.alive ? -1 : 1));
    ranking.forEach((t, i) => (t.rank = t.alive ? 1 : i + 1));
    const stripped = T.map((t) => ({
      id: t.id, name: t.name, gender: t.gender, team: t.team, color: t.color, img: t.img, traits: t.traits,
      alive: t.alive, kills: t.kills, killIds: t.killIds, killerIds: t.killerIds, deathDay: t.deathDay,
      deathPhase: t.deathPhase, deathText: t.deathText, deathHtml: t.deathHtml, rank: t.rank, order: t.order,
      events: t.events, alliancesFormed: t.alliancesFormed, betrayals: t.betrayals, items: t.items,
      inv: t.inv.map((x) => x.name), st: Object.keys(t.st),
      fame: t.fame, revenges: t.revenges, saves: t.saves, repaid: t.repaid, amulets: t.amulets, traitor: t.traitor, attr: t.attr, tests: t.tests, testsPassed: t.testsPassed,
      partner: t.partner, exPartner: t.exPartner,
    }));
    return { version: 2, theme: theme.id, adult, seed, days: day, phases, tributes: stripped, winners: winners.map((t) => t.id), stats };
  }

  /* ---------------- Cast casuale ---------------- */
  const PALETTE = ['#e0564b', '#e8913a', '#d9b334', '#7cb342', '#26a69a', '#29a3d6', '#5c7cfa', '#9c6ade', '#d65db1', '#8d6e63', '#78909c', '#ef7d9c'];
  function randomCast(n, seed, teamSize) {
    const rng = makeRng('cast|' + seed);
    const ts = Math.max(1, teamSize || 2);
    const pools = { M: rng.shuffle(D.names.M), F: rng.shuffle(D.names.F), N: rng.shuffle(D.names.N) };
    const used = new Set();
    const out = [];
    for (let i = 0; i < n; i++) {
      const g = rng.chance(0.06) ? 'N' : i % 2 === 0 ? 'F' : 'M';
      let name = pools[g].find((x) => !used.has(x));
      if (!name) name = 'Concorrente ' + (i + 1);
      used.add(name);
      const traits = rng.shuffle(D.traits).slice(0, rng.int(3)).map((t) => t.id);
      const attr = {};
      D.attrs.forEach((a) => (attr[a.id] = 2 + rng.int(8)));
      out.push({ id: 'c' + Date.now().toString(36) + i + rng.int(1e6).toString(36), name, gender: g, team: Math.floor(i / ts) + 1, color: PALETTE[Math.floor(i / ts) % PALETTE.length], img: '', traits, attr });
    }
    return out;
  }

  /* ---------------- Anteprima eventi personalizzati ---------------- */
  function previewCustom(c, themeId) {
    const theme = D.themes.find((t) => t.id === themeId) || D.themes[0];
    const ev = parseLine(customToLine(c), 'custom');
    const sample = [['Aurora', 'F'], ['Bruno', 'M'], ['Chiara', 'F'], ['Dario', 'M'], ['Elena', 'F'], ['Fabio', 'M']];
    const rng = makeRng('preview');
    const lex = buildPools(theme, [], false).lex;
    const roles = sample.slice(0, ev.n).map(([name, gender], i) => ({ id: 'p' + i, name, gender, color: PALETTE[i], inv: [{ type: 'arma', name: lex.arma[0] }] }));
    const ctx = {};
    const lexPick = (k) => (ctx[k] != null ? ctx[k] : (ctx[k] = rng.pick(lex[k] || ['qualcosa'])));
    let s = ev.text
      .replace(/\{(caro|perso|partner):([A-F])\}/g, () => 'chi non c\'è più')
      .replace(/\[([A-F]+):([^\]]*)\]/g, (_, ls, opts) => genderPick(letters(ls).map((i) => roles[i]), opts))
      .replace(POSS_RE, (_, it, c2) => possessive(it === 'arma' ? roles[L(c2)].inv[0] : null, 'il suo bottino'))
      .replace(LEX_RE, (_, k) => lexPick(k));
    s = cap(artPrep(s));
    return esc(s).replace(/\{([A-F])\}/g, (_, c2) => '<b class="nm" style="--c:' + roles[L(c2)].color + '">' + roles[L(c2)].name + '</b>');
  }

  G.LOS = { simulate, parseLine, parseBlock, parseDisasters, buildPools, makeRng, randomCast, countTemplates, previewCustom, customToLine, PALETTE, STATUS_LABEL, DIFF };
})(typeof window !== 'undefined' ? window : globalThis);
