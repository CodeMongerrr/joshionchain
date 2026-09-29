/**
 * The resume as data. Experience comes from experience.ts; this file carries
 * the parts only the resume shows. Keep it word for word with the PDF.
 *
 * The downloadable PDF is printed from /resume. After changing this file,
 * experience.ts or stack.ts, run `npm run resume:pdf` against a running build
 * so public/aditya-joshi-resume.pdf says the same thing.
 */

export const resumeSummary =
  "Founding engineer across **logistics, EV fleet telematics and crypto infrastructure**, building the backends, integrations and data pipelines they run on. Owns work end to end, from **system design and APIs to partner integrations, cloud deployment, security and production support**. Works directly with **founders, customers and partners** to turn operational problems into shipped software. Built **2 startup platforms from scratch**, ex-**Nethermind**, and shipped **Zcash core-node security fixes**. Ships **well-tested, documented, production-guarded PRs**, from CI gates and health checks to runbooks and a 100k-case test suite, and writes the design docs, cost briefs and verification reports behind key product and infrastructure decisions.";

export type ResumeEntry = {
  name: string;
  href?: string;
  meta: string;
  period: string;
  bullets: string[];
};

export const resumeOpenSource: ResumeEntry[] = [
  {
    name: "Zebra, the Zcash Foundation's Rust full node",
    href: "https://github.com/ZcashFoundation/zebra/pulls?q=is%3Apr+author%3ACodeMongerrr+is%3Amerged",
    meta: "Rust, Bash · 4 merged PRs",
    period: "Jul to Aug 2026",
    bullets: [
      "Wrote the **2 security fixes** in **Zebra v6.2.2**, full node of a **$26B+ privacy network**, with both merged in **31 hours**.",
      "Eliminated a shell-injection path in zebrad-log-filter by reproducing it with a crafted log line and rewriting the filter in pure Bash, so a malicious log line can no longer run commands on a node operator's machine (#11050).",
      "Stopped the Elasticsearch password leaking into the startup config dump with a RedactedString type (#11051).",
    ],
  },
];

export const resumeProjects: ResumeEntry[] = [
  {
    name: "MEV Shield",
    href: "https://github.com/CodeMongerrr/MEV-Shield",
    meta: "TypeScript, viem, Uniswap V2 AMM math, Flashbots, ENS",
    period: "Feb 2026",
    bullets: [
      "Cut the modeled sandwich-attack loss on a **$660K (250 ETH) swap** from **$35.9K** to under $1K, a **97% reduction** for DeFi traders, by simulating the attacking bot on live Ethereum data and picking the cheapest safe route.",
      "Replays the attack in exact Uniswap V2 math and searches up to 1,100 public and private route splits per trade.",
    ],
  },
];

export const resumeEducation = {
  school: "Indian Institute of Technology (ISM) Dhanbad",
  degree: "Integrated Master of Technology",
  period: "May 2026",
  location: "Dhanbad, India",
};
