"use client";
// The reporting system in 3D (desktop only, lazy; see .claude/skills/ae-ui-3d). The same geometry and
// colours as Poster.tsx under the same isometric camera, so it takes over from the SVG without a jump.
// On first view one signal runs along every wire (the 07:00 sync). Choosing a figure lifts its sources
// and tile, turns its wires cobalt and sends one signal along each. Renders on demand: nothing at rest.
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LIFT, PLATE, SLAB, SOURCES, TILE, TILE_COLORS, VIEW, along, tileAt, type Block, type Wire } from "./geometry";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const PULSE = 0.9; // seconds per signal
const INTRO_GAP = 0.12;
const WIRE_DIM = new THREE.Color("#3B5A92"), WIRE_DIM_TOP = new THREE.Color("#B9C4DA");
const WIRE_ON = new THREE.Color("#4A73FF"), WIRE_ON_TOP = new THREE.Color("#2E5BFF");

/** BoxGeometry face order: +x, -x, +y, -y, +z, -z. */
const faces = (b: { top: string; sideX: string; sideZ: string }) => {
  const m = (c: string) => new THREE.MeshBasicMaterial({ color: c });
  return [m(b.sideX), m(b.sideX), m(b.top), m(b.top), m(b.sideZ), m(b.sideZ)];
};

function Solid({ b, base = 0, mats, edge = "#0B1B33", edgeOpacity = 0.25, onClick }: {
  b: { w: number; d: number; h: number }; base?: number; mats: THREE.Material[]; edge?: string; edgeOpacity?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const geo = useMemo(() => new THREE.BoxGeometry(b.w, b.h, b.d), [b.w, b.h, b.d]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  useEffect(() => () => { geo.dispose(); edges.dispose(); }, [geo, edges]);
  const hover = onClick ? {
    onPointerOver: () => { document.body.style.cursor = "pointer"; },
    onPointerOut: () => { document.body.style.cursor = ""; },
  } : {};
  return (
    <group position={[0, base + b.h / 2, 0]}>
      <mesh geometry={geo} material={mats} onClick={onClick} {...hover} />
      <lineSegments geometry={edges}><lineBasicMaterial color={edge} transparent opacity={edgeOpacity} /></lineSegments>
    </group>
  );
}

/** A wire as flat quads (WebGL lines are 1px); vertical risers are hidden behind the slab, so they're skipped. */
function WireMesh({ w, mats }: { w: Wire; mats: { low: THREE.MeshBasicMaterial; high: THREE.MeshBasicMaterial } }) {
  const segs = useMemo(() => w.points.slice(1).map((b, i) => ({ a: w.points[i], b })).filter((s) => Math.abs(s.a[1] - s.b[1]) < 1e-6), [w]);
  return (
    <>
      {segs.map(({ a, b }, i) => {
        const dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz);
        return (
          <mesh key={i} position={[(a[0] + b[0]) / 2, a[1], (a[2] + b[2]) / 2]} rotation={[-Math.PI / 2, 0, Math.atan2(-dz, dx)]}
            material={a[1] > 0.1 ? mats.high : mats.low}>
            <planeGeometry args={[len + 0.05, 0.05]} />
          </mesh>
        );
      })}
    </>
  );
}

function Fit() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    const cx = VIEW.minX + VIEW.w / 2, cy = VIEW.minY + VIEW.h / 2;
    const right = new THREE.Vector3(1, 0, -1).normalize(), up = new THREE.Vector3(-1, 2, -1).normalize();
    const target = right.multiplyScalar(cx).add(up.multiplyScalar(-cy));
    cam.position.copy(target).add(new THREE.Vector3(10, 10, 10));
    cam.up.set(0, 1, 0);
    cam.lookAt(target);
    cam.zoom = Math.min(size.width / VIEW.w, size.height / VIEW.h);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

type Props = { wires: Wire[]; selected: number; onSelect: (k: number) => void; onReady: () => void };

function System({ wires, selected, onSelect, onReady }: Props) {
  const { invalidate } = useThree();
  const srcRefs = useRef<(THREE.Group | null)[]>([]);
  const tileRefs = useRef<(THREE.Group | null)[]>([]);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const t0 = useRef<number | null>(null);
  const pulseAt = useRef<number[]>(wires.map((_, i) => i * INTRO_GAP)); // intro: every wire, staggered
  const ready = useRef(false);

  const srcMats = useMemo(() => SOURCES.map(faces), []);
  const plateMats = useMemo(() => faces(PLATE), []);
  const slabMats = useMemo(() => faces(SLAB), []);
  const tileMats = useMemo(() => [0, 1, 2, 3].map(() => faces(TILE_COLORS)), []);
  const wireMats = useMemo(() => wires.map(() => ({ low: new THREE.MeshBasicMaterial({ color: WIRE_DIM }), high: new THREE.MeshBasicMaterial({ color: WIRE_DIM_TOP }) })), [wires]);
  const tileOn = useMemo(() => faces({ top: TILE_COLORS.onTop, sideX: TILE_COLORS.onSideX, sideZ: TILE_COLORS.onSideZ }).map((m) => (m as THREE.MeshBasicMaterial).color), []);
  const tileOff = useMemo(() => faces(TILE_COLORS).map((m) => (m as THREE.MeshBasicMaterial).color), []);
  useEffect(() => () => {
    [...srcMats.flat(), ...plateMats, ...slabMats, ...tileMats.flat(), ...wireMats.flatMap((m) => [m.low, m.high])].forEach((m) => m.dispose());
  }, [srcMats, plateMats, slabMats, tileMats, wireMats]);

  // A new selection sends one signal along each of its wires.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const now = t0.current === null ? 0 : performance.now() / 1000 - t0.current;
    wires.forEach((w, i) => { if (w.kpi === selected) pulseAt.current[i] = now; });
    invalidate();
  }, [selected, wires, invalidate]);

  // Real time, not the R3F clock: in demand mode that only advances while frames render.
  useFrame(() => {
    const now = performance.now() / 1000;
    if (t0.current === null) t0.current = now;
    const t = now - t0.current;
    let moving = false;
    const lit = new Set(wires.filter((w) => w.kpi === selected).map((w) => w.source));
    const ease = (g: THREE.Group | null | undefined, target: number) => {
      if (!g) return;
      g.position.y += (target - g.position.y) * 0.16;
      if (Math.abs(target - g.position.y) > 0.0005) moving = true; else g.position.y = target;
    };
    SOURCES.forEach((_, s) => ease(srcRefs.current[s], lit.has(s) ? LIFT.source : 0));
    tileMats.forEach((mats, k) => {
      ease(tileRefs.current[k], k === selected ? LIFT.tile : 0);
      mats.forEach((m, f) => {
        const c = (m as THREE.MeshBasicMaterial).color, target = k === selected ? tileOn[f] : tileOff[f];
        c.lerp(target, 0.2);
        if (Math.abs(c.r - target.r) + Math.abs(c.g - target.g) + Math.abs(c.b - target.b) > 0.004) moving = true;
      });
    });
    wires.forEach((w, i) => {
      const on = w.kpi === selected;
      const { low, high } = wireMats[i];
      low.color.lerp(on ? WIRE_ON : WIRE_DIM, 0.2);
      high.color.lerp(on ? WIRE_ON_TOP : WIRE_DIM_TOP, 0.2);
      if (Math.abs(low.color.b - (on ? WIRE_ON : WIRE_DIM).b) > 0.004) moving = true;
      const p = pulseRefs.current[i];
      if (!p) return;
      const k = (t - pulseAt.current[i]) / PULSE;
      p.visible = k >= 0 && k < 1;
      if (p.visible) {
        moving = true;
        const [x, y, z] = along(w.points, easeInOut(clamp(k)));
        p.position.set(x, y + 0.03, z);
      }
    });
    if (!ready.current) { ready.current = true; onReady(); }
    if (moving) invalidate();
  });

  return (
    <group>
      <group position={[PLATE.x, 0, PLATE.z]}>
        <Solid b={PLATE} base={-PLATE.h} mats={plateMats} edge={PLATE.edge} edgeOpacity={1} />
      </group>
      {wires.map((w, i) => <WireMesh key={i} w={w} mats={wireMats[i]} />)}
      {wires.map((_, i) => (
        <mesh key={`p${i}`} ref={(m) => { pulseRefs.current[i] = m; }} visible={false}>
          <boxGeometry args={[0.14, 0.05, 0.14]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
      {SOURCES.map((b: Block, s) => (
        <group key={s} ref={(g) => { srcRefs.current[s] = g; }} position={[b.x, 0, b.z]}>
          <Solid b={b} mats={srcMats[s]} />
        </group>
      ))}
      <group position={[SLAB.x, 0, SLAB.z]}><Solid b={SLAB} mats={slabMats} /></group>
      {[0, 1, 2, 3].map((k) => {
        const t = tileAt(k);
        return (
          <group key={k} ref={(g) => { tileRefs.current[k] = g; }} position={[t.x, 0, t.z]}>
            <Solid b={TILE} base={SLAB.h} mats={tileMats[k]} onClick={(e) => { e.stopPropagation(); onSelect(k); }} />
          </group>
        );
      })}
    </group>
  );
}

export default function Scene({ active, ...props }: Props & { active: boolean }) {
  useEffect(() => () => { document.body.style.cursor = ""; }, []);
  return (
    <Canvas orthographic flat dpr={[1, 2]} frameloop={active ? "demand" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ near: 0.1, far: 100, position: [10, 10, 10] }}
      style={{ position: "absolute", inset: 0 }} aria-hidden>
      <Fit />
      <System {...props} />
    </Canvas>
  );
}
