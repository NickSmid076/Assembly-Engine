"use client";
// Reduced-motion preference that is safe to use while rendering. Framer's useReducedMotion() is null on
// the server and true/false on the client, so branching on it in render causes hydration mismatches for
// reduced-motion visitors. This hook reports `false` during hydration (matching the server HTML) and the
// real preference right after, and follows changes to the setting.
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, () => matchMedia(QUERY).matches, () => false);
}
