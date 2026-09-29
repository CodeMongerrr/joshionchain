import type { Metadata } from "next";

import { roles } from "@/data/experience";
import { contactEmail, extraSameAs, site, socials } from "@/data/site";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { systems } from "@/data/systems";

/**
 * One place that knows how a page describes itself to search engines and
 * unfurlers. Every route builds its metadata through `pageMeta` so canonical
 * URLs, OG images and title formatting can never drift apart.
 */

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

type PageMetaArgs = {
  title: string;
  description: string;
  /** Route path, e.g. "/work/bharattruck". Drives canonical and og:url. */
  path: string;
  /** Set false on pages that should stay out of the index. */
  index?: boolean;
};

export function pageMeta({
  title,
  description,
  path,
  index = true,
}: PageMetaArgs): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@JoshiOnChain",
    },
  };
}

/* ── JSON-LD ──────────────────────────────────────────────────────────────
   Structured data is how a search engine learns that this site is one
   person, what they build, and which external profiles are the same
   identity. `sameAs` is the signal that consolidates the GitHub, LinkedIn
   and X profiles onto this entity, which is what makes a name query
   resolve here rather than to a directory scrape.
   ────────────────────────────────────────────────────────────────────── */

export function personSchema() {
  const current = roles[0];
  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: "Aditya",
    familyName: "Joshi",
    /* Handles people actually search for, tied to one entity. */
    alternateName: ["JoshiOnChain", "CodeMongerrr", "Aditya Roshan Joshi"],
    url: site.url,
    mainEntityOfPage: { "@id": `${site.url}/#profilepage` },
    image: `${site.url}/opengraph-image`,
    ...(contactEmail ? { email: `mailto:${contactEmail}` } : {}),
    description: site.description,
    jobTitle: site.role,
    hasOccupation: {
      "@type": "Occupation",
      name: "Forward Deployed Engineer",
      occupationalCategory: "15-1252.00 Software Developers",
      skills: "Distributed systems, AI agents, crypto infrastructure, backend engineering, partner integrations",
    },
    worksFor: current?.companyUrl
      ? { "@type": "Organization", name: current.company, url: current.companyUrl }
      : undefined,
    homeLocation: { "@type": "Place", name: site.location },
    knowsAbout: [
      "Forward deployed engineering",
      "Distributed systems",
      "AI agents",
      "LLM tool calling",
      "Model Context Protocol",
      "Event-driven microservices",
      "Kafka",
      "Kubernetes",
      "Zcash",
      "Ethereum",
      "MEV",
      "Application security",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology (ISM) Dhanbad",
    },
    sameAs: [...socials.map((s) => s.href), ...extraSameAs],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    /* Google's "site name" feature reads `name` and `alternateName` from
       WebSite schema on the homepage to decide what to print in bold above
       the URL in a result. Short and brand-like beats descriptive here: the
       full title tag is already doing the descriptive work. */
    name: site.name,
    alternateName: ["JoshiOnChain", "joshionchain", "joshionchain.com"],
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
  };
}

/**
 * ProfilePage marks the homepage as being *about* a person rather than
 * merely mentioning one. It is the type Google documents for creator and
 * profile pages, and it is what ties every other page's author reference
 * back to a single entity.
 */
export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${site.url}/#profilepage`,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
  };
}

export function projectSchema(slug: string) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@type": "SoftwareSourceCode",
    "@id": `${site.url}/projects/${p.slug}/#project`,
    name: p.title,
    description: p.summary,
    codeRepository: p.repoUrl,
    programmingLanguage: p.language,
    url: absoluteUrl(`/projects/${p.slug}`),
    author: { "@id": `${site.url}/#person` },
  };
}

export function systemSchema(slug: string) {
  const s = systems.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${s.slug}/#system`,
    name: s.name,
    description: s.summary,
    about: s.domain,
    url: absoluteUrl(`/work/${s.slug}`),
    author: { "@id": `${site.url}/#person` },
  };
}

/**
 * A post from X or LinkedIn, as it appears on its page here. `sameAs` points
 * at the original, so the two are understood as one post, not a copy.
 */
export function postSchema(slug: string) {
  const p = posts.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@type": "SocialMediaPosting",
    "@id": `${site.url}/posts/${p.slug}/#post`,
    headline: p.title,
    description: p.note,
    articleBody: p.text,
    datePublished: p.date,
    url: absoluteUrl(`/posts/${p.slug}`),
    sameAs: p.url,
    author: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Wraps any set of schema nodes into a single @graph document. */
export function jsonLd(...nodes: (object | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
