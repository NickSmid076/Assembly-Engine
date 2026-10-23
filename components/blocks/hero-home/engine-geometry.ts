// The "assembly engine": one chassis plate, a cobalt core and five service modules on traces.
// Pure data, shared by the server-rendered SVG poster (EnginePoster) and the 3D scene (EngineCanvas),
// so both draw exactly the same object. Units are world units; y is up.

export type Box = { id: string; x: number; z: number; w: number; d: number; h: number; top: string; sideX: string; sideZ: string; edge: string; led?: boolean };
export type Trace = { from: number; points: [number, number][] }; // xz polyline, module → core

export const PLATE = { x: 0, z: 0, w: 6.6, d: 4.6, h: 0.3, top: "#13284A", sideX: "#0E1F3B", sideZ: "#0A172E", edge: "#2A4170" } as const;

// Module order = service order (brand, acquisition, operations, invoicing, reporting).
const M = (id: string, x: number, z: number, h: number, top: string, sideX: string, sideZ: string): Box =>
  ({ id, x, z, w: 1.36, d: 1.36, h, top, sideX, sideZ, edge: "#0B1B33" });

export const MODULES: Box[] = [
  M("brand", -2.15, -1.05, 0.62, "#EDF1FF", "#BFC9E6", "#9DABD3"),
  M("acquisition", 2.15, -1.05, 0.9, "#C3D0FF", "#9AACEB", "#7C91DB"),
  M("operations", -2.15, 1.05, 0.78, "#FFFFFF", "#CED6EC", "#AEBADB"),
  M("invoicing", 0, 1.05, 0.5, "#EDF1FF", "#BFC9E6", "#9DABD3"),
  M("reporting", 2.15, 1.05, 1.04, "#C3D0FF", "#9AACEB", "#7C91DB"),
];

export const CORE: Box = { id: "core", x: 0, z: -1.05, w: 1.5, d: 1.5, h: 1.5, top: "#4A73FF", sideX: "#2E5BFF", sideZ: "#2048D8", edge: "#8FA8FF" };

// Traces leave each module towards the core through the gaps between slots.
export const TRACES: Trace[] = [
  { from: 0, points: [[-2.15, -1.05], [0, -1.05]] },
  { from: 1, points: [[2.15, -1.05], [0, -1.05]] },
  { from: 2, points: [[-2.15, 1.05], [-2.15, 0], [-0.45, 0], [-0.45, -1.05]] },
  { from: 3, points: [[0, 1.05], [0, -1.05]] },
  { from: 4, points: [[2.15, 1.05], [2.15, 0], [0.45, 0], [0.45, -1.05]] },
];
export const TRACE_COLOR = "#4A73FF";

/** Isometric projection used by both renderers: camera looks along (-1,-1,-1), y up. Returns SVG coords (y down). */
export function iso(x: number, y: number, z: number): [number, number] {
  return [(x - z) / Math.SQRT2, -(-x + 2 * y - z) / Math.sqrt(6)];
}

/** The three visible faces of a box standing on y = base, as SVG polygons (back to front). */
export function boxFaces(b: { x: number; z: number; w: number; d: number; h: number }, base = 0) {
  const x0 = b.x - b.w / 2, x1 = b.x + b.w / 2, z0 = b.z - b.d / 2, z1 = b.z + b.d / 2, y0 = base, y1 = base + b.h;
  const P = (pts: [number, number, number][]) => pts.map(([x, y, z]) => iso(x, y, z).map((n) => n.toFixed(3)).join(",")).join(" ");
  return {
    top: P([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]),
    sideX: P([[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]]), // +x face, right on screen
    sideZ: P([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]), // +z face, left on screen
  };
}

/** World-space frame both renderers fit to (SVG viewBox and orthographic camera bounds). */
export const VIEW = (() => {
  const pts: [number, number][] = [];
  const add = (b: { x: number; z: number; w: number; d: number; h: number }, base: number) => {
    for (const x of [b.x - b.w / 2, b.x + b.w / 2]) for (const z of [b.z - b.d / 2, b.z + b.d / 2]) for (const y of [base, base + b.h]) pts.push(iso(x, y, z));
  };
  add(PLATE, -PLATE.h);
  [...MODULES, CORE].forEach((b) => add(b, 0));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const pad = 0.35, liftRoom = 0.9; // room above for modules lifting during the assembly
  const minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad - liftRoom, maxY = Math.max(...ys) + pad;
  return { minX, minY, w: maxX - minX, h: maxY - minY };
})();

/** Painter's order for the SVG: plate, then boxes from back (small x+z) to front. */
export const DRAW_ORDER: Box[] = [...MODULES, CORE].sort((a, b) => a.x + a.z - (b.x + b.z));

/* ---------------------------------------------------------------- module glyphs
 * Each service module carries a mark printed on its top face that echoes its homepage moment:
 * brand = the logo mark, acquisition = the pipeline with the deal in the last column, operations = the
 * dossier with its dividers, invoicing = the invoice with its total, reporting = the bar row.
 * Coordinates are drawn upright as on screen (u to the right, v down), as fractions of the module's
 * size; glyphUV turns them onto the top face so the mark reads upright, like a print on the lid.
 */
type UV = [number, number];
export type Glyph = { lines: UV[][]; fills: UV[][]; accent?: UV[][] };
const rect = (u0: number, v0: number, u1: number, v1: number): UV[] => [[u0, v0], [u1, v0], [u1, v1], [u0, v1], [u0, v0]];

export const GLYPHS: Glyph[] = [
  // brand: rounded mark with the cobalt corner tick
  { lines: [rect(-0.3, -0.3, 0.3, 0.3)], fills: [], accent: [rect(0.08, 0.14, 0.24, 0.22)] },
  // acquisition: three columns, the deal landed in the fourth
  { lines: [[[-0.33, -0.28], [-0.33, 0.28]], [[-0.13, -0.28], [-0.13, 0.28]], [[0.07, -0.28], [0.07, 0.28]]], fills: [], accent: [rect(0.17, -0.12, 0.35, 0.12)] },
  // operations: the dossier and its three dividers
  { lines: [rect(-0.3, -0.22, 0.3, 0.3), [[-0.3, -0.22], [-0.3, -0.31], [-0.06, -0.31], [-0.02, -0.22]], [[-0.1, -0.12], [-0.1, 0.3]], [[0.1, -0.12], [0.1, 0.3]]], fills: [] },
  // invoicing: the invoice, three lines, the total
  { lines: [rect(-0.24, -0.32, 0.24, 0.32), [[-0.13, -0.17], [0.13, -0.17]], [[-0.13, -0.05], [0.13, -0.05]], [[-0.13, 0.07], [0.13, 0.07]]], fills: [], accent: [rect(0.0, 0.16, 0.14, 0.23)] },
  // reporting: the six-week bar row, last bar cobalt
  { lines: [], fills: [rect(-0.3, 0.06, -0.18, 0.3), rect(-0.12, -0.04, 0.0, 0.3), rect(0.06, 0.0, 0.18, 0.3)], accent: [rect(0.24, -0.26, 0.36, 0.3)] },
];
export const GLYPH_INK = "#0B1B33";
export const GLYPH_ACCENT = "#2E5BFF";

/** Screen-upright glyph coordinates → the module's top face (local x, z). Screen right on the lid is
 *  (+x, −z), screen down is (+x, +z) in this isometric view. */
export const glyphUV = (b: { w: number; d: number }, [u, v]: UV): [number, number] => [((u + v) / Math.SQRT2) * b.w, ((v - u) / Math.SQRT2) * b.d];
/** A glyph point on a module's top face, in world coordinates. */
export const glyphPoint = (b: Box, uv: UV): [number, number, number] => { const [lx, lz] = glyphUV(b, uv); return [b.x + lx, b.h + 0.004, b.z + lz]; };

/** Where each module's label sits on screen, as fractions of VIEW (top centre of the module). */
export const MODULE_ANCHORS = MODULES.map((b) => {
  const [px, py] = iso(b.x, b.h, b.z);
  return { left: (px - VIEW.minX) / VIEW.w, top: (py - VIEW.minY) / VIEW.h };
});
