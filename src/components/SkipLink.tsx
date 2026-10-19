"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[200] -translate-y-24 rounded-full bg-ink px-5 py-3 font-bold text-milk transition-transform focus:translate-y-0"
    >
      {t.a11y.skip}
    </a>
  );
}
