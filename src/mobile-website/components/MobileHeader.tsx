"use client";

import { AnimatePresence, m } from "motion/react";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/shared/components/BrandIcons";
import { Sparkle } from "@/shared/components/Decor";
import { LanguageSwitch } from "@/shared/components/LanguageSwitch";
import { Logo } from "@/shared/components/Logo";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/utils/cn";

/** 3.5 rem header with a full-screen menu sheet. */
export function MobileHeader() {
  const { t, lang } = useLanguage();
  const active = useActiveSection(".mobile-root");
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Menu open: lock page scroll, close on Escape. Unmounting (switch to desktop) restores both.
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
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-300",
          scrolled || open ? "bg-milk/90 shadow-[0_8px_24px_-18px_rgb(53_45_69/0.4)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="m-container flex h-14 items-center justify-between gap-2">
          <a href="#home" className="shrink-0 rounded-2xl" aria-label={t.header.homeLink} onClick={close}>
            <Logo size="mobile" />
          </a>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-milk transition-transform active:scale-95"
            >
              {open ? <X className="h-4.5 w-4.5" aria-hidden="true" /> : <Menu className="h-4.5 w-4.5" aria-hidden="true" />}
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] bottom-0 overflow-y-auto overscroll-contain bg-milk"
          >
            <Sparkle className="absolute right-8 bottom-44 h-5 w-5 text-lavender" />
            <div className="pointer-events-none absolute -right-16 bottom-20 h-44 w-44 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-lavender-soft" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-sage-soft" />

            <nav aria-label={t.header.menu} className="m-container relative flex min-h-full flex-col pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <ul>
                {navIds.map((id, i) => (
                  <m.li key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.035, duration: 0.26 }}>
                    <a
                      href={`#${id}`}
                      onClick={close}
                      aria-current={active === id ? "true" : undefined}
                      className="flex items-center justify-between rounded-2xl py-2.5 font-display text-[1.4rem] font-semibold text-ink"
                    >
                      {t.nav[id]}
                      {active === id && <span className="h-2 w-2 rounded-full bg-lavender" aria-hidden="true" />}
                    </a>
                  </m.li>
                ))}
              </ul>

              <div className="mt-auto space-y-2.5 pt-6">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contacts.whatsapp}
                  <span className="sr-only">({t.a11y.newTab})</span>
                </a>
                <div className="grid grid-cols-2 gap-2.5 [&>a]:px-2 [&>a]:text-[0.86rem] xs:[&>a]:text-[0.95rem]">
                  <a href={`tel:${site.phone.tel}`} className="btn btn-ghost">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {t.contacts.call}
                  </a>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <InstagramIcon className="h-4 w-4" />
                    Instagram
                    <span className="sr-only">({t.a11y.newTab})</span>
                  </a>
                </div>
                <p className="flex items-start gap-2 pt-1 text-sm text-ink-soft">
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
