import { en } from "./en";
import { nl } from "./nl";
import type { Locale } from "./config";
export type { Dict, Service, ServiceSlug } from "./en";
export const getDict = (l: Locale) => (l === "en" ? en : nl);
