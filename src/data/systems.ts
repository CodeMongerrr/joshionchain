/**
 * "Building now", the three current systems.
 *
 * `summary` is what the home page shows; `body` is the long form that only the
 * detail page renders. That split is what keeps the overview spacious.
 *
 * Confidentiality: BharatTruck and BatteryFlow copy describes architecture and
 * technology only. No product mechanics, business logic, pricing, customer
 * names, internal metrics, or roadmap. No OEM or vehicle brand is ever named.
 * No role titles appear on any system.
 */

export type SubItem = {
  name: string;
  description: string;
};

export type System = {
  slug: string;
  name: string;
  domain: string;
  period: string;
  /** One-line framing that sits in place of a job title. */
  context: string;
  /** Single paragraph, the home page card. */
  summary: string;
  /** Full prose, the detail page only. */
  body: string[];
  /**
   * Countable-from-a-repository facts only. BatteryFlow deliberately carries
   * none: that codebase is shared with two other engineers and a shared total
   * is not mine to claim.
   */
  evidence?: string[];
  tags: string[];
  diagram?: "bharattruck-topology" | "batteryflow-integration";
  subItems?: SubItem[];
  seoTitle: string;
  seoDescription: string;
};

export const systems: System[] = [
  {
    slug: "bharattruck",
    name: "BharatTruck",
    domain: "Freight logistics",
    period: "2026 to present",
    context:
      "A three-person team building for the Indian trucking market. I build the system.",
    summary:
      "A freight-logistics platform for Indian trucking, running as a TypeScript monorepo of nine independently deployable services behind an API gateway. I designed the architecture and wrote most of the codebase.",
    body: [
      "BharatTruck is a freight-logistics platform for Indian trucking. I designed the architecture and wrote most of the codebase.",
      "It runs as a TypeScript monorepo of nine independently deployable services behind an API gateway: authentication, booking, pricing, payments, fleet, cargo ledger, and live tracking, plus a unified progressive web app and an internal operations console. Deployed on Kubernetes with containerized builds and CI that verifies deploys actually serve traffic.",
      "Recent work has been a system-wide authorization redesign: moving off role-string checks onto capability-and-relation-based authorization, so permissions derive from a person's actual relationship to a shipment rather than a label on their token. Alongside that: geofence-gated proof of delivery, India-specific freight compliance documents, and a payments path with an explicit settlement model.",
    ],
    evidence: ["9 services", "~300 commits", "94 merged PRs", "TypeScript", "Kubernetes"],
    tags: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Kubernetes",
      "Docker",
      "GCP",
      "React",
      "PWA",
    ],
    diagram: "bharattruck-topology",
    seoTitle: "BharatTruck: freight logistics platform architecture",
    seoDescription:
      "A TypeScript monorepo of nine independently deployable services behind an API gateway, deployed on Kubernetes, with capability-and-relation-based authorization. Built for the Indian trucking market.",
  },
  {
    slug: "batteryflow",
    name: "BatteryFlow",
    domain: "EV fleet telematics",
    period: "Remote · since July 2024",
    context: "Remote engineer on a production EV telematics platform.",
    summary:
      "An EV fleet-telematics platform that ingests live vehicle and battery data from manufacturer hardware and turns it into fleet operations tooling. My main surface is the vehicle-integration layer.",
    body: [
      "BatteryFlow is an EV fleet-telematics platform: it ingests live vehicle and battery data from manufacturer hardware and turns it into fleet operations tooling.",
      "My main engineering surface is the vehicle-integration layer, a telematics-provider integration that normalizes data and command handling across different EV manufacturers' hardware, where the same logical command maps to different control behavior depending on the vehicle platform.",
      "The role is deliberately broad. I work across the backend rather than owning one service, handle deployments and the release path, and build features end to end. I also work outside engineering, on the business side and on customer onboarding, so I see how the product actually lands with fleet operators, not only how it's built.",
    ],
    tags: [
      "Backend services",
      "REST APIs",
      "Telematics integration",
      "CI/CD",
      "Deployments",
    ],
    diagram: "batteryflow-integration",
    seoTitle: "BatteryFlow: EV fleet telematics and vehicle integration",
    seoDescription:
      "An EV fleet-telematics platform ingesting live vehicle and battery data from manufacturer hardware. Vehicle-integration layer normalizing data and command handling across EV platforms.",
  },
  {
    slug: "jino-labs",
    name: "Jino Labs",
    domain: "Zcash infrastructure",
    period: "2026 to present",
    context: "Where my open-source and protocol work lives.",
    summary:
      "My engineering studio for deep-infrastructure work: on-chain systems, MEV, DeFi, and high-throughput backends. Most current output is Zcash infrastructure, built in the open.",
    body: [
      "Jino Labs is my engineering studio for deep-infrastructure work: on-chain systems, MEV, DeFi, and high-throughput backends. Most current output is Zcash infrastructure, built in the open.",
    ],
    subItems: [
      {
        name: "zsnap",
        description:
          "Snapshot sync for Zebra. Bootstraps a fresh Zcash node from a hash-verified state snapshot in seconds instead of replaying the chain from genesis; Zebra then validates every subsequent block as normal. Testnet-validated prototype.",
      },
      {
        name: "Zcash testnet faucet",
        description:
          "A self-sovereign faucet running its own node, wallet, and miner, paying shielded z-to-z drips and gating claims with browser proof-of-work instead of a third-party captcha vendor.",
      },
      {
        name: "Speedrun Zcash",
        description:
          "Ten hands-on challenges taking a developer from “what is a shielded transaction” to a first merged pull request, on a real in-browser testnet wallet.",
      },
    ],
    tags: [
      "Rust",
      "TypeScript",
      "Zcash",
      "Zebra",
      "WebAssembly",
      "Cloudflare Workers",
    ],
    seoTitle: "Jino Labs: Zcash infrastructure and protocol engineering",
    seoDescription:
      "Engineering studio for deep-infrastructure work: zsnap snapshot sync for Zebra, a self-sovereign Zcash testnet faucet, and Speedrun Zcash. Rust, TypeScript, WebAssembly.",
  },
];

export const systemBySlug = (slug: string) => systems.find((s) => s.slug === slug);
