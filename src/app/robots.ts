import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * Everything is indexable — this is a site whose entire purpose is being
 * found. The only disallow is Next's internal asset path, which carries no
 * content and only wastes crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/_next/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
