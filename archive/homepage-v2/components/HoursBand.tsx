"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Embed from "./Embed";
import { useI18n } from "./I18nProvider";

/** The "Built around your firm. Hours back." horizon, fading into the advantages grid below. */
export default function HoursBand() {
  const reduce = useReducedMotion();
  const { locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -60]);
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>
        <Embed src={`/embeds/hours-band${locale === "nl" ? "-nl" : ""}.html?part=band&id=hours`} title={locale === "nl" ? "Gebouwd rond uw kantoor. Uren terug." : "Built around your firm. Hours back."} autoHeight={false} className="h-[820px]" />
      </motion.div>
      {/* melt the bottom of the horizon into the page background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] bg-[linear-gradient(180deg,rgba(11,27,51,0)_0%,rgba(11,27,51,.7)_60%,#0B1B33_100%)]" />
    </div>
  );
}
