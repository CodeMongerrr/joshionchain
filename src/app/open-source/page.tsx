import { Frame, Kicker } from "@/components/blueprint";
import { ContributionsTable } from "@/components/contributions-table";
import { BackHomeDoor } from "@/components/back-home";
import { JsonLd } from "@/components/json-ld";
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
  // The headline proof opens the page as cards; the table below is the ledger.
  const fixes = items.filter((c) => c.security);

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
          <p className="body dim" style={{ marginTop: 16 }}>
            Both security fixes in Zcash Zebra v6.2.2 first, then everything else I have sent
            upstream.
          </p>

          <div className="fix-grid">
            {fixes.map((c) => (
              <Frame as="article" className="fix" key={c.number}>
                <span className="kick">Security fix · Zebra v6.2.2</span>
                <h2 className="fix-title">{c.what}</h2>
                {c.detail ? (
                  <p className="body dim" style={{ margin: 0 }}>
                    {c.detail}
                  </p>
                ) : null}
                <div className="fix-meta">
                  <span className={`mono fix-status fix-${c.status}`}>
                    {c.status === "merged" ? "Merged" : c.status === "open" ? "Open" : "Closed"}
                  </span>
                  <a className="btn btn-secondary" href={c.url} target="_blank" rel="noopener noreferrer">
                    Pull request #{c.number} ↗
                  </a>
                </div>
              </Frame>
            ))}
          </div>

          <p className="mono dimmer" style={{ fontSize: 12, marginTop: 20 }}>
            Both merged within 31 hours ·{" "}
            <a href="https://github.com/ZcashFoundation/zebra/releases/tag/v6.2.2" target="_blank" rel="noopener noreferrer">
              Zebra v6.2.2 release notes ↗
            </a>
          </p>

          <p className="mono dimmer" style={{ fontSize: 12, marginTop: 8 }}>
            {counts.merged} merged · {counts.open} open
            {live ? " · synced hourly from GitHub" : null}
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <ContributionsTable items={items} counts={counts} />

          <BackHomeDoor />
        </div>
      </section>
    </>
  );
}
