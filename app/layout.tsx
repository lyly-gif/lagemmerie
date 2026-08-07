import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lagemmerie.com"),
  title: {
    default: "La Gemmerie — maison landaise & piscine chauffée à Labenne-Océan",
    template: "%s — La Gemmerie",
  },
  description:
    "Maison landaise de 170 m² et pool house indépendant, piscine chauffée à l'année, à Labenne-Océan dans les Landes. Location saisonnière pour 10 personnes.",
  // No `keywords`: dropped per SEO audit — the tag carries no ranking
  // weight and was identical across every page anyway. Differentiation now
  // lives in each page's title/description (tarifs-et-seo-la-gemmerie.md §2).
};

// Street address still pending (cahier des charges §8) — locality-level
// address only until it's confirmed. Update once figée.
const lodgingBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "La Gemmerie",
  description:
    "Maison landaise avec pool house indépendant et piscine chauffée à l'année, pour 10 personnes, à Labenne-Océan (Landes).",
  url: "https://lagemmerie.com",
  image: "https://lagemmerie.com/images/featured/hero-piscine-jour.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Labenne-Océan",
    addressRegion: "Nouvelle-Aquitaine",
    postalCode: "40530",
    addressCountry: "FR",
  },
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Piscine chauffée",
      value: true,
    },
  ],
  numberOfRooms: 4,
  maximumAttendeeCapacity: 10,
};

export default async function RootLayout(props: LayoutProps<"/">) {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${karla.variable}`}>
      <body className="bg-sand-100 text-forest-950 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd) }}
        />
        <Header locale={locale} dict={dict} />
        <main>{props.children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
