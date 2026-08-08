"use client";

import { useEffect, useRef, useState } from "react";

// The 11 gem facets + stem from the brand symbol
// (la-gemmerie-alternative-gemme-symbole.svg), re-assembled here as
// individually staggered shapes instead of a static <img> — evokes both the
// hand-cut gemstone and the slow, deliberate gesture of gemmage (audit-complet-v2
// §3: "quelque chose de plus graphique... éventuellement une animation du logo").
const FACETS = [
  { points: "97.04,0 107.82,0 107.82,18.33 97.04,18.33", tone: "#7C6142" },
  { points: "67.93,21.57 99.20,52.83 67.93,84.10 36.66,52.83", tone: "#7C6142" },
  { points: "136.94,21.57 168.21,52.83 136.94,84.10 105.67,52.83", tone: "#AE8A57" },
  { points: "33.43,61.46 64.70,92.73 33.43,124.00 2.16,92.73", tone: "#AE8A57" },
  { points: "102.43,61.46 133.70,92.73 102.43,124.00 71.17,92.73", tone: "#7C6142" },
  { points: "171.44,61.46 202.71,92.73 171.44,124.00 140.17,92.73", tone: "#AE8A57" },
  { points: "33.43,101.36 64.70,132.63 33.43,163.90 2.16,132.63", tone: "#7C6142" },
  { points: "102.43,101.36 133.70,132.63 102.43,163.90 71.17,132.63", tone: "#AE8A57" },
  { points: "171.44,101.36 202.71,132.63 171.44,163.90 140.17,132.63", tone: "#7C6142" },
  { points: "67.93,141.25 99.20,172.52 67.93,203.79 36.66,172.52", tone: "#AE8A57" },
  { points: "136.94,141.25 168.21,172.52 136.94,203.79 105.67,172.52", tone: "#7C6142" },
  { points: "102.43,181.15 133.70,212.42 102.43,243.69 71.17,212.42", tone: "#7C6142" },
];

export function NameSymbol({ className = "h-16 w-auto md:h-20" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 204.87 248.00"
      className={className}
      role="img"
      aria-label="Symbole gemme taillée La Gemmerie"
    >
      {FACETS.map((facet, i) => (
        <polygon
          key={facet.points}
          points={facet.points}
          fill={facet.tone}
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.4)",
            transition: `opacity 0.5s ease-out ${i * 55}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms`,
          }}
        />
      ))}
    </svg>
  );
}
