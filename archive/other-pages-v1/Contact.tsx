"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { EASE } from "@/lib/motion";
import PageHeader from "./PageHeader";
import { useI18n } from "./I18nProvider";
import { ArrowRight, Check } from "./icons";

const CAL = process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/nick-assembly-engine/30min";

/** Optional 5-step feeling slider. `null` means the visitor left it untouched. */
function FeelSlider({ label, value, onChange, scale, untouched }: { label: string; value: number | null; onChange: (v: number | null) => void; scale: string[]; untouched: string }) {
  const id = useId();
  const set = value !== null;
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[14.5px] font-semibold text-ink">{label}</label>
        <span className={`text-[12.5px] ${set ? "font-medium text-cobalt" : "text-slate/70"}`}>{set ? scale[value!] : untouched}</span>
      </div>
      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-x-[9px] top-1/2 flex -translate-y-1/2 justify-between">
          {scale.map((_, i) => <span key={i} className={`h-1.5 w-1.5 rounded-full ${set && i <= value! ? "bg-cobalt" : "bg-line-2"}`} />)}
        </div>
        <input id={id} type="range" min={0} max={scale.length - 1} step={1} value={value ?? 2}
          onChange={(e) => onChange(Number(e.target.value))} onClick={(e) => onChange(Number((e.target as HTMLInputElement).value))}
          aria-valuetext={set ? scale[value!] : untouched}
          className={`feel-range relative w-full ${set ? "is-set" : ""}`} />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-slate"><span>{scale[0]}</span>{set && <button type="button" onClick={() => onChange(null)} className="text-slate underline-offset-2 hover:text-ink hover:underline">×</button>}<span>{scale[scale.length - 1]}</span></div>
    </div>
  );
}

export default function Contact() {
  const { t, locale } = useI18n();
  const c = t.contact;
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ name: "", firm: "", email: "", phone: "", message: "", company_website: "" });
  const [services, setServices] = useState<string[]>([]);
  const [feel, setFeel] = useState<Record<string, number | null>>(Object.fromEntries(c.feel.map((x) => [x.key, null])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [dev, setDev] = useState(false);

  const validate1 = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = c.errors.email;
    if (!services.length) e.services = c.errors.services;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, services, locale, feelings: Object.fromEntries(Object.entries(feel).map(([k, v]) => [k, v === null ? null : c.scale[v]])) }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error();
      setDev(!!j.dev);
      setStatus("sent");
      setStep(2);
    } catch { setStatus("failed"); }
  };

  const field = (k: keyof typeof f, label: string, type = "text", auto?: string) => (
    <div>
      <label htmlFor={`f-${k}`} className="text-[13px] font-medium text-ink">{label}</label>
      <input id={`f-${k}`} type={type} autoComplete={auto} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); setErrors({ ...errors, [k]: "" }); }}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={`mt-1.5 h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10 ${errors[k] ? "border-red-400" : "border-line-2"}`} />
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-[12.5px] text-red-600">{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} muted={c.muted} lead={c.sub} />
      <section className="bg-white">
        <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 pb-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(11,27,51,.04),0_20px_50px_-30px_rgba(11,27,51,.25)]">
            {/* progress */}
            <ol className="grid grid-cols-3 border-b border-line">
              {c.steps.map((s, i) => (
                <li key={s} className={`flex items-center gap-2.5 px-4 py-3.5 text-[13px] font-medium sm:px-6 ${i ? "border-l border-line" : ""} ${i === step ? "text-ink" : i < step ? "text-slate" : "text-slate/50"}`}>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10.5px] ${i < step ? "bg-ok text-white" : i === step ? "bg-ink text-white" : "border border-line-2"}`}>{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ol>
            <div className="p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: EASE }}>
                  {step === 0 && (
                    <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate1()) setStep(1); }} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {field("name", c.fields.name, "text", "name")}
                        {field("firm", c.fields.firm, "text", "organization")}
                        {field("email", c.fields.email, "email", "email")}
                        {field("phone", c.fields.phone, "tel", "tel")}
                      </div>
                      <input tabIndex={-1} aria-hidden autoComplete="off" className="hidden" value={f.company_website} onChange={(e) => setF({ ...f, company_website: e.target.value })} />
                      <fieldset>
                        <legend className="text-[13px] font-medium text-ink">{c.fields.services}</legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {t.services.map((s) => {
                            const on = services.includes(s.name);
                            return (
                              <button key={s.slug} type="button" aria-pressed={on} onClick={() => { setServices(on ? services.filter((x) => x !== s.name) : [...services, s.name]); setErrors({ ...errors, services: "" }); }}
                                className={`focus-ring inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13.5px] font-medium transition ${on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink/40"}`}>
                                {on && <Check className="h-3.5 w-3.5" />}{s.name}
                              </button>
                            );
                          })}
                        </div>
                        {errors.services && <p className="mt-1.5 text-[12.5px] text-red-600">{errors.services}</p>}
                      </fieldset>
                      <div className="flex justify-end pt-2"><button type="submit" className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 font-display text-[14.5px] font-bold text-white transition hover:bg-cobalt">{c.next} <ArrowRight className="h-4 w-4" /></button></div>
                    </form>
                  )}
                  {step === 1 && (
                    <form noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-5">
                      <div>
                        <p className="text-[17px] font-semibold text-ink">{c.feelTitle}</p>
                        <p className="mt-1 text-[13.5px] text-slate">{c.feelSub}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {c.feel.map((x, i) => <div key={x.key} className={i === c.feel.length - 1 && c.feel.length % 2 ? "sm:col-span-2" : ""}><FeelSlider label={x.label} value={feel[x.key]} onChange={(v) => setFeel({ ...feel, [x.key]: v })} scale={c.scale} untouched={c.untouched} /></div>)}
                      </div>
                      <div>
                        <label htmlFor="f-message" className="text-[13px] font-medium text-ink">{c.fields.message}</label>
                        <textarea id="f-message" rows={4} value={f.message} placeholder={c.fields.messagePh} onChange={(e) => setF({ ...f, message: e.target.value })}
                          className="mt-1.5 w-full rounded-lg border border-line-2 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition placeholder:text-slate/60 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10" />
                      </div>
                      {status === "failed" && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[13.5px] text-red-700">{c.sentFailed}</p>}
                      <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => setStep(0)} className="focus-ring rounded text-[14px] font-medium text-slate hover:text-ink">← {c.back}</button>
                        <button type="submit" disabled={status === "sending"} className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 font-display text-[14.5px] font-bold text-white transition hover:bg-cobalt disabled:opacity-60">{status === "sending" ? c.sending : c.submit} <ArrowRight className="h-4 w-4" /></button>
                      </div>
                      <p className="text-[12px] text-slate">{c.privacy}</p>
                    </form>
                  )}
                  {step === 2 && (
                    <div>
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-white"><Check className="h-4 w-4" /></span>
                        <div>
                          <p className="text-[18px] font-semibold text-ink">{c.sentTitle}</p>
                          <p className="mt-1 text-[14.5px] text-slate">{c.sentSub}</p>
                          {dev && <p className="mt-2 rounded-md bg-warn-soft px-3 py-2 text-[12.5px] text-warn">{c.devNote}</p>}
                        </div>
                      </div>
                      <p className="mt-8 text-[14px] font-semibold text-ink">{c.calTitle}</p>
                      <div className="mt-3 overflow-hidden rounded-xl border border-line">
                        <iframe src={`${CAL}?embed=true&layout=month_view`} title={c.calTitle} className="h-[640px] w-full border-0" loading="lazy" />
                      </div>
                      <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-cobalt hover:underline">{c.calOpen} <ArrowRight className="h-4 w-4" /></a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <aside className="lg:pt-2">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-slate">{c.asideTitle}</p>
            <ol className="mt-5 space-y-5">
              {c.aside.map((a, i) => (
                <li key={a} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line font-mono text-[11px] text-ink">{i + 1}</span>
                  <span className="pt-0.5 text-[15px] leading-[1.5] text-ink/85">{a}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-xl border border-line bg-sunken p-5">
              <p className="text-[13px] text-slate">{c.direct}</p>
              <p className="mt-1 select-all text-[16px] font-semibold text-ink">nick@assembly-engine.com</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
