import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Trailing-slash-free URLs keep exactly one canonical form per route.
  trailingSlash: false,

  async rewrites() {
    // PostHog reverse proxy.
    //
    // us.i.posthog.com is on every mainstream ad-block and tracker-block list,
    // which would silently drop a large share of exactly the developer traffic
    // this site is trying to measure. Serving ingestion from our own origin
    // under /ingest avoids that: to the browser it is a same-origin request.
    //
    // `beforeFiles` puts these ahead of the filesystem and the page routes.
    //
    // Note it does NOT put them ahead of the trailingSlash redirect: a request
    // to /ingest/e/ still gets a 308, verified against a running server. That
    // is fine today because posthog-js requests /ingest/e without the slash,
    // but it is the thing to check first if ingestion ever starts failing
    // after a posthog-js upgrade. The fix would be skipTrailingSlashRedirect
    // plus hand-written canonical redirects for the page routes — not worth
    // trading working SEO canonicalisation for pre-emptively.
    return {
      beforeFiles: [
        // Static assets (recorder, toolbar) come from a different origin
        // than the ingestion API, so they need their own rule first.
        {
          source: "/ingest/static/:path*",
          destination: "https://us-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/ingest/:path*",
          destination: "https://us.i.posthog.com/:path*",
        },
      ],
    };
  },

  async redirects() {
    // The previous site was one page addressed entirely by hash, and hashes
    // never reach the server — so these only catch inbound links that were
    // written as real paths. The hash equivalents are handled client-side in
    // src/components/legacy-hash-redirect.tsx.
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/skills", destination: "/about", permanent: true },
      // /experience used to redirect to /about. It is a real page now.
    ];
  },
};

export default nextConfig;
