"use client";

import { m } from "motion/react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { WhatsAppIcon } from "@/shared/components/BrandIcons";
import { Petal, Sparkle, Wave } from "@/shared/components/Decor";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { PreloadedImage } from "@/shared/components/PreloadedImage";
import { cn } from "@/shared/utils/cn";
import { MOBILE_QUERY } from "@/shared/utils/layout";
import { photoRatio } from "@/shared/utils/photo";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

/**
 * Phone hero, top to bottom: small title, short description, WhatsApp button, then the photo in
 * its own leaf-shaped frame. The frame keeps the photo's proportions, so no faces are cut off.
 */
export function MobileHero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  // Portraits are capped at 4:5 so the photo never becomes a screen-tall block.
  const ratio = photoRatio(image, 0.8, 1.6, 1.25);

  return (
    <section id="home" className="relative overflow-hidden pt-[calc(3.5rem+env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute top-10 -right-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgb(167_139_203/0.22),transparent_68%)]" />
      <div className="pointer-events-none absolute top-1/2 -left-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.28),transparent_70%)]" />

      <div className="m-container relative pt-3 pb-12">
        <m.p className="eyebrow rounded-full bg-white/80 px-2.5 py-1 !text-[0.78rem] shadow-soft" {...fadeUp(0)}>
          <Sparkle className="h-3 w-3 text-lavender" />
          {h.eyebrow}
        </m.p>

        <m.h1 key={h.title} className="m-h1 mt-3 font-semibold text-ink" {...fadeUp(0.05)}>
          {h.title} <span className="font-serif font-medium text-lavender-deep italic">{h.titleAccent}</span>
        </m.h1>

        <m.p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft" {...fadeUp(0.1)}>
          {h.short}
        </m.p>

        <m.div className="mt-5" {...fadeUp(0.16)}>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full sm:w-auto">
            <WhatsAppIcon className="h-5 w-5" />
            {h.primary}
            <span className="sr-only">({t.a11y.newTab})</span>
          </a>
        </m.div>

        <m.div
          className="relative mx-auto mt-7 max-w-[30rem]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease }}
        >
          {/* decor kept small and off the children */}
          <div className="absolute -right-1.5 bottom-[12%] h-10 w-10 rounded-full bg-lavender-soft" />
          <Sparkle className="absolute -top-2 right-[8%] z-10 h-4 w-4 animate-twinkle text-lavender" />
          <Petal className="absolute -bottom-3 left-[10%] z-10 w-5.5 rotate-[24deg] text-sage" />

          <div className="relative overflow-hidden mask-m-hero" style={{ aspectRatio: ratio }}>
            {image ? (
              <PreloadedImage
                image={image}
                alt={h.photoAlt}
                media={MOBILE_QUERY}
                sizes="(min-width: 40rem) 30rem, 100vw"
                className={cn("object-cover", ratio > 1.15 ? "object-center" : "object-[50%_35%]")}
              />
            ) : (
              <PhotoPlaceholder label={h.placeholder} />
            )}
          </div>

          {/* the badge floats over the top edge, so the children's feet stay visible */}
          <div className="absolute -top-3.5 left-[6%] z-10 flex items-center gap-2 rounded-[1rem_1rem_1rem_0.3rem] bg-white py-1.5 pr-3 pl-1.5 shadow-lift">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-soft font-display text-[0.68rem] font-bold text-ink">
              {site.ages.from}–{site.ages.to}
            </span>
            <span className="text-[0.75rem] leading-tight font-semibold text-ink">{h.badge}</span>
          </div>
        </m.div>
      </div>

      <Wave className="absolute right-0 bottom-0 left-0 h-7 text-white" />
    </section>
  );
}
