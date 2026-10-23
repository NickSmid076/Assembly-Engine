---
name: ae-ui-3d
description: When and how to put three.js (or CSS 3D) inside a UI component on the Assembly Engine site, such as a service signature or the hero engine. Covers the decision (3D or 2D), HTML text overlays, demand rendering with a real-time clock, lazy desktop-only loading, the SVG poster fallback, the required interactive 2D phone version, reduced motion and bundle budgets. Use it before writing any @react-three/fiber, three or CSS-3D code, and when reviewing one.
---

# 3D inside UI components

On this site 3D is never decoration. It sits **inside a component that does something**: a dashboard
whose figures you can trace, an engine whose modules you can open. Read `ae-motion` and
`ae-design-system` first; this skill adds the 3D-specific rules.

## 1. Does this component need 3D?

Use three.js only when depth carries meaning that 2D can't show as clearly:
- **Layers or stacking:** sources under a dashboard, modules on an engine plate.
- **Paths through space:** data moving from several systems into one place, where crossing lines in 2D would tangle.
- **An object the visitor turns or opens,** whose parts sit behind each other.

Use **CSS 3D** (`perspective`, `rotateX/Y`, `translateZ` on HTML) when the object is made of HTML
anyway: a brand system of cards, a stack of pages. It adds no bundle cost and text stays crisp.

Use **2D (SVG + Framer Motion)** when the story is a sequence, a list or a single document. That's
most things. Acquisition and invoicing are 2D on purpose.

Decided per service (owner, Oct 2026): Reporting and Operations use three.js, Brand uses CSS 3D,
Acquisition and Invoicing use 2D.

If you can't say in one sentence why depth explains something here, build it in 2D.

### CSS 3D notes (from the Brand signature, `service-signature/brand/`)
- One geometry module (`geometry.ts`) holds rects, lifts and token positions per page × device; the stage reads it.
- Keep a `transform-style: preserve-3d` chain on every wrapper between the perspective element and the parts.
- Put the fit-to-box `scale()` on its own wrapper (`.bs-fit`), not on the element with the long transition, or a
  resize/device switch scales late. Key the wrapper by device.
- Labels that must face the viewer counter-rotate (billboard) with the inverse of the rig's rotation.
- Sequence with CSS transition delays from CSS vars; each direction reads its delays from the destination
  state's rule, so "put together" and "take apart" are separate choreographies with no JS timers.
- The exploded state exists only in `@media (min-width:1024px) and (prefers-reduced-motion:no-preference)`.
  Phones, tablets and reduced motion get the assembled page from the first paint: no hydration branch.
- Crossfade the unstyled and styled faces of a part inversely, or both show at once mid-transition.
- A markup-heavy island below the fold hydrates near the viewport: wrap it in
  `service-signature/Deferred.tsx` (server HTML stays untouched until then). On Brand this took mobile
  Lighthouse from ~80 to the level of the other pages.
- Client islands import only **types** from `schema.ts` (`import type`). A value import (even one constant)
  ships zod to the browser (+25 KB gzip on Brand before it was caught).

## 2. Architecture (copy the hero engine)

Reference implementation: `components/blocks/hero-home/` (`engine-geometry.ts`, `EngineCanvas.tsx`,
`EngineVisual.tsx`), and `components/blocks/service-signature/reporting/`.

```
<Signature>                     client island, owns the selection state
  ├─ the UI (HTML)              buttons, figures, lineage, all the text; works with no 3D at all
  ├─ <Poster/>                  SVG drawn from the same geometry module; first paint, fallback
  ├─ <Canvas/> (lazy)           three.js scene, desktop only, swapped in over the poster
  └─ <Phone2D/>                 the < lg version: 2D, interactive
```

- **One geometry module** (`*-geometry.ts`, no React, no three import) holds the positions, sizes and
  paths. The SVG poster and the 3D scene both read it, so they can't drift apart. Project with
  `iso()` from `hero-home/engine-geometry.ts` for the house isometric view.
- **State lives in the HTML UI.** The canvas only receives props (`selected`, `active`) and renders
  them. Clicking in the canvas calls the same setter as the buttons.
- **Text is HTML, never texture text.** Labels sit in an absolutely positioned overlay at projected
  anchor points (computed from the same geometry, in % of the stage), so they're crisp, translatable,
  selectable and read by screen readers. Glyphs (small pictograms) may be texture quads.
- **Flat materials.** `MeshBasicMaterial` with face colours from the brand tokens (top lighter, sides
  darker). No lights, shadows, environment maps, post-processing or drei. That's where the bundle and
  the GPU time go.
- **Orthographic camera** fitted to the geometry's bounding box (see `Fit` in `EngineCanvas.tsx`), so
  the 3D lines up with the SVG poster pixel for pixel and the swap is invisible.

## 3. Rendering rules

- `frameloop={active ? "demand" : "never"}`. Call `invalidate()` only while something moves; a
  scene at rest draws nothing.
- **Real-time clock:** animate from `performance.now()` against a start time, never by adding a
  fixed amount per frame. Demand rendering skips frames, so per-frame increments drift.
- `dpr={[1, 2]}`, `antialias`, `powerPreference: "low-power"`. Never above 2.
- **Pause:** off-screen (IntersectionObserver) and on a hidden tab (`visibilitychange`), by setting
  `active` to false.
- **No infinite loops.** Motion answers an action (a selection) or plays once (an intro under 5 s).
  Anything that runs longer than 5 s needs the pause rules from `ae-motion`.
- **No per-frame React state.** Animate refs inside `useFrame`; React state changes only on user
  actions.
- **Dispose** geometries, materials and textures you create by hand (`useEffect` cleanup); r3f
  disposes what it creates through JSX.

## 4. Loading

- The 3D chunk is **lazy and desktop-only**: `dynamic(() => import("./Canvas"), { ssr: false })`,
  mounted only when all of these are true:
  - `matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)")`;
  - WebGL is available (`canvas.getContext("webgl2") || getContext("webgl")`);
  - after `load` + `requestIdleCallback` (timeout fallback), and when the component is near the viewport.
- Until then, and whenever the canvas fails, **the SVG poster is the component**. It must look
  finished and react to the selection (CSS transitions on `data-active`).
- Fade the canvas in over the poster (`opacity`, 300 ms) only after its first frame has rendered.
  Keep the poster's box; the canvas fills it absolutely. CLS stays 0.

## 5. Phones and tablets (< lg): 2D, and interactive

Phones never load three.js, and they never get a static picture either. Every 3D signature ships a
**simplified 2D version that you can operate with a thumb**:
- the same state and the same actions as desktop (select a figure, trace its sources, step through a run);
- reduced to the essential relationship: a strip of sources and the target, connectors drawn in SVG (`pathLength`, `DUR.state`);
- tap targets ≥ 44 px, text ≥ 13 px, no horizontal scroll, no hover-only information;
- built from the same data and geometry module, so it can't drift from desktop.

The desktop HTML UI (buttons, lineage) is usually reused as-is; only the 3D stage is replaced.

## 6. Reduced motion

`prefers-reduced-motion: reduce` gives the composed end state:
- no 3D chunk (the poster is shown);
- no intro, no signals travelling, no path drawing;
- selection still works and changes are instant.

Don't branch first-paint markup on the setting (see the hydration rules in `ae-motion`).

## 7. Budgets

| What | Budget |
|---|---|
| three + r3f | Shared lazy chunk with the hero (≈ 249 KB gzip, cached after the homepage). Never in First Load. |
| Scene code per component | ≤ 25 KB gzip on top of the shared chunk |
| Signature island (HTML UI + poster + phone 2D) | ≤ 12 KB gzip, in the route's First Load |
| Route First Load | ≤ 180 KB |
| Draw calls | ≤ 80 at rest; merge static faces when more |
| Frame time while moving | < 8 ms on a 2020 laptop GPU; check with the Performance panel |
| CLS | ≤ 0.02 (target 0) |
| Lighthouse mobile | Performance ≥ 90, Accessibility ≥ 95 (phones don't load the 3D, so 3D is never the cause) |

Check with `npm run build` (First Load per route) and `.next/static/chunks` sizes (`gzip -c | wc -c`).

## 8. Accessibility

- The canvas is `aria-hidden`. Everything it says is in the HTML UI or the overlay labels.
- Every selectable thing is a `<button>` with `aria-pressed` (or a radio group) in the HTML UI, in
  tab order, with a visible focus ring. Clicking in the canvas is a shortcut, never the only route.
- The lineage or result of a selection sits in an `aria-live="polite"` region.
- Example data is labelled "Voorbeeld"/"Example".

## 9. QA

- `ae-visual-qa` shots at 390/768/1440, NL + EN, reduced and full motion.
- Desktop with a real GPU **and** with swiftshader (`--use-angle=swiftshader`), to check the canvas
  mounts, the swap is seamless and clicks in the canvas select.
- Look at a full-motion contact sheet (frames at 0/300/800/1500/3000 ms) to check the intro.
- Phone: tap each figure, check that the connectors redraw and the lineage updates.

## Review checklist

- [ ] One sentence says why depth explains something here
- [ ] Geometry module shared by the SVG poster, the 3D scene and the phone 2D view
- [ ] All text in HTML; the canvas is `aria-hidden`
- [ ] Demand frameloop, real-time clock, DPR ≤ 2, paused off-screen and on hidden tabs
- [ ] Lazy, desktop-only, after idle, WebGL-checked; the poster looks finished on its own
- [ ] Phone version is 2D and **interactive**, with the same actions as desktop
- [ ] Reduced motion = composed end state, no hydration branch
- [ ] Budgets checked in the build output
