/* ================= PELLE · LA BACHECA, FASE 3 (regia) =================
 * Aggiunge a window.LOS_PARTITA_FX il gancio trophy(list, sectionEl): ui.js lo chiama una volta sola quando
 * nell'Esito ci sono trofei appena sbloccati. Per ogni trofeo passa uno stacco «Trofeo sbloccato» (in coda, non
 * blocca niente, se ne va da solo, un clic lo salta) e sulla riga corrispondente cade il timbro «Nuovo».
 * In più, senza toccare ui.js:
 * - ogni distintivo (.tr-ic) riceve il disegno della sua categoria (i segreti un punto di domanda);
 * - nella finestra della bacheca il contenuto entra a cascata solo quando si cambia scheda (non quando la scheda
 *   si ridisegna per un clic), il conto dei trofei ha la sua barra, ogni categoria il suo «2/10», le carte
 *   dell'album si inclinano verso il puntatore e chi non ha una foto riceve il volto di riserva;
 * - nell'Esito le interviste entrano (lampo sul ritratto, nuvolette a cascata) quando arrivano sullo schermo;
 * - il pulsante in home mostra quanti trofei ci sono.
 * Solo decorazione: ogni passo è protetto, tutto è aria-hidden e si toglie da solo. Con il movimento ridotto
 * non si muove niente: lo stacco diventa una scheda ferma. Gli stili sono in 62-bacheca.css. */
(function (G) {
  'use strict';
  const doc = G.document; if (!doc) return;
  const root = doc.documentElement;
  const LOOK = () => G.LOS_LOOK || {};
  const reduced = () => !!((G.LOS_ANIM && G.LOS_ANIM.reduced) || root.hasAttribute('data-reduced-motion') || (G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const sfx = (n, o) => { try { const s = LOOK().sfx; if (s && s.play) s.play(n, o); } catch (e) { /* niente audio */ } };
  const h = (tag, cls, txt) => { const el = doc.createElement(tag); if (cls) el.className = cls; if (txt != null) el.textContent = txt; return el; };
  const safe = (fn) => { try { return fn(); } catch (e) { /* solo decorazione */ } };
  const fine = () => !!(G.matchMedia && G.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const trofei = () => (G.LOS_BACHECA && G.LOS_BACHECA.TROFEI) || [];

  /* ---------- i distintivi: un disegno per categoria (pieni, su 24×24, nel colore del testo) ---------- */
  const ICONE = {
    partite: '<path d="M5 2h3v20H5zM9 3h11l-3 4.5 3 4.5H9z"/>',
    mentore: '<path d="M12 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM3 22c0-5.5 4-8.5 9-8.5s9 3 9 8.5z"/>',
    puntate: '<path fill-rule="evenodd" d="M12 1l11 11-11 11L1 12zm0 6.5L7.5 12l4.5 4.5 4.5-4.5z"/>',
    doni: '<path d="M2 8h20v4.5H2zM4 14h7v8H4zM13 14h7v8h-7zM12 7.5C8.5 7.5 6 6 7 3.5s4.2-1.2 5 2.7c.8-3.9 4-5.2 5-2.7s-1.5 4-5 4z"/>',
    regia: '<path d="M2 10h20v11H2zM2 8.5l1-4L21.5 1l.9 3.4z"/>',
    prove: '<path d="M14 1L4 14h6.5L9 23l11-14h-6.5z"/>',
    pubblico: '<path fill-rule="evenodd" d="M12 4.5c7 0 11 7.5 11 7.5s-4 7.5-11 7.5S1 12 1 12s4-7.5 11-7.5zm0 3.3a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4z"/>',
    rivincite: '<path d="M2 4.5L4.5 2 22 19.5 19.5 22zM19.5 2L22 4.5 4.5 22 2 19.5z"/><path d="M2 2h7L2 9zM22 2h-7l7 7z"/>',
    album: '<path d="M3 7h11v15H3z"/><path d="M8 2h13v15h-5V5H8z"/>',
    segreto: '<text x="12" y="20" text-anchor="middle">?</text>',
    stella: '<path d="M12 1l3.2 7.2 7.8.8-5.8 5.3 1.6 7.7L12 18.1 5.2 22l1.6-7.7L1 9l7.8-.8z"/>',
  };
  const slug = (c) => String(c || '').toLowerCase().replace(/[^a-z]/g, '');
  const iconFor = (t, secret) => (secret ? 'segreto' : (t && ICONE[slug(t.cat)] ? slug(t.cat) : 'stella'));
  const svg = (k) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONE[k] + '</svg>';
  function badge(li) {
    const ic = li.querySelector('.tr-ic'); if (!ic || ic.firstChild) return;
    const t = trofei().find((x) => x.id === li.dataset.tr);
    ic.innerHTML = svg(iconFor(t, li.classList.contains('secret')));
  }
  const dress = (el) => { if (el) el.querySelectorAll('.tr').forEach((li) => safe(() => badge(li))); };
  // chi non ha una foto riceve il volto di riserva (lo stesso che ha altrove), se c'è
  function face(av) {
    if (!av || av.querySelector('img') || av.classList.contains('has-volto')) return;
    const fx = LOOK().fx || {}, pick = LOOK().pickFor; if (!pick || !fx.volti) return;
    const u = pick(fx.volti, av.dataset.g, av.dataset.k || av.title); if (!u) return;
    const im = h('img', 'volto'); im.alt = ''; im.decoding = 'async'; im.src = u;
    av.prepend(im); av.classList.add('has-volto');
  }

  /* ---------- 1 · lo stacco «Trofeo sbloccato» ---------- */
  let coda = [], attivo = false, corrente = null;
  // la sequenza di vittoria copre tutto: si aspetta che se ne vada (dopo 8 secondi si parte comunque)
  function quandoLibero(fn) {
    const nato = Date.now();
    const prova = () => {
      const body = doc.getElementById('resBody');
      const coperto = doc.querySelector('body > .pf') || (body && body.classList.contains('es-on') && !body.classList.contains('es-go'));
      if (coperto && Date.now() - nato < 8000) { setTimeout(prova, 300); return; }
      fn();
    };
    setTimeout(prova, 350);
  }
  function timbra(id) {
    const li = [...doc.querySelectorAll('#resBody .tr-new .tr')].find((x) => x.dataset.tr === id); if (!li || reduced()) return;
    li.classList.remove('tr-slam'); void li.offsetWidth; li.classList.add('tr-slam');
    setTimeout(() => li.classList.remove('tr-slam'), 800);
  }
  function prossimo() {
    const v = coda.shift();
    if (!v) { attivo = false; corrente = null; return; }
    const fermo = reduced(), tieni = v.n > 3 ? 2300 : 3000;
    const el = h('div', 'tr-cut'); el.setAttribute('aria-hidden', 'true');
    const card = h('div', 'tc-card');
    const ic = h('span', 'tr-ic'); ic.innerHTML = svg(iconFor(v.t, false));
    const tx = h('span', 'tc-tx'), k = h('em', 'tc-k', 'Trofeo sbloccato');
    if (v.n > 1) k.appendChild(h('i', '', (v.i + 1) + '/' + v.n));
    tx.appendChild(k); tx.appendChild(h('b', '', v.t.nome || 'Trofeo'));
    if (v.t.desc) tx.appendChild(h('small', '', v.t.desc));
    const bar = h('i', 'tc-bar'); bar.style.setProperty('--tc-hold', tieni + 'ms');
    card.appendChild(ic); card.appendChild(tx); card.appendChild(bar); el.appendChild(card);
    // sotto l'intestazione, mai sopra
    const top = doc.querySelector('.top'), y = (top ? Math.max(0, top.getBoundingClientRect().bottom) : 0) + 10;
    el.style.top = y + 'px';
    doc.body.appendChild(el);
    sfx('stamp'); safe(() => timbra(v.t.id));
    let fatto = false, t1 = 0;
    const via = () => {
      if (fatto) return; fatto = true; clearTimeout(t1);
      if (fermo) { el.remove(); setTimeout(prossimo, 60); return; }
      el.classList.add('out');
      setTimeout(() => { el.remove(); prossimo(); }, 250);
    };
    corrente = { el, via };
    card.addEventListener('click', () => { sfx('tick'); via(); });
    t1 = setTimeout(via, tieni + (fermo ? 0 : 340));
  }
  function trophy(list) {
    if (!Array.isArray(list) || !list.length) return;
    const buoni = list.filter((t) => t && t.id);
    buoni.forEach((t, i) => coda.push({ t, i, n: buoni.length }));
    if (attivo || !coda.length) return;
    attivo = true; quandoLibero(() => safe(prossimo));
  }

  /* ---------- 3 · la finestra della bacheca ---------- */
  let scheda = null, swapT = 0;
  function bacheca(body) {
    const dlg = doc.getElementById('bachecaDlg');
    const sel = dlg && dlg.querySelector('[data-bc][aria-selected="true"]'), ora = sel ? sel.dataset.bc : '';
    dress(body);
    body.querySelectorAll('.acard .av').forEach((av) => safe(() => face(av)));
    // il conto dei trofei: la barra di quanto manca
    const cnt = body.querySelector('.bc-count');
    if (cnt && ora === 'trofei' && !cnt.querySelector('.bc-bar')) {
      const n = parseInt((cnt.querySelector('b') || {}).textContent, 10), tot = trofei().length;
      if (Number.isFinite(n) && tot) { const bar = h('i', 'bc-bar'), fill = h('b'); bar.setAttribute('aria-hidden', 'true'); fill.style.setProperty('--p', String(Math.min(1, n / tot))); bar.appendChild(fill); cnt.appendChild(bar); }
    }
    // ogni categoria: quanti ne ha su quanti
    body.querySelectorAll('.bc-cat').forEach((c) => {
      const t = c.querySelector('h3'); if (!t || t.querySelector('.bc-n')) return;
      const all = c.querySelectorAll('.tr').length, on = c.querySelectorAll('.tr.on').length;
      const s = h('span', 'bc-n' + (on === all ? ' full' : ''), on + '/' + all); s.setAttribute('aria-hidden', 'true'); t.appendChild(s);
    });
    // la cascata solo se la scheda è cambiata (o la finestra si è appena aperta)
    if (ora !== scheda && !reduced()) {
      body.querySelectorAll('.tr, .acard, .bc-rec > div').forEach((x, k) => x.style.setProperty('--k', Math.min(k, 16)));
      clearTimeout(swapT); body.classList.remove('bc-swap'); void body.offsetWidth; body.classList.add('bc-swap');
      swapT = setTimeout(() => body.classList.remove('bc-swap'), 1100);
      if (scheda !== null) sfx('move');
    }
    scheda = ora;
  }
  // la carta sotto il puntatore si inclina verso di lui; le altre restano ferme
  function tilt(body) {
    let last = null;
    const reset = () => { if (last) { last.style.removeProperty('--tx'); last.style.removeProperty('--ty'); last = null; } };
    body.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const c = e.target.closest && e.target.closest('.acard');
      if (c !== last) reset();
      if (!c || reduced() || !fine()) return;
      const r = c.getBoundingClientRect(); if (!r.width) return;
      last = c;
      c.style.setProperty('--tx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(2));
      c.style.setProperty('--ty', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(2));
    }, { passive: true });
    body.addEventListener('pointerleave', reset);
  }
  function watchBacheca() {
    const body = doc.getElementById('bachecaBody'), dlg = doc.getElementById('bachecaDlg'); if (!body || body.__bc) return; body.__bc = true;
    new MutationObserver(() => safe(() => bacheca(body))).observe(body, { childList: true });
    if (dlg) dlg.addEventListener('close', () => { scheda = null; safe(homeCount); });
    safe(() => tilt(body));
    if (body.firstChild) safe(() => bacheca(body));
  }

  /* ---------- 4 · le interviste: entrano quando arrivano sullo schermo ---------- */
  let ivStop = null;
  function interviste(body) {
    if (ivStop) { ivStop(); ivStop = null; }
    const ivs = [...body.querySelectorAll('.ivbox .iv')].filter((a) => !a.__bc); if (!ivs.length) return;
    ivs.forEach((a) => { a.__bc = true; safe(() => face(a.querySelector(':scope > .av'))); a.querySelectorAll('dd').forEach((d, q) => d.style.setProperty('--q', q)); });
    if (reduced()) return;
    // niente IntersectionObserver (in una scheda che non compone fotogrammi non avvisa): si misura allo scorrimento
    let off = false, rest = ivs.slice(); const nato = Date.now();
    const go = () => {
      if (off) return;
      rest = rest.filter((a) => a.isConnected); if (!rest.length) { stop(); return; }
      if (Date.now() - nato < 8000 && (doc.querySelector('body > .pf') || (body.classList.contains('es-on') && !body.classList.contains('es-go')))) return;
      rest = rest.filter((a) => {
        const r = a.getBoundingClientRect(); if (!r.height || r.top > G.innerHeight * 0.82 || r.bottom < 0) return true;
        a.classList.add('iv-go'); sfx('cut');
        // la classe si toglie: tornando all'Esito non riparte
        setTimeout(() => a.classList.remove('iv-go'), 1800);
        return false;
      });
      if (!rest.length) stop();
    };
    const stop = () => { off = true; G.removeEventListener('scroll', go, true); G.removeEventListener('resize', go); clearInterval(beat); };
    G.addEventListener('scroll', go, { capture: true, passive: true }); G.addEventListener('resize', go);
    const beat = setInterval(go, 400);
    ivStop = stop; setTimeout(go, 140);
  }
  function watchEsito() {
    const body = doc.getElementById('resBody'); if (!body || body.__bc) return; body.__bc = true;
    const on = () => { dress(body.querySelector('.tr-new')); safe(() => interviste(body)); };
    new MutationObserver(() => safe(on)).observe(body, { childList: true });
    safe(on);
  }

  /* ---------- 6 · home: quanti trofei ci sono ---------- */
  function homeCount() {
    const b = doc.getElementById('homeBacheca'), PT = G.LOS_PARTITA, tot = trofei().length; if (!b || !PT || !PT.profilo || !tot) return;
    const p = PT.profilo() || {}, tro = p.trofei || {}, n = trofei().filter((t) => tro[t.id]).length;
    let s = b.querySelector('.hb-n');
    if (!s) { s = h('i', 'hb-n'); s.setAttribute('aria-hidden', 'true'); b.appendChild(s); }
    s.textContent = n + '/' + tot;
  }

  function boot() {
    safe(watchBacheca); safe(watchEsito);
    // ui.js e bacheca.js vengono dopo la pelle: il conto in home si scrive quando ci sono
    setTimeout(() => safe(homeCount), 0);
    G.addEventListener('hashchange', () => safe(homeCount));
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
  G.LOS_PARTITA_FX = Object.assign(G.LOS_PARTITA_FX || {}, { trophy(list, el) { safe(() => trophy(list, el)); } });
})(typeof window !== 'undefined' ? window : globalThis);
