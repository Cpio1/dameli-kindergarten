"use client";

import { ArrowUpRight, FileText, FolderOpen } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Petal, Sparkle } from "@/shared/components/Decor";
import { Reveal } from "@/shared/components/Reveal";

/** One card: folder icon, title, short text and the Google Drive button. */
export function MobileDocuments() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" aria-labelledby="m-documents-title" className="relative pb-8">
      <div className="m-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[0.75rem_2rem_2rem_2rem] bg-[linear-gradient(140deg,var(--color-lilac-mist),var(--color-lavender-soft))] p-4 xs:p-5">
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(184_209_178/0.5),transparent_70%)]" />
            <Petal className="absolute top-4 right-5 w-4.5 rotate-[30deg] text-sage" />

            <div className="relative flex items-center gap-3">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-white shadow-soft" aria-hidden="true">
                <FolderOpen className="h-5.5 w-5.5 text-lavender-deep" />
                <span className="absolute -right-1.5 -bottom-1 grid h-6 w-6 place-items-center rounded-full bg-sage">
                  <FileText className="h-3 w-3 text-ink" />
                </span>
              </span>
              <div className="min-w-0">
                <p className="eyebrow !text-[0.78rem]">
                  <Sparkle className="h-3 w-3 text-lavender-deep" />
                  {d.eyebrow}
                </p>
                <h2 id="m-documents-title" className="text-[1.2rem] leading-tight font-semibold text-ink xs:text-[1.3rem]">
                  {d.title}
                </h2>
              </div>
            </div>

            <p className="relative mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{d.text}</p>

            <a href={site.documentsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark relative mt-4 w-full">
              <FolderOpen className="h-4.5 w-4.5" aria-hidden="true" />
              {d.open}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            <p className="relative mt-2 text-center text-[0.76rem] text-ink-soft">{d.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
