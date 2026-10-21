import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Clubs } from "./sections/Clubs";
import { Contacts } from "./sections/Contacts";
import { Documents } from "./sections/Documents";
import { Gallery } from "./sections/Gallery";
import { Hero } from "./sections/Hero";
import { Schedule } from "./sections/Schedule";
import { Stats } from "./sections/Stats";
import type { SiteMedia } from "@/lib/images";

/** Laptop / desktop composition (≥ 1024 px). Styles: website.css. */
export function Website({ heroImage, aboutImage, aboutVideo, gallery }: SiteMedia) {
  return (
    <>
      <Header />
      <main id="main">
        <Hero image={heroImage} />
        <Stats />
        <About image={aboutImage} video={aboutVideo} />
        <Clubs />
        <Gallery images={gallery} />
        <Schedule />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
