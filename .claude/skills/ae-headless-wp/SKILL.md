---
name: ae-headless-wp
description: Keeps the Assembly Engine Next.js site ready for headless WordPress — every section receives its content as props from a content layer whose shapes match what WordPress (REST + ACF, Polylang) will return, with the planned post types, ACF fields, options page and preview mode. Use whenever you build or change a section, page, route or content file on the site, or when planning the WordPress move.
---

# Headless-WordPress readiness

Goal: moving to WordPress later means **writing one connector** (`lib/content/wordpress.ts`),
not redesigning components. Today the content lives in `lib/i18n/{nl,en}.ts`; the content layer
reshapes it into WordPress-shaped data so components never notice the switch.

## The rules

1. **Sections take content from outside.** A section component receives its content as a typed prop
   (`content: HeroHomeBlock`, inferred from the block's zod schema). It never imports `lib/i18n/*`, never calls `useI18n().t.<section>`
   for its content, and never hard-codes visible copy or example data (the HeroEngine runs, scene data,
   labels). UI-chrome strings shared by all sections (e.g. "Voorbeeld", "Pauzeren") come from the
   globals object, also via props or a provider fed by the content layer.
2. **Pages fetch, sections render.** Route files (`app/[locale]/**/page.tsx`) are server components.
   They call the content layer (`getHomePage(locale)`, `getService(locale, slug)`, …) and pass each
   section its content. Client components stay presentation-only.
3. **Shapes mirror WordPress.** Field names are `snake_case` like ACF. Flexible-content sections carry
   `acf_fc_layout`. Links are ACF link objects `{ title, url, target }` with **already-localised URLs**
   (`/nl/contact`). Images are ACF image objects `{ url, alt, width, height }`. Repeaters are arrays of
   objects. Optional fields may be `null` or `""` — components must handle both.
4. **One source switch.** `lib/content/source.ts` picks the source with `CONTENT_SOURCE=local|wordpress`
   (default `local`). Both sources return the same types from `lib/content/types.ts`.
8. **Every section is a block with a zod schema.** `components/blocks/<block>/` holds the component
   (`<Block>.tsx`, prop `content`) and `schema.ts` (zod; the TS type is `z.infer`). Pages render
   `renderBlocks(page.sections)` from `components/blocks/render.tsx`, which validates each block: a bad
   shape throws in development and is skipped (and logged) in production.
5. **Both locales, same shape.** Every getter takes `locale` (`"nl" | "en"`); NL is default.
   In WordPress, Polylang links translations; the connector asks for `?lang=nl|en`.
6. **No rich text in strings.** Emphasis that matters for layout (accent words, two-tone headings) is
   structured data (`heading_parts: [{ text, accent }]`, `heading: { lead, rest }`), not HTML or
   markdown. Long-form body (blog articles, case study prose) is sanitised HTML from WordPress and
   rendered through one `RichText` component.
7. **Content is data, design is code.** Editors choose *which* sections and *what* they say; they don't
   choose colours, sizes or layouts. Variants are limited enums (`side: "left" | "right"`), never CSS.

## Folder layout

```
components/blocks/
  shared.ts             zod for ACF link / image / heading_parts
  ui.tsx                Heading, CtaLink, H2 scale, ghost buttons (no copy)
  render.tsx            renderBlocks(): layout → block, zod-validated
  <block>/schema.ts     zod schema + inferred type (acf_fc_layout literal)
  <block>/<Block>.tsx   the component; client parts in their own files
lib/content/
  types.ts              Section union + page types (re-exports block types)
  source.ts             the one entry: getHomePage, getServicePage, getServiceSlugs; picks CONTENT_SOURCE
  local.ts              reshapes lib/i18n/{nl,en}.ts into the block shapes (today)
  wordpress.ts          fetches WP REST + ACF (later; same return types)
  index.ts              re-exports types + getters
```

Home blocks today: `hero_home`, `how_it_runs`, `process`, `services`, `proof`, `why_us`, `closing_cta`.
Inner-page blocks (phase 5): `page_intro`, `case_hero`, `case_findings`, `ledger`, `case_pages`, `case_results`, `case_timeline`, `quote`, `contact_form`, `about_hero`, `about_story`, `blog_list`, `post_header`, `rich_text`.
Service blocks: `service_hero`, `service_signature`, `service_steps`, `service_scope`, `service_principles`, `service_faq`, `service_others` (plus `process`, `proof`, `closing_cta`).

When you migrate a section: write its `schema.ts`, add it to `Section` and the `renderBlocks` registry,
add its mapping to `local.ts`, change the component to take the prop. Leave the old dictionary keys in place
until every consumer has moved, then remove them.

## Planned WordPress structure

**Plugins:** ACF Pro (fields, flexible content, options page), Polylang (NL/EN), WPGraphQL is
optional — the connector targets the REST API with `acf_format=standard` so shapes match these types.

**Options page `site_settings`** (one per language):
- `nav` — repeater: `label`, `link`, `children` (repeater: `label`, `link`, `description`)
- `primary_cta` — link (the "Gratis analyse aanvragen" button)
- `contact_email`, `cal_link`, `location` — text
- `footer_tagline` — text; `footer_columns` — repeater
- `ui_labels` — group: `example`, `pause`, `play`, `menu`, `close`, `language`, `read_more`, `min_read`

**Page `home`** — ACF flexible content field `sections` with layouts:
`hero_home`, `demo`, `timeline` (how we work), `statement` (who we are), `chapters` (services overview),
`hours_band`, `rows` (advantages), `blog_teaser`, `newsletter`.

**CPT `service`** (slug = service slug, translated via Polylang). Since service pages phase 1 (Oct 2026) a
service page is flexible content like the homepage: field `sections`, ACF draft
`wordpress/acf-json/group_service_sections.json`, getter `getServicePage(locale, slug)` (slugs:
`getServiceSlugs()`). Layouts, in page order:
- `service_hero`: `service` (brand/acquisition/operations/invoicing/reporting, picks the glyph), eyebrow, heading_parts, body, CTAs, `story_labels`, `moment` (the homepage moment schema).
- `service_signature`: heading_parts, `points`, `component` (flexible content, one layout per kind: `reporting` (sources, kpis with lineage, formula) `operations` (items, clients, periods, one dossier per client × period with received/missing docs and a sign-off state) and `brand` (labels, the fictional example brand with nav, type and 3 colours, 9 component labels, 3 pages × words, proof per page with desktop/phone screenshots and sourced facts, initial page/device; layouts per page × device stay in code, `brand/geometry.ts`; ACF `nav` is a repeater of `label`, the connector flattens it to strings), `acquisition` (labels, tool, approver, ICP `options` per sector/size/region, 3–5 `firms` with signal, per-dimension `facts` {value, matches: option ids} and a `draft`, `week` numbers, initial; ACF `matches` and `draft.lines` are repeaters the connector flattens to strings) and `invoicing` (labels, tools, 2–3 `clients` with hour `lines`, invoice totals, `payment` paid|open, `ledger` rows with one revenue row, `reminders` sent|planned|skipped; amounts are preformatted text per locale)). Since phase 4 (Oct 2026) every service has a signature.
- `service_steps` (retired from all five pages in phase 4; the block stays in the registry for WordPress pages that still use it): label, heading_parts, steps.
- `proof` (Brand only: the one real case), `process` (the homepage's 5 steps), reused as-is.
- `service_scope`: heading_parts, `included` and `excluded` (`label`, `items` as strings), `tools` (`label`, `items` repeater of 4–8: `name`, `logo` (image, optional; empty = name in Manrope), `order` (optional), `tail`). Logo rules: `docs/logo-usage.md`.
- `service_principles`: heading_parts + items (`title`, `text`).
- `service_faq`: heading_parts + items (`q`, `a`).
- `service_others`: label + items (`service`, `name`, `lead`, `link`); later a relationship field.
- `closing_cta` (homepage block, service copy).

Retired with service pages v1 (archived in `archive/service-pages-v1/`): the `usps`, `stat`, `watch` fields
and the `scene` flexible content (`components/ui/scenes.tsx`).

**CPT `case_study`** (since phase 5, Oct 2026) — flexible content `sections`, ACF draft
`wordpress/acf-json/group_case_study.json`, getter `getCasePage(locale, slug)`. Layouts in page order:
`case_hero` (facts, live screenshots, site link), `case_findings` (the old situation as a report), `ledger`
(what was built), `case_pages` (the live pages viewer: page × device, facts with source; replaced the case video
iframe), `case_results` (lead figure + figures grouped by source; only measured numbers), `case_timeline` (dated
events after launch; `future: true` for what isn't measured yet), `quote` (renders nothing while `quote` is null),
`closing_cta` (`clock: null`).

**Posts** — native posts; `category` = tag; ACF draft `group_post.json`: `read_minutes`, `art`
(orbit/well/grid/waves), `status_label` (e.g. "Binnenkort"). Getters `getPost`, `getPostSlugs`, `getBlogIndex`.
The post page is `post_header` + `rich_text` (WordPress `content.rendered`, sanitised on the server by
`components/blocks/rich-text/sanitize.ts`) + `closing_cta`. A post without a body is listed as planned (not
linked) and its page shows an honest "being written" state; it stays `noindex` until it has a body.
Dev-only QA page: `/nl/blog/rich-text-sample` (404 in production).

**Pages `about`, `contact`, `blog`** — flexible content (ACF draft `group_page_sections.json`), getters
`getAboutPage`, `getContactPage`, `getBlogIndex`. Layouts: `page_intro`, `about_hero` (person), `about_story`,
`ledger`, `contact_form` (3 steps → `/api/contact`; Cal.com link from site settings), `blog_list`, `closing_cta`.
Route files are server components; the only client islands are the case viewer and the contact form, both
loaded with `next/dynamic` so they ship only with their own route.

## Preview mode

- Next `draftMode()`: `app/api/preview/route.ts` checks `?secret=` against `WP_PREVIEW_SECRET`, enables
  draft mode and redirects to the localised path for `?type=&id=`.
- The WordPress connector, when draft mode is on, fetches with authentication
  (application password in `WP_PREVIEW_USER`/`WP_PREVIEW_TOKEN`) and `status=any`, revision-aware.
- `app/api/revalidate/route.ts` receives a WP webhook (`WP_REVALIDATE_SECRET`) and calls
  `revalidateTag("wp:<type>:<id>")`; getters tag their fetches accordingly.
- In `local` mode these routes exist but are no-ops, so the plumbing is tested now.

## Review checklist

- [ ] The section component has a `content` prop typed from `lib/content/types.ts`
- [ ] No import of `lib/i18n` or `useI18n().t.<content>` inside the section
- [ ] The page passes content from a content-layer getter
- [ ] Field names snake_case; links `{title,url,target}` with localised URLs; images with dimensions
- [ ] Handles `null`/empty optional fields without broken UI
- [ ] Both locales return the same shape (type-check passes)
