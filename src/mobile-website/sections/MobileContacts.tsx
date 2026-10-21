"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { routeUrl, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/shared/components/BrandIcons";
import { Reveal } from "@/shared/components/Reveal";
import { MobileMapCard } from "../components/MobileMapCard";
import { MobileSectionHeading } from "../components/MobileSectionHeading";

/** Contact details and actions first, then a map of limited height. */
export function MobileContacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  const details = [
    { Icon: MapPin, label: c.address, value: site.address[lang], tint: "bg-lavender-soft" },
    { Icon: Phone, label: c.phone, value: site.phone.display, href: `tel:${site.phone.tel}`, tint: "bg-sage-soft" },
    { Icon: InstagramIcon, label: c.instagram, value: site.instagram.handle, href: site.instagram.url, external: true, tint: "bg-lilac-mist" },
    { Icon: Clock, label: c.hours, value: site.hours.display, tint: "bg-milk-deep" },
  ];

  return (
    <section id="contacts" className="relative overflow-hidden pt-2 pb-10">
      <div className="m-container">
        <Reveal>
          <MobileSectionHeading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        </Reveal>

        <Reveal className="mt-5">
          <div className="rounded-[1.75rem_0.6rem_1.75rem_1.75rem] bg-white p-4 shadow-soft xs:p-5">
            <p className="font-display text-[0.98rem] font-semibold text-ink">{site.legalName[lang]}</p>
            <dl className="mt-3 space-y-3">
              {details.map(({ Icon, label, value, href, external, tint }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[0.8rem] ${tint}`}>
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[0.76rem] font-semibold text-ink-soft">{label}</dt>
                    <dd className="text-[0.93rem] font-semibold break-words text-ink">
                      {href ? (
                        <a
                          href={href}
                          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                          className="underline decoration-lavender decoration-2 underline-offset-4"
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

            <div className="mt-4 space-y-2">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <WhatsAppIcon className="h-5 w-5" />
                {c.whatsapp}
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
              <div className="grid grid-cols-2 gap-2 [&>a]:px-2 [&>a]:text-[0.86rem] xs:[&>a]:text-[0.95rem]">
                <a href={`tel:${site.phone.tel}`} className="btn btn-dark">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {c.call}
                </a>
                <a href={routeUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  {c.route}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <MobileMapCard />
        </Reveal>
      </div>
    </section>
  );
}
