/**
 * Selected work, four projects, deliberately capped.
 *
 * Repository URLs were resolved against the real GitHub account, replacing the
 * design's profile-level placeholders.
 */

export type Project = {
  slug: string;
  title: string;
  /** Repo name as it appears on GitHub, shown in mono. */
  repo: string;
  repoUrl: string;
  language: string;
  /** Two sentences, the list row and the detail page lead. */
  summary: string;
  /** Long form, detail page only. */
  body: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: "ethereum-event-log-indexer",
    title: "Ethereum Event Log Indexer",
    repo: "CodeMongerrr/eth-log-indexer",
    repoUrl: "https://github.com/CodeMongerrr/eth-log-indexer",
    language: "Go",
    summary:
      "A high-throughput indexer for Ethereum event logs, written in Go. Goroutine worker pools pull and decode logs concurrently and persist them to an embedded BoltDB store.",
    body: [
      "A high-throughput indexer for Ethereum event logs, written in Go. Goroutine worker pools pull and decode logs concurrently and persist them to an embedded BoltDB store.",
      "The design question an indexer really answers is how to stay fast without losing ordering guarantees. Work is fanned out across a pool of goroutines so that network latency on one block range never stalls the others, while writes land in an embedded key-value store that keeps the whole thing a single binary with no external database to operate.",
    ],
    tags: ["Go", "Goroutines", "BoltDB"],
    seoTitle: "Ethereum Event Log Indexer: high-throughput log indexing in Go",
    seoDescription:
      "A Go indexer for Ethereum event logs using goroutine worker pools for concurrent fetch and decode, persisting to an embedded BoltDB store.",
  },
  {
    slug: "homomorphic-erc20-fhevm",
    title: "Homomorphic ERC-20 (fhEVM)",
    repo: "CodeMongerrr/CRC20-Token-Standards",
    repoUrl: "https://github.com/CodeMongerrr/CRC20-Token-Standards",
    language: "Solidity",
    summary:
      "An ERC-20 whose balances and transfers stay encrypted on-chain, built on Zama's fhEVM. Hardhat and TypeScript test suite against dockerized fhEVM nodes.",
    body: [
      "An ERC-20 whose balances and transfers stay encrypted on-chain, built on Zama's fhEVM. Hardhat and TypeScript test suite against dockerized fhEVM nodes.",
      "Fully homomorphic encryption lets the contract compute on ciphertext directly, so a balance can be debited and credited without any point at which the plaintext value exists on-chain. The interesting constraint is that ordinary Solidity control flow leaks information: a branch on an encrypted comparison is itself a disclosure, so the arithmetic has to be written branch-free over encrypted types.",
    ],
    tags: ["Solidity", "fhEVM", "Hardhat", "TypeScript", "Docker"],
    seoTitle: "Homomorphic ERC-20 on Zama's fhEVM: encrypted token balances",
    seoDescription:
      "An ERC-20 token whose balances and transfers stay encrypted on-chain using fully homomorphic encryption on Zama's fhEVM, tested with Hardhat against dockerized nodes.",
  },
  {
    slug: "rsa-ring-signature-library",
    title: "RSA Ring Signature Library",
    repo: "CodeMongerrr/Ring_Signature_Implementation",
    repoUrl: "https://github.com/CodeMongerrr/Ring_Signature_Implementation",
    language: "Rust",
    summary:
      "A Rust library for anonymous authentication: a signer proves membership of a group without revealing which member they are. 2048-bit keys through a full sign and verify pipeline.",
    body: [
      "A Rust library for anonymous authentication: a signer proves membership of a group without revealing which member they are. 2048-bit keys through a full sign and verify pipeline.",
      "A ring signature builds a closed chain of encrypted values across every public key in the group. Only the real signer can close the ring, because only they hold a private key, but a verifier can check the ring is closed without learning which link was the one solved rather than guessed.",
    ],
    tags: ["Rust", "Cryptography", "RSA-2048"],
    seoTitle: "RSA Ring Signature Library: anonymous group authentication in Rust",
    seoDescription:
      "A Rust implementation of RSA-based ring signatures with 2048-bit keys: prove membership of a group without revealing which member signed.",
  },
  {
    slug: "ethereum-light-client",
    title: "Ethereum Light Client",
    repo: "CodeMongerrr/eth-light-client",
    repoUrl: "https://github.com/CodeMongerrr/eth-light-client",
    language: "Go",
    summary:
      "A Go light client that follows Ethereum by block headers alone, verifying state and transaction inclusion with Merkle proofs instead of holding full chain state.",
    body: [
      "A Go light client that follows Ethereum by block headers alone, verifying state and transaction inclusion with Merkle proofs instead of holding full chain state.",
      "Headers carry the state and transaction roots, which is enough to check any claim about the chain given a proof path, so the client can answer “is this transaction in that block” or “what is this account's balance” while storing a tiny fraction of what a full node does, and without trusting the peer that served the answer.",
    ],
    tags: ["Go", "Merkle proofs", "P2P"],
    seoTitle: "Ethereum Light Client: header-based sync with Merkle proofs in Go",
    seoDescription:
      "A minimal Ethereum light client in Go that syncs via block headers and verifies state and transaction inclusion with Merkle proofs, without full chain state.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
