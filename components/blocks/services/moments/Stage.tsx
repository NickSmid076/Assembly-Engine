"use client";
// The stage that plays one service moment: paper ground, "Example" label, the artefacts, and the rail.
// The stage and rail persist when the visitor picks another service; the outgoing artefacts leave in
// 180 ms on a frozen clock while the new story starts at frame 1 (the hand-off).
import { AnimatePresence, motion, motionValue, usePresence, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion";
import { Rail, StoryProvider, atMap, useStory } from "./clock";
import type { Moment, StoryLabels } from "./schema";

/** Stage height on a narrow stage (phone), per moment; every moment shares 404px from 440px wide up. */
const NARROW_H: Record<Moment["kind"], string> = {
  home_brand: "h-[452px]", home_acquisition: "h-[572px]", home_operations: "h-[480px]", home_invoicing: "h-[480px]", home_reporting: "h-[480px]",
};

type ArtefactsT = ComponentType<{ m: Moment }>;
let loaded: ArtefactsT | null = null;
/** The moments chunk loads when the stage comes within ~2 screens; until then the sized frame and rail hold the space. */
function useArtefacts(ref: React.RefObject<HTMLDivElement | null>) {
  const [A, setA] = useState<ArtefactsT | null>(() => loaded);
  useEffect(() => {
    if (A || !ref.current) return;
    let live = true;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      import("./artefacts").then((mod) => { loaded = mod.default; if (live) setA(() => mod.default); });
    }, { rootMargin: "0px 0px 200% 0px" });
    io.observe(ref.current);
    return () => { live = false; io.disconnect(); };
  }, [A, ref]);
  return A;
}

/** Keeps the outgoing moment on the clock value it had when it started leaving. */
function Frozen({ T, children, ctx }: { T: MotionValue<number>; children: (T: MotionValue<number>) => ReactNode; ctx: unknown }) {
  const [isPresent] = usePresence();
  const frozen = useRef<MotionValue<number> | null>(null);
  if (!isPresent && !frozen.current) frozen.current = motionValue(T.get());
  void ctx;
  return <>{children(frozen.current ?? T)}</>;
}

export default function Stage({ moment, index, labels, id }: { moment: Moment; index: number; labels: StoryLabels; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const Artefacts = useArtefacts(ref);
  const story = useStory(moment.duration, moment.steps, index, ref, Artefacts !== null);
  const at = useMemo(() => atMap(moment.steps), [moment.steps]);
  const [w, setW] = useState(520);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="[container-type:inline-size]">
      <p className="mb-3 font-mono text-[13px] text-slate">{labels.example}</p>
      <div id={id} className={`relative overflow-clip [overflow-clip-margin:24px] cq-md:h-[404px] ${NARROW_H[moment.kind]}`}>
        <AnimatePresence initial={false}>
          <motion.div key={index} className="absolute inset-0"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE } }}
            initial={{ opacity: 1 }} animate={{ opacity: 1, transition: { duration: DUR.state } }}>
            <Frozen T={story.T} ctx={index}>
              {(T) => (
                <StoryProvider value={{ T, at, D: moment.duration, w }}>
                  {Artefacts && <Artefacts m={moment} />}
                </StoryProvider>
              )}
            </Frozen>
          </motion.div>
        </AnimatePresence>
      </div>
      <Rail steps={moment.steps} step={story.step} T={story.T} D={moment.duration} status={story.status} toggle={story.toggle} jump={story.jump} labels={labels} id={id} />
    </div>
  );
}
