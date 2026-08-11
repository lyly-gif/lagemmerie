import type { Content, Locale } from "@/lib/content";

const NOTIFY_EMAIL = "contact@lagemmerie.com";
const subjects: Record<Locale, string> = {
  fr: "Être averti·e — La Gemmerie côté produits",
  en: "Collection launch updates — La Gemmerie",
  de: "Über den Kollektionstart informiert werden — La Gemmerie",
  nl: "Op de hoogte blijven van de collectie — La Gemmerie",
  es: "Aviso del lanzamiento de la colección — La Gemmerie",
};

export function ProductNotifyForm({ dict, locale }: { dict: Content; locale: Locale }) {
  const n = dict.shop.notify;
  const href = `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent(subjects[locale])}`;

  return (
    <div className="border border-line bg-sand-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
      <div>
        <p className="font-display text-xl text-forest-950 italic">{n.title}</p>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-forest-800/70">
          {n.reassurance}
        </p>
      </div>
      <a
        href={href}
        className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center border border-bronze-600 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-700 sm:mt-0"
      >
        {n.submit}
      </a>
    </div>
  );
}
