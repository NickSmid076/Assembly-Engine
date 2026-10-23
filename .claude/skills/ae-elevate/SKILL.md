---
name: ae-elevate
description: The improvement loop for the Assembly Engine website — screenshot the page, score it with ae-anti-vibe, plan the biggest improvements, build them with the design-system, section-composer, motion and headless-WordPress rules, then check and score again, for at most 3 rounds. Use when asked to improve, elevate, redesign, polish or "make Attio-level" a page or section of the site.
---

# Elevate loop

This ties the other skills together. Load them as you reach each step:
`ae-design-system` (always), `ae-anti-vibe` (score), `ae-section-composer` (plan/build),
`ae-motion` (motion), `ae-headless-wp` (content contract), `ae-visual-qa` (measure).

## Scope and approval gates

- Work **one section at a time** unless the owner has approved a wider scope.
- First time on a page: deliver the audit (step 1–3) and wait for the owner before rebuilding more
  than one section.
- Never change: brand colours, fonts, logo, facts, the no-prices rule, formal "u". Copy changes go to
  `docs/copy-suggestions.md` as proposals.
- Free to change: layout, composition, scenes/illustrations, motion, component styling.

## The loop (max 3 rounds)

### Round 0 · Baseline
1. `ae-visual-qa`: screenshots of the target page(s), phone/tablet/desktop × nl/en, plus `report.json`. Look at every slice.
2. `ae-anti-vibe`: score every section of the page (0–3 × 8 criteria, /24) with evidence from the slices, and list giveaways with `file:line`.
3. Write the audit: table of sections · score · lowest criterion · top issues · biggest single improvement. Note bugs separately (broken layout, hydration errors, missing icons) — bugs are fixed first regardless of score.

### Round 1–3 · Improve
4. **Plan.** Pick the 1–3 changes with the largest score gain per unit of work. Prefer fixing the lowest criterion of the lowest-scoring section in scope. For each change, write: section, pattern (from section-composer), content contract change, motion change, expected score change.
5. **Build.** Implement the plan:
   - content via the content layer (`ae-headless-wp`), both locales;
   - layout from a section-composer pattern; tokens from the design system;
   - motion per `ae-motion` (reduced-motion final state, no hydration branch, pause controls);
   - copy proposals into `docs/copy-suggestions.md`, current copy stays.
   Run `npx tsc --noEmit` before measuring.
6. **Check.** `ae-visual-qa` on the changed routes, all sizes, both locales. Look at the slices; compare with the previous round.
7. **Score again.** Re-score only the changed sections, honestly. Record before → after per criterion.
8. **Decide.**
   - Section ≥ 19/24 with nothing below 2, and QA clean → stop, it ships.
   - Improved but under the bar → next round with a new plan (don't repeat a failed approach).
   - Round 3 reached → stop anyway and report what's left and why.

Stop early when a round produces no score gain: report it rather than polishing in circles.

## Report format

```
Elevate · <page/section> · round N of 3
Before → after: <section> 13 → 20 /24 (Composition 1→3, Illustration 1→3, Motion 1→2, …)
Changed: <files, one line each>
QA: <ae-visual-qa verdict block>
Copy proposals: <n new in docs/copy-suggestions.md>
Next: <what the next round would do, or "ships">
```
