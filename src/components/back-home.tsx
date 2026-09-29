"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent } from "react";

import { Corners } from "@/components/blueprint";
import { homeSectionFor } from "@/data/site";

/**
 * The site is one landing page with pages that open from it, and every page
 * leads only back. Getting back should feel like closing a panel, so:
 *
 * - If the visitor came here from the landing page, "back" is the browser's
 *   own back, which puts them at the exact scroll position they left.
 * - If they arrived some other way (a search result, a shared link), it goes
 *   to the landing section this page belongs to instead of the top.
 * - Escape does the same from anywhere on the page.
 */

const FROM_HOME = "aj-from-home";

/** Mounted once in the layout. Notes when a page was opened from the landing page. */
export function NavMemory() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    try {
      if (from === "/" && pathname !== "/") sessionStorage.setItem(FROM_HOME, pathname);
      else if (pathname === "/") sessionStorage.removeItem(FROM_HOME);
    } catch {
      // Storage blocked, "back" still works, it just lands on the section.
    }
  }, [pathname]);

  return null;
}

function useBackHome() {
  const pathname = usePathname();
  const router = useRouter();
  const section = homeSectionFor(pathname);
  const href = section ? `/#${section}` : "/";

  const goBack = useCallback(
    (e?: Pick<MouseEvent, "preventDefault" | "metaKey" | "ctrlKey" | "shiftKey" | "button">) => {
      // Let modified clicks open the landing page in a new tab as usual.
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
      let cameFromHome = false;
      try {
        cameFromHome = sessionStorage.getItem(FROM_HOME) === pathname;
      } catch {}
      e?.preventDefault();
      if (cameFromHome && window.history.length > 1) router.back();
      else router.push(href);
    },
    [href, pathname, router],
  );

  return { href, goBack };
}

/** The header's way back, with Escape wired to it. */
export function BackHomeButton() {
  const { href, goBack } = useBackHome();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goBack]);

  return (
    <Link href={href} onClick={goBack} className="btn btn-primary backhome">
      ← <span className="backhome-long">Back to home</span>
      <span className="backhome-short">Home</span>
      <kbd className="backhome-key" aria-hidden="true">
        Esc
      </kbd>
    </Link>
  );
}

/** The last thing on every page, a door back to where the visitor came from. */
export function BackHomeDoor() {
  const { href, goBack } = useBackHome();

  return (
    <Link href={href} onClick={goBack} className="frame door back-door">
      <Corners />
      <span className="door-text">
        <span className="kick">Done here</span>
        <span className="door-title">Back to the overview</span>
        <span className="door-summary">Everything else is one click from there.</span>
      </span>
      <span className="btn btn-primary door-action">← Back to home</span>
    </Link>
  );
}
