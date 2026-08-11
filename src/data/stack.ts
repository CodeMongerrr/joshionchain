/**
 * Stack, grouped by domain and linked to the work that proves it.
 * No percentages, no bars, no self-rated proficiency.
 */

export type StackGroup = {
  label: string;
  /** Optional pointer to the evidence for this group. */
  evidence?: { label: string; href: string };
  items: string[];
};

export const stack: StackGroup[] = [
  {
    label: "Systems & backend",
    items: ["TypeScript", "Node.js", "Go", "Rust", "Python", "PostgreSQL", "Redis"],
  },
  {
    label: "Infrastructure",
    evidence: { label: "→ BharatTruck, BatteryFlow", href: "/work" },
    items: ["Kubernetes", "Docker", "GCP", "CI/CD", "Supabase", "Deployments"],
  },
  {
    label: "Protocol & cryptography",
    evidence: { label: "→ Open source", href: "/open-source" },
    items: [
      "Zcash",
      "Zebra",
      "Ethereum",
      "Solidity",
      "zkSNARKs",
      "FHE / fhEVM",
      "Ring signatures",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind", "PWA"],
  },
];
