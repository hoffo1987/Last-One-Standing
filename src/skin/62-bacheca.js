/* ================= PELLE · LA BACHECA, FASE 3 (regia) =================
 * Aggiunge a window.LOS_PARTITA_FX il gancio trophy(list, sectionEl): ui.js lo chiama una volta sola quando
 * nell'Esito ci sono trofei appena sbloccati. Per ogni trofeo passa uno stacco «Trofeo sbloccato» (in coda, non
 * blocca niente, se ne va da solo, un clic lo salta) e sulla riga corrispondente cade il timbro «Nuovo».
 * In più, senza toccare ui.js:
 * - la lamina d'oro e la coppa diventano proprietà CSS (--fx-foil, --fx-coppa) per le carte leggendarie, il trofeo
 *   «Leggenda» e la testata della pagina; se le immagini mancano restano le sfumature;
 * - nella pagina «Trofei» (#v-trofei) il contenuto entra a cascata solo quando si cambia scheda o si arriva sulla
 *   pagina (non quando la scheda si ridisegna per un clic), il conto dei trofei ha la sua barra, ogni categoria il
 *   suo «2/10», le carte dell'album si inclinano verso il puntatore e chi non ha una foto riceve il volto di riserva;
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

  /* ---------- le immagini: l'emblema di ogni trofeo, la coppa e la lamina d'oro ---------- */
  // l'emblema lo mette già ui.js nelle righe; qui serve per lo stacco. La coppa e la lamina vanno in CSS
  const FXA = () => (G.LOS_ASSETS && G.LOS_ASSETS.fx) || {};
  const emblema = (id) => { const T = FXA().trofei || {}; return T[id] || T.coppa || ''; };
  const cssUrl = (u) => 'url("' + String(u).replace(/["\\\n]/g, '') + '")';
  function assets() {
    const fx = FXA(), T = fx.trofei || {};
    if (fx.foil) root.style.setProperty('--fx-foil', cssUrl(fx.foil));
    if (T.coppa) { root.style.setProperty('--fx-coppa', cssUrl(T.coppa)); root.classList.add('fx-trofei'); }
  }
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
    const ic = h('span', 'tr-ic' + (v.t.id === 'leggenda' ? ' oro' : '')), src = emblema(v.t.id);
    if (src) { const im = h('img'); im.alt = ''; im.src = src; ic.appendChild(im); }
    const tx = h('span', 'tc-tx'), k = h('em', 'tc-k', 'Trofeo sbloccato' + (v.t.cat ? ' · ' + v.t.cat : ''));
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

  /* ---------- 3 · la pagina dei trofei ---------- */
  let scheda = null, swapT = 0;
  function bacheca(body) {
    const view = doc.getElementById('v-trofei');
    const sel = view && view.querySelector('[data-bc][aria-selected="true"]'), ora = sel ? sel.dataset.bc : '';
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
    // la cascata solo se la scheda è cambiata (o si è appena arrivati sulla pagina)
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
    const body = doc.getElementById('bachecaBody'), view = doc.getElementById('v-trofei'); if (!body || body.__bc) return; body.__bc = true;
    new MutationObserver(() => safe(() => bacheca(body))).observe(body, { childList: true });
    // arrivando sulla pagina lo scudo della testata scatta e la cascata riparte; andando via si dimentica la scheda
    let qui = false, heroT = 0;
    const rotta = () => {
      const ora = G.location.hash === '#trofei';
      if (ora && !qui && view && !reduced()) { clearTimeout(heroT); view.classList.remove('tf-in'); void view.offsetWidth; view.classList.add('tf-in'); heroT = setTimeout(() => view.classList.remove('tf-in'), 1000); }
      if (!ora) scheda = null;
      qui = ora;
    };
    G.addEventListener('hashchange', () => safe(rotta)); safe(rotta);
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
    const on = () => { safe(() => interviste(body)); };
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
    safe(assets); safe(watchBacheca); safe(watchEsito);
    // ui.js e bacheca.js vengono dopo la pelle: il conto in home si scrive quando ci sono
    setTimeout(() => safe(homeCount), 0);
    G.addEventListener('hashchange', () => safe(homeCount));
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
  G.LOS_PARTITA_FX = Object.assign(G.LOS_PARTITA_FX || {}, { trophy(list, el) { safe(() => trophy(list, el)); } });
})(typeof window !== 'undefined' ? window : globalThis);
