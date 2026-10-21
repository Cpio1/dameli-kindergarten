import { cn } from "@/shared/utils/cn";

type DecorProps = { className?: string; style?: React.CSSProperties };

/** Four-point sparkle star. */
export function Sparkle({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path
        d="M12 0c.9 6.3 4.7 10.6 12 12-7.3 1.4-11.1 5.7-12 12-.9-6.3-4.7-10.6-12-12C7.3 10.6 11.1 6.3 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Soft asymmetric blob. */
export function Blob({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path
        d="M147 30c25 17 42 47 37 77-5 31-31 61-64 72-33 10-72 1-92-24C8 130 7 92 22 62 37 33 69 12 99 11c17 0 32 7 48 19z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Abstract petal. */
export function Petal({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 60 90" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path d="M30 2C50 20 60 45 52 66 46 82 38 88 30 88S14 82 8 66C0 45 10 20 30 2z" fill="currentColor" />
    </svg>
  );
}

/** Small cloud. */
export function Cloud({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 120 64" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path
        d="M30 62C14 62 2 52 2 39s11-22 24-22c3-9 12-15 23-15 13 0 23 9 25 20 3-2 7-3 11-3 14 0 24 10 24 22 0 12-10 21-23 21z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Thin flowing outline. */
export function Squiggle({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path
        d="M2 30c14-24 28-24 40-6s26 18 38 0 26-18 38 0 26 18 40-6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Dashed orbit ring. */
export function Orbit({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={cn("pointer-events-none", className)} style={style} aria-hidden="true">
      <path
        d="M100 6c52 0 94 38 94 90s-46 98-98 98S6 150 6 98 48 6 100 6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Full-width wave used between sections. `flip` turns it upside down. */
export function Wave({ className, flip, fill = "currentColor" }: { className?: string; flip?: boolean; fill?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block w-full", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <path
        d="M0 64c120-34 260-58 420-40 170 19 250 76 430 78 170 2 260-62 400-70 80-5 140 6 190 20v88H0z"
        fill={fill}
      />
    </svg>
  );
}
