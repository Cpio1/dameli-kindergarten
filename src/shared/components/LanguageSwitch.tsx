"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/translations";
import { cn } from "@/shared/utils/cn";

const options: { lang: Lang; label: string; full: string }[] = [
  { lang: "kk", label: "KZ", full: "Қазақша" },
  { lang: "ru", label: "RU", full: "Русский" },
];

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.header.switchLang}
      className={cn("relative flex rounded-full bg-white/80 p-1 shadow-[inset_0_0_0_1px_rgb(53_45_69/0.08)]", className)}
    >
      {options.map((option) => {
        const active = option.lang === lang;
        return (
          <button
            key={option.lang}
            type="button"
            lang={option.lang}
            aria-pressed={active}
            aria-label={option.full}
            onClick={() => setLang(option.lang)}
            className={cn(
              "relative z-10 min-h-9 min-w-10 rounded-full px-2.5 xs:min-w-11 xs:px-3 text-[0.8rem] font-extrabold tracking-wide transition-colors duration-300",
              active ? "bg-lavender-deep text-white shadow-soft" : "text-ink-soft hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
