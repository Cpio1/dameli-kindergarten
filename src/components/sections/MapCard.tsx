"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, twoGisUrl, twoGisWidgetUrl } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * 2GIS map block. With a confirmed 2GIS card (site.twoGis) it lazily embeds the official widget;
 * until then it shows a light illustrated preview that opens the address search in 2GIS —
 * no invented coordinates and no third-party script on page load.
 */
export function MapCard() {
  const { t, lang } = useLanguage();
  const c = t.contacts;
  const widget = twoGisWidgetUrl();
  const frameRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !widget) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setLoad(true);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [widget]);

  return (
    <div className="relative h-full rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-white p-3 shadow-lift sm:p-4">
      <div ref={frameRef} className="relative h-[300px] overflow-hidden rounded-[2rem] bg-sage-soft sm:h-[380px] lg:h-full lg:min-h-[440px]">
        {widget ? (
          <>
            {load && (
              <iframe
                title={c.mapFrame}
                src={widget}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                allow="geolocation"
              />
            )}
            {!active && (
              // touch screens: the map ignores gestures until tapped, so swiping over it scrolls the page
              <button
                type="button"
                onClick={() => setActive(true)}
                className="absolute inset-0 hidden items-end justify-center pb-4 pointer-coarse:flex"
              >
                <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-ink shadow-soft">{c.mapActivate}</span>
              </button>
            )}
          </>
        ) : (
          <a
            href={twoGisUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute inset-0 block"
          >
            <span className="sr-only">
              {c.mapOpen} ({t.a11y.newTab})
            </span>
            {/* abstract map illustration — decorative, not a real location */}
            <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <rect width="400" height="400" fill="#E4EDE1" />
              <path d="M-20 120C80 90 160 160 260 130S380 60 440 80" stroke="#FFFFFF" strokeWidth="26" fill="none" />
              <path d="M-20 300C60 270 140 330 240 290S360 230 440 250" stroke="#FFFFFF" strokeWidth="18" fill="none" />
              <path d="M120 -20C110 80 150 200 120 420" stroke="#FFFFFF" strokeWidth="16" fill="none" />
              <path d="M300 -20C320 100 280 220 310 420" stroke="#FFFFFF" strokeWidth="12" fill="none" />
              <rect x="150" y="160" width="110" height="80" rx="22" fill="#E8DDF4" />
              <rect x="20" y="170" width="80" height="90" rx="24" fill="#B8D1B2" opacity="0.7" />
              <rect x="330" y="140" width="80" height="100" rx="24" fill="#E8DDF4" />
              <rect x="170" y="10" width="100" height="90" rx="26" fill="#B8D1B2" opacity="0.6" />
              <rect x="150" y="320" width="120" height="70" rx="24" fill="#E8DDF4" />
              <circle cx="60" cy="60" r="26" fill="#B8D1B2" />
            </svg>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] transition-transform duration-500 group-hover:-translate-y-[100%]">
              <span className="relative grid h-16 w-16 place-items-center rounded-[50%_50%_50%_0] bg-lavender shadow-lavender [transform:rotate(-45deg)]">
                <span className="[transform:rotate(45deg)]">
                  <MapPin className="h-7 w-7 text-ink" aria-hidden="true" />
                </span>
              </span>
            </span>
            <span className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-[1.5rem] bg-white/95 p-4 shadow-soft sm:inset-x-4 sm:bottom-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="min-w-0">
                <span className="block font-display text-base font-semibold text-ink">{c.mapTitle}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{site.address[lang]}</span>
              </span>
              <span className="btn btn-dark shrink-0 !min-h-11 !py-2 text-sm">
                {c.mapOpen}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
