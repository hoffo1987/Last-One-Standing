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
      const self = tok.match(/^(?:ok:|ko:)?(?:hit|save|give|owe|repay|debt|grudge|forgive|steal|k|tr):([A-F])[<>]([A-F])/) || tok.match(/^(?:ok:|ko:)?(?:love|couple|friend|enemy|rel):([A-F])([A-F])/);
      if (self && self[1] === self[2]) throw new Error('Etichetta riferita due volte alla stessa persona "' + tok + '" in: ' + line);
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
      if ((m = tok.match(/^give:([A-F])>([A-F])=(\w+)$/))) { tgt.fx.push({ t: 'give', r: [L(m[1]), L(m[2])], item: m[3] }); if (tgt === ev) ev.req.push({ t: 'has', item: m[3], r: ID(m[1]) }); continue; }
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
    const named = new Set();
    for (const re of [/\{([A-F])\}/g, /\{(?:caro|perso|partner):([A-F])\}/g]) { let mm; while ((mm = re.exec(text))) named.add(mm[1]); }
    for (let i = 0; i < ev.n; i++) if (!named.has(String.fromCharCode(65 + i))) throw new Error('Il concorrente {' + String.fromCharCode(65 + i) + '} partecipa ma non è nominato nel testo: ' + line);
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
  const edFix = (s) => s.replace(/ e ((?:<b[^>]*>)?)(?=[Ee][^\s])/g, ' ed $1').replace(/(^|[ («])a ((?:<b[^>]*>)?)(?=[AÀ][^\s'’])/g, '$1ad $2');
  const nameTag = (t) => '<b class="nm" data-id="' + esc(t.id) + '" style="--c:' + esc(t.color || '#888') + '">' + esc(t.name) + '</b>';

  /* ---------------- Simulazione ---------------- */
  const DIFF = { bassa: 0.6, normale: 1, alta: 1.45, massacro: 2.2 };
  const BASE_P = { b: 0.3, d: 0.15, n: 0.1, f: 0.38, dis: 0.26 };
  const STATUS_LABEL = { ferito: 'Ferito', avvelenato: 'Avvelenato', malato: 'Malato', affamato: 'Affamato', lutto: 'In lutto', ubriaco: 'Ubriaco', sconvolto: 'Sconvolto' };
  const STATUS_TTL = { ubriaco: 2, lutto: 6, sconvolto: 5 };
  const ITEM_NAME = { med: 'un kit medico', trap: 'una trappola' };
  Object.assign(STATUS_LABEL, (D.eco && D.eco.statusLabel) || {});
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

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
    // ecosistema dell'arena: regole, indicatore, zone e meteo
    const ECO = D.eco || { arenas: {}, txt: {} };
    const R = ECO.arenas[theme.id] || ECO.arenas.classico || { key: [], drain: {}, mods: {}, zones: [], meteo: [], meter: null };
    const M = R.meter || null;
    const MOD = Object.assign({ forage: 1, heal: 1, weapon: 1, stealth: 1, fame: 1, sponsor: 1, night: 1, beast: 1, trap: 1, amulet: 0.85, map: 1, greed: 1, nightAlone: 0 }, R.mods);
    const DR = Object.assign({ food: 1, en: 1, mo: 1 }, R.drain);
    const ZP = theme.lex.luogo.map((_, i) => (R.zones && R.zones[i]) || [1, 1, 0.5]);
    const KEYW = [1, 0.7, 0.5];
    const keyBonus = (t) => (R.key || []).reduce((s, a, i) => s + ((t.attr[a] != null ? t.attr[a] : 5) - 5) * KEYW[i], 0);
    let W = { n: '', d: '', fx: {} };
    const wx = (k, d) => (W.fx && W.fx[k] != null ? W.fx[k] : d);
    const TX = (k) => (R.txt && R.txt[k]) || (theme.soft && ECO.txtSoft && ECO.txtSoft[k]) || (ECO.txt && ECO.txt[k]) || [];
    const closed = new Set(); // zone inghiottite dalla tempesta (Battle Royale)
    const traps = []; const zoneLoot = {};
    let SYS = []; let pendingNotes = [];

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
      hp: 100, en: 90, mo: 55, food: 70, pr: 0, infected: false, infKnown: false, cause: null, hurtPh: -1, sawDeath: -1,
      foraged: 0, nursed: 0, shared: 0, trapKills: 0, trapsSet: 0, survivedBeasts: 0,
    }));
    if (T.length < 2) throw new Error('Servono almeno 2 concorrenti.');
    T.forEach((t) => {
      t.zone = rng.int(zoneCount);
      t.food = clamp(64 + t.attr.sop * 2, 0, 100);
      t.mo = clamp(50 + (t.attr.car - 5) * 2 + (t.attr.cor - 5) * 2 + (t.traits.includes('leader') ? 5 : 0) + (t.traits.includes('paranoico') ? -6 : 0), 20, 85);
    });
    const byId = Object.fromEntries(T.map((t) => [t.id, t]));

    // affinità reciproca (-100 … 100)
    const AFF = new Map();
    T.forEach((t, i) => (t.ix = i));
    const akey = (a, b) => (a.ix < b.ix ? a.ix * 4096 + b.ix : b.ix * 4096 + a.ix);
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
    const stats = { events: 0, alliances: 0, betrayals: 0, firstBlood: null, deathsByDay: [], envDeaths: 0, killDeaths: 0, items: 0, revenges: 0, couples: 0, debtsRepaid: 0, amulets: 0, sponsors: 0, echoes: 0, tests: 0, testsPassed: 0,
      causes: {}, shared: 0, nursed: 0, foraged: 0, trapsSet: 0, trapHits: 0, beasts: 0, infected: 0, cured: 0, broken: 0, looted: 0, meteo: [], expelled: 0 };

    const hasItem = (t, it) => t.inv.some((x) => x.type === it);
    const itemOf = (t, it) => t.inv.find((x) => x.type === it);
    const statusCount = (t) => Object.keys(t.st).filter((s) => s !== 'lutto' && s !== 'grave').length;
    const traitSum = (t, key) => t.traits.reduce((s, id) => s + ((traitMap[id] && traitMap[id][key]) || 0), 0);
    const hasTrait = (t, id) => t.traits.includes(id);
    const weaponPow = (t) => { const w = itemOf(t, 'arma'); return w ? (2.2 + (w.q || 2) * 0.9) * MOD.weapon : 0; };
    const meterBad = (t) => !!(M && t.st[M.st] != null);
    // combattimento: caratteristiche, arma (e sua qualità), condizione fisica, umore, tratti, arena
    const combat = (t) => t.attr.for + t.attr.agi + 0.5 * t.attr.int + 0.3 * t.attr.res + 0.2 * t.attr.fort +
      weaponPow(t) + (hasItem(t, 'esplosivo') ? 2 : 0) - Math.min(5, (100 - t.hp) / 18) - (t.st.malato != null ? 2 : 0) -
      (t.st.ubriaco != null ? 2 : 0) - (t.st.affamato != null ? 1.5 : 0) - (t.st.sconvolto != null ? 1 : 0) - (t.st.esausto != null ? 2 : 0) -
      (t.st.disperato != null ? 1 : 0) - (meterBad(t) ? 1.5 : 0) + (t.mo >= 80 ? 1 : 0) + (t.st.lutto != null ? 1.5 : 0) + traitSum(t, 'c') + Math.min(3, t.kills * 0.5) + 0.15 * keyBonus(t);
    // sopravvivenza: resistenza, salute, energie, morale, indicatore e caratteristiche chiave dell'arena, riparo della zona
    const survival = (t) => 0.4 * t.attr.res + 0.3 * t.attr.fort + 0.2 * t.attr.agi + 0.3 * t.attr.sop + 0.1 * t.attr.cor + traitSum(t, 's') - 1.2 * statusCount(t) +
      (hasItem(t, 'amuleto') ? 2 : 0) + (t.hp - 70) / 15 + (t.en - 60) / 40 + (t.mo - 50) / 50 - t.pr / 40 + 0.3 * keyBonus(t) + (ZP[t.zone][2] - 0.5);
    // prova di abilità: caratteristica + dado + fortuna + tratti − condizioni
    function rollTest(t, attr, dc) {
      const base = t.attr[attr] != null ? t.attr[attr] : 5;
      let bonus = Math.round((t.attr.fort - 5) / 3) + traitSum(t, 'tb');
      if (hasTrait(t, 'fortunato')) bonus += 1; if (hasTrait(t, 'sfortunato')) bonus -= 2;
      if (t.hp < 55) bonus -= 1; if (t.hp < 30) bonus -= 1; if (t.st.ubriaco != null) bonus -= 2; if (t.st.affamato != null) bonus -= 1;
      if (t.st.sconvolto != null) bonus -= 1; if (t.st.malato != null || t.st.avvelenato != null) bonus -= 1; if (t.st.lutto != null && attr === 'for') bonus += 1;
      if (t.st.esausto != null) bonus -= 1; if (t.st.disperato != null) bonus -= 1; if (t.mo >= 80) bonus += 1; if (meterBad(t)) bonus -= 1;
      if ((attr === 'int' || attr === 'sop') && hasItem(t, 'mappa')) bonus += 2;
      if (attr === 'for' && hasItem(t, 'arma')) bonus += 1;
      const tb = wx('tb', null); if (tb && tb[attr]) bonus += tb[attr];
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

    function gains0(ev) {
      const g = {};
      ev.fx.concat(ev.ok.fx).forEach((f) => { if (f.t === 'gain' && f.r[0] === 0) g[f.item] = 1; if (f.t === 'cure' && f.r[0] === 0) g.med = 1; });
      return g;
    }
    // contesto di P letto una volta sola per scelta: lo stato non cambia finché l'evento non viene applicato
    let CTX = null;
    function ctxOf(P) {
      if (CTX && CTX.P === P) return CTX;
      return (CTX = { P, grudge: Object.keys(P.grudges).some((id) => byId[id].alive), owe: Object.keys(P.owes).length > 0 || T.some((t) => t.alive && t.owes[P.id]),
        traitor: T.some((t) => t.alive && t.traitor && t !== P), feared: T.some((t) => t.alive && t.kills >= 3 && t !== P) });
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
        else if (r.t === 'grudge' && ctxOf(P).grudge) w *= 7;
        else if (r.t === 'owe' && ctxOf(P).owe) w *= 4;
        else if (r.t === 'couple' && P.partner) w *= 3.5;
        else if (r.t === 'lost' && P.lost) w *= 3;
        else if (r.t === 'fame' && P.fame >= 3) w *= 2;
        else if (r.t === 'traitor' && ctxOf(P).traitor) w *= 2;
        else if (r.t === 'feared' && ctxOf(P).feared) w *= 2;
        else if (r.t === 'canLove' && !P.partner) w *= 1.2;
      }
      // condizione fisica, umore, bisogni, arena e meteo spostano le scelte
      const tg = (x) => ev.tags.includes(x);
      if (tg('agg')) w *= (0.35 + 0.0065 * P.hp) * (P.en < 25 ? 0.6 : 1) * (P.mo >= 80 ? 1.2 : 1);
      if (tg('cow')) w *= (P.hp < 50 ? 1.8 : 1) * (P.mo < 30 ? 1.5 : 1);
      if (tg('heal')) w *= P.hp < 55 ? 2.2 : 1;
      if (tg('food')) w *= P.food < 35 ? 2.4 : P.food > 80 ? 0.6 : 1;
      if (tg('stl')) w *= MOD.stealth * wx('stl', 1);
      if (tg('show') || tg('gift')) w *= MOD.fame * wx('fame', 1);
      if (tg('betray') || tg('steal')) w *= (P.mo < 25 ? 1.8 : 1) * (P.food < 20 ? 1.5 : 1) * (tg('steal') ? MOD.greed : 1);
      if ((tg('soc') || tg('ally')) && P.mo < 30 && !hasTrait(P, 'solitario')) w *= 1.3;
      const g0 = ev.g0 || (ev.g0 = gains0(ev));
      if (g0.cibo && P.food < 40) w *= 1.8;
      if (g0.med && P.hp < 55) w *= 2;
      if (g0.arma && !hasItem(P, 'arma')) w *= 1.3;
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
      return { betray: 'il tradimento', steal: 'il furto di ieri', attack: 'l\'agguato di ieri', love: 'il cuore spezzato', greed: 'il cibo negato' }[g.why] || 'tutto quello che è successo';
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

    // ---------- ecosistema: testi e valori vitali ----------
    function sysText(k, people, vars) {
      const fits = (x) => { let mx = -1; x.replace(/[{\[](\d)[}:]/g, (_, d) => { mx = Math.max(mx, +d); }); return mx < people.length; };
      const list = (Array.isArray(TX(k)) ? TX(k) : []).filter(fits); if (!list.length) return null;
      let s = rng.pick(list);
      s = s.replace(/\[(\d):([^\]]*)\]/g, (_, i, o) => genderPick([people[+i]], o))
        .replace(/\{(i|ip|z|m|n|d)\}/g, (_, x) => (vars && vars[x] != null ? vars[x] : ''))
        .replace(LEX_RE, (_, k2) => (k2 === 'luogo' && vars && vars.z ? vars.z : rng.pick(LEX[k2] || ['qualcosa'])));
      s = cap(artPrep(s));
      return { plain: edFix(s.replace(/\{(\d)\}/g, (_, i) => people[+i].name)), html: edFix(esc(s).replace(/\{(\d)\}/g, (_, i) => nameTag(people[+i]))) };
    }
    function sys(k, people, vars, o, pri) {
      const tx = sysText(k, people, vars); if (!tx) return null;
      const ev = Object.assign({ html: tx.html, plain: tx.plain, ids: people.map((p) => p.id), deaths: [], lethal: false, origin: 'sys', cat: 'none', why: 'conseguenza', echo: [] }, o || {});
      SYS.push({ pri: pri || 1, ev });
      return ev;
    }
    function syncSt(t) {
      const ph = phases.length;
      const set = (k, on) => { if (on) { if (t.st[k] == null) t.st[k] = ph; } else delete t.st[k]; };
      t.hp = Math.min(100, t.hp); t.en = clamp(t.en, 0, 100); t.mo = clamp(t.mo, 0, 100); t.food = clamp(t.food, 0, 100); t.pr = clamp(t.pr, 0, 100);
      set('ferito', t.hp < 55); set('grave', t.hp < 25); set('affamato', t.food < 25); set('esausto', t.en < 22); set('disperato', t.mo < 22);
      if (M) set(M.st, M.infect ? t.infected && t.pr >= M.thr : t.pr >= M.thr);
    }
    function hurt(t, dmg, by, cause, inTick) {
      if (!t.alive) return;
      dmg *= Math.max(0.55, 1.2 - t.attr.res * 0.04) * (hasTrait(t, 'sopravvissuto') ? 0.85 : 1);
      const hp0 = t.hp;
      t.hp -= dmg; if (!inTick) t.hp = Math.max(Math.min(8, hp0), t.hp);
      t.hurtPh = phases.length;
      if (by && by !== t) t.cause = { k: cause === 'trap' ? 'trap' : 'wound', by: by.id, ph: phases.length };
      else if (cause) t.cause = { k: cause, ph: phases.length, by: null };
      if (M && M.infect && !t.infected && (cause === 'wound' || cause === 'beast' || by) && rng.chance(M.infect * Math.max(0.4, 1.2 - t.attr.res * 0.05))) {
        t.infected = true; t.pr = Math.max(t.pr, 8); stats.infected++;
        sys('infect', [t], {}, { cat: 'hurt', why: 'infezione' }, 3);
      }
      t.mo -= Math.min(10, dmg / 4);
      syncSt(t);
    }
    const capInv = (t) => { while (t.inv.length > 7) t.inv.shift(); };
    function eat(t) {
      const i = t.inv.findIndex((x) => x.type === 'cibo'); if (i < 0) return false;
      t.inv.splice(i, 1); t.food += 50; t.mo += 3;
      if (M && M.coffee) t.pr -= 12;
      syncSt(t); return true;
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
      if (!v.deathKind) v.deathKind = killers.length ? 'kill' : 'event';
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
          const dm = hasTrait(k, 'spietato') || hasTrait(k, 'folle') ? 6 : hasTrait(k, 'pacifista') ? -25 : -(4 + Math.max(0, k.attr.emp - 5) * 3);
          k.mo += dm < 0 ? dm * DR.mo : dm;
          if (M && M.kill) k.pr += M.kill * Math.max(0.4, 1.2 - k.attr.emp * 0.06);
          if (dm <= -15 && out.length < 3 && rng.chance(0.5)) { const e = sysText('remorse', [k, v]); if (e) out.push(Object.assign(e, { cls: '' })); }
          else if (dm > 0 && k.kills === 2 && out.length < 3 && rng.chance(0.5)) { const e = sysText('bloodlust', [k]); if (e) out.push(Object.assign(e, { cls: 'warn' })); }
          const w = itemOf(k, 'arma');
          if (w && rng.chance(0.07 * MOD.weapon)) {
            k.inv.splice(k.inv.indexOf(w), 1); stats.broken++;
            const e = sysText('weaponBreak', [k], { i: w.name, ip: possessive(w) }); if (e && out.length < 3) out.push(Object.assign(e, { cls: '' }));
          }
          syncSt(k);
          if (k.grudges[v.id]) {
            const g = k.grudges[v.id]; delete k.grudges[v.id]; k.revenges++; stats.revenges++; k.fame += 2;
            const e = g.victim && byId[g.victim] ? echo(E.revenge, [k, v, byId[g.victim]], 'good') : echo(E.revengeAny, [k, v], 'good');
            if (e) out.push(e);
          }
          if (k.kills === 3) { const e = echo(E.feared, [k], 'warn'); if (e) out.push(e); }
          if (k.partner === v.id) { k.partner = null; k.exPartner = v.id; }
        });
        if (!stats.firstBlood) stats.firstBlood = { killers: v.killerIds.slice(), victim: v.id, day };
        // il bottino: chi uccide fruga nello zaino della vittima
        const K = killers.find((k) => k.alive);
        if (K && v.inv.length) {
          let took = 0;
          v.inv.slice().forEach((it) => {
            if (took >= 2) return;
            const mine = itemOf(K, it.type);
            if (it.type === 'arma' ? !mine || (it.q || 2) > (mine.q || 2) : !mine || it.type === 'cibo') {
              if (it.type === 'arma' && mine) K.inv.splice(K.inv.indexOf(mine), 1);
              K.inv.push(Object.assign({}, it)); took++; stats.looted++;
              if (took === 1 && out.length < 3 && rng.chance(0.4)) { const e = sysText(theme.soft ? 'lootSoft' : 'loot', [K, v], { i: it.name }); if (e) out.push(Object.assign(e, { cls: '' })); }
            }
          });
          capInv(K);
        }
      } else {
        stats.envDeaths++;
        if (!stats.firstBlood) stats.firstBlood = { killers: [], victim: v.id, day };
        if (v.inv.length) (zoneLoot[v.zone] = zoneLoot[v.zone] || []).push(...v.inv.map((it) => ({ it, from: v.id })));
      }
      T.forEach((X) => { if (X.alive && X.zone === v.zone) X.sawDeath = phases.length; });
      // chi amava o stimava la vittima reagisce
      let echoed = 0;
      T.forEach((X) => {
        if (!X.alive || killers.includes(X) || X === v) return;
        const lover = X.partner === v.id;
        const thr = 45 - (X.attr.emp - 5) * 3 - (hasTrait(X, 'vendicativo') ? 15 : 0) + (hasTrait(X, 'clemente') ? 20 : 0);
        const close = lover || aff(X, v) >= thr || (oldAlly != null && X.allyId === oldAlly && !hasTrait(X, 'clemente'));
        if (!close) return;
        if (lover) { X.partner = null; X.exPartner = v.id; X.st.lutto = phases.length; X.mo -= 35 * DR.mo; }
        else if (aff(X, v) >= 60 - (X.attr.emp - 5) * 4) { X.st.lutto = phases.length; X.mo -= 20 * DR.mo; }
        else X.mo -= 8 * DR.mo;
        syncSt(X);
        X.lost = v.id;
        killers.forEach((K) => {
          if (addGrudge(X, K, 'kill', v) && echoed < 2) { const e = echo(lover ? E.grudgeLover : E.grudgeKill, [X, K, v], 'warn'); if (e) { out.push(e); echoed++; } }
        });
        if (!killers.length && lover && echoed < 2) { const e = echo(E.griefOnly, [X, v], 'warn'); if (e) { out.push(e); echoed++; } }
      });
      if (v.partner) { const p = byId[v.partner]; if (p) { p.partner = null; p.exPartner = v.id; } v.partner = null; }
    }
    function giveItem(t, type, ctx, lexPick, name, q) {
      const nm = name || (type === 'arma' ? lexPick('arma') : type === 'cibo' ? ctx.cibo || 'delle provviste' : ITEM_NAME[type] || lexPick(type));
      const it = { type, name: nm };
      if (type === 'arma') {
        it.q = q || clamp(Math.round(0.7 + rng.f() * 2.2 * MOD.weapon), 1, 3);
        const old = itemOf(t, 'arma');
        if (old) { if ((old.q || 2) > it.q && !name) { it.q = old.q; it.name = old.name; } t.inv.splice(t.inv.indexOf(old), 1); }
      }
      t.inv.push(it); t.items++; stats.items++;
      if (type === 'cibo' && t.food < 45) eat(t);
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
      who.mo += res.pass ? 4 : -4;
      out.testRes = { who: who.id, attr: ev.test.attr, roll: res.roll, dc: res.dc, pass: res.pass };
      return out;
    }
    function apply(ev, roles) {
      CTX = null;
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
          const atk = ev.kills.find((k) => k.v.includes(i));
          hurt(v, 30, atk ? roles[atk.by[0]] : null, 'wound');
          ev.kills.forEach((k) => { if (k.v.includes(i)) k.by.forEach((b) => addGrudge(v, roles[b], 'attack')); });
          return;
        }
        // la tempra: chi è in forma e resistente a volte sopravvive al colpo, ma ridotto malissimo
        const tough = 0.03 + (v.attr.res - 5) * 0.022 + (v.attr.fort - 5) * 0.01 + (hasTrait(v, 'sopravvissuto') ? 0.08 : 0) + (v.mo >= 80 ? 0.03 : 0);
        if (v.alive && v.hp >= 60 && alive().length > 2 && rng.chance(Math.max(0, tough))) {
          saved.add(i);
          const atk = ev.kills.find((k) => k.v.includes(i));
          const K = atk ? roles[atk.by[0]] : null;
          v.hp = 9 + rng.int(10); v.hurtPh = phases.length; v.cause = K ? { k: 'wound', by: K.id, ph: phases.length } : { k: 'wound', ph: phases.length, by: null };
          if (K) { addGrudge(v, K, 'attack'); K.fame += 1; }
          if (M && M.infect && !v.infected && rng.chance(M.infect)) { v.infected = true; v.pr = 10; stats.infected++; }
          syncSt(v); stats.tough = (stats.tough || 0) + 1;
          const e = sysText(K ? 'tough' : 'toughEnv', K ? [v, K] : [v]); if (e) out.push(Object.assign(e, { cls: 'twist' }));
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
            if (ts.length > 1) { joinAlliance(ts); stats.alliances++; ts.forEach((x) => { x.alliancesFormed++; x.mo += 10; ts.forEach((y) => x.id < y.id && addAff(x, y, Math.round(25 * (0.7 + (x.attr.car + y.attr.car) / 30)))); }); }
            break;
          }
          case 'br': {
            const g = t.allyId != null ? [...(alliances.get(t.allyId) || [])].map((id) => byId[id]).filter((x) => x !== t && x.alive) : [];
            leaveAlliance(t); t.betrayals++; t.traitor = true; stats.betrayals++;
            let n = 0; g.forEach((x) => { x.mo -= 18 * DR.mo; if (addGrudge(x, t, 'betray') && n++ < 1) { const e = echo(E.betray, [x, t], 'warn'); if (e) out.push(e); } });
            break;
          }
          case 'gain': giveItem(t, f.item, ctx, lexPick); break;
          case 'lose': { const i = t.inv.findIndex((x) => x.type === f.item); if (i >= 0) t.inv.splice(i, 1); if (f.item === 'cibo') t.food += 40; if (f.item === 'med') t.hp = Math.max(t.hp, 70); break; }
          case 'steal': {
            const i = u.inv.findIndex((x) => x.type === 'arma');
            if (i >= 0) { const [it] = u.inv.splice(i, 1); giveItem(t, 'arma', ctx, lexPick, it.name, it.q); u.mo -= 10; if (u.alive && addGrudge(u, t, 'steal')) { const e = echo(E.steal, [u, t], 'warn'); if (e) out.push(e); } }
            break;
          }
          case 'give': {
            if (!u.alive) break;
            const own = itemOf(t, f.item);
            if (own) t.inv.splice(t.inv.indexOf(own), 1);
            giveItem(u, f.item, ctx, lexPick, own ? own.name : null, own && own.q);
            u.owes[t.id] = 'dono'; addAff(t, u, 20); u.mo += 8;
            if (rng.chance(0.6)) { const e = echo(E.debt, [u, t], ''); if (e) out.push(e); }
            break;
          }
          case 'status': {
            if (f.s === 'ferito') { hurt(t, 30 + rng.int(18), null, 'wound'); t.hp = Math.min(t.hp, 46); }
            else if (f.s === 'affamato') t.food = Math.min(t.food, 18);
            else {
              t.st[f.s] = phases.length;
              if (f.s === 'ubriaco') { t.fame += 1; t.en -= 8; t.mo += 8; }
              else if (f.s === 'sconvolto') { t.mo -= 15 * DR.mo; if (M && !M.infect) t.pr += 6; }
              else if (f.s === 'lutto') t.mo -= 25 * DR.mo;
              else if (f.s === 'avvelenato' || f.s === 'malato') { t.hp -= 8; t.cause = { k: f.s === 'avvelenato' ? 'poison' : 'sick', ph: phases.length }; }
            }
            syncSt(t);
            break;
          }
          case 'cure': {
            t.st = t.st.lutto != null ? { lutto: t.st.lutto } : {};
            t.hp = Math.max(t.hp, 72); t.en += 10; t.mo += 6;
            if (M && M.cure) { if (M.infect) { if (t.infected && t.pr < M.cure) { t.infected = false; t.pr = 0; stats.cured++; } } else t.pr -= M.cure; }
            syncSt(t);
            const helper = roles.find((x) => x !== t && x.alive);
            if (helper && ev.n > 1) { t.owes[helper.id] = 'cura'; addAff(t, helper, 30); helper.saves++; if (rng.chance(0.5)) { const e = echo(E.debt, [t, helper], ''); if (e) out.push(e); } }
            break;
          }
          case 'hit': if (u.alive) { hurt(u, (28 + rng.int(18)) * (1 + weaponPow(t) / 12), t, 'wound'); u.mo -= 6; if (addGrudge(u, t, 'attack') && rng.chance(0.6)) { const e = echo(E.hit, [u, t], 'warn'); if (e) out.push(e); } } break;
          case 'save': if (u.alive) { u.owes[t.id] = 'vita'; addAff(t, u, 40); u.mo += 15; t.saves++; t.fame += 1; const e = echo(E.saved, [u, t], 'good'); if (e) out.push(e); } break;
          case 'forgive': delete t.grudges[u.id]; addAff(t, u, 35); break;
          case 'love': if (u.alive) {
            t.partner = u.id; u.partner = t.id; addAff(t, u, 70); stats.couples++; t.fame += 1; u.fame += 1; t.mo += 25; u.mo += 25;
            if (!cfg.teamWin && (t.allyId == null || u.allyId == null || t.allyId === u.allyId)) { const g = t.allyId != null ? alliances.get(t.allyId) : u.allyId != null ? alliances.get(u.allyId) : null; if (!g || g.size < 5) joinAlliance([t, u]); } const e = echo(E.couple, [t, u], 'love'); if (e) out.push(e); } break;
          case 'repay': if (u) { delete t.owes[u.id]; addAff(t, u, 20); t.repaid++; stats.debtsRepaid++; const e = echo(E.repay, [t, u], 'good'); if (e) out.push(e); } break;
          case 'debt': if (u) t.owes[u.id] = 'favore'; break;
          case 'rel': if (u) addAff(t, u, f.v); break;
          case 'star': t.fame += 2; t.mo += 10; if (t.fame >= 5 && !t.starred) { t.starred = true; const e = echo(E.star, [t], 'good'); if (e) out.push(e); } break;
        }
      }
      // l'evento lascia il segno sui rapporti
      if (ev.tags.includes('show')) roles.forEach((t) => { if (t.alive) { t.fame += 1 + (hasTrait(t, 'esibizionista') ? 1 : 0) + (t.attr.car >= 8 ? 1 : 0); if (t.fame >= 5 && !t.starred) { t.starred = true; const e = echo(E.star, [t], 'good'); if (e) out.push(e); } } });
      if (!ev.lethal && ev.req.some((r) => r.t === 'ally')) for (const a of roles) for (const b of roles) if (a.id < b.id) addAff(a, b, 6);
      if (ev.lethal) roles.forEach((x) => { if (x.alive && !ev.kills.some((k) => k.by.some((i) => roles[i] === x))) { x.mo -= 6 * Math.max(0.3, 1.4 - x.attr.cor / 10) * DR.mo; x.sawDeath = phases.length; } });
      roles.forEach((x) => x.alive && syncSt(x));
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
      if (kind === 'n') p *= MOD.night;
      p *= wx('lethal', 1);
      return Math.min(0.9, Math.max(0.03, p));
    }

    function snapshot() {
      const zones = {}, allies = {}, st = {}, inv = {}, kills = {}, rel = {}, vit = {};
      T.forEach((t) => {
        zones[t.id] = t.zone; allies[t.id] = t.allyId; st[t.id] = Object.keys(t.st); inv[t.id] = t.inv.map((x) => x.name + (x.type === 'arma' && x.q ? ['', ' ★', ' ★★', ' ★★★'][x.q] : '')); kills[t.id] = t.kills;
        if (t.alive) vit[t.id] = [Math.round(Math.max(0, t.hp)), Math.round(t.en), Math.round(t.mo), Math.round(t.food), M && (!M.infect || t.infected) ? Math.round(t.pr) : -1];
        const friends = T.filter((u) => u !== t && u.alive && aff(t, u) >= 40).map((u) => u.id);
        const enemies = T.filter((u) => u !== t && u.alive && aff(t, u) <= -40 && !t.grudges[u.id]).map((u) => u.id);
        rel[t.id] = { p: t.partner, g: Object.keys(t.grudges).filter((id) => byId[id].alive).map((id) => [id, t.grudges[id].why, t.grudges[id].victim]), o: Object.keys(t.owes).filter((id) => byId[id].alive), f: t.fame, tr: t.traitor, fr: friends, en: enemies, lost: t.lost };
      });
      return { alive: alive().map((t) => t.id), zones, allies, st, inv, kills, rel, vit, closed: [...closed] };
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
      CTX = null;
      if (!pools.sponsor.length) return;
      const cands = alive().filter((t) => t.fame >= (MOD.sponsor >= 1.4 ? 2 : 3)).sort((a, b) => b.fame - a.fame);
      if (!cands.length || !rng.chance(Math.min(0.85, (0.25 + cands[0].fame * 0.06) * MOD.sponsor * wx('fame', 1)))) return;
      const P = cands[0];
      const opts = pools.sponsor.filter((e) => e.n === 1 && checkReq(e, [P]));
      const ev = rng.wpick(opts, (e) => weightFor(e, P));
      if (!ev) return;
      const r = apply(ev, [P]); r.why = r.why || 'fama'; r.sponsor = true; events.push(r); stats.sponsors++; P.mo += 15; syncSt(P);
    }

    /* ---------- ecosistema: conseguenze automatiche ---------- */
    const allyMates = (t) => (t.allyId != null ? [...(alliances.get(t.allyId) || [])].map((id) => byId[id]).filter((x) => x && x !== t && x.alive) : []);
    const buddies = (t) => { const a = allyMates(t); if (t.partner && byId[t.partner] && byId[t.partner].alive && !a.includes(byId[t.partner])) a.push(byId[t.partner]); return a; };
    const zoneName = (z) => theme.lex.luogo[z] || theme.lex.luogo[0];
    const d6 = () => 2 + rng.int(6) + rng.int(6);

    function meterTick(t, kind) {
      if (!M || (M.infect && !t.infected)) return;
      let g = M.gain[kind] || 0;
      if (g > 0) {
        if (M.alone && kind !== 'd' && !buddies(t).length) g += M.alone * (hasTrait(t, 'solitario') ? 0.3 : 1);
        if (M.wound && t.hurtPh === phases.length) g += M.wound;
        if (M.death && t.sawDeath === phases.length) g += M.death;
        if (M.zoneMult) g *= ZP[t.zone][1];
        if (M.id === 'freddo') g *= 1.25 - ZP[t.zone][2] * 0.5;
        if (!M.infect) {
          const r = M.resist.reduce((s2, a) => s2 + (t.attr[a] != null ? t.attr[a] : 5), 0) / M.resist.length;
          g *= Math.max(0.35, 1.3 - r * 0.07);
          if (buddies(t).length) g *= M.ally;
          if (M.amulet && hasItem(t, 'amuleto')) g *= M.amulet;
          if (hasTrait(t, 'superstizioso') && theme.id === 'horror') g *= 1.2;
        } else g *= Math.max(0.6, 1.25 - t.attr.res * 0.05);
      }
      if (!M.infect) g += wx('pr', 0) * 0.6;
      if (M.noDecay && g < 0) g = 0;
      const was = t.pr;
      t.pr = clamp(t.pr + g, 0, 100);
      if (!M.infect && was < M.thr && t.pr >= M.thr) sys('meterUp', [t], { m: M.name.toLowerCase() }, { cat: 'hurt', why: 'arena' }, 1);
      if (t.pr >= 100 && !M.infect) hurt(t, M.dmg, null, 'meter', true);
    }

    // l'infezione: si scopre, si cura, si viene cacciati, ci si trasforma
    function infectionTick(t) {
      if (!M || !M.infect || !t.infected) return;
      if (t.pr >= 28 && t.pr < M.cure && hasItem(t, 'med')) {
        const it = itemOf(t, 'med'); t.inv.splice(t.inv.indexOf(it), 1); t.infected = false; t.pr = 0; stats.cured++;
        sys('selfMed', [t], { i: it.name }, { cat: 'heal', why: 'infezione' }, 3); return;
      }
      if (t.pr >= M.thr && !t.infKnown) {
        t.infKnown = true;
        const mates = buddies(t);
        const doc = mates.find((x) => hasItem(x, 'med'));
        if (doc && t.pr < M.cure) {
          const it = itemOf(doc, 'med'); doc.inv.splice(doc.inv.indexOf(it), 1); t.infected = false; t.pr = 0; stats.cured++;
          t.owes[doc.id] = 'cura'; addAff(t, doc, 30); doc.saves++; t.mo += 10;
          sys('cure', [t, doc], {}, { cat: 'heal', why: 'infezione' }, 4); return;
        }
        const judge = allyMates(t).find((x) => x.partner !== t.id && (hasTrait(x, 'paranoico') || x.attr.emp <= 4 || rng.chance(0.4)));
        if (judge && !hasTrait(judge, 'leale')) {
          leaveAlliance(t); addAff(t, judge, -35); t.mo -= 25; stats.expelled++;
          sys('expel', [t, judge], {}, { cat: 'betray', why: 'infezione' }, 4);
        }
      }
      if (t.pr >= 100) { t.cause = { k: 'infect', ph: phases.length }; t.hp = 0; }
    }

    // la notte: si mangia, si cerca cibo, si divide, si cura, si dorme, si piazzano trappole
    function nightEnd() {
      const A = alive();
      A.forEach((t) => {
        while (t.food < 60 && hasItem(t, 'cibo')) eat(t);
        // esplorazione: cibo dalla zona o bottino dei caduti
        if (!hasItem(t, 'cibo') && t.food < 65) {
          const loot = zoneLoot[t.zone];
          const li = loot ? loot.findIndex((x) => !itemOf(t, x.it.type) || x.it.type === 'cibo') : -1;
          if (li >= 0 && rng.chance(0.3 + t.attr.sop * 0.03)) {
            const { it, from } = loot.splice(li, 1)[0];
            t.inv.push(Object.assign({}, it)); capInv(t); t.items++; stats.items++; stats.looted++;
            sys('scavenge', [t, byId[from]], { i: it.name, z: zoneName(t.zone) }, { cat: 'item', why: 'bottino', ids: [t.id] }, 2);
            if (it.type === 'cibo' && t.food < 45) eat(t);
          } else {
            const p = (0.08 + t.attr.sop * 0.045 + (hasTrait(t, 'cacciatore') ? 0.15 : 0) + (hasItem(t, 'mappa') ? 0.12 * MOD.map : 0)) * ZP[t.zone][0] * MOD.forage * wx('forage', 1) * (t.en < 25 ? 0.6 : 1);
            if (rng.chance(Math.min(0.92, p))) {
              const hungry = t.food < 40; t.foraged++; stats.foraged++;
              const nm = rng.pick(LEX.cibo || ['delle provviste']);
              if (t.food < 50) t.food += 34; else { t.inv.push({ type: 'cibo', name: nm }); capInv(t); t.items++; }
              if (hungry || rng.chance(0.15)) sys('forage', [t], {}, { cat: 'item', why: 'esplorazione' }, hungry ? 2 : 0);
            }
          }
        }
      });
      // le alleanze dividono il cibo, oppure litigano
      const seenG = new Set();
      A.forEach((t) => {
        if (t.allyId == null || seenG.has(t.allyId)) return; seenG.add(t.allyId);
        const g = [t].concat(allyMates(t));
        g.filter((x) => x.food < 30 && !hasItem(x, 'cibo')).forEach((h) => {
          const donor = g.filter((x) => x !== h && hasItem(x, 'cibo') && x.food >= 35).sort((a, b) => b.attr.emp - a.attr.emp)[0];
          if (!donor) return;
          const will = donor.attr.emp / 10 + (hasTrait(donor, 'generoso') ? 0.5 : 0) + (hasTrait(donor, 'leale') ? 0.25 : 0) - (hasTrait(donor, 'avido') ? 0.7 : 0) + aff(donor, h) / 200 + (donor.partner === h.id ? 0.6 : 0) - (MOD.greed - 1) * 0.3;
          const it = itemOf(donor, 'cibo');
          if (rng.chance(clamp(will, 0.05, 0.95))) {
            donor.inv.splice(donor.inv.indexOf(it), 1); h.food += 48; h.mo += 8; h.owes[donor.id] = h.owes[donor.id] || 'dono'; addAff(h, donor, 18); donor.shared++; stats.shared++;
            sys('share', [donor, h], { i: it.name }, { cat: 'heal', why: 'alleanza' }, 3);
          } else {
            addAff(h, donor, -25); h.mo -= 8;
            if (aff(h, donor) <= -40) addGrudge(h, donor, 'greed');
            sys('greed', [donor, h], { i: it.name }, { cat: 'betray', why: 'alleanza' }, 3);
          }
          syncSt(h);
        });
      });
      // cure: alleati e partner medicano i feriti
      A.forEach((t) => {
        if (!t.alive || t.hp >= 50) return;
        const mates = buddies(t);
        const doc = mates.find((x) => hasItem(x, 'med')) || mates.find((x) => hasTrait(x, 'guaritore') || (x.attr.int >= 7 && x.attr.emp >= 6) || x.partner === t.id);
        if (doc && (hasItem(doc, 'med') || rng.chance(0.55 + doc.attr.emp * 0.03))) {
          const it = itemOf(doc, 'med');
          if (it) { doc.inv.splice(doc.inv.indexOf(it), 1); t.hp += 45 * MOD.heal; delete t.st.avvelenato; }
          else t.hp += (16 + doc.attr.int * 1.5 + (hasTrait(doc, 'guaritore') ? 12 : 0)) * MOD.heal * wx('heal', 1);
          t.owes[doc.id] = t.owes[doc.id] || 'cura'; addAff(t, doc, 16); doc.saves++; doc.nursed++; stats.nursed++; t.mo += 6;
          if (M && M.cure && !M.infect && it) t.pr -= M.cure * 0.6;
          sys(it ? 'nurseMed' : 'nurse', [doc, t], { i: it ? it.name : '' }, { cat: 'heal', why: 'cure' }, 3);
        } else if (hasItem(t, 'med') && t.hp < 45) {
          const it2 = itemOf(t, 'med'); t.inv.splice(t.inv.indexOf(it2), 1); t.hp += 40 * MOD.heal; delete t.st.avvelenato;
          sys('selfMed', [t], { i: it2.name }, { cat: 'heal', why: 'cure' }, 2);
        }
        syncSt(t);
      });
      // sonno, guarigione naturale e umore
      let watchMsg = 0;
      A.forEach((t) => {
        if (!t.alive) return;
        const mates = buddies(t), alone = !mates.length;
        let rest = 12 + t.attr.res * 1.1 + (t.allyId != null ? 10 : 0) + (t.partner ? 6 : 0) + ZP[t.zone][2] * 12 - (hasTrait(t, 'sonnambulo') ? 10 : 0) - (meterBad(t) ? 8 : 0) - (t.st.lutto != null ? 6 : 0);
        if (alone && MOD.nightAlone) rest -= 10 * MOD.nightAlone;
        t.en += rest / Math.max(0.8, wx('en', 1));
        if (t.allyId != null && !watchMsg && rng.chance(0.12)) { const m = allyMates(t)[0]; if (m) { watchMsg++; sys('watch', [t, m], {}, { cat: 'ally', why: 'riposo' }, 0); } }
        if (t.food >= 25 && t.en >= 20 && t.st.avvelenato == null) {
          const wasF = t.hp < 55;
          const helpers = mates.some((x) => hasTrait(x, 'guaritore')) ? 6 : 0;
          t.hp += (2 + t.attr.res * 0.7 + (hasTrait(t, 'guaritore') ? 5 : 0) + helpers) * MOD.heal * wx('heal', 1);
          if (wasF && t.hp >= 55 && rng.chance(0.25)) sys('healed', [t], {}, { cat: 'heal', why: 'riposo' }, 0);
        }
        if (t.st.malato != null && rng.chance(0.12 + t.attr.res * 0.04)) delete t.st.malato;
        // una ferita lasciata senza cure si infetta
        else if (t.hp < 45 && t.st.malato == null && rng.chance(Math.max(0.04, 0.3 - t.attr.res * 0.025) / MOD.heal)) {
          t.st.malato = phases.length; t.cause = { k: t.cause && t.cause.by ? 'wound' : 'sick', by: t.cause ? t.cause.by : null, ph: t.cause && t.cause.by ? t.cause.ph : phases.length };
          sys('woundSick', [t], {}, { cat: 'hurt', why: 'ferite' }, 2);
        }
        let dm = (t.allyId != null ? 4 : 0) + (t.partner ? 6 : 0) + (mates.some((x) => hasTrait(x, 'leader')) ? 3 : 0) + (t.fame >= 3 ? 2 : 0) +
          (alone ? (hasTrait(t, 'solitario') ? 2 : -3) : 0) - (t.food < 25 ? 6 : 0) - (t.hp < 40 ? 6 : 0) - (meterBad(t) ? 5 : 0);
        if (dm < 0) dm *= DR.mo;
        t.mo += dm + (58 - t.mo) * 0.08;
        syncSt(t);
      });
      // il morale a pezzi: conforto, furti tra alleati, abbandoni
      A.forEach((t) => {
        if (!t.alive || t.mo >= 24) return;
        const p = t.partner && byId[t.partner] && byId[t.partner].alive ? byId[t.partner] : null;
        if (p && rng.chance(0.7)) { t.mo += 22; addAff(t, p, 8); sys('comfort', [p, t], {}, { cat: 'love', why: 'morale' }, 2); }
        else if (t.allyId != null && !hasTrait(t, 'leale')) {
          const mark = allyMates(t).find((x) => hasItem(x, 'cibo'));
          if (mark && (hasTrait(t, 'avido') || hasTrait(t, 'traditore') || t.food < 15) && rng.chance(0.6)) {
            const it = itemOf(mark, 'cibo'); mark.inv.splice(mark.inv.indexOf(it), 1); t.inv.push(it); eat(t); capInv(t);
            leaveAlliance(t); t.traitor = true; addGrudge(mark, t, 'steal');
            sys('moraleSteal', [t, mark], { i: it.name }, { cat: 'betray', why: 'morale' }, 4);
          } else if (rng.chance(0.4)) {
            const m = allyMates(t); leaveAlliance(t); m.forEach((x) => addAff(x, t, -12));
            sys('moraleLeave', [t], {}, { cat: 'none', why: 'morale' }, 3);
          }
        }
        syncSt(t);
      });
      // ossigeno e pause caffè: chi sa arrangiarsi si rimette in sesto
      if (M && (M.refill || M.coffee)) A.forEach((t) => {
        if (!t.alive || t.pr < 40) return;
        const p = 0.2 + t.attr.int * 0.05 + (hasItem(t, 'mappa') ? 0.15 * MOD.map : 0) + (t.allyId != null ? 0.1 : 0);
        if (rng.chance(p)) {
          const was = t.pr; t.pr -= 32 + rng.int(20); const m = allyMates(t)[0];
          if (was >= M.thr || rng.chance(0.3)) { const k = TX('refill').length ? 'refill' : null; if (k) sys(k, m && rng.chance(0.4) ? [t, m] : [t], {}, { cat: 'heal', why: 'arena' }, 1); }
          syncSt(t);
        }
      });
      // trappole: chi le ha e sa usarle le piazza
      A.forEach((t) => {
        const tr = itemOf(t, 'trap');
        if (!tr || !t.alive) return;
        if ((t.attr.int >= 6 || hasTrait(t, 'ingegnoso') || hasTrait(t, 'cacciatore') || rng.chance(0.3)) && rng.chance(0.55)) {
          t.inv.splice(t.inv.indexOf(tr), 1); traps.push({ owner: t.id, zone: t.zone, ph: phases.length, name: tr.name }); t.trapsSet++; stats.trapsSet++;
          if (rng.chance(0.45)) sys('trapSet', [t], { i: tr.name, z: zoneName(t.zone) }, { cat: 'item', why: 'trappola' }, 1);
        }
      });
      // la notte porta predatori, soprattutto per chi dorme solo e stanco
      let attacks = 0;
      rng.shuffle(alive()).forEach((t) => {
        if (attacks >= 2 || !LEX.mostro) return;
        const alone = !buddies(t).length;
        const p = 0.035 * MOD.beast * wx('beast', 1) * ZP[t.zone][1] * (alone ? 1.6 * (MOD.nightAlone ? 1 + MOD.nightAlone * 0.5 : 1) : 0.45) * (t.en < 30 ? 1.5 : 1) * (hasTrait(t, 'furtivo') ? 0.6 : 1) * Math.sqrt(diff);
        if (!rng.chance(p)) return;
        attacks++; stats.beasts++;
        const def = Math.max(t.attr.furt, t.attr.agi, t.attr.cor) + d6() + (hasItem(t, 'arma') ? 2 : 0) + (alone ? 0 : 3) + (t.st.esausto != null ? -2 : 0);
        if (def >= 14) { t.survivedBeasts++; if (!alone) { allyMates(t).forEach((x) => addAff(t, x, 6)); sys('beastFend', [t], {}, { cat: 'ally', why: 'predatori' }, 2); } return; }
        hurt(t, 22 + rng.int(18), null, 'beast', true);
        if (t.hp > 0) sys('beastHit', [t], {}, { cat: 'hurt', why: 'predatori' }, 3);
      });
      if (alive().length > 1 && day > 1 && rng.chance(0.2)) { const ex = alive().find((t) => t.en < 15); if (ex) sys('exhausted', [ex], {}, { cat: 'hurt', why: 'riposo' }, 0); }
      alive().forEach((t) => Object.keys(t.owes).forEach((id) => { if (!byId[id].alive) delete t.owes[id]; }));
    }

    // a ogni fase: consumi, veleni, emorragie, indicatore dell'arena, tempesta, trappole
    function phaseTick(kind) {
      const A = alive();
      A.forEach((t) => {
        const fm = DR.food * wx('food', 1) * (hasTrait(t, 'goloso') ? 1.4 : 1) * (t.attr.sop >= 8 ? 0.75 : t.attr.sop <= 3 ? 1.2 : 1);
        t.food -= ({ b: 5, d: 10, n: 8, dis: 10, f: 2 }[kind] || 7) * fm;
        t.en -= ({ b: 12, d: 15, n: 10, dis: 15, f: 10 }[kind] || 12) * DR.en * wx('en', 1) * (t.st.ubriaco != null ? 1.3 : 1);
        if (t.food < 35 && hasItem(t, 'cibo')) eat(t);
        if (t.st.avvelenato != null) {
          if (rng.chance(0.08 + t.attr.res * 0.03)) { delete t.st.avvelenato; if (rng.chance(0.3)) sys('poisonCleared', [t], {}, { cat: 'heal', why: 'cure' }, 0); }
          else hurt(t, Math.max(3, 10 - t.attr.res * 0.6), null, 'poison', true);
        }
        if (t.st.malato != null) { const c0 = t.cause; hurt(t, Math.max(2, 6 - t.attr.res * 0.3), null, 'sick', true); if (c0 && c0.by && c0.k === 'wound') t.cause = c0; }
        if (t.food <= 0) hurt(t, 9, null, 'starve', true);
        if (t.en <= 0) hurt(t, 5, null, 'exhaust', true);
        if (t.hp < 25 && t.hp > 0) {
          const it = itemOf(t, 'med');
          if (it) { t.inv.splice(t.inv.indexOf(it), 1); t.hp += 40 * MOD.heal; delete t.st.avvelenato; sys('selfMed', [t], { i: it.name }, { cat: 'heal', why: 'cure' }, 2); }
          else { const c = t.cause; t.hp -= Math.max(2, 7 - t.attr.res * 0.4); if (t.hp < 15 && rng.chance(0.3)) sys('grave', [t], {}, { cat: 'hurt', why: 'ferite' }, 1); t.cause = c; }
        }
        meterTick(t, kind);
        infectionTick(t);
        const ex = itemOf(t, 'esplosivo');
        if (ex && t.st.ubriaco != null && rng.chance(0.15)) {
          t.inv.splice(t.inv.indexOf(ex), 1); hurt(t, 38, null, 'accident', true); t.accItem = ex.name;
          if (t.hp > 0) sys('accident', [t], { i: ex.name }, { cat: 'hurt', why: 'incidente' }, 2);
        }
        syncSt(t);
      });
      // la tempesta del Battle Royale
      if (closed.size) {
        let msgs = 0;
        alive().forEach((t) => {
          if (!closed.has(t.zone)) return;
          const z = zoneName(t.zone);
          const esc2 = 0.3 + t.attr.agi * 0.05 + t.en / 260 + (hasItem(t, 'mappa') ? 0.2 : 0);
          if (rng.chance(esc2)) { if (msgs < 1 && rng.chance(0.25)) { msgs++; sys('stormEscape', [t], { z }, { cat: 'none', why: 'tempesta' }, 0); } }
          else { hurt(t, (14 + rng.int(14)) * wx('storm', 1), null, 'storm', true); t.stormZ = z; if (t.hp > 0 && msgs < 2) { msgs++; sys('storm', [t], { z }, { cat: 'hurt', why: 'tempesta' }, 2); } }
          const open = [...Array(zoneCount).keys()].filter((i) => !closed.has(i));
          t.zone = rng.pick(open);
        });
      }
      // le trappole scattano
      for (let k = traps.length - 1; k >= 0; k--) {
        const tp = traps[k], owner = byId[tp.owner];
        if (phases.length - tp.ph > 9) { traps.splice(k, 1); continue; }
        if (tp.ph >= phases.length) continue;
        const here = rng.shuffle(alive().filter((x) => x.zone === tp.zone && x.id !== tp.owner));
        for (const v of here) {
          if (!rng.chance(0.16 * MOD.trap * wx('trap', 1))) continue;
          traps.splice(k, 1);
          const z = zoneName(tp.zone);
          const dodge = Math.max(v.attr.furt, v.attr.int, v.attr.agi) + d6() + (hasTrait(v, 'fortunato') ? 1 : 0) + (hasTrait(v, 'paranoico') ? 1 : 0);
          if (dodge >= 15) { addAff(v, owner, -15); sys('trapDodge', [owner, v], { z }, { cat: 'none', why: 'trappola' }, 2); break; }
          stats.trapHits++;
          const friendly = owner.allyId != null && owner.allyId === v.allyId;
          hurt(v, 32 + rng.int(22), owner.alive && !friendly ? owner : null, friendly ? 'wound' : 'trap', true);
          v.trapZ = z;
          if (friendly) { addAff(v, owner, -30); if (v.hp > 0) sys('trapAlly', [owner, v], { z }, { cat: 'hurt', why: 'trappola' }, 3); }
          else { if (owner.alive) { v.cause = { k: 'trap', by: owner.id, ph: phases.length }; addGrudge(v, owner, 'attack'); } if (v.hp > 0) sys('trapHit', [owner, v], { z }, { cat: 'hurt', why: 'trappola' }, 3); }
          break;
        }
      }
    }

    // chi è sceso a zero muore, e la sua morte ha un colpevole se c'è
    const CAUSE = { wound: ['woundDeath', 'ferite'], poison: ['poisonDeath', 'ferite'], sick: ['sickDeath', 'ferite'], starve: ['starveDeath', 'stenti'], exhaust: ['exhaustDeath', 'stenti'], meter: ['meterDeath', 'arena'], infect: ['meterDeath', 'infezione'], storm: ['stormDeath', 'tempesta'], beast: ['beastDeath', 'predatori'], trap: ['trapKill', 'trappola'], accident: ['accidentDeath', 'incidente'] };
    function resolveVitals() {
      let dying = alive().filter((t) => t.hp <= 0);
      if (!dying.length) return;
      const keep = alive().length - dying.length;
      if (keep < 1) { dying.sort((a, b) => b.hp - a.hp); const s2 = dying.shift(); s2.hp = 5; s2.pr = Math.min(s2.pr, 90); if (s2.infected) s2.pr = 80; syncSt(s2); }
      dying.forEach((t) => {
        if (!t.alive) return;
        const c = t.cause || { k: 'wound' };
        let k = (CAUSE[c.k] || CAUSE.wound)[0];
        const why = (CAUSE[c.k] || CAUSE.wound)[1];
        let K = c.by && byId[c.by] && byId[c.by].alive && byId[c.by] !== t && phases.length - c.ph <= 8 ? byId[c.by] : null;
        if (K && K.allyId != null && K.allyId === t.allyId) K = null;
        if (cfg.teamWin && K && K.team === t.team) K = null;
        if (k === 'woundDeath' && !K) k = 'woundDeathAny';
        if (k === 'trapKill' && !K) k = 'woundDeathAny';
        let people = k === 'trapKill' ? [K, t] : K ? [t, K] : [t];
        let mercy = null;
        if (c.k === 'infect') { mercy = buddies(t).find((x) => x.attr.cor >= 6); if (mercy && rng.chance(0.5)) { k = 'mercy'; people = [t, mercy]; mercy.mo -= 20; } else mercy = null; }
        const z = (c.k === 'storm' && t.stormZ) || (c.k === 'trap' && t.trapZ) || zoneName(t.zone);
        const tx = sysText(k, people, { z, i: t.accItem || '', m: M ? M.name.toLowerCase() : '' }) || sysText('woundDeathAny', [t], {});
        const out = [];
        t.deathKind = c.k;
        kill(t, K ? [K] : [], tx, out);
        if (K && c.k === 'trap') { K.trapKills++; }
        stats.causes[c.k] = (stats.causes[c.k] || 0) + 1;
        SYS.push({ pri: 9, ev: { html: tx.html, plain: tx.plain, ids: people.map((p) => p.id), deaths: [t.id], lethal: true, origin: 'sys', cat: K ? 'kill' : 'death', why, echo: out.slice(0, 3) } });
      });
    }

    function runPhase(kind, pool, title, intro, opt) {
      const events = pendingNotes.splice(0);
      SYS = [];
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
        // valori costanti finché P non ha un evento: calcolati una volta sola
        CTX = null;
        const nAlive = alive().length;
        let n = 0; un.forEach((id) => { if (byId[id].alive) n++; });
        const wc = new Map();
        const wOf = (e) => { let w = wc.get(e); if (w === undefined) { w = weightFor(e, P); wc.set(e, w); } return w; };
        const candL = pool.filter((e) => e.lethal && e.n <= n && e.victims.length < nAlive && !e.risky);
        const candS = pool.filter((e) => !e.lethal && e.n <= n && (!e.risky || nAlive > 2));
        for (let attempt = 0; attempt < 25 && !done; attempt++) {
          const wantLethal = nAlive > 1 && rng.chance(pL);
          const cand = wantLethal ? candL : candS;
          const ev = rng.wpick(cand, wOf);
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
      // conseguenze automatiche della fase
      if (kind === 'n') nightEnd();
      phaseTick(kind);
      resolveVitals();
      const deathsSys = SYS.filter((x) => x.ev.deaths.length).map((x) => x.ev);
      const capN = kind === 'n' ? 5 : kind === 'b' ? 1 : 3;
      const sysDead = new Set(deathsSys.flatMap((e) => e.deaths));
      const rest = SYS.filter((x) => !x.ev.deaths.length && x.ev.ids.every((id) => byId[id].alive || sysDead.has(id))).map((x) => [x, x.pri + rng.f()]).sort((a, b) => b[1] - a[1]).slice(0, capN).map((x) => x[0].ev);
      events.push(...rest, ...deathsSys);
      SYS = [];
      const died = before - alive().length;
      noDeathStreak = died ? 0 : noDeathStreak + 1;
      phases.push(Object.assign({ kind, day, title, intro, events, snap: snapshot(), meteo: W.n ? { n: W.n, d: W.d } : null }, opt || {}));
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

    // il meteo del giorno e, nel Battle Royale, la zona che si stringe
    function newDay() {
      const list = R.meteo || [];
      if (list.length) {
        const calm = { n: '', d: '', fx: {} };
        const pick = rng.chance(day === 1 ? 0.35 : 0.72) ? rng.pick(list.filter((m) => m.n !== W.n)) : calm;
        W = pick || calm;
        if (W.n) {
          stats.meteo.push({ day, n: W.n });
          const html = ((ECO.txt && ECO.txt.meteo) || '<b>{n}.</b> {d}').replace('{n}', esc(W.n)).replace('{d}', esc(W.d));
          pendingNotes.push({ html, plain: W.n + '. ' + W.d, ids: [], deaths: [], lethal: false, note: true, meteo: true });
        }
      }
      if (MOD.storm && day >= 2) {
        const open = [...Array(zoneCount).keys()].filter((i) => !closed.has(i));
        const n = wx('storm', 1) > 1.3 ? 2 : 1;
        for (let k = 0; k < n && open.length > 2; k++) {
          const z = open.splice(rng.int(open.length), 1)[0]; closed.add(z);
          const tx = sysText('stormClose', [], { z: zoneName(z) });
          if (tx) pendingNotes.push({ html: tx.html, plain: tx.plain, ids: [], deaths: [], lethal: false, note: true });
        }
      }
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
      newDay();
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
      foraged: t.foraged, nursed: t.nursed, shared: t.shared, trapKills: t.trapKills, trapsSet: t.trapsSet, survivedBeasts: t.survivedBeasts,
      deathCause: t.alive ? null : t.deathKind || null,
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

  /* Rende un testo con concorrenti fittizi tutti dello stesso genere (per i controlli automatici) */
  function renderSample(text, themeId, gender) {
    const theme = D.themes.find((t) => t.id === themeId) || D.themes[0];
    const lex = Object.assign({}, D.lexDefault || {}, theme.lex);
    (D.packs || []).forEach((pk) => { if (pk.lex && pk.theme === theme.id) Object.assign(lex, pk.lex); });
    const names = ['Alfa', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'];
    const roles = names.map((name, i) => ({ id: 'x' + i, name, gender, inv: ITEMS.split('|').map((type) => ({ type, name: (lex[type] || ['un oggetto'])[0] })) }));
    const pick = (k) => (lex[k] || ['qualcosa'])[0];
    let s = text
      .replace(/\{(caro|perso|partner):([A-F])\}/g, (_, k, c) => names[(L(c) + 1) % 6])
      .replace(/\[([A-F]+):([^\]]*)\]/g, (_, ls, opts) => genderPick(letters(ls).map((i) => roles[i]), opts))
      .replace(POSS_RE, (_, it, c2) => possessive(roles[L(c2)].inv.find((x) => x.type === it), 'il suo bottino'))
      .replace(LEX_RE, (_, k) => pick(k));
    s = cap(artPrep(s));
    return s.replace(/\{([A-F])\}/g, (_, c) => names[L(c)]);
  }

  G.LOS = { renderSample, simulate, parseLine, parseBlock, parseDisasters, buildPools, makeRng, randomCast, countTemplates, previewCustom, customToLine, PALETTE, STATUS_LABEL, DIFF };
})(typeof window !== 'undefined' ? window : globalThis);
