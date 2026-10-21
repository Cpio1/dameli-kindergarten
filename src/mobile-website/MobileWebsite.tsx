import { MobileFooter } from "./components/MobileFooter";
import { MobileHeader } from "./components/MobileHeader";
import { MobileAbout } from "./sections/MobileAbout";
import { MobileClubs } from "./sections/MobileClubs";
import { MobileContacts } from "./sections/MobileContacts";
import { MobileDocuments } from "./sections/MobileDocuments";
import { MobileGallery } from "./sections/MobileGallery";
import { MobileHero } from "./sections/MobileHero";
import { MobileSchedule } from "./sections/MobileSchedule";
import { MobileStats } from "./sections/MobileStats";
import type { SiteMedia } from "@/lib/images";

/** Phone / tablet composition (< 1024 px). Styles: mobile.css. */
export function MobileWebsite({ heroImage, aboutImage, aboutVideo, gallery }: SiteMedia) {
  return (
    <>
      <MobileHeader />
      <main id="main">
        <MobileHero image={heroImage} />
        <MobileStats />
        <MobileAbout image={aboutImage} video={aboutVideo} />
        <MobileClubs />
        <MobileGallery images={gallery} />
        <MobileSchedule />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
    </>
  );
}
