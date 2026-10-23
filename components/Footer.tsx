import Link from "next/link";
import type { Content, Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";

const bookingCopy: Record<Locale, { note: string }> = {
  fr: { note: "Réservation gérée par notre conciergerie partenaire." },
  en: { note: "Booking managed by our concierge partner." },
  de: { note: "Buchung durch unseren Concierge-Partner." },
  nl: { note: "Boeking beheerd door onze conciërgepartner." },
  es: { note: "Reserva gestionada por nuestra conserjería colaboradora." },
};

export function Footer({ dict, locale }: { dict: Content; locale: Locale }) {
  const year = 2026;
  const booking = bookingCopy[locale];

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
            <Link href={localizedPath(locale, "/espaces")} className="w-fit hover:text-bronze-400">
              {dict.nav.spaces}
            </Link>
            <Link href={localizedPath(locale, "/galerie")} className="w-fit hover:text-bronze-400">
              {dict.nav.gallery}
            </Link>
            <Link href={localizedPath(locale, "/tarifs")} className="w-fit hover:text-bronze-400">
              {dict.nav.rates}
            </Link>
            <Link href={localizedPath(locale, "/labenne-ocean")} className="w-fit hover:text-bronze-400">
              {dict.nav.labenneOcean}
            </Link>
            <Link href={localizedPath(locale, "/boutique")} className="w-fit hover:text-bronze-400">
              {dict.nav.shop}
            </Link>
            <Link href={localizedPath(locale, "/contact")} className="w-fit hover:text-bronze-400">
              {dict.nav.contact}
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-sm text-sand-100/70">
            <p>{dict.footer.address}</p>
            <Link href={localizedPath(locale, "/boutique")} className="mt-3 w-fit text-xs text-bronze-400/80 hover:text-bronze-400">
              {dict.footer.phaseTwoNote}
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-sand-100/50">
              {booking.note}
            </p>
            <a
              href={`mailto:${dict.contact.contactEmail}`}
              className="w-fit text-xs text-sand-100/60 hover:text-bronze-400"
            >
              {dict.contact.contactEmail}
            </a>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-xs tracking-wide text-sand-100/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.site.name} — {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
