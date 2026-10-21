"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Images } from "lucide-react";
import { useMemo } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { InstagramIcon } from "@/shared/components/BrandIcons";
import { Wave } from "@/shared/components/Decor";
import { LayoutPicture } from "@/shared/components/LayoutPicture";
import { Lightbox } from "@/shared/components/Lightbox";
import { Reveal } from "@/shared/components/Reveal";
import { useGallery } from "@/shared/hooks/useGallery";
import { cn } from "@/shared/utils/cn";
import { cardRatio, initialCount, justifiedRows, visibleRows, type Row } from "@/shared/utils/gallery";
import { MOBILE_QUERY } from "@/shared/utils/layout";
import { MobileSectionHeading } from "../components/MobileSectionHeading";

/**
 * Two or three photos per row, sharing a row height: compact rows where a portrait never becomes a
 * screen-tall card. The collapsed gallery is two rows (4–5 photos).
 */
const ROW_TARGET = 1.6;
const PER_ROW = 3;
const MIN_VISIBLE = 4;

/** Small corners, mirrored inside a row and alternating between rows. */
function shapeFor(row: number, position: number, single: boolean) {
  if (single) return row % 2 === 0 ? "rounded-[1.5rem_1.5rem_1.5rem_0.5rem]" : "rounded-[1.5rem_0.5rem_1.5rem_1.5rem]";
  return (row + position) % 2 === 0 ? "rounded-[1.35rem_0.5rem_1.35rem_1.35rem]" : "rounded-[0.5rem_1.35rem_1.35rem_1.35rem]";
}

export function MobileGallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const { expanded, toggle, active, setActive, close, sectionRef } = useGallery();

  const rows = useMemo(() => justifiedRows(images, ROW_TARGET, PER_ROW), [images]);
  const initial = useMemo(() => initialCount(rows, MIN_VISIBLE), [rows]);
  const shown = expanded ? rows : visibleRows(rows, initial);

  const renderRow = (row: Row, r: number) => (
    <m.div
      key={row.items[0].image.src}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-2"
      // an unfinished last row keeps the shared row height instead of stretching to full width
      style={row.complete ? undefined : { width: `${(row.ratio / ROW_TARGET) * 100}%`, marginInline: "auto" }}
    >
      {row.items.map(({ image, index }, position) => {
        const ratio = cardRatio(image);
        return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={g.open(index + 1)}
            className={cn("relative block min-w-0 basis-0 overflow-hidden bg-lavender-soft", shapeFor(r, position, row.items.length === 1))}
            style={{ flexGrow: ratio, aspectRatio: ratio }}
          >
            <LayoutPicture media={MOBILE_QUERY}>
              <Image
                src={image.src}
                alt={g.alt(index + 1)}
                fill
                sizes={`(min-width: 40rem) ${Math.ceil((ratio / Math.max(row.ratio, ROW_TARGET)) * 640)}px, ${Math.ceil((ratio / Math.max(row.ratio, ROW_TARGET)) * 100)}vw`}
                className="object-cover"
              />
            </LayoutPicture>
          </button>
        );
      })}
    </m.div>
  );

  return (
    <section ref={sectionRef} id="gallery" className="m-section relative overflow-hidden bg-white">
      <Wave flip className="absolute inset-x-0 top-0 h-5 text-milk" />
      <div className="m-container relative">
        <Reveal>
          <MobileSectionHeading eyebrow={g.eyebrow} title={g.title} text={g.text} />
        </Reveal>

        {images.length === 0 ? (
          <Reveal className="mt-5">
            <div className="relative overflow-hidden rounded-[1.75rem_1.75rem_1.75rem_0.6rem] bg-milk px-5 py-8 text-center">
              <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-lavender-soft" />
              <div className="relative">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-lavender-deep shadow-soft">
                  <Images className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{g.emptyTitle}</h3>
                <p className="mt-1.5 text-[0.92rem] text-ink-soft">{g.emptyText}</p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4">
                  <InstagramIcon className="h-5 w-5" />
                  {site.instagram.handle}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-5 flex flex-col gap-2">
              <AnimatePresence initial={false}>{shown.map(renderRow)}</AnimatePresence>
            </div>

            {images.length > initial && (
              <button type="button" onClick={toggle} aria-expanded={expanded} className="btn btn-ghost mt-5 w-full">
                {expanded ? g.less : g.more}
                {!expanded && <span className="text-ink-soft tabular-nums">+{images.length - initial}</span>}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} aria-hidden="true" />
              </button>
            )}
          </>
        )}
      </div>

      <Lightbox images={images} index={active} onChange={setActive} onClose={close} />
    </section>
  );
}
