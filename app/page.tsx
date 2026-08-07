import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PhotoBanner } from "@/components/PhotoBanner";
import { SpacesCarousel } from "@/components/SpacesCarousel";
import { PracticalInfoTabs } from "@/components/PracticalInfoTabs";
import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

const ogTitle = "La Gemmerie — Maison de vacances avec piscine chauffée à Labenne-Océan";
const description =
  "Maison landaise 8 personnes avec piscine chauffée à Labenne-Océan (Landes). Quiet luxury, 5 espaces de vie, réservation en direct.";

export const metadata: Metadata = {
  // Absolute: bypasses the "%s — La Gemmerie" template so the brand name
  // leads on the homepage specifically (SEO mapping, tarifs-et-seo-la-gemmerie.md §2).
  title: { absolute: ogTitle },
  description,
  openGraph: { title: ogTitle, description },
  twitter: { title: ogTitle, description },
};

const heroImages = [
  {
    src: featured["hero-piscine-jour"],
    alt: "Piscine chauffée et terrasse en bois de La Gemmerie, Labenne-Océan",
  },
  {
    src: featured["piscine-oliviers"],
    alt: "Piscine et olivier centenaire, jardin de La Gemmerie",
  },
  {
    src: featured["pool-house-facade"],
    alt: "Façade du pool house, architecture landaise à pans de bois",
  },
];

const bannerImages = [
  { src: featured["pool-house-dejeuner"], alt: "Déjeuner sur la terrasse du pool house" },
  { src: featured["chambre-secondaire"], alt: "Chambre secondaire de la maison landaise" },
  { src: featured["salle-de-bain"], alt: "Salle de bain de la maison landaise" },
];

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <>
      {/* Hero — cahier des charges: night-lit pool shot still pending (§3);
          slideshow rotates day photography in the meantime. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-950">
        <HeroSlideshow images={heroImages} />
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
                href="/la-maison"
                className="border border-sand-100/40 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-100 uppercase transition-colors hover:border-sand-100 hover:bg-sand-100 hover:text-forest-950"
              >
                {dict.home.ctaPrimary}
              </Link>
              <Link
                href="/tarifs"
                className="border border-bronze-500 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PhotoBanner images={bannerImages} />

      {/* Le nom + équipements + chiffres clés, réunis dans une seule bande */}
      <section className="grain bg-forest-950 px-6 py-22 text-sand-100 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 md:grid-cols-2">
            <Reveal>
              <Kicker tone="sand">{dict.home.manifesto.kicker}</Kicker>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">
                La <span className="text-bronze-400">Gemmerie</span>
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {dict.home.manifesto.paragraphs.map((p) => (
                  <p key={p} className="max-w-[46ch] text-[15px] leading-relaxed text-sand-100/80">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mb-6 text-xs font-medium tracking-[0.16em] text-bronze-400 uppercase">
                {dict.home.amenities.title}
              </p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3">
                {dict.home.amenities.items.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2.5">
                    <LineIcon name={item.icon as IconName} className="h-[26px] w-[26px] text-bronze-400" />
                    <span className="text-[12.5px] text-sand-100/85">{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-sand-100/[0.22] pt-10 md:grid-cols-4">
              {dict.house.facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-2xl text-bronze-400 md:text-3xl">{fact.value}</p>
                  <p className="mt-1.5 text-[11px] tracking-[0.12em] text-sand-100/60 uppercase">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
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
            items={dict.spaces.items}
            differentiatorTag={dict.home.spacesPreview.differentiatorTag}
          />
        </Reveal>
      </section>

      {/* Informations pratiques */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
        <Reveal>
          <Kicker>{dict.practical.kicker}</Kicker>
          <h2 className="mt-3.5 font-display text-3xl text-forest-950 md:text-4xl">
            {dict.practical.title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-9">
          <PracticalInfoTabs dict={dict} />
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
              href="/tarifs"
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
