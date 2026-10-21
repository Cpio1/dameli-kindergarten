"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { routeUrl, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/shared/components/BrandIcons";
import { Blob } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";
import { MapCard } from "../components/MapCard";
import { SectionHeading } from "../components/SectionHeading";

/** Two columns: contact card on the left, 2GIS on the right — both kept to one laptop screen. */
export function Contacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  const details = [
    { Icon: MapPin, label: c.address, value: site.address[lang], tint: "bg-lavender-soft" },
    { Icon: Phone, label: c.phone, value: site.phone.display, href: `tel:${site.phone.tel}`, tint: "bg-sage-soft" },
    { Icon: Clock, label: c.hours, value: site.hours.display, tint: "bg-milk-deep" },
    { Icon: InstagramIcon, label: c.instagram, value: site.instagram.handle, href: site.instagram.url, external: true, tint: "bg-lilac-mist" },
  ];

  return (
    <section id="contacts" data-snap className="w-section relative overflow-hidden">
      <Blob className="pointer-events-none absolute -top-10 -left-28 w-80 text-lavender-soft/60" />

      <div className="w-container relative">
        <Reveal className="flex items-end justify-between gap-10">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} />
          <p className="w-lead max-w-sm pb-1 text-ink-soft">{c.text}</p>
        </Reveal>

        <div className="mt-[clamp(1.5rem,4vh,2.25rem)] grid grid-cols-[1.05fr_1fr] gap-[clamp(1.25rem,2vw,1.75rem)]">
          <Reveal className="h-full">
            <div className="h-full rounded-[2.25rem_0.9rem_2.25rem_2.25rem] bg-white p-[clamp(1.25rem,2vw,1.75rem)] shadow-soft">
              <p className="font-display text-[1.05rem] font-semibold text-ink">{site.legalName[lang]}</p>

              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3.5">
                {details.map(({ Icon, label, value, href, external, tint }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] ${tint}`}>
                      <Icon className="h-4.5 w-4.5 text-ink" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[0.8rem] font-semibold text-ink-soft">{label}</dt>
                      <dd className="text-[0.97rem] font-semibold break-words text-ink">
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

              <div className="mt-5 grid grid-cols-2 gap-2.5 [&>a]:px-3">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  {c.whatsapp}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <a href={`tel:${site.phone.tel}`} className="btn btn-dark">
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  {c.call}
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <InstagramIcon className="h-4.5 w-4.5" />
                  {c.openInstagram}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <a href={routeUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Navigation className="h-4.5 w-4.5" aria-hidden="true" />
                  {c.route}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <MapCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
