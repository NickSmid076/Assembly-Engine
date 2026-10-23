// Static drawing of the assembly engine (server-rendered SVG). It is the first paint everywhere, and the
// only version on phones, tablets, reduced motion and without WebGL. Same geometry and projection as
// the 3D scene, so the canvas can fade in on top without a jump. Each module carries its service glyph;
// a hovered or focused module lifts (CSS, driven by `data-hover` on the wrapper in EngineVisual).
import { CORE, DRAW_ORDER, GLYPHS, GLYPH_ACCENT, GLYPH_INK, MODULES, PLATE, TRACES, TRACE_COLOR, VIEW, boxFaces, glyphPoint, iso, type Box } from "./engine-geometry";

const pts = (p: [number, number][]) => p.map(([x, z]) => iso(x, 0.002, z).map((n) => n.toFixed(3)).join(",")).join(" ");
const onTop = (b: Box, line: [number, number][]) => line.map((uv) => iso(...glyphPoint(b, uv)).map((n) => n.toFixed(3)).join(",")).join(" ");

export default function EnginePoster({ className = "" }: { className?: string }) {
  const plate = boxFaces(PLATE, -PLATE.h);
  return (
    <svg viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`} className={className} aria-hidden focusable="false">
      <g strokeLinejoin="round">
        <polygon points={plate.sideZ} fill={PLATE.sideZ} stroke={PLATE.edge} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <polygon points={plate.sideX} fill={PLATE.sideX} stroke={PLATE.edge} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <polygon points={plate.top} fill={PLATE.top} stroke={PLATE.edge} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>
      <g fill="none" stroke={TRACE_COLOR} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" opacity={0.85}>
        {TRACES.map((t, i) => <polyline key={i} points={pts(t.points)} vectorEffect="non-scaling-stroke" />)}
      </g>
      {DRAW_ORDER.map((b) => {
        const f = boxFaces(b);
        const isCore = b.id === CORE.id;
        const mi = MODULES.indexOf(b);
        const g = mi >= 0 ? GLYPHS[mi] : null;
        const inset = isCore ? boxFaces({ x: b.x, z: b.z, w: b.w * 0.56, d: b.d * 0.56, h: 0.001 }, b.h) : null;
        return (
          <g key={b.id} data-mod={mi >= 0 ? mi : undefined} className={mi >= 0 ? "engine-mod" : undefined}
            stroke={isCore ? b.edge : "#0B1B33"} strokeOpacity={isCore ? 0.9 : 0.28} strokeWidth={1} strokeLinejoin="round">
            <polygon points={f.sideZ} fill={b.sideZ} vectorEffect="non-scaling-stroke" />
            <polygon points={f.sideX} fill={b.sideX} vectorEffect="non-scaling-stroke" />
            <polygon points={f.top} fill={b.top} vectorEffect="non-scaling-stroke" />
            {inset && <polygon points={inset.top} fill="none" stroke="#C3D0FF" strokeOpacity={0.9} vectorEffect="non-scaling-stroke" />}
            {g && (
              <g strokeOpacity={1}>
                {g.lines.map((l, k) => <polyline key={`l${k}`} points={onTop(b, l)} fill="none" stroke={GLYPH_INK} strokeOpacity={0.72} strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
                {g.fills.map((l, k) => <polygon key={`f${k}`} points={onTop(b, l)} fill={GLYPH_INK} fillOpacity={0.72} stroke="none" />)}
                {g.accent?.map((l, k) => <polygon key={`a${k}`} points={onTop(b, l)} fill={GLYPH_ACCENT} stroke="none" />)}
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
