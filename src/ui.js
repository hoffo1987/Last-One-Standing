/* Last One Standing — interfaccia */
(function () {
  'use strict';
  const D = window.LOS_DATA, L = window.LOS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const THEMES = Object.fromEntries(D.themes.map((t) => [t.id, t]));
  const TRAITS = Object.fromEntries(D.traits.map((t) => [t.id, t]));
  const KEY = 'last-one-standing:v1';
  const SPEED = { lenta: 7000, normale: 4000, veloce: 1800 };
  const G3 = (g, m, f, n) => (g === 'F' ? f : g === 'N' ? n : m);

  /* ---------------- stato ---------------- */
  const S = {
    cast: [],
    settings: { theme: 'classico', difficulty: 'normale', seed: '', maxDays: 20, teamsAllied: true, teamWin: false, speed: 'normale', teamSize: 2 },
    custom: [],
    run: null, // { cfg, phase }
    ui: null,
  };
  let SIM = null, playTimer = null, lastRendered = -1;
  const openAttrs = new Set();

  function newSeed() {
    const w = ['aurora', 'brace', 'cenere', 'duna', 'eco', 'falco', 'gelo', 'lampo', 'nebbia', 'ombra', 'quarzo', 'rovo', 'selce', 'tuono', 'vento', 'zolfo'];
    return w[Math.floor(Math.random() * w.length)] + '-' + Math.floor(Math.random() * 9000 + 1000);
  }
  const teamColor = (team) => L.PALETTE[(Math.max(1, team) - 1) % L.PALETTE.length];

  let saveTimer = null, warnedQuota = false;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(S)); }
      catch (e) {
        if (!warnedQuota) { warnedQuota = true; toast('Spazio del browser esaurito: le ultime modifiche non sono state salvate. Prova a usare foto più piccole.'); }
      }
    }, 250);
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (Array.isArray(d.cast)) S.cast = d.cast.map(sanitizeTribute).filter(Boolean);
      if (d.settings) Object.assign(S.settings, d.settings);
      if (Array.isArray(d.custom)) S.custom = d.custom.map(sanitizeCustom).filter(Boolean);
      if (d.run && d.run.cfg) S.run = d.run;
      if (d.ui === 'light' || d.ui === 'dark') S.ui = d.ui;
      return true;
    } catch (e) { return false; }
  }

  /* ---------------- validazione dati importati ---------------- */
  function sanitizeTribute(t, i) {
    if (!t || typeof t !== 'object') return null;
    const attr = {};
    D.attrs.forEach((a) => { const v = Math.round(+((t.attr || {})[a.id])); attr[a.id] = v >= 1 && v <= 10 ? v : 5; });
    const team = Math.max(1, Math.min(99, Math.round(+t.team) || (i || 0) + 1));
    return {
      id: typeof t.id === 'string' && t.id ? t.id.slice(0, 40) : 'c' + Math.random().toString(36).slice(2, 10),
      name: String(t.name || '').slice(0, 40),
      gender: ['M', 'F', 'N'].includes(t.gender) ? t.gender : 'M',
      team, color: teamColor(team),
      img: typeof t.img === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(t.img) && t.img.length < 400000 ? t.img : '',
      traits: (Array.isArray(t.traits) ? t.traits : []).filter((x) => TRAITS[x]).slice(0, 3),
      attr,
    };
  }
  function sanitizeCustom(c) {
    if (!c || typeof c.text !== 'string' || !c.text.trim()) return null;
    const n = Math.max(1, Math.min(4, Math.round(+c.n) || 1));
    const letters = 'ABCD'.slice(0, n).split('');
    const out = {
      id: c.id || 'e' + Math.random().toString(36).slice(2, 9),
      phase: ['tutte', 'b', 'd', 'n', 'f'].includes(c.phase) ? c.phase : 'tutte', n,
      text: c.text.trim().slice(0, 240),
      dies: (Array.isArray(c.dies) ? c.dies : []).filter((x) => letters.includes(x)),
      killer: letters.includes(c.killer) ? c.killer : '',
    };
    try { L.parseLine(L.customToLine(out), 'custom'); } catch (e) { return null; }
    return out;
  }

  /* ---------------- utilità ---------------- */
  function initials(name) {
    const p = String(name || '?').trim().split(/\s+/).filter(Boolean);
    return ((p[0] || '?')[0] + (p.length > 1 ? p[p.length - 1][0] : (p[0] || '')[1] || '')).toUpperCase();
  }
  function avHTML(t, cls) {
    return '<span class="av ' + (cls || '') + '" style="--c:' + esc(t.color || teamColor(t.team || 1)) + '" title="' + esc(t.name) + '">' +
      (t.img ? '<img src="' + esc(t.img) + '" alt="">' : esc(initials(t.name))) + '</span>';
  }
  let toastTimer;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 3200);
  }
  function copyText(text, okMsg) {
    const fallback = () => {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* niente */ }
      ta.remove(); toast(ok ? okMsg : 'Il browser ha bloccato la copia: seleziona il testo e copialo a mano.');
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(okMsg), fallback);
      else fallback();
    } catch (e) { fallback(); }
  }
  const nTeams = () => new Set(S.cast.map((t) => t.team)).size;

  /* ---------------- tema chiaro/scuro ---------------- */
  function applyUi() {
    if (S.ui) document.documentElement.dataset.theme = S.ui; else delete document.documentElement.dataset.theme;
  }
  $('#themeBtn').addEventListener('click', () => {
    const cur = S.ui || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    S.ui = cur === 'dark' ? 'light' : 'dark';
    applyUi(); save();
  });

  /* ---------------- navigazione ---------------- */
  const VIEWS = ['cast', 'arena', 'diretta', 'esito'];
  function route() {
    let v = (location.hash || '').slice(1);
    if (!VIEWS.includes(v)) v = 'cast';
    VIEWS.forEach((x) => ($('#v-' + x).hidden = x !== v));
    $$('.tabs a').forEach((a) => (a.dataset.tab === v ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    if (v !== 'diretta') stopPlay();
    if (v === 'diretta') renderLive(true);
    if (v === 'esito') renderResults();
    if (v === 'arena') renderArena();
    window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', route);

  /* =============== CONCORRENTI =============== */
  const GRIP = '<svg viewBox="0 0 10 16" fill="currentColor"><circle cx="2.5" cy="3" r="1.4"/><circle cx="7.5" cy="3" r="1.4"/><circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/><circle cx="2.5" cy="13" r="1.4"/><circle cx="7.5" cy="13" r="1.4"/></svg>';

  function cardHTML(t, i) {
    const avg = (D.attrs.reduce((s, a) => s + t.attr[a.id], 0) / D.attrs.length).toFixed(1);
    const traitOpts = D.traits.filter((x) => !t.traits.includes(x.id)).map((x) => '<option value="' + x.id + '" title="' + esc(x.desc) + '">' + esc(x.name) + '</option>').join('');
    return '<article class="card panel" data-id="' + esc(t.id) + '">' +
      '<div class="top-row">' +
        '<button class="grip" type="button" aria-label="Trascina per riordinare" title="Trascina per riordinare">' + GRIP + '</button>' +
        '<button class="avbtn" type="button" data-act="photo" aria-label="Carica una foto per ' + esc(t.name || 'questo concorrente') + '">' + avHTML(t) + '</button>' +
        '<input class="nameinp" type="text" id="name-' + esc(t.id) + '" data-f="name" value="' + esc(t.name) + '" placeholder="Nome" aria-label="Nome" maxlength="40">' +
        '<div class="order"><button type="button" data-act="up" aria-label="Sposta su"' + (i === 0 ? ' disabled' : '') + '>↑</button><button type="button" data-act="down" aria-label="Sposta giù"' + (i === S.cast.length - 1 ? ' disabled' : '') + '>↓</button></div>' +
        '<button class="x" type="button" data-act="del" aria-label="Rimuovi ' + esc(t.name) + '" title="Rimuovi">✕</button>' +
      '</div>' +
      '<div class="meta">' +
        '<div class="seg sm" role="group" aria-label="Genere">' +
          ['M', 'F', 'N'].map((g) => '<button type="button" data-act="g" data-v="' + g + '" aria-pressed="' + (t.gender === g) + '">' + G3(g, 'Lui', 'Lei', 'Neutro') + '</button>').join('') +
        '</div>' +
        '<label class="team" for="team-' + esc(t.id) + '">Squadra <input type="number" min="1" max="99" id="team-' + esc(t.id) + '" data-f="team" value="' + t.team + '"></label>' +
        (t.img ? '<button class="btn ghost" style="padding:2px 8px;font-size:12.5px" type="button" data-act="rmphoto">Togli foto</button>' : '') +
      '</div>' +
      '<div class="chips">' +
        t.traits.map((id) => '<span class="chip" title="' + esc(TRAITS[id].desc) + '">' + esc(TRAITS[id].name) + '<button type="button" data-act="rmtrait" data-v="' + id + '" aria-label="Togli ' + esc(TRAITS[id].name) + '">✕</button></span>').join('') +
        (t.traits.length < 3 ? '<select data-f="trait" id="trait-' + esc(t.id) + '" aria-label="Aggiungi tratto"><option value="">+ Tratto</option>' + traitOpts + '</select>' : '') +
      '</div>' +
      '<details class="attrs"' + (openAttrs.has(t.id) ? ' open' : '') + '><summary>Caratteristiche <span class="mono">media ' + avg + '</span></summary>' +
        '<div class="attrgrid">' + D.attrs.map((a) => '<label for="a-' + esc(t.id) + '-' + a.id + '">' + a.name + '</label><input type="range" min="1" max="10" id="a-' + esc(t.id) + '-' + a.id + '" data-f="attr" data-k="' + a.id + '" value="' + t.attr[a.id] + '"><output>' + t.attr[a.id] + '</output>').join('') + '</div>' +
        '<div class="row" style="margin-top:8px"><button class="btn" style="padding:4px 10px;font-size:13px" type="button" data-act="rattr">Valori casuali</button></div>' +
      '</details>' +
    '</article>';
  }

  function renderCast() {
    $('#castList').innerHTML = S.cast.map(cardHTML).join('') + '<button class="addcard" type="button" id="addOne">+ Aggiungi concorrente</button>';
    updateCounts();
  }
  function updateCounts() {
    const n = S.cast.length;
    $('#castCount').innerHTML = n + ' <small>' + (n === 1 ? 'concorrente' : 'concorrenti') + ' · ' + nTeams() + ' squadre</small>';
    $('#tabCount').textContent = n;
  }
  function refreshCard(id) {
    const i = S.cast.findIndex((t) => t.id === id);
    const el = $('.card[data-id="' + CSS.escape(id) + '"]');
    if (i < 0 || !el) return renderCast();
    const tmp = document.createElement('div'); tmp.innerHTML = cardHTML(S.cast[i], i);
    el.replaceWith(tmp.firstChild);
  }
  const findT = (el) => { const c = el.closest('.card'); return c ? S.cast.find((t) => t.id === c.dataset.id) : null; };

  function addTribute() {
    const used = new Set(S.cast.map((t) => t.name));
    const g = S.cast.length % 2 ? 'M' : 'F';
    const name = (D.names[g].find((x) => !used.has(x))) || 'Concorrente ' + (S.cast.length + 1);
    const team = S.cast.length ? Math.ceil((S.cast.length + 1) / (+S.settings.teamSize || 1)) : 1;
    const t = sanitizeTribute({ name, gender: g, team, traits: [], attr: {} });
    D.attrs.forEach((a) => (t.attr[a.id] = 3 + Math.floor(Math.random() * 6)));
    S.cast.push(t);
    renderCast(); save();
    const inp = $('#name-' + CSS.escape(t.id)); if (inp) { inp.focus(); inp.select(); }
  }

  $('#castList').addEventListener('click', (e) => {
    if (e.target.closest('#addOne')) return addTribute();
    const b = e.target.closest('[data-act]'); if (!b) return;
    const t = findT(b); if (!t) return;
    const i = S.cast.indexOf(t);
    switch (b.dataset.act) {
      case 'del': S.cast.splice(i, 1); renderCast(); break;
      case 'up': if (i > 0) { [S.cast[i - 1], S.cast[i]] = [S.cast[i], S.cast[i - 1]]; renderCast(); $('.card[data-id="' + CSS.escape(t.id) + '"] [data-act="up"]')?.focus(); } break;
      case 'down': if (i < S.cast.length - 1) { [S.cast[i + 1], S.cast[i]] = [S.cast[i], S.cast[i + 1]]; renderCast(); $('.card[data-id="' + CSS.escape(t.id) + '"] [data-act="down"]')?.focus(); } break;
      case 'g': t.gender = b.dataset.v; refreshCard(t.id); break;
      case 'rmtrait': t.traits = t.traits.filter((x) => x !== b.dataset.v); refreshCard(t.id); break;
      case 'rattr': D.attrs.forEach((a) => (t.attr[a.id] = 1 + Math.floor(Math.random() * 10))); openAttrs.add(t.id); refreshCard(t.id); break;
      case 'photo': photoTarget = t.id; $('#avatarFile').click(); return;
      case 'rmphoto': t.img = ''; refreshCard(t.id); break;
      default: return;
    }
    save();
  });
  $('#castList').addEventListener('input', (e) => {
    const f = e.target.dataset.f; if (!f) return;
    const t = findT(e.target); if (!t) return;
    if (f === 'name') {
      t.name = e.target.value.slice(0, 40);
      const av = e.target.closest('.card').querySelector('.avbtn .av');
      if (av && !t.img) av.textContent = initials(t.name);
    } else if (f === 'team') {
      const v = Math.round(+e.target.value);
      if (v >= 1 && v <= 99) { t.team = v; t.color = teamColor(v); const av = e.target.closest('.card').querySelector('.avbtn .av'); if (av) av.style.setProperty('--c', t.color); updateCounts(); }
    } else if (f === 'attr') {
      t.attr[e.target.dataset.k] = +e.target.value;
      e.target.nextElementSibling.textContent = e.target.value;
      const avg = (D.attrs.reduce((s, a) => s + t.attr[a.id], 0) / D.attrs.length).toFixed(1);
      e.target.closest('details').querySelector('summary .mono').textContent = 'media ' + avg;
    }
    save();
  });
  $('#castList').addEventListener('change', (e) => {
    if (e.target.dataset.f !== 'trait' || !e.target.value) return;
    const t = findT(e.target); if (!t) return;
    if (t.traits.length < 3) t.traits.push(e.target.value);
    refreshCard(t.id); save();
    $('#trait-' + CSS.escape(t.id))?.focus();
  });
  $('#castList').addEventListener('toggle', (e) => {
    if (!e.target.matches('details.attrs')) return;
    const t = findT(e.target); if (!t) return;
    e.target.open ? openAttrs.add(t.id) : openAttrs.delete(t.id);
  }, true);

  // trascinamento
  let dragId = null;
  $('#castList').addEventListener('pointerdown', (e) => {
    const g = e.target.closest('.grip'); if (!g) return;
    g.closest('.card').draggable = true;
  });
  $('#castList').addEventListener('dragstart', (e) => {
    const c = e.target.closest('.card'); if (!c) return;
    dragId = c.dataset.id; c.classList.add('dragging');
    try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', dragId); } catch (err) { /* niente */ }
  });
  $('#castList').addEventListener('dragover', (e) => {
    const c = e.target.closest('.card'); if (!c || !dragId) return;
    e.preventDefault();
    $$('.card.over').forEach((x) => x !== c && x.classList.remove('over'));
    if (c.dataset.id !== dragId) c.classList.add('over');
  });
  $('#castList').addEventListener('drop', (e) => {
    const c = e.target.closest('.card'); if (!c || !dragId) return;
    e.preventDefault();
    const from = S.cast.findIndex((t) => t.id === dragId);
    const [m] = S.cast.splice(from, 1);
    let to = S.cast.findIndex((t) => t.id === c.dataset.id);
    const rect = c.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width / 2 || e.clientY > rect.bottom - 10) to += 1;
    S.cast.splice(to, 0, m);
    renderCast(); save();
  });
  $('#castList').addEventListener('dragend', () => {
    dragId = null;
    $$('.card').forEach((c) => { c.draggable = false; c.classList.remove('dragging', 'over'); });
  });

  // foto
  let photoTarget = null;
  $('#avatarFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; e.target.value = '';
    const t = S.cast.find((x) => x.id === photoTarget); if (!f || !t) return;
    if (!/^image\//.test(f.type)) return toast('Il file scelto non è un\'immagine.');
    const rd = new FileReader();
    rd.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s;
        const k = Math.max(s / img.width, s / img.height), w = img.width * k, h = img.height * k;
        cv.getContext('2d').drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
        t.img = cv.toDataURL('image/jpeg', 0.82);
        refreshCard(t.id); save();
      };
      img.onerror = () => toast('Non riesco a leggere questa immagine.');
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  });

  // barra strumenti
  $('#btnRandom').addEventListener('click', () => {
    S.cast = L.randomCast(+$('#presetSize').value, Math.random().toString(36), +$('#teamSize').value).map(sanitizeTribute);
    openAttrs.clear(); renderCast(); save(); toast('Cast generato: ' + S.cast.length + ' concorrenti.');
  });
  $('#teamSize').addEventListener('change', (e) => { S.settings.teamSize = +e.target.value; save(); });
  $('#btnRegroup').addEventListener('click', () => {
    const ts = +$('#teamSize').value || 1;
    S.cast.forEach((t, i) => { t.team = Math.floor(i / ts) + 1; t.color = teamColor(t.team); });
    renderCast(); save(); toast('Squadre ricomposte in ordine, da ' + ts + '.');
  });
  $('#btnClear').addEventListener('click', () => ($('#clearConfirm').hidden = false));
  $('#clearNo').addEventListener('click', () => ($('#clearConfirm').hidden = true));
  $('#clearYes').addEventListener('click', () => { S.cast = []; $('#clearConfirm').hidden = true; renderCast(); save(); });

  // importa / esporta
  function exportJSON() {
    return JSON.stringify({ app: 'last-one-standing', versione: 1, cast: S.cast, regole: S.settings, eventi: S.custom }, null, 2);
  }
  function importJSON(text) {
    let d;
    try { d = JSON.parse(text); } catch (e) { return 'Il testo non è un JSON valido.'; }
    const cast = Array.isArray(d) ? d : d.cast;
    if (!Array.isArray(cast) || !cast.length) return 'Non trovo un elenco di concorrenti ("cast") nel testo.';
    S.cast = cast.slice(0, 200).map(sanitizeTribute).filter(Boolean);
    const rules = d.regole || d.settings;
    if (rules && typeof rules === 'object') {
      if (THEMES[rules.theme]) S.settings.theme = rules.theme;
      if (L.DIFF[rules.difficulty]) S.settings.difficulty = rules.difficulty;
      if (typeof rules.seed === 'string') S.settings.seed = rules.seed.slice(0, 60);
      if (+rules.maxDays >= 5 && +rules.maxDays <= 40) S.settings.maxDays = +rules.maxDays;
      ['teamsAllied', 'teamWin'].forEach((k) => typeof rules[k] === 'boolean' && (S.settings[k] = rules[k]));
    }
    const ev = d.eventi || d.custom;
    if (Array.isArray(ev)) S.custom = ev.slice(0, 200).map(sanitizeCustom).filter(Boolean);
    renderCast(); save();
    return null;
  }
  $('#btnIO').addEventListener('click', () => { $('#ioText').value = exportJSON(); $('#ioMsg').textContent = ''; $('#ioDlg').showModal(); });
  $('#ioClose').addEventListener('click', () => $('#ioDlg').close());
  $('#ioCopy').addEventListener('click', () => copyText($('#ioText').value, 'Configurazione copiata negli appunti.'));
  $('#ioImport').addEventListener('click', () => {
    const err = importJSON($('#ioText').value);
    if (err) $('#ioMsg').textContent = err;
    else { $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); }
  });
  $('#ioFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { $('#ioText').value = rd.result; const err = importJSON(rd.result); if (err) $('#ioMsg').textContent = err; else { $('#ioDlg').close(); toast('Importati ' + S.cast.length + ' concorrenti.'); } };
    rd.readAsText(f);
  });

  /* =============== ARENA =============== */
  function renderArena() {
    const c = L.countTemplates();
    $('#arenaSub').textContent = 'Scegli uno dei ' + c.themes + ' scenari: ognuno ha lessico, eventi e disastri propri. In tutto ' + c.events + ' modelli di evento e ' + c.disasters + ' disastri, più quelli che scrivi tu.';
    $('#themeList').innerHTML = D.themes.map((t) =>
      '<button type="button" class="theme" data-id="' + t.id + '" aria-pressed="' + (S.settings.theme === t.id) + '" style="--h:' + t.hue + '">' +
      '<span class="gl" aria-hidden="true">' + t.glyph + '</span><b>' + esc(t.name) + '</b><small>' + esc(t.tag) + '</small>' +
      (t.soft ? '<span class="soft">senza morti</span>' : '') + '</button>').join('');
    $$('#diffSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.settings.difficulty));
    $$('#speedSeg button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.settings.speed));
    $('#maxDays').value = S.settings.maxDays; $('#maxDaysOut').textContent = S.settings.maxDays;
    $('#seed').value = S.settings.seed;
    $('#teamsAllied').checked = !!S.settings.teamsAllied;
    $('#teamWin').checked = !!S.settings.teamWin;
    renderCustomForm(); renderCustomList();
    $('#startMsg').textContent = S.cast.length < 2 ? 'Servono almeno 2 concorrenti: aggiungili nella sezione Concorrenti.' : S.cast.length + ' concorrenti pronti.';
  }
  $('#themeList').addEventListener('click', (e) => {
    const b = e.target.closest('.theme'); if (!b) return;
    S.settings.theme = b.dataset.id; save();
    $$('#themeList .theme').forEach((x) => x.setAttribute('aria-pressed', x === b));
    updatePreview();
  });
  $('#diffSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.difficulty = b.dataset.v; save(); $$('#diffSeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); });
  $('#speedSeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; S.settings.speed = b.dataset.v; save(); $$('#speedSeg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); });
  $('#maxDays').addEventListener('input', (e) => { S.settings.maxDays = +e.target.value; $('#maxDaysOut').textContent = e.target.value; save(); });
  $('#seed').addEventListener('input', (e) => { S.settings.seed = e.target.value.slice(0, 60); save(); });
  $('#seedNew').addEventListener('click', () => { S.settings.seed = newSeed(); $('#seed').value = S.settings.seed; save(); });
  $('#teamsAllied').addEventListener('change', (e) => { S.settings.teamsAllied = e.target.checked; save(); });
  $('#teamWin').addEventListener('change', (e) => { S.settings.teamWin = e.target.checked; save(); });

  // eventi personalizzati
  const PH_LABEL = { tutte: 'Tutte', b: 'Inizio', d: 'Giorno', n: 'Notte', f: 'Festino' };
  function renderCustomForm() {
    const n = +$('#cN').value;
    const ls = 'ABCD'.slice(0, n).split('');
    const prevDies = $$('#cDies input:checked').map((x) => x.value);
    const prevKiller = $('#cKiller').value;
    $('#cDies').innerHTML = ls.map((l) => '<label for="cd-' + l + '"><input type="checkbox" id="cd-' + l + '" value="' + l + '"' + (prevDies.includes(l) ? ' checked' : '') + '>' + l + '</label>').join('');
    $('#cKiller').innerHTML = '<option value="">Nessuno</option>' + ls.map((l) => '<option' + (prevKiller === l ? ' selected' : '') + '>' + l + '</option>').join('');
    updatePreview();
  }
  function readCustom() {
    return { phase: $('#cPhase').value, n: +$('#cN').value, text: $('#cText').value.trim(), dies: $$('#cDies input:checked').map((x) => x.value), killer: $('#cKiller').value };
  }
  function validateCustom(c) {
    if (!c.text) return 'Scrivi il testo dell\'evento.';
    if (!c.text.includes('{A}')) return 'Il testo deve contenere almeno {A}.';
    const ls = 'ABCD'.slice(0, c.n);
    for (const l of ls) if (!c.text.includes('{' + l + '}')) return 'Con ' + c.n + ' concorrenti il testo deve nominare anche {' + l + '}.';
    if (c.killer && !c.dies.filter((x) => x !== c.killer).length) return 'Hai scelto chi uccide: indica anche chi muore.';
    if (c.killer && c.dies.includes(c.killer)) return 'Chi uccide non può anche morire nello stesso evento.';
    try { L.parseLine(L.customToLine(c), 'custom'); } catch (e) { return e.message; }
    return null;
  }
  function updatePreview() {
    const c = readCustom();
    if (!c.text) { $('#cPreview').textContent = 'L\'anteprima apparirà qui mentre scrivi.'; return; }
    try { $('#cPreview').innerHTML = L.previewCustom(c, S.settings.theme); } catch (e) { $('#cPreview').textContent = e.message; }
  }
  function renderCustomList() {
    $('#cList').innerHTML = S.custom.length
      ? S.custom.map((c) => '<div class="citem" data-id="' + esc(c.id) + '"><span class="tag">' + PH_LABEL[c.phase] + ' · ' + c.n + (c.dies.length ? ' · letale' : '') + '</span><span>' + esc(c.text) + '</span><button class="x" type="button" data-act="cdel" aria-label="Elimina evento" style="border:0;background:none;cursor:pointer;color:var(--muted)">✕</button></div>').join('')
      : '<p class="help">Nessun evento personalizzato. Quelli che aggiungi compaiono più spesso di quelli di base.</p>';
  }
  $('#cN').addEventListener('change', renderCustomForm);
  ['cText', 'cKiller', 'cPhase'].forEach((id) => $('#' + id).addEventListener('input', updatePreview));
  $('#cDies').addEventListener('change', updatePreview);
  $('#cAdd').addEventListener('click', () => {
    const c = readCustom(); const err = validateCustom(c);
    if (err) { $('#cMsg').textContent = err; return; }
    S.custom.push(sanitizeCustom(c)); save();
    $('#cText').value = ''; $('#cMsg').textContent = 'Evento aggiunto.';
    renderCustomList(); updatePreview();
  });
  $('#cList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act="cdel"]'); if (!b) return;
    const id = b.closest('.citem').dataset.id;
    S.custom = S.custom.filter((c) => c.id !== id); save(); renderCustomList();
  });

  // avvio
  function startRun(seed) {
    if (S.cast.length < 2) { toast('Servono almeno 2 concorrenti.'); location.hash = '#cast'; return; }
    S.cast.forEach((t, i) => { if (!t.name.trim()) t.name = 'Concorrente ' + (i + 1); });
    const sd = seed || S.settings.seed || newSeed();
    S.settings.seed = sd;
    const cfg = { cast: JSON.parse(JSON.stringify(S.cast)), theme: S.settings.theme, difficulty: S.settings.difficulty, seed: sd, maxDays: S.settings.maxDays, teamsAllied: S.settings.teamsAllied, teamWin: S.settings.teamWin, custom: S.custom.slice() };
    try { SIM = L.simulate(cfg); } catch (e) { toast('Simulazione non riuscita: ' + e.message); return; }
    S.run = { cfg, phase: 0 };
    lastRendered = -1; save();
    if (location.hash === '#diretta') renderLive(true); else location.hash = '#diretta';
  }
  $('#btnStart').addEventListener('click', () => startRun());

  /* =============== DIRETTA =============== */
  const KIND_LABEL = { b: 'Apertura', d: 'Giorno', n: 'Notte', f: 'Evento speciale', dis: 'Evento dell\'arena', fallen: 'Bilancio', finale: 'Finale' };
  const tById = () => Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));

  function renderLive(fromRoute) {
    const has = !!SIM;
    $('#liveEmpty').hidden = has; $('#liveBody').hidden = !has;
    if (!has) return;
    const theme = THEMES[SIM.theme];
    const P = SIM.phases, i = Math.max(0, Math.min(P.length - 1, S.run.phase || 0));
    S.run.phase = i;
    const ph = P[i], by = tById();
    const total = SIM.tributes.length;
    const forward = i === lastRendered + 1 && !fromRoute;
    lastRendered = i;

    $('#phEyebrow').textContent = theme.name + ' · ' + KIND_LABEL[ph.kind] + ' · fase ' + (i + 1) + ' di ' + P.length;
    $('#phTitle').textContent = ph.kind === 'fallen' ? ph.title + ' · Giorno ' + ph.day : ph.title;
    $('#phIntro').textContent = ph.intro || '';
    const aliveN = ph.snap.alive.length;
    $('#aliveBig').innerHTML = aliveN + '<small>/' + total + '</small>';
    const deadNow = SIM.tributes.filter((t) => !t.alive && t.deathPhase <= i).sort((a, b) => a.order - b.order);
    const newly = new Set(ph.events.flatMap((e) => e.deaths));
    $('#tally').innerHTML = deadNow.map((t) => '<i class="d' + (newly.has(t.id) && forward ? ' new' : '') + '"></i>').join('') + '<i></i>'.repeat(total - deadNow.length);

    let body = '';
    if (ph.kind === 'fallen') {
      body = ph.deaths.length
        ? '<div class="fallen-grid">' + ph.deaths.map((id) => { const t = by[id]; return '<div class="fcard' + (forward ? ' ev in' : '') + '">' + avHTML(t, 'dead') + '<b>' + esc(t.name) + '</b><small>Squadra ' + t.team + (t.killerIds.length ? ' · per mano di ' + esc(t.killerIds.map((k) => by[k].name).join(', ')) : '') + '</small></div>'; }).join('') + '</div>'
        : '<div class="panel empty">' + esc(ph.intro) + '</div>';
    } else {
      body = '<div class="events">' + ph.events.map((e, k) => {
        const avs = e.note ? '' : '<span class="avs">' + e.ids.slice(0, 5).map((id) => avHTML(by[id], e.deaths.includes(id) ? 'dead' : '')).join('') + '</span>';
        const badge = e.deaths.length ? '<span class="skull">' + (theme.soft ? 'Fuori' : (e.deaths.length > 1 ? e.deaths.length + ' morti' : 'Morte')) + '</span>' : '';
        return '<div class="ev' + (e.deaths.length ? ' lethal' : '') + (e.note ? ' note' : '') + (forward ? ' in' : '') + '" style="animation-delay:' + Math.min(k * 70, 1400) + 'ms">' + avs + '<p>' + e.html + '</p>' + badge + '</div>';
      }).join('') + '</div>';
    }
    $('#phBody').innerHTML = body;

    // mappa
    const zones = theme.lex.luogo.map((z) => z.replace(/^(il |lo |la |l'|i |gli |le )/i, ''));
    const lethalZones = {};
    ph.events.forEach((e) => e.deaths.length && e.ids.forEach((id) => (lethalZones[ph.snap.zones[id]] = 1)));
    $('#map').innerHTML = zones.map((z, zi) => {
      const here = ph.snap.alive.filter((id) => ph.snap.zones[id] === zi);
      return '<div class="zone' + (lethalZones[zi] ? ' hot' : '') + '"><span class="zn">' + esc(z) + '</span><div class="dots">' + here.map((id) => avHTML(by[id])).join('') + '</div></div>';
    }).join('');
    $('#mapNote').textContent = Object.keys(lethalZones).length ? 'riquadro = scontri' : '';

    // caduti
    $('#feedTitle').firstChild.textContent = ((theme.labels && theme.labels.dead) || 'Caduti') + ' ';
    $('#feedCount').textContent = deadNow.length;
    $('#feed').innerHTML = deadNow.length ? deadNow.slice().reverse().map((t) => '<div>' + avHTML(t, 'dead') + '<span><b>' + esc(t.name) + '</b>' + (t.killerIds.length ? ' <span class="muted">da ' + esc(t.killerIds.map((k) => by[k].name).join(', ')) + '</span>' : '') + '</span><span class="d">G' + t.deathDay + '</span></div>').join('') : '<span class="muted">Ancora nessuno.</span>';
    // in gara
    const aliveSet = new Set(ph.snap.alive);
    $('#roster').innerHTML = SIM.tributes.map((t) => avHTML(t, aliveSet.has(t.id) ? '' : 'dead')).join('');

    // progressi
    $('#progress').innerHTML = P.map((p, k) => '<button type="button" class="' + (k === i ? 'cur' : k < i ? 'done' : p.kind === 'fallen' ? 'fallen' : '') + '" data-k="' + k + '" aria-label="Fase ' + (k + 1) + ': ' + esc(p.title) + '" title="' + esc(p.title) + '"></button>').join('');
    $('#prevBtn').disabled = i === 0;
    const last = i === P.length - 1;
    $('#nextBtn').textContent = last ? 'Vedi l\'esito →' : 'Avanti ▶';
    $('#playBtn').textContent = playTimer ? 'Pausa' : 'Riproduci';
    $('#playBtn').disabled = last;
    save();
  }
  function go(k) {
    if (!SIM) return;
    S.run.phase = Math.max(0, Math.min(SIM.phases.length - 1, k));
    renderLive(false);
  }
  function next() {
    if (!SIM) return;
    if (S.run.phase >= SIM.phases.length - 1) { stopPlay(); location.hash = '#esito'; return; }
    go(S.run.phase + 1);
    if (S.run.phase >= SIM.phases.length - 1) stopPlay();
  }
  function stopPlay() { if (playTimer) { clearInterval(playTimer); playTimer = null; } const b = $('#playBtn'); if (b) b.textContent = 'Riproduci'; }
  $('#nextBtn').addEventListener('click', next);
  $('#prevBtn').addEventListener('click', () => { stopPlay(); lastRendered = -2; go(S.run.phase - 1); });
  $('#playBtn').addEventListener('click', () => {
    if (playTimer) return stopPlay();
    playTimer = setInterval(next, SPEED[S.settings.speed] || 4000);
    $('#playBtn').textContent = 'Pausa';
    next();
  });
  $('#progress').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; stopPlay(); lastRendered = -2; go(+b.dataset.k); });
  document.addEventListener('keydown', (e) => {
    if ($('#v-diretta').hidden || /input|textarea|select/i.test(e.target.tagName) || $('#ioDlg').open) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); lastRendered = -2; go(S.run.phase - 1); }
  });

  /* =============== ESITO =============== */
  function renderResults() {
    const has = !!SIM;
    $('#resEmpty').hidden = has; $('#resBody').hidden = !has;
    if (!has) return;
    const theme = THEMES[SIM.theme], by = tById(), soft = !!theme.soft;
    const W = SIM.winners.map((id) => by[id]);
    const kWord = soft ? 'eliminazion' : 'uccision';
    const plural = (n, base) => n + ' ' + base + (n === 1 ? 'e' : 'i');
    let hero;
    if (W.length === 1) {
      const w = W[0];
      hero = '<div class="hero panel">' + avHTML(w) + '<div style="min-width:0"><div class="eyebrow">' + esc(theme.name) + ' · ' + SIM.days + ' giorni · ' + SIM.tributes.length + ' concorrenti</div>' +
        '<h1>' + esc(w.name) + '</h1><p><b>' + G3(w.gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi</b> con ' + plural(w.kills, kWord) + '. Squadra ' + w.team + (w.traits.length ? ' · ' + w.traits.map((x) => TRAITS[x].name).join(', ') : '') + '.</p></div></div>';
    } else if (W.length > 1) {
      hero = '<div class="hero panel" style="grid-template-columns:minmax(0,1fr)"><div class="eyebrow">' + esc(theme.name) + ' · ' + SIM.days + ' giorni</div><h1>Vince la squadra ' + W[0].team + '</h1><div class="avs">' + W.map((w) => avHTML(w)).join('') + '</div><p>' + W.map((w) => esc(w.name) + ' (' + w.kills + ')').join(', ') + '.</p></div>';
    } else {
      hero = '<div class="hero panel" style="grid-template-columns:minmax(0,1fr)"><h1>Nessun superstite</h1><p>L\'arena non ha risparmiato nessuno.</p></div>';
    }
    const st = SIM.stats;
    const fb = st.firstBlood ? by[st.firstBlood.victim] : null;
    const tiles = [
      [SIM.days, 'giorni nell\'arena'], [st.events, 'eventi raccontati'], [st.alliances, 'alleanze strette'],
      [st.betrayals, 'tradimenti'], [st.killDeaths, soft ? 'eliminati da un rivale' : 'morti per mano altrui'], [st.envDeaths, soft ? 'eliminati dalle circostanze' : 'morti per colpa dell\'arena'],
    ].map(([v, l]) => '<div class="tile panel"><b>' + v + '</b><span>' + l + '</span></div>').join('');

    const ranked = SIM.tributes.slice().sort((a, b) => a.rank - b.rank || b.kills - a.kills);
    const rows = ranked.map((t) => '<tr class="' + (t.alive ? 'win' : '') + '"><td class="n">' + t.rank + '°</td><td><span class="who">' + avHTML(t, t.alive ? '' : 'dead') + esc(t.name) + '</span></td><td class="n">' + t.team + '</td><td class="n">' + t.kills + '</td>' +
      '<td>' + (t.alive ? '<b>' + (W.length > 1 ? 'Squadra vincitrice' : G3(t.gender, 'Vincitore', 'Vincitrice', 'Vincitorə')) + '</b>' : t.killerIds.length ? esc(t.killerIds.map((k) => by[k].name).join(', ')) : '<span class="muted">L\'arena</span>') + '</td>' +
      '<td class="n">' + (t.alive ? '–' : 'G' + t.deathDay) + '</td><td class="cause">' + (t.alive ? '' : t.deathHtml) + '</td></tr>').join('');

    const killers = SIM.tributes.filter((t) => t.kills > 0).sort((a, b) => b.kills - a.kills).slice(0, 8);
    const maxK = Math.max(1, ...killers.map((t) => t.kills));
    const kbars = killers.length ? killers.map((t) => '<div class="bar"><span class="lbl">' + esc(t.name) + '</span><span class="tr"><i style="width:' + (100 * t.kills / maxK) + '%;background:' + esc(t.color) + '"></i></span><span class="v">' + t.kills + '</span></div>').join('') : '<p class="muted">Nessuno ha eliminato un rivale.</p>';
    const dd = []; for (let d = 1; d <= SIM.days; d++) dd.push([d, st.deathsByDay[d] || 0]);
    const maxD = Math.max(1, ...dd.map((x) => x[1]));
    const dbars = dd.map(([d, n]) => '<div class="bar dd"><span class="lbl">Giorno ' + d + '</span><span class="tr"><i style="width:' + (100 * n / maxD) + '%"></i></span><span class="v">' + n + '</span></div>').join('');

    $('#resBody').innerHTML = hero +
      '<div class="tiles">' + tiles + '</div>' +
      '<div class="row" style="margin-bottom:16px">' +
        '<button class="btn primary" type="button" id="rAgain">Rigioca con un nuovo seme</button>' +
        '<button class="btn" type="button" id="rCopy">Copia il riepilogo</button>' +
        '<a class="btn" href="#diretta">Rivedi la diretta</a><a class="btn" href="#cast">Modifica il cast</a>' +
        '<span class="help mono">seme: ' + esc(SIM.seed) + '</span>' +
      '</div>' +
      '<div class="res-grid">' +
        '<div class="panel"><h2>Classifica</h2>' + (fb ? '<p class="help" style="margin:-4px 0 12px">Primo sangue: ' + esc(fb.name) + (st.firstBlood.killers.length ? ', per mano di ' + esc(st.firstBlood.killers.map((k) => by[k].name).join(', ')) : ', vittima dell\'arena') + '.</p>' : '') +
          '<div class="tablewrap"><table><thead><tr><th>Pos.</th><th>Concorrente</th><th>Sq.</th><th>' + (soft ? 'Elim.' : 'Ucc.') + '</th><th>Per mano di</th><th>Giorno</th><th>Come è andata</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>' +
        '<div class="stack">' +
          '<div class="panel"><h2>' + (soft ? 'Chi ha eliminato di più' : 'Chi ha ucciso di più') + '</h2><div class="bars">' + kbars + '</div></div>' +
          '<div class="panel"><h2>' + ((theme.labels && theme.labels.dead) || 'Caduti') + ' per giorno</h2><div class="bars">' + dbars + '</div></div>' +
          '<div class="panel poster"><h2>Locandina</h2><img id="posterImg" alt="Locandina della partita"><p class="help" style="margin-top:8px">Tieni premuto sull\'immagine (o clic destro) per salvarla.</p></div>' +
        '</div>' +
      '</div>';
    $('#rAgain').addEventListener('click', () => { S.settings.seed = newSeed(); startRun(S.settings.seed); });
    $('#rCopy').addEventListener('click', () => copyText(summaryText(), 'Riepilogo copiato negli appunti.'));
    drawPoster().then((url) => { const im = $('#posterImg'); if (im && url) im.src = url; });
  }

  function summaryText() {
    const theme = THEMES[SIM.theme], by = tById();
    const W = SIM.winners.map((id) => by[id]);
    const lines = ['LAST ONE STANDING · ' + theme.name, SIM.tributes.length + ' concorrenti · ' + SIM.days + ' giorni · seme ' + SIM.seed, ''];
    if (W.length === 1) lines.push(G3(W[0].gender, 'Ultimo', 'Ultima', 'Ultimə') + ' in piedi: ' + W[0].name + ' (' + W[0].kills + ' ' + (theme.soft ? 'eliminazioni' : 'uccisioni') + ')');
    else if (W.length) lines.push('Vince la squadra ' + W[0].team + ': ' + W.map((w) => w.name).join(', '));
    lines.push('', 'Classifica:');
    SIM.tributes.slice().sort((a, b) => a.rank - b.rank).forEach((t) => lines.push(t.rank + '. ' + t.name + ' — ' + t.kills + (t.alive ? '' : ' — ' + t.deathText)));
    return lines.join('\n');
  }

  async function drawPoster() {
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* niente */ }
    const theme = THEMES[SIM.theme], by = tById();
    const W = SIM.winners.map((id) => by[id]);
    const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
    const g = cv.getContext('2d');
    const gold = '#e3b04b', ink = '#e7e9ee', mute = '#9aa3b4';
    g.fillStyle = '#0f1218'; g.fillRect(0, 0, 1080, 1350);
    // tacche di conteggio
    const total = SIM.tributes.length, tw = Math.min(18, 900 / total);
    SIM.tributes.slice().sort((a, b) => (a.alive ? 1 : 0) - (b.alive ? 1 : 0) || a.order - b.order).forEach((t, i) => {
      g.fillStyle = t.alive ? gold : '#f06a5c'; g.globalAlpha = t.alive ? 1 : 0.85;
      g.fillRect(90 + i * tw, 1170, Math.max(3, tw - 5), 44);
    });
    g.globalAlpha = 1;
    const disp = '"Big Shoulders Display", "Arial Narrow", sans-serif', mono = '"JetBrains Mono", monospace', body = 'Barlow, sans-serif';
    g.fillStyle = mute; g.font = '500 28px ' + mono; g.textAlign = 'left';
    g.fillText((theme.name + ' · ' + SIM.days + ' giorni · ' + total + ' concorrenti').toUpperCase(), 90, 130);
    g.fillStyle = gold; g.font = '900 120px ' + disp;
    const head = W.length === 1 ? G3(W[0].gender, 'ULTIMO IN PIEDI', 'ULTIMA IN PIEDI', 'ULTIMƏ IN PIEDI') : W.length ? 'SQUADRA ' + W[0].team : 'NESSUN SUPERSTITE';
    g.fillText(head, 84, 250);
    const loadImg = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    async function avatar(t, x, y, r) {
      g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.closePath();
      g.fillStyle = t.color || '#888'; g.fill(); g.clip();
      const im = t.img ? await loadImg(t.img) : null;
      if (im) g.drawImage(im, x - r, y - r, r * 2, r * 2);
      else { g.fillStyle = '#fff'; g.font = '800 ' + Math.round(r * 0.8) + 'px ' + disp; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(initials(t.name), x, y + r * 0.04); }
      g.restore(); g.textBaseline = 'alphabetic'; g.textAlign = 'left';
    }
    if (W.length === 1) {
      const w = W[0];
      g.strokeStyle = gold; g.lineWidth = 10; g.beginPath(); g.arc(540, 560, 236, 0, Math.PI * 2); g.stroke();
      await avatar(w, 540, 560, 222);
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '900 ' + (w.name.length > 14 ? 96 : 130) + 'px ' + disp;
      g.fillText(w.name.toUpperCase(), 540, 930);
      g.fillStyle = mute; g.font = '500 38px ' + body;
      g.fillText(w.kills + ' ' + (theme.soft ? (w.kills === 1 ? 'eliminazione' : 'eliminazioni') : (w.kills === 1 ? 'uccisione' : 'uccisioni')) + ' · squadra ' + w.team, 540, 995);
    } else if (W.length) {
      const r = Math.min(150, 420 / W.length);
      for (let k = 0; k < W.length; k++) await avatar(W[k], 540 + (k - (W.length - 1) / 2) * (r * 2.2), 560, r);
      g.fillStyle = ink; g.textAlign = 'center'; g.font = '800 64px ' + disp;
      g.fillText(W.map((w) => w.name).join(' · ').toUpperCase().slice(0, 40), 540, 900);
    }
    g.textAlign = 'left';
    const top = SIM.tributes.filter((t) => t.kills > 0 && !t.alive).sort((a, b) => b.kills - a.kills).slice(0, 3);
    if (top.length) {
      g.fillStyle = mute; g.font = '500 24px ' + mono; g.fillText('I PIÙ PERICOLOSI TRA GLI SCONFITTI', 90, 1070);
      g.fillStyle = ink; g.font = '700 34px ' + body;
      g.fillText(top.map((t) => t.name + ' ' + t.kills).join('   ·   '), 90, 1118);
    }
    g.fillStyle = mute; g.font = '500 24px ' + mono;
    g.fillText('LAST ONE STANDING · SEME ' + String(SIM.seed).toUpperCase().slice(0, 30), 90, 1280);
    try { return cv.toDataURL('image/png'); } catch (e) { return ''; }
  }

  /* ---------------- avvio ---------------- */
  function boot(hot) {
    const had = load();
    if (!had) {
      S.cast = L.randomCast(24, 'benvenuto', 2).map(sanitizeTribute);
      S.settings.seed = 'benvenuto-2026';
    }
    if (!S.settings.seed) S.settings.seed = newSeed();
    $('#teamSize').value = String(S.settings.teamSize || 2);
    applyUi();
    renderCast();
    if (S.run && S.run.cfg) {
      try { SIM = L.simulate(S.run.cfg); } catch (e) { SIM = null; S.run = null; }
    } else if (!had && S.cast.length >= 2) {
      const cfg = { cast: JSON.parse(JSON.stringify(S.cast)), theme: S.settings.theme, difficulty: S.settings.difficulty, seed: S.settings.seed, maxDays: S.settings.maxDays, teamsAllied: S.settings.teamsAllied, teamWin: S.settings.teamWin, custom: [] };
      SIM = L.simulate(cfg); S.run = { cfg, phase: 0 };
    }
    if (hot && typeof hot.phase === 'number' && S.run) S.run.phase = hot.phase;
    route();
  }
  const H = window.claude && window.claude.hot;
  if (H && typeof H.snapshot === 'function') { try { H.snapshot(() => ({ phase: S.run ? S.run.phase : 0 })); } catch (e) { /* niente */ } }
  if (H && typeof H.ready === 'function') H.ready(boot); else boot((H && H.data) || {});
})();
