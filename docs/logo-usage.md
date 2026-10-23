# Tool logos: usage, sources and brand-guideline notes

Phase 3 (Oct 2026). The "Werkt onder meer met" / "Works with, among others" strip on the five service pages
(`service_scope` → tools) shows logos instead of names. This file lists every logo, where it came from, and
what the vendor's brand guidelines say about using it the way we do.

## How the strip uses logos

- Files live in `public/logos/*.svg` (no hotlinking). Registry: `lib/content/logos.ts`.
- One treatment for all: **monochrome black (#000)**, one optical height, generous spacing. The SVGs were
  recoloured to #000, white backing shapes removed, cropped to the ink, and given optical padding inside the
  artboard so marks of different weight read at one size (height factor `(w/h/3.5)^-0.4`, base 26 px on phone,
  33 px from 640 px).
- Every logo has the tool name as `alt`, and the name appears in a tooltip on hover and keyboard focus.
- No "partner", "certified" or "official" wording. The strip only says we work with these tools.
- When no clean official logo exists, or the vendor doesn't allow this use, the strip shows the **name in
  Manrope** instead. A missing logo is better than a bad or non-compliant one.
- In WordPress, the tools field is a repeater: `name` (required), `logo` (media, SVG/PNG, optional),
  `order` (optional). Editors upload the approved file per tool; empty logo = name.

### Decision to confirm: black, not ink

The brief asked for "ink on light". The logos render in pure black (#000), not ink (#0B1B33), because most
vendors only approve their full-colour, black or white versions and forbid recolouring. Ink is close but is a
recolour. Recolouring with a CSS mask would avoid editing files, but masks need CORS headers on WordPress media,
so it was dropped. If you prefer ink anyway, it is a one-line change per SVG; the legal risk is small but real.

## Logos in use

| Tool | File | Source | Licence on source | Guideline notes | Status |
|---|---|---|---|---|---|
| WordPress | `wordpress.svg` | Wikimedia Commons, [WordPress Logotype Standard](https://commons.wikimedia.org/wiki/File:WordPress_Logotype_Standard.svg) (from wordpress.org/about/logos) | Public domain (text logo), trademarked | WordPress Foundation provides black and white versions of the logotype. Don't alter the mark or imply endorsement. | Black version: allowed. **Owner to confirm** against wordpress.org/about/logos. |
| Figma | `figma.svg` | Figma brand kit (black wordmark), linked from [figma.com/using-the-figma-brand](https://www.figma.com/using-the-figma-brand/) | Trademark, provided for referencing Figma | Read in session: "Don't modify our marks"; a black and a white logo are provided; don't imply affiliation or partnership. | Uses Figma's own black wordmark unchanged (only cropped/padded). OK. |
| Blender | `blender.svg` | Wikimedia Commons, [Blender Logo](https://commons.wikimedia.org/wiki/File:Blender_Logo.svg) | Public domain (text logo), trademarked by Blender Foundation | Blender Foundation allows use of the logo to refer to Blender; one-colour versions exist. The white "eye" backing was removed for a single colour. | **Owner to confirm** against blender.org/about/logo. |
| Next.js | `nextjs.svg` | Wikimedia Commons, [Next.js wordmark](https://commons.wikimedia.org/wiki/File:Next.js_wordmark.svg) | Public domain, trademarked (Vercel) | Vercel's brand assets offer black and white wordmarks. | **Owner to confirm** against vercel.com/geist/brands. |
| Vercel | `vercel.svg` | Wikimedia Commons, [Vercel logo 2025](https://commons.wikimedia.org/wiki/File:Vercel_logo_2025.svg) | Public domain, trademarked | As Next.js: black and white versions provided. | **Owner to confirm** (same page). |
| HubSpot | `hubspot.svg` | Wikimedia Commons, [HubSpot Logo](https://commons.wikimedia.org/wiki/File:HubSpot_Logo.svg) | Public domain, trademarked | HubSpot's main logo is orange; check whether their brand guide permits a solid black version. | **Owner to confirm.** If not allowed, switch to the name. |
| LangChain | `langchain.svg` | Wikimedia Commons, [LangChain Logo](https://commons.wikimedia.org/wiki/File:LangChain_Logo.svg) (from the LangChain repo) | MIT, trademarked | No public guideline found. The mark is monochrome by default. | Fine as is. |
| Stripe | `stripe.svg` | Wikimedia Commons, [Stripe Logo, revised 2016](https://commons.wikimedia.org/wiki/File:Stripe_Logo,_revised_2016.svg) | Public domain, trademarked | Stripe's main wordmark is blurple; check whether black is an approved variant. | **Owner to confirm.** |
| DocuSign | `docusign.svg` | Wikimedia Commons, [DocuSign Logo](https://commons.wikimedia.org/wiki/File:DocuSign_Logo.svg) | Public domain, trademarked | Check DocuSign's brand guide for one-colour use. | **Owner to confirm.** |
| Cal.com | `calcom.svg` (unused) | cal.com/logo.svg | Trademark | The repo's black wordmark now reads "Cal.diy", so the site file was used. | Not shown: Cal.com was dropped from Brand to stay within 8 tools. |

"Owner to confirm" means: the file is a faithful copy of the vendor's mark, but I couldn't read that vendor's
current guideline in this session to confirm that a solid-black version is allowed. A 10-minute check per
vendor before launch closes this. Each one falls back to its name by clearing the `logo` field.

Minimum sizes: the strip renders logos 26–40 px high (roughly 90–200 px wide), above every minimum we found.
n8n's 100 px minimum width is the exception (below).

## Shown as names, and why

| Tool | Why no logo |
|---|---|
| Elementor Pro | Elementor's guidelines allow only approved colour pairings (pink, burgundy, bright on dark); a black version isn't among them. |
| Microsoft 365, Copilot Studio, Power BI, Excel | Microsoft restricts third-party use of its product logos (permission required); names are the safe route. |
| Google Workspace, Looker Studio | Google's brand permissions require approval for product logos in marketing. |
| Adobe Creative Cloud, Adobe Acrobat Sign | Adobe doesn't allow third parties to use its logos without a licence. |
| n8n | Guidelines require Brand Black #040506 or white, at a minimum width of 100 px. At strip size this would dominate; the name is cleaner. Could be added later at its own minimum width. |
| Exact Online, Twinfield, Moneybird, Mollie, Calendly, PandaDoc, Higgsfield | No clean official SVG found (press kits behind forms, raster only, or none). Add them when the owner gets the files from the vendor. |
| AI-agents op maat / Custom AI agents (LangChain) | Uses the LangChain logo. |
| Dashboard op maat / Custom dashboard | Not a product; name only. |
| Urenregistratie / Time tracking | Generic description (replaced Toggl Track); name only. |

## Adding or changing a logo

1. Get the vendor's official one-colour (black) SVG from their brand page; note the URL and date here.
2. Check the guideline: monochrome allowed? minimum size? clear space? Record it in the table above.
3. Add the file to `public/logos/` (or the WordPress media library), set `fill="#000"`, crop to the ink and
   add the optical padding (scratchpad normaliser, or by hand: room above, below and on the right only).
4. Register it in `lib/content/logos.ts` (url, width, height) and set `logo` on the tool in `lib/i18n/{nl,en}.ts`.
5. Look at the strip at 390 and 1440: does the new mark read at the same size as its neighbours?
