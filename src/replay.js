/* Archivio locale dei risultati già generati: nessuna risimulazione o rete. */
(function (G) {
  'use strict';
  const DB = 'last-one-standing:replays', STORE = 'replays', PREFIX = 'last-one-standing:replay:v1:';
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const record = (x) => x != null && typeof x === 'object' && !Array.isArray(x);
  const integer = (x, min = 0) => Number.isInteger(x) && x >= min;
  const idOk = (x) => typeof x === 'string' && x.length > 0 && !/[{}]/.test(x) && !own(Object.prototype, x) && x !== 'prototype';
  const replayIdOk = (x) => typeof x === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(x);
  const colorOk = (x) => x == null || typeof x === 'string' && /^#[a-fA-F0-9]{3,8}$/.test(x);
  const imageOk = (x) => x === '' || typeof x === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(x);
  const classes = new Set(['', 'good', 'warn', 'love', 'twist', 'quote']);
  const categories = new Set(['none', 'kill', 'death', 'betray', 'ally', 'heal', 'item', 'hurt', 'love']);
  const kinds = new Set(['b', 'd', 'n', 'f', 'dis', 'fallen', 'finale']);
  const promiseKinds = new Set(['fedelta', 'protezione', 'vendetta', 'cibo']);
  let opening = null, serial = 0;
  const copy = (x) => G.structuredClone(x);

  // Il motore genera grassetti e a capo, con eventuale riferimento al concorrente.
  // Si controlla senza modificare l'HTML, per conservare il risultato originale.
  function safeHtml(s, ids) {
    if (typeof s !== 'string') return false;
    let depth = 0, valid = true;
    const rest = s.replace(/<[^>]*>/g, (tag) => {
      if (tag === '<br>') return '';
      if (tag === '<b>' || tag === '<b class="meteo">') { depth++; return ''; }
      if (tag === '</b>') { if (--depth < 0) valid = false; return ''; }
      const m = tag.match(/^<b class="nm" data-id="([^"<>]*)" style="--c:(#[a-fA-F0-9]{3,8})">$/);
      if (!m) { valid = false; return ''; }
      const id = m[1].replace(/&(amp|lt|gt|quot|#39);/g, (_, x) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" }[x]));
      if (!ids.has(id)) valid = false;
      depth++; return '';
    });
    return valid && depth === 0 && !/[<>]/.test(rest);
  }
  function validate(result) {
    try {
      if (!record(result) || result.version !== 2 || typeof result.theme !== 'string' || typeof result.seed !== 'string' || typeof result.adult !== 'boolean' || !integer(result.days, 1)) return false;
      if (!Array.isArray(result.tributes) || result.tributes.length < 2 || !Array.isArray(result.phases) || !result.phases.length || !record(result.stats)) return false;
      const data = G.LOS_DATA, theme = data && Array.isArray(data.themes) ? data.themes.find((t) => t.id === result.theme) : null;
      if (data && !theme) return false;
      const attrs = data && data.attrs ? new Set(data.attrs.map((a) => a.id)) : null;
      const traits = data && data.traits ? new Set(data.traits.map((t) => t.id)) : null;
      const ids = new Set(result.tributes.map((t) => t && t.id)), nph = result.phases.length;
      if (ids.size !== result.tributes.length || [...ids].some((id) => !idOk(id))) return false;
      const refs = (xs) => Array.isArray(xs) && xs.every((id) => ids.has(id));
      const phase = (x) => integer(x) && x < nph;
      const textList = (xs) => Array.isArray(xs) && xs.every((x) => typeof x === 'string');
      const promise = (q) => record(q) && ids.has(q.to) && promiseKinds.has(q.k) && phase(q.ph) && integer(q.d) && (q.done == null || ['mantenuta', 'tradita', 'sciolta'].includes(q.done)) && (q.end == null || phase(q.end) && q.end >= q.ph);
      const item = (it) => record(it) && typeof it.t === 'string' && typeof it.n === 'string' && (it.q == null || integer(it.q, 1) && it.q <= 3) && (it.u == null || Number.isFinite(it.u) && it.u >= 0) && (it.m == null || Number.isFinite(it.m) && it.m > 0) && (it.f == null || ids.has(it.f));
      if (result.itemFacts !== undefined) {
        const kinds = new Set(['consume', 'heal', 'protect', 'absorb', 'bonus', 'craft', 'deploy', 'attack', 'poison', 'accident', 'comfort']);
        const state = (s) => record(s) && ['hp', 'en', 'mo', 'food', 'pr'].every(k => Number.isFinite(s[k]) && s[k] >= 0 && s[k] <= 100) && textList(s.states) && typeof s.infected === 'boolean';
        if (!Array.isArray(result.itemFacts) || result.itemFacts.length > 200000 || !result.itemFacts.every((f, i) => record(f) && f.seq === i && phase(f.ph) && kinds.has(f.kind) && ids.has(f.owner) && ids.has(f.who) && item(f.item) && state(f.before) && state(f.after) && typeof f.detail === 'string' && typeof f.context === 'string')) return false;
      }
      const event = (e) => record(e) && safeHtml(e.html, ids) && typeof e.plain === 'string' && refs(e.ids) && refs(e.deaths) && (e.note || categories.has(e.cat)) &&
        (e.echo == null || Array.isArray(e.echo) && e.echo.every((x) => record(x) && safeHtml(x.html, ids) && typeof x.plain === 'string' && classes.has(x.cls || ''))) &&
        (e.test == null || record(e.test) && ids.has(e.test.who) && typeof e.test.attr === 'string' && (!attrs || attrs.has(e.test.attr)) && Number.isFinite(e.test.roll) && Number.isFinite(e.test.dc) && typeof e.test.pass === 'boolean');
      for (const t of result.tributes) {
        if (!record(t) || typeof t.name !== 'string' || !['M', 'F', 'N'].includes(t.gender) || !integer(t.team, 1) || !integer(t.rank, 1) || typeof t.alive !== 'boolean' || !colorOk(t.color) || !imageOk(t.img)) return false;
        if (!textList(t.traits) || traits && t.traits.some((x) => !traits.has(x)) || !record(t.attr) || attrs && [...attrs].some((a) => !Number.isFinite(t.attr[a]) || t.attr[a] < 1 || t.attr[a] > 10)) return false;
        if (!refs(t.killIds) || !refs(t.killerIds) || !textList(t.inv) || !textList(t.st) || !integer(t.deathDay) || !Number.isInteger(t.deathPhase) || (t.alive ? t.deathPhase !== -1 : !phase(t.deathPhase))) return false;
        for (const k of ['kills', 'events', 'alliancesFormed', 'betrayals', 'items', 'tests', 'testsPassed']) if (!integer(t[k])) return false;
        if (!safeHtml(t.deathHtml, ids) || !Array.isArray(t.diary) || !t.diary.every((d) => record(d) && phase(d.ph) && integer(d.d) && typeof d.k === 'string' && safeHtml(d.h, ids))) return false;
        if (!Array.isArray(t.promises) || !t.promises.every(promise) || !Array.isArray(t.bag) || !t.bag.every(item) || !record(t.mem)) return false;
        for (const [id, memories] of Object.entries(t.mem)) if (!ids.has(id) || !Array.isArray(memories) || !memories.every((m) => record(m) && phase(m.ph) && typeof m.k === 'string' && (m.x == null || ids.has(m.x)))) return false;
      }
      for (const p of result.phases) {
        if (!record(p) || !kinds.has(p.kind) || typeof p.title !== 'string' || typeof p.intro !== 'string' || !integer(p.day) || !Array.isArray(p.events) || !p.events.every(event)) return false;
        if (p.deaths != null && !refs(p.deaths)) return false;
        if (p.kind === 'fallen' && !refs(p.deaths)) return false;
        const s = p.snap;
        if (!record(s) || !refs(s.alive) || new Set(s.alive).size !== s.alive.length) return false;
        if (!['zones', 'allies', 'st', 'inv', 'kills', 'rel', 'vit', 'mind'].every((k) => record(s[k])) || !Array.isArray(s.edges) || !Array.isArray(s.closed)) return false;
        for (const id of ids) {
          if (!integer(s.zones[id]) || !textList(s.st[id]) || !Array.isArray(s.inv[id]) || !s.inv[id].every(item) || !integer(s.kills[id])) return false;
          const r = s.rel[id];
          if (!record(r) || !Array.isArray(r.g) || !r.g.every((g) => Array.isArray(g) && ids.has(g[0]) && (g[2] == null || ids.has(g[2]))) || !refs(r.o) || !refs(r.fr) || !refs(r.en) || !Array.isArray(r.top)) return false;
          if (!r.top.every((x) => Array.isArray(x) && ids.has(x[0]) && Number.isFinite(x[1]) && typeof x[2] === 'string' && (x[3] == null || record(x[3])))) return false;
        }
        for (const id of s.alive) if (!Array.isArray(s.vit[id]) || s.vit[id].length !== 5 || s.vit[id].some((x, i) => !Number.isFinite(x) || x > 100 || x < (i === 4 ? -1 : 0))) return false;
        if (!s.edges.every((e) => Array.isArray(e) && integer(e[0]) && e[0] < ids.size && integer(e[1]) && e[1] < ids.size && ['love', 'friend', 'ally', 'hate', 'fear', 'rival', 'plot'].includes(e[2]) && Number.isFinite(e[3]) && [0, 1, 2].includes(e[4]))) return false;
      }
      if (!refs(result.winners) || !result.winners.length || result.winners.length !== result.tributes.filter((t) => t.alive).length || result.winners.some((id) => !result.tributes.find((t) => t.id === id).alive)) return false;
      if (!Array.isArray(result.stats.deathsByDay) || !record(result.stats.causes) || !Object.values(result.stats.causes).every((x) => integer(x)) || !Array.isArray(result.stats.meteo) || !Array.isArray(result.stats.stories)) return false;
      if (!result.stats.meteo.every((x) => record(x) && integer(x.day, 1) && typeof x.n === 'string') || !result.stats.stories.every((x) => record(x) && ids.has(x.a) && ids.has(x.b) && typeof x.k === 'string' && Number.isFinite(x.v))) return false;
      // Rifiuta anche HTML eseguibile annidato nei diari/pensieri o classi corrotte.
      const seen = new Set();
      function plainData(x, depth) {
        if (depth > 80) return false;
        if (x == null || typeof x === 'string' || typeof x === 'boolean' || typeof x === 'undefined') return true;
        if (typeof x === 'number') return Number.isFinite(x);
        if (typeof x !== 'object' || seen.has(x)) return false;
        seen.add(x);
        const ok = Object.entries(x).every(([k, v]) => (!['html', 'deathHtml', 'h', 'th'].includes(k) || typeof v !== 'string' || safeHtml(v, ids)) && plainData(v, depth + 1));
        seen.delete(x); return ok;
      }
      if(result.chronicle!==undefined){
        const c=result.chronicle;
        if(!result.spatial||!record(c)||c.version!==1||!Array.isArray(c.facts)||c.facts.length>200000)return false;
        let lastPh=-1;
        for(const [i,f] of c.facts.entries()){
          if(!record(f)||f.id!==i||!phase(f.ph)||f.ph<lastPh||f.day!==result.phases[f.ph].day||!integer(f.seq)||!integer(f.zone)||!result.spatial.zones[f.zone]||!refs(f.actors)||!f.actors.length||new Set(f.actors).size!==f.actors.length||!refs(f.deaths)||f.deaths.some(id=>!f.actors.includes(id))||!categories.has(f.category)||typeof f.plain!=='string'||typeof f.visible!=='boolean'||!Array.isArray(f.parents)||f.parents.some(id=>!integer(id)||id>=i||!c.facts[id].actors.some(a=>f.actors.includes(a))))return false;
          lastPh=f.ph;
        }
        for(const [ph,p]of result.phases.entries())for(const e of p.events)if(e.memoryId!==undefined){const f=c.facts[e.memoryId];if(!f||f.ph!==ph||f.seq!==e.place?.seq||f.zone!==e.place.zone||f.plain!==e.plain||JSON.stringify(e.memoryRefs||[])!==JSON.stringify(f.parents))return false;}
      }
      return plainData(result, 0) && (result.spatial === undefined || validSpatial(result,ids));
    } catch (e) { return false; }
  }
  // Il registro deve riprodurre le posizioni salvate, senza affidarsi alla
  // geografia della versione installata oggi. Si controllano anche gli eventi
  // in ordine reale: le conseguenze di sistema possono essere mostrate dopo.
  function validSpatial(result,ids) {
    const map=result.spatial,phases=result.phases;
    if(!record(map)||map.version!==1||!Array.isArray(map.zones)||map.zones.length<2||map.zones.length>16||!record(map.start))return false;
    const zone=z=>integer(z)&&z<map.zones.length;
    for(const [i,z] of map.zones.entries()){
      if(!record(z)||z.id!==i||typeof z.name!=='string'||!z.name.length||typeof z.description!=='string'||!Array.isArray(z.links)||new Set(z.links).size!==z.links.length||!z.links.every(n=>zone(n)&&n!==i))return false;
      if(!['resources','danger','shelter'].every(k=>Number.isFinite(z[k])&&z[k]>=0&&z[k]<=(k==='shelter'?1:3)))return false;
      if(z.features!==undefined&&(!Array.isArray(z.features)||!z.features.every(x=>typeof x==='string')))return false;
    }
    if(map.zones.some(z=>z.links.some(n=>!map.zones[n].links.includes(z.id))))return false;
    const reachable=new Set([0]),queue=[0];for(let i=0;i<queue.length;i++)for(const n of map.zones[queue[i]].links)if(!reachable.has(n)){reachable.add(n);queue.push(n);}if(reachable.size!==map.zones.length)return false;
    if(Object.keys(map.start).length!==ids.size||[...ids].some(id=>!zone(map.start[id])))return false;
    if(!['moves','deaths','closures'].every(k=>Array.isArray(map[k])&&map[k].length<=200000))return false;
    const known=new Map(result.tributes.map(t=>[t.id,t])),seen=new Set(),entries=phases.map(()=>[]);
    function add(entry,kind){if(!record(entry)||!integer(entry.seq)||seen.has(entry.seq)||!integer(entry.ph)||entry.ph>=phases.length)return false;seen.add(entry.seq);entries[entry.ph].push({kind,...entry});return true;}
    for(const m of map.moves){if(!ids.has(m.id)||!zone(m.from)||!zone(m.to)||m.from===m.to||!Array.isArray(m.path)||m.path.length<2||m.path.length>16||m.path[0]!==m.from||m.path[m.path.length-1]!==m.to||!m.path.every(zone)||typeof m.reason!=='string'||!m.reason.length||!['goal','event','gather','evacuate','sleepwalk'].includes(m.mode)||!Number.isFinite(m.cost)||m.cost<0||m.cost>100||m.target!=null&&!ids.has(m.target)||!add(m,'move'))return false;}
    for(const d of map.deaths)if(!ids.has(d.id)||!zone(d.zone)||known.get(d.id).deathPhase!==d.ph||!add(d,'death'))return false;
    for(const c of map.closures)if(!zone(c.zone)||c.reason!==undefined&&!['tempesta','finale'].includes(c.reason)||!add(c,'close'))return false;
    for(const [ph,p] of phases.entries()){
      if(p.affectedZones!==undefined&&(!Array.isArray(p.affectedZones)||!p.affectedZones.every(zone)))return false;
      if(p.worldIncident!==undefined&&(!record(p.worldIncident)||p.kind!=='dis'||typeof p.contentId!=='string'||!integer(p.worldIncident.scene)||p.worldIncident.scene>=30||!Array.isArray(p.worldIncident.exposed)||!p.worldIncident.exposed.every(id=>ids.has(id))||!p.worldIncident.exposed.length||new Set(p.worldIncident.exposed).size!==p.worldIncident.exposed.length||p.affectedZones?.length!==1))return false;
      for(const e of p.events){
        if(!e.place){if(!e.note)return false;continue;}
        const l=e.place;
        if(!record(l)||l.zone!=null&&!zone(l.zone)||!record(l.positions)||!Object.entries(l.positions).every(([id,z])=>ids.has(id)&&zone(z))||!add({...l,ph,event:e},'event'))return false;
      }
      const terrain=p.snap.terrain;
      if(!record(terrain)||!Array.isArray(terrain.traps)||!Array.isArray(terrain.loot)||!terrain.traps.every(t=>record(t)&&zone(t.zone)&&ids.has(t.owner)&&typeof t.name==='string')||!terrain.loot.every(l=>record(l)&&zone(l.zone)&&integer(l.count,1)))return false;
    }
    const positions={...map.start},dead=new Set(),closed=new Set();let last=-1;
    for(const [ph,list] of entries.entries()){
      const ordinary=new Map();
      const incident=phases[ph].worldIncident;
      if(incident&&incident.exposed.some(id=>dead.has(id)||positions[id]!==phases[ph].affectedZones[0]))return false;
      for(const entry of list.sort((a,b)=>a.seq-b.seq)){
        if(entry.seq<=last)return false;last=entry.seq;
        if(entry.kind==='close'){if(closed.has(entry.zone))return false;closed.add(entry.zone);}
        if(entry.kind==='move'){
          const m=entry;if(dead.has(m.id)||positions[m.id]!==m.from)return false;
          for(let i=1;i<m.path.length;i++)if(!map.zones[m.path[i-1]].links.includes(m.path[i])||closed.has(m.path[i])&&!(m.mode==='evacuate'&&closed.has(m.from)))return false;
          if(['goal','event','sleepwalk'].includes(m.mode)){ordinary.set(m.id,(ordinary.get(m.id)||0)+m.path.length-1);if(ordinary.get(m.id)>2)return false;}
          positions[m.id]=m.to;
        }
        if(entry.kind==='death'){if(dead.has(entry.id)||positions[entry.id]!==entry.zone)return false;dead.add(entry.id);}
        if(entry.kind==='event'){
          if(Object.entries(entry.positions).some(([id,z])=>positions[id]!==z))return false;
          if(!entry.event.note&&entry.event.ids.some(id=>dead.has(id)))return false;
          if(entry.event.origin!=='sys'&&!entry.event.note&&(entry.zone==null||entry.event.ids.some(id=>dead.has(id)||entry.positions[id]!==entry.zone)))return false;
        }
      }
      const snap=phases[ph].snap;
      if([...ids].some(id=>snap.zones[id]!==positions[id]||snap.alive.includes(id)===dead.has(id)))return false;
      if(snap.closed.length!==closed.size||snap.closed.some(z=>!closed.has(z)))return false;
    }
    return [...ids].every(id=>dead.has(id)===!known.get(id).alive);
  }
  function envelopeOk(e, id) {
    return record(e) && e.schema === 1 && e.id === id && typeof e.buildId === 'string' && Number.isFinite(e.createdAt) && e.createdAt > 0 &&
      (e.title == null || typeof e.title === 'string' && e.title.length <= 100) && (e.configuration == null || record(e.configuration)) && validate(e.result);
  }
  function openDb() {
    if (opening) return opening;
    opening = new Promise((resolve, reject) => {
      if (!G.indexedDB || typeof G.indexedDB.open !== 'function') return reject(new Error('IndexedDB non disponibile.'));
      let settled = false, req;
      const timer = G.setTimeout(() => { settled = true; reject(new Error('Archivio delle partite temporaneamente non disponibile.')); }, 4000);
      try { req = G.indexedDB.open(DB, 1); } catch (e) { G.clearTimeout(timer); reject(e); return; }
      req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
      req.onerror = () => { G.clearTimeout(timer); settled = true; reject(req.error || new Error('Archivio delle partite non disponibile.')); };
      req.onblocked = () => { G.clearTimeout(timer); settled = true; reject(new Error('Archivio delle partite temporaneamente bloccato.')); };
      req.onsuccess = () => {
        G.clearTimeout(timer);
        const db = req.result;
        if (settled) { db.close(); return; }
        settled = true;
        db.onversionchange = () => { db.close(); opening = null; };
        resolve(db);
      };
    }).catch((e) => { opening = null; throw e; });
    return opening;
  }
  function readDb(db, id) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly'), req = tx.objectStore(STORE).get(id);
      let value;
      req.onsuccess = () => { value = req.result; };
      tx.oncomplete = () => resolve(value);
      tx.onerror = tx.onabort = () => reject(tx.error || req.error || new Error('Impossibile leggere la partita salvata.'));
    });
  }
  function writeDb(db, envelope) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite'), store = tx.objectStore(STORE), req = store.get(envelope.id);
      let saved = envelope, conflict = false;
      req.onsuccess = () => {
        if (req.result !== undefined) {
          if (!envelopeOk(req.result, envelope.id) || JSON.stringify(req.result.result) !== JSON.stringify(envelope.result)) { conflict = true; tx.abort(); return; }
          saved = req.result;
        } else store.add(envelope, envelope.id);
      };
      tx.oncomplete = () => resolve(saved);
      tx.onerror = tx.onabort = () => reject(new Error(conflict ? 'Una partita salvata non può essere sostituita: usa un nuovo identificativo.' : 'Impossibile salvare la partita nell’archivio del browser.'));
    });
  }
  // JSON non conserva undefined, -0 o buchi negli array: i percorsi mantengono il
  // risultato originale nel ripiego locale, senza toccare i salvataggi precedenti.
  function encode(e) {
    const paths = [], negativeZeros = [], holes = [];
    const walk = (x, p) => {
      if (x === undefined) { paths.push(p); return null; }
      if (Object.is(x, -0)) { negativeZeros.push(p); return 0; }
      if (Array.isArray(x)) return Array.from({ length: x.length }, (_, i) => {
        if (!own(x, i)) { holes.push(p.concat(i)); return null; }
        return walk(x[i], p.concat(i));
      });
      if (record(x)) return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v, p.concat(k))]));
      return x;
    };
    return JSON.stringify({ codec: 1, snapshot: walk(e, []), undefinedPaths: paths, negativeZeros, holes });
  }
  function decode(raw) {
    try {
      const data = JSON.parse(raw);
      if (!record(data) || data.codec !== 1 || !record(data.snapshot) || !Array.isArray(data.undefinedPaths)) return null;
      const restore = (p, type) => {
        if (!Array.isArray(p) || !p.length || p.length > 80) return null;
        if (!p.every((k) => typeof k === 'string' || integer(k))) return null;
        let x = data.snapshot;
        for (const k of p.slice(0, -1)) { if (x == null || !own(x, k)) return null; x = x[k]; }
        const k = p[p.length - 1]; if (x == null || !own(x, k) || x[k] !== (type === 'zero' ? 0 : null)) return null;
        if (type === 'hole') { if (!Array.isArray(x) || !integer(k)) return null; delete x[k]; }
        else Object.defineProperty(x, k, { value: type === 'zero' ? -0 : undefined, writable: true, enumerable: true, configurable: true });
        return true;
      };
      if (!data.undefinedPaths.every((p) => restore(p, 'undefined'))) return null;
      if (data.negativeZeros != null && (!Array.isArray(data.negativeZeros) || !data.negativeZeros.every((p) => restore(p, 'zero')))) return null;
      if (data.holes != null && (!Array.isArray(data.holes) || !data.holes.every((p) => restore(p, 'hole')))) return null;
      return data.snapshot;
    } catch (e) { return null; }
  }
  function readLocal(id) {
    const raw = G.localStorage.getItem(PREFIX + id);
    return raw == null ? null : decode(raw);
  }
  function writeLocal(e) {
    const raw = G.localStorage.getItem(PREFIX + e.id);
    if (raw != null) {
      const old = decode(raw);
      if (!envelopeOk(old, e.id) || JSON.stringify(old.result) !== JSON.stringify(e.result)) throw new Error('Una partita salvata non può essere sostituita: usa un nuovo identificativo.');
      return old;
    }
    // setItem è atomico: se la quota è esaurita, il precedente replay resta intatto.
    G.localStorage.setItem(PREFIX + e.id, encode(e)); return e;
  }
  function createId() {
    return 'r-' + (G.crypto && typeof G.crypto.randomUUID === 'function' ? G.crypto.randomUUID() : Date.now().toString(36) + '-' + (++serial).toString(36) + '-' + Math.random().toString(36).slice(2, 12));
  }
  async function save(id, result, meta = {}) {
    if (!replayIdOk(id)) throw new Error('Identificativo della partita non valido.');
    const e = { schema: 1, id, buildId: meta.buildId == null ? String(G.LOS_BUILD || 'sviluppo') : meta.buildId, createdAt: meta.createdAt == null ? Date.now() : meta.createdAt, result: copy(result) };
    if (meta.title != null) e.title = String(meta.title).trim().slice(0, 100);
    if (meta.configuration != null) e.configuration = copy(meta.configuration);
    if (!envelopeOk(e, id)) throw new Error('Il risultato della partita non è valido e non è stato salvato.');
    // Un replay nato nel ripiego locale resta immutabile anche se IndexedDB
    // diventa disponibile in un'apertura successiva del browser.
    let local;
    try { local = readLocal(id); } catch (err) { /* IndexedDB può funzionare anche con localStorage disabilitato. */ }
    if (local) {
      if (!envelopeOk(local, id) || JSON.stringify(local.result) !== JSON.stringify(e.result)) throw new Error('Una partita salvata non può essere sostituita: usa un nuovo identificativo.');
      return { id, buildId: local.buildId, createdAt: local.createdAt, storage: 'localStorage' };
    }
    let db;
    try { db = await openDb(); } catch (err) {
      const saved = writeLocal(e); return { id, buildId: saved.buildId, createdAt: saved.createdAt, storage: 'localStorage' };
    }
    const saved = await writeDb(db, e);
    return { id, buildId: saved.buildId, createdAt: saved.createdAt, storage: 'indexedDB' };
  }
  async function readEnvelope(id) {
    if (!replayIdOk(id)) return null;
    let e, db;
    try { db = await openDb(); } catch (err) { e = readLocal(id); return envelopeOk(e, id) ? { e, storage: 'localStorage' } : null; }
    e = await readDb(db, id);
    if (e === undefined) { try { e = readLocal(id); } catch (err) { e = null; } return envelopeOk(e, id) ? { e, storage: 'localStorage' } : null; }
    return envelopeOk(e, id) ? { e, storage: 'indexedDB', db } : null;
  }
  async function load(id) { const stored = await readEnvelope(id); return stored ? copy(stored.e.result) : null; }
  async function entry(id) { const stored = await readEnvelope(id); return stored ? copy(stored.e) : null; }
  async function list() {
    const entries = new Map();
    let db;
    try { db = await openDb(); } catch (e) { /* Il ripiego locale resta consultabile. */ }
    if (db) {
      const all = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly'), req = tx.objectStore(STORE).getAll(); let value = [];
        req.onsuccess = () => { value = req.result; }; tx.oncomplete = () => resolve(value);
        tx.onerror = tx.onabort = () => reject(tx.error || new Error('Impossibile leggere l’archivio.'));
      });
      all.forEach((e) => { if (e && replayIdOk(e.id) && envelopeOk(e, e.id)) entries.set(e.id, e); });
    }
    try {
      for (let i = 0; i < G.localStorage.length; i++) {
        const key = G.localStorage.key(i); if (!key || !key.startsWith(PREFIX)) continue;
        const id = key.slice(PREFIX.length), e = readLocal(id);
        if (!entries.has(id) && replayIdOk(id) && envelopeOk(e, id)) entries.set(id, e);
      }
    } catch (e) { if (!db) throw e; }
    return [...entries.values()].sort((a, b) => b.createdAt - a.createdAt || a.id.localeCompare(b.id)).map((e) => ({ id: e.id, title: e.title || '', createdAt: e.createdAt, buildId: e.buildId, theme: e.result.theme, seed: e.result.seed, adult: e.result.adult, days: e.result.days, count: e.result.tributes.length }));
  }
  async function rename(id, title) {
    if (typeof title !== 'string' || !title.trim() || title.trim().length > 100) throw new Error('Scegli un nome tra 1 e 100 caratteri.');
    const stored = await readEnvelope(id); if (!stored) throw new Error('Partita non disponibile.');
    const value = title.trim();
    if (stored.storage === 'localStorage') { G.localStorage.setItem(PREFIX + id, encode({ ...stored.e, title: value })); return; }
    await new Promise((resolve, reject) => {
      const tx = stored.db.transaction(STORE, 'readwrite'), store = tx.objectStore(STORE), req = store.get(id);
      req.onsuccess = () => { if (!envelopeOk(req.result, id)) return tx.abort(); store.put({ ...req.result, title: value }, id); };
      tx.oncomplete = resolve; tx.onerror = tx.onabort = () => reject(new Error('Impossibile rinominare la partita.'));
    });
  }
  async function exportReplay(id) {
    const stored = await readEnvelope(id); if (!stored) throw new Error('Partita non disponibile.');
    return encode(stored.e);
  }
  function inspectReplay(raw) {
    if (typeof raw !== 'string' || raw.length > 50000000) throw new Error('Il replay deve essere un JSON di massimo 50 MB.');
    const e = decode(raw);
    if (!e || !replayIdOk(e.id) || !envelopeOk(e, e.id) || e.result.tributes.length > 200 || e.result.phases.length > 500) throw new Error('Replay non valido o formato non supportato.');
    return e;
  }
  async function importReplay(raw) {
    const e = inspectReplay(raw);
    const id = createId();
    await save(id, e.result, { buildId: e.buildId, createdAt: e.createdAt, title: e.title, configuration: e.configuration });
    return id;
  }
  G.LOS_REPLAY = { createId, save, load, validate, entry, list, rename, exportReplay, inspectReplay, importReplay };
})(typeof window === 'object' ? window : globalThis);
