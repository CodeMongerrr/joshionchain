import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { systems } from "@/data/systems";

/**
 * Generated from the same data the pages render, so a new system or project
 * can never be added without also appearing here. `lastModified` is one
 * honest build timestamp rather than invented per-page dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: url("/open-source"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/experience"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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
