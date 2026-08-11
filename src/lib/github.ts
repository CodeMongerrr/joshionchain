import "server-only";

import {
  contributions as curated,
  type Contribution,
  type Status,
} from "@/data/contributions";
import { githubUser } from "@/data/site";

/**
 * Live GitHub wiring.
 *
 * Two things happen here, both server-side only:
 *
 *   1. Every curated contribution has its status refreshed, so a PR that gets
 *      merged upstream flips from Open to Merged with no code change.
 *   2. Any *new* upstream PR, one authored by the account in a repo the
 *      account doesn't own, is discovered and appended automatically, so
 *      contributions never silently go missing from the page.
 *
 * Curated copy always wins over the API: a hand-written description of what a
 * change actually did beats a terse PR title. The API only supplies status for
 * rows we already describe, and title-level detail for rows we don't.
 *
 * Failure is always soft. No token, rate limit, network error, schema drift , 
 * all of them fall back to the curated list exactly as authored. The page is
 * statically rendered and revalidated, so a transient API failure can never
 * take the site down or block a build.
 */

/** One hour. Upstream PR status does not change faster than that matters. */
export const GITHUB_REVALIDATE_SECONDS = 3600;

const API = "https://api.github.com";

type SearchItem = {
  html_url?: string;
  number?: number;
  title?: string;
  state?: string;
  repository_url?: string;
  draft?: boolean;
  pull_request?: { merged_at?: string | null };
};

export type LiveContribution = Contribution & {
  /** True when this row was discovered by the API rather than hand-curated. */
  discovered?: boolean;
};

export type ContributionsResult = {
  items: LiveContribution[];
  /** Whether the live refresh actually ran. Drives the "live" badge in the UI. */
  live: boolean;
  counts: { total: number; merged: number; open: number };
};

function statusOf(item: SearchItem): Status {
  if (item.pull_request?.merged_at) return "merged";
  if (item.state === "closed") return "closed";
  return "open";
}

/** `https://api.github.com/repos/owner/name` → `owner/name` */
function repoFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/repos\/([^/]+\/[^/]+)$/);
  return m ? m[1] : null;
}

function tally(items: Contribution[]) {
  return {
    total: items.length,
    merged: items.filter((c) => c.status === "merged").length,
    open: items.filter((c) => c.status === "open").length,
  };
}

async function search(): Promise<SearchItem[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  // Authored by the account, in repos the account does not own, i.e. upstream
  // work, which is the only kind this section claims.
  const q = `type:pr author:${githubUser} -user:${githubUser}`;
  const url = `${API}/search/issues?q=${encodeURIComponent(q)}&per_page=100&sort=updated&order=desc`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
      "User-Agent": "joshionchain.com",
    },
    next: { revalidate: GITHUB_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    console.warn(`[github] search failed: ${res.status} ${res.statusText}`);
    return null;
  }

  const json: unknown = await res.json();
  const items = (json as { items?: unknown }).items;
  return Array.isArray(items) ? (items as SearchItem[]) : null;
}

export async function getContributions(): Promise<ContributionsResult> {
  let items: SearchItem[] | null = null;

  try {
    items = await search();
  } catch (err) {
    console.warn("[github] search threw, falling back to curated list", err);
  }

  if (!items) {
    return { items: curated, live: false, counts: tally(curated) };
  }

  // Index the live results by `repo#number` so curated rows can find themselves.
  const byKey = new Map<string, SearchItem>();
  for (const item of items) {
    const repo = repoFromUrl(item.repository_url);
    if (repo && typeof item.number === "number") {
      byKey.set(`${repo}#${item.number}`, item);
    }
  }

  // 1. Curated rows, with live status applied where we found a match.
  const refreshed: LiveContribution[] = curated.map((c) => {
    const hit = byKey.get(`${c.repo}#${c.number}`);
    return hit ? { ...c, status: statusOf(hit) } : c;
  });

  const known = new Set(curated.map((c) => `${c.repo}#${c.number}`));

  // 2. Anything upstream we haven't described yet. Drafts and closed-unmerged
  //    PRs are skipped, neither is a contribution worth listing.
  const discovered: LiveContribution[] = [];
  for (const item of items) {
    const repo = repoFromUrl(item.repository_url);
    if (!repo || typeof item.number !== "number") continue;
    if (known.has(`${repo}#${item.number}`)) continue;
    if (item.draft) continue;

    const status = statusOf(item);
    if (status === "closed") continue;

    discovered.push({
      repo,
      number: item.number,
      url: item.html_url ?? `https://github.com/${repo}/pull/${item.number}`,
      what: item.title?.trim() || `Pull request #${item.number}`,
      status,
      discovered: true,
    });
  }

  // Merged first, then open; curated order is preserved within each group so
  // the two security fixes stay at the top where the prose points at them.
  const rank = (c: Contribution) => (c.status === "merged" ? 0 : 1);
  const all = [...refreshed, ...discovered].sort((a, b) => rank(a) - rank(b));

  return { items: all, live: true, counts: tally(all) };
}
