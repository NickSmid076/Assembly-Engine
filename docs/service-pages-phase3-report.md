# Service pages · phase 3 report

Date: 18 Oct 2026 · Previous: `docs/service-pages-phase2-report.md` · **Status: waiting for your review.**

## In one paragraph

Brand now has its signature. One brand guide (logo, two typefaces, three colours) turns into components, and the components turn into a finished page.
- **Desktop:** the page starts taken apart in CSS 3D. Each brand-guide token floats above the part it styles, and the parts float above a dark blueprint of the page. When the section comes into view, the tokens drop in, the parts settle and the camera turns to face the finished site.
- **Controls:** home / service / contact, desktop / phone, "Take it apart" / "Put it together". You can select a token or a part to see where it is used.
- **"Real: Energielabel Breda":** swaps the fictional example for the real pages, with the real numbers and their sources, and links to the case study.
- **Phone:** a flat, interactive version. **Reduced motion:** the finished page.

The tools strip on all five pages now shows logos (4–8 per page), with names where no approved logo exists. "Toggl Track" is replaced by "Urenregistratie" / "Time tracking". Operations file names no longer break mid-word.

Checks (one open point: confirm the Brand mobile score on real hardware after deploy):
- axe: 0 violations;
- Lighthouse mobile: 90–94 performance on clean runs (Brand included), 96–100 accessibility, CLS 0. This machine was under unrelated load, so single runs dipped into the 80s on every page, the control page included (details under Checks);
- build: passes, First Load still 177 KB;
- Brand island: 6.9 KB gzip.

## Brand: before → after

| | Before (phase 2) | After |
|---|---|---|
| Section | Interim "how it works": three numbered steps on ink (`service_steps`) | Signature `brand`: the three points, then brand guide → components → page |
| Score (ae-anti-vibe) | 17/24 (the same interim block scored 17 on Operations in phase 2; Illustration 1) | **21/24**. Purpose 3 · Hierarchy 2 · Composition 3 · Illustration 3 · Typography 2 · Motion 3 · Honesty 3 · Robustness 2 |
| Shots | `docs/service-pages-phase3/before/` (phase 2 pages, slices 01–03) | `docs/service-pages-phase3/after/`: `nl-brand-exploded-1440`, `-assembled-`, `-highlight-`, `-proof-1440`/`-390`, `-reduced-1440`, `-flat-390`/`-768` (NL and EN) |

Why not 3 everywhere:
- **Hierarchy 2:** the panel has five control groups (view, page, screen, brand guide, parts). The stage wins the first look, but the panel is busy. If you want it calmer, the parts row could fold into the highlight of the brand guide.
- **Typography 2:** inside the phone mock, a long Dutch item truncates ("Aangifte vennootschapsbel…"). It's an illustration, but it shows. Desktop-device mock text on a phone is small (a picture, not reading text).
- **Robustness 2:** not yet tried on a real phone or laptop (you said you'd test).

Taste check (brief: 2+ everywhere, composition and motion at 3): composition 3, motion 3, and nothing below 2. Not used: no glow, no gradient text, no stats without a source, no decorative motion. The 3D only explains the one change: tokens → parts → page.

### What the visitor sees and does

- **Panel (HTML, all sizes)**
  - "Voorbeeld · fictief kantoor" and a one-line hint.
  - **View:** Opbouw / Echt: Energielabel Breda. **Page:** Home / Dienst / Contact. **Screen:** Desktop / Telefoon. Button groups with `aria-pressed`, 44 px targets.
  - **Brand guide chips:** vD logo, Manrope, Inter, Nacht #0B1B33, Signaal #2E5BFF, IJs #EDF1FF. Selecting one rings every part that uses it.
  - **Parts chips:** the 5–7 components on the current page. Selecting one rings it (and lifts it in the exploded view).
  - A live region reads the result ("Dienst · desktop: 7 onderdelen uit één merkgids").
- **Stage (desktop, motion allowed):** starts exploded at the house isometric angle; puts itself together about 1 s after it is in view (≈ 2.1 s). "Uit elkaar halen" runs it in reverse.
- **Proof mode:** the real Energielabel Breda pages (home, service, contact; desktop and phone screenshots), with per-page facts and sources, a note that PageSpeed scores are measured on the homepage, "Lees de case →" (to `/case-studies/energielabel-breda`) and the external site link.
- **Phone:** the same panel, the page shown flat on a phone screen; every control works.
- **Reduced motion:** the finished page, no exploded state, no "take apart" button; selection still works instantly.

### Built

- `components/blocks/service-signature/brand/` (`Brand.tsx` panel, `Stage.tsx`, `geometry.ts` layouts per page × device, lifts, token positions, timing).
- CSS 3D only (`translateZ`, `rotateX/Z`, `preserve-3d`; no three.js). Rules in `app/globals.css` (`.bs-*`). The exploded state exists only in `@media (min-width:1024px) and (prefers-reduced-motion:no-preference)`, so phones and reduced motion get the finished page from the first paint.
- Content in `lib/i18n/{nl,en}.ts` → `lib/content/local.ts`; zod schema `brandSignature`; ACF layout `brand` added to `wordpress/acf-json/group_service_sections.json`.
- **Hydration on demand** (`service-signature/Deferred.tsx`): the island hydrates when it comes within 600 px of the viewport (or on focus/tap). Hydrating it at load cost 0.3–0.7 s of blocking time on a throttled phone (mobile performance 68–82). With deferral it is 91–96. The server HTML is shown untouched until then. It renders the stage for both devices, and CSS shows the right one, so the switch to the phone stage causes no shift.

## Tools strip: logos

Shots of the strip on all five pages, desktop and phone: `docs/service-pages-phase3/after/strip-nl-*.png` (plus `strip-en-invoicing-1440.png`).

| Page | Logos | Names (no approved logo) |
|---|---|---|
| Brand | WordPress, Figma, Blender, Next.js, Vercel | Elementor Pro, Adobe Creative Cloud, Higgsfield |
| Acquisition | HubSpot, LangChain ("AI-agents op maat") | Microsoft 365 (Outlook, Teams), Google Workspace, n8n |
| Operations | LangChain | Microsoft 365 (SharePoint, OneDrive, Outlook, Teams), Copilot Studio, Google Workspace, n8n |
| Invoicing | Stripe, DocuSign | Exact Online, Twinfield, Moneybird, Mollie, Adobe Acrobat Sign, PandaDoc |
| Reporting | HubSpot | Power BI, Looker Studio, Microsoft 365 (Excel), Exact Online, Twinfield, Moneybird, Dashboard op maat |

- Monochrome black, one optical height, generous spacing. Two columns on phone, a wrapping row from 640 px.
- Every logo has the tool name as alt text, and the name appears on hover and keyboard focus.
- Wording unchanged: "Werkt onder meer met" + "of met de software die u al gebruikt". No partner wording.
- Files in `public/logos/` (no hotlinking). Sources, licences and guideline notes: **`docs/logo-usage.md`**.
- **Layout shift and LCP:** logos are lazy `<img>` with width and height, so CLS stays 0. LCP is the hero heading or lead text on every page, never a logo.
- WordPress: the tools field is now a repeater (`name`, `logo`, `order`; 4–8) in the ACF draft.

## Smaller changes

- **Toggl Track → Urenregistratie / Time tracking** in the Reporting example, the homepage moment, the data and the ACF fixtures. Homepage regression:
  - 36 section shots (header, 7 sections, footer × NL/EN × desktop/phone, reduced motion) against the v4 reference: 33 pixel-identical. The other 3 differ by at most 2 of 255 brightness levels, only inside photos and screenshots (image-decoding noise, nothing visible).
  - Play/pause toggle: NL 107 px and EN 90.4 px through the whole story, the same as phase 2.
  - "Urenregistratie" / "Time tracking" fit on one line in their source card at 390, 1024 and 1440 (73 px or more to spare). "Toggl" no longer appears anywhere on the homepage.
  - Shot: `after/home-reporting-urenregistratie-nl-1440.png`.
- **Operations file names** (`after/operations-route-*.png`): break only at separators (space, `_`, `-`, `.`, `/`, `›`). A word too long for its column is cut with "…", and the full name shows on hover (`title`). Seen at 1024 and 1440, NL and EN.
- **Acquisition moment (service hero and homepage), phone** (`after/acquisition-moment-nl-390.png`): the HubSpot draft card's position was measured in JS after load. That caused a 0.024–0.029 layout shift (a phase 2 regression the old check missed, because it didn't scroll). It is now positioned by CSS: CLS 0. On phone, the stage is also 32 px taller (540 → 572 px), so the draft no longer covers the first pipeline row ("Signaal") in NL at 360–390 px. **This changes the homepage on phone by 32 px, only when the Acquisition tab is open in the services explorer** (the default view is unchanged, see the regression check above).
- **Tools strip, after your first look:** items no longer shrink, so a full row wraps instead of squeezing names into each other. The closing line ("of met de software die u al gebruikt") now sits on its own row under the tools. Checked for overlap on all 10 service pages at 640–1920 px.
- **Moment rail step buttons:** minimum width 44 px. EN "In" was 19 px wide (a tap-target flag on the homepage).

## Checks

**Screens:** 390 / 768 / 1440 × NL / EN × the five service pages + `/nl` + `/en`, reduced motion (36 runs), plus full motion on Brand, Acquisition and `/nl`. Overflow 0, cut text 0, console errors 0, headings fine, one h1, CLS 0 (also while scrolling).
- In the full-motion run, the checker flags "cut text" in the hero Brand moment on phone ("vandijk-accountancy.nl"). That text slides in from outside its clipped box. The slices show nothing cut, and the component is unchanged since phase 2.

**axe:** 0 violations on all 12 routes, phone and desktop (24/24), on the final build.

**Lighthouse, mobile (final build):**

| Route | Perf | A11y | BP | SEO | CLS | LCP |
|---|---|---|---|---|---|---|
| /nl/services/brand-digital-presence | 86–92 (5 runs, median 90) | 100 | 100 | 100 | 0 | 2.4–3.5 s |
| /en/services/brand-digital-presence | 83–94 (5 runs, median 84) | 100 | 100 | 100 | 0 | 2.5–3.7 s |
| /nl/services/customer-acquisition | 92–93 | 100 | 100 | 100 | 0 | 3.2 s |
| /nl/services/operational-automation | 91–92 | 100 | 100 | 100 | 0 | 3.3 s |
| /en/services/operational-automation | 92–94 | 100 | 100 | 100 | 0 | 3.1 s |
| /nl/services/invoice-payment-automation | 92–93 | 96 | 100 | 100 | 0 | 3.1 s |
| /nl/services/business-reporting-automation | 92–93 | 96 | 100 | 100 | 0 | 3.1 s |
| /nl | 91–94 | 100 | 100 | 100 | 0 | 3.1 s |
| /en | 93 (one outlier run: 78) | 100 | 100 | 100 | 0 | 3.2 s |

Desktop: /nl 100 performance / 100 accessibility; Brand NL 97 / 100, EN 99 / 100.

How to read the Brand numbers:
- Rows are from the final build. In the same rounds, the Acquisition page (used as a control) scored 78–92, so the dips are the machine, not the page.
- The A/B that matters: before the fix, Brand scored 68–82 against 92 for the control. Blocking the island's script brought it to 90–92, which proved the island was the cost. Hydration on demand closed that gap.
- **Please confirm with PageSpeed Insights after deploy** (real hardware, no local load). If Brand comes in under 90 there, the next step is trimming the stage markup (the token and wire layers aren't needed below 1024 px).

- The machine was under heavy unrelated load for part of the session (load average up to 60, from macOS system processes), so scores swing. Each route ran at least twice; the table shows the range of the clean runs.
- The 96s on accessibility are colour-contrast hits on hero-moment text caught mid-fade. Final colours pass. The same 96s appeared in phase 2.
- I also fixed one real contrast issue: the unstyled-part text in the exploded view (`ink/55`, 3.9:1) is now `slate` (5.3:1).

**Build:** passes. First Load 177 KB on home and service pages (unchanged; budget 180).

| Bundle | Size (gzip) | Budget |
|---|---|---|
| Brand island (lazy, Brand page only, hydrates near view) | 6.9 KB | 12 KB |
| Operations island | 6.8 KB (unchanged) | 12 KB |
| CSS 3D | 0 KB JS; 3.6 KB of CSS rules (1.2 KB gzip) | |

Caught on the way: `Brand.tsx` imported one constant from the zod schema, which shipped zod to the browser (+25 KB gzip). It now imports types only. A rule for this is in `ae-ui-3d`.

## Docs and skills updated

- `docs/logo-usage.md` (new).
- `ae-headless-wp`: tools repeater, `brand` layout.
- `ae-section-composer` P12: logo strip rules.
- `ae-design-system`: tools strip and the three signatures.
- `ae-ui-3d`: CSS 3D notes, hydration on demand, no value imports from schemas in islands.

## Needs your decision

1. **Logos in black (#000), not ink.** Most vendors only allow their black, white or colour versions; ink would be a recolour. One line per SVG if you want ink anyway (see `docs/logo-usage.md`).
2. **Vendor checks before launch.** Figma is confirmed from its brand page. WordPress, Blender, Next.js, Vercel, HubSpot, Stripe and DocuSign are faithful copies of the official marks, but I couldn't confirm in this session that a solid black version is allowed. About 10 minutes per vendor; any that fail fall back to the name by clearing the logo field.
3. **Shown as names:** Elementor (colour pairings only), Microsoft, Google and Adobe products (permission needed), n8n (100 px minimum width), and Exact, Twinfield, Moneybird, Mollie, PandaDoc, Higgsfield (no clean official SVG). If you get files from these vendors, they drop in.
4. **Brand list capped at 8:** adding Blender and Higgsfield pushed out Cal.com and Calendly. Reporting: Excel is merged into "Microsoft 365 (Excel)" to fit Looker Studio, the custom dashboard and Microsoft 365.
5. **New live-site captures:** the service (`/energielabel-woning/`) and contact pages were captured from energielabel-breda.nl on 18 Oct 2026. The homepage keeps the earlier capture, because the live homepage rendered unstyled in headless Chrome today.
6. **New proof wording to confirm:**
   - service: "3 → 20+ pages, 8 service pages, 4 location pages";
   - contact: "4 ways to get in touch" (source: the contact page, 18 Oct 2026) and "15 pages with the request form".
7. **Proof repeated:** on Brand, the case block right after the signature repeats numbers that proof mode already shows. Keep it (it is the page's evidence for people who don't click), or drop it.
8. **Homepage phone change:** the Acquisition moment stage is 32 px taller on phone (to stop the draft card covering the pipeline row in Dutch).

Waiting for your review.
