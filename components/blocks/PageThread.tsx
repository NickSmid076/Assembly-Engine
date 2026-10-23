"use client";
// The page's one thread: a cobalt line that draws down the left frame line as you read, from the hero to
// the closing section, so the chapters read as one piece. Desktop only; transform only; hidden with reduced motion.
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function PageThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <div ref={ref} className="relative">
      {children}
      <motion.div aria-hidden style={{ scaleY: p }}
        className="page-thread pointer-events-none absolute inset-y-0 z-10 hidden w-px origin-top bg-cobalt lg:block [left:max(0px,calc(50%-620px))]" />
    </div>
  );
}
