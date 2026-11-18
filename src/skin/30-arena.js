/* Last One Standing — pelle dell'area «Arena» (src/skin/30-arena.css).
 * - il «palcoscenico» accanto al selettore: dipinto dell'arena scelta, nome su lastre, numero, sigillo, targhe dei dati;
 * - il «mondo dietro»: il fondale dipinto dell'arena come scheggia fissa dietro la pagina, che cambia con la scelta.
 * È tutta decorazione costruita leggendo il DOM che ui.js già produce (le voci del selettore e la guida):
 * non tocca lo stato, non intercetta i comandi, e se manca qualcosa non fa nulla. Va caricato prima di ui.js. */
(function (G) {
  'use strict';
  if (typeof document === 'undefined') return;
  const AS = G.LOS_ASSETS || {}, FX = AS.fx || {};
  const reduced = () => !!(G.LOS_ANIM && G.LOS_ANIM.reduced) || document.documentElement.hasAttribute('data-reduced-motion');
  const E = Object.assign({ out: 'cubic-bezier(.16,1,.3,1)', in: 'cubic-bezier(.7,0,.84,0)', kick: 'cubic-bezier(.34,1.56,.64,1)' }, (G.LOS_REGIA && G.LOS_REGIA.E) || {});
  const h = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const anim = (n, kf, o) => { try { return n.animate(kf, Object.assign({ fill: 'backwards' }, o)); } catch (e) { return null; } };
  const url = (u) => 'url("' + String(u).replace(/"/g, '%22') + '")';

  let sec, list, apick, prev, stage, world, cur = null;

  // il nome su due righe: al trattino se c'è, altrimenti dove le righe vengono più equilibrate
  function lines(name) {
    const parts = name.split(/\s+[—–-]\s+/);
    if (parts.length > 1) return parts.slice(0, 3);
    const w = name.split(/\s+/).filter(Boolean);
    if (w.length < 2) return w;
    let best = 1, score = Infinity;
    for (let i = 1; i < w.length; i++) { const s = Math.max(w.slice(0, i).join(' ').length, w.slice(i).join(' ').length); if (s < score) { score = s; best = i; } }
    return [w.slice(0, best).join(' '), w.slice(best).join(' ')];
  }

  // uno strato nuovo sopra il vecchio, che entra con un taglio diagonale; il vecchio se ne va a fine corsa
  function swapLayer(box, make, animate) {
    const old = [...box.children], n = make(); if (!n) return;
    box.appendChild(n);
    const done = () => old.forEach((o) => o.remove());
    if (!animate || reduced()) return done();
    const a = anim(n, [{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, { clipPath: 'polygon(-30% 0, 100% 0, 100% 100%, 0 100%)' }], { duration: 460, easing: E.out });
    if (a) a.finished.then(done, done); else done();
  }

  function build() {
    stage = h('div', 'ar-stage'); stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '<i class="ar-bg"></i><b class="ar-ghost"></b><b class="ar-num"></b><div class="ar-paint"></div><i class="ar-seal"></i>' +
      '<div class="ar-title"></div><p class="ar-tag"></p><span class="ar-soft" hidden></span><div class="ar-stats"></div>';
    apick.appendChild(stage); apick.classList.add('has-stage');
    world = h('div'); world.id = 'arWorld'; world.setAttribute('aria-hidden', 'true');
    const atmo = document.getElementById('atmo');
    if (atmo && atmo.parentNode) atmo.parentNode.insertBefore(world, atmo.nextSibling); else document.body.prepend(world);
  }

  function sync() {
    const card = list.querySelector('[aria-checked="true"]'); if (!card) return;
    const id = card.dataset.theme; if (!id || id === cur) return;
    const first = cur === null, go = !first && !reduced(); cur = id;
    const nameEl = card.querySelector('b'), tagEl = card.querySelector('small'), softEl = card.querySelector('.psoft');
    const name = nameEl ? nameEl.textContent.trim() : id, idx = [...list.children].indexOf(card) + 1;
    const paint = AS.arene && AS.arene[id], fond = (FX.fondali && FX.fondali[id]) || paint;
    stage.dataset.arena = id;

    swapLayer(stage.querySelector('.ar-bg'), () => { const l = h('i', 'ar-l'); if (fond) l.style.backgroundImage = url(fond); return l; }, go);
    swapLayer(world, () => { const l = h('i', 'arw-l'); if (fond) l.style.backgroundImage = url(fond); return l; }, go);
    swapLayer(stage.querySelector('.ar-paint'), () => {
      if (paint) { const im = h('img'); im.alt = ''; im.decoding = 'async'; im.draggable = false; im.src = paint; return im; }
      const sc = card.querySelector('.pscene'); const c = sc ? sc.cloneNode(true) : h('i'); c.className = 'ar-svg'; return c;
    }, go);

    const num = stage.querySelector('.ar-num'); num.textContent = (idx < 10 ? '0' : '') + idx;
    const ls = lines(name), ghost = stage.querySelector('.ar-ghost'); ghost.textContent = ls[ls.length - 1];
    const title = stage.querySelector('.ar-title'); title.textContent = '';
    title.style.setProperty('--len', Math.max(6, ...ls.map((x) => x.length)));
    ls.forEach((t, i) => title.appendChild(h('span', 'ar-ln' + (i === ls.length - 1 && ls.length > 1 ? ' k' : ''), t)));
    const tag = stage.querySelector('.ar-tag'); tag.textContent = tagEl ? tagEl.textContent.trim() : '';
    const soft = stage.querySelector('.ar-soft'); soft.hidden = !softEl; soft.textContent = softEl ? softEl.textContent.trim() : '';

    if (go) {
      anim(num, [{ transform: 'translate(-30%, -20%) scale(1.6) rotate(-14deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 380, easing: E.kick });
      anim(ghost, [{ transform: 'translateX(12%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 520, easing: E.out });
      [...title.children].forEach((s, i) => anim(s, [{ clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-36px) skewX(-14deg)' }, { clipPath: 'inset(-20% -20% -20% 0)', transform: 'none' }], { duration: 360, delay: 70 + i * 55, easing: E.out }));
      anim(tag, [{ opacity: 0, transform: 'translateX(-22px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 200, easing: E.out });
      anim(stage.querySelector('.ar-seal'), [{ transform: 'rotate(40deg) scale(2.2)', opacity: 0 }, { transform: 'rotate(11deg) scale(1)', opacity: 1 }], { duration: 340, delay: 260, easing: E.kick });
      [...stage.querySelectorAll('.ar-st')].forEach((s, i) => anim(s, [{ transform: 'translateY(18px) rotate(3deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 300, delay: 150 + i * 45, easing: E.kick }));
    }
  }

  // le targhe dei dati copiano i quattro numeri della guida, anche mentre contano
  function syncStats() {
    const src = prev.querySelectorAll('.dx-stat'), box = stage.querySelector('.ar-stats');
    if (!src.length) return;
    if (box.children.length !== src.length) { box.textContent = ''; src.forEach(() => { const d = h('div', 'ar-st'); d.appendChild(h('b')); d.appendChild(h('span')); box.appendChild(d); }); }
    src.forEach((s, i) => {
      const b = s.querySelector('b'), l = s.querySelector('span'), d = box.children[i];
      const v = b ? b.textContent : '', t = l ? l.textContent : '';
      if (d.firstChild.textContent !== v) d.firstChild.textContent = v;
      if (d.lastChild.textContent !== t) d.lastChild.textContent = t;
    });
  }

  function init() {
    sec = document.getElementById('v-arena'); list = document.getElementById('themeList'); prev = document.getElementById('arenaPreview');
    apick = sec && sec.querySelector('.apick');
    if (!sec || !list || !prev || !apick || typeof MutationObserver === 'undefined') return;
    build();
    const safe = (f) => () => { try { f(); } catch (e) { /* decorazione: mai un errore verso la pagina */ } };
    const onList = safe(sync), onPrev = safe(syncStats), onSec = safe(() => world.classList.toggle('on', !sec.hidden));
    new MutationObserver(onList).observe(list, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-checked'] });
    new MutationObserver(onPrev).observe(prev, { childList: true, subtree: true, characterData: true });
    new MutationObserver(onSec).observe(sec, { attributes: true, attributeFilter: ['hidden'] });
    onList(); onPrev(); onSec();
  }
  try { if (document.getElementById('v-arena')) init(); else document.addEventListener('DOMContentLoaded', () => { try { init(); } catch (e) { /* niente */ } }); } catch (e) { /* niente */ }
})(typeof window !== 'undefined' ? window : globalThis);
