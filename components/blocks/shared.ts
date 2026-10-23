// Field shapes shared by every block, modelled on WordPress REST + ACF Pro (snake_case, ACF return formats).
import { z } from "zod";

/** ACF link field. `url` is localised ("/nl/contact"), an in-page anchor ("#services") or absolute. */
export const link = z.object({ title: z.string().min(1), url: z.string().min(1), target: z.enum(["", "_blank"]) });
export type WPLink = z.infer<typeof link>;

/** ACF image field (return format: array). */
export const image = z.object({ url: z.string().min(1), alt: z.string(), width: z.number().int().positive(), height: z.number().int().positive() });
export type WPImage = z.infer<typeof image>;

/** A heading as parts, so accent words survive as data instead of markup. */
export const headingParts = z.array(z.object({ text: z.string().min(1), accent: z.boolean() })).min(1);
export type HeadingPart = z.infer<typeof headingParts>[number];
