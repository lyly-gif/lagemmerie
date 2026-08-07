"use client";

import { useState } from "react";
import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import { HostawayCalendarWidget } from "@/components/HostawayCalendarWidget";
import type { Content } from "@/lib/content";

type Tab = "equip" | "loc" | "cal";

export function PracticalInfoTabs({ dict }: { dict: Content }) {
  const p = dict.practical;
  const [tab, setTab] = useState<Tab>("equip");

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line">
        {(["equip", "loc", "cal"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-5 py-3.5 text-[13px] font-semibold tracking-[0.03em] uppercase transition-opacity ${
              tab === key
                ? "border-bronze-600 text-bronze-700 opacity-100"
                : "border-transparent text-forest-800 opacity-55 hover:opacity-80"
            }`}
          >
            {p.tabs[key]}
          </button>
        ))}
      </div>

      {/* Panels stay mounted and are shown/hidden via CSS rather than
          conditional rendering — the Hostaway calendar widget in "cal"
          initializes once against a persistent DOM node; unmounting it on
          every tab switch would drop the widget and never re-render it. */}
      <div className={tab === "equip" ? "mt-11 block" : "hidden"}>
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

      <div className={tab === "loc" ? "mt-11 grid gap-10 md:grid-cols-2" : "hidden"}>
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

      <div className={tab === "cal" ? "mt-11 block" : "hidden"}>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-forest-800/80">
          {p.availability.intro}
        </p>
        <HostawayCalendarWidget />
      </div>
    </div>
  );
}
