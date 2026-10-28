const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------------- nav ---------------- */
const nav = $('[data-nav]');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
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

/* ---------------- motion ---------------- */
const root = document.documentElement;
const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches
  && !new URLSearchParams(location.search).has('nomotion'); // ?nomotion previews the reduced-motion page

function showThread(duo, n) {
  $$('.thread > li', duo).forEach((li, i) => li.classList.toggle('is-shown', i < n));
}

if (motionOK) {
  root.classList.add('motion');

  // reveals, staggered within each parent
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = $$(':scope > [data-reveal]', e.target.parentElement);
      e.target.style.setProperty('--d', `${Math.max(0, sibs.indexOf(e.target)) * 0.08}s`);
      e.target.classList.add('is-in');
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  $$('[data-reveal]').forEach((el) => revealIO.observe(el));

  // the verification toggle switches itself on when seen
  $$('[data-auto-toggle]').forEach((t) => {
    t.classList.remove('is-on');
    new IntersectionObserver(([e], io) => {
      if (e.isIntersecting) { setTimeout(() => t.classList.add('is-on'), 500); io.disconnect(); }
    }, { threshold: 0.6 }).observe(t);
  });
}

function initScroll() {
  const { gsap, ScrollTrigger } = window;
  if (!motionOK || !gsap || !ScrollTrigger) {
    $$('[data-duo]').forEach((duo) => showThread(duo, Infinity));
    $$('[data-row]').forEach((r) => r.classList.add('is-struck'));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // hero: the art drifts, the words lift away
  gsap.to('[data-hero-img]', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('[data-hero-content]', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true } });

  // parallax for floating faces, components and editorial frames
  $$('[data-speed]').forEach((el) => {
    const speed = Number(el.dataset.speed);
    gsap.fromTo(el, { y: speed * -90 }, { y: speed * 90, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // the two chats play out as you read
  $$('[data-duo]').forEach((duo) => {
    const total = $$('.thread > li', duo).length;
    showThread(duo, 1);
    ScrollTrigger.create({
      trigger: $('.phone', duo), start: 'top 80%', end: 'bottom 55%',
      onUpdate: (self) => showThread(duo, Math.max(1, Math.round(self.progress * total))),
      onRefresh: (self) => showThread(duo, Math.max(1, Math.round(self.progress * total))),
    });
  });

  // the old way gets crossed out, row by row
  $$('[data-row]').forEach((row) => {
    ScrollTrigger.create({ trigger: row, start: 'top 72%', onEnter: () => row.classList.add('is-struck'), onLeaveBack: () => row.classList.remove('is-struck') });
  });

  // the payoff image opens up
  gsap.fromTo('[data-note-art]', { scale: 0.86, borderRadius: 48 }, { scale: 1, borderRadius: 30, ease: 'none', scrollTrigger: { trigger: '[data-note-art]', start: 'top 95%', end: 'center 55%', scrub: true } });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'complete') initScroll();
else addEventListener('load', initScroll, { once: true });
