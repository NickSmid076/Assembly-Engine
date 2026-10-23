"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import { EASE, Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import { useHref, useI18n } from "./I18nProvider";
import Scene from "./ui/scenes";
import { Pill, Stage } from "./ui/kit";
import { ArrowRight, ChevronDown, Icon } from "./icons";
import CtaBand from "./CtaBand";

const STEP_MS = 8000;

/* Hero: centred like a product page, with a few calm floating status cards. */
function Hero({ i }: { i: number }) {
  const { t } = useI18n();
  const h = useHref();
  const s = t.services[i];
  const reduce = useReducedMotionSafe();
  const floats = [
    { pos: "left-[3%] top-[14%]", k: 0, st: 2 },
    { pos: "right-[4%] top-[20%]", k: 1, st: 1 },
    { pos: "left-[6%] bottom-[10%]", k: 2, st: 2 },
    { pos: "right-[2%] bottom-[16%]", k: 3, st: 1 },
  ];
  const flowStates = s.scenes.hero.kind === "flow" ? s.scenes.hero.states : ["", "", ""];
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(11,27,51,.08)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_40%,transparent)]" />
      <div className="frame frame-light relative">
        <div className="relative pb-16 pt-24 text-center sm:pt-28">
          {floats.map((f, k) => (
            <motion.div key={k} aria-hidden className={`absolute hidden w-[230px] rounded-xl border border-line bg-white p-3 text-left shadow-[0_1px_2px_rgba(11,27,51,.05),0_10px_30px_-18px_rgba(11,27,51,.3)] xl:block ${f.pos}`}
              initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: reduce ? 0 : [0, -6, 0] }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 + k * 0.15 }, y: { duration: 6 + k, repeat: Infinity, ease: "easeInOut", delay: k * 0.4 } }}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12.5px] font-semibold text-ink">{s.grid[f.k].title}</span>
                <Pill tone={f.st === 2 ? "ok" : "blue"}>{flowStates[f.st]}</Pill>
              </div>
              <p className="mt-1 truncate text-[11.5px] text-slate">{s.grid[f.k].text}</p>
            </motion.div>
          ))}
          <motion.span initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink shadow-sm">{s.name}</motion.span>
          <h1 className="mx-auto mt-6 max-w-[820px] text-[42px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[64px]">
            <span className="sr-only">{s.hero.title} {s.hero.muted}</span>
            <span aria-hidden>
              {[s.hero.title, s.hero.muted].map((line, li) => (
                <span key={li} className="block overflow-hidden pb-[0.06em]">
                  <motion.span className={`block ${li ? "text-slate" : ""}`} initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.1 + li * 0.12 }}>{line}</motion.span>
                </span>
              ))}
            </span>
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[1.5] text-ink/70">{s.hero.sub}</motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={h("/contact")} className="focus-ring inline-flex h-11 items-center rounded-lg bg-ink px-5 font-display text-[14.5px] font-bold text-white transition hover:bg-cobalt">{t.servicePage.bookAudit}</Link>
            <a href="#how" className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-line px-5 font-display text-[14.5px] font-bold text-ink transition hover:border-ink/30">{t.servicePage.seeHow} <ArrowRight className="h-4 w-4" /></a>
          </motion.div>
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: EASE }} className="pb-20">
          <Stage className="p-4 sm:p-10"><div className="mx-auto max-w-[900px]"><Scene data={s.scenes.hero} tag={t.example} /></div></Stage>
        </motion.div>
      </div>
    </section>
  );
}

function Tools() {
  const { t } = useI18n();
  return (
    <section className="bg-white">
      <div className="frame frame-light">
        <p className="border-t border-line pt-10 text-center font-mono text-[11.5px] uppercase tracking-[0.12em] text-slate">{t.servicePage.worksWith}</p>
        <Stagger className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6" gap={0.04}>
          {t.tools.map((x) => (
            <StaggerItem key={x} className="grid h-20 place-items-center border-b border-r border-line font-display text-[15px] font-bold tracking-[-0.01em] text-ink/70 transition-colors hover:bg-sunken hover:text-ink">{x}</StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* Attio-style "how it works": stepper on the left, live scene on the right. */
function How({ i }: { i: number }) {
  const { t } = useI18n();
  const s = t.services[i];
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const sec = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (sec.current) io.observe(sec.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || paused || !visible) return;
    const t0 = performance.now() - tick * STEP_MS;
    let raf = 0;
    const loop = (now: number) => {
      const k = (now - t0) / STEP_MS;
      if (k >= 1) { setStep((x) => (x + 1) % 3); setTick(0); return; }
      setTick(k); raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [step, paused, visible, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="how" className="scroll-mt-20 bg-white">
      <div ref={sec} className="frame frame-light grid grid-cols-[minmax(0,1fr)] border-t border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="flex flex-col justify-between gap-12 py-16 lg:py-24 lg:pr-12">
          <SplitHeading className="max-w-[420px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: s.howTitle[0] }, { text: s.howTitle[1], className: "text-slate" }]} />
          <ol className="space-y-1" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {s.steps.map((st, k) => (
              <li key={st.title}>
                <button type="button" onClick={() => { setStep(k); setTick(0); }} aria-current={k === step ? "step" : undefined}
                  className="focus-ring group w-full rounded py-3 text-left">
                  <span className={`block text-[16px] font-semibold transition-colors ${k === step ? "text-ink" : "text-ink/35 group-hover:text-ink/60"}`}>{st.title}</span>
                  <AnimatePresence initial={false}>
                    {k === step && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="block overflow-hidden">
                        <span className="block max-w-[420px] pt-1.5 text-[14.5px] leading-[1.5] text-slate">{st.text}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="mt-3 block h-px w-full bg-line">
                    <span className="block h-px bg-ink" style={{ width: k === step ? `${(reduce ? 1 : tick) * 100}%` : "0%" }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="border-line lg:border-l">
          <Stage className="my-0 h-full rounded-none border-0 p-4 sm:p-10 lg:min-h-[640px]">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 14, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)" }} transition={{ duration: 0.45, ease: EASE }} className="mx-auto flex h-full max-w-[560px] flex-col justify-center lg:min-h-[560px]">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-slate">{t.servicePage.stepLabel} 0{step + 1}</p>
                <Scene data={s.scenes.steps[step]} tag={t.example} />
              </motion.div>
            </AnimatePresence>
          </Stage>
        </div>
      </div>
    </section>
  );
}

function GridCard({ title, text, n }: { title: string; text: string; n: number }) {
  const icons = ["task", "workflow", "plug", "gauge", "lock", "search", "pen", "code", "rocket", "refresh"];
  return (
    <div className="w-[280px] shrink-0 rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(11,27,51,.04)]">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-sunken text-ink/70"><Icon name={icons[n % icons.length]} className="h-4 w-4" /></span>
      <p className="mt-3 text-[14px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-[1.45] text-slate">{text}</p>
    </div>
  );
}

function Grid({ i }: { i: number }) {
  const { t } = useI18n();
  const s = t.services[i];
  const reduce = useReducedMotionSafe();
  const half = Math.ceil(s.grid.length / 2);
  const rows = [s.grid.slice(0, half), s.grid.slice(half)];
  return (
    <section className="overflow-hidden bg-white">
      <div className="frame frame-light border-t border-line py-24 text-center">
        <SplitHeading className="mx-auto max-w-[700px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: s.gridTitle[0] }, { text: s.gridTitle[1], className: "text-slate" }]} />
      </div>
      {reduce ? (
        // Reduced motion: no marquee, every capability shown once, wrapping inside the frame.
        <div className="frame frame-light -mt-8 flex flex-wrap justify-center gap-4 pb-24 text-left">
          {s.grid.map((g, k) => <GridCard key={g.title} title={g.title} text={g.text} n={k} />)}
        </div>
      ) : (
      <div className="relative -mt-8 space-y-4 pb-24 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            <div className={`flex shrink-0 gap-4 pr-4 ${reduce ? "" : r === 0 ? "animate-[marquee_60s_linear_infinite]" : "animate-[marquee-rev_60s_linear_infinite]"} group-hover:[animation-play-state:paused]`}>
              {[...row, ...row, ...row].map((g, k) => <GridCard key={k} title={g.title} text={g.text} n={k + r * 5} />)}
            </div>
            <div aria-hidden className={`flex shrink-0 gap-4 pr-4 ${reduce ? "hidden" : r === 0 ? "animate-[marquee_60s_linear_infinite]" : "animate-[marquee-rev_60s_linear_infinite]"} group-hover:[animation-play-state:paused]`}>
              {[...row, ...row, ...row].map((g, k) => <GridCard key={k} title={g.title} text={g.text} n={k + r * 5} />)}
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}

function Stat({ i }: { i: number }) {
  const s = useI18n().t.services[i];
  return (
    <section className="bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] border-t border-line md:grid-cols-2">
        <div className="py-20 md:pr-12">
          <SplitHeading className="max-w-[420px] text-[30px] font-bold leading-[1.2] tracking-[-0.025em] sm:text-[36px]" segments={[{ text: s.stat.title[0] }, { text: s.stat.title[1], className: "text-slate" }]} />
        </div>
        <Reveal className="flex flex-col items-start justify-center border-line py-20 md:items-center md:border-l">
          <p className="font-display text-[72px] font-bold leading-none tracking-[-0.05em] text-ink sm:text-[96px]">{s.stat.value}</p>
          <p className="mt-4 max-w-[280px] text-[14px] text-slate md:text-center">{s.stat.label}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Watch({ i }: { i: number }) {
  const { t } = useI18n();
  const s = t.services[i];
  return (
    <section className="bg-white">
      <div className="frame frame-light border-t border-line py-24">
        <SplitHeading className="mx-auto max-w-[760px] text-center text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: s.watchTitle[0] }, { text: s.watchTitle[1], className: "text-slate" }]} />
        <Reveal className="mt-14">
          <Stage className="p-4 sm:p-12"><div className="mx-auto max-w-[860px]"><Scene data={s.scenes.watch} tag={t.servicePage.watchLabel} /></div></Stage>
        </Reveal>
      </div>
    </section>
  );
}

function Principles({ i }: { i: number }) {
  const s = useI18n().t.services[i];
  const icons = ["lock", "search", "refresh"];
  return (
    <section className="bg-white">
      <div className="frame frame-light border-t border-line py-24">
        <SplitHeading className="max-w-[560px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: s.principlesTitle[0] }, { text: s.principlesTitle[1], className: "text-slate" }]} />
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3" gap={0.1}>
          {s.principles.map((p, k) => (
            <StaggerItem key={p.title} className="bg-white p-7">
              <Icon name={icons[k]} className="h-5 w-5 text-ink/70" />
              <p className="mt-10 text-[16px] font-semibold text-ink">{p.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-[1.5] text-slate">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Faq({ i }: { i: number }) {
  const { t } = useI18n();
  const s = t.services[i];
  return (
    <section className="bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-line py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <SplitHeading className="text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: t.servicePage.faqTitle[0] }, { text: t.servicePage.faqTitle[1], className: "text-slate" }]} />
        <div className="divide-y divide-line border-y border-line">
          {s.faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}<ChevronDown className="h-5 w-5 shrink-0 text-slate transition group-open:rotate-180" />
              </summary>
              <p className="max-w-[640px] pb-6 text-[15px] leading-[1.6] text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Others({ i }: { i: number }) {
  const { t } = useI18n();
  const h = useHref();
  return (
    <section className="bg-white">
      <div className="frame frame-light border-t border-line py-20">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-slate">{t.servicePage.other}</p>
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {t.services.filter((_, k) => k !== i).map((o) => (
            <StaggerItem key={o.slug}>
              <Link href={h(`/services/${o.slug}`)} className="focus-ring group flex h-full flex-col justify-between gap-6 rounded-xl border border-line p-5 transition hover:border-ink/25 hover:bg-sunken">
                <span className="text-[15px] font-semibold text-ink">{o.name}</span>
                <span className="flex items-center justify-between text-[13px] text-slate">{o.lead}<ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function ServicePage({ index }: { index: number }) {
  return (
    <>
      <Hero i={index} />
      <Tools />
      <How i={index} />
      <Grid i={index} />
      <Stat i={index} />
      <Watch i={index} />
      <Principles i={index} />
      <Faq i={index} />
      <Others i={index} />
      <CtaBand />
    </>
  );
}
