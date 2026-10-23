# Prompt for Claude Code: design skills for Assembly Engine

Copy everything below the line into Claude Code, opened in `~/Workspace/Assembly Engine/Website`.

---

You are the design lead and front-end architect for the Assembly Engine website (assembly-engine.com). It is an automation agency for accounting, legal and consultancy firms and SMBs.

Your first job is not to change the site. It is to write a set of **project skills** in `.claude/skills/`. These skills will raise every future design change to the highest level: the craft of attio.com, Linear and Stripe. They must avoid anything that looks "vibe coded" (made quickly with AI). The site must also be ready to move to **headless WordPress** later without a redesign.

Read the codebase thoroughly before writing anything.

## 1. Context to absorb first

- **Stack:** Next.js 15 (App Router), React 19, Tailwind 3, framer-motion 12, TypeScript. Native scrolling only (Lenis was removed because it caused scroll jitter).
- **Routes:** `app/[locale]` with `nl` (the default, formal "u") and `en`. All copy lives in `lib/i18n/en.ts` and `nl.ts`. Show no prices anywhere.
- **Brand:**
  - Ink `#0B1B33`, Signal Blue `#2E5BFF`, Ice `#EDF1FF`, Peri `#C3D0FF`.
  - Manrope for headlines and UI, Inter for body text, IBM Plex Mono for small labels.
  - Hairline frame lines (`.frame`).
  - The logo is in `public/brand`.
- **Existing UI system:**
  - `components/ui/kit.tsx` (Pill, Avatar, Check, AppFrame, Stage).
  - `components/ui/scenes.tsx`: data-driven "product UI" illustrations (flow, pipeline, checklist, message, calendar, document, brand, chart).
  - `lib/motion.tsx` (Reveal, Stagger, SplitHeading).
  - `lib/useTimeline.ts`.
- **Pages:**
  - home;
  - 5 service pages (`components/ServicePage.tsx`);
  - case study Energielabel Breda (real numbers only);
  - about;
  - contact (a 3-step form, optional "how do you feel about…" sliders, and a Cal.com embed);
  - blog index and article (placeholders).
- **Remaining iframes:** `public/embeds/*` (hours band, service morph) and `public/case/*`.
- **Reference:** https://attio.com/platform/custom-agents. Take its level of craft, not its look. Keep our brand.

Write down what you find: tokens, the component inventory, inconsistencies, and every place that currently feels generic. You will use this inside the skills.

## 2. The skills to create

Create each skill as `.claude/skills/<name>/SKILL.md`. Each one needs frontmatter with `name` and a `description` that says precisely when to use it. Add `references/` files where the content gets long.

Make the skills specific to this project: real token names, real file paths, real examples from our code. Generic design advice is useless here.

### 1. `ae-design-system`: the source of truth

- **Tokens:**
  - colour roles (not just hex values: what Ink, Signal Blue, Ice, Peri and slate may be used for, and their ratios per section);
  - type scale (sizes, line heights and tracking per role);
  - spacing rhythm;
  - radii;
  - borders and hairlines;
  - shadow levels (at most 3);
  - z-index.
- **Component inventory:** each component, when to use it, its props, and do/don't examples. Include the scene system and how to add a new scene kind.
- **Layout grammar:** frame lines, section padding, column systems, light versus dark sections, and how sections hand over to each other.
- **Cleanup:** tidy the tokens in `tailwind.config.ts` and `globals.css`, but only where the inventory shows drift (for example one-off hex values or arbitrary pixel sizes that should be tokens). List what you changed.

### 2. `ae-anti-vibe`: taste guardrails and audit

1. **Tells list.** Write a concrete list of "vibe-coded" tells, each with the fix we use instead. At least:
   - purple or blue gradient blobs and glows;
   - glassmorphism;
   - gradient text;
   - emoji or generic icon soup;
   - identical 3-card feature grids;
   - every block a `rounded-2xl` card with a shadow;
   - everything centred;
   - badge pills on everything;
   - fake dashboards with meaningless numbers;
   - invented stats or testimonials;
   - lorem ipsum or vague copy ("Unlock the power of…");
   - motion on every element;
   - inconsistent radii or spacing;
   - stock-like illustrations;
   - default Tailwind colours (`gray-500`, `blue-600`);
   - over-bold everything;
   - widows in headlines.
2. **Scoring rubric.** Score 0–3 on each of: hierarchy, restraint, typography, rhythm and spacing, content truth, motion purpose, detail and finish, brand fit. A section ships only at 2+ on every axis, with an average of at least 2.5.
3. **Audit procedure.** Take screenshots, score them against the rubric, and list fixes ranked by impact.

### 3. `ae-section-composer`: how to design a new section or page at Attio level

1. **Process:**
   - define the section's single job and its reader;
   - pick a layout pattern from our grammar, or justify a new one;
   - write real copy first (formal Dutch and English);
   - choose an illustration;
   - add motion last.
2. **Illustration rules.** Prefer "product UI as illustration": our scenes, built from real-looking, believable example data that is clearly labelled as an example. Line art is the second choice. Never decoration for its own sake.
3. **Patterns.** Document 8–12 reusable section patterns drawn from what we have and what Attio does well. For example: split intro with sticky index, stepper with crossfading scene, hairline stat grid, marquee of tools, dark proof band, FAQ, CTA band. For each, write when to use it and the component that implements it.

### 4. `ae-motion`: motion principles

- **Purpose:** each animation must explain, guide or reward. Otherwise remove it.
- **Timing and easing tokens:** a single shared ease, a duration scale, and stagger limits.
- **Scroll motion:** scroll-linked effects are allowed only with transform and opacity, with no layout shift.
- **Accessibility and loading:** `prefers-reduced-motion` is mandatory. Animations do not run until they are in view.
- **Performance budget:** no CLS from lazy content (reserve height); keep framer-motion in client islands only.

### 5. `ae-headless-wp`: build everything so WordPress can drive it later

**This skill matters most for long-term work.** It must define:

- **Content model.** Map every page and section to WordPress structures:
  - **Custom post types:** Page with a flexible-content "sections" field; Service; Case Study; Post.
  - **Options page:** header nav, footer, CTA band, contact settings.
  - **Taxonomies:** blog tags, service relations.
  - **Fields:** document the expected ACF field groups for each section, with names, types and repeaters. Also write them as draft ACF JSON in `wordpress/acf-json/` as documentation; do not install anything.
- **Block architecture.**
  - Each section is a presentational component in `components/blocks/<BlockName>.tsx` that receives *all* content through typed props.
  - Components hold no copy and import no dictionaries.
  - A `zod` schema per block validates the data.
  - `renderBlocks(blocks)` maps `{ type, ...props }` to components.
  - Unknown block types fail gracefully.
- **Content source abstraction.**
  - `lib/content/source.ts` defines an interface (`getPage`, `getService`, `getCaseStudy`, `getPosts`, `getSettings`, each taking a locale).
  - Today it is implemented by a local adapter that reads our current dictionaries (reshaped as fixtures that look exactly like future WPGraphQL responses).
  - Later a `wpgraphql` adapter swaps in through an env var.
- **Editable versus code-owned.**
  - Editors control copy, images, order of sections, CTA targets, FAQ items, tools lists and scene *presets*. Scene choice is a select field with keys such as `flow:intake`, and the example data stays in code.
  - Code controls layout, tokens, motion and scene rendering.
  - Write this rule down clearly.
- **WordPress plumbing.**
  - **Rich text:** a `RichText` component that sanitises and styles WordPress HTML (headings, lists, links, images, embeds).
  - **Images:** `next/image` with `remotePatterns` for the WordPress domain. Alt text is required.
  - **i18n:** Polylang or WPML language mapping to our `/nl` and `/en` routes.
  - **SEO:** Yoast or RankMath fields through WPGraphQL into `generateMetadata`.
  - **Freshness:** ISR with `revalidate`, plus an on-demand revalidation route.
  - **Preview mode:** draft mode.
  - **Redirects and forms:** redirects, and forms staying on our Next API route.
- **Migration checklist** for the future switch.

### 6. `ae-visual-qa`: you are not done until you have looked

- **Screenshot loop.** Use a Playwright script in `scripts/qa/`. Take full-page screenshots and key crops at 390, 768 and 1440 px for both locales. Read the screenshots yourself before you claim anything.
- **Automated checks:**
  - no horizontal overflow (`scrollWidth`);
  - no console or page errors;
  - axe accessibility scan;
  - Lighthouse (performance and accessibility at least 90 on mobile);
  - CLS under 0.05;
  - every heading wraps cleanly with no orphans, including long Dutch compound words;
  - focus states visible.
- **Comparison.** Compare before and after screenshots side by side for every change.

### 7. `ae-elevate`: the orchestrator

This is the loop to run on any page or section.

1. Run `ae-visual-qa` for baseline screenshots.
2. Audit with `ae-anti-vibe` and write the scores.
3. Propose a plan: the 3–7 highest-impact changes. You have creative freedom, within these rules:
   - **Free:** you may redesign layouts, compositions, illustrations, motion and component styling, and introduce new section patterns.
   - **Fixed:** brand colours, fonts and logo; facts and numbers; no prices; formal "u" in Dutch; the meaning of the copy.
   - **Copy improvements:** propose them as a diff for approval.
4. Implement, following `ae-design-system`, `ae-section-composer`, `ae-motion` and `ae-headless-wp`.
5. Re-run QA and re-score.
6. Iterate until the ship bar is met, at most 3 rounds.
7. Report: before and after screenshots, scores, files changed, and anything that needs my decision.

## 3. Rules while writing the skills

- **Keep the main file short.** Keep each SKILL.md under about 300 lines. Put long lists, patterns and ACF tables in `references/`.
- **Be concrete.** Give real file paths, real class names, and before/after snippets from this codebase.
- **Other design skills.** If other design skills are installed (for example `frontend-design`, `design-loop`, `ui-ux-pro-max`), you may borrow good ideas from them. Our project skills win whenever there is a conflict, and that precedence should be written into `ae-elevate`.
- **Don't invent facts.** Never invent client names, results or testimonials anywhere. Example data inside scenes must be clearly labelled as an example.

## 4. After the skills exist

1. Show me a short summary of each skill and the scores from a first audit of the homepage and one service page. Do not change anything yet.
2. Then refactor **one** section into the headless-WordPress block architecture, as a pilot. Use the service page hero, for example: block component, zod schema, fixture data, and `renderBlocks`. Run `ae-elevate` on it.
3. Stop and wait for my review before you roll it out to the other sections.
