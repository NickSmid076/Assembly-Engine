# Homepage v3 · plan

Date: 17 Oct 2026 · Routes: `/nl`, `/en` · Skills: ae-* (design system, anti-vibe, section composer, motion,
headless-wp, visual-qa, elevate), design-taste-frontend (v2), framer-motion, threejs-*, web-design-guidelines.

## Baseline (round 0)

Screens viewed: 390 / 768 / 1440 × NL / EN (`v3-base`, 87 slices). Automated: overflow 0, cut text 0,
CLS 0, **1 console error per route** (DemoVideo hydration mismatch under reduced motion).

| Section | /24 | What the screenshots show |
|---|---|---|
| Hero (rebuilt in the test) | 22 | Holds. NL headline is 5 lines on a phone (copy proposal #2). |
| Demo video | 14 | Scroll tilt + scale, shadow glow, 8.6 MB file with `autoPlay`, English UI on NL. |
| How we work | 12 | Five identical cobalt-outlined cards, 01–05, mono detail text in cobalt. |
| Who we are | 16 | Radial glow; a claim with no proof next to it. |
| Services | 16 | Strong scenes, but 15 scenes ≈ 7 desktop screens; 4-line two-tone heading. |
| Hours band (iframe) | 11 | Separate world: own fonts, own buttons, centred 3-line headline, glow. |
| Advantages + morph (iframe) | 8 | Icon cards, and an **empty 600px box** under reduced motion (B3). |
| Blog teaser | 13 | Four "Coming soon" posts, a 4-line heading, decorative bar code strip. |
| Newsletter | 13 | Fake success message. |

Taste-skill critique (round 0): design 6 · usability 7 · creativity 6 · content 6 → **6.3**. Caps hit:
eyebrows + mono labels + 01/02 numbering + glows (≤ 6.5). No proof section on the page at all; the one
real case (Energielabel Breda) is only in the nav.

## Narrative

The page answers seven questions in order, one section each, and every section carries the same idea:

> **On this page, the name "Assembly Engine" — separate parts that become one running system — becomes
> the page's device:** modules that assemble in the hero, a run that you can watch, a process with a fixed
> four-week length, five services that click into one machine, one measured case, and a closing screen
> where the work is already done at 07:00.

The live thing is the example run: the visitor picks a workflow and watches it execute (existing
`HeroEngine`, moved out of the hero to where it explains "how it works").

## Sections

| # | Block (`acf_fc_layout`) | Single job | Pattern | Ground | Motion |
|---|---|---|---|---|---|
| 1 | `hero_home` | What we do and for whom, with the main action | split: copy left, assembly engine right | ink | **Three.js** assembly (desktop), static SVG poster first |
| 2 | `how_it_runs` | How it works: one trigger, the whole job done, live | P1 split_scene (statement + live run) | white | run timeline (existing), tabs; reveal |
| 3 | `process` | How working with us goes, and how long | P4 timeline: one horizontal track, 5 stops, "4 weeks" scale | white → paper step | Framer scroll-linked track (`scaleX`) |
| 4 | `services` | The five services, each in one look, plus the video | P2 chapters as a tabbed explorer: list + one scene + the demo video | ink | Framer `AnimatePresence` scene swap; video poster-first |
| 5 | `proof` | Proof: one real, measured case | P6 proof: big numbers from PageSpeed + link to the case | white | count-free; reveal |
| 6 | `why_us` | Why us: the person and the five commitments | P9 person + P7 rows | paper | reveal rows |
| 7 | `closing_cta` | Next step: the free audit | P11 cta with the "07:00, work done" clock (native port of the hours band) | ink | clock ticks once to 07:00, checks land; static under reduced motion |

Removed from the home page: **Blog teaser + newsletter** (all posts are placeholders; the newsletter shows
a fake success). Both stay reachable via the footer and `/blog`. Merged: Who we are → `how_it_runs` and
`why_us`; Advantages → `why_us` rows; Hours band → `closing_cta`; service-morph iframe → dropped (its job
is done by the services explorer).

## Three.js

**Used once: the hero.** The name is literal: a chassis plate with traces, five service modules and a
cobalt core drop into their slots and the traces light up, then a signal pulse runs from module to core
every few seconds. Pointer tilts the assembly ±4°; scrolling the hero out lifts the modules apart a little
(an exploded view). Depth is the point here: stacked modules on a plate read as "a built system" in a way
a flat diagram doesn't.

- Isometric orthographic camera, so the server-rendered SVG poster uses the same projection and the canvas
  fades in over it without a jump.
- `next/dynamic(..., { ssr: false })`, loaded after `load` + idle; only at ≥ 1024px and without
  reduced motion. Phone/tablet/reduced motion keep the SVG (no 3D download).
- Frame loop stops off-screen and when the tab is hidden; DPR capped at `[1, 2]`.
- Budget: 3D chunk < 250 KB gzip, not in the initial bundle; LCP stays the H1.

**Not used for services.** The services are explained by product scenes (real UI of each workflow);
a 3D transition there would add spectacle and remove information.

## Framer Motion

Scene swaps (services, run tabs), the process track (`useScroll` → `scaleX`), button press. Entrances are
CSS (`data-reveal`, gated by `html.js` and `prefers-reduced-motion`) so the server HTML equals the client
HTML: this removes the reduced-motion hydration errors site-wide (B2). `lib/motion` keeps its API.

## WordPress readiness

`components/blocks/<block>/` = `index.tsx` (typed props, no copy) + `schema.ts` (zod; the TS type is
`z.infer`). `components/blocks/render.tsx` → `renderBlocks(sections)` maps `acf_fc_layout` to a block and
validates the props with zod (throws in dev, skips the block in prod). `lib/content/source.ts` is the one
entry: `getHomePage(locale)` from `CONTENT_SOURCE=local|wordpress`; the local adapter maps `lib/i18n`.

| Block | Key fields |
|---|---|
| `hero_home` | eyebrow, heading_parts[], body, primary_cta, secondary_cta, facts[], visual_label |
| `how_it_runs` | heading_parts[], body, points[], demo{labels, runs[]} |
| `process` | heading_parts[], body, duration_label, steps[{title,text,detail}] |
| `services` | heading, body, video{src,poster,label,caption,note,play,pause}, items[{name,lead,rest,link,scene}], example_label |
| `proof` | heading_parts[], client, body, metrics[{value,label}], source_note, link, secondary_link |
| `why_us` | heading_parts[], body, person{image,name,role}, items[{title,text}], link |
| `closing_cta` | eyebrow, heading_parts[], body, primary_cta, secondary_cta, clock{time, done[]} |

## Copy

New strings needed for new section headings and labels go into `lib/i18n` (both languages) and are
listed before/after in the report. Existing headlines are kept unless they break the two-line rule.
