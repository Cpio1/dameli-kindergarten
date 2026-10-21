import { MobileWebsite } from "@/mobile-website/MobileWebsite";
import { LayoutSwitch } from "@/shared/components/LayoutSwitch";
import { SkipLink } from "@/shared/components/SkipLink";
import { Website } from "@/website/Website";
import { getGalleryImages, getSpecialImage, getSpecialVideo, type SiteMedia } from "@/lib/images";

export default function Home() {
  // Read at build time: drop photos into public/images and rebuild/redeploy.
  const aboutVideo = getSpecialVideo("main-page2");
  const media: SiteMedia = {
    heroImage: getSpecialImage("main-page"),
    aboutVideo,
    aboutImage: aboutVideo ? null : getSpecialImage("main-page2"),
    gallery: getGalleryImages(),
  };

  return (
    <>
      <SkipLink />
      <LayoutSwitch website={<Website {...media} />} mobile={<MobileWebsite {...media} />} />
    </>
  );
}
