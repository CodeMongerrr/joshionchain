"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Marks its element `data-inview` the first time it scrolls into view. CSS
 * keys the heading's word by word blur-in and the marquee's rise off it (see
 * `.kt` in globals.css).
 *
 * The site's own <Reveal> is not reused here because it reveals everything
 * still hidden after 800ms, which would play this animation off screen.
 * Same fail-open rules though, a hidden tab or a browser without
 * IntersectionObserver shows the content immediately.
 */
export function InView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.visibilityState !== "visible" || typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-inview", "");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-inview", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
