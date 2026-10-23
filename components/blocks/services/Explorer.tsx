"use client";
// The five services as a list of disclosure buttons; the open service shows its text, link and its
// moment: a short product story that plays once when visible (moments/, docs/service-animations-plan.md).
// Desktop: one persistent stage in the right column, so switching services is a hand-off, not a cut.
// Phone/tablet: the stage sits under the open item.
import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { DUR, EASE } from "@/lib/motion";
import { CtaLink } from "../ui";
import Stage from "./moments/Stage";
import type { StoryLabels } from "./moments/schema";
import type { ServicesBlock } from "./schema";

export default function Explorer({ items, label, labels }: { items: ServicesBlock["items"]; label: string; labels: StoryLabels }) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  // A hero module (or any link with data-open-service) opens that service; the link's own anchor scrolls here.
  useEffect(() => {
    const open = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-open-service]");
      const i = el ? Number(el.getAttribute("data-open-service")) : NaN;
      if (Number.isInteger(i) && i >= 0 && i < items.length) setActive(i);
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, [items.length]);
  const stage = (i: number, where: "m" | "d") => <Stage moment={items[i].moment} index={i} labels={labels} id={`${uid}-${where}s`} />;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <LayoutGroup id={uid}>
        <ul aria-label={label} className="min-w-0 border-t border-white/10">
          {items.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.name} className="border-b border-white/10">
                <button type="button" aria-expanded={on} aria-controls={`${uid}-d${i}`} onClick={() => setActive(i)}
                  className="focus-ring group flex w-full items-center gap-4 py-5 text-left">
                  <span aria-hidden className="relative h-2.5 w-2.5 shrink-0 bg-white/20 transition-colors duration-150 group-hover:bg-white/45">
                    {on && <motion.span layoutId="marker" className="absolute inset-0 bg-cobalt-2" transition={{ duration: DUR.state, ease: EASE }} />}
                  </span>
                  <span className={`min-w-0 font-display text-[20px] font-bold leading-[1.25] tracking-[-0.02em] transition-colors duration-300 [overflow-wrap:anywhere] sm:text-[24px] ${on ? "text-white" : "text-white/60 group-hover:text-white/85"}`}>{s.name}</span>
                </button>
                {on && (
                  <motion.div id={`${uid}-d${i}`} className="pb-6" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DUR.state, ease: EASE }}>
                    <div className="pl-[26px]">
                      <p className="max-w-[460px] text-pretty text-[16px] leading-[1.55] text-white/80"><span className="font-semibold text-white">{s.lead}</span> {s.rest}</p>
                      <CtaLink link={s.link} arrow className="focus-ring mt-2 inline-flex min-h-[44px] items-center gap-2 font-display text-[15px] font-bold text-peri hover:text-white" />
                    </div>
                    <div className="mt-6 rounded-xl bg-paper p-3 sm:p-5 lg:hidden">{stage(i, "m")}</div>
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
      <div className="hidden min-w-0 lg:block">
        <div className="rounded-2xl bg-paper p-6 xl:p-8">{stage(active, "d")}</div>
      </div>
    </div>
  );
}
