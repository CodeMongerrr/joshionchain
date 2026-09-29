/**
 * Skills, the same four lines as the resume. Broad, recognisable names only,
 * no self-rated proficiency.
 */

export type StackGroup = {
  label: string;
  /** Optional pointer to the evidence for this group. */
  evidence?: { label: string; href: string };
  items: string[];
};

export const stack: StackGroup[] = [
  {
    label: "Languages and frameworks",
    items: ["TypeScript", "Python", "Go", "Rust", "SQL", "Solidity", "Node.js", "Fastify", "React", "Next.js", "Apollo GraphQL"],
  },
  {
    label: "AI engineering",
    evidence: { label: "→ Earshot", href: "/projects/earshot" },
    items: ["LLM agents", "Tool calling", "RAG", "Vector search", "MCP servers", "Claude Agent SDK", "Structured outputs", "Guardrails"],
  },
  {
    label: "Distributed systems",
    evidence: { label: "→ BatteryFlow, BharatTruck", href: "/#building-now" },
    items: ["Event-driven microservices", "Kafka", "Redis", "PostgreSQL", "BigQuery", "Kubernetes", "GCP", "Terraform", "CI/CD"],
  },
  {
    label: "Web3 and security",
    evidence: { label: "→ Open source", href: "/open-source" },
    items: ["Ethereum", "Smart contracts", "DeFi", "MEV", "Zcash", "Starknet", "P2P networking", "Application security", "Tenant isolation"],
  },
];
