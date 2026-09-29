/**
 * Site-wide identity and configuration.
 *
 * Every piece of copy on the site lives in this directory rather than in JSX,
 * so text can be edited without touching components. The resume is the source
 * of truth for titles, dates and numbers; keep this file in step with it.
 *
 * Copy rule: no colons, semicolons, underscores, double hyphens, tildes or
 * long dashes in anything a visitor reads.
 */

export const site = {
  name: "Aditya Joshi",
  handle: "JoshiOnChain",
  /** Canonical origin. Drives sitemap, robots, canonical tags and OG urls. */
  url: "https://www.joshionchain.com",
  domain: "joshionchain.com",
  role: "Forward Deployed Founding Engineer",
  /** Hero, under the name. */
  tagline: "I find what is actually broken in a business and ship the system that fixes it.",
  supporting:
    "Forward deployed founding engineer across distributed systems, AI agents and crypto infrastructure. Two platforms built from scratch, ex-Nethermind, and both security fixes in Zcash Zebra v6.2.2.",
  statusPill: "Open to forward deployed roles · US, UK, UAE or remote",
  title: "Aditya Joshi | Forward Deployed Founding Engineer",
  /** The positioning line, split so the second half can render quieter. */
  headline: ["I find what is actually broken", "and ship the fix."],
  /** One sentence a recruiter or an agent can quote verbatim. */
  summary:
    "Forward deployed founding engineer across logistics, EV fleet telematics and crypto infrastructure. I own the work end to end, from system design and APIs to partner integrations, cloud, security and production support, and I work directly with founders, customers and partners.",
  proof: [
    "2 platforms built from scratch",
    "ex-Nethermind",
    "Both security fixes in Zcash Zebra v6.2.2",
  ],
  domains: ["Distributed systems", "AI agents", "Crypto infrastructure"],
  availability: "Open to forward deployed and founding roles in the US, UK and UAE, or remote",
  description:
    "Aditya Joshi (JoshiOnChain) is a forward deployed founding engineer. He finds what is actually broken in a business and ships the system that fixes it, across distributed systems, AI agents and crypto infrastructure. Ex-Nethermind, and the author of both security fixes in Zcash Zebra v6.2.2.",
  location: "Mumbai, India",
  credential: "Integrated M.Tech · IIT (ISM) Dhanbad",
  locale: "en_US",
} as const;

/**
 * Public contact address. Typed as nullable so the placeholder path stays
 * compiled and the address can be pulled at any time without a refactor.
 */
export const contactEmail: string | null = "joshionchain@gmail.com";

/** Every public identity that is the same person. Feeds JSON-LD sameAs. */
export const socials = [
  {
    label: "LinkedIn",
    handle: "joshionchain",
    href: "https://www.linkedin.com/in/joshionchain/",
  },
  {
    label: "GitHub",
    handle: "CodeMongerrr",
    href: "https://github.com/CodeMongerrr",
  },
  {
    label: "X",
    handle: "JoshiOnChain",
    href: "https://x.com/JoshiOnChain",
  },
] as const;

/** Where the local time on the contact section is read from. */
export const home = { city: "Mumbai", timeZone: "Asia/Kolkata", zoneLabel: "IST" } as const;

/**
 * One-click starts for an email. Each opens the visitor's mail app with the
 * subject filled in, and for the two that need details, a short skeleton of
 * what helps me reply quickly.
 */
export const contactTopics = [
  {
    label: "A role",
    subject: "A role for Aditya",
    body: "Hi Aditya,\n\nThe company\n\nThe role\n\nWhere it is based, or remote\n\n",
  },
  {
    label: "A project",
    subject: "A project for Aditya",
    body: "Hi Aditya,\n\nWhat is broken, or what needs building\n\nThe timeline\n\n",
  },
  {
    label: "Just to say hi",
    subject: "Hello from joshionchain.com",
    body: "Hi Aditya,\n\n",
  },
] as const;

/** A mailto link, with the subject and body encoded the way mail apps expect. */
export function mailto({ subject, body }: { subject?: string; body?: string } = {}) {
  if (!contactEmail) return null;
  const params = [
    subject ? `subject=${encodeURIComponent(subject)}` : null,
    body ? `body=${encodeURIComponent(body)}` : null,
  ].filter(Boolean);
  return `mailto:${contactEmail}${params.length ? `?${params.join("&")}` : ""}`;
}

/** Profiles that prove identity to crawlers but don't need a visible button. */
export const extraSameAs = ["https://www.npmjs.com/package/@jino-labs/earshot"] as const;

export const githubUser = "CodeMongerrr";

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Open source", href: "/open-source" },
  { label: "Resume", href: "/resume" },
  { label: "About", href: "/about" },
] as const;

/** The one filled button in the navbar, so contact is a click away from anywhere. */
export const navCta = { label: "Get in touch", href: "/#contact" } as const;

/** The resume as a file, generated from /resume by `npm run resume:pdf`. */
export const resumePdf = { href: "/aditya-joshi-resume.pdf", filename: "Aditya-Joshi-Resume.pdf" } as const;
