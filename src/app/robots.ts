import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * Everything is crawlable. There is deliberately no disallow rule.
 *
 * An earlier version blocked /_next/ on the theory that it held no content.
 * That was wrong and actively harmful: Next serves every stylesheet, client
 * chunk and optimised image from /_next/, so blocking it left Googlebot
 * rendering the site as unstyled HTML with broken images. Google evaluates
 * layout, mobile-friendliness and above-the-fold content from the *rendered*
 * page, so hiding the CSS hides the design from the only visitor that ranks
 * it.
 *
 * There is no crawl-budget argument here either. The site is eleven pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
