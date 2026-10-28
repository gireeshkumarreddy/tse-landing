# TSE landing page — v2 (reference-led)

A second, more serious direction built directly from the supplied references. v1 ("The Considered Middle", illustrated and playful) is untouched at the repo root and tagged `v1-considered-middle`.

**Run:** `python tools/dev-server.py` from the repo root, then open http://127.0.0.1:4173/v2/ (v1 stays at http://127.0.0.1:4173/). Add `?nomotion` to preview the reduced-motion page.

## How each reference is used

| Reference | Where it shows up in v2 |
|---|---|
| 1 · Feels | Hero composition (full-bleed art, centred heavy headline, white pill CTA, parenthetical line, fade to black); the "Why TSE? Because / Swiping isn't searching." chapter with floating faces and a hand-drawn underline; the closing chapter. |
| 2 · Tappa | Two phones with the demo's real chats, surrounded by floating UI components (pills, violet message cards, file card); the editorial pair "The considered middle is the sweet spot"; the component-style lab cards and the Ground rules bento (toggles, voice-call waveform, chips). |
| 3–10 · Illustrations | Your images are the artwork throughout: hero (6), floating faces (3, 4, 5, 9, 10), editorial pair (10, 7), lab portrait (5), introduction mocks (3, 10), Who it's for (4), founder's note (8). |
| 12 · Plenty of Fish | Editorial serif headings, the staggered How it works row, handwritten doodles ("one person. at a time.", "date with intention."). |

Copy is still drawn only from the demo site, and the same open questions apply (see `docs/creative-brief.md`).

## Before this goes public

- **Image rights.** The illustrations are third-party artwork. Images 7 (`sunset-glance`) and 8 (`cheek-on-hand`) carry artists' signatures, which are left intact and uncropped. All of them need licensing, or replacing with commissioned work, before launch. The footer says so in the meantime.
- **Resolution.** The originals are ~736 px wide. The hero (`red-saree-couple`) is upscaled about 2× full-bleed and softened with shade and grain. Ask for higher-resolution masters or a commissioned hero at ≥2400 px.
- **Mock UIs** in How it works and Ground rules are illustrative (`aria-hidden`), not product screenshots. Swap them for real app screens when they exist.

## Files

`index.html` · `css/tokens.css` · `css/site.css` · `js/main.js` · `assets/img/*.webp` (converted from the supplied files) · `assets/favicon.svg`
