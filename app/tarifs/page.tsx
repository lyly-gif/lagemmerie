import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { WaitlistForm } from "@/components/WaitlistForm";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

export const metadata: Metadata = {
  title: "Réserver à La Gemmerie — Réservation directe à Labenne-Océan",
  description:
    "Réservez votre séjour à La Gemmerie en direct, sans commission. Ouverture prochaine des réservations à Labenne-Océan (Landes).",
};

export default async function TarifsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const r = dict.rates;
  const w = r.whyBookDirect;

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
      <Reveal>
        <Kicker>{r.kicker}</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{r.title}</h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-balance mt-6 max-w-xl leading-relaxed text-forest-800/80">{r.intro}</p>
      </Reveal>

      <Reveal delay={280} className="mt-14 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {r.table.headers.map((head) => (
                <th
                  key={head}
                  className="pb-4 text-xs font-medium tracking-[0.14em] text-forest-800/60 uppercase"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {r.table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-line/60">
                {row.map((cell, i) => (
                  <td
                    key={cell}
                    className={
                      "py-4 " +
                      (i === 0
                        ? "font-display text-lg text-forest-950 italic"
                        : "text-forest-800/70")
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={340} className="mt-4">
        <p className="text-xs text-bronze-700">{r.note}</p>
      </Reveal>

      {/* Pourquoi réserver en direct */}
      <div className="mt-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal>
          <Kicker>{w.kicker}</Kicker>
          <p className="mt-5 font-display text-2xl text-forest-950 md:text-3xl">{w.title}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {w.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-forest-800/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
            <Image
              src={featured["rituel-accueil"]}
              alt="Rituel d'accueil La Gemmerie : plateau de bienvenue et serviette landaise"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Formulaire de capture */}
      <Reveal delay={160} className="mt-20">
        <WaitlistForm dict={dict} />
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-sm text-forest-800/70">
          {r.footerNote}{" "}
          <Link
            href="/contact"
            className="text-bronze-700 underline decoration-bronze-500/40 underline-offset-4 hover:text-bronze-800"
          >
            {r.footerCta}
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
