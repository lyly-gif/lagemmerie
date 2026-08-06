import Link from "next/link";
import type { Content } from "@/lib/content";

export function Footer({ dict }: { dict: Content }) {
  const year = 2026;

  return (
    <footer className="grain border-t border-line/60 bg-forest-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl italic">{dict.site.name}</p>
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
