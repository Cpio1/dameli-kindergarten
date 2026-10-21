"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { Petal, Squiggle } from "@/shared/components/Decor";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { Reveal } from "@/shared/components/Reveal";
import { LayoutPicture } from "@/shared/components/LayoutPicture";
import { VideoPlayer } from "@/shared/components/VideoPlayer";
import { DESKTOP_QUERY } from "@/shared/utils/layout";
import { photoRatio } from "@/shared/utils/photo";
import { SectionHeading } from "../components/SectionHeading";

type Props = { image: SiteImage | null; video: SiteVideo | null };

const pointShapes = [
  "bg-lavender-soft rounded-[1.4rem_1.4rem_1.4rem_0.45rem]",
  "bg-sage-soft rounded-[0.45rem_1.4rem_1.4rem_1.4rem]",
  "bg-lilac-mist rounded-[1.4rem_0.45rem_1.4rem_1.4rem]",
];

/** Horizontal composition: photo (or video) on the left, story and key numbers on the right. */
export function About({ image, video }: Props) {
  const { t } = useLanguage();
  const a = t.about;
  // A photo keeps its own proportions; a video or placeholder uses a classic portrait frame.
  const ratio = image && !video ? photoRatio(image, 0.72, 1.3, 0.87) : 0.87;

  return (
    <section id="about" data-snap className="w-section relative overflow-hidden bg-white">
      <div className="w-container flex items-center gap-[clamp(2.5rem,5vw,4.5rem)]">
        <Reveal className="shrink-0" y={28}>
          <div className="w-about-photo relative" style={{ "--ratio": ratio } as React.CSSProperties}>
            <div className="absolute -top-3.5 -left-3.5 h-[88%] w-[88%] rounded-[2.5rem] bg-sage-soft" />
            <Petal className="absolute -right-3.5 -bottom-4 z-10 w-10 rotate-[18deg] animate-float text-lavender" />
            <Squiggle className="absolute -top-6 right-4 w-20 text-sage-deep/60" />
            <div className="relative h-full w-full overflow-hidden mask-wave-side">
              {video ? (
                <VideoPlayer video={video} label={a.videoLabel} labels={t.video} sizes="(min-width: 1600px) 400px, 30vw" media={DESKTOP_QUERY} />
              ) : image ? (
                <LayoutPicture media={DESKTOP_QUERY}>
                  <Image
                    src={image.src}
                    alt={a.photoAlt}
                    fill
                    sizes="(min-width: 1600px) 400px, (min-width: 1280px) 340px, 30vw"
                    className="object-cover object-[50%_35%]"
                  />
                </LayoutPicture>
              ) : (
                <PhotoPlaceholder label={a.placeholder} />
              )}
            </div>
          </div>
        </Reveal>

        <div className="min-w-0 flex-1">
          <Reveal>
            <SectionHeading eyebrow={a.eyebrow} title={a.title} />
          </Reveal>
          <Reveal delay={0.08} className="w-lead mt-4 max-w-[44rem] space-y-2.5 text-ink-soft">
            {a.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-[clamp(1.25rem,3.5vh,2rem)] flex flex-wrap gap-3">
              {a.points.map((point, i) => (
                <li key={point.label} className={`${pointShapes[i]} flex items-center gap-3 py-3 pr-5 pl-4`}>
                  <span className="font-display text-[1.9rem] leading-none font-semibold text-ink">{point.value}</span>
                  <span className="text-[0.88rem] leading-tight font-semibold text-ink-soft">{point.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
