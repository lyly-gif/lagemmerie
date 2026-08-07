import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProductNotifyForm } from "@/components/ProductNotifyForm";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";

const title = "La Gemmerie côté produits — Linge & bougies, Labenne-Océan";
const description =
  "Collection de linge de maison et de bougies La Gemmerie — lancement prévu en phase 2.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default async function BoutiquePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const s = dict.shop;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-6 py-24 md:px-10">
      <Reveal>
        <span className="border border-bronze-500/50 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-bronze-700 uppercase">
          {s.comingSoon}
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{s.title}</h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-balance mt-6 max-w-xl leading-relaxed text-forest-800/80">{s.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {s.collections.map((c, i) => (
          <Reveal key={c.title} delay={280 + i * 100}>
            <div className="border border-line/70 px-6 py-6">
              <p className="font-display text-xl text-forest-950 italic">{c.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-forest-800/70">{c.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={460} className="mt-14 w-full">
        <ProductNotifyForm dict={dict} />
      </Reveal>

      <Reveal delay={520} className="mt-6 text-xs text-bronze-700/80">
        {s.note}
      </Reveal>
    </section>
  );
}
