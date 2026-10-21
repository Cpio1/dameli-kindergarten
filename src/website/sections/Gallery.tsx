"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Images } from "lucide-react";
import { useMemo } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { InstagramIcon } from "@/shared/components/BrandIcons";
import { Squiggle, Wave } from "@/shared/components/Decor";
import { LayoutPicture } from "@/shared/components/LayoutPicture";
import { Lightbox } from "@/shared/components/Lightbox";
import { Reveal } from "@/shared/components/Reveal";
import { useGallery } from "@/shared/hooks/useGallery";
import { cn } from "@/shared/utils/cn";
import { cardRatio, initialCount, justifiedRows, visibleRows, type Row } from "@/shared/utils/gallery";
import { DESKTOP_QUERY } from "@/shared/utils/layout";
import { SectionHeading } from "../components/SectionHeading";

/** A row is full at this combined width/height ratio — about 250 px tall on a laptop. */
const ROW_TARGET = 4.2;
const PER_ROW = 5;
/** Collapsed gallery: whole rows until at least this many photos (the first row: 4–5 photos). */
const MIN_VISIBLE = 4;

/** Organic corners by orientation and position: varied, never random. */
function shapeFor(image: SiteImage, index: number) {
  const ratio = image.width / image.height;
  if (ratio < 0.9) return index % 2 === 0 ? "rounded-[4.5rem_4.5rem_1.5rem_1.5rem]" : "rounded-[1.5rem_1.5rem_4.5rem_4.5rem]";
  if (ratio > 1.15) return index % 2 === 0 ? "rounded-[2.25rem_0.75rem_2.25rem_0.75rem]" : "rounded-[0.75rem_2.25rem_0.75rem_2.25rem]";
  return "rounded-[2rem]";
}

/** Compact justified rows: 4–5 photos first, the rest behind "show more", fullscreen viewer. */
export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const { expanded, toggle, active, setActive, close, sectionRef } = useGallery();

  const rows = useMemo(() => justifiedRows(images, ROW_TARGET, PER_ROW), [images]);
  const initial = useMemo(() => initialCount(rows, MIN_VISIBLE), [rows]);
  const shown = expanded ? rows : visibleRows(rows, initial);

  const renderRow = (row: Row) => (
    <m.div
      key={row.items[0].image.src}
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-[clamp(0.75rem,1.2vw,1rem)]"
      // an unfinished last row keeps the shared row height instead of stretching to full width
      style={row.complete ? undefined : { width: `${(row.ratio / ROW_TARGET) * 100}%` }}
    >
      {row.items.map(({ image, index }) => {
        const ratio = cardRatio(image);
        return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={g.open(index + 1)}
            className={cn(
              "group relative block min-w-0 basis-0 overflow-hidden bg-lavender-soft shadow-soft focus-visible:outline-offset-4",
              shapeFor(image, index),
            )}
            style={{ flexGrow: ratio, aspectRatio: ratio }}
          >
            <LayoutPicture media={DESKTOP_QUERY}>
              <Image
                src={image.src}
                alt={g.alt(index + 1)}
                fill
                sizes={`${Math.ceil((ratio / Math.max(row.ratio, ROW_TARGET)) * 80)}vw`}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </LayoutPicture>
          </button>
        );
      })}
    </m.div>
  );

  return (
    <section ref={sectionRef} id="gallery" data-snap className="w-section relative overflow-hidden bg-white">
      <Wave flip className="absolute inset-x-0 top-0 h-[clamp(1.5rem,4vh,2.5rem)] text-milk" />
      <div className="w-container relative">
        <Reveal className="flex items-end justify-between gap-8">
          <SectionHeading eyebrow={g.eyebrow} title={g.title} text={g.text} />
          <Squiggle className="mb-2 w-28 shrink-0 text-lavender" />
        </Reveal>

        {images.length === 0 ? (
          <Reveal className="mt-8">
            <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_0.8rem] bg-milk px-6 py-10 text-center">
              <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-lavender-soft" />
              <div className="absolute -right-6 -bottom-10 h-28 w-28 rounded-[60%_40%_50%_50%] bg-sage-soft" />
              <div className="relative mx-auto max-w-md">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-lavender-deep shadow-soft">
                  <Images className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{g.emptyTitle}</h3>
                <p className="mt-2 text-ink-soft">{g.emptyText}</p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5">
                  <InstagramIcon className="h-5 w-5" />
                  {site.instagram.handle}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-[clamp(1.5rem,4vh,2.25rem)] flex flex-col gap-[clamp(0.75rem,1.2vw,1rem)]">
              <AnimatePresence initial={false}>{shown.map(renderRow)}</AnimatePresence>
            </div>

            {images.length > initial && (
              <div className="mt-[clamp(1.25rem,3vh,1.75rem)] flex justify-center">
                <button type="button" onClick={toggle} aria-expanded={expanded} className="btn btn-ghost">
                  {expanded ? g.less : g.more}
                  {!expanded && <span className="text-ink-soft tabular-nums">+{images.length - initial}</span>}
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox images={images} index={active} onChange={setActive} onClose={close} />
    </section>
  );
}
