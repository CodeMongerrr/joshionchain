import { Kicker, TagRow } from "@/components/blueprint";
import { BackHomeDoor } from "@/components/back-home";
import { JsonLd } from "@/components/json-ld";
import { ReachOut } from "@/components/reach-out";
import { Rich } from "@/components/rich";
import { earlier, highlights, roles } from "@/data/experience";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Experience",
  description:
    "Aditya Joshi's roles alongside BatteryFlow, BharatTruck and Nethermind. A Uniswap V3-style DEX for a client in Japan at Gusto Development, a healthcare platform in Dubai at Tabibi, and the early roles that came first.",
  path: "/experience",
});

/**
 * Everything the homepage's "Before this" list used to hold, with room to
 * say it properly. The founding roles have their own pages under /work, so
 * this page starts where they end.
 */
export default function ExperiencePage() {
  // Roles with a /work page have their own card on the landing page; the rest live here.
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
          <Kicker>Experience</Kicker>
          <h1 className="h2">Before this</h1>
          <p className="body dim" style={{ marginTop: 16 }}>
            The rest of the story beside BatteryFlow, BharatTruck and Nethermind, from a DEX built
            around a client&apos;s Japan-specific market rules to the early roles that came first.
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
          <ReachOut
            prompt="Hiring for a role like one of these? I would love to hear about it."
            subject="A role for Aditya"
          />

          <BackHomeDoor />
        </div>
      </section>
    </>
  );
}
