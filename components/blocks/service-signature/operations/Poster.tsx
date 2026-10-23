// The operations system as an isometric SVG, drawn from geometry.ts. It is the first paint, the fallback
// without WebGL, and the whole stage under reduced motion, so it reacts to the choices too: received
// cards stand in their slots, missing ones are dashed outlines with one chip per reminder sent, the chosen
// card lifts, and its route draws once from its tray through the check into the drawer.
import { boxFaces, iso } from "../../hero-home/engine-geometry";
import {
  CARD_COLORS, DOSSIER, GATE_PARTS, LIFT, PLATE, RAILS, SEAL, SEAL_COLORS, SHEET, TRAYS, VIEW, cardAt, chipAt,
  type Box, type P3,
} from "./geometry";

const path = (pts: P3[]) => pts.map((p, i) => `${i ? "L" : "M"}${iso(...p).map((n) => n.toFixed(3)).join(",")}`).join("");
const lift = (dy: number) => (-2 * dy) / Math.sqrt(6);

function Faces({ b, base = 0, top, sideX, sideZ, edge = "#0B1B33", edgeOpacity = 0.25 }: {
  b: Box; base?: number; top: string; sideX: string; sideZ: string; edge?: string; edgeOpacity?: number;
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

export type SlotState = { received: boolean; sent: number };

export default function Poster({ slots, selected, sign, routePts, onSelect, drawKey, className = "" }: {
  slots: SlotState[]; selected: number; sign: keyof typeof SEAL_COLORS;
  /** The chosen document's route (from geometry.route). */
  routePts: P3[];
  onSelect: (slot: number) => void;
  /** Changes whenever the route should draw again; null = no drawing. */
  drawKey: string | null; className?: string;
}) {
  const received = slots[selected]?.received;
  const low = routePts.slice(0, -2), high = routePts.slice(-2);
  return (
    <svg viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`} className={className} aria-hidden>
      <Faces b={PLATE} base={-PLATE.h} top={PLATE.top} sideX={PLATE.sideX} sideZ={PLATE.sideZ} edge={PLATE.edge} edgeOpacity={1} />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {RAILS.map((r, i) => <path key={i} d={path(r)} stroke="#3B5A92" strokeWidth={0.05} />)}
        {received
          ? <path key={`r-${drawKey}`} d={path(low)} stroke="#4A73FF" strokeWidth={0.06} pathLength={1} className={drawKey ? "sig-draw sig-draw-route" : undefined} />
          : <path d={path(low)} stroke="#B7791F" strokeWidth={0.04} strokeDasharray="0.09 0.09" />}
      </g>

      {TRAYS.map((t, i) => (
        <g key={i}>
          <Faces b={t} top={t.top} sideX={t.sideX} sideZ={t.sideZ} />
          {[0, 1].map((k) => (
            <Faces key={k} b={{ x: t.x - 0.04 + k * 0.08, z: t.z + 0.04 - k * 0.08, ...SHEET }} base={t.h + k * SHEET.h}
              top="#FFFFFF" sideX="#D5DBE6" sideZ="#B9C4DA" />
          ))}
        </g>
      ))}

      {GATE_PARTS.map((g, i) => <Faces key={i} b={g} base={g.base} top={g.top} sideX={g.sideX} sideZ={g.sideZ} />)}

      <Faces b={DOSSIER} top={DOSSIER.top} sideX={DOSSIER.sideX} sideZ={DOSSIER.sideZ} />
      <path d={path(high)} fill="none" strokeLinecap="round" stroke={received ? "#2E5BFF" : "#B7791F"} strokeWidth={0.05}
        strokeDasharray={received ? undefined : "0.09 0.09"} />

      {slots.map((s, i) => {
        const c = cardAt(i), on = i === selected, base = DOSSIER.h;
        if (!s.received) {
          const f = boxFaces(c, base);
          return (
            <g key={i} onClick={() => onSelect(i)} className="cursor-pointer">
              <polygon points={f.sideZ} fill="#B7791F" fillOpacity={on ? 0.28 : 0.14} stroke="#B7791F" strokeWidth={0.022} strokeDasharray="0.07 0.06" />
              <polygon points={f.top} fill="none" stroke="#B7791F" strokeWidth={0.018} strokeDasharray="0.07 0.06" />
              {Array.from({ length: s.sent }, (_, k) => (
                <Faces key={k} b={chipAt(i, k)} base={chipAt(i, k).base} top="#FBF3E4" sideX="#B7791F" sideZ="#B7791F" edgeOpacity={0.4} />
              ))}
            </g>
          );
        }
        return (
          <g key={i} onClick={() => onSelect(i)} className="cursor-pointer transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ transform: `translateY(${on ? lift(LIFT.card) : 0}px)` }}>
            <Faces b={c} base={base} top={on ? CARD_COLORS.onTop : CARD_COLORS.top} sideX={on ? CARD_COLORS.onSideX : CARD_COLORS.sideX}
              sideZ={on ? CARD_COLORS.onSideZ : CARD_COLORS.sideZ} />
          </g>
        );
      })}

      <Faces b={SEAL} base={DOSSIER.h} {...SEAL_COLORS[sign]} edgeOpacity={0.35} />
    </svg>
  );
}
