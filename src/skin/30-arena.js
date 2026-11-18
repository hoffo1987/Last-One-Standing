/* Last One Standing — pelle dell'area «Arena» (src/skin/30-arena.js).
 * - il «palcoscenico» accanto al selettore: dipinto dell'arena scelta con il numero, nome su una lastra, descrizione, targhe dei dati;
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
  // ogni cambio parte pulito: `gen` invalida i caricamenti e i timer del cambio precedente, `live` sono le sole animazioni in corso
  let gen = 0, live = [], tidy = 0;
  const q = (c) => stage.querySelector(c);
  const play = (n, kf, o) => { const x = n && anim(n, kf, o); if (x) live.push(x); return x; };
  function halt() { live.forEach((x) => { try { x.cancel(); } catch (e) { /* già finita */ } }); live = []; clearTimeout(tidy); }
  // in ogni contenitore resta un solo strato: l'ultimo arrivato
  function settle(box) { const k = box.children; while (k.length > 1) k[0].remove(); }
  const boxes = () => [q('.ar-paint'), world];

  // doppio buffer: al più due strati, il nuovo entra sopra con un taglio diagonale e a fine corsa il vecchio se ne va
  function swapLayer(box, n, animate) {
    settle(box); box.appendChild(n);
    if (!animate) return settle(box);
    // dissolvenza con un breve scivolamento: niente tagli a metà, che a schermo sembravano un errore
    const x = play(n, [{ opacity: 0, transform: 'translateX(18px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: E.out });
    if (!x) return settle(box);
    x.onfinish = () => settle(box);
  }

  function build() {
    stage = h('div', 'ar-stage'); stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '<div class="ar-card"><div class="ar-paint"></div><b class="ar-num"></b><div class="ar-title"></div><p class="ar-tag"></p><span class="ar-soft" hidden></span><div class="ar-stats"></div></div>';
    apick.appendChild(stage); apick.classList.add('has-stage');
    world = h('div'); world.id = 'arWorld'; world.setAttribute('aria-hidden', 'true');
    const atmo = document.getElementById('atmo');
    if (atmo && atmo.parentNode) atmo.parentNode.insertBefore(world, atmo.nextSibling); else document.body.prepend(world);
  }

  function sync() {
    const card = list.querySelector('[aria-checked="true"]'); if (!card) return;
    const id = card.dataset.theme; if (!id || id === cur) return;
    const first = cur === null, go = !first && !reduced(), my = ++gen; cur = id;
    const nameEl = card.querySelector('b'), tagEl = card.querySelector('small'), softEl = card.querySelector('.psoft');
    const name = nameEl ? nameEl.textContent.trim() : id, idx = [...list.children].indexOf(card) + 1;
    const paint = AS.arene && AS.arene[id], fond = (FX.fondali && FX.fondali[id]) || paint;
    stage.dataset.arena = id;

    // 1. si ferma tutto ciò che il cambio precedente aveva avviato e si toglie ogni strato di troppo
    halt(); boxes().forEach(settle);

    // 2. il testo cambia subito, in un colpo
    const num = q('.ar-num'), title = q('.ar-title'), tag = q('.ar-tag'), soft = q('.ar-soft');
    num.textContent = (idx < 10 ? '0' : '') + idx;
    title.textContent = name.replace(/s+[—–]s+/g, ' — ');
    tag.textContent = tagEl ? tagEl.textContent.trim() : '';
    soft.hidden = !softEl; soft.textContent = softEl ? softEl.textContent.trim() : '';

    // 3. gli strati dipinti: il fondale subito, il dipinto appena l'immagine è pronta (se nel frattempo si è cambiato ancora, si lascia perdere)
    const wl = h('i', 'arw-l'); if (fond) wl.style.backgroundImage = url(fond);
    swapLayer(world, wl, go);
    const box = q('.ar-paint');
    if (paint) {
      const im = h('img'); im.alt = ''; im.draggable = false;
      const put = () => { if (my === gen && !im.parentNode) swapLayer(box, im, go); };
      im.onload = put; im.onerror = put; im.src = paint;
      if (im.complete) put();
    } else {
      const sc = card.querySelector('.pscene'), c = sc ? sc.cloneNode(true) : h('i'); c.className = 'ar-svg';
      swapLayer(box, c, go);
    }

    if (go) {
      // il numero cade come un timbro, il nome si scopre da sinistra, le targhe salgono una dopo l'altra
      // (solo translate / scale / rotate / opacity: le inclinazioni proprie degli elementi restano)
      play(num, [{ translate: '-30% 0', scale: '1.5', rotate: '-8deg', opacity: 0 }, { opacity: 1, offset: 0.4 }, { translate: '0 0', scale: '1', rotate: '0deg', opacity: 1 }], { duration: 300, easing: E.kick });
      play(title, [{ opacity: 0, translate: '-26px 0', clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, offset: 0.3 }, { opacity: 1, translate: '0 0', clipPath: 'inset(0 -8% 0 0)' }], { duration: 280, delay: 40, easing: E.out });
      play(tag, [{ opacity: 0, translate: '-18px 0' }, { opacity: 1, translate: '0 0' }], { duration: 260, delay: 100, easing: E.out });
      [...q('.ar-stats').children].forEach((s, k) => play(s, [{ opacity: 0, translate: '0 14px' }, { opacity: 1, offset: 0.5 }, { opacity: 1, translate: '0 0' }], { duration: 260, delay: 130 + k * 34, easing: E.out }));
      // rete di sicurezza: se le animazioni non arrivano in fondo (scheda in secondo piano), lo stato finale si impone lo stesso
      tidy = setTimeout(() => { if (my === gen) { halt(); boxes().forEach(settle); } }, 900);
    }
  }

  // le targhe dei dati copiano i quattro numeri della guida, anche mentre contano
  function syncStats() {
    const src = prev.querySelectorAll('.dx-stat'), box = q('.ar-stats');
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
