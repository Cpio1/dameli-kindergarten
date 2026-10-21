"use client";

import { Clock, Languages, Moon, Smile, Sun, UtensilsCrossed } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Wave } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { MobileSectionHeading } from "../components/MobileSectionHeading";

const items = [
  { key: "hours", Icon: Clock, tint: "bg-lavender-soft" },
  { key: "age", Icon: Smile, tint: "bg-sage-soft" },
  { key: "langs", Icon: Languages, tint: "bg-lilac-mist" },
  { key: "meals", Icon: UtensilsCrossed, tint: "bg-milk-deep" },
] as const;

/** One card: opening-hours timeline and four facts as a 2 × 2 list. */
export function MobileSchedule() {
  const { t } = useLanguage();
  const s = t.schedule;

  return (
    <section aria-labelledby="m-schedule-title" className="relative pt-9 pb-8">
      <Wave flip className="absolute inset-x-0 top-0 h-5 text-white" />
      <div className="m-container relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem_2rem_2rem_0.75rem] bg-white p-4 shadow-soft xs:p-5">
            <div className="pointer-events-none absolute -top-16 -right-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.45),transparent_70%)]" />
            <MobileSectionHeading id="m-schedule-title" eyebrow={s.eyebrow} title={s.title} text={s.text} className="relative" />

            <div className="relative mt-4" aria-hidden="true">
              <div className="flex items-end justify-between text-ink">
                <span className="flex items-center gap-1.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-soft">
                    <Sun className="h-3.5 w-3.5 text-sage-deep" />
                  </span>
                  <span className="font-display text-[0.95rem] font-semibold">{site.hours.opens}</span>
                </span>
                <span className="flex flex-row-reverse items-center gap-1.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-lavender-soft">
                    <Moon className="h-3.5 w-3.5 text-lavender-deep" />
                  </span>
                  <span className="font-display text-[0.95rem] font-semibold">{site.hours.closes}</span>
                </span>
              </div>
              <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="mt-1.5 h-4 w-full" fill="none">
                <defs>
                  <linearGradient id="day-mobile" x1="0" x2="1">
                    <stop offset="0" stopColor="#B8D1B2" />
                    <stop offset="0.5" stopColor="#C9B6E4" />
                    <stop offset="1" stopColor="#7C5FA6" />
                  </linearGradient>
                </defs>
                <path d="M4 18c24-14 48-14 74 0s50 14 74 0 50-14 74 0 46 12 70-2" stroke="url(#day-mobile)" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>

            <ul className="relative mt-4 grid grid-cols-2 gap-2">
              {items.map(({ key, Icon, tint }) => {
                const item = s.items[key];
                return (
                  <li key={key} className="flex items-start gap-2.5 rounded-[1.1rem] bg-milk/70 p-2.5">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] ${tint}`}>
                      <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sans text-[0.72rem] font-semibold tracking-normal text-ink-soft">{item.label}</h3>
                      <p className="text-[0.85rem] leading-snug font-bold text-ink">{item.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="relative mt-4 border-t border-ink/8 pt-3 text-[0.82rem] text-ink-soft">{s.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
