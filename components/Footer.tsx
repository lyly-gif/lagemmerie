import Link from "next/link";
import type { Content } from "@/lib/content";

export function Footer({ dict }: { dict: Content }) {
  const year = 2026;

  return (
    <footer className="grain border-t border-line/60 bg-forest-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element -- static
                brand SVG; white-text variant supplied by the owner for dark
                backgrounds (audit-complet-v2 §8) */}
            <img
              src="/images/brand/la-gemmerie-alternative-gemme-horizontal-texte-blanc.svg"
              alt="La Gemmerie"
              width={196}
              height={27}
              className="h-[28px] w-auto"
            />
            <p className="mt-3 max-w-xs text-sm text-sand-100/60">{dict.footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-sand-100/70">
            <Link href="/espaces" className="w-fit hover:text-bronze-400">
              {dict.nav.spaces}
            </Link>
            <Link href="/labenne-ocean" className="w-fit hover:text-bronze-400">
              {dict.nav.labenneOcean}
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
