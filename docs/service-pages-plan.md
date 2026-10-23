# Service pages · plan (phase 1)

Decisions are final (owner, 18 Oct 2026):
- **3D:** three.js for Reporting and Operations, CSS 3D for Brand, 2D (Framer Motion) for Acquisition and Invoicing.
- **Phones:** a simplified but interactive 2D version of every signature component. Reduced motion = the composed end state.
- **Cuts:** capability marquee, stat block, watch scene, global tools grid, floating hero cards.
- **Tools:** shown as names set in Manrope, no logos.
- **Process:** the homepage's 5 steps and "live binnen 4 weken" apply to every service.
- **Proof:** Energielabel Breda only on Brand; the fictional cast everywhere else, labelled "Voorbeeld"/"Example".
- **Budgets:** service page First Load ≤ 180 KB; 3D desktop-only and lazy (the shared three/r3f chunk); Lighthouse mobile Performance ≥ 90 and Accessibility ≥ 95; CLS ≤ 0.02.
- **Draft content** (tools per service, deliverables, scope limits, FAQ rewrites) lives in `docs/service-content-draft.md`, marked TE BEVESTIGEN. None of it goes live in phase 1.

## Phase 1 scope

1. The service template as blocks: zod schemas, content layer (`getServicePage`), ACF draft. The route renders `renderBlocks`, like the homepage, so most of the page is server-rendered.
2. All five pages migrated with their **existing** copy. The cuts are applied and the debt fixed.
3. The Reporting signature component.
4. The skill `ae-ui-3d` and the content draft.

## Page sequence (every service page)

| # | Block | Tone | Content (existing copy) | Pattern |
|---|---|---|---|---|
| 1 | `service_hero` | white | Service name with its glyph; `hero.title` / `hero.muted` (two-tone H1, left-aligned); `hero.sub`; primary CTA (`.btn-primary`, /contact) + ghost "Zo werkt het" (#how); right: that service's **homepage moment** on a paper stage (reused, plays once, rail with pause/replay) | P1 split, statement + scene |
| 2a | `service_signature` (Reporting) | ink | `howTitle`, `steps` as three short points, then the signature component | Signature explorer (new) |
| 2b | `service_steps` (other four, interim until phases 2–3) | ink | `howTitle`, the three `steps` as a numbered ledger across the frame | P4 ledger |
| 3 | `proof` (Brand only) | white | The homepage proof block (Energielabel Breda, sourced figures) | P6 |
| 4 | `process` | paper | The homepage process block (5 steps, "Live binnen 4 weken" bracket) | P4 track |
| 5 | `service_capabilities` | white | `gridTitle` + `grid` (6–8 items) as a two-column hairline ledger, replacing the marquee | P7 |
| 6 | `service_principles` | paper | `principlesTitle` + three `principles` as numbered statements | P7 |
| 7 | `service_faq` | white | `faqTitle` + `faq` (`<details>`, no JS) | P10 |
| 8 | `service_others` | paper | The other four services, each with its glyph (the hero-engine glyphs), name and lead | Strip |
| 9 | `closing_cta` | ink | The homepage closing block with `servicePage.ctaTitle` / `ctaSub` and the 07:00 clock | P11 |

Rhythm on every page: white → ink → (white proof) → paper → white → paper → white → paper → ink → footer (ink-2).
No two neighbours share a tone. The page thread (cobalt line on the left frame) runs here too.

**Cut:** floating hero cards, dotted hero background, global tools grid, capability marquee, stat, watch scene, `CtaBand` on service pages.

**Retired in phase 1** (archived to `archive/service-pages-v1/`), because only the service pages used them:
- `components/ServicePage.tsx`;
- `components/ui/scenes.tsx`, `lib/useTimeline.ts`, `components/ui/kit.tsx`. These were a second, looping animation system with window chrome and 10–11.5px text.

The step scenes go with them. Each page keeps a full product story in its hero (the homepage moment), and phases 2–3 bring the signatures.

**Debt fixed** by the rebuild:
- no blur;
- no infinite decoration;
- no per-frame `setState`;
- no auto-advance without a pause (the stepper is gone);
- no `initial={reduce ? … }`;
- ink primary buttons replaced by `.btn-primary`;
- inactive-step contrast (2.2:1) gone;
- the unreachable scroll region gone;
- all UI text ≥ 13px;
- the page is server-rendered except its interactive islands.

## Reporting signature: "Waar komt dit cijfer vandaan?"

**The one idea:** every number on the dashboard can be traced to the system it came from and the moment it synced. A partner never has to ask "klopt dit wel?".

**Proof:** a fictional partner dashboard for Van Dijk Accountancy, October, built from three sources. The data matches the homepage reporting moment:
- Exact Online;
- Toggl Track;
- HubSpot.

| KPI | Value | Sources | Calculation |
|---|---|---|---|
| Omzet oktober | € 84.200 | Exact Online: sales invoices October, 214 lines, synced 07:00:04 | — |
| Declarabel | 71% | Toggl Track: hours October, 1.214 h of which 862 billable, 07:00:06 | billable ÷ logged hours |
| Pijplijn | € 126.000 | HubSpot: deals in stage Offerte, 4 deals, 07:00:07 | — |
| Omzet per declarabel uur | € 98 | Exact Online + Toggl Track | € 84.200 ÷ 862 h |

"Omzet per declarabel uur" is selected first: one number, two sources, so the lineage idea is clear before anyone clicks.

**Desktop (lg+), inside an ink chapter**
- **Left: the dashboard** (crisp HTML). Four KPI tiles; each is a button with `aria-pressed`. Under the tiles, the lineage card ("Herkomst"): one row per source (tool, dataset, records, synced time), plus the calculation where there is one.
- **Right: the system in 3D** (three.js, the hero's isometric language and glyphs):
  - three source blocks on a plate;
  - conduits running to ports on a dashboard slab with four tiles.
- **Selecting a KPI:**
  - its source blocks lift;
  - their conduits turn cobalt and one signal runs along each, once;
  - the tile lifts and turns cobalt;
  - every other conduit dims.
- **Labels:** source names are HTML overlays above each block (never text in textures).
- **On first view:** the 07:00 sync plays once (a signal along every conduit, ~2 s), then the scene holds on the default selection.
- **3D rules:** demand frameloop, real-time clock, DPR ≤ 2, paused off-screen, loaded after idle.
- **SVG fallback:** the same geometry as an isometric SVG drawn from the same data. It reacts to the selection too (lift and conduit colour via CSS transitions). It shows before the 3D loads, without WebGL and with reduced motion.

**Phone and tablet (< lg): 2D, interactive**
- A strip of the three sources, connector lines that draw down to the selected tile, the 2×2 dashboard, then the lineage card.
- Tapping a tile lights its sources and redraws the connectors (`pathLength`, 0.4 s).
- Tap targets ≥ 44px.

**Reduced motion:** no signals or drawing. Selection changes are instant; everything else is the same.

**Budget:**
- Scene code ≤ 25 KB gzip, lazy, desktop-only.
- three/r3f is the hero's chunk (cached after a homepage visit).
- The SVG poster and 2D view are part of the signature island (≈ 8–10 KB gzip).

## Content layer and WordPress

- **Content layer:** `getServicePage(locale, slug)` returns `{ locale, slug, title, description, sections }`, following the same `Section` union and `renderBlocks` registry as the homepage.
- **New layouts:** `service_hero`, `service_signature` (discriminated on `kind`; phase 1: `reporting`), `service_steps`, `service_capabilities`, `service_principles`, `service_faq`, `service_others`. The service pages also reuse `process`, `proof` and `closing_cta`.
- **ACF:** `wordpress/acf-json/group_service_sections.json`, one flexible-content group on the `service` CPT.

## Shared-code rules (the homepage is locked)

**Imported, unchanged:**
- `services/moments/Stage.tsx`, `clock.tsx`, `ui.tsx`;
- `hero-home/engine-geometry.ts` (`iso`, `boxFaces`, `GLYPHS`, `glyphUV`);
- the `process`, `proof` and `closing-cta` blocks;
- `PageThread`.

**Additions only:** new union members in `lib/content/types.ts` and new entries in the `renderBlocks` registry.

**Homepage regression check at the end:**
- section shots against `docs/homepage-v4/after`;
- Lighthouse /nl;
- axe.

## QA

- `shoot.mjs` at 390/768/1440, NL + EN, on all five service pages and the homepage, in reduced and full motion.
- Full-motion contact sheets of the signature.
- 3D hover/click probe with swiftshader.
- axe, Lighthouse mobile on two service pages plus home, `npm run build`, First Load per route.
- Report: `docs/service-pages-phase1-report.md`.
