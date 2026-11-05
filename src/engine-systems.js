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
        dmg *= 0.62;
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
    const capInv = (t) => { while (t.inv.length > 8) { const k = t.inv.findIndex((x) => x.type !== 'ricordo'); t.inv.splice(k >= 0 ? k : 0, 1); } };
    const itemName = (type) => {
      const n = ((IT.names || {})[theme.id] || {})[type] || ((IT.names || {})._ || {})[type];
      if (n && n.length) return rng.pick(n);
      return ITEM_NAME[type] || rng.pick(LEX[type] || ['qualcosa']);
    };
    const maxUses = (type, q) => (type === 'arma' ? Math.max(2, Math.round((2 + (q || 2) * 2) / (MOD.wear || 1))) : type === 'armatura' ? 3 : 0);
    function mkItem(type, name, how, from, q) {
      const it = { type, name: name || itemName(type), how: how || getOrigin() || 'trovato', from: from ? from.id : null, d: getDay() };
      if (type === 'arma') it.q = q || clamp(Math.round(0.7 + rng.f() * 2.2 * MOD.weapon), 1, 3);
      const mu = maxUses(type, it.q); if (mu) { it.u = mu; it.um = mu; }
      return it;
    }
    const itemScore = (it) => (it.q || 2) * 10 + (it.u || 0) + (it.x ? 5 : 0);
    function canReceiveItem(t, it) {
      if (!t || !t.alive) return false;
      const old = itemOf(t, it.type);
      if ((it.type === 'arma' || it.type === 'armatura') && old && itemScore(old) >= itemScore(it)) return false;
      // capInv eliminerebbe proprio l'oggetto ricevuto da uno zaino pieno di ricordi.
      return !(t.inv.length >= 8 && it.type !== 'ricordo' && t.inv.every((x) => x.type === 'ricordo'));
    }
    function addItem(t, it) {
      if (it.type === 'arma' || it.type === 'armatura') {
        const old = itemOf(t, it.type);
        if (old) { if (itemScore(old) >= itemScore(it)) return false; t.inv.splice(t.inv.indexOf(old), 1); }
      }
      t.inv.push(it); capInv(t); return true;
    }
    function takeItem(t, it) { const k = t.inv.indexOf(it); if (k >= 0) t.inv.splice(k, 1); return it; }
    return { capInv, itemName, maxUses, mkItem, itemScore, canReceiveItem, addItem, takeItem };
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

  const api = { eventVariety, createMemory, createVitals, createInventory, createSnapshots, createItemLedger };
  G.LOS_SYSTEMS = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'object' ? window : globalThis);
