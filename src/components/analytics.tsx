"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * PostHog, wired for the click/funnel feedback loop.
 *
 * Entirely env-gated: with no NEXT_PUBLIC_POSTHOG_KEY set, nothing loads and
 * no network request is made — so local dev and preview deploys stay clean and
 * don't pollute production numbers.
 *
 * Pageviews are captured manually rather than automatically, because the App
 * Router does client-side navigation: PostHog's own history listener misses
 * Next's route changes, which silently under-counts every page after the
 * first.
 */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY) return;

    let cancelled = false;

    void (async () => {
      const posthog = (await import("posthog-js")).default;

      if (!posthog.__loaded) {
        posthog.init(KEY, {
          api_host: HOST,
          capture_pageview: false,
          capture_pageleave: true,
          // Heatmaps are the point of this integration — they're what tells
          // you which project card people actually click.
          enable_heatmaps: true,
          persistence: "localStorage+cookie",
          defaults: "2025-05-24",
        });
      }

      if (cancelled) return;

      const qs = searchParams.toString();
      posthog.capture("$pageview", {
        $current_url: `${window.location.origin}${pathname}${qs ? `?${qs}` : ""}`,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!KEY) return null;
  // useSearchParams needs a Suspense boundary or it opts the whole route out
  // of static rendering — which would defeat the entire SEO setup.
  return (
    <Suspense fallback={null}>
      <PostHogPageview />
    </Suspense>
  );
}
