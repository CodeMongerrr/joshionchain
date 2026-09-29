"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

import type { Post } from "@/data/posts";

import { PostCard } from "./post-card";

/**
 * A full width wall of post cards in vertical trails, adapted from the
 * 21st.dev "testimonials with vertical marquee" component, that the page
 * scroll steers.
 *
 * Neighbouring trails run in opposite directions, so the wall turns like a
 * set of gears. Scrolling down turns it one way and scrolling up turns every
 * trail back the other way. The scroll speed is added on top of the resting
 * speed and eases off when the scroll stops, and the wall keeps turning in
 * the last direction it was pushed. Nothing inside ever scrolls on its own,
 * so there is no scrollbar and the page scroll is never taken over.
 *
 * Each trail holds its cards twice and wraps by exactly one copy, so the loop
 * has no seam. Before hydration, or with JavaScript off, the same trails run
 * on the CSS keyframes in globals.css instead, at the resting speed.
 *
 * It stops for the reader. A mouse over the wall eases it to a halt (scrolling
 * still turns it), keyboard focus holds it and turns the focused card into
 * view, it sleeps while off screen, and with reduced motion it is a still
 * wall with every post shown once.
 */

type Props = {
  items: readonly Post[];
  /** Upper bound on trails, reached on wide screens. */
  maxColumns?: number;
  /** A trail is never narrower than this, so cards stay readable. */
  minColumnWidth?: number;
  /** Resting speed multiplier. 1 is about 26px a second. */
  speed?: number;
};

const RESTING_PX_PER_SECOND = 26;
/** Scroll speed that adds one more resting speed. 1200px/s of scroll gives 11x. */
const SCROLL_PX_PER_SECOND_PER_BOOST = 120;
const MAX_BOOST = 18;
/** The boost catches a flick fast and lets go slowly, like a flywheel. */
const SPIN_UP_RATE = 14;
const COAST_RATE = 3.5;
/** Enough cards that one copy of a trail is taller than the wall. */
const MIN_CARDS_PER_TRAIL = 5;
/** CSS fallback pace, seconds per card at speed 1. */
const SECONDS_PER_CARD = 9;

type Slot = { post: Post; primary: boolean };

export default function KineticTestimonial({
  items,
  maxColumns = 7,
  minColumnWidth = 260,
  speed = 1,
}: Props) {
  const columnCount = useColumnCount(maxColumns, minColumnWidth);
  const columns = useMemo(() => deal(items, columnCount), [items, columnCount]);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = trackRefs.current.slice(0, columnCount).filter((t): t is HTMLDivElement => !!t);
    const heights = tracks.map(() => 0);
    const offsets = tracks.map(() => 0);

    // One copy's height is the wrap distance. Cards reflow with the width,
    // so it is re-measured whenever a copy changes size.
    const measure = () => {
      tracks.forEach((track, i) => {
        const copy = track.firstElementChild;
        heights[i] = copy ? copy.getBoundingClientRect().height : 0;
      });
    };
    measure();
    const resize = new ResizeObserver(measure);
    tracks.forEach((track) => track.firstElementChild && resize.observe(track.firstElementChild));

    // From here on JavaScript drives the transforms, not the keyframes.
    stage.setAttribute("data-live", "");

    const paint = (i: number) => {
      tracks[i].style.transform = `translate3d(0, ${-offsets[i]}px, 0)`;
    };

    let raf = 0;
    let last = 0;
    let lastScroll = window.scrollY;
    let direction = 1;
    let scrollSpeed = 0;
    let resting = 1;
    let held = false;

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const y = window.scrollY;
      const dy = y - lastScroll;
      lastScroll = y;
      if (dy > 0) direction = 1;
      else if (dy < 0) direction = -1;

      // Smoothed scroll speed, so a flick swells and then coasts down
      // instead of jumping and stopping dead.
      const instant = dt > 0 ? Math.abs(dy) / dt : 0;
      const rate = instant > scrollSpeed ? SPIN_UP_RATE : COAST_RATE;
      scrollSpeed += (instant - scrollSpeed) * Math.min(1, dt * rate);
      // Resting motion eases to zero under a mouse and back when it leaves.
      resting += ((held ? 0 : 1) - resting) * Math.min(1, dt * 5);

      const boost = Math.min(scrollSpeed / SCROLL_PX_PER_SECOND_PER_BOOST, MAX_BOOST);
      const move = direction * RESTING_PX_PER_SECOND * speed * (resting + boost) * dt;

      tracks.forEach((_, i) => {
        const h = heights[i];
        if (!h) return;
        // Even trails rise on a downward scroll, odd trails fall.
        const signed = i % 2 === 0 ? move : -move;
        offsets[i] = (((offsets[i] + signed) % h) + h) % h;
        paint(i);
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      last = 0;
      lastScroll = window.scrollY;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(stage);

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") held = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") held = false;
    };

    // The stage clips rather than scrolls, so the browser can't bring a
    // focused card into view by itself. Turn its trail until it is centred.
    const onFocusIn = (e: FocusEvent) => {
      held = true;
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".pc");
      const track = card?.closest<HTMLDivElement>(".kt-track");
      const i = track ? tracks.indexOf(track) : -1;
      if (!card || i < 0 || !heights[i]) return;
      const stageBox = stage.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const delta = cardBox.top + cardBox.height / 2 - (stageBox.top + stageBox.height / 2);
      offsets[i] = (((offsets[i] + delta) % heights[i]) + heights[i]) % heights[i];
      paint(i);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!stage.contains(e.relatedTarget as Node | null)) held = false;
    };

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("focusin", onFocusIn);
    stage.addEventListener("focusout", onFocusOut);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("focusin", onFocusIn);
      stage.removeEventListener("focusout", onFocusOut);
      stage.removeAttribute("data-live");
      tracks.forEach((track) => (track.style.transform = ""));
    };
  }, [columnCount, speed]);

  return (
    <div ref={stageRef} className="kt-stage" style={{ "--kt-cols": columnCount } as CSSProperties}>
      {columns.map((column, c) => (
        <div className="kt-col" key={c}>
          <div
            className="kt-track"
            data-dir={c % 2 === 0 ? "up" : "down"}
            ref={(el) => {
              trackRefs.current[c] = el;
            }}
            style={{ "--kt-duration": `${(column.length * SECONDS_PER_CARD + c * 3) / speed}s` } as CSSProperties}
          >
            {[0, 1].map((copy) => (
              // The second copy only exists to close the loop. Assistive tech
              // and the tab order see each post exactly once.
              <div className="kt-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {column.map((slot, i) => (
                  <PostCard key={`${slot.post.slug}-${i}`} post={slot.post} duplicate={copy === 1 || !slot.primary} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Deals posts into trails round robin. A wide wall has more trails than a
 * single pass can fill, so the posts go round again, starting from a point
 * chosen so no post lands in the same trail twice.
 */
function deal(items: readonly Post[], columns: number): Slot[][] {
  const n = items.length;
  const passes = Math.max(1, Math.ceil((MIN_CARDS_PER_TRAIL * columns) / n));
  const pool: Slot[] = [];
  for (let pass = 0; pass < passes; pass++) {
    const shift = pass === 0 ? 0 : bestShift(n, columns, pass);
    for (let j = 0; j < n; j++) pool.push({ post: items[(j + shift) % n], primary: pass === 0 });
  }
  const trails: Slot[][] = Array.from({ length: columns }, () => []);
  pool.forEach((slot, i) => trails[i % columns].push(slot));
  return trails;
}

function bestShift(n: number, columns: number, pass: number) {
  let best = 1;
  let fewest = Infinity;
  for (let s = 1; s < n; s++) {
    let clashes = 0;
    for (let q = 0; q < n; q++) {
      if ((pass * n + ((q - s + n) % n)) % columns === q % columns) clashes++;
    }
    if (clashes < fewest) {
      fewest = clashes;
      best = s;
    }
  }
  return best;
}

/**
 * As many trails as fit at `minWidth` each, up to `max`. The server has no
 * viewport, so it renders five and the browser corrects it after hydration,
 * far below the fold where nobody sees the switch.
 */
function useColumnCount(max: number, minWidth: number) {
  return useSyncExternalStore(
    subscribeToResize,
    () => Math.max(1, Math.min(max, Math.floor(document.documentElement.clientWidth / minWidth))),
    () => Math.min(max, 5),
  );
}

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
