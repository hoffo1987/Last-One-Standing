/* Last One Standing — la memoria tra le partite (src/bacheca.js).
 * Trofei (obiettivi, alcuni nascosti), l'album dei concorrenti con la rarità che cresce con le imprese,
 * la «Rivincita» (lo stesso cast torna con cicatrici, nuovi tratti e conti in sospeso) e le interviste di fine partita.
 * Tutto si salva nel profilo del giocatore (LOS_PARTITA.profilo) nel browser; nessun dato lascia il dispositivo. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const PT = () => G.LOS_PARTITA;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const suf = (t) => (t && t.gender === 'F' ? 'a' : t && t.gender === 'N' ? 'ə' : 'o');
  function rngOf(seed) { let h = 2166136261; for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1597334677) + 0x6d2b79f5 | 0) >>> 0) / 4294967296; }

  /* ================= i trofei =================
   * c: contesto della partita appena chiusa (vedi contesto()); p: profilo già aggiornato con questa partita. */
  const TROFEI = [
    // partite
    { id: 'prima', cat: 'Partite', nome: 'Prima diretta', desc: 'Guarda la tua prima partita fino all’esito.', ok: (c, p) => p.partite >= 1 },
    { id: 'dieci', cat: 'Partite', nome: 'Abbonato', desc: 'Arriva all’esito di 10 partite.', ok: (c, p) => p.partite >= 10 },
    { id: 'giramondo', cat: 'Partite', nome: 'Giramondo', desc: 'Gioca in tutte le arene.', ok: (c, p) => c.arene && (p.arene || []).length >= c.arene },
    { id: 'lampo', cat: 'Partite', nome: 'Fulmine', desc: 'Una partita che finisce in 3 giorni o meno.', ok: (c) => c.SIM.days <= 3 },
    { id: 'maratona', cat: 'Partite', nome: 'Maratona', desc: 'Una partita che dura 9 giorni o più.', ok: (c) => c.SIM.days >= 9 },
    { id: 'bagno', cat: 'Partite', nome: 'Bagno di sangue', desc: 'Metà del cast fuori già nel primo giorno.', ok: (c) => c.SIM.tributes.length >= 8 && c.morti1 >= Math.ceil(c.SIM.tributes.length / 2) },
    { id: 'perbene', cat: 'Partite', nome: 'Gente per bene', desc: 'Una partita con almeno 16 concorrenti e nessun tradimento.', ok: (c) => !(c.SIM.stats.betrayals > 0) && c.SIM.tributes.length >= 16 },
    { id: 'serpente', cat: 'Partite', nome: 'Serpente', desc: 'Vince chi ha tradito un alleato.', ok: (c) => c.W.some((t) => t.traitor || t.betrayals > 0) },
    { id: 'maniPulite', cat: 'Partite', nome: 'Mani pulite', desc: 'Vince chi non ha eliminato nessuno.', ok: (c) => c.W.some((t) => !t.kills) },
    { id: 'amoreVince', cat: 'Partite', nome: 'Amore vincente', desc: 'Vince qualcuno innamorato, e la sua metà arriva sul podio.', ok: (c) => (c.SIM.stats.stories || []).some((s) => s.k === 'amore' && (c.SIM.winners.includes(s.a) || c.SIM.winners.includes(s.b)) && (c.SIM.tributes.find((t) => t.id === (c.SIM.winners.includes(s.a) ? s.b : s.a)) || {}).rank <= 3) },
    // mentore
    { id: 'maestro', cat: 'Mentore', nome: 'Maestro', desc: 'Il tuo allievo vince la partita.', ok: (c) => c.mVince },
    { id: 'podio', cat: 'Mentore', nome: 'Sul podio', desc: 'Il tuo allievo arriva tra i primi tre.', ok: (c) => c.m && c.m.rank <= 3 },
    { id: 'miracolo', cat: 'Mentore', nome: 'Miracolo', desc: 'Vinci con un allievo che ha forza 3 o meno.', segreto: true, ok: (c) => c.mVince && c.m.attr && c.m.attr.for <= 3 },
    { id: 'disciplina', cat: 'Mentore', nome: 'Disciplina', desc: 'Il tuo allievo segue 5 ordini in una partita.', ok: (c) => c.ordiniOk >= 5 },
    { id: 'testaCalda', cat: 'Mentore', nome: 'Testa calda', desc: 'Il tuo allievo ignora 3 ordini in una partita.', segreto: true, ok: (c) => c.ordiniKo >= 3 },
    { id: 'guerra', cat: 'Mentore', nome: 'Macchina da guerra', desc: 'Il tuo allievo fa 5 eliminazioni.', ok: (c) => c.m && c.m.kills >= 5 },
    { id: 'ultimoIstante', cat: 'Mentore', nome: 'All’ultimo istante', desc: 'Il consiglio del mentore salva il tuo allievo da un colpo.', ok: (c) => c.g && (c.SIM.stats.mentorSaves || 0) > 0 },
    { id: 'dalNulla', cat: 'Mentore', nome: 'Ritorno dal nulla', desc: 'Vince un allievo adottato dopo la caduta del primo.', ok: (c) => c.mVince && (c.g.allievi || []).length > 0 },
    { id: 'sfortuna', cat: 'Mentore', nome: 'Allenatore sfortunato', desc: 'Perdi tre allievi nella stessa partita.', segreto: true, ok: (c) => c.g && (c.g.allievi || []).length >= 3 },
    // puntate
    { id: 'fiuto', cat: 'Puntate', nome: 'Fiuto', desc: 'Vinci una puntata.', ok: (c) => c.vinte >= 1 },
    { id: 'tris', cat: 'Puntate', nome: 'Tris', desc: 'Vinci 3 puntate di fila.', ok: (c) => c.serie >= 3 },
    { id: 'colpoGrosso', cat: 'Puntate', nome: 'Colpo grosso', desc: 'Vinci una puntata con quota 4 o più.', ok: (c) => c.g && c.g.puntate.some((b) => b.esito === 'vinta' && b.q >= 4) },
    { id: 'banco', cat: 'Puntate', nome: 'Banco saltato', desc: 'Chiudi una partita con 250 crediti o più.', ok: (c) => c.g && c.g.crediti >= 250 },
    { id: 'verde', cat: 'Puntate', nome: 'Al verde', desc: 'Chiudi una partita con meno di 10 crediti.', segreto: true, ok: (c) => c.g && c.g.crediti < 10 && (c.g.puntate.length || Object.keys(c.g.doni).length) },
    // doni
    { id: 'sponsor', cat: 'Doni', nome: 'Sponsor', desc: 'Manda il tuo primo dono.', ok: (c) => c.doni.length >= 1 },
    { id: 'mecenate', cat: 'Doni', nome: 'Mecenate', desc: 'Manda 5 doni nella stessa partita.', ok: (c) => c.doni.length >= 5 },
    { id: 'angelo', cat: 'Doni', nome: 'Angelo custode', desc: 'Chi riceve un tuo dono vince la partita.', ok: (c) => c.doni.some((d) => c.SIM.winners.includes(d.chi)) },
    // regia
    { id: 'capolavoro', cat: 'Regia', nome: 'Capolavoro', desc: 'Ottieni un voto della regia di 78 o più.', ok: (c) => c.voto && c.voto.tot >= 78 },
    { id: 'canale', cat: 'Regia', nome: 'Cambia canale', desc: 'Ottieni un voto della regia sotto 48.', segreto: true, ok: (c) => c.voto && c.voto.tot < 48 },
    { id: 'carte', cat: 'Regia', nome: 'Tutte le carte in tavola', desc: 'Gioca 4 carte della regia nella stessa partita.', ok: (c) => c.g && (c.g.regia || []).length >= 4 },
    { id: 'banchetto', cat: 'Regia', nome: 'Banchetto di sangue', desc: 'Nel giorno del tuo banchetto cadono almeno 3 concorrenti.', ok: (c) => c.g && (c.g.regia || []).some((r) => r.k === 'banchetto' && (c.mortiGiorno[r.day] || 0) >= 3) },
    // prove e pubblico
    { id: 'riflessi', cat: 'Prove', nome: 'Riflessi d’acciaio', desc: 'Fai un punteggio perfetto in una prova giocata.', ok: (c) => c.g && (c.g.prove || []).some((x) => x.punteggio >= 100) },
    { id: 'allenamento', cat: 'Prove', nome: 'Allenamento', desc: 'Gioca 3 prove nella stessa partita.', ok: (c) => c.g && (c.g.prove || []).length >= 3 },
    { id: 'occhio', cat: 'Pubblico', nome: 'Occhio lungo', desc: 'Vota il preferito che poi vince.', ok: (c) => c.g && Object.entries(c.g.voti || {}).some(([k, v]) => k !== 'tot' && c.SIM.winners.includes(v)) },
    { id: 'tifoso', cat: 'Pubblico', nome: 'Tifoso', desc: 'Vota 5 giorni nella stessa partita.', ok: (c) => c.g && Object.keys(c.g.voti || {}).filter((k) => k !== 'tot').length >= 5 },
    // rivincite e album
    { id: 'conti', cat: 'Rivincite', nome: 'Conti in sospeso', desc: 'In una rivincita, qualcuno elimina chi l’aveva eliminato.', ok: (c) => c.vendette > 0 },
    { id: 'saga', cat: 'Rivincite', nome: 'Saga', desc: 'Arriva alla terza edizione dello stesso cast.', ok: (c) => c.edizione >= 3 },
    { id: 'collezione', cat: 'Album', nome: 'Collezionista', desc: 'Raccogli 10 carte nell’album.', ok: (c, p) => Object.keys(p.album || {}).length >= 10 },
    { id: 'leggenda', cat: 'Album', nome: 'Leggenda', desc: 'Fai diventare leggendaria una carta.', ok: (c, p) => Object.values(p.album || {}).some((x) => rarita(x).k === 'leggendaria') },
    { id: 'bacheca', cat: 'Album', nome: 'Bacheca piena', desc: 'Sblocca 20 trofei.', ok: (c, p) => Object.keys(p.trofei || {}).length >= 20 },
  ];

  /* ================= l'album ================= */
  const RARITA = [
    { k: 'leggendaria', nome: 'Leggendaria', ok: (x) => x.vittorie >= 3 },
    { k: 'epica', nome: 'Epica', ok: (x) => x.vittorie >= 2 || (x.vittorie >= 1 && x.maxKills >= 5) },
    { k: 'rara', nome: 'Rara', ok: (x) => x.vittorie >= 1 || x.migliore <= 3 },
    { k: 'comune', nome: 'Comune', ok: () => true },
  ];
  const rarita = (x) => RARITA.find((r) => r.ok(x));
  // l'immagine si conserva solo se è piccola: l'album non deve riempire la memoria del browser
  const IMG_MAX = 120000, ALBUM_MAX = 150;
  function aggiornaAlbum(p, SIM, theme) {
    p.album = p.album || {};
    SIM.tributes.forEach((t) => {
      const old = p.album[t.id] || { id: t.id, partite: 0, vittorie: 0, uccisioni: 0, maxKills: 0, migliore: 99, arene: [] };
      const card = Object.assign(old, { name: t.name, gender: t.gender, team: t.team, traits: (t.traits || []).slice(0, 3), attr: Object.assign({}, t.attr), img: t.img && t.img.length <= IMG_MAX ? t.img : '' });
      card.partite++; card.uccisioni += t.kills || 0; card.maxKills = Math.max(card.maxKills, t.kills || 0); card.migliore = Math.min(card.migliore, t.rank || 99);
      if (SIM.winners.includes(t.id)) card.vittorie++;
      if (theme && !card.arene.includes(theme)) card.arene = card.arene.concat([theme]).slice(-12);
      card.ultima = Date.now();
      p.album[t.id] = card;
    });
    const keys = Object.keys(p.album);
    if (keys.length > ALBUM_MAX) keys.sort((a, b) => (p.album[a].ultima || 0) - (p.album[b].ultima || 0)).slice(0, keys.length - ALBUM_MAX).forEach((k) => delete p.album[k]);
  }

  /* ================= chiusura della partita: profilo, album, trofei ================= */
  function contesto(run, SIM, extra) {
    const g = run && run.gioco, by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
    const m = g && g.mentore ? by[g.mentore] : null, W = SIM.winners.map((id) => by[id]);
    const mortiGiorno = {}; SIM.phases.forEach((ph) => { if (ph.kind !== 'fallen') mortiGiorno[ph.day] = (mortiGiorno[ph.day] || 0) + ph.events.reduce((a, e) => a + e.deaths.length, 0); });
    const pts = g ? g.puntate.filter((b) => b.esito === 'vinta' || b.esito === 'persa').slice().sort((a, b) => (a.fase || 0) - (b.fase || 0)) : [];
    let serie = 0, cur = 0; pts.forEach((b) => { cur = b.esito === 'vinta' ? cur + 1 : 0; serie = Math.max(serie, cur); });
    const mem = run && run.cfg && run.cfg.memoria;
    const vendette = mem ? (mem.rivali || []).filter(([v, k]) => by[k] && (by[k].killerIds || []).includes(v)).length : 0;
    return Object.assign({ SIM, g, m, W, mVince: !!(m && SIM.winners.includes(m.id)), mortiGiorno, morti1: mortiGiorno[1] || 0,
      ordiniOk: g ? g.ordini.filter((o) => o.obeys).length : 0, ordiniKo: g ? g.ordini.filter((o) => o.obeys === false).length : 0,
      vinte: pts.filter((b) => b.esito === 'vinta').length, serie, doni: g ? Object.values(g.doni) : [], voto: g && (g.regia || []).length && PT() ? PT().votoRegia(SIM) : null,
      vendette, edizione: (run && run.cfg && run.cfg.edizione) || 1 }, extra || {});
  }
  // una volta sola per partita: restituisce i trofei appena sbloccati
  function registra(run, SIM, extra) {
    const pt = PT(); if (!pt || !run || !SIM) return [];
    const key = 'b:' + String((run.gioco && run.gioco.inizio) || run.replayId || run.cfg.seed);
    // le partite giocate le conta chiudiPartita (una volta sola); quelle solo guardate si contano qui
    if (run.gioco) pt.chiudiPartita(run, SIM);
    const p = pt.profilo();
    p.registrate = p.registrate || [];
    if (p.registrate.includes(key)) return [];
    p.registrate = p.registrate.concat([key]).slice(-80);
    if (!run.gioco) p.partite = (p.partite || 0) + 1;
    p.arene = [...new Set((p.arene || []).concat([SIM.theme]))];
    aggiornaAlbum(p, SIM, SIM.theme);
    const c = contesto(run, SIM, extra);
    p.trofei = p.trofei || {};
    const nuovi = [];
    // due giri: i trofei che contano altri trofei vedono anche quelli sbloccati adesso
    for (let giro = 0; giro < 2; giro++) TROFEI.forEach((t) => { if (p.trofei[t.id]) return; let ok = false; try { ok = !!t.ok(c, p); } catch (e) { ok = false; } if (ok) { p.trofei[t.id] = Date.now(); nuovi.push(t); } });
    pt.salvaProfilo(p);
    return nuovi;
  }

  /* ================= la rivincita ================= */
  // lo stesso cast torna: chi è sopravvissuto ha una cicatrice e un po' di esperienza, chi è stato eliminato vuole i suoi conti
  function rivincita(cfg, SIM, TRAITS) {
    const r = rngOf(SIM.seed + '|rivincita'), by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t]));
    const ATTRS = ['for', 'agi', 'int', 'car', 'fort', 'res', 'furt', 'cor', 'emp', 'sop'];
    const segni = {}, rivali = [];
    const cast = cfg.cast.map((c) => {
      const t = by[c.id], n = JSON.parse(JSON.stringify(c)); if (!t) return n;
      const traits = (n.traits || []).slice(), note = [];
      const addTrait = (id) => { if (traits.length < 3 && !traits.includes(id) && (!TRAITS || TRAITS[id])) { traits.push(id); return true; } return false; };
      if (t.alive) {
        n.attr.res = clamp((n.attr.res || 5) + 1, 1, 10); note.push('+1 Resistenza (veterano)');
        const a = ATTRS.filter((x) => x !== 'res')[Math.floor(r() * 9)]; n.attr[a] = clamp((n.attr[a] || 5) - 1, 1, 10); note.push('cicatrice: −1 ' + a);
        if (SIM.winners.includes(t.id) && addTrait('sopravvissuto')) note.push('nuovo tratto: Sopravvissuto');
      } else if ((t.killerIds || []).length) {
        if (r() < 0.5 && addTrait('vendicativo')) note.push('nuovo tratto: Vendicativo');
        t.killerIds.slice(0, 1).forEach((k) => { if (by[k]) rivali.push([t.id, k]); });
      }
      if (t.kills >= 3 && addTrait('spietato')) note.push('nuovo tratto: Spietato');
      n.traits = traits; if (note.length) segni[t.id] = note;
      return n;
    });
    // i legami: si tengono quelli di prima, si aggiungono le rivalità (chi è caduto contro chi l'ha eliminato) e le amicizie nate in gara
    const rel = (cfg.initialRelations || []).slice(), pairOf = (a, b) => [a, b].sort().join('|'), taken = new Set(rel.map((x) => pairOf(x.from, x.to)));
    const add = (from, to, type) => { const k = pairOf(from, to); if (from === to || taken.has(k) || rel.length >= 190) return; taken.add(k); rel.push({ from, to, type }); };
    rivali.slice(0, 12).forEach(([v, k]) => add(v, k, 'rivalita'));
    (SIM.stats.stories || []).forEach((s) => { if (s.k === 'amicizia') add(s.a, s.b, 'amicizia'); if (s.k === 'nemesi' || s.k === 'odio') add(s.a, s.b, 'rivalita'); });
    const edizione = (cfg.edizione || 1) + 1;
    return { cast, initialRelations: rel, memoria: { edizione, rivali, vincitore: SIM.winners[0] || null, segni, prima: (cfg.memoria && cfg.memoria.prima) || SIM.seed }, edizione };
  }

  /* ================= le interviste di fine partita ================= */
  function intervista(SIM, id, ctx) {
    const by = Object.fromEntries(SIM.tributes.map((t) => [t.id, t])), t = by[id]; if (!t) return [];
    const r = rngOf(SIM.seed + '|int|' + id), pick = (a) => a[Math.floor(r() * a.length)], soft = !!ctx.soft, out = [];
    const win = SIM.winners.includes(id), nm = (x) => esc(x.name);
    const story = (SIM.stats.stories || []).find((s) => (s.a === id || s.b === id) && (s.k === 'amore' || s.k === 'amicizia' || s.k === 'nemesi' || s.k === 'tradimento'));
    const other = story ? by[story.a === id ? story.b : story.a] : null;
    const gifts = (ctx.doni || []).filter((d) => d.chi === id).length;
    if (win) {
      out.push({ q: 'Come ti senti?', a: pick(['Non ci credo ancora. Ho le mani che tremano.', 'Stanc' + suf(t) + '. Felice. E un po’ in colpa per essere qui.', 'Come se avessi corso per ' + SIM.days + ' giorni senza mai fermarmi.']) });
      if (t.kills) out.push({ q: 'Hai eliminato ' + t.kills + (t.kills === 1 ? ' avversario' : ' avversari') + '. Rimpianti?', a: t.kills >= 3 ? pick(['Era loro o me. Ho scelto me.', 'Non li conto. Se li contassi, non dormirei.']) : pick(['Uno solo è già troppo. Ma non avevo scelta.', 'Ci penso ogni volta che chiudo gli occhi.']) });
      else out.push({ q: 'Hai vinto senza eliminare nessuno. Come hai fatto?', a: pick(['Mi sono fatt' + suf(t) + ' piccol' + suf(t) + '. Ho aspettato. Ho lasciato che fossero gli altri a sbagliare.', 'Fortuna, e tanta pazienza.']) });
    } else {
      const killer = (t.killerIds || []).map((k) => by[k]).find(Boolean);
      out.push({ q: 'Ci sei andat' + suf(t) + ' vicin' + suf(t) + '. Cosa è successo alla fine?', a: killer ? pick([(soft ? 'Mi ha battut' + suf(t) + ' ' : 'Mi ha pres' + suf(t) + ' ') + nm(killer) + '. Non l’ho visto arrivare.', nm(killer) + ' è stat' + suf(killer) + ' più veloce. Tutto qui.']) : pick(['L’arena. Non un avversario, l’arena.', 'Ero allo stremo. Il corpo ha deciso prima di me.']) });
    }
    if (other && story) {
      const q = story.k === 'amore' ? 'E ' + nm(other) + '?' : story.k === 'amicizia' ? 'Cosa diresti a ' + nm(other) + ' adesso?' : 'E con ' + nm(other) + ' come la mettiamo?';
      const a = story.k === 'amore' ? pick(['Senza di ' + (other.gender === 'F' ? 'lei' : other.gender === 'N' ? 'ləi' : 'lui') + ' non sarei qui. Punto.', 'Ci siamo promessi di uscire insieme. Una promessa è una promessa.']) : story.k === 'amicizia' ? pick(['Grazie. Mi hai coperto le spalle quando nessun altro lo faceva.', 'Che mi deve ancora una cena.']) : pick(['Non è finita. Non finisce mai, con certa gente.', 'Ci rivedremo. E la prossima volta sarò pront' + suf(t) + '.']);
      out.push({ q, a });
    }
    if (ctx.mentore === id) out.push({ q: 'Un messaggio per il tuo mentore?', a: win ? pick(['Grazie. Anche per le volte che non ti ho ascoltato.', 'Ce l’abbiamo fatta. Insieme.']) : pick(['Scusa. Ho fatto di testa mia una volta di troppo.', 'Mi hai dato una possibilità. Non l’ho sprecata del tutto.']) });
    else if (gifts) out.push({ q: 'Hai ricevuto ' + (gifts === 1 ? 'un dono' : gifts + ' doni') + ' dal pubblico.', a: pick(['A chi me l’ha mandato: ti devo la vita.', 'Quel pacco è arrivato nel momento giusto. Grazie, chiunque tu sia.']) });
    return out.slice(0, 3);
  }

  G.LOS_BACHECA = { TROFEI, RARITA, rarita, registra, rivincita, intervista, contesto };
})(typeof window !== 'undefined' ? window : globalThis);
