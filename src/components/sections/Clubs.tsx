"use client";

import { Reveal } from "../Reveal";
import { Cloud, Orbit, Petal, Sparkle } from "../decor/Decor";
import { DanceArt, EnglishArt, MusicArt, RoboticsArt } from "./ClubArt";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const clubs = [
  {
    key: "english",
    Art: EnglishArt,
    card: "bg-lavender-soft rounded-[3rem_3rem_3rem_1rem]",
    badge: "bg-white rounded-[58%_42%_55%_45%/52%_46%_54%_48%]",
    decor: <Sparkle className="absolute top-6 right-7 h-5 w-5 text-lavender-deep transition-transform duration-700 group-hover:rotate-90" />,
    offset: "",
  },
  {
    key: "dance",
    Art: DanceArt,
    // soft arch
    card: "bg-sage-soft rounded-[10rem_10rem_2.5rem_2.5rem] sm:rounded-[12rem_12rem_2.5rem_2.5rem]",
    badge: "bg-white rounded-full",
    decor: <Orbit className="absolute -top-6 -right-6 w-28 text-sage-deep/50 transition-transform duration-1000 group-hover:rotate-45" />,
    offset: "lg:mt-16",
  },
  {
    key: "music",
    Art: MusicArt,
    card: "bg-gradient-to-br from-lilac-mist to-lavender-soft rounded-[2.5rem_5rem_2.5rem_5rem]",
    badge: "bg-white rounded-[2rem_2rem_2rem_0.6rem]",
    decor: <Cloud className="absolute top-5 right-5 w-14 text-white transition-transform duration-700 group-hover:-translate-x-2" />,
    offset: "lg:-mt-6",
  },
  {
    key: "robotics",
    Art: RoboticsArt,
    card: "bg-white rounded-[2.5rem] shadow-[inset_0_0_0_2px_var(--color-lavender-soft)]",
    badge: "bg-lavender-soft rounded-[45%_55%_40%_60%/55%_45%_55%_45%]",
    decor: <Petal className="absolute -right-2 -bottom-3 w-10 -rotate-[24deg] text-sage transition-transform duration-700 group-hover:-rotate-[8deg]" />,
    offset: "lg:mt-10",
  },
] as const;

export function Clubs() {
  const { t } = useLanguage();
  const c = t.clubs;

  return (
    <section id="clubs" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute top-20 -right-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.3),transparent_70%)]" />

      <div className="container-page relative">
        <Reveal className="max-w-2xl lg:mx-0">
          <p className="eyebrow">
            <Sparkle className="h-3.5 w-3.5 text-lavender" />
            {c.eyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-[1.12] font-semibold text-ink sm:text-[2.6rem] lg:text-5xl">{c.title}</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{c.text}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:items-start lg:gap-6">
          {clubs.map(({ key, Art, card, badge, decor, offset }, i) => {
            const item = c.items[key];
            return (
              <Reveal as="li" key={key} delay={i * 0.08} className={offset}>
                <article
                  className={cn(
                    "group relative flex h-full overflow-hidden p-5 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift xs:p-6 sm:p-7",
                    // mobile: horizontal rows that alternate sides; tablet+: vertical tiles
                    "items-center gap-4 xs:gap-5 sm:flex-col sm:items-start sm:gap-0",
                    i % 2 === 1 && "flex-row-reverse text-right sm:flex-col sm:text-left",
                    key === "dance" && "sm:items-center sm:pt-12 sm:text-center",
                    card,
                  )}
                >
                  {decor}
                  <span
                    className={cn(
                      "relative grid h-16 w-16 shrink-0 xs:h-20 xs:w-20 place-items-center shadow-soft transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 sm:h-24 sm:w-24",
                      badge,
                    )}
                  >
                    <Art className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14" />
                  </span>
                  <div className="relative min-w-0 sm:mt-6">
                    <h3 className="text-[1.12rem] leading-tight font-semibold text-ink xs:text-[1.25rem] sm:text-[1.35rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
