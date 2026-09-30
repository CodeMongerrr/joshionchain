"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { PostCard } from "@/components/post-card";
import type { Post } from "@/data/posts";

/**
 * Posts from X and LinkedIn in the empty space beside the hero.
 *
 * On wide screens they are two vertical trails in the side margins, one on
 * each side, drifting in opposite directions. Rest the mouse on either and it
 * stops, and the wheel then scrolls that trail through every post, round and
 * round, without moving the page. Click a card and the original post opens in
 * a new tab.
 *
 * Narrower screens (under 1680px) have no room in the margins, so the left
 * trail becomes one row
 * under the hero instead, which drifts sideways and can be swiped or scrolled.
 *
 * The drift is a transform, so it is smooth at any speed, and the scrolling is
 * the browser's own, so the wheel, trackpads, touch and keyboard focus all
 * behave normally. Each trail holds its posts three times and wraps by one
 * copy, so neither ever reaches an end. With reduced motion nothing drifts.
 */

const WIDE = "(min-width: 1680px)";
/** Pixels a second at rest, the same on both sides so the two trails mirror each other. */
const DRIFT = 24;

export function HeroPosts({ left, right }: { left: readonly Post[]; right: readonly Post[] }) {
  const wide = useSyncExternalStore(subscribeWide, () => matchMedia(WIDE).matches, () => true);

  return (
    <>
      <Trail items={left} side="left" axis={wide ? "y" : "x"} direction={1} />
      <Trail items={right} side="right" axis={wide ? "y" : "x"} direction={-1} />
    </>
  );
}

function Trail({
  items,
  side,
  axis,
  direction,
}: {
  items: readonly Post[];
  side: "left" | "right";
  axis: "x" | "y";
  direction: 1 | -1;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    // The right trail is hidden below the wide breakpoint.
    if (!scroller || !track || scroller.offsetParent === null) return;

    const sets = track.children;
    const copy = () =>
      axis === "y"
        ? (sets[1] as HTMLElement).offsetTop - (sets[0] as HTMLElement).offsetTop
        : (sets[1] as HTMLElement).offsetLeft - (sets[0] as HTMLElement).offsetLeft;
    const get = () => (axis === "y" ? scroller.scrollTop : scroller.scrollLeft);
    const set = (v: number) => {
      if (axis === "y") scroller.scrollTop = v;
      else scroller.scrollLeft = v;
    };

    // Start on the middle copy so there is room to scroll either way.
    set(copy());

    // Keep the native scroll inside the middle copy. The copies are identical,
    // so jumping by exactly one is invisible.
    const wrapScroll = () => {
      const c = copy();
      const p = get();
      if (p < c * 0.5) set(p + c);
      else if (p > c * 1.5) set(p - c);
    };
    scroller.addEventListener("scroll", wrapScroll, { passive: true });

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let held = false;
    let visible = true;
    let raf = 0;
    let last = 0;

    const paint = () => {
      track.style.transform = axis === "y" ? `translate3d(0, ${-offset}px, 0)` : `translate3d(${-offset}px, 0, 0)`;
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (!held && visible) {
        const c = copy();
        offset = (((offset + direction * DRIFT * dt) % c) + c) % c;
        paint();
      }
      raf = requestAnimationFrame(frame);
    };
    if (!reduced) raf = requestAnimationFrame(frame);

    const hold = () => {
      held = true;
    };
    const release = () => {
      held = false;
      last = 0;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hold();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") release();
    };
    // A finger on the row stops it, and it picks up again a moment after.
    let touchTimer = 0;
    const onTouch = () => {
      hold();
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(release, 2500);
    };
    const onFocusIn = () => hold();
    const onFocusOut = (e: FocusEvent) => {
      if (!scroller.contains(e.relatedTarget as Node | null)) release();
    };

    scroller.addEventListener("pointerenter", onEnter);
    scroller.addEventListener("pointerleave", onLeave);
    scroller.addEventListener("touchstart", onTouch, { passive: true });
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
    });
    io.observe(scroller);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(touchTimer);
      io.disconnect();
      scroller.removeEventListener("scroll", wrapScroll);
      scroller.removeEventListener("pointerenter", onEnter);
      scroller.removeEventListener("pointerleave", onLeave);
      scroller.removeEventListener("touchstart", onTouch);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
      track.style.transform = "";
    };
  }, [axis, direction]);

  return (
    <aside
      className={`hero-trail hero-trail-${side}`}
      aria-label={side === "left" ? "Posts from X and LinkedIn" : "More posts from X and LinkedIn"}
    >
      <div className="hero-trail-scroll" ref={scrollRef}>
        <div className="hero-trail-track" ref={trackRef}>
          {[0, 1, 2].map((copy) => (
            // Only the middle copy is read out and tabbable, the other two
            // exist so the trail never runs out on screen.
            <div className="hero-trail-set" key={copy} aria-hidden={copy !== 1 ? true : undefined}>
              {items.map((post) => (
                <PostCard key={post.slug} post={post} duplicate={copy !== 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function subscribeWide(onChange: () => void) {
  const mq = matchMedia(WIDE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
