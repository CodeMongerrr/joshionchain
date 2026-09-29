"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

import type { Post } from "@/data/posts";

import { PostCard } from "./post-card";

/**
 * Vertical marquee of post cards, adapted from the 21st.dev "testimonials with
 * vertical marquee" component.
 *
 * The motion is plain CSS, see `.kt-*` in globals.css. Each column holds its
 * cards twice and slides by exactly one copy (translateY -50%), so the loop
 * has no seam. Neighbouring columns run in opposite directions at slightly
 * different speeds. JavaScript only picks the column count and pauses the
 * animation while the section is off screen.
 *
 * It stops for the reader, never the other way round. Hover or focus inside
 * freezes every column so a card can be clicked, and with reduced motion the
 * columns simply render still, full height, each card once.
 */

type Props = {
  items: readonly Post[];
  /** Columns at 1024px and up. */
  desktopColumns?: number;
  /** Columns from 640px. */
  tabletColumns?: number;
  /** Columns below 640px. */
  mobileColumns?: number;
  /** 1 is roughly 20px a second. Higher is faster. */
  speed?: number;
};

/** Seconds per card at speed 1, so a long column moves at the same pace as a short one. */
const SECONDS_PER_CARD = 9;

export default function KineticTestimonial({
  items,
  desktopColumns = 3,
  tabletColumns = 2,
  mobileColumns = 1,
  speed = 1,
}: Props) {
  const columnCount = useColumnCount(desktopColumns, tabletColumns, mobileColumns);
  const stageRef = useRef<HTMLDivElement>(null);

  // Nothing animates while the stage is out of view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) stage.removeAttribute("data-offscreen");
      else stage.setAttribute("data-offscreen", "");
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Deal round robin, so reading across the top row follows the data order.
  const columns: Post[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => columns[i % columnCount].push(item));

  return (
    <div
      ref={stageRef}
      className="kt-stage"
      style={{ "--kt-cols": columnCount } as CSSProperties}
    >
      {columns.map((column, c) => (
        <div
          key={c}
          className="kt-track"
          data-dir={c % 2 === 0 ? "up" : "down"}
          style={
            {
              "--kt-duration": `${(column.length * SECONDS_PER_CARD + c * 3) / speed}s`,
            } as CSSProperties
          }
        >
          <div className="kt-set">
            {column.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {/* The loop copy. Hidden from assistive tech and the tab order,
              but still clickable, since it is what is on screen half the time. */}
          <div className="kt-set" aria-hidden="true">
            {column.map((post) => (
              <PostCard key={post.slug} post={post} duplicate />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The column count for the current viewport. The server has no viewport, so
 * it renders the desktop layout; the browser corrects it right after
 * hydration. The section sits far below the fold, so nobody sees the switch.
 */
function useColumnCount(desktop: number, tablet: number, mobile: number) {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (matchMedia(DESKTOP).matches) return desktop;
      if (matchMedia(TABLET).matches) return tablet;
      return mobile;
    },
    () => desktop,
  );
}

const DESKTOP = "(min-width: 1024px)";
const TABLET = "(min-width: 640px)";

function subscribe(onChange: () => void) {
  const queries = [DESKTOP, TABLET].map((q) => matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}
