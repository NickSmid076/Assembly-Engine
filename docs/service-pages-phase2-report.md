# Service pages · phase 2 report

Date: 18 Oct 2026 · Previous: `docs/service-pages-phase1-report.md` · **Status: waiting for your review. Brand (phase 3) has not started.**

## In one paragraph

Operations now has its signature: a dossier per client.
- **What it shows.** Documents arrive by client portal or email. They pass a check against the period's checklist, get a standard name, and settle into the client's drawer. Missing items stay as dashed slots, with one chip per reminder sent (day 3, day 7), until a person signs off.
- **Interaction.** You switch client and period to see what's missing, and pick any document to follow its route.
- **Desktop:** three.js, with the same isometric language as the hero and the Reporting signature.
- **Phone:** an interactive 2D version.
- **Reduced motion:** the finished state.
- **No WebGL:** the SVG fallback.

The confirmed content is live on all five pages. The 0.016 layout shift is fixed (CLS 0 everywhere, with and without motion), and the homepage is pixel-identical. Every check passes:
- axe: 0 violations;
- Lighthouse mobile: 92–95 performance, 96–100 accessibility;
- build: passes, First Load still 177 KB.

## Operations: before → after

| | Before (phase 1) | After |
|---|---|---|
| Section | Interim "how it works": three numbered steps on ink | Signature `operations`: the three points, then the dossier |
| Score (ae-anti-vibe) | 17/24 (Illustration 1) | **22/24**. Purpose 3 · Hierarchy 3 · Composition 3 · Illustration 3 · Typography 2 · Motion 3 · Honesty 3 · Robustness 2 |
| Shots | `docs/service-pages-phase2/before/` | `docs/service-pages-phase2/after/` |

Why not 3 everywhere:
- **Typography 2:** at desktop width the long file names in the route ("2026-K3 Inkoopfacturen De Vries.pdf") wrap mid-name inside their column.
- **Robustness 2:** it hasn't been checked on a real phone yet, and on a cold first load with software rendering the 3D can take longer than 7 s to appear (the SVG fallback works in the meantime).

### What the visitor sees and does

- **Panel (HTML, all sizes)**
  - "Voorbeeld · fictieve klanten", plus a one-line hint.
  - **Klant:** De Vries Installatie, Jansen Logistiek, Bakker Advocaten. **Periode:** K2 / K3 2026. Both are button groups with `aria-pressed` and 44 px targets.
  - **Dossier card:**
    - the deadline ("Btw-aangifte uiterlijk 31 okt");
    - the checklist progress as five slots ("4 van 5 binnen");
    - five checklist rows (Bankafschriften, Verkoopfacturen, Inkoopfacturen, Bonnetjes, Kilometerregistratie). Each row is a button showing received time or "Opgevraagd" plus a reminder badge;
    - the sign-off line. Its three states are spread across the six dossiers: waiting (Sanne/Mark), "Klaar om af te tekenen" (Bakker K3), "Afgetekend door … · date" (all K2 dossiers).
- **Route of the chosen document** (`aria-live`, height reserved)
  - **Received:** Ontvangen (channel · time) → Gecontroleerd ("Past bij de checklist · 38 pagina's") → Benoemd (the new file name) → Gearchiveerd (the folder path).
  - **Missing:** Opgevraagd → Herinnering dag 3 → Herinnering dag 7 (or "gepland · date") → Wacht op klant (deadline).
  - The steps light up in order. With the 3D running, they follow the travelling document.
- **Desktop 3D** (lg+, fine pointer, motion allowed, WebGL; loaded after load + idle, near the viewport)
  - **The object:** two inbox trays (client portal, email), a check gate, and the drawer with five upright cards plus a sign-off seal.
  - **Switching dossier:** the received cards settle in one by one.
  - **Picking a received document:** a sheet travels from its tray through the gate (the beam turns green as it passes) into its slot, and its card rises cobalt.
  - **Missing items:** a dashed warn-coloured outline, with reminder chips above it and a dashed expected route.
  - **Clicking:** a card or outline inside the 3D selects that document.
  - **Labels:** all are HTML overlays, nothing is in a texture. They show the channels, "Controle", the chosen document as a pill, and the client · period with the sign-off state under the drawer.
  - **Rendering:** on demand, then idle. Measured: no frames are drawn about 4 s after load. It pauses off-screen and on hidden tabs.
- **Phone and tablet (2D):** above the card, a strip shows the document's channel → check → the five drawer slots (cobalt = chosen, dashed = missing, dots = reminders). The route becomes a vertical track. Everything is interactive through the panel.
- **Reduced motion:** the SVG poster in its final state, no travel or drawing, all steps lit.
- **No WebGL:** the same poster. It reacts to every choice, and clicking a card in the SVG selects it.

**Files**
- `components/blocks/service-signature/operations/` contains:
  - `geometry.ts` (shared by poster, scene and overlays);
  - `Poster.tsx`, `Scene.tsx`, `Operations.tsx`.
- `schema.ts`: `operationsSignature` (validated: every client × period has a dossier, and docs follow the checklist order).
- `Signature.tsx` lazy-loads per kind.
- The data lives in `lib/i18n/{nl,en}.ts` → `signatures.operations`.
- `app/globals.css` gained `.sig-draw-route` and `.ops-step` (both off under reduced motion).

## The layout shift on Operations (decision 2)

**Cause.** The rail's play/pause button renders "Opnieuw" (104 px) on the server and "Pauzeren" (107 px) once the story plays. Those 3 px narrowed the step list, so "Herkend en gearchiveerd" wrapped to a third line and the hero grew 17 px. Phase 2 had first fixed only the reduced-motion half of this (the hidden toggle); the motion half showed up in this round's QA (0.011).

**Fix in `clock.tsx`** (locked; add-only). The three labels now share one grid cell, so the button always has the width of the longest label. The hidden labels are `invisible` and `aria-hidden`.

**Result**

| Check | Result |
|---|---|
| CLS on NL/EN Operations, with motion | 0 |
| CLS on all 10 service routes + home, motion on and off | 0 |
| Homepage, reduced motion: 36 section shots vs the phase 1 production reference | 36/36 pixel-identical |
| Homepage, with motion | No step label changes height. The toggle now keeps one width: NL 107 px (it was 104 px while idle), EN 90.4 px (it was 86.5 px while playing) |

That ≤ 4 px button width change is the only visible difference anywhere on the homepage.

## QA (production build `.next-qa`, final build unless noted)

**Build:** passes.

| Route | First Load |
|---|---|
| Homepage | 177 KB (unchanged) |
| Service pages | 177 KB (unchanged, budget 180) |

| Bundle | Size (gzip) | Budget |
|---|---|---|
| Operations island | 6.8 KB (lazy, Operations page only; includes the poster and geometry) | 12 KB |
| Operations 3D scene | 2.9 KB, plus the shared three/r3f chunk (desktop only) | 25 KB |
| Reporting island | 4.5 KB (unchanged) | |

**Lighthouse, mobile**

| Route | Perf | A11y | BP | SEO | CLS | LCP |
|---|---|---|---|---|---|---|
| /nl/services/operational-automation (final) | 95 | 100 | 100 | 100 | 0 | 2.7 s |
| /nl/services/operational-automation (previous build, two runs) | 93 / 92 | 100 | 100 | 100 | 0 | 3.2 s |
| /en/services/operational-automation (final) | 92 | 100 | 100 | 100 | 0 | 3.3 s |
| /nl (final) | 95 | 100 | 100 | 100 | 0 | 2.7 s |
| /nl/services/brand-digital-presence | 92 | 100 | 100 | 100 | 0 | 3.2 s |
| /nl/services/customer-acquisition | 92 | 100 | 100 | 100 | 0 | 3.2 s |
| /nl/services/invoice-payment-automation | 92 | 96 | 100 | 100 | 0 | 3.2 s |
| /nl/services/business-reporting-automation | 95 | 96 | 100 | 100 | 0 | 2.8 s |
| /en/services/business-reporting-automation | 93 | 96 | 100 | 100 | 0 | 3.1 s |

- The 96s are the phase 1 finding: Lighthouse catches the hero moment's cards mid-fade, and axe passes the same elements.
- One earlier batch ran while I was also running 3D probes, which gave false lows (Brand 78, TBT 468 ms). I discarded it and reran those pages alone; the table shows the clean runs.
- The Brand, Acquisition, Invoicing and Reporting rows are from the build before the last two small changes (the rail width and the tray labels).

**axe:** 0 violations on /nl, /en and all ten service routes, at phone and desktop (24/24), on the final build.

**Screenshots and report** (all 12 routes × 390/768/1440, motion off and on):
- overflow 0, CLS 0, console errors 0;
- one h1 each, no heading jumps, no text under 12 px, no unnamed controls.

Known, not new:
- `/en` homepage, tablet/desktop: a rail step button is flagged as a small tap target. The same finding is in the v4 baseline (locked code).
- With motion on, phone: "cut text" is flagged on the homepage, Brand and Invoicing. These are the moments' cards caught mid-slide. The v4 baseline has the same, and it's 0 with reduced motion.

**3D probe** (production, 1440):
- **Metal (GPU):** the canvas mounts, and a click on the back card inside the 3D selects "Bankafschriften" in the panel. Switching to Jansen updates the drawer (two dashed slots, one chip each). No console errors.
- **SwiftShader (software):** same result.
  - On the very first load after a fresh build, the canvas wasn't up within 7 s. The SVG fallback handled the click.
  - On the rerun it mounted within 3 s.

## Content now live (all confirmed items, NL + EN)

The new block **`service_scope`** ("Wat u krijgt / Niet inbegrepen / Werkt onder meer met … of met de software die u al gebruikt") replaces the capabilities ledger. `gridTitle` is kept as its heading, and the old block is archived.

| Page | Tools (in order) | What you get | Not included |
|---|---|---|---|
| Brand | WordPress + Elementor Pro, Adobe Creative Cloud, Figma, Next.js, Vercel, Cal.com of Calendly | 6 | 5 |
| Acquisition | Microsoft 365 (Outlook, Teams), HubSpot, Google Workspace, n8n, AI-agents op maat (LangChain) | 6 | 4 |
| Operations | Microsoft 365 (SharePoint, OneDrive, Outlook, Teams), Copilot Studio, Google Workspace, n8n, AI-agents op maat (LangChain) | 6 | 4 |
| Invoicing | Exact Online, Twinfield, Moneybird, Mollie, Stripe, DocuSign / Adobe Acrobat Sign / PandaDoc | 5 | 3 |
| Reporting | Power BI, Excel, Exact Online, Twinfield, Moneybird, HubSpot | 6 | 4 |

- **FAQ rewrites applied:**
  - Brand: platform, kick-off.
  - Acquisition: cold email (legitimate interest, B2B, opt-out, no mass mail or bought lists), CRM without Pipedrive.
  - Operations: client data, with the verwerkersovereenkomst.
  - Reporting: alerts, reliability, tools.
- **Stated as fact, as confirmed:** a verwerkersovereenkomst, maintenance and monitoring included, weekly acquisition reporting, and everything in the client's name.
- **Made generic:** "een uur voor de kick-off", named time trackers, named practice software.
- `docs/service-content-draft.md` is marked **confirmed**, with a changelog of every change from draft to live.
- **WordPress:**
  - `wordpress/acf-json/group_service_sections.json` is regenerated: `service_scope` added, `service_capabilities` removed, and the `operations` signature layout added.
  - `.claude/skills/ae-headless-wp` is updated to match.

## Decisions needed

1. **Rail width on the homepage.** The play/pause button now keeps the width of its longest label (≤ 4 px wider in some states). That is what removes the jump. OK to keep?
2. **"Toggl Track"** appears as a source in the Reporting signature and in the locked homepage moment. That conflicts with "uw urenregistratie / don't name a time tracker". I kept it per decision 4. Replace it with "Urenregistratie" in both, or leave it?
3. **Five tools on Acquisition and Operations.** Your list has five tools for each, so they show five. Add a sixth, or keep five?
4. **Tools not shown** because of the six-tool limit:
   - Blender and Higgsfield (Brand);
   - Looker Studio and a custom dashboard (Reporting: named in the FAQ instead);
   - Microsoft 365 as a Reporting source (not named anywhere on that page yet).

   Fine as is?
5. **Operations example.** Is the cast (De Vries Installatie, Jansen Logistiek, Bakker Advocaten; Sanne, Mark, Pieter) and the VAT checklist OK? In particular, the opening state is De Vries K3 with Bonnetjes missing after the day 7 reminder, following Inkoopfacturen by email.
6. **Real-device check.** The phone 2D version and the desktop 3D have only been tested in headless Chrome. A quick look on your phone and laptop would close Robustness.
7. **Next:** Brand (CSS 3D) as phase 3, as planned?
