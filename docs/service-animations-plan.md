# Service animations · plan

18 Oct 2026 · scope: the five animations in the homepage services explorer (`components/blocks/services`).
Nothing else on the page changes. Service pages keep `scenes.hero/steps/watch`; the homepage reads a new
`scenes.home` key.

## Skills and precedence

Brief first, then ae-design-system, ae-motion, ae-section-composer, ae-anti-vibe, ae-headless-wp,
ae-visual-qa and ae-elevate, then design-taste-frontend (in full: SKILL.md, motion, critique, tells,
imagery §7 "showing software"), then threejs-fundamentals/-geometry/-materials and framer-motion.

## One motion language

- **Time is one value.** Each animation is a pure function of one clock `T` (seconds, a framer
  `MotionValue`). Every element's opacity and transform is derived from `T` with `useTransform`. So
  pause freezes everything exactly, replay sets `T = 0`, clicking a step jumps to it, and the server and
  reduced motion render the end frame (`T = duration`). React re-renders only when the step changes.
- **Script = data, choreography = code.** `steps: [{ at, label, state }]`. Each kind has a fixed set of
  states in a fixed order (validated by zod). Editors change `at`, `label` and the example data; the code
  decides what each state looks like.
- **Shared tokens:** ease-out `[0.2,0.8,0.2,1]` for arrivals, ease-in-out `[0.65,0,0.35,1]` for travel, a
  damped spring curve for things that "lock in", a small anticipation (2–4px back) before anything
  travels, and 60–120 ms overlap between neighbours. Transform and opacity only.
- **Play once, hold, replay.** Plays when 35% visible. Pauses when it leaves the screen or the tab is
  hidden. Stops at a composed end frame. A rail under the stage carries the step labels (13px), a progress
  line and one button: Pause → Play → Replay. Step labels are buttons and jump to that frame.
- **Hand-off between services:** the stage and the rail stay. The outgoing artefact leaves in 180 ms
  (opacity, y −8). The rail's labels cross-fade and its line runs back to 0. The incoming story starts at
  frame 1 straight away, because the visitor asked for it. The list marker slides to the new item
  (shared layout).
- **Static first.** The server HTML is the end frame (good without JS, for reduced motion and for CLS).
  Just before the stage scrolls into view the clock resets to 0 and the story plays. Every element holds
  its final position from the start; only opacity and transform change, so nothing reflows.
- **Reduced motion:** the end frame, no autoplay. The step buttons still work and switch frames
  instantly.
- **No chrome tells:** no window dots, no icon wells, at most one status word per artefact, no fake
  metrics (all numbers are labelled example data for fictional firms). Text ≥ 13px; nothing truncates.
- **Family look:** the same paper stage, white artefacts with 1px `line` borders and a soft card shadow,
  Manrope for figures, Inter for text, Plex Mono 13px for tool names and dates, and "Example" top-left.

## 2D or 3D

| Service | Render | Why (one line) |
|---|---|---|
| Brand | 2D, framer layout | The story is elements moving from a guide into a page: a shared-element move, not depth. |
| Acquisition | 2D | A signal travelling through stages is a left-to-right sequence; depth adds nothing. |
| Operations | **Isometric depth, SVG** | Filing is physical: documents drop *into* dividers of a dossier. It uses the hero's iso projection, so it rhymes with the engine. |
| Invoicing | 2D | One document moving down a line of dates; continuity, not depth, is the point. |
| Reporting | **CSS 3D (desktop)** | Three systems as stacked layers that collapse into one flat dashboard: the merge is the depth. |

**Three.js: not used here.**
- With an orthographic iso camera, any movement along an axis is a plain 2D translate, so SVG draws the
  dossier pixel-identical to WebGL. Real HTML text on CSS 3D layers stays sharp and selectable.
- WebGL would add three.js (≈ 190 KB gzip standalone, measured from the hero chunks), which breaks the
  150 KB budget, for no visible difference.
- The section's extra JS is only the five story modules.

## Storyboards

Timings are the defaults in `lib/i18n`. Example firm and tool names are in brackets.

### 1 · Brand & Digital Presence · 9 s · legato, springs

Composition: two overlapping sheets. The brand guide is a portrait sheet on the left. The live page is
a wider sheet that slides over it from the right. The page is the focal end state.

1. **0.0 s · mark.** Empty guide sheet with three ruled rows. The monogram mark draws in (the stroke
   draws, then the fill lands with a spring) and the firm name sets beside it [Van Dijk Accountancy].
2. **1.6 s · type.** The type row locks: "Aa" specimen and the two face names slide in from 6px and settle.
3. **3.0 s · colour.** Three swatches drop into the colour row one by one with a small overshoot, each
   with its name and hex in mono.
4. **4.6 s · page.** The guide steps back (scale .94, slight left). A website page slides in over it,
   and the mark, colour and type visibly travel from the guide into the page's nav, button and headline.
5. **7.0 s · booked.** The page button presses (0.97). A booking slip rises from it: "Intro call ·
   Thu 14 Nov, 10:00 · via Cal.com", with a check. **End frame:** the page with the slip, guide behind.

### 2 · Customer Acquisition · 11 s · detect, think, wait for a person, glide

Composition: work area on top (signal + fit on the left, draft on the right); pipeline lane along the
bottom (4 columns on desktop, 4 rows on phone).

1. **0.0 s · signal.** A signal card slides in from the left edge: "New vacancy · Project lead
   installations · De Vries Installatie · today 08:12".
2. **1.4 s · score.** Under it, three fit criteria tick one by one (sector, size, region), then "Fits
   your ideal client · 3 of 3".
3. **3.4 s · draft.** The HubSpot draft composes on the right, line by line (to, subject, three lines
   of body).
4. **6.0 s · approve.** Sanne's approve button presses. It turns into "Approved by Sanne · sent 09:04".
   This step is a deliberate 1.4 s pause: a person decides.
5. **8.0 s · booked.** The deal card leaves the work area and glides along the pipeline (Signal →
   Contacted → Replied → Meeting booked), with a brief stop in each column. **End frame:** the card in
   "Meeting booked · Tue 19 Nov", next to two other example deals in earlier columns.

### 3 · Operational Automation · 10 s · staccato arrivals, calm close

Composition: an isometric dossier (an open box with three tabbed dividers) on the left, with the
checklist and a deadline bar on the right. On phone, the dossier sits above the checklist.

1. **0.0 s · request.** The empty dossier "Income tax 2025 · M. Jansen" with its dividers (Income,
   Home, Assets) and an unchecked checklist of five documents. A line reads "Request sent by Microsoft 365".
2. **1.2 s · arrive.** Documents arrive from above one at a time, every 0.9 s. Each shows a short
   recognition tag for a moment ("Annual statement 2025 → Income").
3. **2.0 s · sort.** Each document drops into its divider (anticipation up 3px, then fall, a small
   settle). The divider's count goes up and the matching checklist row ticks. The drops overlap with the
   arrivals.
4. **6.6 s · complete.** Five of five. The dossier's lid label turns to "Complete" and the checklist
   collapses into one line.
5. **8.0 s · deadline.** The deadline bar fills from "today" to the "complete" marker and stops well
   short of the 1 May line. **End frame:** "Complete on 12 March · 50 days before the deadline".

### 4 · Invoice & Payment Automation · 12 s · one object, days passing

Composition: a vertical date line on the left (2, 16, 17, 18 Nov). One document travels down it and
changes form. The amount stays in the same place throughout.

1. **0.0 s · hours.** Three time entries [Mark, Anne] with hours and a total of 11.0 h, "from Moneybird
   time tracking".
2. **1.6 s · invoice.** The rows fold into invoice lines. Number, client [Jansen Logistiek], VAT and the
   total € 1,264.45 settle in.
3. **3.6 s · sent.** The invoice moves to "2 Nov · sent with a Mollie payment link".
4. **5.6 s · reminder.** The date line runs on (a mono "14 days later" mark). The invoice slides to 17
   Nov and a short, friendly reminder note attaches to its edge.
5. **7.8 s · paid.** A Mollie payment (iDEAL, € 1,264.45) arrives from the right and meets the invoice.
   A match line connects the two amounts.
6. **9.6 s · booked.** The two merge; the invoice gets "Paid · matched · booked in Moneybird". **End
   frame:** one closed invoice on 18 Nov, with the trail of dates above it.

### 5 · Business Reporting Automation · 10 s · converge, then settle

Composition, desktop: three source layers stacked in isometric 3D [Exact Online, Toggl Track, HubSpot].
On phone they are three flat strips. Both end as one flat dashboard with the Monday email over its
lower right.

1. **0.0 s · sources.** Three tilted layers, each labelled with its tool and two lines of raw figures.
2. **1.4 s · flow.** One figure from each layer drops down through the stack to the base plane,
   staggered.
3. **3.4 s · merge.** The layers collapse onto the base. The base rotates flat to face the visitor and
   becomes the dashboard (Power BI).
4. **5.4 s · settle.** Three figures settle like a scale (a digit roll with a little overshoot): revenue
   € 84,200 · billable 71% · open pipeline € 126,000. A 6-week bar row grows.
5. **7.4 s · summary.** The Monday email composes: "Mon 07:00 · Week 43 summary", three lines that
   repeat the figures in words. **End frame:** the dashboard and the email.

## Distinct, yet one family

| | Form | Movement | Rhythm | End |
|---|---|---|---|---|
| Brand | overlapping sheets | parts travel into place (shared element) | legato, springs | a booking slip |
| Acquisition | work area + lane | horizontal glide | think · pause · glide | a card in the last column |
| Operations | iso object + list | vertical drops | staccato | a bar that stops short |
| Invoicing | one morphing document | vertical, down a date line | long gaps (days) | one closed document |
| Reporting | 3D layers → flat | collapse and rotate | converge, settle | dashboard + email |

## Data and WordPress

- `components/blocks/services/moments/schema.ts` holds one zod schema per kind: `home_brand`,
  `home_acquisition`, `home_operations`, `home_invoicing` and `home_reporting`. The rules:
  - `steps` must name the kind's states in order;
  - `at` must increase;
  - the duration must be 6–12 s;
  - swatch colours must come from the brand palette.
- The data lives in `lib/i18n/{en,nl}.ts` as `services[i].scenes.home`. `lib/content/local.ts` maps
  it to `items[i].moment`. The explorer controls (pause, play, replay, step list) are block labels.
- `wordpress/acf-json/group_home_service_moment.json` is the ACF draft: a flexible-content field
  `moment` on the service CPT, one layout per kind, with a `steps` repeater (`at`, `label`, `state`
  read-only) and the example data fields.

## Ship bar and QA

- **Per animation:** frames at 1440 and 390 (the key frames plus the end frame), scored with ae-anti-vibe
  and the taste critique. The bar is ≥ 2 on every axis, with composition and motion at 3. At most 3
  rounds.
- **Then:**
  - a side-by-side check;
  - full QA at 390/768/1440 in NL and EN: overflow, console and hydration errors, axe, CLS < 0.05,
    Lighthouse mobile ≥ 90, reduced motion.
- **Shared code:** `scenes.tsx`, `kit.tsx` and `useTimeline` stay unchanged, so the service pages
  aren't affected. They get one smoke check anyway, because the `Service` type gains a key.

## As built (differences from the storyboards above)

- **Operations:** the dossier is turned 90°; the dividers (Income, Home, Assets) stand along x, so all three
  tabs and their counts read at once. Dates are for tax year 2026 (request 15 Feb 2027, complete 12 Mar, due 1 May).
- **Invoicing:** the payment does not merge into the invoice. It lands under it, a connector marks the match,
  and both stay in the end frame ("Matched to 2026-0142"). On a narrow stage the date rail is horizontal.
- **Reporting:** each source layer floats directly above the KPI tile it feeds (tilt 44° / −10°), and the
  dashboard content stays faint until the merge, so the stack reads as "three systems above one board".
- **Loading:** the five moments are one lazy chunk (8.9 KB gzip) fetched when the section is ~2 screens away.
  The stage frame, example label and step rail are server-rendered at fixed heights, so nothing shifts.
- **Tools:** Toggl Track is used as the time-tracking source in Reporting but is not on the site's tools list.
