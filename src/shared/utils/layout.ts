/**
 * The single switch point between the two compositions. Laptops and desktops (≥ 1024 px) get the
 * website, phones and tablets get the mobile website. Keep in sync with the CSS in globals.css.
 */
export const DESKTOP_QUERY = "(min-width: 64rem)";
export const MOBILE_QUERY = "(max-width: 63.999rem)";

export type Layout = "desktop" | "mobile";

/** Media query of the other composition. */
export const otherQuery = (media: string) => (media === DESKTOP_QUERY ? MOBILE_QUERY : DESKTOP_QUERY);
