"use client";
// The operations system in 3D (desktop only, lazy; see .claude/skills/ae-ui-3d). The same geometry and
// colours as Poster.tsx under the same isometric camera, so it takes over from the SVG without a jump.
// Choosing a dossier settles its received cards into their slots one by one. Choosing a received document
// sends a sheet from its tray through the check (the beam turns green as it passes) into its slot, where
// its card rises. Missing items stay dashed outlines with one chip per reminder. Renders on demand.
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  CARD, CARD_COLORS, DOSSIER, GATE_PARTS, LIFT, PLATE, RAILS, SEAL, SEAL_COLORS, SHEET, TRAVEL, TRAYS, VIEW,
  along, cardAt, chipAt, gateAt, type Box, type P3,
} from "./geometry";
import type { SlotState } from "./Poster";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const SETTLE_GAP = 0.09;
const HIDDEN = -(CARD.h + 0.04); // a card sunk into the drawer, out of sight
const RAIL = new THREE.Color("#3B5A92"), ON = new THREE.Color("#4A73FF"), WARN = new THREE.Color("#B7791F");
const BEAM = new THREE.Color("#EDF1FF"), OK = new THREE.Color("#14AE5C");

const mat = (c: string) => new THREE.MeshBasicMaterial({ color: c });
/** BoxGeometry face order: +x, -x, +y, -y, +z, -z. */
const faces = (b: { top: string; sideX: string; sideZ: string }) => [mat(b.sideX), mat(b.sideX), mat(b.top), mat(b.top), mat(b.sideZ), mat(b.sideZ)];

function Solid({ b, base = 0, mats, edge = "#0B1B33", edgeOpacity = 0.25, onClick }: {
  b: { w: number; d: number; h: number }; base?: number; mats: THREE.Material[]; edge?: string; edgeOpacity?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const geo = useMemo(() => new THREE.BoxGeometry(b.w, b.h, b.d), [b.w, b.h, b.d]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  useEffect(() => () => { geo.dispose(); edges.dispose(); }, [geo, edges]);
  const hover = onClick ? { onPointerOver: () => { document.body.style.cursor = "pointer"; }, onPointerOut: () => { document.body.style.cursor = ""; } } : {};
  return (
    <group position={[0, base + b.h / 2, 0]}>
      <mesh geometry={geo} material={mats} onClick={onClick} {...hover} />
      <lineSegments geometry={edges}><lineBasicMaterial color={edge} transparent opacity={edgeOpacity} /></lineSegments>
    </group>
  );
}

/** A flat polyline as quads (WebGL lines are 1px); vertical risers are hidden by the drawer, so skipped. */
function Path({ pts, material, width = 0.05 }: { pts: P3[]; material: THREE.Material; width?: number }) {
  const segs = useMemo(() => pts.slice(1).map((b, i) => ({ a: pts[i], b })).filter((s) => Math.abs(s.a[1] - s.b[1]) < 1e-6), [pts]);
  return (
    <>
      {segs.map(({ a, b }, i) => {
        const dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz);
        return (
          <mesh key={i} position={[(a[0] + b[0]) / 2, a[1] + 0.002, (a[2] + b[2]) / 2]} rotation={[-Math.PI / 2, 0, Math.atan2(-dz, dx)]} material={material}>
            <planeGeometry args={[len + width, width]} />
          </mesh>
        );
      })}
    </>
  );
}

/** A missing item: the card's outline in the warn colour, with a faint face, clickable. */
function Ghost({ b, selected, onClick }: { b: Box; selected: boolean; onClick: () => void }) {
  const geo = useMemo(() => new THREE.BoxGeometry(b.w, b.h, b.d), [b.w, b.h, b.d]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  useEffect(() => () => { geo.dispose(); edges.dispose(); }, [geo, edges]);
  return (
    <group position={[0, DOSSIER.h + b.h / 2, 0]}>
      <mesh geometry={geo} onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = ""; }}>
        <meshBasicMaterial color="#B7791F" transparent opacity={selected ? 0.3 : 0.15} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}><lineBasicMaterial color="#B7791F" /></lineSegments>
    </group>
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

type Props = {
  slots: SlotState[]; selected: number; sign: keyof typeof SEAL_COLORS; routePts: P3[];
  /** Changes when the dossier (client × period) changes: the cards settle again. */
  dossierKey: string;
  onSelect: (slot: number) => void; onReady: () => void;
};

function System({ slots, selected, sign, routePts, dossierKey, onSelect, onReady }: Props) {
  const { invalidate } = useThree();
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const chipRefs = useRef<(THREE.Group | null)[]>([]);
  const sheetRef = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  const riseAt = useRef<number[]>(slots.map((_, i) => 0.2 + i * SETTLE_GAP));
  const travelAt = useRef<number>(slots[selected]?.received ? 0.2 + slots.length * SETTLE_GAP : -99);
  const ready = useRef(false);
  const now = () => (t0.current === null ? 0 : performance.now() / 1000 - t0.current);

  const plateMats = useMemo(() => faces(PLATE), []);
  const trayMats = useMemo(() => TRAYS.map(faces), []);
  const sheetMats = useMemo(() => faces({ top: "#FFFFFF", sideX: "#D5DBE6", sideZ: "#B9C4DA" }), []);
  const gateMats = useMemo(() => GATE_PARTS.map(faces), []);
  const dossierMats = useMemo(() => faces(DOSSIER), []);
  const cardMats = useMemo(() => slots.map(() => faces(CARD_COLORS)), [slots.length]); // eslint-disable-line react-hooks/exhaustive-deps
  const chipMats = useMemo(() => faces({ top: "#FBF3E4", sideX: "#B7791F", sideZ: "#B7791F" }), []);
  const sealMats = useMemo(() => faces(SEAL_COLORS[sign]), []); // eslint-disable-line react-hooks/exhaustive-deps
  const railMat = useMemo(() => new THREE.MeshBasicMaterial({ color: RAIL }), []);
  const routeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: ON }), []);
  const travelMat = useMemo(() => faces({ top: "#FFFFFF", sideX: "#D5DBE6", sideZ: "#B9C4DA" }), []);
  useEffect(() => () => {
    [...plateMats, ...trayMats.flat(), ...sheetMats, ...gateMats.flat(), ...dossierMats, ...cardMats.flat(), ...chipMats, ...sealMats, railMat, routeMat, ...travelMat]
      .forEach((m) => m.dispose());
  }, [plateMats, trayMats, sheetMats, gateMats, dossierMats, cardMats, chipMats, sealMats, railMat, routeMat, travelMat]);

  const sealOn = useMemo(() => [SEAL_COLORS[sign].sideX, SEAL_COLORS[sign].sideX, SEAL_COLORS[sign].top, SEAL_COLORS[sign].top, SEAL_COLORS[sign].sideZ, SEAL_COLORS[sign].sideZ].map((c) => new THREE.Color(c)), [sign]);
  const cardOn = useMemo(() => [CARD_COLORS.onSideX, CARD_COLORS.onSideX, CARD_COLORS.onTop, CARD_COLORS.onTop, CARD_COLORS.onSideZ, CARD_COLORS.onSideZ].map((c) => new THREE.Color(c)), []);
  const cardOff = useMemo(() => [CARD_COLORS.sideX, CARD_COLORS.sideX, CARD_COLORS.top, CARD_COLORS.top, CARD_COLORS.sideZ, CARD_COLORS.sideZ].map((c) => new THREE.Color(c)), []);
  const gateFrac = useMemo(() => gateAt(routePts), [routePts]);

  // A new dossier: every received card sinks and settles again, one after the other.
  const firstDossier = useRef(true);
  useEffect(() => {
    if (firstDossier.current) { firstDossier.current = false; return; }
    const t = now();
    riseAt.current = slots.map((_, i) => t + 0.05 + i * SETTLE_GAP);
    cardRefs.current.forEach((g) => { if (g) g.position.y = HIDDEN; });
    chipRefs.current.forEach((g) => { if (g) g.position.y = -0.4; });
    invalidate();
  }, [dossierKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // A newly chosen received document travels from its tray; its card waits in the drawer until it lands.
  const firstSel = useRef(true);
  useEffect(() => {
    if (firstSel.current) { firstSel.current = false; return; }
    const t = now();
    if (slots[selected]?.received) {
      travelAt.current = Math.max(t, riseAt.current[selected] ?? t);
      const g = cardRefs.current[selected];
      if (g) g.position.y = HIDDEN;
    } else travelAt.current = -99;
    invalidate();
  }, [selected, dossierKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => {
    const real = performance.now() / 1000;
    if (t0.current === null) t0.current = real;
    const t = real - t0.current;
    let moving = false;
    const k = (t - travelAt.current) / TRAVEL;
    const travelling = k >= 0 && k < 1;

    slots.forEach((s, i) => {
      const g = cardRefs.current[i];
      if (g) {
        const waiting = t < riseAt.current[i] || (i === selected && travelAt.current > -99 && k < 1);
        const target = waiting ? HIDDEN : i === selected ? LIFT.card : 0;
        if (waiting) g.position.y = HIDDEN;
        else {
          g.position.y += (target - g.position.y) * 0.18;
          if (Math.abs(target - g.position.y) > 0.0008) moving = true; else g.position.y = target;
        }
        if (waiting) moving = true;
        cardMats[i].forEach((m, f) => {
          const c = (m as THREE.MeshBasicMaterial).color, tc = i === selected ? cardOn[f] : cardOff[f];
          c.lerp(tc, 0.2);
          if (Math.abs(c.r - tc.r) + Math.abs(c.g - tc.g) + Math.abs(c.b - tc.b) > 0.004) moving = true;
        });
      }
      const ch = chipRefs.current[i];
      if (ch && !s.received) {
        const target = t < riseAt.current[i] ? -0.4 : 0;
        ch.position.y += (target - ch.position.y) * 0.16;
        if (Math.abs(target - ch.position.y) > 0.0008) moving = true; else ch.position.y = target;
      }
    });

    // The travelling sheet and the beam that turns green as it passes.
    const sheet = sheetRef.current;
    if (sheet) {
      sheet.visible = travelling;
      if (travelling) {
        moving = true;
        const [x, y, z] = along(routePts, easeInOut(clamp(k)));
        sheet.position.set(x, y + 0.01, z);
      }
    }
    const beamTop = (gateMats[2][2] as THREE.MeshBasicMaterial).color;
    const near = travelling && Math.abs(easeInOut(clamp(k)) - gateFrac) < 0.12;
    const tc = near ? OK : BEAM;
    beamTop.lerp(tc, near ? 0.35 : 0.12);
    (gateMats[2][3] as THREE.MeshBasicMaterial).color.copy(beamTop);
    if (Math.abs(beamTop.g - tc.g) + Math.abs(beamTop.r - tc.r) > 0.004) moving = true;

    sealMats.forEach((m, f) => {
      const c = (m as THREE.MeshBasicMaterial).color;
      c.lerp(sealOn[f], 0.15);
      if (Math.abs(c.r - sealOn[f].r) + Math.abs(c.g - sealOn[f].g) + Math.abs(c.b - sealOn[f].b) > 0.004) moving = true;
    });
    routeMat.color.lerp(slots[selected]?.received ? ON : WARN, 0.25);

    if (!ready.current) { ready.current = true; onReady(); }
    if (moving) invalidate();
  });

  const sel = (i: number) => (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(i); };

  return (
    <group>
      <group position={[PLATE.x, 0, PLATE.z]}><Solid b={PLATE} base={-PLATE.h} mats={plateMats} edge={PLATE.edge} edgeOpacity={1} /></group>
      {RAILS.map((r, i) => <Path key={i} pts={r} material={railMat} />)}
      <Path key={routePts.map((p) => p.join(",")).join("|")} pts={routePts} material={routeMat} width={0.06} />

      {TRAYS.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <Solid b={t} mats={trayMats[i]} />
          {[0, 1].map((k) => (
            <group key={k} position={[-0.04 + k * 0.08, 0, 0.04 - k * 0.08]}>
              <Solid b={SHEET} base={t.h + k * SHEET.h} mats={sheetMats} />
            </group>
          ))}
        </group>
      ))}

      {GATE_PARTS.map((g, i) => (
        <group key={i} position={[g.x, 0, g.z]}><Solid b={g} base={g.base} mats={gateMats[i]} /></group>
      ))}

      <group position={[DOSSIER.x, 0, DOSSIER.z]}><Solid b={DOSSIER} mats={dossierMats} /></group>

      {slots.map((s, i) => {
        const c = cardAt(i);
        return s.received ? (
          <group key={`c${i}`} position={[c.x, 0, c.z]}>
            <group ref={(g) => { cardRefs.current[i] = g; }} position={[0, HIDDEN, 0]}>
              <Solid b={c} base={DOSSIER.h} mats={cardMats[i]} onClick={sel(i)} />
            </group>
          </group>
        ) : (
          <group key={`g${i}`} position={[c.x, 0, c.z]}>
            <Ghost b={c} selected={i === selected} onClick={() => onSelect(i)} />
            <group ref={(g) => { chipRefs.current[i] = g; }} position={[0, -0.4, 0]}>
              {Array.from({ length: s.sent }, (_, k) => {
                const chip = chipAt(i, k);
                return <Solid key={k} b={chip} base={chip.base} mats={chipMats} edgeOpacity={0.4} />;
              })}
            </group>
          </group>
        );
      })}

      <group ref={sheetRef} visible={false}><Solid b={SHEET} mats={travelMat} /></group>
      <group position={[SEAL.x, 0, SEAL.z]}><Solid b={SEAL} base={DOSSIER.h} mats={sealMats} edgeOpacity={0.35} /></group>
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
