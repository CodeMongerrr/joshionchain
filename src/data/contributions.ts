/**
 * Upstream open-source contributions.
 *
 * This list is the curated, hand-written record: it carries the plain-English
 * description of what each PR actually did, which the GitHub API cannot give
 * us (PR titles are terse and often wrong about impact).
 *
 * At request time `lib/github.ts` refreshes the *status* of each entry from
 * the live API, so a PR that gets merged upstream flips from Open to Merged
 * without anyone editing this file. If the API is unreachable or no token is
 * configured, these values render as-is, the page never breaks.
 */

export type Status = "merged" | "open" | "closed";

export type Contribution = {
  repo: string;
  /** Pull request number, used to look the PR up live. */
  number: number;
  url: string;
  /** Plain-English description of the change. Rendered as HTML-free text with
   *  `code` spans marked by the `code` field below. */
  what: string;
  /** Substrings of `what` to render in mono, e.g. a binary or file name. */
  code?: string[];
  /** Last known status, the live fetch overrides this when it succeeds. */
  status: Status;
  /** Security fixes open /open-source as cards, above the full table. */
  security?: boolean;
  /** What the fix protects, for the security cards. Site copy, same words as the resume. */
  detail?: string;
};

export const contributions: Contribution[] = [
  {
    repo: "ZcashFoundation/zebra",
    number: 11050,
    url: "https://github.com/ZcashFoundation/zebra/pull/11050",
    what: "Stopped zebrad-log-filter executing log text as shell",
    code: ["zebrad-log-filter"],
    status: "merged",
    security: true,
    detail:
      "Reproduced a shell-injection path with a crafted log line, then rewrote the filter in pure Bash, so a malicious log line can no longer run commands on a node operator's machine.",
  },
  {
    repo: "ZcashFoundation/zebra",
    number: 11051,
    url: "https://github.com/ZcashFoundation/zebra/pull/11051",
    what: "Kept the Elasticsearch password out of the config dump",
    status: "merged",
    security: true,
    detail:
      "Stopped the Elasticsearch password leaking into the startup config dump by wrapping it in a RedactedString type.",
  },
  {
    repo: "ZcashFoundation/zebra",
    number: 10956,
    url: "https://github.com/ZcashFoundation/zebra/pull/10956",
    what: "Fixed six book instructions that fail or misinform",
    status: "merged",
  },
  {
    repo: "zcash/librustzcash",
    number: 2624,
    url: "https://github.com/zcash/librustzcash/pull/2624",
    what: "Reconciled AGENTS.md with the README dependency diagram",
    code: ["AGENTS.md"],
    status: "merged",
  },
  {
    repo: "ZecHub/zechub",
    number: 1882,
    url: "https://github.com/ZecHub/zechub/pull/1882",
    what: "zcashd deprecation note in the Raspberry Pi 4 full-node guide",
    code: ["zcashd"],
    status: "merged",
  },
  {
    repo: "ZecHub/zechub-wiki",
    number: 652,
    url: "https://github.com/ZecHub/zechub-wiki/pull/652",
    what: "Fixed the hackathon project list falling back to stale data",
    status: "merged",
  },
  {
    repo: "ethereum/ethereum-org-website",
    number: 12972,
    url: "https://github.com/ethereum/ethereum-org-website/pull/12972",
    what: "Clarified wording in the proof-of-stake developer docs",
    status: "merged",
  },
  {
    repo: "ZcashFoundation/zebra",
    number: 11216,
    url: "https://github.com/ZcashFoundation/zebra/pull/11216",
    what: "Refreshed book content overtaken by releases and refactors",
    status: "open",
  },
  {
    repo: "zcash/developers",
    number: 88,
    url: "https://github.com/zcash/developers/pull/88",
    what: "Removed remaining ZenHub references",
    status: "open",
  },
];
