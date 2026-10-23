"use client";
// The 3D assembly engine (desktop only, loaded lazily by EngineVisual). Flat-shaded faces in the
// poster's exact colours under the same isometric camera, so it takes over from the SVG seamlessly.
// Plays once: the modules lift and re-seat one by one, then one signal runs from each module to the
// core, in service order, and the scene holds. Hovering or focusing a module (labels in EngineVisual)
// lifts it and sends its signal again. Pointer tilts the assembly slightly; scrolling the hero away lifts
// the modules apart. Renders on demand only: nothing is drawn while the scene is still.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CORE, GLYPHS, GLYPH_ACCENT, GLYPH_INK, MODULES, PLATE, TRACES, TRACE_COLOR, VIEW, glyphUV, type Box, type Glyph } from "./engine-geometry";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

const LIFT_END = 0.5; // all modules up
const SEAT_START = 0.75; // then re-seat one by one
const SEAT_GAP = 0.14;
const SEAT_DUR = 0.55;
const PULSE_START = SEAT_START + 4 * SEAT_GAP + SEAT_DUR + 0.35;
const PULSE_GAP = 0.7; // one signal per module, overlapping a little
const PULSE_DUR = 1.0;
const SEQ_END = PULSE_START + 4 * PULSE_GAP + PULSE_DUR;
const HOVER_LIFT = 0.26;

/** Six face materials in BoxGeometry order: +x, -x, +y, -y, +z, -z. */
function faceMaterials(b: { top: string; sideX: string; sideZ: string }) {
  const m = (c: string) => new THREE.MeshBasicMaterial({ color: c });
  return [m(b.sideX), m(b.sideX), m(b.top), m(b.top), m(b.sideZ), m(b.sideZ)];
}

/** A glyph on a module's top face: strokes as thin quads (WebGL lines are 1px), fills as flat shapes. */
function GlyphMesh({ box, glyph }: { box: Box; glyph: Glyph }) {
  const { strokes, fills, accents } = useMemo(() => {
    const W = 0.032; // stroke width in world units, matches the poster's 1.5px at desktop size
    const quads: THREE.BufferGeometry[] = [];
    for (const line of glyph.lines) {
      for (let i = 1; i < line.length; i++) {
        const a = new THREE.Vector2(...glyphUV(box, line[i - 1])), b = new THREE.Vector2(...glyphUV(box, line[i]));
        const len = a.distanceTo(b);
        const g = new THREE.PlaneGeometry(len + W, W);
        g.rotateZ(-Math.atan2(b.y - a.y, b.x - a.x));
        g.rotateX(-Math.PI / 2);
        g.translate((a.x + b.x) / 2, 0, (a.y + b.y) / 2);
        quads.push(g);
      }
    }
    const shape = (poly: [number, number][]) => {
      const s = new THREE.Shape(poly.map((uv) => { const [x, z] = glyphUV(box, uv); return new THREE.Vector2(x, -z); }));
      const g = new THREE.ShapeGeometry(s);
      g.rotateX(-Math.PI / 2);
      return g;
    };
    return { strokes: quads, fills: glyph.fills.map(shape), accents: (glyph.accent ?? []).map(shape) };
  }, [box, glyph]);
  const ink = useMemo(() => new THREE.MeshBasicMaterial({ color: GLYPH_INK, transparent: true, opacity: 0.72 }), []);
  const accent = useMemo(() => new THREE.MeshBasicMaterial({ color: GLYPH_ACCENT }), []);
  return (
    <group position={[0, box.h + 0.004, 0]}>
      {strokes.map((g, i) => <mesh key={`s${i}`} geometry={g} material={ink} />)}
      {fills.map((g, i) => <mesh key={`f${i}`} geometry={g} material={ink} />)}
      {accents.map((g, i) => <mesh key={`a${i}`} geometry={g} material={accent} position={[0, 0.001, 0]} />)}
    </group>
  );
}

function Block({ box, base = 0, edgeOpacity, groupRef, glyph }: { box: Box | typeof PLATE; base?: number; edgeOpacity: number; groupRef?: React.Ref<THREE.Group>; glyph?: Glyph }) {
  const geo = useMemo(() => new THREE.BoxGeometry(box.w, box.h, box.d), [box]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const mats = useMemo(() => faceMaterials(box), [box]);
  const isCore = "id" in box && box.id === CORE.id;
  return (
    <group ref={groupRef} position={[box.x, 0, box.z]}>
      <mesh geometry={geo} material={mats} position={[0, base + box.h / 2, 0]} />
      <lineSegments geometry={edges} position={[0, base + box.h / 2, 0]}>
        <lineBasicMaterial color={box.edge} transparent opacity={edgeOpacity} />
      </lineSegments>
      {glyph && "id" in box && <GlyphMesh box={box} glyph={glyph} />}
      {isCore && (
        <lineSegments position={[0, box.h + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(box.w * 0.56, box.d * 0.56)]} />
          <lineBasicMaterial color="#C3D0FF" transparent opacity={0.9} />
        </lineSegments>
      )}
    </group>
  );
}

/** Polyline helpers: total length and the point at distance s. */
function polyline(points: [number, number][]) {
  const segs = points.slice(1).map((p, i) => {
    const a = points[i];
    return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) };
  });
  const total = segs.reduce((n, s) => n + s.len, 0);
  return {
    segs,
    at(k: number): [number, number] {
      let s = k * total;
      for (const g of segs) {
        if (s <= g.len) return [g.a[0] + ((g.b[0] - g.a[0]) * s) / g.len, g.a[1] + ((g.b[1] - g.a[1]) * s) / g.len];
        s -= g.len;
      }
      return points[points.length - 1];
    },
  };
}

function Traces({ pulseRefs }: { pulseRefs: React.MutableRefObject<(THREE.Mesh | null)[]> }) {
  const lines = useMemo(() => TRACES.map((t) => polyline(t.points)), []);
  return (
    <group position={[0, 0.004, 0]}>
      {lines.map((l, i) =>
        l.segs.map((g, k) => {
          const dx = g.b[0] - g.a[0], dz = g.b[1] - g.a[1];
          return (
            <mesh key={`${i}-${k}`} position={[(g.a[0] + g.b[0]) / 2, 0, (g.a[1] + g.b[1]) / 2]} rotation={[-Math.PI / 2, 0, Math.atan2(-dz, dx)]}>
              <planeGeometry args={[g.len + 0.045, 0.045]} />
              <meshBasicMaterial color={TRACE_COLOR} transparent opacity={0.85} />
            </mesh>
          );
        }),
      )}
      {TRACES.map((_, i) => (
        <mesh key={`p${i}`} ref={(m) => { pulseRefs.current[i] = m; }} visible={false} position={[0, 0.03, 0]}>
          <boxGeometry args={[0.16, 0.06, 0.16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
}

function Fit() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    // Point the camera at the world point that projects to the centre of VIEW (same frame as the SVG).
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

type Props = { scroll: React.MutableRefObject<number>; hover: React.MutableRefObject<number>; onReady: () => void };

function Engine({ scroll, hover, onReady }: Props) {
  const root = useRef<THREE.Group>(null);
  const mods = useRef<(THREE.Group | null)[]>([]);
  const core = useRef<THREE.Group>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const lines = useMemo(() => TRACES.map((t) => polyline(t.points)), []);
  const pointer = useRef({ x: 0, y: 0 });
  const t0 = useRef<number | null>(null);
  const ready = useRef(false);
  const lifted = useRef(MODULES.map(() => 0)); // eased hover lift per module
  const hoverPulse = useRef(MODULES.map(() => -99)); // time a hover signal started
  const lastHover = useRef(-1);
  const { invalidate } = useThree();

  useEffect(() => {
    const move = (e: PointerEvent) => { pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 }; invalidate(); };
    const scrolled = () => invalidate();
    addEventListener("pointermove", move, { passive: true });
    addEventListener("scroll", scrolled, { passive: true });
    return () => { removeEventListener("pointermove", move); removeEventListener("scroll", scrolled); };
  }, [invalidate]);

  // Real time, not the R3F clock: in on-demand mode the R3F clock only advances while frames render.
  useFrame(() => {
    const now = performance.now() / 1000;
    if (t0.current === null) t0.current = now;
    const t = now - t0.current;
    const lift = scroll.current; // 0 at the top of the page → 1 when the hero has scrolled away
    let moving = t < SEQ_END;

    const h = hover.current;
    if (h !== lastHover.current) { if (h >= 0) hoverPulse.current[h] = t; lastHover.current = h; }

    MODULES.forEach((_, i) => {
      const g = mods.current[i];
      if (!g) return;
      const up = 0.75 + i * 0.06;
      const rise = easeInOut(clamp(t / LIFT_END));
      const seat = easeOut(clamp((t - SEAT_START - i * SEAT_GAP) / SEAT_DUR));
      const target = h === i ? HOVER_LIFT : 0;
      lifted.current[i] += (target - lifted.current[i]) * 0.18;
      if (Math.abs(target - lifted.current[i]) > 0.001) moving = true;
      g.position.y = up * rise * (1 - seat) + lift * (0.35 + i * 0.09) + lifted.current[i];
    });
    if (core.current) core.current.position.y = lift * 0.15;

    // Signals: one per module after the assembly (service order), and again when a module is hovered.
    TRACES.forEach((tr, i) => {
      const p = pulses.current[i];
      if (!p) return;
      const kSeq = t - (PULSE_START + i * PULSE_GAP);
      const kHov = t - hoverPulse.current[tr.from];
      const k = kHov >= 0 && kHov < PULSE_DUR ? kHov : kSeq;
      const on = k >= 0 && k < PULSE_DUR;
      if (kHov >= 0 && kHov < PULSE_DUR) moving = true;
      p.visible = on;
      if (on) {
        const [x, z] = lines[tr.from].at(easeInOut(k / PULSE_DUR));
        p.position.set(x, 0.03, z);
      }
    });

    if (root.current) {
      const r = root.current.rotation;
      const tx = pointer.current.x * 0.05, ty = pointer.current.y * 0.025;
      r.y += (tx - r.y) * 0.08;
      r.x += (ty - r.x) * 0.08;
      if (Math.abs(tx - r.y) > 0.0005 || Math.abs(ty - r.x) > 0.0005) moving = true;
    }
    if (!ready.current) { ready.current = true; onReady(); }
    if (moving) invalidate();
  });

  return (
    <group ref={root}>
      <Block box={PLATE} base={-PLATE.h} edgeOpacity={1} />
      <Traces pulseRefs={pulses} />
      <Block box={CORE} edgeOpacity={0.9} groupRef={core} />
      {MODULES.map((m, i) => (
        <Block key={m.id} box={m} edgeOpacity={0.28} glyph={GLYPHS[i]} groupRef={(g: THREE.Group | null) => { mods.current[i] = g; }} />
      ))}
    </group>
  );
}

/** Wakes the demand loop when the hovered module changes (hover lives in a ref, outside React). */
function HoverWake({ hoverKey }: { hoverKey: number }) {
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [hoverKey, invalidate]);
  return null;
}

export default function EngineCanvas({ active, scroll, hover, hoverKey, onReady }: Props & { active: boolean; hoverKey: number }) {
  return (
    <Canvas
      orthographic
      flat
      dpr={[1, 2]}
      frameloop={active ? "demand" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ near: 0.1, far: 100, position: [10, 10, 10] }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Fit />
      <HoverWake hoverKey={hoverKey} />
      <Engine scroll={scroll} hover={hover} onReady={onReady} />
    </Canvas>
  );
}
