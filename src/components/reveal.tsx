"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fade + 4px rise, once, on scroll-in. Mounted once in the layout and
 * re-observes on every route change, client navigations swap the DOM under
 * us, so a mount-only effect would leave later routes permanently hidden.
 *
 * Two fail-open paths matter here, both inherited from the design's own
 * script: a hidden document never advances a CSS transition, and a viewport
 * that can't scroll never fires the observer. Either way the content must end
 * up visible, so anything still hidden after 800ms is revealed without a fade.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (els.length === 0) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hidden = document.visibilityState !== "visible";

    if (reduced || hidden) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    els.forEach((el) => {
      if (!el.hasAttribute("data-in")) observer.observe(el);
    });

    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        if (!el.hasAttribute("data-in")) {
          el.setAttribute("data-nofade", "");
          el.setAttribute("data-in", "");
          observer.unobserve(el);
        }
      });
    }, 800);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
