/* Last One Standing — le stanze della festa online (src/festa.js).
 * Una stanza è un piccolo albero di dati condiviso: l'host scrive la configurazione e lo stato della diretta,
 * gli ospiti entrano, scelgono il campione e rispondono alle richieste. Il motore è deterministico: in rete viaggiano
 * solo seme, configurazione (senza foto) e interventi; ogni dispositivo ricalcola la partita da sé.
 *
 * Due trasporti con la stessa interfaccia:
 *  - Firebase Realtime Database, via REST e flusso di eventi (nessuna libreria): basta l'indirizzo del database;
 *  - «locale»: BroadcastChannel tra schede dello stesso browser, per provare senza server.
 * Struttura della stanza: meta, cfg, ingressi/<ospite>, stato, richieste/<id>, risposte/<id>, azioni/<id>. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const SKEY = 'los-festa-server';
  const ALFA = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const codice = () => Array.from({ length: 4 }, () => ALFA[Math.floor(Math.random() * ALFA.length)]).join('');
  const nuovoId = (p) => (p || 'x') + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const server = () => { try { return G.localStorage.getItem(SKEY) || ''; } catch (e) { return ''; } };
  const setServer = (u) => { try { if (u) G.localStorage.setItem(SKEY, u); else G.localStorage.removeItem(SKEY); } catch (e) { /* niente */ } };
  // l'indirizzo del database: https://<progetto>-default-rtdb.<regione>.firebasedatabase.app (o .firebaseio.com)
  function serverValido(u) {
    if (u === 'locale') return true;
    try { const x = new URL(u); return x.protocol === 'https:' && /(\.firebaseio\.com|\.firebasedatabase\.app)$/.test(x.hostname); } catch (e) { return false; }
  }
  const okCodice = (c) => /^[A-Z]{4}$/.test(c);

  /* ---------- l'albero locale: si applicano scritture per percorso ---------- */
  function applica(tree, path, val, merge) {
    const parts = String(path || '').split('/').filter(Boolean);
    if (!parts.length) { if (merge && val && typeof val === 'object') { Object.keys(val).forEach((k) => applica(tree, k, val[k])); return tree; } return val == null ? {} : JSON.parse(JSON.stringify(val)); }
    let o = tree;
    for (let i = 0; i < parts.length - 1; i++) { if (!o[parts[i]] || typeof o[parts[i]] !== 'object') o[parts[i]] = {}; o = o[parts[i]]; }
    const k = parts[parts.length - 1];
    if (merge && val && typeof val === 'object') { if (!o[k] || typeof o[k] !== 'object') o[k] = {}; Object.keys(val).forEach((x) => { if (val[x] == null) delete o[k][x]; else o[k][x] = JSON.parse(JSON.stringify(val[x])); }); }
    else if (val == null) delete o[k]; else o[k] = JSON.parse(JSON.stringify(val));
    return tree;
  }

  /* ---------- trasporto locale (schede dello stesso browser) ---------- */
  function locale(code, role) {
    let tree = {}; const subs = new Set(), ch = new BroadcastChannel('los-stanza-' + code);
    const emit = () => subs.forEach((f) => { try { f(tree); } catch (e) { /* niente */ } });
    ch.onmessage = (e) => {
      const m = e.data || {};
      if (m.op === 'hello' && role === 'host') ch.postMessage({ op: 'full', tree });
      else if (m.op === 'full' && role !== 'host') { tree = m.tree || {}; emit(); }
      else if (m.op === 'set' || m.op === 'patch') { tree = applica(tree, m.path, m.val, m.op === 'patch'); emit(); }
    };
    const write = (op, path, val) => { tree = applica(tree, path, val, op === 'patch'); ch.postMessage({ op, path, val }); emit(); return Promise.resolve(); };
    if (role !== 'host') ch.postMessage({ op: 'hello' });
    return { set: (p, v) => write('set', p, v), patch: (p, v) => write('patch', p, v), on: (f) => { subs.add(f); f(tree); return () => subs.delete(f); }, get: () => tree, close: () => { subs.clear(); ch.close(); }, tipo: 'locale' };
  }

  /* ---------- trasporto Firebase (REST + flusso di eventi) ---------- */
  function firebase(base, code) {
    const root = base.replace(/\/+$/, '') + '/stanze/' + code;
    let tree = {}, es = null, closed = false, retry = 0; const subs = new Set();
    const emit = () => subs.forEach((f) => { try { f(tree); } catch (e) { /* niente */ } });
    function listen() {
      if (closed) return;
      es = new EventSource(root + '.json');
      const on = (merge) => (e) => { try { const d = JSON.parse(e.data); tree = applica(tree, d.path, d.data, merge); retry = 0; emit(); } catch (x) { /* niente */ } };
      es.addEventListener('put', on(false)); es.addEventListener('patch', on(true));
      es.addEventListener('cancel', () => { es.close(); });
      es.onerror = () => { if (closed) return; es.close(); setTimeout(listen, Math.min(8000, 800 * ++retry)); };
    }
    listen();
    // ogni scrittura riprova fino a tre volte: una rete ballerina non deve far perdere una risposta
    const write = (method, path, val, tent) => fetch((path ? root + '/' + path : root) + '.json', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(val) })
      .then((r) => { if (!r.ok) throw new Error('Il server ha risposto ' + r.status); })
      .catch((e) => { const n = (tent || 0) + 1; if (n >= 3 || /\b4\d\d\b/.test(e.message)) throw e; return new Promise((res) => setTimeout(res, 400 * n * n)).then(() => write(method, path, val, n)); });
    return {
      set: (p, v) => { tree = applica(tree, p, v); emit(); return write(v == null ? 'DELETE' : 'PUT', p, v == null ? undefined : v).catch((e) => { if (G.LOS_FESTA && G.LOS_FESTA.onerror) G.LOS_FESTA.onerror(e); }); },
      patch: (p, v) => { tree = applica(tree, p, v, true); emit(); return write('PATCH', p, v).catch((e) => { if (G.LOS_FESTA && G.LOS_FESTA.onerror) G.LOS_FESTA.onerror(e); }); },
      on: (f) => { subs.add(f); f(tree); return () => subs.delete(f); }, get: () => tree,
      close: () => { closed = true; subs.clear(); if (es) es.close(); }, tipo: 'firebase',
    };
  }

  function stanza(code, role) {
    const u = server();
    if (!okCodice(code)) throw new Error('Codice della stanza non valido.');
    if (u === 'locale') return locale(code, role);
    if (!serverValido(u)) throw new Error('Manca l’indirizzo del server: aprilo nelle impostazioni della festa.');
    return firebase(u, code);
  }

  // una richiesta a un ospite e l'attesa della risposta (o del tempo scaduto); ctl.annulla() smette di aspettare
  function chiediA(room, gid, card, ms, ctl) {
    const rid = nuovoId('r');
    return new Promise((resolve) => {
      let done = false, off = null;
      const end = (v) => { if (done) return; done = true; if (off) off(); clearTimeout(t); room.set('richieste/' + rid, null); room.set('risposte/' + rid, null); resolve(v); };
      if (ctl) ctl.annulla = () => end(null);
      const t = setTimeout(() => end(null), ms || 30000);
      off = room.on((tree) => { const r = tree.risposte && tree.risposte[rid]; if (r) end(r.value === undefined || r.value === '__salta__' ? null : r); });
      room.set('richieste/' + rid, { gid, card, durata: ms || 30000 });
    });
  }

  /* ---------- la sessione: chi ricarica la pagina rientra da solo nella sua stanza ---------- */
  const SESS = 'los-festa-sessione';
  const salvaSessione = (s) => { try { G.localStorage.setItem(SESS, JSON.stringify(s)); } catch (e) { /* niente */ } };
  const leggiSessione = () => { try { const s = JSON.parse(G.localStorage.getItem(SESS) || 'null'); return s && okCodice(s.code) && (s.role === 'host' || s.role === 'guest') ? s : null; } catch (e) { return null; } };
  const cancellaSessione = () => { try { G.localStorage.removeItem(SESS); } catch (e) { /* niente */ } };

  /* ---------- il battito: l'ospite dice «ci sono» ogni pochi secondi (un contatore, non l'ora: gli orologi differiscono) ---------- */
  function battito(room, gid) {
    let n = 0;
    const beat = () => room.patch('ingressi/' + gid, { battito: ++n });
    beat(); const t = setInterval(beat, 6000);
    return () => clearInterval(t);
  }

  /* ---------- le foto dei concorrenti in rete: ridotte a una miniatura leggera ---------- */
  function riduci(src, lato) {
    lato = lato || 224;
    return new Promise((resolve) => {
      if (!src || !/^data:image\//.test(src)) return resolve('');
      const im = new Image();
      im.onload = () => {
        try {
          const s = Math.min(1, lato / Math.max(im.naturalWidth, im.naturalHeight)), w = Math.max(1, Math.round(im.naturalWidth * s)), h = Math.max(1, Math.round(im.naturalHeight * s));
          const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(im, 0, 0, w, h);
          let out = c.toDataURL('image/webp', 0.82); if (!/^data:image\/webp/.test(out)) out = c.toDataURL('image/jpeg', 0.84);
          resolve(out.length < 200000 ? out : '');
        } catch (e) { resolve(''); }
      };
      im.onerror = () => resolve(''); im.src = src;
    });
  }

  G.LOS_FESTA = { codice, nuovoId, server, setServer, serverValido, okCodice, stanza, chiediA, salvaSessione, leggiSessione, cancellaSessione, battito, riduci, onerror: null };
})(typeof window !== 'undefined' ? window : globalThis);
