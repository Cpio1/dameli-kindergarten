"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon } from "@/shared/components/BrandIcons";
import { Wave } from "@/shared/components/Decor";
import { Logo } from "@/shared/components/Logo";

/** Compact three-column footer. */
export function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative text-milk">
      <Wave className="-mb-px h-12 text-ink" />
      <div className="bg-ink">
        <div className="w-container grid grid-cols-[1.3fr_1.2fr_1fr] gap-12 pt-6 pb-8">
          <div>
            <Logo tone="light" />
            <p className="mt-3 font-semibold text-milk">{site.legalName[lang]}</p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-milk/70">{f.text}</p>
          </div>

          <nav aria-label={f.nav}>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.nav}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0.5 text-sm">
              {navIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block py-1 text-milk/80 transition-colors hover:text-lavender">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.contacts}</h2>
            <ul className="mt-3 space-y-2 text-sm text-milk/80">
              <li>
                <a href={`tel:${site.phone.tel}`} className="flex items-center gap-2.5 transition-colors hover:text-lavender">
                  <Phone className="h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-lavender"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-lavender" />
                  {site.instagram.handle}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                {site.address[lang]}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-container flex items-center justify-between gap-4 border-t border-white/10 py-4 text-sm text-milk/60">
          <p>
            © {new Date().getFullYear()} {site.legalName[lang]}. {f.rights}
          </p>
          <a href="#home" className="inline-flex items-center gap-2 rounded-full py-1 font-semibold text-milk/80 hover:text-lavender">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {f.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
