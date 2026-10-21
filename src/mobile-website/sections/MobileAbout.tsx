"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { Petal } from "@/shared/components/Decor";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { Reveal } from "@/shared/components/Reveal";
import { LayoutPicture } from "@/shared/components/LayoutPicture";
import { VideoPlayer } from "@/shared/components/VideoPlayer";
import { MOBILE_QUERY } from "@/shared/utils/layout";
import { cn } from "@/shared/utils/cn";
import { photoRatio } from "@/shared/utils/photo";
import { MobileSectionHeading } from "../components/MobileSectionHeading";

type Props = { image: SiteImage | null; video: SiteVideo | null };

const pointColors = ["bg-lavender-soft", "bg-sage-soft", "bg-lilac-mist"];

/** Vertical story: heading, an arch-framed photo of modest size, a short text that can be expanded. */
export function MobileAbout({ image, video }: Props) {
  const { t } = useLanguage();
  const a = t.about;
  const [open, setOpen] = useState(false);
  const moreId = useId();
  const ratio = image && !video ? photoRatio(image, 0.75, 1.3, 0.8) : 0.8;
  const [first, ...rest] = a.paragraphs;

  return (
    <section id="about" className="m-section relative overflow-hidden bg-white">
      <div className="m-container">
        <Reveal>
          <MobileSectionHeading eyebrow={a.eyebrow} title={a.title} />
        </Reveal>

        <Reveal className={cn("relative mx-auto mt-6", ratio < 1 ? "w-[64%] max-w-[16rem]" : "w-[86%] max-w-[24rem]")} y={22}>
          <div className="absolute -top-2.5 -left-3 h-[90%] w-[92%] rounded-[45%_55%_2rem_2rem/30%_30%_2rem_2rem] bg-sage-soft" />
          <div className="absolute -right-2 bottom-[18%] h-9 w-9 rounded-full bg-lavender-soft" />
          <Petal className="absolute -bottom-2 -left-2 z-10 w-5 -rotate-[20deg] text-lavender" />
          <div className="relative overflow-hidden mask-m-arch" style={{ aspectRatio: ratio }}>
            {video ? (
              <VideoPlayer video={video} label={a.videoLabel} labels={t.video} sizes="(min-width: 40rem) 24rem, 86vw" media={MOBILE_QUERY} />
            ) : image ? (
              <LayoutPicture media={MOBILE_QUERY}>
                <Image src={image.src} alt={a.photoAlt} fill sizes="(min-width: 40rem) 16rem, 64vw" className="object-cover object-[50%_35%]" />
              </LayoutPicture>
            ) : (
              <PhotoPlaceholder label={a.placeholder} />
            )}
          </div>
        </Reveal>

        <Reveal className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">
          <p>{first}</p>
          {rest.length > 0 && (
            <>
              <div id={moreId} hidden={!open} className="mt-2.5 space-y-2.5">
                {rest.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={moreId}
                className="mt-2 inline-flex min-h-10 items-center gap-1.5 font-bold text-lavender-deep"
              >
                {open ? a.less : a.more}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
              </button>
            </>
          )}
        </Reveal>

        <Reveal>
          <ul className="mt-4 grid grid-cols-3 gap-2">
            {a.points.map((point, i) => (
              <li key={point.label} className={`${pointColors[i]} rounded-[1.2rem_1.2rem_1.2rem_0.4rem] px-3 py-2.5`}>
                <span className="block font-display text-[1.6rem] leading-none font-semibold text-ink">{point.value}</span>
                <span className="mt-1 block text-[0.74rem] leading-snug font-semibold text-ink-soft">{point.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
