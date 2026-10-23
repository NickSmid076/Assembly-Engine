"use client";
// The audit request form: three steps (your firm → how it feels → talk). Posts to /api/contact (Resend) with
// the honeypot `company_website`. Accessibility: a persistent step heading that takes focus on every step
// change; errors linked to their fields (aria-invalid + aria-describedby), a summary, focus on the first
// invalid field; services as a real checkbox group; sliders are native range inputs (arrow keys work), and
// untouched means "not answered". The Cal.com embed mounts only on the last step. Types only from ./schema.
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ContactFormBlock } from "./schema";

const EASE = [0.2, 0.8, 0.2, 1] as const;
type Key = "name" | "firm" | "email" | "phone" | "message" | "company_website";
type Errors = Partial<Record<"name" | "email" | "services", string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Tick({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>;
}

/** Error text: ink on white with an attention marker (status colour as a marker only, text stays AA). */
function Err({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-[14px] leading-[1.4] text-ink">
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-[2px] bg-warn" />{children}
    </p>
  );
}

const inputCls = (bad: boolean) =>
  `mt-2 w-full rounded-lg border bg-white px-4 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate focus:border-cobalt focus:shadow-[0_0_0_4px_rgba(46,91,255,.14)] ${bad ? "border-warn shadow-[0_0_0_3px_rgba(183,121,31,.14)]" : "border-line-2 hover:border-ink/30"}`;

function Feel({ id, label, value, onChange, scale, untouched, reset }: {
  id: string; label: string; value: number | null; onChange: (v: number | null) => void; scale: string[]; untouched: string; reset: string;
}) {
  const set = value !== null;
  return (
    <div className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="min-w-0 text-[15px] font-medium leading-[1.35] text-ink">{label}</label>
        <span className="flex shrink-0 items-baseline gap-2">
          <span aria-hidden className={`text-[14px] ${set ? "font-semibold text-ink" : "text-slate"}`}>{value !== null ? scale[value] : untouched}</span>
          {set && (
            <button type="button" onClick={() => onChange(null)} aria-label={`${reset}: ${label}`}
              className="focus-ring min-h-[32px] rounded px-1 text-[13px] text-slate underline decoration-line-2 underline-offset-2 transition-colors duration-150 hover:text-ink">{reset}</button>
          )}
        </span>
      </div>
      <div className="relative mt-2">
        <div aria-hidden className="pointer-events-none absolute inset-x-[9px] top-1/2 flex -translate-y-1/2 justify-between">
          {scale.map((_, i) => <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${value !== null && i <= value ? "bg-cobalt" : "bg-line-2"}`} />)}
        </div>
        <input id={id} type="range" min={0} max={scale.length - 1} step={1} value={value ?? 2}
          onChange={(e) => onChange(Number(e.target.value))} onClick={(e) => onChange(Number((e.target as HTMLInputElement).value))}
          aria-valuetext={value !== null ? scale[value] : untouched}
          className={`feel-range relative h-11 w-full ${set ? "is-set" : ""}`} />
      </div>
      <div aria-hidden className="flex justify-between text-[12.5px] text-slate"><span>{scale[0]}</span><span>{scale[scale.length - 1]}</span></div>
    </div>
  );
}

export default function Form({ c }: { c: ContactFormBlock }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Record<Key, string>>({ name: "", firm: "", email: "", phone: "", message: "", company_website: "" });
  const [services, setServices] = useState<string[]>([]);
  const [feel, setFeel] = useState<Record<string, number | null>>(() => Object.fromEntries(c.feel.items.map((x) => [x.key, null])));
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [dev, setDev] = useState(false);
  const [calReady, setCalReady] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // Every step change: the step heading takes focus (screen readers hear where they are) and the panel
  // scrolls back into view if its top is off-screen.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    head.current?.focus({ preventScroll: true });
    const top = panel.current?.getBoundingClientRect().top ?? 0;
    if (top < 72) panel.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step]);

  const put = (k: Key, v: string) => { setF((x) => ({ ...x, [k]: v })); if (k in errors) setErrors((e) => ({ ...e, [k]: undefined })); };

  function next(e: React.FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (!f.name.trim()) er.name = c.errors.name;
    if (!EMAIL.test(f.email.trim())) er.email = c.errors.email;
    if (!services.length) er.services = c.errors.services;
    setErrors(er);
    const bad = (["name", "email", "services"] as const).find((k) => er[k]);
    if (bad) {
      setSummary(true);
      document.getElementById(bad === "services" ? "cf-services-0" : `cf-${bad}`)?.focus();
      return;
    }
    setSummary(false);
    setStep(1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, services, locale: c.locale, feelings: Object.fromEntries(Object.entries(feel).map(([k, v]) => [k, v === null ? null : c.feel.scale[v]])) }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error();
      setDev(!!j.dev);
      setStatus("sent");
      setStep(2);
    } catch { setStatus("failed"); }
  }

  const field = (k: "name" | "firm" | "email" | "phone", label: string, type: string, auto: string) => {
    const err = k === "name" || k === "email" ? errors[k] : undefined;
    return (
      <div>
        <label htmlFor={`cf-${k}`} className="text-[14px] font-medium text-ink">{label}</label>
        <input id={`cf-${k}`} name={k} type={type} autoComplete={auto} value={f[k]} onChange={(e) => put(k, e.target.value)}
          aria-invalid={err ? true : undefined} aria-describedby={err ? `cf-${k}-e` : undefined} className={`${inputCls(!!err)} h-12`} />
        {err && <Err id={`cf-${k}-e`}>{err}</Err>}
      </div>
    );
  };

  const btn = "focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 font-display text-[15px] font-bold text-white transition-[background-color,transform] duration-150 hover:bg-cobalt active:scale-[0.97] aria-disabled:opacity-60";
  const arrow = <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;

  return (
    <div ref={panel} className="min-w-0 scroll-mt-24 overflow-hidden rounded-xl border border-line-2 bg-white">
      {/* Steps: number + label, never truncated; label under the number on phone. */}
      <div className="border-b border-line px-5 pt-5 sm:px-8 sm:pt-7">
        <ol className="grid grid-cols-3 gap-3">
          {c.steps.map((s, i) => {
            const done = i < step, cur = i === step, back = done && step < 2;
            const inner = (
              <>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[12px] tabular-nums transition-colors duration-300 ${done ? "bg-ink text-white" : cur ? "bg-cobalt text-white" : "border border-line-2 text-slate"}`}>{done ? <Tick /> : i + 1}</span>
                <span className={`text-[14px] font-medium leading-[1.25] ${cur || done ? "text-ink" : "text-slate"}`}>{s}</span>
              </>
            );
            const cls = "flex flex-col items-start gap-2 text-left sm:flex-row sm:items-center sm:gap-2.5";
            return (
              <li key={s} aria-current={cur ? "step" : undefined} className="min-w-0">
                {back
                  ? <button type="button" onClick={() => setStep(i)} className={`focus-ring rounded-md ${cls} hover:opacity-80`}>{inner}</button>
                  : <div className={cls}>{inner}</div>}
              </li>
            );
          })}
        </ol>
        <div aria-hidden className="relative mt-5 h-[2px] bg-line">
          <span className="absolute inset-0 origin-left bg-cobalt transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `scaleX(${(step + 1) / 3})` }} />
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <h2 ref={head} tabIndex={-1} className="font-mono text-[12px] font-normal uppercase tracking-[0.1em] text-slate outline-none">
          {c.step_of.replace("{n}", String(step + 1)).replace("{total}", "3")} · {c.steps[step]}
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24, transition: { duration: 0.15 } }} transition={{ duration: 0.3, ease: EASE }}>
            {step === 0 && (
              <form noValidate onSubmit={next} className="mt-6 space-y-6">
                {summary && Object.values(errors).some(Boolean) && (
                  <p role="alert" className="flex items-center gap-2.5 rounded-lg border border-warn/40 bg-warn-soft px-4 py-3 text-[14px] text-ink">
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-[2px] bg-warn" />{c.errors.summary}
                  </p>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  {field("name", c.fields.name, "text", "name")}
                  {field("firm", c.fields.firm, "text", "organization")}
                  {field("email", c.fields.email, "email", "email")}
                  {field("phone", c.fields.phone, "tel", "tel")}
                </div>
                {/* Honeypot: invisible to people, filled by bots; the API drops those requests. */}
                <input name="company_website" tabIndex={-1} aria-hidden autoComplete="off" className="hidden" value={f.company_website} onChange={(e) => put("company_website", e.target.value)} />
                <fieldset aria-describedby={errors.services ? "cf-services-e" : undefined}>
                  <legend className="text-[14px] font-medium text-ink">{c.fields.services}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.services.map((s, i) => {
                      const on = services.includes(s.value);
                      return (
                        <label key={s.value}
                          className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border px-4 text-[14.5px] font-medium transition-[background-color,border-color,color] duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-peri ${on ? "border-ink bg-ink text-white" : errors.services ? "border-warn bg-white text-ink" : "border-line-2 bg-white text-ink hover:border-ink/40"}`}>
                          <input id={`cf-services-${i}`} type="checkbox" className="sr-only" checked={on} aria-invalid={errors.services ? true : undefined}
                            onChange={() => { setServices((x) => (on ? x.filter((v) => v !== s.value) : [...x, s.value])); setErrors((e) => ({ ...e, services: undefined })); }} />
                          <span aria-hidden className={`grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border transition-colors duration-150 ${on ? "border-white bg-white text-ink" : "border-line-2"}`}>{on && <Tick className="h-3 w-3" />}</span>
                          {s.label}
                        </label>
                      );
                    })}
                  </div>
                  {errors.services && <Err id="cf-services-e">{errors.services}</Err>}
                </fieldset>
                <div className="flex justify-end pt-2"><button type="submit" className={btn}>{c.buttons.next} {arrow}</button></div>
              </form>
            )}

            {step === 1 && (
              <form noValidate onSubmit={submit} className="mt-6">
                <p className="font-display text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-ink">{c.feel.title}</p>
                <p className="mt-1.5 text-[15px] text-slate">{c.feel.sub}</p>
                <div className="mt-4 divide-y divide-line border-y border-line">
                  {c.feel.items.map((x) => (
                    <Feel key={x.key} id={`cf-feel-${x.key}`} label={x.label} value={feel[x.key]} onChange={(v) => setFeel((s) => ({ ...s, [x.key]: v }))}
                      scale={c.feel.scale} untouched={c.feel.untouched} reset={c.feel.reset} />
                  ))}
                </div>
                <div className="mt-6">
                  <label htmlFor="cf-message" className="text-[14px] font-medium text-ink">{c.fields.message}</label>
                  <textarea id="cf-message" name="message" rows={4} value={f.message} placeholder={c.fields.message_placeholder} onChange={(e) => put("message", e.target.value)}
                    className={`${inputCls(false)} py-3 leading-[1.5]`} />
                </div>
                {status === "failed" && (
                  <p role="alert" className="mt-5 flex items-start gap-2.5 rounded-lg border border-warn/40 bg-warn-soft px-4 py-3 text-[14px] leading-[1.45] text-ink">
                    <span aria-hidden className="mt-[6px] h-2 w-2 shrink-0 rounded-[2px] bg-warn" />{c.sent.failed}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <button type="button" onClick={() => setStep(0)} className="focus-ring inline-flex min-h-[44px] items-center rounded-md px-1 text-[15px] font-medium text-slate transition-colors duration-150 hover:text-ink">← {c.buttons.back}</button>
                  <button type="submit" aria-disabled={status === "sending" || undefined} className={btn}>{status === "sending" ? c.buttons.sending : c.buttons.submit} {arrow}</button>
                </div>
                <p className="mt-4 text-[13px] text-slate">{c.privacy}</p>
              </form>
            )}

            {step === 2 && (
              <div className="mt-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-white"><Tick className="h-4 w-4" /></span>
                  <div>
                    <p className="font-display text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-ink">{c.sent.title}</p>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-slate">{c.sent.sub}</p>
                  </div>
                </div>
                {dev && (
                  <p className="mt-5 flex items-start gap-2.5 rounded-lg border border-warn/40 bg-warn-soft px-4 py-3 text-[14px] leading-[1.45] text-ink">
                    <span aria-hidden className="mt-[6px] h-2 w-2 shrink-0 rounded-[2px] bg-warn" />{c.sent.dev}
                  </p>
                )}
                <div className="mt-6 border-t-2 border-ink">
                  <p className="py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{c.sent.receipt}</p>
                  <dl className="divide-y divide-line border-y border-line text-[15px]">
                    {([[c.fields.name, f.name], [c.fields.firm, f.firm], [c.sent.email_label, f.email], [c.fields.services, c.services.filter((s) => services.includes(s.value)).map((s) => s.label).join(", ")]] as const)
                      .filter(([, v]) => v.trim())
                      .map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3">
                          <dt className="text-slate">{k}</dt>
                          <dd className="min-w-0 font-medium text-ink [overflow-wrap:anywhere]">{v}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
                <h3 className="mt-10 font-display text-[18px] font-bold text-ink">{c.cal.title}</h3>
                <div className="relative mt-3 h-[640px] overflow-hidden rounded-xl border border-line bg-paper">
                  {!calReady && <p aria-hidden className="absolute inset-0 grid place-items-center text-[14px] text-slate">{c.cal.loading}</p>}
                  <iframe src={`${c.cal.url}?embed=true&layout=month_view&theme=light`} title={c.cal.title} onLoad={() => setCalReady(true)}
                    className={`relative h-full w-full border-0 transition-opacity duration-300 ${calReady ? "opacity-100" : "opacity-0"}`} />
                </div>
                <a href={c.cal.url} target="_blank" rel="noopener noreferrer"
                  className="focus-ring mt-3 inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">
                  {c.cal.open}<span aria-hidden className="ml-1">↗</span>
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
