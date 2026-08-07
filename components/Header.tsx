"use client";

import Link from "next/link";
import { useState } from "react";
import type { Content, Locale } from "@/lib/content";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const links = (dict: Content) => [
  { href: "/la-maison", label: dict.nav.house },
  { href: "/espaces", label: dict.nav.spaces },
  { href: "/galerie", label: dict.nav.gallery },
  { href: "/tarifs", label: dict.nav.rates },
  { href: "/boutique", label: dict.nav.shop, teaser: true },
  { href: "/contact", label: dict.nav.contact },
];

export function Header({ locale, dict }: { locale: Locale; dict: Content }) {
  const [open, setOpen] = useState(false);
  const navLinks = links(dict);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line/60 bg-sand-100/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
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

        <nav className="ml-10 hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium tracking-[0.14em] uppercase transition-colors hover:text-bronze-700 ${
                link.teaser ? "text-forest-950/50" : "text-forest-900"
              }`}
            >
              {link.label}
              {link.teaser && (
                <span className="ml-1.5 rounded-full border border-bronze-500/50 px-1.5 py-0.5 text-[9px] tracking-normal text-bronze-700 normal-case">
                  soon
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher current={locale} />
          <Link
            href="/tarifs"
            className="border border-bronze-600 bg-bronze-600 px-4 py-2 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
          >
            {dict.nav.bookCta}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
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
        <div className="fixed inset-x-0 top-[65px] bottom-0 z-40 flex flex-col justify-between bg-forest-950 px-8 py-10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
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
              href="/tarifs"
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
