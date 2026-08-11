import Link from "next/link";
import type { Content, Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";

const bookingCopy: Record<Locale, { note: string; privacy: string; terms: string; path: string }> = {
  fr: { note: "Demandes de séjour et paiements sécurisés gérés par notre conciergerie partenaire Première Vue.", privacy: "Confidentialité de la réservation", terms: "CGV de la réservation", path: "fr/" },
  en: { note: "Stay requests and secure payments are managed by our concierge partner Première Vue.", privacy: "Booking privacy", terms: "Booking terms", path: "" },
  de: { note: "Aufenthaltsanfragen und sichere Zahlungen werden von unserem Concierge-Partner Première Vue verwaltet.", privacy: "Datenschutz bei der Buchung", terms: "Buchungsbedingungen", path: "de/" },
  nl: { note: "Verblijfsaanvragen en beveiligde betalingen worden beheerd door onze conciërgepartner Première Vue.", privacy: "Privacy bij boeken", terms: "Boekingsvoorwaarden", path: "" },
  es: { note: "Las solicitudes y los pagos seguros son gestionados por nuestra conserjería colaboradora Première Vue.", privacy: "Privacidad de la reserva", terms: "Condiciones de reserva", path: "es/" },
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
            <p>{dict.site.domain}</p>
            <Link href={localizedPath(locale, "/boutique")} className="mt-3 w-fit text-xs text-bronze-400/80 hover:text-bronze-400">
              {dict.footer.phaseTwoNote}
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-sand-100/50">
              {booking.note}
            </p>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-xs tracking-wide text-sand-100/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.site.name} — {dict.footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`https://premierevue.holidayfuture.com/${booking.path}privacy-policy`}
              className="transition-colors hover:text-bronze-400"
            >
              {booking.privacy}
            </a>
            <a
              href={`https://premierevue.holidayfuture.com/${booking.path}pages/cgv`}
              className="transition-colors hover:text-bronze-400"
            >
              {booking.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
