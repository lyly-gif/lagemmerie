import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";

export type SeoPage = "home" | "spaces" | "labenneOcean" | "gallery" | "rates" | "contact" | "shop";

const paths: Record<SeoPage, string> = {
  home: "/",
  spaces: "/espaces",
  labenneOcean: "/labenne-ocean",
  gallery: "/galerie",
  rates: "/tarifs",
  contact: "/contact",
  shop: "/boutique",
};

const seoCopy: Record<Locale, Record<SeoPage, { title: string; description: string }>> = {
  fr: {
    home: { title: "Maison de vacances à Labenne-Océan avec piscine | La Gemmerie", description: "Maison landaise pour 8 personnes avec pool house indépendant et piscine chauffée, à 400 m de la plage de Labenne-Océan." },
    spaces: { title: "Maison familiale pour 8 personnes dans les Landes | La Gemmerie", description: "Découvrez les 5 espaces de vie, les 4 chambres et le pool house de La Gemmerie, pensés pour plusieurs familles à Labenne-Océan." },
    labenneOcean: { title: "Labenne-Océan : plage, nature et activités | La Gemmerie", description: "À 400 m de La Gemmerie : grande plage de Labenne-Océan, surf, vélo, nature et idées d’activités dans le sud des Landes." },
    gallery: { title: "Photos de La Gemmerie, maison à Labenne-Océan", description: "Visitez en images la maison landaise, le pool house, la piscine chauffée, les chambres et le jardin de La Gemmerie." },
    rates: { title: "Disponibilités et réservation à Labenne-Océan | La Gemmerie", description: "Consultez les disponibilités de La Gemmerie pour 8 personnes et poursuivez votre demande sur l’espace sécurisé de Première Vue." },
    contact: { title: "Contact et accès à La Gemmerie, Labenne-Océan", description: "Accès à La Gemmerie en voiture, train ou avion, informations sur le quartier et contact direct pour préparer votre séjour." },
    shop: { title: "La collection La Gemmerie — linge et bougies", description: "Une collection en préparation, inspirée par les matières, les couleurs et les gestes des Landes." },
  },
  en: {
    home: { title: "Holiday home with heated pool in Labenne Ocean | La Gemmerie", description: "A four-bedroom Landes home for 8, with an independent pool house and heated pool, 400 metres from Labenne Ocean beach." },
    spaces: { title: "A family holiday home for 8 in the Landes | La Gemmerie", description: "Explore five living spaces, four bedrooms and an independent pool house designed for families sharing a stay in Labenne Ocean." },
    labenneOcean: { title: "Labenne Ocean: beach, nature and activities | La Gemmerie", description: "Just 400 metres away: Labenne Ocean beach, surfing, cycling, nature reserves and days out in the southern Landes." },
    gallery: { title: "La Gemmerie photo gallery, Labenne Ocean", description: "Explore the Landes house, pool house, heated pool, bedrooms and garden of La Gemmerie through our photo gallery." },
    rates: { title: "Availability and booking in Labenne Ocean | La Gemmerie", description: "Check availability for La Gemmerie and continue your stay request securely with our concierge partner Première Vue." },
    contact: { title: "Contact and directions to La Gemmerie, Labenne Ocean", description: "How to reach La Gemmerie by car, train or air, neighbourhood information and direct contact for planning your stay." },
    shop: { title: "The La Gemmerie collection — linens and candles", description: "A forthcoming collection inspired by the materials, colours and crafts of the Landes." },
  },
  de: {
    home: { title: "Ferienhaus mit beheiztem Pool in Labenne-Océan | La Gemmerie", description: "Landes-Haus mit vier Schlafzimmern für 8 Gäste, eigenem Poolhaus und beheiztem Pool, 400 Meter vom Strand entfernt." },
    spaces: { title: "Familienferienhaus für 8 in den Landes | La Gemmerie", description: "Fünf Wohnbereiche, vier Schlafzimmer und ein unabhängiges Poolhaus für gemeinsame Ferien mehrerer Familien." },
    labenneOcean: { title: "Labenne-Océan: Strand, Natur und Aktivitäten | La Gemmerie", description: "Nur 400 Meter entfernt: Strand, Surfen, Radwege, Naturreservate und Ausflugsziele im Süden der Landes." },
    gallery: { title: "Fotogalerie von La Gemmerie in Labenne-Océan", description: "Entdecken Sie das Landes-Haus, Poolhaus, den beheizten Pool, die Schlafzimmer und den Garten in Bildern." },
    rates: { title: "Verfügbarkeit und Buchung in Labenne-Océan | La Gemmerie", description: "Prüfen Sie die Verfügbarkeit und senden Sie Ihre Aufenthaltsanfrage sicher über unseren Concierge-Partner Première Vue." },
    contact: { title: "Kontakt und Anreise zu La Gemmerie, Labenne-Océan", description: "Anreise mit Auto, Bahn oder Flugzeug, Informationen zur Umgebung und direkter Kontakt für Ihren Aufenthalt." },
    shop: { title: "Die La Gemmerie Kollektion — Textilien und Kerzen", description: "Eine Kollektion in Vorbereitung, inspiriert von Materialien, Farben und Handwerk der Landes." },
  },
  nl: {
    home: { title: "Vakantiehuis met verwarmd zwembad in Labenne-Océan | La Gemmerie", description: "Landes-huis met vier slaapkamers voor 8 gasten, zelfstandig poolhouse en verwarmd zwembad, op 400 meter van het strand." },
    spaces: { title: "Familievakantiehuis voor 8 in de Landes | La Gemmerie", description: "Ontdek vijf leefruimtes, vier slaapkamers en een zelfstandig poolhouse voor families die samen vakantie vieren." },
    labenneOcean: { title: "Labenne-Océan: strand, natuur en activiteiten | La Gemmerie", description: "Op 400 meter afstand: strand, surfen, fietsroutes, natuurgebieden en uitstapjes in het zuiden van de Landes." },
    gallery: { title: "Fotogalerij van La Gemmerie in Labenne-Océan", description: "Bekijk het Landes-huis, poolhouse, verwarmde zwembad, de slaapkamers en tuin van La Gemmerie." },
    rates: { title: "Beschikbaarheid en boeken in Labenne-Océan | La Gemmerie", description: "Bekijk de beschikbaarheid en verstuur uw aanvraag veilig via onze conciërgepartner Première Vue." },
    contact: { title: "Contact en route naar La Gemmerie, Labenne-Océan", description: "Bereikbaarheid per auto, trein of vliegtuig, informatie over de omgeving en rechtstreeks contact voor uw verblijf." },
    shop: { title: "De La Gemmerie-collectie — linnen en kaarsen", description: "Een collectie in voorbereiding, geïnspireerd door materialen, kleuren en ambachten uit de Landes." },
  },
  es: {
    home: { title: "Casa de vacaciones con piscina en Labenne-Océan | La Gemmerie", description: "Casa landesa de cuatro dormitorios para 8 huéspedes, pool house independiente y piscina climatizada, a 400 m de la playa." },
    spaces: { title: "Casa familiar para 8 personas en las Landas | La Gemmerie", description: "Descubra cinco espacios, cuatro dormitorios y un pool house independiente para varias familias en Labenne-Océan." },
    labenneOcean: { title: "Labenne-Océan: playa, naturaleza y actividades | La Gemmerie", description: "A 400 metros: playa, surf, rutas ciclistas, reservas naturales y planes en el sur de las Landas." },
    gallery: { title: "Galería de fotos de La Gemmerie, Labenne-Océan", description: "Descubra en imágenes la casa landesa, el pool house, la piscina climatizada, los dormitorios y el jardín." },
    rates: { title: "Disponibilidad y reserva en Labenne-Océan | La Gemmerie", description: "Consulte la disponibilidad y envíe su solicitud de forma segura con nuestra conserjería colaboradora Première Vue." },
    contact: { title: "Contacto y acceso a La Gemmerie, Labenne-Océan", description: "Cómo llegar en coche, tren o avión, información sobre el entorno y contacto directo para preparar su estancia." },
    shop: { title: "La colección La Gemmerie — textiles y velas", description: "Una colección en preparación, inspirada en los materiales, colores y oficios de las Landas." },
  },
};

const ogLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
  de: "de_DE",
  nl: "nl_NL",
  es: "es_ES",
};

const socialAlt: Record<Locale, string> = {
  fr: "Piscine chauffée et terrasse en bois de La Gemmerie à Labenne-Océan",
  en: "Heated pool and timber terrace at La Gemmerie in Labenne Ocean",
  de: "Beheizter Pool und Holzterrasse von La Gemmerie in Labenne-Océan",
  nl: "Verwarmd zwembad en houten terras van La Gemmerie in Labenne-Océan",
  es: "Piscina climatizada y terraza de madera de La Gemmerie en Labenne-Océan",
};

export function pagePath(page: SeoPage): string {
  return paths[page];
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, path)])),
    "x-default": localizedPath("fr", path),
  };
}

export function createLocalizedMetadata(locale: Locale, page: SeoPage): Metadata {
  const copy = seoCopy[locale][page];
  const path = localizedPath(locale, paths[page]);
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(paths[page]),
    },
    robots: page === "shop" ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      siteName: "La Gemmerie",
      title: copy.title,
      description: copy.description,
      url: path,
      images: [{
        url: "/images/featured/la-gemmerie-social.jpg",
        width: 1200,
        height: 630,
        alt: socialAlt[locale],
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/images/featured/la-gemmerie-social.jpg"],
    },
  };
}
