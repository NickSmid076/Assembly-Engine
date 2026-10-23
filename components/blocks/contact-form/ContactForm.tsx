// Contact · the audit request. Form left (a client island), the person and what happens next right.
// Pattern: P9 person beside a form. Content: ContactFormBlock. Server component around the island.
import Image from "next/image";
import type { ContactFormBlock } from "./schema";
import dynamic from "next/dynamic";

// Lazy, so the island ships only with the contact route (the block registry imports every block).
const Form = dynamic(() => import("./Form"));

export default function ContactForm({ content: c }: { content: ContactFormBlock }) {
  const A = c.aside;
  return (
    <section id={c.anchor} className="scroll-mt-20 bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 pb-24 sm:pb-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
        <Form c={c} />
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <figure className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4">
            <div className="relative aspect-square overflow-hidden rounded-full bg-ink-2">
              <Image src={A.person.image.url} alt="" fill sizes="72px" className="object-cover object-[50%_28%]" />
            </div>
            <figcaption className="text-[15px] leading-[1.4]">
              <span className="block font-semibold text-ink">{A.person.name}</span>
              <span className="block text-slate">{A.person.role}</span>
            </figcaption>
          </figure>
          <h2 className="mt-10 font-mono text-[12px] font-normal uppercase tracking-[0.1em] text-slate">{A.title}</h2>
          <ol className="relative mt-5">
            <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-line-2" />
            {A.items.map((it, i) => (
              <li key={it} className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-4 pb-6 last:pb-0">
                <span aria-hidden className="relative grid h-6 w-6 place-items-center rounded-full border border-line-2 bg-white font-mono text-[11px] tabular-nums text-ink">{i + 1}</span>
                <span className="pt-[1px] text-[15px] leading-[1.5] text-ink">{it}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t-2 border-ink pt-4">
            <p className="text-[14px] text-slate">{A.direct}</p>
            <a href={`mailto:${A.email}`} className="focus-ring mt-1 inline-flex min-h-[44px] items-center text-[17px] font-semibold text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">{A.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
