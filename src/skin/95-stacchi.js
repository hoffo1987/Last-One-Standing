/* Last One Standing — pelle · stacchi secondari (src/skin/95-stacchi.js).
 * Le transizioni «minori», tutte nella lingua degli stacchi di sezione e tutte senza toccare ui.js:
 *  - dialoghi: all'apertura il contenuto entra a strati (classe .st-opening); alla chiusura, che il browser fa in un
 *    colpo, una lastra vuota con la sagoma del dialogo se ne va di taglio e il velo si ritira;
 *  - notifiche (#toast): entrano di taglio da sinistra, escono a destra (una copia che se ne va);
 *  - Diretta: a ogni cambio di fase una lama attraversa il banner nel verso della navigazione, il titolo e le righe
 *    rientrano anche quando si torna indietro; al cambio di filtro o di ordine le righe risalgono a cascata;
 *  - schede della festa e vista dei Concorrenti (griglia / squadre): il contenuto entra dal lato verso cui ci si sposta.
 * È tutta decorazione: osserva il DOM che ui.js già produce, non intercetta i comandi e non blocca mai l'input
 * (gli elementi aggiunti hanno pointer-events: none e si tolgono da soli con un timer, anche se le animazioni restano
 * ferme perché la pagina è nascosta). Con il movimento ridotto non parte niente. Stili in 95-stacchi.css. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const D = document, root = D.documentElement;
  const reduced = () => !!(G.LOS_ANIM && G.LOS_ANIM.reduced) || root.hasAttribute('data-reduced-motion') || !!(G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const still = () => reduced() || D.hidden;
  const E = Object.assign({ out: 'cubic-bezier(.16,1,.3,1)', in: 'cubic-bezier(.7,0,.84,0)', io: 'cubic-bezier(.76,0,.24,1)', kick: 'cubic-bezier(.34,1.56,.64,1)' }, (G.LOS_REGIA && G.LOS_REGIA.E) || {});
  const safe = (fn) => function () { try { return fn.apply(this, arguments); } catch (e) { /* solo decorazione */ } };
  const play = (n, kf, o) => { try { return n.animate(kf, o); } catch (e) { return null; } };
  const make = (cls) => { const n = D.createElement('div'); n.className = cls; n.setAttribute('aria-hidden', 'true'); return n; };
  const gone = (n, ms) => setTimeout(() => { try { n.remove(); } catch (e) { /* già tolto */ } }, ms);
  const fresh = (t, ms) => Date.now() - t < (ms || 450);
  // una classe che accende una regia del CSS e si spegne da sola
  function flag(n, cls, ms) {
    n.classList.remove(cls); void n.offsetWidth; n.classList.add(cls);
    clearTimeout(n['__' + cls]); n['__' + cls] = setTimeout(() => n.classList.remove(cls), ms);
  }
  // lo stacco di sezione è in corso: le transizioni minori aspettano il prossimo giro
  const cutting = () => { const lx = D.querySelector('body > .lx'); return !!(lx && !lx.hidden); };

  /* ================= DIALOGHI ================= */
  const FULL = 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))';
  const seen = new WeakMap();
  // la sagoma si misura finché il dialogo è ancora aperto: dopo `close` non ha più misure
  const measure = safe((d) => {
    if (!d || !d.open || d.tagName !== 'DIALOG') return;
    const r = d.getBoundingClientRect(), dh = d.querySelector('.dh');
    seen.set(d, { x: r.left, y: r.top, w: r.width, h: r.height, dh: dh ? dh.offsetHeight : 0, t: Date.now() });
  });
  const leave = safe((d) => {
    const m = seen.get(d); seen.delete(d);
    if (!m || !fresh(m.t, 400) || !m.w || still() || D.querySelector('dialog[open]')) return;
    const drawer = d.classList.contains('drawer');
    const veil = make('st-veil'), g = make('st-ghost ' + (drawer ? 'st-g-drawer' : 'st-g-modal'));
    g.style.left = m.x + 'px'; g.style.top = m.y + 'px'; g.style.width = m.w + 'px'; g.style.height = m.h + 'px';
    g.style.setProperty('--dh', m.dh + 'px');
    D.body.append(veil, g);
    play(veil, [{ opacity: 1 }, { opacity: 0 }], { duration: 230, easing: 'ease-out', fill: 'forwards' });
    if (drawer) play(g, [{ transform: 'none' }, { transform: 'translateX(108%) skewX(-8deg)' }], { duration: 230, easing: E.in, fill: 'forwards' });
    else play(g, [{ transform: 'none', clipPath: FULL }, { transform: 'translateX(40px) skewX(-6deg)', clipPath: 'polygon(116% 0, 116% 0, 116% 22px, 100% 100%, 100% 100%, 100% calc(100% - 22px))' }], { duration: 210, easing: E.in, fill: 'forwards' });
    gone(veil, 300); gone(g, 300);
  });
  // `close()` resta quella del browser, con gli stessi argomenti e lo stesso risultato: prima si prende la misura,
  // subito dopo parte la lastra d'uscita (l'evento `close` arriva più tardi, e serve solo per il tasto Esc)
  const proto = G.HTMLDialogElement && G.HTMLDialogElement.prototype;
  if (proto && typeof proto.close === 'function' && !proto.close.__st) {
    const close0 = proto.close;
    const closeMeasured = function () { measure(this); const r = close0.apply(this, arguments); if (!this.open) leave(this); return r; };
    closeMeasured.__st = true; proto.close = closeMeasured;
  }
  D.addEventListener('cancel', (e) => measure(e.target), true); // tasto Esc
  D.addEventListener('close', (e) => { if (e.target && e.target.tagName === 'DIALOG') leave(e.target); }, true);
  const opened = safe((d) => {
    if (!d.open || still() || !d.classList.contains('modal')) return; // i cassetti (scheda, profilo) hanno già la loro regia
    flag(d, 'st-opening', 600);
  });

  /* ================= NOTIFICHE ================= */
  const TOAST = 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)';
  let toastText = '';
  const toast = safe((el) => {
    if (el.hidden) {
      // esce: una copia identica se ne va di lato (l'originale è già nascosto e resta com'è)
      if (!toastText || still()) { toastText = ''; return; }
      toastText = '';
      const g = el.cloneNode(true); g.removeAttribute('id'); g.removeAttribute('role'); g.hidden = false; g.setAttribute('aria-hidden', 'true'); g.inert = true; g.classList.add('st-out');
      D.body.appendChild(g);
      play(g, [{ translate: '0 0', opacity: 1, clipPath: TOAST }, { translate: '34px 0', opacity: 1, clipPath: 'polygon(100% 0, 100% 0, calc(100% - 10px) 100%, calc(100% - 10px) 100%)' }], { duration: 190, easing: E.in, fill: 'forwards' });
      gone(g, 240);
      return;
    }
    const text = el.textContent; if (text === toastText) return; toastText = text;
    if (still()) return;
    // entra: al posto della dissolvenza di serie, un taglio da sinistra con un piccolo contraccolpo
    el.getAnimations().forEach((a) => a.cancel());
    play(el, [{ translate: '-34px 0', opacity: 0, clipPath: 'polygon(10px 0, 10px 0, 0 100%, 0 100%)' }, { opacity: 1, offset: 0.3 }, { translate: '5px 0', clipPath: TOAST, offset: 0.72 }, { translate: '0 0', opacity: 1, clipPath: TOAST }], { duration: 300, easing: E.out });
  });

  /* ================= DIRETTA: FASE E FILTRI ================= */
  let lastPhase = null, readAt = 0;
  D.addEventListener('click', (e) => { const t = e.target; if (t && t.closest && t.closest('[data-evf], #orderSeg button')) readAt = Date.now(); }, true);
  D.addEventListener('change', (e) => { const t = e.target; if (t && t.closest && t.closest('#followOnly')) readAt = Date.now(); }, true);
  const rowsOf = (feed, max) => {
    const vh = G.innerHeight, out = [];
    for (const n of feed.children) { const r = n.getBoundingClientRect(); if (r.bottom < 0) continue; if (r.top > vh || out.length >= max) break; out.push(n); }
    return out;
  };
  function phaseCut(dir) {
    const bc = D.querySelector('#v-diretta .broadcast'), feed = D.getElementById('phBody');
    if (bc) {
      bc.querySelectorAll(':scope > .st-ph').forEach((x) => x.remove());
      const box = make('st-ph'); box.innerHTML = '<i></i><i></i><i></i>'; bc.appendChild(box);
      const w = bc.offsetWidth || 800, sk = ' skewX(' + -18 * dir + 'deg)';
      [...box.children].forEach((b, k) => {
        const lag = k * 0.16 * w, from = dir > 0 ? -0.5 * w - lag : 1.22 * w + lag, to = dir > 0 ? 1.25 * w : -0.6 * w;
        play(b, [{ transform: 'translateX(' + from.toFixed(0) + 'px)' + sk }, { transform: 'translateX(' + to.toFixed(0) + 'px)' + sk }], { duration: 330 + k * 40, easing: 'cubic-bezier(.5,0,.25,1)', fill: 'both' });
      });
      gone(box, 520);
      const kind = D.getElementById('bcKind'), intro = D.getElementById('phIntro'), title = D.getElementById('phTitle');
      [kind, intro].forEach((n, k) => { if (n && n.textContent) play(n, [{ translate: dir * 26 + 'px 0', opacity: 0 }, { opacity: 1, offset: 0.4 }, { translate: '0 0', opacity: 1 }], { duration: 280, delay: 90 + k * 70, easing: E.out, fill: 'backwards' }); });
      // andando avanti il titolo ha già le sue lettere (kinetic); tornando indietro rientra di lato
      if (dir < 0 && title && !title.querySelector('.kc')) play(title, [{ translate: '-34px 0', opacity: 0 }, { opacity: 1, offset: 0.4 }, { translate: '0 0', opacity: 1 }], { duration: 300, delay: 110, easing: E.out, fill: 'backwards' });
    }
    const cur = D.querySelector('#timeline .tph.cur');
    if (cur) play(cur, [{ scale: '1.45' }, { scale: '1' }], { duration: 280, easing: E.kick });
    // tornando indietro le righe non hanno la cascata di serie: rientrano da sinistra, in fretta
    if (dir < 0 && feed) rowsOf(feed, 9).forEach((n, k) => { if (!n.classList.contains('in')) play(n, [{ translate: '-30px 0', opacity: 0 }, { opacity: 1, offset: 0.4 }, { translate: '0 0', opacity: 1 }], { duration: 260, delay: 60 + k * 24, easing: E.out, fill: 'backwards' }); });
  }
  function readSwap() {
    const feed = D.getElementById('phBody'); if (!feed) return;
    rowsOf(feed, 12).forEach((n, k) => play(n, [{ translate: '0 14px', opacity: 0 }, { opacity: 1, offset: 0.45 }, { translate: '0 0', opacity: 1 }], { duration: 230, delay: k * 18, easing: E.out, fill: 'backwards' }));
    const chip = D.querySelector('#rbChips [aria-pressed="true"]');
    if (chip) play(chip, [{ scale: '.9' }, { scale: '1.1', offset: 0.5 }, { scale: '1' }], { duration: 260, easing: E.out });
  }
  const phase = safe(() => {
    const p = D.getElementById('bcPhase'), sec = D.getElementById('v-diretta'); if (!p || !sec) return;
    const m = p.textContent.match(/(\d+)/), n = m ? +m[1] : null, was = lastPhase;
    lastPhase = n;
    if (n == null || sec.hidden || still() || cutting()) return;
    if (was != null && n !== was) phaseCut(n > was ? 1 : -1);
    else if (fresh(readAt)) { readAt = 0; readSwap(); }
  });

  /* ================= SCHEDE E VISTE ================= */
  let festaAt = 0, festaDir = 1, viewAt = 0, viewDir = 1;
  D.addEventListener('click', (e) => {
    const t = e.target; if (!t || !t.closest) return;
    const f = t.closest('.fs-tabs button');
    if (f && f.getAttribute('aria-selected') !== 'true') { const all = [...f.parentNode.children]; festaDir = all.indexOf(f) >= all.findIndex((b) => b.getAttribute('aria-selected') === 'true') ? 1 : -1; festaAt = Date.now(); }
    const v = t.closest('#viewSeg button');
    if (v && v.getAttribute('aria-pressed') !== 'true') { const all = [...v.parentNode.children]; viewDir = all.indexOf(v) >= all.findIndex((b) => b.getAttribute('aria-pressed') === 'true') ? 1 : -1; viewAt = Date.now(); }
  }, true);
  const festa = safe((body) => {
    if (!fresh(festaAt) || still()) return; festaAt = 0;
    body.style.setProperty('--st-dir', String(festaDir)); flag(body, 'st-swap', 480);
  });
  const cast = safe((list) => {
    if (!fresh(viewAt) || still() || cutting()) return; viewAt = 0;
    // le schede hanno già la loro cascata: qui si sposta solo il piano, dal lato verso cui si è mosso il selettore
    list.style.setProperty('--st-dir', String(viewDir)); flag(list, 'st-swap', 480);
  });

  /* ================= AVVIO ================= */
  const start = safe(() => {
    if (typeof MutationObserver === 'undefined') return;
    D.querySelectorAll('dialog').forEach((d) => new MutationObserver(() => opened(d)).observe(d, { attributes: true, attributeFilter: ['open'] }));
    const t = D.getElementById('toast');
    if (t) new MutationObserver(() => toast(t)).observe(t, { attributes: true, attributeFilter: ['hidden'], childList: true, characterData: true, subtree: true });
    const ph = D.getElementById('bcPhase');
    if (ph) { new MutationObserver(phase).observe(ph, { childList: true, characterData: true, subtree: true }); const m = ph.textContent.match(/(\d+)/); lastPhase = m ? +m[1] : null; }
    const fb = D.getElementById('festaBody');
    if (fb) new MutationObserver(() => festa(fb)).observe(fb, { childList: true });
    const cl = D.getElementById('castList');
    if (cl) new MutationObserver(() => cast(cl)).observe(cl, { childList: true });
  });
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
