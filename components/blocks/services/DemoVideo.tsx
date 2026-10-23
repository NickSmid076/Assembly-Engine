"use client";
// The demo video, poster first. Nothing downloads until the video is near the viewport. It autoplays
// (muted) only on wide screens with motion allowed; elsewhere it waits for the play button.
// Plays only while on screen; a visitor's pause is never overridden.
import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string; width: number; height: number; label: string; play: string; pause: string };

export default function DemoVideo({ src, poster, width, height, label, play, pause }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false); // attach the video source
  const [near, setNear] = useState(false); // show the poster (deferred so it never competes with the first paint)
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const auto = useRef(false);

  useEffect(() => {
    auto.current = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const el = box.current!;
    const nearIO = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setNear(true);
      if (auto.current) setLoad(true);
      nearIO.disconnect();
    }, { rootMargin: "600px 0px" });
    const seen = new IntersectionObserver(([e]) => {
      const v = video.current;
      if (!v) return;
      if (e.isIntersecting && auto.current && !userPaused.current) v.play().catch(() => {});
      else if (!e.isIntersecting) v.pause();
    }, { threshold: 0.35 });
    nearIO.observe(el);
    seen.observe(el);
    return () => { nearIO.disconnect(); seen.disconnect(); };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!load) setLoad(true);
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); } else { userPaused.current = true; v.pause(); }
  };

  // Start playback after a click on the poster when the source has just been attached.
  useEffect(() => {
    const v = video.current;
    if (load && v && !auto.current && !userPaused.current) v.play().catch(() => {});
  }, [load]);

  return (
    <div ref={box} className="relative overflow-hidden rounded-xl bg-ink-2" style={{ aspectRatio: `${width} / ${height}` }}>
      <video ref={video} className="absolute inset-0 h-full w-full" poster={near || load ? poster : undefined} src={load ? src : undefined}
        muted loop playsInline preload="none" width={width} height={height} aria-label={label}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" onClick={toggle} aria-label={playing ? pause : play}
        className="focus-ring absolute bottom-4 right-4 inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 font-display text-[14px] font-bold text-ink transition-[background-color,transform] duration-150 hover:bg-ice active:scale-[.97]">
        {playing
          ? <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          : <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>}
        {playing ? pause : play}
      </button>
    </div>
  );
}
