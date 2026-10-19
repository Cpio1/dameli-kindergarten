"use client";

import { AnimatePresence, m } from "motion/react";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { Sparkle } from "./decor/Decor";
import { navIds, site, type NavId } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

/** Highlights the nav item of the section currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<NavId>("home");

  useEffect(() => {
    const sections = navIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
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
  }, []);

  return active;
}

export function Header() {
  const { t, lang } = useLanguage();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Mobile menu: lock page scroll, close on Escape / when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mql = window.matchMedia("(min-width: 64rem)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onChange);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,box-shadow] duration-300",
          scrolled || open ? "bg-milk/85 backdrop-blur-md shadow-[0_8px_30px_-20px_rgb(53_45_69/0.35)]" : "bg-transparent",
        )}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-2 lg:h-20">
          <a href="#home" className="shrink-0 rounded-2xl" aria-label={t.header.homeLink} onClick={close}>
            <Logo />
          </a>

          <nav aria-label={t.header.menu} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-[inset_0_0_0_1px_rgb(53_45_69/0.06)]">
              {navIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors duration-300",
                      active === id ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {active === id && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-lavender-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.nav[id]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
            <LanguageSwitch />
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-dark hidden !py-2.5 lg:inline-flex">
              {t.header.contact}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-milk transition-transform active:scale-95 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto overscroll-contain bg-milk lg:hidden"
          >
            <Sparkle className="absolute right-10 bottom-52 h-6 w-6 text-lavender" />
            <div className="pointer-events-none absolute -right-20 bottom-24 h-56 w-56 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-lavender-soft" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-sage-soft" />

            <nav aria-label={t.header.menu} className="container-page relative flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <ul className="space-y-1">
                {navIds.map((id, i) => (
                  <m.li
                    key={id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={close}
                      aria-current={active === id ? "true" : undefined}
                      className="flex items-center justify-between rounded-2xl py-3 font-display text-[1.65rem] font-semibold text-ink"
                    >
                      {t.nav[id]}
                      {active === id && <span className="h-2.5 w-2.5 rounded-full bg-lavender" aria-hidden="true" />}
                    </a>
                  </m.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contacts.whatsapp}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${site.phone.tel}`} className="btn btn-ghost">
                    <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                    {t.contacts.call}
                  </a>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <InstagramIcon className="h-4.5 w-4.5" />
                    Instagram
                    <span className="sr-only">({t.a11y.newTab})</span>
                  </a>
                </div>
                <p className="flex items-start gap-2 pt-2 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lavender-deep" aria-hidden="true" />
                  {site.address[lang]}
                </p>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
