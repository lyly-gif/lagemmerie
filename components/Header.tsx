"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Content, Locale } from "@/lib/content";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { localizedPath, stripLocalePrefix } from "@/lib/i18n-routing";

const menuLabels: Record<Locale, [string, string]> = {
  fr: ["Ouvrir le menu", "Fermer le menu"],
  en: ["Open menu", "Close menu"],
  de: ["Menü öffnen", "Menü schließen"],
  nl: ["Menu openen", "Menu sluiten"],
  es: ["Abrir menú", "Cerrar menú"],
};

const links = (dict: Content, locale: Locale) => [
  { href: localizedPath(locale, "/espaces"), label: dict.nav.spaces },
  { href: localizedPath(locale, "/galerie"), label: dict.nav.gallery },
  { href: localizedPath(locale, "/tarifs"), label: dict.nav.rates },
  { href: localizedPath(locale, "/labenne-ocean"), label: dict.nav.labenneOcean },
  { href: localizedPath(locale, "/boutique"), label: dict.nav.shop, teaser: true },
  { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
];

export function Header({ locale, dict }: { locale: Locale; dict: Content }) {
  const [open, setOpen] = useState(false);
  const navLinks = links(dict, locale);
  const pathname = usePathname();
  const activePath = stripLocalePrefix(pathname);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line/60 bg-sand-100/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href={localizedPath(locale, "/")} onClick={() => setOpen(false)} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- static
              brand SVG; next/image's raster pipeline adds nothing for vectors */}
          <img
            src="/images/brand/la-gemmerie-alternative-gemme-horizontal.svg"
            alt="La Gemmerie"
            width={196}
            height={27}
            className="h-[27px] w-auto"
          />
        </Link>

        <nav className="ml-8 hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={activePath === stripLocalePrefix(link.href) ? "page" : undefined}
              className={`text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:text-bronze-700 ${
                activePath === stripLocalePrefix(link.href)
                  ? "text-bronze-700"
                  : link.teaser ? "text-forest-950/55" : "text-forest-900"
              }`}
            >
              {link.label}
              {link.teaser && (
                <span className="ml-1.5 rounded-full border border-bronze-500/50 px-1.5 py-0.5 text-[9px] tracking-normal text-bronze-700 normal-case">
                  {dict.nav.soonLabel}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher current={locale} />
          <Link
            href={localizedPath(locale, "/tarifs")}
            className="border border-bronze-600 bg-bronze-600 px-4 py-2 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
          >
            {dict.nav.bookCta}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? menuLabels[locale][1] : menuLabels[locale][0]}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600 xl:hidden"
        >
          <span
            className={`h-px w-6 bg-forest-950 transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-forest-950 transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>
    </header>

      {open && (
        <div id="mobile-navigation" className="fixed inset-x-0 top-[65px] bottom-0 z-50 flex flex-col justify-between overflow-y-auto bg-forest-950 px-8 py-8 xl:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={activePath === stripLocalePrefix(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-reveal border-b border-sand-50/10 py-4 font-display text-3xl italic text-sand-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between">
            <LanguageSwitcher current={locale} variant="dark" />
            <Link
              href={localizedPath(locale, "/tarifs")}
              onClick={() => setOpen(false)}
              className="border border-bronze-500 bg-bronze-500 px-4 py-2 text-xs font-medium tracking-[0.14em] text-forest-950 uppercase"
            >
              {dict.nav.bookCta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
