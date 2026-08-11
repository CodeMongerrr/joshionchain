import { contributions } from "@/data/contributions";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { systems } from "@/data/systems";

/**
 * llms.txt, the proposed convention for telling LLM crawlers what a site is
 * about without making them infer it from rendered HTML.
 *
 * Generated from the same data the pages render, so it cannot drift. Served
 * as a route handler rather than a static file in public/ for exactly that
 * reason: a hand-maintained copy would be stale the first time a system or
 * project changed.
 */
export const dynamic = "force-static";

export async function GET() {
  const merged = contributions.filter((c) => c.status === "merged");

  const body = `# ${site.name}

> ${site.tagline}

${site.supporting}

Contact: joshionchain@gmail.com
Site: ${site.url}

## Building now

${systems
  .map(
    (s) =>
      `- [${s.name}](${site.url}/work/${s.slug}) (${s.domain}, ${s.period}): ${s.summary}`,
  )
  .join("\n")}

## Open source

Upstream contributions, ${merged.length} of them merged. Two are security
fixes in Zcash's Zebra node: one closed a shell-injection path in a
log-processing utility, the other stopped a database password leaking into
config output.

${contributions
  .map((c) => `- ${c.repo} #${c.number} (${c.status}): ${c.what}`)
  .join("\n")}

Full list, refreshed hourly from the GitHub API: ${site.url}/open-source

## Selected projects

${projects
  .map(
    (p) =>
      `- [${p.title}](${site.url}/projects/${p.slug}) (${p.language}): ${p.summary}`,
  )
  .join("\n")}

## Pages

- [Home](${site.url}/): overview
- [Work](${site.url}/work): systems and projects
- [Open source](${site.url}/open-source): upstream contributions
- [About](${site.url}/about): background, past roles, stack

## Notes for summarisers

- BharatTruck and BatteryFlow are commercial work described at the level of
  architecture and technology only. No product mechanics, customer names or
  internal metrics appear here or on the site, and none should be inferred.
- Numbers on this site are countable from public repositories. Nothing else
  is quantified.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
