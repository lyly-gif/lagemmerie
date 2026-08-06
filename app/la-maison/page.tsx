import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

export const metadata: Metadata = {
  title: "La maison — maison landaise & pool house à Labenne-Océan",
  description:
    "Maison landaise de 170 m² prolongée par un pool house contemporain de 40 m², pour 10 personnes réparties en 4 chambres, à Labenne-Océan.",
};

export default async function LaMaisonPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const h = dict.house;

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-forest-950">
        <Image
          src={featured["pool-house-facade"]}
          alt="Façade du pool house, architecture landaise à pans de bois"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10 md:pb-20">
          <Reveal>
            <Kicker tone="sand">{h.kicker}</Kicker>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 max-w-2xl font-display text-4xl text-sand-100 md:text-6xl">
              {h.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-balance mt-5 max-w-xl leading-relaxed text-sand-100/75">
              {h.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line/60 bg-sand-200 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4 md:px-10">
          {h.facts.map((fact) => (
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

      {/* Main house */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:py-32">
        <Reveal className="order-2 md:order-1">
          <Kicker>01</Kicker>
          <h2 className="mt-5 font-display text-3xl text-forest-950 md:text-4xl">
            {h.mainHouse.title}
          </h2>
          <p className="mt-5 leading-relaxed text-forest-800/80">{h.mainHouse.description}</p>
        </Reveal>
        <Reveal delay={120} className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
            <Image
              src={featured["sejour-cuisine"]}
              alt="Séjour et cuisine ouverte de la maison landaise, poêle à bois"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Pool house */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:pb-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
            <Image
              src={featured["pool-house-dejeuner"]}
              alt="Coin repas du pool house avec vue sur la piscine"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Kicker>02</Kicker>
          <h2 className="mt-5 font-display text-3xl text-forest-950 md:text-4xl">
            {h.poolHouse.title}
          </h2>
          <p className="mt-5 leading-relaxed text-forest-800/80">{h.poolHouse.description}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 md:px-10">
        <Reveal>
          <div className="border border-bronze-500/30 bg-sand-200 px-6 py-5 text-sm text-forest-800/80">
            <span className="font-medium text-bronze-700">À confirmer avant mise en ligne —</span>{" "}
            {h.note}
          </div>
        </Reveal>
      </section>
    </>
  );
}
