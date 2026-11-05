// Controllo statico di tutti i modelli: sintassi, partecipanti, segnaposto, grammatica di base.
// node tools/lint-content.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(dir, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine.js']) require(path.join(dir, f));
const D = globalThis.LOS_DATA, LOS = globalThis.LOS;
const errors = [], warns = [];
const blocks = [];
const add = (where, src, theme) => src && src.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).forEach((l) => blocks.push({ where, line: l, theme }));
const PH = ['b', 'd', 'n', 'f', 'finale', 'ds', 'fallback', 'sponsor', 'lovers'];
PH.forEach((k) => { add('core.' + k, D.core[k], 'classico'); add('coreExtra.' + k, (D.coreExtra || {})[k], 'classico'); });
D.themes.forEach((t) => {
  if (t.soft) PH.forEach((k) => add(t.id + '.pool.' + k, t.pool[k], t.id));
  if (t.extra) Object.keys(t.extra).forEach((k) => add(t.id + '.extra.' + k, t.extra[k], t.id));
  (t.disasters || []).forEach((d) => add(t.id + '.dis ' + d.n, d.out, t.id));
  const more = (D.more || {})[t.id] || {};
  if (more.extra) Object.keys(more.extra).forEach((k) => add(t.id + '.more.' + k, more.extra[k], t.id));
});
const disLines = [];
(D.packs || []).forEach((pk, i) => {
  const th = typeof pk.theme === 'string' ? (pk.theme === '*' || pk.theme === 'tutte' ? 'classico' : pk.theme) : pk.theme[0];
  if (pk.ev) Object.keys(pk.ev).forEach((k) => add('pack' + i + '(' + pk.theme + (pk.adult ? ',18+' : '') + ').' + k, pk.ev[k], th));
  if (pk.dis) pk.dis.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).forEach((l) => disLines.push({ where: 'pack' + i + '.dis', line: l, theme: th }));
});
D.themes.forEach((t) => { const more = (D.more || {})[t.id] || {}; if (more.dis) more.dis.split('\n').map((l) => l.trim()).filter(Boolean).forEach((l) => disLines.push({ where: t.id + '.more.dis', line: l, theme: t.id })); });
// i disastri compatti diventano 3 righe
disLines.forEach((d) => {
  const p = d.line.split('|').map((x) => x.trim());
  if (p.length < 5) return errors.push(d.where + ': disastro incompleto: ' + d.line);
  if (p.length > 6) errors.push(d.where + ': troppi campi: ' + d.line);
  if (p[5] && !['ferito', 'avvelenato', 'malato', 'affamato', 'ubriaco', 'sconvolto', 'lutto'].includes(p[5])) errors.push(d.where + ': stato sconosciuto "' + p[5] + '": ' + d.line);
  [['1 d:A | ', p[2]], ['1 s:A=' + (p[5] || 'ferito') + ' | ', p[3]], ['1 | ', p[4]]].forEach(([h, t]) => blocks.push({ where: d.where + ' «' + p[0] + '»', line: h + t, theme: d.theme }));
});
const STATI = ['ferito', 'avvelenato', 'malato', 'affamato', 'ubriaco', 'sconvolto', 'lutto', '*'];
const seen = new Map();
let n = 0;
for (const b of blocks) {
  n++;
  let ev;
  try { ev = LOS.parseLine(b.line, 'lint'); } catch (e) { errors.push(b.where + ': ' + e.message); continue; }
  for (const r of ev.req) if (r.t === 'need' && !STATI.includes(r.s)) errors.push(b.where + ': stato richiesto sconosciuto "' + r.s + '": ' + b.line);
  for (const f of ev.fx.concat(ev.ok.fx, ev.ko.fx)) if (f.t === 'status' && !STATI.includes(f.s)) errors.push(b.where + ': stato sconosciuto "' + f.s + '": ' + b.line);
  if (ev.test && !D.attrs.some((a) => a.id === ev.test.attr)) errors.push(b.where + ': caratteristica sconosciuta "' + ev.test.attr + '": ' + b.line);
  for (const r of ev.req) if (r.t === 'att' && !D.attrs.some((a) => a.id === r.attr)) errors.push(b.where + ': caratteristica sconosciuta "' + r.attr + '": ' + b.line);
  for (const r of ev.req) if ((r.t === 'trait' || r.t === 'notrait') && !D.traits.some((t) => t.id === r.trait)) errors.push(b.where + ': tratto sconosciuto "' + r.trait + '": ' + b.line);
  const body = b.line.slice(b.line.indexOf('|') + 1).trim();
  const key = body.toLowerCase();
  if (seen.has(key) && seen.get(key) !== b.where) warns.push('Duplicato: ' + body + '  [' + seen.get(key) + ' / ' + b.where + ']');
  seen.set(key, b.where);
  for (const g of ['M', 'F', 'N']) {
    const out = LOS.renderSample(body, b.theme, g);
    if (/[{}\[\]§]/.test(out)) errors.push(b.where + ' (' + g + '): segnaposto non risolto: ' + out);
    if (/\b(\w+) \1\b/i.test(out.replace(/\b(che|da|ha|più|molto|tre|due|ancora|sempre|poi)\b/gi, ''))) warns.push(b.where + ': parola ripetuta: ' + out);
    if (/\s[,.]|(?<!\.)\.\.(?!\.)|  /.test(out)) warns.push(b.where + ': punteggiatura: ' + out);
    if (/\b(il|lo|la|un|una|uno)\s+(il|lo|la|un|una|uno|i|gli|le)\b/i.test(out)) warns.push(b.where + ': doppio articolo: ' + out);
    if (/\b(di|a|da|in|su) (il|lo|la|i|gli|le) /.test(out)) warns.push(b.where + ': preposizione non articolata: ' + out);
    if (g === 'F' && /\b(Alfa|Beta|Gamma|Delta)\b[^.!?]*\b(è|viene|resta|rimane|sembra|torna|esce) (stato|morto|ferito|ucciso|preso|sorpreso|caduto|rimasto|salvo|vivo|bloccato|chiuso|costretto|nascosto|svenuto|pronto|convinto)\b/.test(out)) warns.push(b.where + ': possibile accordo maschile con una donna: ' + out);
  }
}
console.log('Righe controllate: ' + n + ' (più ' + disLines.length + ' disastri compatti)');
if (warns.length) { console.log('\nAvvisi (' + warns.length + '):'); warns.slice(0, 80).forEach((w) => console.log('  - ' + w)); }
if (errors.length) { console.log('\nErrori (' + errors.length + '):'); errors.forEach((e) => console.log('  ✗ ' + e)); process.exit(1); }
console.log('\nNessun errore.');
