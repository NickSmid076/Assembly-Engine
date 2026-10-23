import { z } from "zod";
import { headingParts } from "../shared";
import { storyLabels } from "../services/moments/schema";

const text = z.string().min(1);
const clock = z.string().regex(/^\d\d:\d\d(:\d\d)?$/);

/** One logged step of a run. `at` = seconds into the story; `label` = its name on the rail. */
export const runRow = z.object({
  at: z.number().nonnegative(),
  label: text,
  time: clock,
  tool: text,
  text,
  /** A person's step: the run waits for them, then they approve. */
  person: z.object({ name: text, waiting: text, approve: text, approved: text }).nullable(),
});
export type RunRow = z.infer<typeof runRow>;

/**
 * One example run: what came in, and what the system did with it, step by step.
 * Fictional firm, always labelled as an example.
 */
export const run = z
  .object({
    tab: text,
    duration: z.number().min(6).max(12),
    start: z.object({ label: text, title: text, detail: text, via: text, time: clock }),
    rows: z.array(runRow).min(3).max(6),
    done: text,
  })
  .refine((r) => r.rows.every((x, i) => x.at > (i ? r.rows[i - 1].at : 0) && x.at < r.duration), {
    message: "rows need increasing `at`, after the start and inside the duration",
  });
export type Run = z.infer<typeof run>;

/** "How it runs": a statement and three points beside one example run per start. ACF layout `how_it_runs`. */
export const howItRunsSchema = z.object({
  acf_fc_layout: z.literal("how_it_runs"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: text,
  /** Each point lights up the part of the run it talks about: the tools, the person, or the log times. */
  points: z.array(z.object({ title: text, text, focus: z.enum(["tools", "person", "log"]) })).max(3),
  labels: storyLabels.extend({ tabs: text, log: text }),
  runs: z.array(run).min(1).max(3),
});
export type HowItRunsBlock = z.infer<typeof howItRunsSchema>;
export type RunFocus = HowItRunsBlock["points"][number]["focus"];
