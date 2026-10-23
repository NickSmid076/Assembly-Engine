// The reporting system as an isometric SVG, drawn from geometry.ts. It is the first paint, the fallback
// without WebGL, and the whole stage under reduced motion, so it reacts to the selection too: the chosen
// figure's sources and tile lift, its wires turn cobalt and draw once from source to tile.
import { boxFaces, iso } from "../../hero-home/engine-geometry";
import { LIFT, PLATE, SLAB, SOURCES, TILE, TILE_COLORS, VIEW, tileAt, type P3, type Wire } from "./geometry";

const path = (pts: P3[]) => pts.map((p, i) => `${i ? "L" : "M"}${iso(...p).map((n) => n.toFixed(3)).join(",")}`).join("");
/** Screen offset (SVG units) of a lift by dy world units. */
const lift = (dy: number) => (-2 * dy) / Math.sqrt(6);

function Faces({ b, base = 0, top, sideX, sideZ, edge = "#0B1B33", edgeOpacity = 0.25 }: {
  b: { x: number; z: number; w: number; d: number; h: number }; base?: number; top: string; sideX: string; sideZ: string; edge?: string; edgeOpacity?: number;
}) {
  const f = boxFaces(b, base);
  const stroke = { stroke: edge, strokeOpacity: edgeOpacity, strokeWidth: 0.012, strokeLinejoin: "round" as const };
  return (
    <>
      <polygon points={f.sideZ} fill={sideZ} {...stroke} className="transition-[fill] duration-300" />
      <polygon points={f.sideX} fill={sideX} {...stroke} className="transition-[fill] duration-300" />
      <polygon points={f.top} fill={top} {...stroke} className="transition-[fill] duration-300" />
    </>
  );
}

export default function Poster({ wires, selected, onSelect, drawKey, className = "" }: {
  wires: Wire[]; selected: number; onSelect: (kpi: number) => void;
  /** Changes whenever the active wires should draw again (selection, or the stage coming into view); null = no drawing. */
  drawKey: string | null; className?: string;
}) {
  const on = wires.filter((w) => w.kpi === selected);
  const lit = new Set(on.map((w) => w.source));
  // Split each wire where it climbs onto the slab: the plate part is drawn under the slab, the top part over it.
  const split = (w: Wire) => ({ low: w.points.slice(0, -2), high: w.points.slice(-2) });

  return (
    <svg viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`} className={className} aria-hidden>
      <Faces b={PLATE} base={-PLATE.h} top={PLATE.top} sideX={PLATE.sideX} sideZ={PLATE.sideZ} edge={PLATE.edge} edgeOpacity={1} />

      {/* Wires on the plate: every connection dim, the selected figure's on top in cobalt. */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {wires.map((w, i) => <path key={i} d={path(split(w).low)} stroke="#3B5A92" strokeWidth={0.05} />)}
        {on.map((w) => (
          <path key={`${drawKey}-${w.source}`} d={path(split(w).low)} stroke="#4A73FF" strokeWidth={0.06} pathLength={1}
            className={drawKey ? "sig-draw" : undefined} />
        ))}
      </g>

      {SOURCES.map((b, s) => (
        <g key={s} className="transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateY(${lit.has(s) ? lift(LIFT.source) : 0}px)` }}>
          <Faces b={b} top={b.top} sideX={b.sideX} sideZ={b.sideZ} />
        </g>
      ))}

      <Faces b={SLAB} top={SLAB.top} sideX={SLAB.sideX} sideZ={SLAB.sideZ} />

      <g fill="none" strokeLinecap="round">
        {wires.map((w, i) => <path key={i} d={path(split(w).high)} stroke="#B9C4DA" strokeWidth={0.05} />)}
        {on.map((w) => (
          <path key={`${drawKey}-${w.source}`} d={path(split(w).high)} stroke="#2E5BFF" strokeWidth={0.06} pathLength={1}
            className={drawKey ? "sig-draw sig-draw-late" : undefined} />
        ))}
      </g>

      {[0, 1, 2, 3].map((k) => {
        const t = tileAt(k), sel = k === selected;
        return (
          <g key={k} onClick={() => onSelect(k)} className="cursor-pointer transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ transform: `translateY(${sel ? lift(LIFT.tile) : 0}px)` }}>
            <Faces b={{ ...t, ...TILE }} base={SLAB.h} top={sel ? TILE_COLORS.onTop : TILE_COLORS.top}
              sideX={sel ? TILE_COLORS.onSideX : TILE_COLORS.sideX} sideZ={sel ? TILE_COLORS.onSideZ : TILE_COLORS.sideZ} />
          </g>
        );
      })}
    </svg>
  );
}
