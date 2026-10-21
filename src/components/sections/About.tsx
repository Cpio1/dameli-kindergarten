"use client";

import Image from "next/image";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { Reveal } from "../Reveal";
import { VideoPlayer } from "../VideoPlayer";
import { Petal, Sparkle, Squiggle } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = { image: SiteImage | null; video: SiteVideo | null };

export function About({ image, video }: Props) {
  const { t } = useLanguage();
  const a = t.about;
  const pointColors = ["bg-lavender-soft", "bg-sage-soft", "bg-lilac-mist"];
  // A photo keeps its own proportions (portraits are not squashed into a landscape box);
  // a video or placeholder uses the classic frame.
  const ratio = image && !video ? Math.min(Math.max(image.width / image.height, 0.72), 1.3) : null;

  const heading = (
    <>
      <p className="eyebrow">
        <Sparkle className="h-3.5 w-3.5 text-lavender" />
        {a.eyebrow}
      </p>
      <h2 className="mt-3 text-[1.75rem] leading-[1.12] font-semibold text-ink sm:text-[2.3rem] lg:text-[2.75rem]">{a.title}</h2>
    </>
  );

  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* mobile/tablet: heading comes first */}
        <Reveal className="lg:hidden">{heading}</Reveal>

        <Reveal
          className={cn(
            "relative mx-auto w-full",
            ratio && ratio < 1 ? "max-w-[18.5rem] xs:max-w-[20.5rem] sm:max-w-[24rem] lg:max-w-[26rem]" : "max-w-[32rem] lg:max-w-none",
          )}
          y={36}
        >
          <div className="absolute -top-5 -left-5 hidden h-[86%] w-[86%] rounded-[3rem] bg-sage-soft lg:block" />
          <Petal className="absolute -right-5 -bottom-6 hidden w-14 rotate-[18deg] animate-float text-lavender lg:block" />
          <Squiggle className="absolute -top-8 right-6 hidden w-28 text-sage-deep/60 lg:block" />
          <div className="absolute -top-3 -right-3 h-14 w-14 rounded-full bg-lavender-soft lg:hidden" />
          <Petal className="absolute -bottom-3 -left-3 z-10 w-7 -rotate-[20deg] text-sage lg:hidden" />

          <div
            className={cn(
              "relative overflow-hidden mask-wave-top lg:mask-wave-side",
              ratio ? "aspect-[var(--ratio)]" : "aspect-[4/3.4] lg:aspect-[4/4.6]",
            )}
            style={ratio ? ({ "--ratio": ratio } as React.CSSProperties) : undefined}
          >
            {video ? (
              <VideoPlayer video={video} label={a.videoLabel} labels={t.video} />
            ) : image ? (
              <Image
                src={image.src}
                alt={a.photoAlt}
                fill
                sizes="(min-width: 1024px) 416px, (min-width: 640px) 24rem, 82vw"
                className="object-cover object-[50%_35%]"
              />
            ) : (
              <PhotoPlaceholder label={a.placeholder} />
            )}
          </div>
        </Reveal>

        <div>
          <Reveal className="hidden lg:block">{heading}</Reveal>
          <Reveal delay={0.08} className="space-y-4 text-[1.02rem] leading-relaxed text-ink-soft lg:mt-7 lg:text-[1.07rem]">
            {a.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4">
              {a.points.map((point, i) => (
                <li
                  key={point.label}
                  className={`${pointColors[i]} flex flex-col items-start rounded-[1.6rem_1.6rem_1.6rem_0.5rem] px-3.5 py-4 sm:px-5 sm:py-5`}
                >
                  <span className="font-display text-3xl leading-none font-semibold text-ink sm:text-4xl">{point.value}</span>
                  <span className="mt-1.5 text-[0.82rem] leading-snug font-semibold text-ink-soft sm:text-[0.95rem]">
                    {point.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
