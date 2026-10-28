import { MOODS, mountPeople, setMood, setLook } from './cast.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const parseLook = (v) => (v ? v.split(',').map(Number) : undefined);

/** Set a mood, keeping the element's own gaze unless the mood dictates one. */
function feel(el, mood) {
  if (!el) return;
  setMood(el, mood, MOODS[mood]?.look ? undefined : parseLook(el.dataset.look));
}

mountPeople();

// people only blink while on screen — keeps idle pages cheap
const awakeIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.target.classList.toggle('is-awake', e.isIntersecting));
});
$$('[data-person]').forEach((el) => awakeIO.observe(el));

/* ---------------- nav: solid capsule + current chapter ---------------- */
const nav = $('[data-nav]');
const chapterLabel = $('[data-chapter-label]');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const chapterIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) chapterLabel.textContent = e.target.dataset.chapter; });
}, { rootMargin: '-45% 0px -54% 0px' });
$$('[data-chapter]').forEach((s) => chapterIO.observe(s));

/* ---------------- mobile menu ---------------- */
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

/* ---------------- hero: the crowd looks at you ---------------- */
const crowd = $$('.crowd__p');
if (matchMedia('(pointer: fine)').matches) {
  let raf = 0; let px = 0; let py = 0;
  const look = () => {
    raf = 0;
    if (scrollY > innerHeight * 1.2) return;
    crowd.forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.42);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      setLook(el, (dx / d) * k, (dy / d) * k);
    });
  };
  addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY;
    if (!raf) raf = requestAnimationFrame(look);
  }, { passive: true });
}

/* ---------------- act 2: chats (static end-state; motion scrubs it) ---------------- */
function showChat(scene, n) {
  const items = $$('.chat > li', scene);
  const shown = items.slice(0, n);
  items.forEach((li, i) => li.classList.toggle('is-shown', i < n));
  const last = [...shown].reverse().find((li) => li.dataset.mood);
  const who = $('.scene__who', scene);
  const mood = last ? last.dataset.mood : who.dataset.mood;
  if (who.dataset.current !== mood) { who.dataset.current = mood; feel(who, mood); }
  scene.classList.toggle('is-thinking', shown.some((li) => 'thought' in li.dataset));
}
$$('[data-scene]').forEach((scene) => showChat(scene, $$('.chat > li', scene).length));

/* ---------------- act 3: the know-yourself lab ---------------- */
const lab = { relate: {}, values: [], life: null };
const specimen = $('[data-specimen]');
const noteEl = $('[data-note]');
const noteCount = $('[data-note-count]');
const LIFE = {
  weekends: ['quiet weekends at home', 'mostly quiet weekends', 'a mix of quiet and social weekends', 'mostly social weekends', 'weekends out with friends'],
  home: ['a home close to family', 'staying fairly near family', 'somewhere between family and freedom', 'some distance from home', 'wherever life takes you'],
  rhythm: ['a steady routine', 'mostly routine', 'a bit of both, routine and surprise', 'mostly spontaneous days', 'spontaneous plans'],
};
const VALUE_INK = { family: '#0E6E66', kindness: '#FFB21C', ambition: '#E65A36', faith: '#4B32C3', humour: '#FFD06B', independence: '#7FB7D9', tradition: '#B5532F', curiosity: '#8FD0C4', calm: '#D8D0FF' };

function list(arr) {
  return arr.length < 2 ? arr.join('') : `${arr.slice(0, -1).join(', ')} and ${arr.at(-1)}`;
}
function writeNote() {
  const s = [];
  const r = lab.relate;
  if (r.close) s.push(`You get close ${r.close}.`);
  if (r.hard) s.push(`Before a difficult conversation, you ${r.hard}.`);
  if (r.reach) s.push(`When things get hard, you reach for ${r.reach}.`);
  if (lab.values.length) s.push(`You won’t compromise on ${list(lab.values)}.`);
  if (lab.life) s.push(`You picture ${LIFE.weekends[lab.life.weekends]}, ${LIFE.home[lab.life.home]}, and ${LIFE.rhythm[lab.life.rhythm]}.`);
  noteEl.textContent = s.length ? s.join(' ') : 'Run an experiment and your field note writes itself here.';
  const done = [Object.keys(r).length > 0, lab.values.length > 0, !!lab.life].filter(Boolean).length;
  noteCount.textContent = `${done} / 3`;
}

// tabs (roving tabindex, arrow keys)
const tabs = $$('.tab');
function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
  });
  if (focus) tab.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
    if (e.key === 'End') { e.preventDefault(); selectTab(tabs.at(-1), true); }
    if (k) { e.preventDefault(); selectTab(tabs[(i + k + tabs.length) % tabs.length], true); }
  });
});

$('[data-exp="relate"]').addEventListener('change', (e) => {
  const input = e.target;
  lab.relate[input.name] = input.value;
  feel(specimen, input.dataset.mood);
  writeNote();
});

const valueInputs = $$('[data-values] input');
const valueHint = $('[data-value-hint]');
const layers = $$('.flask__layer');
$('[data-values]').addEventListener('change', () => {
  lab.values = valueInputs.filter((i) => i.checked).map((i) => i.value);
  const full = lab.values.length >= 3;
  valueInputs.forEach((i) => { i.disabled = full && !i.checked; });
  layers.forEach((layer, i) => {
    const v = lab.values[i];
    layer.classList.toggle('is-on', !!v);
    if (v) layer.style.fill = VALUE_INK[v];
  });
  valueHint.textContent = full ? '3 of 3 chosen. Untick one to swap.' : `${lab.values.length} of 3 chosen`;
  feel(specimen, full ? 'joy' : lab.values.length ? 'happy' : 'curious');
  writeNote();
});

const VALUETEXT = ['strongly the first', 'leaning to the first', 'somewhere in between', 'leaning to the second', 'strongly the second'];
$$('[data-life]').forEach((input) => {
  input.addEventListener('input', () => {
    const v = Object.fromEntries($$('[data-life]').map((i) => [i.dataset.life, Number(i.value)]));
    lab.life = v;
    input.setAttribute('aria-valuetext', VALUETEXT[input.value]);
    const lean = (Number(input.value) - 2) / 2;
    setMood(specimen, Math.abs(lean) > 0.6 ? 'hopeful' : 'thoughtful', [lean, -0.4]);
    writeNote();
  });
});

/* ---------------- act 4b: the difference switch ---------------- */
const board = $('[data-diff]');
const sw = $('[data-diff-switch]');
const diffFace = $('.diff__face');
function setDiff(on) {
  sw.setAttribute('aria-checked', String(on));
  board.dataset.state = on ? 'ours' : 'usual';
  feel(diffFace, on ? 'calm' : 'overwhelmed');
}
sw.addEventListener('click', () => setDiff(sw.getAttribute('aria-checked') !== 'true'));
$('#sw-usual').addEventListener('click', () => setDiff(false));
$('#sw-ours').addEventListener('click', () => setDiff(true));

/* ---------------- act 5b: characters react to the card you're reading ---------------- */
$$('.fit__card').forEach((card) => {
  const who = $('.fit__who', card);
  const rest = who.dataset.mood;
  const react = card.classList.contains('fit__card--yes') ? 'joy' : 'thoughtful';
  card.addEventListener('pointerenter', () => feel(who, react));
  card.addEventListener('pointerleave', () => feel(who, rest));
});

/* ---------------- act 6: the glance (static end-state) ---------------- */
const noteA = $('[data-note-who="a"]');
const noteB = $('[data-note-who="b"]');
function glance(meet) {
  setMood(noteA, meet ? 'smitten' : 'thoughtful', meet ? [1, 0.1] : undefined);
  setMood(noteB, meet ? 'smitten' : 'thoughtful', meet ? [1, 0.1] : undefined);
}
glance(true);

/* ---------------- act 7: the mark forms around the CTA ---------------- */
const cta = $('.cta-merge');
new IntersectionObserver(([e], io) => {
  if (!e.isIntersecting) return;
  cta.classList.add('is-near');
  if (matchMedia('(hover: none)').matches) setTimeout(() => cta.classList.add('is-merged'), 900);
  io.disconnect();
}, { threshold: 0.6 }).observe(cta);

/* ---------------- stamps: thump in when seen ---------------- */
const stampables = [...$$('.slip'), $('.panel__art--3')?.closest('.panel'), ...$$('.panel')].filter(Boolean);
const stampIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); stampIO.unobserve(e.target); } });
}, { threshold: 0.45 });
stampables.forEach((el) => { el.classList.add('is-stampable'); stampIO.observe(el); });

/* =====================================================================
   Scroll choreography — GSAP, only when motion is welcome.
   Without GSAP or with reduced motion, everything above is the page.
   ===================================================================== */
function initMotion() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  // QA switch: ?nomotion previews the reduced-motion / no-GSAP page
  if (new URLSearchParams(location.search).has('nomotion')) return;
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' }, (ctx) => {
    const { motion, desktop } = ctx.conditions;
    if (!motion) return undefined;
    root.classList.add('motion');

    /* Act 1 → the crowd disperses; two people remain */
    const tara = $('.crowd__p[data-role="tara"]');
    const kabir = $('.crowd__p[data-role="kabir"]');
    const hero = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.7,
        onUpdate: (self) => {
          const late = self.progress > 0.55;
          if (tara.dataset.phase !== String(late)) {
            tara.dataset.phase = String(late);
            setMood(tara, late ? 'curious' : 'happy', late ? [1, 0.2] : undefined);
            setMood(kabir, late ? 'curious' : 'happy', late ? [-1, 0.2] : undefined);
          }
        },
      },
    });
    crowd.forEach((el) => {
      if (el.dataset.role) return;
      const x = parseFloat(el.style.getPropertyValue('--x'));
      const dir = x < 50 ? -1 : 1;
      const k = { back: 0.8, mid: 1.3, front: 1.9 }[el.dataset.layer];
      hero.to(el, {
        xPercent: dir * 140 * k, yPercent: el.dataset.layer === 'front' ? 50 : el.dataset.layer === 'back' ? -30 : 15,
        rotation: dir * 10, opacity: 0, duration: 0.8, ease: 'power2.in',
      }, 0.08 + Math.abs(50 - x) / 500);
    });
    hero.to('.hero__copy', { yPercent: -14, opacity: 0, duration: 0.45, ease: 'power1.in' }, 0.05)
      .to('.hero__sky', { opacity: 0, duration: 0.7 }, 0.2)
      .to('.hero__scrim', { opacity: 0, duration: 0.5 }, 0.45)
      .to(tara, { left: desktop ? '13%' : '22%', top: desktop ? '58%' : '70%', scale: 0.85, duration: 0.8, ease: 'power2.inOut' }, 0.2)
      .to(kabir, { left: desktop ? '87%' : '78%', top: desktop ? '58%' : '70%', scale: 0.85, duration: 0.8, ease: 'power2.inOut' }, 0.2)
      .fromTo('.hero__why', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 0.75)
      .from('.sticker', { scale: 0, duration: 0.3, stagger: 0.08, ease: 'back.out(2.2)' }, 0.95)
      .to({}, { duration: 0.35 });

    /* Act 2 → chats type themselves as you read */
    $$('[data-scene]').forEach((scene) => {
      const total = $$('.chat > li', scene).length;
      showChat(scene, 0);
      ScrollTrigger.create({
        trigger: $('.phone', scene), start: 'top 78%', end: 'bottom 52%',
        onUpdate: (self) => showChat(scene, Math.round(self.progress * total)),
        onRefresh: (self) => showChat(scene, Math.round(self.progress * total)),
      });
    });

    /* Act 2b → two circles close in; the sweet spot appears */
    const v = (k) => $(`[data-venn="${k}"]`);
    const meet = matchMedia('(max-width: 640px)').matches ? [42.5, 57.5] : [44.2, 55.8]; // mirrors .venn__who in CSS
    const venn = gsap.timeline({
      scrollTrigger: {
        trigger: '.middle', start: 'top top', end: 'bottom bottom', scrub: 0.7,
        onUpdate: (self) => {
          const met = self.progress > 0.62;
          const a = v('ta');
          if (a.dataset.phase !== String(met)) {
            a.dataset.phase = String(met);
            setMood(a, met ? 'smitten' : 'tired', met ? [1, 0] : [-0.6, 0.4]);
            setMood(v('tb'), met ? 'happy' : 'overwhelmed', met ? [1, 0] : [-0.6, 0.4]);
          }
        },
      },
    });
    venn.fromTo([v('a'), v('clip'), v('oa')], { attr: { cx: 220 } }, { attr: { cx: 360 }, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo([v('b'), v('lens'), v('ob')], { attr: { cx: 780 } }, { attr: { cx: 640 }, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('wa'), { x: -140 }, { x: 0, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('wb'), { x: 140 }, { x: 0, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('la'), { left: '22%' }, { left: '36%', duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('lb'), { left: '78%' }, { left: '64%', duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('ta'), { left: '22%' }, { left: `${meet[0]}%`, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(v('tb'), { left: '78%' }, { left: `${meet[1]}%`, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo('.middle__post', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.85)
      .to({}, { duration: 0.25 });

    /* Act 4 → the comic strip runs sideways on desktop */
    if (desktop) {
      const track = $('.how__track');
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.how__pin', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    }

    /* Act 6 → their eyes meet */
    glance(false);
    ScrollTrigger.create({
      trigger: '.note', start: 'top 55%', end: 'bottom top',
      onEnter: () => glance(true), onLeaveBack: () => glance(false),
    });

    /* Quiet entrances for chapter heads and cards */
    $$('.chapter-head, .diff__head, .begin__title').forEach((el) => {
      gsap.from(el.children, { y: 34, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } });
    });
    [['.slip', '.slips'], ['.fit__card', '.fit__grid']].forEach(([items, trigger]) => {
      gsap.from(items, { y: 40, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger, start: 'top 85%', once: true } });
    });

    return () => {
      root.classList.remove('motion');
      $$('[data-scene]').forEach((scene) => showChat(scene, $$('.chat > li', scene).length));
      glance(true);
    };
  });

  // fonts change line lengths → re-measure pinned distances once they land
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

initMotion();
