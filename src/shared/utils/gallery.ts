import type { SiteImage } from "@/lib/images";

export type Placed = { image: SiteImage; index: number };
export type Row = { items: Placed[]; ratio: number; complete: boolean };

/** Proportions used for a gallery tile: the real ones, with extreme panoramas/strips tamed. */
export const cardRatio = (image: SiteImage) => Math.min(Math.max(image.width / image.height, 0.7), 2);

/**
 * Justified rows: photos share a row height and keep their own proportions, so nothing is cropped
 * and edges line up. A row is complete once its combined width/height ratio reaches `target`
 * (or it holds `maxPerRow` photos). Rows only depend on earlier photos, so "show more" appends.
 */
export function justifiedRows(images: SiteImage[], target: number, maxPerRow: number): Row[] {
  const result: Row[] = [];
  let current: Row = { items: [], ratio: 0, complete: false };
  images.forEach((image, index) => {
    current.items.push({ image, index });
    current.ratio += cardRatio(image);
    if (current.ratio >= target || current.items.length === maxPerRow) {
      result.push({ ...current, complete: true });
      current = { items: [], ratio: 0, complete: false };
    }
  });
  if (current.items.length) result.push(current);
  return result;
}

/** Whole rows until at least `min` photos are visible. */
export function initialCount(rows: Row[], min: number) {
  let count = 0;
  for (const row of rows) {
    if (count >= min) break;
    count += row.items.length;
  }
  return count;
}

/** Rows that contain the first `count` photos. */
export function visibleRows(rows: Row[], count: number) {
  let seen = 0;
  return rows.filter((row) => {
    const show = seen < count;
    seen += row.items.length;
    return show;
  });
}
