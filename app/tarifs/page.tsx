import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { BookingWidget } from "@/components/BookingWidget";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tarifs & réservation",
  description:
    "Grille tarifaire et réservation directe pour La Gemmerie, maison landaise de 10 personnes à Labenne-Océan.",
};

export default async function TarifsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const r = dict.rates;

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

      <Reveal delay={420} className="mt-16">
        <BookingWidget dict={dict} />
      </Reveal>
    </section>
  );
}
