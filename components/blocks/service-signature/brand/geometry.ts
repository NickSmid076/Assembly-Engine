// The brand signature as data: where every part of each example page sits, per page and device, how far it lifts
// in the exploded view, and where each brand-guide token floats above the part it styles. No React. Read by the
// stage (CSS 3D on desktop, flat on phones), so both views can't drift apart. Units are CSS px at the stage's
// logical size; the stage scales everything to fit its box.
import type { BrandComponent, BrandDevice, BrandPage } from "../schema";

export type Rect = { x: number; y: number; w: number; h: number };
export type Token = "mark" | "display" | "body" | "ink" | "accent" | "tint";
export const TOKENS: Token[] = ["mark", "display", "body", "ink", "accent", "tint"];

/** The desktop stage's logical box: room for the exploded view. */
export const STAGE = { w: 800, h: 600 };

/** Each device: the screen (the page) and the frame around it. Screens match the case screenshots' aspect
 *  (1440 × 900 and 390 × 844), so the real pages drop into the same frame without cropping. */
export const DEVICE: Record<BrandDevice, { screen: { w: number; h: number }; bar: number; bezel: number; radius: number }> = {
  desktop: { screen: { w: 640, h: 400 }, bar: 28, bezel: 0, radius: 12 },
  phone: { screen: { w: 220, h: 476 }, bar: 0, bezel: 8, radius: 30 },
};
export const plateSize = (d: BrandDevice) => {
  const D = DEVICE[d];
  return { w: D.screen.w + D.bezel * 2, h: D.screen.h + D.bar + D.bezel * 2 };
};

/** The camera. Exploded: the house isometric angle (as the hero engine), the plate lying flat and the parts
 *  standing above it. Assembled: straight on, a little larger. */
export const VIEW: Record<BrandDevice, { assembled: number; exploded: number; shiftX: number; shiftY: number }> = {
  desktop: { assembled: 1.18, exploded: 0.84, shiftX: 0, shiftY: 84 },
  phone: { assembled: 1.1, exploded: 1, shiftX: 10, shiftY: 108 },
};
export const TILT = { x: 54, z: -38 };

/** How high each part floats in the exploded view (px above the page). Structure low, actions high. */
export const LIFT: Record<BrandComponent, number> = {
  footer: 40, header: 50, crumb: 80, hero: 118, list: 140, form: 140, cards: 150, aside: 170, button: 196,
};
export const TOKEN_Z = 300;

export type Layout = {
  blocks: { id: BrandComponent; r: Rect }[];
  /** Where each token floats (screen coords) and the part it drops into. */
  tokens: Record<Token, { x: number; y: number; into: BrandComponent }>;
};

const H = (w: number): Rect => ({ x: 0, y: 0, w, h: w > 300 ? 46 : 40 });

export const LAYOUT: Record<BrandPage, Record<BrandDevice, Layout>> = {
  home: {
    desktop: {
      blocks: [
        { id: "header", r: H(640) },
        { id: "hero", r: { x: 40, y: 80, w: 340, h: 124 } },
        { id: "button", r: { x: 40, y: 218, w: 184, h: 38 } },
        { id: "aside", r: { x: 432, y: 84, w: 168, h: 136 } },
        { id: "cards", r: { x: 40, y: 280, w: 560, h: 82 } },
        { id: "footer", r: { x: 0, y: 374, w: 640, h: 26 } },
      ],
      tokens: {
        mark: { x: 56, y: 22, into: "header" }, display: { x: 150, y: 112, into: "hero" }, accent: { x: 132, y: 236, into: "button" },
        tint: { x: 516, y: 150, into: "aside" }, body: { x: 320, y: 320, into: "cards" }, ink: { x: 470, y: 388, into: "footer" },
      },
    },
    phone: {
      blocks: [
        { id: "header", r: H(220) },
        { id: "hero", r: { x: 16, y: 58, w: 188, h: 134 } },
        { id: "button", r: { x: 16, y: 202, w: 188, h: 34 } },
        { id: "cards", r: { x: 16, y: 250, w: 188, h: 182 } },
        { id: "footer", r: { x: 0, y: 446, w: 220, h: 30 } },
      ],
      tokens: {
        mark: { x: 34, y: 20, into: "header" }, display: { x: 80, y: 92, into: "hero" }, accent: { x: 110, y: 219, into: "button" },
        body: { x: 66, y: 300, into: "cards" }, tint: { x: 154, y: 384, into: "cards" }, ink: { x: 110, y: 461, into: "footer" },
      },
    },
  },
  service: {
    desktop: {
      blocks: [
        { id: "header", r: H(640) },
        { id: "crumb", r: { x: 40, y: 64, w: 300, h: 16 } },
        { id: "hero", r: { x: 40, y: 92, w: 340, h: 116 } },
        { id: "list", r: { x: 40, y: 224, w: 340, h: 104 } },
        { id: "aside", r: { x: 412, y: 92, w: 188, h: 118 } },
        { id: "button", r: { x: 412, y: 224, w: 188, h: 38 } },
        { id: "footer", r: { x: 0, y: 374, w: 640, h: 26 } },
      ],
      tokens: {
        mark: { x: 56, y: 22, into: "header" }, display: { x: 150, y: 120, into: "hero" }, body: { x: 210, y: 276, into: "list" },
        tint: { x: 506, y: 150, into: "aside" }, accent: { x: 506, y: 243, into: "button" }, ink: { x: 470, y: 388, into: "footer" },
      },
    },
    phone: {
      blocks: [
        { id: "header", r: H(220) },
        { id: "crumb", r: { x: 16, y: 52, w: 188, h: 14 } },
        { id: "hero", r: { x: 16, y: 74, w: 188, h: 124 } },
        { id: "list", r: { x: 16, y: 208, w: 188, h: 92 } },
        { id: "button", r: { x: 16, y: 310, w: 188, h: 34 } },
        { id: "aside", r: { x: 16, y: 356, w: 188, h: 78 } },
        { id: "footer", r: { x: 0, y: 446, w: 220, h: 30 } },
      ],
      tokens: {
        mark: { x: 34, y: 20, into: "header" }, display: { x: 80, y: 110, into: "hero" }, body: { x: 110, y: 254, into: "list" },
        accent: { x: 110, y: 327, into: "button" }, tint: { x: 110, y: 395, into: "aside" }, ink: { x: 110, y: 461, into: "footer" },
      },
    },
  },
  contact: {
    desktop: {
      blocks: [
        { id: "header", r: H(640) },
        { id: "hero", r: { x: 40, y: 74, w: 320, h: 104 } },
        { id: "form", r: { x: 40, y: 190, w: 320, h: 126 } },
        { id: "button", r: { x: 40, y: 326, w: 132, h: 36 } },
        { id: "aside", r: { x: 400, y: 74, w: 200, h: 150 } },
        { id: "footer", r: { x: 0, y: 374, w: 640, h: 26 } },
      ],
      tokens: {
        mark: { x: 56, y: 22, into: "header" }, display: { x: 150, y: 104, into: "hero" }, body: { x: 200, y: 254, into: "form" },
        accent: { x: 106, y: 344, into: "button" }, tint: { x: 500, y: 150, into: "aside" }, ink: { x: 470, y: 388, into: "footer" },
      },
    },
    phone: {
      blocks: [
        { id: "header", r: H(220) },
        { id: "hero", r: { x: 16, y: 56, w: 188, h: 112 } },
        { id: "form", r: { x: 16, y: 178, w: 188, h: 122 } },
        { id: "button", r: { x: 16, y: 310, w: 188, h: 34 } },
        { id: "aside", r: { x: 16, y: 356, w: 188, h: 78 } },
        { id: "footer", r: { x: 0, y: 446, w: 220, h: 30 } },
      ],
      tokens: {
        mark: { x: 34, y: 20, into: "header" }, display: { x: 80, y: 90, into: "hero" }, body: { x: 110, y: 236, into: "form" },
        accent: { x: 110, y: 327, into: "button" }, tint: { x: 110, y: 395, into: "aside" }, ink: { x: 110, y: 461, into: "footer" },
      },
    },
  },
};

/** Which parts each token styles (for highlighting); filtered to the parts on the current page. */
export const USES: Record<Token, BrandComponent[]> = {
  mark: ["header", "footer"],
  display: ["hero", "cards", "aside"],
  body: ["hero", "cards", "list", "form", "aside", "crumb"],
  ink: ["header", "hero", "footer"],
  accent: ["button", "list", "crumb"],
  tint: ["cards", "aside", "form"],
};

/** Choreography of "put it together" (ms). Tokens drop into their parts, the parts settle onto the page, then the
 *  camera turns to face the finished page. "Take it apart" runs the same steps in reverse. */
export const TIMING = {
  tokenStep: 70, tokenDrop: 520,
  partStart: 640, partStep: 55, partDrop: 560,
  turnStart: 1180, turn: 900,
  // reverse
  rTurn: 760, rPartStart: 420, rTokenStart: 860,
};
export const ASSEMBLED_AT = TIMING.turnStart + TIMING.turn; // ≈ 2.1 s

/** When a part turns from unstyled to styled: as soon as its first token lands (or with the settle if none). */
export function styledAt(layout: Layout, id: BrandComponent) {
  const order = TOKENS.filter((t) => layout.tokens[t].into === id).map((t) => TOKENS.indexOf(t));
  if (!order.length) return TIMING.partStart;
  return Math.min(...order) * TIMING.tokenStep + TIMING.tokenDrop - 120;
}
