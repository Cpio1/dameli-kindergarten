"use client";

import { ExternalLink } from "lucide-react";
import { site, twoGisUrl } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MapArt, MapMarker } from "@/shared/components/MapArt";
import { useTwoGisWidget } from "@/shared/hooks/useTwoGisWidget";

/**
 * 2GIS map for the right-hand column of Contacts. With a confirmed 2GIS card (site.twoGis) it
 * lazily embeds the official widget; until then a light illustration opens the address in 2GIS.
 */
export function MapCard() {
  const { t, lang } = useLanguage();
  const c = t.contacts;
  const { widget, frameRef, load } = useTwoGisWidget();

  return (
    <div className="relative h-full rounded-[2.25rem_2.25rem_2.25rem_0.9rem] bg-white p-3 shadow-lift">
      <div ref={frameRef} className="relative h-full min-h-[clamp(16rem,46vh,22rem)] overflow-hidden rounded-[1.75rem]">
        {widget ? (
          load && (
            <iframe title={c.mapFrame} src={widget} loading="lazy" className="absolute inset-0 h-full w-full border-0" allow="geolocation" />
          )
        ) : (
          <a href={twoGisUrl(lang)} target="_blank" rel="noopener noreferrer" className="group absolute inset-0 block">
            <span className="sr-only">
              {c.mapOpen} ({t.a11y.newTab})
            </span>
            <MapArt />
            <span className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-full transition-transform duration-500 group-hover:-translate-y-[115%]">
              <MapMarker className="h-14 w-14" />
            </span>
            <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-[1.25rem] bg-white/95 p-3.5 pl-4 shadow-soft">
              <span className="min-w-0">
                <span className="block font-display text-[0.95rem] font-semibold text-ink">{c.mapTitle}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{site.address[lang]}</span>
              </span>
              <span className="btn btn-dark shrink-0 !min-h-10 !py-2 !text-sm">
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
