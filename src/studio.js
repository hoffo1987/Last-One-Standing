/* Strumenti facoltativi: legami iniziali, eventi, campioni e stagioni. */
(function (G) {
  'use strict';
  const copy = (x) => JSON.parse(JSON.stringify(x));
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
    let editing = null, labToken = 0, labActive = false, labStats = null;
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

    function renderProfile(t) {
      const on = (S.followed || []).includes(t.id), heading = $('#h-prof'); if (!heading) return;
      heading.parentElement.insertAdjacentHTML('afterend', '<div class="follow-control"><button class="btn" type="button" data-follow="' + esc(t.id) + '" aria-pressed="' + on + '">' + (on ? 'Non seguire più' : 'Segui questo concorrente') + '</button></div>');
    }
    document.addEventListener('click', (e) => {
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
        return '<details><summary>Il percorso di ' + esc(names[id]) + '</summary>' + (steps.length ? '<ol class="causal-path">' + steps.map((step) => '<li><b>' + step.label + '</b><span class="help">G' + step.day + ' · ' + esc(step.title) + '</span><p>' + esc(step.plain) + '</p>' + (step.reason ? '<p class="help">' + esc(step.reason) + '</p>' : '') + '<button class="btn sm" type="button" data-story-phase="' + step.phase + '">Rivedi questa fase</button></li>').join('') + '</ol>' : '<p class="help">La vittoria è arrivata senza altri passaggi registrati di questi tipi.</p>') + '</details>';
      }).join('');
      $('#resBody .resgrid').insertAdjacentHTML('beforebegin', '<section class="block card studio-panel" id="causalReport"><h2>Le svolte della vittoria</h2><p class="help">Eventi e condizioni realmente registrati. Le tappe raccontano il percorso, senza attribuire un effetto decisivo che il motore non ha misurato.</p>' + html + '</section>');
    }
    $('#resBody').addEventListener('click', (e) => { const b = e.target.closest('[data-story-phase]'); if (!b) return;
      if (S.settings.followOnly) { S.settings.followOnly = false; A.save(); A.toast('Filtro dei seguiti disattivato per mostrare tutta la fase.'); }
      A.go(+b.dataset.storyPhase); if (location.hash !== '#diretta') location.hash = '#diretta'; });

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
          const configuration = cleanConfiguration(season.configuration), people = new Set(configuration.cast.map((t) => t.id)), rounds = [], roundIds = new Set();
          for (const r of season.rounds) {
            if (!r || typeof r.id !== 'string' || roundIds.has(r.id) || typeof r.seed !== 'string' || !Array.isArray(r.participants) || r.participants.length !== people.size || (r.replayId != null && !/^[\w-]{1,100}$/.test(r.replayId))) throw new Error('Round non valido.');
            const used = new Set();
            for (const p of r.participants) { if (!people.has(p.id) || used.has(p.id) || !Number.isInteger(p.rank) || p.rank < 1 || p.rank > people.size || !Number.isInteger(p.kills) || p.kills < 0 || p.kills >= people.size || typeof p.winner !== 'boolean') throw new Error('Classifica non valida.'); used.add(p.id); }
            if (!r.participants.some((p) => p.winner)) throw new Error('Round senza vittoria.');
            roundIds.add(r.id); rounds.push({ id: r.id, seed: r.seed, replayId: r.replayId || null, replaySaved: !!r.replaySaved, participants: copy(r.participants) });
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
      const scores = seasonScores(season), theme = D.themes.find((t) => t.id === season.configuration.theme);
      $('#seasonBoard').innerHTML = '<p class="help">' + esc(theme.name) + ' · ' + season.configuration.cast.length + ' concorrenti · ' + plural(season.rounds.length, 'round completato', 'round completati') + '. Il cast e le regole sono quelli salvati alla creazione.</p>' +
        (season.rounds.length < 200 ? '<button class="btn primary" type="button" data-season-play="' + esc(season.id) + '">Gioca il round ' + (season.rounds.length + 1) + '</button>' : '<p>Stagione completata: 200 round.</p>') +
        '<div class="tablewrap"><table><caption>Classifica della stagione</caption><thead><tr><th>Concorrente</th><th>Punti</th><th>Vittorie</th><th>Eliminazioni</th><th>Posizione media</th></tr></thead><tbody>' + scores.map((r) => '<tr><td>' + esc(r.name) + '</td><td>' + r.points + '</td><td>' + r.wins + '</td><td>' + r.kills + '</td><td>' + (r.played ? (r.rankSum / r.played).toFixed(1) : '–') + '</td></tr>').join('') + '</tbody></table></div>' +
        (season.rounds.length ? '<h3>Albo dei round</h3><ol class="studio-list">' + season.rounds.map((r, i) => '<li>Round ' + (i + 1) + ': ' + esc(r.participants.filter((p) => p.winner).map((p) => season.configuration.cast.find((t) => t.id === p.id).name).join(', ')) + (r.replaySaved ? ' <button class="btn sm" type="button" data-round-replay="' + esc(r.replayId) + '">Rivedi</button>' : ' · replay non salvato') + '</li>').join('') + '</ol>' : '');
    }
    $('#seasonSelect').addEventListener('change', renderSeasons);
    $('#seasonCreate').addEventListener('click', () => {
      try {
        const name = $('#seasonName').value.trim(); if (!name) throw new Error('Dai un nome alla stagione.');
        if (S.seasons.length >= 50) throw new Error('Sono ammesse al massimo 50 stagioni su questo browser.');
        const season = { id: A.inputId('s'), name: name.slice(0, 80), configuration: cleanConfiguration(A.currentConfiguration()), rounds: [] };
        S.seasons.push(season); A.save(); renderSeasons(); $('#seasonSelect').value = season.id; renderSeasons(); $('#seasonMsg').textContent = 'Cast e regole salvati per questa stagione.';
      } catch (e) { $('#seasonMsg').textContent = e.message; }
    });
    $('#seasonBoard').addEventListener('click', async (e) => {
      const replay = e.target.closest('[data-round-replay]'); if (replay) { try { await A.openSavedReplay(replay.dataset.roundReplay); } catch (error) { A.toast(error.message); } return; }
      const b = e.target.closest('[data-season-play]'); if (!b) return;
      const season = S.seasons.find((s) => s.id === b.dataset.seasonPlay); if (!season) return;
      if (season.configuration.adult && !S.settings.adult) return A.toast('Attiva i contenuti 18+ prima di giocare questa stagione.');
      b.disabled = true;
      const cfg = { ...copy(season.configuration), seed: season.configuration.seed.slice(0, 45) + '-round-' + (season.rounds.length + 1), seasonId: season.id };
      await A.runSim(cfg); renderSeasons();
    });
    function recordResult(cfg, result, replayId, stored) {
      if (!cfg.seasonId) return;
      const season = S.seasons.find((s) => s.id === cfg.seasonId); if (!season || season.rounds.some((r) => r.replayId === replayId) || season.rounds.length >= 200) return;
      const ids = new Set(season.configuration.cast.map((t) => t.id));
      if (result.tributes.length !== ids.size || result.tributes.some((t) => !ids.has(t.id))) return;
      const round = { id: A.inputId('r'), seed: result.seed, replayId, replaySaved: false, participants: result.tributes.map((t) => ({ id: t.id, rank: t.rank, kills: t.kills, winner: result.winners.includes(t.id) })) };
      season.rounds.push(round); A.save();
      stored.then((ok) => { round.replaySaved = ok; A.save(); renderSeasons(); });
    }

    function showLab() {
      if (!labStats) { $('#labResults').innerHTML = ''; return; }
      const n = labStats.completed;
      const rows = Object.values(labStats.people).sort((a, b) => b.wins - a.wins || a.rank / (n || 1) - b.rank / (n || 1));
      $('#labResults').innerHTML = '<div class="tablewrap"><table><caption>Campione di ' + n + ' partite</caption><thead><tr><th>Concorrente</th><th>Vittorie</th><th>Frequenza</th><th>Posizione media</th><th>Eliminazioni medie</th></tr></thead><tbody>' + rows.map((r) => '<tr><td>' + esc(r.name) + '</td><td>' + r.wins + '</td><td>' + (n ? (100 * r.wins / n).toFixed(1) + '%' : '–') + '</td><td>' + (n ? (r.rank / n).toFixed(2) : '–') + '</td><td>' + (n ? (r.kills / n).toFixed(2) : '–') + '</td></tr>').join('') + '</tbody></table></div><p class="help">Cause di uscita nel campione: ' + esc(Object.entries(labStats.causes).map(([k, v]) => k + ': ' + v).join(' · ') || 'nessuna') + '.</p><p class="help">Sono osservazioni sui semi del campione, non probabilità garantite per la prossima partita.</p>';
    }
    function labControls() { $('#labRun').disabled = labActive; $('#labCancel').disabled = !labActive; $('#labCount').disabled = labActive; }
    function cancelLab() {
      if (!labActive) return;
      labToken++; labActive = false; RUNNER?.cancel(); A.simulationBusy(false); labControls();
      $('#labMsg').textContent = 'Campione interrotto dopo ' + (labStats ? labStats.completed : 0) + ' partite. I risultati parziali restano disponibili.'; showLab();
    }
    $('#labOpen').addEventListener('click', () => { $('#labDlg').showModal(); showLab(); });
    $('#labDlg').addEventListener('close', cancelLab); $('#labCancel').addEventListener('click', cancelLab);
    $('#labCopy').addEventListener('click', () => { if (!labStats) return; A.copyText(JSON.stringify(labStats, null, 2), 'Risultati del campione copiati.'); });
    $('#labRun').addEventListener('click', async () => {
      let cfg, count;
      try { cfg = cleanConfiguration(A.currentConfiguration()); count = +$('#labCount').value; if (!Number.isInteger(count) || count < 5 || count > 200) throw new Error('Scegli un campione tra 5 e 200 partite.'); }
      catch (e) { $('#labMsg').textContent = e.message; return; }
      cancelLab(); const token = ++labToken; labActive = true; labControls(); A.simulationBusy(true);
      labStats = { seed: cfg.seed, theme: cfg.theme, requested: count, completed: 0, causes: {}, people: Object.fromEntries(cfg.cast.map((t) => [t.id, { name: t.name, wins: 0, rank: 0, kills: 0 }])) };
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
    return { renderRelations, renderProfile, renderResults, renderSeasons, restoreSeasons, recordResult, previewAdvanced, beforeSimulation: cancelLab };
  }
  G.LOS_STUDIO = { init, seasonScores, causalSteps };
})(typeof window === 'object' ? window : globalThis);
