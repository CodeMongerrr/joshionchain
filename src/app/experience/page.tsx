import Link from "next/link";

import { Kicker, TagRow } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { ReachOut } from "@/components/reach-out";
import { Rich } from "@/components/rich";
import { earlier, highlights, roles } from "@/data/experience";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Experience",
  description:
    "Aditya Joshi's roles before BatteryFlow and BharatTruck. Ethereum and Starknet core infrastructure at Nethermind, a Uniswap V3-style DEX for a client in Japan at Gusto Development, and the early roles that came first.",
  path: "/experience",
});

/**
 * Everything the homepage's "Before this" list used to hold, with room to
 * say it properly. The founding roles have their own pages under /work, so
 * this page starts where they end.
 */
export default function ExperiencePage() {
  // Roles with a /work page are the current story; the rest are what came before.
  const before = roles.filter((r) => !r.slug);

  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Experience", path: "/experience" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <p className="mono dimmer" style={{ fontSize: 12 }}>
            <Link href="/#building-now" className="rowlink">
              ← Recent work
            </Link>
          </p>

          <Kicker>Experience</Kicker>
          <h1 className="h2">Before this</h1>
          <p className="body dim" style={{ marginTop: 16 }}>
            The roles before BatteryFlow and BharatTruck, from Ethereum core infrastructure at
            Nethermind to a DEX built around a client&apos;s Japan-specific market rules.
          </p>
          <div style={{ marginTop: 24 }}>
            <TagRow items={highlights} />
          </div>

          {/* Header and list share one section, so the first role sits right
              under the intro instead of a screen further down. */}
          <div style={{ borderTop: "1px solid var(--color-divider)", marginTop: 56 }}>
            {before.map((role) => (
              <article className="xp-row" key={role.company}>
                <p className="mono dimmer xp-when">
                  {role.period}
                  <br />
                  {role.location}
                </p>
                <div>
                  <h2 className="xp-company">
                    {role.companyUrl ? (
                      <a href={role.companyUrl} target="_blank" rel="noopener noreferrer">
                        {role.company} ↗
                      </a>
                    ) : (
                      role.company
                    )}
                  </h2>
                  <p className="mono dim xp-title">
                    {role.title} · {role.what}
                  </p>
                  {role.bullets.length === 1 ? (
                    <p className="xp-text">
                      <Rich text={role.bullets[0]} />
                    </p>
                  ) : (
                    <ul className="xp-bullets">
                      {role.bullets.map((b) => (
                        <li key={b}>
                          <Rich text={b} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>

          <h2 className="h3" style={{ marginTop: 64 }}>
            Earlier
          </h2>
          <div style={{ marginTop: 20, borderTop: "1px solid var(--color-divider)" }}>
            {earlier.map((role) => (
              <article className="xp-row" key={role.company}>
                <p className="mono dimmer xp-when">
                  {role.period}
                  <br />
                  {role.location}
                </p>
                <div>
                  <h3 className="xp-company">{role.company}</h3>
                  <p className="mono dim xp-title">{role.title}</p>
                  <p className="body dim" style={{ fontSize: 15, margin: 0 }}>
                    {role.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link className="btn btn-primary" href="/resume" style={{ padding: "10px 18px", fontSize: 15 }}>
              Read the full resume →
            </Link>
            <Link className="btn btn-secondary" href="/work" style={{ padding: "10px 18px", fontSize: 15 }}>
              See the recent work →
            </Link>
          </div>

          <ReachOut
            prompt="Hiring for a role like one of these? I would love to hear about it."
            subject="A role for Aditya"
          />
        </div>
      </section>
    </>
  );
}
