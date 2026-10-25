// Small generative line drawings in the same language as the service animation.
import type { ReactElement } from "react";
export const ART = ["orbit", "well", "grid", "waves", "stack", "ripple", "fork", "trio", "lens"] as const;
export type Art = (typeof ART)[number];

function orbit() {
  const out: ReactElement[] = [];
  for (let i = 0; i < 9; i++) {
    const rx = 40 + i * 26, ry = rx * 0.42;
    out.push(<ellipse key={i} cx="0" cy="0" rx={rx} ry={ry} fill="none" stroke="currentColor" strokeOpacity={0.55 - i * 0.045} />);
  }
  out.push(<circle key="c" cx="0" cy="0" r="26" fill="none" stroke="currentColor" strokeOpacity="0.9" />);
  return <g transform="translate(200 125) rotate(-16)" className="art-spin">{out}</g>;
}
function well() {
  const out: ReactElement[] = [];
  for (let i = 0; i < 9; i++) {
    const r = 24 + i * 24, y = 150 - 70 / (1 + r / 50);
    out.push(<ellipse key={"r" + i} cx="200" cy={y} rx={r * 1.6} ry={r * 0.32} fill="none" stroke="currentColor" strokeOpacity={0.6 - i * 0.05} />);
  }
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2; let d = "";
    for (let j = 0; j <= 20; j++) { const r = 220 - j * 10, y = 150 - 70 / (1 + r / 50); d += `${j ? "L" : "M"}${(200 + Math.cos(a) * r * 1.6).toFixed(1)} ${(y + Math.sin(a) * r * 0.32).toFixed(1)}`; }
    out.push(<path key={"m" + k} d={d} fill="none" stroke="currentColor" strokeOpacity="0.28" />);
  }
  return <g>{out}</g>;
}
function grid() {
  const out: ReactElement[] = [], pr = (x: number, y: number, z: number) => [200 + (x - z) * 0.86, 128 + (x + z) * 0.42 - y];
  const g = [-80, 0, 80];
  for (const a of g) for (const b of g) {
    const lines: [number[], number[]][] = [[[-110, a, b], [110, a, b]], [[a, -110, b], [a, 110, b]], [[a, b, -110], [a, b, 110]]];
    lines.forEach(([p, q], k) => { const [x1, y1] = pr(p[0], p[1], p[2]), [x2, y2] = pr(q[0], q[1], q[2]); out.push(<line key={`${a}${b}${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.4" />); });
  }
  return <g className="art-float">{out}</g>;
}
function waves() {
  const out: ReactElement[] = [];
  for (let i = 0; i < 22; i++) {
    let d = ""; const z = -1 + (2 * i) / 21;
    for (let j = 0; j <= 60; j++) { const s = j / 60, c = Math.pow(1 - s, 1.4), x = 20 + 360 * s, y = 125 + (z * 90 + Math.sin(s * 10 + i * 0.35) * 26 * (1 - s * 0.8)) * c; d += `${j ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }
    out.push(<path key={i} d={d} fill="none" stroke="currentColor" strokeOpacity={0.2 + 0.5 * Math.sin((Math.PI * i) / 21)} />);
  }
  return <g>{out}</g>;
}

/** Deterministic 0..1 noise, so server and client draw the same lines. */
const noise = (n: number) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
/** Stacked sheets in the grid's isometric projection, line items on the top one (invoices). */
function stack() {
  const out: ReactElement[] = [], pr = (x: number, y: number, z: number) => `${(200 + (x - z) * 0.86).toFixed(1)} ${(155 + (x + z) * 0.42 - y).toFixed(1)}`;
  const n = 6;
  for (let i = 0; i < n; i++) {
    const y = i * 12;
    out.push(<path key={"s" + i} d={`M${pr(-75, y, -50)}L${pr(75, y, -50)}L${pr(75, y, 50)}L${pr(-75, y, 50)}Z`} fill="none" stroke="currentColor" strokeOpacity={0.2 + i * 0.1} />);
  }
  const top = (n - 1) * 12;
  for (let k = 0; k < 5; k++) {
    const z = -30 + k * 14, len = k === 0 ? 50 : 70 + noise(k) * 40;
    out.push(<path key={"l" + k} d={`M${pr(-58, top, z)}L${pr(-58 + len, top, z)}`} fill="none" stroke="currentColor" strokeOpacity={k === 0 ? 0.9 : 0.55} />);
  }
  return <g transform="translate(200 125) scale(1.2) translate(-200 -125)"><g className="art-float">{out}</g></g>;
}
/** Arcs going out from one point at a steady interval; every third arc stronger (a reminder schedule). */
function ripple() {
  const out: ReactElement[] = [], cx = 70, cy = 125;
  for (let i = 0; i < 12; i++) {
    const r = 24 + i * 26, a = (52 * Math.PI) / 180;
    const x1 = cx + r * Math.cos(-a), y1 = cy + r * 0.8 * Math.sin(-a), x2 = cx + r * Math.cos(a), y2 = cy + r * 0.8 * Math.sin(a);
    out.push(<path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${(r * 0.8).toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`} fill="none" stroke="currentColor" strokeOpacity={i % 3 === 2 ? 0.85 : 0.22 + (0.2 * (12 - i)) / 12} />);
  }
  out.push(<circle key="c" cx={cx} cy={cy} r="5" fill="none" stroke="currentColor" strokeOpacity="0.9" />);
  return <g>{out}</g>;
}
/** One bundle of lines that splits in two: the upper half solid, the lower half dashed (left to a person). */
function fork() {
  const out: ReactElement[] = [];
  for (let i = 0; i < 14; i++) {
    const up = i < 7, k = up ? i : i - 7, y0 = 112 + i * 2, y1 = up ? 44 + k * 10 : 146 + k * 10;
    out.push(<path key={i} d={`M20 ${y0}C150 ${y0} 190 ${y1} 380 ${y1}`} fill="none" stroke="currentColor" strokeOpacity={up ? 0.3 + k * 0.08 : 0.35 + k * 0.06} strokeDasharray={up ? undefined : "3 5"} />);
  }
  return <g>{out}</g>;
}
/** Three families of rings that overlap (three tools, one shared middle). */
function trio() {
  const out: ReactElement[] = [];
  const centers: [number, number][] = [[148, 104], [252, 104], [200, 150]];
  centers.forEach(([cx, cy], c) => {
    for (let i = 0; i < 5; i++) out.push(<circle key={`${c}${i}`} cx={cx} cy={cy} r={16 + i * 13} fill="none" stroke="currentColor" strokeOpacity={0.7 - i * 0.12} />);
  });
  return <g className="art-float">{out}</g>;
}
/** Rows of records with one lens over them; the rows it covers are drawn stronger (a firm-wide lookup). */
function lens() {
  const out: ReactElement[] = [], cx = 250, cy = 120, r = 52;
  for (let i = 0; i < 14; i++) {
    const y = 40 + i * 13;
    let x = 30;
    for (let j = 0; x < 370; j++) {
      const len = 18 + noise(i * 31 + j) * 46, end = Math.min(x + len, 370);
      out.push(<line key={`${i}-${j}`} x1={x} y1={y} x2={end} y2={y} stroke="currentColor" strokeOpacity="0.25" />);
      x = end + 8;
    }
    const dy = y - cy;
    if (Math.abs(dy) < r - 4) {
      const half = Math.sqrt(r * r - dy * dy) - 4;
      out.push(<line key={`h${i}`} x1={cx - half} y1={y} x2={cx + half} y2={y} stroke="currentColor" strokeOpacity="0.85" />);
    }
  }
  out.push(<circle key="c" cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity="0.9" />);
  out.push(<line key="h" x1={cx + r * 0.71} y1={cy + r * 0.71} x2={cx + r * 0.71 + 30} y2={cy + r * 0.71 + 30} stroke="currentColor" strokeOpacity="0.9" />);
  return <g>{out}</g>;
}

const DRAW: Record<Art, () => ReactElement> = { orbit, well, grid, waves, stack, ripple, fork, trio, lens };

/** `still`: no idle motion (the spin/float loops stop), for covers in lists. */
export default function LineArt({ kind, className = "", still = false }: { kind: Art; className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={`${className} ${still ? "art-still" : ""}`} aria-hidden>
      {DRAW[kind]()}
    </svg>
  );
}
