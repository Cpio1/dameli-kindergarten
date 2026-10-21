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

/** Desktop shows this many photos before "show more". */
const INITIAL = 5;
/** Mobile shows whole rows until at least this many photos are visible (so 4–5). */
const MOBILE_MIN = 4;
/** Mobile row is complete once its photos' combined width/height ratio reaches this. */
const ROW_TARGET = 1.3;

type Placed = { image: SiteImage; index: number };
type Row = { items: Placed[]; ratio: number; complete: boolean };

const cardRatio = (image: SiteImage) => Math.min(Math.max(image.width / image.height, 0.7), 2);

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

/**
 * Mobile composition: justified rows of one or two photos with a shared height. Every photo keeps
 * its proportions, edges line up, and a portrait can never become a screen-tall card.
 * Like the masonry, rows only depend on earlier photos, so "show more" just appends rows.
 */
function rows(images: SiteImage[]): Row[] {
  const result: Row[] = [];
  let current: Row = { items: [], ratio: 0, complete: false };
  images.forEach((image, index) => {
    current.items.push({ image, index });
    current.ratio += cardRatio(image);
    if (current.ratio >= ROW_TARGET || current.items.length === 2) {
      result.push({ ...current, complete: true });
      current = { items: [], ratio: 0, complete: false };
    }
  });
  if (current.items.length) result.push(current);
  return result;
}

/** Mobile corners: small, mirrored inside a row and alternating between rows. */
function mobileShape(row: number, position: number, single: boolean) {
  if (single) return row % 2 === 0 ? "rounded-[1.75rem_1.75rem_1.75rem_0.6rem]" : "rounded-[1.75rem_0.6rem_1.75rem_1.75rem]";
  const flip = (row + position) % 2 === 0;
  return flip ? "rounded-[1.6rem_0.6rem_1.6rem_1.6rem]" : "rounded-[0.6rem_1.6rem_1.6rem_1.6rem]";
}

/** Shape by orientation and position, so the grid feels varied but never random. */
function shapeFor(image: SiteImage, index: number) {
  const ratio = image.width / image.height;
  if (ratio < 0.9) {
    // soft arches — gentle enough not to cut into faces near the corners
    return index % 2 === 0 ? "rounded-[6rem_6rem_1.75rem_1.75rem]" : "rounded-[1.75rem_1.75rem_6rem_6rem]";
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

  const mobileRows = useMemo(() => rows(images), [images]);
  const mobileInitial = useMemo(() => {
    let count = 0;
    for (const row of mobileRows) {
      if (count >= MOBILE_MIN) break;
      count += row.items.length;
    }
    return count;
  }, [mobileRows]);

  const hasMoreMobile = images.length > mobileInitial;
  const hasMoreDesktop = images.length > INITIAL;
  const masonry = useMemo(
    () => distribute(expanded ? images : images.slice(0, INITIAL), 3),
    [expanded, images],
  );
  const visibleRows = useMemo(() => {
    if (expanded) return mobileRows;
    let count = 0;
    return mobileRows.filter((row) => {
      const show = count < mobileInitial;
      count += row.items.length;
      return show;
    });
  }, [expanded, mobileRows, mobileInitial]);

  const close = useCallback(() => setActive(null), []);

  const toggle = () => {
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) sectionRef.current?.scrollIntoView({ block: "start" });
    }
    setExpanded((v) => !v);
  };

  const renderCard = (
    { image, index }: Placed,
    { shape, sizes, delayFrom, className, style }: {
      shape: string;
      sizes: string;
      delayFrom: number;
      className?: string;
      style: React.CSSProperties;
    },
  ) => (
    <m.button
      key={image.src}
      type="button"
      layout="position"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index >= delayFrom ? (index - delayFrom) * 0.04 : 0 }}
      onClick={() => setActive(index)}
      aria-label={g.open(index + 1)}
      className={cn(
        "group relative block overflow-hidden bg-lavender-soft shadow-soft focus-visible:outline-offset-4",
        shape,
        className,
      )}
      style={style}
    >
      <Image
        src={image.src}
        alt={g.alt(index + 1)}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </m.button>
  );

  const renderColumn = (column: Placed[], col: number) => (
    <div key={col} className={cn("flex min-w-0 flex-1 flex-col gap-5", col === 1 && "pt-12")}>
      <AnimatePresence initial={false}>
        {column.map((placed) =>
          renderCard(placed, {
            shape: shapeFor(placed.image, placed.index),
            sizes: "(min-width: 1216px) 380px, 31vw",
            delayFrom: INITIAL,
            className: "w-full",
            style: { aspectRatio: `${placed.image.width} / ${placed.image.height}` },
          }),
        )}
      </AnimatePresence>
    </div>
  );

  const renderRow = (row: Row, r: number) => (
    <div
      key={row.items[0].image.src}
      className="flex gap-2.5 xs:gap-3"
      // an unfinished last row keeps the shared row height instead of stretching to full width
      style={row.complete ? undefined : { width: `${(row.ratio / ROW_TARGET) * 100}%`, marginInline: "auto" }}
    >
      <AnimatePresence initial={false}>
        {row.items.map((placed, position) => {
          const ratio = cardRatio(placed.image);
          return renderCard(placed, {
            shape: mobileShape(r, position, row.items.length === 1),
            sizes: `${Math.ceil((ratio / Math.max(row.ratio, ROW_TARGET)) * 100)}vw`,
            delayFrom: mobileInitial,
            className: "min-w-0 basis-0",
            style: { flexGrow: ratio, aspectRatio: ratio },
          });
        })}
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
            <h2 className="mt-3 text-[1.75rem] leading-[1.12] font-semibold text-ink sm:text-[2.3rem] lg:text-[2.75rem]">{g.title}</h2>
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
            <div className="mt-8 sm:mt-12">
              <div className="flex flex-col gap-2.5 xs:gap-3 md:hidden">{visibleRows.map(renderRow)}</div>
              <div className="hidden gap-5 md:flex">{masonry.map(renderColumn)}</div>
            </div>

            {(hasMoreMobile || hasMoreDesktop) && (
              <div
                className={cn(
                  "mt-8 flex justify-center sm:mt-10",
                  !hasMoreMobile && "max-md:hidden",
                  !hasMoreDesktop && "md:hidden",
                )}
              >
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
