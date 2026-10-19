import { cn } from "@/lib/cn";

/** Dameli MK mark: a soft five-petal flower-sun with a deep-lavender heart and a sage leaf. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <g transform="translate(24 23)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-10.5"
            rx="7.2"
            ry="10"
            transform={`rotate(${angle})`}
            fill={i % 2 === 0 ? "#A78BCB" : "#C9B6E4"}
          />
        ))}
        <circle r="7.4" fill="#FAF7F0" />
        <circle r="4.6" fill="#7C5FA6" />
        <circle cx="-1.4" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.85" />
      </g>
      <path d="M36.5 38.5c3.8-.6 7-3.4 7.6-7.4-3.9.3-7 2.9-7.6 7.4z" fill="#B8D1B2" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2 xs:gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0 xs:h-10 xs:w-10 sm:h-11 sm:w-11" />
      <span className="flex items-baseline gap-1 font-display text-[1.15rem] leading-none xs:text-[1.35rem] font-bold tracking-[-0.03em] sm:text-2xl">
        <span className={tone === "dark" ? "text-ink" : "text-milk"}>Dameli</span>
        <span className={tone === "dark" ? "text-lavender-deep" : "text-lavender"}>MK</span>
      </span>
    </span>
  );
}
