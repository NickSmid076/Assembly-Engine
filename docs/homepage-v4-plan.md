# Homepage v4 · plan

**Reference:** the five service moments (locked).

**Scores:** ae-anti-vibe, 8 criteria × 0–3 (/24), in the order Purpose · Hierarchy · Composition ·
Illustration · Typography · Motion · Honesty · Robustness. Baseline screenshots are per section at
1440 and 390.

**Precedence when skills conflict:** the brief first, then the ae-* skills, then the taste skill. For
this site, that means the frame hairlines, mono labels and the cobalt square marker stay; they are the
house system. Taste rules that don't conflict apply: no window dots, glow, gradients, pill overload,
padded stats or identical card rows, and two lines per heading where possible.

## The page as one piece

**Story:** what we do → how it runs → process → five services → proof → why us → next step.

| # | Section | Ground | Density | Spacing (desktop) | Hand-off to the next section |
|---|---|---|---|---|---|
| 1 | Hero | ink | airy | 96 / 112 | The five modules are the five services; hover or tap one and it opens in the explorer |
| 2 | How it runs | white, paper stage | dense demo | 112 | The run ends with "logged"; the process explains how we get you there |
| 3 | Process | paper | linear | 96 | The track ends at "Na livegang" → services on ink |
| 4 | Services (locked) | ink | dense demo | 112 | — |
| 5 | Proof | white | figures | 112 | — |
| 6 | Why us | paper | person | 96 | — |
| 7 | Closing | ink | airy, centred once | 144 | Clock at 07:00; the three done items echo services 2, 4 and 5 |
| 8 | Footer | ink-2 | quiet | — | Tone step instead of a second ink band |

- **Thread:** one scroll-linked line on the left frame line (desktop) that fills as the visitor reads
  down the page. The frame becomes the page's progress, through light and dark chapters.
- **Example stages:** every example demonstration sits on the same paper stage, labelled
  "Voorbeeld · fictief kantoor", with the same rail (pause / replay).
- **CTAs:** one primary style (`.btn-primary`, cobalt) for "Gratis analyse aanvragen" in the header,
  hero and closing. Ghost buttons only for "see more" links (case, about, process).

## Per section

| Section | Now | Lowest | What changes | Target |
|---|---|---|---|---|
| Header | 18 | Co 2, Ro 2 | Language switch ≥ 24px tap targets; no other change | 20 |
| Hero | 13 | Il 1, Ty 1, Ho 1 | Facts row removed (the 4-week promise moves to Process, where it is explained). Shorter NL headline, 3 lines at 390, no hyphen. Tighter headline → intro gap. Each module gets a glyph that echoes its service moment (brand mark, pipeline, folder, invoice, bars) in the SVG poster and 3D; hover/focus shows the name; click opens that service in the explorer. The 3D plays once (assemble, one signal per module) then holds; no endless loop. | 21 |
| How it runs | 13 | Ty 1, Mo 1, Ro 1 | Rebuilt as an example moment on the shared story clock: one request → five logged steps across real tools, with a human approval pause. Three tabs = the three starts named in the copy (website enquiry, client upload, weekday 07:00). Plays once, holds, replay; tabs hand off like the explorer. Removes window dots, the LIVE pill, 9–10px text, truncation, "0 typed by hand" and the English jargon in NL. | 21 |
| Process | 17 | Il 1 | The go-live step becomes the anchor: "Live binnen 4 weken" as a bracket on the track over the first four steps, then "doorlopend". Steps light up as the scroll-linked fill passes; the go-live marker lands with a spring. | 21 |
| Services | — | — | Locked. Integration only: the video gets a locale-aware source (NL file when it exists, else EN), and the video recommendation goes in the report. | — |
| Proof | 18 | Mo 1 | The window dots go (plain address bar). Each figure carries its own source and date. The 3 → 20+ figure leads; the scores sit as one group from one source. A once-only entrance: the phone settles over the desktop shot. | 21 |
| Why us | 15 | Mo 1, Ho 2 | Copy #3 and #4 rewritten (see the report). Rows become a promise ledger with the name of each promise and how it is kept; the portrait shrinks so the statement leads. | 20 |
| Closing | 19 | Co 2 | Clock in Manrope. The three done items become small artefacts from the moments (Week 43 summary, invoice 2026-0142 sent, follow-up planned) that land at 07:00. One primary CTA plus one ghost. | 21 |
| Footer | 17 | Co 2 | Tone step (ink-2) under the ink closing so the two dark bands read as two; labels in sentence case. | 19 |

## Decisions already made in the brief

- **Copy:** NL "Eén aanvraag. De rest gaat vanzelf." / EN "One request. The rest runs itself."
  - No English jargon in NL: Runlog → Logboek, Trigger → Start, "Workflow met agents" → named starts.
- **Blog teaser and newsletter:** they stay off the homepage.
- **Hydration:** reduced-motion errors on About and the service pages are fixed in shared code
  (`lib/useReducedMotionSafe.ts`, `components/MotionRoot.tsx`).
- **drei:** removed.
- **Video:** the new file replaces the old one (the old one is archived in the scratchpad); the source is
  made locale-aware; the recommendation goes in the report.
