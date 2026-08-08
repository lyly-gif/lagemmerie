"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders as plain, always-visible content by default — matching the
 * server-rendered HTML exactly, so nothing waits on hydration to appear.
 * Only once mounted does it check whether the element is below the fold;
 * if so (and only then) it switches to a hidden state and animates in on
 * scroll. Previously every section — including ones visible on load —
 * shipped as `opacity:0` in the server HTML and stayed invisible until
 * React hydrated, an IntersectionObserver round-trip completed, and a
 * 900ms transition ran. That read as a blank/broken page for 1-2s on
 * slower connections (audit-seo-la-gemmerie.md / critique-design-la-gemmerie.md, §4).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "visible">("static");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) return;

    setState("hidden");
    // Positive bottom margin: the trigger zone extends past the viewport,
    // so content reveals just before it scrolls into view rather than only
    // once it's already there — a fast scroller shouldn't outrun it and
    // read the gap as the page stopping (audit-ux-design-la-gemmerie.md §2,
    // "600-700px de vide" between /espaces sections).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 400px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (state === "static") {
    return (
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: state === "visible" ? 1 : 0,
        transform: state === "visible" ? "translateY(0)" : "translateY(1.25rem)",
      }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}
