import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { Wave } from "@/components/decor/Decor";
import { Gallery } from "@/components/gallery/Gallery";
import { About } from "@/components/sections/About";
import { Clubs } from "@/components/sections/Clubs";
import { Contacts } from "@/components/sections/Contacts";
import { Hero } from "@/components/sections/Hero";
import { Schedule } from "@/components/sections/Schedule";
import { Stats } from "@/components/sections/Stats";
import { getGalleryImages, getSpecialImage, getSpecialVideo } from "@/lib/images";

export default function Home() {
  // Read at build time: drop photos into public/images and rebuild/redeploy.
  const heroImage = getSpecialImage("main-page");
  const aboutVideo = getSpecialVideo("main-page2");
  const aboutImage = aboutVideo ? null : getSpecialImage("main-page2");
  const gallery = getGalleryImages();

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero image={heroImage} />
        <Stats />
        <About image={aboutImage} video={aboutVideo} />
        <Wave flip className="h-10 text-white sm:h-14" />
        <Clubs />
        <Wave className="h-10 text-white sm:h-14" />
        <Gallery images={gallery} />
        <Wave flip className="h-10 text-white sm:h-14" />
        <Schedule />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
