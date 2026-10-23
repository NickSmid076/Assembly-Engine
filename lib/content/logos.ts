// Tool logos stored locally in public/logos (no hotlinking). Each file is the vendor's own mark in one colour
// (black, #000), cropped to its ink with optical padding baked into the artboard so marks of different weight read
// at one size. Sources, licences and brand-guideline notes: docs/logo-usage.md.
// In WordPress these become the `logo` media field of the tools repeater; the connector returns the same image shape.

export const LOGOS = {
  wordpress: { url: "/logos/wordpress.svg", width: 1664, height: 339 },
  figma: { url: "/logos/figma.svg", width: 858, height: 319 },
  blender: { url: "/logos/blender.svg", width: 1472, height: 385 },
  nextjs: { url: "/logos/nextjs.svg", width: 494, height: 100 },
  vercel: { url: "/logos/vercel.svg", width: 2775, height: 554 },
  calcom: { url: "/logos/calcom.svg", width: 135, height: 28 },
  hubspot: { url: "/logos/hubspot.svg", width: 128, height: 36 },
  langchain: { url: "/logos/langchain.svg", width: 240, height: 41 },
  stripe: { url: "/logos/stripe.svg", width: 483, height: 201 },
  docusign: { url: "/logos/docusign.svg", width: 167, height: 37 },
} as const;

export type LogoKey = keyof typeof LOGOS;
