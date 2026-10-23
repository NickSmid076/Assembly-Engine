// The operations signature as an object: two inbox trays (client portal, email) on a plate, a check gate,
// and the client's dossier, a drawer whose five upright cards are the period's checklist items, with a
// sign-off seal at the front. Pure data (no React, no three), shared by the SVG poster, the 3D scene and
// the HTML overlays, so they always line up. World units, y up; projected with the hero's iso().
import { iso } from "../../hero-home/engine-geometry";

export type P3 = [number, number, number];
export type Box = { x: number; z: number; w: number; d: number; h: number };
export type Colors = { top: string; sideX: string; sideZ: string };

/** Five checklist slots along the drawer, back to front (content order). */
export const SLOTS_Z = [-2.0, -1.1, -0.2, 0.7, 1.6];

export const DOSSIER: Box & Colors = { x: 1.55, z: 0.2, w: 1.7, d: 5.3, h: 0.18, top: "#F5F7FB", sideX: "#C9D2E6", sideZ: "#A9B6D3" };
export const CARD = { w: 1.2, d: 0.07, h: 0.95 };
export const CARD_COLORS = { top: "#FFFFFF", sideX: "#D5DBE6", sideZ: "#FFFFFF", onTop: "#4A73FF", onSideX: "#2048D8", onSideZ: "#2E5BFF" };
export const cardAt = (slot: number): Box => ({ x: DOSSIER.x - 0.05, z: SLOTS_Z[slot], ...CARD });
/** One flat chip per reminder sent, floating over a missing item's outline (k = 0: day 3, 1: day 7). */
export const chipAt = (slot: number, k: number) => ({ x: DOSSIER.x - 0.05, z: SLOTS_Z[slot], w: 0.5, d: 0.36, h: 0.05, base: DOSSIER.h + CARD.h + 0.16 + k * 0.17 });
export const SEAL: Box = { x: DOSSIER.x, z: 2.45, w: 0.62, d: 0.5, h: 0.3 };
export const SEAL_COLORS = {
  waiting: { top: "#8FA0BF", sideX: "#5C6B85", sideZ: "#4A5870" },
  ready: { top: "#4A73FF", sideX: "#2E5BFF", sideZ: "#2048D8" },
  signed: { top: "#14AE5C", sideX: "#0E8F4B", sideZ: "#0B7A40" },
} as const;

export const TRAYS: (Box & Colors)[] = [
  { x: -3.0, z: -1.45, w: 1.3, d: 1.5, h: 0.14, top: "#EDF1FF", sideX: "#BFC9E6", sideZ: "#9DABD3" }, // portal
  { x: -3.0, z: 1.45, w: 1.3, d: 1.5, h: 0.14, top: "#C3D0FF", sideX: "#9AACEB", sideZ: "#7C91DB" }, // email
];
export const SHEET = { w: 0.86, d: 1.06, h: 0.03 };
export const CHANNEL = { portal: 0, email: 1 } as const;

export const GATE = { x: -0.75, gap: 1.02, post: { w: 0.22, d: 0.22, h: 0.78 }, beam: 0.18 };
const GATE_COLORS = { top: "#EDF1FF", sideX: "#BFC9E6", sideZ: "#9DABD3" };
export const GATE_PARTS: (Box & Colors & { base: number })[] = [
  { x: GATE.x, z: -(GATE.gap + GATE.post.d) / 2, ...GATE.post, base: 0, ...GATE_COLORS },
  { x: GATE.x, z: (GATE.gap + GATE.post.d) / 2, ...GATE.post, base: 0, ...GATE_COLORS },
  { x: GATE.x, z: 0, w: GATE.post.w, d: GATE.gap + 2 * GATE.post.d, h: GATE.beam, base: GATE.post.h, ...GATE_COLORS },
];

export const PLATE = { x: -0.6, z: 0.2, w: 6.8, d: 6.2, h: 0.28, top: "#13284A", sideX: "#0E1F3B", sideZ: "#0A172E", edge: "#2A4170" } as const;

export const LIFT = { card: 0.42 };
/** Seconds a document takes from its tray to its slot (3D), and when each route step is reached. */
export const TRAVEL = 1.7;

const y0 = 0.006, yTop = DOSSIER.h + 0.006;
const SPINE_X = 0.3, MERGE_X = -1.95;

/** The route of one document: from its tray, through the gate, along the spine, onto the drawer to its slot. */
export function route(channel: number, slot: number): P3[] {
  const t = TRAYS[channel], z = SLOTS_Z[slot], edge = DOSSIER.x - DOSSIER.w / 2;
  return [
    [t.x + t.w / 2, y0, t.z], [MERGE_X, y0, t.z], [MERGE_X, y0, 0], [SPINE_X, y0, 0], [SPINE_X, y0, z],
    [edge, y0, z], [edge, yTop, z], [DOSSIER.x - 0.05, yTop, z],
  ];
}

/** The dim, permanent paths: both trays into the gate, and the spine with a stub to every slot. */
export const RAILS: P3[][] = [
  ...TRAYS.map((t) => [[t.x + t.w / 2, y0, t.z], [MERGE_X, y0, t.z], [MERGE_X, y0, 0]] as P3[]),
  [[MERGE_X, y0, 0], [SPINE_X, y0, 0]],
  [[SPINE_X, y0, SLOTS_Z[0]], [SPINE_X, y0, SLOTS_Z[SLOTS_Z.length - 1]]],
  ...SLOTS_Z.map((z) => [[SPINE_X, y0, z], [DOSSIER.x - DOSSIER.w / 2, y0, z]] as P3[]),
];

const segLens = (pts: P3[]) => pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1], p[2] - pts[i][2]));

/** Length-parameterised point on a polyline (k from 0 to 1). */
export function along(points: P3[], k: number): P3 {
  const lens = segLens(points);
  let s = k * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    const a = points[i], b = points[i + 1];
    if (s <= lens[i]) { const t = lens[i] ? s / lens[i] : 0; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    s -= lens[i];
  }
  return points[points.length - 1];
}

/** Fraction of the route at which the document passes the gate (shared by the 3D and the route steps). */
export function gateAt(points: P3[]) {
  const lens = segLens(points), total = lens.reduce((a, b) => a + b, 0);
  let s = 0;
  for (let i = 0; i < lens.length; i++) {
    const a = points[i], b = points[i + 1];
    if (a[2] === 0 && b[2] === 0 && a[0] <= GATE.x && b[0] >= GATE.x) return (s + (GATE.x - a[0])) / total;
    s += lens[i];
  }
  return 0.4;
}

/** When each of the four route steps is reached, in seconds after the document leaves its tray. */
export const stepTimes = (points: P3[]) => { const g = gateAt(points) * TRAVEL; return [0, g, g + 0.3, TRAVEL]; };

/** The SVG/camera frame: every corner of every block, with room above for a lifted card and its label. */
export const VIEW = (() => {
  const pts: [number, number][] = [];
  const add = (b: Box, base: number, extra = 0) => {
    for (const x of [b.x - b.w / 2, b.x + b.w / 2]) for (const z of [b.z - b.d / 2, b.z + b.d / 2]) for (const y of [base, base + b.h + extra]) pts.push(iso(x, y, z));
  };
  add(PLATE, -PLATE.h);
  SLOTS_Z.forEach((_, i) => add(cardAt(i), DOSSIER.h, LIFT.card + 0.35));
  GATE_PARTS.forEach((g) => add(g, g.base, 0.35));
  TRAYS.forEach((t) => add(t, 0, 0.4));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const pad = 0.25;
  const minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad, maxY = Math.max(...ys) + pad;
  return { minX, minY, w: maxX - minX, h: maxY - minY };
})();

/** A world point as a fraction of VIEW, for HTML overlays. */
export const anchor = (p: P3) => { const [x, y] = iso(...p); return { left: (x - VIEW.minX) / VIEW.w, top: (y - VIEW.minY) / VIEW.h }; };
