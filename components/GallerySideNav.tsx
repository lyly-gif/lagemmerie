"use client";

import { useEffect, useState } from "react";

type NavItem = { key: string; label: string };

export function GallerySideNav({ items }: { items: NavItem[] }) {
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

  return (
    <nav
      aria-label="Espaces de la galerie"
      className="sticky top-28 hidden w-44 shrink-0 flex-col gap-0.5 self-start md:flex"
    >
      {items.map((item) => (
        <a
          key={item.key}
          href={`#${item.key}`}
          className={`border-l-2 py-2 pl-4 text-sm transition-colors ${
            active === item.key
              ? "border-bronze-600 text-forest-950"
              : "border-line text-forest-800/50 hover:text-forest-800"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
