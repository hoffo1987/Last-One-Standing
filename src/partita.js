/* Last One Standing — la partita giocata (src/partita.js).
 * Tutto ciò che il giocatore fa durante la Diretta: crediti, puntate live, doni degli sponsor, ordini del mentore,
 * interviste prima dei giochi, e il «cartello» che ferma la riproduzione per chiedere una scelta.
 * Logica e schermate di base; la regia visiva sta in src/skin/60-partita.css (+ js).
 * Le scelte che cambiano la storia diventano interventi in cfg.interventi: ui.js rilancia la simulazione
 * con lo stesso seme (il passato non cambia, vedi tools/test-interventi.js). */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const R1 = (x) => Math.round(x * 10) / 10;
  const RITMI = ['spettatore', 'giocatore', 'regista'];
  const START = 100;
  const PROFILE_KEY = 'los-profilo-v1';

  /* ================= il cartello delle scelte =================
   * chiedi({ kicker, title, text, faces, options:[{ value, label, sub, cost, html, disabled }], grid, stake:[..], timer, skip })
   * → Promise<{ value, stake } | null>. null = «lascia fare» (anche allo scadere del tempo). */
  let open = null;
  function chiedi(o) {
    if (open) open.close(null);
    return new Promise((resolve) => {
      const root = document.createElement('div');
      root.className = 'sc' + (o.cls ? ' ' + o.cls : '');
      root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'scT');
      const opts = o.options || [];
      const stake = Array.isArray(o.stake) && o.stake.length ? o.stake : null;
      let stakeV = stake ? (o.stakeDefault != null && stake.includes(o.stakeDefault) ? o.stakeDefault : stake[0]) : null;
      root.innerHTML = '<div class="sc-back"></div><div class="sc-card" tabindex="-1">' +
        '<div class="sc-head">' + (o.kicker ? '<span class="sc-k">' + esc(o.kicker) + '</span>' : '') + '<h2 class="sc-t" id="scT">' + esc(o.title || '') + '</h2>' + (o.text ? '<p class="sc-x">' + o.text + '</p>' : '') + '</div>' +
        (o.faces ? '<div class="sc-faces">' + o.faces + '</div>' : '') +
        '<div class="sc-opts' + (o.grid ? ' sc-grid' : '') + '" role="group" aria-label="' + esc(o.title || 'Scelte') + '">' + opts.map((x, k) =>
          '<button type="button" class="sc-opt" data-k="' + k + '"' + (x.disabled ? ' disabled' : '') + '>' +
          (k < 9 && !o.grid ? '<span class="sc-n" aria-hidden="true">' + (k + 1) + '</span>' : '') +
          (x.html || '<b class="sc-l">' + esc(x.label) + '</b>' + (x.sub ? '<small class="sc-s">' + esc(x.sub) + '</small>' : '')) +
          (x.cost != null ? '<em class="sc-cost">' + esc(x.cost) + '</em>' : '') + '</button>').join('') + '</div>' +
        (stake ? '<div class="sc-stake" role="group" aria-label="Posta"><span>Posta</span>' + stake.map((v) => '<button type="button" data-s="' + v + '" aria-pressed="' + (v === stakeV) + '"' + (o.credits != null && v > o.credits ? ' disabled' : '') + '>' + v + '</button>').join('') + (o.credits != null ? '<span class="sc-wallet">Crediti: <b>' + o.credits + '</b></span>' : '') + '</div>' : '') +
        '<div class="sc-foot">' + (o.timer ? '<span class="sc-timer" aria-hidden="true"><i style="--sc-t:' + o.timer + 's"></i></span>' : '<span></span>') +
        '<button type="button" class="sc-skip">' + esc(o.skip || 'Lascia fare') + '</button></div></div>';
      document.body.appendChild(root);
      document.documentElement.classList.add('sc-on');
      const prevFocus = document.activeElement;
      let timer = 0, done = false;
      function close(v) {
        if (done) return; done = true; clearTimeout(timer);
        document.removeEventListener('keydown', onKey, true);
        root.classList.add('sc-out');
        const kill = () => { root.remove(); if (!document.querySelector('.sc')) document.documentElement.classList.remove('sc-on'); };
        // la grafica può animare l'uscita: la classe resta un attimo, poi il cartello sparisce comunque
        setTimeout(kill, o.outMs != null ? o.outMs : 260);
        if (prevFocus && prevFocus.focus) try { prevFocus.focus({ preventScroll: true }); } catch (e) { /* niente */ }
        open = null;
        resolve(v);
      }
      function pick(k) { const x = opts[k]; if (!x || x.disabled) return; root.querySelectorAll('.sc-opt')[k].classList.add('is-picked'); close({ value: x.value, stake: stakeV }); }
      function onKey(e) {
        e.stopPropagation();
        if (e.key === 'Escape') { e.preventDefault(); close(null); return; }
        const n = parseInt(e.key, 10);
        if (!o.grid && n >= 1 && n <= opts.length && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); pick(n - 1); return; }
        if (e.key === 'Tab') {
          const f = [...root.querySelectorAll('button:not([disabled])')]; if (!f.length) return;
          const i = f.indexOf(document.activeElement);
          if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        }
        e.stopPropagation();
      }
      document.addEventListener('keydown', onKey, true);
      root.addEventListener('click', (e) => {
        const b = e.target.closest('.sc-opt'); if (b) return pick(+b.dataset.k);
        const s = e.target.closest('[data-s]'); if (s && !s.disabled) { stakeV = +s.dataset.s; root.querySelectorAll('[data-s]').forEach((x) => x.setAttribute('aria-pressed', String(x === s))); return; }
        if (e.target.closest('.sc-skip')) close(null);
      });
      if (o.timer) timer = setTimeout(() => close(null), o.timer * 1000);
      // un tocco sul cartello ferma il timer: chi sta scegliendo non deve essere messo fretta
      if (o.timer) root.addEventListener('pointerdown', () => { clearTimeout(timer); root.classList.add('sc-hold'); }, { once: true });
      const first = root.querySelector('.sc-opt:not([disabled])');
      requestAnimationFrame(() => (first || root.querySelector('.sc-card')).focus({ preventScroll: true }));
      open = { close };
      if (G.LOS_PARTITA_FX && G.LOS_PARTITA_FX.card) try { G.LOS_PARTITA_FX.card(root, o); } catch (e) { /* solo grafica */ }
    });
  }
  const aperto = () => !!open;

  /* ================= stato della partita giocata ================= */
  function nuovo(pre) {
    return { v: 1, inizio: Date.now(), crediti: START, mentore: (pre && pre.mentore) || null, puntate: [], doni: {}, chiesto: {}, ordini: [], allievi: [], regia: [], voti: {}, log: [] };
  }
  function sano(g) {
    if (!g || typeof g !== 'object') return nuovo();
    const n = nuovo();
    n.inizio = Number.isFinite(g.inizio) ? g.inizio : 0;
    n.crediti = Number.isFinite(g.crediti) ? clamp(Math.round(g.crediti), 0, 1e6) : START;
    n.mentore = typeof g.mentore === 'string' ? g.mentore : null;
    n.puntate = Array.isArray(g.puntate) ? g.puntate.filter((p) => p && typeof p === 'object').slice(-200) : [];
    n.doni = g.doni && typeof g.doni === 'object' ? g.doni : {};
    n.chiesto = g.chiesto && typeof g.chiesto === 'object' ? g.chiesto : {};
    n.ordini = Array.isArray(g.ordini) ? g.ordini.slice(-200) : [];
    n.allievi = Array.isArray(g.allievi) ? g.allievi.filter((x) => typeof x === 'string').slice(-50) : [];
    n.regia = Array.isArray(g.regia) ? g.regia.filter((x) => x && typeof x.k === 'string').slice(-30) : [];
    n.voti = g.voti && typeof g.voti === 'object' ? g.voti : {};
    n.prove = Array.isArray(g.prove) ? g.prove.slice(-100) : [];
    n.log = Array.isArray(g.log) ? g.log.slice(-100) : [];
    return n;
  }

  /* ================= profilo del giocatore (tra le partite) ================= */
  function profilo() {
    let p = {};
    try { p = JSON.parse(G.localStorage.getItem(PROFILE_KEY) || '{}') || {}; } catch (e) { p = {}; }
    return Object.assign({ v: 1, partite: 0, crediti: 0, record: 0, puntate: 0, vinte: 0, doni: 0, ordini: 0, seguiti: 0, mentoriVincenti: 0, chiuse: [] }, p);
  }
  function salvaProfilo(p) { try { G.localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) { /* memoria piena */ } }
  // a fine partita, una volta sola per partita (chiave: id della partita salvata o seme)
  function chiudiPartita(run, SIM) {
    const g = run && run.gioco; if (!g || !SIM) return null;
    const key = String(g.inizio || run.replayId || run.cfg.seed); const p = profilo();
    if (p.chiuse.includes(key)) return p;
    const pts = g.puntate.filter((x) => x.esito === 'vinta' || x.esito === 'persa');
    p.partite++; p.crediti += g.crediti; p.record = Math.max(p.record, g.crediti);
    p.puntate += pts.length; p.vinte += pts.filter((x) => x.esito === 'vinta').length;
    p.doni += Object.values(g.doni).length; p.ordini += g.ordini.length; p.seguiti += g.ordini.filter((x) => x.obeys).length;
    if (g.mentore && SIM.winners.includes(g.mentore)) p.mentoriVincenti++;
    p.chiuse = p.chiuse.concat([key]).slice(-60);
    salvaProfilo(p); return p;
  }

  /* ================= letture della partita ================= */
  const vivi = (SIM, i) => (SIM.phases[i] ? SIM.phases[i].snap.alive : []);
  const vit = (SIM, i, id) => ((SIM.phases[i] && SIM.phases[i].snap.vit[id]) || [100, 90, 55, 70, -1]);
  // un giorno nuovo comincia quando cambia il numero del giorno (le fasi «caduti» chiudono il giorno prima)
  const nuovoGiorno = (P, k) => k > 0 && P[k] && P[k].kind !== 'fallen' && P[k].day !== P[k - 1].day;
  // ritmo di morte osservato fin qui: eliminazioni per concorrente vivo per giorno
  function tasso(SIM, i) {
    const P = SIM.phases, tot = SIM.tributes.length, alive = vivi(SIM, i).length, d = Math.max(1, P[i].day);
    const dead = tot - alive;
    return clamp(dead / Math.max(1, (tot + alive) / 2) / d, 0.05, 0.6);
  }
  function rischio(SIM, i, id) {
    const v = vit(SIM, i, id), inv = (SIM.phases[i].snap.inv[id] || []).map((x) => x.t);
    let r = tasso(SIM, i) * (v[0] < 40 ? 2 : v[0] < 65 ? 1.35 : 0.85) * (v[3] < 25 ? 1.3 : 1) * (inv.includes('arma') ? 0.8 : 1.12) * (inv.includes('med') ? 0.9 : 1);
    return clamp(r, 0.04, 0.85);
  }
  const quota = (p) => R1(clamp(0.9 / clamp(p, 0.05, 0.95), 1.1, 9));

  /* ================= puntate live ================= */
  // tre proposte costruite sullo stato reale all'inizio del giorno (fase k), mai su ciò che il motore sa del futuro
  function proposte(SIM, k, g, BY, followed, soft) {
    const P = SIM.phases, i = k - 1, day = P[k].day, A = vivi(SIM, i);
    if (A.length < 3) return [];
    const rng = (() => { let h = 2166136261; for (const c of SIM.seed + '|bet|' + k) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1597334677)) >>> 0) / 4294967296; })();
    const pick = (arr) => arr[Math.floor(rng() * arr.length)];
    const out = [], used = new Set();
    // 1. sopravvivenza: il mentore o un seguito, se vivo; altrimenti qualcuno a rischio medio
    const pref = [g.mentore, ...(followed || [])].filter((id) => id && A.includes(id));
    const a = pref[0] || A.slice().sort((x, y) => Math.abs(rischio(SIM, i, x) - 0.3) - Math.abs(rischio(SIM, i, y) - 0.3))[0];
    used.add(a);
    const pa = 1 - rischio(SIM, i, a);
    out.push({ tipo: 'vive', a, giorno: day, q: quota(pa), testo: BY[a].name + ' arriva viv' + (BY[a].gender === 'F' ? 'a' : BY[a].gender === 'N' ? 'ə' : 'o') + ' a domani' });
    // 2. chi cade prima tra due
    const rest = A.filter((x) => !used.has(x));
    const b = pick(rest), c = pick(rest.filter((x) => x !== b));
    if (b && c) {
      const rb = rischio(SIM, i, b), rc = rischio(SIM, i, c), pb = rb / (rb + rc);
      out.push({ tipo: 'prima', a: b, b: c, q: quota(pb * 0.92), testo: (soft ? 'Esce prima ' : 'Cade prima ') + BY[b].name + ' di ' + BY[c].name });
    }
    // 3. il giorno: tradimenti o sangue
    const seenDays = Math.max(1, P[i].day);
    const betrays = P.slice(0, k).reduce((s, ph) => s + ph.events.filter((e) => e.cat === 'betray').length, 0);
    if (rng() < 0.5 && betrays > 0) {
      const pt = clamp(betrays / seenDays, 0.15, 0.8);
      out.push({ tipo: 'tradimento', giorno: day, q: quota(pt), testo: 'Oggi qualcuno tradisce un alleato' });
    } else {
      const exp = tasso(SIM, i) * A.length, n = Math.max(1, Math.round(exp));
      out.push({ tipo: 'sangue', n, giorno: day, q: quota(exp >= n ? 0.55 : 0.42), testo: 'Almeno ' + n + (soft ? (n === 1 ? ' eliminazione' : ' eliminazioni') : (n === 1 ? ' morto' : ' morti')) + ' oggi' });
    }
    return out;
  }
  // una puntata si chiude quando chi guarda arriva al punto in cui l'esito si vede
  function risolvi(SIM, i, g) {
    const P = SIM.phases, last = i >= P.length - 1, by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), out = [];
    const dayOver = (d) => last || (P[i].day > d) || (P[i].kind === 'fallen' && P[i].day >= d);
    g.puntate.forEach((b) => {
      if (b.esito) return;
      let esito = null;
      if (b.tipo === 'vive') { const t = by[b.a]; if (t && !t.alive && t.deathPhase <= i && t.deathDay <= b.giorno) esito = 'persa'; else if (dayOver(b.giorno)) esito = 'vinta'; }
      else if (b.tipo === 'prima') {
        const ta = by[b.a], tb = by[b.b];
        const da = ta && !ta.alive && ta.deathPhase <= i ? ta.deathPhase : Infinity, db = tb && !tb.alive && tb.deathPhase <= i ? tb.deathPhase : Infinity;
        if (da < db) esito = 'vinta'; else if (db < da) esito = 'persa'; else if (da !== Infinity) esito = 'nulla'; else if (last) esito = 'nulla';
      } else if (b.tipo === 'tradimento' || b.tipo === 'sangue') {
        const evs = P.slice(0, i + 1).filter((ph) => ph.day === b.giorno && ph.kind !== 'fallen').flatMap((ph) => ph.events);
        const hit = b.tipo === 'tradimento' ? evs.some((e) => e.cat === 'betray') : evs.reduce((s, e) => s + e.deaths.length, 0) >= b.n;
        if (hit) esito = 'vinta'; else if (dayOver(b.giorno)) esito = 'persa';
      }
      if (!esito) return;
      b.esito = esito; b.fase = i;
      b.vincita = esito === 'vinta' ? Math.round(b.posta * b.q) : esito === 'nulla' ? b.posta : 0;
      g.crediti += b.vincita;
      out.push(b);
    });
    return out;
  }

  /* ================= doni ================= */
  const DONI = [
    { k: 'cibo', label: 'Provviste', sub: 'Sfama subito', base: 12 },
    { k: 'med', label: 'Medicine', sub: 'Cura le ferite', base: 22 },
    { k: 'arma', label: 'Un’arma', sub: 'Vince più scontri', base: 30 },
    { k: 'armatura', label: 'Protezione', sub: 'Assorbe i colpi', base: 26 },
    { k: 'attrezzo', label: 'Attrezzi', sub: 'Trappole e difesa', base: 16 },
    { k: 'mappa', label: 'Una mappa', sub: 'Sfugge ai disastri', base: 18 },
    { k: 'amuleto', label: 'Portafortuna', sub: 'Una seconda possibilità', base: 34 },
  ];
  // i favoriti costano di più: fama e salute fanno salire il prezzo
  function prezzo(SIM, i, id, dono) {
    const rel = SIM.phases[i].snap.rel[id] || {}, v = vit(SIM, i, id), A = vivi(SIM, i).length;
    const fav = (rel.f || 0) * 3 + (v[0] > 75 ? 6 : 0) + (A <= 4 ? 10 : A <= 8 ? 5 : 0);
    return Math.round(dono.base + fav);
  }

  /* ================= interviste ================= */
  const INTERVISTA = [
    { q: 'Qual è la tua strategia?', a: [['Colpire per primo', 'coraggio', '+1 Coraggio'], ['Restare nell’ombra', 'astuzia', '+1 Intelligenza'], ['Fare squadra', 'legame', 'Un legame con un altro concorrente']] },
    { q: 'Cosa ti porti da casa?', a: [['Tutto il cibo che riesco', 'scorte', 'Più scorte all’inizio'], ['Un sorriso per le telecamere', 'fama', '+1 Fama: attira gli sponsor'], ['Il ricordo di chi mi aspetta', 'morale', 'Morale più alto']] },
    { q: 'Un messaggio per il pubblico?', a: [['Votate per me!', 'fama', '+1 Fama'], ['Tornerò a casa', 'morale', 'Morale più alto'], ['Non ho paura di nessuno', 'coraggio', '+1 Coraggio']] },
  ];

  const ORDINI = [
    { v: 'nasconditi', label: 'Nasconditi', sub: 'Evita gli scontri, resta al riparo' },
    { v: 'caccia', label: 'Vai a caccia', sub: 'Cerca il bersaglio più debole' },
    { v: 'alleati', label: 'Cerca alleati', sub: 'Da soli non si va lontano' },
    { v: 'provviste', label: 'Fai provviste', sub: 'Cibo e acqua prima di tutto' },
  ];

  /* ================= le carte del Regista ================= */
  const REGIA = [
    { k: 'tempesta', label: 'Tempesta', sub: 'Maltempo su tutta l’arena: più pericoli per tutti', soft: 'Giornata storta per tutti' },
    { k: 'banchetto', label: 'Banchetto', sub: 'Un festino oggi: chi ha fame esce allo scoperto' },
    { k: 'disastro', label: 'Pulsante rosso', sub: 'Un disastro colpisce l’arena oggi', soft: 'Un imprevisto colpisce oggi' },
    { k: 'buio', label: 'Buio totale', sub: 'Stanotte non si vede niente: notte più letale', soft: 'Stanotte chi si muove rischia' },
    { k: 'bestie', label: 'Gabbie aperte', sub: 'Stanotte i predatori attaccano chi è solo', soft: 'Stanotte chi è solo è più esposto' },
    { k: 'rifornimenti', label: 'Rifornimenti', sub: 'Casse per tutti: una giornata più calma' },
  ];
  // la mano del giorno: tre carte non ancora giocate, scelte dal seme (stessa partita, stessa mano)
  function mano(SIM, k, g) {
    const P = SIM.phases, day = P[k].day, used = new Set((g.regia || []).map((x) => x.k));
    const feastDone = P.slice(0, k).some((p) => p.kind === 'f'), alive = P[k - 1].snap.alive.length;
    const ok = REGIA.filter((c) => !used.has(c.k) && !(c.k === 'banchetto' && (feastDone || alive < 4)) && !(c.k === 'disastro' && day < 2));
    let h = 2166136261; for (const c of SIM.seed + '|mano|' + day) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const r = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9 | 0) >>> 0) / 4294967296;
    const deck = ok.slice(); for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    return deck.slice(0, 3);
  }
  // il voto della regia: spettacolo (colpi grossi), ritmo (giorni con eliminazioni), colpi di scena
  function votoRegia(SIM) {
    const st = SIM.stats || {}, P = SIM.phases, days = Math.max(1, SIM.days);
    const kills = P.reduce((s, p) => s + (p.kind === 'fallen' ? 0 : p.events.reduce((a, e) => a + (e.cat === 'kill' ? e.deaths.length : 0), 0)), 0);
    const byDay = {}; P.forEach((p) => { if (p.kind !== 'fallen') byDay[p.day] = (byDay[p.day] || 0) + p.events.reduce((a, e) => a + e.deaths.length, 0); });
    const dd = Object.keys(byDay).length || 1, busy = Object.values(byDay).filter((n) => n > 0).length, N = SIM.tributes.length;
    // tarato su 40 partite normali: media intorno a 63, così 100 resta un'impresa
    const total = Object.values(byDay).reduce((a, b) => a + b, 0) || 1, share1 = (byDay[1] || 0) / total;
    let streak = 0, maxS = 0; P.forEach((p) => { if (p.kind === 'fallen') return; const d = p.events.reduce((a, e) => a + e.deaths.length, 0); streak = d ? 0 : streak + 1; maxS = Math.max(maxS, streak); });
    const twists = (st.betrayals || 0) + (st.revenges || 0) + (st.tough || 0) + (st.mentorSaves || 0) + (st.couples || 0);
    const spettacolo = clamp(Math.round(25 + 45 * (kills / Math.max(1, N - 1)) + Math.min(20, (st.sponsors || 0) * 2) + Math.min(10, (st.regia || []).length * 2.5)), 0, 100);
    const ritmo = clamp(Math.round(100 * (busy / dd) - 70 * Math.max(0, share1 - 0.3) - 8 * Math.max(0, maxS - 2) - (dd < 4 ? 20 : 0)), 0, 100);
    const sorprese = clamp(Math.round(20 + 75 * Math.min(1, twists / (N * 0.7))), 0, 100);
    const tot = Math.round(spettacolo * 0.35 + ritmo * 0.35 + sorprese * 0.3);
    const giudizio = tot >= 78 ? 'Capolavoro: il pubblico chiede il bis.' : tot >= 68 ? 'Grande televisione.' : tot >= 58 ? 'Una buona puntata, con qualche calo.' : tot >= 48 ? 'Il pubblico ha cambiato canale un paio di volte.' : 'Noia mortale: la rete ti richiama domani.';
    return { tot, spettacolo, ritmo, sorprese, giudizio, carte: (st.regia || []).length, giorni: days };
  }

  /* ================= le prove giocabili (minigiochi) =================
   * gioca(tipo, { kicker, title, text, faces }) → Promise<punteggio 0..1 | null (lascia fare)>.
   * tempismo: ferma l'ago nella fascia (tre colpi); sequenza: ripeti le frecce; via: scegli la porta giusta dagli indizi. */
  const ARROWS = [['ArrowLeft', '←'], ['ArrowUp', '↑'], ['ArrowRight', '→'], ['ArrowDown', '↓']];
  const tipoProva = (attr) => (['agi', 'for', 'cor', 'res'].includes(attr) ? 'tempismo' : ['int', 'furt', 'emp', 'car'].includes(attr) ? 'sequenza' : 'via');
  function gioca(tipo, o) {
    if (open) open.close(null);
    return new Promise((resolve) => {
      const root = document.createElement('div');
      root.className = 'sc sc-game sc-g-' + tipo;
      root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'scT');
      root.innerHTML = '<div class="sc-back"></div><div class="sc-card" tabindex="-1"><div class="sc-head">' + (o.kicker ? '<span class="sc-k">' + esc(o.kicker) + '</span>' : '') +
        '<h2 class="sc-t" id="scT">' + esc(o.title || '') + '</h2>' + (o.text ? '<p class="sc-x">' + o.text + '</p>' : '') + '</div>' + (o.faces ? '<div class="sc-faces">' + o.faces + '</div>' : '') +
        '<div class="mg" aria-live="polite"></div><div class="sc-foot"><span class="mg-score" aria-live="polite"></span><button type="button" class="sc-skip">Lascia fare</button></div></div>';
      document.body.appendChild(root); document.documentElement.classList.add('sc-on');
      const box = root.querySelector('.mg'), scoreEl = root.querySelector('.mg-score');
      let done = false, raf = 0, timers = [];
      const later = (fn, ms) => timers.push(setTimeout(fn, ms));
      function close(v) {
        if (done) return; done = true; cancelAnimationFrame(raf); timers.forEach(clearTimeout);
        document.removeEventListener('keydown', onKey, true);
        root.classList.add('sc-out'); setTimeout(() => { root.remove(); if (!document.querySelector('.sc')) document.documentElement.classList.remove('sc-on'); }, 260);
        open = null; resolve(v);
      }
      // a fine gioco il risultato resta un attimo a schermo, poi il cartello si chiude da solo
      function finish(score, label) {
        root.classList.add(score >= 0.8 ? 'mg-great' : score >= 0.5 ? 'mg-good' : score >= 0.25 ? 'mg-meh' : 'mg-bad');
        scoreEl.innerHTML = '<b>' + esc(label) + '</b>';
        if (G.LOS_PARTITA_FX && G.LOS_PARTITA_FX.game) try { G.LOS_PARTITA_FX.game(root, score); } catch (e) { /* solo grafica */ }
        later(() => close(score), 1100);
      }
      const verdict = (s) => (s >= 0.8 ? 'Perfetto!' : s >= 0.5 ? 'Bene' : s >= 0.25 ? 'Così così' : 'Male');
      let onKeyGame = null;
      function onKey(e) {
        e.stopPropagation();
        if (e.key === 'Escape') { e.preventDefault(); close(null); return; }
        if (onKeyGame) onKeyGame(e);
      }
      document.addEventListener('keydown', onKey, true);
      root.querySelector('.sc-skip').addEventListener('click', () => close(null));

      if (tipo === 'tempismo') {
        // un ago che va e viene; la fascia buona si restringe a ogni colpo
        const rounds = [0.2, 0.15, 0.11], hits = []; let r = 0, t0 = performance.now(), zone = null;
        box.innerHTML = '<div class="mg-bar"><i class="mg-zone"></i><i class="mg-needle"></i></div><div class="mg-row"><span class="mg-round"></span><button type="button" class="mg-go">Ferma!</button></div><p class="mg-hint">Premi <kbd>Spazio</kbd> o il pulsante quando l’ago è nella fascia.</p>';
        const zEl = box.querySelector('.mg-zone'), nEl = box.querySelector('.mg-needle'), rEl = box.querySelector('.mg-round');
        const setRound = () => { const w = rounds[r]; const c = 0.2 + Math.random() * 0.6; zone = [c - w / 2, c + w / 2]; zEl.style.left = (zone[0] * 100) + '%'; zEl.style.width = (w * 100) + '%'; rEl.textContent = 'Colpo ' + (r + 1) + ' di 3'; t0 = performance.now(); };
        const pos = (now) => { const per = 1500 - r * 250, x = ((now - t0) % per) / per; return x < 0.5 ? x * 2 : 2 - x * 2; };
        const tick = (now) => { nEl.style.left = (pos(now) * 100) + '%'; raf = requestAnimationFrame(tick); };
        const stop = () => {
          if (r >= rounds.length) return;
          const p = pos(performance.now()), c = (zone[0] + zone[1]) / 2, w = zone[1] - zone[0];
          const s = p >= zone[0] && p <= zone[1] ? 1 : Math.max(0, 1 - (Math.abs(p - c) - w / 2) / 0.12) * 0.5;
          hits.push(s); box.classList.remove('mg-hit', 'mg-miss'); void box.offsetWidth; box.classList.add(s >= 1 ? 'mg-hit' : 'mg-miss');
          r++; if (r < rounds.length) setRound(); else { cancelAnimationFrame(raf); const sc = hits.reduce((a, b) => a + b, 0) / hits.length; finish(sc, verdict(sc)); }
        };
        setRound(); raf = requestAnimationFrame(tick);
        box.querySelector('.mg-go').addEventListener('click', stop);
        onKeyGame = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); stop(); } };
        requestAnimationFrame(() => box.querySelector('.mg-go').focus({ preventScroll: true }));
      } else if (tipo === 'sequenza') {
        // si guarda la sequenza, poi si ripete
        const N = 5, seq = Array.from({ length: N }, () => Math.floor(Math.random() * 4)); let got = 0, mistakes = 0, ready = false;
        box.innerHTML = '<div class="mg-seq" aria-hidden="true">' + seq.map(() => '<i class="mg-cell"></i>').join('') + '</div><div class="mg-pad" role="group" aria-label="Frecce">' + ARROWS.map(([k, s], n) => '<button type="button" data-a="' + n + '" disabled aria-label="' + k.replace('Arrow', 'Freccia ') + '">' + s + '</button>').join('') + '</div><p class="mg-hint">Memorizza la sequenza, poi ripetila con le frecce.</p>';
        const cells = [...box.querySelectorAll('.mg-cell')], pad = [...box.querySelectorAll('.mg-pad button')];
        seq.forEach((a, k) => later(() => { cells.forEach((c) => c.classList.remove('on')); cells[k].textContent = ARROWS[a][1]; cells[k].classList.add('on'); }, 350 + k * 650));
        later(() => { cells.forEach((c) => { c.textContent = '?'; c.classList.remove('on'); }); ready = true; pad.forEach((b) => (b.disabled = false)); pad[0].focus({ preventScroll: true }); root.classList.add('mg-ready'); }, 350 + N * 650 + 250);
        const press = (a) => {
          if (!ready || got >= N) return;
          const ok = a === seq[got]; cells[got].textContent = ARROWS[a][1]; cells[got].classList.add(ok ? 'ok' : 'ko');
          if (!ok) mistakes++; got++;
          if (got >= N || mistakes >= 2) { ready = false; const sc = Math.max(0, (seq.filter((x, k) => k < got && cells[k].classList.contains('ok')).length) / N); finish(sc, verdict(sc)); }
        };
        box.querySelector('.mg-pad').addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) press(+b.dataset.a); });
        onKeyGame = (e) => { const n = ARROWS.findIndex(([k]) => k === e.key); if (n >= 0) { e.preventDefault(); press(n); } };
      } else {
        // tre vie, due indizi: ognuno ne esclude una
        const doors = ['Sinistra', 'Centro', 'Destra'], safe = Math.floor(Math.random() * 3), bad = [0, 1, 2].filter((x) => x !== safe);
        const CLUES = [(d) => (d === 'Centro' ? 'Dal centro' : 'Da ' + d.toLowerCase()) + ' arriva odore di fumo.', (d) => 'Verso ' + (d === 'Centro' ? 'il centro' : d.toLowerCase()) + ' si sentono passi pesanti.', (d) => 'Le tracce ' + (d === 'Centro' ? 'al centro' : 'a ' + d.toLowerCase()) + ' portano dritte a una tana.', (d) => 'Il terreno ' + (d === 'Centro' ? 'al centro' : 'a ' + d.toLowerCase()) + ' scricchiola come una trappola.'];
        const cl = CLUES.slice().sort(() => Math.random() - 0.5);
        box.innerHTML = '<ul class="mg-clues">' + bad.map((b, n) => '<li>' + esc(cl[n](doors[b])) + '</li>').join('') + '</ul><div class="mg-doors" role="group" aria-label="Vie">' + doors.map((d, n) => '<button type="button" data-d="' + n + '"><span>' + (n + 1) + '</span>' + d + '</button>').join('') + '</div><p class="mg-hint">Leggi gli indizi e scegli la via sicura. Hai <b class="mg-sec">12</b> secondi.</p>';
        let left = 12; const secEl = box.querySelector('.mg-sec');
        const iv = setInterval(() => { left--; if (secEl) secEl.textContent = left; if (left <= 0) { clearInterval(iv); choose(-1); } }, 1000); timers.push(iv);
        const choose = (n) => { if (done || root.classList.contains('mg-chosen')) return; clearInterval(iv); root.classList.add('mg-chosen'); box.querySelectorAll('[data-d]').forEach((b) => { b.disabled = true; if (+b.dataset.d === safe) b.classList.add('ok'); else if (+b.dataset.d === n) b.classList.add('ko'); }); const sc = n === safe ? 1 : 0; finish(sc, n < 0 ? 'Tempo scaduto' : sc ? 'Via giusta!' : 'Via sbagliata'); };
        box.querySelector('.mg-doors').addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) choose(+b.dataset.d); });
        onKeyGame = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= 3) { e.preventDefault(); choose(n - 1); } };
        requestAnimationFrame(() => box.querySelector('[data-d]').focus({ preventScroll: true }));
      }
      open = { close };
      if (G.LOS_PARTITA_FX && G.LOS_PARTITA_FX.card) try { G.LOS_PARTITA_FX.card(root, Object.assign({ game: tipo }, o)); } catch (e) { /* solo grafica */ }
    });
  }
  // dal punteggio al bonus sul tiro: da −2 a +4
  const bonusProva = (s) => (s >= 0.8 ? 4 : s >= 0.5 ? 2 : s >= 0.25 ? 0 : -2);

  G.LOS_PARTITA = { chiedi, gioca, tipoProva, bonusProva, REGIA, mano, votoRegia, aperto, nuovo, sano, profilo, salvaProfilo, chiudiPartita, proposte, risolvi, prezzo, rischio, quota, nuovoGiorno, vivi, vit, DONI, INTERVISTA, ORDINI, RITMI, START };
})(typeof window !== 'undefined' ? window : globalThis);
