# Homepage v3 · report

18 Oct 2026 · `/nl`, `/en` · plan: `docs/homepage-v3-plan.md` · screenshots: `docs/homepage-v3/before`, `docs/homepage-v3/after`
(1440 = `*__desktop__*`, 390 = `*__phone__*`; `after/nl__desktop__3d-hero.png` is the live 3D state).

## Result

| | Before | After |
|---|---|---|
| Sections | 9 (2 iframes, blog teaser, newsletter) | 7 blocks, no iframes |
| ae-anti-vibe (/24, per section) | 8–22, median 13 | 22–23, all ≥ 19, nothing below 2 |
| Taste critique (overall /10) | 6.3 | 7.8 uncapped · **6.5 capped** (see note) |
| Lighthouse mobile `/nl` (warm, 3–4 runs) | P 82–86 · A 97 · BP 100 · SEO 100 | **P 90–93 · A 100 · BP 100 · SEO 100** |
| Lighthouse mobile `/en` | — | P 91–96 · A 100 · BP 100 · SEO 100 |
| Lighthouse desktop | P 100 | P 100 · A 100 (NL and EN) |
| Simulated mobile LCP | 3.6–3.9 s | 2.6–3.5 s (LCP = H1; real paint ≈ 0.9 s FCP) |
| CLS | 0 | 0 (all sizes, both motion modes) |
| Console / hydration errors on home | 1 per route | 0 (reduced and full motion) |
| axe (wcag2a/aa/21aa/22aa + best practice) | not run | 0 violations, NL/EN × phone/desktop |
| Overflow · cut text | 0 · 0 | 0 · 0 at 390 / 768 / 1440 |
| Without JavaScript | content hidden behind framer `initial` | all 38 reveal elements visible |
| `npm run build` | passes | passes |

Note on the taste cap: the taste skill caps any page with monospace labels or an eyebrow at 6.5. The
brand fixes IBM Plex Mono for labels, and your precedence order puts ae-* above taste, so mono stays
for data labels (hero eyebrow, run log, process track). Without the cap the critique scores
design 7.5 · usability 8.5 · creativity 7.5 · content 7.5.

One cold-start Lighthouse run right after `next start` scored 71; repeated warm runs were 90–96.

## Rubric per section (after)

| Block | Pu | Hi | Co | Il | Ty | Mo | Ho | Ro | /24 | What holds it back |
|---|---|---|---|---|---|---|---|---|---|---|
| `hero_home` | 3 | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 22 | NL H1 is 5 lines on a phone; hero facts await copy proposal #1 |
| `how_it_runs` | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 23 | Run loops (with pause button) |
| `process` | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 23 | No picture; the track is the illustration |
| `services` | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 23 | Video + explorer make a long dark chapter |
| `proof` | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 23 | — |
| `why_us` | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 22 | Two items await proposals #3/#4 |
| `closing_cta` | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 23 | — |

## What changed on the page

1. **Hero:** the 3D assembly engine replaces the demo window. The H1 now fits 2 lines at 1440. Facts are a 3-up row. Buttons are flat (no glow).
2. **How it works (new):** the example-run demo moved here, with a statement and three points.
3. **Process:** one scroll-linked track with five stops replaces five identical cards. "Live within 4 weeks" is marked on the track.
4. **Services:** the demo video (poster-first, lazy) plus a 5-service explorer with one scene each. This replaces 15 scenes over about 7 screens and the service-morph iframe.
5. **Proof (new):** Energielabel Breda, with real screenshots of the live site and five measured numbers with their source. Links go to the case and the live site.
6. **Why us:** your photo, the About intro and the five commitments as rows.
7. **Closing CTA:** a native port of the hours-band iframe: 06:58 → 07:00, then three tasks land as done.
8. **Removed from home:** the blog teaser (all posts are placeholders) and the newsletter (its success message was fake). Both remain at `/blog` and in the footer.

## Motion

- **Framer Motion:**
  - scroll-linked process track (`useScroll` → `useSpring` → `scaleX`/`scaleY`);
  - scene swap in the services explorer (`AnimatePresence`);
  - run demo (existing).
- **CSS:**
  - entrances (`data-reveal`, gated by `html.js` + `prefers-reduced-motion`);
  - button press (0.97);
  - closing clock.
- **Reduced motion:** final states everywhere. The track is full, the clock shows 07:00, and the 3D is not loaded.

## Three.js: one place, the hero

- **What it does:**
  - Modules lift and re-seat one by one, then a signal pulse runs module → core every 2.4 s.
  - The pointer tilts the assembly by up to ±3°.
  - Scrolling the hero away lifts the modules apart.
- **How it loads:**
  - Same isometric projection and colours as the server-rendered SVG poster, so the fade-in is seamless (flat shading, no tone mapping).
  - `next/dynamic` with `ssr:false`, after `load` + idle.
  - Only at ≥ 1024px with a fine pointer, motion allowed and WebGL available.
  - Phone, tablet and reduced motion keep the SVG, and the 3D code is never downloaded there (verified in the Lighthouse network log).
  - Frame loop is `never` when off-screen or the tab is hidden; DPR `[1, 2]`.
- **Bundle:** three chunks of 101 + 88 + 52 KB gzip ≈ **241 KB**, not in the initial bundle.
- **Not used for services:** the product scenes carry information, and a 3D transition there would only add spectacle.

## Dependencies

| Package | Version | Use | Initial-bundle impact |
|---|---|---|---|
| `three` | 0.186.1 | hero 3D | none (lazy chunk) |
| `@react-three/fiber` | 9.8.2 | hero 3D | none (lazy chunk) |
| `@react-three/drei` | 10.7.9 | installed as briefed, **not imported**: nothing it offers was needed, and it would push the 3D chunk past 250 KB | none |
| `zod` | 4.6.7 | block schemas in `renderBlocks` (server) | none |
| `@types/three` | 0.186.0 (dev) | types | — |
| `axe-core` | 4.10.2 (QA scripts only) | `ae-visual-qa/scripts/axe.mjs` | — |

Home First Load JS: 172 KB (shared 103 KB).

## Copy changes (before → after)

All copy is in `lib/i18n/{nl,en}.ts`. New strings are marked **new**; please approve or edit them.

| Where | Before | After (NL / EN) |
|---|---|---|
| How it works H2 | — | **new** "Eén trigger. Het hele werk gedaan." / "One trigger. The whole job, done." |
| How it works body + 3 points | — | **new** (see `home.run`); restates existing claims: no migration, a person on key steps, every step logged |
| Process labels | — | **new** "Eerste gesprek · Live binnen 4 weken · Na livegang" / "First call · Live within 4 weeks · After launch" |
| Services H2 | Two long headings: "Begin met een merk en website…" (4 lines) and "Vind het werk waarmee u kunt stoppen. Vijf diensten…" | H2 "Vijf diensten, gebouwd om zelf te draaien." / "Five services, built to run themselves."; the old services heading becomes the body; "Vind het werk waarmee u kunt stoppen" is dropped |
| Proof | — | **new** label "Case · Energielabel Breda", button "Lees de case" / "Read the case", source note, image alt texts; LCP shown as "2,2–3,4 s" with "(was ±6,6 s)" |
| Why us | Who we are: "Uw kantoor draait op expertise…" | About title and intro reused; **new** caption "Oprichter, Assembly Engine" / "Founder, Assembly Engine" |
| Closing CTA | hours-band iframe copy | same copy, native; EN button "Book an automation audit" → "Book a free audit" (matches nav); **new** "Voorbeeld: een werkdag om 07:00" |
| Removed | Who we are paragraphs, blog teaser heading, newsletter | not on home any more (still in `lib/i18n`) |

## Files

- **New:**
  - `components/blocks/` (shared.ts, ui.tsx, render.tsx, plus 7 blocks with `schema.ts`):
    - hero-home: HeroHome, EnginePoster, EngineVisual, EngineCanvas, engine-geometry
    - how-it-runs: HowItRuns, RunEngine (moved from `components/HeroEngine.tsx`)
    - process: Process, Track
    - services: Services, Explorer, DemoVideo
    - proof: Proof
    - why-us: WhyUs
    - closing-cta: ClosingCta, Clock
  - Other new files:
    - `components/RevealObserver.tsx`
    - `lib/content/{source.ts,local.ts}`
    - `public/case/energielabel-breda-{desktop,phone}.jpg` (screenshots of the live site, 17 Oct 2026)
    - `.claude/skills/ae-visual-qa/scripts/axe.mjs`
    - `docs/homepage-v3-plan.md`, this report, `docs/homepage-v3/`
- **Changed:**
  - `app/[locale]/page.tsx` (renderBlocks)
  - `app/[locale]/layout.tsx` (`html.js` flag, RevealObserver)
  - `app/globals.css` (reveal CSS, flat buttons with press, track fill, removed `.hero-glow`)
  - `lib/motion.tsx` (CSS entrances, same API)
  - `lib/content/{types,index}.ts`
  - `lib/i18n/{en,nl}.ts` (new keys)
  - `tsconfig.json` (excludes `archive`, `.next-qa`)
  - `.claude/skills/ae-visual-qa/` (tablet 768, axe), `ae-headless-wp`, `ae-design-system`
- **Shared components changed (other pages re-checked with ae-visual-qa, phone + desktop):**
  - `PageHeader` (CSS instead of framer, static H1)
  - `Header` (language switch accessible name)
  - `components/ui/{scenes,kit}.tsx` (contrast: no more `slate/40–70` text)
  - `.btn-primary` (no glow)
  - Effect on the case, contact and blog pages: hydration errors are gone and they look the same.
- **Archived (not deleted; there is no git history):** `archive/homepage-v2/`, which holds the old Hero, HoursBand, Advantages, DemoVideo, HowWeWork, WhoWeAre, Services and Embed, plus the four `public/embeds` HTML files.

## Needs your decision

1. **New copy:** approve the strings marked **new** above, especially "Eén trigger.", which uses the English word "trigger".
2. **Open proposals** in `docs/copy-suggestions.md`:
   - #1: hero facts
   - #2: the NL hero H1 runs to 5 lines on a phone
   - #3/#4: "Niets standaards", "Wij houden het draaiende"
3. **Blog teaser and newsletter** are off the home page until real articles and a mailing tool exist. Is that OK?
4. **Demo video:** still English UI on the NL page (B5). An NL export would fix it.
5. **About and the service template still have reduced-motion hydration errors** (`About.tsx`, `ServicePage.tsx` branch on `useReducedMotion()`). I didn't touch them because they are page files. The fix is the same pattern as here; say the word.
6. **drei:** remove it from `package.json`, or keep it for later?
7. **Proof screenshots** are of the live site as of 17 Oct 2026; refresh them when that site changes.
