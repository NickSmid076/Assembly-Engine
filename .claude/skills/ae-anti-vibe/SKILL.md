---
name: ae-anti-vibe
description: Catches "vibe coded" giveaways on the Assembly Engine website (glow blobs, gradient text, identical card grids, invented stats, motion on everything and more), gives the fix for each, and scores a section 0–3 on eight criteria. A section only ships when it passes the bar. Use when reviewing, auditing, scoring or finishing any section or page of the site.
---

# Anti-vibe check

"Vibe coded" means a page that looks generated: the same moves every AI landing page makes, chosen
because they're easy, not because they explain the product. Assembly Engine sells judgement and
craft to skeptical business owners, so these giveaways cost trust directly.

Use with `ae-design-system` (what's allowed) and `ae-section-composer` (what to do instead).

## The giveaways and their fixes

| # | Giveaway | Why it hurts | Fix |
|---|---|---|---|
| 1 | **Glow blobs** — big blurred radial gradients drifting behind content (`hero-glow`, radial `rgba(46,91,255,…)` washes) | Generic "AI startup" atmosphere; says nothing | Remove. Let the frame hairlines, a product scene or a real photo carry the space. A flat ink field is fine. |
| 2 | **Gradient text** (`bg-clip-text text-transparent` with a cobalt gradient) | The most common AI-landing tell; lowers legibility | Solid colour. On dark use `peri` or `white/45` for the second tone; on light use `slate`. |
| 3 | **Identical card grids** — 3/4/5 equal bordered cards, each icon + title + 2 lines | Reads as a template; every item looks equally (un)important | Choose a composition that matches the content's shape: a sequence becomes a numbered timeline or stepper with one active step and a scene; a comparison becomes a two-column ledger; a set of benefits becomes hairline rows with one expanded. Max one icon-card grid per page. |
| 4 | **Invented or padded stats** — counters that animate to 1, "5 services", metrics without a source | Skeptics notice; it reads as filler | Only show numbers with a source and a date (see PRODUCT.md evidence). Never count up a number below 10. A fact that isn't a measurement (e.g. "one partner") is a sentence, not a stat. |
| 5 | **Motion on everything** — every block fades/blurs/slides in; pulsing dots; ping badges; floating cards; infinite marquees | Noise; slows reading; feels like a template demo | Follow `ae-motion`: motion only where it explains a change or a sequence. Static is the default. No ping/pulse except one genuine "live" indicator inside a scene. |
| 6 | **Pill eyebrows + two-tone headline + subcopy + 2 buttons, centred, on every section** | Every section has the same skeleton | Vary the entry: some sections lead with the scene, some with a number, some with a list. Max one centred hero-style section per page besides the hero. |
| 7 | **Fake app chrome as decoration** — traffic-light dots, URL bars and "LIVE" badges that frame nothing real | Theatre | Use `AppFrame` only when the window shows a real workflow of the service. Keep chrome quiet; the content inside must be specific. |
| 8 | **Vague benefit copy** — "Seamless", "Supercharge", "Built for the future", "Nothing generic" | Says nothing a competitor couldn't | Propose specific copy (who, what document, which tool, what changes on Monday) via `docs/copy-suggestions.md`. |
| 9 | **Emoji / icon as illustration** — a 20px icon in a circle standing in for explanation | Lazy and interchangeable | Replace with a small product scene, a diagram or a real artefact (invoice, checklist, email). |
| 10 | **Dark mode glassmorphism** — `backdrop-blur` cards, `white/5` panels stacked three deep | Generic; low contrast | One raised level on dark (`ink-2`), solid borders. Blur only on the sticky header. |
| 11 | **Over-rounded everything** (`rounded-[24px]` cards with 2px cobalt borders) | Toy-like; off-system | Radii from the design system: cards `rounded-xl`, hairline borders. |
| 12 | **Redundant CTAs** — a CTA after every section, two different primary button styles | Desperation; inconsistency | One primary CTA style (`.btn-primary`). CTAs at the hero, after the proof, and at the close. |
| 13 | **Lorem / placeholder leaking** — "Coming soon" posts in prime position, fake form success | Breaks trust | Hide unfinished things or label them honestly and move them down. |
| 14 | **Mismatched embeds** — iframes with their own fonts, buttons and colours | The page feels assembled from parts | Port to native components on the design system, or restyle the embed to match exactly. |
| 15 | **Untranslated fragments** — English text, labels or video on the Dutch site | Feels careless to the main audience | Every string, label and media asset exists per locale. |

## Scoring

Score each section on eight criteria, 0–3 each (max 24). Write the score with a one-line reason per
criterion, citing what you saw in the screenshot, not what the code intends.

| Criterion | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **Purpose** — one clear idea the visitor should take away | Unclear what the section is for | Idea present but buried | Clear idea, some padding | One idea, instantly legible, nothing extra |
| **Hierarchy** — eye lands in the right order | Competing focal points | Order exists but weak | Clear, minor competition | Unmistakable first, second, third read |
| **Composition** — layout fits the content's shape | Template grid that ignores the content | Generic layout, works | Considered, fits content | Distinctive and inevitable; couldn't be another site |
| **Illustration** — visuals explain the product | Decorative or none where needed | Generic icons | Relevant scene/diagram | Shows the actual workflow with specific example data |
| **Typography** — scale, measure, breaks, both languages | Broken (overflow, orphans, cut words) | Works in one language/size only | Solid everywhere | Refined: balanced breaks, tabular numbers, perfect NL compounds |
| **Motion** — purpose and restraint | Distracting or broken under reduced motion | Decorative but harmless | Purposeful, consistent | Motion clarifies a change; perfect static fallback |
| **Honesty** — facts, sources, labels | Invented claims or stats | Unsourced claims | Sourced, minor vagueness | Every claim specific and sourced; examples labelled |
| **Robustness** — phone/tablet/desktop, a11y | Broken at a size or inaccessible | Usable, visible flaws | Clean, minor nits | Clean at all sizes, keyboard and screen reader fine |

**Ship bar:** total ≥ 19/24, **no criterion below 2**, and none of the giveaways above present
(or each one justified in writing). Sections below the bar go back into `ae-elevate`.

Typical reading: 0–11 vibe-coded, 12–18 competent but generic, 19–21 crafted, 22–24 Attio-level.

## How to run the check

1. Get screenshots from `ae-visual-qa` (phone + desktop, NL at minimum). Look at them.
2. Walk the giveaway table; list every hit with `file:line`.
3. Score each section. Be strict: a 3 needs evidence in the screenshot.
4. Output a table: section · score /24 · lowest criterion · top giveaways · biggest single improvement.
