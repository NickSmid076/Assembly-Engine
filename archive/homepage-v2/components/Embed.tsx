"use client";
import { scrollToTarget } from "./SmoothScroll";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Hosts one of the existing animated artifacts (public/embeds/*.html) in an iframe.
 * The embed reports its height (auto mode) and in-page anchor clicks via postMessage.
 * v1 approach: later these can be ported to native React components.
 */
export type EmbedHandle = { post: (msg: unknown) => void };
type Props = {
  src: string;
  title: string;
  className?: string;
  autoHeight?: boolean;
  minHeight?: number;
  /** height ÷ width estimate, reserved before the embed reports its real height (prevents page jumps) */
  ratio?: number;
  onMessage?: (data: any) => void;
};

const Embed = forwardRef<EmbedHandle, Props>(function Embed({ src, title, className = "", autoHeight = true, minHeight = 240, ratio, onMessage }, ref) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [h, setH] = useState<number | null>(null);
  const [est, setEst] = useState<number | null>(null);
  useEffect(() => {
    if (!ratio || !frame.current) return;
    const el = frame.current;
    const ro = new ResizeObserver(() => setEst(Math.round(el.offsetWidth * ratio)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ratio]);
  useImperativeHandle(ref, () => ({ post: (m) => frame.current?.contentWindow?.postMessage(m, "*") }), []);
  useEffect(() => {
    function on(e: MessageEvent) {
      if (e.source !== frame.current?.contentWindow) return;
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.ae === "h" && autoHeight && d.h > 0) setH(d.h);
      if (d.ae === "nav" && typeof d.href === "string") scrollToTarget(d.href);
      onMessage?.(d);
    }
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, [autoHeight, onMessage]);
  return (
    <iframe
      ref={frame}
      src={src}
      title={title}
      loading="lazy"
      scrolling="no"
      className={`block w-full border-0 bg-transparent ${className}`}
      style={autoHeight ? { height: h ?? est ?? minHeight } : undefined}
    />
  );
});
export default Embed;
