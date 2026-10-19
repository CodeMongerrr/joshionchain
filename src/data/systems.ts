/**
 * Long-form pages under /work. The home page only shows each role's bullets;
 * the depth, diagrams and studio work live here.
 *
 * Numbers match the resume. Partner and customer names are never printed,
 * and no OEM or vehicle brand is ever named.
 */

export type SubItem = {
  name: string;
  description: string;
  href?: string;
};

export type System = {
  slug: string;
  name: string;
  domain: string;
  period: string;
  /** Title or relationship, shown in place of a job title. */
  context: string;
  /** Single paragraph, used on the work index. */
  summary: string;
  /** Full prose, the detail page only. */
  body: string[];
  /** Short facts shown as a strip under the title. */
  evidence?: string[];
  tags: string[];
  diagram?: "bharattruck-topology";
  subItems?: SubItem[];
  seoTitle: string;
  seoDescription: string;
};

export const systems: System[] = [
  {
    slug: "batteryflow",
    name: "BatteryFlow",
    domain: "EV fleet platform",
    period: "Jun 2026 to present",
    context: "Founding Engineer (Forward Deployed)",
    summary:
      "An EV fleet platform. I work there as a forward deployed founding engineer and own the fleet operator experience end to end, from onboarding and partner integrations to live monitoring and reporting.",
    body: [
      "BatteryFlow runs an EV fleet telematics platform for fleet operators. I joined as a forward deployed founding engineer, and I own the fleet operator experience end to end, from onboarding and partner integrations through live monitoring to the reports operators work from.",
      "Day to day that is backend services, streaming data pipelines, the data quality that fleet alerting depends on, and the delivery path around all of it, from schema and API design through CI, deployment and production support.",
      "Project-level detail from this role is not published. What is here is the role and the technologies, in general terms.",
    ],
    tags: ["TypeScript", "Kafka", "Redis", "PostgreSQL", "BigQuery", "Apollo GraphQL", "Kubernetes", "GCP"],
    seoTitle: "BatteryFlow \u00b7 forward deployed founding engineer",
    seoDescription:
      "Aditya Joshi, forward deployed founding engineer at BatteryFlow, an EV fleet platform. Backend services, streaming data pipelines, partner integrations and live monitoring, in TypeScript, Kafka, Redis, PostgreSQL and GCP.",
  },
  {
    slug: "bharattruck",
    name: "BharatTruck",
    domain: "Freight marketplace",
    period: "Jan to Aug 2026",
    context: "Sole Founding Engineer",
    summary:
      "A freight marketplace for Indian shippers, carriers and drivers. As its only engineer I designed, built, hosted and ran every layer, from zero to its first paid trip in 4 months.",
    body: [
      "BharatTruck is a freight marketplace for Indian shippers, carriers and drivers. The founders brought the vision for scale, cost, legal and tax compliance. As the sole founding engineer I designed, built, hosted and ran every layer of it, from zero to its first paid trip in production in 4 months.",
      "It runs as seven independently deployable microservices behind an API gateway, covering authentication, booking, pricing, payments, fleet, the cargo ledger and live tracking, with a unified web app and an internal operations console on top.",
      "After a monorepo move, deploys had been failing silently for 3 weeks while CI stayed green. I rebuilt the pipeline with post-deploy health probes, then shipped 115 production deploys in 31 days and authored 125 of the first 126 PRs.",
      "Quotes had to cover the real cost of a trip. Flat pricing underpriced fuel by 38%, so I built a 4-layer pricing engine in a day that matches the fleet's own cost model to 0.5% median error. Live truck tracking stays inside Google Maps' free tier with one cached ETA call per trip every 45 seconds, however many people watch.",
      "Before launch I closed 34 review findings in 2 weeks, 11 of them in a single day, including open writes to the pricing tables behind every quote and reset tokens that worked as full logins.",
    ],
    evidence: ["7 microservices", "First paid trip in 4 months", "115 deploys in 31 days", "125 of the first 126 PRs"],
    tags: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "Redis", "GCP", "CI/CD"],
    diagram: "bharattruck-topology",
    seoTitle: "BharatTruck · a freight marketplace built by one engineer",
    seoDescription:
      "Aditya Joshi was the sole founding engineer of BharatTruck, an Indian freight marketplace. Seven microservices, a pricing engine within 0.5% of the fleet's cost model, 115 production deploys in 31 days, and a first paid trip in 4 months.",
  },
  {
    slug: "nethermind",
    name: "Nethermind",
    domain: "Ethereum and Starknet core infrastructure",
    period: "May to Aug 2024",
    context: "Research Intern",
    summary:
      "Core infrastructure research on the team behind one of Ethereum's leading execution clients. I worked on Juno, Nethermind's Go full node for Starknet, across P2P networking, chain sync and the JSON-RPC API.",
    body: [
      "Nethermind builds core infrastructure for Ethereum, including one of its leading execution clients. I spent May to August 2024 on its core infrastructure team, working on Juno, the Go full node for Starknet.",
    ],
    evidence: ["Juno, the Starknet full node", "P2P networking", "Chain sync", "JSON-RPC API"],
    tags: ["Go", "Starknet", "Ethereum", "P2P networking", "JSON-RPC"],
    seoTitle: "Nethermind · Juno, the Go full node for Starknet",
    seoDescription:
      "Aditya Joshi worked on Nethermind's core infrastructure team as a research intern, on Juno, the Go full node for Starknet, across P2P networking, chain sync and the JSON-RPC API.",
  },
  {
    slug: "jino-labs",
    name: "Jino Labs",
    domain: "Zcash and agent infrastructure",
    period: "2026 to present",
    context: "The studio I build with",
    summary:
      "An engineering studio building deep infrastructure in the open, mostly for Zcash, plus the agent tooling we use every day. The work below is the studio's, built together.",
    body: [
      "Jino Labs is an engineering studio for deep infrastructure work, on chain systems, MEV, DeFi and high-throughput backends. Most of its current output is Zcash infrastructure, built in the open, alongside tooling for working with AI agents.",
      "Everything listed here is studio work built together. Earshot is the piece I built on my own.",
    ],
    subItems: [
      {
        name: "Earshot",
        href: "https://www.npmjs.com/package/@jino-labs/earshot",
        description:
          "Watch and steer Claude Code agent sessions across machines from one page. End-to-end encrypted so the relay never sees code or prompts, with guest links that can watch but never issue commands. Published on npm with zero runtime dependencies.",
      },
      {
        name: "zsnap",
        description:
          "Snapshot sync for Zebra. It bootstraps a fresh Zcash node from a hash-verified state snapshot in seconds instead of replaying the chain from genesis, and Zebra then validates every later block as normal. A testnet-validated prototype.",
      },
      {
        name: "Zcash testnet faucet",
        description:
          "A self-sovereign faucet running its own node, wallet and miner, paying shielded drips and gating claims with browser proof of work instead of a third-party captcha.",
      },
      {
        name: "Speedrun Zcash",
        description:
          "Ten hands-on challenges that take a developer from their first shielded transaction to a first merged pull request, on a real in-browser testnet wallet.",
      },
    ],
    tags: ["Rust", "TypeScript", "Zcash", "Zebra", "WebAssembly", "Cloudflare Workers", "Claude Code"],
    seoTitle: "Jino Labs · Zcash infrastructure and agent tooling",
    seoDescription:
      "The engineering studio Aditya Joshi builds with. Earshot for steering Claude Code agents across machines, zsnap snapshot sync for Zebra, a self-sovereign Zcash testnet faucet, and Speedrun Zcash.",
  },
];

export const systemBySlug = (slug: string) => systems.find((s) => s.slug === slug);
