/**
 * The four results a recruiter should leave with. Each one is a sentence a
 * non-engineer understands, the place it happened, and one link to the proof.
 * Numbers match the resume exactly.
 */

export type Result = {
  claim: string;
  where: string;
  proof: { label: string; href: string; external?: boolean };
};

export const results: Result[] = [
  {
    claim: "Built route planning in 2 weeks, a feature the team had never cracked, on an in-house routing engine for all of India.",
    where: "BatteryFlow",
    proof: { label: "How it works", href: "/work/batteryflow" },
  },
  {
    claim: "Took a freight marketplace from zero to its first paid trip in 4 months, as its only engineer.",
    where: "BharatTruck",
    proof: { label: "The build", href: "/work/bharattruck" },
  },
  {
    claim: "Wrote both security fixes in Zcash's Zebra v6.2.2, the full node of a $26B+ privacy network, merged in 31 hours.",
    where: "Zcash Foundation",
    proof: {
      label: "Release notes",
      href: "https://github.com/ZcashFoundation/zebra/releases/tag/v6.2.2",
      external: true,
    },
  },
  {
    claim: "Found 3 weeks of silent deploy failures, rebuilt CI/CD, then shipped 115 production deploys in 31 days.",
    where: "BharatTruck",
    proof: { label: "The build", href: "/work/bharattruck" },
  },
];
