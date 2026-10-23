// A service's mark, drawn upright from the same glyph data as the hero engine's module lids
// (hero-home/engine-geometry.ts GLYPHS), so the service reads as the same module everywhere.
import { GLYPHS } from "../hero-home/engine-geometry";
import { SERVICE_KEYS } from "./schema";

const pts = (p: [number, number][]) => p.map(([u, v]) => `${u},${v}`).join(" ");

export default function Glyph({ service, className = "h-5 w-5", accent = "#2E5BFF" }: { service: (typeof SERVICE_KEYS)[number]; className?: string; accent?: string }) {
  const g = GLYPHS[SERVICE_KEYS.indexOf(service)];
  return (
    <svg viewBox="-0.42 -0.42 0.84 0.84" aria-hidden className={`shrink-0 ${className}`}>
      {g.lines.map((l, i) => <polyline key={`l${i}`} points={pts(l)} fill="none" stroke="currentColor" strokeWidth={0.06} strokeLinecap="round" strokeLinejoin="round" />)}
      {g.fills.map((f, i) => <polygon key={`f${i}`} points={pts(f)} fill="currentColor" />)}
      {(g.accent ?? []).map((f, i) => <polygon key={`a${i}`} points={pts(f)} fill={accent} />)}
    </svg>
  );
}
