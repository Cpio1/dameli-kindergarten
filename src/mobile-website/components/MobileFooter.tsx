"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon } from "@/shared/components/BrandIcons";
import { Wave } from "@/shared/components/Decor";
import { Logo } from "@/shared/components/Logo";

/** Stacked footer: brand, two-column navigation, contacts. */
export function MobileFooter() {
  const { t, lang } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative text-milk">
      <Wave className="-mb-px h-9 text-ink" />
      <div className="bg-ink">
        <div className="m-container space-y-7 pt-5 pb-7">
          <div>
            <Logo tone="light" size="mobile" />
            <p className="mt-3 text-[0.95rem] font-semibold text-milk">{site.legalName[lang]}</p>
            <p className="mt-1 text-sm leading-relaxed text-milk/70">{f.text}</p>
          </div>

          <nav aria-label={f.nav}>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.nav}</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {navIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block py-1.5 text-[0.95rem] text-milk/80">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-bold tracking-normal text-sage">{f.contacts}</h2>
            <ul className="mt-2.5 space-y-2.5 text-[0.95rem] text-milk/80">
              <li>
                <a href={`tel:${site.phone.tel}`} className="flex items-center gap-2.5 py-0.5">
                  <Phone className="h-4 w-4 shrink-0 text-lavender" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-0.5">
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

        <div className="m-container flex flex-col-reverse items-start gap-3 border-t border-white/10 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-[0.8rem] text-milk/60">
          <p>
            © {new Date().getFullYear()} {site.legalName[lang]}. {f.rights}
          </p>
          <a href="#home" className="inline-flex items-center gap-2 rounded-full py-1 text-sm font-semibold text-milk/80">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {f.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
