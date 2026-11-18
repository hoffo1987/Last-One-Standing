/* Last One Standing — telecronaca e pubblico (src/telecronaca.js).
 * Due voci commentano ogni fase della Diretta (Ettore, telecronista che si infiamma; Bianca, opinionista che non perdona)
 * e una chat del pubblico reagisce ai fatti veri: morti, tradimenti, doni, ordini del mentore, carte del Regista.
 * Tutto si ricava dalla fase già calcolata (nessun futuro) e da un seme: stessa partita, stesse battute. */
(function (G) {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function rngOf(seed) { let h = 2166136261; for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1597334677) + 0x6d2b79f5 | 0) >>> 0) / 4294967296; }
  const pickWith = (r) => (arr) => arr[Math.floor(r() * arr.length)];
  const suf = (t) => (t && t.gender === 'F' ? 'a' : t && t.gender === 'N' ? 'ə' : 'o');
  const lui = (t) => (t && t.gender === 'F' ? 'lei' : t && t.gender === 'N' ? 'ləi' : 'lui');
  const nm = (t) => '<b>' + esc(t ? t.name : '') + '</b>';

  const VOCI = { e: 'Ettore', b: 'Bianca' };
  const NICK = ['lupo_grigio', 'marti.v', 'zeta_99', 'kira', 'il_profeta', 'tommy', 'gabri_sss', 'nonna_rosa', 'darkangel', 'fede', 'ste_88', 'luce', 'pippo', 'giuly', 'ale.x', 'mister_b', 'sofi', 'nik', 'cassandra', 'vale_rossi',
    'bruno', 'occhio_di_falco', 'chiara', 'max', 'il_tifoso', 'ely', 'dani', 'gattonero', 'mattia', 'ire', 'polpetta', 'leo', 'sara.b', 'scommettitore', 'mirko', 'anto', 'la_regina', 'nico', 'ross', 'tizio_a_caso'];

  /* ---------- che cosa è successo nella fase: i fatti in ordine di peso ---------- */
  function fatti(SIM, i, ctx) {
    const ph = SIM.phases[i], P = SIM.phases, BY = ctx.BY, soft = !!ctx.soft, out = [];
    const evs = ph.events.filter((e) => !e.note), notes = ph.events.filter((e) => e.note);
    const deaths = ph.kind === 'fallen' ? [] : evs.flatMap((e) => e.deaths);
    const m = ctx.mentore && BY[ctx.mentore];
    if (m && deaths.includes(m.id)) out.push({ k: 'menMorto', t: m, w: 10 });
    notes.filter((e) => e.regia).forEach((e) => out.push({ k: 'regia', card: e.regia, w: 9 }));
    evs.filter((e) => e.dono).forEach((e) => out.push({ k: 'dono', t: BY[e.ids[0]], w: 8 }));
    evs.filter((e) => e.mentor).forEach((e) => out.push({ k: e.obeys ? 'ordineOk' : 'ordineKo', t: BY[e.ids[0]], w: 7 }));
    const killers = {}; evs.forEach((e) => { if (e.cat === 'kill' && e.deaths.length) { const k = e.ids.find((id) => !e.deaths.includes(id)); if (k) killers[k] = (killers[k] || 0) + e.deaths.length; } });
    Object.entries(killers).filter(([, n]) => n >= 2).forEach(([id, n]) => out.push({ k: 'serie', t: BY[id], n, w: 7 }));
    if (deaths.length >= 3) out.push({ k: 'strage', n: deaths.length, w: 6 });
    evs.filter((e) => e.cat === 'betray').slice(0, 1).forEach((e) => out.push({ k: 'tradimento', t: BY[e.ids[0]], u: BY[e.ids[1]], w: 6 }));
    evs.filter((e) => e.cat === 'love').slice(0, 1).forEach((e) => out.push({ k: 'amore', t: BY[e.ids[0]], u: BY[e.ids[1]], w: 4 }));
    evs.filter((e) => e.test && ctx.mentore && (e.test.who ? e.test.who === ctx.mentore : e.ids[0] === ctx.mentore)).forEach((e) => out.push({ k: e.test.pass ? 'provaOk' : 'provaKo', t: BY[ctx.mentore], w: 6 }));
    if (deaths.length === 1 && !out.some((f) => f.k === 'menMorto')) out.push({ k: 'morto', t: BY[deaths[0]], w: 3 });
    const alive = ph.snap.alive.length;
    if (alive <= 3 && alive > 1 && ph.kind !== 'fallen') out.push({ k: 'ultimi', n: alive, w: 5 });
    if (!deaths.length && ph.kind !== 'fallen' && ph.kind !== 'b') out.push({ k: 'calma', w: 1 });
    if (ph.kind === 'fallen') out.push({ k: 'caduti', n: ph.deaths ? ph.deaths.length : 0, w: 2 });
    if (i === 0) out.push({ k: 'via', n: SIM.tributes.length, w: 8 });
    if (i === 0 && ctx.memoria) { const rv = (ctx.memoria.rivali || []).find(([v, k]) => BY[v] && BY[k]); out.push({ k: 'rivincita', n: ctx.memoria.edizione, t: rv && BY[rv[0]], u: rv && BY[rv[1]], w: 9 }); }
    return out.sort((a, b) => b.w - a.w);
  }

  /* ---------- le due voci ---------- */
  const CARTA = { tempesta: 'il maltempo', banchetto: 'il banchetto', disastro: 'il pulsante rosso', buio: 'il buio totale', bestie: 'le gabbie aperte', rifornimenti: 'la pioggia di rifornimenti' };
  function battute(f, ctx, pick) {
    const soft = !!ctx.soft, t = f.t, u = f.u, fuori = soft ? 'fuori dai giochi' : 'fuori';
    switch (f.k) {
      case 'via': return [pick(['Signore e signori, si comincia! ' + f.n + ' concorrenti, una sola via d’uscita.', 'Buonasera e benvenuti! ' + f.n + ' concorrenti, e il segnale sta per suonare!']), pick(['Scommetto che metà non arriva a stasera.', 'Guardateli bene: tra poco ne resteranno molti meno.'])];
      case 'rivincita': return [pick(['Bentornati alla ' + f.n + 'ª edizione! Stesse facce, nuove cicatrici.', 'Edizione numero ' + f.n + ', amici: chi c’era si ricorda tutto.']) + (t && u ? ' ' + nm(t) + ' torna per regolare i conti con ' + nm(u) + '.' : ''), pick(['L’ultima volta finì male. Stavolta finirà peggio.', 'I rancori sono il miglior carburante della televisione.'])];
      case 'menMorto': return [pick(['Nooo! ' + nm(t) + ' è ' + fuori + '! Il suo mentore starà urlando davanti allo schermo!', 'Incredibile! Cade ' + nm(t) + ', l’allievo del nostro mentore!']), pick(['Il mentore farà meglio a scegliersi un nuovo cavallo.', 'Consigli sbagliati o sfortuna? Io un’idea ce l’ho.'])];
      case 'regia': return [pick(['La regia vuole spettacolo: arriva ' + (CARTA[f.card] || 'una sorpresa') + '!', 'Colpo di scena dalla cabina di regia: ' + (CARTA[f.card] || 'una sorpresa') + '!']), pick(['Finalmente qualcuno che sa fare televisione.', 'Crudele. Mi piace.', 'Vediamo chi ha le spalle abbastanza larghe.'])];
      case 'dono': return [pick(['Un dono dal pubblico per ' + nm(t) + '! Qualcuno a casa crede in ' + lui(t) + '!', 'Paracadute in arrivo! ' + nm(t) + ' ha appena trovato un amico là fuori.']), pick(['Soldi spesi bene? Lo vedremo stanotte.', 'Commovente. E molto, molto costoso.'])];
      case 'ordineOk': return [pick([nm(t) + ' ascolta il suo mentore! Che disciplina!', 'Ordine ricevuto ed eseguito: ' + nm(t) + ' si fida.']), pick(['Obbedire è facile. Sopravvivere un po’ meno.', 'Vediamo se il consiglio era buono.'])];
      case 'ordineKo': return [pick([nm(t) + ' fa di testa sua! Il mentore è avvisato!', 'Ribellione! ' + nm(t) + ' ignora il consiglio!']), pick(['Ha ragione. Io non mi fiderei di nessuno, figuriamoci di un mentore.', 'Testard' + suf(t) + '. O geniale. Lo sapremo presto.'])];
      case 'serie': return [pick(['Che serie per ' + nm(t) + '! ' + f.n + ' avversari ' + fuori + ' in una sola fase!', nm(t) + ' è una furia: ' + f.n + ' in un colpo solo!']), pick(['Qualcuno fermi ' + nm(t) + '. Anzi no, continuate.', 'Adesso ha un bersaglio sulla schiena grande come una casa.'])];
      case 'strage': return [pick([f.n + ' ' + fuori + ' in una fase sola! Non ho parole!', 'Una carneficina, amici: ' + f.n + ' in un colpo!'].map((x) => soft ? x.replace('Una carneficina', 'Un terremoto') : x)), pick(['Finalmente un po’ di ritmo.', 'Il pubblico si sveglia di colpo.'])];
      case 'tradimento': return [pick(['Tradimento! ' + nm(t) + ' pugnala alle spalle ' + nm(u) + '!', nm(t) + ' tradisce ' + nm(u) + '! Chi l’avrebbe mai detto?'].map((x) => soft ? x.replace('pugnala alle spalle', 'volta le spalle a') : x)), pick(['Io l’avevo detto: mai fidarsi di chi sorride troppo.', 'Le alleanze qui durano quanto un gelato al sole.'])];
      case 'amore': return [pick(['Nasce qualcosa tra ' + nm(t) + ' e ' + nm(u) + '! Il pubblico va in visibilio!', 'Cuori nell’arena: ' + nm(t) + ' e ' + nm(u) + '!']), pick(['Romantico. Finirà malissimo.', 'Gli sponsor adorano le coppie. Io adoro quando litigano.'])];
      case 'provaOk': return [pick([nm(t) + ' supera la prova! Che riflessi!', 'Prova superata da ' + nm(t) + '! Il mentore può respirare!']), pick(['Fortuna del principiante.', 'Va bene, ammetto: è stat' + suf(t) + ' brav' + suf(t) + '.'])];
      case 'provaKo': return [pick(['Niente da fare per ' + nm(t) + ', la prova va storta!', nm(t) + ' sbaglia la prova! Che peccato!']), pick(['Errori così si pagano, qui dentro.', 'Il mentore dovrebbe allenarl' + suf(t) + ' di più.'])];
      case 'morto': return [pick(['Cade ' + nm(t) + '. Un minuto di silenzio… ma solo uno.', nm(t) + ' esce di scena.']), pick(['Nessuno se ne ricorderà tra due giorni.', 'Era nell’aria.', 'Peccato: mi stava quasi simpatic' + suf(t) + '.'])];
      case 'ultimi': return [pick(['Siamo agli ultimi ' + f.n + '! Il cuore batte forte!', 'Restano solo in ' + f.n + '! Ci siamo quasi!']), pick(['Adesso si fa sul serio.', 'Ora vediamo chi ha davvero fame.'])];
      case 'caduti': return [f.n ? pick(['Il bilancio della giornata: ' + f.n + ' volti che non rivedremo.', 'Ecco chi ci ha lasciato oggi: ' + f.n + '.']) : 'Nessun volto nel cielo, stanotte.', pick(['Domani se ne aggiungeranno altri.', 'Il cielo è sempre più affollato.'])];
      default: return [pick(['Calma apparente, amici… ma è proprio adesso che succede qualcosa.', 'Momento tranquillo nell’arena. Troppo tranquillo.']), pick(['Zero eliminazioni. Il pubblico sbadiglia.', 'Qualcuno svegli i concorrenti, per favore.', 'La regia starà già preparando qualcosa.'])];
    }
  }
  function commento(SIM, i, ctx) {
    const pick = pickWith(rngOf(SIM.seed + '|tc|' + i)), F = fatti(SIM, i, ctx);
    const f = F[0] || { k: 'calma' }, [a, b] = battute(f, ctx, pick);
    return [{ voce: 'e', nome: VOCI.e, html: a }, { voce: 'b', nome: VOCI.b, html: b }];
  }

  /* ---------- la chat del pubblico ---------- */
  function favorito(SIM, i) {
    const ph = SIM.phases[i]; let best = null, bv = -1;
    ph.snap.alive.forEach((id) => { const v = ((ph.snap.rel[id] || {}).f || 0) * 3 + (ph.snap.kills[id] || 0); if (v > bv) { bv = v; best = id; } });
    return best;
  }
  function chat(SIM, i, ctx) {
    const r = rngOf(SIM.seed + '|chat|' + i), pick = pickWith(r), BY = ctx.BY, soft = !!ctx.soft;
    const ph = SIM.phases[i], F = fatti(SIM, i, ctx), out = [], fav = favorito(SIM, i);
    const say = (txt, cls) => out.push({ user: pick(NICK), html: txt, cls: cls || '' });
    F.slice(0, 4).forEach((f) => {
      const t = f.t, n = t ? nm(t) : '';
      if (f.k === 'menMorto' || f.k === 'morto') { say(pick(['NOOO ' + n, 'F per ' + n, 'no vabbè ' + n + ' no', 'ciao ' + n + ', eri il mio preferito']), 'sad'); say(pick(['lo sapevo', 'chi l’ha visto arrivare?', 'mi sono perso qualcosa? chi è uscito?'])); }
      else if (f.k === 'dono') say(pick(['chi ha mandato il pacco a ' + n + '? genio', 'GRANDE chi ha regalato a ' + n, 'ma perché a ' + n + ' e non al mio preferito']), 'gift');
      else if (f.k === 'ordineKo') say(pick([n + ' ribelle, mi piace', 'ahahah ' + n + ' ignora il mentore', 'il mentore piange']));
      else if (f.k === 'ordineOk') say(pick(['bravo il mentore', n + ' obbediente', 'strategia!!']));
      else if (f.k === 'serie') say(pick([n + ' è una MACCHINA', 'qualcuno fermi ' + n, n + ' mvp']), 'hype');
      else if (f.k === 'tradimento') say(pick(['TRADITORE', 'nooo l’alleanza', 'lo sapevo che ' + n + ' era viscid' + suf(t)]), 'hype');
      else if (f.k === 'amore') say(pick(['shippo fortissimo', 'coppia dell’anno', 'aww']), 'love');
      else if (f.k === 'regia') say(pick(['la regia oggi è cattiva', 'chi ha deciso ' + (CARTA[f.card] || 'questo') + '???', 'eccoli, i colpi di scena']), 'hype');
      else if (f.k === 'strage') say(pick(['che FASE', 'ma stanno cadendo come mosche', 'adrenalina pura']), 'hype');
      else if (f.k === 'ultimi') say(pick(['finale vicino!!', 'chi vince secondo voi?', 'sto tremando']), 'hype');
      else if (f.k === 'calma') say(pick(['ma succede qualcosa?', 'zzz', 'pausa merenda', 'questa è la quiete prima della tempesta']));
      else if (f.k === 'provaOk') say(pick(['che riflessi ' + n, 'prova SUPERATA', 'clutch']), 'hype');
      else if (f.k === 'provaKo') say(pick(['noooo la prova', 'ci voleva più concentrazione']));
    });
    if (fav && BY[fav]) say(pick(['forza ' + nm(BY[fav]) + '!!', nm(BY[fav]) + ' vince, lo dico io', 'team ' + nm(BY[fav])]), 'fav');
    if (ctx.mentore && ph.snap.alive.includes(ctx.mentore) && r() < 0.6) say(pick(['chi segue ' + nm(BY[ctx.mentore]) + '?', nm(BY[ctx.mentore]) + ' sottovalutat' + suf(BY[ctx.mentore]), 'occhio a ' + nm(BY[ctx.mentore])]));
    if (r() < 0.5) say(pick(['ho puntato tutto, sto sudando', 'saluti da Bari', 'prima volta che guardo, bellissimo', 'chi c’è dalla prima puntata?', soft ? 'questo posto è assurdo' : 'quest’arena è un incubo']));
    return out.slice(0, 7);
  }

  /* ---------- il sondaggio: chi è il preferito del pubblico ---------- */
  function sondaggio(SIM, i, votes) {
    const ph = SIM.phases[i], r = rngOf(SIM.seed + '|poll|' + ph.day);
    const ids = ph.snap.alive.slice().sort((a, b) => ((ph.snap.rel[b] || {}).f || 0) - ((ph.snap.rel[a] || {}).f || 0) || (ph.snap.kills[b] || 0) - (ph.snap.kills[a] || 0)).slice(0, 4);
    const w = ids.map((id) => Math.pow(((ph.snap.rel[id] || {}).f || 0) + 1.5, 1.4) * (0.75 + r() * 0.5) + (votes && votes[id] ? 0.6 * votes[id] : 0));
    const tot = w.reduce((s, x) => s + x, 0) || 1;
    return ids.map((id, k) => ({ id, pct: Math.round((w[k] / tot) * 100) })).sort((a, b) => b.pct - a.pct);
  }

  G.LOS_TELECRONACA = { commento, chat, sondaggio, favorito, fatti };
})(typeof window !== 'undefined' ? window : globalThis);
