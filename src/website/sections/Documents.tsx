"use client";

import { ArrowUpRight, FileCheck2, FileText, FolderOpen, Layers, Smartphone, Wifi } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Petal, Sparkle } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";

const points = [
  { key: "place", Icon: Layers, tint: "bg-lavender-soft" },
  { key: "online", Icon: Wifi, tint: "bg-sage-soft" },
  { key: "mobile", Icon: Smartphone, tint: "bg-milk-deep" },
] as const;

/** Small fanned stack of paper sheets — decorative, no real document titles. */
function PaperFan() {
  return (
    <div className="relative h-36 w-32 shrink-0" aria-hidden="true">
      <Petal className="absolute -top-2 -left-3 w-6 -rotate-[24deg] text-sage" />
      <Sparkle className="absolute top-1 -right-2 h-4 w-4 animate-twinkle text-lavender-deep" />
      <div className="absolute inset-x-3 top-3 bottom-1 -rotate-[10deg] rounded-[1.25rem] bg-sage-soft shadow-soft" />
      <div className="absolute inset-x-2.5 top-2 bottom-2 rotate-[7deg] rounded-[1.25rem] bg-milk shadow-soft" />
      <div className="absolute inset-x-1.5 top-1 bottom-3 flex flex-col rounded-[1.25rem_1.25rem_1.25rem_0.5rem] bg-white p-3.5 shadow-lift">
        <span className="grid h-9 w-9 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-lavender-soft">
          <FileText className="h-4.5 w-4.5 text-lavender-deep" />
        </span>
        <span className="mt-3 h-2 w-3/4 rounded-full bg-ink/10" />
        <span className="mt-2 h-1.5 w-full rounded-full bg-ink/6" />
        <span className="mt-1.5 h-1.5 w-5/6 rounded-full bg-ink/6" />
      </div>
      <span className="absolute -right-2.5 bottom-3 grid h-10 w-10 rotate-[8deg] place-items-center rounded-xl bg-sage shadow-soft">
        <FileCheck2 className="h-4.5 w-4.5 text-ink" />
      </span>
    </div>
  );
}

/** Compact band: paper illustration, short text, and the Google Drive button. */
export function Documents() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative pb-[clamp(2rem,6vh,3.5rem)]">
      <div className="w-container">
        <Reveal>
          <div className="relative flex items-center gap-[clamp(1.75rem,3.5vw,3rem)] overflow-hidden rounded-[1rem_2.75rem_2.75rem_2.75rem] bg-[linear-gradient(130deg,var(--color-lilac-mist),var(--color-lavender-soft))] px-[clamp(1.5rem,3vw,2.75rem)] py-[clamp(1.25rem,3.5vh,2rem)]">
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.5),transparent_70%)]" />
            <div className="pointer-events-none absolute -top-14 right-1/4 h-32 w-32 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-white/40" />

            <PaperFan />

            <div className="relative min-w-0 flex-1">
              <p className="eyebrow">
                <Sparkle className="h-3.5 w-3.5 text-lavender-deep" />
                {d.eyebrow}
              </p>
              <h2 id="documents-title" className="mt-1.5 text-[clamp(1.35rem,min(1.8vw,3.6vh),1.85rem)] leading-tight font-semibold text-ink">
                {d.title}
              </h2>
              <p className="mt-1.5 max-w-[36rem] text-[0.95rem] leading-relaxed text-ink-soft">{d.text}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {points.map(({ key, Icon, tint }) => (
                  <li key={key} className="flex items-center gap-1.5 rounded-full bg-white/75 py-1 pr-3 pl-1 text-[0.8rem] font-semibold text-ink">
                    <span className={`grid h-6 w-6 place-items-center rounded-full ${tint}`}>
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {d.points[key]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex shrink-0 flex-col items-center gap-2">
              <a href={site.documentsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <FolderOpen className="h-4.5 w-4.5" aria-hidden="true" />
                {d.open}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
              <p className="max-w-[15rem] text-center text-[0.78rem] leading-snug text-ink-soft">{d.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
