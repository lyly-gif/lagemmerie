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
  keywords: [
    "maison landaise Labenne-Océan",
    "location piscine chauffée Landes",
    "location 10 personnes Landes",
    "maison de vacances Labenne",
  ],
};

export default async function RootLayout(props: LayoutProps<"/">) {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${karla.variable}`}>
      <body className="bg-sand-100 text-forest-950 antialiased">
        <Header locale={locale} dict={dict} />
        <main>{props.children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
