"use client";

import Image from "next/image";
import { m } from "motion/react";
import { ArrowDown } from "lucide-react";
import { WhatsAppIcon } from "../BrandIcons";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { Blob, Orbit, Petal, Sparkle, Wave } from "../decor/Decor";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  // Desktop frame follows the photo's own proportions (within reason) so faces are not cropped away.
  const ratio = image ? Math.min(Math.max(image.width / image.height, 0.78), 1.12) : 0.9;

  return (
    <section id="home" className="relative overflow-hidden pt-[4.25rem] lg:pt-20">
      {/* soft background glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(167_139_203/0.24),transparent_68%)] lg:block" />
      <div className="pointer-events-none absolute top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.28),transparent_70%)]" />

      <div className="container-page relative grid items-center gap-10 pt-8 pb-20 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-14 lg:pb-32">
        <div className="relative z-10 max-w-xl">
          <m.p
            className="eyebrow mb-5 rounded-full bg-white/80 px-3.5 py-1.5 shadow-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Sparkle className="h-3.5 w-3.5 text-lavender" />
            {h.eyebrow}
          </m.p>

          <m.h1
            key={h.title}
            className="text-[2.15rem] leading-[1.08] font-semibold text-ink xs:text-[2.5rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            {h.title}{" "}
            <span className="relative inline font-serif font-medium text-lavender-deep italic">
              {h.titleAccent}
            </span>
          </m.h1>

          <m.p
            className="mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink-soft sm:mt-6 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            {h.text}
          </m.p>

          <m.div
            className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="h-5 w-5" />
              {h.primary}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            <a href="#about" className="btn btn-ghost hidden sm:inline-flex">
              {h.secondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </m.div>
        </div>

        {/* Photo — mobile: wide arch with a wavy bottom; desktop: tall organic oval */}
        <m.div
          className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          {/* desktop decor */}
          <Blob className="absolute -top-8 -right-10 hidden w-[72%] text-lavender-soft lg:block" />
          <Orbit className="absolute -inset-6 hidden animate-spin-slow text-lavender/60 lg:block" />
          <Petal className="absolute -bottom-6 -left-8 hidden w-16 -rotate-[28deg] animate-float-slow text-sage lg:block" />
          <Sparkle className="absolute top-[6%] -left-4 hidden h-9 w-9 animate-twinkle text-lavender lg:block" />
          <Sparkle className="absolute right-[4%] -bottom-2 hidden h-5 w-5 animate-twinkle text-lavender [animation-delay:1.2s] lg:block" />

          {/* mobile decor */}
          <div className="absolute -top-4 right-[8%] h-24 w-24 rounded-full bg-lavender-soft lg:hidden" />
          <Sparkle className="absolute -top-2 left-[6%] z-10 h-7 w-7 animate-twinkle text-lavender lg:hidden" />
          <Petal className="absolute -right-1 bottom-[18%] z-10 w-9 rotate-[24deg] text-sage lg:hidden" />

          <div
            className="relative aspect-[5/4] overflow-hidden mask-hero-mobile lg:aspect-[var(--ratio)] lg:mask-hero"
            style={{ "--ratio": ratio } as React.CSSProperties}
          >
            {image ? (
              <Image
                src={image.src}
                alt={h.photoAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 640px) 34rem, 100vw"
                className="object-cover object-[50%_35%]"
              />
            ) : (
              <PhotoPlaceholder label={h.placeholder} />
            )}
          </div>

          <div className="absolute -bottom-5 left-[8%] z-10 hidden items-center gap-3 rounded-[1.4rem_1.4rem_1.4rem_0.4rem] bg-white px-4 py-3 shadow-lift sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-soft font-display text-sm font-bold text-ink">
              {site.ages.from}–{site.ages.to}
            </span>
            <span className="text-sm leading-tight font-semibold text-ink">{h.badge}</span>
          </div>
        </m.div>
      </div>

      <Wave className="absolute right-0 bottom-0 left-0 h-12 text-white sm:h-16 lg:h-24" />
    </section>
  );
}
