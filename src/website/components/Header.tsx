"use client";

import { m } from "motion/react";
import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/shared/components/BrandIcons";
import { LanguageSwitch } from "@/shared/components/LanguageSwitch";
import { Logo } from "@/shared/components/Logo";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/utils/cn";

/** Slim 4 rem header: logo, pill navigation, language and a WhatsApp button. */
export function Header() {
  const { t } = useLanguage();
  const active = useActiveSection(".website-root");
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-milk/85 shadow-[0_8px_30px_-20px_rgb(53_45_69/0.35)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="w-container flex h-16 items-center justify-between gap-4">
        <a href="#home" className="shrink-0 rounded-2xl" aria-label={t.header.homeLink}>
          <Logo />
        </a>

        <nav aria-label={t.header.menu}>
          <ul className="flex items-center gap-0.5 rounded-full bg-white/70 p-1 shadow-[inset_0_0_0_1px_rgb(53_45_69/0.06)]">
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-1.5 text-[0.875rem] font-semibold whitespace-nowrap transition-colors duration-300 xl:px-4",
                    active === id ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active === id && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-lavender-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitch />
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.header.contact} (${t.a11y.newTab})`}
            className="btn btn-dark !min-h-10 !px-3 xl:!px-4"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            <span className="hidden xl:inline">{t.header.contact}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
