/**
 * Removes black letterbox bars from photos (screenshots from phones / Instagram often have them).
 *
 * Runs automatically before `npm run dev` and `npm run build`. Originals in public/images are never
 * modified: trimmed copies go to public/_trimmed/<same path>, and src/lib/images.ts picks them up.
 * Only uniform, near-black edges are removed — the photo itself is never cropped.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT_DIR = path.join(PUBLIC_DIR, "_trimmed");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SPECIAL = /^main-page2?$/i;

/** A line counts as a bar when it is dark and almost flat. */
const MAX_LUMA = 28;
const MAX_SPREAD = 9;
/** Ignore bars thinner than this share of the side — not worth a re-encode. */
const MIN_BAR = 0.015;
/** Extra pixels removed past the bar edge to drop JPEG ringing. */
const SAFETY = 2;

function lineIsBar(data, width, channels, start, step, count) {
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let k = 0; k < count; k += 2) {
    const i = (start + k * step) * channels;
    const luma = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    sum += luma;
    sumSq += luma * luma;
    n++;
  }
  const mean = sum / n;
  return mean < MAX_LUMA && Math.sqrt(Math.max(sumSq / n - mean * mean, 0)) < MAX_SPREAD;
}

async function contentBox(file) {
  const { data, info } = await sharp(file).rotate().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const row = (y) => lineIsBar(data, w, c, y * w, 1, w);
  const col = (x) => lineIsBar(data, w, c, x, w, h);

  let top = 0;
  while (top < h && row(top)) top++;
  if (top === h) return null; // fully dark image — leave it alone
  let bottom = h;
  while (bottom > top && row(bottom - 1)) bottom--;
  let left = 0;
  while (left < w && col(left)) left++;
  let right = w;
  while (right > left && col(right - 1)) right--;

  const pad = (bar, side) => (bar >= side * MIN_BAR ? bar + SAFETY : 0);
  const t = pad(top, h);
  const b = pad(h - bottom, h);
  const l = pad(left, w);
  const r = pad(w - right, w);
  if (!t && !b && !l && !r) return null;
  return { left: l, top: t, width: w - l - r, height: h - t - b };
}

function encode(pipeline, ext) {
  switch (ext) {
    case ".png":
      return pipeline.png({ compressionLevel: 9 });
    case ".webp":
      return pipeline.webp({ quality: 92 });
    case ".avif":
      return pipeline.avif({ quality: 70 });
    default:
      return pipeline.jpeg({ quality: 92, chromaSubsampling: "4:4:4" });
  }
}

function sources() {
  const list = (dir, filter) => {
    try {
      return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isFile() && !e.name.startsWith(".") && SUPPORTED.has(path.extname(e.name).toLowerCase()))
        .map((e) => e.name)
        .filter(filter)
        .map((name) => path.join(dir, name));
    } catch {
      return [];
    }
  };
  return [
    ...list(path.join(PUBLIC_DIR, "images"), () => true),
    ...list(PUBLIC_DIR, (name) => SPECIAL.test(path.basename(name, path.extname(name)))),
  ];
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });

let trimmed = 0;
for (const file of sources()) {
  try {
    const box = await contentBox(file);
    if (!box) continue;
    const out = path.join(OUT_DIR, path.relative(PUBLIC_DIR, file));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await encode(sharp(file).rotate().extract(box), path.extname(file).toLowerCase()).toFile(out);
    trimmed++;
  } catch (error) {
    console.warn(`[photos] skipped ${path.relative(PUBLIC_DIR, file)}: ${error.message}`);
  }
}
console.log(`[photos] letterbox bars removed from ${trimmed} photo(s)`);
