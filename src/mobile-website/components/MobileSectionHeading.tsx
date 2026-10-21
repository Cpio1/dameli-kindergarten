import { Sparkle } from "@/shared/components/Decor";
import { cn } from "@/shared/utils/cn";

type Props = { eyebrow: string; title: string; text?: string; id?: string; className?: string };

/** Eyebrow + title (+ optional short lead) used by the mobile sections. */
export function MobileSectionHeading({ eyebrow, title, text, id, className }: Props) {
  return (
    <div className={className}>
      <p className={cn("eyebrow !text-[0.82rem]")}>
        <Sparkle className="h-3 w-3 text-lavender" />
        {eyebrow}
      </p>
      <h2 id={id} className="m-h2 mt-1.5 font-semibold text-ink">
        {title}
      </h2>
      {text && <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>}
    </div>
  );
}
