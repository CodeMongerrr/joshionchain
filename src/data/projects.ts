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
      "It works with a token you already have. The contract takes the address of an ordinary ERC-20 in its constructor. A holder locks plain tokens in it and gets an encrypted balance back, and claiming turns that balance back into the original token. Nothing about the existing contract has to change.",
      "The development workflow follows from that. Balances and allowances become euint64 instead of uint256. A transfer takes an encrypted amount plus an input proof, which the client builds with fhevmjs, and the contract converts it with TFHE.asEuint64. Every check that used to be a require becomes an encrypted comparison, TFHE.le for the balance and the allowance, joined with TFHE.and.",
      "Then the transfer has to happen whether or not it is allowed. TFHE.select picks the real amount when the checks pass and an encrypted zero when they fail, and both balances are updated either way. A failed transfer looks exactly like a successful one from outside, which is the whole point.",
      "Two things trip people up coming from plain Solidity. Every new ciphertext needs explicit access, so after each update the contract calls TFHE.allow for itself and for the owner of that balance, or nobody can read or reuse it. And decryption is asynchronous. The contract asks the Gateway and receives the plaintext later in a callback, so any flow that needs a real number, like unwrapping, has to be designed around that wait.",
      "Everything runs locally against a dockerized fhEVM node with a faucet for test accounts, and the same Hardhat suite runs in a mocked mode for fast iteration before touching the real encrypted node.",
    ],
    tags: ["Solidity", "fhEVM", "Hardhat", "TypeScript", "Docker"],
    seoTitle: "Encrypted ERC-20 with FHE on Zama's fhEVM · how to add it to an existing token",
    seoDescription:
      "How to integrate fully homomorphic encryption into an existing Solidity ERC-20 with Zama's fhEVM. Encrypted balances, transfers and approvals with euint64, TFHE.select and fhevmjs input proofs, by Aditya Joshi with source on GitHub.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
