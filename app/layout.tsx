import type { Metadata } from "next";
import { Playfair_Display, Karla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBookCta } from "@/components/StickyBookCta";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";

// Fraunces → Playfair Display: the owner reported recurring rendering
// issues with Fraunces (its "organic" calligraphic terminations, notably
// on the F). Playfair has straight, high-contrast serifs — a common choice
// in high-end hospitality branding — with cleaner strokes at this size.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
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
    default: "La Gemmerie | Maison avec piscine à Labenne-Océan",
    template: "%s",
  },
  description:
    "Maison landaise pour 8 personnes avec pool house et piscine chauffée d'avril à octobre, à 400 m de l'océan à Labenne.",
  robots: { index: true, follow: true },
  // No `keywords`: dropped per SEO audit — the tag carries no ranking
  // weight and was identical across every page anyway. Differentiation now
  // lives in each page's title/description (tarifs-et-seo-la-gemmerie.md §2).
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "La Gemmerie",
    url: "/",
    title: "La Gemmerie | Maison avec piscine à Labenne-Océan",
    description:
      "Maison landaise pour 8 personnes avec pool house et piscine chauffée d'avril à octobre, à 400 m de l'océan à Labenne.",
    images: [
      {
        url: "/images/featured/la-gemmerie-social.jpg",
        width: 1200,
        height: 630,
        alt: "Piscine chauffée et terrasse en bois de La Gemmerie, Labenne-Océan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Gemmerie | Maison avec piscine à Labenne-Océan",
    description:
      "Maison landaise pour 8 personnes avec pool house et piscine chauffée d'avril à octobre, à 400 m de l'océan à Labenne.",
    images: ["/images/featured/la-gemmerie-social.jpg"],
  },
};

// Brand-level structured data only: the property address and coordinates
// deliberately remain private until the owner decides otherwise.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lagemmerie.com/#organization",
      name: "La Gemmerie",
      url: "https://lagemmerie.com",
      logo: {
        "@type": "ImageObject",
        url: "https://lagemmerie.com/images/brand/la-gemmerie-alternative-gemme-horizontal.svg",
      },
      email: "contact@lagemmerie.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://lagemmerie.com/#website",
      url: "https://lagemmerie.com",
      name: "La Gemmerie",
      inLanguage: ["fr", "en", "de", "nl", "es"],
      publisher: { "@id": "https://lagemmerie.com/#organization" },
    },
  ],
};

export default async function RootLayout(props: LayoutProps<"/">) {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${karla.variable}`}>
      <body className="bg-sand-100 text-forest-950 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Header locale={locale} dict={dict} />
        <main>{props.children}</main>
        <Footer dict={dict} locale={locale} />
        <StickyBookCta dict={dict} locale={locale} />
      </body>
    </html>
  );
}
