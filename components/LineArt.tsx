// Small generative line drawings in the same language as the service animation.
import type { ReactElement } from "react";
type Kind = "orbit" | "well" | "grid" | "waves";

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

/** `still`: no idle motion (the spin/float loops stop), for covers in lists. */
export default function LineArt({ kind, className = "", still = false }: { kind: Kind; className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={`${className} ${still ? "art-still" : ""}`} aria-hidden>
      {kind === "orbit" ? orbit() : kind === "well" ? well() : kind === "grid" ? grid() : waves()}
    </svg>
  );
}
