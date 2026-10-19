import type { Metadata, Viewport } from "next";
import { Lora, Montserrat_Alternates, Nunito } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SITE_URL, site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import "./globals.css";

// cyrillic-ext covers the Kazakh letters Ә Ғ Қ Ң Ө Ұ Ү Һ І — all three faces ship them.
const heading = Montserrat_Alternates({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const body = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});
const accent = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});

const ru = dictionaries.ru.meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ru.title,
  description: ru.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: ["детский сад Алматы", "Dameli MK", "Жетысу-3", "балабақша Алматы", "частный детский сад"],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    alternateLocale: ["kk_KZ"],
    url: "/",
    siteName: site.name,
    title: ru.title,
    description: ru.description,
  },
  twitter: { card: "summary_large_image", title: ru.title, description: ru.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: site.name,
  legalName: site.legalName.ru,
  url: SITE_URL,
  telephone: site.phone.tel,
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "микрорайон Жетысу-3, дом 58",
    addressLocality: "Алматы",
    addressCountry: "KZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable} ${accent.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
