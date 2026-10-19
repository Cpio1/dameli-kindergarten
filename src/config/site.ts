import type { Lang } from "@/i18n/translations";

/** All facts about the kindergarten live here — the UI never hardcodes them. */
export const site = {
  legalName: { ru: "ТОО «Dameli MK»", kk: "«Dameli MK» ЖШС" },
  name: "Dameli MK",
  city: { ru: "Алматы", kk: "Алматы" },
  address: {
    ru: "г. Алматы, микрорайон Жетысу-3, дом 58",
    kk: "Алматы қ., Жетісу-3 шағын ауданы, 58-үй",
  },
  /** Query used for map links — the address exactly as provided by the kindergarten. */
  mapQuery: "Алматы, микрорайон Жетысу-3, 58",
  phone: {
    display: "+7 777 101 77 28",
    tel: "+77771017728",
  },
  whatsapp: "https://wa.me/77771017728",
  instagram: {
    handle: "@dameli.mk",
    url: "https://www.instagram.com/dameli.mk/",
  },
  hours: {
    opens: "08:00",
    closes: "18:30",
    display: "08:00–18:30",
  },
  groups: 4,
  ages: { from: 2, to: 6 },
  meals: 4,

  /**
   * 2GIS organization card. The exact point for «Жетысу-3, 58» could not be confirmed,
   * so the site links to an address search. When the card is known, set firmId and
   * coordinates — the page then embeds the official 2GIS map widget automatically.
   */
  twoGis: {
    city: "almaty",
    firmId: null as string | null,
    coordinates: null as { lat: number; lng: number } | null,
  },
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

function twoGisBase(lang: Lang) {
  return `https://2gis.kz${lang === "kk" ? "/kk" : ""}/${site.twoGis.city}`;
}

/** The organization card when known, otherwise a 2GIS search for the address. */
export function twoGisUrl(lang: Lang) {
  const { firmId } = site.twoGis;
  if (firmId) return `${twoGisBase(lang)}/firm/${firmId}`;
  return `${twoGisBase(lang)}/search/${encodeURIComponent(site.mapQuery)}`;
}

/** Directions to the kindergarten: precise 2GIS route when the card is known, address-based route otherwise. */
export function routeUrl(lang: Lang) {
  const { firmId, coordinates: c } = site.twoGis;
  if (firmId && c) {
    return `${twoGisBase(lang)}/directions/points/${encodeURIComponent(`|${c.lng},${c.lat};${firmId}`)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;
}

export function twoGisWidgetUrl() {
  const { firmId, coordinates: c, city } = site.twoGis;
  if (!firmId || !c) return null;
  const options = { pos: { lat: c.lat, lon: c.lng, zoom: 16 }, opt: { city }, org: firmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}

export const navIds = ["home", "about", "clubs", "gallery", "contacts"] as const;
export type NavId = (typeof navIds)[number];
