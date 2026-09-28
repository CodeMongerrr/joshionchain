/**
 * Past roles only. Current work lives in systems.ts and must not repeat here.
 *
 * Note on numbers: every quantitative claim the old site carried in this
 * section was invented for résumé keyword-matching and has been removed with
 * no substitutes. A number appears on this site only when it is directly
 * countable from a public repository.
 */

export type Role = {
  company: string;
  title: string;
  team?: string;
  period: string;
  location: string;
  description: string;
};

export const experience: Role[] = [
  {
    company: "Gusto Development",
    title: "Blockchain Developer Intern",
    period: "Sep 2025 to Jan 2026",
    location: "Tokyo (Remote)",
    description:
      "Janction DEX on JASMY Chain: AMM and DEX components, subgraph indexing on The Graph, and smart contract integrations.",
  },
  {
    company: "Nethermind",
    title: "Blockchain Engineer Intern",
    team: "Core Blockchain Engineering",
    period: "May to Aug 2024",
    location: "London (Remote)",
    description:
      "Juno, Nethermind's Starknet full node in Go, across the P2P networking, sync and RPC code paths.",
  },
  {
    company: "Tabibi Healthcare Solutions",
    title: "Founding Developer",
    period: "Nov 2023 to Mar 2024",
    location: "Dubai (Remote)",
    description:
      "A healthcare microservices platform: OAuth 2.0 authentication, encryption at rest, and patient anonymization.",
  },
  {
    company: "SimplyFi InfoTech",
    title: "Blockchain Developer Intern",
    period: "Oct to Dec 2023",
    location: "Mumbai (Remote)",
    description:
      "A multichain HD wallet (BIP39/BIP44) and GraphQL federation with Apollo Server.",
  },
];

/** Compressed into one row of small items rather than four large cards. */
export const highlights = [
  "Security fixes · Zebra v6.2.2",
  "Named contributor · Zebra v6.4.0",
  "Blockchain Head · CyberLabs",
];
