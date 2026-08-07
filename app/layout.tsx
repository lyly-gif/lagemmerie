import type { Metadata } from "next";
import { Playfair_Display, Karla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";

// Fraunces → Playfair Display: the owner reported recurring rendering
// issues with Fraunces (its "organic" calligraphic terminations, notably
// on the F). Playfair has straight, high-contrast serifs — a common choice
// in high-end hospitality branding — with cleaner strokes at this size.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
    "Maison landaise de 150 m² et pool house indépendant, piscine chauffée à l'année, à Labenne-Océan dans les Landes. Location saisonnière pour 8 personnes.",
  // No `keywords`: dropped per SEO audit — the tag carries no ranking
  // weight and was identical across every page anyway. Differentiation now
  // lives in each page's title/description (tarifs-et-seo-la-gemmerie.md §2).
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "La Gemmerie",
    url: "https://lagemmerie.com",
    title: "La Gemmerie — maison landaise & piscine chauffée à Labenne-Océan",
    description:
      "Maison landaise de 150 m² et pool house indépendant, piscine chauffée à l'année, à Labenne-Océan dans les Landes. Location saisonnière pour 8 personnes.",
    images: [
      {
        url: "/images/featured/hero-piscine-jour.jpg",
        width: 2048,
        height: 1365,
        alt: "Piscine chauffée et terrasse en bois de La Gemmerie, Labenne-Océan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Gemmerie — maison landaise & piscine chauffée à Labenne-Océan",
    description:
      "Maison landaise de 150 m² et pool house indépendant, piscine chauffée à l'année, à Labenne-Océan dans les Landes. Location saisonnière pour 8 personnes.",
    images: ["/images/featured/hero-piscine-jour.jpg"],
  },
};

// Street address still pending (cahier des charges §8) — locality-level
// address only until it's confirmed. Update once figée.
const lodgingBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "La Gemmerie",
  description:
    "Maison landaise avec pool house indépendant et piscine chauffée à l'année, pour 8 personnes, à Labenne-Océan (Landes).",
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
  maximumAttendeeCapacity: 8,
};

export default async function RootLayout(props: LayoutProps<"/">) {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${karla.variable}`}>
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
