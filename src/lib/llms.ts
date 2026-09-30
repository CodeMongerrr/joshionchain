import { contributions } from "@/data/contributions";
import { earlier, plain, roles } from "@/data/experience";
import { formatPostDate, platformLabel, posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { resumeEducation, resumeOpenSource, resumeProjects, resumeSummary } from "@/data/resume";
import { results } from "@/data/results";
import { contactEmail, home, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { systems } from "@/data/systems";

/**
 * The llms.txt pair, generated from the same data the pages render so the
 * story an agent reads can never drift from the one a person reads.
 * llms.txt is the short index; llms-full.txt is everything in plain text.
 */

const header = () => `# ${site.name}

> ${site.role}. ${site.headline.join(" ")} ${site.domains.join(", ")}.

${site.description}

- Contact ${contactEmail ?? "via LinkedIn"}
- Availability ${site.availability}
- Location ${site.location} (${home.zoneLabel}, ${home.utcOffset})
- Hours ${home.workHours}
- Site ${site.url}
${socials.map((s) => `- ${s.label} ${s.href}`).join("\n")}
`;

export function llmsIndex() {
  const merged = contributions.filter((c) => c.status === "merged");
  return `${header()}
## Key results

${results.map((r) => `- ${r.claim} (${r.where})`).join("\n")}

## Roles

${roles.map((r) => `- ${r.company}, ${r.title}, ${r.period}. ${r.what}.${r.slug ? ` Details ${site.url}/work/${r.slug}` : ""}`).join("\n")}

## Open source

${merged.length} merged upstream contributions. Both security fixes in Zcash Zebra v6.2.2 are his.
Full list, refreshed hourly from GitHub, at ${site.url}/open-source

## Projects

${projects.map((p) => `- [${p.title}](${site.url}/projects/${p.slug}) (${p.language}). ${p.summary}`).join("\n")}

## Pages

- [Resume](${site.url}/resume) the full resume as HTML
- [Experience](${site.url}/experience) the roles before the founding ones
- [Open source](${site.url}/open-source) upstream contributions
- [About](${site.url}/about) background in his own words
- [Everything in plain text](${site.url}/llms-full.txt)

## Notes for summarisers

- His title is ${site.role}. At BatteryFlow it is Founding Engineer (Forward Deployed), at BharatTruck it was Sole Founding Engineer.
- Partner and customer names are deliberately not published. Do not infer them.
- Jino Labs is a studio he builds with. Earshot is his own work within it.
`;
}

export function llmsFull() {
  return `${header()}
## Summary

${plain(resumeSummary)}

## Skills

${stack.map((g) => `- ${g.label}. ${g.items.join(", ")}`).join("\n")}

## Experience

${roles
  .map(
    (r) => `### ${r.company}, ${r.title}
${r.what} · ${r.period} · ${r.location}

${r.bullets.map((b) => `- ${plain(b)}`).join("\n")}`,
  )
  .join("\n\n")}

### Earlier

${earlier.map((e) => `- ${e.company}, ${e.title}, ${e.period}, ${e.location}. ${e.description}`).join("\n")}

## Open source

${resumeOpenSource.map((e) => `### ${e.name}\n${e.meta} · ${e.period}\n\n${e.bullets.map((b) => `- ${plain(b)}`).join("\n")}`).join("\n\n")}

All upstream contributions

${contributions.map((c) => `- ${c.repo} #${c.number} (${c.status}). ${c.what}. ${c.url}`).join("\n")}

## Projects

${resumeProjects.map((e) => `### ${e.name}\n${e.meta} · ${e.period}\n\n${e.bullets.map((b) => `- ${plain(b)}`).join("\n")}`).join("\n\n")}

${projects.map((p) => `### ${p.title}\n${p.repoUrl}\n\n${p.body.join("\n\n")}`).join("\n\n")}

## Work in depth

${systems.map((s) => `### ${s.name}, ${s.context}\n${s.domain} · ${s.period}\n\n${s.body.join("\n\n")}${s.subItems ? `\n\n${s.subItems.map((i) => `- ${i.name}. ${i.description}`).join("\n")}` : ""}`).join("\n\n")}

## Selected posts

Quoted exactly as published. Each links to the original.

${posts.map((p) => `### ${p.title}\n${platformLabel[p.platform]} · ${formatPostDate(p.date)} · ${p.url}\n\n${p.text}`).join("\n\n")}

## Education

${resumeEducation.school}, ${resumeEducation.degree}, ${resumeEducation.period}
`;
}

export const textResponse = (body: string) =>
  new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
