import { statSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PhotoBanner } from "@/components/PhotoBanner";
import { SpacesCarousel } from "@/components/SpacesCarousel";
import { NameSymbol } from "@/components/NameSymbol";
import { PracticalInfoTabs } from "@/components/PracticalInfoTabs";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured, type FeaturedKey } from "@/lib/images";
import { localizedPath } from "@/lib/i18n-routing";
import { createLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createLocalizedMetadata(await getCurrentLocale(), "home");
}

// Picks the first gallery photo that isn't a byte-identical copy of the
// featured base photo (compared by file size — cheap and exact for our
// untouched JPEGs). A fixed index (e.g. galleryNumbers[1]) isn't reliable:
// which index duplicates the featured shot varies per space, and swapping
// a photo for an identical copy of itself reads as "the hover does
// nothing" (recurring bug — see SpacesCarousel history).
const PUBLIC_DIR = path.join(process.cwd(), "public");

function fileSize(publicPath: string): number | null {
  try {
    return statSync(path.join(PUBLIC_DIR, publicPath)).size;
  } catch {
    return null;
  }
}

function pickHoverSrc(featuredSrc: string, galleryNumbers?: number[]): string | null {
  if (!galleryNumbers?.length) return null;
  const baseSize = fileSize(featuredSrc);
  for (const n of galleryNumbers) {
    const src = `/images/gallery/${String(n).padStart(2, "0")}.jpg`;
    if (fileSize(src) !== baseSize) return src;
  }
  const [first] = galleryNumbers;
  return `/images/gallery/${String(first).padStart(2, "0")}.jpg`;
}

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const heroImages = [
    { src: featured["hero-piscine-jour"], alt: `${dict.spaces.items[1].title} — La Gemmerie` },
    { src: featured["piscine-oliviers"], alt: `${dict.gallery.categories.poolGarden} — La Gemmerie` },
    { src: featured["salon"], alt: `${dict.spaces.items[3].title} — La Gemmerie` },
  ];
  const bannerImages = [
    { src: featured["pool-house-dejeuner"], alt: `${dict.spaces.items[0].title} — La Gemmerie` },
    { src: featured["chambre-secondaire"], alt: `${dict.spaces.items[4].title} — La Gemmerie` },
    { src: featured["facade-exterieure"], alt: "Façade de la maison landaise — La Gemmerie" },
  ];

  return (
    <>
      {/* Hero — cahier des charges: night-lit pool shot still pending (§3);
          slideshow rotates day photography in the meantime. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-950">
        <HeroSlideshow images={heroImages} locale={locale} />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/25 to-forest-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.28em] text-sand-100/70 uppercase">
              {dict.home.kicker}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-balance mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-sand-100 md:text-6xl">
              {dict.home.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-balance mt-6 max-w-lg text-base leading-relaxed text-sand-100/75 md:text-lg">
              {dict.home.subtitle}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={localizedPath(locale, "/galerie")}
                className="border border-sand-100/40 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-100 uppercase transition-colors hover:border-sand-100 hover:bg-sand-100 hover:text-forest-950"
              >
                {dict.home.ctaPrimary}
              </Link>
              <Link
                href={localizedPath(locale, "/tarifs")}
                className="border border-bronze-500 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PhotoBanner images={bannerImages} />

      {/* Le nom — bandeau compact, purement narratif : logo à gauche, texte
          à droite, plus aucun mélange avec équipements/chiffres (déjà
          couverts ailleurs sur la page, cf. bande stats et Informations
          pratiques). */}
      <section className="grain bg-forest-950 px-6 py-14 text-sand-100 md:px-10 md:py-16">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-12 md:text-left">
          <NameSymbol className="h-28 w-auto shrink-0 md:h-44" />
          <div>
            <Kicker tone="sand" className="justify-center md:justify-start">
              {dict.home.manifesto.kicker}
            </Kicker>
            <h2 className="mt-3 font-display text-2xl text-bronze-400 md:text-4xl">
              La Gemmerie
            </h2>
            <div className="mt-4 flex flex-col gap-2.5">
              {dict.home.manifesto.paragraphs.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-sand-100/80 md:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Chiffres clés — bande autonome, sortie de la section narrative */}
      <section className="border-y border-line/60 bg-sand-200 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-3 md:px-10">
          {dict.home.facts.map((fact) => (
            <div key={fact.label}>
              <p className="font-display text-2xl text-bronze-700 italic md:text-3xl">
                {fact.value}
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] text-forest-800/60 uppercase">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 espaces de vie — carrousel, pool house en premier */}
      <section className="pt-24 pb-0 md:pt-32">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6 pb-10 md:px-10">
          <div>
            <Reveal>
              <Kicker>{dict.home.spacesPreview.kicker}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3.5 max-w-[520px] font-display text-3xl text-forest-950 md:text-5xl">
                {dict.home.spacesPreview.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-3 max-w-[420px] text-[14.5px] leading-relaxed text-forest-800/75">
                {dict.home.spacesPreview.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200} className="px-6 md:px-10">
          <SpacesCarousel
            items={dict.spaces.items.map((item) => ({
              ...item,
              hoverSrc: pickHoverSrc(
                featured[item.imageKey as FeaturedKey],
                item.galleryNumbers
              ),
            }))}
            differentiatorTag={dict.home.spacesPreview.differentiatorTag}
            locale={locale}
          />
        </Reveal>
      </section>

      {/* Informations pratiques */}
      <section
        id="informations-pratiques"
        className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-10 md:py-28"
      >
        <Reveal>
          <Kicker>{dict.practical.kicker}</Kicker>
          <h2 className="mt-3.5 font-display text-3xl text-forest-950 md:text-4xl">
            {dict.practical.title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-9">
          <PracticalInfoTabs dict={dict} locale={locale} />
        </Reveal>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="grain flex flex-col items-start justify-between gap-8 border border-line bg-sand-200 p-10 md:flex-row md:items-center md:p-14">
            <p className="text-balance max-w-md font-display text-2xl text-forest-950 md:text-3xl">
              {dict.home.ctaBand.title}
            </p>
            <Link
              href={localizedPath(locale, "/tarifs")}
              className="shrink-0 border border-bronze-600 bg-bronze-600 px-7 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
            >
              {dict.home.ctaBand.cta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
