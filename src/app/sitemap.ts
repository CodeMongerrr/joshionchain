import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { systems } from "@/data/systems";

/**
 * Generated from the same data the pages render, so a new system or project
 * can never be added without also appearing in the sitemap.
 *
 * `lastModified` is intentionally a single build timestamp rather than a
 * per-page date: a fabricated per-URL date is worse than an honest shared one,
 * and search engines discount dates that churn on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: url("/open-source"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    ...systems.map((s) => ({
      url: url(`/work/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...projects.map((p) => ({
      url: url(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
