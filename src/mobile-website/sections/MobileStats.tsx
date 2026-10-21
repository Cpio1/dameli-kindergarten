"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Petal, Sparkle } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { cn } from "@/shared/utils/cn";

const tiles = [
  { key: "groups", bg: "bg-lavender-soft", shape: "rounded-[1.4rem_1.4rem_1.4rem_0.45rem]" },
  { key: "ages", bg: "bg-sage-soft", shape: "rounded-[1.4rem_1.4rem_0.45rem_1.4rem]" },
  { key: "meals", bg: "bg-lilac-mist", shape: "rounded-[1.4rem_0.45rem_1.4rem_1.4rem]" },
  { key: "hours", bg: "bg-milk", shape: "rounded-[0.45rem_1.4rem_1.4rem_1.4rem]" },
] as const;

/** 2 × 2 facts: number first, caption under it. */
export function MobileStats() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.stats.label} className="relative bg-white pt-1 pb-4">
      <Petal className="absolute top-0 right-5 w-4 rotate-[30deg] text-lavender" />
      <ul className="m-container grid grid-cols-2 gap-2.5">
        {tiles.map((tile, i) => {
          const item = t.stats[tile.key];
          return (
            <Reveal as="li" key={tile.key} delay={i * 0.05} y={12}>
              <div className={cn("relative flex h-full min-h-[4.75rem] flex-col justify-center px-3.5 py-3", tile.bg, tile.shape)}>
                {i === 1 && <Sparkle className="absolute top-2.5 right-2.5 h-3 w-3 text-lavender" />}
                <p
                  className={cn(
                    "font-display leading-none font-semibold text-ink",
                    tile.key === "hours" ? "text-[clamp(0.98rem,4.4vw,1.25rem)]" : "text-[clamp(1.5rem,7vw,1.9rem)]",
                  )}
                >
                  {item.value}
                  {item.suffix && <span className="text-[0.5em] font-semibold tracking-normal text-ink-soft">{item.suffix}</span>}
                </p>
                <p className="mt-1 text-[0.78rem] leading-snug font-semibold text-ink-soft">{item.caption}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
