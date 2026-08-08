import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import { HostawayCalendarWidget } from "@/components/HostawayCalendarWidget";
import type { Content } from "@/lib/content";

// Renamed from the tabbed version it replaces, but kept as the default
// export other files import — équipements, localisation et disponibilités
// are now stacked and always visible instead of hidden behind clicks
// (owner: "pour qu'ils soient directement visibles").
export function PracticalInfoTabs({ dict }: { dict: Content }) {
  const p = dict.practical;

  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="mb-6 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
          {p.tabs.equip}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          {p.equipment.items.map((item: { icon: string; label: string }) => (
            <div key={item.label} className="flex items-center gap-3 text-sm text-forest-800">
              <LineIcon name={item.icon as IconName} className="h-5 w-5 shrink-0 text-bronze-600" />
              {item.label}
            </div>
          ))}
        </div>
        <p className="mt-8 inline-block border-b border-bronze-500 pb-0.5 text-xs font-medium tracking-[0.06em] text-bronze-700 uppercase">
          {p.equipment.moreCta}
        </p>
      </div>

      <div className="border-t border-line pt-14">
        <p className="mb-6 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
          {p.tabs.loc}
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden border border-line grayscale-[0.15] sepia-[0.08]">
            <iframe
              loading="lazy"
              src={`https://maps.google.com/maps?q=${p.location.mapQuery}&z=16&output=embed`}
              title={p.location.mapLabel}
              className="h-full w-full border-0"
            />
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
        <HostawayCalendarWidget />
      </div>
    </div>
  );
}
