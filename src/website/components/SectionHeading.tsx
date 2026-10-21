import { Sparkle } from "@/shared/components/Decor";
import { cn } from "@/shared/utils/cn";

type Props = { eyebrow: string; title: string; text?: string; id?: string; className?: string };

/** Eyebrow + title (+ optional lead) used by the website sections. */
export function SectionHeading({ eyebrow, title, text, id, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow">
        <Sparkle className="h-3.5 w-3.5 text-lavender" />
        {eyebrow}
      </p>
      <h2 id={id} className="w-h2 mt-2 font-semibold text-ink">
        {title}
      </h2>
      {text && <p className="w-lead mt-2.5 text-ink-soft">{text}</p>}
    </div>
  );
}
