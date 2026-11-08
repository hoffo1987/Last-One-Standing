/* Last One Standing — motore di simulazione deterministico.
 * Funziona sia nel browser (window.LOS) sia in Node (globalThis.LOS). */
(function (G) {
  'use strict';
  const D = G.LOS_DATA;
  const Systems = G.LOS_SYSTEMS || (typeof require === 'function' ? require('./engine-systems.js') : null);
  const Geography = G.LOS_GEOGRAPHY || (typeof require === 'function' ? require('./engine-geography.js') : null);
  if (!Systems) throw new Error('Sistemi del motore non disponibili.');

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
  const ITEMS = 'arma|cibo|med|trap|veleno|mappa|amuleto|esplosivo|armatura|attrezzo|alcol|valore|ricordo';
  const LEXKEYS = 'arma|cibo|luogo|mostro|trappola|rifugio|dono|amuleto|alcol|veleno|mappa|esplosivo|armatura|attrezzo|valore|ricordo|med|trap';
  const VITALS = { hp: 'hp', en: 'en', mo: 'mo', food: 'food', pr: 'pr' };
  // nomi degli oggetti nuovi (protezioni, attrezzi, merce, ricordi, alcol) per un'arena
  function itemLex(theme) {
    const N = (D.items && D.items.names) || {}, base = N._ || {}, own = N[theme.id] || {}, out = {};
    ['armatura', 'attrezzo', 'valore', 'ricordo', 'alcol'].forEach((k) => { const l = own[k] || base[k]; if (l) out[k] = l; });
    return out;
  }
  const LEX_RE = new RegExp('\\{(' + LEXKEYS + ')\\}', 'g');
  const POSS_RE = /\{(arma|amuleto|veleno|mappa|esplosivo|cibo|med|trap|armatura|attrezzo|alcol|valore|ricordo):([A-F])\}/g;
  const ID = (m) => [L(m)];

  function catOf(ev) {
    const has = (t) => ev.fx.some((f) => f.t === t);
    return ev.kills.some((k) => k.betray) ? 'betray' : ev.kills.length ? 'kill' : ev.dies.length ? 'death' :
      has('br') ? 'betray' : has('love') ? 'love' : has('al') ? 'ally' : has('cure') || has('save') ? 'heal' :
      has('status') || has('hit') || has('poison') ? 'hurt' : has('gain') || has('steal') || has('give') ? 'item' : 'none';
  }
  function parseLine(line, origin) {
    const bar = line.indexOf('|');
    if (bar < 0) throw new Error('Manca "|" in: ' + line);
    const head = line.slice(0, bar).trim().split(/\s+/);
    const text = line.slice(bar + 1).trim();
    const ev = { n: +head[0], text, kills: [], dies: [], req: [], fx: [], tags: [], w: 1, origin: origin || 'base', ok: { kills: [], dies: [], fx: [] }, ko: { kills: [], dies: [], fx: [] } };
    if (!Number.isInteger(ev.n) || !(ev.n >= 1 && ev.n <= 6)) throw new Error('Numero di concorrenti non valido in: ' + line);
    let m;
    for (let tok of head.slice(1)) {
      const self = tok.match(/^(?:ok:|ko:)?(?:hit|poison|save|give|owe|repay|debt|grudge|forgive|steal|k|tr|crush|plot|trust|distrust|fear|respect|attract|promise|fid|ris|pau|amo):([A-F])[<>]([A-F])/) || tok.match(/^(?:ok:|ko:)?(?:love|couple|friend|enemy|rel|rival|ex|close|breakup|reunite):([A-F])([A-F])/);
      if (self && self[1] === self[2]) throw new Error('Etichetta riferita due volte alla stessa persona "' + tok + '" in: ' + line);
      let tgt = ev;
      if (/^(ok|ko):/.test(tok)) { tgt = tok[1] === 'k' ? ev.ok : ev.ko; tok = tok.slice(3); }
      if ((m=tok.match(/^(at|to):(\d+)$/))) { if(tgt!==ev) throw new Error('at:/to: non possono avere il prefisso ok: o ko:.'); ev.location=Object.assign({},ev.location,{[m[1]==='at'?'at':'travel']:+m[2]}); continue; }
      if ((m = tok.match(/^test:([A-F])=(\w+?)(\d+)?$/))) { ev.test = { r: L(m[1]), attr: m[2], dc: m[3] ? +m[3] : 11 }; continue; }
      if ((m = tok.match(/^att:([A-F])([<>])(\w+?)(\d+)$/))) { ev.req.push({ t: 'att', r: ID(m[1]), op: m[2], attr: m[3], v: +m[4] }); continue; }
      if ((m = tok.match(/^(no)?trait:([A-F])=(\w+)$/))) { ev.req.push({ t: m[1] ? 'notrait' : 'trait', r: ID(m[2]), trait: m[3] }); continue; }
      if (tok[0] === '@') { ev.tags.push(tok.slice(1)); continue; }
      if (tok[0] === '*') { ev.w = Number(tok.slice(1)); if (!Number.isFinite(ev.w) || ev.w <= 0) throw new Error('Peso non valido in: ' + line); continue; }
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
      if ((m = tok.match(/^(cibo|med|trap|veleno|esplosivo|alcol|valore|attrezzo|armatura):([A-F])$/))) {
        const r = ID(m[2]);
        // Un oggetto appena ricevuto può essere consumato nello stesso evento.
        const prior = tgt === ev ? ev.fx : ev.fx.concat(tgt.fx);
        const received = prior.some((f) => f.item === m[1] && ((f.t === 'gain' || f.t === 'steal') && f.r[0] === r[0] || f.t === 'give' && f.r[1] === r[0]));
        if (!received) ev.req.push({ t: 'has', item: m[1], r });
        tgt.fx.push({ t: 'consume', item: m[1], r }); continue;
      }
      if ((m = tok.match(new RegExp('^steal:([A-F])<([A-F])(?:=(' + ITEMS + '))?$')))) {
        const item = m[3] || 'arma', r = [L(m[1]), L(m[2])];
        ev.req.push({ t: 'has', item, r: [r[1]] }, { t: 'canReceive', item, r: [r[1], r[0]] });
        tgt.fx.push({ t: 'steal', item, r }); continue;
      }
      if ((m = tok.match(new RegExp('^give:([A-F])>([A-F])=(' + ITEMS + ')$')))) {
        const r = [L(m[1]), L(m[2])];
        tgt.fx.push({ t: 'give', r, item: m[3] });
        if (tgt === ev) ev.req.push({ t: 'has', item: m[3], r: [r[0]] }, { t: 'canReceive', item: m[3], r });
        continue;
      }
      if ((m = tok.match(/^s:([A-F])=(\w+)$/))) { tgt.fx.push({ t: 'status', r: ID(m[1]), s: m[2] }); continue; }
      if ((m = tok.match(/^need:([A-F])=(\w+|\*)$/))) { ev.req.push({ t: 'need', r: ID(m[1]), s: m[2] }); continue; }
      if ((m = tok.match(/^cure:([A-F])$/))) { tgt.fx.push({ t: 'cure', r: ID(m[1]) }); continue; }
      // legami e conseguenze
      if ((m = tok.match(/^hit:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'hit', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'foe', a: ID(m[1]), b: ID(m[2]) }); continue; }
      if ((m = tok.match(/^poison:([A-F])>([A-F])$/))) { tgt.fx.push({ t: 'poison', r: [L(m[1]), L(m[2])] }); continue; }
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
      // i legami: requisiti (trust:A>B …) ed effetti (fid:A>B+20 …), promesse, rotture e ritorni
      if ((m = tok.match(/^promise:([A-F])>([A-F])=(fedelta|protezione|vendetta|cibo)$/))) { tgt.fx.push({ t: 'mkpromise', r: [L(m[1]), L(m[2])], k: m[3] }); continue; }
      if ((m = tok.match(/^(trust|distrust|fear|respect|attract|promise):([A-F])>([A-F])$/))) { ev.req.push({ t: 'b_' + m[1], r: [L(m[2]), L(m[3])] }); continue; }
      if ((m = tok.match(/^(rival|ex|close):([A-F])([A-F])$/))) { ev.req.push({ t: 'b_' + m[1], r: [L(m[2]), L(m[3])] }); continue; }
      if ((m = tok.match(/^(fid|ris|pau|amo):([A-F])>([A-F])([+-]\d+)$/))) { tgt.fx.push({ t: 'bondfx', r: [L(m[2]), L(m[3])], k: { fid: 'f', ris: 'r', pau: 'p', amo: 't' }[m[1]], v: +m[4] }); continue; }
      if ((m = tok.match(/^breakup:([A-F])([A-F])$/))) { tgt.fx.push({ t: 'breakup', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'couple', r: [L(m[1]), L(m[2])] }); continue; }
      if ((m = tok.match(/^reunite:([A-F])([A-F])$/))) { tgt.fx.push({ t: 'reunite', r: [L(m[1]), L(m[2])] }); ev.req.push({ t: 'b_ex', r: [L(m[1]), L(m[2])] }); continue; }
      // la mente: cotta segreta, complotto, obiettivo del momento
      if ((m = tok.match(/^crush:([A-F])>([A-F])$/))) { ev.req.push({ t: 'crush', r: [L(m[1]), L(m[2])] }); ev.tags.push('love'); continue; }
      if ((m = tok.match(/^plot:([A-F])>([A-F])$/))) { ev.req.push({ t: 'plot', r: [L(m[1]), L(m[2])] }); ev.tags.push('betray'); continue; }
      if ((m = tok.match(/^goal:([A-F])=(\w+)$/))) { ev.req.push({ t: 'goal', r: ID(m[1]), g: m[2] }); continue; }
      // valori vitali: stat:A<hp40 (requisito), mo:A+10 (effetto)
      if ((m = tok.match(/^stat:([A-F])([<>])(hp|en|mo|food|pr)(\d+)$/))) { ev.req.push({ t: 'stat', r: ID(m[1]), op: m[2], k: m[3], v: +m[4] }); continue; }
      if ((m = tok.match(/^(hp|en|mo|food|pr):([A-F])([+-]\d+)$/))) { tgt.fx.push({ t: 'vital', r: ID(m[2]), k: m[1], v: +m[3] }); continue; }
      // il meteo del giorno: wx:buio, wx:abbondanza, wx:pericolo, wx:calma
      if ((m = tok.match(/^wx:(buio|abbondanza|pericolo|calma)$/))) { ev.req.push({ t: 'wx', w: m[1] }); continue; }
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
    ev.why = ev.test ? 'prova' : ev.req.some((r) => r.t.startsWith('b_')) || ev.fx.some((f) => /bondfx|mkpromise|breakup|reunite/.test(f.t)) ? 'legame' : rq('crush') ? 'cotta' : rq('plot') ? 'complotto' : rq('goal') ? 'obiettivo' : rq('wx') ? 'meteo' : rq('att') || rq('trait') ? 'carattere' : rq('grudge') ? 'vendetta' : rq('owe') ? 'debito' : rq('couple') ? 'coppia' : rq('lost') ? 'lutto' :
      ev.req.some((r) => r.t === 'need' && r.s === 'lutto') ? 'lutto' : rq('traitor') ? 'reputazione' : rq('feared') ? 'reputazione' : rq('fame') ? 'fama' :
      ev.req.some((r) => r.t === 'has' && /veleno|mappa|amuleto|esplosivo|trap/.test(r.item)) ? 'oggetto' : ev.req.some((r) => r.t === 'need' && r.s !== '*') ? 'condizione' : '';
    const used = new Set();
    for (const re of [/\{([A-F])\}/g, /\{\w+:([A-F])\}/g, /\[([A-F]+):/g]) {
      let mm; while ((mm = re.exec(text))) [...mm[1]].forEach((ch) => used.add(ch));
    }
    for (const r of ev.req.concat(ev.fx, ev.ok.fx, ev.ko.fx)) (r.r || []).concat(r.a || [], r.b || []).forEach((i) => used.add(String.fromCharCode(65 + i)));
    [ev, ev.ok, ev.ko].forEach((branch) => {
      branch.kills.forEach((k) => {
        if (k.by.some((i) => k.v.includes(i))) throw new Error('Chi uccide non può essere la propria vittima in: ' + line);
        k.by.concat(k.v).forEach((i) => used.add(String.fromCharCode(65 + i)));
      });
      branch.dies.forEach((i) => used.add(String.fromCharCode(65 + i)));
    });
    const named = new Set();
    for (const re of [/\{([A-F])\}/g, /\{(?:caro|perso|partner):([A-F])\}/g]) { let mm; while ((mm = re.exec(text))) named.add(mm[1]); }
    for (let i = 0; i < ev.n; i++) if (!named.has(String.fromCharCode(65 + i))) throw new Error('Il concorrente {' + String.fromCharCode(65 + i) + '} partecipa ma non è nominato nel testo: ' + line);
    for (const ch of used) if (L(ch) >= ev.n) throw new Error('Il testo usa {' + ch + '} ma l\'evento ha solo ' + ev.n + ' concorrenti: ' + line);
    const attrs = new Set((D.attrs || []).map((a) => a.id)), traits = new Set((D.traits || []).map((t) => t.id));
    const statuses = new Set(['ferito', 'avvelenato', 'malato', 'affamato', 'ubriaco', 'sconvolto', 'lutto']);
    if (ev.test && (!attrs.has(ev.test.attr) || !Number.isFinite(ev.test.dc) || ev.test.dc < 1)) throw new Error('Prova con caratteristica o soglia non valida.');
    for (const r of ev.req) {
      if (r.t === 'att' && !attrs.has(r.attr)) throw new Error('Caratteristica sconosciuta: ' + r.attr);
      if ((r.t === 'trait' || r.t === 'notrait') && !traits.has(r.trait)) throw new Error('Tratto sconosciuto: ' + r.trait);
      if (r.t === 'need' && r.s !== '*' && !statuses.has(r.s)) throw new Error('Stato sconosciuto: ' + r.s);
      if ((r.t === 'has' || r.t === 'canReceive') && !ITEMS.split('|').includes(r.item)) throw new Error('Oggetto sconosciuto: ' + r.item);
      if (r.v != null && !Number.isFinite(r.v)) throw new Error('Soglia non finita.');
    }
    for (const f of ev.fx.concat(ev.ok.fx, ev.ko.fx)) {
      if (f.t === 'status' && !statuses.has(f.s)) throw new Error('Stato sconosciuto: ' + f.s);
      if (f.v != null && !Number.isFinite(f.v)) throw new Error('Effetto numerico non finito.');
    }
    return ev;
  }

  function parseBlock(src, origin) {
    if (!src) return [];
    return src.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => parseLine(l, origin));
  }
  function customToLine(c) {
    if (c.raw != null) {
      if (typeof c.raw !== 'string' || !c.raw.trim() || c.raw.length > 2000 || /[\r\n]/.test(c.raw)) throw new Error('Scrivi un solo evento avanzato, entro 2000 caratteri.');
      return c.raw.trim();
    }
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
  function buildPools(theme, custom, adult, worldEnabled = true) {
    const key = theme.id + '|' + (adult ? 1 : 0) + '|' + (worldEnabled ? 1 : 0) + '|' + JSON.stringify(custom || []);
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
      if (!c || (!c.text && !c.raw)) return;
      let ev;
      try { ev = parseLine(customToLine(c), 'custom'); } catch (e) { return; }
      const targets = c.phase === 'tutte' ? ['b', 'd', 'n', 'f'] : [c.phase];
      targets.forEach((p) => pools[p] && pools[p].push(ev));
    });
    pools.disasters = (theme.disasters || []).map((d) => ({ n: d.n, intro: d.intro, out: parseBlock(d.out, theme.id) }))
      .concat(parseDisasters(more.dis, theme.id));
    packs.forEach((pk) => { if (pk.dis) pools.disasters = pools.disasters.concat(parseDisasters(pk.dis, pk.adult ? 'adult' : theme.id).map((d) => Object.assign(d, { adult: !!pk.adult }))); });
    pools.lex = Object.assign({}, D.lexDefault || {}, itemLex(theme), theme.lex);
    packs.forEach((pk) => { if (pk.lex) Object.keys(pk.lex).forEach((k) => (pools.lex[k] = pk.lex[k])); });
    const world = worldEnabled ? D.world?.compile(theme) : null;
    if (world) {
      for (const category of ['events','traits','trials','deaths']) for (const row of world[category]) {
        const event=parseLine(row.raw,'world');event.contentId=row.id;event.contentCategory=category;if(row.afterScene!=null)event.afterScene=row.afterScene;pools[row.phase].push(event);
      }
      for(const incident of world.disasters)pools.disasters.push({n:incident.n,intro:incident.intro,out:parseBlock(incident.out,'world').map((event,i)=>Object.assign(event,{contentId:incident.id+'-'+i,contentCategory:'disasters'})),zones:[incident.zone],contentId:incident.id,scene:incident.scene});
      for(const [type,names] of Object.entries(D.world.itemNames(world)))pools.lex[type]=[...new Set((pools.lex[type]||[]).concat(names))];
      pools.world=world;
    }
    const ks = Object.keys(poolCache); if (ks.length > 40) delete poolCache[ks[0]];
    poolCache[key] = pools;
    return pools;
  }

  function countTemplates() {
    const cnt = (s) => (s ? s.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('|')).length : 0);
    const cntDis = (s) => (s ? s.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).length : 0);
    const perTheme = {};
    let events = 0, disasters = 0, adultEvents = 0, adultDis = 0, outcomes = 0, combined = 0;
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
      // e: tutte le righe scritte a mano usabili nell'arena; own: solo quelle scritte per quest'arena
      let e = 0, own = 0, d = (t.disasters || []).length + cntDis(more.dis), ea = 0, da = 0;
      if (t.soft) PHASES.forEach((k) => { const c = cnt(t.pool[k]); e += c; own += c; });
      else { PHASES.forEach((k) => (e += cnt(D.core[k]) + cnt((D.coreExtra || {})[k]))); if (t.extra) Object.values(t.extra).forEach((s) => { const c = cnt(s); e += c; own += c; }); }
      if (more.extra) Object.values(more.extra).forEach((s) => { const c = cnt(s); e += c; own += c; });
      packsFor(t, true).forEach((pk) => {
        let pe = 0; PHASES.forEach((k) => (pe += cnt((pk.ev || {})[k])));
        if (pk.adult) { ea += pe; da += cntDis(pk.dis); } else { e += pe; d += cntDis(pk.dis); if (pk.theme === t.id) own += pe; }
      });
      const world=D.world?.compile(t),extra=world?world.counts.events+world.counts.traits+world.counts.trials+world.counts.deaths:0;
      if(world){events+=extra;combined+=extra;disasters+=world.counts.disasters;outcomes+=world.counts.disasters*3;}
      perTheme[t.id] = { events: e+extra, written: e, own, combined: extra, disasters: d+(world?.counts.disasters||0), adultEvents: ea, adultDisasters: da, ...(world?{world:world.counts}:{}) };
    });
    // written: righe scritte a mano; combined: eventi nati dai luoghi del mondo per frasi-tipo comuni
    return { events, written: events - combined, combined, disasters, adultEvents, adultDisasters: adultDis, outcomes, themes: D.themes.length, perTheme };
  }

  /* ---------------- Grammatica ---------------- */
  function genderPick(group, opts) {
    const o = opts.split('/');
    const gs = group.map((t) => t.gender || 'M');
    if (gs.every((g) => g === 'F')) return o[1] !== undefined ? o[1] : o[0];
    if (gs.every((g) => g === 'N')) {
      if (o[2] !== undefined) return o[2];
      // Convenzione dell'app: schwa per i suffissi, lə/ləi per i pronomi
      // singolari. Una terza forma scritta nel modello ha sempre precedenza.
      const pronoun = { 'gli/le': 'lə', 'lui/lei': 'ləi', 'ui/ei': 'əi' }[opts.toLowerCase()];
      return pronoun ? (/^\p{Lu}/u.test(opts) ? pronoun[0].toUpperCase() + pronoun.slice(1) : pronoun) : 'ə';
    }
    return o[0];
  }
  const ART = /^(un['’]|una |uno |un |il |lo |la |l['’]|i |gli |le |delle |dei |degli |del |dello |della |dell['’])/i;
  function possessive(item, fallback) {
    if (!item) return fallback || 'la sua arma';
    const s = item.name;
    const m = s.match(ART);
    const bare = m ? s.slice(m[0].length) : s;
    const a = m ? m[0].toLowerCase().replace(/’/g, "'") : '';
    if (/^(delle |le )/.test(a)) return 'le sue ' + bare;
    if (/^(dei |degli |i |gli )/.test(a)) return 'i suoi ' + bare;
    // L'articolo eliso non rivela il genere: conservare il nome dell'oggetto
    // evita accordi inventati come "il suo armatura" o "la sua arco".
    if (a === "l'" || a === "dell'") return (m[0].includes('’') ? 'l’' : "l'") + bare;
    const fem = /^(una |un'|la |della )/.test(a);
    return (fem ? 'la sua ' : 'il suo ') + bare;
  }
  const PREP = { in: 'ne', di: 'de', a: 'a', da: 'da', su: 'su' };
  const ARTI = { lo: 'llo', la: 'lla', "l'": "ll'", gli: 'gli', le: 'lle' };
  function artPrep(s) {
    return s.replace(/(^|[^\p{L}'’])(in|di|a|da|su) (il(?= )|lo(?= )|la(?= )|i(?= )|gli(?= )|le(?= )|l['’](?=\p{L}))/giu, (m, pre, p, article) => {
      const P = PREP[p.toLowerCase()], a = article.toLowerCase().replace(/’/g, "'");
      let joined = a === 'il' ? P + 'l' : a === 'i' ? P + 'i' : P + ARTI[a];
      if (article.includes('’')) joined = joined.replace("'", '’');
      return pre + (/^\p{Lu}/u.test(p) ? cap(joined) : joined);
    });
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const edFix = (s) => s.replace(/(^|[ («])([Ee]) ((?:<b[^>]*>)?)(?=[Ee][^\s])/g, (_, pre, p, tag) => pre + p + 'd ' + tag)
    .replace(/(^|[ («])([Aa]) ((?:<b[^>]*>)?)(?=[AÀaà][^\s'’])/g, (_, pre, p, tag) => pre + p + 'd ' + tag);
  const nameTag = (t) => '<b class="nm" data-id="' + esc(t.id) + '" style="--c:' + esc(t.color || '#888') + '">' + esc(t.name) + '</b>';

  /* ---------------- Simulazione ---------------- */
  const DIFF = { bassa: 0.6, normale: 1, alta: 1.45, massacro: 2.2 };
  const BASE_P = { b: 0.3, d: 0.15, n: 0.1, f: 0.38, dis: 0.26 };
  const STATUS_LABEL = { ferito: 'Ferito', avvelenato: 'Avvelenato', malato: 'Malato', affamato: 'Affamato', lutto: 'In lutto', ubriaco: 'Ubriaco', sconvolto: 'Sconvolto' };
  const STATUS_TTL = { ubriaco: 2, lutto: 6, sconvolto: 5 };
  const ITEM_NAME = { med: 'un kit medico', trap: 'una trappola' };
  Object.assign(STATUS_LABEL, (D.eco && D.eco.statusLabel) || {});
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // La storia delle scelte è locale alla partita. Anche copie dello stesso testo
  // in pacchetti diversi condividono frequenza e intervallo di esclusione.
  function normalizeInitialRelations(value, ids) {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > 200) throw new Error('Sono ammessi al massimo 200 legami iniziali.');
    const known = new Set(Array.isArray(ids) ? ids.map((t) => typeof t === 'string' ? t : t.id) : ids);
    const kinds = new Set(['amicizia', 'rivalita', 'coppia', 'fiducia', 'attrazione']), seen = new Set(), partners = new Map(), crushes = new Set();
    return value.map((r, i) => {
      if (!r || typeof r !== 'object' || !known.has(r.from) || !known.has(r.to) || r.from === r.to || !kinds.has(r.type)) throw new Error('Legame iniziale ' + (i + 1) + ': persone o tipo non validi.');
      const pair = ['amicizia', 'rivalita', 'coppia'].includes(r.type) ? [r.from, r.to].sort() : [r.from, r.to];
      const key = JSON.stringify([r.type, ...pair]); if (seen.has(key)) throw new Error('Legame iniziale duplicato.'); seen.add(key);
      if (r.type === 'attrazione') {
        if (crushes.has(r.from)) throw new Error('Una persona può iniziare con una sola cotta segreta.');
        crushes.add(r.from);
      }
      if (r.type === 'coppia') {
        if (partners.has(r.from) || partners.has(r.to)) throw new Error('Una persona può iniziare in una sola coppia.');
        partners.set(r.from, r.to); partners.set(r.to, r.from);
      }
      return { from: r.from, to: r.to, type: r.type };
    });
  }
  function simulate(cfg) {
    if (!cfg || !Array.isArray(cfg.cast) || cfg.cast.length < 2) throw new Error('Servono almeno 2 concorrenti.');
    const castIds = new Set();
    cfg.cast.forEach((c, i) => {
      if (!c || typeof c !== 'object' || Array.isArray(c)) throw new Error('Concorrente non valido alla posizione ' + (i + 1) + '.');
      const id = c.id == null || c.id === '' ? 't' + i : c.id;
      if (typeof id !== 'string' || /[{}]/.test(id) || Object.prototype.hasOwnProperty.call(Object.prototype, id) || id === 'prototype') throw new Error('Identificativo del concorrente non valido alla posizione ' + (i + 1) + '.');
      if (castIds.has(id)) throw new Error('Identificativo del concorrente duplicato: ' + id + '.');
      castIds.add(id);
    });
    const initialRelations = normalizeInitialRelations(cfg.initialRelations, castIds);
    const baseTheme = D.themes.find((t) => t.id === cfg.theme) || D.themes[0];
    const mapEnabled = cfg.mapVersion !== 0;
    if (mapEnabled && !Geography) throw new Error('Geografia del motore non disponibile.');
    const geographyZones = mapEnabled ? Geography.describe(baseTheme, D.eco?.arenas?.[baseTheme.id]) : null;
    const theme = mapEnabled ? Geography.enrich(baseTheme, geographyZones) : baseTheme;
    const seed = cfg.seed == null || cfg.seed === '' ? String(Date.now()) : String(cfg.seed);
    const rng = makeRng(seed + '|' + theme.id);
    const adult = !!cfg.adult && !theme.noAdult;
    const originalPools = buildPools(baseTheme, cfg.custom, adult, mapEnabled && cfg.worldVersion !== 0);
    const pools = mapEnabled ? Geography.preparePools(originalPools, theme, geographyZones) : originalPools;
    const variety = Systems.eventVariety();
    const worldMemory = mapEnabled ? Systems.createWorldMemory() : null;
    const LEX = pools.lex;
    const E = Object.assign({}, D.echo || {}, theme.soft ? D.echoSoft || {} : {});
    const diff = Object.prototype.hasOwnProperty.call(DIFF, cfg.difficulty) ? DIFF[cfg.difficulty] : 1;
    const maxDays = Math.max(3, Math.min(60, cfg.maxDays || 20));
    const traitMap = Object.fromEntries(D.traits.map((t) => [t.id, t]));
    const zoneCount = theme.lex.luogo.length;
    // ecosistema dell'arena: regole, indicatore, zone e meteo
    const ECO = D.eco || { arenas: {}, txt: {} };
    const R = ECO.arenas[theme.id] || ECO.arenas.classico || { key: [], drain: {}, mods: {}, zones: [], meteo: [], meter: null };
    const M = R.meter || null;
    const MOD = Object.assign({ forage: 1, heal: 1, weapon: 1, stealth: 1, fame: 1, sponsor: 1, night: 1, beast: 1, trap: 1, amulet: 0.85, map: 1, greed: 1, nightAlone: 0 }, R.mods);
    const DR = Object.assign({ food: 1, en: 1, mo: 1 }, R.drain);
    const ZP = mapEnabled ? geographyZones.map(z => [z.resources,z.danger,z.shelter]) : theme.lex.luogo.map((_, i) => (R.zones && R.zones[i]) || [1, 1, 0.5]);
    const KEYW = [1, 0.7, 0.5];
    const keyBonus = (t) => (R.key || []).reduce((s, a, i) => s + ((t.attr[a] != null ? t.attr[a] : 5) - 5) * KEYW[i], 0);
    let W = { n: '', d: '', fx: {} };
    let previousWeather='';
    const wx = (k, d) => (W.fx && W.fx[k] != null ? W.fx[k] : d);
    const TX = (k) => (R.txt && R.txt[k]) || (theme.soft && ECO.txtSoft && ECO.txtSoft[k]) || (ECO.txt && ECO.txt[k]) || [];
    const closed = new Set(); // zone inghiottite dalla tempesta (Battle Royale)
    const traps = []; const zoneLoot = {}, trapChecks=new WeakMap();
    let SYS = []; let pendingNotes = [];
    // oggetti e mente dei concorrenti
    const world = pools.world;
    const baseItems = D.items || { types: {}, names: {}, how: {} };
    const IT = world ? {...baseItems,names:{...baseItems.names,[theme.id]:Object.fromEntries(Object.entries(D.world.itemNames(world)).map(([type,names])=>[type,[...new Set(((baseItems.names||{})[theme.id]?.[type]||[]).concat(names))]]))}} : baseItems;
    const MIND = D.mind || { goals: {}, acts: {}, actsSoft: {}, diary: { trait: {} }, diarySoft: { trait: {} }, mem: {} };
    let ORIGIN = null, CURKIND = '';
    const VO = D.voice || {}, VS = D.voiceSoft || {}, CH = D.chats || {};
    const ACT = (k) => mapEnabled&&theme.soft&&k==='sleepwalk'?['{0} si allontana nel dormiveglia fino a {z}. Si sveglia lì, senza ricordare il percorso.']:(theme.soft && MIND.actsSoft && MIND.actsSoft[k]) || (MIND.acts || {})[k] || [];
    const DIA = (k) => (theme.soft && MIND.diarySoft && MIND.diarySoft[k]) || (MIND.diary || {})[k] || [];
    const DIAT = (tr) => (theme.soft && MIND.diarySoft && MIND.diarySoft.trait && MIND.diarySoft.trait[tr]) || ((MIND.diary || {}).trait || {})[tr] || [];

    const T = (cfg.cast || []).map((c, i) => ({
      id: c.id || 't' + i, name: (c.name || 'Concorrente ' + (i + 1)).trim(), gender: c.gender || 'M',
      team: c.team || i + 1, color: c.color, img: c.img || '',
      traits: (Array.isArray(c.traits) ? c.traits : []).filter((x) => typeof x === 'string' && Object.prototype.hasOwnProperty.call(traitMap, x)),
      attr: Object.assign({ for: 5, agi: 5, int: 5, car: 5, fort: 5, res: 5, furt: 5, cor: 5, emp: 5, sop: 5 }, c.attr || {}),
      alive: true, zone: 0, inv: [], st: {}, kills: 0, killIds: [], allyId: null,
      deathPhase: -1, deathDay: 0, deathText: '', deathHtml: '', killerIds: [], order: 0,
      events: 0, alliancesFormed: 0, betrayals: 0, items: 0,
      partner: null, exPartner: null, lost: null, grudges: {}, owes: {}, fame: 0, traitor: false, fed: 0,
      revenges: 0, saves: 0, repaid: 0, amulets: 0, tests: 0, testsPassed: 0,
      hp: 100, en: 90, mo: 55, food: 70, pr: 0, infected: false, infKnown: false, cause: null, poisonSource: null, hurtPh: -1, sawDeath: -1,
      foraged: 0, nursed: 0, shared: 0, trapKills: 0, trapsSet: 0, survivedBeasts: 0,
      goal: null, thought: '', crush: null, plot: null, diary: [], mem: {}, memoryHistory: {}, promises: [], hunt: null, vowed: null, spares: 0, trades: 0, crafts: 0, acts: 0, rejected: 0, planPh: -9, vigilPh: -9, guard: null,
    }));
    if (T.length < 2) throw new Error('Servono almeno 2 concorrenti.');
    T.forEach((t) => {
      t.zone = rng.int(zoneCount);
      if (mapEnabled && Geography.definitions[theme.id].start != null) t.zone = Geography.definitions[theme.id].start;

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

    /* legami direzionali a sei dimensioni (da A verso B, non sempre ricambiati):
     * f fiducia, l affetto (in più rispetto all'affinità comune), r rispetto, p paura, t attrazione, k conoscenza */
    const BD = D.bonds || { labels: {}, memfx: {}, mem: {}, promises: { make: {}, broken: {}, kept: {}, kinds: {} }, acts: {}, actsSoft: {}, diary: {} };
    const BOND = new Map();
    const bkey = (a, b) => a.ix * 4096 + b.ix;
    const EMPTY = { f: 0, l: 0, r: 0, p: 0, t: 0, k: 0, n: {} };
    function bond(a, b) { let x = BOND.get(bkey(a, b)); if (!x) { x = { f: 0, l: 0, r: 0, p: 0, t: 0, k: 0, n: {} }; BOND.set(bkey(a, b), x); } return x; }
    const peek = (a, b) => BOND.get(bkey(a, b)) || EMPTY;
    const LIM = { f: [-100, 100], l: [-100, 100], r: [-100, 100], p: [0, 100], t: [0, 100], k: [0, 100] };
    // il carattere di chi prova il sentimento modula quanto cambia
    function tweak(a, b, d, scale) {
      if (!a || !b || a === b || !d) return;
      const x = bond(a, b), sc = scale == null ? 1 : scale, tr = (id) => a.traits.includes(id);
      for (const k in d) {
        if (!LIM[k]) continue;
        let v = d[k] * sc;
        if (k === 'f') v *= v > 0 ? (tr('paranoico') ? 0.5 : tr('leale') ? 1.2 : 1) : (tr('paranoico') ? 1.4 : tr('clemente') ? 0.7 : 1);
        if (k === 'l' && v < 0) v *= tr('vendicativo') ? 1.4 : tr('clemente') || tr('pacifista') ? 0.6 : 1;
        if (k === 'l' && v > 0) v *= 0.8 + a.attr.emp * 0.04;
        if (k === 'p' && v > 0) v *= Math.max(0.35, 1.35 - a.attr.cor * 0.07) * (tr('codardo') ? 1.4 : 1);
        if (k === 't' && v > 0) v *= tr('romantico') ? 1.5 : 1;
        if (k === 'r' && v > 0) v *= tr('stratega') || tr('cacciatore') ? 1.2 : 1;
        // un torto aperto rallenta il disgelo: fiducia e affetto tornano a piccoli passi
        if ((k === 'f' || k === 'l') && v > 0 && (a.grudges[b.id] || x[k] <= -40)) v *= a.grudges[b.id] ? 0.4 : 0.6;
        x[k] = clamp(x[k] + v, LIM[k][0], LIM[k][1]);
      }
    }
    const like = (a, b) => clamp(aff(a, b) + peek(a, b).l, -100, 100);
    const trustOf = (a, b) => peek(a, b).f, fearOf = (a, b) => peek(a, b).p, respectOf = (a, b) => peek(a, b).r, attractOf = (a, b) => peek(a, b).t;
    const tally = (a, b, key) => { const x = bond(a, b); x.n[key] = (x.n[key] || 0) + 1; };
    // ferite recenti: un tradimento, un colpo, un furto o un'umiliazione pesano per giorni, anche se i numeri risalgono
    const WOUNDS = new Set(['betrayed', 'hit', 'robbed', 'nightTheft', 'tried', 'killedDear', 'exposed', 'trap', 'expelled', 'bullied', 'liedTo', 'promiseBroken', 'split', 'breakup']);
    const recentWound = (a, b, span) => (a.memoryHistory[b.id] || []).some((m) => WOUNDS.has(m.k) && phases.length - m.ph <= (span || 6));
    // quanto due persone si respingono: 0 niente, 1 attrito, 2 non possono fare squadra, 3 rancore aperto
    function hostility(a, b, keepPlots) {
      if (a.grudges[b.id] || b.grudges[a.id]) return 3;
      // chi trama resta vicino alla vittima: il piano non allontana, ma impedisce di stringere patti nuovi
      if (!keepPlots && (a.plot === b.id || b.plot === a.id)) return 2.5;
      const l = Math.min(like(a, b), like(b, a)), f = Math.min(trustOf(a, b), trustOf(b, a));
      let h = l <= -45 || f <= -45 ? 2 : l <= -25 || f <= -25 ? 1 : 0;
      if (h < 2 && (recentWound(a, b) || recentWound(b, a))) h = 2;
      return h;
    }
    /* il contesto di un evento: perché quelle persone, in quel momento. Si usano solo fatti già accaduti
       tra i protagonisti (mai quelli della fase in corso) e lo stato del loro rapporto prima dell'azione. */
    const MEM_POS = new Set(['saved', 'cured', 'shared', 'gift', 'allied', 'repaid', 'warned', 'mediated', 'comforted', 'healedStranger', 'letter', 'oath', 'recruited', 'promise', 'promiseKept', 'spared', 'fought', 'coalition', 'mentor', 'student', 'hardship', 'love', 'reunion', 'initialFriend', 'initialTrust', 'initialCrush']);
    const MEM_NEG = new Set(['denied', 'robbed', 'hit', 'killedDear', 'betrayed', 'fleeced', 'exposed', 'trap', 'expelled', 'tried', 'bullied', 'brawl', 'rejected', 'jealous', 'nightTheft', 'liedTo', 'promiseBroken', 'breakup', 'rivalLove', 'split', 'initialRival', 'sawKill']);
    const memText = (k) => (theme.soft && ((MIND.memSoft || {})[k] || (BD.memSoft || {})[k])) || (MIND.mem || {})[k] || (BD.mem || {})[k] || '';
    const unitName = theme.id === 'scifi' ? 'ciclo' : 'giorno';
    const whenTxt = (ph) => { const d = (phases[ph] && phases[ph].day) || 1; return d === day ? 'oggi' : d === day - 1 ? (theme.id === 'scifi' ? 'nel ciclo precedente' : 'ieri') : 'il ' + unitName + ' ' + d; };
    const REL_LINE = {
      amore: '{a} e {b} sono una coppia.', ex: '{a} e {b} sono stati una coppia.', cotta: '{a} ha una cotta per {b}.', nemesi: 'Per {a}, {b} è il nemico da battere.', vendetta: '{a} vuole vendetta su {b}.',
      rivaleAmore: '{a} e {b} hanno una cotta per la stessa persona.', terrore: '{a} ha il terrore di {b}.', gratitudine: '{a} deve la vita a {b}.', fratelli: 'Tra {a} e {b} c\'è un legame fraterno.',
      mentore: '{b} ha fatto da guida a {a}.', protetto: '{a} ha promesso di proteggere {b}.', amico: 'Tra {a} e {b} c\'è amicizia.', paura: '{a} ha paura di {b}.', colpa: '{a} si sente in colpa verso {b}.',
      complice: 'Nell\'alleanza, {a} si fida di {b}.', alleatoComodo: '{a} sta con {b} solo per convenienza.', alleato: '{a} e {b} fanno parte della stessa alleanza.', debito: '{a} deve un favore a {b}.',
      rivale: '{a} e {b} sono rivali e si rispettano.', ammirazione: '{a} ammira {b}.', odio: '{a} odia {b}.', diffidenza: '{a} non si fida di {b}.', antipatia: 'Tra {a} e {b} non corre buon sangue.', simpatia: '{a} prova simpatia per {b}.',
    };
    function bondLine(a, b, tone, memOnly) {
      const now = phases.length;
      const mems = [];
      [[a, b], [b, a]].forEach(([x, y]) => (x.memoryHistory[y.id] || []).forEach((m) => { if (m.ph < now) mems.push({ x, y, m }); }));
      const want = tone === 'warm' || tone === 'social' ? MEM_POS : tone === 'hostile' || tone === 'betray' || tone === 'reconcile' ? MEM_NEG : null;
      const pick = want && mems.filter(({ m }) => want.has(m.k)).sort((p, q) => q.m.ph - p.m.ph)[0];
      if (pick) {
        const txt = memText(pick.m.k).replace('{2}', pick.m.x && byId[pick.m.x] ? byId[pick.m.x].name : 'qualcuno');
        if (txt) return pick.x.name + ' ricorda ' + (pick.m.k.startsWith('initial') ? 'quello che c\'era prima dei giochi' : 'quello che è successo ' + whenTxt(pick.m.ph)) + ' con ' + pick.y.name + ': «' + txt + '»';
      }
      // nei gesti già compiuti (personalActs) lo stato attuale è l'effetto, non la causa: lì contano solo i ricordi
      if (memOnly) return '';
      const lbl = labelOf(a, b), back = labelOf(b, a);
      const line = (l, x, y) => (l && l !== 'complotto' && REL_LINE[l] ? REL_LINE[l].replace('{a}', x.name).replace('{b}', y.name) : '');
      const first = line(lbl, a, b) || line(back, b, a);
      if (first) return first;
      if (tone === 'warm' && toneAlly) return 'Prima d\'ora ' + a.name + ' e ' + b.name + ' non avevano niente in comune: è un patto di convenienza.';
      return '';
    }
    let toneAlly = false;
    // «a Aldo» → «ad Aldo», «e Emma» → «ed Emma», «a la Cornucopia» → «alla Cornucopia»
    const ctxFix = (s) => s.replace(/ a (?=[AÀ][a-zà-ú])/g, ' ad ').replace(/ e (?=[EÈ][a-zà-ú])/g, ' ed ');
    const atZone = (z) => { const m = String(z).match(/^(il |lo |la |l'|i |gli |le )(.*)$/i); return m ? ({ 'il ': 'al ', 'lo ': 'allo ', 'la ': 'alla ', "l'": "all'", 'i ': 'ai ', 'gli ': 'agli ', 'le ': 'alle ' }[m[1].toLowerCase()] + m[2]) : 'a ' + z; };
    function eventContext(ev, roles) {
      const parts = [], req = eventReason(ev, roles);
      if (req) parts.push(req);
      if (ev.n >= 2 && roles.length >= 2) {
        const tone = toneOf(ev);
        const pr = (tone === 'hostile' || tone === 'betray' ? ev.tonePairs.hostile[0] : ev.tonePairs.warm[0]) || [0, 1];
        const a = roles[pr[0]], b = roles[pr[1]];
        if (a && b) {
          toneAlly = ev.fx.some((f) => f.t === 'al');
          let line = bondLine(a, b, tone === 'betray' ? 'betray' : tone);
          if (tone === 'betray' && a.allyId != null && a.allyId === b.allyId) { const since = (a.memoryHistory[b.id] || []).filter((m) => m.k === 'allied' || m.k === 'recruited').slice(-1)[0]; if (since) line = a.name + ' e ' + b.name + ' erano alleati ' + whenTxt(since.ph).replace(/^oggi$/, 'da poche ore').replace(/^ieri$/, 'da ieri').replace(/^nel /, 'dal ').replace(/^il /, 'dal ') + '. ' + line; }
          if (line && !(req && req.includes(a.name) && req.includes(b.name))) parts.push(line);
        }
      }
      return ctxFix(parts.join(' '));
    }
    function sysContext(people, cat) {
      if (people.length < 2) return '';
      const tone = /^(ally|love|heal)$/.test(cat) ? 'warm' : /^(hurt|kill)$/.test(cat) ? 'hostile' : cat === 'betray' ? 'betray' : 'neutral';
      if (tone === 'neutral') return '';
      toneAlly = false;
      return ctxFix(bondLine(people[0], people[1], tone, tone !== 'hostile' && tone !== 'betray'));
    }
    // un'alleanza unisce tutti i membri: chi entra deve poter stare con ciascuno di loro, non solo con chi lo invita
    function canTeam(ts) {
      const all = new Set();
      ts.forEach((t) => { all.add(t); if (t.allyId != null) (alliances.get(t.allyId) || []).forEach((id) => all.add(byId[id])); });
      const xs = [...all].filter((x) => x && x.alive);
      for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) if (hostility(xs[i], xs[j]) >= 2) return false;
      return true;
    }

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
      const teams = Object.create(null);
      T.forEach((t) => (teams[t.team] = teams[t.team] || []).push(t));
      Object.values(teams).forEach((ms) => { if (ms.length > 1) { joinAlliance(ms); ms.forEach((a) => ms.forEach((b) => a.id < b.id && addAff(a, b, 35))); } });
    }

    const alive = () => T.filter((t) => t.alive);
    const phases = [];
    const itemLedger = Systems.createItemLedger({ phase: () => phases.length, meter: M });
    const geo = mapEnabled ? Geography.create({ theme, zones: geographyZones, T, closed, phase: () => phases.length,
      hasMap: t => hasItem(t,'mappa'), onMap: (t,m) => itemLedger.record('bonus',t,t,itemOf(t,'mappa'),null,'Percorso: costo in energia ridotto del 25%; costo effettivo '+m.cost),
      onEnter:(t,m)=>{if(m.mode==='evacuate'&&closed.has(t.zone)){hurt(t,8*wx('storm',1),null,'storm',true);t.stormZ=zoneName(t.zone);}triggerTraps(t);if(t.hp<=0)resolveVitals();} }) : null;
    let day = 0, deathCounter = 0, pendingFallen = [], noDeathStreak = 0;
    const stats = { events: 0, alliances: 0, betrayals: 0, firstBlood: null, deathsByDay: [], envDeaths: 0, killDeaths: 0, items: 0, revenges: 0, couples: 0, debtsRepaid: 0, amulets: 0, sponsors: 0, echoes: 0, tests: 0, testsPassed: 0,
      causes: {}, shared: 0, nursed: 0, foraged: 0, trapsSet: 0, trapHits: 0, beasts: 0, infected: 0, cured: 0, broken: 0, looted: 0, meteo: [], expelled: 0, trades: 0 };

    const hasItem = (t, it) => t.inv.some((x) => x.type === it);
    const itemOf = (t, it) => t.inv.find((x) => x.type === it);
    const statusCount = (t) => Object.keys(t.st).filter((s) => s !== 'lutto' && s !== 'grave').length;
    const traitSum = (t, key) => t.traits.reduce((s, id) => s + ((traitMap[id] && traitMap[id][key]) || 0), 0);
    const hasTrait = (t, id) => t.traits.includes(id);
    /* effetti degli oggetti dal catalogo (vedi content/_oggetti.js): ogni variante ha i suoi numeri */
    const PROPS = new WeakMap();
    const itemProps = (it) => { if (!it) return {}; let p = PROPS.get(it); if (!p) { const info = D.itemInfo ? D.itemInfo(theme.id, it.type, it.name, !!theme.soft) : null; p = info ? Object.assign({ known: info.known }, info.p) : {}; PROPS.set(it, p); } return p; };
    const itemSlots = (it) => { const p = itemProps(it); return p.posti != null ? p.posti : 0; };
    const carryCap = (t) => 8 + Math.floor(((t.attr.for != null ? t.attr.for : 5) - 5) / 2);
    // la somma di un effetto su tutto lo zaino
    const gear = (t, k) => t.inv.reduce((s2, it) => s2 + (itemProps(it)[k] || 0), 0);
    const gearBest = (t, k, types) => t.inv.filter((it) => !types || types.includes(it.type)).reduce((b, it) => { const v = itemProps(it)[k] || 0; return v > (b ? itemProps(b)[k] || 0 : 0) ? it : b; }, null);
    const weaponPow = (t) => { const w = itemOf(t, 'arma'); return w ? Math.max(0.5, (2.2 + (w.q || 2) * 0.9 + (itemProps(w).forza || 0))) * MOD.weapon : 0; };
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
      const plainMap = hasItem(t, 'mappa') && !itemProps(itemOf(t, 'mappa')).known;
      if ((attr === 'int' || attr === 'sop') && plainMap) bonus += 2;
      if (attr === 'for' && hasItem(t, 'arma')) bonus += 1;
      const tb = wx('tb', null); if (tb && tb[attr]) bonus += tb[attr];
      if (t.planPh >= phases.length - 3) bonus += 1;
      // gli oggetti adatti a quella prova: ogni variante ha i suoi bonus (e qualche malus), al massimo +3 in tutto
      const inv = t.inv || [], ipr = typeof itemProps === 'function' ? itemProps : () => ({});
      const gearBonus = Math.max(-2, Math.min(3, inv.reduce((s2, it) => s2 + ((ipr(it).prova || {})[attr] || 0), 0)));
      if (gearBonus) { bonus += gearBonus; const src = inv.find((it) => (ipr(it).prova || {})[attr]); if (src) itemLedger.record('bonus', t, t, src, null, (gearBonus > 0 ? '+' : '') + gearBonus + ' alla prova di ' + attr + ' dagli oggetti'); }
      const die = 2 + rng.int(6) + rng.int(6);
      const roll = base + die + bonus;
      if ((attr === 'int' || attr === 'sop') && plainMap) itemLedger.record('bonus', t, t, itemOf(t, 'mappa'), null, '+2 alla prova di ' + attr);
      if (attr === 'for' && hasItem(t, 'arma')) itemLedger.record('bonus', t, t, itemOf(t, 'arma'), null, '+1 alla prova di forza');
      return { roll, dc, pass: roll >= dc, bonus };
    }

    function isEnded() {
      const a = alive();
      if (a.length <= 1) return true;
      if (cfg.teamWin && a.every((t) => t.team === a[0].team)) return true;
      return false;
    }

    function wxIs(w) {
      const f = W.fx || {};
      if (w === 'buio') return (f.stl || 1) >= 1.3;
      if (w === 'abbondanza') return (f.forage || 1) >= 1.4;
      if (w === 'pericolo') return (f.lethal || 1) >= 1.1 || (f.beast || 1) >= 1.5 || (f.pr || 0) >= 6;
      return !W.n || (!(f.lethal > 1) && !(f.beast > 1) && !((f.pr || 0) > 0));
    }
    function checkReq(ev, roles) {
      if (geo && ev.text != null && !geo.accepts(ev,roles)) return false;
      if(ev.afterScene!=null&&!D.world.follows(ev.afterScene,roles[0].zone,roles,phases))return false;
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
            if (!canTeam(ts)) return false;
            break;
          }
          case 'hasAlly': if (A.allyId == null) return false; break;
          case 'has': if (!hasItem(A, r.item)) return false; break;
          case 'canReceive': { const it = itemOf(A, r.item); if (!it || !canReceiveItem(B, it)) return false; break; }
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
          case 'crush': if (A.crush !== B.id) return false; break;
          case 'b_trust': if (trustOf(A, B) < 30) return false; break;
          case 'b_distrust': if (trustOf(A, B) > -30) return false; break;
          case 'b_fear': if (fearOf(A, B) < 40) return false; break;
          case 'b_respect': if (respectOf(A, B) < 40) return false; break;
          case 'b_attract': if (attractOf(A, B) < 30) return false; break;
          case 'b_promise': if (!A.promises.some((q) => q.to === B.id && !q.done)) return false; break;
          case 'b_rival': if (respectOf(A, B) < 25 || respectOf(B, A) < 25 || like(A, B) > 10 || like(B, A) > 10) return false; break;
          case 'b_ex': if (A.exPartner !== B.id || A.partner || B.partner || !B.alive) return false; break;
          case 'b_close': if (peek(A, B).k < 40 || like(A, B) < 30 || like(B, A) < 30) return false; break;
          case 'plot': if (A.plot !== B.id) return false; break;
          case 'goal': if (!A.goal || A.goal.k !== r.g) return false; break;
          case 'stat': { const v = A[r.k]; if (r.op === '<' ? v >= r.v : v <= r.v) return false; break; }
          case 'wx': if (!wxIs(r.w)) return false; break;
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
      let w = ev.w * (worldMemory ? worldMemory.weight(ev,P) : 1);
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
        else if ((r.t === 'crush' && P.crush) || (r.t === 'plot' && P.plot)) w *= 4;
        else if (r.t.startsWith('b_') && r.r[0] === 0) w *= 2.5;
        else if (r.t === 'goal' && P.goal && P.goal.k === r.g && r.r[0] === 0) w *= 3;
        else if (r.t === 'wx' && wxIs(r.w)) w *= 2.5;
        else if (r.t === 'stat' && r.r[0] === 0) { const v = P[r.k]; if (r.op === '<' ? v < r.v : v > r.v) w *= 2.5; }
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
      const gk = P.goal ? P.goal.k : '';
      if (gk === 'caccia' && tg('agg')) w *= 1.6;
      if (gk === 'nascondersi') { if (tg('agg')) w *= 0.5; if (tg('cow') || tg('stl')) w *= 1.8; }
      if (gk === 'cibo' && tg('food')) w *= 1.8;
      if (gk === 'curarsi' && tg('heal')) w *= 1.8;
      if (gk === 'spettacolo' && tg('show')) w *= 2;
      if (gk === 'reclutare' && (tg('ally') || tg('soc'))) w *= 1.8;
      if (gk === 'tradire' && tg('betray')) w *= 3;
      if (gk === 'cotta' && tg('love')) w *= 2;
      if (ev.origin === 'custom') w *= 1.5;
      else if (ev.origin === 'adult') w *= 1.25;
      else if (ev.origin !== 'base') w *= 1.3;
      return w * variety.weight(ev);
    }

    /* il tono di un evento decide chi può esserci: un gesto d'affetto non si fa con chi si odia,
       un'aggressione non si rivolge (salvo follia o tradimento) a chi si ama */
    function toneOf(ev) {
      if (ev.tone) return ev.tone;
      // il tono si legge dall'esito voluto (effetti fissi e riuscita della prova); il fallimento conta solo se il resto è neutro
      const warm = [], hostile = [];
      const pair = (list, a, b) => { if (a != null && b != null && a !== b) list.push([Math.min(a, b), Math.max(a, b)]); };
      const read = (fxs, ks) => {
        fxs.forEach((f) => {
          if (f.t === 'al') for (let i = 0; i < f.r.length; i++) for (let j = i + 1; j < f.r.length; j++) pair(warm, f.r[i], f.r[j]);
          if (['love', 'give', 'save', 'repay', 'mkpromise'].includes(f.t)) pair(warm, f.r[0], f.r[1]);
          if (f.t === 'cure' && ev.n >= 2 && f.r[0] !== 0) pair(warm, 0, f.r[0]);
          if (['hit', 'poison', 'steal'].includes(f.t)) pair(hostile, f.r[0], f.r[1]);
          if (f.t === 'rel' || f.t === 'bondfx') pair(f.v > 0 && f.k !== 'p' ? warm : hostile, f.r[0], f.r[1]);
        });
        ks.forEach((k) => { if (!k.betray) k.by.forEach((a) => k.v.forEach((b) => pair(hostile, a, b))); for (let i = 0; i < k.by.length; i++) for (let j = i + 1; j < k.by.length; j++) pair(warm, k.by[i], k.by[j]); });
      };
      read(ev.fx.concat(ev.ok.fx), ev.kills.concat(ev.ok.kills));
      if (!warm.length && !hostile.length) read(ev.ko.fx, ev.ko.kills);
      const fx = ev.fx.concat(ev.ok.fx, ev.ko.fx), has = (t) => fx.some((f) => f.t === t), rq = (t) => ev.req.some((r) => r.t === t), tg = (t) => ev.tags.includes(t);
      const kills = ev.kills.concat(ev.ok.kills, ev.ko.kills);
      ev.req.forEach((r) => { if ((r.t === 'friend' || r.t === 'b_close' || r.t === 'b_trust' || r.t === 'couple') && r.r) pair(warm, r.r[0], r.r[1]); });
      const all = []; for (let i = 0; i < ev.n; i++) for (let j = i + 1; j < ev.n; j++) all.push([i, j]);
      let tone = 'neutral';
      if (has('forgive') || rq('grudge') && has('forgive')) tone = 'reconcile';
      else if (tg('betray') || has('br') || kills.some((k) => k.betray)) tone = 'betray';
      else if (warm.length && !hostile.length) tone = 'warm';
      else if (hostile.length || tg('agg') || tg('steal') || rq('enemy') || rq('grudge') || rq('plot')) tone = 'hostile';
      else if (tg('give') || tg('love') || tg('ally')) tone = 'warm';
      else if (tg('soc')) tone = 'social';
      // le coppie su cui pesa il tono: quelle delle etichette, altrimenti chi agisce verso gli altri
      const lead = []; for (let j = 1; j < ev.n; j++) lead.push([0, j]);
      ev.tonePairs = { warm: warm.length ? warm : tone === 'warm' || tone === 'social' ? all : [], hostile: hostile.length ? hostile : tone === 'hostile' ? lead : [] };
      ev.toneLicence = rq('grudge') || rq('enemy') || rq('plot') || rq('b_distrust') || rq('b_rival') || rq('b_fear') || tg('mad') || tg('drunk');
      return (ev.tone = tone);
    }
    // quanto un gruppo di partecipanti stona con il tono dell'evento (Infinity = impossibile)
    function toneClash(ev, roles) {
      const tone = toneOf(ev); if (ev.n < 2 || tone === 'neutral' || tone === 'reconcile') return 0;
      let cost = 0;
      for (const [i, j] of ev.tonePairs.warm) {
        const a = roles[i], b = roles[j]; if (!a || !b) continue;
        const h = hostility(a, b);
        if (h >= 2 && !ev.toneLicence) { if (tone === 'warm') return Infinity; cost += 8; }
        else if (h >= 1) cost += tone === 'warm' ? 3 : 1.5;
        if (fearOf(a, b) >= 60 || fearOf(b, a) >= 60) cost += 2;
      }
      for (const [i, j] of ev.tonePairs.hostile) {
        const a = roles[i], b = roles[j]; if (!a || !b) continue;
        const close = a.partner === b.id || (like(a, b) >= 45 && trustOf(a, b) >= 25);
        if (close && !ev.toneLicence && !(a.st.ubriaco != null || a.st.sconvolto != null)) { if (alive().length > 4) return Infinity; cost += 6; }
        if (hostility(a, b) >= 2) cost -= 2;
      }
      return cost;
    }
    function relKey(P, t, tone) {
      let k = (t.zone === P.zone ? 0 : 1) + rng.f() * 1.3;
      const kind = tone === 'warm' || tone === 'social' ? 'warm' : tone === 'hostile' || tone === 'betray' ? 'hostile' : '';
      if (kind === 'warm') { if (P.grudges[t.id] || t.grudges[P.id]) k += 2.5; if (like(P, t) <= -40) k += 1.2; if (like(P, t) >= 40) k -= 0.5; }
      if (kind === 'hostile') { if (P.partner === t.id) k += 2.4; if (like(P, t) >= 45) k += 1; }
      if (kind === 'warm') return k;
      if (P.grudges[t.id]) k -= 2.2;
      if (P.partner === t.id) k -= 1.6;
      if (P.owes[t.id] || t.owes[P.id]) k -= 1.1;
      if (t.grudges[P.id]) k -= 0.9;
      if (P.goal && P.goal.tg === t.id) k -= 1;
      if (P.crush === t.id) k -= 0.6;
      const pb = peek(P, t);
      if (pb.p >= 50) k += 0.7;
      if (pb.t >= 40) k -= 0.4;
      if (pb.k >= 40) k -= 0.3;
      const a = aff(P, t); if (a >= 40) k -= 0.7; else if (a <= -40) k -= 0.5;
      return k;
    }
    function assign(ev, P, un) {
      const others = [];
      un.forEach((id) => id !== P.id && byId[id].alive && (!geo || byId[id].zone === P.zone) && others.push(byId[id]));
      if (others.length < ev.n - 1) return null;
      let best = null, bestScore = -Infinity;
      for (let attempt = 0; attempt < 12; attempt++) {
        const tone = toneOf(ev);
        const keyed = others.map((t) => [t, relKey(P, t, tone)]).sort((a, b) => a[1] - b[1]);
        const group = keyed.slice(0, ev.n - 1).map((x) => x[0]);
        const roles = attempt % 2 === 0 ? [P].concat(rng.shuffle(group)) : rng.shuffle([P].concat(group));
        if (!checkReq(ev, roles)) continue;
        const clash = toneClash(ev, roles); if (clash === Infinity) continue;
        let score = rng.f() * 6 - clash;
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
      // quando è successo davvero: stesso giorno, il giorno prima, o qualche giorno fa
      const d = (phases[g.phase] && phases[g.phase].day) || day || 1, when = d >= day ? 'di oggi' : d === day - 1 ? 'di ieri' : 'di qualche giorno fa';
      return { betray: 'il tradimento', steal: 'il furto ' + when, attack: 'l\'agguato ' + when, love: 'il cuore spezzato', greed: 'il cibo negato' }[g.why] || 'tutto quello che è successo';
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
      if (geo) list = (list || []).map(text=>Geography.adaptText(text,theme)).filter(text => !Geography.offTheme(text,theme));
      if (!list || !list.length) return null;
      const tpl = rng.pick(list);
      let s = tpl.replace(/\[(\d):([^\]]*)\]/g, (_, i, o) => genderPick([people[+i]], o));
      s = cap(artPrep(s));
      stats.echoes++;
      return { plain: edFix(s.replace(/\{(\d)\}/g, (_, i) => people[+i].name)), html: edFix(esc(s).replace(/\{(\d)\}/g, (_, i) => nameTag(people[+i]))), cls: cls || '' };
    }

    // ---------- ecosistema: testi e valori vitali ----------
    function fmt(src, people, vars) {
      const fits = (x) => { let mx = -1; x.replace(/[{\[](\d)[}:]/g, (_, d) => { mx = Math.max(mx, +d); }); return mx < people.length && !/\{(i|ip|j|k|z|n)\}/.test(x.replace(/\{(i|ip|j|k|z|n)\}/g, (m, v) => (vars && vars[v] != null && vars[v] !== '' ? '' : m))); };
      const here = vars && vars.z ? theme.lex.luogo.indexOf(vars.z) : people[0]?.zone;
      const list = (Array.isArray(src) ? src : []).map(source=>({source,text:geo?Geography.adaptText(source,theme):source})).filter(x => fits(x.text) && (!geo || !Geography.offTheme(x.text,theme) && Geography.mentions(x.text,geographyZones).every(m => m.zone === here) && proseDepartures(x.text).every(i=>people[i]&&geo.budget(people[i])>0&&geographyZones[people[i].zone].links.some(z=>!closed.has(z))))); if (!list.length) return null;
      const chosen=rng.pick(list);let s=chosen.text;const src0=chosen.source;
      s = s.replace(/\[(\d):([^\]]*)\]/g, (_, i, o) => genderPick([people[+i]], o))
        .replace(/\{(i|ip|j|k|z|m|n|d)\}/g, (_, x) => (vars && vars[x] != null ? vars[x] : ''))
        .replace(LEX_RE, (_, k2) => (k2 === 'luogo' && (vars?.z || geo && people[0]) ? vars?.z || theme.lex.luogo[people[0].zone] : geo?Geography.pickLex(LEX,k2,here,theme,geographyZones,rng):rng.pick(LEX[k2] || ['qualcosa'])));
      s = cap(artPrep(s));
      return { src: src0, plain: edFix(s.replace(/\{(\d)\}/g, (_, i) => people[+i].name)), html: edFix(esc(s).replace(/\{(\d)\}/g, (_, i) => nameTag(people[+i]))) };
    }
    const sysText = (k, people, vars) => fmt(TX(k), people, vars) || (geo ? fmt((theme.soft && ECO.txtSoft?.[k]) || ECO.txt?.[k],people,vars) : null);
    // le voci: una battuta di chi parla, scelta da tratti, arena e situazione
    const USED = new Set();
    // sceglie tra le frasi non ancora usate in questa partita (se ne restano)
    const fresh = (l) => { const f = (l || []).filter((x) => !USED.has(x)); return f.length ? f : l || []; };
    const useFmt = (l, people, vars) => { const pool = fresh(l); const x = fmt(pool, people, vars); if (x) pool.forEach((y) => { if (x.src === y) USED.add(y); }); return x; };
    function voice(kind, speaker, others, vars) {
      if (!speaker) return null;
      if (geo && !speaker.alive && kind !== 'last') return null;
      const base = (theme.soft && VS[kind]) || VO[kind] || (theme.soft && (BD.voiceSoft || {})[kind]) || (BD.voice || {})[kind] || {};
      const tr = speaker.traits.filter((x) => base.trait && base.trait[x] && fresh(base.trait[x]).some((y) => !USED.has(y)));
      const ar = base.arena && base.arena[theme.id];
      const people = [speaker].concat(others || []);
      let x = null;
      const local=world?.quotes.filter(q=>q.kind===kind&&q.zone===speaker.zone&&!USED.has(q.text));
      if(local?.length&&rng.chance(0.5))x=useFmt(local.map(q=>q.text),people,vars);
      if (!x && tr.length && rng.chance(0.55)) x = useFmt(base.trait[rng.pick(tr)], people, vars);
      if (!x && ar && ar.some((y) => !USED.has(y)) && rng.chance(0.45)) x = useFmt(ar, people, vars);
      if (!x) x = useFmt(base._ || [], people, vars);
      if (!x) return null;
      return { plain: speaker.name + ': «' + x.plain + '»', html: nameTag(speaker) + ': «' + x.html + '»', cls: 'quote' };
    }
    const pushVoice = (out, v) => { if (v && out.length < 3) out.push(v); };
    function sys(k, people, vars, o, pri) {
      const tx = sysText(k, people, vars); if (!tx) return null;
      const ev = Object.assign({ html: tx.html, plain: tx.plain, ids: people.map((p) => p.id), deaths: [], lethal: false, origin: 'sys', cat: 'none', why: 'conseguenza', echo: [] }, o || {});
      if(geo&&/^trap(?:Dodge|Ally|Hit)$/.test(k))ev.ids=[people[1].id];
      if (geo) ev.place = geo.locate(people,vars?.z ? theme.lex.luogo.indexOf(vars.z) : undefined);
      SYS.push({ pri: pri || 1, ev });
      if(geo)moveAfterProse(tx,people);
      return ev;
    }
    // ricordi dei rapporti (in prima persona) e diario segreto
    // ogni ricordo cambia il legame di chi ricorda verso l'altra persona
    const { remember, remember1 } = Systems.createMemory({ phases, BD, tweak, getDay: () => day });

    const { syncSt, hurt } = Systems.createVitals({ phases, clamp, M, hasTrait, DR, rng, stats, sys, possessive, itemOf, itemLedger, takeItem: (t, it) => takeItem(t, it), props: itemProps });

    const { capInv, itemName, maxUses, mkItem, itemScore, canReceiveItem, addItem, takeItem } = Systems.createInventory({ IT, theme, ITEM_NAME, LEX, rng, MOD, itemOf, clamp, getDay: () => day, getOrigin: () => ORIGIN, props: itemProps, slots: itemSlots, cap: carryCap, onDrop: (t, it) => dropItem(t, it) });

    // l'arma si consuma a ogni colpo e alla fine si rompe
    function wear(k, out) {
      const w = itemOf(k, 'arma'); if (!w || !w.u) return;
      w.u--;
      if (w.u <= 0) {
        takeItem(k, w); stats.broken++;
        const e = sysText('weaponBreak', [k], { i: w.name, ip: possessive(w) });
        if (e) { if (out && out.length < 3) out.push(Object.assign(e, { cls: '' })); else remember1(k, e.html, 'fatto'); }
      }
    }
    // lo zaino è pieno: l'oggetto meno utile resta a terra nella zona (e qualcun altro potrà trovarlo)
    function dropItem(t, it) {
      if (!t || it.type === 'ricordo') return;
      (zoneLoot[t.zone] = zoneLoot[t.zone] || []).push({ it, from: t.id });
      stats.dropped = (stats.dropped || 0) + 1;
      if (t.alive && remember1) remember1(t, '<b>' + esc(cap1(it.name)) + '</b> resta a ' + esc(zoneName(t.zone)) + ': nello zaino non c\'era più posto.', 'fatto');
    }
    const cap1 = (x) => x.charAt(0).toUpperCase() + x.slice(1);
    // una cura: salute minima secondo la variante, stati guariti, energia e morale se previsti
    function applyMed(t, it, floor, add) {
      const P = itemProps(it);
      if (add) t.hp += add + (P.cura || 0) / 2; else t.hp = Math.max(t.hp, floor + (P.cura || 0));
      (P.guarisce || []).forEach((st) => { if (st === 'ferito') t.hp = Math.max(t.hp, 60); else delete t.st[st]; });
      t.en += P.energia || 0; t.mo += P.morale || 0;
    }
    function eat(t) {
      const i = t.inv.findIndex((x) => x.type === 'cibo'); if (i < 0) return false;
      const it = t.inv[i], before = itemLedger.state(t);
      const P = itemProps(it);
      t.inv.splice(i, 1); t.food += 50 + (P.cibo || 0); t.mo += 3 + (P.morale || 0); t.en += P.energia || 0;
      if (M && M.coffee) t.pr -= 12;
      syncSt(t); itemLedger.record('consume', t, t, it, before, 'Pasto consumato'); return true;
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
      if (geo) geo.death(v);
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
          k.kills++; k.killIds.push(v.id);
          // Un danno già inflitto può uccidere dopo la morte del responsabile.
          // Si aggiorna il credito, senza far agire di nuovo il concorrente morto.
          if (!k.alive) return;
          k.fame += 1;
          const dm = hasTrait(k, 'spietato') || hasTrait(k, 'folle') ? 6 : hasTrait(k, 'pacifista') ? -25 : -(4 + Math.max(0, k.attr.emp - 5) * 3);
          k.mo += dm < 0 ? dm * DR.mo : dm;
          if (M && M.kill) k.pr += M.kill * Math.max(0.4, 1.2 - k.attr.emp * 0.06);
          if (dm <= -15 && out.length < 3 && rng.chance(0.5)) { const e = sysText('remorse', [k, v]); if (e) out.push(Object.assign(e, { cls: '' })); }
          else if (dm > 0 && k.kills === 2 && out.length < 3 && rng.chance(0.5)) { const e = sysText('bloodlust', [k]); if (e) out.push(Object.assign(e, { cls: 'warn' })); }
          wear(k, out);
          if (k.plot === v.id) k.plot = null;
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
          let took = 0; const left = [];
          v.inv.slice().forEach((it) => {
            const mine = itemOf(K, it.type);
            const want = it.type !== 'ricordo' && (it.type === 'arma' || it.type === 'armatura' ? !mine || itemScore(it) > itemScore(mine) : !mine || it.type === 'cibo' || it.type === 'valore');
            if (took < 2 && want) {
              addItem(K, Object.assign({}, it, { how: theme.soft ? 'eredita' : 'bottino', from: v.id, d: day })); took++; stats.looted++;
              if (took === 1 && out.length < 3 && rng.chance(0.4)) { const e = sysText(theme.soft ? 'lootSoft' : 'loot', [K, v], { i: it.name }); if (e) out.push(Object.assign(e, { cls: '' })); }
            } else left.push({ it, from: v.id });
          });
          // il resto dello zaino resta sul posto, per chi passerà di lì
          if (left.length) (zoneLoot[v.zone] = zoneLoot[v.zone] || []).push(...left);
        } else if (!K && v.inv.length) (zoneLoot[v.zone] = zoneLoot[v.zone] || []).push(...v.inv.map((it) => ({ it, from: v.id })));
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
          remember(X, K, 'killedDear', v);
          if (K.alive && addGrudge(X, K, 'kill', v) && echoed < 2) { const e = echo(lover ? E.grudgeLover : E.grudgeKill, [X, K, v], 'warn'); if (e) { out.push(e); echoed++; } }
        });
        if (!killers.length && lover && echoed < 2) { const e = echo(E.griefOnly, [X, v], 'warn'); if (e) { out.push(e); echoed++; } }
      });
      if (v.partner) { const p = byId[v.partner]; if (p) { p.partner = null; p.exPartner = v.id; } v.partner = null; }
      bondsOnDeath(v, killers, out);
    }
    // ogni morte pesa diversamente su ognuno: lutto, sollievo, rispetto, colpa, promesse
    function bondsOnDeath(v, killers, out) {
      let tributes = 0;
      killers.forEach((K) => { if (K.alive) T.forEach((X) => { if (X.alive && X !== K && !isAlly(X, K)) tweak(X, K, { p: 2 + Math.min(10, K.kills * 2.5), r: 1 + Math.min(4, K.kills) }); }); });
      T.forEach((X) => {
        if (!X.alive || X === v) return;
        const b = peek(X, v), L = like(X, v), isK = killers.includes(X);
        // promessa di vendetta: chi l'aveva giurata ora ha un nome
        const vow = X.promises.find((q) => q.to === v.id && q.k === 'vendetta' && !q.done);
        if (vow && killers.length && !isK) {
          const K = killers.find((k) => k.alive);
          if (K) { addGrudge(X, K, 'kill', v); X.vowed = { k: K.id, v: v.id }; const e = fmt((BD.promises || {}).trigger, [X, v, K]); if (e && out.length < 3) out.push(Object.assign(e, { cls: 'warn' })); else if (e) remember1(X, e.html, 'segreto'); }
          else dissolvePromise(vow);
        }
        // promessa di protezione: era lì, e non ha fatto niente
        if (X.promises.some((q) => q.to === v.id && q.k === 'protezione' && !q.done)) {
          if (X.zone === v.zone && !isK) { settlePromise(X, v, 'protezione', false, null); X.mo -= 15; }
          else X.promises.forEach((q) => { if (q.to === v.id) dissolvePromise(q); });
        }
        X.promises.forEach((q) => { if (q.to === v.id && q.k !== 'vendetta') dissolvePromise(q); });
        if (isK) {
          if (L >= 30 || b.k >= 50) { X.mo -= 15 * DR.mo; remember(X, v, 'guilt'); const d = fmt(BDI('guiltDiary'), [X, v]); if (d) remember1(X, d.html, 'segreto'); }
          if (X.vowed && X.vowed.k === v.id) { const dear = byId[X.vowed.v]; settlePromise(X, dear, 'vendetta', true, out); X.vowed = null; }
          return;
        }
        if (L <= -50 || X.grudges[v.id]) { X.mo += 8; if (rng.chance(0.5)) { const d = fmt(BDI('relief'), [X, v]); if (d) remember1(X, d.html, 'pensiero'); } }
        else if (b.p >= 45) { X.mo += 6; const d = fmt(BDI('fearless'), [X, v]); if (d && rng.chance(0.6)) remember1(X, d.html, 'pensiero'); }
        else if (b.r >= 35 && L < 40 && tributes < 1 && rng.chance(0.6)) { tributes++; const e = useFmt(BA('tribute'), [X, v]); if (e) sys2(e, [X], 'none', 'Rispetto', 1); }
      });
      if (v.promises) v.promises.forEach(dissolvePromise);
    }
    function giveItem(t, type, ctx, lexPick, name, q, how, from, src) {
      const nm = name || (type === 'arma' ? lexPick('arma') : type === 'cibo' ? ctx.cibo || 'delle provviste' : geo && ctx[type] ? ctx[type] : world ? lexPick(type) : ITEM_NAME[type] || lexPick(type));
      const it = src ? Object.assign({}, src, { how: how || 'trovato', from: from ? from.id : null, d: day }) : mkItem(type, nm, how, from, q);
      if (!addItem(t, it)) return false;
      t.items++; stats.items++;
      if (type === 'cibo' && t.food < 45) eat(t);
      return true;
    }
    function transferItem(from, to, type, how, ctx, lexPick) {
      const it = itemOf(from, type);
      if (!it || from === to || !canReceiveItem(to, it)) return false;
      if (!giveItem(to, type, ctx, lexPick, it.name, it.q, how, from, it)) return false;
      takeItem(from, it);
      return true;
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
    function eventReason(ev, roles) {
      // Si descrivono soltanto condizioni effettivamente richieste dal modello,
      // osservate prima dell'azione; nessuna spiegazione inventata a posteriori.
      for (const r of ev.req) {
        const A = roles[(r.r || [0])[0]], B = r.r && roles[r.r[1]];
        if (!A) continue;
        if (r.t === 'grudge' && B) {
          const g = A.grudges[B.id], lost = g && byId[g.victim];
          return A.name + ' portava rancore a ' + B.name + (lost ? ' per la perdita di ' + lost.name : g && g.why === 'steal' ? ' per un furto' : g && g.why === 'betray' ? ' per un tradimento' : '') + '.';
        }
        if (r.t === 'owe' && B) return A.name + ' deve un favore a ' + B.name + '.';
        if (r.t === 'couple' && B) return A.name + ' e ' + B.name + ' sono una coppia.';
        if (r.t === 'crush' && B) return A.name + ' ha una cotta segreta per ' + B.name + '.';
        if (r.t === 'plot' && B) return A.name + ' tramava da tempo contro ' + B.name + '.';
        if (r.t === 'goal' && A.goal) {
          const goal = (MIND.goals || {})[A.goal.k];
          if (goal) return 'Obiettivo di ' + A.name + ': ' + goal.label.replace('{1}', A.goal.tg && byId[A.goal.tg] ? byId[A.goal.tg].name : 'qualcuno') + '.';
        }
        if (r.t === 'stat') {
          const labels = Object.assign({ hp: 'salute', en: 'energia', mo: 'morale', food: 'sazietà', pr: M ? M.name : 'indicatore' }, theme.soft ? { hp: 'reputazione', en: 'energie' } : {});
          return A.name + ' arrivava a questo momento con ' + labels[r.k] + ' a ' + Math.round(A[r.k]) + '/100.';
        }
      }
      return '';
    }
    function apply(ev, roles) {
      CTX = null;
      if (geo && !geo.accepts(ev,roles)) throw new Error('Evento fuori posizione: '+ev.text);
      if(!geo)variety.record(ev);
      const reason = eventContext(ev, roles);
      if (ev.test) ev = resolveTest(ev, roles);
      if (geo) {
        const space = Geography.rule(ev.text,geographyZones,ev.location);
        if (space.travel != null) roles.forEach(t => geo.move(t,space.travel,'Spostamento raccontato dall’evento',{mode:'event'}));
        if(roles.some(t=>!t.alive)){
          const plain='Una trappola interrompe il percorso di '+roles.map(t=>t.name).join(', ')+': l’incontro previsto non avviene.';
          return {plain,html:esc(plain),ids:roles.filter(t=>t.alive).map(t=>t.id),deaths:[],lethal:false,note:true,origin:'sys',cat:'none',place:geo.locate(roles),echo:[]};
        }
        variety.record(ev);
      }
      const place = geo ? geo.locate(roles) : null;
      const ctx = {};
      if (geo) ctx.luogo = theme.lex.luogo[roles[0].zone];
      const lexPick = (k) => (ctx[k] != null ? ctx[k] : (ctx[k] = geo?Geography.pickLex(LEX,k,roles[0].zone,theme,geographyZones,rng):rng.pick(LEX[k] || ['qualcosa'])));
      const txt = render(ev.text, roles, lexPick, ev);
      itemLedger.setContext(txt.plain);
      const heldItems = roles.map(t => t.inv.slice());
      const out = [];
      const z = ctx.luogo != null ? theme.lex.luogo.indexOf(ctx.luogo) : roles[0].zone;
      roles.forEach((t) => { t.events++; if (!geo && z >= 0) t.zone = z; });
      // amuleti: salvano una volta da qualunque morte
      const saved = new Set();
      ev.victims.forEach((i) => {
        const v = roles[i], am = itemOf(v, 'amuleto');
        if (v.alive && am && (hasTrait(v, 'superstizioso') || rng.chance(0.85))) {
          const before = itemLedger.state(v);
          saved.add(i); v.inv.splice(v.inv.indexOf(am), 1); v.amulets++; stats.amulets++;
          const e = echo(theme.soft ? E.amuletSoft : E.amulet, [v], 'twist');
          if (e) out.push({ plain: e.plain.replace('§', possessive(am)), html: e.html.replace('§', esc(possessive(am))), cls: 'twist' });
          const atk = ev.kills.find((k) => k.v.includes(i));
          hurt(v, 30, atk ? roles[atk.by[0]] : null, 'wound');
          itemLedger.record('protect', v, v, am, before, 'Eliminazione diretta evitata; il portafortuna si consuma');
          ev.kills.forEach((k) => { if (k.v.includes(i)) k.by.forEach((b) => addGrudge(v, roles[b], 'attack')); });
          return;
        }
        // la pietà: all'ultimo, chi colpisce può non farcela
        const atkM = ev.kills.find((k) => k.v.includes(i));
        if (atkM && !atkM.betray && v.alive && alive().length > 2) {
          const K = roles[atkM.by[0]];
          if (K && K.alive && rng.chance(mercyChance(K, v))) {
            saved.add(i); hurt(v, 18, K, 'wound'); v.owes[K.id] = 'vita'; K.spares++; stats.spared = (stats.spared || 0) + 1;
            remember(v, K, 'spared'); remember(K, v, 'sparedThem'); tweak(K, v, { l: 8 });
            const e = useFmt(BA('spare'), [K, v]); if (e) out.push(Object.assign(e, { cls: 'twist' }));
            pushVoice(out, voice('spare', K, [v]));
            return;
          }
        }
        // la protezione para il colpo
        const arm = itemOf(v, 'armatura');
        if (v.alive && arm && alive().length > 2 && rng.chance(0.24)) {
          const before = itemLedger.state(v);
          saved.add(i); takeItem(v, arm);
          const atk2 = ev.kills.find((k) => k.v.includes(i)); const K2 = atk2 ? roles[atk2.by[0]] : null;
          hurt(v, 26, K2, 'wound'); if (K2) { addGrudge(v, K2, 'attack'); remember(v, K2, 'tried'); }
          itemLedger.record('protect', v, v, arm, before, 'Eliminazione diretta evitata; la protezione si rompe');
          const e = fmt(ACT('armorSave'), [v], { i: arm.name, ip: possessive(arm) }); if (e) out.push(Object.assign(e, { cls: 'twist' }));
          return;
        }
        // la tempra: chi è in forma e resistente a volte sopravvive al colpo, ma ridotto malissimo
        const tough = 0.03 + (v.attr.res - 5) * 0.022 + (v.attr.fort - 5) * 0.01 + (hasTrait(v, 'sopravvissuto') ? 0.08 : 0) + (v.mo >= 80 ? 0.03 : 0);
        if (v.alive && v.hp >= 60 && alive().length > 2 && rng.chance(Math.max(0, tough))) {
          saved.add(i);
          const atk = ev.kills.find((k) => k.v.includes(i));
          const K = atk ? roles[atk.by[0]] : null;
          v.hp = 9 + rng.int(10); v.hurtPh = phases.length; v.cause = K ? { k: 'wound', by: K.id, ph: phases.length } : { k: 'wound', ph: phases.length, by: null };
          if (K) { addGrudge(v, K, 'attack'); remember(v, K, 'tried'); K.fame += 1; }
          if (M && M.infect && !v.infected && rng.chance(M.infect)) { v.infected = true; v.pr = 10; stats.infected++; }
          syncSt(v); stats.tough = (stats.tough || 0) + 1;
          const e = sysText(K ? 'tough' : 'toughEnv', K ? [v, K] : [v]); if (e) out.push(Object.assign(e, { cls: 'twist' }));
        }
      });
      let spoke = false;
      for (const k of ev.kills) {
        const killers = k.by.map((i) => roles[i]);
        const dear = {}; k.v.forEach((i) => killers.forEach((K) => { const g = K.grudges[roles[i].id]; if (g && g.victim) dear[i] = { K, x: byId[g.victim] }; }));
        if (killers.length > 1) killers.forEach((a) => killers.forEach((b) => { if (a !== b) { remember(a, b, 'fought'); tally(a, b, 'fw'); } }));
        if (k.betray) killers.forEach((K) => k.v.forEach((i) => settlePromise(K, roles[i], 'fedelta', false, out)));
        k.v.forEach((i) => {
          if (saved.has(i)) return;
          const v = roles[i]; const wasAlive = v.alive;
          const lastPartner = byId[v.partner || v.exPartner];
          kill(v, killers, txt, out);
          if (wasAlive && !v.alive) witness(killers[0], 'kill', v, roles);
          if (!wasAlive || v.alive || spoke || !rng.chance(0.38)) return;
          spoke = true;
          const KA = killers[0] && killers[0].alive ? killers[0] : null;
          if (dear[i] && dear[i].K.alive) pushVoice(out, voice('revenge', dear[i].K, [v, dear[i].x]));
          else if (k.betray && KA) pushVoice(out, voice('betray', KA, [v]));
          else if (KA && rng.chance(0.5)) pushVoice(out, voice('kill', KA, [v]));
          else pushVoice(out, voice('last', v, [killers[0], lastPartner].filter(Boolean)));
        });
        if (k.betray) {
          stats.betrayals++;
          killers.forEach((t) => { t.betrayals++; t.traitor = true; t.plot = null; leaveAlliance(t); });
        }
      }
      ev.dies.forEach((i) => { if (!saved.has(i)) kill(roles[i], [], txt, out); });
      let spentMedicine=null;
      for (const f of ev.fx) {
        const t = roles[f.r[0]], u = f.r[1] != null ? roles[f.r[1]] : null;
        if (!t.alive && f.t !== 'rel') continue;
        switch (f.t) {
          case 'al': {
            const ts = f.r.map((i) => roles[i]).filter((x) => x.alive);
            if (ts.length > 1) { joinAlliance(ts); stats.alliances++; if (rng.chance(0.22)) pushVoice(out, voice('ally', ts[0], [ts[1]])); ts.forEach((x) => { x.alliancesFormed++; x.mo += 10; ts.forEach((y) => remember(x, y, 'allied')); ts.forEach((y) => x.id < y.id && addAff(x, y, Math.round(25 * (0.7 + (x.attr.car + y.attr.car) / 30)))); }); }
            break;
          }
          case 'br': {
            const g = t.allyId != null ? [...(alliances.get(t.allyId) || [])].map((id) => byId[id]).filter((x) => x !== t && x.alive) : [];
            leaveAlliance(t); t.betrayals++; t.traitor = true; stats.betrayals++;
            t.plot = null;
            g.forEach((x) => settlePromise(t, x, 'fedelta', false, out));
            let n = 0; g.forEach((x) => { x.mo -= 18 * DR.mo; remember(x, t, 'betrayed'); if (addGrudge(x, t, 'betray') && n++ < 1) { const e = echo(E.betray, [x, t], 'warn'); if (e) out.push(e); } });
            break;
          }
          case 'gain': giveItem(t, f.item, ctx, lexPick); break;
          case 'lose': { const it = itemOf(t, f.item); if (it) { if(world&&f.item==='med')spentMedicine={owner:t,item:it};takeItem(t, it); } break; }
          case 'consume': {
            const it = itemOf(t, f.item); if (!it) break;
            const before = itemLedger.state(t); takeItem(t, it);
            if (f.item === 'cibo') { const P = itemProps(it); t.food += 40 + (P.cibo || 0); t.en += P.energia || 0; t.mo += P.morale || 0; }
            if (f.item === 'med') { applyMed(t, it, 70); if (t.cause && t.cause.k === 'wound' && t.st.malato == null) t.cause = null; }
            itemLedger.record('consume', t, t, it, before, 'Consumo esplicito');
            break;
          }
          case 'steal': {
            if (transferItem(u, t, f.item, 'rubato', ctx, lexPick) && !ev.tags.includes('secret')) { u.mo -= 10; remember(u, t, 'robbed'); if (u.alive && addGrudge(u, t, 'steal')) { const e = echo(E.steal, [u, t], 'warn'); if (e) out.push(e); } }
            break;
          }
          case 'give': {
            if (!transferItem(t, u, f.item, 'dono', ctx, lexPick)) break;
            u.owes[t.id] = 'dono'; addAff(t, u, 20); u.mo += 8; remember(u, t, 'gift');
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
              else if (f.s === 'avvelenato' || f.s === 'malato') { t.hp -= 8; t.cause = { k: f.s === 'avvelenato' ? 'poison' : 'sick', ph: phases.length }; if (f.s === 'avvelenato') t.poisonSource = null; }
            }
            syncSt(t);
            break;
          }
          case 'cure': {
            const careBefore=spentMedicine?itemLedger.state(t):null;
            t.st = t.st.lutto != null ? { lutto: t.st.lutto } : {};
            t.cause = null;
            t.hp = Math.max(t.hp, 72); t.en += 10; t.mo += 6;
            if (M && M.cure) { if (M.infect) { if (t.infected && t.pr < M.cure) { t.infected = false; t.pr = 0; stats.cured++; } } else t.pr -= M.cure; }
            syncSt(t);
            if(spentMedicine){itemLedger.record('heal',spentMedicine.owner,t,spentMedicine.item,careBefore,'Cura con la medicina posseduta dal soccorritore');spentMedicine=null;}
            const helper = roles.find((x) => x !== t && x.alive);
            if (helper && ev.n > 1) { t.owes[helper.id] = 'cura'; addAff(t, helper, 30); helper.saves++; remember(t, helper, 'cured'); if (rng.chance(0.5)) { const e = echo(E.debt, [t, helper], ''); if (e) out.push(e); } }
            break;
          }
          case 'hit': if (u.alive) {
            const wpn = itemOf(t, 'arma');
            if (rng.chance(0.25)) pushVoice(out, voice('taunt', t, [u]));
            itemLedger.use('attack', t, u, wpn, () => hurt(u, (28 + rng.int(18)) * (1 + weaponPow(t) / 12), t, 'wound'), 'Arma usata nell’aggressione'); u.mo -= 6; remember(u, t, 'hit');
            if (wpn && wpn.x === 'veleno' && u.st.avvelenato == null) { const poisonBefore = itemLedger.state(u); u.st.avvelenato = phases.length; u.cause = u.poisonSource = { k: 'poison', by: t.id, ph: phases.length }; itemLedger.record('poison', t, u, wpn, poisonBefore, 'Arma avvelenata'); }
            wear(t, out); if (addGrudge(u, t, 'attack') && rng.chance(0.6)) { const e = echo(E.hit, [u, t], 'warn'); if (e) out.push(e); } } break;
          case 'poison': if (u.alive) {
            const before = itemLedger.state(u);
            u.st.avvelenato = phases.length; u.hp -= 8;
            u.cause = u.poisonSource = { k: 'poison', by: t.id, ph: phases.length };
            // Attribuire il veleno non significa che la vittima conosca l'avvelenatore.
            syncSt(u);
            itemLedger.record('poison', t, u, heldItems[f.r[0]].find(it => it.type === 'veleno'), before, 'Veleno applicato nell’evento');
          } break;
          case 'save': if (u.alive) { u.owes[t.id] = 'vita'; addAff(t, u, 40); u.mo += 15; remember(u, t, 'saved'); tally(u, t, 'sv'); witness(t, 'save', u, roles); settlePromise(t, u, 'protezione', true, out); if (rng.chance(0.35)) pushVoice(out, voice('saved', u, [t])); t.saves++; t.fame += 1; const e = echo(E.saved, [u, t], 'good'); if (e) out.push(e); } break;
          case 'forgive': delete t.grudges[u.id]; addAff(t, u, 20); remember(t, u, 'forgave'); break;
          case 'love': if (u.alive) {
            t.partner = u.id; u.partner = t.id; addAff(t, u, 70); stats.couples++; t.fame += 1; u.fame += 1; t.mo += 25; u.mo += 25;
            remember(t, u, 'love'); remember(u, t, 'love'); if (t.crush === u.id) t.crush = null; if (u.crush === t.id) u.crush = null; jealousy(t, u);
            if (rng.chance(0.5)) { const speaker = rng.chance(0.5) ? t : u; pushVoice(out, voice('love', speaker, [speaker === t ? u : t])); }
            if (!cfg.teamWin && (t.allyId == null || u.allyId == null || t.allyId === u.allyId) && canTeam([t, u])) { const g = t.allyId != null ? alliances.get(t.allyId) : u.allyId != null ? alliances.get(u.allyId) : null; if (!g || g.size < 5) joinAlliance([t, u]); } const e = echo(E.couple, [t, u], 'love'); if (e) out.push(e); } break;
          case 'repay': if (u) { delete t.owes[u.id]; addAff(t, u, 20); t.repaid++; remember(u, t, 'repaid'); stats.debtsRepaid++; const e = echo(E.repay, [t, u], 'good'); if (e) out.push(e); } break;
          case 'debt': if (u) t.owes[u.id] = 'favore'; break;
          case 'rel': if (u) addAff(t, u, f.v); break;
          case 'bondfx': if (u) tweak(t, u, { [f.k]: f.v }); break;
          case 'mkpromise': if (u && u.alive) makePromise(t, u, f.k); break;
          case 'breakup': if (u && t.partner === u.id) { t.partner = null; u.partner = null; t.exPartner = u.id; u.exPartner = t.id; remember(t, u, 'breakup'); remember(u, t, 'breakup'); t.mo -= 15; u.mo -= 15; stats.breakups = (stats.breakups || 0) + 1; } break;
          case 'reunite': if (u && u.alive && !t.partner && !u.partner) { t.partner = u.id; u.partner = t.id; t.exPartner = null; u.exPartner = null; remember(t, u, 'reunion'); remember(u, t, 'reunion'); t.mo += 20; u.mo += 20; stats.reunions = (stats.reunions || 0) + 1; } break;
          case 'vital': t[f.k] = (t[f.k] || 0) + f.v; if (f.k === 'hp' && f.v < 0) { t.hurtPh = phases.length; t.cause = { k: 'wound', by: null, ph: phases.length }; t.hp = Math.max(t.hp, Math.min(8, t.hp - f.v)); } syncSt(t); break;
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
      if (!ev.lethal && ev.n === 1 && roles[0].alive && out.length < 3) {
        if (CURKIND === 'dis' && rng.chance(0.22)) pushVoice(out, voice('disaster', roles[0]));
        else if (CURKIND === 'f' && rng.chance(0.15)) pushVoice(out, voice('feast', roles[0]));
      }
      stats.events++;
      const deaths = roles.filter((t, i) => ev.victims.includes(i) && !t.alive).map((t) => t.id);
      const cat = ev.lethal && !deaths.length && ev.cat !== 'betray' ? 'hurt' : ev.cat;
      itemLedger.setContext('');
      if(geo&&Geography.rule(ev.text,geographyZones,ev.location).scatter){const exits=geographyZones[roles[0].zone].links.filter(z=>!closed.has(z));roles.filter(t=>t.alive).forEach((t,i)=>geo.move(t,exits[i%exits.length],'Fugge in una direzione diversa dagli altri',{mode:'event'}));}
      if(geo)for(const i of Geography.rule(ev.text,geographyZones,ev.location).depart||[]){const t=roles[i];if(t?.alive){const exits=geographyZones[t.zone].links.filter(z=>!closed.has(z));if(exits.length)geo.move(t,rng.pick(exits),'Si allontana dopo l’incontro',{mode:'event'});}}
      return Object.assign({ html: txt.html, plain: txt.plain, ids: roles.map((t) => t.id), deaths, lethal: deaths.length > 0, origin: ev.origin, cat, why: ev.why, reason, echo: out.slice(0, 3), test: ev.testRes || null },geo?{place}:{},ev.contentId?{contentId:ev.contentId,contentCategory:ev.contentCategory}:{});
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

    const { snapshot: originalSnapshot } = Systems.createSnapshots({ T, syncSt, aff, relTop, alive, closed, edges, M, byId });
    function snapshot() {
      const snap = originalSnapshot();
      if (geo) snap.terrain = { traps: traps.map(t=>({zone:t.zone,owner:t.owner,name:t.name})), loot:Object.entries(zoneLoot).filter(([,items])=>items.length).map(([zone,items])=>({zone:+zone,count:items.length})) };
      return snap;
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
        const s = geo&&a.some(t=>t.zone!==a[0].zone)?'Rimasti soli nella gara, gli ultimi alleati rompono il patto: da ora ognuno pensa a sé.':'Rimasti soli, gli ultimi alleati si guardano con sospetto: l\'alleanza è finita.';
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
      ORIGIN = 'sponsor';
      const r = apply(ev, [P]); r.why = r.why || 'fama'; r.sponsor = true; events.push(r); stats.sponsors++; P.mo += 15;
      if (rng.chance(0.3)) { r.echo = r.echo || []; pushVoice(r.echo, voice('sponsor', P)); }
      // nella cassa c'è spesso anche qualcosa di utile, scelto in base ai bisogni
      if (rng.chance(0.45)) {
        const need = P.hp < 55 ? 'med' : P.food < 40 ? 'cibo' : !hasItem(P, 'armatura') ? 'armatura' : !hasItem(P, 'attrezzo') ? 'attrezzo' : 'valore';
        const it = mkItem(need, need === 'cibo' ? rng.pick(LEX.cibo || ['delle provviste']) : null, 'sponsor');
        if (addItem(P, it)) { P.items++; stats.items++; if (need === 'cibo' && P.food < 45) eat(P); const e = fmt(ACT('sponsorBonus'), [P], { i: it.name }); if (e) r.echo = (r.echo || []).concat([Object.assign(e, { cls: 'good' })]).slice(0, 3); }
      }
      ORIGIN = null; syncSt(P);
    }

    /* ---------- ecosistema: conseguenze automatiche ---------- */
    const allyMates = (t,anywhere) => (t.allyId != null ? [...(alliances.get(t.allyId) || [])].map((id) => byId[id]).filter((x) => x && x !== t && x.alive && (!geo || anywhere || x.zone === t.zone)) : []);
    const buddies = (t) => { const a = allyMates(t); if (t.partner && byId[t.partner] && byId[t.partner].alive && (!geo || byId[t.partner].zone === t.zone) && !a.includes(byId[t.partner])) a.push(byId[t.partner]); return a; };
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
          const shield = Math.min(60, gear(t, 'indicatore')); if (shield) g *= 1 - shield / 100;
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
        const it = itemOf(t, 'med'); itemLedger.use('heal', t, t, it, () => { t.inv.splice(t.inv.indexOf(it), 1); t.infected = false; t.pr = 0; stats.cured++; }, 'Kit contro l’infezione');
        sys('selfMed', [t], { i: it.name }, { cat: 'heal', why: 'infezione' }, 3); return;
      }
      if (t.pr >= M.thr && !t.infKnown) {
        t.infKnown = true;
        const mates = buddies(t);
        const doc = mates.find((x) => hasItem(x, 'med'));
        if (doc && t.pr < M.cure) {
          const it = itemOf(doc, 'med'); itemLedger.use('heal', doc, t, it, () => { doc.inv.splice(doc.inv.indexOf(it), 1); t.infected = false; t.pr = 0; stats.cured++; }, 'Kit di un alleato contro l’infezione');
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
        // nelle notti peggiori un amuleto o un ricordo tiene in piedi: conforto secondo la variante
        if (t.mo < 35) { const c = gearBest(t, 'morale', ['amuleto', 'ricordo', 'valore']); if (c) { t.mo += itemProps(c).morale; if (rng.chance(0.35)) remember1(t, 'Stringe <b>' + esc(c.name) + '</b> finché la paura non passa.', 'pensiero'); } }
        // esplorazione: cibo dalla zona o bottino dei caduti
        if (!hasItem(t, 'cibo') && t.food < 65) {
          const loot = zoneLoot[t.zone];
          const li = loot ? loot.findIndex((x) => x.it.type !== 'ricordo' && (!itemOf(t, x.it.type) || x.it.type === 'cibo')) : -1;
          if (li >= 0 && rng.chance(0.3 + t.attr.sop * 0.03)) {
            const { it, from } = loot.splice(li, 1)[0];
            addItem(t, Object.assign({}, it, { how: 'zaino', from, d: day })); t.items++; stats.items++; stats.looted++;
            sys('scavenge', [t, byId[from]], { i: it.name, z: zoneName(t.zone) }, { cat: 'item', why: 'bottino', ids: [t.id] }, 2);
            if (it.type === 'cibo' && t.food < 45) eat(t);
          } else {
            const p = (0.08 + t.attr.sop * 0.045 + (hasTrait(t, 'cacciatore') ? 0.15 : 0) + (hasItem(t, 'mappa') ? 0.12 * MOD.map : 0) + (hasItem(t, 'attrezzo') ? 0.12 : 0) + gear(t, 'raccolta') / 100) * ZP[t.zone][0] * MOD.forage * wx('forage', 1) * (t.en < 25 ? 0.6 : 1);
            if (hasItem(t, 'mappa')) itemLedger.record('bonus', t, t, itemOf(t, 'mappa'), null, 'Ricerca di cibo: termine +0,12 × modificatore mappa prima dei moltiplicatori e del limite');
            if (hasItem(t, 'attrezzo')) itemLedger.record('bonus', t, t, itemOf(t, 'attrezzo'), null, 'Ricerca di cibo: termine +0,12 prima dei moltiplicatori e del limite');
            if (rng.chance(Math.min(0.92, p))) {
              const hungry = t.food < 40; t.foraged++; stats.foraged++;
              const nm = rng.pick(LEX.cibo || ['delle provviste']);
              if (t.food < 50) t.food += 34; else { addItem(t, mkItem('cibo', nm, 'trovato')); t.items++; }
              // a volte, cercando, si trova anche altro
              if (rng.chance(0.16)) { const it = mkItem(rng.pick(['attrezzo', 'armatura', 'valore', 'alcol', 'med', 'valore']), null, 'trovato'); if (addItem(t, it)) { t.items++; stats.items++; const e = fmt(ACT('luckyFind'), [t], { i: it.name }); if (e) sys2(e, [t], 'item', 'Esplorazione', 0); } }
              if (hungry || rng.chance(0.15)) sys('forage', [t], {}, { cat: 'item', why: 'esplorazione' }, hungry ? 2 : 0);
            }
          }
        }
      });
      // le alleanze dividono il cibo, oppure litigano
      const seenG = new Set();
      A.forEach((t) => {
        const camp = geo ? t.allyId+':'+t.zone : t.allyId;
        if (t.allyId == null || seenG.has(camp)) return; seenG.add(camp);
        const g = [t].concat(allyMates(t));
        g.filter((x) => x.food < 30 && !hasItem(x, 'cibo')).forEach((h) => {
          const donor = g.filter((x) => x !== h && hasItem(x, 'cibo') && x.food >= 35).sort((a, b) => b.attr.emp - a.attr.emp)[0];
          if (!donor) return;
          const promised = donor.promises.some((q) => q.to === h.id && q.k === 'cibo' && !q.done);
          const will = donor.attr.emp / 10 + (hasTrait(donor, 'generoso') ? 0.5 : 0) + (hasTrait(donor, 'leale') ? 0.25 : 0) - (hasTrait(donor, 'avido') ? 0.7 : 0) + like(donor, h) / 200 + trustOf(donor, h) / 250 + (donor.partner === h.id ? 0.6 : 0) + (promised ? 0.6 : 0) - (MOD.greed - 1) * 0.3;
          const it = itemOf(donor, 'cibo');
          if (rng.chance(clamp(will, 0.05, 0.97))) {
            if (promised && rng.chance(0.5)) { const e = fmt(((BD.promises || {}).kept || {}).cibo, [donor, h]); if (e) remember1(h, e.html, 'fatto'); remember(h, donor, 'promiseKept'); }
            itemLedger.use('consume', donor, h, it, () => { donor.inv.splice(donor.inv.indexOf(it), 1); h.food += 48; h.mo += 8; }, 'Pasto condiviso da un alleato'); h.owes[donor.id] = h.owes[donor.id] || 'dono'; addAff(h, donor, 18); donor.shared++; stats.shared++;
            sys('share', [donor, h], { i: it.name }, { cat: 'heal', why: 'alleanza' }, 3);
          } else {
            addAff(h, donor, -25); h.mo -= 8; remember(h, donor, 'denied');
            if (promised) settlePromise(donor, h, 'cibo', false, null);
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
          const it = itemOf(doc, 'med'), before = it ? itemLedger.state(t) : null;
          if (it) { doc.inv.splice(doc.inv.indexOf(it), 1); applyMed(t, it, 0, 45 * MOD.heal); delete t.st.avvelenato; }
          else t.hp += (16 + doc.attr.int * 1.5 + (hasTrait(doc, 'guaritore') ? 12 : 0)) * MOD.heal * wx('heal', 1);
          t.owes[doc.id] = t.owes[doc.id] || 'cura'; addAff(t, doc, 16); doc.saves++; doc.nursed++; stats.nursed++; t.mo += 6;
          if (M && M.cure && !M.infect && it) t.pr -= M.cure * 0.6;
          if (it) itemLedger.record('heal', doc, t, it, before, 'Cura con un kit di un alleato');
          sys(it ? 'nurseMed' : 'nurse', [doc, t], { i: it ? it.name : '' }, { cat: 'heal', why: 'cure' }, 3);
        } else if (hasItem(t, 'med') && t.hp < 45) {
          const it2 = itemOf(t, 'med'); itemLedger.use('heal', t, t, it2, () => { t.inv.splice(t.inv.indexOf(it2), 1); applyMed(t, it2, 0, 40 * MOD.heal); delete t.st.avvelenato; }, 'Automedicazione');
          sys('selfMed', [t], { i: it2.name }, { cat: 'heal', why: 'cure' }, 2);
        }
        syncSt(t);
      });
      // cuori, gesti e scambi: ognuno secondo la propria natura
      bondsNight();
      hearts();
      personalActs();
      barter();
      chats();
      gossip();
      // sonno, guarigione naturale e umore
      let watchMsg = 0;
      A.forEach((t) => {
        if (!t.alive) return;
        const mates = buddies(t), alone = !mates.length;
        const localAlly = geo ? allyMates(t).length > 0 : t.allyId != null, localPartner = t.partner && (!geo || mates.some(x=>x.id===t.partner));
        let rest = 12 + t.attr.res * 1.1 + (localAlly ? 10 : 0) + (localPartner ? 6 : 0) + ZP[t.zone][2] * 12 - (hasTrait(t, 'sonnambulo') ? 10 : 0) - (meterBad(t) ? 8 : 0) - (t.st.lutto != null ? 6 : 0);
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
        const rc = itemOf(t, 'ricordo');
        let dm = (rc ? (rc.from && byId[rc.from] && !byId[rc.from].alive ? 7 : 4) : 0) + (localAlly ? 4 : 0) + (localPartner ? 6 : 0) + (mates.some((x) => hasTrait(x, 'leader')) ? 3 : 0) + (t.fame >= 3 ? 2 : 0) +
          (alone ? (hasTrait(t, 'solitario') ? 2 : -3) : 0) - (t.food < 25 ? 6 : 0) - (t.hp < 40 ? 6 : 0) - (meterBad(t) ? 5 : 0);
        if (dm < 0) dm *= DR.mo;
        if (rc) itemLedger.record('comfort', t, t, rc, null, 'Contributo al morale notturno: +' + (rc.from && byId[rc.from] && !byId[rc.from].alive ? 7 : 4) + ' nel calcolo complessivo');
        t.mo += dm + (58 - t.mo) * 0.08;
        syncSt(t);
      });
      // il morale a pezzi: conforto, furti tra alleati, abbandoni
      A.forEach((t) => {
        if (!t.alive || t.mo >= 24) return;
        const p = t.partner && byId[t.partner] && byId[t.partner].alive && (!geo || byId[t.partner].zone === t.zone) ? byId[t.partner] : null;
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
          itemLedger.record('deploy', t, t, tr, null, 'Trappola piazzata nella zona ' + zoneName(t.zone)); t.inv.splice(t.inv.indexOf(tr), 1); traps.push({ owner: t.id, zone: t.zone, ph: phases.length, name: tr.name, boom: tr.x === 'bomba', dmg: itemProps(tr).trappola || 0 }); t.trapsSet++; stats.trapsSet++;
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
        const guarded = alive().some((x) => x.guard === t.id && x.zone === t.zone);
        const def = Math.max(t.attr.furt, t.attr.agi, t.attr.cor) + d6() + (hasItem(t, 'arma') ? 2 : 0) + (hasItem(t, 'attrezzo') ? 1 : 0) + (alone ? 0 : 3) + (t.st.esausto != null ? -2 : 0) + (t.vigilPh >= phases.length - 1 ? 2 : 0) + (guarded ? 3 : 0) + Math.min(5, gear(t, 'belve'));
        if (hasItem(t, 'arma')) itemLedger.record('bonus', t, t, itemOf(t, 'arma'), null, '+2 alla difesa dai predatori; totale ' + def + '/14');
        if (hasItem(t, 'attrezzo')) itemLedger.record('bonus', t, t, itemOf(t, 'attrezzo'), null, '+1 alla difesa dai predatori; totale ' + def + '/14');
        if (def >= 14) { t.survivedBeasts++; if (!alone) { allyMates(t).forEach((x) => addAff(t, x, 6)); sys('beastFend', [t], {}, { cat: 'ally', why: 'predatori' }, 2); } return; }
        hurt(t, 22 + rng.int(18), null, 'beast', true);
        if (t.hp > 0) sys('beastHit', [t], {}, { cat: 'hurt', why: 'predatori' }, 3);
      });
      if (alive().length > 1 && day > 1 && rng.chance(0.2)) { const ex = alive().find((t) => t.en < 15); if (ex) sys('exhausted', [ex], {}, { cat: 'hurt', why: 'riposo' }, 0); }
      alive().forEach((t) => Object.keys(t.owes).forEach((id) => { if (!byId[id].alive) delete t.owes[id]; }));
      diaryNight();
      alive().forEach(decideGoal);
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
          else {
            const source = t.poisonSource;
            hurt(t, Math.max(3, 10 - t.attr.res * 0.6), null, 'poison', true);
            if (source) t.cause = source;
          }
        }
        if (t.st.malato != null) { const c0 = t.cause; hurt(t, Math.max(2, 6 - t.attr.res * 0.3), null, 'sick', true); if (c0 && c0.by && c0.k === 'wound') t.cause = c0; }
        if (t.food <= 0) hurt(t, 9, null, 'starve', true);
        if (t.en <= 0) hurt(t, 5, null, 'exhaust', true);
        if (t.hp < 25 && t.hp > 0) {
          const it = itemOf(t, 'med');
          if (it) { itemLedger.use('heal', t, t, it, () => { t.inv.splice(t.inv.indexOf(it), 1); t.hp += 40 * MOD.heal; delete t.st.avvelenato; }, 'Cura di emergenza'); sys('selfMed', [t], { i: it.name }, { cat: 'heal', why: 'cure' }, 2); }
          else { const c = t.cause; t.hp -= Math.max(2, 7 - t.attr.res * 0.4); if (t.hp < 15 && rng.chance(0.3)) sys('grave', [t], {}, { cat: 'hurt', why: 'ferite' }, 1); t.cause = c; }
        }
        meterTick(t, kind);
        infectionTick(t);
        const ex = itemOf(t, 'esplosivo');
        if (ex && t.st.ubriaco != null && rng.chance(0.15)) {
          itemLedger.use('accident', t, t, ex, () => { t.inv.splice(t.inv.indexOf(ex), 1); hurt(t, 38, null, 'accident', true); }, 'Esplosione accidentale'); t.accItem = ex.name;
          if (t.hp > 0) sys('accident', [t], { i: ex.name }, { cat: 'hurt', why: 'incidente' }, 2);
        }
        syncSt(t);
      });
      // la tempesta del Battle Royale
      if (closed.size && !geo) {
        let msgs = 0;
        alive().forEach((t) => {
          if (!closed.has(t.zone)) return;
          const z = zoneName(t.zone);
          const esc2 = 0.3 + t.attr.agi * 0.05 + t.en / 260 + (hasItem(t, 'mappa') ? 0.2 : 0) + (hasItem(t, 'attrezzo') ? 0.15 : 0);
          if (hasItem(t, 'mappa')) itemLedger.record('bonus', t, t, itemOf(t, 'mappa'), null, '+0,20 al calcolo della probabilità di fuga dalla tempesta');
          if (hasItem(t, 'attrezzo')) itemLedger.record('bonus', t, t, itemOf(t, 'attrezzo'), null, '+0,15 al calcolo della probabilità di fuga dalla tempesta');
          if (rng.chance(esc2)) { if (msgs < 1 && rng.chance(0.25)) { msgs++; sys('stormEscape', [t], { z }, { cat: 'none', why: 'tempesta' }, 0); } }
          else { hurt(t, (14 + rng.int(14)) * wx('storm', 1), null, 'storm', true); t.stormZ = z; if (t.hp > 0 && msgs < 2) { msgs++; sys('storm', [t], { z }, { cat: 'hurt', why: 'tempesta' }, 2); } }
          const open = [...Array(zoneCount).keys()].filter((i) => !closed.has(i));
          t.zone = rng.pick(open);
        });
      }
      // le trappole scattano
      triggerTraps();
    }
    function triggerTraps(arriving) {
      for (let k = traps.length - 1; k >= 0; k--) {
        const tp = traps[k], owner = byId[tp.owner];
        if (phases.length - tp.ph > 9) { traps.splice(k, 1); continue; }
        if (tp.ph >= phases.length) continue;
        let checked=trapChecks.get(tp);if(!checked||checked.ph!==phases.length){checked={ph:phases.length,ids:new Set()};trapChecks.set(tp,checked);}
        const here = rng.shuffle(alive().filter((x) => x.zone === tp.zone && x.id !== tp.owner && (!geo || (!arriving||x===arriving)&&!checked.ids.has(x.id))));
        for (const v of here) {
          if(geo)checked.ids.add(v.id);
          if (!rng.chance(0.16 * MOD.trap * wx('trap', 1))) continue;
          traps.splice(k, 1);
          const z = zoneName(tp.zone);
          const dodge = Math.max(v.attr.furt, v.attr.int, v.attr.agi) + d6() + (hasTrait(v, 'fortunato') ? 1 : 0) + (hasTrait(v, 'paranoico') ? 1 : 0) + (hasItem(v, 'mappa') ? 3 : 0) + (hasItem(v, 'attrezzo') ? 2 : 0);
          if (hasItem(v, 'mappa')) itemLedger.record('bonus', v, v, itemOf(v, 'mappa'), null, '+3 alla difesa dalla trappola; totale ' + dodge + '/15');
          if (hasItem(v, 'attrezzo')) itemLedger.record('bonus', v, v, itemOf(v, 'attrezzo'), null, '+2 alla difesa dalla trappola; totale ' + dodge + '/15');
          if (dodge >= 15) { addAff(v, owner, -15); sys('trapDodge', [owner, v], { z }, { cat: 'none', why: 'trappola' }, 2); break; }
          stats.trapHits++;
          const friendly = owner.allyId != null && owner.allyId === v.allyId;
          itemLedger.use('attack', owner, v, { type: 'trap', name: tp.name }, () => hurt(v, (32 + rng.int(22) + (tp.dmg || 0) * 2) * (tp.boom ? 1.5 : 1), !friendly ? owner : null, friendly ? 'wound' : 'trap', true), 'Trappola scattata' + (tp.boom ? ' con esplosivo' : ''));
          remember(v, owner, 'trap');
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
        let K = c.by && byId[c.by] && byId[c.by] !== t ? byId[c.by] : null;
        if (K && K.allyId != null && K.allyId === t.allyId) K = null;
        if (cfg.teamWin && K && K.team === t.team) K = null;
        if (k === 'woundDeath' && !K) k = 'woundDeathAny';
        if (k === 'trapKill' && !K) k = 'woundDeathAny';
        let people = k === 'trapKill' ? [K, t] : K ? [t, K] : [t];
        let mercy = null;
        if (c.k === 'infect') { mercy = buddies(t).find((x) => x.attr.cor >= 6); if (mercy && rng.chance(0.5)) { k = 'mercy'; people = [t, mercy]; mercy.mo -= 20; } else mercy = null; }
        const z = (c.k === 'storm' && t.stormZ) || (c.k === 'trap' && t.trapZ) || zoneName(t.zone);
        const tx = sysText(k, people, { z, i: t.accItem || '', m: M ? M.name.toLowerCase() : '' }) || sysText('woundDeathAny', [t], {}) || fmt([theme.soft ? '{0} cede e viene ritirat[0:o/a] dalla gara.' : '{0} non riesce più a resistere e perde la vita.'],[t]);
        const place = geo ? geo.locate(people,t.zone) : null;
        const out = [];
        t.deathKind = c.k;
        kill(t, K ? [K] : [], tx, out);
        if (K && c.k === 'trap') { K.trapKills++; }
        stats.causes[c.k] = (stats.causes[c.k] || 0) + 1;
        SYS.push({ pri: 9, ev: Object.assign({ html: tx.html, plain: tx.plain, ids: people.filter((p) => p === t || p.alive).map((p) => p.id), deaths: [t.id], lethal: true, origin: 'sys', cat: K ? 'kill' : 'death', why, echo: out.slice(0, 3) },geo?{place}:{}) });
      });
    }


    /* ---------------- la mente: obiettivi, gesti, segreti ---------------- */
    const aliveId = (id) => !!(id && byId[id] && byId[id].alive);
    const zoneMates = (t) => alive().filter((x) => x !== t && x.zone === t.zone);
    const isAlly = (a, b) => a.allyId != null && a.allyId === b.allyId;
    const canFight = (a, b) => !isAlly(a, b) && a.partner !== b.id && !(cfg.teamWin && a.team === b.team);
    const intrigue = geo ? Systems.createIntrigue({ rng: makeRng('intrigue|' + seed + '|' + theme.id), people: T, phase: () => phases.length, day: () => day, ally: isAlly, like, teamWin: !!cfg.teamWin }) : null;
    const traitName = (id) => (traitMap[id] ? traitMap[id].name : '');
    // le frasi dei complotti vengono dai contenuti, con varianti che non si ripetono nella stessa partita
    const INTR = (type, outcome) => (((theme.soft ? D.intrigueSoft : D.intrigue) || {})[type] || {})[outcome] || [];
    function revealIntrigue(events, finale = false) {
      if (!intrigue || isEnded()) return;
      const p = intrigue.take(finale); if (!p) return;
      const { owner: a, target: b, helper: c } = p, people = c ? [a, b, c] : [a, b];
      const place = geo.locate(people), out = [];
      const betray = isAlly(a, b);
      const turn = c ? clamp(0.16 + (like(c, b) - like(c, a) + trustOf(c, b) - trustOf(c, a)) / 240 + (hasTrait(c, 'traditore') ? 0.18 : 0), 0.05, 0.75) : 0;
      const doubleAgent = c && c.partner !== a.id && !(cfg.teamWin && c.team === a.team) && !(hasTrait(c, 'leale') && isAlly(c, a)) && rng.chance(turn);
      const contest = doubleAgent ? null : rollTest(b, p.type === 'imboscata' ? 'agi' : 'int', 14 + Math.floor((a.attr.int - 5) / 2));
      if (contest) { b.tests++; stats.tests++; if (contest.pass) { b.testsPassed++; stats.testsPassed++; } }
      let outcome = contest?.pass ? 'sventato' : 'riuscito', text, damaged = null;
      if (betray) {
        settlePromise(a, b, 'fedelta', false, out); leaveAlliance(a);
        a.betrayals++; a.traitor = true; stats.betrayals++;
        remember(b, a, 'betrayed'); addGrudge(b, a, 'betray');
      }
      if (p.type === 'patto') {
        if (doubleAgent) {
          outcome = 'doppio-gioco'; damaged = a;
          hurt(a, 30, c, 'wound'); c.saves++;
          remember(b, c, 'saved'); remember(a, c, 'betrayed'); addGrudge(a, c, 'betray');
          if (isAlly(a, c)) { settlePromise(c, a, 'fedelta', false, out); leaveAlliance(c); c.betrayals++; c.traitor = true; stats.betrayals++; }
          settlePromise(c, b, 'protezione', true, out); b.owes[c.id] = 'vita';
          text = INTR('patto', 'doppio');
        } else {
          damaged = contest.pass ? a : b; hurt(damaged, contest.pass ? 18 : 38, contest.pass ? b : a, 'wound');
          remember(a, c, 'fought'); remember(c, a, 'fought');
          text = INTR('patto', contest.pass ? 'sventato' : 'riuscito');
        }
      } else if (p.type === 'sabotaggio') {
        damaged = contest.pass ? a : b;
        const before = itemLedger.state(b);
        if (!contest.pass) { p.item.q = Math.max(1, (p.item.q || 1) - 1); if (p.item.u != null) p.item.u = Math.max(1, p.item.u - 1); }
        hurt(damaged, contest.pass ? 16 : 24, contest.pass ? b : a, 'wound');
        itemLedger.record('attack', a, b, p.item, before, contest.pass ? 'Sabotaggio riconosciuto prima dell’uso; oggetto integro' : 'Sabotaggio rivelato: qualità e durata ridotte, con minimo 1');
        text = INTR('sabotaggio', contest.pass ? 'sventato' : 'riuscito');
      } else {
        damaged = contest.pass ? a : b; hurt(damaged, contest.pass ? 20 : 34, contest.pass ? b : a, 'wound');
        text = INTR('imboscata', contest.pass ? 'sventato' : 'riuscito');
      }
      const attacker = damaged === a ? (outcome === 'doppio-gioco' ? c : b) : a;
      remember(damaged, attacker, 'tried'); addGrudge(damaged, attacker, 'attack');
      people.forEach(syncSt);
      const tx = useFmt(text, people, { i: p.item?.name || '' });
      const ev = { html: tx.html, plain: tx.plain, ids: people.map(t => t.id), deaths: [], lethal: false, origin: 'sys', cat: betray || outcome === 'doppio-gioco' ? 'betray' : 'hurt', why: 'complotto', whyTxt: 'Piano rivelato', reason: 'Il piano era stato preparato di nascosto ' + (p.day === day ? 'oggi' : 'il ' + unitName + ' ' + p.day) + ', ' + atZone(zoneName(p.zone)) + ', quando i protagonisti si trovavano lì. Fino a questo momento nessuno ne sapeva niente.', echo: out.slice(0, 3), place, intrigue: { type: p.type, outcome, prepared: { ph: p.ph, day: p.day, zone: p.zone } } };
      if (outcome !== 'doppio-gioco') ev.test = Object.assign({ who: b.id, attr: p.type === 'imboscata' ? 'agi' : 'int' }, contest);
      stats.intrigues = (stats.intrigues || 0) + 1;
      events.push(ev); people.forEach(t => remember1(t, ev.html, 'fatto'));
    }
    // chi ama in segreto qualcuno che si mette con un altro
    function jealousy(a, b) {
      alive().forEach((x) => {
        if (x === a || x === b) return;
        const lost = x.crush === a.id ? a : x.crush === b.id ? b : null; if (!lost) return;
        const rival = lost === a ? b : a;
        x.crush = null; x.mo -= 15 * DR.mo; addAff(x, rival, -30); remember(x, rival, 'jealous');
        if (hasTrait(x, 'vendicativo') || aff(x, rival) <= -45) addGrudge(x, rival, 'love');
        const e = fmt(ACT('jealous'), [x, lost, rival]); if (e) sys2(e, [x, lost, rival], 'love', 'Gelosia', 2);
        const d = fmt(DIA('jealousy'), [x, lost, rival]); if (d) remember1(x, d.html);
      });
    }
    // un evento di sistema già scritto
    function proseDepartures(text){return Geography.rule(text.replace(/\{(\d)\}/g,(_,i)=>'{'+String.fromCharCode(65+(+i))+'}'),geographyZones).depart||[];}
    function moveAfterProse(tx,people){for(const i of proseDepartures(Geography.adaptText(tx.src||'',theme))){const t=people[i];if(!t?.alive)continue;const exits=geographyZones[t.zone].links.filter(z=>!closed.has(z));if(exits.length)geo.move(t,rng.pick(exits),'Si allontana dal gruppo',{mode:'event'});}}
    function sys2(tx, people, cat, whyTxt, pri, ids) {
      const reason = sysContext(people, cat || 'none');
      SYS.push({ pri: pri || 1, ev: Object.assign({ html: tx.html, plain: tx.plain, ids: ids || people.map((p) => p.id), deaths: [], lethal: false, origin: 'sys', cat: cat || 'none', why: 'carattere', whyTxt: whyTxt || '', echo: [] }, reason ? { reason } : {},geo?{place:geo.locate(ids?people.filter(p=>ids.includes(p.id)):people)}:{},tx.contentId?{contentId:tx.contentId,contentCategory:tx.contentCategory}:{}) });
      if(geo)moveAfterProse(tx,people);
    }

    // l'obiettivo del momento nasce da stato, legami e carattere
    function decideGoal(t) {
      const opts = [];
      const gs = Object.keys(t.grudges).filter(aliveId).map((id) => byId[id]);
      if (gs.length) {
        const tg = gs.sort((a, b) => (t.grudges[b.id].why === 'kill') - (t.grudges[a.id].why === 'kill'))[0];
        opts.push(['vendetta', tg, 3 + (hasTrait(t, 'vendicativo') ? 3 : 0) - (hasTrait(t, 'clemente') ? 2 : 0) - (hasTrait(t, 'pacifista') ? 1.5 : 0) + (t.grudges[tg.id].why === 'kill' ? 1 : 0) + (t.attr.cor - 5) * 0.2]);
      }
      if (t.hp < 45) opts.push(['curarsi', null, 4 + (45 - t.hp) / 10]);
      if (t.food < 30) opts.push(['cibo', null, 3.5 + (30 - t.food) / 10 + (hasTrait(t, 'goloso') ? 1 : 0)]);
      if (aliveId(t.partner)) opts.push(['proteggere', byId[t.partner], 2.5 + (byId[t.partner].hp < 50 ? 2 : 0) + (hasTrait(t, 'leale') ? 1 : 0)]);
      const pr = t.promises.find((q) => q.k === 'protezione' && !q.done && aliveId(q.to)); if (pr) opts.push(['proteggere', byId[pr.to], 2.6 + (byId[pr.to].hp < 50 ? 1.5 : 0)]);
      if (t.vowed && aliveId(t.vowed.k)) opts.push(['vendetta', byId[t.vowed.k], 4.5]);
      if (aliveId(t.hunt) && !isAlly(t, byId[t.hunt])) opts.push(['caccia', byId[t.hunt], 2.8]);
      if (aliveId(t.crush) && !t.partner) opts.push(['cotta', byId[t.crush], 2.2 + (hasTrait(t, 'romantico') ? 1.5 : 0)]);
      if (aliveId(t.plot) && isAlly(t, byId[t.plot])) opts.push(['tradire', byId[t.plot], 3.2]);
      if (hasTrait(t, 'codardo') || t.mo < 25 || (t.hp < 50 && t.kills === 0)) opts.push(['nascondersi', null, 1.5 + (hasTrait(t, 'codardo') ? 2 : 0) + (t.mo < 25 ? 1 : 0)]);
      if (hasTrait(t, 'spietato') || hasTrait(t, 'bruto') || t.kills >= 3 || (hasTrait(t, 'cacciatore') && t.mo > 50)) opts.push(['caccia', null, 1.8 + (hasTrait(t, 'spietato') ? 1.5 : 0) + t.kills * 0.3]);
      if (hasTrait(t, 'esibizionista') || (hasTrait(t, 'carismatico') && t.fame >= 2)) opts.push(['spettacolo', null, 1.6 + (hasTrait(t, 'esibizionista') ? 1 : 0)]);
      if (t.allyId == null && !hasTrait(t, 'solitario') && (hasTrait(t, 'leader') || hasTrait(t, 'carismatico') || t.attr.car >= 7 || t.mo < 40)) opts.push(['reclutare', null, 1.5 + (hasTrait(t, 'leader') ? 1 : 0)]);
      opts.push(['sopravvivere', null, 1.2]);
      const noise = hasTrait(t, 'folle') ? 2.5 : hasTrait(t, 'impulsivo') ? 1.5 : 0.6;
      let best = opts[0], bs = -1e9;
      opts.forEach((o) => { const sc = o[2] + rng.f() * noise; if (sc > bs) { bs = sc; best = o; } });
      let tg = best[1];
      if (best[0] === 'caccia' && !tg) tg = alive().filter((x) => x !== t && canFight(t, x)).sort((a, b) => combat(a) - combat(b))[0] || null;
      const same = t.goal && t.goal.k === best[0] && t.goal.tg === (tg ? tg.id : null);
      t.goal = { k: best[0], tg: tg ? tg.id : null, ph: same ? t.goal.ph : phases.length };
      if (!same || !t.thought) {
        const gd = (MIND.goals || {})[best[0]] || { th: [] };
        const x = fmt(gd.th, tg ? [t, tg] : [t]) || fmt(gd.th.filter((l) => !/\{1\}|\[1:/.test(l)), [t]);
        t.thought = x ? x.html : '';
      }
    }
    // gli spostamenti di giorno seguono l'obiettivo e il gruppo
    function moveByGoals() {
      if (geo) return spatialGoals();
      const open = [...Array(zoneCount).keys()].filter((i) => !closed.has(i));
      if (!open.length) return;
      const best = (f) => open.slice().sort((a, b) => f(b) - f(a))[0];
      alive().forEach((t) => {
        const g = t.goal || { k: 'sopravvivere' };
        const tg = aliveId(g.tg) ? byId[g.tg] : null;
        let z = null;
        if ((g.k === 'vendetta' || g.k === 'caccia') && tg && rng.chance(0.3 + t.attr.furt * 0.04 + t.attr.int * 0.02 + (hasTrait(t, 'cacciatore') ? 0.15 : 0))) {
          z = tg.zone;
          if (g.k === 'vendetta' && rng.chance(0.5)) { const d = fmt(ACT('stalk'), [t, tg], { z: zoneName(z) }); if (d) remember1(t, d.html, 'mossa'); }
        } else if ((g.k === 'proteggere' || g.k === 'cotta' || g.k === 'tradire') && tg && rng.chance(0.6)) z = tg.zone;
        else if (g.k === 'cibo' && rng.chance(0.55)) z = best((i) => ZP[i][0] + rng.f() * 0.3);
        else if ((g.k === 'nascondersi' || g.k === 'curarsi') && rng.chance(0.55)) { z = best((i) => ZP[i][2] - ZP[i][1] + rng.f() * 0.2); if (rng.chance(0.4)) { const d = fmt(ACT('hide'), [t], { z: zoneName(z) }); if (d) remember1(t, d.html, 'mossa'); } }
        else if (t.allyId != null && rng.chance(0.6)) { const m = allyMates(t)[0]; if (m) z = m.zone; }
        else if (rng.chance(0.15)) z = rng.pick(open);
        // la paura fa cambiare strada
        const scary = alive().find((x) => x !== t && x.zone === (z != null ? z : t.zone) && !isAlly(t, x) && fearOf(t, x) >= 50 && !(t.goal && t.goal.tg === x.id));
        if (scary && rng.chance(0.6)) { const safe = open.filter((i) => i !== scary.zone); if (safe.length) z = best((i) => (safe.includes(i) ? 1 : -9) + ZP[i][2] - ZP[i][1] * 0.3 + rng.f() * 0.4); }
        if (z != null && !closed.has(z)) t.zone = z;
      });
    }

    function spatialGoals(night) {
      // Le destinazioni sono fotografate prima delle partenze: l'ordine del
      // cast non fa inseguire posizioni già modificate nello stesso giro.
      const positions = Object.fromEntries(alive().map(t=>[t.id,t.zone]));
      for (const t of alive()) {
        const g=t.goal||{k:'sopravvivere'}, target=aliveId(g.tg)?byId[g.tg]:null;
        const reachable=geographyZones.filter(z=>!closed.has(z.id)&&Geography.path(geographyZones,t.zone,z.id,closed));
        let destination=t.zone, reason='Esplora i passaggi vicini', tg=null;
        const allies=allyMates(t,true).concat(t.partner&&aliveId(t.partner)?[byId[t.partner]]:[]);
        if (night && allies.length && !hasTrait(t,'solitario')) {
          const party=[...new Map([t,...allies].map(x=>[x.id,x])).values()];
          const remembered=geographyZones.map(z=>({...z,danger:z.danger+party.reduce((sum,p)=>sum+worldMemory.risk(p.id,z.id),0)/party.length}));
          const meeting=Geography.camp(remembered,party.map(x=>positions[x.id]),closed);
          if(meeting!=null){destination=meeting;reason='Raggiunge il riparo scelto per ricongiungersi al gruppo';}
        } else if (target && ['vendetta','caccia','proteggere','cotta','tradire'].includes(g.k)) {
          destination=positions[target.id]; tg=target.id;
          if(['proteggere','cotta'].includes(g.k)&&target.goal?.tg===t.id&&['proteggere','cotta'].includes(target.goal.k))destination=positions[t.ix<target.ix?t.id:target.id];
          reason={vendetta:'Segue le tracce del bersaglio della vendetta',caccia:'Cerca il proprio bersaglio',proteggere:'Cerca la persona che vuole proteggere',cotta:'Cerca una persona a cui tiene',tradire:'Cerca un compagno dell’alleanza'}[g.k];
        } else if (['cibo','curarsi','nascondersi'].includes(g.k)) {
          const scores=reachable.map(z=>({z:z.id,score:(g.k==='cibo'?z.resources:z.shelter-z.danger*0.45)-worldMemory.risk(t.id,z.id)*0.35-(Geography.path(geographyZones,t.zone,z.id,closed).length-1)*0.12+rng.f()*0.15})).sort((a,b)=>b.score-a.score||a.z-b.z);
          destination=scores[0]?.z??t.zone; reason=g.k==='cibo'?'Cerca una zona con più provviste':'Cerca un luogo più riparato';
        } else if (allies.length && rng.chance(0.65)) {
          const leader=[t,...allies].sort((a,b)=>(hasTrait(b,'leader')?1:0)-(hasTrait(a,'leader')?1:0)||a.ix-b.ix)[0];
          destination=positions[leader.id]; tg=leader.id; reason='Cerca di ricongiungersi all’alleanza';
        } else if (rng.chance(night?0.2:0.55)) {
          const neighbors=geographyZones[t.zone].links.filter(z=>!closed.has(z));
          if (neighbors.length) destination=rng.wpick(neighbors,z=>1+geographyZones[z].shelter+geographyZones[z].resources/(1+alive().filter(x=>x.zone===z).length));
        }
        const scary=alive().find(x=>x!==t&&x.zone===destination&&!isAlly(t,x)&&fearOf(t,x)>=50&&tg!==x.id);
        if (scary) {
          const safe=reachable.filter(z=>z.id!==scary.zone).sort((a,b)=>(b.shelter-b.danger*0.4)-(a.shelter-a.danger*0.4)||a.id-b.id);
          if (safe.length) { destination=safe[0].id; reason='Evita una persona che teme'; tg=null; }
        }
        if(worldMemory.risk(t.id,t.zone)>0&&destination!==t.zone&&!tg)reason+='; tiene conto dei pericoli vissuti in questa zona';
        geo.move(t,destination,reason,{target:tg});
      }
    }
    function gather(kind) {
      const def=Geography.definitions[theme.id], preferred=def[kind];
      const open=geographyZones.filter(z=>!closed.has(z.id));
      const target=closed.has(preferred)?open.sort((a,b)=>b.resources-a.resources||a.id-b.id)[0].id:preferred;
      alive().forEach(t=>geo.move(t,target,kind==='finale'?'Converge verso lo scontro finale':'Raggiunge il punto dei rifornimenti',{forced:true,mode:'gather'}));
      return target;
    }
    function sealFinale(meeting) {
      while(geographyZones.filter(z=>!closed.has(z.id)).length>1){
        const next=geographyZones.find(z=>z.id!==meeting&&!closed.has(z.id)&&Geography.connected(geographyZones,new Set([...closed,z.id])));
        if(!next)break;geo.closure(next.id,'finale');
      }
    }
    function evacuate() {
      for (const t of alive()) {
        if (!closed.has(t.zone)) continue;
        const z=zoneName(t.zone), chance=0.3+t.attr.agi*0.05+t.en/260+(hasItem(t,'mappa')?0.2:0)+(hasItem(t,'attrezzo')?0.15:0);
        if (hasItem(t,'mappa')) itemLedger.record('bonus',t,t,itemOf(t,'mappa'),null,'+0,20 al calcolo della probabilità di fuga dalla tempesta');
        if (!rng.chance(chance)) { hurt(t,(14+rng.int(14))*wx('storm',1),null,'storm',true); t.stormZ=z; if(t.hp>0) sys('storm',[t],{z},{cat:'hurt',why:'tempesta'},2); }
        if(t.hp<=0){resolveVitals();if(!t.alive)continue;}
        const routes=geographyZones.filter(x=>!closed.has(x.id)).map(x=>Geography.path(geographyZones,t.zone,x.id,new Set())).filter(Boolean).sort((a,b)=>a.length-b.length||a[a.length-1]-b[b.length-1]);
        if(routes.length) geo.move(t,routes[0][routes[0].length-1],'Esce dalla zona chiusa dalla tempesta',{forced:true,mode:'evacuate'});
      }
      resolveVitals();
    }

    // complotti, cotte e confessioni nascono e muoiono di notte
    function hearts() {
      alive().forEach((t) => {
        if (t.plot && (!aliveId(t.plot) || !isAlly(t, byId[t.plot]))) t.plot = null;
        if (t.crush && (!aliveId(t.crush) || t.partner || aff(t, byId[t.crush]) < 0)) t.crush = null;
        // il complotto: chi tradisce per natura, o per disperazione
        // rancore verso un alleato: il complotto più naturale di tutti
        const sore = !t.plot && t.allyId != null ? allyMates(t).find((x) => t.grudges[x.id] || aff(t, x) <= -30) : null;
        const urge = hasTrait(t, 'traditore') ? 0.6 : sore ? 0.5 : hasTrait(t, 'avido') ? 0.35 : (t.attr.emp <= 4 && t.mo < 45) ? 0.2 : hasTrait(t, 'paranoico') ? 0.15 : t.mo < 25 && !hasTrait(t, 'pacifista') ? 0.12 : alive().length <= 6 && !hasTrait(t, 'pacifista') ? 0.12 : 0;
        if (!t.plot && t.allyId != null && day >= 2 && !hasTrait(t, 'leale') && rng.chance(urge)) {
          const m = sore || allyMates(t).filter((x) => t.partner !== x.id || like(t, x) < 0).sort((a, b) => (trustOf(b, t) + b.inv.length * 8 - like(t, b) * 0.5) - (trustOf(a, t) + a.inv.length * 8 - like(t, a) * 0.5))[0];
          if (m) { t.plot = m.id; const d = fmt(DIA('plot'), [t, m]); if (d) remember1(t, d.html, 'segreto'); }
        }
        // la cotta segreta
        if (!t.crush && !t.partner) {
          const c = alive().filter((x) => x !== t && !x.partner && x.id !== t.exPartner && like(t, x) >= 15 && !t.grudges[x.id] && attractOf(t, x) >= 30).sort((a, b) => attractOf(t, b) - attractOf(t, a))[0];
          if (c && rng.chance(clamp((attractOf(t, c) - 20) / 60 + (hasTrait(t, 'romantico') ? 0.25 : 0), 0.05, 0.8))) { t.crush = c.id; t.crushPh = phases.length; const d = fmt(DIA('crush'), [t, c]); if (d) remember1(t, d.html, 'segreto'); }
        }
      });
      // la confessione
      alive().forEach((t) => {
        if (!aliveId(t.crush) || t.partner || phases.length - (t.crushPh || 0) < 3) return;
        const u = byId[t.crush];
        if(geo&&t.zone!==u.zone)return;
        if (u.partner || !rng.chance(hasTrait(t, 'romantico') ? 0.45 : 0.2 + t.attr.cor * 0.02)) return;
        if (cfg.teamWin && u.team !== t.team) return;
        const yes = u.crush === t.id || rng.chance(clamp((attractOf(u, t) - 15) / 55 + (like(u, t) - 20) / 120 + (hasTrait(u, 'romantico') ? 0.15 : 0) + (t.attr.car - 5) * 0.03, 0.05, 0.85));
        t.crush = null;
        if (yes) {
          t.partner = u.id; u.partner = t.id; u.crush = null; addAff(t, u, 60); stats.couples++; t.mo += 25; u.mo += 25; t.fame += 1; u.fame += 1;
          remember(t, u, 'love'); remember(u, t, 'love');
          if (!cfg.teamWin && (t.allyId == null || u.allyId == null || t.allyId === u.allyId) && canTeam([t, u])) { const g = t.allyId != null ? alliances.get(t.allyId) : u.allyId != null ? alliances.get(u.allyId) : null; if (!g || g.size < 5) joinAlliance([t, u]); }
          tweak(t, u, { t: 20 }); tweak(u, t, { t: 25 });
          const e = fmt(ACT('confessYes'), [t, u]); if (e) sys2(e, [t, u], 'love', 'Dichiarazione', 4);
          jealousy(t, u);
        } else {
          t.mo -= 15 * DR.mo; t.rejected++; addAff(t, u, -5); remember(t, u, 'rejected');
          const e = fmt(ACT('confessNo'), [t, u]); if (e) sys2(e, [t, u], 'love', 'Dichiarazione', 3);
          const d = fmt(DIA('rejected'), [t, u]); if (d) remember1(t, d.html, 'segreto');
        }
      });
    }

    // i gesti di ogni notte: ognuno agisce secondo la propria natura
    function personalActs() {
      const done = new Set();
      rng.shuffle(alive()).forEach((t) => {
        if (!t.alive || done.has(t.id)) return;
        const tr = (x) => hasTrait(t, x);
        const mates = zoneMates(t).filter((x) => !done.has(x.id));
        const cand = [];
        const add = (w, f) => { if (w > 0) cand.push([w, f]); };
        const say = (k, people, vars, cat, why, pri) => { const e = fmt(ACT(k), people, vars); if (e) sys2(e, people, cat, why, pri); t.acts++; people.forEach((p) => done.add(p.id)); return true; };
        // reclutare
        if (t.allyId == null || (alliances.get(t.allyId) || new Set()).size < (tr('leader') ? 6 : 5)) {
          const u = mates.find((x) => x.allyId == null && hostility(t, x) === 0 && like(x, t) > -15 && !hasTrait(x, 'solitario') && !(cfg.teamWin && cfg.teamsAllied && x.team !== t.team) && canTeam([t, x]));
          if (u) add((t.goal && t.goal.k === 'reclutare' ? 2 : 0) + (tr('leader') ? 1.2 : 0) + (tr('carismatico') ? 1.2 : 0) + (t.attr.car >= 8 ? 0.5 : 0), () => {
            if (!rng.chance(0.35 + t.attr.car * 0.05 + aff(t, u) / 200)) return false;
            joinAlliance([t, u]); stats.alliances++; t.alliancesFormed++; u.alliancesFormed++; addAff(t, u, 22); remember(u, t, 'recruited'); remember(t, u, 'allied');
            return say('recruit', [t, u], {}, 'ally', traitName(tr('leader') ? 'leader' : 'carismatico') || 'Alleanza', 3);
          });
        }
        // mettere pace
        if (tr('pacifista') || tr('clemente') || t.attr.emp >= 8) {
          const pair = []; mates.forEach((a) => mates.forEach((b) => { if (a !== b && a.grudges[b.id] && a.grudges[b.id].why !== 'kill') pair.push([a, b]); }));
          if (pair.length) add(1.8 + (tr('pacifista') ? 1 : 0), () => {
            const [a, b] = pair[0]; if (!rng.chance(0.35 + t.attr.car * 0.04 + t.attr.emp * 0.03)) return false;
            delete a.grudges[b.id]; delete b.grudges[a.id]; addAff(a, b, 30); remember(a, t, 'mediated'); remember(b, t, 'mediated'); addAff(t, a, 10); addAff(t, b, 10);
            return say('mediate', [t, a, b], {}, 'heal', traitName(tr('pacifista') ? 'pacifista' : 'clemente') || 'Empatia', 3);
          });
        }
        // prepotenza
        if ((tr('bruto') || tr('avido') || tr('spietato')) && t.attr.for >= 6) {
          const u = mates.find((x) => canFight(t, x) && combat(x) < combat(t) - 3 && x.inv.some((it) => /cibo|valore|med|amuleto|armatura/.test(it.type)));
          if (u) add(1.3 + (tr('bruto') ? 0.6 : 0), () => {
            const it = u.inv.find((x) => /cibo|valore|med|amuleto|armatura/.test(x.type)); takeItem(u, it);
            addItem(t, Object.assign({}, it, { how: 'rubato', from: u.id, d: day })); addGrudge(u, t, 'steal'); remember(u, t, 'bullied'); u.mo -= 10;
            return say('bully', [t, u], { i: it.name, z: zoneName(t.zone) }, 'betray', traitName(tr('bruto') ? 'bruto' : tr('avido') ? 'avido' : 'spietato'), 3);
          });
        }
        // rissa
        if (tr('impulsivo') || tr('bruto') || t.mo < 25) {
          const u = mates.find((x) => canFight(t, x) && (aff(t, x) <= -40 || t.grudges[x.id] || x.grudges[t.id]));
          if (u) add(1.4 + (tr('impulsivo') ? 1 : 0), () => {
            hurt(u, 12 + rng.int(10), t, 'wound', false); hurt(t, 10 + rng.int(10), u, 'wound', false); addAff(t, u, -15); remember(u, t, 'brawl'); remember(t, u, 'brawl');
            return say('brawl', [t, u], { z: zoneName(t.zone) }, 'hurt', traitName(tr('impulsivo') ? 'impulsivo' : 'bruto') || 'Rissa', 3);
          });
        }
        // curare uno sconosciuto
        if (tr('guaritore') || (t.attr.emp >= 8 && t.attr.int >= 5)) {
          const u = mates.find((x) => x.hp < 50 && !isAlly(t, x) && x.partner !== t.id && hostility(t, x) < 2);
          if (u) add(1.6, () => {
            u.hp += (18 + t.attr.int) * MOD.heal; u.owes[t.id] = 'cura'; addAff(t, u, 25); remember(u, t, 'healedStranger'); t.saves++; t.nursed++; syncSt(u);
            return say('healStranger', [t, u], {}, 'heal', traitName(tr('guaritore') ? 'guaritore' : '') || 'Empatia', 3);
          });
        }
        // regalare
        if (tr('generoso') || t.attr.emp >= 8) {
          const u = mates.concat(allyMates(t)).find((x) => (x.mo < 35 || x.food < 30) && hostility(t, x) < 2);
          const it = t.inv.find((x) => (u && u.food < 30 ? x.type === 'cibo' : /cibo|valore|alcol|amuleto/.test(x.type)));
          if (u && it) add(1.3 + (tr('generoso') ? 1 : 0), () => {
            takeItem(t, it); addItem(u, Object.assign({}, it, { how: 'dono', from: t.id, d: day })); if (it.type === 'cibo' && u.food < 45) eat(u);
            u.owes[t.id] = u.owes[t.id] || 'dono'; addAff(t, u, 20); u.mo += 8; remember(u, t, 'gift'); syncSt(u);
            return say('gift', [t, u], { i: it.name }, 'heal', traitName(tr('generoso') ? 'generoso' : '') || 'Empatia', 2);
          });
        }
        // spettacolo
        if (tr('esibizionista') || (t.goal && t.goal.k === 'spettacolo')) add(1.2 + (tr('esibizionista') ? 0.8 : 0), () => { t.fame += Math.round(2 * MOD.fame); t.mo += 5; return say('show', [t], {}, 'none', traitName('esibizionista'), 1); });
        // discorso al gruppo
        if (tr('leader') && allyMates(t).length >= 2) add(1.1, () => { allyMates(t).forEach((x) => { x.mo += 8; addAff(t, x, 5); }); t.mo += 4; return say('speech', [t], {}, 'ally', traitName('leader'), 1); });
        // rito portafortuna
        if (tr('superstizioso')) add(0.9, () => { t.mo += 8; if (M && !M.infect) t.pr -= 10; const am = itemOf(t, 'amuleto'); return say('ritual', [t], { i: am ? am.name : '' }, 'none', traitName('superstizioso'), 0); });
        // sonnambulismo
        if (tr('sonnambulo')) add(1.1, () => { const choices=geo?geographyZones[t.zone].links:[...Array(zoneCount).keys()]; const z = rng.pick(choices.filter((i) => i !== t.zone && !closed.has(i))); if (z == null) return false; if(geo){if(!geo.move(t,z,'Si allontana durante il sonno',{mode:'sleepwalk'})) return false;if(!t.alive)return true;}else t.zone = z; t.en -= 6; return say('sleepwalk', [t], { z: zoneName(z) }, 'none', traitName('sonnambulo'), 1); });
        // follia
        if (tr('folle')) add(0.9, () => { t.mo += 6; return say('madness', [t], {}, 'none', traitName('folle'), 0); });
        // sfortuna
        if (tr('sfortunato')) add(0.8, () => { const it = rng.pick(t.inv.filter((x) => x.type !== 'ricordo')); if (it) takeItem(t, it); else hurt(t, 6, null, 'wound', false); return say('mishap', [t], { i: it ? it.name : '' }, 'hurt', traitName('sfortunato'), 1); });
        // fortuna
        if (tr('fortunato') || t.attr.fort >= 8) add(0.7 + (tr('fortunato') ? 0.5 : 0), () => { const it = mkItem(rng.pick(['valore', 'attrezzo', 'armatura', 'med', 'amuleto', 'alcol']), null, 'trovato'); addItem(t, it); t.items++; stats.items++; return say('luckyFind', [t], { i: it.name }, 'item', traitName(tr('fortunato') ? 'fortunato' : '') || 'Fortuna', 1); });
        // golosità
        if (tr('goloso') && hasItem(t, 'cibo') && t.food >= 55) add(1, () => { const it = itemOf(t, 'cibo'); itemLedger.use('consume', t, t, it, () => { takeItem(t, it); t.food += 20; t.mo += 4; }, 'Pasto per golosità'); return say('glutton', [t], { i: it.name }, 'none', traitName('goloso'), 0); });
        // bere
        if (hasItem(t, 'alcol') && (tr('ubriacone') || t.mo < 25)) add(1.3 + (tr('ubriacone') ? 1 : 0), () => { const it = itemOf(t, 'alcol'), before = itemLedger.state(t); takeItem(t, it); t.st.ubriaco = phases.length; t.mo += 12; t.en -= 8; if (M && !M.infect && (M.id === 'freddo' || M.id === 'terrore' || M.id === 'ansia' || M.id === 'stress')) t.pr -= 15; syncSt(t); itemLedger.record('consume', t, t, it, before, 'Bevanda consumata'); return say('drink', [t], { i: it.name }, 'none', traitName(tr('ubriacone') ? 'ubriacone' : '') || 'Morale', 1); });
        // disinfettare una ferita infetta
        if (hasItem(t, 'alcol') && (tr('guaritore') || t.attr.int >= 6)) {
          const u = buddies(t).find((x) => x.st.malato != null);
          if (u) add(2, () => { const it = itemOf(t, 'alcol'); itemLedger.use('heal', t, u, it, () => { takeItem(t, it); delete u.st.malato; }, 'Disinfezione'); u.owes[t.id] = 'cura'; addAff(t, u, 15); remember(u, t, 'cured'); return say('disinfect', [t, u], { i: it.name }, 'heal', 'Cure', 2); });
        }
        // il solitario se ne va
        if (tr('solitario') && t.allyId != null && (alliances.get(t.allyId) || new Set()).size >= 3) add(0.8, () => { const m = allyMates(t); leaveAlliance(t); m.forEach((x) => addAff(x, t, -8)); return say('loner', [t], {}, 'none', traitName('solitario'), 2); });
        // pianificare
        if (tr('stratega') || t.attr.int >= 8) add(0.8, () => { t.planPh = phases.length; return say('plan', [t], {}, 'none', traitName(tr('stratega') ? 'stratega' : '') || 'Intelligenza', 0); });
        // costruire
        if (tr('ingegnoso') || t.attr.int >= 7) {
          const w = itemOf(t, 'arma'), tp = itemOf(t, 'trap'), ex = itemOf(t, 'esplosivo'), vn = itemOf(t, 'veleno'), at = itemOf(t, 'attrezzo');
          const why = traitName(tr('ingegnoso') ? 'ingegnoso' : '') || 'Ingegno';
          if (tp && ex && !tp.x) add(2, () => { itemLedger.use('craft', t, t, ex, () => { takeItem(t, ex); tp.x = 'bomba'; }, 'Esplosivo incorporato nella trappola'); t.crafts++; return say('craftBomb', [t], {}, 'item', why, 2); });
          if (w && vn && !w.x && !theme.soft) add(2, () => { itemLedger.use('craft', t, t, vn, () => { takeItem(t, vn); w.x = 'veleno'; }, 'Veleno applicato all’arma'); t.crafts++; return say('craftPoison', [t], { ip: possessive(w) }, 'item', why, 2); });
          if (w && at && w.u != null && w.u <= Math.ceil((w.um || 4) / 2)) add(1.8, () => { const old = w.u; w.u = Math.min(w.um || 6, w.u + 3); itemLedger.record('craft', t, t, at, null, 'Arma riparata: usi ' + old + ' → ' + w.u); t.crafts++; return say('craftRepair', [t], { ip: possessive(w) }, 'item', why, 1); });
          if (!tp && at && t.attr.int >= 7) add(0.7, () => { addItem(t, mkItem('trap', null, 'costruito')); itemLedger.record('craft', t, t, at, null, 'Attrezzo usato per costruire una trappola'); t.crafts++; return say('craftTrap', [t], { i: at.name }, 'item', why, 1); });
        }
        // spiare e smascherare i complotti
        if (tr('furtivo') || tr('paranoico') || t.attr.int >= 8) {
          const plotter = allyMates(t).find((x) => x.plot && aliveId(x.plot) && isAlly(x, byId[x.plot]) && (!geo||byId[x.plot].zone===t.zone));
          if (plotter) add(2.6, () => {
            const victim = byId[plotter.plot];
            if (!rng.chance((0.3 + t.attr.furt * 0.03 + t.attr.int * 0.02) * clamp((trustOf(victim, t) + 70) / 100, 0.3, 1.3))) return false;
            const grp = allyMates(plotter);
            leaveAlliance(plotter); grp.forEach((x) => { addAff(x, plotter, -35); }); plotter.plot = null; plotter.traitor = true;
            addAff(victim, t, 25); remember(victim, t, 'warned'); remember(plotter, t, 'exposed'); addGrudge(plotter, t, 'betray');
            return say(victim === t ? 'spyExposeSelf' : 'spyExpose', victim === t ? [t, plotter] : [t, plotter, victim], {}, 'betray', traitName(tr('furtivo') ? 'furtivo' : tr('paranoico') ? 'paranoico' : '') || 'Intuito', 4);
          });
        }
        // furto notturno
        if (tr('furtivo') || (tr('avido') && t.attr.furt >= 6)) {
          const u = mates.find((x) => !isAlly(t, x) && x.partner !== t.id && x.inv.some((it) => it.type !== 'ricordo'));
          if (u) add(1.2, () => {
            const it = rng.pick(u.inv.filter((x) => x.type !== 'ricordo')); takeItem(u, it); addItem(t, Object.assign({}, it, { how: 'rubato', from: u.id, d: day }));
            if (hasTrait(u, 'paranoico') || rng.chance(Math.max(0.1, 0.4 - (t.attr.furt - 5) * 0.05))) { addGrudge(u, t, 'steal'); remember(u, t, 'nightTheft'); }
            u.mo -= 6;
            return say('nightTheft', [t, u], { i: it.name }, 'betray', traitName(tr('furtivo') ? 'furtivo' : 'avido'), 2);
          });
        }
        // lettere e regali d'amore
        if (tr('romantico') && (aliveId(t.partner) || aliveId(t.crush))) {
          const u = byId[t.partner || t.crush];
          add(1, () => { addItem(u, { type: 'ricordo', name: 'una lettera di ' + t.name, how: 'lettera', from: t.id, d: day }); addAff(t, u, 12); u.mo += 10; remember(u, t, 'letter'); return say('letter', [t, u], {}, 'love', traitName('romantico'), 1); });
        }
        // giuramento di protezione
        if (tr('leale')) {
          const u = buddies(t).find((x) => x.hp < 60);
          if (u) add(1.2, () => { t.guard = u.id; addAff(t, u, 10); remember(u, t, 'oath'); return say('oath', [t, u], {}, 'ally', traitName('leale'), 1); });
        }
        // caccia per il gruppo
        if (tr('cacciatore')) add(1, () => {
          if (!rng.chance(0.45 + t.attr.sop * 0.04)) return false;
          const hungry = [t].concat(allyMates(t)).filter((x) => x.food < 55);
          hungry.forEach((x) => { x.food += 30; syncSt(x); if (x !== t) { addAff(t, x, 6); remember(x, t, 'shared'); } });
          t.foraged++; stats.foraged++;
          return say('hunt', [t], {}, 'item', traitName('cacciatore'), 1);
        });
        // sonno leggero
        if (tr('paranoico')) add(0.6, () => { t.vigilPh = phases.length; t.en -= 5; return say('paranoid', [t], {}, 'none', traitName('paranoico'), 0); });
        // perdono silenzioso
        if (tr('clemente')) {
          const id = Object.keys(t.grudges).find((x) => aliveId(x) && t.grudges[x].why !== 'kill');
          if (id) add(1, () => { delete t.grudges[id]; addAff(t, byId[id], 20); remember(t, byId[id], 'forgave'); const d = fmt(ACT('forgiveQuiet'), [t, byId[id]]); if (d) remember1(t, d.html, 'segreto'); t.acts++; return true; });
        }
        if (!cand.length) return;
        const pAct = 0.45 + Math.min(0.3, cand.length * 0.07) + (t.traits.length ? 0.1 : 0);
        if (!rng.chance(pAct)) return;
        const pick = rng.wpick(cand, (c) => c[0]);
        if (pick) pick[1]();
      });
    }

    // le conversazioni della notte, secondo il rapporto tra i due
    function chats() {
      const pairs = [];
      alive().forEach((a) => zoneMates(a).forEach((b) => { if (a.ix < b.ix) pairs.push([a, b]); }));
      rng.shuffle(pairs).slice(0, 2 + (rng.chance(0.4) ? 1 : 0)).forEach(([a, b]) => {
        if (!rng.chance(0.6)) return;
        const h = hostility(a, b), friends = like(a, b) >= 40 && like(b, a) >= 40;
        const kind = a.partner === b.id && h < 2 ? 'coppia' : h >= 2 || Math.min(like(a, b), like(b, a)) <= -30 ? 'rivali' : isAlly(a, b) || friends ? 'alleati' : 'sconosciuti';
        // le battute d'ambiente parlano al plurale («andiamo», «ci resta»): non vanno bene tra rivali
        const ar = kind !== 'rivali' && CH.arena && CH.arena[theme.id] ? CH.arena[theme.id].filter((x) => !USED.has(x[0])) : [];
        const local=D.world?.dialogues(world,a.zone,kind,a,b,phases).filter(x=>!USED.has(x.lines[0]))||[];
        const chooseLocal=local.length&&rng.chance(0.7);
        const list = chooseLocal?local.map(x=>x.lines):(!world&&rng.chance(0.4) && ar.length ? ar : (CH[kind] || []).filter((x) => !USED.has(x[0]))) || [];
        if (!list.length) return;
        const pair = rng.pick(list); USED.add(pair[0]);
        const source=chooseLocal?local.find(row=>row.lines===pair):null;
        const [l1, l2] = pair;
        const x1 = fmt([l1], [a, b]), x2 = fmt([l2], [a, b]); if (!x1 || !x2) return;
        addAff(a, b, kind === 'rivali' ? -4 : 3);
        sys2({ plain: a.name + ': «' + x1.plain + '» ' + b.name + ': «' + x2.plain + '»', html: nameTag(a) + ': «' + x1.html + '»<br>' + nameTag(b) + ': «' + x2.html + '»',...(source?{contentId:source.id,contentCategory:'dialogues'}:{}) }, [a, b], kind === 'coppia' ? 'love' : kind === 'alleati' ? 'ally' : kind === 'rivali' ? 'hurt' : 'none', 'Dialogo', world?2:1);
      });
    }
    // gli scambi della notte: chi ha fame compra da chi ne ha
    function barter() {
      alive().forEach((b) => {
        const want = b.food < 40 && !hasItem(b, 'cibo') ? 'cibo' : b.hp < 50 && !hasItem(b, 'med') ? 'med' : null;
        if (!want) return;
        const pay = b.inv.filter((x) => x.type === 'valore' || x.type === 'alcol' || (x.type === 'arma' && b.attr.for <= 4) || x.type === 'esplosivo' || x.type === 'veleno');
        const sellers = zoneMates(b).concat(allyMates(b)).filter((x) => x !== b && hostility(b, x) < 2 && (want === 'cibo' ? x.inv.filter((it) => it.type === 'cibo').length >= (x.food >= 55 ? 1 : 2) : hasItem(x, 'med') && x.hp >= 70));
        const s2 = sellers[0]; if (!s2) return;
        const food = itemOf(s2, want);
        if (hasTrait(s2, 'generoso') || (aff(s2, b) >= 50 && rng.chance(0.5))) {
          takeItem(s2, food); addItem(b, Object.assign({}, food, { how: 'dono', from: s2.id, d: day })); if (want === 'cibo') eat(b); b.owes[s2.id] = 'dono'; addAff(s2, b, 15); remember(b, s2, 'gift'); stats.trades++;
          const e = fmt(ACT('tradeFree'), [b, s2], { j: food.name }); if (e) sys2(e, [b, s2], 'heal', 'Scambio', 2);
          return;
        }
        if (!pay.length) return;
        const greedy = hasTrait(s2, 'avido');
        // ogni oggetto vale 1, la merce di più secondo la variante; l'avido vuole almeno 3
        const worth = (it) => 1 + (it.type === 'valore' ? itemProps(it).scambio || 0 : 0), need = greedy ? 3 : 1;
        const sorted = pay.slice().sort((a, b) => worth(b) - worth(a)), give = [];
        for (const it of sorted) { if (give.reduce((s3, x) => s3 + worth(x), 0) >= need) break; give.push(it); }
        if (give.reduce((s3, x) => s3 + worth(x), 0) < need || give.length > 2) return;
        give.forEach((it) => { takeItem(b, it); addItem(s2, Object.assign({}, it, { how: 'scambio', from: b.id, d: day })); });
        takeItem(s2, food); addItem(b, Object.assign({}, food, { how: 'scambio', from: s2.id, d: day })); if (want === 'cibo') eat(b);
        b.trades++; s2.trades++; stats.trades++;
        if (greedy) { addAff(b, s2, -10); remember(b, s2, 'fleeced'); } else { addAff(b, s2, 8); remember(b, s2, 'traded'); remember(s2, b, 'traded'); }
        const e = fmt(ACT(greedy ? 'tradeGreedy' : 'trade'), [b, s2], { i: give[0].name, j: food.name, k: give[1] ? give[1].name : '' }); if (e) sys2(e, [b, s2], 'item', 'Scambio', 2);
      });
    }

    // il diario: un pensiero per notte, ciò che la diretta non mostra
    function diaryNight(prob) {
      alive().forEach((t) => {
        if (!rng.chance(prob || 0.8)) return;
        const c = [];
        const add = (w, k, people, vars) => { if (w > 0) c.push([w, k, people, vars]); };
        if (t.lost && byId[t.lost] && !byId[t.lost].alive && t.st.lutto != null) add(4, 'grief', [t, byId[t.lost]]);
        const gid = Object.keys(t.grudges).find(aliveId); if (gid) add(2.5 + (hasTrait(t, 'vendicativo') ? 2 : 0), 'revenge', [t, byId[gid]]);
        if (aliveId(t.crush)) add(3, 'crush', [t, byId[t.crush]]);
        if (aliveId(t.plot)) add(3, 'plot', [t, byId[t.plot]]);
        const lastKill = t.killIds.length ? byId[t.killIds[t.killIds.length - 1]] : null;
        if (lastKill && lastKill.deathPhase >= phases.length - 3) add(t.attr.emp >= 6 || hasTrait(t, 'pacifista') ? 3 : 0.5, 'guilt', [t, lastKill]);
        if (t.kills >= 2 && (hasTrait(t, 'spietato') || t.attr.emp <= 3)) add(2, 'pride', [t], { n: String(t.kills) });
        if (t.food < 30) add(2.5, 'hungry', [t]);
        if (t.mo < 30 || meterBad(t)) add(2.2, 'fear', [t]);
        if (t.hp < 45) add(2, 'hurt', [t]);
        const ow = Object.keys(t.owes).find(aliveId); if (ow) add(t.owes[ow] === 'vita' ? 2.2 : 1.2, t.owes[ow] === 'vita' ? 'grateful' : 'debt', [t, byId[ow]]);
        if (aliveId(t.partner)) add(2.5, 'couple', [t, byId[t.partner]]);
        const rc = itemOf(t, 'ricordo');
        if (rc) { const from = rc.from && byId[rc.from] && !byId[rc.from].alive && (rc.how === 'lettera' || rc.how === 'dono' || aff(t, byId[rc.from]) >= 30) ? byId[rc.from] : null; add(from ? 3 : 1.4, from ? 'keepsakeDead' : 'keepsake', from ? [t, from] : [t], { i: rc.name }); }
        if (!buddies(t).length && day >= 2) add(1.2, 'lonely', [t]);
        if (t.fame >= 4) add(1, 'star', [t]);
        if (hasTrait(t, 'paranoico') && t.allyId != null) { const m = allyMates(t)[0]; if (m) add(1.5, 'suspicion', [t, m]); }
        t.traits.forEach((x) => { if (DIAT(x).length) add(1, 'trait:' + x, [t]); });
        add(0.8, 'calm', [t]);
        const p = rng.wpick(c, (x) => x[0]); if (!p) return;
        const src0 = p[1].startsWith('trait:') ? DIAT(p[1].slice(6)) : DIA(p[1]);
        // nel diario non si scrive due volte la stessa pagina
        const used = t.diaryUsed || (t.diaryUsed = new Set());
        const src = src0.filter((x) => !used.has(x)); if (!src.length) return;
        const d = fmt(src, p[2], Object.assign({}, p[3] || {})); if (d) used.add(d.src); if (d) remember1(t, d.html, /plot|crush|rejected/.test(p[1]) ? 'segreto' : 'pensiero');
      });
    }

    // i rapporti più importanti, con un'etichetta umana
    // i rapporti più importanti: etichetta, dimensioni, e cosa prova l'altro in cambio
    function relTop(t) {
      const out = [];
      alive().forEach((x) => {
        if (x === t) return;
        const lbl = labelOf(t, x); if (!lbl) return;
        const b = peek(t, x), back = labelOf(x, t);
        const w = (LBL_W[lbl] || 0) + Math.abs(like(t, x)) * 0.5 + b.k * 0.2 + b.p * 0.3;
        out.push([x.id, Math.round(like(t, x)), lbl, { f: Math.round(b.f), r: Math.round(b.r), p: Math.round(b.p), t: Math.round(b.t), k: Math.round(b.k) }, back || '', w]);
      });
      return out.sort((a, b) => b[5] - a[5]).slice(0, 9).map((x) => x.slice(0, 5));
    }
    // la mappa dei legami: per ogni coppia, il legame più forte (e in che direzione va)
    const EDGE_CLS = { amore: 'love', ex: 'love', cotta: 'love', complotto: 'plot', nemesi: 'hate', vendetta: 'hate', rivaleAmore: 'hate', odio: 'hate', terrore: 'fear', paura: 'fear', gratitudine: 'friend', fratelli: 'friend', mentore: 'friend', protetto: 'friend', amico: 'friend', colpa: 'plot', complice: 'ally', alleatoComodo: 'ally', alleato: 'ally', debito: 'ally', rivale: 'rival', ammirazione: 'rival', diffidenza: 'rival', antipatia: 'rival' };
    function edges() {
      const A = alive(), out = [];
      for (let i = 0; i < A.length; i++) for (let j = i + 1; j < A.length; j++) {
        const a = A[i], b = A[j], la = labelOf(a, b), lb = labelOf(b, a);
        const sa = la && STRONG.has(la) ? LBL_W[la] : 0, sb = lb && STRONG.has(lb) ? LBL_W[lb] : 0;
        if (!sa && !sb && !(isAlly(a, b))) continue;
        const main = sa >= sb ? la || lb : lb || la;
        const cls = EDGE_CLS[main] || 'ally';
        const mutual = la && lb && EDGE_CLS[la] === EDGE_CLS[lb];
        const w = Math.max(Math.abs(like(a, b)), Math.abs(like(b, a)), fearOf(a, b), fearOf(b, a), attractOf(a, b), attractOf(b, a));
        out.push([a.ix, b.ix, cls, Math.round(w), mutual ? 0 : sa >= sb ? 1 : 2, la || '', lb || '']);
      }
      return out;
    }

    /* ---------------- le relazioni ---------------- */
    const BA = (k) => (theme.soft && BD.actsSoft && BD.actsSoft[k]) || (BD.acts || {})[k] || [];
    const BDI = (k) => (BD.diary || {})[k] || [];
    const hasMem = (a, b, k) => (a.memoryHistory[b.id] || []).some((m) => m.k === k);
    // l'etichetta umana di quello che A prova per B
    function labelOf(a, b) {
      const x = peek(a, b), L = like(a, b);
      if (a.partner === b.id) return 'amore';
      if (a.exPartner === b.id) return 'ex';
      if (a.crush === b.id) return 'cotta';
      if (a.plot === b.id) return 'complotto';
      if (a.grudges[b.id]) return x.r >= 30 ? 'nemesi' : 'vendetta';
      if (a.crush && b.crush === a.crush) return 'rivaleAmore';
      if (x.p >= 70) return 'terrore';
      if (a.owes[b.id] === 'vita') return 'gratitudine';
      if ((x.n.fw || 0) >= 1 && x.f >= 35 && L >= 30) return 'fratelli';
      if (hasMem(a, b, 'mentor')) return 'mentore';
      if (a.promises.some((q) => q.to === b.id && q.k === 'protezione' && !q.done)) return 'protetto';
      if (L >= 45 && x.f >= 20) return 'amico';
      if (x.p >= 45) return 'paura';
      if (hasMem(a, b, 'guilt')) return 'colpa';
      if (isAlly(a, b)) return x.f >= 30 ? 'complice' : x.f < -5 ? 'alleatoComodo' : 'alleato';
      if (a.owes[b.id]) return 'debito';
      if (x.r >= 35 && L <= 10) return 'rivale';
      if (x.r >= 40) return 'ammirazione';
      if (L <= -65) return 'odio';
      if (x.f <= -35) return 'diffidenza';
      if (L <= -30) return 'antipatia';
      if (L >= 25 || x.f >= 30) return 'simpatia';
      if (x.k >= 20 || a.mem[b.id]) return 'conoscente';
      return null;
    }
    const LBL_W = { amore: 300, cotta: 290, complotto: 285, nemesi: 280, vendetta: 270, ex: 260, rivaleAmore: 250, terrore: 245, gratitudine: 240, fratelli: 235, mentore: 225, protetto: 220, amico: 210, paura: 200, colpa: 195, complice: 150, alleatoComodo: 140, rivale: 135, ammirazione: 130, odio: 125, alleato: 110, debito: 105, diffidenza: 100, antipatia: 90, simpatia: 60, conoscente: 20 };
    const STRONG = new Set(['amore', 'cotta', 'complotto', 'nemesi', 'vendetta', 'ex', 'rivaleAmore', 'terrore', 'gratitudine', 'fratelli', 'mentore', 'protetto', 'amico', 'paura', 'colpa', 'complice', 'rivale', 'ammirazione', 'odio', 'diffidenza', 'antipatia', 'alleatoComodo']);

    // le promesse: fatte di notte, mantenute o tradite nei momenti decisivi
    function makePromise(a, b, k) {
      if (!a.alive || !b.alive || a.promises.some((q) => q.to === b.id && q.k === k && !q.done)) return false;
      a.promises.push({ to: b.id, k, ph: phases.length, d: day });
      remember(b, a, 'promise'); stats.promises = (stats.promises || 0) + 1;
      return true;
    }
    function settlePromise(a, b, k, kept, out) {
      const q = a.promises.find((x) => x.to === b.id && x.k === k && !x.done); if (!q) return;
      q.done = kept ? 'mantenuta' : 'tradita'; q.endPh = phases.length;
      if (kept) { a.promisesKept = (a.promisesKept || 0) + 1; stats.promisesKept = (stats.promisesKept || 0) + 1; if (b.alive) remember(b, a, 'promiseKept'); }
      else { a.promisesBroken = (a.promisesBroken || 0) + 1; stats.promisesBroken = (stats.promisesBroken || 0) + 1; if (b.alive) remember(b, a, 'promiseBroken'); a.mo -= 10; }
      const src = ((BD.promises || {})[kept ? 'kept' : 'broken'] || {})[k];
      const days = Math.max(1, day - q.d);
      const e = fmt(src, [a, b], { n: days === 1 ? 'un giorno' : days + ' giorni' });
      if (e) { if (out && out.length < 3) out.push(Object.assign(e, { cls: kept ? 'good' : 'warn' })); else remember1(a, e.html, 'segreto'); }
    }
    function dissolvePromise(q) {
      if (!q.done) { q.done = 'sciolta'; q.endPh = phases.length; }
    }

    // testimoni: chi vede un'uccisione o un salvataggio cambia idea su chi l'ha fatto
    function witness(actor, kind, victim, roles) {
      if (!actor || !actor.alive) return;
      if (geo && victim && victim.zone !== actor.zone) return;
      const seen = alive().filter((w) => w.zone === actor.zone && !roles.includes(w));
      rng.shuffle(seen).slice(0, 4).forEach((w, i) => {
        remember(w, actor, kind === 'kill' ? 'sawKill' : 'sawSave', victim, kind === 'kill' ? 1 + Math.min(1, actor.kills * 0.15) : 1);
        if (kind === 'kill' && (hasTrait(w, 'pacifista') || w.attr.emp >= 7)) tweak(w, actor, { l: -10 });
        if (kind === 'kill' && (hasTrait(w, 'spietato') || hasTrait(w, 'bruto'))) tweak(w, actor, { r: 10 });
        if (i < 1 && rng.chance(0.5)) { const d = fmt(BDI(kind === 'kill' ? 'sawKill' : 'sawSave'), [w, actor, victim]); if (d) remember1(w, d.html, 'pensiero'); }
      });
    }

    // la pietà: chi ama, rispetta o conosce bene la vittima a volte non colpisce
    function mercyChance(K, v) {
      const b = peek(K, v);
      return clamp((hasTrait(K, 'clemente') || hasTrait(K, 'pacifista') ? 0.12 : 0) + Math.max(0, like(K, v) - 30) / 150 + Math.max(0, b.r - 40) / 220 + Math.max(0, b.k - 50) / 320 + (K.attr.emp - 5) * 0.015 +
        (K.promises.some((q) => q.to === v.id && !q.done) ? 0.15 : 0) - (hasTrait(K, 'spietato') ? 0.3 : 0) - (K.grudges[v.id] ? 0.5 : 0) - (K.plot === v.id ? 0.5 : 0) - (alive().length <= 4 ? 0.1 : 0), 0, 0.55);
    }

    // le voci di corridoio: le opinioni viaggiano, e qualcuno mente
    function gossip() {
      let shown = 0;
      rng.shuffle(alive()).forEach((S) => {
        if (!rng.chance(0.3 + S.attr.car * 0.02 + (hasTrait(S, 'esibizionista') ? 0.1 : 0) + (hasTrait(S, 'solitario') ? -0.2 : 0))) return;
        const pool = []; buddies(S).concat(zoneMates(S)).forEach((x) => { if (!pool.includes(x) && trustOf(x, S) > -25) pool.push(x); });
        if (!pool.length) return;
        const H = rng.pick(pool);
        const liar = !!S.plot || hasTrait(S, 'traditore') || (hasTrait(S, 'avido') && rng.chance(0.3));
        const opts = alive().filter((x) => x !== S && x !== H).map((T) => {
          const L2 = like(S, T); let sc = Math.abs(L2) + (S.grudges[T.id] ? 50 : 0) + fearOf(S, T) * 0.6 + (T.traitor ? 30 : 0) + (S.plot === T.id && liar ? 60 : 0);
          return [T, sc];
        }).filter((x) => x[1] >= 40).sort((a, b) => b[1] - a[1]);
        if (!opts.length) return;
        const T = opts[0][0];
        const w = clamp((trustOf(H, S) + 50) / 100, 0.2, 1.3);
        let k = null;
        if (liar && (S.plot === T.id || like(S, T) < 0) && rng.chance(0.6)) {
          const believe = clamp(0.45 + trustOf(H, S) / 150 - (H.attr.int - 5) * 0.04 - (hasTrait(H, 'paranoico') ? 0.2 : 0) + (S.attr.car - 5) * 0.03, 0.1, 0.9);
          if (rng.chance(believe)) { remember(H, T, 'rumorBad', null, w * 1.3); k = 'gossipLie'; }
          else { remember(H, S, 'liedTo'); k = 'gossipCaught'; }
        } else if (fearOf(S, T) >= 45) { remember(H, T, 'rumorFear', null, w); k = 'gossipFear'; }
        else if (like(S, T) <= -35 || S.grudges[T.id] || T.traitor) { remember(H, T, 'rumorBad', null, w); tweak(H, T, { l: like(S, T) * 0.15 * w }); k = 'gossipBad'; }
        else if (like(S, T) >= 35) { remember(H, T, 'rumorGood', null, w); tweak(H, T, { l: like(S, T) * 0.12 * w }); k = 'gossipGood'; }
        if (!k) return;
        tweak(H, S, { k: 3 }); tweak(S, H, { k: 3 });
        stats.gossip = (stats.gossip || 0) + 1;
        const e = useFmt(BA(k), [S, H, T]); if (!e) return;
        if (shown < 1 && rng.chance(0.45)) { shown++; sys2(e, [S, H, T], k === 'gossipLie' || k === 'gossipCaught' ? 'betray' : 'none', 'Voci', 2, [S.id, H.id]); }
        else { remember1(H, e.html, 'fatto'); const d = fmt(BDI('rumorHeard'), [H, T]); if (d && rng.chance(0.4)) remember1(H, d.html, 'pensiero'); }
      });
    }

    // la notte dei legami: attrazione, triangoli, rotture, ritorni, promesse, coalizioni, protezione, mentori, spaccature
    function bondsNight() {
      const A = alive();
      // col tempo la paura si attenua, se non viene alimentata
      BOND.forEach((x) => { if (x.p > 0) x.p = Math.max(0, x.p - 2); });
      // stare vicini fa conoscere; il tempo nello stesso gruppo costruisce fiducia
      A.forEach((a) => zoneMates(a).forEach((b) => { tweak(a, b, { k: 2 }); if (isAlly(a, b)) tweak(a, b, { f: 4, l: 2 }); if (a.partner === b.id) tweak(a, b, { t: 2, f: 3 }); }));
      // l'attrazione cresce piano tra chi si piace
      A.forEach((a) => {
        if (a.partner) return;
        zoneMates(a).concat(allyMates(a)).forEach((b) => {
          if (b.partner || like(a, b) < 10 || (cfg.teamWin && a.team !== b.team && cfg.teamsAllied)) return;
          tweak(a, b, { t: Math.max(0, 3 + (b.attr.car - 5) * 0.9 + like(a, b) / 20 + (b.fame >= 3 ? 1.5 : 0)) * (0.5 + rng.f()) });
        });
      });
      // triangoli: due cotte per la stessa persona
      A.forEach((a) => A.forEach((b) => {
        if (a.ix >= b.ix || !a.crush || a.crush !== b.crush || hasMem(a, b, 'rivalLove') || geo&&a.zone!==b.zone) return;
        remember(a, b, 'rivalLove'); remember(b, a, 'rivalLove');
        const e = useFmt(BA('triangle'), [a, b, byId[a.crush]]); if (e) sys2(e, [a, b], 'love', 'Triangolo', 3);
      }));
      // le coppie in crisi si lasciano
      A.forEach((a) => {
        const b = aliveId(a.partner) ? byId[a.partner] : null; if (!b || a.ix > b.ix || geo && a.zone !== b.zone) return;
        const strain = (like(a, b) < 0 ? 0.35 : 0) + (trustOf(a, b) < -25 || trustOf(b, a) < -25 ? 0.35 : 0) + (a.grudges[b.id] || b.grudges[a.id] ? 0.4 : 0) + (a.crush || b.crush ? 0.25 : 0);
        if (!strain || !rng.chance(Math.min(0.7, strain))) return;
        a.partner = null; b.partner = null; a.exPartner = b.id; b.exPartner = a.id; a.mo -= 15 * DR.mo; b.mo -= 15 * DR.mo;
        remember(a, b, 'breakup'); remember(b, a, 'breakup'); stats.breakups = (stats.breakups || 0) + 1;
        const third = a.crush && byId[a.crush] ? byId[a.crush] : b.crush && byId[b.crush] ? byId[b.crush] : null;
        const e = third ? useFmt(BA('breakupJealous'), [third === byId[a.crush] ? b : a, third === byId[a.crush] ? a : b, third]) : useFmt(BA('breakup'), [a, b]);
        if (e) { sys2(e, [a, b], 'betray', 'Rottura', 4); const v = voice('breakup', a, [b]); if (v) SYS[SYS.length - 1].ev.echo.push(v); }
      });
      // ritorni di fiamma
      A.forEach((a) => {
        const b = a.exPartner && aliveId(a.exPartner) ? byId[a.exPartner] : null;
        if (!b || a.ix > b.ix || a.partner || b.partner || a.zone !== b.zone || like(a, b) < 35 || like(b, a) < 35 || !rng.chance(0.2)) return;
        a.partner = b.id; b.partner = a.id; a.exPartner = null; b.exPartner = null; a.mo += 20; b.mo += 20;
        remember(a, b, 'reunion'); remember(b, a, 'reunion'); stats.reunions = (stats.reunions || 0) + 1;
        const e = useFmt(BA('reunion'), [a, b]); if (e) sys2(e, [a, b], 'love', 'Ritorno di fiamma', 4);
      });
      // le promesse nascono dove c'è fiducia
      A.forEach((a) => buddies(a).forEach((b) => {
        if (a.ix > b.ix || trustOf(a, b) < 15 || trustOf(b, a) < 5 || a.promises.some((q) => q.to === b.id && !q.done) || !rng.chance(0.2)) return;
        const tr = (x) => hasTrait(a, x) || hasTrait(b, x);
        const k = a.partner === b.id ? rng.pick(['protezione', 'vendetta', 'fedelta']) : tr('vendicativo') ? 'vendetta' : tr('generoso') ? 'cibo' : tr('leale') ? 'fedelta' : tr('romantico') ? 'protezione' : rng.pick(['fedelta', 'protezione', 'cibo', 'fedelta']);
        let ok;
        if (k === 'fedelta') ok = makePromise(a, b, 'fedelta') && makePromise(b, a, 'fedelta');
        else if (k === 'vendetta') ok = makePromise(a, b, 'vendetta');
        else ok = makePromise(a, b, k);
        if (!ok) return;
        const e = fmt(((BD.promises || {}).make || {})[k], [a, b]);
        if (e) { sys2(e, [a, b], 'ally', 'Giuramento', 2); if (rng.chance(0.4)) { const v = voice('promise', b, [a]); if (v) SYS[SYS.length - 1].ev.echo.push(v); } }
      }));
      // coalizioni contro chi fa paura
      const feared = A.filter((F) => F.kills >= 2 || A.filter((x) => fearOf(x, F) >= 45).length >= 2);
      feared.forEach((F) => {
        const afraid = A.filter((x) => x !== F && !isAlly(x, F) && fearOf(x, F) >= 35);
        for (let i = 0; i < afraid.length; i++) for (let j = i + 1; j < afraid.length; j++) {
          const a = afraid[i], b = afraid[j];
          if (a.zone !== b.zone || isAlly(a, b) || hostility(a, b) >= 1 || (cfg.teamWin && cfg.teamsAllied && a.team !== b.team) || !canTeam([a, b]) || !rng.chance(0.3)) continue;
          if ((a.allyId != null && (alliances.get(a.allyId) || new Set()).size >= 5) || (b.allyId != null && (alliances.get(b.allyId) || new Set()).size >= 5)) continue;
          joinAlliance([a, b]); stats.alliances++; a.alliancesFormed++; b.alliancesFormed++;
          remember(a, b, 'coalition', F); remember(b, a, 'coalition', F); a.hunt = F.id; b.hunt = F.id; tweak(a, F, { p: -10 }); tweak(b, F, { p: -10 });
          stats.coalitions = (stats.coalitions || 0) + 1;
          const e = useFmt(BA('coalition'), [a, b, F]); if (e) sys2(e, [a, b], 'ally', 'Coalizione', 3);
          return;
        }
      });
      // chi ha troppa paura si mette sotto la protezione del più forte
      A.forEach((a) => {
        if (!a.alive || a.allyId != null || hasTrait(a, 'solitario')) return;
        const S = A.find((x) => x !== a && fearOf(a, x) >= 60 && x.zone === a.zone && hostility(a, x) < 3 && !recentWound(a, x, 3) && !(cfg.teamWin && x.team !== a.team) && (x.allyId == null || (alliances.get(x.allyId) || new Set()).size < 5) && canTeam([x, a]));
        if (!S || !rng.chance(0.3)) return;
        const it = a.inv.filter((x) => x.type !== 'ricordo').sort((x, y) => itemScore(y) - itemScore(x))[0];
        if (it && !hasTrait(S, 'pacifista')) { takeItem(a, it); addItem(S, Object.assign({}, it, { how: 'dono', from: a.id, d: day })); }
        joinAlliance([S, a]); remember(a, S, 'submitted'); remember(S, a, 'protector'); tweak(a, S, { p: -15 });
        stats.submissions = (stats.submissions || 0) + 1;
        const e = useFmt(BA('submit'), [a, S], { i: it ? it.name : '' }) || useFmt(BA('submit').filter((x) => !x.includes('{i}')), [a, S]);
        if (e) sys2(e, [a, S], 'ally', 'Paura', 2);
      });
      // i mentori insegnano a chi è rimasto indietro
      A.forEach((a) => {
        if (!rng.chance(0.18)) return;
        const best = (x) => Math.max(x.attr.int, x.attr.sop);
        const s2 = buddies(a).find((x) => best(a) - best(x) >= 3 && !hasMem(x, a, 'mentor') && like(a, x) >= 0);
        if (!s2 || best(a) < 7) return;
        s2.planPh = phases.length; remember(s2, a, 'mentor'); remember(a, s2, 'student');
        stats.mentors = (stats.mentors || 0) + 1;
        const e = useFmt(BA('mentor'), [a, s2]); if (e) sys2(e, [a, s2], 'heal', 'Mentore', 2);
      });
      // un'alleanza non sopravvive a un rancore o a una ferita fresca tra i suoi membri: chi ha subito se ne va
      if (!cfg.teamWin) {
        const seen = new Set();
        A.forEach((a) => {
          if (a.allyId == null || seen.has(a.allyId)) return; seen.add(a.allyId);
          const g = [a].concat(allyMates(a, true));
          let worst = null, wh = 1;
          g.forEach((x) => g.forEach((y) => { if (x !== y) { const h = hostility(x, y, true) + (x.grudges[y.id] ? 0.5 : 0) + (like(x, y) < like(y, x) ? 0.1 : 0); if (h > wh) { wh = h; worst = [x, y]; } } }));
          if (!worst || wh < 2 || !rng.chance(wh >= 3 ? 0.9 : 0.55)) return;
          const [x, y] = worst, pair = g.length === 2;
          leaveAlliance(x); remember(x, y, 'split'); stats.drifts = (stats.drifts || 0) + 1;
          const e = useFmt(BA(pair ? 'drift' : 'leave'), [x, y]); if (e) sys2(e, [x, y], 'betray', 'Alleanza finita', 3);
        });
      }
      // alleanze minate dalla diffidenza si spaccano
      const done = new Set();
      A.forEach((a) => {
        if (a.allyId == null || done.has(a.allyId)) return; done.add(a.allyId);
        const g = [a].concat(allyMates(a)); if (g.length < 3 || cfg.teamWin) return;
        let worst = null, wv = 0;
        g.forEach((x) => g.forEach((y) => { if (x.ix < y.ix) { const v = trustOf(x, y) + trustOf(y, x) + (x.grudges[y.id] || y.grudges[x.id] ? -80 : 0); if (v < wv) { wv = v; worst = [x, y]; } } }));
        if (!worst || wv > -50 || !rng.chance(0.4)) return;
        const [x, y] = worst;
        const faction = g.filter((m) => m !== y && (m === x || like(m, x) > like(m, y)));
        faction.forEach((m) => leaveAlliance(m));
        if (faction.length > 1 && canTeam(faction)) joinAlliance(faction);
        remember(x, y, 'split'); remember(y, x, 'split'); stats.splits = (stats.splits || 0) + 1;
        const e = useFmt(BA('split'), [x, y]); if (e) sys2(e, [x, y], 'betray', 'Scissione', 3);
      });
      // i rancori minori si consumano col tempo
      A.forEach((a) => Object.keys(a.grudges).forEach((id) => {
        const g = a.grudges[id]; if (!aliveId(id) || g.why === 'kill' || g.why === 'betray' || phases.length - g.phase < 12) return;
        if (!rng.chance(0.1 + (hasTrait(a, 'clemente') ? 0.2 : 0) - (hasTrait(a, 'vendicativo') ? 0.08 : 0))) return;
        delete a.grudges[id]; tweak(a, byId[id], { l: 10 });
        const d = useFmt(BA('fadeGrudge'), [a, byId[id]]); if (d) remember1(a, d.html, 'pensiero');
      }));
    }

    function rememberPhase(events, extra = []) {
      if (!worldMemory) return;
      const visible = new Set(events), all = [...new Set([...events, ...extra])].sort((a,b) => (a.place?.seq ?? -1) - (b.place?.seq ?? -1));
      for (const event of all) {
        const fact = worldMemory.record(event, phases.length, day, visible.has(event));
        void fact; // i fatti collegati restano in memoryRefs; il contesto leggibile nasce da eventContext
      }
    }

    function runPhase(kind, pool, title, intro, opt) {
      const events = pendingNotes.splice(0);
      SYS = [];
      ORIGIN = kind === 'f' ? 'festino' : null; CURKIND = kind;
      const before = alive().length;
      if (geo) {
        geo.reset(); evacuate();
        if (kind === 'n') spatialGoals(true);
        if (kind === 'f') { const target=gather('feast'); intro+=' Punto di ritrovo: '+zoneName(target)+'.'; }
        if (kind === 'b' && theme.id === 'liceo') intro='Suona la campanella: in Aula magna tutti cercano il banco migliore.';
        if (kind === 'b' && theme.id === 'ufficio') intro='Nell’Open space comincia la corsa alla scrivania vicino alla finestra.';
        if (kind === 'n' && theme.id === 'liceo') intro='Le lezioni sono finite: chi resta a scuola si sposta tra le aule, riprende fiato e scrive sulla chat di classe.';
      }
      tickStatus();
      if (kind === 'd') moveByGoals();
      maybeDissolve(events);
      revealIntrigue(events);
      if (kind === 'd' && day >= 2) sponsorDrop(events);
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
        const present=geo?order.filter(t=>un.has(t.id)&&t.alive&&t.zone===P.zone).length:n;
        const usable=e=>e.n<=present&&(e.afterScene==null||D.world.follows(e.afterScene,P.zone,[P],phases))&&(!geo||(e.space||[]).every(s=>(s.at==null||s.at===P.zone)&&(s.travel==null||s.travel===P.zone||geographyZones[P.zone].links.includes(s.travel)&&!closed.has(s.travel)&&geo.budget(P)>0)));
        const affected=!geo||kind!=='dis'||!opt?.affectedZones||opt.affectedZones.includes(P.zone);
        const candL = affected?pool.filter((e) => e.lethal && usable(e) && e.victims.length < nAlive && !e.risky):[];
        const candS = affected?pool.filter((e) => !e.lethal && usable(e) && (!e.risky || nAlive > 2)):[];
        for (let attempt = 0; attempt < 25 && !done; attempt++) {
          const wantLethal = nAlive > 1 && rng.chance(pL);
          const cand = wantLethal ? candL : candS;
          // Se nessun modello recente può essere evitato, i tentativi successivi
          // riaprono il catalogo: i requisiti dell'evento hanno sempre precedenza.
          const ev = rng.wpick(cand, (e) => attempt < 12 && variety.recent(e) ? 0 : wOf(e));
          if (!ev) continue;
          const roles = assign(ev, P, un);
          if (!roles) continue;
          if (ev.lethal && alive().length - ev.victims.length < 1) continue;
          events.push(apply(ev, roles));
          roles.forEach((t) => un.delete(t.id));
          done = true;
        }
        if (!done) { const safe=fallback.filter(e=>!geo||geo.accepts(e,[P])); const ev=rng.wpick(safe, (e) => variety.weight(e))||parseLine('1 | {A} osserva i passaggi della zona e aspetta il momento giusto.'); events.push(apply(ev, [P])); un.delete(P.id); }
      }
      // conseguenze automatiche della fase
      if (kind === 'n') nightEnd();
      phaseTick(kind);
      resolveVitals();
      const deathsSys = SYS.filter((x) => x.ev.deaths.length).map((x) => x.ev);
      const capN = kind === 'n' ? 7 : kind === 'b' ? 1 : 3;
      const sysDead = new Set(deathsSys.flatMap((e) => e.deaths));
      const valid = SYS.filter((x) => !x.ev.deaths.length && x.ev.ids.every((id) => byId[id].alive || sysDead.has(id))).map((x) => [x, x.pri + rng.f()]).sort((a, b) => b[1] - a[1]);
      const rest = valid.slice(0, capN).map((x) => x[0].ev);
      // quello che la diretta non mostra finisce nel diario di chi l'ha vissuto
      valid.slice(capN).forEach(([x]) => x.ev.ids.forEach((id) => remember1(byId[id], x.ev.html, 'fatto')));
      events.push(...rest, ...deathsSys);
      SYS = []; ORIGIN = null;
      if (kind === 'b') alive().forEach(decideGoal);
      if (kind === 'dis') {
        const A2 = alive(); let hs = 0;
        A2.forEach((a) => A2.forEach((b) => {
          if (a.ix >= b.ix || a.zone !== b.zone || geo&&opt?.affectedZones&&!opt.affectedZones.includes(a.zone) || hs >= 1 || like(a, b) > -25 || a.grudges[b.id] && a.grudges[b.id].why === 'kill' || !rng.chance(0.3)) return;
          remember(a, b, 'hardship'); remember(b, a, 'hardship'); hs++;
          const e = useFmt(BA('hardship'), [a, b]); if (e) events.push(Object.assign({ html: e.html, plain: e.plain, ids: [a.id, b.id], deaths: [], lethal: false, origin: 'sys', cat: 'heal', why: 'carattere', whyTxt: 'Legame', echo: [] },geo?{place:geo.locate([a,b])}:{}));
        }));
      }
      if (kind === 'd' || kind === 'dis' || kind === 'f') diaryNight(0.35);
      if(geo)events.sort((a,b)=>(a.place?.seq??-1)-(b.place?.seq??-1));
      rememberPhase(events, valid.map(([x]) => x.ev));
      if (intrigue) intrigue.prepare();
      const died = before - alive().length;
      noDeathStreak = died ? 0 : noDeathStreak + 1;
      phases.push(Object.assign({ kind, day, title, intro, events, snap: snapshot(), meteo: W.n ? { n: W.n, d: W.d } : null }, opt || {}));
    }

    function runLovers() {
      const [A, B] = alive();
      const pool = pools.lovers.filter((e) => e.n === 2);
      if (!pool.length) return false;
      const events = [];
      if (geo) { SYS=[];geo.reset(); gather('finale'); }
      for (let k = 0; k < 10 && !isEnded(); k++) {
        const ev = rng.wpick(pool, (e) => e.w * variety.weight(e));
        const roles = rng.chance(0.5) ? [A, B] : [B, A];
        if (!checkReq(ev, roles)) continue;
        events.push(apply(ev, roles));
      }
      if (!isEnded() && (!geo || !events.length)) return false;
      if(geo){events.push(...SYS.map(x=>x.ev));SYS=[];events.sort((a,b)=>(a.place?.seq??-1)-(b.place?.seq??-1));}
      rememberPhase(events);
      phases.push({ kind: 'finale', day, title: 'L\'ultimo atto', intro: 'Restano in due, e si amano. L\'arena ha previsto anche questo.', events, snap: snapshot() });
      return isEnded();
    }

    // titoli e introduzioni degli atti finali: dicono quanti restano e cosa cambia, senza ripetersi
    const FINAL_ONLY = /ultimo scontro|ultima sfida|vince la partita|fine della partita|ultimo cerchio|il liceo sceglie|all'ultima (interrogazione|riunione)/i;
    function climaxTitle(round, n) {
      if (n === 2) return round === 0 ? 'Faccia a faccia' : theme.soft ? 'La sfida finale' : 'Il duello finale';
      return ['Gli ultimi equilibri', 'Le carte sul tavolo', 'Il punto di rottura'][round] || (theme.soft ? ['Fino all’ultima mossa', 'Nessun passo indietro', 'L’ultimo rilancio'] : ['L’ultimo rilancio', 'Nessun passo indietro', 'Fino all’ultimo respiro'])[(round - 3) % 3];
    }
    function climaxIntro(round, n, meeting) {
      const where = atZone(zoneName(meeting));
      if (round === 0) return (n === 2 ? 'Restano in due' : 'Restano in ' + n) + '. Tutti si dirigono verso ' + zoneName(meeting) + ': da qui si esce solo vincendo.';
      if (n === 2) return theme.soft ? 'Restano in due. Ne resterà uno solo.' : 'Restano in due. Solo uno uscirà dall\'arena.';
      if (round === 1) return 'Restano in ' + n + '. Prima di colpire davvero, ci si studia e si saggiano le forze.';
      if (round === 2) return 'Nessuno può più allontanarsi: si resta ' + where + '. Adesso conta quello che ognuno ha messo da parte.';
      return 'Restano in ' + n + '. ' + ['Ogni errore, adesso, costa caro.', 'La stanchezza comincia a farsi sentire.', 'Nessuno ha più niente da nascondere.'][(round - 3) % 3];
    }
    function runClimax() {
      let meeting = null, round = 0;
      while (!isEnded() && round < 40) {
        const pair = alive(), startCount = pair.length;
        if (pair.length === 2 && pair[0].partner === pair[1].id && runLovers()) return;
        const events = []; SYS = []; ORIGIN = null; CURKIND = 'finale'; geo.reset();
        if (round === 0) meeting = gather('finale');
        else alive().forEach(t => geo.move(t, meeting, 'Raggiunge il confronto ancora in corso', { forced: true, mode: 'gather' }));
        if (round >= 2) sealFinale(meeting);
        revealIntrigue(events, true);
        // Una risorsa già posseduta può ancora cambiare l'equilibrio, ma si consuma.
        const recovery = rng.pick(alive().filter(t => t.hp < 60 && hasItem(t, 'med')));
        if (recovery && (round === 0 || round < 3 && rng.chance(0.4))) {
          const ev = parseLine('1 med:A | {A} usa le cure conservate prima del prossimo confronto e ritrova le forze.');
          events.push(apply(ev, [recovery]));
        }
        if (round === 0) {
          const text = (theme.soft ? 'Gli ultimi concorrenti si ritrovano faccia a faccia.' : 'I superstiti si ritrovano faccia a faccia.') + (alive().some(t => t.allyId != null) ? ' Le alleanze reggono ancora, ma tutti sanno che non dureranno.' : ' Nessuno ha più alleati: ognuno guarda gli altri come un ostacolo.');
          events.push({ html: text, plain: text, ids: [], deaths: [], lethal: false, note: true });
        } else {
          maybeDissolve(events);
          if (round === 3) {
            const pact = alive().some(t => t.allyId != null);
            alive().forEach(leaveAlliance);
            if (pact) {
              const text = 'Le alleanze si sciolgono: da qui in avanti ognuno gioca per sé.' + (cfg.teamWin ? ' Le squadre, però, restano unite fino alla fine.' : alive().some(t => t.partner && aliveId(t.partner)) ? ' Solo chi si ama non si combatte.' : '');
              events.push({ html: text, plain: text, ids: [], deaths: [], lethal: false, note: true });
            }
          }
          const available = rng.shuffle(alive());
          while (available.length > 1 && !isEnded()) {
            const A = available.shift();
            const j = available.findIndex(B => A.alive && B.alive && A.zone === B.zone && canFight(A, B));
            if (j < 0) continue;
            const B = available.splice(j, 1)[0];
            if (round < 3 && alive().length > 2 && rng.chance(0.4)) {
              const opts = theme.soft ? FINALE_JAB_SOFT : FINALE_JAB, freshOpts = opts.filter((x) => !USED.has(x)), line = rng.pick(freshOpts.length ? freshOpts : opts); USED.add(line);
              const ev = parseLine(line);
              events.push(apply(ev, [A, B])); continue;
            }
            const attr = rng.pick(theme.soft ? ['int', 'agi', 'car', 'furt', 'res'] : ['for', 'agi', 'int', 'furt', 'res']);
            const left = rollTest(A, attr, 0), right = rollTest(B, attr, 0);
            const wins = left.roll >= right.roll, roles = wins ? [A, B] : [B, A];
            // le frasi che chiudono la partita («l'ultimo scontro», «vince la partita») solo quando restano in due
            const lastTwo = alive().length <= 2;
            let pool = pools.finale.filter(e => e.n === 2 && e.lethal && (lastTwo || !FINAL_ONLY.test(e.text)) && e.space.every(s => (s.at == null || s.at === meeting) && (s.travel == null || s.travel === meeting)) && checkReq(e, roles));
            if (!pool.length) pool = [parseLine(theme.soft ? '2 k:A>B | {A} prevale su {B}, che esce dalla gara.' : '2 k:A>B | {A} prevale nello scontro con {B}, che perde la vita.')];
            const ev = rng.wpick(pool, e => weightFor(e, roles[0]) * variety.weight(e));
            const result = apply(ev, roles);
            result.test = { who: A.id, attr, roll: left.roll, dc: right.roll, pass: wins };
            result.duel = { a: A.id, b: B.id, attr, left: left.roll, right: right.roll };
            result.reason = (result.reason ? result.reason + ' ' : '') + 'Scontro di ' + (D.attrs.find(x => x.id === attr)?.name || attr).toLowerCase() + ': ' + A.name + ' ' + left.roll + ' contro ' + B.name + ' ' + right.roll + '. Contano la caratteristica, le condizioni e gli oggetti; a parità vince chi attacca.';
            A.tests++; B.tests++; stats.tests += 2; roles[0].testsPassed++; stats.testsPassed++;
            events.push(result);
          }
        }
        events.push(...SYS.map(x => x.ev)); SYS = [];
        events.sort((a,b) => (a.place?.seq ?? -1) - (b.place?.seq ?? -1));
        rememberPhase(events);
        if (!isEnded()) intrigue.prepare();
        phases.push({ kind: 'finale', day, title: climaxTitle(round, startCount), intro: climaxIntro(round, startCount, meeting), events, snap: snapshot() });
        round++;
      }
      if (!isEnded()) throw new Error('La stretta finale non ha prodotto un vincitore.');
    }

    // i colpi di assaggio dello scontro finale: varianti che non si ripetono
    const FINALE_JAB = ['2 hit:A>B | {A} ferisce {B} con un attacco rapido. Il confronto resta aperto.', '2 hit:A>B | {A} e {B} si studiano a lungo. Il primo colpo è di {A}, e lascia il segno.', '2 hit:A>B | {A} attacca per prim[A:o/a] e costringe {B} a ripiegare, ferit[B:o/a].', '2 hit:A>B | Un errore di {B}, e {A} ne approfitta subito. Nessuno dei due, però, cede.'];
    const FINALE_JAB_SOFT = ['2 hit:A>B | {A} sorprende {B} con una manovra e costringe {B} a consumare energie. Il confronto resta aperto.', '2 hit:A>B | {A} mette {B} in difficoltà davanti a tutti. {B} incassa, ma resta in gara.', '2 hit:A>B | {A} anticipa la mossa di {B} e guadagna terreno. Il confronto continua.'];
    function runFinale() {
      if (geo) return runClimax();
      const events = [];
      let meeting=null;
      if(geo){SYS=[];geo.reset();meeting=gather('finale');sealFinale(meeting);}
      alive().forEach((t) => leaveAlliance(t));
      let pool = geo ? pools.finale.filter(e=>e.space.every(s=>(s.at==null||s.at===meeting)&&(s.travel==null||s.travel===meeting))) : pools.finale;
      if(geo&&!pool.length)pool=[parseLine(theme.soft?'2 k:A>B | {A} vince lo scontro decisivo con {B}.':'2 k:A>B | {A} prevale nello scontro con {B}, che perde la vita.')];
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
      if(geo){events.push(...SYS.map(x=>x.ev));SYS=[];events.sort((a,b)=>(a.place?.seq??-1)-(b.place?.seq??-1));}
      phases.push({ kind: 'finale', day, title: 'Lo scontro finale', intro: theme.intro.finale+(geo?' Punto di ritrovo: '+zoneName(meeting)+'. Gli altri passaggi vengono chiusi prima dello scontro.':''), events, snap: snapshot() });
    }

    // il meteo del giorno e, nel Battle Royale, la zona che si stringe
    function newDay() {
      const list = R.meteo || [];
      if (list.length) {
        const calm = { n: '', d: '', fx: {} };
        const pick = rng.chance(day === 1 ? 0.35 : 0.72) ? rng.pick(list.filter((m) => m.n !== (geo?previousWeather:W.n))) : calm;
        if(geo)previousWeather=pick?.n||'';
        W = pick || calm;
        if(geo){
          const corrections={scifi:{'Silenzio radio':{d:'Le comunicazioni tra i moduli sono interrotte: i rumori locali restano l’unico avvertimento.'},Blackout:{d:'Luci spente e comandi fuori uso: i passaggi di servizio restano percorribili, ma si combatte al buio.'}},liceo:{'Gita scolastica':{n:'Giornata di attività libere',d:'Niente lezione frontale: gli studenti girano per gli spazi della scuola, con panini e tempo per parlare.'},'Ondata di influenza':{d:'Molte aule sono vuote per l’influenza. Chi resta a scuola cerca di tenersi in forze.'},'Giornata dello sport':{d:'Gare in Palestra e attività negli altri spazi: chi corre, chi cerca una scusa per fermarsi.'}}};
          W=Object.assign({},W,corrections[theme.id]?.[W.n]||{});
        }
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
          const candidates=geo?open.filter(z=>Geography.connected(geographyZones,new Set([...closed,z]))):open;
          if(!candidates.length) break;
          const z = candidates[rng.int(candidates.length)]; open.splice(open.indexOf(z),1);
          if(geo) geo.closure(z); else closed.add(z);
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
    const lateEnd = () => {
      if (loversEnd()) return true;
      if (geo && day >= 2 && alive().length <= 4 && !isEnded() && rng.chance(0.5)) { runFinale(); return true; }
      return false;
    };

    // primi sguardi: qualcuno nota subito qualcun altro
    T.forEach((a) => { const n = 1 + (a.traits.includes('romantico') ? 2 : 0) + (rng.chance(0.4) ? 1 : 0); for (let i = 0; i < n; i++) { const b = rng.pick(T); if (b !== a) tweak(a, b, { t: 5 + rng.int(20) + (b.attr.car - 5) * 2 }); } });
    // ognuno porta qualcosa da casa, scelto dal suo carattere
    T.forEach((t) => {
      const tr = (x) => t.traits.includes(x);
      const home = tr('superstizioso') ? 'amuleto' : tr('ubriacone') ? 'alcol' : tr('ingegnoso') || tr('cacciatore') ? 'attrezzo' : tr('avido') || tr('fortunato') ? 'valore' : tr('guaritore') ? 'med' :
        tr('romantico') || t.attr.emp >= 7 || rng.chance(0.2) ? 'ricordo' : rng.chance(0.12) ? 'valore' : null;
      if (home) t.inv.push(mkItem(home, null, 'casa', null));
    });
    initialRelations.forEach(({ from, to, type }) => {
      const a = byId[from], b = byId[to];
      if (type === 'amicizia') { addAff(a, b, 55); tweak(a, b, { f: 40, k: 50 }); tweak(b, a, { f: 40, k: 50 }); remember(a, b, 'initialFriend'); remember(b, a, 'initialFriend'); }
      if (type === 'rivalita') { addAff(a, b, -35); tweak(a, b, { r: 45, f: -20, k: 50 }); tweak(b, a, { r: 45, f: -20, k: 50 }); remember(a, b, 'initialRival'); remember(b, a, 'initialRival'); }
      if (type === 'coppia') { a.partner = b.id; b.partner = a.id; addAff(a, b, 70); tweak(a, b, { f: 45, t: 70, k: 60 }); tweak(b, a, { f: 45, t: 70, k: 60 }); remember(a, b, 'love'); remember(b, a, 'love'); stats.couples++; }
      if (type === 'fiducia') { tweak(a, b, { f: 60, k: 40 }); remember(a, b, 'initialTrust'); }
      if (type === 'attrazione') { tweak(a, b, { t: 75, k: 30 }); a.crush = b.id; remember(a, b, 'initialCrush'); }
    });
    let feastDone = false, lastDisaster = -9;
    const usedDisasters = new Set();
    while (true) {
      day++;
      newDay();
      if (day === 1) runPhase('b', pools.b, theme.phase.b, theme.intro.b);
      if (isEnded() || lateEnd()) break;
      runPhase('d', pools.d, theme.phase.d + ' ' + day, theme.intro.d);
      if (isEnded() || lateEnd()) break;
      const a = alive().length;
      if (!feastDone && day >= 3 && a >= 4 && (rng.chance(0.35) || day >= 6)) {
        feastDone = true;
        runPhase('f', pools.f, theme.phase.f, theme.intro.f);
      } else if (day >= 2 && pools.disasters.length && day - lastDisaster > 1 && rng.chance(0.32 * Math.min(1.5, diff))) {
        const eligible=pools.disasters.filter(d=>!d.zones||d.zones.some(z=>!closed.has(z)&&alive().some(t=>t.zone===z)));
        let opts = eligible.filter((d) => !usedDisasters.has(d.n));
        if (!opts.length) { usedDisasters.clear(); opts = eligible; }
        const dz = rng.pick(opts);
        if(!dz)throw new Error('Nessun disastro raggiungibile.');
        usedDisasters.add(dz.n); lastDisaster = day;
        const areas=geo?dz.zones||[...new Set(Geography.mentions(dz.n,geographyZones).map(m=>m.zone))]:[];
        runPhase('dis', dz.contentId?dz.out:dz.out.concat(pools.ds), dz.n, dz.intro, Object.assign({ adult: !!dz.adult },areas.length?{affectedZones:areas}:{},dz.contentId?{contentId:dz.contentId,worldIncident:{scene:dz.scene,exposed:alive().filter(t=>areas.includes(t.zone)).map(t=>t.id)}}:{}));
      }
      if (isEnded() || lateEnd()) break;
      runPhase('n', pools.n, theme.phase.n + ' ' + day, theme.intro.n);
      if (isEnded() || lateEnd()) break;
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
      diary: t.diary, mem: t.memoryHistory, trades: t.trades, crafts: t.crafts, acts: t.acts, rejected: t.rejected,
      promises: t.promises.map((q) => ({ to: q.to, k: q.k, d: q.d, ph: q.ph, done: q.done || null, end: q.endPh != null ? q.endPh : null })), spares: t.spares, promisesKept: t.promisesKept || 0, promisesBroken: t.promisesBroken || 0,
      bag: t.inv.map((x) => ({ t: x.type, n: x.name, h: x.how || 'trovato', q: x.q, u: x.u, m: x.um, f: x.from, d: x.d, x: x.x })),
    }));
    // le storie di legame della partita, scelte tra tutte le coppie (anche di chi non c'è più)
    function bondStories() {
      const best = {};
      const put = (k, a, b, v, note) => { if (v > 0 && (!best[k] || v > best[k].v)) best[k] = { k, a: a.id, b: b.id, v: Math.round(v), note: note || '' }; };
      for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) {
        const a = T[i], b = T[j], ab = peek(a, b), ba = peek(b, a), la = like(a, b), lb = like(b, a);
        const lovers = hasMem(a, b, 'love') || hasMem(b, a, 'love');
        const lastAB = (a.memoryHistory[b.id] || []).filter((m) => m.k === 'breakup' || m.k === 'reunion' || m.k === 'love').slice(-1)[0];
        const broke = lastAB && lastAB.k === 'breakup';
        if (lovers) put('amore', a, b, ab.t + ba.t + Math.min(la, lb) + 20 - (broke ? 40 : 0), broke ? 'finito' : !a.alive && !b.alive ? 'tragico' : !a.alive || !b.alive ? 'spezzato' : 'insieme');
        if (!lovers && la >= 30 && lb >= 30) put('amicizia', a, b, Math.min(la, lb) + Math.min(ab.f, ba.f) + (ab.n.fw || 0) * 10 + (ab.n.sv || 0) * 10 + (ba.n.sv || 0) * 10, (ab.n.fw || 0) ? 'armi' : '');
        if ((a.grudges[b.id] || b.grudges[a.id] || hasMem(a, b, 'killedDear') || hasMem(b, a, 'killedDear')) && Math.max(ab.r, ba.r) >= 30) put('nemesi', a, b, Math.max(ab.r, ba.r) - Math.min(la, lb), '');
        if (la <= -40 && lb <= -40) put('odio', a, b, -(la + lb), '');
        if (hasMem(b, a, 'betrayed')) put('tradimento', a, b, Math.max(0, ba.k) + 50 + (hasMem(b, a, 'promiseBroken') ? 40 : 0), a.alive ? '' : 'pagato');
        if (hasMem(a, b, 'betrayed')) put('tradimento', b, a, Math.max(0, ab.k) + 50 + (hasMem(a, b, 'promiseBroken') ? 40 : 0), b.alive ? '' : 'pagato');
        if (hasMem(a, b, 'spared')) put('pieta', b, a, 60 + ab.r, '');
        if (hasMem(b, a, 'spared')) put('pieta', a, b, 60 + ba.r, '');
        if (ab.t >= 45 && ba.t < 15 && !lovers) put('nonCorrisposto', a, b, ab.t - ba.t, hasMem(a, b, 'rejected') ? 'respinto' : '');
        if (ba.t >= 45 && ab.t < 15 && !lovers) put('nonCorrisposto', b, a, ba.t - ab.t, hasMem(b, a, 'rejected') ? 'respinto' : '');
        if (hasMem(a, b, 'mentor')) put('mentore', b, a, 40 + ab.r, '');
        if (hasMem(b, a, 'mentor')) put('mentore', a, b, 40 + ba.r, '');
        if (ab.p >= 60) put('paura', a, b, ab.p, '');
        if (ba.p >= 60) put('paura', b, a, ba.p, '');
      }
      return ['amore', 'amicizia', 'nemesi', 'tradimento', 'pieta', 'nonCorrisposto', 'mentore', 'odio', 'paura'].map((k) => best[k]).filter(Boolean);
    }
    stats.stories = bondStories();
    if(worldMemory)for(const [ph,p] of phases.entries())for(const event of p.events)if(event.memoryId==null&&!event.note&&ph>=(worldMemory.data.facts.at(-1)?.ph??0))worldMemory.record(event,ph,p.day);
    return Object.assign({ version: 2, theme: theme.id, adult, seed, days: day, phases, itemFacts: itemLedger.facts, tributes: stripped, winners: winners.map((t) => t.id), stats },geo?{spatial:geo.data,chronicle:worldMemory.data}:{});
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
    return edFix(esc(s).replace(/\{([A-F])\}/g, (_, c2) => '<b class="nm" style="--c:' + roles[L(c2)].color + '">' + roles[L(c2)].name + '</b>'));
  }

  /* Rende un testo con concorrenti fittizi tutti dello stesso genere (per i controlli automatici) */
  function renderSample(text, themeId, gender) {
    const theme = D.themes.find((t) => t.id === themeId) || D.themes[0];
    const lex = Object.assign({}, D.lexDefault || {}, itemLex(theme), theme.lex);
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
    return edFix(s.replace(/\{([A-F])\}/g, (_, c) => names[L(c)]));
  }

  G.LOS = { renderSample, simulate, parseLine, parseBlock, parseDisasters, buildPools, makeRng, randomCast, countTemplates, previewCustom, customToLine, normalizeInitialRelations, PALETTE, STATUS_LABEL, DIFF };
})(typeof window !== 'undefined' ? window : globalThis);
