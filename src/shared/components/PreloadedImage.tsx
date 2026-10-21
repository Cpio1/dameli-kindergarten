import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { SiteImage } from "@/lib/images";
import { LayoutPicture } from "./LayoutPicture";

type Props = {
  image: SiteImage;
  alt: string;
  sizes: string;
  /** Media query of the layout that shows this photo — the preload hint only fires there. */
  media: string;
  className?: string;
};

/**
 * Above-the-fold photo that fills its frame. Both layouts are in the server HTML, so a plain
 * `priority` image would be fetched twice. Instead the image itself is lazy (a hidden one is never
 * requested) and a `<link rel=preload media=…>` with the same srcset starts the visible one early.
 */
export function PreloadedImage({ image, alt, sizes, media, className }: Props) {
  const { props } = getImageProps({ src: image.src, alt, fill: true, sizes });
  preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high", media });
  return (
    <LayoutPicture media={media}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- props come from next/image */}
      <img {...props} loading="lazy" fetchPriority="high" decoding="async" className={className} />
    </LayoutPicture>
  );
}
