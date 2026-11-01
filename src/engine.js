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
  const ITEMS = 'arma|cibo|med|trap';

  function parseLine(line, origin) {
    const bar = line.indexOf('|');
    if (bar < 0) throw new Error('Manca "|" in: ' + line);
    const head = line.slice(0, bar).trim().split(/\s+/);
    const text = line.slice(bar + 1).trim();
    const ev = { n: +head[0], text, kills: [], dies: [], req: [], fx: [], tags: [], w: 1, origin: origin || 'base' };
    if (!(ev.n >= 1 && ev.n <= 6)) throw new Error('Numero di concorrenti non valido in: ' + line);
    let m;
    for (const tok of head.slice(1)) {
      if (tok[0] === '@') { ev.tags.push(tok.slice(1)); continue; }
      if (tok[0] === '*') { ev.w = parseFloat(tok.slice(1)); continue; }
      if ((m = tok.match(/^(k|tr):([A-F]+)>([A-F]+)$/))) {
        const k = { by: letters(m[2]), v: letters(m[3]), betray: m[1] === 'tr' };
        ev.kills.push(k);
        if (k.betray) { ev.req.push({ t: 'ally', r: [k.by[0], k.v[0]] }); ev.tags.push('betray'); }
        else ev.req.push({ t: 'foe', a: k.by, b: k.v });
        continue;
      }
      if ((m = tok.match(/^d:([A-F]+)$/))) { ev.dies.push(...letters(m[1])); continue; }
      if ((m = tok.match(/^al:([A-F]+)$/))) { const r = letters(m[1]); ev.fx.push({ t: 'al', r }); ev.req.push({ t: 'canAlly', r }); continue; }
      if ((m = tok.match(/^ally:([A-F]+)$/))) { ev.req.push({ t: 'ally', r: letters(m[1]) }); continue; }
      if ((m = tok.match(/^br:([A-F])$/))) { const r = [L(m[1])]; ev.fx.push({ t: 'br', r }); ev.req.push({ t: 'hasAlly', r }); ev.tags.push('betray'); continue; }
      if ((m = tok.match(/^w:([A-F])$/))) { ev.req.push({ t: 'has', item: 'arma', r: [L(m[1])] }); continue; }
      if ((m = tok.match(new RegExp('^\\+(' + ITEMS + '):([A-F])$')))) { ev.fx.push({ t: 'gain', item: m[1], r: [L(m[2])] }); continue; }
      if ((m = tok.match(new RegExp('^-(' + ITEMS + '):([A-F])$')))) { ev.fx.push({ t: 'lose', item: m[1], r: [L(m[2])] }); ev.req.push({ t: 'has', item: m[1], r: [L(m[2])] }); continue; }
      if ((m = tok.match(/^(cibo|med|trap):([A-F])$/))) { const r = [L(m[2])]; ev.req.push({ t: 'has', item: m[1], r }); ev.fx.push({ t: 'lose', item: m[1], r }); continue; }
      if ((m = tok.match(/^steal:([A-F])<([A-F])$/))) { ev.req.push({ t: 'has', item: 'arma', r: [L(m[2])] }); ev.fx.push({ t: 'steal', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^s:([A-F])=(\w+)$/))) { ev.fx.push({ t: 'status', r: [L(m[1])], s: m[2] }); continue; }
      if ((m = tok.match(/^need:([A-F])=(\w+|\*)$/))) { ev.req.push({ t: 'need', r: [L(m[1])], s: m[2] }); continue; }
      if ((m = tok.match(/^cure:([A-F])$/))) { ev.fx.push({ t: 'cure', r: [L(m[1])] }); continue; }
      throw new Error('Etichetta sconosciuta "' + tok + '" in: ' + line);
    }
    const vic = new Set(ev.dies);
    ev.kills.forEach((k) => k.v.forEach((v) => vic.add(v)));
    ev.victims = [...vic];
    ev.lethal = ev.victims.length > 0;
    ev.cat = ev.kills.some((k) => k.betray) ? 'betray' : ev.kills.length ? 'kill' : ev.dies.length ? 'death' :
      ev.fx.some((f) => f.t === 'br') ? 'betray' : ev.fx.some((f) => f.t === 'al') ? 'ally' : ev.fx.some((f) => f.t === 'cure') ? 'heal' :
      ev.fx.some((f) => f.t === 'status') ? 'hurt' : ev.fx.some((f) => f.t === 'gain' || f.t === 'steal') ? 'item' : 'none';
    // tutte le lettere usate devono rientrare in n
    const used = new Set();
    for (const re of [/\{([A-F])\}/g, /\{arma:([A-F])\}/g, /\[([A-F]+):/g]) {
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

  /* Evento personalizzato creato dall'interfaccia → riga del formato */
  function customToLine(c) {
    const toks = [String(c.n)];
    const dies = (c.dies || []).filter((x) => x !== c.killer);
    if (c.killer && dies.length) toks.push('k:' + c.killer + '>' + dies.join(''));
    else if (dies.length) toks.push('d:' + dies.join(''));
    toks.push('*2');
    return toks.join(' ') + ' | ' + c.text;
  }

  const PHASES = ['b', 'd', 'n', 'f', 'finale', 'ds', 'fallback'];
  function parseDisasters(src, origin) {
    if (!src) return [];
    return src.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
      const p = l.split('|').map((x) => x.trim());
      if (p.length < 5) throw new Error('Disastro incompleto: ' + l);
      const st = p[5] || 'ferito';
      return { n: p[0], intro: p[1], out: parseBlock('1 d:A | ' + p[2] + '\n1 s:A=' + st + ' | ' + p[3] + '\n1 | ' + p[4], origin) };
    });
  }
  const poolCache = {};
  function buildPools(theme, custom) {
    const key = theme.id + '|' + JSON.stringify(custom || []);
    if (poolCache[key]) return poolCache[key];
    const src = theme.soft ? theme.pool : D.core;
    const more = (D.more || {})[theme.id] || {};
    const pools = {};
    for (const k of PHASES) {
      pools[k] = parseBlock(src[k], theme.soft ? theme.id : 'base');
      if (!theme.soft && D.coreExtra && D.coreExtra[k]) pools[k] = pools[k].concat(parseBlock(D.coreExtra[k], 'base'));
      if (!theme.soft && theme.extra && theme.extra[k]) pools[k] = pools[k].concat(parseBlock(theme.extra[k], theme.id));
      if (more.extra && more.extra[k]) pools[k] = pools[k].concat(parseBlock(more.extra[k], theme.id));
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
    const ks = Object.keys(poolCache); if (ks.length > 30) delete poolCache[ks[0]];
    poolCache[key] = pools;
    return pools;
  }

  function countTemplates() {
    let events = 0, disasters = 0, outcomes = 0;
    const cnt = (s) => (s ? s.split('\n').filter((l) => l.trim() && l.includes('|')).length : 0);
    const perTheme = {};
    PHASES.forEach((k) => (events += cnt(D.core[k]) + cnt((D.coreExtra || {})[k])));
    D.themes.forEach((t) => {
      let e = 0, d = 0;
      const more = (D.more || {})[t.id] || {};
      if (t.soft) PHASES.forEach((k) => (e += cnt(t.pool[k])));
      if (!t.soft && t.extra) Object.values(t.extra).forEach((s) => (e += cnt(s)));
      if (more.extra) Object.values(more.extra).forEach((s) => (e += cnt(s)));
      (t.disasters || []).forEach((x) => { d += 1; outcomes += cnt(x.out); });
      const md = more.dis ? more.dis.split('\n').filter((l) => l.trim()).length : 0;
      d += md; outcomes += md * 3;
      events += e; disasters += d;
      perTheme[t.id] = { events: e, disasters: d };
    });
    return { events, disasters, outcomes, themes: D.themes.length, perTheme };
  }

  /* ---------------- Grammatica ---------------- */
  function genderPick(group, opts) {
    const o = opts.split('/');
    const gs = group.map((t) => t.gender || 'M');
    if (gs.every((g) => g === 'F')) return o[1] !== undefined ? o[1] : o[0];
    if (gs.every((g) => g === 'N')) return o[2] !== undefined ? o[2] : 'ə';
    if (gs.length === 1) return o[0];
    return o[0];
  }
  const ART = /^(un'|una |uno |un |il |lo |la |l'|i |gli |le )/i;
  function possessive(item) {
    if (!item) return 'la sua arma';
    const s = item.name;
    const m = s.match(ART);
    const bare = m ? s.slice(m[0].length) : s;
    const fem = m ? /^(una |un'|la |le )/i.test(m[0]) : false;
    return (fem ? 'la sua ' : 'il suo ') + bare;
  }
  // preposizioni articolate: "in la" → "nella", "di il" → "del", ...
  const PREP = { in: 'ne', di: 'de', a: 'a', da: 'da', su: 'su' };
  const ARTI = { lo: 'llo', la: 'lla', "l'": "ll'", gli: 'gli', le: 'lle' };
  function artPrep(s) {
    return s.replace(/(^|[^\p{L}'])(in|di|a|da|su) (il(?= )|lo(?= )|la(?= )|i(?= )|gli(?= )|le(?= )|l'(?=\p{L}))/gu, (m, pre, p, a) => {
      const P = PREP[p];
      const out = a === 'il' ? (P === 'ne' || P === 'de' ? P + 'l' : P + 'l') : a === 'i' ? P + 'i' : P + ARTI[a];
      return pre + out + (a === "l'" ? '' : '');
    });
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------------- Simulazione ---------------- */
  const DIFF = { bassa: 0.6, normale: 1, alta: 1.45, massacro: 2.2 };
  const BASE_P = { b: 0.3, d: 0.15, n: 0.1, f: 0.38, dis: 0.26 };
  const STATUS_LABEL = { ferito: 'Ferito', avvelenato: 'Avvelenato', malato: 'Malato', affamato: 'Affamato' };

  function simulate(cfg) {
    const theme = D.themes.find((t) => t.id === cfg.theme) || D.themes[0];
    const seed = cfg.seed == null || cfg.seed === '' ? String(Date.now()) : String(cfg.seed);
    const rng = makeRng(seed + '|' + theme.id);
    const pools = buildPools(theme, cfg.custom);
    const diff = DIFF[cfg.difficulty] || 1;
    const maxDays = Math.max(3, Math.min(60, cfg.maxDays || 20));
    const traitMap = Object.fromEntries(D.traits.map((t) => [t.id, t]));
    const zoneCount = theme.lex.luogo.length;

    const T = (cfg.cast || []).map((c, i) => ({
      id: c.id || 't' + i, name: (c.name || 'Concorrente ' + (i + 1)).trim(), gender: c.gender || 'M',
      team: c.team || i + 1, color: c.color, img: c.img || '',
      traits: (c.traits || []).filter((x) => traitMap[x]),
      attr: Object.assign({ for: 5, agi: 5, int: 5, car: 5, fort: 5, res: 5, furt: 5 }, c.attr || {}),
      alive: true, zone: 0, inv: [], st: {}, kills: 0, killIds: [], allyId: null,
      deathPhase: -1, deathDay: 0, deathText: '', deathHtml: '', killerIds: [], order: 0,
      events: 0, alliancesFormed: 0, betrayals: 0, items: 0,
    }));
    if (T.length < 2) throw new Error('Servono almeno 2 concorrenti.');
    T.forEach((t) => (t.zone = rng.int(zoneCount)));
    const byId = Object.fromEntries(T.map((t) => [t.id, t]));

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
      Object.values(teams).forEach((ms) => ms.length > 1 && joinAlliance(ms));
    }

    const alive = () => T.filter((t) => t.alive);
    const phases = [];
    let day = 0, deathCounter = 0, pendingFallen = [], noDeathStreak = 0;
    const stats = { events: 0, alliances: 0, betrayals: 0, firstBlood: null, deathsByDay: [], envDeaths: 0, killDeaths: 0, items: 0 };

    const hasItem = (t, it) => t.inv.some((x) => x.type === it);
    const weaponOf = (t) => t.inv.find((x) => x.type === 'arma');
    const statusCount = (t) => Object.keys(t.st).length;
    const traitSum = (t, key) => t.traits.reduce((s, id) => s + ((traitMap[id] && traitMap[id][key]) || 0), 0);
    const combat = (t) => t.attr.for + t.attr.agi + 0.5 * t.attr.int + 0.3 * t.attr.res + 0.2 * t.attr.fort +
      (weaponOf(t) ? 4 : 0) - (t.st.ferito != null ? 3 : 0) - (t.st.malato != null ? 2 : 0) + traitSum(t, 'c');
    const survival = (t) => 0.4 * t.attr.res + 0.3 * t.attr.fort + 0.2 * t.attr.agi + traitSum(t, 's') - 1.5 * statusCount(t);

    function isEnded() {
      const a = alive();
      if (a.length <= 1) return true;
      if (cfg.teamWin && a.every((t) => t.team === a[0].team)) return true;
      return false;
    }

    function checkReq(ev, roles) {
      for (const r of ev.req) {
        switch (r.t) {
          case 'ally': {
            const g = roles[r.r[0]].allyId;
            if (g == null || !r.r.every((i) => roles[i].allyId === g)) return false;
            break;
          }
          case 'canAlly': {
            const ts = r.r.map((i) => roles[i]);
            const gids = new Set(ts.map((t) => t.allyId).filter((x) => x != null));
            if (gids.size > 1) return false;
            if (gids.size === 1 && ts.every((t) => t.allyId != null)) return false;
            const size = gids.size ? alliances.get([...gids][0]).size + ts.filter((t) => t.allyId == null).length : ts.length;
            if (size > 5) return false;
            if (cfg.teamWin && new Set(ts.map((t) => t.team)).size > 1 && cfg.teamsAllied) return false;
            break;
          }
          case 'hasAlly': if (roles[r.r[0]].allyId == null) return false; break;
          case 'has': if (!hasItem(roles[r.r[0]], r.item)) return false; break;
          case 'need': {
            const t = roles[r.r[0]];
            if (r.s === '*' ? statusCount(t) === 0 : t.st[r.s] == null) return false;
            break;
          }
          case 'foe':
            for (const a of r.a) for (const b of r.b) {
              const A = roles[a], B = roles[b];
              if (A.allyId != null && A.allyId === B.allyId) return false;
              if (cfg.teamWin && A.team === B.team) return false;
            }
            break;
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
      }
      for (const r of ev.req) {
        if (r.t === 'need' && (r.s === '*' ? statusCount(P) > 0 : P.st[r.s] != null)) w *= 3;
        if (r.t === 'has' && hasItem(P, r.item)) w *= 1.6;
        if (r.t === 'ally' && P.allyId != null) w *= 1.4;
      }
      if (ev.origin === 'custom') w *= 1.5;
      if (ev.origin !== 'base' && ev.origin !== 'custom') w *= 1.3;
      return w;
    }

    function assign(ev, P, un) {
      const others = [];
      un.forEach((id) => id !== P.id && byId[id].alive && others.push(byId[id]));
      if (others.length < ev.n - 1) return null;
      let best = null, bestScore = -Infinity;
      for (let attempt = 0; attempt < 10; attempt++) {
        const keyed = others.map((t) => [t, (t.zone === P.zone ? 0 : 1) + rng.f() * 1.3]).sort((a, b) => a[1] - b[1]);
        const group = keyed.slice(0, ev.n - 1).map((x) => x[0]);
        const roles = rng.shuffle([P].concat(group));
        if (!checkReq(ev, roles)) continue;
        let score = rng.f() * 6;
        for (const k of ev.kills) {
          score += 0.6 * (k.by.reduce((s, i) => s + combat(roles[i]), 0) / k.by.length - k.v.reduce((s, i) => s + combat(roles[i]), 0) / k.v.length);
          k.v.forEach((i) => (score -= 0.5 * survival(roles[i])));
        }
        ev.dies.forEach((i) => (score -= survival(roles[i])));
        if (score > bestScore) { bestScore = score; best = roles; }
      }
      return best;
    }

    function render(text, roles, lexPick) {
      let s = text
        .replace(/\[([A-F]+):([^\]]*)\]/g, (_, ls, opts) => genderPick(letters(ls).map((i) => roles[i]), opts))
        .replace(/\{arma:([A-F])\}/g, (_, c) => possessive(weaponOf(roles[L(c)])))
        .replace(/\{(arma|cibo|luogo|mostro|trappola|rifugio|dono)\}/g, (_, k) => lexPick(k));
      s = cap(artPrep(s));
      const plain = s.replace(/\{([A-F])\}/g, (_, c) => roles[L(c)].name);
      const html = esc(s).replace(/\{([A-F])\}/g, (_, c) => {
        const t = roles[L(c)];
        return '<b class="nm" data-id="' + esc(t.id) + '" style="--c:' + esc(t.color || '#888') + '">' + esc(t.name) + '</b>';
      });
      return { plain, html };
    }

    function kill(v, killers, ev, txt) {
      if (!v.alive) return;
      v.alive = false;
      v.deathPhase = phases.length; v.deathDay = day; v.order = ++deathCounter;
      v.deathText = txt.plain; v.deathHtml = txt.html;
      v.killerIds = killers.map((k) => k.id);
      leaveAlliance(v);
      pendingFallen.push(v.id);
      if (killers.length) {
        stats.killDeaths++;
        killers.forEach((k) => { k.kills++; k.killIds.push(v.id); });
        if (!stats.firstBlood) stats.firstBlood = { killers: v.killerIds.slice(), victim: v.id, day };
      } else {
        stats.envDeaths++;
        if (!stats.firstBlood) stats.firstBlood = { killers: [], victim: v.id, day };
      }
      stats.deathsByDay[day] = (stats.deathsByDay[day] || 0) + 1;
    }

    function apply(ev, roles) {
      const ctx = {};
      const lexPick = (k) => (ctx[k] != null ? ctx[k] : (ctx[k] = rng.pick(theme.lex[k])));
      const txt = render(ev.text, roles, lexPick);
      const z = ctx.luogo != null ? theme.lex.luogo.indexOf(ctx.luogo) : roles[0].zone;
      roles.forEach((t) => { t.zone = z; t.events++; });
      for (const k of ev.kills) {
        const killers = k.by.map((i) => roles[i]);
        k.v.forEach((i) => kill(roles[i], killers, ev, txt));
        if (k.betray) { stats.betrayals++; killers.forEach((t) => { t.betrayals++; leaveAlliance(t); }); }
      }
      ev.dies.forEach((i) => kill(roles[i], [], ev, txt));
      for (const f of ev.fx) {
        const t = roles[f.r[0]];
        if (!t.alive) continue;
        switch (f.t) {
          case 'al': {
            const ts = f.r.map((i) => roles[i]).filter((x) => x.alive);
            if (ts.length > 1) { joinAlliance(ts); stats.alliances++; ts.forEach((x) => x.alliancesFormed++); }
            break;
          }
          case 'br': leaveAlliance(t); t.betrayals++; stats.betrayals++; break;
          case 'gain': {
            const name = f.item === 'arma' ? lexPick('arma') : f.item === 'cibo' ? (ctx.cibo || 'provviste') : f.item === 'med' ? 'kit medico' : 'trappola';
            if (f.item === 'arma') { const old = t.inv.findIndex((x) => x.type === 'arma'); if (old >= 0) t.inv.splice(old, 1); }
            t.inv.push({ type: f.item, name }); t.items++; stats.items++;
            if (t.inv.length > 6) t.inv.shift();
            break;
          }
          case 'lose': { const i = t.inv.findIndex((x) => x.type === f.item); if (i >= 0) t.inv.splice(i, 1); break; }
          case 'steal': {
            const B = roles[f.r[1]]; const i = B.inv.findIndex((x) => x.type === 'arma');
            if (i >= 0) { const [it] = B.inv.splice(i, 1); const old = t.inv.findIndex((x) => x.type === 'arma'); if (old >= 0) t.inv.splice(old, 1); t.inv.push(it); t.items++; }
            break;
          }
          case 'status': t.st[f.s] = phases.length; break;
          case 'cure': t.st = {}; break;
        }
      }
      stats.events++;
      return { html: txt.html, plain: txt.plain, ids: roles.map((t) => t.id), deaths: ev.victims.map((i) => roles[i].id).filter((id) => !byId[id].alive), lethal: ev.lethal, origin: ev.origin, cat: ev.cat };
    }

    function lethalProb(kind) {
      let p = (BASE_P[kind] || 0.2) * diff;
      if (kind !== 'b') p *= 1 + 0.1 * (day - 1);
      if (noDeathStreak >= 3) p *= 1.7;
      if (alive().length <= 4) p *= 1.25;
      return Math.min(0.9, Math.max(0.03, p));
    }

    function snapshot() {
      const zones = {}, allies = {}, st = {}, inv = {}, kills = {};
      T.forEach((t) => { zones[t.id] = t.zone; allies[t.id] = t.allyId; st[t.id] = Object.keys(t.st); inv[t.id] = t.inv.map((x) => x.name); kills[t.id] = t.kills; });
      return { alive: alive().map((t) => t.id), zones, allies, st, inv, kills };
    }

    function maybeDissolve(events) {
      const a = alive();
      if (cfg.teamWin || a.length < 2) return;
      const g = a[0].allyId;
      if (g != null && a.every((t) => t.allyId === g)) {
        a.forEach((t) => leaveAlliance(t));
        events.push({ html: 'Rimasti soli, gli ultimi alleati si guardano con sospetto: l\'alleanza è finita.', plain: 'Rimasti soli, gli ultimi alleati si guardano con sospetto: l\'alleanza è finita.', ids: a.map((t) => t.id), deaths: [], lethal: false, note: true });
      }
    }

    function runPhase(kind, pool, title, intro) {
      const events = [];
      maybeDissolve(events);
      const before = alive().length;
      const order = rng.shuffle(alive());
      const un = new Set(order.map((t) => t.id));
      const fallback = pools.fallback.length ? pools.fallback : parseBlock(D.core.fallback);
      for (const P of order) {
        if (!un.has(P.id) || !P.alive) continue;
        let done = false;
        const pL = lethalProb(kind);
        for (let attempt = 0; attempt < 25 && !done; attempt++) {
          const nAlive = alive().length;
          const wantLethal = nAlive > 1 && rng.chance(pL);
          const n = [...un].filter((id) => byId[id].alive).length;
          const cand = pool.filter((e) => e.lethal === wantLethal && e.n <= n && (!e.lethal || e.victims.length < nAlive));
          const ev = rng.wpick(cand, (e) => weightFor(e, P));
          if (!ev) continue;
          const roles = assign(ev, P, un);
          if (!roles) continue;
          // non si può far morire più gente di quanta ne resti
          if (ev.lethal && alive().length - ev.victims.length < 1) continue;
          events.push(apply(ev, roles));
          roles.forEach((t) => un.delete(t.id));
          done = true;
        }
        if (!done) { events.push(apply(rng.pick(fallback), [P])); un.delete(P.id); }
      }
      const died = before - alive().length;
      noDeathStreak = died ? 0 : noDeathStreak + 1;
      phases.push({ kind, day, title, intro, events, snap: snapshot() });
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
          for (let k = 0; k < 8; k++) {
            const ev = rng.wpick(pool, (e) => weightFor(e, A));
            const roles = combat(A) + rng.f() * 8 > combat(B) + rng.f() * 8 ? [A, B] : [B, A];
            if (!checkReq(ev, roles)) continue;
            events.push(apply(ev, roles));
            break;
          }
        }
        if (cfg.teamWin && !isEnded() && rounds > 30) break;
      }
      phases.push({ kind: 'finale', day, title: 'Lo scontro finale', intro: theme.intro.finale, events, snap: snapshot() });
    }

    function pushFallen() {
      const n = pendingFallen.length;
      const fl = theme.fallen;
      const text = (n === 0 ? fl[0] : n === 1 ? fl[1] : fl[2]).replace('{n}', n);
      phases.push({ kind: 'fallen', day, title: (theme.labels && theme.labels.fallen) || 'I caduti', intro: text, events: [], deaths: pendingFallen.slice(), snap: snapshot() });
      pendingFallen = [];
    }

    let feastDone = false, lastDisaster = -9;
    const usedDisasters = new Set();
    while (true) {
      day++;
      if (day === 1) runPhase('b', pools.b, theme.phase.b, theme.intro.b);
      if (isEnded()) break;
      runPhase('d', pools.d, theme.phase.d + ' ' + day, theme.intro.d);
      if (isEnded()) break;
      const a = alive().length;
      if (!feastDone && day >= 3 && a >= 4 && (rng.chance(0.35) || day >= 6)) {
        feastDone = true;
        runPhase('f', pools.f, theme.phase.f, theme.intro.f);
      } else if (day >= 2 && pools.disasters.length && day - lastDisaster > 1 && rng.chance(0.3 * Math.min(1.5, diff))) {
        let opts = pools.disasters.filter((d) => !usedDisasters.has(d.n));
        if (!opts.length) { usedDisasters.clear(); opts = pools.disasters; }
        const dz = rng.pick(opts);
        usedDisasters.add(dz.n); lastDisaster = day;
        runPhase('dis', dz.out.concat(pools.ds), dz.n, dz.intro);
      }
      if (isEnded()) break;
      runPhase('n', pools.n, theme.phase.n + ' ' + day, theme.intro.n);
      if (isEnded()) break;
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
    }));
    return { version: 1, theme: theme.id, seed, days: day, phases, tributes: stripped, winners: winners.map((t) => t.id), stats };
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
    const roles = sample.slice(0, ev.n).map(([name, gender], i) => ({ id: 'p' + i, name, gender, color: PALETTE[i], inv: [{ type: 'arma', name: theme.lex.arma[0] }] }));
    const ctx = {};
    const lexPick = (k) => (ctx[k] != null ? ctx[k] : (ctx[k] = rng.pick(theme.lex[k])));
    let s = ev.text
      .replace(/\[([A-F]+):([^\]]*)\]/g, (_, ls, opts) => genderPick(letters(ls).map((i) => roles[i]), opts))
      .replace(/\{arma:([A-F])\}/g, (_, c2) => possessive(roles[L(c2)].inv[0]))
      .replace(/\{(arma|cibo|luogo|mostro|trappola|rifugio|dono)\}/g, (_, k) => lexPick(k));
    s = cap(artPrep(s));
    return esc(s).replace(/\{([A-F])\}/g, (_, c2) => '<b class="nm" style="--c:' + roles[L(c2)].color + '">' + roles[L(c2)].name + '</b>');
  }

  G.LOS = { simulate, parseLine, parseBlock, buildPools, makeRng, randomCast, countTemplates, previewCustom, customToLine, PALETTE, STATUS_LABEL, DIFF };
})(typeof window !== 'undefined' ? window : globalThis);
