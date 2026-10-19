"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Images } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { InstagramIcon } from "../BrandIcons";
import { Reveal } from "../Reveal";
import { Sparkle, Squiggle } from "../decor/Decor";
import { Lightbox } from "./Lightbox";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

const INITIAL = 5;

type Placed = { image: SiteImage; index: number };

/**
 * Greedy masonry: each photo goes to the currently shortest column. Because the choice only
 * depends on earlier photos, opening "show more" appends below without moving visible ones.
 */
function distribute(images: SiteImage[], columns: number): Placed[][] {
  const cols: Placed[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);
  images.forEach((image, index) => {
    const target = heights.indexOf(Math.min(...heights));
    cols[target].push({ image, index });
    heights[target] += image.height / image.width;
  });
  return cols;
}

/** Shape by orientation and position, so the grid feels varied but never random. */
function shapeFor(image: SiteImage, index: number) {
  const ratio = image.width / image.height;
  if (ratio < 0.9) {
    return index % 2 === 0 ? "rounded-[999px_999px_1.75rem_1.75rem]" : "rounded-[1.75rem_1.75rem_999px_999px]";
  }
  if (ratio > 1.15) return index % 2 === 0 ? "rounded-[2.75rem_0.9rem_2.75rem_0.9rem]" : "rounded-[0.9rem_2.75rem_0.9rem_2.75rem]";
  return "rounded-[2.25rem]";
}

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const hasMore = images.length > INITIAL;
  const visible = useMemo(() => (expanded ? images : images.slice(0, INITIAL)), [expanded, images]);
  const layouts = useMemo(
    () => ({ two: distribute(visible, 2), three: distribute(visible, 3) }),
    [visible],
  );

  const close = useCallback(() => setActive(null), []);

  const toggle = () => {
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) sectionRef.current?.scrollIntoView({ block: "start" });
    }
    setExpanded((v) => !v);
  };

  const renderColumn = (column: Placed[], col: number) => (
    <div key={col} className={cn("flex min-w-0 flex-1 flex-col gap-3 sm:gap-5", col === 1 && "pt-8 sm:pt-12")}>
      <AnimatePresence initial={false}>
        {column.map(({ image, index }) => (
          <m.button
            key={image.src}
            type="button"
            layout="position"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index >= INITIAL ? (index - INITIAL) * 0.04 : 0 }}
            onClick={() => setActive(index)}
            aria-label={g.open(index + 1)}
            className={cn(
              "group relative block w-full overflow-hidden bg-lavender-soft shadow-soft focus-visible:outline-offset-4",
              shapeFor(image, index),
            )}
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Image
              src={image.src}
              alt={g.alt(index + 1)}
              fill
              sizes="(min-width: 1216px) 380px, (min-width: 768px) 31vw, 48vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </m.button>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">
              <Sparkle className="h-3.5 w-3.5 text-lavender" />
              {g.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.9rem] leading-[1.12] font-semibold text-ink sm:text-[2.6rem] lg:text-5xl">{g.title}</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{g.text}</p>
          </div>
          <Squiggle className="hidden w-36 shrink-0 text-lavender sm:block" />
        </Reveal>

        {images.length === 0 ? (
          <Reveal className="mt-10">
            <div className="relative overflow-hidden rounded-[3rem_3rem_3rem_1rem] bg-milk px-6 py-12 text-center sm:py-16">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-lavender-soft" />
              <div className="absolute -right-8 -bottom-12 h-36 w-36 rounded-[60%_40%_50%_50%] bg-sage-soft" />
              <div className="relative mx-auto max-w-md">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-lavender-deep shadow-soft">
                  <Images className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink sm:text-2xl">{g.emptyTitle}</h3>
                <p className="mt-3 text-ink-soft">{g.emptyText}</p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
                  <InstagramIcon className="h-5 w-5" />
                  {site.instagram.handle}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-10 sm:mt-12">
              <div className="flex gap-3 sm:gap-5 md:hidden">{layouts.two.map(renderColumn)}</div>
              <div className="hidden gap-5 md:flex">{layouts.three.map(renderColumn)}</div>
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button type="button" onClick={toggle} aria-expanded={expanded} className="btn btn-ghost">
                  {expanded ? g.less : g.more}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
                    aria-hidden="true"
                  />
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
