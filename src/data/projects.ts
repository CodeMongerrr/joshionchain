/**
 * Things built on his own, capped at four. Each one is public and readable.
 */

export type Project = {
  slug: string;
  title: string;
  /** Where the source or package lives, shown in mono. */
  repo: string;
  repoUrl: string;
  repoLabel: string;
  language: string;
  /** The list row and the detail page lead. */
  summary: string;
  /** Long form, detail page only. */
  body: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: "earshot",
    title: "Earshot",
    repo: "npm @jino-labs/earshot",
    repoUrl: "https://www.npmjs.com/package/@jino-labs/earshot",
    repoLabel: "View on npm",
    language: "Node.js",
    summary:
      "Watch and steer Claude Code agent sessions across machines from one page, end-to-end encrypted so the relay never sees code or prompts.",
    body: [
      "Earshot lets one person watch and steer many Claude Code agent sessions running across several machines, from one page, without trusting a relay with source code or prompts.",
      "It is a zero-dependency Node CLI and hub with four ways into a live session, tmux injection, a hook inbox, headless resume and a resident worker. The cloud relay runs on Cloudflare Workers and Durable Objects and never holds keys. Every payload is AES-GCM encrypted with HKDF-derived keys carried in the URL fragment, so the relay only ever sees ciphertext.",
      "Guest links get a key that cannot produce a command, and their requests wait for the owner's approval. It shipped as six releases over two days and is published on npm.",
    ],
    tags: ["Node.js", "Claude Code", "Cloudflare Workers", "Durable Objects", "AES-GCM"],
    seoTitle: "Earshot · steer Claude Code agents across machines, end-to-end encrypted",
    seoDescription:
      "Earshot is a zero-dependency npm tool by Aditya Joshi for watching and steering Claude Code agent sessions across machines, with an end-to-end encrypted Cloudflare relay that never sees code or prompts.",
  },
  {
    slug: "mev-shield",
    title: "MEV Shield",
    repo: "CodeMongerrr/MEV-Shield",
    repoUrl: "https://github.com/CodeMongerrr/MEV-Shield",
    repoLabel: "View source on GitHub",
    language: "TypeScript",
    summary:
      "Cut the modeled sandwich-attack loss on a $660K (250 ETH) swap from $35.9K to under $1K, a 97% reduction, by simulating the attacking bot on live Ethereum data.",
    body: [
      "MEV Shield simulates the exact sandwich attack a bot would run against your swap, prices your real exposure, and then picks the cheapest safe way to execute, a public swap, a private relay or a split order.",
      "The attack is replayed in exact Uniswap V2 integer math on live mainnet reserves, and the search covers up to 1,100 public and private route splits per trade. In the model a 250 ETH swap can lose $35.9K to a sandwich, swaps under about 13 ETH are not worth attacking, and the best route brings that 250 ETH swap's cost under $1K.",
      "Protection preferences live on chain as ENS text records, so the policy follows your identity across wallets. Built at ETHGlobal HackMoney 2026.",
    ],
    tags: ["TypeScript", "viem", "Uniswap V2", "Flashbots", "ENS"],
    seoTitle: "MEV Shield · pricing and preventing sandwich attacks on Ethereum",
    seoDescription:
      "MEV Shield by Aditya Joshi simulates sandwich attacks in exact Uniswap V2 math on live Ethereum data and routes swaps to cut the modeled loss on a 250 ETH trade by 97%.",
  },
  {
    slug: "stream-ingest-pipeline",
    title: "Streaming Ingest Pipeline",
    repo: "CodeMongerrr/stream-ingest-pipeline",
    repoUrl: "https://github.com/CodeMongerrr/stream-ingest-pipeline",
    repoLabel: "View source on GitHub",
    language: "TypeScript",
    summary:
      "Crash-safe streaming ingestion with Redis Streams consumer groups, 50 async workers and one atomic rate limiter shared across every replica.",
    body: [
      "A streaming ingestion pipeline built to scale out without ever breaking an upstream quota. 50 async workers pull from a Redis job queue, and Redis Streams consumer groups make sure nothing is lost when a worker crashes.",
      "The hard part is the shared limit. One atomic token bucket written in Lua inside Redis is shared by every replica, so adding workers adds throughput without adding risk. In a scale test, 300 workers across 6 pods held a hard cap of 8 requests a second, 167 grants in 20 seconds against 168 allowed.",
      "It ships with Kubernetes manifests, Prometheus metrics, health checks, idempotent writes and exponential backoff with full jitter.",
    ],
    tags: ["TypeScript", "Redis Streams", "Lua", "Kubernetes", "Prometheus"],
    seoTitle: "Streaming Ingest Pipeline · crash-safe ingestion with a shared rate limit",
    seoDescription:
      "A crash-safe streaming ingestion pipeline by Aditya Joshi with Redis Streams consumer groups and one atomic Lua rate limiter shared across every replica, tested at 300 workers on 6 pods.",
  },
  {
    slug: "homomorphic-erc20-fhevm",
    title: "Homomorphic ERC-20 (fhEVM)",
    repo: "CodeMongerrr/CRC20-Token-Standards",
    repoUrl: "https://github.com/CodeMongerrr/CRC20-Token-Standards",
    repoLabel: "View source on GitHub",
    language: "Solidity",
    summary:
      "An ERC-20 whose balances and transfers stay encrypted on chain, built on Zama's fhEVM with fully homomorphic encryption.",
    body: [
      "An ERC-20 whose balances and transfers stay encrypted on chain, built on Zama's fhEVM, with a Hardhat and TypeScript test suite running against dockerized fhEVM nodes.",
      "Fully homomorphic encryption lets the contract compute on ciphertext directly, so a balance can be debited and credited without the plaintext ever existing on chain. The interesting constraint is that ordinary Solidity control flow leaks information. A branch on an encrypted comparison is itself a disclosure, so the arithmetic has to be written branch free over encrypted types.",
    ],
    tags: ["Solidity", "fhEVM", "Hardhat", "TypeScript", "Docker"],
    seoTitle: "Homomorphic ERC-20 on Zama's fhEVM · encrypted token balances",
    seoDescription:
      "An ERC-20 token by Aditya Joshi whose balances and transfers stay encrypted on chain using fully homomorphic encryption on Zama's fhEVM.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
