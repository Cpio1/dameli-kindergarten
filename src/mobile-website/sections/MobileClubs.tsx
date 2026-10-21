"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DanceArt, EnglishArt, MusicArt, RoboticsArt } from "@/shared/components/ClubArt";
import { Cloud, Sparkle, Wave } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { cn } from "@/shared/utils/cn";
import { MobileSectionHeading } from "../components/MobileSectionHeading";

const clubs = [
  { key: "english", Art: EnglishArt, card: "bg-lavender-soft rounded-[1.75rem_1.75rem_1.75rem_0.5rem]", badge: "bg-white rounded-[58%_42%_55%_45%/52%_46%_54%_48%]" },
  { key: "dance", Art: DanceArt, card: "bg-sage-soft rounded-[4.5rem_4.5rem_1.5rem_1.5rem]", badge: "bg-white rounded-full" },
  { key: "music", Art: MusicArt, card: "bg-gradient-to-br from-lilac-mist to-lavender-soft rounded-[1.5rem_2.75rem_1.5rem_2.75rem]", badge: "bg-white rounded-[1rem_1rem_1rem_0.35rem]" },
  { key: "robotics", Art: RoboticsArt, card: "bg-white rounded-[1.5rem] shadow-[inset_0_0_0_1.5px_var(--color-lavender-soft)]", badge: "bg-lavender-soft rounded-[45%_55%_40%_60%/55%_45%_55%_45%]" },
] as const;

/** 2 × 2 grid of small cards: illustration, name, one-line idea. */
export function MobileClubs() {
  const { t } = useLanguage();
  const c = t.clubs;

  return (
    <section id="clubs" className="m-section relative overflow-hidden">
      <Wave flip className="absolute inset-x-0 top-0 h-5 text-white" />
      <div className="pointer-events-none absolute top-6 -right-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.3),transparent_70%)]" />
      <div className="m-container relative">
        <Reveal>
          <MobileSectionHeading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        </Reveal>

        <ul className="mt-5 grid grid-cols-2 gap-2.5">
          {clubs.map(({ key, Art, card, badge }, i) => {
            const item = c.items[key];
            return (
              <Reveal as="li" key={key} delay={(i % 2) * 0.06} y={14}>
                <article className={cn("relative flex h-full flex-col p-3.5 xs:p-4", key === "dance" && "items-center pt-5 text-center", card)}>
                  {key === "english" && <Sparkle className="absolute top-3 right-3 h-3 w-3 text-lavender-deep" />}
                  {key === "music" && <Cloud className="absolute top-3 right-3 w-8 text-white" />}
                  <span className={cn("grid h-11 w-11 place-items-center shadow-soft", badge)}>
                    <Art className="h-7 w-7" />
                  </span>
                  <h3 className="mt-2.5 text-[0.95rem] leading-tight font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
