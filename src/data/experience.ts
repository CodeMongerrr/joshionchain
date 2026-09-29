/**
 * Roles, mirrored from the resume. The resume is the source of truth for
 * titles, dates and numbers, so a recruiter cross-checking the two never
 * finds a mismatch.
 *
 * Bullets use `**double asterisks**` for the phrases that carry the result.
 * <Rich> renders them bold on the page, and `plain()` strips them for
 * llms.txt, JSON-LD and meta descriptions.
 */

export type Role = {
  company: string;
  companyUrl?: string;
  /** What the company is, in a few words. */
  what: string;
  title: string;
  period: string;
  location: string;
  /** Detail page under /work, when one exists. */
  slug?: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    company: "BatteryFlow",
    companyUrl: "https://batteryflow.io",
    what: "EV fleet platform",
    title: "Founding Engineer (Forward Deployed)",
    period: "Jun 2026 to present",
    location: "Remote",
    slug: "batteryflow",
    bullets: [
      "Brought in to **find and fix the platform's hardest problems**, owning the fleet operator experience end to end, from onboarding and partner feeds to live monitoring and monthly reports, across **3,000+ EVs** and **3.7M events a day**.",
      "Built **route planning in 2 weeks**, a feature the team had never cracked, powered by an in-house **routing engine for all of India** that handles **2,000+ routes a second** on just 2 CPUs, with 1,000x room to grow at a fixed cost.",
      "Restored operators' trust in their data by reviving a partner feed that had dropped **613k packets**, zeroing **705k** impossible-speed readings and ending **6.8M junk errors a week** sent to the partner.",
      "Led fleet onboarding for a **national battery-swap network** and a **new OEM partner**, then architected **self-serve onboarding** so business teams can launch new fleet customers without engineering in the loop.",
      "Single-handedly built **BatteryFlow Rental** for riders and warehouses in **18 days** (181 commits, 38 PRs), with verified payment webhooks, OTP login and tenant isolation tests that fail the build.",
    ],
  },
  {
    company: "BharatTruck",
    what: "Freight marketplace",
    title: "Sole Founding Engineer",
    period: "Jan to Aug 2026",
    location: "Remote",
    slug: "bharattruck",
    bullets: [
      "Turned the founders' brief on **scale, cost, legal and tax compliance** into a live **freight marketplace** for shippers, carriers and drivers, owning **every layer from design to hosting**, from zero to its **first paid trip in 4 months**.",
      "Gave shippers quotes that cover the real cost of a trip, replacing flat pricing that underpriced fuel by **38%** with a 4-layer pricing engine, built in one day, that matches the fleet's own cost model to **0.5% median error**.",
      "Restored production delivery after 3 weeks of silent deploy failures by rebuilding CI/CD with health probes, then shipped **115 production deploys in 31 days** across 7 microservices, authoring 125 of the first 126 PRs.",
      "Protected shipper and carrier accounts before launch by closing **34 review findings in 2 weeks**, including open writes to the pricing tables behind every quote and reset tokens that worked as full logins.",
    ],
  },
  {
    company: "Gusto Development",
    companyUrl: "https://www.gustodevelopment.com/",
    what: "Janction DEX on JASMY Chain",
    title: "Blockchain Developer (part-time)",
    period: "Sep 2025 to Jan 2026",
    location: "Japan (Remote)",
    bullets: [
      "Custom-built **swap execution** for **Janction DEX**, a **Uniswap V3-style exchange**, around the client's **Japan-specific market requirements** that standard DEX logic could not handle, plus its Subgraph analytics.",
    ],
  },
  {
    company: "Nethermind",
    companyUrl: "https://www.nethermind.io",
    what: "Ethereum and Starknet core infrastructure",
    title: "Research Intern",
    period: "May to Aug 2024",
    location: "London (Remote)",
    bullets: [
      "Joined the core infrastructure team behind **one of Ethereum's leading execution clients** to work on **Juno**, Nethermind's Go full node for **Starknet**, across P2P networking, chain sync and the JSON-RPC API.",
      "Chased a P2P bug where Juno nodes **never rejoined peers after going offline** and briefed the core maintainers.",
    ],
  },
];

/** Earlier roles. Shown small, below the main list. */
export type EarlierRole = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
};

export const earlier: EarlierRole[] = [
  {
    company: "Tabibi Healthcare Solutions",
    title: "Founding Developer",
    period: "Nov 2023 to Mar 2024",
    location: "Dubai (Remote)",
    description:
      "A healthcare microservices platform with OAuth 2.0 authentication, encryption at rest and patient anonymization.",
  },
  {
    company: "SimplyFi InfoTech",
    title: "Blockchain Developer Intern",
    period: "Oct to Dec 2023",
    location: "Mumbai (Remote)",
    description: "A multichain HD wallet (BIP39 and BIP44) and GraphQL federation with Apollo Server.",
  },
  {
    company: "CyberLabs, IIT (ISM)",
    title: "Blockchain Developer (part-time)",
    period: "Aug 2023 to Jun 2025",
    location: "Dhanbad",
    description:
      "Built and mentored blockchain projects at the campus tech lab, including Certicryp, an ERC-721 certificate minter with encrypted off-chain metadata.",
  },
];

/** Strip the bold markers for plain-text surfaces. */
export const plain = (s: string) => s.replace(/\*\*/g, "");

/** Compressed into one row of small items rather than large cards. */
export const highlights = [
  "Both security fixes · Zebra v6.2.2",
  "Named contributor · Zebra v6.4.0",
  "ex-Nethermind",
];
