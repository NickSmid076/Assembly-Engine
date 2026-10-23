# Service animations · report (Step 1)

The five moments in the homepage services explorer are rebuilt. Plan and storyboards are in
`docs/service-animations-plan.md`. Key frames (NL, production build, t ≈ 0.6 / 3 / 5.5 / 8 / 11 s) are in
`docs/service-animations/`.

## Per service

Scores use the ae-anti-vibe axes (0–3): purpose, hierarchy, composition, illustration, type, motion, honesty.
The ship bar is ≥ 2 everywhere, with composition and motion at 3.

| # | Service | Length | Rounds | Scores | 2D / 3D and why |
|---|---|---|---|---|---|
| 1 | Brand & Digital Presence | 9 s | 3 | all 3 | 2D. A brand guide is flat by nature; depth would add nothing. The story is pieces travelling from guide to page. |
| 2 | Customer Acquisition | 11 s | 3 | all 3 | 2D. A pipeline is a flat board; the drag across columns is the story. |
| 3 | Operational Automation | 10 s | 2 | composition 3, motion 3, rest ≥ 2 (the dossier stays mid-size) | Isometric SVG (fake 3D). "Filed into the right divider" needs a box with depth; no runtime cost. |
| 4 | Invoice & Payment | 12 s | 2 | composition 3, motion 3, rest ≥ 2 | 2D. Time passing is a line, and one document changes in place. |
| 5 | Business Reporting | 10 s | 3 | all 3 (composition 3 after the tilt fix) | CSS 3D on desktop, flat strips on a narrow stage. "Many layers become one board" reads best as a stack collapsing. |

Taste check, all five: one family (same paper, card, mono labels, rail), yet distinct shapes and rhythms
(springs / glide with a pause / staccato drops / a marker on a timeline / a stack collapsing).
`docs/service-animations/end-frames-*.png` shows all five end frames side by side.

## Three.js: not used

Three.js weighs about 190 KB gzip (measured from the hero's three and r3f chunks), which is above the whole
section's 150 KB budget on its own. The two places where depth helps (Operations, Reporting) work with an
isometric SVG and CSS 3D, using real HTML text that stays sharp and translatable. **Your call** if you still
want a WebGL version of one of them.

## Bundle impact (production build)

- **Home First Load JS:** 175 KB, against 172 KB for v3. The +3 KB is the rail and clock shell plus the
  new example data.
- **The five moments:** one lazy chunk of 8.9 KB gzip, fetched when the section is about two screens
  away. It is not in the initial bundle.
- **Old code:** `scenes.tsx` no longer ships on home; it still ships on the service pages.
- **Three.js:** the only three.js chunks are the hero's existing lazy ones.

## QA (390 / 768 / 1440, NL and EN)

- **Reduced motion, dev and production:**
  - overflow 0, cut-off text 0, CLS 0, console errors 0;
  - the clean end frame shows with the rail at its last step and no play button;
  - step buttons still jump.
- **Full motion:** overflow 0, CLS 0, no console or hydration errors. On phone, the checker flagged 2
  cut texts in the Brand page card. That is the card waiting off-stage at frame 1, before it slides in;
  the end frame fits.
- **axe:** 0 violations on /nl and /en, phone and desktop. axe checked the default open service only.
- **Lighthouse mobile (production):**

  | Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
  |---|---|---|---|---|---|---|---|
  | /nl | 95 | 100 | 100 | 100 | 2.7 s | 140 ms | 0 |
  | /en | 96 | 100 | 100 | 100 | 2.6 s | 130 ms | 0 |

- **Small tap targets:** all are existing header and footer links. The service pages show the same counts.
- **Service pages:** smoke check of `/nl/services/operational-automation` and
  `/en/services/brand-digital-presence` is clean. Their animations are untouched; only the `Service` type
  gained a `scenes.home` key.

## Data and WordPress

- **Content:** each moment is data in `lib/i18n/en.ts` and `nl.ts` under `services[n].scenes.home`, with
  steps `{at, label, state}`.
- **Validation:** a zod schema per kind lives in `components/blocks/services/moments/schema.ts`.
- **WordPress:** the ACF draft is `wordpress/acf-json/group_home_service_moment.json`, a flexible content
  field with 5 layouts.

## New copy to review (both locales, all labelled "Example · fictional firm")

- **Fictional firms:** Van Dijk Accountancy, De Vries Installatie, Jansen Logistiek, M. Jansen, and the
  pipeline extras Bakker Advocaten and De Wit Bouw.
- **People:** Sanne de Vries, Pieter de Vries, Anne, Mark.
- **Amounts:** invoice amounts (€ 1,264.45 incl. VAT) and dashboard figures (€ 84,200, 71%, € 126,000)
  are example data for fictional firms, not stats or prices.
- **Wording to check:** "Approve" / "Goedkeuren" on the draft, and the step labels on the rail.
- **Toggl Track:** used as the time-tracking source in Reporting, but not on the site's tools list. Keep
  it, or swap it for a listed tool?

## Decisions made without you

- **Hover:** hover and focus don't pause the story. Your brief says hover reveals detail, and the
  pause/replay button is always visible.
- **Without JavaScript:** visitors see the sized stage and the step labels, not the moment. This is the
  trade-off for keeping the moments out of the initial bundle.
- **Temporary QA scripts:** moved out of the project, not deleted.
