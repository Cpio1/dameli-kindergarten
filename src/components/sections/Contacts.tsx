"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "../BrandIcons";
import { Reveal } from "../Reveal";
import { Blob, Sparkle } from "../decor/Decor";
import { MapCard } from "./MapCard";
import { routeUrl, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  const details = [
    { Icon: MapPin, label: c.address, value: site.address[lang], tint: "bg-lavender-soft" },
    { Icon: Phone, label: c.phone, value: site.phone.display, href: `tel:${site.phone.tel}`, tint: "bg-sage-soft" },
    { Icon: InstagramIcon, label: c.instagram, value: site.instagram.handle, href: site.instagram.url, external: true, tint: "bg-lilac-mist" },
    { Icon: Clock, label: c.hours, value: site.hours.display, tint: "bg-milk-deep" },
  ];

  return (
    <section id="contacts" className="relative overflow-hidden pt-16 pb-24 sm:pt-20 lg:pt-24 lg:pb-32">
      <Blob className="pointer-events-none absolute -top-10 -left-32 hidden w-96 text-lavender-soft/60 lg:block" />

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            <Sparkle className="h-3.5 w-3.5 text-lavender" />
            {c.eyebrow}
          </p>
          <h2 className="mt-3 text-[1.75rem] leading-[1.12] font-semibold text-ink sm:text-[2.3rem] lg:text-[2.75rem]">{c.title}</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{c.text}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
          <Reveal>
            <div className="h-full rounded-[2.5rem_1rem_2.5rem_2.5rem] bg-white p-5 shadow-soft sm:p-8">
              <p className="font-display text-lg font-semibold text-ink">{site.legalName[lang]}</p>

              <dl className="mt-5 space-y-4">
                {details.map(({ Icon, label, value, href, external, tint }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tint}`}>
                      <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
                      <dd className="mt-0.5 text-[1.02rem] font-semibold break-words text-ink">
                        {href ? (
                          <a
                            href={href}
                            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                            className="underline decoration-lavender decoration-2 underline-offset-4 transition-colors hover:text-lavender-deep"
                          >
                            {value}
                            {external && <span className="sr-only"> ({t.a11y.newTab})</span>}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 [&>a]:px-4">
                <a href={`tel:${site.phone.tel}`} className="btn btn-dark">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {c.call}
                </a>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <WhatsAppIcon className="h-5 w-5" />
                  {c.whatsapp}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <InstagramIcon className="h-5 w-5" />
                  {c.openInstagram}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <a href={routeUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  {c.route}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <MapCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
