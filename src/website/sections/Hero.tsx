"use client";

import { m } from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { WhatsAppIcon } from "@/shared/components/BrandIcons";
import { Blob, Orbit, Petal, Sparkle, Wave } from "@/shared/components/Decor";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { PreloadedImage } from "@/shared/components/PreloadedImage";
import { cn } from "@/shared/utils/cn";
import { DESKTOP_QUERY } from "@/shared/utils/layout";
import { photoRatio } from "@/shared/utils/photo";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
});

/**
 * Laptop hero: text on the left, the photo on the right. The photo frame is sized by the screen
 * height (see .w-hero-photo), so title, buttons and photo fit under the header on 1366×768.
 */
export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  // The frame follows the photo's own proportions (within reason) so faces are not cropped away.
  const ratio = photoRatio(image, 0.78, 1.6, 0.9);
  // Group photos are wide: a soft pebble frame; portraits get a tall organic oval.
  const wide = ratio > 1.15;

  return (
    <section id="home" data-snap className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(167_139_203/0.22),transparent_68%)]" />
      <div className="pointer-events-none absolute top-24 -left-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.26),transparent_70%)]" />

      <div className="w-container relative flex items-center justify-between gap-[clamp(2rem,4vw,3.5rem)] pt-[clamp(1.25rem,4vh,2.75rem)] pb-[clamp(3.5rem,9vh,5.5rem)]">
        <div className="relative z-10 max-w-[33rem] min-w-0 flex-1">
          <m.p className="eyebrow mb-4 rounded-full bg-white/80 px-3 py-1 shadow-soft" {...fadeUp(0)}>
            <Sparkle className="h-3.5 w-3.5 text-lavender" />
            {h.eyebrow}
          </m.p>

          <m.h1 key={h.title} className="w-h1 font-semibold text-ink" {...fadeUp(0.05)}>
            {h.title} <span className="font-serif font-medium text-lavender-deep italic">{h.titleAccent}</span>
          </m.h1>

          <m.p className="w-lead mt-4 max-w-[30rem] text-ink-soft" {...fadeUp(0.12)}>
            {h.text}
          </m.p>

          <m.div className="mt-[clamp(1.25rem,3.5vh,2rem)] flex flex-wrap gap-3" {...fadeUp(0.2)}>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="h-4.5 w-4.5" />
              {h.primary}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            <a href="#about" className="btn btn-ghost">
              {h.secondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </m.div>
        </div>

        <m.div
          className="w-hero-photo relative shrink-0"
          style={{ "--ratio": ratio } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
        >
          {wide ? (
            <>
              <Blob className="absolute -top-7 -right-6 w-[34%] text-lavender-soft" />
              <Blob className="absolute -bottom-6 -left-6 w-[22%] rotate-90 text-sage-soft" />
              <Orbit className="absolute -top-10 -right-9 aspect-square w-[32%] animate-spin-slow text-lavender/55" />
            </>
          ) : (
            <>
              <Blob className="absolute -top-5 -right-6 w-[60%] text-lavender-soft" />
              <Orbit className="absolute -inset-4 animate-spin-slow text-lavender/55" />
            </>
          )}
          <Petal className="absolute -bottom-4 -left-5 z-10 w-10 -rotate-[28deg] animate-float-slow text-sage" />
          <Sparkle className="absolute top-[7%] -left-3 z-10 h-6 w-6 animate-twinkle text-lavender" />
          <Sparkle className="absolute right-[5%] -bottom-2 z-10 h-4 w-4 animate-twinkle text-lavender [animation-delay:1.2s]" />

          <div className={cn("relative h-full w-full overflow-hidden", wide ? "mask-hero-wide" : "mask-hero")}>
            {image ? (
              <PreloadedImage
                image={image}
                alt={h.photoAlt}
                media={DESKTOP_QUERY}
                sizes="(min-width: 1600px) 680px, (min-width: 1280px) 600px, 48vw"
                className={cn("object-cover", wide ? "object-center" : "object-[50%_35%]")}
              />
            ) : (
              <PhotoPlaceholder label={h.placeholder} />
            )}
          </div>

          <div
            className={cn(
              "absolute z-10 flex items-center gap-2.5 rounded-[1.2rem_1.2rem_1.2rem_0.35rem] bg-white py-2 pr-3.5 pl-2 shadow-lift",
              // a wide group photo keeps the children's feet visible: the badge floats over the top edge
              wide ? "-top-4 left-[9%]" : "-bottom-4 left-[8%]",
            )}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-soft font-display text-[0.8rem] font-bold text-ink">
              {site.ages.from}–{site.ages.to}
            </span>
            <span className="text-[0.82rem] leading-tight font-semibold text-ink">{h.badge}</span>
          </div>
        </m.div>
      </div>

      <Wave className="absolute right-0 bottom-0 left-0 h-[clamp(2.25rem,6vh,3.5rem)] text-white" />
    </section>
  );
}
