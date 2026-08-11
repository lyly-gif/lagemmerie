"use client";

import { useEffect, useState } from "react";

type NavItem = { key: string; label: string };

export function GallerySideNav({ items, label }: { items: NavItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.key);
  const keys = items.map((item) => item.key).join(",");

  useEffect(() => {
    const sections = keys
      .split(",")
      .map((key) => document.getElementById(key))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [keys]);

  const links = (mobile: boolean) =>
    items.map((item) => (
      <a
        key={item.key}
        href={`#${item.key}`}
        aria-current={active === item.key ? "location" : undefined}
        className={
          mobile
            ? `shrink-0 border-b-2 px-3 py-3 text-xs transition-colors ${active === item.key ? "border-bronze-600 text-forest-950" : "border-transparent text-forest-800/65"}`
            : `border-l-2 py-2 pl-4 text-sm transition-colors ${active === item.key ? "border-bronze-600 text-forest-950" : "border-line text-forest-800/60 hover:text-forest-800"}`
        }
      >
        {item.label}
      </a>
    ));

  return (
    <>
      <nav aria-label={label} className="sticky top-[65px] z-30 -mx-6 mb-10 flex overflow-x-auto border-y border-line/70 bg-sand-100/95 px-3 backdrop-blur-sm md:hidden">
        {links(true)}
      </nav>
      <nav aria-label={label} className="sticky top-28 hidden w-44 shrink-0 flex-col gap-0.5 self-start md:flex">
        {links(false)}
      </nav>
    </>
  );
}
