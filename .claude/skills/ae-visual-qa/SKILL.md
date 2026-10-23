---
name: ae-visual-qa
description: Visual and technical QA for the Assembly Engine website — screenshots at phone, tablet and desktop in Dutch and English, plus checks for overflow and cut-off text, accessibility, console and hydration errors, Lighthouse scores and layout shift. Claude must look at the screenshots before calling any UI work done. Use after every UI change, before reporting work as finished, and as the measuring step of ae-elevate.
---

# Visual QA

Nothing on this site is "done" until you have **looked at the screenshots** at every size in both
languages, and the automated checks are clean. Code that type-checks can still be visually broken
(the Dutch hero once ran off the phone screen while every check passed).

## 1. Make sure the site runs

```bash
lsof -i :3000 -sTCP:LISTEN >/dev/null || npm run dev     # run in background
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/nl   # expect 200
```

The screenshot script uses the installed Google Chrome and its own `puppeteer-core`
(`.claude/skills/ae-visual-qa/scripts/node_modules`; run `npm install` there once if missing).

## 2. Screenshots and checks

```bash
node .claude/skills/ae-visual-qa/scripts/shoot.mjs \
  --routes /nl,/en,/nl/services/operational-automation \
  --out <scratchpad>/qa-<label>
```

- Sizes: phone 390×844 (2×), tablet 768×1024, desktop 1440×900. Limit with `--sizes phone,desktop`.
- Default `--motion reduce`: every reveal shows its final state, so the full page is visible in a still,
  and reduced-motion hydration bugs surface in `consoleErrors`. Use `--motion full` once per round to see
  the animated states.
- Images are sliced every 1600 CSS px (`--slice`) so they stay readable. Save them in the session
  scratchpad, never in the repo.
- `report.json` per route × size: `overflow` (page scrolls sideways), `cutText` (text running off-screen
  inside an `overflow:hidden` parent), `noAccessibleName`, `imagesMissingAltOrSize`, `headingJumps`,
  `h1` count, `smallTapTargets` (< 24px), `textUnder12px`, `cls`, `consoleErrors`.

Always cover: the routes you changed, in **both** locales, at **all three** sizes. For a section
change, at least `/nl` and `/en` of the page that holds it.

## 3. Look at the screenshots (required)

Open the slices with the Read tool. For each size and language, check and write down:
- Text: nothing cut off, overlapping or running under other elements; long Dutch words break sensibly; no orphan single words on headings; no English on the Dutch page (including labels inside scenes, videos and embeds).
- Layout: frame lines continuous; alignment to the frame; spacing rhythm consistent; nothing touching the screen edge on phone (min 20px gutter).
- Hierarchy: the first thing you see is the intended focal point.
- Components: one primary button style; focus rings present where expected; icons render (no blank icon wells).
- Scenes: readable at phone size; example label present; no empty frames (iframes that didn't load).
- Compare with the previous round's slices when you changed something: did anything else move?

Report what you saw, with the slice file name, not what you expected to see.

## 4. Lighthouse and layout shift

Run against a production build for real numbers (dev mode is slow and unminified):

The build goes to `.next-qa` (via `NEXT_DIST_DIR` in `next.config.mjs`) so it doesn't clobber a running
`npm run dev`:

```bash
NEXT_DIST_DIR=.next-qa npm run build
NEXT_DIST_DIR=.next-qa npx next start -p 3100          # background; stop it when done
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y lighthouse@12.2.1 http://localhost:3100/nl --quiet --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --output=json --output-path=<scratchpad>/lh-nl-mobile.json
```

Run mobile twice; simulated scores swing ±4 points. To see what the LCP element really is, record
`largest-contentful-paint` entries with puppeteer and 4× CPU throttling instead of trusting the simulation.

Targets (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95, CLS ≤ 0.02,
LCP ≤ 2.5s. Also run desktop (`--preset=desktop`) for the home page. Read the failing audits, not just
the scores. Stop the production server afterwards.

## 5. Keyboard and screen reader quick pass

- Tab through the changed section: every interactive element reachable, visible focus, logical order, nothing focusable that's invisible.
- Headings: one `h1`, no level jumps (report shows them).
- Animated or auto-advancing content can be paused by keyboard.
- `aria-label`s exist in both languages.

## 6. Verdict

Write a short QA block in your reply:

```
QA · <routes> · <date>
Screens viewed: phone/tablet/desktop × nl/en (N slices)
Automated: overflow 0 · cut text 0 · CLS 0 · console errors 0 · a11y name issues 0
Lighthouse (mobile /nl): P 9x · A 9x · BP 9x · SEO 9x
Seen: <what you noticed, good and bad>
Open issues: <list or "none">
```

Only call the work done when overflow, cut text, console errors and CLS are 0 for the changed routes and
the screenshots show nothing broken.
