---
name: ae-section-composer
description: How to design a section of the Assembly Engine website at Attio level — choosing a layout from a set of reusable section patterns, using the product-UI scenes as illustrations, and making each section explain one idea. Use when designing, rebuilding or adding any section or page on the site.
---

# Section composer

Attio-level means: calm, exact, product-led. Every section shows the product doing something
specific instead of describing it. The page is one continuous framed column with hairlines; sections
are chapters in it. Read `ae-design-system` first; check the result with `ae-anti-vibe`.

## Before you lay anything out

Answer these in one line each (write them in your plan):
1. **The one idea.** What should an owner of a Dutch firm believe after this section? ("Documents arrive complete without anyone chasing them.")
2. **The proof.** What shows it? A scene, a sourced number, a real artefact, Nick's photo. If nothing proves it, the section is copy, and it should be short.
3. **The shape of the content.** Sequence? Comparison? Set of equals? Single claim? One demonstration? The shape picks the pattern below — never the other way round.
4. **Its neighbours.** What's above and below (light/dark, dense/airy, centred/left)? Don't repeat the neighbour's pattern.

## Section patterns

Each pattern names its content contract (the fields it takes — see `ae-headless-wp`), its layout
and where it fits. Prefer these; invent a new one only when the content has a shape none of them fits,
then add it here.

### P1 · Statement + scene (`split_scene`)
- Content: eyebrow?, heading [lead, rest], body?, cta?, scene.
- Layout: 5/7 split; text left aligned to the frame's inner edge, scene right on a `Stage`. On phone: text, then scene full-width. Alternate sides between consecutive uses.
- Use for: a single capability with a demonstration. The workhorse.

### P2 · Sticky index + chapters (`chapters`)
- Content: items[{ name, heading, body, link, scene }].
- Layout: left column sticky index (numbered, active item marked by a 2px cobalt bar); right column chapters, each with a scene. On phone the index becomes a horizontal scroll strip under the header (account for both sticky heights in `scroll-mt`).
- Use for: the five services overview. Keep each chapter to one scene; detail lives on the service page.

### P3 · Stepper + live scene (`stepper`)
- Content: heading, steps[{ title, body, scene }].
- Layout: left list of steps (one expanded, with a thin progress line), right one scene that changes with the step. Auto-advance only while visible, pausable, stops on interaction (see `ae-motion`).
- Use for: "how it works" on a service page; the process (Discover → Improve) on the home page.

### P4 · Timeline ledger (`timeline`)
- Content: heading, steps[{ n, title, body, detail }].
- Layout: a horizontal hairline with numbered ticks on desktop (vertical on phone); each step is text on the line, not a card. The active/next step can carry a small artefact.
- Use for: a sequence where the steps matter more than a demo. Replaces 5-card grids.

### P5 · Demonstration band (`demo`)
- Content: heading?, caption, media (video or large scene), note.
- Layout: full frame width, media dominant, caption in mono under it. Dark or sunken background.
- Use for: the product video; a full workflow scene. Max one per page.

### P6 · Proof band (`proof`)
- Content: heading, figures[{ value, label, source, date }], note?.
- Layout: hairline grid of large numbers (Manrope bold, tabular) with label and **source + date** under each. Optional before → after.
- Use for: the case study results. Only real, sourced numbers. If there are fewer than 3, use a single large figure with its story.

### P7 · Hairline rows (`rows`)
- Content: heading, items[{ title, body, icon? }], aside?.
- Layout: full-width rows separated by hairlines, title left (1/3) and body right (2/3); optional small icon. One row can be expanded with a scene.
- Use for: advantages, principles, values — any set of equals. Replaces icon-card grids.

### P8 · Two-column ledger (`compare`)
- Content: heading, left{ label, items }, right{ label, items }.
- Layout: two columns with a centre hairline; "Today" vs "With Assembly Engine", aligned row by row.
- Use for: before/after of a workflow.

### P9 · Person (`person`)
- Content: photo, name, role, statement, body, cta.
- Layout: portrait (4:5) left, statement in large text right. Real photo only.
- Use for: About, and a short founder note on the home page.

### P10 · FAQ (`faq`)
- Content: heading, items[{ q, a }].
- Layout: heading left 1/3, `<details>` list right with hairlines.

### P11 · Closer (`cta`)
- Content: heading, body, primary cta, secondary cta?.
- Layout: dark chapter, centred, generous space. One per page, at the end.

### P12 · Logo/tool strip (`tools`)
- Content: label, items[] (`name`, `logo` image or null, `order`), 4–8 per page, tail line.
- Layout: monochrome vendor logos (black #000) at one optical height with generous spacing; two columns on
  phone, a wrapping row from `sm`. The name shows on hover/focus and is the alt text. A tool without an
  approved logo is set as its name in Manrope, never a fake or recoloured logo. No "partner" wording. Static;
  no marquee. Sources and guideline notes: `docs/logo-usage.md`.

## Product scenes as illustration

The service moments (`components/blocks/services/moments/`) and the service signatures
(`components/blocks/service-signature/`) are the illustration system. The old looping scene kit
(`components/ui/scenes.tsx`) was retired in Oct 2026 (archived in `archive/service-pages-v1/`). Use them
like an editor uses photographs: one strong image per idea.

- Pick the artefact the section talks about: the week report, the invoice, the dossier checklist, the pipeline, the brand guide.
- Data must be specific and plausible for a Dutch firm (real-looking dates, amounts in `€ 1.052,70` format, K3, btw-aangifte), fictional, consistent with the example cast, and labelled "Voorbeeld"/"Example".
- One demonstration per idea; make one dominant.
- Phone: full width and readable (UI text ≥ 13px, `truncate` or hyphenation, no horizontal scroll). 3D signatures get an interactive 2D phone version (`ae-ui-3d`).
- A new moment kind or signature: typed zod schema, choreography in code, a reduced-motion end state (`ae-motion`).

## Composition rules

- One focal point per section. Size and contrast decide it, not colour.
- Left-aligned by default. Centre only for the hero of an inner page and the closer.
- Use the frame: align text to the frame's inner padding; let scenes and media touch the frame lines when they should feel embedded.
- Density contrast between neighbours: an airy statement next to a dense demonstration.
- Light/dark alternation: no more than 3 light sections in a row on the home page; never two dark chapters in a row unless they're one continuous story.
- Each section ends cleanly: no orphan CTA buttons floating under content that didn't ask for one.
- Mobile is composed, not collapsed: reorder so the proof follows the claim directly; reduce scenes to their essential part when needed.

## Build checklist for a section

1. Content contract defined (fields + types) and fed from the content layer (`ae-headless-wp`), both locales.
2. Pattern chosen and written in a comment above the component (`// Pattern P3 · stepper`).
3. Design-system tokens only; no new colours, fonts or arbitrary sizes outside the scale.
4. Motion per `ae-motion`; static state is complete without it.
5. Screenshots via `ae-visual-qa` at phone/tablet/desktop in NL and EN, viewed.
6. Scored with `ae-anti-vibe`; ≥ 19/24, nothing below 2.
