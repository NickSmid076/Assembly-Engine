// Content shapes, modelled on what WordPress (REST API + ACF Pro, Polylang) will return.
// Each block's zod schema (components/blocks/<block>/schema.ts) is the source of truth; the types are inferred.
import type { Locale } from "@/lib/i18n/config";
import type { HeroHomeBlock } from "@/components/blocks/hero-home/schema";
import type { HowItRunsBlock } from "@/components/blocks/how-it-runs/schema";
import type { ProcessBlock } from "@/components/blocks/process/schema";
import type { ServicesBlock } from "@/components/blocks/services/schema";
import type { ProofBlock } from "@/components/blocks/proof/schema";
import type { WhyUsBlock } from "@/components/blocks/why-us/schema";
import type { ClosingCtaBlock } from "@/components/blocks/closing-cta/schema";
import type { ServiceHeroBlock } from "@/components/blocks/service-hero/schema";
import type { ServiceSignatureBlock } from "@/components/blocks/service-signature/schema";
import type { ServiceStepsBlock } from "@/components/blocks/service-steps/schema";
import type { ServiceScopeBlock } from "@/components/blocks/service-scope/schema";
import type { ServicePrinciplesBlock } from "@/components/blocks/service-principles/schema";
import type { ServiceFaqBlock } from "@/components/blocks/service-faq/schema";
import type { ServiceOthersBlock } from "@/components/blocks/service-others/schema";
import type { CaseHeroBlock } from "@/components/blocks/case-hero/schema";
import type { CaseFindingsBlock } from "@/components/blocks/case-findings/schema";
import type { LedgerBlock } from "@/components/blocks/ledger/schema";
import type { CasePagesBlock } from "@/components/blocks/case-pages/schema";
import type { CaseResultsBlock } from "@/components/blocks/case-results/schema";
import type { CaseTimelineBlock } from "@/components/blocks/case-timeline/schema";
import type { QuoteBlock } from "@/components/blocks/quote/schema";
import type { PageIntroBlock } from "@/components/blocks/page-intro/schema";
import type { ContactFormBlock } from "@/components/blocks/contact-form/schema";
import type { AboutHeroBlock } from "@/components/blocks/about-hero/schema";
import type { AboutStoryBlock } from "@/components/blocks/about-story/schema";
import type { BlogListBlock } from "@/components/blocks/blog-list/schema";
import type { PostHeaderBlock } from "@/components/blocks/post-header/schema";
import type { RichTextBlock } from "@/components/blocks/rich-text/schema";

export type { WPLink, WPImage, HeadingPart } from "@/components/blocks/shared";
export type { Run, RunRow } from "@/components/blocks/how-it-runs/schema";
export type { HeroHomeBlock, HowItRunsBlock, ProcessBlock, ServicesBlock, ProofBlock, WhyUsBlock, ClosingCtaBlock };
export type { ServiceHeroBlock, ServiceSignatureBlock, ServiceStepsBlock, ServiceScopeBlock, ServicePrinciplesBlock, ServiceFaqBlock, ServiceOthersBlock };
export type { CaseHeroBlock, CaseFindingsBlock, LedgerBlock, CasePagesBlock, CaseResultsBlock, CaseTimelineBlock, QuoteBlock, PageIntroBlock, ContactFormBlock, AboutHeroBlock, AboutStoryBlock, BlogListBlock, PostHeaderBlock, RichTextBlock };

/** Every section layout a page can hold (ACF flexible content `sections`). */
export type Section =
  | HeroHomeBlock | HowItRunsBlock | ProcessBlock | ServicesBlock | ProofBlock | WhyUsBlock | ClosingCtaBlock
  | ServiceHeroBlock | ServiceSignatureBlock | ServiceStepsBlock | ServiceScopeBlock | ServicePrinciplesBlock | ServiceFaqBlock | ServiceOthersBlock
  | CaseHeroBlock | CaseFindingsBlock | LedgerBlock | CasePagesBlock | CaseResultsBlock | CaseTimelineBlock | QuoteBlock | PageIntroBlock | ContactFormBlock
  | AboutHeroBlock | AboutStoryBlock | BlogListBlock | PostHeaderBlock | RichTextBlock;

export type HomePage = {
  locale: Locale;
  title: string;
  description: string;
  sections: Section[];
};

/** A service page (CPT `service`): the same flexible-content `sections` as the homepage. */
export type ServicePage = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  sections: Section[];
};

/** An inner page (case study, about, contact, blog index, post): the same flexible-content `sections`. */
export type ContentPage = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  /** false keeps the page out of search (placeholder posts). */
  index: boolean;
  sections: Section[];
};
