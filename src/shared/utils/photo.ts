import type { SiteImage } from "@/lib/images";

/** Width / height of a photo, kept within a range so extreme shapes don't break a frame. */
export function photoRatio(image: SiteImage | null, min: number, max: number, fallback: number) {
  if (!image) return fallback;
  return Math.min(Math.max(image.width / image.height, min), max);
}
