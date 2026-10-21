"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DanceArt, EnglishArt, MusicArt, RoboticsArt } from "@/shared/components/ClubArt";
import { Cloud, Orbit, Petal, Sparkle, Wave } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { cn } from "@/shared/utils/cn";
import { SectionHeading } from "../components/SectionHeading";

const clubs = [
  {
    key: "english",
    Art: EnglishArt,
    card: "bg-lavender-soft rounded-[2.5rem_2.5rem_2.5rem_0.8rem]",
    badge: "bg-white rounded-[58%_42%_55%_45%/52%_46%_54%_48%]",
    decor: <Sparkle className="absolute top-5 right-5 h-4 w-4 text-lavender-deep transition-transform duration-700 group-hover:rotate-90" />,
    offset: "",
  },
  {
    key: "dance",
    Art: DanceArt,
    // soft arch
    card: "bg-sage-soft rounded-[8rem_8rem_2rem_2rem] items-center text-center pt-8",
    badge: "bg-white rounded-full",
    decor: <Orbit className="absolute -top-5 -right-5 w-20 text-sage-deep/50 transition-transform duration-1000 group-hover:rotate-45" />,
    offset: "mt-6",
  },
  {
    key: "music",
    Art: MusicArt,
    card: "bg-gradient-to-br from-lilac-mist to-lavender-soft rounded-[2rem_4rem_2rem_4rem]",
    badge: "bg-white rounded-[1.6rem_1.6rem_1.6rem_0.5rem]",
    decor: <Cloud className="absolute top-4 right-4 w-11 text-white transition-transform duration-700 group-hover:-translate-x-2" />,
    offset: "",
  },
  {
    key: "robotics",
    Art: RoboticsArt,
    card: "bg-white rounded-[2rem] shadow-[inset_0_0_0_2px_var(--color-lavender-soft)]",
    badge: "bg-lavender-soft rounded-[45%_55%_40%_60%/55%_45%_55%_45%]",
    decor: <Petal className="absolute -right-1.5 -bottom-2 w-8 -rotate-[24deg] text-sage transition-transform duration-700 group-hover:-rotate-[8deg]" />,
    offset: "mt-6",
  },
] as const;

/** All four clubs in one row of compact organic cards. */
export function Clubs() {
  const { t } = useLanguage();
  const c = t.clubs;

  return (
    <section id="clubs" data-snap className="w-section relative overflow-hidden">
      <Wave flip className="absolute inset-x-0 top-0 h-[clamp(1.5rem,4vh,2.5rem)] text-white" />
      <div className="pointer-events-none absolute top-10 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.3),transparent_70%)]" />

      <div className="w-container relative">
        <Reveal className="flex items-end justify-between gap-10">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} />
          <p className="w-lead max-w-sm pb-1 text-ink-soft">{c.text}</p>
        </Reveal>

        <ul className="mt-[clamp(1.5rem,4vh,2.25rem)] grid grid-cols-4 items-start gap-[clamp(1rem,1.6vw,1.5rem)]">
          {clubs.map(({ key, Art, card, badge, decor, offset }, i) => {
            const item = c.items[key];
            return (
              <Reveal as="li" key={key} delay={i * 0.07} className={offset}>
                <article
                  className={cn(
                    "group relative flex min-h-[clamp(12.5rem,30vh,14.5rem)] flex-col overflow-hidden p-[clamp(1.1rem,1.6vw,1.5rem)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-lift",
                    card,
                  )}
                >
                  {decor}
                  <span
                    className={cn(
                      "relative grid h-[clamp(3.5rem,4.6vw,4.25rem)] w-[clamp(3.5rem,4.6vw,4.25rem)] shrink-0 place-items-center shadow-soft transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3",
                      badge,
                    )}
                  >
                    <Art className="h-[62%] w-[62%]" />
                  </span>
                  <h3 className="mt-4 text-[clamp(1.02rem,1.3vw,1.18rem)] leading-tight font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
