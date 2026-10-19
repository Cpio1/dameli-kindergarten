"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";

type Props = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_DISTANCE = 50;
const noopSubscribe = () => () => {};

export function Lightbox({ images, index, onChange, onClose }: Props) {
  const { t } = useLanguage();
  const g = t.gallery;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState(0);
  const open = index !== null;
  // Portals need document.body, which only exists after hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const total = images.length;

  const go = useCallback(
    (step: number) => {
      if (index === null || total < 2) return;
      setDirection(step);
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  // Keyboard: Escape closes, arrows switch, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Lock page scroll and move focus into the dialog while open; restore both afterwards.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prevOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;
  const image = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {image && index !== null && (
        <m.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={g.dialog}
          className="fixed inset-0 z-[100] flex flex-col bg-[#241f2e]/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            else if (dy > SWIPE_DISTANCE * 2 && Math.abs(dy) > Math.abs(dx)) onClose();
          }}
        >
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 text-milk sm:px-6">
            <p className="text-sm font-bold tabular-nums" aria-live="polite">
              {g.counter(index + 1, total)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={g.close}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
                key={image.src}
                custom={direction}
                className="pointer-events-none absolute inset-3 sm:inset-x-20 sm:inset-y-4"
                initial={{ opacity: 0, x: direction * 60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image.src}
                  alt={g.alt(index + 1)}
                  fill
                  sizes="100vw"
                  quality={85}
                  className="rounded-2xl object-contain"
                  priority
                />
              </m.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={g.prev}
                  className="absolute top-1/2 left-3 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-transform hover:scale-105 sm:grid"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={g.next}
                  className="absolute top-1/2 right-3 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-transform hover:scale-105 sm:grid"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {/* mobile controls sit under the photo, within thumb reach */}
          {total > 1 && (
            <div className="flex justify-center gap-4 px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={g.prev}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={g.next}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* neighbours are fetched ahead so switching is instant */}
          {total > 1 && (
            <div className="hidden" aria-hidden="true">
              {[images[(index + 1) % total], images[(index - 1 + total) % total]].map((img) => (
                <Image key={img.src} src={img.src} alt="" width={img.width} height={img.height} sizes="100vw" quality={85} loading="eager" />
              ))}
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
