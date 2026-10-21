"use client";

import { useCallback, useRef, useState } from "react";

/** State shared by both galleries: "show more" and the photo open in the lightbox. */
export function useGallery() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setActive(null), []);

  const toggle = () => {
    // collapsing from deep inside the gallery: bring its start back on screen
    if (expanded && (sectionRef.current?.getBoundingClientRect().top ?? 0) < 0) {
      sectionRef.current?.scrollIntoView({ block: "start" });
    }
    setExpanded(!expanded);
  };

  return { expanded, toggle, active, setActive, close, sectionRef };
}
