import { z } from "zod";
import { proseSchema } from "../prose/schema";
import { calloutSchema } from "../callout/schema";
import { statSchema } from "../stat/schema";
import { checklistSchema } from "../checklist/schema";
import { beforeAfterSchema } from "../before-after/schema";
import { flowDiagramSchema } from "../flow-diagram/schema";
import { timelineSchema } from "../timeline/schema";
import { comparisonTableSchema } from "../comparison-table/schema";
import { mockUiSchema } from "../mock-ui/schema";
import { diagramSchema } from "../diagram/schema";

/** The blocks an article body can hold, in any order (ACF flexible content on the post). */
export const articleSectionSchema = z.discriminatedUnion("acf_fc_layout", [
  proseSchema, calloutSchema, statSchema, checklistSchema, beforeAfterSchema, flowDiagramSchema, timelineSchema,
  comparisonTableSchema, mockUiSchema, diagramSchema,
]);
export type ArticleSection = z.infer<typeof articleSectionSchema>;

/** A post's body: the sections, plus the table of contents and reading progress around them. */
export const postArticleSchema = z.object({
  acf_fc_layout: z.literal("post_article"),
  sections: z.array(articleSectionSchema).min(1),
  labels: z.object({ toc: z.string(), toc_toggle: z.string(), progress: z.string() }),
});
export type PostArticleBlock = z.infer<typeof postArticleSchema>;
