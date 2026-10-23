---
name: ae-design-system
description: The Assembly Engine website's design system — colour tokens, type scale, spacing, layout frame, components and the rules for using them, taken from the existing code. Load before building or changing any section, component or page of the Assembly Engine site. Every other ae-* skill follows this one.
---

# Assembly Engine design system

This is the reference for every visual decision on the site. It is derived from the shipped code
(`tailwind.config.ts`, `app/globals.css`, `components/blocks/*`, `lib/motion.tsx`).
When this file and the code disagree, the code wins for what exists today and this file wins for
anything new. Update this file in the same change when you deliberately change the system.

## What is fixed and what is free

**Fixed (never change without the owner's explicit approval):**
- Brand colours: the `ink`, `cobalt`, `ice`, `peri` families below. No new hues.
- Fonts: Manrope (display), Inter (text), IBM Plex Mono (data/labels). Loaded via `next/font` in `app/[locale]/layout.tsx`.
- Logo: `public/brand/wordmark.svg` / `wordmark-white.svg` / `icon.svg`, used through `components/Logo.tsx`. Never redraw, recolour or set it in type.
- Facts: every number, date, name, score and claim comes from `PRODUCT.md` or the content files. Never invent stats, clients, testimonials, logos or results.
- **No prices.** Never show Assembly Engine prices, rates, packages or tiers. (Amounts inside a fictional, labelled example scene — like the example invoice — are fine.)
- **Formal Dutch.** The NL site addresses the reader with "u/uw", never "je/jij/jouw".
- Copy: wording changes are proposals for the owner (see "Copy changes" below), not edits.

**Free (Claude decides, within this system):** layout, composition, illustrations and product scenes,
motion, component styling, spacing rhythm, section order *within* a page when the content is unchanged.

### Copy changes
Never rewrite visible copy in place. Add proposals to `docs/copy-suggestions.md`
(table: location · current NL · proposed NL · current EN · proposed EN · why) and keep the current
copy in the build until the owner approves. Fixing an obvious typo or a missing translation of an
existing string is allowed; mention it in your summary.

## Colour tokens (Tailwind names)

| Token | Hex | Use |
|---|---|---|
| `ink` | #0B1B33 | Primary text on light; dark section background; dark buttons |
| `ink-2` | #0F2342 | Raised surface on dark (panels on `bg-ink`) |
| `ink-3` | #14294C | Second raised level on dark |
| `cobalt` | #2E5BFF | The one action colour: primary buttons, active states, links, focus |
| `cobalt-2` | #4A73FF | Hover for cobalt; cobalt on dark backgrounds |
| `ice` | #EDF1FF | Soft cobalt tint: icon wells, selected pills, highlighted rows |
| `peri` | #C3D0FF | Accent text on dark (instead of cobalt, which is too dark there); focus outline |
| `slate` | #5C6B85 | Secondary text on light; second half of two-tone headings |
| `muted` | #8FA0BF | Labels on dark |
| `paper` / `sunken` | #F5F7FB | Sunken panels, the "stage" behind product scenes |
| `line` | #E4E8F0 | Hairlines on light |
| `line-2` | #D5DBE6 | Stronger hairlines, input borders |
| `ok` / `ok-soft` / `ok-ink` | #14AE5C / #E7F6EE / #0E7A42 | Success state only (done, paid, sent) |
| `warn` / `warn-soft` | #B7791F / #FBF3E4 | Attention state only (reminded, overdue) |

Rules:
- Cobalt is for action and state. Don't use it as decoration (no cobalt glows, no gradient text, no tinted blobs).
- On dark (`bg-ink`), text is `white`, `white/80` (body), `white/65` (secondary), `muted` (labels). Small accent text is `peri`; display-size accent words (≥ 24px, e.g. the hero's highlighted words) may use solid `cobalt-2` (4.3:1 on ink, passes for large text).
- Small text on dark never goes below `white/60` (Lighthouse flags `white/40`–`/50` at 10–13px).
- Opacity tints of white on dark: borders `white/[0.08]`–`white/10`, hover `white/[0.03]`.
- Contrast: body text ≥ 4.5:1. `slate` on white passes; `slate/70` and `white/40` do not — use them only for non-essential decoration.
- Status colours (ok, warn) only ever mean status. Never decorative.

## Typography

Families: `font-display` (Manrope) for headings, buttons and nav; `font-sans` (Inter) for body;
`font-mono` (IBM Plex Mono) for eyebrows, labels, data, timestamps.

| Role | Classes (mobile → desktop) |
|---|---|
| Hero H1 (home) | `text-[44px] sm:text-[58px] lg:text-[62px] font-extrabold leading-[1.08] tracking-[-0.035em]` |
| Page H1 (`page_intro`, case/about hero, service hero) | `text-[40px] sm:text-[60px]` (service: `42/64`) `font-bold leading-[1.05] tracking-[-0.04em]` |
| Section H2 | `text-[32px] sm:text-[40px] font-bold leading-[1.15] tracking-[-0.03em]` (large statement variant: `36/48` or `38/52`) |
| H3 / card title | `text-[16px]–[22px] font-semibold/bold` |
| Lead paragraph | `text-[18px] leading-[1.5]–[1.55]`, `text-ink/70`–`/80` (light) or `text-white/80` (dark) |
| Body | `text-[15px]–[16px] leading-[1.55]–[1.6]` |
| Small / meta | `text-[13px]–[14.5px]` |
| Eyebrow | `.eyebrow` = mono 13px uppercase `tracking-[0.08em]` cobalt (`text-peri` on dark) |
| Mono label | `font-mono text-[11px]–[12px] uppercase tracking-[0.1em]–[0.12em] text-slate` |

Rules:
- **Two-tone headings** (first phrase `ink`, second phrase `slate`, via `SplitHeading` segments) are the house heading voice. Use them for section H2s, but not on every heading of a page: card titles and small headings are single-tone.
- **Long Dutch compounds.** Dutch has words like "Bedrijfsautomatisering" (22 characters). Every heading must survive the longest word at 360px wide: allow `hyphens: auto` (the `<html lang>` is set), keep `overflow-wrap: anywhere` as a fallback on display sizes, and never put a heading in an `inline-block`/`whitespace-nowrap`/`&nbsp;`-joined structure that can't break. Check NL at phone width every time.
- Minimum readable size is 12px; 10–11px is allowed only for mono labels inside product scenes.
- `text-wrap: balance` is on h1–h4 globally. Use `text-pretty` on long paragraphs.
- Numbers that change or sit in columns get `tabular-nums`.
- Dutch typography: use ‘…’ / “…” curly quotes, `…` (not `...`), and a non-breaking space in `10&nbsp;min`, `4&nbsp;weken`, `€&nbsp;450`.

## Layout

- **The frame.** Content sits in `.frame` (max 1240px, `px-5 sm:px-10 lg:px-[70px]`) with hairline borders down both sides (`frame-light` on white, `frame-dark` on ink). It is the site's signature: sections are cells in one continuous column. Keep it continuous; full-bleed elements break out of it on purpose, not by accident.
- **Section rhythm.** Vertical padding `py-20`–`py-28` (80–112px). Sections are separated by a hairline `border-t border-line` inside the frame, not by colour bands, except for the deliberate dark (`bg-ink`) chapters.
- **Light/dark chapters.** The page alternates white and ink chapters at most every 2–3 sections. A dark chapter carries a statement or a demonstration, never a plain list.
- **Grids.** Always `grid-cols-[minmax(0,1fr)]` (not `grid-cols-1`) for single columns, and `minmax(0,…)` tracks for multi-column, so long words can't blow the column out. Flex children that hold text get `min-w-0`.
- **Hairline grids.** Cells separated with `gap-px bg-line` + white cells, or `border-l border-t` on the grid with `border-b border-r` on cells. No floating cards with drop shadows for lists.
- **Widths.** Readable measure: paragraphs `max-w-[560px]–[680px]`; section headings `max-w-[420px]–[760px]`.
- **Breakpoints.** Design phone (390) first, then `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Tablet (834) must not be a stretched phone or a squeezed desktop.
- Sticky header is 68px; anchors need `scroll-mt-24` or more, plus the height of any other sticky bar.

## Radius, borders, shadows

- Radius: buttons/inputs `rounded-md`–`rounded-lg`; cards `rounded-xl`; stages and media `rounded-2xl`; pills `rounded-full`/`rounded-md`.
- Borders do the work; shadows are rare and soft: card `0 1px 2px rgba(11,27,51,.05), 0 12px 32px -16px rgba(11,27,51,.18)`; media `0 30px 70px -40px rgba(11,27,51,.45)`. Never coloured glow shadows (the `.btn-primary` glow was removed in homepage v3; buttons are flat with a 0.97 press).

## Components (use these before making new ones)

| Component | Where | Use |
|---|---|---|
| `.btn-primary` | globals.css | The single primary action per view (cobalt). "Gratis analyse aanvragen". |
| `.btn-outline` / bordered `Link` | globals.css, inline | Secondary action. On light: `border-line`, hover `border-ink/30`. On dark: `border-white/20`, hover `white/50`. |
| Ink button | inline (`bg-ink text-white hover:bg-cobalt`) | Form submit and in-card actions. **Not** for the page's main CTA — that is always `.btn-primary`. |
| `.focus-ring` | globals.css | Required on every interactive element. |
| `.eyebrow` | globals.css | Section label above an H2. Max one per section. |
| `page_intro` | components/blocks/page-intro | Inner-page intro (pill, two-tone H1, lead), static. Contact and blog. |
| `ledger` | components/blocks/ledger | Numbered hairline rows (the homepage "why us" voice) for any set of equals: case "what we built", about values. |
| `SplitHeading` | lib/motion.tsx | Animated two-tone heading with an sr-only full text. |
| `Reveal`, `Stagger`/`StaggerItem` | lib/motion.tsx | Entrance motion (see ae-motion). |
| Moment `Stage` | components/blocks/services/moments/Stage.tsx | A service's short product story on a paper stage, with its rail (pause/replay). Used on the homepage explorer and every service hero. |
| Service signatures | components/blocks/service-signature/ | One interactive component per service: reporting (three.js), operations (three.js), brand (CSS 3D: brand guide → components → page, with the real Energielabel Breda pages as proof), acquisition (2D: ICP controls → scored firms with reasons, layout animation → draft waiting for approval → week numbers), invoicing (2D: hours → invoice → payment → booking, follow one line; reminder lane with a per-client switch). Shared control style: separate bordered buttons on ink (active white), items in white cards (active cobalt). 3D rules: `ae-ui-3d`. |
| Tools strip | components/blocks/service-scope/ServiceScope.tsx | Vendor logos in black at one optical height (`public/logos`, `lib/content/logos.ts`), or the name in Manrope. Rules: `docs/logo-usage.md`. |
| `Glyph` | components/blocks/service-hero/Glyph.tsx | A service's module mark (from the hero engine), for eyebrows and links. |
| `closing_cta` | components/blocks/closing-cta | The closing dark chapter on every page. Inner pages pass `clock: null` (no 07:00 clock). `CtaBand`/`PageHeader` were archived in phase 5. |
| Errors | contact-form/Form.tsx | Ink text with a `warn` marker and `border-warn` on the field; never red, never warn-coloured text. |
| Footer | components/Footer.tsx | `bg-ink-2` (one tone step below the ink closing chapter), on the frame lines; no CTA of its own. |
| Icons | components/icons.tsx | 24px stroke icons, 1.8 stroke. Always `aria-hidden` when decorative. Only names that exist in the `paths` map. |

## Imagery and illustration

- The site's illustration language is **product UI**: calm app windows showing the real workflows (example data, always labelled "Voorbeeld"/"Example"). Prefer a scene over an icon, and an icon over nothing. See ae-section-composer.
- Example data stays fictional and consistent: Van Dijk Accountancy, De Vries Installatie, Jansen Logistiek, Bakker Advocaten, De Wit Bouw; people Peter, Sanne, Mark, Pieter, Anne, Jos.
- Real photography: only `public/images/nick-smid.jpg`. No stock photos, no AI people.
- Line art (`LineArt.tsx`) is for blog covers only.

## Voice in UI text

- NL formal "u". EN plain and direct.
- "we" for the company and services; "I" only for Nick's own story on About.
- Buttons say what happens: "Gratis analyse aanvragen", not "Meer".
- Every user-facing string, including `aria-label`s, exists in both `nl` and `en`.
