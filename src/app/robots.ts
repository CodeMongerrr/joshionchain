import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * Everything is crawlable, by search engines and by AI agents alike. The site
 * exists to be found and summarised, so there is deliberately no disallow
 * rule, and the AI crawlers are named so an allowlist-by-default crawler
 * never has to guess.
 *
 * Never block /_next/. It serves every stylesheet and image, and Google
 * judges layout from the rendered page.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
