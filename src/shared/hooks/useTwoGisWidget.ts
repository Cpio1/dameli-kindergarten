"use client";

import { useEffect, useRef, useState } from "react";
import { twoGisWidgetUrl } from "@/config/site";

/**
 * The official 2GIS widget, embedded only once the map frame comes near the viewport.
 * Without a confirmed 2GIS card (site.twoGis) `widget` is null and the map shows an illustration.
 */
export function useTwoGisWidget() {
  const widget = twoGisWidgetUrl();
  const frameRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  // touch screens: the map ignores gestures until tapped, so swiping over it scrolls the page
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !widget) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setLoad(true);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [widget]);

  return { widget, frameRef, load, active, activate: () => setActive(true) };
}
