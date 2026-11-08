/* Atlante delle arene: immagini per luoghi, pericoli, armi, meteo, disastri e oggetti.
   Se in assets/arene/<arena>/<sezione>/<nome>.webp c'è un'immagine vera, si usa quella;
   altrimenti si disegna un'illustrazione vettoriale con i colori dell'arena, scelta per famiglia
   (fuoco, acqua, gelo, fulmini, bestie, sciami, magia, tecnologia, burocrazia…). */
(function (G) {
  const ASSETS = (G.LOS_ASSETS && G.LOS_ASSETS.atlas) || {};
  let uid = 0;
  const id = (p) => p + (++uid).toString(36);
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // nome del file: senza articolo iniziale, senza accenti, parole separate da trattini
  const slug = (s) => norm(s).replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  // Le varianti del mondo conservano la stessa identità visiva del modello;
  // presa, usura, qualità e provenienza restano indicate nei dati dello zaino.
  const weaponBaseName = (name) => String(name || '').replace(/ con (?:presa in tessuto|laccio da polso|presa in cuoio|contrappeso ad anello|fodero di recupero|riferimenti datati|annotazioni verificabili|una copia firmata|indice analitico|allegati numerati|firmware aggiornato|modulo di puntamento|batteria potenziata|circuiti schermati|modalità silenziosa)$/i, '');
  const weaponKey = (name) => slug(weaponBaseName(name).replace(/’/g, "'"));
  const has = (theme, kind, key) => !!(ASSETS[theme] && ASSETS[theme][kind] && ASSETS[theme][kind][key]);
  const url = (theme, kind, key) => (has(theme, kind, key) ? ASSETS[theme][kind][key] : null);
  const count = (theme) => { const a = ASSETS[theme] || {}; return Object.keys(a).reduce((s, k) => s + Object.keys(a[k]).length, 0); };

  /* ---------------- famiglie ---------------- */
  const FAM = [
    ['luce', /lucciole|aurora|petali|stelle cadenti/],
    ['luna', /\bluna\b/],
    ['spettacolo', /pubblico|sponsor|regia|telecamer|quiz|asta |sondaggio|fan\b|replica|pubblicit|coriandoli|maratona|sedie|ospite speciale|diretta|doppia fama|evento a tempo|risate|tecnici|giornata dei bambini|musica/],
    ['burocrazia', /audit|riorganizz|taglio|licenz|trasloco|smart working|software|compito|pagell|colloqui|valutazion|inventario|trimestrale|notaio|ispezion|interrogaz|verifica|esame|circolare|registro|assemblea|preside|la fusione$/],
    ['festa', /torta|festa\b|feste\b|fiera|venerdi|ponte festivo|prima del ponte|settimana dello studente|gita|bar aperto|orgia|succube|desideri|afrodisiac|satiri|ballo|miele|petali|carnevale|parata|gelataio/],
    ['cassa', /cassa|provvist|rifornimento|carovana|lancio|mercato|mercant|bottino/],
    ['fuoco', /incendi|fiamm|fuoco|napalm|eruzion|plasma|reattore|in fusione|sole gigante|calura|rovente|brucia|convoglio/],
    ['caldo', /caldo|afa|afoso|sole artificiale|siccita|sete/],
    ['esplosione', /bomb|mine|esplosi|artiglieria|missil|granat|cecchin|elicotter|assalto|cerchio rosso|zona rossa|zona si chiude|conto alla rovescia|raid/],
    ['acqua', /^(la )?piena|diluvio|allagat|fiume|tsunami|diga|vortice|marea|lago|acqua|squali|sirene|stagno|pozzo|fontana|lavanderia|bagno|doccia/],
    ['gelo', /gel|valanga|ghiacc|grandin|criogen|freddo|neve|riscaldamento rotto|inverno/],
    ['sabbia', /sabbia|polvere|deserto/],
    ['fulmine', /fulmin|temporale|uragano|elettric|cortocircuito|neutrini|tempesta|magnet|campo magnetico/],
    ['terremoto', /terremoto|frana|crollo|crolla|affonda|buco|sprofond|montagna che cammina|ascensore|rotazione|gravita|collisione|pressione|scafo|breccia|falla|pavimento/],
    ['tossico', /velen|gas|spore|acid|avvelen|contamin|tossic|nervino|radioatt|cenere|influenza|virus|infestaz|funghi|nebbia acida|pioggia nera|aria/],
    ['nebbia', /nebbia|foschia|oblio|allucinaz|sussurri/],
    ['sciame', /sciam|vespe|api |api$|formiche|zanzare|ragni|uccell|corvi|stormo|nanobot|droni|pixie|locuste|sanguisughe|insett|pesci volanti|rane|rospi|ratti|topi|scoiattoli|uova|bozzolo|nido/],
    ['bestie', /lup|cinghial|orso|scimmie|cani|scorpion|verme|serpent|basilisco|idra|drago|troll|golem|gigant|mutant|mutat|ibridi|orda|infett|zombi|corridor|alieni|parassita|esperimento|clone|mimic|goblin|orco|caccia|predoni|zoo|neonati|creatura|bestia/],
    ['magia', /incantesim|rune|arcana|portale|strega|streghe|maledizion|fata|fatui|cristallo|specchio|lich|spettri|fantasm|anime|congiunzione|allineamento|astrale|elfi|folletti|armature|pozione|golem|eco dei caduti|campane|albero|radici|piante|foresta si muove/],
    ['buio', /blackout|black-out|notte|buio|ombre|eclissi|sole nero|silenzio|candele|ognissanti|lamenti|radar/],
    ['tech', /\bia\b|intelligenza|androidi|robot|drone|server|sistema|clone|navetta|ascensore|manutenzion|trasmissione|radio|segnale|computer|sabotaggio/],
    ['cielo', /pioggia di (aghi|frecce|stelle|rane|rospi|bulloni|detriti|frattaglie|sangue|volantini|sponsor|coriandoli)|micrometeoriti|meteor|asteroid|detriti/],
    ['sangue', /sangue|macell|carneficin|tritacarne|mattatoio|rossa|alba rossa/],
    ['pioggia', /pioggia|piogge|piovos|acquazzon|tropicale|monsone/],
    ['vento', /vento\b|tromba|uragano|muro di vento/],
    ['luce', /stelle|lucciole|aurora|tramonto|congiunzione|allineamento|visibilita|cassa leggendaria|stagione delle bacche|bacche|giornata dello sport/],
    ['sole', /sole|limpido|sereno|mattina|alba/],
  ];
  // ogni parola chiave deve cominciare una parola: «capi» non è «api», «evento» non è «vento»
  const FAMW = FAM.map(([f, re]) => [f, new RegExp('\\b(?:' + re.source.replace(/^\^/, '') + ')')]);
  const FALLBACK = { classico: 'luce', fantasy: 'magia', scifi: 'tech', zombie: 'bestie', royale: 'spettacolo', horror: 'buio', wasteland: 'sabbia', liceo: 'burocrazia', ufficio: 'burocrazia', cyberpunk: 'tech' };
  // famiglie proprie di un'arena, controllate prima di quelle comuni (le altre arene non cambiano)
  const FAMA = {
    cyberpunk: [
      ['esplosione', /maxtac|rastrellament|blocco totale|raid|ronda|scav|cyberpsic|allerta pattuglia|torrett/],
      ['tech', /\bice\b|interferenz|rete|virus delle ottiche|ottic|braindance|nodo dati|impiant|cyberdeck|disturbi/],
      ['buio', /blackout|notte di neon/],
      ['tossico', /pioggia acida|smog|gas/],
      ['cassa', /consegna|scorte/],
      ['caldo', /condizionator/],
      ['festa', /tregua/],
    ],
  };
  const family = (name, extra, theme) => {
    const s = norm(name + ' ' + (extra || ''));
    const n = norm(name);
    for (const [f, re] of FAMA[theme] || []) if (re.test(n)) return f;
    for (const [f, re] of FAMA[theme] || []) if (re.test(s)) return f;
    for (const [f, re] of FAMW) if (re.test(n)) return f;
    for (const [f, re] of FAMW) if (re.test(s)) return f;
    return FALLBACK[theme] || 'luce';
  };

  /* ---------------- colori ---------------- */
  const pal = (h, mood) => {
    const dark = mood === 'night' || mood === 'danger';
    return {
      s1: dark ? 'hsl(' + h + ' 38% 9%)' : 'hsl(' + h + ' 55% 72%)',
      s2: dark ? 'hsl(' + h + ' 42% 22%)' : 'hsl(' + ((h + 30) % 360) + ' 70% 88%)',
      g1: dark ? 'hsl(' + h + ' 30% 7%)' : 'hsl(' + h + ' 34% 26%)',
      g2: dark ? 'hsl(' + h + ' 28% 13%)' : 'hsl(' + h + ' 30% 36%)',
      acc: 'hsl(' + h + ' 85% 62%)',
      soft: 'hsl(' + h + ' 70% 80%)',
    };
  };
  const MOOD = { buio: 'night', luna: 'night', magia: 'night', tech: 'night', spettacolo: 'night', sangue: 'danger', fuoco: 'danger', esplosione: 'danger', bestie: 'danger', sciame: 'danger', tossico: 'danger', terremoto: 'danger' };

  const rnd = (seed) => { let x = 0; for (const c of String(seed)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); };

  /* scenario di base: cielo, colline e primo piano scuro */
  function base(p, r, opts) {
    const g = id('g'), sky = id('s');
    const hill = (y, amp, col, o) => { let d = 'M0 ' + y; for (let x = 0; x <= 320; x += 40) d += ' Q' + (x + 20) + ' ' + (y - amp * (0.4 + r())) + ' ' + (x + 40) + ' ' + (y + (r() - 0.5) * amp * 0.6); return '<path d="' + d + ' V200 H0Z" fill="' + col + '" opacity="' + (o || 1) + '"/>'; };
    return '<defs><linearGradient id="' + sky + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + p.s1 + '"/><stop offset="1" stop-color="' + p.s2 + '"/></linearGradient>' +
      '<radialGradient id="' + g + '" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="320" height="200" fill="url(#' + sky + ')"/><rect width="320" height="200" fill="url(#' + g + ')"/>' +
      (opts && opts.noHills ? '' : hill(150, 30, p.g2, 0.85) + hill(172, 22, p.g1));
  }
  const stars = (r, n, col) => Array.from({ length: n }, () => '<circle cx="' + (r() * 320).toFixed(1) + '" cy="' + (r() * 110).toFixed(1) + '" r="' + (0.5 + r() * 1.3).toFixed(2) + '" fill="' + (col || '#fff') + '" opacity="' + (0.4 + r() * 0.6).toFixed(2) + '"/>').join('');
  const cloud = (x, y, s, col, o) => '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + col + '" opacity="' + (o || 0.95) + '"><ellipse cx="0" cy="8" rx="34" ry="13"/><circle cx="-14" cy="0" r="14"/><circle cx="8" cy="-6" r="18"/><circle cx="26" cy="4" r="12"/></g>';
  const sun = (x, y, rr, col, rays) => '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + (rr * 1.9) + '" fill="' + col + '" opacity=".18"/><circle r="' + rr + '" fill="' + col + '"/>' + (rays ? Array.from({ length: 12 }, (_, i) => '<rect x="-1.6" y="' + -(rr * 1.75) + '" width="3.2" height="' + (rr * 0.45) + '" rx="1.6" fill="' + col + '" transform="rotate(' + i * 30 + ')"/>').join('') : '') + '</g>';

  const SCENE = {
    sole: (p, r) => base(p, r) + sun(230, 62, 26, '#ffd36b', true) + cloud(80, 60, 0.7, '#fff', 0.8),
    caldo: (p, r) => base(p, r) + sun(160, 70, 34, '#ffb347', true) + [0, 1, 2].map((i) => '<path d="M60 ' + (120 + i * 12) + ' q20 -8 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff3c4" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>').join(''),
    pioggia: (p, r) => base(p, r) + cloud(110, 50, 1.2, '#cfd8e6') + cloud(210, 40, 1, '#b9c4d6') + Array.from({ length: 34 }, () => { const x = r() * 320, y = 70 + r() * 110; return '<line x1="' + x.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + (x - 5).toFixed(1) + '" y2="' + (y + 13).toFixed(1) + '" stroke="#e6f0ff" stroke-width="1.8" stroke-linecap="round" opacity=".75"/>'; }).join(''),
    fulmine: (p, r) => base(p, r) + cloud(120, 46, 1.4, '#59617a') + cloud(220, 38, 1.1, '#454c63') + '<path d="M172 70 l-18 44 h16 l-12 40 l34 -52 h-17 l13 -32z" fill="#ffe680" stroke="#fff6c2" stroke-width="2" stroke-linejoin="round"/><rect width="320" height="200" fill="#fff" opacity=".06"/>',
    nebbia: (p, r) => base(p, r) + [0, 1, 2, 3, 4].map((i) => '<rect x="' + (-40 + r() * 60) + '" y="' + (70 + i * 24) + '" width="' + (260 + r() * 80) + '" height="16" rx="8" fill="#fff" opacity="' + (0.35 + i * 0.08).toFixed(2) + '"/>').join(''),
    vento: (p, r) => base(p, r) + [0, 1, 2, 3].map((i) => '<path d="M' + (20 + i * 18) + ' ' + (60 + i * 26) + ' h' + (150 + r() * 70) + ' a14 14 0 1 0 -14 -14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>').join('') + Array.from({ length: 6 }, () => '<ellipse cx="' + (r() * 320).toFixed(0) + '" cy="' + (60 + r() * 100).toFixed(0) + '" rx="5" ry="2.4" fill="' + p.acc + '" transform="rotate(' + (r() * 90 - 45).toFixed(0) + ')"/>').join(''),
    gelo: (p, r) => base({ ...p, s1: 'hsl(205 60% 78%)', s2: 'hsl(200 70% 93%)', g1: 'hsl(205 30% 70%)', g2: 'hsl(205 35% 82%)' }, r) + Array.from({ length: 16 }, () => { const x = r() * 320, y = r() * 170, s = 3 + r() * 5; return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" stroke="#fff" stroke-width="1.6" stroke-linecap="round">' + [0, 60, 120].map((a) => '<line x1="' + -s + '" y1="0" x2="' + s + '" y2="0" transform="rotate(' + a + ')"/>').join('') + '</g>'; }).join('') + '<path d="M120 172 l14 -40 l14 40z M150 172 l10 -28 l10 28z" fill="#eaf6ff" opacity=".9"/>',
    luna: (p, r) => base(p, r) + stars(r, 40) + '<circle cx="220" cy="62" r="30" fill="#fdf3cf"/><circle cx="208" cy="56" r="5" fill="#e9dcae"/><circle cx="230" cy="72" r="7" fill="#e9dcae"/><circle cx="220" cy="62" r="52" fill="#fdf3cf" opacity=".08"/>',
    buio: (p, r) => base(p, r) + stars(r, 26, p.soft) + '<circle cx="230" cy="60" r="26" fill="' + p.g1 + '" stroke="' + p.acc + '" stroke-width="2" opacity=".9"/>' + [0, 1].map((i) => '<g transform="translate(' + (90 + i * 30) + ' 150)"><circle r="3" fill="' + p.acc + '"/><circle cx="9" r="3" fill="' + p.acc + '"/></g>').join(''),
    luce: (p, r) => base(p, r) + Array.from({ length: 22 }, () => { const x = r() * 320, y = 40 + r() * 130, s = 1.5 + r() * 3; return '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (s * 3).toFixed(1) + '" fill="' + p.acc + '" opacity=".18"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(1) + '" fill="#fff8d6"/>'; }).join(''),
    sabbia: (p, r) => base({ ...p, s1: 'hsl(32 60% 55%)', s2: 'hsl(38 70% 75%)', g1: 'hsl(28 45% 30%)', g2: 'hsl(30 45% 42%)' }, r) + Array.from({ length: 60 }, () => '<circle cx="' + (r() * 320).toFixed(0) + '" cy="' + (r() * 190).toFixed(0) + '" r="' + (0.6 + r() * 1.6).toFixed(1) + '" fill="#fff1d0" opacity=".6"/>').join('') + [0, 1, 2].map((i) => '<path d="M0 ' + (70 + i * 30) + ' q80 -18 160 0 t160 0" fill="none" stroke="#ffe7b0" stroke-width="5" opacity=".35"/>').join(''),
    fuoco: (p, r) => base(p, r) + [0, 1, 2, 3, 4].map((i) => { const x = 40 + i * 60 + r() * 20, hh = 50 + r() * 60; return '<path d="M' + (x - 22) + ' 175 C' + (x - 26) + ' ' + (175 - hh * 0.6) + ' ' + (x - 6) + ' ' + (175 - hh * 0.7) + ' ' + x + ' ' + (175 - hh) + ' C' + (x + 8) + ' ' + (175 - hh * 0.6) + ' ' + (x + 28) + ' ' + (175 - hh * 0.5) + ' ' + (x + 22) + ' 175Z" fill="#ff7a2f"/><path d="M' + (x - 11) + ' 175 C' + (x - 12) + ' ' + (175 - hh * 0.35) + ' ' + (x - 2) + ' ' + (175 - hh * 0.45) + ' ' + x + ' ' + (175 - hh * 0.6) + ' C' + (x + 4) + ' ' + (175 - hh * 0.35) + ' ' + (x + 14) + ' ' + (175 - hh * 0.3) + ' ' + (x + 11) + ' 175Z" fill="#ffd25c"/>'; }).join('') + Array.from({ length: 14 }, () => '<circle cx="' + (r() * 320).toFixed(0) + '" cy="' + (20 + r() * 110).toFixed(0) + '" r="1.6" fill="#ffc46b"/>').join('') + '<rect width="320" height="200" fill="#ff5a1f" opacity=".1"/>',
    acqua: (p, r) => base(p, r, { noHills: true }) + [0, 1, 2, 3, 4].map((i) => '<path d="M-20 ' + (100 + i * 20) + ' q20 -14 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V200 H-20Z" fill="hsl(205 ' + (55 + i * 6) + '% ' + (55 - i * 7) + '%)" opacity=".92"/>').join('') + '<path d="M40 108 q20 -14 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><path d="M190 128 q20 -14 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>',
    terremoto: (p, r) => base(p, r) + '<path d="M150 100 l12 18 l-10 10 l16 18 l-8 12 l14 22" fill="none" stroke="' + p.s1 + '" stroke-width="7" stroke-linejoin="round"/><path d="M150 100 l12 18 l-10 10 l16 18 l-8 12 l14 22" fill="none" stroke="' + p.acc + '" stroke-width="2" opacity=".8"/>' + [0, 1, 2, 3, 4, 5].map(() => '<rect x="' + (60 + r() * 200).toFixed(0) + '" y="' + (40 + r() * 70).toFixed(0) + '" width="' + (6 + r() * 10).toFixed(0) + '" height="' + (6 + r() * 10).toFixed(0) + '" fill="' + p.g2 + '" transform="rotate(' + (r() * 60).toFixed(0) + ')"/>').join(''),
    tossico: (p, r) => base({ ...p, s1: 'hsl(95 35% 16%)', s2: 'hsl(80 40% 34%)' }, r) + [0, 1, 2, 3, 4, 5].map(() => { const x = r() * 320, y = 60 + r() * 100, s = 16 + r() * 26; return '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(0) + '" fill="#a8ff60" opacity=".22"/>'; }).join('') + '<g transform="translate(160 95)" fill="#d8ff9a" opacity=".85"><circle r="7"/><path d="M0 -10 a10 10 0 0 1 -18 -10 a24 24 0 0 1 26 -6z" transform="rotate(0)"/><path d="M0 -10 a10 10 0 0 1 -18 -10 a24 24 0 0 1 26 -6z" transform="rotate(120)"/><path d="M0 -10 a10 10 0 0 1 -18 -10 a24 24 0 0 1 26 -6z" transform="rotate(240)"/></g>',
    esplosione: (p, r, n) => {
      const bg = base(p, r);
      if (/zona|cerchio|circolo/.test(n)) return bg + '<circle cx="160" cy="104" r="78" fill="none" stroke="#ff4d4d" stroke-width="5" stroke-dasharray="14 8"/><circle cx="160" cy="104" r="78" fill="#ff4d4d" opacity=".1"/><circle cx="160" cy="104" r="40" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/><path d="M160 104 l30 -30" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="160" cy="104" r="4" fill="#fff"/>';
      if (/cecchin|mirino|tiratore/.test(n)) return bg + '<g transform="translate(160 100)" fill="none" stroke="#ff4d4d" stroke-width="3"><circle r="44"/><circle r="20" opacity=".7"/><path d="M0 -60 V-26 M0 26 V60 M-60 0 H-26 M26 0 H60"/></g><circle cx="160" cy="100" r="3" fill="#ff4d4d"/>';
      if (/\bmine?\b|campo minato/.test(n)) return bg + [[90, 160], [170, 150], [240, 166]].map(([x, y]) => '<g transform="translate(' + x + ' ' + y + ')"><ellipse rx="22" ry="8" fill="' + p.g1 + '"/><rect x="-6" y="-12" width="12" height="8" rx="2" fill="#6b7480"/><circle cy="-14" r="3" fill="#ff4d4d"/></g>').join('') + '<path d="M60 120 l16 -10 M250 118 l-12 -10" stroke="#ffb03a" stroke-width="2" opacity=".6"/>';
      if (/elicotter/.test(n)) return bg + '<g transform="translate(160 86)" fill="' + p.g1 + '"><ellipse rx="44" ry="18"/><rect x="30" y="-6" width="70" height="8" rx="4"/><rect x="-90" y="-30" width="180" height="5" rx="2"/><rect x="-3" y="-30" width="6" height="14"/><path d="M-20 18 v10 M20 18 v10 M-34 28 h68" stroke="' + p.g1 + '" stroke-width="4"/><circle cx="-18" cy="-2" r="9" fill="' + p.acc + '" opacity=".7"/></g><path d="M130 104 L90 200 H230 L190 104Z" fill="#fff6c8" opacity=".12"/>';
      if (/drone/.test(n)) return bg + '<g transform="translate(160 92)" fill="' + p.g1 + '"><rect x="-26" y="-10" width="52" height="20" rx="8"/><path d="M-26 -6 L-60 -24 M26 -6 L60 -24 M-26 6 L-60 24 M26 6 L60 24" stroke="' + p.g1 + '" stroke-width="5"/>' + [[-60, -24], [60, -24], [-60, 24], [60, 24]].map(([x, y]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="20" ry="4" opacity=".7"/>').join('') + '<circle r="6" fill="#ff4d4d"/></g>';
      return base(p, r) + '<g transform="translate(160 110)">' + Array.from({ length: 14 }, (_, i) => '<path d="M0 0 L' + (Math.cos(i / 14 * 6.283) * 95).toFixed(0) + ' ' + (Math.sin(i / 14 * 6.283) * 70).toFixed(0) + ' L' + (Math.cos((i + 0.5) / 14 * 6.283) * 40).toFixed(0) + ' ' + (Math.sin((i + 0.5) / 14 * 6.283) * 30).toFixed(0) + 'Z" fill="#ffb03a" opacity=".85"/>').join('') + '<circle r="34" fill="#ffd56b"/><circle r="18" fill="#fff6d0"/></g>' + Array.from({ length: 10 }, () => '<rect x="' + (r() * 320).toFixed(0) + '" y="' + (r() * 160).toFixed(0) + '" width="5" height="5" fill="' + p.g1 + '" transform="rotate(' + (r() * 90).toFixed(0) + ')"/>').join('');
    },
    bestie: (p, r) => base(p, r) + '<g transform="translate(160 118)"><path d="M-64 40 L-50 -20 L-30 -50 L-22 -18 L0 -26 L22 -18 L30 -50 L50 -20 L64 40Z" fill="' + p.g1 + '"/><path d="M-26 0 l16 6 l-16 4z M26 0 l-16 6 l16 4z" fill="#ffdd55"/><circle cx="-20" cy="5" r="16" fill="#ffdd55" opacity=".18"/><circle cx="20" cy="5" r="16" fill="#ffdd55" opacity=".18"/></g>' + [0, 1, 2].map((i) => '<path d="M' + (40 + i * 14) + ' 40 q-6 40 -18 70" stroke="' + p.acc + '" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>').join(''),
    sciame: (p, r) => base(p, r) + Array.from({ length: 48 }, () => { const a = r() * 6.283, d = r() * 70, x = 160 + Math.cos(a) * d * 1.8, y = 92 + Math.sin(a) * d * 0.8; return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')"><ellipse rx="3.2" ry="2.2" fill="' + p.g1 + '"/><ellipse cx="-1" cy="-2.5" rx="2.4" ry="1.4" fill="#fff" opacity=".55"/></g>'; }).join(''),
    magia: (p, r) => base(p, r) + stars(r, 30, p.soft) + '<g transform="translate(160 96)" fill="none" stroke="' + p.acc + '" stroke-width="2"><circle r="44" opacity=".8"/><circle r="32" opacity=".5"/><path d="M0 -44 L38 22 L-38 22Z M0 44 L-38 -22 L38 -22Z" opacity=".7"/></g><circle cx="160" cy="96" r="70" fill="' + p.acc + '" opacity=".12"/>',
    tech: (p, r) => base(p, r, { noHills: true }) + Array.from({ length: 9 }, (_, i) => '<line x1="0" y1="' + (20 + i * 20) + '" x2="320" y2="' + (20 + i * 20) + '" stroke="' + p.acc + '" stroke-width=".6" opacity=".25"/>').join('') + '<rect x="96" y="54" width="128" height="86" rx="10" fill="' + p.g1 + '" stroke="' + p.acc + '" stroke-width="2.5"/><path d="M112 98 h20 l8 -16 l10 32 l8 -16 h50" fill="none" stroke="' + p.acc + '" stroke-width="3" stroke-linejoin="round"/>' + Array.from({ length: 6 }, () => '<rect x="' + (100 + r() * 110).toFixed(0) + '" y="' + (60 + r() * 70).toFixed(0) + '" width="' + (8 + r() * 26).toFixed(0) + '" height="3" fill="#ff4d6d" opacity=".7"/>').join('') + '<rect x="140" y="140" width="40" height="10" fill="' + p.g1 + '"/><rect x="120" y="150" width="80" height="6" rx="3" fill="' + p.g1 + '"/>',
    spettacolo: (p, r, n) => {
      const bg = base(p, r) + '<path d="M60 0 L120 200 L0 200Z M260 0 L320 200 L200 200Z" fill="#fff6c8" opacity=".14"/><path d="M160 0 L220 200 L100 200Z" fill="#fff6c8" opacity=".2"/>' + Array.from({ length: 22 }, () => '<rect x="' + (r() * 320).toFixed(0) + '" y="' + (r() * 170).toFixed(0) + '" width="4" height="7" fill="hsl(' + Math.floor(r() * 360) + ' 85% 65%)" transform="rotate(' + (r() * 80).toFixed(0) + ')"/>').join('');
      if (/ospite|quiz|musica|canto|intervista|risate|karaoke/.test(n)) return bg + '<g transform="translate(160 100)"><rect x="-16" y="-50" width="32" height="54" rx="16" fill="#c4ced8" stroke="' + p.g1 + '" stroke-width="3"/>' + [0, 1, 2, 3].map((k) => '<path d="M-14 ' + (-38 + k * 10) + ' h28" stroke="' + p.g1 + '" stroke-width="1.5" opacity=".5"/>').join('') + '<path d="M-26 -6 a26 26 0 0 0 52 0" fill="none" stroke="' + p.g1 + '" stroke-width="5"/><path d="M0 20 V52 M-18 52 H18" stroke="' + p.g1 + '" stroke-width="6" stroke-linecap="round"/></g>';
      if (/pubblico|vot|sondagg|fan|televot/.test(n)) return bg + '<g transform="translate(160 104)"><rect x="-48" y="-34" width="96" height="70" rx="10" fill="' + p.g1 + '"/><rect x="-36" y="-22" width="18" height="46" rx="3" fill="' + p.acc + '"/><rect x="-9" y="-6" width="18" height="30" rx="3" fill="#fff" opacity=".8"/><rect x="18" y="6" width="18" height="18" rx="3" fill="#ff4d6d"/><path d="M-20 -58 l10 14 l16 -24" stroke="#46e08a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
      if (/sponsor|asta|soldi|premio|monete|pubblicit/.test(n)) return bg + '<g transform="translate(160 100)"><circle r="44" fill="#f2c94c" stroke="#b58a1e" stroke-width="5"/><circle r="32" fill="none" stroke="#b58a1e" stroke-width="2" opacity=".6"/><text y="16" text-anchor="middle" font-size="46" font-weight="900" fill="#8a6414" font-family="Figtree, sans-serif">$</text></g>';
      if (/regia|replica|ciak|montaggio|pausa|tecnici|sciopero/.test(n)) return bg + '<g transform="translate(160 106)"><rect x="-56" y="-26" width="112" height="70" rx="5" fill="' + p.g1 + '"/><g transform="rotate(-14 -56 -26)"><rect x="-56" y="-46" width="112" height="20" rx="3" fill="#fffdf6"/>' + [0, 1, 2, 3, 4].map((k) => '<path d="M' + (-50 + k * 24) + ' -46 l14 20 h-12 l-14 -20z" fill="' + p.g1 + '"/>').join('') + '</g><rect x="-44" y="-10" width="60" height="5" rx="2" fill="#fff" opacity=".6"/><rect x="-44" y="6" width="40" height="5" rx="2" fill="#fff" opacity=".4"/></g>';
      return bg + '<rect x="128" y="96" width="64" height="44" rx="6" fill="' + p.g1 + '"/><circle cx="160" cy="118" r="13" fill="' + p.acc + '"/><circle cx="160" cy="118" r="6" fill="' + p.g1 + '"/><rect x="180" y="100" width="7" height="5" rx="2" fill="#ff4d4d"/><path d="M146 96 l-10 -14 h48 l-10 14" fill="' + p.g1 + '"/>';
    },
    burocrazia: (p, r, n) => {
      const papers = (dx) => [0, 1, 2].map((i) => '<g transform="translate(' + (dx + i * 14) + ' ' + (46 + i * 8) + ') rotate(' + (-8 + i * 7) + ')"><rect width="96" height="116" rx="5" fill="#fffdf6" stroke="' + p.g2 + '" stroke-width="1.5"/>' + [0, 1, 2, 3, 4].map((k) => '<rect x="12" y="' + (20 + k * 15) + '" width="' + (50 + ((k * 13) % 24)) + '" height="4" rx="2" fill="' + p.g2 + '" opacity=".35"/>').join('') + '</g>').join('');
      const bg = base(p, r, { noHills: true });
      if (/audit|ispezion|verifica|interrogaz|esame|controll/.test(n)) return bg + papers(70) + '<g transform="translate(200 104)"><circle r="34" fill="#dff1ff" fill-opacity=".35" stroke="' + p.g1 + '" stroke-width="9"/><path d="M24 24 L56 58" stroke="' + p.g1 + '" stroke-width="13" stroke-linecap="round"/><circle r="34" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/></g>';
      if (/taglio|licenz|tagli/.test(n)) return bg + papers(60) + '<g transform="translate(206 100) rotate(-30)" fill="none" stroke="' + p.g1 + '" stroke-width="7"><circle cx="-26" cy="38" r="14"/><circle cx="26" cy="38" r="14"/><path d="M-16 28 L22 -44 M16 28 L-22 -44" stroke="#c4ced8" stroke-width="8" stroke-linecap="round"/></g>';
      if (/trasloco|sede|scatol/.test(n)) return bg + [[90, 112], [150, 112], [120, 64]].map(([x, y]) => '<g transform="translate(' + x + ' ' + y + ')"><rect width="60" height="48" rx="3" fill="#c9965a" stroke="#8a5a32" stroke-width="2"/><rect x="0" y="0" width="60" height="8" fill="#b77c3e"/><rect x="24" y="0" width="12" height="48" fill="#e8d5a8" opacity=".8"/></g>').join('');
      if (/smart|software|registro|chat|computer|mail|digit|hacker|gestional|password/.test(n)) return bg + '<rect x="90" y="56" width="140" height="88" rx="8" fill="' + p.g1 + '" stroke="#c4ced8" stroke-width="4"/><rect x="100" y="66" width="120" height="68" rx="3" fill="hsl(205 60% 70%)"/><circle cx="160" cy="92" r="12" fill="#fffdf6"/><path d="M140 126 a20 16 0 0 1 40 0z" fill="#fffdf6"/><rect x="70" y="144" width="180" height="10" rx="5" fill="#c4ced8"/><circle cx="160" cy="61" r="2.6" fill="#ff4d4d"/>';
      if (/riorganizz|fusione|organigramm|ristruttur|nuov[ao] (direttor|preside|capo)/.test(n)) return bg + '<g stroke="#fffdf6" stroke-width="3" fill="none"><path d="M160 64 V86 M100 86 H220 M100 86 V104 M160 86 V104 M220 86 V104"/></g>' + [[160, 50], [100, 118], [160, 118], [220, 118]].map(([x, y], k) => '<rect x="' + (x - 24) + '" y="' + (y - 14) + '" width="48" height="28" rx="6" fill="' + (k === 2 ? '#e5484d' : '#fffdf6') + '"/>').join('') + '<path d="M148 106 l24 24 M172 106 l-24 24" stroke="#fff" stroke-width="4" stroke-linecap="round"/>';
      if (/compit|pagell|valutaz|voti|voto|interrogaz|verific|esame|bocciat/.test(n)) return bg + '<g transform="translate(160 100) rotate(-5)"><rect x="-58" y="-62" width="116" height="128" rx="5" fill="#fffdf6"/>' + [0, 1, 2, 3].map((k) => '<rect x="-44" y="' + (-44 + k * 18) + '" width="62" height="5" rx="2" fill="' + p.g2 + '" opacity=".4"/>').join('') + '<circle cx="34" cy="34" r="20" fill="none" stroke="#d6342c" stroke-width="4"/><text x="34" y="42" text-anchor="middle" font-size="24" font-weight="800" fill="#d6342c" font-family="Figtree, sans-serif">4</text></g>';
      if (/assemblea|circolare|sciopero|annuncio|riunione|discorso/.test(n)) return bg + papers(56) + '<g transform="translate(214 96) rotate(-14)"><path d="M-30 -12 L18 -34 V34 L-30 12Z" fill="#e5484d"/><rect x="-44" y="-14" width="16" height="28" rx="4" fill="' + p.g1 + '"/><path d="M28 -18 q12 18 0 36 M38 -28 q20 28 0 56" stroke="#fffdf6" stroke-width="3" fill="none" stroke-linecap="round"/></g>';
      return bg + papers(98) + '<g transform="translate(212 136) rotate(-14)"><rect x="-38" y="-16" width="76" height="32" rx="5" fill="none" stroke="#d6342c" stroke-width="4"/><rect x="-26" y="-4" width="52" height="8" rx="2" fill="#d6342c"/></g>';
    },
    festa: (p, r) => base(p, r) + Array.from({ length: 7 }, (_, i) => { const x = 40 + i * 40 + r() * 10, y = 50 + r() * 40, c = 'hsl(' + Math.floor(r() * 360) + ' 80% 66%)'; return '<path d="M' + x + ' ' + (y + 22) + ' q' + (r() * 10 - 5).toFixed(0) + ' 30 ' + (r() * 16 - 8).toFixed(0) + ' 60" stroke="#fff" stroke-width="1" fill="none" opacity=".7"/><ellipse cx="' + x + '" cy="' + y + '" rx="13" ry="16" fill="' + c + '"/><ellipse cx="' + (x - 4) + '" cy="' + (y - 6) + '" rx="3" ry="5" fill="#fff" opacity=".5"/>'; }).join('') + '<path d="M0 22 Q160 60 320 22" stroke="' + p.g1 + '" stroke-width="1.5" fill="none"/>' + Array.from({ length: 9 }, (_, i) => '<path d="M' + (18 + i * 34) + ' ' + (28 + Math.sin(i / 8 * 3.14) * 12) + ' l10 18 l10 -18z" fill="hsl(' + i * 40 + ' 75% 62%)"/>').join(''),
    cassa: (p, r) => base(p, r) + '<path d="M160 18 q-50 6 -54 40 h108 q-4 -34 -54 -40z" fill="#fff" opacity=".9"/><path d="M110 58 L150 104 M210 58 L170 104 M160 58 V104" stroke="#fff" stroke-width="1.5" opacity=".8"/><g transform="translate(160 128)"><rect x="-34" y="-26" width="68" height="52" rx="4" fill="#9a6631"/><rect x="-34" y="-26" width="68" height="12" fill="#b77c3e"/><rect x="-5" y="-26" width="10" height="52" fill="' + p.acc + '"/><rect x="-34" y="-3" width="68" height="6" fill="' + p.acc + '" opacity=".7"/></g>',
    cielo: (p, r) => base(p, r) + Array.from({ length: 16 }, () => { const x = 20 + r() * 280, y = 10 + r() * 140, l = 14 + r() * 20; return '<line x1="' + x.toFixed(0) + '" y1="' + y.toFixed(0) + '" x2="' + (x + l * 0.5).toFixed(0) + '" y2="' + (y + l).toFixed(0) + '" stroke="' + p.acc + '" stroke-width="3" stroke-linecap="round" opacity=".55"/><circle cx="' + (x + l * 0.5).toFixed(0) + '" cy="' + (y + l).toFixed(0) + '" r="3.2" fill="#fff"/>'; }).join(''),
    sangue: (p, r) => base({ ...p, s1: 'hsl(355 50% 12%)', s2: 'hsl(355 60% 30%)' }, r) + '<circle cx="230" cy="62" r="28" fill="#d63a3a"/><circle cx="230" cy="62" r="48" fill="#d63a3a" opacity=".15"/>' + Array.from({ length: 20 }, () => { const x = r() * 320, y = r() * 150; return '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q3 6 0 9 q-3 -3 0 -9z" fill="#ff5c5c" opacity=".7"/>'; }).join(''),
  };

  function scene(fam, h, seed, mood) {
    const r = rnd(seed + fam);
    const p = pal(h, mood || MOOD[fam] || 'day');
    const body = (SCENE[fam] || SCENE.luce)(p, r, norm(seed));
    return '<svg class="axs" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + body + '</svg>';
  }

  /* ---------------- oggetti: icone grandi su un cerchio luminoso ---------------- */
  const ITEM = {
    arma: '<path d="M40 136 L120 56 L136 40 L144 48 L128 64 L48 144Z" fill="#dfe6ee" stroke="#7d8896" stroke-width="3"/><path d="M58 112 l30 30" stroke="#6b4a2c" stroke-width="12" stroke-linecap="round"/><path d="M46 124 l30 30" stroke="#8a5a32" stroke-width="10" stroke-linecap="round"/><path d="M124 52 L140 36" stroke="#fff" stroke-width="3" opacity=".7"/>',
    armatura: '<path d="M100 30 L150 48 V96 C150 132 126 152 100 166 C74 152 50 132 50 96 V48Z" fill="#8ea2b8" stroke="#56677c" stroke-width="4"/><path d="M100 46 L136 58 V96 C136 122 120 138 100 150Z" fill="#b8c8da"/><path d="M100 70 v54 M78 94 h44" stroke="ACC" stroke-width="8" stroke-linecap="round"/>',
    med: '<rect x="40" y="58" width="120" height="92" rx="14" fill="#f5f5f5" stroke="#c9c9c9" stroke-width="3"/><rect x="76" y="40" width="48" height="22" rx="6" fill="none" stroke="#c9c9c9" stroke-width="6"/><path d="M100 78 v52 M74 104 h52" stroke="#e5484d" stroke-width="16" stroke-linecap="round"/>',
    cibo: '<path d="M100 60 C70 44 40 66 44 104 C48 146 80 168 100 156 C120 168 152 146 156 104 C160 66 130 44 100 60Z" fill="#e5484d"/><path d="M100 60 C104 44 112 36 124 32" stroke="#6b4a2c" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M108 48 C120 36 140 40 146 48 C134 56 118 56 108 48Z" fill="#46a758"/><ellipse cx="74" cy="92" rx="8" ry="16" fill="#fff" opacity=".35" transform="rotate(20 74 92)"/>',
    attrezzo: '<path d="M62 150 L118 94" stroke="#9aa6b2" stroke-width="18" stroke-linecap="round"/><path d="M110 64 a30 30 0 1 0 28 40 l-18 -6 l-6 -18z" fill="#c4ced8" stroke="#7d8896" stroke-width="3" transform="rotate(10 130 80)"/><circle cx="62" cy="150" r="6" fill="#56677c"/>',
    mappa: '<path d="M38 52 L76 40 L124 56 L162 44 V148 L124 160 L76 144 L38 156Z" fill="#f1e2bf" stroke="#b09867" stroke-width="3"/><path d="M76 40 V144 M124 56 V160" stroke="#b09867" stroke-width="2"/><path d="M54 120 q20 -30 46 -12 t44 -30" fill="none" stroke="#8a5a32" stroke-width="3" stroke-dasharray="6 6"/><path d="M134 66 l12 12 M146 66 l-12 12" stroke="#e5484d" stroke-width="5" stroke-linecap="round"/>',
    trap: '<path d="M40 120 h120" stroke="#6b7480" stroke-width="10" stroke-linecap="round"/><path d="M48 118 C48 70 80 52 100 52 C120 52 152 70 152 118" fill="none" stroke="#8e98a4" stroke-width="8"/>' + [0, 1, 2, 3, 4, 5, 6].map((i) => '<path d="M' + (58 + i * 14) + ' ' + (100 - Math.sin((i + 0.5) / 7 * 3.14) * 34) + ' l6 12 l6 -12" fill="#dfe6ee"/>').join('') + '<circle cx="100" cy="120" r="10" fill="ACC"/>',
    esplosivo: '<circle cx="92" cy="112" r="46" fill="#2b2f36"/><ellipse cx="76" cy="96" rx="12" ry="8" fill="#fff" opacity=".18"/><rect x="108" y="58" width="24" height="18" rx="4" fill="#4a505a" transform="rotate(35 120 67)"/><path d="M128 56 q14 -18 30 -10" stroke="#b09867" stroke-width="4" fill="none"/><g transform="translate(160 44)"><circle r="12" fill="#ffb03a" opacity=".5"/><path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3Z" fill="#ffe680"/></g>',
    veleno: '<path d="M82 40 h36 v34 l26 52 a20 20 0 0 1 -18 30 h-52 a20 20 0 0 1 -18 -30 l26 -52z" fill="#e8f5e9" stroke="#9ab59c" stroke-width="3"/><path d="M62 118 h76 l8 14 a20 20 0 0 1 -18 24 h-56 a20 20 0 0 1 -18 -24z" fill="#7bd96a"/><circle cx="90" cy="134" r="5" fill="#2d5a27"/><circle cx="110" cy="134" r="5" fill="#2d5a27"/><path d="M90 146 h20" stroke="#2d5a27" stroke-width="3"/><rect x="78" y="32" width="44" height="12" rx="4" fill="#8a5a32"/>',
    amuleto: '<path d="M64 36 Q100 76 136 36" fill="none" stroke="#c9a24a" stroke-width="4"/><g transform="translate(100 112)">' + [0, 90, 180, 270].map((a) => '<circle cx="0" cy="-22" r="20" fill="#46a758" transform="rotate(' + a + ')"/>').join('') + '<circle r="8" fill="#2f7d3c"/><circle r="52" fill="none" stroke="#c9a24a" stroke-width="4"/></g>',
    alcol: '<path d="M88 30 h24 v34 c0 10 18 18 18 38 v52 a10 10 0 0 1 -10 10 h-40 a10 10 0 0 1 -10 -10 v-52 c0 -20 18 -28 18 -38z" fill="#5b8c3a" opacity=".92"/><rect x="74" y="108" width="52" height="34" rx="4" fill="#f1e2bf"/><rect x="84" y="118" width="32" height="5" rx="2" fill="#8a5a32"/><rect x="88" y="24" width="24" height="10" rx="3" fill="#8a5a32"/><path d="M84 80 v50" stroke="#fff" stroke-width="5" opacity=".25" stroke-linecap="round"/>',
    valore: '<ellipse cx="100" cy="146" rx="50" ry="13" fill="#b58a1e"/>' + [0, 1, 2, 3].map((i) => '<ellipse cx="100" cy="' + (140 - i * 13) + '" rx="50" ry="13" fill="#f2c94c" stroke="#b58a1e" stroke-width="2.5"/>').join('') + '<path d="M138 46 l18 14 l-18 26 l-18 -26z" fill="#7fd6ff" stroke="#3a9bd0" stroke-width="2.5"/>',
    ricordo: '<rect x="46" y="40" width="108" height="124" rx="6" fill="#fffdf6" stroke="#c9b48a" stroke-width="4" transform="rotate(-6 100 102)"/><rect x="58" y="54" width="84" height="74" fill="ACC" opacity=".55" transform="rotate(-6 100 102)"/><path d="M100 104 c-14 -16 -34 -4 -22 12 l22 18 l22 -18 c12 -16 -8 -28 -22 -12z" fill="#e5484d" transform="rotate(-6 100 102)"/>',
  };
  function itemArt(type, h) {
    const g = id('i');
    return '<svg class="axi" viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="' + g + '" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="hsl(' + h + ' 80% 62%)" stop-opacity=".55"/><stop offset="1" stop-color="hsl(' + h + ' 80% 50%)" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="96" fill="url(#' + g + ')"/><g filter="drop-shadow(0 6px 8px rgba(0,0,0,.25))">' + (ITEM[type] || ITEM.valore).replace(/ACC/g, 'hsl(' + h + ' 75% 55%)') + '</g></svg>';
  }

  /* ---------------- pericoli: ritratti da manifesto «ricercato» ---------------- */
  const BEAST = [
    ['canide', /lup|cane|cani/], ['sciame', /sciame|vespe|nanobot|corvi|stormo|droni/], ['macchina', /drone|elicotter|androide|robot/],
    ['spettro', /spettro|entita|bambola|fantasma/], ['serpe', /serpent|verme|scorpion/], ['alato', /viverna|drago|grifone/],
    ['alieno', /tentacol|alien/], ['orda', /orda|banda|predoni/], ['colosso', /orso|troll|gigante|golem|mutato/],
    ['persona', /./],
  ];
  const BEAST_ART = {
    canide: (c, e) => '<path d="M40 190 L52 104 L38 46 L72 76 L100 66 L128 76 L162 46 L148 104 L160 190Z" fill="' + c + '"/><path d="M80 112 l14 6 l-14 4z M120 112 l-14 6 l14 4z" fill="' + e + '"/><path d="M90 150 l10 10 l10 -10" fill="none" stroke="' + e + '" stroke-width="2" opacity=".6"/>',
    sciame: (c, e, r) => Array.from({ length: 40 }, () => { const x = 30 + r() * 140, y = 40 + r() * 140; return '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="5" ry="3.4" fill="' + c + '"/><circle cx="' + (x + 2).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="1.1" fill="' + e + '"/>'; }).join(''),
    macchina: (c, e) => '<rect x="56" y="88" width="88" height="44" rx="14" fill="' + c + '"/><path d="M20 80 h60 M120 80 h60" stroke="' + c + '" stroke-width="6" stroke-linecap="round"/><ellipse cx="50" cy="80" rx="30" ry="5" fill="' + c + '" opacity=".6"/><ellipse cx="150" cy="80" rx="30" ry="5" fill="' + c + '" opacity=".6"/><circle cx="100" cy="110" r="13" fill="' + e + '"/><circle cx="100" cy="110" r="26" fill="' + e + '" opacity=".2"/><path d="M100 132 L60 200 H140Z" fill="' + e + '" opacity=".12"/>',
    spettro: (c, e) => '<path d="M60 190 V96 C60 58 80 38 100 38 C120 38 140 58 140 96 V190 l-14 -14 l-13 14 l-13 -14 l-13 14 l-13 -14z" fill="' + c + '" opacity=".92"/><ellipse cx="86" cy="96" rx="7" ry="11" fill="' + e + '"/><ellipse cx="114" cy="96" rx="7" ry="11" fill="' + e + '"/><ellipse cx="100" cy="128" rx="8" ry="12" fill="' + e + '" opacity=".7"/>',
    serpe: (c, e) => '<path d="M40 180 C40 140 160 150 160 118 C160 86 60 100 60 70 C60 46 100 40 120 52" fill="none" stroke="' + c + '" stroke-width="22" stroke-linecap="round"/><circle cx="124" cy="54" r="18" fill="' + c + '"/><circle cx="130" cy="50" r="3.5" fill="' + e + '"/><path d="M140 60 l14 4 l-6 4 m6 -4 l-4 6" stroke="#e5484d" stroke-width="2" fill="none"/>',
    alato: (c, e) => '<path d="M100 70 C70 40 30 40 14 60 C40 64 50 80 54 100 C70 92 86 96 100 110 C114 96 130 92 146 100 C150 80 160 64 186 60 C170 40 130 40 100 70Z" fill="' + c + '"/><path d="M92 110 L100 190 L108 110Z" fill="' + c + '"/><circle cx="94" cy="84" r="3" fill="' + e + '"/><circle cx="106" cy="84" r="3" fill="' + e + '"/>',
    alieno: (c, e) => '<ellipse cx="100" cy="82" rx="42" ry="36" fill="' + c + '"/>' + [0, 1, 2, 3, 4].map((i) => '<path d="M' + (70 + i * 15) + ' 110 C' + (60 + i * 18) + ' 150 ' + (90 + i * 10) + ' 160 ' + (66 + i * 16) + ' 196" stroke="' + c + '" stroke-width="10" fill="none" stroke-linecap="round"/>').join('') + '<circle cx="86" cy="80" r="8" fill="' + e + '"/><circle cx="114" cy="80" r="8" fill="' + e + '"/><circle cx="100" cy="64" r="5" fill="' + e + '"/>',
    orda: (c, e) => [0, 1, 2, 3, 4].map((i) => { const x = 28 + i * 36, s = i === 2 ? 1.15 : 0.9; return '<g transform="translate(' + x + ' ' + (i === 2 ? 70 : 88) + ') scale(' + s + ')"><circle cx="0" cy="0" r="16" fill="' + c + '"/><path d="M-22 120 L-18 30 C-18 20 18 20 18 30 L22 120Z" fill="' + c + '"/><circle cx="-5" cy="-1" r="2.4" fill="' + e + '"/><circle cx="5" cy="-1" r="2.4" fill="' + e + '"/></g>'; }).join(''),
    colosso: (c, e) => '<path d="M30 196 C30 120 50 90 70 80 C66 60 76 40 100 40 C124 40 134 60 130 80 C150 90 170 120 170 196Z" fill="' + c + '"/><path d="M84 68 l10 4 l-10 4z M116 68 l-10 4 l10 4z" fill="' + e + '"/>',
    persona: (c, e, r, n) => {
      const body = '<circle cx="100" cy="74" r="28" fill="' + c + '"/><path d="M44 200 C44 142 70 116 100 116 C130 116 156 142 156 200Z" fill="' + c + '"/>';
      const eyes = '<rect x="86" y="66" width="28" height="9" rx="4" fill="' + e + '" opacity=".85"/>';
      if (/risorse|personale|hr/.test(n)) return body + eyes + '<rect x="112" y="134" width="40" height="52" rx="4" fill="#fffdf6"/><rect x="124" y="130" width="16" height="8" rx="2" fill="' + e + '"/>' + [0, 1, 2].map((k) => '<rect x="118" y="' + (146 + k * 11) + '" width="26" height="4" rx="2" fill="' + c + '" opacity=".6"/>').join('');
      if (/consulent|ispettor|notaio/.test(n)) return body + eyes + '<rect x="46" y="150" width="54" height="40" rx="5" fill="#8a5a32"/><path d="M62 150 v-8 h22 v8" fill="none" stroke="#8a5a32" stroke-width="4"/><rect x="46" y="164" width="54" height="4" fill="' + e + '"/>';
      if (/riorganizz|ispezion/.test(n)) return body + eyes + '<g transform="translate(140 150)"><circle r="20" fill="#dff1ff" fill-opacity=".25" stroke="' + e + '" stroke-width="5"/><path d="M14 14 L30 30" stroke="' + e + '" stroke-width="7" stroke-linecap="round"/></g>';
      if (/preside|professor|prof\b|insegnant/.test(n)) return body + '<g fill="none" stroke="' + e + '" stroke-width="3"><circle cx="89" cy="72" r="9"/><circle cx="111" cy="72" r="9"/><path d="M98 72 h4"/></g>' + '<rect x="120" y="128" width="8" height="64" rx="2" fill="' + e + '" transform="rotate(20 124 160)"/>';
      if (/bidello|custode|guardian/.test(n)) return body + eyes + '<path d="M150 90 L132 196" stroke="#b77c3e" stroke-width="5"/><path d="M122 186 l20 4 l6 12 l-32 -6z" fill="' + e + '"/>';
      if (/predon|banda|bandit/.test(n)) return body + '<path d="M72 64 h56 v14 h-56z" fill="' + e + '" opacity=".9"/><path d="M72 60 l-14 -10 M128 60 l14 -10" stroke="' + c + '" stroke-width="6"/>';
      return body + eyes + '<path d="M100 118 l-8 12 l8 44 l8 -44z" fill="' + e + '"/>';
    },
  };
  function beastArt(name, h) {
    const n = norm(name); const kind = (BEAST.find(([, re]) => re.test(n)) || BEAST[BEAST.length - 1])[0];
    const r = rnd(name), g = id('b');
    return '<svg class="axb" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="' + g + '" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="hsl(' + h + ' 45% 30%)"/><stop offset="1" stop-color="hsl(' + h + ' 40% 8%)"/></radialGradient></defs><rect width="200" height="200" fill="url(#' + g + ')"/>' + BEAST_ART[kind]('hsl(' + h + ' 30% 4%)', 'hsl(' + ((h + 180) % 360) + ' 95% 62%)', r, n) + '</svg>';
  }

  /* ---------------- armi: piccoli disegni per famiglia ---------------- */
  const WEAP = [
    ['lama', /spada|lama|coltell|machete|pugnal|stocco|daga|katana|bisturi|forbici|rasoio|cutter|tagliacarte|falce/], ['arco', /arco|balestra|fionda|cerbottana/], ['lancia', /lancia|tridente|forcone|picca|alabarda/],
    ['ascia', /ascia|accetta|piccone/], ['mazza', /mazza|martell|bastone|clava|spranga|tubo|chiave|mazzetta|randello|pala|padella|scopa|stecca|righello|ombrello|cric/],
    ['fuoco', /pistol|fucil|blaster|laser|mitra|revolver|cannone|sparachiodi|fucile|lanciafiamme|taser/], ['bomba', /bomb|granat|molotov|dinamite|esplosiv/],
    ['carta', /mail|report|presentazione|badge|excel|nota|foglio|post-it|registro|compito|pagella|appunti|chat|voto|libro|diario|telefon|cellulare|foto/],
  ];
  const WEAP_ART = {
    lama: '<path d="M18 82 L70 30 L82 18 L86 22 L74 34 L22 86Z" fill="#dfe6ee" stroke="#7d8896" stroke-width="2"/><path d="M26 64 l14 14 M20 76 l8 8" stroke="#8a5a32" stroke-width="7" stroke-linecap="round"/>',
    arco: '<path d="M28 14 C70 30 70 70 28 86" fill="none" stroke="#8a5a32" stroke-width="6" stroke-linecap="round"/><path d="M28 14 V86" stroke="#ddd" stroke-width="1.5"/><path d="M16 50 H86 M78 44 l8 6 l-8 6" stroke="#dfe6ee" stroke-width="3" fill="none"/>',
    lancia: '<path d="M14 86 L74 26" stroke="#8a5a32" stroke-width="6" stroke-linecap="round"/><path d="M70 30 L90 10 L86 34Z" fill="#dfe6ee" stroke="#7d8896" stroke-width="2"/>',
    ascia: '<path d="M22 86 L66 42" stroke="#8a5a32" stroke-width="7" stroke-linecap="round"/><path d="M56 22 C76 20 90 34 88 54 L66 44 L56 34Z" fill="#c4ced8" stroke="#7d8896" stroke-width="2"/>',
    mazza: '<path d="M22 84 L62 44" stroke="#8a5a32" stroke-width="8" stroke-linecap="round"/><rect x="52" y="14" width="34" height="30" rx="6" fill="#6b7480" transform="rotate(45 69 29)"/>',
    fuoco: '<path d="M14 46 H80 V58 H50 L44 82 H30 L34 58 H14Z" fill="#4a505a"/><rect x="14" y="40" width="70" height="10" rx="3" fill="#6b7480"/><circle cx="88" cy="45" r="5" fill="#ffb03a"/>',
    bomba: '<circle cx="46" cy="58" r="26" fill="#2b2f36"/><path d="M62 34 q10 -14 22 -8" stroke="#b09867" stroke-width="3" fill="none"/><circle cx="86" cy="24" r="6" fill="#ffd25c"/>',
    carta: '<rect x="22" y="12" width="56" height="76" rx="5" fill="#fffdf6" stroke="#b9b1a0" stroke-width="2"/><path d="M32 30 h36 M32 42 h30 M32 54 h36 M32 66 h22" stroke="#b9b1a0" stroke-width="3" stroke-linecap="round"/><circle cx="68" cy="74" r="10" fill="#e5484d"/>',
    altro: '<path d="M50 14 L60 40 L88 40 L66 58 L74 86 L50 70 L26 86 L34 58 L12 40 L40 40Z" fill="#c4ced8" stroke="#7d8896" stroke-width="2"/>',
  };
  function weaponArt(name, h) {
    const n = norm(name); const k = (WEAP.find(([, re]) => re.test(n)) || ['altro'])[0];
    return '<svg class="axw" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="hsl(' + h + ' 60% 55%)" opacity=".16"/>' + WEAP_ART[k] + '</svg>';
  }

  /* ---------------- API ---------------- */
  // restituisce l'immagine vera se esiste, altrimenti l'illustrazione
  function pic(theme, kind, name, h, opts) {
    const key = kind === 'oggetti' ? name : kind === 'armi' ? weaponKey(name) : slug(name);
    const fam = (kind === 'meteo' || kind === 'disastri') ? family(name, opts && opts.extra, theme) : null;
    const real = url(theme, kind, key) || (fam && url(theme, kind, '_' + fam));
    const cls = 'ax ax-' + kind + (real ? ' ax-real' : '');
    if (real) return '<span class="' + cls + '"><img src="' + real + '" alt="" loading="lazy" decoding="async"></span>';
    let art;
    // luoghi senza foto: un ritaglio diverso del banner dell'arena, così restano immagini vere
    // senza un banner vero (Night City, per ora) si ritaglia la locandina vettoriale dell'arena
    const banner = (G.LOS_ASSETS && G.LOS_ASSETS.arene && G.LOS_ASSETS.arene[theme]) || (kind === 'luoghi' && G.LOS_ART && G.LOS_ART.sceneDataUri && theme === 'cyberpunk' ? G.LOS_ART.sceneDataUri(theme) : null);
    if (kind === 'luoghi' && banner) {
      const P = ['12% 70%', '50% 35%', '88% 60%', '28% 95%', '72% 85%', '50% 100%', '0% 40%', '100% 30%'];
      return '<span class="' + cls + ' ax-crop" style="background-image:url(&quot;' + banner + '&quot;);background-position:' + P[((opts && opts.index) || 0) % P.length] + '"></span>';
    }
    if (kind === 'oggetti') art = itemArt(name, h);
    else if (kind === 'pericoli') art = beastArt(name, h);
    else if (kind === 'armi') art = weaponArt(name, h);
    else if (kind === 'meteo') art = scene(fam, h, name);
    else if (kind === 'disastri') art = scene(fam, h, name, 'danger');
    else art = scene(family(name), h, name);
    return '<span class="' + cls + '" data-fam="' + (fam || '') + '">' + art + '</span>';
  }

  G.LOS_ATLAS = { pic, slug, weaponBaseName, weaponKey, family, has, count, kinds: ['luoghi', 'pericoli', 'armi', 'meteo', 'disastri', 'oggetti'], families: FAM.map((f) => f[0]) };
})(typeof window !== 'undefined' ? window : globalThis);
