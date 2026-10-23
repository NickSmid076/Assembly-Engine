"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/lib/motion";
import { useI18n } from "./I18nProvider";

export default function DemoVideo() {
  const reduce = useReducedMotion();
  const D = useI18n().t.home.demo;
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "start 25%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [36, 20]);
  const rotX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 14, 0]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduce) { v.pause(); setPlaying(false); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="demo" className="relative bg-white">
      <div className="absolute inset-x-0 top-0 h-[320px] bg-ink" aria-hidden />
      <div className="frame frame-light relative border-transparent">
        <div ref={wrap} className="relative [perspective:1600px]">
          <motion.div style={{ scale, borderRadius: radius, rotateX: rotX, transformOrigin: "50% 0%" }}
            className="relative overflow-hidden bg-white shadow-[0_60px_120px_-40px_rgba(11,27,51,.55),0_0_0_1px_rgba(11,27,51,.06)]">
            <video ref={video} className="block aspect-video w-full" src="/video/assembly-engine-demo.mp4" poster="/video/assembly-engine-demo-poster.jpg"
              muted loop playsInline autoPlay preload="metadata" aria-label={D.label} />
            <button type="button" onClick={toggle} aria-label={playing ? D.pause : D.play}
              className="focus-ring absolute bottom-4 right-4 flex h-10 items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink shadow-sm backdrop-blur transition hover:bg-white">
              {playing ? <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                : <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>}
              {playing ? D.pause : D.play}
            </button>
          </motion.div>
        </div>
        <Reveal className="flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-slate">{D.caption}</p>
          <p className="text-[14px] text-slate">{D.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
