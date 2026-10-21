"use client";

import { ExternalLink } from "lucide-react";
import { site, twoGisUrl } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MapArt, MapMarker } from "@/shared/components/MapArt";
import { useTwoGisWidget } from "@/shared/hooks/useTwoGisWidget";

/** Map of limited height under the contacts; the widget ignores swipes until tapped. */
export function MobileMapCard() {
  const { t, lang } = useLanguage();
  const c = t.contacts;
  const { widget, frameRef, load, active, activate } = useTwoGisWidget();

  return (
    <div className="rounded-[1.75rem_1.75rem_1.75rem_0.7rem] bg-white p-2 shadow-soft">
      <div ref={frameRef} className="relative h-[clamp(11rem,52vw,15rem)] overflow-hidden rounded-[1.4rem]">
        {widget ? (
          <>
            {load && (
              <iframe title={c.mapFrame} src={widget} loading="lazy" className="absolute inset-0 h-full w-full border-0" allow="geolocation" />
            )}
            {!active && (
              <button type="button" onClick={activate} className="absolute inset-0 flex items-end justify-center pb-3">
                <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8rem] font-bold text-ink shadow-soft">{c.mapActivate}</span>
              </button>
            )}
          </>
        ) : (
          <a href={twoGisUrl(lang)} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block" aria-label={`${c.mapOpen} (${t.a11y.newTab})`}>
            <MapArt />
            <span className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-full">
              <MapMarker className="h-11 w-11" />
            </span>
          </a>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-2 pt-2.5 pb-1">
        <span className="min-w-0">
          <span className="block font-display text-[0.92rem] font-semibold text-ink">{c.mapTitle}</span>
          <span className="block text-[0.8rem] leading-snug text-ink-soft">{site.address[lang]}</span>
        </span>
        <a href={twoGisUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-dark shrink-0 !min-h-10 !px-3.5 !py-2 !text-[0.85rem]">
          2GIS
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">({t.a11y.newTab})</span>
        </a>
      </div>
    </div>
  );
}
