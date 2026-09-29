"use client";

import { useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

import { home } from "@/data/site";

/**
 * "It is around 10 PM in Mumbai right now", so someone writing from San
 * Francisco or London knows roughly when a reply can come.
 *
 * Rounded to the nearest hour on purpose. It reads as a friendly signal
 * rather than a clock, and it keeps colons out of visible copy.
 *
 * The server can't know the visitor's moment, so it renders nothing and the
 * browser fills the line in after hydration. The line keeps its height
 * either way, so nothing below it moves.
 */
const hourFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
  timeZone: home.timeZone,
});

// Nearest hour, 10:40 reads as "around 11 PM".
const readHour = () => hourFormat.format(new Date(Date.now() + 30 * 60 * 1000));

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60 * 1000);
  return () => window.clearInterval(id);
}

export function LocalTime({ className, style }: { className?: string; style?: CSSProperties }) {
  const hour = useSyncExternalStore(subscribe, readHour, () => null);

  return (
    <p className={className} style={{ minHeight: "1.55em", ...style }}>
      {hour ? `It is around ${hour} in ${home.city} right now.` : null}
    </p>
  );
}
