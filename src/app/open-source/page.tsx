import Link from "next/link";

import { Kicker } from "@/components/blueprint";
import { ContributionsTable } from "@/components/contributions-table";
import { JsonLd } from "@/components/json-ld";
import { securityLede } from "@/data/contributions";
import { getContributions } from "@/lib/github";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

/* Static literal, not an imported binding, see the note in src/app/page.tsx.
   Keep in sync with GITHUB_REVALIDATE_SECONDS in src/lib/github.ts. */
export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Open source",
  description:
    "Aditya Joshi's upstream open-source work. Both security fixes in Zcash Zebra v6.2.2, four merged PRs in Zebra, and merged work in librustzcash, ZecHub and ethereum.org, refreshed hourly from GitHub.",
  path: "/open-source",
});

/**
 * The contributions page.
 *
 * The table refreshes itself hourly from the GitHub API and falls back to the
 * curated list on any failure, so this page is never blank and never blocks a
 * build. See src/lib/github.ts.
 */
export default async function OpenSourcePage() {
  const { items, counts, live } = await getContributions();

  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Open source", path: "/open-source" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <Kicker>Open source</Kicker>
          <h1 className="h2">Upstream contributions</h1>

          <p className="body dim">{securityLede}</p>

          <p className="mono dimmer" style={{ fontSize: 12, marginTop: 16 }}>
            {counts.merged} merged · {counts.open} open
            {live ? " · synced hourly from GitHub" : null}
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <ContributionsTable items={items} counts={counts} />

          <p style={{ marginTop: 32 }}>
            <Link href="/work" className="mono rowlink">
              ← Work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
