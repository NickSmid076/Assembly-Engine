// The reporting signature as an object: three source systems on a plate, wired to a dashboard slab whose
// four tiles are the four figures. Pure data (no React, no three), shared by the SVG poster, the 3D scene
// and the overlay labels, so they always line up. World units, y up; projected with the hero's iso().
import { iso } from "../../hero-home/engine-geometry";

export type P3 = [number, number, number];
export type Block = { x: number; z: number; w: number; d: number; h: number; top: string; sideX: string; sideZ: string };

export const PLATE = { x: -0.3, z: 0, w: 6.0, d: 5.9, h: 0.28, top: "#13284A", sideX: "#0E1F3B", sideZ: "#0A172E", edge: "#2A4170" } as const;

/** Sources, in content order (exact, hours, hubspot): back to front along z. */
export const SOURCES: Block[] = [
  { x: -2.3, z: -1.8, w: 1.3, d: 1.3, h: 0.86, top: "#C3D0FF", sideX: "#9AACEB", sideZ: "#7C91DB" },
  { x: -2.3, z: 0, w: 1.3, d: 1.3, h: 1.06, top: "#EDF1FF", sideX: "#BFC9E6", sideZ: "#9DABD3" },
  { x: -2.3, z: 1.8, w: 1.3, d: 1.3, h: 0.72, top: "#FFFFFF", sideX: "#CED6EC", sideZ: "#AEBADB" },
];

/** The dashboard: a white slab with four tiles on top. */
export const SLAB: Block = { x: 1.25, z: 0, w: 2.0, d: 5.0, h: 0.2, top: "#F5F7FB", sideX: "#C9D2E6", sideZ: "#A9B6D3" };
export const TILE = { w: 1.5, d: 1.04, h: 0.08 };
export const TILE_COLORS = { top: "#FFFFFF", sideX: "#D5DBE6", sideZ: "#B9C4DA", onTop: "#2E5BFF", onSideX: "#2048D8", onSideZ: "#1A3DB8" };

/** Tile slots along z, back to front. `TILE_SLOT[kpi index]` places each figure (content order:
 *  revenue, billable, pipeline, rate) so its wires run nearly straight: rate sits between its two sources. */
export const SLOTS_Z = [-1.86, -0.62, 0.62, 1.86];
export const TILE_SLOT = [0, 2, 3, 1];
export const tileAt = (kpi: number) => ({ x: SLAB.x + 0.08, z: SLOTS_Z[TILE_SLOT[kpi]] });

export const LIFT = { source: 0.32, tile: 0.14 };

/** One wire per (figure, source) pair, routed flat along the plate, then up onto the slab to the tile's edge. */
export type Wire = { kpi: number; source: number; points: P3[] };

export function wires(links: { kpi: number; source: number }[]): Wire[] {
  // Spread the exits on each source face and the entries on each tile, so wires never overlap.
  const outs = SOURCES.map((_, s) => links.filter((l) => l.source === s));
  const ins = SLOTS_Z.map((_, k) => links.filter((l) => l.kpi === k));
  return links.map((l) => {
    const src = SOURCES[l.source], tile = tileAt(l.kpi);
    const o = outs[l.source], oi = o.indexOf(l);
    const into = ins[l.kpi], ii = into.indexOf(l);
    let zs = src.z + (o.length > 1 ? (oi - (o.length - 1) / 2) * 0.42 : 0);
    const zt = tile.z + (into.length > 1 ? (ii - (into.length - 1) / 2) * 0.36 : 0);
    if (Math.abs(zt - zs) < 0.25) zs = zt; // nearly in line: run it straight
    const x0 = src.x + src.w / 2, edge = SLAB.x - SLAB.w / 2, tileEdge = tile.x - TILE.w / 2;
    const y = 0.006, ys = SLAB.h + 0.006, xm = -0.95;
    const bend: P3[] = zs === zt ? [] : [[xm, y, zs], [xm, y, zt]];
    return { kpi: l.kpi, source: l.source, points: [[x0, y, zs], ...bend, [edge, y, zt], [edge, ys, zt], [tileEdge, ys, zt]] };
  });
}

/** Length-parameterised point on a 3D polyline (k from 0 to 1). */
export function along(points: P3[], k: number): P3 {
  const segs = points.slice(1).map((p, i) => ({ a: points[i], b: p, len: Math.hypot(p[0] - points[i][0], p[1] - points[i][1], p[2] - points[i][2]) }));
  let s = k * segs.reduce((n, g) => n + g.len, 0);
  for (const g of segs) {
    if (s <= g.len) { const t = g.len ? s / g.len : 0; return [g.a[0] + (g.b[0] - g.a[0]) * t, g.a[1] + (g.b[1] - g.a[1]) * t, g.a[2] + (g.b[2] - g.a[2]) * t]; }
    s -= g.len;
  }
  return points[points.length - 1];
}

/** The SVG/camera frame: every corner of every block, with room above for lifted sources. */
export const VIEW = (() => {
  const pts: [number, number][] = [];
  const add = (b: { x: number; z: number; w: number; d: number; h: number }, base: number, lift = 0) => {
    for (const x of [b.x - b.w / 2, b.x + b.w / 2]) for (const z of [b.z - b.d / 2, b.z + b.d / 2]) for (const y of [base, base + b.h + lift]) pts.push(iso(x, y, z));
  };
  add(PLATE, -PLATE.h);
  SOURCES.forEach((b) => add(b, 0, LIFT.source + 0.5));
  add(SLAB, 0);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const pad = 0.3;
  const minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad, maxY = Math.max(...ys) + pad;
  return { minX, minY, w: maxX - minX, h: maxY - minY };
})();

/** A world point as a fraction of VIEW, for HTML overlays. */
export const anchor = (p: P3) => { const [x, y] = iso(...p); return { left: (x - VIEW.minX) / VIEW.w, top: (y - VIEW.minY) / VIEW.h }; };
