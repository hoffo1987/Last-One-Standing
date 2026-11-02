const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const ui = fs.readFileSync(path.join(__dirname, '..', 'src/ui.js'), 'utf8');
function part(a, b) { const i = ui.indexOf(a), j = ui.indexOf(b, i); assert.ok(i >= 0 && j > i); return ui.slice(i, j); }
let passed = 0;
function test(name, run) { run(); passed++; console.log('OK: ' + name); }
const c = vm.createContext({ IC: { b: 'APERTURA', d: 'GIORNO', dis: 'DISASTRO', finale: 'FINALE' }, esc: String, SPEED: { lenta: 7000, normale: 3800, veloce: 1700 } });
vm.runInContext(part('  function timelineHTML(', '  function renderLive(') + part('  function phaseReadDelay(', '  function syncPlay('), c);
const phases = [
  { kind: 'b', day: 1, title: 'Inizio', events: [{ deaths: [] }], snap: { alive: ['a', 'b'] } },
  { kind: 'dis', day: 1, title: 'Segreto: eruzione', events: [{ deaths: ['b'] }] },
  { kind: 'finale', day: 2, title: 'Segreto: ultimo scontro', events: [{ deaths: [] }] },
];
test('la modalità senza spoiler nasconde titoli, icone, giorni e numero delle fasi future', () => {
  const html = c.timelineHTML(phases, 0, 0, true);
  assert.match(html, /Inizio/); assert.match(html, /Prossima fase/);
  assert.doesNotMatch(html, /eruzione|ultimo scontro|DISASTRO|FINALE|G2|data-k="2"/);
  assert.equal((html.match(/class="tph/g) || []).length, 2);
  assert.match(html, /aria-current="step"/);
});
test('le fasi già viste restano note anche tornando indietro; la navigazione libera mostra tutto', () => {
  const seen = c.timelineHTML(phases, 0, 1, true);
  assert.match(seen, /eruzione/); assert.doesNotMatch(seen, /ultimo scontro|FINALE|G2/);
  const free = c.timelineHTML(phases, 0, 0, false);
  assert.match(free, /eruzione/); assert.match(free, /ultimo scontro/); assert.match(free, /G2/);
});
test('la riproduzione adattiva lascia più tempo alle fasi lunghe e conserva le velocità', () => {
  const short = { title: 'Giorno', intro: '', events: [{ plain: 'Ada riposa.', echo: [] }] };
  const long = { ...short, events: [{ plain: 'Una parola '.repeat(200), echo: [{ plain: 'Una conseguenza '.repeat(20) }] }] };
  assert.ok(c.phaseReadDelay(long, 'normale', true) > c.phaseReadDelay(short, 'normale', true));
  assert.equal(c.phaseReadDelay(long, 'lenta', true), 2 * c.phaseReadDelay(long, 'normale', true));
  assert.equal(c.phaseReadDelay(long, 'normale', true), 2 * c.phaseReadDelay(long, 'veloce', true));
  assert.equal(c.phaseReadDelay(long, 'normale', false), 3800);
});
test('un solo timer avanza la diretta; pausa, ultima fase e pagina nascosta lo fermano', () => {
  const timers = new Map(), icon = {}, button = { setAttribute(k, v) { this[k] = v; } }; let serial = 0;
  const p = { ...c, SIM: { phases: Array.from({ length: 3 }, () => ({ title: 'Fase', events: [] })) }, S: { run: { phase: 0 }, settings: { speed: 'normale', adaptivePlay: true } },
    playing: false, playTimer: null, document: { hidden: false }, window: { scrollY: 0 }, IC: { play: 'play', pause: 'pause' }, AN: { reduced: true }, location: {},
    $: (s) => s === '#playIcon' ? icon : button, renderLive() {},
    setTimeout: (fn, ms) => { const id = ++serial; timers.set(id, { fn, ms }); return id; }, clearTimeout: (id) => timers.delete(id) };
  vm.createContext(p); vm.runInContext(part('  function go(', "  $('#nextBtn').addEventListener"), p);
  p.startPlay(); assert.equal(timers.size, 1); assert.equal(button['aria-label'], 'Pausa');
  const fire = () => { const [id, timer] = [...timers][0]; timers.delete(id); timer.fn(); };
  fire(); assert.equal(p.S.run.phase, 1); assert.equal(timers.size, 1);
  fire(); assert.equal(p.S.run.phase, 2); assert.equal(timers.size, 0); assert.equal(button['aria-label'], 'Riproduci');
  p.S.run.phase = 0; p.startPlay(); p.stopPlay(); assert.equal(timers.size, 0);
  p.document.hidden = true; p.startPlay(); assert.equal(timers.size, 0);
});
console.log('\nOK: ' + passed + ' gruppi di regressioni delle opzioni di lettura');
