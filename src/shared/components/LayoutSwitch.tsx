"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { DESKTOP_QUERY, type Layout } from "../utils/layout";

type Snapshot = Layout | "both";

/** Section the reader is on, measured while scrolling at a settled window width. */
let lastSection: string | null = null;
/** Section to restore after the window crossed the breakpoint. */
let anchor: string | null = null;

function sectionOnScreen() {
  let id: string | null = null;
  for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
    if (section.getClientRects().length && section.getBoundingClientRect().top <= window.innerHeight * 0.3) id = section.id;
  }
  return id;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  const handler = () => {
    // Not measured now: by the time this fires the old layout has already reflowed at the new width.
    anchor = lastSection;
    onChange();
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

const getSnapshot = (): Snapshot => (window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile");
// The server can't know the screen: it renders both compositions and CSS shows the right one.
const getServerSnapshot = (): Snapshot => "both";

/**
 * Chooses the website or the mobile website by screen width (never by user agent).
 * - Server HTML and hydration contain both trees; a media query in globals.css hides the wrong one,
 *   so there is no hydration mismatch and no jump. Hidden photos are lazy and never requested.
 * - Right after hydration the hidden tree is unmounted: one set of section ids, observers and media.
 * - Resizing across the breakpoint swaps trees and keeps the reader on the same section.
 */
/** Keeps `lastSection` up to date; measurements pause while the window is being resized. */
function useSectionTracking() {
  useEffect(() => {
    let width = window.innerWidth;
    let frame = 0;
    let settle = 0;
    const measure = () => {
      if (window.innerWidth === width) lastSection = sectionOnScreen();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const onResize = () => {
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        width = window.innerWidth;
        measure();
      }, 250);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

export function LayoutSwitch({ website, mobile }: { website: React.ReactNode; mobile: React.ReactNode }) {
  const layout = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const first = useRef(true);
  useSectionTracking();

  useLayoutEffect(() => {
    if (layout === "both") return;
    const root = document.documentElement;
    // From now on React decides which tree exists — the CSS fallback steps aside.
    root.dataset.layout = layout;

    let target = anchor;
    anchor = null;
    // On first load the browser may have tried to scroll to an id inside the hidden tree.
    if (first.current && !target && window.location.hash.length > 1) target = decodeURIComponent(window.location.hash.slice(1));
    first.current = false;
    if (target) document.getElementById(target)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [layout]);

  return (
    <>
      {layout !== "mobile" && <div className="website-root">{website}</div>}
      {layout !== "desktop" && <div className="mobile-root">{mobile}</div>}
    </>
  );
}
