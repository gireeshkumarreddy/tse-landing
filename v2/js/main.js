const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------------- nav ---------------- */
const nav = $('[data-nav]');
const progress = $('.nav__progress');
let scrollRaf = 0;
const onScroll = () => {
  nav.classList.toggle('is-solid', scrollY > 40);
  if (!scrollRaf) scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
  });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = $('[data-menu-toggle]');
const menu = $('#menu');
function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) menu.querySelector('a').focus();
}
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
});

/* ---------------- how you relate: sample prompts → sketch ---------------- */
const sketch = $('[data-sketch]');
const state = { reach: null, values: [], life: {} };
const LIFE = {
  family: ['living close to family', 'living wherever life takes you'],
  quiet: ['quiet weekends', 'weekends out with friends'],
  routine: ['a steady routine', 'spontaneous plans'],
};
const list = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a.at(-1)}`);

function writeSketch() {
  const s = [];
  if (state.reach) s.push(`When things get hard, you reach for ${state.reach}.`);
  if (state.values.length) s.push(`You won’t compromise on ${list(state.values)}.`);
  const life = Object.entries(state.life).map(([k, on]) => LIFE[k][on ? 0 : 1]);
  if (life.length) s.push(`You picture ${list(life)}.`);
  sketch.textContent = s.length ? s.join(' ') : 'Answer a prompt and a first sketch of you appears here.';
  sketch.closest('.lcard').animate?.([{ boxShadow: '0 0 0 3px rgba(124,92,255,.7)' }, { boxShadow: '0 0 0 0 rgba(124,92,255,0)' }], { duration: 700 });
}

$('[data-lab="relate"]').addEventListener('change', (e) => { state.reach = e.target.value; writeSketch(); });

const valueInputs = $$('[data-lab="value"] input');
$('[data-lab="value"]').addEventListener('change', () => {
  state.values = valueInputs.filter((i) => i.checked).map((i) => i.value);
  const full = state.values.length >= 3;
  valueInputs.forEach((i) => { i.disabled = full && !i.checked; });
  writeSketch();
});

$$('[data-life]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-checked') !== 'true';
    btn.setAttribute('aria-checked', String(on));
    state.life[btn.dataset.life] = on;
    writeSketch();
  });
});

/* =====================================================================
   Motion & interaction — only when motion is welcome.
   ?nomotion previews exactly what reduced-motion visitors get.
   ===================================================================== */
const root = document.documentElement;
const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches
  && !new URLSearchParams(location.search).has('nomotion');
const finePointer = matchMedia('(pointer: fine)').matches;

/** Wrap each word of an element in .w spans, keeping inline markup (em, br, spans). */
function splitWords(el) {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/([ \t\n\r]+)/).forEach((part) => {
          if (!part) return;
          if (/^[ \t\n\r]+$/.test(part)) { frag.append(' '); return; }
          const w = document.createElement('span');
          w.className = 'w';
          w.style.setProperty('--i', i++);
          w.textContent = part;
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === Node.ELEMENT_NODE && n.tagName !== 'BR' && n.tagName !== 'svg') {
        walk(n);
      }
    });
  };
  walk(el);
  el.dataset.split = '';
}

/** Fade things in as they arrive; staggered among siblings. */
function initReveals() {
  const splitTargets = $$('.hero__title, .why__title, .noise__head h2, .middle__copy h2, .serif-h, .diff h2, .sec-head--dark h2, .final__title, .note__quote p');
  splitTargets.forEach((el) => {
    el.removeAttribute('data-reveal');
    el.closest('[data-reveal]')?.removeAttribute('data-reveal');
    splitWords(el);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if ('reveal' in el.dataset) {
        const sibs = [...el.parentElement.children].filter((c) => 'reveal' in c.dataset);
        el.style.setProperty('--d', `${Math.max(0, sibs.indexOf(el)) * 0.09}s`);
      }
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal], [data-split]').forEach((el) => io.observe(el));
}

/**
 * Movers: floating faces, chips and chat cards.
 * Each one drifts (CSS), leans toward the cursor by its depth, parallaxes
 * with scroll, and — on mouse/trackpad — can be dragged and flung back.
 */
function initMovers() {
  const movers = $$('[data-move]').map((el) => ({
    el,
    depth: Number(el.dataset.depth || 1),
    speed: Number(el.dataset.speed || 0),
    sec: el.closest('section'),
    mx: 0, my: 0, dx: 0, dy: 0, sy: 0, on: false, dragging: false,
  }));
  movers.forEach((m, i) => {
    m.el.style.setProperty('--dur', `${5 + (i % 5) * 0.9}s`);
    m.el.style.setProperty('--delay', `${-(i * 1.3) % 6}s`);
  });

  const seen = new IntersectionObserver((entries) => {
    entries.forEach((e) => { const m = movers.find((x) => x.el === e.target); if (m) m.on = e.isIntersecting; });
  }, { rootMargin: '200px 0px' });
  movers.forEach((m) => seen.observe(m.el));

  let nx = 0; let ny = 0;
  if (finePointer) {
    addEventListener('pointermove', (e) => {
      nx = (e.clientX / innerWidth) * 2 - 1;
      ny = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });
  }

  const tick = () => {
    const rects = new Map();
    for (const m of movers) {
      if (!m.on) continue;
      if (!m.dragging) {
        m.mx += (nx * m.depth * 28 - m.mx) * 0.07;
        m.my += (ny * m.depth * 22 - m.my) * 0.07;
      }
      if (m.speed && m.sec) {
        let r = rects.get(m.sec);
        if (!r) { r = m.sec.getBoundingClientRect(); rects.set(m.sec, r); }
        const p = (innerHeight - r.top) / (innerHeight + r.height);
        m.sy = m.speed * 180 * (Math.min(1, Math.max(0, p)) - 0.5);
      }
      m.el.style.transform = `translate3d(${(m.mx + m.dx).toFixed(1)}px, ${(m.my + m.dy + m.sy).toFixed(1)}px, 0)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  if (!finePointer) return;
  root.classList.add('can-drag');
  const hint = $('.drag-hint');
  movers.filter((m) => 'drag' in m.el.dataset).forEach((m) => {
    const el = m.el;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      window.gsap?.killTweensOf(m);
      m.dragging = true;
      el.classList.add('is-dragging');
      const ox = e.clientX - m.dx; const oy = e.clientY - m.dy;
      let lastX = e.clientX;
      const move = (ev) => {
        m.dx = ev.clientX - ox; m.dy = ev.clientY - oy;
        const v = ev.clientX - lastX; lastX = ev.clientX;
        el.style.rotate = `${Math.max(-16, Math.min(16, v * 0.9))}deg`;
      };
      const up = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        m.dragging = false;
        el.classList.remove('is-dragging');
        el.style.rotate = '';
        hint?.classList.add('is-gone');
        if (window.gsap) window.gsap.to(m, { dx: 0, dy: 0, duration: 1.5, ease: 'elastic.out(1, 0.42)' });
        else { m.dx = 0; m.dy = 0; }
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  });
}

/** Cards, phones and frames tilt toward the cursor with a soft glare. */
function initTilt() {
  $$('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('is-tilting');
      el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}

/** Primary buttons lean toward the cursor. */
function initMagnetic() {
  $$('.pill--lg, .pill--xl').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.translate = `${((e.clientX - (r.left + r.width / 2)) * 0.28).toFixed(1)}px ${((e.clientY - (r.top + r.height / 2)) * 0.4).toFixed(1)}px`;
    });
    b.addEventListener('pointerleave', () => { b.style.translate = ''; });
  });
}

/** The hero illustration drifts gently against the cursor. */
function initHeroDrift() {
  const img = $('[data-hero-img]');
  const hero = $('.hero');
  hero.addEventListener('pointermove', (e) => {
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = (e.clientY / innerHeight) * 2 - 1;
    img.style.translate = `${(-nx * 18).toFixed(1)}px ${(-ny * 12).toFixed(1)}px`;
  });
  hero.addEventListener('pointerleave', () => { img.style.translate = ''; });
}

/** Run a callback on an interval only while an element is on screen. */
function whileVisible(el, fn, every) {
  let timer = 0;
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) timer = setInterval(fn, every);
  }, { threshold: 0.4 }).observe(el);
}

/** Mock app screens behave like the product: answers get picked, faces take turns. */
function initLivingMocks() {
  const q = $('[data-cycle]')?.closest('.mock');
  if (q) {
    const opts = $$('.mock__opt', q);
    const bar = $('.mock__bar i', q);
    let i = opts.findIndex((o) => o.classList.contains('is-on'));
    whileVisible(q, () => {
      i = (i + 1) % opts.length;
      opts.forEach((o, k) => o.classList.toggle('is-on', k === i));
      bar.style.width = `${34 + ((i + 1) / opts.length) * 56}%`;
    }, 2200);
  }
  const stack = $('[data-stack]');
  if (stack) {
    const faces = $$('.face', stack);
    let lit = faces.findIndex((f) => f.classList.contains('is-on'));
    whileVisible(stack, () => {
      lit = (lit + 1) % faces.length;
      faces.forEach((f, k) => { f.classList.toggle('is-on', k === lit); f.classList.toggle('is-dim', k !== lit); });
    }, 1800);
  }
  $$('[data-auto-toggle]').forEach((t) => {
    t.classList.remove('is-on');
    new IntersectionObserver(([e], io) => {
      if (e.isIntersecting) { setTimeout(() => t.classList.add('is-on'), 600); io.disconnect(); }
    }, { threshold: 0.6 }).observe(t);
  });
}

if (motionOK) {
  root.classList.add('motion');
  initReveals();
  initMovers();
  initLivingMocks();
  if (finePointer) { initTilt(); initMagnetic(); initHeroDrift(); }
}

/* ---------------- GSAP scroll choreography ---------------- */
function showThread(duo, n) {
  $$('.thread > li', duo).forEach((li, i) => li.classList.toggle('is-shown', i < n));
}

function initScroll() {
  const { gsap, ScrollTrigger } = window;
  if (!motionOK || !gsap || !ScrollTrigger) {
    $$('[data-duo]').forEach((duo) => showThread(duo, Infinity));
    $$('[data-row]').forEach((r) => r.classList.add('is-struck'));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // hero: the art sinks, the words lift away
  gsap.to('[data-hero-img]', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('[data-hero-content]', { y: -90, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '75% top', scrub: true } });

  // the two chats play out as you read
  $$('[data-duo]').forEach((duo) => {
    const total = $$('.thread > li', duo).length;
    showThread(duo, 1);
    const update = (self) => showThread(duo, Math.max(1, Math.round(self.progress * total)));
    ScrollTrigger.create({ trigger: $('.phone', duo), start: 'top 80%', end: 'bottom 55%', onUpdate: update, onRefresh: update });
  });

  // the old way gets crossed out, row by row
  $$('[data-row]').forEach((row) => {
    ScrollTrigger.create({ trigger: row, start: 'top 72%', onEnter: () => row.classList.add('is-struck'), onLeaveBack: () => row.classList.remove('is-struck') });
  });

  // the payoff image opens up
  gsap.fromTo('[data-note-art]', { scale: 0.84, borderRadius: 56, opacity: 0.4 }, { scale: 1, borderRadius: 30, opacity: 1, ease: 'none', scrollTrigger: { trigger: '[data-note-art]', start: 'top 95%', end: 'center 55%', scrub: true } });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'complete') initScroll();
else addEventListener('load', initScroll, { once: true });
