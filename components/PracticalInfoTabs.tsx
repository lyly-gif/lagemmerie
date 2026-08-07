"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import type { Content } from "@/lib/content";

type Tab = "equip" | "loc" | "cal";

const UNAVAILABLE_DAYS = new Set([5, 6, 7, 12, 13, 14, 20, 21, 27, 28]);
const DOW_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
// Illustrative month only (July 2027, starts on a Thursday) — not connected
// to a real calendar, per brief: layout target while Amenitiz/Smoobu is pending.
const FIRST_DOW_OFFSET = 3;

export function PracticalInfoTabs({ dict }: { dict: Content }) {
  const p = dict.practical;
  const [tab, setTab] = useState<Tab>("equip");

  const days = useMemo(() => {
    const cells: { key: string; day: number | null; unavailable: boolean }[] = [];
    for (let i = 0; i < FIRST_DOW_OFFSET; i++) {
      cells.push({ key: `empty-${i}`, day: null, unavailable: false });
    }
    for (let d = 1; d <= 31; d++) {
      cells.push({ key: `d-${d}`, day: d, unavailable: UNAVAILABLE_DAYS.has(d) });
    }
    return cells;
  }, []);

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

      {tab === "equip" && (
        <div className="mt-11">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
            {p.equipment.items.map((item: { icon: string; label: string }) => (
              <div key={item.label} className="flex items-center gap-3 text-sm text-forest-800">
                <LineIcon
                  name={item.icon as IconName}
                  className="h-5 w-5 shrink-0 text-bronze-600"
                />
                {item.label}
              </div>
            ))}
          </div>
          <p className="mt-8 inline-block border-b border-bronze-500 pb-0.5 text-xs font-medium tracking-[0.06em] text-bronze-700 uppercase">
            {p.equipment.moreCta}
          </p>
        </div>
      )}

      {tab === "loc" && (
        <div className="mt-11 grid gap-10 md:grid-cols-2">
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
      )}

      {tab === "cal" && (
        <div className="mt-11 grid gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <p className="font-display mb-4 text-lg text-forest-950">
              {p.availability.monthLabel}
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {DOW_LABELS.map((d, i) => (
                <div
                  key={i}
                  className="pb-1.5 text-center text-[10px] tracking-[0.08em] text-forest-800/50 uppercase"
                >
                  {d}
                </div>
              ))}
              {days.map((cell) =>
                cell.day === null ? (
                  <div key={cell.key} />
                ) : (
                  <div
                    key={cell.key}
                    className={`flex aspect-square items-center justify-center border text-[13px] ${
                      cell.unavailable
                        ? "border-line bg-sand-200 text-forest-800/40 line-through"
                        : "border-line text-forest-800"
                    }`}
                  >
                    {cell.day}
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex gap-4 text-[11px] text-forest-800/65">
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 border border-line" />
                {p.availability.legendAvailable}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 border border-line bg-sand-200" />
                {p.availability.legendUnavailable}
              </span>
            </div>
          </div>

          <div className="bg-forest-950 px-6 py-8 text-sand-100">
            <p className="mb-5 text-[13.5px] leading-relaxed opacity-85">
              {p.availability.sideText}
            </p>
            <Link
              href="/tarifs"
              className="block w-full border border-bronze-600 bg-bronze-600 py-3 text-center text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
            >
              {p.availability.cta}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
