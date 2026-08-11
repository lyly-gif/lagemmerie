import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import { HostawayCalendarWidget } from "@/components/HostawayCalendarWidget";
import type { Content, Locale } from "@/lib/content";

// Renamed from the tabbed version it replaces, but kept as the default
// export other files import — équipements, localisation et disponibilités
// are now stacked and always visible instead of hidden behind clicks
// (owner: "pour qu'ils soient directement visibles").
export function PracticalInfoTabs({ dict, locale }: { dict: Content; locale: Locale }) {
  const p = dict.practical;

  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="mb-6 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
          {p.tabs.equip}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {p.equipment.items.map((item: { icon: string; label: string }) => (
            <div
              key={item.label}
              className="flex items-center gap-3 border border-line/70 bg-sand-50/60 px-4 py-3.5 text-sm text-forest-800"
            >
              <LineIcon name={item.icon as IconName} className="h-5 w-5 shrink-0 text-bronze-600" />
              {item.label}
            </div>
          ))}
        </div>
        <details className="group mt-10 border-y border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xs font-medium tracking-[0.1em] text-bronze-700 uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-600 [&::-webkit-details-marker]:hidden">
            <span>{p.equipment.moreCta}</span>
            <span
              aria-hidden
              className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
            >
              <span className="absolute top-1/2 left-0 h-px w-full bg-bronze-600" />
              <span className="absolute top-0 left-1/2 h-full w-px bg-bronze-600" />
            </span>
          </summary>
          <div className="grid gap-x-10 gap-y-8 border-t border-line/70 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {p.equipment.categories.map(
              (category: { title: string; items: string[] }) => (
                <section key={category.title}>
                  <h3 className="font-display text-xl text-forest-950 italic">
                    {category.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[13px] leading-relaxed text-forest-800/75"
                      >
                        <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-bronze-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ),
            )}
          </div>
        </details>
      </div>

      <div className="border-t border-line pt-14">
        <p className="mb-6 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
          {p.tabs.loc}
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-line grayscale-[0.15] sepia-[0.08]">
            <iframe
              loading="lazy"
              src={`https://maps.google.com/maps?q=${p.location.mapQuery}&z=15&output=embed`}
              title={p.location.mapLabel}
              className="h-full w-full border-0"
            />
            {/* Deliberately a perimeter, not a pin on the house itself —
                the exact address stays private until booking is confirmed
                (owner: "fais plutôt un cercle sur le périmètre"). */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-2/3 w-2/3 rounded-full border-2 border-bronze-600/80 bg-bronze-500/10" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {p.location.facts.map((fact: { title: string; description: string }) => (
              <div key={fact.title}>
                <p className="font-display text-xl text-forest-950">{fact.title}</p>
                <p className="text-[13px] text-forest-800/70">{fact.description}</p>
              </div>
            ))}
            <p className="mt-2 border-t border-line pt-4 text-xs text-bronze-700/85">
              {p.location.note}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-14">
        <p className="mb-6 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
          {p.tabs.cal}
        </p>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-forest-800/80">
          {p.availability.intro}
        </p>
        <HostawayCalendarWidget
          locale={locale}
          reserveButtonText={dict.calendar.reserveButton}
          clearButtonText={dict.calendar.clearButton}
          loadingText={dict.calendar.loadingText}
          partnerNote={dict.calendar.partnerNote}
        />
      </div>
    </div>
  );
}
