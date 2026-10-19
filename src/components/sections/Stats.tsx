"use client";

import { Reveal } from "../Reveal";
import { Cloud, Petal, Sparkle } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const tiles = [
  {
    key: "groups",
    bg: "bg-lavender-soft",
    shape: "rounded-[2.2rem_2.2rem_2.2rem_0.8rem]",
    decor: <Petal className="absolute -top-3 right-4 w-7 rotate-[30deg] text-lavender" />,
  },
  {
    key: "ages",
    bg: "bg-sage-soft",
    shape: "rounded-[0.8rem_2.2rem_2.2rem_2.2rem]",
    decor: <Sparkle className="absolute top-4 right-4 h-5 w-5 animate-twinkle text-lavender" />,
  },
  {
    key: "meals",
    bg: "bg-lilac-mist",
    shape: "rounded-[2.2rem_0.8rem_2.2rem_2.2rem]",
    decor: <span className="absolute top-4 right-4 h-4 w-4 rounded-full bg-lavender-soft" aria-hidden="true" />,
  },
  {
    key: "hours",
    bg: "bg-milk",
    shape: "rounded-[2.2rem_2.2rem_0.8rem_2.2rem]",
    decor: <Cloud className="absolute -top-2 right-3 w-12 text-lavender-soft" />,
  },
] as const;

export function Stats() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.stats.label} className="relative bg-white pb-6 sm:pb-8 lg:pb-10">
      <div className="container-page">
        <ul className="-mt-2 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {tiles.map((tile, i) => {
            const item = t.stats[tile.key];
            const long = tile.key === "hours";
            return (
              <Reveal as="li" key={tile.key} delay={i * 0.07} y={20}>
                <div
                  className={cn(
                    "group relative flex h-full min-h-[8.5rem] flex-col justify-end overflow-hidden p-4 transition-transform duration-500 hover:-translate-y-1 sm:min-h-40 sm:p-6",
                    tile.bg,
                    tile.shape,
                  )}
                >
                  {tile.decor}
                  <p
                    className={cn(
                      "font-display leading-none font-semibold text-ink",
                      long ? "text-[1.3rem] xs:text-[1.55rem] sm:text-3xl lg:text-[1.9rem] xl:text-[2.2rem]" : "text-[2.6rem] sm:text-6xl",
                    )}
                  >
                    {item.value}
                    {item.suffix && (
                      <span className="text-[0.5em] font-semibold tracking-normal text-ink-soft">{item.suffix}</span>
                    )}
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-snug font-semibold text-ink-soft sm:text-base">
                    {item.caption}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
