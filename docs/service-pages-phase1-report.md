# Service pages · phase 1 report

Date: 18 Oct 2026 · Plan: `docs/service-pages-plan.md` · **Status: waiting for your review. Phase 2 has not started.**

## In one paragraph

All five service pages now run on one block template. It works like the homepage: zod schemas, a content
layer (`getServicePage`), an ACF draft, and server rendering except for the interactive parts. The approved
cuts are done, and the old second animation system is archived. Reporting has its signature component:
a dashboard where every figure can be traced to its source. On desktop it shows as a 3D isometric object
(three.js, lazy), with an SVG fallback, and phones get an interactive 2D version. The other four pages use
an interim "how it works" block until their signatures are built. Every page passes the budgets:
- First Load 177 KB;
- Lighthouse mobile 92–94 (performance), 96–100 (accessibility);
- CLS ≤ 0.016;
- axe clean.

The homepage is unchanged apart from one accessibility fix.

## What changed

**Page sequence (all five pages)**

| # | Block | Tone | Content |
|---|---|---|---|
| 1 | `service_hero` | white | Service glyph + name, two-tone H1 (existing copy), sub, `.btn-primary` + "Zo werkt het". Right: the service's homepage moment on a paper stage. |
| 2 | `service_signature` (Reporting) / `service_steps` (other four) | ink | howTitle; steps as points (Reporting) or as a numbered 3-column ledger (interim). |
| 3 | `proof` (Brand only) | white | The homepage Energielabel Breda block, unchanged. |
| 4 | `process` | paper | The homepage's 5 steps with "Live binnen 4 weken". |
| 5 | `service_capabilities` | white | gridTitle + grid as a two-column hairline ledger (replaces the marquee). |
| 6 | `service_principles` | paper | Three numbered statements under a 2px rule (replaces the icon cards). |
| 7 | `service_faq` | white | Native `<details>`, existing Q&A. |
| 8 | `service_others` | paper | The four other services, each with its engine glyph. |
| 9 | `closing_cta` | ink | The homepage closing block (07:00 clock) with `servicePage.ctaTitle` / `ctaSub`. |

**Cut, as approved:**
- floating hero cards and the dotted hero background;
- the global tools grid;
- the capability marquee;
- the stat block (it showed padded figures: "0", "100%", "4 wk");
- the watch scene;
- `CtaBand` on service pages (it stays on About, the blog and the case page).

**Archived** to `archive/service-pages-v1/`:
- `components/ServicePage.tsx`;
- `components/ui/scenes.tsx`, `components/ui/kit.tsx`, `lib/useTimeline.ts`;
- the old route file;
- full copies of `lib/i18n/{nl,en}.ts` from before the cleanup.

**Removed from the dictionaries** (copies are in the archive):
- per service: `usps`, `stat`, `watchTitle`, and `scenes.hero/steps/watch`;
- `tools`;
- `servicePage.worksWith/watchLabel/stepLabel`.

**Debt fixed:**
- no blur;
- no infinite floats or marquee;
- no per-frame `setState` (the stepper is gone);
- nothing auto-advances without a pause (the hero moment has its rail with pause/replay);
- one primary button style;
- the 2.2:1 inactive-step contrast and the unreachable scroll region are gone;
- all UI text is ≥ 13px;
- the page is a server component.

**New files**

| Area | Files |
|---|---|
| Blocks | `components/blocks/service-{hero,signature,steps,capabilities,principles,faq,others}/` (schema + component each) |
| Signature | `service-signature/Signature.tsx` (per-kind lazy chunk), `reporting/{geometry.ts, Poster.tsx, Scene.tsx, Reporting.tsx}` |
| Content | `lib/content/local.ts` (`getServicePage`, `getServiceSlugs`), `types.ts` (`ServicePage`, union members), `source.ts`, `index.ts` |
| Route | `app/[locale]/services/[slug]/page.tsx`: `renderBlocks` inside `PageThread` |
| Copy | `lib/i18n/{nl,en}.ts` → `signatures.reporting` (labels and fictional example data, NL + EN) |
| WordPress | `wordpress/acf-json/group_service_sections.json` (CPT `service`, 10 layouts; generator `acfgen_service.py` in the scratchpad) |
| CSS | `app/globals.css`: `.sig-draw` (wire draws once; off under reduced motion) |
| Skills | New `.claude/skills/ae-ui-3d/SKILL.md`; updated `ae-headless-wp`, `ae-design-system`, `ae-section-composer` (retired scene kit, new blocks) |
| Docs | `docs/service-pages-plan.md`, `docs/service-content-draft.md`, this report, shots in `docs/service-pages-phase1/{before,after}` |

## Reporting signature: "Waar komt dit cijfer vandaan?"

- **Dashboard (HTML):** "Van Dijk Accountancy · oktober" (Power BI) with four figures as `aria-pressed` buttons:
  - Omzet oktober € 84.200;
  - Declarabel 71%;
  - Pijplijn € 126.000;
  - Omzet per declarabel uur € 98.

  It opens on € 98, which uses two sources. All data is fictional, consistent with the homepage moment, and labelled "Voorbeeld · fictief kantoor".
- **Lineage card** (`aria-live`): one row per source with tool, dataset, records and sync time, plus the calculation ("€ 84.200 ÷ 862 uur = € 98"). It has a reserved height, so the page doesn't move when you switch figures.
- **Desktop (lg+, fine pointer, motion allowed, WebGL):**
  - three source blocks (Exact Online, Toggl Track, HubSpot) wired to a dashboard slab with four tiles;
  - choosing a figure lifts its sources and tile, turns its wires cobalt and sends one signal along each;
  - on first view one signal runs down every wire (the 07:00 sync);
  - clicking a tile in the 3D selects it too;
  - tool names and values are HTML overlays.
- **3D rules:** demand frameloop, real-time clock, DPR ≤ 2, paused off-screen and on hidden tabs, loaded after load + idle when near the viewport.
- **SVG poster:** the same geometry (`geometry.ts`). It is the first paint, the no-WebGL fallback and the reduced-motion version. It reacts to the selection: CSS lift, and wires that draw once.
- **Phone and tablet:** source chips above the dashboard. A connector draws from each lit source to the chosen tile's column. Tap targets ≥ 44px.
- **Reduced motion:** the poster, no signals or drawing, and instant selection.

Shots:
- `after/signature-3d-declarabel.png`
- `after/signature-svg-reduced-en.png`
- `after/signature-phone-declarabel.png`

## QA (production build, `.next-qa`)

**Build:** passes.

| Route | First Load |
|---|---|
| Homepage | 177 KB (unchanged) |
| Service pages | 177 KB (budget 180) |

The signature is split per kind, so the homepage doesn't carry it.

| Bundle | Size (gzip) | Budget |
|---|---|---|
| Reporting island | 4.5 KB (lazy, Reporting page only) | 12 KB |
| 3D scene | 2.1 KB, plus the shared three/r3f chunk (≈ 249 KB, desktop only, cached after a homepage visit) | 25 KB |

**Lighthouse mobile:**

| Route | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| /nl/services/business-reporting-automation (run 1 / run 2) | 93 / 93 | 96 / 96 | 100 | 100 | 0 |
| /nl/services/operational-automation | 92 | 100 | 100 | 100 | 0 |
| /en/services/brand-digital-presence | 93 | 100 | 100 | 100 | 0 |
| /nl (regression) | 94 | 100 | 100 | 100 | 0 |

- Reporting scores 96 on accessibility because Lighthouse catches the hero moment's cards mid-fade (partly transparent). axe passes the same elements in their finished state.
- LCP is 3.1–3.3 s simulated on every route, the homepage included. It's the hero H1 under simulated slow 4G, as on the homepage in v4.

**Screenshots:**
- 5 pages × NL/EN × 390/768/1440: reduced motion on dev and production, full motion on production at phone and desktop.
- Overflow 0, cut text 0, console errors 0, one h1 each, no heading jumps, no tap targets under 24px, no text under 12px.

**CLS (production):** ≤ 0.001 everywhere except NL Operations on desktop at 0.016, which is under budget.
- **Cause:** that moment's rail label wraps to a second line once the clock is running, and the rail is locked homepage code.
- **Not fixed:** the shift is under budget, and fixing it means changing the rail, which needs your approval.

**axe:** /nl, /en and all ten service routes at phone and desktop: 0 violations.

**3D probe:** Chrome with GPU (Metal) and with swiftshader:
- the canvas mounts and swaps in seamlessly;
- a click on the Pijplijn tile in the canvas selects Pijplijn in the dashboard;
- no console errors.

**Homepage regression:** all 36 section shots compared pixel by pixel with `docs/homepage-v4/after`. The only difference is the Next.js dev badge, present in the reference shots and absent from the production shots. Lighthouse /nl 94/100/100/100, axe 0.

## Change to locked shared code

**What changed:** `components/blocks/services/moments/Reporting.tsx`. The rolling value was a `<span aria-label>` with no role, which axe flags as serious; screen readers didn't read the value. It now carries a screen-reader-only copy of the value (`sr-only`).

**Effect:**
- nothing changes visually; the homepage diff is clean;
- the same bug was live on the homepage whenever the Reporting service was opened in the explorer.

Please confirm you're OK with this.

## Scores (ae-anti-vibe, from the screenshots)

| Section | Before (readiness check) | Now | Lowest now | Note |
|---|---|---|---|---|
| Hero | 13 | 20 | Composition 2 | The homepage moment carries the proof. The phone stage is tall. |
| Reporting signature | 12 (stepper) | 22 | Robustness 2 | The phone strip is simplified by design. Still needs a review on a real device. |
| Interim steps (4 pages) | 12 (stepper) | 17 | Illustration 1 | Interim. Phase 2–3 signatures replace it. |
| Process | — (new) | 21 | — | Homepage block. |
| Capabilities | 10 (marquee) | 19 | Illustration 2 | |
| Principles | 13 (icon cards) | 19 | Illustration 2 | |
| FAQ | 16 | 19 | Honesty 2 | Unverified answers; see the content draft. |
| Others | 14 | 19 | — | |
| Closing | 15 (CtaBand) | 21 | — | Homepage block. |

The interim steps block is the only section under the ship bar (19). That is expected for phase 1: the
signatures for Operations (three.js), Brand (CSS 3D), Acquisition and Invoicing (2D) replace it.

## Content gaps

Everything in `docs/service-content-draft.md` is marked TE BEVESTIGEN and is **not** on the site:
- tools per service (3–6);
- "What you get" (4–6 lines);
- "What's not included";
- FAQ verdicts with proposed rewrites.

Flagged claims I can't verify:
- "Veel partners hebben liever…" (Reporting FAQ);
- "elke handeling wordt vastgelegd" and a data processing agreement (Operations);
- the AVG basis for outreach (Acquisition);
- Pipedrive and Twinfield support;
- "een uur voor de kick-off";
- weekly reporting (Acquisition).

## Decisions needed

1. **Content draft:** mark each item ✅/✏️/❌. Phase 2 adds the "Tools", "What you get" and "Not included" slots once confirmed.
2. **Locked-code a11y fix** in the homepage Reporting moment (above): keep?
3. **Operations rail CLS (0.016):** accept, or let me reserve the rail height in `clock.tsx`? That would also affect the homepage explorer.
4. **Interim steps on ink:** acceptable until each signature lands, or would you rather have them on white?
5. **Reporting signature:** happy with the opening figure (€ 98, "Omzet per declarabel uur") and the four figures? They're fictional, labelled examples.
6. **Phase 2 order:** I propose Operations (three.js, reusing this pattern) next, then Brand (CSS 3D), then Acquisition and Invoicing (2D).
7. **Copy carried over unchanged** that you may want to revisit: the FAQ questions use "ik" (the visitor's voice, which is fine), and the closing title "Vraag meer van uw administratie."
