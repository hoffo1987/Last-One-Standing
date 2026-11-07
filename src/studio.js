/* Strumenti facoltativi: legami iniziali, eventi, campioni e stagioni. */
(function (G) {
  'use strict';
  const copy = (x) => JSON.parse(JSON.stringify(x));
  const METRICS = { saves: 'Aiuti prestati', nursed: 'Cure agli altri', promisesKept: 'Promesse mantenute', testsPassed: 'Prove superate', crafts: 'Oggetti costruiti o modificati', betrayals: 'Tradimenti' };
  const STORY_KINDS = new Set(['nemesi', 'odio', 'tradimento']);
  const record = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
  // nome della fase con il calendario della diretta («Secondo giorno», «Finale, atto 2…»), senza «G1»
  const phaseName = (result, st) => (G.LOS_PHASE_NAME && st.phase != null && G.LOS_PHASE_NAME(result, +st.phase)) || ('Giorno ' + (st.day || 1) + ' · ' + st.title);
  function roundDetails(result) {
    return {
      participants: result.tributes.map((t) => ({ id: t.id, rank: t.rank, kills: t.kills, winner: result.winners.includes(t.id), achievements: Object.fromEntries(Object.keys(METRICS).map((key) => [key, t[key] || 0])) })),
      stories: (result.stats.stories || []).filter((s) => STORY_KINDS.has(s.k)).map((s) => ({ k: s.k, a: s.a, b: s.b })),
    };
  }
  function seasonHighlights(season) {
    const totals = new Map(season.configuration.cast.map((t) => [t.id, { id: t.id, name: t.name, values: Object.fromEntries(Object.keys(METRICS).map((k) => [k, 0])) }])), pairs = new Map();
    let detailed = 0;
    for (const round of season.rounds) {
      if (round.participants.every((p) => record(p.achievements))) detailed++;
      for (const p of round.participants) if (totals.has(p.id)) for (const key of Object.keys(METRICS)) totals.get(p.id).values[key] += p.achievements?.[key] || 0;
      const inRound = new Set();
      for (const story of round.stories || []) {
        const ids = story.k === 'tradimento' ? [story.a, story.b] : [story.a, story.b].sort(), key = JSON.stringify([story.k, ...ids]);
        if (inRound.has(key)) continue; inRound.add(key);
        if (!pairs.has(key)) pairs.set(key, { k: story.k, a: ids[0], b: ids[1], rounds: 0 });
        pairs.get(key).rounds++;
      }
    }
    const awards = Object.entries(METRICS).map(([key, label]) => {
      const best = Math.max(0, ...[...totals.values()].map((t) => t.values[key]));
      return { key, label, value: best, people: [...totals.values()].filter((t) => best > 0 && t.values[key] === best).map((t) => ({ id: t.id, name: t.name })) };
    }).filter((a) => a.value > 0);
    return { detailed, awards, rivalries: [...pairs.values()].filter((r) => r.rounds >= 2).sort((a, b) => b.rounds - a.rounds || a.k.localeCompare(b.k) || a.a.localeCompare(b.a)) };
  }
  function attributeSummary(cast, people, completed, attrs) {
    return attrs.map((attr) => {
      const groups = [{ label: '1–4', people: 0, wins: 0 }, { label: '5–7', people: 0, wins: 0 }, { label: '8–10', people: 0, wins: 0 }];
      for (const t of cast) { const value = t.attr?.[attr.id] ?? 5, group = groups[value <= 4 ? 0 : value <= 7 ? 1 : 2]; group.people++; group.wins += people[t.id]?.wins || 0; }
      for (const g of groups) { g.appearances = g.people * completed; g.frequency = g.appearances ? 100 * g.wins / g.appearances : null; }
      return { id: attr.id, name: attr.name, groups, difference: groups[0].frequency != null && groups[2].frequency != null ? groups[2].frequency - groups[0].frequency : null };
    });
  }
  function personalTimeline(result, id, through) {
    const t = result.tributes.find((p) => p.id === id); if (!t || !Number.isInteger(through) || through < 0) return [];
    const phases = result.phases.slice(0, Math.min(through + 1, result.phases.length)), memories = new Map(), diary = new Map();
    for (const [other, list] of Object.entries(t.mem || {})) for (const m of list) { if (!memories.has(m.ph)) memories.set(m.ph, []); memories.get(m.ph).push({ other, ...m }); }
    for (const page of t.diary || []) { if (!diary.has(page.ph)) diary.set(page.ph, []); diary.get(page.ph).push(page); }
    return phases.map((p, phase) => {
      const events = p.events.map((e, index) => ({ ...e, index })).filter((e) => e.ids.includes(id)), changes = [], previous = phases[phase - 1]?.snap, current = p.snap;
      const items = current.inv?.[id] || [];
      if (!previous) items.forEach((item) => changes.push({ kind: 'initialItem', item }));
      if (previous && previous.alive.includes(id)) {
        const before = previous.vit?.[id], after = current.vit?.[id];
        if (before && after) before.forEach((value, index) => { if (value >= 0 && after[index] >= 0 && Math.abs(after[index] - value) >= (index === 0 ? 1 : 10)) changes.push({ kind: 'vital', index, before: value, after: after[index] }); });
        for (const [oldList, newList, kind] of [[previous.st?.[id] || [], current.st?.[id] || [], 'statusRemoved'], [current.st?.[id] || [], previous.st?.[id] || [], 'statusAdded']]) for (const state of oldList) if (!newList.includes(state)) changes.push({ kind, state });
        const itemKey = (item) => JSON.stringify([item.t, item.n, item.q || 0, item.x || '', item.f || '', item.h || '']);
        for (const [oldList, newList, kind] of [[previous.inv?.[id] || [], items, 'itemRemoved'], [items, previous.inv?.[id] || [], 'itemAdded']]) {
          const remaining = newList.map(itemKey);
          for (const item of oldList) { const index = remaining.indexOf(itemKey(item)); if (index >= 0) remaining.splice(index, 1); else changes.push({ kind, item }); }
        }
        if (previous.rel?.[id]?.p !== current.rel?.[id]?.p) changes.push({ kind: 'partner', before: previous.rel?.[id]?.p || null, after: current.rel?.[id]?.p || null });
        if (!current.alive.includes(id)) changes.push({ kind: 'exit' });
      }
      const beforeKills = previous?.kills?.[id] || 0, afterKills = current.kills?.[id] || 0;
      if (afterKills > beforeKills) changes.push({ kind: 'credit', before: beforeKills, after: afterKills });
      return { phase, day: p.day, title: p.title, events, changes, movements:(result.spatial?.moves||[]).filter(m=>m.ph===phase&&m.id===id), itemFacts: (result.itemFacts || []).filter(f => f.ph === phase && (f.who === id || f.owner === id)), memories: memories.get(phase) || [], diary: diary.get(phase) || [] };
    }).filter((p) => p.events.length || p.changes.length || p.movements.length || p.itemFacts.length || p.memories.length || p.diary.length);
  }
  function seasonScores(season) {
    const rows = new Map(season.configuration.cast.map((t) => [t.id, { id: t.id, name: t.name, points: 0, wins: 0, kills: 0, played: 0, rankSum: 0 }]));
    for (const round of season.rounds) for (const p of round.participants) {
      const row = rows.get(p.id); if (!row) continue;
      row.played++; row.wins += p.winner ? 1 : 0; row.kills += p.kills; row.rankSum += p.rank; row.points += 1 + (p.winner ? 3 : 0) + p.kills;
    }
    return [...rows.values()].sort((a, b) => b.points - a.points || b.wins - a.wins || (a.rankSum / (a.played || 1)) - (b.rankSum / (b.played || 1)) || a.name.localeCompare(b.name));
  }
  function causalSteps(result, id) {
    const candidates = [];
    result.phases.forEach((phase, pi) => phase.events.forEach((event, ei) => {
      const involved = event.ids.includes(id), credited = event.deaths.some((victim) => result.tributes.find((t) => t.id === victim)?.killerIds.includes(id));
      if (!involved && !credited || event.note) return;
      const twist = (event.echo || []).some((e) => e.cls === 'twist');
      const label = credited ? 'Un’eliminazione attribuita' : twist ? 'Un colpo di scena' : event.sponsor ? 'Gli sponsor' : event.cat === 'heal' ? 'Un incontro di aiuto' : event.cat === 'betray' ? 'Un tradimento' : event.reason ? 'Un incontro legato alla storia' : null;
      if (label) candidates.push({ phase: pi, event: ei, title: phase.title, day: phase.day, plain: event.plain, reason: event.reason || '', label, priority: twist ? 5 : event.sponsor ? 4 : credited ? 3 : 2 });
    }));
    const selected = candidates.slice().sort((a, b) => b.priority - a.priority || a.phase - b.phase).slice(0, 5);
    const last = candidates[candidates.length - 1]; if (last && !selected.includes(last)) selected.push(last);
    return selected.sort((a, b) => a.phase - b.phase || a.event - b.event);
  }
  function init(A) {
    const { S, L, D, REPLAY, RUNNER, esc, plural } = A;
    const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
    const relationNames = { amicizia: 'Amicizia', rivalita: 'Rivalità', coppia: 'Coppia', fiducia: 'Fiducia →', attrazione: 'Attrazione →' };
    let editing = null, labToken = 0, labActive = false, labStats = null, seasonRunning = false, seasonIOBusy = false, expToken = 0, expActive = false, expReport = null;
    function keepSeasons(next) { if (!A.commitSeasons(next)) throw new Error('La stagione non è stata salvata: libera spazio nel browser o esporta i dati importanti.'); }
    function renderRelations() {
      const ids = new Set(S.cast.map((t) => t.id));
      S.initialRelations = (S.initialRelations || []).filter((r) => ids.has(r.from) && ids.has(r.to));
      const values = [$('#relationFrom').value, $('#relationTo').value];
      const options = S.cast.map((t) => '<option value="' + esc(t.id) + '">' + esc(t.name || 'Senza nome') + '</option>').join('');
      $('#relationFrom').innerHTML = options; $('#relationTo').innerHTML = options;
      if (ids.has(values[0])) $('#relationFrom').value = values[0];
      if (ids.has(values[1])) $('#relationTo').value = values[1]; else if (S.cast.length > 1) $('#relationTo').selectedIndex = 1;
      const names = Object.fromEntries(S.cast.map((t) => [t.id, t.name]));
      $('#relationsList').innerHTML = S.initialRelations.length ? '<ul class="studio-list">' + S.initialRelations.map((r, i) => '<li>' + esc(names[r.from]) + ' · ' + relationNames[r.type] + ' · ' + esc(names[r.to]) + ' <button class="btn sm" type="button" data-relation-remove="' + i + '">Rimuovi legame</button></li>').join('') + '</ul>' : '<p class="help">Nessun legame impostato: i rapporti nasceranno durante la partita.</p>';
      $('#relationAdd').disabled = S.cast.length < 2;
    }
    $('#relationAdd').addEventListener('click', () => {
      try { S.initialRelations = L.normalizeInitialRelations([...(S.initialRelations || []), { from: $('#relationFrom').value, to: $('#relationTo').value, type: $('#relationType').value }], S.cast); A.save(); renderRelations(); $('#relationMsg').textContent = 'Legame aggiunto alle prossime partite.'; }
      catch (e) { $('#relationMsg').textContent = e.message; }
    });
    $('#relationsList').addEventListener('click', (e) => { const b = e.target.closest('[data-relation-remove]'); if (!b) return; S.initialRelations.splice(+b.dataset.relationRemove, 1); A.save(); renderRelations(); });

    function memoryHTML(t, m, theme) {
      const dictionary = { ...(D.mind?.mem || {}), ...(D.bonds?.mem || {}), ...(theme.soft ? { ...(D.mind?.memSoft || {}), ...(D.bonds?.memSoft || {}) } : {}) };
      return dictionary[m.k] ? A.fill(dictionary[m.k], [t.id, m.other, m.x]) : '';
    }
    function changeText(change, t, theme, result) {
      const name = (id) => result.tributes.find((p) => p.id === id)?.name || 'nessuno';
      if (change.kind === 'vital') { const labels = A.vitLabels(theme), meter = D.eco?.arenas[theme.id]?.meter; return ([labels.hp, labels.en, labels.mo, labels.food, meter?.name || 'Indicatore dell’arena'][change.index]) + ': ' + change.before + ' → ' + change.after; }
      if (change.kind === 'statusAdded' || change.kind === 'statusRemoved') return (change.kind === 'statusAdded' ? 'Nuova condizione: ' : 'Condizione terminata: ') + A.statusLabel(change.state, t, theme);
      if (change.kind === 'partner') return change.after ? 'In coppia con ' + name(change.after) : 'Finisce la coppia con ' + name(change.before);
      if (change.kind === 'exit') return theme.soft ? 'Fuori dai giochi' : 'Fine della partecipazione';
      if (change.kind === 'credit') return 'Eliminazioni attribuite: ' + change.before + ' → ' + change.after;
      return ({ initialItem: 'Zaino alla prima fase: ', itemAdded: 'Nello zaino entra: ', itemRemoved: 'Dallo zaino esce: ' }[change.kind] || '') + change.item.n;
    }
    function revisit(phase) {
      if (S.settings.followOnly) { S.settings.followOnly = false; A.save(); A.toast('Filtro dei seguiti disattivato per mostrare tutta la fase.'); }
      $('#profDlg')?.close?.(); A.go(phase); if (location.hash !== '#diretta') location.hash = '#diretta';
    }
    function itemFactsHTML(facts, result, theme) {
      const labels = { consume: 'Consumo', heal: 'Cura', protect: 'Eliminazione diretta evitata', absorb: 'Protezione dai danni', bonus: 'Bonus applicato', craft: 'Lavorazione', deploy: 'Trappola piazzata', attack: 'Attacco con oggetto', poison: 'Veleno', accident: 'Incidente', comfort: 'Ricordo' };
      const names = Object.fromEntries(result.tributes.map(t => [t.id, t.name])), v = A.vitLabels(theme), keys = { hp: v.hp, en: v.en, mo: v.mo, food: v.food, pr: D.eco?.arenas[theme.id]?.meter?.name || 'Indicatore' };
      return facts.length ? '<ul class="item-facts">' + facts.map(f => {
        const changes = Object.entries(keys).filter(([k]) => f.before[k] !== f.after[k]).map(([k, label]) => label + ' ' + f.before[k].toFixed(1) + ' → ' + f.after[k].toFixed(1));
        if (f.before.infected !== f.after.infected) changes.push(f.after.infected ? 'Infezione presente' : 'Infezione rimossa');
        const target = result.tributes.find(t => t.id === f.who);
        f.before.states.filter(s => !f.after.states.includes(s)).forEach(s => changes.push('Termina: ' + A.statusLabel(s, target, theme)));
        f.after.states.filter(s => !f.before.states.includes(s)).forEach(s => changes.push('Condizione: ' + A.statusLabel(s, target, theme)));
        return '<li><b>' + labels[f.kind] + ' · ' + esc(f.item.n) + '</b><p>' + esc(names[f.owner]) + (f.owner !== f.who ? ' → ' + esc(names[f.who]) : '') + ' · ' + esc(f.detail) + '</p>' + (changes.length ? '<p class="help">Variazioni nell’azione: ' + esc(changes.join(' · ')) + '</p>' : '') + (f.context ? '<p class="help">Evento: ' + esc(f.context) + '</p>' : '') + '</li>';
      }).join('') + '</ul>' : '';
    }
    function renderProfile(t, phase) {
      const on = (S.followed || []).includes(t.id), heading = $('#h-prof'); if (!heading) return;
      const result = A.getSIM(), theme = D.themes.find((th) => th.id === result.theme), timeline = personalTimeline(result, t.id, phase);
      const history = '<details class="personal-history"><summary>Il percorso fino a questa fase · ' + plural(timeline.length, 'tappa', 'tappe') + '</summary><p class="help">In ordine cronologico: eventi, ricordi, diario e cambiamenti tra fine fase e fine fase. Le variazioni di salute compaiono sempre; per gli altri valori mostriamo quelle di almeno 10 punti. Un oggetto può entrare e uscire nella stessa fase senza comparire nel confronto dello zaino.</p><ol class="causal-path">' + timeline.map((step) => '<li><b>' + esc(phaseName(result, step)) + '</b>' +
        (step.movements.length?'<ul class="personal-route">'+step.movements.map(m=>'<li>'+esc(m.path.map(z=>result.spatial.zones[z].name).join(' → '))+' · '+esc(m.reason)+' · Energia −'+m.cost+'</li>').join('')+'</ul>':'')+
        (step.changes.length ? '<ul class="change-list">' + step.changes.map((c) => '<li>' + esc(changeText(c, t, theme, result)) + '</li>').join('') + '</ul>' : '') +
        itemFactsHTML(step.itemFacts, result, theme) + step.events.map((e) => '<p>' + esc(e.plain) + '</p>').join('') + step.memories.map((m) => memoryHTML(t, m, theme)).filter(Boolean).map((m) => '<p class="help">Ricordo: «' + m + '»</p>').join('') + step.diary.map((page) => '<p class="diary-entry"><span class="sub">Diario</span> ' + A.linkify(page.h) + '</p>').join('') +
        '<button class="btn sm" type="button" data-personal-phase="' + step.phase + '">Rivedi la fase ' + (step.phase + 1) + '</button></li>').join('') + '</ol></details>';
      heading.parentElement.insertAdjacentHTML('afterend', '<div class="follow-control"><button class="btn" type="button" data-follow="' + esc(t.id) + '" aria-pressed="' + on + '">' + (on ? 'Non seguire più' : 'Segui questo concorrente') + '</button></div>' + history);
    }
    document.addEventListener('click', (e) => {
      const phase = e.target.closest('[data-personal-phase]'); if (phase) { revisit(+phase.dataset.personalPhase); return; }
      const b = e.target.closest('[data-follow]'); if (!b) return;
      const result = A.getSIM(); if (!result || !result.tributes.some((t) => t.id === b.dataset.follow)) return;
      const set = new Set(S.followed || []); if (set.has(b.dataset.follow)) set.delete(b.dataset.follow); else set.add(b.dataset.follow);
      S.followed = [...set]; A.save(); const on = set.has(b.dataset.follow); b.setAttribute('aria-pressed', on); b.textContent = on ? 'Non seguire più' : 'Segui questo concorrente';
      if (location.hash === '#diretta') A.renderLive(true);
    });
    function renderResults() {
      const result = A.getSIM(); if (!result) return;
      $('#causalReport')?.remove();
      const names = Object.fromEntries(result.tributes.map((t) => [t.id, t.name]));
      const html = result.winners.map((id) => {
        const steps = causalSteps(result, id);
        const t = result.tributes.find((p) => p.id === id), theme = D.themes.find((th) => th.id === result.theme);
        const support = personalTimeline(result, id, result.phases.length - 1).map((p) => ({ ...p, memories: p.memories.filter((m) => ['saved', 'cured', 'shared', 'gift', 'spared'].includes(m.k)), changes: p.changes.filter((c) => ['initialItem', 'itemAdded', 'itemRemoved'].includes(c.kind)) })).filter((p) => p.memories.length || p.changes.length || p.itemFacts.length);
        return '<details><summary>Il percorso di ' + esc(names[id]) + '</summary>' + (steps.length ? '<ol class="causal-path">' + steps.map((step) => '<li><b>' + step.label + '</b><span class="help">Giorno ' + step.day + ' · ' + esc(step.title) + '</span><p>' + esc(step.plain) + '</p>' + (step.reason ? '<p class="help">' + esc(step.reason) + '</p>' : '') + '<button class="btn sm" type="button" data-story-phase="' + step.phase + '">Rivedi questa fase</button></li>').join('') + '</ol>' : '<p class="help">La vittoria è arrivata senza altri passaggi registrati di questi tipi.</p>') +
          '<details><summary>Aiuti ricevuti e storia dello zaino</summary><p class="help">' + (result.itemFacts ? 'Il registro mostra utilizzi e bonus effettivamente applicati, con le variazioni nell’azione. Il confronto dello zaino resta separato: la presenza di un oggetto non dimostra un effetto sulla vittoria.' : 'Questo replay precede il registro degli oggetti: restano disponibili ricordi e confronti di fine fase, senza ricostruire utilizzi non registrati.') + '</p><ol class="causal-path">' + support.map((p) => '<li><b>' + esc(phaseName(result, p)) + '</b>' + itemFactsHTML(p.itemFacts, result, theme) + p.memories.map((m) => memoryHTML(t, m, theme)).filter(Boolean).map((m) => '<p>«' + m + '»</p>').join('') + '<ul>' + p.changes.map((c) => '<li>' + esc(changeText(c, t, theme, result)) + '</li>').join('') + '</ul><button class="btn sm" type="button" data-story-phase="' + p.phase + '">Rivedi questa fase</button></li>').join('') + '</ol></details></details>';
      }).join('');
      $('#resBody .resgrid').insertAdjacentHTML('beforebegin', '<section class="block card studio-panel" id="causalReport"><h2>Le svolte della vittoria</h2><p class="help">Eventi e condizioni realmente registrati. Le tappe raccontano il percorso, senza attribuire un effetto decisivo che il motore non ha misurato.</p>' + html + '</section>');
    }
    $('#resBody').addEventListener('click', (e) => { const b = e.target.closest('[data-story-phase]'); if (!b) return;
      revisit(+b.dataset.storyPhase); });

    // Lo stesso validatore dell'importazione è usato per modifiche e pacchetti.
    const candidateEvent = () => ({ id: editing || A.inputId('e'), phase: $('#advancedPhase').value, raw: $('#advancedLine').value.trim() });
    function previewAdvanced() {
      if (!$('#advancedLine').value.trim()) { $('#advancedPreview').textContent = ''; return; }
      try { const event = A.normalizeCustoms([candidateEvent()])[0]; $('#advancedPreview').innerHTML = L.previewCustom(event, S.settings.theme); }
      catch (e) { $('#advancedPreview').textContent = e.message; }
    }
    function resetEditor() { editing = null; $('#advancedLine').value = ''; $('#advancedSave').textContent = 'Salva evento avanzato'; previewAdvanced(); }
    $('#advancedLine').addEventListener('input', previewAdvanced); $('#advancedPhase').addEventListener('change', previewAdvanced);
    $('#advancedCancel').addEventListener('click', resetEditor);
    $('#advancedSave').addEventListener('click', () => {
      try {
        const item = A.normalizeCustoms([candidateEvent()])[0], next = S.custom.slice(), index = next.findIndex((c) => c.id === editing);
        if (index >= 0) next[index] = item; else next.push(item);
        if (next.length > 200) throw new Error('Sono ammessi al massimo 200 eventi personalizzati.');
        S.custom = next; A.save(); A.renderCustomList(); $('#advancedMsg').textContent = index >= 0 ? 'Evento modificato.' : 'Evento aggiunto.'; resetEditor();
      } catch (e) { $('#advancedMsg').textContent = e.message; }
    });
    $('#cList').addEventListener('click', (e) => {
      const b = e.target.closest('[data-act="cedit"], [data-act="cdup"]'); if (!b) return;
      const item = S.custom.find((c) => c.id === b.closest('.citem').dataset.id); if (!item) return;
      if (b.dataset.act === 'cdup') {
        if (S.custom.length >= 200) return A.toast('Sono ammessi al massimo 200 eventi.');
        S.custom.push({ ...copy(item), id: A.inputId('e') }); A.save(); A.renderCustomList(); return;
      }
      editing = item.id; $('#advancedEditor').open = true; $('#advancedPhase').value = item.phase;
      $('#advancedLine').value = L.customToLine(item); $('#advancedSave').textContent = 'Salva modifiche'; previewAdvanced(); $('#advancedLine').focus();
    });
    $('#packExport').addEventListener('click', () => { $('#eventPack').value = JSON.stringify({ app: 'last-one-standing-events', version: 1, events: S.custom }, null, 2); $('#packMsg').textContent = 'Pacchetto pronto da copiare.'; });
    $('#packImport').addEventListener('click', () => {
      try {
        const raw = JSON.parse($('#eventPack').value), list = Array.isArray(raw) ? raw : raw && (raw.events || raw.eventi);
        if (!Array.isArray(list) || list.length + S.custom.length > 200) throw new Error('Scegli un elenco di eventi entro il limite totale di 200.');
        const parsed = A.normalizeCustoms(list), next = parsed.map((c) => ({ ...c, id: A.inputId('e') }));
        S.custom = S.custom.concat(next); A.save(); A.renderCustomList(); $('#packMsg').textContent = plural(next.length, 'evento aggiunto', 'eventi aggiunti') + '. Cast e regole sono rimasti invariati.';
      } catch (e) { $('#packMsg').textContent = 'Pacchetto non importato: ' + e.message; }
    });

    function cleanConfiguration(raw) {
      if (!raw || !D.themes.some((t) => t.id === raw.theme)) throw new Error('Arena della stagione non valida.');
      const cast = A.normalizeCast(raw.cast); if (cast.length < 2) throw new Error('Il cast della stagione richiede almeno due persone.');
      const settings = A.sanitizeSettings(raw);
      return { ...settings, cast, custom: A.normalizeCustoms(raw.custom || []), initialRelations: L.normalizeInitialRelations(raw.initialRelations, cast), adult: !!raw.adult && !D.themes.find((t) => t.id === raw.theme).noAdult };
    }
    function restoreSeasons(values, warnings) {
      const valid = [], ids = new Set();
      if (values.length > 50) warnings.push('Sono state caricate soltanto le prime 50 stagioni.');
      for (const season of values.slice(0, 50)) {
        try {
          if (!season || typeof season.id !== 'string' || !/^[\w-]{1,40}$/.test(season.id) || ids.has(season.id) || typeof season.name !== 'string' || !season.name.trim() || season.name.length > 80 || !Array.isArray(season.rounds) || season.rounds.length > 200) throw new Error('Dati della stagione non validi.');
          const configuration = cleanConfiguration(season.configuration), people = new Set(configuration.cast.map((t) => t.id)), rounds = [], roundIds = new Set(), replayIds = new Set();
          for (const r of season.rounds) {
            if (!r || typeof r.id !== 'string' || !/^[\w-]{1,40}$/.test(r.id) || roundIds.has(r.id) || typeof r.seed !== 'string' || r.seed.length > 100 || !Array.isArray(r.participants) || r.participants.length !== people.size || (r.replayId != null && (!/^[\w-]{1,100}$/.test(r.replayId) || replayIds.has(r.replayId)))) throw new Error('Round non valido.');
            const used = new Set();
            for (const p of r.participants) {
              if (!people.has(p.id) || used.has(p.id) || !Number.isInteger(p.rank) || p.rank < 1 || p.rank > people.size || !Number.isInteger(p.kills) || p.kills < 0 || p.kills >= people.size || typeof p.winner !== 'boolean' || (p.rank === 1) !== p.winner) throw new Error('Classifica non valida.');
              if (p.achievements !== undefined && (!record(p.achievements) || Object.keys(p.achievements).some((k) => !Object.hasOwn(METRICS, k)) || Object.keys(METRICS).some((k) => !Number.isInteger(p.achievements[k]) || p.achievements[k] < 0 || p.achievements[k] > 100000))) throw new Error('Premi del round non validi.');
              used.add(p.id);
            }
            if (!r.participants.some((p) => p.winner)) throw new Error('Round senza vittoria.');
            const losers = r.participants.filter((p) => !p.winner); if (new Set(losers.map((p) => p.rank)).size !== losers.length || losers.some((p) => p.rank <= people.size - losers.length)) throw new Error('Posizioni duplicate o incompatibili con le vittorie.');
            if (r.stories !== undefined && (!Array.isArray(r.stories) || r.stories.length > 3 || r.stories.some((s) => !record(s) || !STORY_KINDS.has(s.k) || !people.has(s.a) || !people.has(s.b) || s.a === s.b))) throw new Error('Legami del round non validi.');
            roundIds.add(r.id); if (r.replayId) replayIds.add(r.replayId);
            rounds.push({ id: r.id, seed: r.seed, replayId: r.replayId || null, replaySaved: !!r.replaySaved && !!r.replayId, participants: r.participants.map((p) => ({ id: p.id, rank: p.rank, kills: p.kills, winner: p.winner, ...(p.achievements ? { achievements: copy(p.achievements) } : {}) })), ...(r.stories ? { stories: r.stories.map((s) => ({ k: s.k, a: s.a, b: s.b })) } : {}) });
          }
          ids.add(season.id); valid.push({ id: season.id, name: season.name, configuration, rounds });
        } catch (e) { warnings.push('Una stagione non valida non è stata caricata: ' + e.message); }
      }
      return valid;
    }
    function renderSeasons() {
      const previous = $('#seasonSelect').value;
      $('#seasonSelect').innerHTML = S.seasons.map((s) => '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>').join('');
      if (S.seasons.some((s) => s.id === previous)) $('#seasonSelect').value = previous;
      const season = S.seasons.find((s) => s.id === $('#seasonSelect').value);
      if (!season) { $('#seasonBoard').innerHTML = '<p class="help">Nessuna stagione. Prepara un cast e salvalo qui per giocare più round con gli stessi concorrenti.</p>'; return; }
      const scores = seasonScores(season), theme = D.themes.find((t) => t.id === season.configuration.theme), highlights = seasonHighlights(season), name = (id) => season.configuration.cast.find((t) => t.id === id)?.name || '';
      $('#seasonBoard').innerHTML = '<p class="help">' + esc(theme.name) + ' · ' + season.configuration.cast.length + ' concorrenti · ' + plural(season.rounds.length, 'round completato', 'round completati') + '. Il cast e le regole sono quelli salvati alla creazione.</p>' +
        (season.rounds.length < 200 ? '<button class="btn primary" type="button" data-season-play="' + esc(season.id) + '"' + (seasonRunning || seasonIOBusy ? ' disabled' : '') + '>Gioca il round ' + (season.rounds.length + 1) + '</button>' : '<p>Stagione completata: 200 round.</p>') +
        '<div class="tablewrap"><table><caption>Classifica della stagione</caption><thead><tr><th>Concorrente</th><th>Punti</th><th>Vittorie</th><th>Eliminazioni</th><th>Posizione media</th></tr></thead><tbody>' + scores.map((r) => '<tr><td>' + esc(r.name) + '</td><td>' + r.points + '</td><td>' + r.wins + '</td><td>' + r.kills + '</td><td>' + (r.played ? (r.rankSum / r.played).toFixed(1) : '–') + '</td></tr>').join('') + '</tbody></table></div>' +
        (season.rounds.length ? '<h3>Premi cumulativi</h3><p class="help">Dettagli disponibili per ' + highlights.detailed + ' round su ' + season.rounds.length + '. I round precedenti senza dettagli continuano a valere per punti, vittorie ed eliminazioni.</p>' + (highlights.awards.length ? '<ul class="studio-list">' + highlights.awards.map((a) => '<li><b>' + a.label + '</b>: ' + esc(a.people.map((p) => p.name).join(', ')) + ' · ' + a.value + '</li>').join('') + '</ul>' : '<p class="help">Nessun premio cumulativo assegnabile con i dettagli disponibili.</p>') +
          '<h3>Rivalità ricorrenti</h3><p class="help">Legami riconosciuti in almeno due esiti. Ogni round riparte dai legami iniziali salvati nella stagione.</p>' + (highlights.rivalries.length ? '<ul class="studio-list">' + highlights.rivalries.map((r) => '<li>' + esc(name(r.a)) + (r.k === 'tradimento' ? ' → ' : ' ↔ ') + esc(name(r.b)) + ' · ' + ({ nemesi: 'Nemesi', odio: 'Odio', tradimento: 'Tradimento' }[r.k]) + ' · ' + plural(r.rounds, 'round', 'round') + '</li>').join('') + '</ul>' : '<p class="help">Nessun legame ricorrente rilevato finora.</p>') +
          '<h3>Albo dei round</h3><ol class="studio-list">' + season.rounds.map((r, i) => '<li>Round ' + (i + 1) + ': ' + esc(r.participants.filter((p) => p.winner).map((p) => name(p.id)).join(', ')) + (r.replaySaved ? ' <button class="btn sm" type="button" data-round-replay="' + esc(r.replayId) + '">Rivedi</button>' : ' · replay non disponibile') + '</li>').join('') + '</ol>' : '');
    }
    $('#seasonSelect').addEventListener('change', renderSeasons);
    $('#seasonCreate').addEventListener('click', () => {
      try {
        if (seasonIOBusy) throw new Error('Attendi il completamento del trasferimento della stagione.');
        const name = $('#seasonName').value.trim(); if (!name) throw new Error('Dai un nome alla stagione.');
        if (S.seasons.length >= 50) throw new Error('Sono ammesse al massimo 50 stagioni su questo browser.');
        const season = { id: A.inputId('s'), name: name.slice(0, 80), configuration: cleanConfiguration(A.currentConfiguration()), rounds: [] };
        keepSeasons([...S.seasons, season]); renderSeasons(); $('#seasonSelect').value = season.id; renderSeasons(); $('#seasonMsg').textContent = 'Cast e regole salvati per questa stagione.';
      } catch (e) { $('#seasonMsg').textContent = e.message; }
    });
    $('#seasonBoard').addEventListener('click', async (e) => {
      const replay = e.target.closest('[data-round-replay]'); if (replay) { try { await A.openSavedReplay(replay.dataset.roundReplay); } catch (error) { A.toast(error.message); } return; }
      const b = e.target.closest('[data-season-play]'); if (!b) return;
      if (seasonRunning || seasonIOBusy) return;
      const season = S.seasons.find((s) => s.id === b.dataset.seasonPlay); if (!season) return;
      if (season.configuration.adult && !S.settings.adult) return A.toast('Attiva i contenuti 18+ prima di giocare questa stagione.');
      b.disabled = true; seasonRunning = true;
      const cfg = { ...copy(season.configuration), seed: season.configuration.seed.slice(0, 45) + '-round-' + (season.rounds.length + 1), seasonId: season.id };
      try { await A.runSim(cfg); } finally { seasonRunning = false; renderSeasons(); }
    });
    function recordResult(cfg, result, replayId, stored) {
      if (!cfg.seasonId) return;
      const season = S.seasons.find((s) => s.id === cfg.seasonId); if (!season || season.rounds.some((r) => r.replayId === replayId) || season.rounds.length >= 200) return;
      const ids = new Set(season.configuration.cast.map((t) => t.id));
      if (result.tributes.length !== ids.size || result.tributes.some((t) => !ids.has(t.id))) return;
      const round = { id: A.inputId('r'), seed: result.seed, replayId, replaySaved: false, ...roundDetails(result) }, next = copy(S.seasons);
      next.find((s) => s.id === season.id).rounds.push(round);
      try { keepSeasons(next); } catch (e) { A.toast('Il round non è stato aggiunto alla classifica. ' + e.message); return; }
      stored.then((ok) => { const updated = copy(S.seasons), savedRound = updated.find((s) => s.id === season.id)?.rounds.find((r) => r.id === round.id); if (!savedRound) return;
        savedRound.replaySaved = ok; try { keepSeasons(updated); } catch (e) { A.toast(e.message); } renderSeasons(); });
    }

    async function exportSeason(id, includeReplays) {
      const selected = S.seasons.find((s) => s.id === id); if (!selected) throw new Error('Seleziona una stagione.');
      const season = copy(selected), replays = [], warnings = [];
      let size = JSON.stringify(season).length;
      if (includeReplays) for (const round of season.rounds) {
        if (!round.replayId) { warnings.push('Il replay del round ' + (season.rounds.indexOf(round) + 1) + ' non è disponibile.'); continue; }
        let raw; try { raw = await REPLAY.exportReplay(round.replayId); } catch (e) { warnings.push('Il replay del round ' + (season.rounds.indexOf(round) + 1) + ' non è disponibile.'); continue; }
        size += JSON.stringify(raw).length; if (size > 50000000) throw new Error('Il pacchetto supera 50 MB: esporta la stagione senza includere i replay e salva quelli importanti dall’archivio.');
        replays.push({ id: round.replayId, raw });
        // I replay permettono di recuperare i dettagli anche per i primi round.
        Object.assign(round, roundDetails(REPLAY.inspectReplay(raw).result));
      }
      const raw = JSON.stringify({ app: 'last-one-standing-season', version: 1, season, replays });
      if (raw.length > 50000000) throw new Error('Il pacchetto supera il limite di 50 MB.');
      return { raw, warnings, count: replays.length };
    }
    function validateSeasonPackage(raw) {
      if (typeof raw !== 'string' || raw.length > 50000000) throw new Error('Usa un pacchetto di stagione di massimo 50 MB.');
      const data = JSON.parse(raw), warnings = [];
      if (!record(data) || data.app !== 'last-one-standing-season' || data.version !== 1 || !Array.isArray(data.replays) || data.replays.length > 200) throw new Error('Formato della stagione non supportato.');
      const season = restoreSeasons([data.season], warnings)[0]; if (!season || warnings.length) throw new Error(warnings.join(' ') || 'Stagione non valida.');
      const ids = new Set(), files = [];
      for (const file of data.replays) {
        if (!record(file) || typeof file.id !== 'string' || ids.has(file.id)) throw new Error('Replay duplicato o non valido nel pacchetto.');
        ids.add(file.id); const envelope = REPLAY.inspectReplay(file.raw), result = envelope.result, round = season.rounds.find((r) => r.replayId === file.id);
        if (envelope.id !== file.id || !round || result.seed !== round.seed || result.theme !== season.configuration.theme || result.adult !== season.configuration.adult || result.tributes.length !== season.configuration.cast.length) throw new Error('Il replay non corrisponde al round della stagione.');
        if (season.configuration.cast.some((person, i) => { const t = result.tributes.find((p) => p.id === person.id); return !t || t.name !== (person.name || 'Concorrente ' + (i + 1)).trim() || t.gender !== person.gender || t.team !== person.team || JSON.stringify(t.traits) !== JSON.stringify(person.traits) || D.attrs.some((attr) => t.attr[attr.id] !== person.attr[attr.id]); })) throw new Error('Il cast non corrisponde al replay.');
        const details = roundDetails(result), expected = new Map(details.participants.map((p) => [p.id, p]));
        if (round.participants.some((p) => { const t = expected.get(p.id); return !t || t.rank !== p.rank || t.kills !== p.kills || t.winner !== p.winner || p.achievements && Object.keys(METRICS).some((k) => p.achievements[k] !== t.achievements[k]); })) throw new Error('La classifica o i premi non corrispondono al replay.');
        if (round.stories && JSON.stringify(round.stories) !== JSON.stringify(details.stories)) throw new Error('I legami del round non corrispondono al replay.');
        Object.assign(round, details); files.push(file);
      }
      return { season, files };
    }
    async function importSeason(raw) {
      if (S.seasons.length >= 50) throw new Error('Sono ammesse al massimo 50 stagioni su questo browser.');
      const { season, files } = validateSeasonPackage(raw), warnings = [], mapping = new Map();
      season.id = A.inputId('s'); season.name = season.name.slice(0, 68) + ' (importata)';
      // Prima si conserva la classifica. Un errore dell'archivio non deve perderla.
      const originalRefs = season.rounds.map((r) => r.replayId);
      season.rounds.forEach((r) => { r.replayId = null; r.replaySaved = false; });
      keepSeasons([...S.seasons, season]);
      for (const file of files) {
        try { mapping.set(file.id, await REPLAY.importReplay(file.raw)); }
        catch (e) { warnings.push('Un replay non è stato salvato nell’archivio: ' + e.message); }
      }
      const next = copy(S.seasons), imported = next.find((s) => s.id === season.id);
      imported.rounds.forEach((r, i) => { r.replayId = mapping.get(originalRefs[i]) || null; r.replaySaved = !!r.replayId; });
      try { keepSeasons(next); } catch (e) { warnings.push('Classifica importata; i collegamenti ai replay non sono stati salvati. I replay importati restano nell’archivio.'); }
      const unavailable = originalRefs.length - mapping.size;
      if (unavailable) warnings.push(plural(unavailable, 'round senza replay disponibile', 'round senza replay disponibile') + '.');
      return { id: season.id, warnings, count: mapping.size };
    }
    async function seasonOperation(action) {
      if (seasonIOBusy || seasonRunning) return;
      seasonIOBusy = true; ['seasonExport', 'seasonImport'].forEach((id) => { $('#' + id).disabled = true; }); renderSeasons();
      try { await action(); } catch (e) { $('#seasonIOMsg').textContent = e.message; }
      finally { seasonIOBusy = false; ['seasonExport', 'seasonImport'].forEach((id) => { $('#' + id).disabled = false; }); renderSeasons(); }
    }
    $('#seasonExport').addEventListener('click', () => seasonOperation(async () => {
      $('#seasonIOMsg').textContent = 'Preparazione del pacchetto…';
      const output = await exportSeason($('#seasonSelect').value, $('#seasonIncludeReplays').checked);
      $('#seasonJSON').value = output.raw; $('#seasonIOMsg').textContent = 'Stagione pronta con ' + plural(output.count, 'replay', 'replay') + '. ' + output.warnings.join(' ');
    }));
    $('#seasonImport').addEventListener('click', () => seasonOperation(async () => {
      $('#seasonIOMsg').textContent = 'Verifica del pacchetto…';
      const output = await importSeason($('#seasonJSON').value); renderSeasons(); $('#seasonSelect').value = output.id;
      $('#seasonIOMsg').textContent = 'Stagione importata con ' + plural(output.count, 'replay', 'replay') + '. ' + output.warnings.join(' ');
    }));
    $('#seasonCopy').addEventListener('click', () => { if (!$('#seasonJSON').value.trim()) { $('#seasonIOMsg').textContent = 'Esporta prima una stagione.'; return; } A.copyText($('#seasonJSON').value, 'Stagione copiata.'); });
    let seasonDownloadUrl = null;
    $('#seasonDownload').addEventListener('click', () => {
      if (!$('#seasonJSON').value.trim()) { $('#seasonIOMsg').textContent = 'Esporta prima una stagione.'; return; }
      if (seasonDownloadUrl) URL.revokeObjectURL(seasonDownloadUrl);
      seasonDownloadUrl = URL.createObjectURL(new Blob([$('#seasonJSON').value], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = seasonDownloadUrl; a.download = 'last-one-standing-stagione.json'; a.click();
    });

    function showLab() {
      if (!labStats) { $('#labResults').innerHTML = ''; return; }
      const n = labStats.completed;
      const rows = Object.values(labStats.people).sort((a, b) => b.wins - a.wins || a.rank / (n || 1) - b.rank / (n || 1));
      $('#labResults').innerHTML = '<div class="tablewrap"><table><caption>Campione di ' + n + ' partite</caption><thead><tr><th>Concorrente</th><th>Vittorie</th><th>Frequenza</th><th>Posizione media</th><th>Eliminazioni medie</th></tr></thead><tbody>' + rows.map((r) => '<tr><td>' + esc(r.name) + '</td><td>' + r.wins + '</td><td>' + (n ? (100 * r.wins / n).toFixed(1) + '%' : '–') + '</td><td>' + (n ? (r.rank / n).toFixed(2) : '–') + '</td><td>' + (n ? (r.kills / n).toFixed(2) : '–') + '</td></tr>').join('') + '</tbody></table></div><p class="help">Cause di uscita nel campione: ' + esc(Object.entries(labStats.causes).map(([k, v]) => k + ': ' + v).join(' · ') || 'nessuna') + '.</p><p class="help">Sono osservazioni sui semi del campione, non probabilità garantite per la prossima partita.</p>';
      labStats.attributes = attributeSummary(labStats.configuration.cast, labStats.people, n, D.attrs);
      const frequency = (g) => g.appearances ? g.wins + ' / ' + g.appearances + ' · ' + g.frequency.toFixed(1) + '%' : '–';
      $('#labResults').insertAdjacentHTML('beforeend', '<details class="lab-attributes"><summary>Caratteristiche e vittorie nel campione</summary><p class="help">Ogni cella mostra vittorie / presenze e frequenza per fascia di caratteristica. Ogni concorrente conta una presenza per partita; ogni componente della squadra vincente conta una vittoria. La differenza confronta fascia alta e bassa in punti percentuali. È un’associazione osservata: tratti, altre caratteristiche e squadre cambiano insieme, quindi non misura da sola l’effetto della caratteristica.</p><div class="tablewrap"><table><caption>Frequenze osservate per caratteristica</caption><thead><tr><th>Caratteristica</th><th>Valore 1–4</th><th>Valore 5–7</th><th>Valore 8–10</th><th>Differenza alta–bassa</th></tr></thead><tbody>' + labStats.attributes.map((a) => '<tr><th scope="row">' + esc(a.name) + '</th>' + a.groups.map((g) => '<td>' + frequency(g) + '</td>').join('') + '<td>' + (a.difference == null ? 'Non confrontabile' : (a.difference > 0 ? '+' : '') + a.difference.toFixed(1) + ' pp') + '</td></tr>').join('') + '</tbody></table></div></details>');
    }
    function experimentControls() {
      $('#expRun').disabled = expActive || labActive; $('#expCancel').disabled = !expActive;
      ['expPerson', 'expAttribute', 'expLow', 'expHigh', 'expCount'].forEach(id => { $('#' + id).disabled = expActive; });
    }
    function showExperiment() {
      if (!expReport) { $('#expResults').innerHTML = ''; return; }
      const s = expReport.summary, signed = (n, digits) => n == null ? '–' : (n > 0 ? '+' : '') + n.toFixed(digits), pct = n => n == null ? '–' : n.toFixed(1) + '%';
      const name = expReport.configuration.cast.find(t => t.id === expReport.person).name, attr = D.attrs.find(a => a.id === expReport.attribute).name;
      $('#expResults').innerHTML = '<h4>' + esc(name) + ' · ' + esc(attr) + ' ' + expReport.low + ' / ' + expReport.high + '</h4><p class="help">' + s.count + ' coppie complete. Le coppie interrotte a metà non entrano nelle statistiche.</p><div class="tablewrap"><table><caption>Confronto accoppiato: alto meno basso</caption><thead><tr><th>Misura</th><th>Basso ' + expReport.low + '</th><th>Alto ' + expReport.high + '</th><th>Differenza</th></tr></thead><tbody><tr><th scope="row">Vittorie</th><td>' + s.lowWins + ' · ' + pct(s.lowRate) + '</td><td>' + s.highWins + ' · ' + pct(s.highRate) + '</td><td>' + signed(s.winDifference, 1) + ' pp</td></tr></tbody></table></div><p>Vittoria solo con valore basso: ' + s.onlyLow + '; solo alto: ' + s.onlyHigh + '; in entrambi: ' + s.both + '; in nessuno: ' + s.neither + '.</p><p>Variazione della posizione media: ' + signed(s.rankDifference, 2) + ' (un valore negativo indica un miglioramento). Variazione delle eliminazioni medie: ' + signed(s.killsDifference, 2) + '.</p><p class="help">Sono differenze osservate nelle coppie del campione, senza una stima di incertezza statistica. Aumentando il valore cambiano anche decisioni ed eventi: lo stesso seme non mantiene identica tutta la sequenza della storia. La configurazione e i semi delle coppie sono inclusi nel JSON.</p>';
    }
    function cancelExperiment() {
      if (!expActive) return;
      expToken++; expActive = false; RUNNER?.cancel(); if (expReport) expReport.cancelled = true;
      A.simulationBusy(false); experimentControls(); labControls(); showExperiment();
      $('#expMsg').textContent = 'Esperimento interrotto: conservate soltanto le ' + (expReport?.completed || 0) + ' coppie complete.';
    }
    $('#expRun').addEventListener('click', async () => {
      if (labActive || expActive) return;
      const E = G.LOS_EXPERIMENTS; let p;
      try { p = E.plan(cleanConfiguration(A.currentConfiguration()), $('#expPerson').value, $('#expAttribute').value, +$('#expLow').value, +$('#expHigh').value, +$('#expCount').value); }
      catch (e) { $('#expMsg').textContent = e.message; return; }
      const token = ++expToken; expActive = true; experimentControls(); labControls(); A.simulationBusy(true);
      expReport = { ...copy(p), completed: 0, pairs: [], summary: E.summarize([]), cancelled: false };
      $('#expProgress').value = 0; $('#expProgress').max = p.count; $('#expMsg').textContent = 'Esperimento in corso: ogni coppia richiede due partite.'; showExperiment();
      const report = await E.run(p, { simulate: cfg => RUNNER ? RUNNER.simulate(cfg) : Promise.resolve().then(() => L.simulate(cfg)), cancelled: () => token !== expToken,
        onProgress: report => { if (token !== expToken) return; expReport = report; $('#expProgress').value = report.completed; $('#expMsg').textContent = report.completed + ' / ' + p.count + ' coppie complete.'; showExperiment(); } });
      if (token !== expToken) return;
      expReport = report; expActive = false; A.simulationBusy(false); experimentControls(); labControls(); showExperiment();
      $('#expMsg').textContent = report.error ? 'Esperimento interrotto: ' + report.error : report.completed + ' / ' + p.count + ' coppie complete.';
    });
    $('#expCancel').addEventListener('click', cancelExperiment);
    $('#expCopy').addEventListener('click', () => { if (expReport) A.copyText(JSON.stringify(expReport, null, 2), 'Esperimento copiato.'); else $('#expMsg').textContent = 'Esegui prima un esperimento.'; });
    function labControls() { $('#labRun').disabled = labActive || expActive; $('#labCancel').disabled = !labActive; $('#labCount').disabled = labActive; experimentControls(); }
    function cancelLab() {
      if (!labActive) return;
      labToken++; labActive = false; RUNNER?.cancel(); A.simulationBusy(false); labControls();
      $('#labMsg').textContent = 'Campione interrotto dopo ' + (labStats ? labStats.completed : 0) + ' partite. I risultati parziali restano disponibili.'; showLab();
    }
    $('#labOpen').addEventListener('click', () => {
      const id = $('#expPerson').value; $('#expPerson').innerHTML = S.cast.map(t => '<option value="' + esc(t.id) + '">' + esc(t.name) + '</option>').join(''); if (S.cast.some(t => t.id === id)) $('#expPerson').value = id;
      if (!$('#expAttribute').innerHTML) $('#expAttribute').innerHTML = D.attrs.map(a => '<option value="' + a.id + '">' + esc(a.name) + '</option>').join('');
      $('#labDlg').showModal(); showLab(); showExperiment(); experimentControls();
    });
    $('#labDlg').addEventListener('close', () => { cancelLab(); cancelExperiment(); }); $('#labCancel').addEventListener('click', cancelLab);
    $('#labCopy').addEventListener('click', () => { if (!labStats) return; showLab(); A.copyText(JSON.stringify(labStats, null, 2), 'Risultati del campione copiati.'); });
    $('#labRun').addEventListener('click', async () => {
      if (expActive) return;
      let cfg, count;
      try { cfg = cleanConfiguration(A.currentConfiguration()); count = +$('#labCount').value; if (!Number.isInteger(count) || count < 5 || count > 200) throw new Error('Scegli un campione tra 5 e 200 partite.'); }
      catch (e) { $('#labMsg').textContent = e.message; return; }
      cancelLab(); const token = ++labToken; labActive = true; labControls(); A.simulationBusy(true);
      labStats = { seed: cfg.seed, theme: cfg.theme, configuration: copy(cfg), requested: count, completed: 0, causes: {}, people: Object.fromEntries(cfg.cast.map((t) => [t.id, { name: t.name, wins: 0, rank: 0, kills: 0 }])) };
      $('#labProgress').max = count; $('#labProgress').value = 0; $('#labMsg').textContent = 'Il campione è in corso…';
      try {
        for (let i = 0; i < count; i++) {
          const input = { ...cfg, seed: cfg.seed + '-campione-' + (i + 1) }, result = RUNNER ? await RUNNER.simulate(input) : L.simulate(input);
          if (token !== labToken) return;
          result.tributes.forEach((t) => { const row = labStats.people[t.id]; row.wins += t.alive ? 1 : 0; row.rank += t.rank; row.kills += t.kills;
            if (!t.alive) { const cause = t.killerIds.length ? 'azione di un rivale' : (A.causeTxt && A.causeTxt(t, D.themes.find((theme) => theme.id === result.theme))) || 'evento dell’arena'; labStats.causes[cause] = (labStats.causes[cause] || 0) + 1; } });
          labStats.completed++; $('#labProgress').value = labStats.completed; $('#labMsg').textContent = labStats.completed + ' / ' + count + ' partite analizzate.';
          if (i % 5 === 4 || i === count - 1) showLab();
        }
      } catch (e) { if (token === labToken) $('#labMsg').textContent = e.name === 'AbortError' ? 'Campione interrotto.' : 'Campione interrotto: ' + e.message; }
      finally { if (token === labToken) { labActive = false; labControls(); A.simulationBusy(false); showLab(); } }
    });
    return { renderRelations, renderProfile, renderResults, renderSeasons, restoreSeasons, recordResult, previewAdvanced, exportSeason, importSeason, beforeSimulation: () => { cancelLab(); cancelExperiment(); } };
  }
  G.LOS_STUDIO = { init, seasonScores, causalSteps, personalTimeline, attributeSummary, seasonHighlights };
})(typeof window === 'object' ? window : globalThis);
