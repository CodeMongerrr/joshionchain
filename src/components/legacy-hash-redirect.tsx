"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * The previous site was a single page addressed entirely by hash, so any link
 * anyone ever shared looks like `/#projects`. Fragments are never sent to the
 * server, which means `next.config.ts` redirects cannot catch them, this is
 * the only place that can.
 *
 * Only runs on the home route, and only for hashes the old site actually used.
 */
const LEGACY: Record<string, string> = {
  "#projects": "/work",
  "#skills": "/about",
  "#experience": "/about",
  "#about": "/about",
};

export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const target = LEGACY[window.location.hash];
    if (target) router.replace(target);
  }, [router]);

  return null;
}
