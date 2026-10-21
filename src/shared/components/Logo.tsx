import { cn } from "../utils/cn";

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

const sizes = {
  desktop: { mark: "h-10 w-10", text: "text-[1.4rem]" },
  mobile: { mark: "h-9 w-9", text: "text-[1.2rem] xs:text-[1.3rem]" },
};

type LogoProps = { className?: string; tone?: "dark" | "light"; size?: keyof typeof sizes };

export function Logo({ className, tone = "dark", size = "desktop" }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={cn("shrink-0", s.mark)} />
      <span className={cn("flex items-baseline gap-1 font-display leading-none font-bold tracking-[-0.03em]", s.text)}>
        <span className={tone === "dark" ? "text-ink" : "text-milk"}>Dameli</span>
        <span className={tone === "dark" ? "text-lavender-deep" : "text-lavender"}>MK</span>
      </span>
    </span>
  );
}
