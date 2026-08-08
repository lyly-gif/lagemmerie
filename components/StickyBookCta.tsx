"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Content } from "@/lib/content";

// Mobile-only: the header's "Réserver" button is hidden behind the burger
// menu below lg, so without this a mobile visitor has to hunt for the CTA.
// Hidden on /tarifs itself since the real Hostaway widget is already there.
export function StickyBookCta({ dict }: { dict: Content }) {
  const pathname = usePathname();
  if (pathname === "/tarifs") return null;

  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-bronze-500/30 bg-sand-100/95 px-4 pt-3 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link
          href="/tarifs"
          className="block w-full border border-bronze-600 bg-bronze-600 py-3 text-center text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
        >
          {dict.home.ctaSecondary}
        </Link>
      </div>
    </>
  );
}
