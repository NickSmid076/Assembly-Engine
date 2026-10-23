---
name: ae-motion
description: Motion rules for the Assembly Engine website — animate only where it explains something, with shared timing tokens, reduced-motion support without hydration errors, pause controls for anything that loops, and no layout jumps. Use when adding, changing or reviewing any animation, transition, auto-advancing demo or scroll effect on the site.
---

# Motion

Motion on this site has one job: **show a change or a sequence that words can't**. A workflow
running, a document arriving, a status turning green. Everything else is static.

## When to animate

Animate when one of these is true:
1. **State change** — something the visitor did or the scene did changed the UI (tab switch, step advance, form step, accordion).
2. **Sequence** — the order of events is the point (trigger → agent → outputs).
3. **Spatial continuity** — an element moves from A to B and the eye should follow (active indicator sliding).

Don't animate:
- Section entrances by default. Content is visible on load. A single, quiet entrance for the page hero is allowed.
- Decoration: drifting glows, floating cards, pulsing dots, ping badges, rotating rings, marquees.
- Numbers that don't change (no count-up for static facts).
- Parallax for its own sake. Allowed only when it separates a product scene from its background by a few pixels.

## Tokens

Use these, from `lib/motion.tsx`. Don't invent new curves or durations.

| Token | Value | Use |
|---|---|---|
| `EASE` | `[0.2, 0.8, 0.2, 1]` | Default ease-out for entrances and state changes |
| `EASE_IN_OUT` | `[0.65, 0, 0.35, 1]` | Elements moving from A to B on screen |
| `DUR.micro` | 0.15s | Hover, press, colour changes |
| `DUR.state` | 0.3s | Tabs, accordions, step changes, pills |
| `DUR.enter` | 0.6s | The few allowed entrances |
| `STAGGER` | 0.06s | Between items in a sequence (max 6 items, then group) |

CSS equivalents: `duration-150`, `duration-300`, `ease-[cubic-bezier(.2,.8,.2,1)]`.

## Properties

- Animate `transform` and `opacity` only. Progress bars use `scaleX` with `origin-left`, never `width`.
- No `filter: blur()` entrances (paint-heavy and a vibe giveaway).
- Never `transition-all`; list the properties (`transition-[color,background-color,border-color]`, `transition-transform`).
- SVG: animate `pathLength`/`strokeDashoffset` or transforms on a `<g>` with `transform-box: fill-box; transform-origin: center`.

## Text stays legible on every frame (owner, phase 4)

Text must pass WCAG AA contrast at every frame of an animation, not just at rest (Lighthouse samples mid-animation).
Muted text (`slate` on white) only passes at ≥ ~92 % opacity, so text never fades:
- Story clock (`services/moments/clock.tsx`): `M` detects whether its element holds text; if so, opacity maps to
  either 0 or ≥ 97 % (`legible()`). The element appears when its fade starts and its slide carries the motion.
  Shapes without text (bars, dots, fills) keep smooth fades.
- Text that swaps for other text is sequential: the new text starts after the old one has gone. Never overlap.
- Framer swaps in signatures: slide or roll (clipped `overflow-hidden` box), no `opacity` on text.
- `text-warn` fails AA on white (3.6:1); use `text-ink` with a `bg-warn` dot.
- Check: `fade-axe` style run (axe `color-contrast` on the stage every ~0.35 s while the story plays).

## Stories start after the page settles

Story clocks wait for `load` + `requestIdleCallback` (max 2.5 s) before they arm or play. A story already in view at
load would otherwise arm, re-render and measure while the page is still hydrating (this cost EN Brand ~10
Lighthouse points: its shorter headline put the stage 40 % in view at load, NL's 28 % did not).

## Keep focus on busy buttons

Never `disabled` a button while its own animation runs: the browser drops keyboard focus. Use `aria-disabled` and
ignore clicks while busy (`aria-disabled:opacity-60`).

## Reduced motion — the pattern

`prefers-reduced-motion: reduce` must give a **complete, static, final** state: everything visible,
loops stopped, progress bars full, scenes showing their finished state.

Hydration safety: the server doesn't know the visitor's setting. Framer's `useReducedMotion()` returns
`null` on the server and `true/false` on the client, so **never let it change what renders on first paint**:
- Not in initial React state: `useState(reduce ? 99 : 0)` → hydration error for every reduced-motion visitor.
  Render the same initial state on both sides, then switch in an effect: `useEffect(() => { if (reduce) setT(FINAL) }, [reduce])`.
- Not in framer `initial`: `initial={reduce ? false : { opacity: 0 }}` also mismatches, because framer
  writes the `initial` styles into the server HTML (`opacity:0; transform:…`) and the reduced-motion client doesn't.
  (Verified on this site: it produced "attributes didn't match" errors.)
- **Entrances: use CSS.** `className="animate-rise"` (+ `style={{ animationDelay }}`) renders identically on
  server and client; the global reduced-motion rule in `globals.css` makes it instant.
- Framer for state changes (tabs, steps, layout) is fine, since those happen after hydration.
- For framer animations that must exist on first paint, don't branch on `reduce`; wrap the app in
  `<MotionConfig reducedMotion="user">` so framer itself drops transform animations for those visitors.
- `ae-visual-qa` runs with reduced motion emulated, so these errors show up in `consoleErrors`. Treat any as a bug.
- **This overrides the generic `framer-motion` skill** where it says to `return <div>` vs `<motion.div>` (or pick
  `initial`) based on `useReducedMotion()`. On this server-rendered site that pattern causes hydration errors.
  Use that skill for API details (MotionValues, AnimatePresence, layout animations, gestures), and this one for when and how.

## Loops and auto-advance

Anything that moves on its own for more than 5 seconds (hero engine, steppers, scene timelines):
- runs only while on screen (IntersectionObserver), and starts from a readable state;
- if one observer arms it ("near") and another plays it ("in view"), handle both orders: a jump scroll (anchor link) can report "in view" first, and nothing will fire again (fixed in `services/moments/clock.tsx` useStory);
- pauses on hover **and** on keyboard focus inside it (`onFocus`/`onBlur` on the container);
- has a visible pause/play control (button with `aria-pressed` or swapping label, both locales), unless the loop is under 5 seconds and stops on its own;
- stops when the visitor interacts (selecting a tab or step stops auto-advance for that session);
- never updates React state every frame for the whole component: throttle to ~10 updates/s or drive the visual with a motion value / CSS.

## No layout jumps

- Reserve space: scenes that type, add rows or expand keep a fixed `min-h` so the page below doesn't move. CLS target is 0.
- Accordions animate `height` only inside their own box with `overflow-hidden`; nothing outside reflows mid-animation except the accordion's own block.
- Entrances use `opacity` + `translateY ≤ 16px`; the element's box is in place from the start.
- Fonts come from `next/font` (no swap jump). Images and iframes have explicit dimensions or aspect ratio.

## Interruptibility

- Hover effects reverse cleanly when the pointer leaves halfway.
- Clicking a tab while a transition runs goes straight to the new target (framer handles this; CSS transitions do too). Don't chain `setTimeout`s that can't be cancelled.

## Review checklist

- [ ] Each animation answers "what change or sequence does this explain?"
- [ ] Only transform/opacity; no width/height/blur animation outside accordions
- [ ] Tokens used for easing and duration
- [ ] Reduced motion: final state, no loops, **no hydration error** (check the console in `ae-visual-qa`, which emulates reduced motion)
- [ ] Loops: on-screen only, pause on hover + focus, visible control, stop on interaction
- [ ] CLS 0 in the QA report
