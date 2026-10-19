"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import { Wave } from "./decor/Decor";
import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative mt-4 text-milk">
      <Wave className="-mb-px h-14 text-ink sm:h-20" />
      <div className="bg-ink">
        <div className="container-page grid gap-10 pt-8 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:gap-14 lg:pt-10">
          <div>
            <Logo tone="light" />
            <p className="mt-4 font-semibold text-milk">{site.legalName[lang]}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-milk/70">{f.text}</p>
          </div>

          <nav aria-label={f.nav}>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.nav}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1">
              {navIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block py-1.5 text-milk/80 transition-colors hover:text-lavender">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.contacts}</h2>
            <ul className="mt-4 space-y-3 text-milk/80">
              <li>
                <a href={`tel:${site.phone.tel}`} className="flex items-center gap-3 py-0.5 transition-colors hover:text-lavender">
                  <Phone className="h-4.5 w-4.5 shrink-0 text-lavender" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-0.5 transition-colors hover:text-lavender"
                >
                  <InstagramIcon className="h-4.5 w-4.5 shrink-0 text-lavender" />
                  {site.instagram.handle}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-lavender" aria-hidden="true" />
                {site.address[lang]}
              </li>
            </ul>
          </div>
        </div>

        <div className="container-page flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-milk/60 sm:flex-row sm:items-center">
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
