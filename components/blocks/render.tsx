// renderBlocks: turns a page's `sections` (ACF flexible content) into block components.
// Every block's props are validated with its zod schema: in development a bad shape throws (so a WordPress
// field change is caught immediately); in production the block is skipped and logged, never half-rendered.
import type { ComponentType } from "react";
import type { z } from "zod";
import type { Section } from "@/lib/content";
import HeroHome from "./hero-home/HeroHome";
import { heroHomeSchema } from "./hero-home/schema";
import HowItRuns from "./how-it-runs/HowItRuns";
import { howItRunsSchema } from "./how-it-runs/schema";
import Process from "./process/Process";
import { processSchema } from "./process/schema";
import Services from "./services/Services";
import { servicesSchema } from "./services/schema";
import Proof from "./proof/Proof";
import { proofSchema } from "./proof/schema";
import WhyUs from "./why-us/WhyUs";
import { whyUsSchema } from "./why-us/schema";
import ClosingCta from "./closing-cta/ClosingCta";
import { closingCtaSchema } from "./closing-cta/schema";
import ServiceHero from "./service-hero/ServiceHero";
import { serviceHeroSchema } from "./service-hero/schema";
import ServiceSignature from "./service-signature/ServiceSignature";
import { serviceSignatureSchema } from "./service-signature/schema";
import ServiceSteps from "./service-steps/ServiceSteps";
import { serviceStepsSchema } from "./service-steps/schema";
import ServiceScope from "./service-scope/ServiceScope";
import { serviceScopeSchema } from "./service-scope/schema";
import ServicePrinciples from "./service-principles/ServicePrinciples";
import { servicePrinciplesSchema } from "./service-principles/schema";
import ServiceFaq from "./service-faq/ServiceFaq";
import { serviceFaqSchema } from "./service-faq/schema";
import ServiceOthers from "./service-others/ServiceOthers";
import { serviceOthersSchema } from "./service-others/schema";
import CaseHero from "./case-hero/CaseHero";
import { caseHeroSchema } from "./case-hero/schema";
import CaseFindings from "./case-findings/CaseFindings";
import { caseFindingsSchema } from "./case-findings/schema";
import Ledger from "./ledger/Ledger";
import { ledgerSchema } from "./ledger/schema";
import CasePages from "./case-pages/CasePages";
import { casePagesSchema } from "./case-pages/schema";
import CaseResults from "./case-results/CaseResults";
import { caseResultsSchema } from "./case-results/schema";
import CaseTimeline from "./case-timeline/CaseTimeline";
import { caseTimelineSchema } from "./case-timeline/schema";
import Quote from "./quote/Quote";
import PageIntro from "./page-intro/PageIntro";
import { pageIntroSchema } from "./page-intro/schema";
import ContactForm from "./contact-form/ContactForm";
import { contactFormSchema } from "./contact-form/schema";
import AboutHero from "./about-hero/AboutHero";
import { aboutHeroSchema } from "./about-hero/schema";
import AboutStory from "./about-story/AboutStory";
import { aboutStorySchema } from "./about-story/schema";
import BlogList from "./blog-list/BlogList";
import { blogListSchema } from "./blog-list/schema";
import PostHeader from "./post-header/PostHeader";
import { postHeaderSchema } from "./post-header/schema";
import RichText from "./rich-text/RichText";
import { richTextSchema } from "./rich-text/schema";
import { quoteSchema } from "./quote/schema";

type Entry = { schema: z.ZodType; Component: ComponentType<{ content: never }> };

const REGISTRY: Record<Section["acf_fc_layout"], Entry> = {
  hero_home: { schema: heroHomeSchema, Component: HeroHome },
  how_it_runs: { schema: howItRunsSchema, Component: HowItRuns },
  process: { schema: processSchema, Component: Process },
  services: { schema: servicesSchema, Component: Services },
  proof: { schema: proofSchema, Component: Proof },
  why_us: { schema: whyUsSchema, Component: WhyUs },
  closing_cta: { schema: closingCtaSchema, Component: ClosingCta },
  service_hero: { schema: serviceHeroSchema, Component: ServiceHero },
  service_signature: { schema: serviceSignatureSchema, Component: ServiceSignature },
  service_steps: { schema: serviceStepsSchema, Component: ServiceSteps },
  service_scope: { schema: serviceScopeSchema, Component: ServiceScope },
  service_principles: { schema: servicePrinciplesSchema, Component: ServicePrinciples },
  service_faq: { schema: serviceFaqSchema, Component: ServiceFaq },
  service_others: { schema: serviceOthersSchema, Component: ServiceOthers },
  case_hero: { schema: caseHeroSchema, Component: CaseHero },
  case_findings: { schema: caseFindingsSchema, Component: CaseFindings },
  ledger: { schema: ledgerSchema, Component: Ledger },
  case_pages: { schema: casePagesSchema, Component: CasePages },
  case_results: { schema: caseResultsSchema, Component: CaseResults },
  case_timeline: { schema: caseTimelineSchema, Component: CaseTimeline },
  quote: { schema: quoteSchema, Component: Quote },
  page_intro: { schema: pageIntroSchema, Component: PageIntro },
  contact_form: { schema: contactFormSchema, Component: ContactForm },
  about_hero: { schema: aboutHeroSchema, Component: AboutHero },
  about_story: { schema: aboutStorySchema, Component: AboutStory },
  blog_list: { schema: blogListSchema, Component: BlogList },
  post_header: { schema: postHeaderSchema, Component: PostHeader },
  rich_text: { schema: richTextSchema, Component: RichText },
};

export function renderBlocks(sections: Section[]) {
  return sections.map((section, i) => {
    const entry = REGISTRY[section.acf_fc_layout];
    if (!entry) {
      console.error(`[renderBlocks] Unknown layout "${(section as { acf_fc_layout: string }).acf_fc_layout}"`);
      return null;
    }
    const parsed = entry.schema.safeParse(section);
    if (!parsed.success) {
      const msg = `[renderBlocks] "${section.acf_fc_layout}" (section ${i}) has invalid content:\n${parsed.error.message}`;
      if (process.env.NODE_ENV !== "production") throw new Error(msg);
      console.error(msg);
      return null;
    }
    const { Component } = entry;
    return <Component key={`${section.acf_fc_layout}-${i}`} content={parsed.data as never} />;
  });
}
