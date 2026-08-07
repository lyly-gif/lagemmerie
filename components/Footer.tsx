import Link from "next/link";
import type { Content } from "@/lib/content";

export function Footer({ dict }: { dict: Content }) {
  const year = 2026;

  return (
    <footer className="grain border-t border-line/60 bg-forest-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- static
                  brand SVG; the horizontal logo's dark text is illegible on
                  this dark background, so only the bronze symbol goes here
                  (brief-logo-la-gemmerie.md §2, option A) */}
              <img
                src="/images/brand/la-gemmerie-alternative-gemme-symbole-monochrome.svg"
                alt=""
                width={18}
                height={22}
                className="h-[22px] w-auto"
              />
              <p className="font-display text-2xl text-sand-100 italic">{dict.site.name}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm text-sand-100/60">{dict.footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-sand-100/70">
            <Link href="/la-maison" className="w-fit hover:text-bronze-400">
              {dict.nav.house}
            </Link>
            <Link href="/espaces" className="w-fit hover:text-bronze-400">
              {dict.nav.spaces}
            </Link>
            <Link href="/galerie" className="w-fit hover:text-bronze-400">
              {dict.nav.gallery}
            </Link>
            <Link href="/tarifs" className="w-fit hover:text-bronze-400">
              {dict.nav.rates}
            </Link>
            <Link href="/contact" className="w-fit hover:text-bronze-400">
              {dict.nav.contact}
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-sm text-sand-100/70">
            <p>{dict.footer.address}</p>
            <p>{dict.site.domain}</p>
            <p className="mt-4 text-xs text-bronze-400/80">{dict.footer.phaseTwoNote}</p>
          </div>
        </div>

        <div className="hairline mt-12" />
        <p className="mt-6 text-xs tracking-wide text-sand-100/40">
          © {year} {dict.site.name} — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
