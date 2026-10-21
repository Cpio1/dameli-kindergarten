import { MapPin } from "lucide-react";
import { cn } from "../utils/cn";

/** Abstract map illustration — decorative, not a real location. */
export function MapArt() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="400" height="400" fill="#E4EDE1" />
      <path d="M-20 120C80 90 160 160 260 130S380 60 440 80" stroke="#FFFFFF" strokeWidth="26" fill="none" />
      <path d="M-20 300C60 270 140 330 240 290S360 230 440 250" stroke="#FFFFFF" strokeWidth="18" fill="none" />
      <path d="M120 -20C110 80 150 200 120 420" stroke="#FFFFFF" strokeWidth="16" fill="none" />
      <path d="M300 -20C320 100 280 220 310 420" stroke="#FFFFFF" strokeWidth="12" fill="none" />
      <rect x="150" y="160" width="110" height="80" rx="22" fill="#E8DDF4" />
      <rect x="20" y="170" width="80" height="90" rx="24" fill="#B8D1B2" opacity="0.7" />
      <rect x="330" y="140" width="80" height="100" rx="24" fill="#E8DDF4" />
      <rect x="170" y="10" width="100" height="90" rx="26" fill="#B8D1B2" opacity="0.6" />
      <rect x="150" y="320" width="120" height="70" rx="24" fill="#E8DDF4" />
      <circle cx="60" cy="60" r="26" fill="#B8D1B2" />
    </svg>
  );
}

/** Lavender drop-shaped pin. */
export function MapMarker({ className }: { className?: string }) {
  return (
    <span className={cn("grid place-items-center rounded-[50%_50%_50%_0] bg-lavender shadow-lavender [transform:rotate(-45deg)]", className)}>
      <span className="[transform:rotate(45deg)]">
        <MapPin className="h-[45%] w-[45%] min-h-5 min-w-5 text-ink" aria-hidden="true" />
      </span>
    </span>
  );
}
