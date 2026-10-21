"use client";

import { Clock, Languages, Moon, Smile, Sun, UtensilsCrossed } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Wave } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const items = [
  { key: "hours", Icon: Clock, tint: "bg-lavender-soft" },
  { key: "age", Icon: Smile, tint: "bg-sage-soft" },
  { key: "langs", Icon: Languages, tint: "bg-lilac-mist" },
  { key: "meals", Icon: UtensilsCrossed, tint: "bg-milk-deep" },
] as const;

/** The day at a glance: a wide card with the opening-hours timeline and four facts in one row. */
export function Schedule() {
  const { t } = useLanguage();
  const s = t.schedule;

  return (
    <section aria-labelledby="schedule-title" className="relative pt-[clamp(2.75rem,8vh,4.5rem)] pb-[clamp(2rem,6vh,3.5rem)]">
      <Wave flip className="absolute inset-x-0 top-0 h-[clamp(1.5rem,4vh,2.5rem)] text-white" />
      <div className="w-container relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.75rem_2.75rem_2.75rem_1rem] bg-white px-[clamp(1.5rem,3vw,2.75rem)] py-[clamp(1.5rem,4vh,2.25rem)] shadow-soft">
            <div className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.45),transparent_70%)]" />

            <div className="relative grid grid-cols-[0.85fr_1.4fr] items-center gap-[clamp(2rem,4vw,3.5rem)]">
              <div>
                <SectionHeading id="schedule-title" eyebrow={s.eyebrow} title={s.title} text={s.text} />

                {/* the working day as a soft timeline */}
                <div className="mt-5" aria-hidden="true">
                  <div className="flex items-end justify-between text-ink">
                    <span className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-sage-soft">
                        <Sun className="h-4 w-4 text-sage-deep" />
                      </span>
                      <span>
                        <span className="block text-[0.7rem] font-semibold text-ink-soft">{s.opens}</span>
                        <span className="font-display text-base font-semibold">{site.hours.opens}</span>
                      </span>
                    </span>
                    <span className="flex flex-row-reverse items-center gap-2 text-right">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-lavender-soft">
                        <Moon className="h-4 w-4 text-lavender-deep" />
                      </span>
                      <span>
                        <span className="block text-[0.7rem] font-semibold text-ink-soft">{s.closes}</span>
                        <span className="font-display text-base font-semibold">{site.hours.closes}</span>
                      </span>
                    </span>
                  </div>
                  <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="mt-2 h-5 w-full" fill="none">
                    <defs>
                      <linearGradient id="day-desktop" x1="0" x2="1">
                        <stop offset="0" stopColor="#B8D1B2" />
                        <stop offset="0.5" stopColor="#C9B6E4" />
                        <stop offset="1" stopColor="#7C5FA6" />
                      </linearGradient>
                    </defs>
                    <path d="M4 18c24-14 48-14 74 0s50 14 74 0 50-14 74 0 46 12 70-2" stroke="url(#day-desktop)" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <ul className="grid grid-cols-4 gap-3">
                {items.map(({ key, Icon, tint }, i) => {
                  const item = s.items[key];
                  return (
                    <Reveal as="li" key={key} delay={0.05 * i} y={14}>
                      <div className="flex h-full flex-col items-start rounded-[1.5rem] bg-milk/70 p-4">
                        <span className={`grid h-10 w-10 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] ${tint}`}>
                          <Icon className="h-4.5 w-4.5 text-ink" aria-hidden="true" />
                        </span>
                        <h3 className="mt-3 text-[0.8rem] font-semibold text-ink-soft">{item.label}</h3>
                        <p className="mt-0.5 font-display text-[1.02rem] leading-snug font-semibold text-ink">{item.value}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <p className="relative mt-5 border-t border-ink/8 pt-4 text-sm text-ink-soft">{s.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
