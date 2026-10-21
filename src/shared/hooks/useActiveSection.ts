"use client";

import { useEffect, useState } from "react";
import { navIds, type NavId } from "@/config/site";

/**
 * Highlights the nav item of the section currently in the middle of the viewport.
 * `scope` is the layout root (".website-root" / ".mobile-root"): both layouts use the same section
 * ids, so lookups must stay inside the composition that is on screen.
 */
export function useActiveSection(scope: string) {
  const [active, setActive] = useState<NavId>("home");

  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;
    const sections = navIds
      .map((id) => root.querySelector<HTMLElement>(`#${id}`))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as NavId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [scope]);

  return active;
}
