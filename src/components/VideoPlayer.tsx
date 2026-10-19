"use client";

import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { SiteVideo } from "@/lib/images";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mql = window.matchMedia(REDUCED);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

type Props = {
  video: SiteVideo;
  label: string;
  labels: { play: string; pause: string; mute: string; unmute: string };
};

/**
 * Muted inline looping video that fills its (masked) frame.
 * - The file is not requested until the player is near the viewport (`preload="none"` until then),
 *   so the page never waits for it.
 * - Autoplays only while visible and only without prefers-reduced-motion; otherwise the user starts it.
 */
export function VideoPlayer({ video, label, labels }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
          el.pause();
        } else if (!userPaused.current && !reduceMotion) {
          el.play().catch(() => setPlaying(false));
        }
      },
      { rootMargin: "300px 0px", threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <div className="relative h-full w-full bg-lavender-soft">
      {video.poster && !playing && (
        <Image
          src={video.poster.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
      )}
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={near ? video.src : undefined}
        poster={video.poster?.src}
        muted={muted}
        loop
        playsInline
        preload={near ? "metadata" : "none"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-4.5 w-4.5" aria-hidden="true" /> : <Play className="h-4.5 w-4.5 translate-x-px" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? labels.unmute : labels.mute}
          aria-pressed={!muted}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-transform hover:scale-105"
        >
          {muted ? <VolumeX className="h-4.5 w-4.5" aria-hidden="true" /> : <Volume2 className="h-4.5 w-4.5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
