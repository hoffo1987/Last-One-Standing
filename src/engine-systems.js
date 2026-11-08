/* Sistemi deterministici isolati. Le dipendenze sono esplicite e il RNG è quello della partita. */
(function (G) {
  'use strict';
  function createItemLedger({ phase, meter }) {
    const facts = []; let context = '';
    const state = (t) => {
      const states = new Set(Object.keys(t.st)), set = (s, on) => on ? states.add(s) : states.delete(s);
      set('ferito', t.hp < 55); set('grave', t.hp < 25); set('affamato', t.food < 25); set('esausto', t.en < 22); set('disperato', t.mo < 22);
      if (meter) set(meter.st, meter.infect ? t.infected && t.pr >= meter.thr : t.pr >= meter.thr);
      return { hp: Math.max(0, Math.min(100, t.hp)), en: Math.max(0, Math.min(100, t.en)), mo: Math.max(0, Math.min(100, t.mo)), food: Math.max(0, Math.min(100, t.food)), pr: Math.max(0, Math.min(100, t.pr)), states: [...states].sort(), infected: !!t.infected };
    };
    function record(kind, owner, target, item, before, detail = '') {
      if (!item) return;
      facts.push({ ph: phase(), seq: facts.length, kind, owner: owner.id, who: target.id, item: { t: item.type, n: item.name, h: item.how || 'trovato', f: item.from || null, d: item.d || 0 }, before: before || state(target), after: state(target), detail, context });
    }
    function use(kind, owner, target, item, action, detail) {
      const before = state(target), result = action(); record(kind, owner, target, item, before, detail); return result;
    }
    return { facts, state, record, use, setContext(value) { context = value; } };
  }
  function eventVariety() {
    const counts = new Map(), recent = [];
    const key = (ev) => ev.text.toLowerCase().replace(/\s+/g, ' ').trim();
    return {
      recent: (ev) => recent.includes(key(ev)),
      weight: (ev) => 1 / Math.pow(1 + (counts.get(key(ev)) || 0), 1.5),
      record(ev) { const k = key(ev); counts.set(k, (counts.get(k) || 0) + 1); recent.push(k); if (recent.length > 8) recent.shift(); },
    };
  }


  function createMemory(env) {
    const { phases, BD, tweak, getDay } = env;
    function remember(a, b, k, x, scale) {
      if (!a || !b || a === b) return;
      const l = (a.mem[b.id] = a.mem[b.id] || []);
      if (l.length && l[l.length - 1].k === k && l[l.length - 1].ph === phases.length) return;
      const fact = { ph: phases.length, k, x: x ? x.id : null };
      l.push(fact);
      (a.memoryHistory[b.id] || (a.memoryHistory[b.id] = [])).push(fact);
      if (l.length > 8) l.shift();
      tweak(a, b, (BD.memfx || {})[k], scale);
      tweak(a, b, { k: 4 });
    }
    function remember1(t, html, kind) {
      if (!t || !html) return;
      t.diary.push({ ph: phases.length, d: getDay(), h: html, k: kind || 'pensiero' });
      // Il diario è un documento storico, non una coda di lavoro: le pagine
      // precedenti restano disponibili anche nelle partite più lunghe.
    }
    return { remember, remember1 };
  }

  function createVitals(env) {
    const { phases, clamp, M, hasTrait, DR, rng, stats, sys, possessive, itemOf, takeItem, itemLedger } = env;
    const props = env.props || (() => ({}));
    function syncSt(t) {
      const ph = phases.length;
      const set = (k, on) => { if (on) { if (t.st[k] == null) t.st[k] = ph; } else delete t.st[k]; };
      t.hp = Math.min(100, t.hp); t.en = clamp(t.en, 0, 100); t.mo = clamp(t.mo, 0, 100); t.food = clamp(t.food, 0, 100); t.pr = clamp(t.pr, 0, 100);
      set('ferito', t.hp < 55); set('grave', t.hp < 25); set('affamato', t.food < 25); set('esausto', t.en < 22); set('disperato', t.mo < 22);
      if (t.st.avvelenato == null) t.poisonSource = null;
      if (M) set(M.st, M.infect ? t.infected && t.pr >= M.thr : t.pr >= M.thr);
    }
    function hurt(t, dmg, by, cause, inTick) {
      if (!t.alive) return;
      dmg *= Math.max(0.55, 1.2 - t.attr.res * 0.04) * (hasTrait(t, 'sopravvissuto') ? 0.85 : 1);
      const ar = itemOf(t, 'armatura');
      if (ar && dmg >= 8) {
        const before = itemLedger.state(t), unprotected = dmg;
        dmg *= Math.max(0.3, 0.62 - (props(ar).assorbe || 0) / 100);
        itemLedger.record('absorb', t, t, ar, before, 'Danno calcolato ridotto da ' + unprotected.toFixed(2) + ' a ' + dmg.toFixed(2) + '; prima di limiti alla salute'); ar.u = (ar.u || 1) - 1;
        if (ar.u <= 0) { takeItem(t, ar); sys('armorBreak', [t], { i: ar.name, ip: possessive(ar) }, { cat: 'hurt', why: 'oggetto' }, 1); }
      }
      const hp0 = t.hp;
      t.hp -= dmg; if (!inTick) t.hp = Math.max(Math.min(8, hp0), t.hp);
      t.hurtPh = phases.length;
      if (by && by !== t) t.cause = { k: cause === 'trap' ? 'trap' : 'wound', by: by.id, ph: phases.length };
      else if (cause && !(inTick && t.cause && t.cause.k === cause && t.cause.by)) t.cause = { k: cause, ph: phases.length, by: null };
      if (M && M.infect && !t.infected && (cause === 'wound' || cause === 'beast' || by) && rng.chance(M.infect * Math.max(0.4, 1.2 - t.attr.res * 0.05))) {
        t.infected = true; t.pr = Math.max(t.pr, 8); stats.infected++;
        sys('infect', [t], {}, { cat: 'hurt', why: 'infezione' }, 3);
      }
      t.mo -= Math.min(10, dmg / 4);
      syncSt(t);
    }
    return { syncSt, hurt };
  }

  function createInventory(env) {
    const { IT, theme, ITEM_NAME, LEX, rng, MOD, itemOf, clamp, getDay, getOrigin } = env;
    // peso, capienza ed effetti degli oggetti (dal catalogo); senza catalogo valgono le regole di prima
    const props = env.props || (() => ({})), slots = env.slots || (() => 0), cap = env.cap || (() => Infinity), onDrop = env.onDrop || null;
    const MAX_ITEMS = 8;
    const sum = (o) => (o ? Object.values(o).reduce((s, v) => s + v, 0) : 0);
    // quanto conviene tenere un oggetto adesso: le cure valgono di più a chi è ferito, il cibo a chi ha fame
    function keepScore(t, it) {
      const P = props(it);
      const base = { arma: 30 + (it.q || 2) * 8, armatura: 28, med: t.hp < 60 ? 46 : 30, cibo: t.food < 50 ? 38 : 22, attrezzo: 18, mappa: 16, trap: 14, amuleto: 12, valore: 8, ricordo: 60, alcol: 6, veleno: 10, esplosivo: 14 }[it.type] || 10;
      return base + sum(P.prova) * 3 + (P.belve || 0) * 2 + (P.indicatore || 0) / 5 + (P.forza || 0) * 6 + (P.assorbe || 0) / 3 + (P.scambio || 0) * 3 + (P.morale || 0) + (P.raccolta || 0) / 3 + (it.u || 0) - Math.max(0, slots(it) - 1) * 2;
    }
    // l'oggetto da lasciare quando lo zaino supera gli otto oggetti o il peso sopportabile (mai prima un ricordo)
    function victim(t, list) {
      const n = list.length, w = list.reduce((s2, x) => s2 + slots(x), 0);
      if (n <= MAX_ITEMS && w <= cap(t)) return null;
      const pool = list.filter((x) => x.type !== 'ricordo' && (n > MAX_ITEMS || slots(x) > 0));
      if (!pool.length) return list[0];
      return pool.reduce((a, b) => (keepScore(t, b) < keepScore(t, a) ? b : a));
    }
    const capInv = (t) => { for (let guard = 0; guard < 30; guard++) { const v = victim(t, t.inv); if (!v) break; t.inv.splice(t.inv.indexOf(v), 1); if (onDrop) onDrop(t, v); } };
    const itemName = (type) => {
      const n = ((IT.names || {})[theme.id] || {})[type] || ((IT.names || {})._ || {})[type];
      if (n && n.length) return rng.pick(n);
      return ITEM_NAME[type] || rng.pick(LEX[type] || ['qualcosa']);
    };
    const maxUses = (type, q) => (type === 'arma' ? Math.max(2, Math.round((2 + (q || 2) * 2) / (MOD.wear || 1))) : type === 'armatura' ? 3 : 0);
    function mkItem(type, name, how, from, q) {
      const it = { type, name: name || itemName(type), how: how || getOrigin() || 'trovato', from: from ? from.id : null, d: getDay() };
      if (type === 'arma') it.q = q || clamp(Math.round(0.7 + rng.f() * 2.2 * MOD.weapon), 1, 3);
      const mu = maxUses(type, it.q); if (mu) { it.u = Math.max(1, mu + (props(it).usi || 0)); it.um = it.u; }
      return it;
    }
    const itemScore = (it) => { const P = props(it); return (it.q || 2) * 10 + (it.u || 0) + (it.x ? 5 : 0) + (P.forza || 0) * 8 + (P.assorbe || 0) / 2; };
    function canReceiveItem(t, it) {
      if (!t || !t.alive) return false;
      const old = itemOf(t, it.type);
      if ((it.type === 'arma' || it.type === 'armatura') && old && itemScore(old) >= itemScore(it)) return false;
      // si accetta solo se, a zaino pieno, non sarebbe proprio questo l'oggetto da lasciare
      return victim(t, t.inv.filter((x) => !((it.type === 'arma' || it.type === 'armatura') && x === old)).concat([it])) !== it;
    }
    function addItem(t, it) {
      if (it.type === 'arma' || it.type === 'armatura') {
        const old = itemOf(t, it.type);
        if (old) { if (itemScore(old) >= itemScore(it)) return false; t.inv.splice(t.inv.indexOf(old), 1); }
      }
      t.inv.push(it); capInv(t); return true;
    }
    function takeItem(t, it) { const k = t.inv.indexOf(it); if (k >= 0) t.inv.splice(k, 1); return it; }
    const load = (t) => t.inv.reduce((s2, x) => s2 + slots(x), 0);
    return { capInv, itemName, maxUses, mkItem, itemScore, canReceiveItem, addItem, takeItem, load, keepScore };
  }

  function createSnapshots(env) {
    const { T, syncSt, aff, relTop, alive, closed, edges, M, byId } = env;
    function snapshot() {
      const zones = {}, allies = {}, st = {}, inv = {}, kills = {}, rel = {}, vit = {}, mind = {};
      T.forEach((t) => {
        if (t.alive) syncSt(t);
        zones[t.id] = t.zone; allies[t.id] = t.allyId; st[t.id] = Object.keys(t.st); inv[t.id] = t.inv.map((x) => { const o = { t: x.type, n: x.name, h: x.how || 'trovato' }; if (x.q) o.q = x.q; if (x.u != null) { o.u = x.u; o.m = x.um; } if (x.from) o.f = x.from; if (x.d) o.d = x.d; if (x.x) o.x = x.x; return o; }); kills[t.id] = t.kills;
        if (t.alive && t.goal) mind[t.id] = { g: t.goal.k, tg: t.goal.tg, since: t.goal.ph, th: t.thought };
        if (t.alive) vit[t.id] = [Math.round(Math.max(0, t.hp)), Math.round(t.en), Math.round(t.mo), Math.round(t.food), M && (!M.infect || t.infected) ? Math.round(t.pr) : -1];
        const friends = T.filter((u) => u !== t && u.alive && aff(t, u) >= 40).map((u) => u.id);
        const enemies = T.filter((u) => u !== t && u.alive && aff(t, u) <= -40 && !t.grudges[u.id]).map((u) => u.id);
        rel[t.id] = { p: t.partner, g: Object.keys(t.grudges).filter((id) => byId[id].alive).map((id) => [id, t.grudges[id].why, t.grudges[id].victim]), o: Object.keys(t.owes).filter((id) => byId[id].alive), f: t.fame, tr: t.traitor, fr: friends, en: enemies, lost: t.lost, top: t.alive ? relTop(t) : [] };
      });
      return { alive: alive().map((t) => t.id), zones, allies, st, inv, kills, rel, vit, mind, closed: [...closed], edges: edges() };
    }

    return { snapshot };
  }

  // I piani restano nella chiusura: nessuna intenzione entra in istantanee,
  // diari, grafi o cronaca prima che qualcuno passi davvero all'azione.
  function createIntrigue({ rng, people, phase, day, ally, like, teamWin }) {
    const pending = [], counts = new Map();
    let prepared = 0;
    const trait = (t, k) => t.traits.includes(k);
    const opponent = (a, b) => a !== b && a.partner !== b.id && !(teamWin && a.team === b.team);
    const willing = (a, b) => opponent(a, b) && (!trait(a, 'pacifista') || !!a.grudges[b.id]) && (!ally(a, b) || !trait(a, 'leale') && !trait(a, 'pacifista') && (trait(a, 'traditore') || like(a, b) <= -20));
    function prepare() {
      const living = people.filter(t => t.alive);
      // pochi piani, ma che contano: circa uno ogni tre concorrenti, al massimo tre in attesa
      if (living.length < 2 || pending.length >= 3 || prepared >= Math.max(3, Math.ceil(people.length / 3)) || !rng.chance(0.6)) return false;
      const candidates = [];
      for (const owner of living) {
        if (pending.some(p => p.owner === owner) || (counts.get(owner.id) || 0) >= 2) continue;
        const devious = trait(owner, 'traditore') || trait(owner, 'stratega') || trait(owner, 'ingegnoso') || trait(owner, 'paranoico');
        for (const target of living) {
          if (owner.zone !== target.zone || !willing(owner, target)) continue;
          const betrayal = ally(owner, target);
          const helpers = living.filter(h => h !== owner && h !== target && h.zone === owner.zone && willing(h, target) && (ally(owner, h) || like(owner, h) >= 20));
          const item = target.inv.find(it => it.type === 'arma');
          const kinds = ['imboscata'];
          if (item && (owner.attr.int >= 7 || owner.inv.some(it => it.type === 'attrezzo'))) kinds.push('sabotaggio');
          if (helpers.length) kinds.push('patto');
          candidates.push({ owner, target, helpers, item, kinds, weight: 1 + (devious ? 4 : 0) + (owner.grudges[target.id] ? 4 : 0) + (betrayal ? 2 : 0) + (living.length <= 6 ? 2 : 0) });
        }
      }
      const c = rng.wpick(candidates, c => c.weight);
      if (!c) return false;
      const type = rng.pick(c.kinds);
      pending.push({ type, owner: c.owner, target: c.target, helper: type === 'patto' ? rng.pick(c.helpers) : null, item: type === 'sabotaggio' ? c.item : null, ph: phase(), day: day(), zone: c.owner.zone });
      counts.set(c.owner.id, (counts.get(c.owner.id) || 0) + 1); prepared++;
      return true;
    }
    function take(finale = false) {
      for (let i = pending.length - 1; i >= 0; i--) {
        const p = pending[i];
        if (!p.owner.alive || !p.target.alive || !willing(p.owner, p.target) || p.helper && (!p.helper.alive || !willing(p.helper, p.target)) || p.item && !p.target.inv.includes(p.item)) pending.splice(i, 1);
      }
      const living = people.filter(t => t.alive).length;
      const ready = pending.filter(p => phase() - p.ph >= (finale ? 1 : 2) && p.owner.zone === p.target.zone && (!p.helper || p.helper.zone === p.owner.zone));
      const p = rng.pick(ready);
      if (!p || !finale && !rng.chance(living <= 6 ? 0.8 : phase() - p.ph >= 6 ? 0.45 : 0.12)) return null;
      pending.splice(pending.indexOf(p), 1);
      return p;
    }
    return { prepare, take };
  }

  function createWorldMemory(){
    const facts=[],personal=new Map(),local=new Map(),shared=new Map();
    const key=(id,zone)=>JSON.stringify([id,zone]);
    const pair=(a,b)=>JSON.stringify([a,b].sort());
    function risk(id,zone){
      return Math.min(3,local.get(key(id,zone))||0);
    }
    function previous(actors,zone){
      const candidates=new Map();
      for(let i=0;i<actors.length;i++)for(let j=i+1;j<actors.length;j++){const f=shared.get(pair(actors[i],actors[j]));if(f)candidates.set(f.id,{f,score:6+(f.zone===zone?2:0)+(f.deaths.length?2:0)+f.id/1000000});}
      for(const id of actors)for(const f of (personal.get(id)||[]).slice(-40)){
        const common=f.actors.filter(x=>actors.includes(x)).length;
        if(common>=2||f.zone===zone&&(f.deaths.length||f.category==='hurt'||f.category==='heal'))candidates.set(f.id,{f,score:common*3+(f.zone===zone?2:0)+(f.deaths.length?2:0)+f.id/1000000});
      }
      return [...candidates.values()].sort((a,b)=>b.score-a.score).slice(0,2).map(x=>x.f);
    }
    function record(event,ph,day,visible=true){
      if(event.note||!event.place||event.place.zone==null||!event.ids?.length)return null;
      // Un attore nominato come fonte remota non diventa un testimone locale.
      const actors=[...new Set(event.ids.filter(id=>event.place.positions[id]===event.place.zone))];
      if(!actors.length)return null;
      const parents=previous(actors,event.place.zone).map(f=>f.id);
      const fact={id:facts.length,ph,day,seq:event.place.seq,zone:event.place.zone,actors,category:event.cat||'none',plain:event.plain,deaths:(event.deaths||[]).slice(),parents,visible};
      facts.push(fact);
      for(let i=0;i<actors.length;i++)for(let j=i+1;j<actors.length;j++)shared.set(pair(actors[i],actors[j]),fact);
      for(const id of actors){if(!personal.has(id))personal.set(id,[]);personal.get(id).push(fact);const k=key(id,fact.zone);local.set(k,(local.get(k)||0)+(fact.deaths.length?1.2:fact.category==='hurt'?0.5:0));}
      event.memoryId=fact.id;
      if(parents.length)event.memoryRefs=parents;
      return fact;
    }
    function weight(event,person){
      const danger=risk(person.id,person.zone);if(!danger)return 1;
      const cautious=(person.traits||[]).some(t=>['codardo','stratega','paranoico','sopravvissuto'].includes(t));
      if(cautious&&(event.lethal||event.tags?.includes('agg')))return 1/(1+danger*0.3);
      if(event.tags?.some(t=>['heal','cow','food'].includes(t)))return 1+danger*0.15;
      return 1;
    }
    function describe(refs,zones){return refs.map(f=>'Giorno '+f.day+', '+zones[f.zone].name+': '+f.plain).join(' ');}
    return {data:{version:1,facts},risk,previous,record,weight,describe};
  }

  const api = { createIntrigue, createWorldMemory, eventVariety, createMemory, createVitals, createInventory, createSnapshots, createItemLedger };
  G.LOS_SYSTEMS = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'object' ? window : globalThis);
