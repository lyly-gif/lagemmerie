"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Content, Locale } from "@/lib/content";
import { localizedPath, stripLocalePrefix } from "@/lib/i18n-routing";

// Mobile-only: the header's "Réserver" button is hidden behind the burger
// menu below lg, so without this a mobile visitor has to hunt for the CTA.
// Hidden on /tarifs itself since the real Hostaway widget is already there.
export function StickyBookCta({ dict, locale }: { dict: Content; locale: Locale }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const basePath = stripLocalePrefix(pathname);

  useEffect(() => {
    const update = () => {
      const threshold = basePath === "/" ? window.innerHeight * 0.8 : 320;
      setVisible(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [basePath]);

  if (basePath === "/tarifs") return null;

  return (
    <>
      <div aria-hidden className="h-20 xl:hidden" />
      <div
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-bronze-500/30 bg-sand-100/95 px-4 pt-3 backdrop-blur-sm transition-[transform,opacity] duration-300 xl:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link
          href={localizedPath(locale, "/tarifs")}
          className="block w-full border border-bronze-600 bg-bronze-600 py-3 text-center text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
        >
          {dict.home.ctaSecondary}
        </Link>
      </div>
    </>
  );
}
