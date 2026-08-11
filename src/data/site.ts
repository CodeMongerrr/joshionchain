/**
 * Site-wide identity and configuration.
 *
 * Every piece of copy on the site lives in this directory rather than in JSX,
 * so text can be edited without touching components.
 */

export const site = {
  name: "Aditya Joshi",
  /** Canonical origin. Drives sitemap, robots, canonical tags and OG urls. */
  url: "https://www.joshionchain.com",
  domain: "joshionchain.com",
  title: "Aditya Joshi | Backend and Distributed Systems Engineer",
  tagline:
    "I build production systems for freight logistics, EV fleet telematics, and privacy-protocol infrastructure.",
  supporting:
    "Backend and distributed systems, mostly TypeScript, Go, and Rust. Four domains in three years.",
  description:
    "I build production systems for freight logistics, EV fleet telematics, and privacy-protocol infrastructure. Backend engineering in TypeScript, Go, and Rust.",
  statusPill: "Building BharatTruck · Contributing to Zcash",
  credential: "B.Tech · IIT (ISM) Dhanbad",
  locale: "en_US",
} as const;

/**
 * Public contact address. Typed as nullable so the placeholder path stays
 * compiled and the address can be pulled at any time without a refactor.
 */
export const contactEmail: string | null = "joshionchain@gmail.com";

export const socials = [
  {
    label: "GitHub",
    handle: "CodeMongerrr",
    href: "https://github.com/CodeMongerrr",
  },
  {
    label: "LinkedIn",
    handle: "adityaroshanjoshiiitism",
    href: "https://www.linkedin.com/in/adityaroshanjoshiiitism",
  },
  {
    label: "X",
    handle: "JoshiOnChain",
    href: "https://x.com/JoshiOnChain",
  },
] as const;

export const githubUser = "CodeMongerrr";

export const nav = [
  { label: "Now", href: "/#building-now" },
  { label: "Work", href: "/work" },
  { label: "Open source", href: "/open-source" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;
