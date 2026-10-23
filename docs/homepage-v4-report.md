# Homepage v4 · report

Date: 18 Oct 2026. Scope: every homepage section except the five service moments (locked after Step 1; only
integration fixes). Plan: `docs/homepage-v4-plan.md`. Before/after shots of every section, 1440 and 390, NL and EN:
`docs/homepage-v4/before/` and `docs/homepage-v4/after/` (named `{locale}-{desktop|phone}-{NN}-{section}.png`).
Before = the homepage at the start of v4, reduced motion (end states); after = the same capture now.

## 1. Scores (ae-anti-vibe + taste, from the screenshots)

Criteria: Purpose · Hierarchy · Composition · Illustration · Typography · Motion · Honesty · Robustness (0–3 each).

| Section | Before | After | Pu | Hi | Co | Il | Ty | Mo | Ho | Ro | What changed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Header | 18 | 19 | 3 | 2 | 2 | 2 | 3 | 2 | 3 | 2→3 | Tap targets ≥ 24px (logo, nav links); language switch text 11.5 → 12px. Otherwise unchanged on purpose. |
| Hero | 13 | 22 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | Facts row removed; shorter headline (3 lines at 390, no hyphen); tighter headline → intro gap; each 3D module carries a glyph that echoes its service moment, names itself on hover/focus and opens that service on click; the 3D plays once and holds. |
| How it runs | 13 | 22 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 2 | Rebuilt as a run log on the shared story clock: three example starts (tabs), each step lands in the log with tool and time, one person step that waits for approval, then "finished". Points on the left mark the part of the run they talk about. |
| Process | 17 | 21 | 3 | 2 | 3 | 2 | 3 | 3 | 3 | 2 | Bracket "Live binnen 4 weken" over steps 1–4, dashed "Doorlopend" over step 5; stops light up as the scroll fill passes; the go-live stop lands with a spring. Phone: the bracket becomes two group labels. |
| Services (locked) | — | — | | | | | | | | | Integration only: locale-aware video source; the story clock's arm/play race fixed (see §6). |
| Proof | 18 | 22 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 2 | Window dots gone (plain address bar); every figure has its own source and date; "3 → 20+" leads and plays its change once (3, the arrow draws, 20+); the three PageSpeed scores sit as one group under one source line; the phone shot settles onto the desktop shot. |
| Why us | 15 | 20 | 3 | 3 | 3 | 2 | 3 | **2** | 2 | 2 | The statement leads (larger heading, smaller portrait beside it); the five promises are a numbered ledger across the frame; copy #3 and #4 rewritten (§4). |
| Closing | 19 | 23 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | Clock in Manrope; the three "done" items are now small artefacts from the moments (week 43 report, invoice 2026-0142, follow-up Visser Transport) that land at 07:00; one primary CTA + one ghost. |
| Footer | 17 | 20 | 3 | 3 | **2** | 2 | 3 | **2** | 3 | 2 | One tone step down (ink-2) so it no longer merges with the closing chapter; on the frame lines; sentence-case labels; second primary CTA removed; legal text 13px at ≥ 65% white; tap targets ≥ 24px. |

**Below your target (composition and motion at 3):**
- **Why us · motion 2.** Its motion is only the shared entrance stagger. There's no change or sequence in it to show, and adding one would be decoration.
- **Header and footer · composition and motion 2.** They are page furniture. They now follow the frame and the tone sequence, but I didn't give them motion.

Say if you want either pushed further.

## 2. One page

- **Rhythm** (no two neighbours the same):

  | Section | Tone | Spacing |
  |---|---|---|
  | Hero | ink | — |
  | How it runs | white | 112 |
  | Process | paper | 96–128 |
  | Services | ink | — |
  | Proof | white | 112–128 |
  | Why us | paper | 112–128 |
  | Closing | ink | 144 |
  | Footer | ink-2 | — |

- **Thread:** a cobalt line draws down the left frame line as you scroll, from the hero to the closing (desktop only, transform only, hidden with reduced motion; `components/blocks/PageThread.tsx`).
- **Hand-offs between sections:**
  - The run ends in "finished".
  - The process track ends at "Doorlopend" just above the ink services chapter.
  - The hero modules carry the same glyphs as the five service moments, and so do the closing artefacts.
  - The 07:00 run in "How it runs" comes back as the closing clock.
- **CTA rule:** one primary style (`.btn-primary`) at the hero and the closing; the sticky header carries it everywhere else. Ghost buttons only for "see more" (process, case, about, services). The footer's own primary CTA is gone.

## 3. QA

**Production build** (`.next-qa`, `next start`):

| Check | Result |
|---|---|
| `npm run build` | Passes |
| Home First Load JS | 177 KB (Step 1: 175, v3: 172) |
| Lighthouse mobile /nl (two runs) | Performance 94 · 94; Accessibility, Best practices, SEO 100; LCP 2.7–3.1 s; CLS 0; TBT 70–170 ms |
| Lighthouse mobile /en (two runs) | Performance 93 · 96; Accessibility, Best practices, SEO 100; CLS 0 |
| Lighthouse desktop /nl | 100 · 100 · 100 · 100; LCP 0.7 s |
| `shoot.mjs`, reduced motion, 390/768/1440, NL + EN | Overflow 0, cut text 0, CLS 0, console errors 0 on /nl, /en, /nl/about, /en/about and the service pages |
| `shoot.mjs`, full motion, /nl and /en | Overflow 0, CLS 0, console errors 0 |
| Hydration warnings (About, service pages, home, reduced motion) | None |
| axe | 0 violations on /nl, /en, /nl/about, /en/about at phone and desktop |

`shoot.mjs` notes:
- In full motion, 2 "cut text" hits on phone are the Brand moment's card caught mid-flight (known false positive from Step 1).
- One explorer button in the locked services section is flagged as a small tap target (unchanged since Step 1).

Other checks:
- **Reduced motion:** every section shows its end state (the run finished, track full, all stops lit, clock at 07:00 with the artefacts, figures complete). The thread is hidden.
- **No JS:** the SSR HTML is the same finished state.
- **Long Dutch words:** "Websiteaanvraag" in the run tabs and "Toegankelijkheid" in Proof hyphenate on phone. "Bedrijfsresultaat" in Why us goes on its own line.

**3D bundle:**
- three core, renderer and r3f together are ≈ 249 KB gzip, plus the 8 KB scene.
- They are lazy chunks: never in First Load, and they load only on desktop with motion allowed.
- Phone and reduced motion get the SVG poster.
- @react-three/drei is uninstalled.

**Re-check of the service pages and About:**
- **Fixed:** the hydration errors.
- **Fixed regression:** with reduced motion, the service pages' capabilities marquee was a clipped static row (16 cards cut off). It is now every capability once, wrapping inside the frame.
- **Still open on the service pages (pre-existing, not touched):**
  - axe colour contrast on the faded step labels (`text-ink/35`) and the small status pills in the hero scene;
  - a horizontal scroll strip without keyboard focus.

  These are listed for the next pass, since you asked me to stop before other pages.

## 4. Copy before → after

| Where | Before (NL / EN) | After (NL / EN) |
|---|---|---|
| Hero headline | Bedrijfsautomatisering gebouwd voor zakelijke dienstverleners / Business Automation Built for Professional Services Firms | Automatisering voor **zakelijke dienstverleners** / Automation for **professional services firms** |
| Hero facts row | 5 · 4 wk · 1 | Removed (the 4 weeks now lives on the process track) |
| Run heading | Eén trigger. Het hele werk gedaan. / One trigger. The whole job, done. | Eén aanvraag. De rest gaat vanzelf. / One request. The rest runs itself. (your wording) |
| Run intro | … start de run. | … zet alles in gang. (EN unchanged) |
| Process track labels | Eerste gesprek · Live binnen 4 weken · Na livegang / First call · Live within 4 weeks · After launch | Bracket: Live binnen 4 weken · Doorlopend / Live within 4 weeks · Ongoing; steps numbered 01–05 |
| Why us #3 (Gebouwd rond uw werkwijze) | Niets standaards. Elk systeem past bij hoe u werkt. / Nothing generic. Every system fits how you work. | **We brengen eerst in kaart hoe uw team nu werkt, en bouwen daaromheen.** / **We first map how your team works today, then build around it.** |
| Why us #4 (Wij houden het draaiende) | U krijgt resultaat, geen extra project. / You get results, not another project. | **We bewaken elke automatisering en passen die aan als uw werk verandert.** / **We monitor every automation and adjust it when your work changes.** |
| Closing "done" items | Rapportages ververst · Facturen verstuurd · Opvolging ingepland | Rapportage: Weekoverzicht week 43 (Microsoft 365 · naar 3 partners, Verstuurd · 07:00) · Facturatie: Factuur 2026-0142 (Jansen Logistiek · € 1.264,45, Verstuurd · 07:00) · Acquisitie: Opvolging Visser Transport (HubSpot · Anne · vrijdag, Ingepland · 07:00). EN equivalents. Fictional, same data as the moments, under the "Voorbeeld" label. |
| Proof sources | One line under all figures | One source per figure or group (PageSpeed Insights 15 okt 2026; old sitemap Apr vs new site Oct 2026; local Lighthouse lab 14–15 okt 2026) |

Why #3 and #4 read this way:
- **#3:** "Nothing generic" is a claim every agency makes. The new line says what we do first, and it matches process step 01.
- **#4:** it names the work (monitor, adjust) and matches step 05.
- In #4 I wrote "die" instead of the draft's "hem": "automatisering" is a de-word, and "hem" reads as spoken Dutch in formal copy.

## 5. The demo video: recommendation

**Recommendation: move it to the About page (or a future "Hoe het werkt" page) and take it off the homepage.** I haven't moved it; that needs your OK. Until then it stays, with its source locale-aware.

Why:
- It shows the same five services that the moments now show right above it, in the same order. It adds 45 s of viewing to a section that already explains itself.
- It's English-only: voice-over and on-screen UI. On /nl that's the only English on the page.
- It weighs 12.1 MB. It only loads on play, but it's the heaviest asset on the page.

On About it would give a skeptical reader a "watch it end to end" after they've met the person.

**Locale-aware source:** if `public/video/assembly-engine-demo-nl.mp4` exists, /nl uses it; otherwise /nl falls back to the English file. Today there is no NL file, so both pages play the English video.

The new video you sent replaced `public/video/assembly-engine-demo.mp4` (45 s, 1280×720), with a new poster frame. The old file and poster are archived in the session scratchpad.

## 6. Bugs fixed along the way

- **Story clock:** a jump scroll (anchor link, or the phone opening mid-page) could report "in view" before "near". Then nothing played and nothing retried, and the run sat on a blank first frame. Both orders are now handled. This sits in `services/moments/clock.tsx`, shared with the moments; it's an integration fix only, and their choreography is unchanged. The note is added to `ae-motion`.
- **Reduced-motion hydration errors:** fixed on About, the service pages and the marquee (`lib/useReducedMotionSafe.ts`, `components/MotionRoot.tsx`).
- **Run on phone:** the time no longer touches the tool name (it sits above the step on narrow stages).
- **Section capture:** the QA script missed the sections after the thread wrapper was added; fixed in the scratchpad script.

## 7. Files changed

**New**
- `components/blocks/how-it-runs/Run.tsx`, `RunStage.tsx`, `RunSection.tsx`
- `components/blocks/PageThread.tsx`
- `lib/useReducedMotionSafe.ts`, `components/MotionRoot.tsx`
- `wordpress/acf-json/group_home_sections.json` (ACF draft: one flexible-content layout per home block: hero_home, how_it_runs, process, services, proof, why_us, closing_cta)
- `docs/homepage-v4-plan.md`, `docs/homepage-v4-report.md`, `docs/homepage-v4/`

**Changed**
- **Hero:**
  - `components/blocks/hero-home/HeroHome.tsx`, `EngineVisual.tsx`, `EngineCanvas.tsx`, `EnginePoster.tsx`, `engine-geometry.ts`, `schema.ts`
  - `components/blocks/services/Explorer.tsx` (opens a service from a hero module)
- **How it runs:** `components/blocks/how-it-runs/HowItRuns.tsx`, `schema.ts`
- **Process:** `components/blocks/process/Process.tsx`, `Track.tsx`, `schema.ts`
- **Proof:** `components/blocks/proof/Proof.tsx`, `schema.ts`
- **Why us:** `components/blocks/why-us/WhyUs.tsx`
- **Closing:** `components/blocks/closing-cta/ClosingCta.tsx`, `Clock.tsx`, `schema.ts`
- **Services moments:** `components/blocks/services/moments/clock.tsx` (arm/play race)
- **Header and footer:** `components/Header.tsx`, `components/Footer.tsx`
- **Other pages:** `components/About.tsx`, `components/ServicePage.tsx` (hydration fixes; reduced-motion capabilities)
- **App:** `app/[locale]/layout.tsx` (MotionRoot), `app/[locale]/page.tsx` (thread), `app/globals.css`
- **Content:** `lib/i18n/nl.ts`, `lib/i18n/en.ts`, `lib/content/local.ts`, `lib/content/types.ts`
- **Media and dependencies:**
  - `public/video/assembly-engine-demo.mp4` and the poster (new video)
  - `package.json` (drei removed)
- **Skills:** `.claude/skills/ae-motion/SKILL.md`, `.claude/skills/ae-design-system/SKILL.md`

**Archived:** `archive/homepage-v3/RunEngine.tsx`.

## 8. Decisions needed

1. **Video:** move it to About and off the homepage? And do you want a Dutch version? Drop it in as `assembly-engine-demo-nl.mp4` and /nl picks it up.
2. **Footer CTA:** I removed the footer's primary button sitewide, because the closing section and sticky header carry it. OK?
3. **New strings to approve:**
   - "Doorlopend" / "Ongoing";
   - the three closing artefacts (§4).
4. **Why us motion is at 2.** Keep it static (my recommendation), or should I find a change worth showing?
5. **Service-page axe findings (§3):** fix them in the next pass?
6. **Footer links:** "Privacy" and "Voorwaarden" still link to `#`. Do you have pages or URLs for them?
7. **Unused string:** `home.proof.source` is no longer used (each figure carries its own source). OK to remove it?

I've stopped here and won't touch any other page until you've reviewed.
