# Service pages · phase 4 report

For: Nick · 18 Oct 2026 · Status: **done, ready for your review.**

All five service pages now have their signature. Everything below was measured on the final production build.

## 1. What changed

| Item | Before | After |
|---|---|---|
| **Brand: case block** | A proof block under the signature repeated the Energielabel Breda numbers. | Removed. The numbers live only in the signature's "Echt: Energielabel Breda" view. |
| **Brand: control panel** | Two labelled rows of pills (mode, page, device), layer chips and a part list. | One control row: page (Home / Dienst / Contact) and device (two icon buttons). "Echt: Energielabel Breda" is a quiet switch on its own row, so it never moves when the mode changes (the hint's height is reserved). Then one card: six brand-guide tokens; pick one to see "Komt terug in: …". Same button style as Reporting and Operations. |
| **Acquisition** | Interim "how it works" block (`service_steps`). | **Signature.** Left: the ideal client profile (sector, size, region). Right: this week's signals, each firm scored "x van 3" with its three reasons as ticked or struck-through chips. Firms that fit slide above the line and the rest slide below. Pick a firm to see its first message, drafted in HubSpot and waiting for Anne. "Goedkeuren" sends it and adds one to "Benaderd" in the weekly overview (contacted / replied / booked). On desktop the profile stays in view while you scroll the list (your call). |
| **Invoicing** | Interim `service_steps` block. | **Signature.** Pick a client (Jansen Logistiek paid, De Vries Installatie paid, Bakker Advocaten 9 days overdue). Four documents in a row: Uren → Factuur (lines, subtotal, VAT 21 %, total) → Betaling (Mollie: link sent, reminders, paid and matched, or still open) → Boeking (Moneybird). Pick an hour line: a cobalt ring pulses on that line in each document in turn while the connectors fill, so you can follow it into the books. Below, the reminder lane for that client is always visible (your call), with a switch to turn reminders off for that client. |
| `service_steps` | On Acquisition and Invoicing. | Retired from all five pages. The block stays in the registry for WordPress pages that may still use it. |
| **Hero animations (all 5 services + homepage moments)** | Text faded through low contrast (Lighthouse accessibility 96–97 on Reporting and Invoicing). | Text is now readable at every frame (section 3). |
| **Story start (all moments)** | Each hero story started as soon as it was 35 % visible, even during page load. | Stories wait until the page has loaded and is idle (at most 2.5 s). This fixed EN Brand's performance score (section 4). |

**Phone and tablet.** Both new signatures are 2D, so the phone version is the same component, stacked and tappable (targets ≥ 44 px).
- Acquisition: controls → week → scored list → draft.
- Invoicing: client buttons → four documents top to bottom, joined by vertical connectors → reminder lane. On tablet the four documents sit 2 × 2.

**Reduced motion.** The finished state with no travel. Rows don't slide, the pulses and connector fills are off, and every control still works instantly. There were 0 console or hydration errors across 30 reduced-motion shots.

**Example data** (fictional, labelled "Voorbeeld"):
- Prospects: De Vries Installatie (Pieter de Vries), De Wit Bouw (Jos de Wit), Jansen Logistiek (Peter Jansen), Bakker Advocaten (Sanne Bakker). You confirmed the names.
- Invoicing: example amounts at € 95/hour; every VAT figure is exact to the cent.
- Tools named: HubSpot, Urenregistratie ("Time tracking" in EN), Moneybird and Mollie, all from the confirmed list.

Shots: `docs/service-pages-phase4/before/` (phase 3 build) and `after/` (final build; all 5 signatures × NL/EN × 390/768/1440, reduced motion).

## 2. Scores (ae-anti-vibe, /24, from the final screenshots and motion frames)

| Section | Purpose | Hierarchy | Composition | Illustration | Typography | Motion | Honesty | Robustness | Total |
|---|---|---|---|---|---|---|---|---|---|
| Brand panel | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | **24** |
| Acquisition | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 3 | **22** |
| Invoicing | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | **23** |

Every criterion is 2 or higher, and composition and motion are 3 on all three.

Brand panel:
- **Composition 3:** one control row, one card.
- **Motion 3:** unchanged, and the switch no longer jumps.
- **Robustness 3:** found and fixed a keyboard bug (section 3).

Acquisition:
- **Motion 3** (from frames at 0 / 100 / 350 / 600 ms):
  - rows slide across the "fits / not a fit" line, and scores roll inside a clipped box;
  - the group labels now pass behind the moving rows, not through them (fixed after the first frame check).
- **Hierarchy 2:** the weekly numbers compete a little with the list.
- **Typography 2:** "Zakelijke dienstverle-ning" hyphenates on phones.

Invoicing:
- **Motion 3:** the first frame check showed the highlight jumping in all four documents at once. Now a pulse travels hours → invoice → payment → booking, 0.15 s apart, with the connectors filling on the same beat.
- **Hierarchy 2:** four equal cards; the cobalt line does the guiding.

## 3. QA

| Check | Result |
|---|---|
| Type-check and production build | Pass |
| First Load JS (service pages) | **177 KB**, unchanged (budget 180) |
| Islands (gzip, budget 12 KB each) | Acquisition **3.0 KB** · Invoicing **3.4 KB** · Brand 7.3 KB (was 6.9) |
| axe | **0 violations on 24 checks** (home + 5 services, NL/EN, phone/desktop) |
| Contrast during animation | **0 failures in 372 samples.** axe ran on the hero stage every ~0.35 s while the story played, on all 5 services at 1440 and 390. I first checked that axe does catch text at reduced opacity: at 20 % it measured 1.05:1. |
| CLS | **0.000 on every Lighthouse run** |
| Reduced motion | 30 shots, 0 console or hydration errors |
| Homepage regression | **33 of 36** sections pixel-identical to `docs/homepage-v4/after`; the other 3 differ by at most 2 brightness levels in photos (same as phase 3) |
| Keyboard only | All 5 signatures, NL + EN, desktop + phone, reduced and full motion (details below). |

Keyboard results:
- Tab order follows the reading order:
  - Brand 12 stops (13 with "Uit elkaar halen");
  - Acquisition 14;
  - Operations 10;
  - Invoicing 7;
  - Reporting 4.
- Every stop has a visible focus ring and is at least 44 px high.
- Enter and Space work on every control.
- Escape is harmless: no signature opens anything that Escape should close.
- **Bug found and fixed:** Brand's "Uit elkaar halen" button was disabled during its own animation, so the browser dropped keyboard focus and a second Enter or Space did nothing. It now stays focused (`aria-disabled`).

### How the hero fade fix works
WCAG AA needs 4.5:1, and muted text (`slate` on white) only reaches that at about 92 % opacity. So no opacity is both a visible fade and AA-safe for that text. Instead:
- Any element in a hero story that holds text is either hidden or at ≥ 97 % opacity. It appears where its fade used to start, and its slide still carries the motion.
- Shapes without text (bars, dots, fills) keep their smooth fades.
- Where one text replaces another (Invoicing totals and notes, Acquisition approval, Operations file names and the checklist), the new text now starts after the old one has gone, so they never overlap.
- The Invoicing reminder note used `text-warn` (3.6:1 on white, which fails even at full opacity). It's now ink text with an amber dot.
- The new signatures follow the same rule: changing numbers roll inside a clipped box, and drafts slide in at full opacity.

Result: Lighthouse accessibility on Reporting and Invoicing went from 96–97 to **100**, NL and EN.

### Lighthouse mobile (final build)
Only clean runs count: server response under 100 ms. A slower response on a static page means the machine was busy. Every run of this final batch was clean. NL and EN runs alternated. Brand ran 5× per language, as you asked; the other routes ran 3×.

| Route | NL runs | NL median | EN runs | EN median |
|---|---|---|---|---|
| Home | 93 · 92 · 93 | **93** | 93 · 94 · 86 | **93** |
| Brand | 95 · 91 · 94 · 92 · 92 | **92** | 91 · 90 · 91 · 92 · 92 | **91** |
| Acquisition | 92 · 92 · 92 | **92** | 92 · 92 · 92 | **92** |
| Operations | 91 · 92 · 89 | **91** | 93 · 92 · 92 | **92** |
| Invoicing | 92 · 89 · 94 | **92** | 92 · 83 · 90 | **90** |
| Reporting | 91 · 92 · 89 | **91** | 91 · 91 · 92 | **91** |

- **Accessibility, best practices and SEO: 100 on every run.**
- **CLS: 0.000 on every run.**
- **Open point:** simulated mobile LCP is 2.7–3.7 s, above the skill's 2.5 s target. That is unchanged from phase 3. The LCP element is the hero headline under Lighthouse's simulated slow-4G phone; a real-network check is part of PageSpeed Insights after deploy.

## 4. EN Brand: what it was

1. **Not the page weight.** NL and EN load the same scripts, fonts and images: 409 vs 410 KB and 945 DOM nodes each.
2. **The trace.** Framer-motion (chunk 822) spent 1,773 ms on the main thread in EN versus 103 ms in NL. A profile at 4× CPU slowdown showed EN animating throughout (4.7 s of rendering work) while NL sat idle.
3. **The cause.** The hero story starts when 35 % of its stage is visible. The NL headline wraps to 4 lines on a phone, so only 28 % of the stage is visible at load and the story waits. The EN headline is 3 lines, so 40 % is visible and the story starts during load. Starting it arms the clock, re-renders the moment and measures its layout, all while the page is still hydrating. Lighthouse counts that as blocking time.
4. **The fix.** Stories now wait for page load plus browser idle (at most 2.5 s) before they arm or play. On a real visit the animation starts about a second later. Nothing else changes.
5. **Before and after**, alternating NL/EN runs, keeping only clean runs (server response under 100 ms):

| | Runs | Median | Blocking time |
|---|---|---|---|
| EN Brand, before the fix | 77 · 87 · 67 · 86 · 90 | 86 | 150–1,950 ms |
| EN Brand, after the fix (final batch) | 91 · 90 · 91 · 92 · 92 | 91 | 64–145 ms |
| NL Brand, same batch | 95 · 91 · 94 · 92 · 92 | 92 | 80–176 ms |

EN is now within a point of NL, so the trace shows no remaining real difference. The machine was heavily loaded throughout (load average 6–17, from macOS's kernel_task and fileproviderd), which is why only clean runs count. EN Brand is above 90, so it needs no separate launch-checklist line; it is still covered by the general "PageSpeed Insights after deploy" item.

## 5. Decisions you made (applied)
1. **Peter Jansen and Sanne Bakker:** kept.
2. **Hero fades:** applied on all five services, with text readable at every frame; Reporting and Invoicing re-checked (100).
3. **Acquisition:** the sticky profile column on desktop is kept.
4. **Invoicing:** the reminder lane stays always visible.

## 6. Files touched
- **New:**
  - `components/blocks/service-signature/acquisition/Acquisition.tsx`
  - `components/blocks/service-signature/invoicing/Invoicing.tsx`
- **Signatures:**
  - `schema.ts` (new kinds, with checks that every id points at something in the block);
  - `Signature.tsx`;
  - `brand/Brand.tsx` (panel, switch row, focus fix).
- **Hero moments:**
  - `components/blocks/services/moments/clock.tsx` (text legibility, start after settle);
  - `Acquisition.tsx`, `Operations.tsx` and `Invoicing.tsx` in the same folder (sequential swaps, reminder-note colour).
- **Content:**
  - `lib/i18n/nl.ts` and `en.ts` (signature content);
  - `lib/content/local.ts` (all five signatures, Brand proof block gone);
  - `wordpress/acf-json/group_service_sections.json` (`acquisition` and `invoicing` layouts).
- **CSS:** `app/globals.css` (connector fill and pulse, both off under reduced motion).
- **Skills:**
  - ae-headless-wp (layouts);
  - ae-design-system (signatures);
  - ae-motion (legible text, story start, focus on busy buttons).
- **Docs:** `docs/launch-checklist.md` (real-device steps for Acquisition and Invoicing).

## 7. Site status

> Superseded on 19 Oct 2026 by the site status in `docs/other-pages-report.md` §7 (phase 5). Kept here as it was at the end of phase 4.

| Page | Status | Open |
|---|---|---|
| **Home** (`/nl`, `/en`) | Finished (homepage v4): hero engine, run log, process track, service explorer with five moments, case proof, why us, closing CTA. Headless-ready (blocks + ACF shapes). | The demo video in the services section is English-only on /nl. You haven't yet decided on my v4 recommendation to move it to About. |
| **5 service pages** | Finished: hero with moment → signature → process → scope with tools → principles → FAQ → other services → closing CTA. Headless-ready. | Vendor logo checks (launch checklist §1). |
| **Case: Energielabel Breda** | Built and live in the nav. Its figures are the sourced ones from the approved case. | Copy comes straight from `lib/i18n` (not yet through the content layer). New service and contact facts await your OK (launch checklist §2). |
| **About** | Built: intro with photo, story, values, where we work, CTA. Checked in the v4 round (axe 0, no hydration errors). | Not yet headless-ready (reads `lib/i18n` directly). |
| **Contact** | Built: form, contact options, Cal.com link after sending. | Email sending needs Resend (below). Not yet headless-ready. |
| **Blog** | Index and article template built. | All 4 posts are "Binnenkort" (coming soon); none written. The newsletter form isn't connected to a mailing tool (copy suggestion #6 proposes hiding it). **Bug:** the header's "Nieuwsbrief" link goes to `/#newsletter`, but the form is on `/blog`, so the link lands nowhere. Not fixed in this phase. |

**Open in `docs/launch-checklist.md`:**
- §1: 7 vendor logo checks (WordPress, Blender, Next.js, Vercel, HubSpot, Stripe, DocuSign).
- §2: the new Brand proof wording for the service and contact pages.
- §3: PageSpeed Insights after deploy; real-device tests for all five signatures; reduced motion on a device; copy proposals; vendor answers.

**Before launch:**
1. **Resend:** create the account, verify the `assembly-engine.com` sending domain (DNS), and set `RESEND_API_KEY` (plus `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`) in production. Without a key, form submissions are only logged on the server and no email is sent.
2. **Cal.com:** create the 30-minute intro event at `cal.com/nick-assembly-engine/30min` (or set `NEXT_PUBLIC_CAL_LINK` to your own link) and check that it opens after the form is sent.
3. **Deploy:** host, production domain, environment variables, and a quick check of all routes on the live URL.
4. **PageSpeed Insights** on the live URL (launch checklist §3), including `/en/services/brand-digital-presence`.
5. **Real-device tests** of the five signatures, on a phone and a laptop (launch checklist §3).
6. **Vendor logo checks** (launch checklist §1).
7. **Smaller items:**
   - write or hide the blog posts;
   - hide or connect the newsletter;
   - fix the "Nieuwsbrief" nav link;
   - decide on the demo video;
   - approve or drop `docs/copy-suggestions.md`.
