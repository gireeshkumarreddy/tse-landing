# TSE landing page — creative brief, research & delivery notes

**Working brand:** TSE (as shown on the demo site; its expansion is unknown — see *Needs your confirmation*).
**Product (from the demo site):** date-to-marry matchmaking for India, based on psychological compatibility and lifestyle alignment; one introduction at a time; human judgement in every introduction; no-texting policy; every member ID verified.

Run locally: `python tools/dev-server.py` → http://127.0.0.1:4173 (no build step). `?nomotion` previews the reduced-motion page. `cast.html` is the character & expression sheet.

---

## Phase 1 — Reference analysis

| Reference | What I took | What I deliberately did not take |
|---|---|---|
| **1 · Feels hero** (primary) | Full-bleed crowd framing the viewer, centred heavy geometric headline over the faces, one white pill CTA + parenthetical line, logo-left / pills-right nav, hero fading to black into a "Why X? Because" manifesto line with floating stickers, hand-drawn underline on one word. | Feels' photo (it is their licensed asset, captured from their live site) and their "no rules, no labels" messaging, which contradicts a date-to-marry product. The crowd is re-drawn in our own illustration system in the same composition. |
| **2 · Tappa** | Components presented as labelled, floating modules around a device; dark canvas; phone UIs as storytelling props. | Its violet-on-black palette (see research: purple is crowded in India). |
| **3–10 · Illustrations** | Expressive almond eyes, strong brows, eyeliner wings, jhumkas, bindis, jasmine in hair, cheek-on-hand glances (ref 10), comic-panel storytelling and riso print colour (ref 9), golden-hour warmth (ref 7). | Painterly rendering — not reproducible as a consistent, animatable system in code. Translated into flat ink-and-riso instead. |
| **11** | — | **Came through blank** (a plain white 1.5 KB PNG). If this was the "laboratory components" reference, I could not see it; the lab language was built from the brief's description plus Tappa's labelled-module layout. |
| **12 · Plenty of Fish** | Proof that hand-drawn line art can carry a dating brand. | Pink palette, smiling-headshot grid. |
| **Demo site** | All product facts, H1, process, comparison table, who-it's-for lists, eligibility, closing line, founder note, footer routes. | Its visual design (Playfair/Geist, car-couple photo). |

> Note on numbering: your brief calls the illustration set "the second image" and the lab reference "the third", but the attachments arrived as Feels, Tappa, then the illustrations. I mapped by description, not by position.

## Phase 2 — Indian market research (summary)

Researched Tinder, Bumble, Hinge, Aisle (+ Arike/Anbe/Neetho/Jalebi), happn, QuackQuack (+ Rebounce), TrulyMadly, Knot.dating, The League. Tinder, Bumble and Hinge blocked rendering, so their visuals are inferred from page source; Reddit and app-store reviews were not accessible.

**Documented patterns**
- Anti-casual intent language is now the category norm: Hinge "Go on your last first date", Aisle "Nothing casual about this dating app / slow > speed", Knot "Tired of dating? Now tie the Knot", TrulyMadly "Find your Forever".
- "No fake profiles" is asserted (QuackQuack, TrulyMadly, Knot) but rarely explained.
- Palettes cluster on **pink-red** (Tinder, TrulyMadly) and **purple** (QuackQuack, Knot); neutral-with-one-accent for Aisle and happn. Couple photography and scale numbers ("43M users", "55B matches") are common proof devices.
- "India's first…" is already claimed by Knot.dating ("India's First AI Matchmaker") and QuackQuack's Rebounce ("India's first serious matchmaking and matrimony platform").

**Documented user frustrations** (sources)
- 78% of women encountered fake profiles; two in three users never meet matches in person; 70% call endless swiping futile; 62% feel pressure to be witty — Juleo/YouGov 2024 ([SheThePeople](https://www.shethepeople.tv/news/fake-profiles-matchmaking-apps-survey-matrimony-app-scams-6950352), [Indian Television](https://indiantelevision.com/mam/juleo-yougov-report-two-in-three-users-never-meet-matches-in-person-240904/)).
- 74% want their profile visible only to people they choose; 82% of women want government-ID verification (same Juleo/YouGov report).
- 57% of women use deliberate protective tactics (QuackQuack company survey, Jan 2026, [GDI](https://www.globaldatinginsights.com/featured/quackquack-57-of-indian-women-use-protective-dating-strategies/)).
- 94% rank safety first when choosing an app (Bumble survey, June 2026, [Indian Television](https://indiantelevision.com/?p=230972)).

**Opportunities (my hypotheses, not findings)**
1. Everyone says "serious"; almost nobody *shows the person* behind it. Character-led storytelling is open territory.
2. Everyone asserts trust; few explain the mechanism. TSE's format *is* the mechanism (one-at-a-time, two yeses, call-first) — show it as rules, not badges.
3. The family-pressure side of Indian dating is rarely acknowledged on landing pages; the demo's own family-group-chat content is a genuinely distinctive asset.
4. A non-pink, non-purple palette stands out on a crowded home screen.

## Phase 3 — Creative direction

**Three territories considered**
1. **"The Chemistry Lab"** — the whole page as an experiment. Interactive, but risks implying love can be calculated, and reads cold.
2. **"One at a time"** — crowd-to-one visual device. Very clear anti-swipe message, but a device, not a world.
3. **"The Considered Middle"** ✅ — straight from the product truth: directionless dating on one side, marriage-on-a-schedule on the other; TSE lives in the overlap. It gives the brand a symbol, a story and a cast.

**Chosen:** *The Considered Middle*, with territory 2 as the hero transition and territory 1 as the component language for one chapter (self-understanding, not prediction).

- **Positioning:** date-to-marry matchmaking for people who want a life partner without the drift of swiping or the deadline of family pressure.
- **Emotional promise:** *Understood first. Introduced second.*
- **Signature idea:** the **sweet spot** — two circles, one marigold overlap. It is the logo, the Venn reveal in chapter 03, and the final CTA (two circles close in and the button itself becomes the overlap). Competitors use flames, bees, letters and hearts; nobody owns the overlap.
- **Palette:** ink `#121014`, paper `#F5EEE2`, peacock `#0E6E66` (trust), marigold `#FFB21C` (the sweet spot), chilli `#E65A36` (noise). Jamun violet `#4B32C3` is used only as the riso print offset in illustrations.
- **Type:** Bricolage Grotesque (heavy display, echoing ref 1's headline), Instrument Serif italic (the human aside), JetBrains Mono (lab labels), Caveat (thoughts and annotations).
- **Illustration system ("ink & riso"):** one bust template, 20-person cast across a considered range of skin tones, hair, faith markers (hijab, turban), age (Kabir's family) and dress (kurta, saree, shirt, jacket); 16 moods driven by brows/eyes/mouth/blush/sweat/gaze. Flat fills, single ink weight, halftone shade, violet print offset. Every scene on the page is drawn from `js/cast.js`.
- **Motion principles:** motion only where it carries meaning (a crowd leaving, a chat going cold, two circles meeting, eyes meeting). Scrubbed to scroll so the reader controls pace. Nothing hides content: every chapter is fully readable with motion off.
- **Trust strategy:** state only what the demo states, phrase it as house rules with rubber stamps, and link the real Privacy Policy and Terms. No testimonials, numbers, badges or certifications were invented.

## Phase 4 — Storyboard

| # | Chapter | Purpose | Key interaction | Content source |
|---|---|---|---|---|
| 01 | **Hero** — "the opposite of a swipe app." | Instant difference (ref 1 composition) | Crowd's eyes follow your cursor; marigold underline draws in | Demo H1 + subline |
| 01b | **Why TSE? Because** you need one right person, *not a crowd.* | Turn the crowd into the thesis | Scroll scrubs the crowd away; Tara and Kabir remain; expression stickers pop in | Rewrite of demo's "one right person" / "not more crowd" |
| 02 | **The noise** | Relatable truth, both sides of it | Two chats type themselves as you scroll; Tara goes hopeful → nervous → deflated, Kabir curious → overwhelmed → tired; thought bubbles land last | Demo's two chat threads, verbatim |
| 03 | **The considered middle** | Reveal the brand symbol | Pinned Venn: circles close in, the overlap turns marigold, Tara and Kabir meet in it | Demo "considered middle" copy |
| 04 | **The know-yourself lab** | Make "psychological compatibility" tangible and human | Three experiments (relate / value / life) that make a specimen character react, fill a flask and write a field note | Demo's "how you relate" copy; **sample prompts are illustrative** |
| 05 | **How it works** | The process as a comic strip | Pinned horizontal strip on desktop; stamps thump in on "both said yes" | Demo's 4 steps, verbatim |
| 05b | **The difference** | Before/after, felt not read | One switch flips all five rows and Kabir's face from overwhelmed to calm | Demo comparison table, verbatim |
| 06 | **Ground rules** | Trust and emotional safety | Rule slips stamped as they enter | Demo facts only |
| 07 | **Who it's for** | Honest qualification | Characters react to the card you're reading; current eligibility stated plainly | Demo lists + eligibility |
| 08 | **A note** | Emotional payoff | Tara and Kabir, cheek on hand (ref 10), look up and their eyes meet | Demo founder note |
| 09 | **Begin** | Natural conclusion | Two circles close around the CTA; the button becomes the sweet spot | Demo closing line + CTA |

## Phase 5 — Implementation

- Static HTML + CSS + ES modules, GSAP 3.12.5 + ScrollTrigger from cdnjs. No framework, no build, one dependency. All copy is real HTML (crawlable); illustrations hydrate from `js/cast.js`.
- `css/tokens.css` (design tokens) · `css/base.css` (reset, type, buttons, nav, character expression engine) · `css/sections.css` (one block per chapter) · `js/cast.js` (illustration system) · `js/main.js` (interactions + scroll choreography) · `tools/dev-server.py` (no-cache local server).
- Progressive enhancement: without GSAP, or with `prefers-reduced-motion: reduce`, the page renders as a static, fully legible story (chats complete, Venn closed, glance met).
- Why not Next.js: the scratch folder's path is ~180 characters, which puts a `node_modules` tree past Windows' path limit. It is also unnecessary for a single static page. `cast.js` ports directly into React components if the product app is Next.

## Phase 6 — QA performed

- Rendered and inspected in the in-app Chromium browser at **1440×900, 768×1024 and 375×812**, scrolling every chapter and checking the scrubbed states mid-way and at the end.
- Interactions exercised: lab radios, value limit (3, with disabling), flask layers, sliders, tabs, comparison switch, CTA hover merge, mobile menu, keyboard tab order and focus rings.
- Automated checks on the static path: no console errors, no empty or `#` links, no unnamed buttons, no duplicate IDs, every in-page anchor resolves, one H1 with a clean H2/H3 outline, no horizontal overflow at 375px or 768px.
- Fixed during QA: underline draw bug, sticker-edged crowd busts, protagonists lost in the scrim, stamps covering faces, a CTA whose circles read as mouse ears, mobile nav CTA wrapping, overlapping Venn labels on mobile, low-contrast focus rings on paper, blink animations running off-screen.

**Not tested:** Safari and Firefox, physical phones, the OS-level reduced-motion toggle (verified through the identical `?nomotion` code path instead), screen readers, Lighthouse scores.

## Needs your confirmation

1. **"India's first date-to-marry matchmaking"** — kept out of the page. Knot.dating and QuackQuack Rebounce already make "India's first" claims; a superlative needs substantiation before it ships.
2. **Brand name** — "TSE" is used exactly as on the demo. What does it stand for, and is a wordmark coming?
3. **Founder name** for the note's signature (currently "— The founder, TSE").
4. **Production URLs** — every CTA links to the demo's live routes (`/sign-up`, `/sign-in`, `/guides`, `/about`, `/contact`, `/help`, `/terms`, `/privacy`, `/legal`). Swap the base URL when production exists. The demo's Instagram link (`#`), "Suggestion box" (no target) and Admin login were left off.
5. **Lab sample content** — the prompts, values and sliders are illustrative and labelled as such on the page. Replace or approve them against the real questionnaire.
6. **One softened line** — "addicted to having multiple options" → "like having multiple options".
7. **Privacy specifics** — what ID verification checks, what is stored or deleted, and who can see a profile. The one-at-a-time format suggests profiles are never publicly browsable. If true, that is headline-worthy: 74% of users want exactly that. I have not claimed it.
8. **Inclusivity vs eligibility** — the brief asks for broad inclusivity; the demo serves 26–34, heterosexual cis, never married. The page states the current scope honestly and keeps the "we hope to open this up" line.
9. **Characters** — Tara and Kabir are fictional story characters.
10. **SEO** — a canonical URL and a 1200×630 OG image need the production domain and final art.

## Known limitations

- Illustrations are hand-built SVG. They are consistent and animatable but simpler than refs 5–10; a commissioned illustrator working inside this system (same template, palette, line) would lift hands, hair texture and scenes.
- No real photography: the ref-1 hero is illustrated by design. If photography is wanted later, shoot the same composition (low angle, crowd framing the lens, warm backlight) and drop it into `.hero__sky`.
- GSAP and fonts load from public CDNs; self-host both for production.
