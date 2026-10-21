import { Camera } from "lucide-react";
import { Cloud } from "./Decor";
import { cn } from "@/shared/utils/cn";

/** Calm illustrated stand-in shown until real photos are added to public/images. */
export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-lavender-soft via-milk to-sage-soft p-6 text-center",
        className,
      )}
    >
      <div className="absolute top-[14%] left-[16%] h-16 w-16 rounded-full bg-lavender/55 shadow-[0_0_0_14px_rgb(167_139_203/0.2)] sm:h-20 sm:w-20" />
      <Cloud className="absolute top-[22%] right-[10%] w-24 text-white/90 sm:w-32" />
      <Cloud className="absolute bottom-[18%] left-[6%] w-20 text-white/70" />
      <div className="absolute right-0 bottom-0 left-0 h-[28%] rounded-t-[50%] bg-sage/50" />
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white/90 text-lavender-deep shadow-soft">
        <Camera className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="relative max-w-[16rem] text-sm font-semibold text-ink-soft">{label}</p>
    </div>
  );
}
