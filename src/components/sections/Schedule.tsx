"use client";

import { Clock, Languages, Moon, Smile, Sun, UtensilsCrossed } from "lucide-react";
import { Reveal } from "../Reveal";
import { Sparkle } from "../decor/Decor";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

const items = [
  { key: "hours", Icon: Clock, tint: "bg-lavender-soft" },
  { key: "age", Icon: Smile, tint: "bg-sage-soft" },
  { key: "langs", Icon: Languages, tint: "bg-lilac-mist" },
  { key: "meals", Icon: UtensilsCrossed, tint: "bg-milk-deep" },
] as const;

export function Schedule() {
  const { t } = useLanguage();
  const s = t.schedule;

  return (
    <section aria-labelledby="schedule-title" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-soft sm:rounded-[3.5rem_3.5rem_3.5rem_1.25rem] sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.45),transparent_70%)]" />

            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <p className="eyebrow">
                  <Sparkle className="h-3.5 w-3.5 text-lavender" />
                  {s.eyebrow}
                </p>
                <h2 id="schedule-title" className="mt-3 text-[1.75rem] leading-[1.12] font-semibold text-ink sm:text-[2.4rem]">
                  {s.title}
                </h2>
                <p className="mt-3 text-ink-soft sm:text-lg">{s.text}</p>

                {/* the working day as a soft timeline */}
                <div className="mt-8" aria-hidden="true">
                  <div className="flex items-end justify-between text-ink">
                    <span className="flex items-center gap-2">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-soft">
                        <Sun className="h-5 w-5 text-sage-deep" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold text-ink-soft">{s.opens}</span>
                        <span className="font-display text-lg font-semibold">{site.hours.opens}</span>
                      </span>
                    </span>
                    <span className="flex flex-row-reverse items-center gap-2 text-right">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender-soft">
                        <Moon className="h-5 w-5 text-lavender-deep" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold text-ink-soft">{s.closes}</span>
                        <span className="font-display text-lg font-semibold">{site.hours.closes}</span>
                      </span>
                    </span>
                  </div>
                  <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="mt-3 h-7 w-full" fill="none">
                    <defs>
                      <linearGradient id="day" x1="0" x2="1">
                        <stop offset="0" stopColor="#B8D1B2" />
                        <stop offset="0.5" stopColor="#C9B6E4" />
                        <stop offset="1" stopColor="#7C5FA6" />
                      </linearGradient>
                    </defs>
                    <path d="M4 18c24-14 48-14 74 0s50 14 74 0 50-14 74 0 46 12 70-2" stroke="url(#day)" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4">
                {items.map(({ key, Icon, tint }, i) => {
                  const item = s.items[key];
                  return (
                    <Reveal as="li" key={key} delay={0.06 * i} y={16}>
                      <div className="flex h-full items-center gap-4 rounded-[1.75rem] bg-milk/70 p-4 xs:flex-col xs:items-start sm:p-6">
                        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] ${tint}`}>
                          <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 xs:mt-1">
                          <h3 className="text-sm font-semibold text-ink-soft">{item.label}</h3>
                          <p className="mt-0.5 font-display text-[1.15rem] leading-snug font-semibold text-ink sm:text-xl">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <p className="relative mt-8 border-t border-ink/8 pt-5 text-sm text-ink-soft sm:text-base">{s.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
