"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Cloud, Petal, Sparkle } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { cn } from "@/shared/utils/cn";

const tiles = [
  {
    key: "groups",
    bg: "bg-lavender-soft",
    shape: "rounded-[1.8rem_1.8rem_1.8rem_0.6rem]",
    decor: <Petal className="absolute -top-2 right-4 w-5 rotate-[30deg] text-lavender" />,
  },
  {
    key: "ages",
    bg: "bg-sage-soft",
    shape: "rounded-[0.6rem_1.8rem_1.8rem_1.8rem]",
    decor: <Sparkle className="absolute top-3 right-3.5 h-4 w-4 animate-twinkle text-lavender" />,
  },
  {
    key: "meals",
    bg: "bg-lilac-mist",
    shape: "rounded-[1.8rem_0.6rem_1.8rem_1.8rem]",
    decor: <span className="absolute top-3 right-3.5 h-3 w-3 rounded-full bg-lavender-soft" aria-hidden="true" />,
  },
  {
    key: "hours",
    bg: "bg-milk",
    shape: "rounded-[1.8rem_1.8rem_0.6rem_1.8rem]",
    decor: <Cloud className="absolute -top-1.5 right-3 w-9 text-lavender-soft" />,
  },
] as const;

/** One row of four compact facts right under the hero. */
export function Stats() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.stats.label} className="relative bg-white pb-[clamp(1.5rem,4vh,2.5rem)]">
      <ul className="w-container grid grid-cols-4 gap-4">
        {tiles.map((tile, i) => {
          const item = t.stats[tile.key];
          return (
            <Reveal as="li" key={tile.key} delay={i * 0.06} y={16}>
              <div
                className={cn(
                  "relative flex h-full min-h-[5.75rem] flex-col justify-center overflow-hidden px-5 py-4 transition-transform duration-500 hover:-translate-y-1",
                  tile.bg,
                  tile.shape,
                )}
              >
                {tile.decor}
                <p
                  className={cn(
                    "font-display leading-none font-semibold text-ink",
                    tile.key === "hours" ? "text-[clamp(1.2rem,1.75vw,1.6rem)]" : "text-[clamp(1.9rem,2.6vw,2.4rem)]",
                  )}
                >
                  {item.value}
                  {item.suffix && <span className="text-[0.5em] font-semibold tracking-normal text-ink-soft">{item.suffix}</span>}
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-snug font-semibold text-ink-soft">{item.caption}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
