/* ================= PELLE · FESTA E CARTOLINE, FASE 4 (regia) =================
 * Aggiunge a window.LOS_PARTITA_FX il gancio postcard(dialogEl, kind), che ui.js chiama quando una cartolina è
 * pronta (cade sul tavolo), e allunga il gancio card(el, opts): il cartello «passa il telefono» (.sc-pass) riceve
 * la targa «Turno di» con il nome enorme, nel colore e col numero del giocatore (letti dal tabellone).
 * In più, senza toccare ui.js:
 * - nella sala d'attesa (#festaBody) il codice della stanza diventa quattro tessere, chi si aggiunge entra di lato;
 * - nel tabellone della Diretta (#ptHud .pt-festa) chi ha più crediti è segnato in testa, il conto che cambia
 *   scatta e i campioni senza foto ricevono la fascia sugli occhi di riserva;
 * - nell'Esito la classifica della festa (.fs-rank) si rivela dall'ultimo al primo quando arriva sullo schermo,
 *   e i punti contano.
 * Solo decorazione: ogni passo è protetto, niente blocca i comandi, le classi si tolgono da sole. Con il movimento
 * ridotto non si muove niente. Gli stili sono in 63-festa.css. */
(function (G) {
  'use strict';
  const doc = G.document; if (!doc) return;
  const root = doc.documentElement;
  const LOOK = () => G.LOS_LOOK || {};
  const reduced = () => !!((G.LOS_ANIM && G.LOS_ANIM.reduced) || root.hasAttribute('data-reduced-motion') || (G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const sfx = (n, o) => { try { const s = LOOK().sfx; if (s && s.play) s.play(n, o); } catch (e) { /* niente audio */ } };
  const h = (tag, cls, txt) => { const el = doc.createElement(tag); if (cls) el.className = cls; if (txt != null) el.textContent = txt; return el; };
  const safe = (fn) => { try { return fn(); } catch (e) { /* solo decorazione */ } };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  // una classe che fa partire un'animazione e poi si toglie
  const scatta = (el, cls, ms) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };
  // chi non ha una foto riceve l'immagine di riserva del gruppo (volti o occhi), la stessa che ha altrove
  function riserva(av, gruppo) {
    if (!av || av.querySelector('img') || av.classList.contains('has-volto')) return;
    const fx = LOOK().fx || {}, pick = LOOK().pickFor; if (!pick || !fx[gruppo]) return;
    const u = pick(fx[gruppo], av.dataset.g, av.dataset.k || av.title); if (!u) return;
    const im = h('img', 'volto'); im.alt = ''; im.decoding = 'async'; im.src = u;
    av.prepend(im); av.classList.add('has-volto');
  }

  /* ---------- 1 · la sala d'attesa ---------- */
  let ultimoCodice = '', vista = '', quanti = { p: 0, g: 0 };
  function sala(body) {
    // il codice: quattro tessere (le lettere restano testo, una per una)
    const code = body.querySelector('.fs-code');
    if (code && !code.classList.contains('fs-split')) {
      const txt = code.textContent.trim();
      if (/^[A-Z]{4}$/.test(txt)) {
        code.textContent = '';
        txt.split('').forEach((c, i) => { const l = h('span', 'fs-l', c); l.style.setProperty('--i', i); code.appendChild(l); });
        code.classList.add('fs-split');
        if (txt !== ultimoCodice && !reduced()) { code.classList.add('fs-pop'); setTimeout(() => code.classList.remove('fs-pop'), 1000); sfx('stamp'); }
        ultimoCodice = txt;
      }
    }
    // chi si aggiunge: la sua riga entra (solo se la schermata è la stessa di prima)
    const dlg = doc.getElementById('festaDlg'), sel = dlg && dlg.querySelector('[data-fs][aria-selected="true"]');
    const ora = (sel ? sel.dataset.fs : '') + (code ? ':stanza' : '');
    const P = body.querySelectorAll('.fs-players > li'), Gs = body.querySelectorAll('.fs-guests > li');
    if (ora === vista && !reduced()) {
      if (P.length > quanti.p && quanti.p > 0) { P[P.length - 1].classList.add('fs-new'); sfx('move'); }
      if (Gs.length > quanti.g) { Gs[Gs.length - 1].classList.add('fs-new'); sfx('confirm'); }
    }
    vista = ora; quanti = { p: P.length, g: Gs.length };
  }
  function watchSala() {
    const body = doc.getElementById('festaBody'), dlg = doc.getElementById('festaDlg'); if (!body || body.__fs) return; body.__fs = true;
    new MutationObserver(() => safe(() => sala(body))).observe(body, { childList: true });
    if (dlg) dlg.addEventListener('close', () => { vista = ''; });
    if (body.firstChild) safe(() => sala(body));
  }

  /* ---------- 2 · «passa il telefono»: la targa «Turno di» ---------- */
  function passa(el) {
    if (!el || !el.classList.contains('sc-pass') || el.querySelector('.sp-big')) return;
    const head = el.querySelector('.sc-head'), t = el.querySelector('.sc-t'); if (!head || !t) return;
    const lab = ((el.querySelector('.sc-opt .sc-l') || {}).textContent || '').trim();
    const titolo = (t.getAttribute('aria-label') || t.textContent || '').trim();
    const nome = (/^Sono (.+), vai$/.exec(lab) || /^Passa il telefono a (.+)$/.exec(titolo) || [])[1]; if (!nome) return;
    // il colore e il numero del giocatore stanno nel tabellone della Diretta
    const righe = [...doc.querySelectorAll('#ptHud .pf-pl')], i = righe.findIndex((li) => ((li.querySelector('.pf-nm') || {}).textContent || '').trim() === nome);
    const big = h('div', 'sp-big'); big.setAttribute('aria-hidden', 'true');
    if (i >= 0) { const pc = righe[i].style.getPropertyValue('--pc').trim(); if (pc) el.style.setProperty('--pc', pc); big.dataset.pn = String(i + 1); }
    big.appendChild(h('span', 'sp-k', 'Turno di'));
    const n = h('span', 'sp-n', nome); n.style.setProperty('--n', String(Math.max(4, ...nome.split(/\s+/).map((w) => w.length))));
    big.appendChild(n);
    head.insertBefore(big, t);
    sfx('stamp');
  }

  /* ---------- 3 · il tabellone della festa nella Diretta ---------- */
  let crediti = {}, corsa = null;
  function tabellone(hud) {
    const righe = [...hud.querySelectorAll('.pt-festa .pf-pl')];
    if (hud.hidden || !righe.length) { crediti = {}; corsa = null; return; }
    // una partita nuova non confronta i crediti con quelli della precedente
    if (corsa !== (hud.dataset.run || '')) { crediti = {}; corsa = hud.dataset.run || ''; }
    const val = righe.map((li) => parseInt((li.querySelector('em') || {}).textContent, 10));
    const max = Math.max(...val.filter(Number.isFinite));
    const pari = val.filter((v) => v === max).length;
    righe.forEach((li, i) => {
      safe(() => riserva(li.querySelector('.av'), 'occhi'));
      if (righe.length > 1 && pari < righe.length && val[i] === max) li.classList.add('pf-top');
      const k = i + ':' + ((li.querySelector('.pf-nm') || {}).textContent || '');
      if (crediti[k] != null && crediti[k] !== val[i] && !reduced() && !doc.hidden) scatta(li, 'pf-bump', 500);
      crediti[k] = val[i];
    });
  }
  function watchHud() {
    const hud = doc.getElementById('ptHud'); if (!hud || hud.__fs) return; hud.__fs = true;
    new MutationObserver(() => safe(() => tabellone(hud))).observe(hud, { childList: true, attributes: true, attributeFilter: ['hidden'] });
    safe(() => tabellone(hud));
  }

  /* ---------- 4 · la classifica della festa nell'Esito ---------- */
  // i punti contano; lo zero si scrive solo dentro un fotogramma, e il numero vero torna comunque
  function conta(em, ritardo) {
    const nodo = em.firstChild; if (!nodo || nodo.nodeType !== 3) return;
    const testo = nodo.nodeValue, a = parseInt(testo, 10); if (!(a > 0)) return;
    const t0 = performance.now() + ritardo, dur = 800;
    const passo = (ora) => {
      if (!em.isConnected) return;
      const k = clamp((ora - t0) / dur, 0, 1);
      if (k >= 1 || reduced()) { nodo.nodeValue = testo; return; }
      nodo.nodeValue = String(Math.round(a * (1 - Math.pow(1 - k, 3)))); requestAnimationFrame(passo);
    };
    requestAnimationFrame((ora) => { nodo.nodeValue = '0'; passo(ora); });
    setTimeout(() => { if (em.isConnected) nodo.nodeValue = testo; }, ritardo + dur + 500);
  }
  let rkStop = null;
  function classifica(body) {
    const s = body.querySelector('.fs-rank'); if (!s || s.__fs) return; s.__fs = true;
    if (rkStop) { rkStop(); rkStop = null; }
    const righe = [...s.querySelectorAll('ol > li')]; if (!righe.length) return;
    righe.forEach((li, i) => { li.style.setProperty('--k', righe.length - 1 - i); safe(() => riserva(li.querySelector('.av'), 'volti')); });
    if (reduced()) return;
    // niente IntersectionObserver (in una scheda che non compone fotogrammi non avvisa): si misura allo scorrimento
    let off = false; const nato = Date.now();
    const stop = () => { off = true; G.removeEventListener('scroll', go, true); G.removeEventListener('resize', go); clearInterval(beat); };
    const go = () => {
      if (off || !s.isConnected) { stop(); return; }
      // la sequenza di vittoria copre tutto: si aspetta che se ne vada (dopo 8 secondi si parte comunque)
      if (Date.now() - nato < 8000 && (doc.querySelector('body > .pf') || (body.classList.contains('es-on') && !body.classList.contains('es-go')))) return;
      const r = s.getBoundingClientRect(); if (!r.height || r.top > G.innerHeight * 0.84 || r.bottom < 0) return;
      stop();
      const fine = (righe.length - 1) * 150;
      s.classList.add('fr-go'); sfx('cut');
      righe.forEach((li, i) => { const pt = li.querySelector('.fr-pt'); if (pt) conta(pt, (righe.length - 1 - i) * 150 + 80); });
      setTimeout(() => { if (s.isConnected) sfx('stamp'); }, fine + 320);
      // la classe si toglie: tornando all'Esito non riparte
      setTimeout(() => s.classList.remove('fr-go'), fine + 1400);
    };
    G.addEventListener('scroll', go, { capture: true, passive: true }); G.addEventListener('resize', go);
    const beat = setInterval(go, 400);
    rkStop = stop; setTimeout(go, 160);
  }
  function watchEsito() {
    const body = doc.getElementById('resBody'); if (!body || body.__fs) return; body.__fs = true;
    new MutationObserver(() => safe(() => classifica(body))).observe(body, { childList: true });
    safe(() => classifica(body));
  }

  /* ---------- 5 · la cartolina pronta ---------- */
  function cartolina(dlg, kind) {
    const fr = dlg && dlg.querySelector('.ct-frame'); if (!fr) return;
    fr.dataset.kind = kind || '';
    sfx('stamp');
    if (!reduced()) scatta(fr, 'ct-ready', 700);
  }

  function boot() { safe(watchSala); safe(watchHud); safe(watchEsito); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
  // i ganci: card si allunga (quello di 61-partita.js resta e viene prima), postcard è nuovo
  const FX = G.LOS_PARTITA_FX = G.LOS_PARTITA_FX || {}, prima = FX.card;
  FX.card = function (el, o) { if (prima) safe(() => prima.call(FX, el, o)); safe(watchHud); safe(() => passa(el)); };
  FX.postcard = function (dlg, kind) { safe(() => cartolina(dlg, kind)); };
})(typeof window !== 'undefined' ? window : globalThis);
