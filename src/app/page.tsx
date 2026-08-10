import Link from "next/link";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { ContributionsTable } from "@/components/contributions-table";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { Portrait } from "@/components/portrait";
import { securityLede } from "@/data/contributions";
import { experience, highlights } from "@/data/experience";
import { projects } from "@/data/projects";
import { contactEmail, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { systems } from "@/data/systems";
import { getContributions } from "@/lib/github";

/* Next parses segment config statically, so this has to be a literal — an
   imported binding (even a `const`) fails the build with "Invalid segment
   configuration export". Keep in sync with GITHUB_REVALIDATE_SECONDS in
   src/lib/github.ts, which controls the fetch-level cache. */
export const revalidate = 3600;

/**
 * The overview.
 *
 * Every section here is a summary that links onward — the full prose,
 * diagrams and tables live on the detail routes. That split is deliberate:
 * it's what keeps this page scannable in one pass instead of asking a reader
 * to wade through three long-form case studies before reaching the contact
 * section.
 */
export default async function HomePage() {
  const { items, counts } = await getContributions();

  // The overview shows the merged work only; the full table (with the open
  // PRs and the status filter) is one click away.
  const featured = items.filter((c) => c.status === "merged").slice(0, 5);

  return (
    <main id="main">
      <LegacyHashRedirect />

      <div className="wrap">
        {/* ── hero ────────────────────────────────────────────────────── */}
        <header className="hero-grid">
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid var(--color-divider)",
                padding: "6px 12px",
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 12,
                letterSpacing: ".02em",
                color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
              }}
            >
              <i
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--color-accent)",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
              {site.statusPill}
            </span>

            <h1
              style={{
                fontSize: "clamp(38px, 6vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-.02em",
                textTransform: "uppercase",
                margin: "26px 0 20px",
              }}
            >
              {site.name}
            </h1>

            <p
              className="body"
              style={{ fontSize: 19, lineHeight: 1.45, margin: "0 0 14px", maxWidth: "34ch" }}
            >
              {site.tagline}
            </p>
            <p className="body dim" style={{ margin: "0 0 30px" }}>
              {site.supporting}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn-primary" href="#contact" style={{ padding: "10px 18px", fontSize: 15 }}>
                Get in touch
              </a>
              <a
                className="btn btn-secondary"
                href="#building-now"
                style={{ padding: "10px 18px", fontSize: 15 }}
              >
                See what I&rsquo;m building
              </a>
            </div>

            <div
              className="mono"
              style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 30 }}
            >
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--color-divider)",
                    paddingBottom: 2,
                  }}
                >
                  {s.label} ↗
                </a>
              ))}
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  style={{
                    fontSize: 13,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--color-divider)",
                    paddingBottom: 2,
                  }}
                >
                  Email ↗
                </a>
              ) : (
                <span
                  className="dimmer"
                  style={{
                    fontSize: 13,
                    borderBottom: "1px dashed var(--color-divider)",
                    paddingBottom: 2,
                  }}
                >
                  email — add address
                </span>
              )}
            </div>
          </div>

          <Portrait />
        </header>

        {/* ── 01 building now ─────────────────────────────────────────── */}
        <section className="sec" id="building-now" data-reveal>
          <Kicker>01 · Building now</Kicker>
          <h2 className="h2">Three systems in production</h2>
          <p className="body dim" style={{ margin: "16px 0 44px" }}>
            Different markets, different constraints, same engineer. Everything below is live
            work.
          </p>

          <div style={{ display: "grid", gap: 28 }}>
            {systems.map((s) => (
              <Frame as="article" className="frame-link" key={s.slug}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    gap: "8px 16px",
                    marginBottom: 6,
                  }}
                >
                  <h3 className="h3" style={{ fontSize: 26 }}>
                    <Link href={`/work/${s.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {s.name}
                    </Link>
                  </h3>
                  <span
                    className="mono dimmer"
                    style={{
                      fontSize: 12,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      marginLeft: "auto",
                    }}
                  >
                    {s.domain} · {s.period}
                  </span>
                </div>

                <p className="mono" style={{ fontSize: 13, margin: "0 0 18px", color: "var(--accent-ink)" }}>
                  {s.context}
                </p>

                <p className="body" style={{ marginBottom: 20 }}>
                  {s.summary}
                </p>

                {s.evidence ? <Evidence items={s.evidence} /> : null}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "14px 20px",
                    marginTop: s.evidence ? 18 : 0,
                  }}
                >
                  <TagRow items={s.tags} />
                  <Link
                    href={`/work/${s.slug}`}
                    className="mono"
                    style={{ fontSize: 13, marginLeft: "auto", whiteSpace: "nowrap" }}
                  >
                    Read the architecture →
                  </Link>
                </div>
              </Frame>
            ))}
          </div>
        </section>

        {/* ── 02 selected work ────────────────────────────────────────── */}
        <section className="sec" id="work" data-reveal>
          <Kicker>02 · Selected work</Kicker>
          <h2 className="h2">Four projects</h2>
          <div style={{ marginTop: 36, borderTop: "1px solid var(--color-divider)" }}>
            {projects.map((p) => (
              <Link className="rowlink" href={`/projects/${p.slug}`} key={p.slug}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: ".01em",
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </div>
                  <p className="body dim" style={{ fontSize: 15, margin: "0 0 12px" }}>
                    {p.summary}
                  </p>
                  <TagRow items={p.tags} />
                </div>
                <span className="mono dimmer" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                  {p.language} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 03 open source ──────────────────────────────────────────── */}
        <section className="sec" id="open-source" data-reveal>
          <Kicker>03 · Open source</Kicker>
          <h2 className="h2">Merged upstream</h2>
          <p className="body" style={{ margin: "16px 0 8px" }}>
            {securityLede}
          </p>
          <p className="body dim" style={{ margin: "0 0 28px" }}>
            {counts.merged} merged, {counts.open} open across{" "}
            {new Set(items.map((c) => c.repo)).size} upstream repositories.
          </p>

          <ContributionsTable items={featured} counts={counts} showFilter={false} />

          <p style={{ marginTop: 20 }}>
            <Link href="/open-source" className="mono" style={{ fontSize: 13 }}>
              All {counts.total} contributions →
            </Link>
          </p>
        </section>

        {/* ── 04 experience ───────────────────────────────────────────── */}
        <section className="sec" id="experience" data-reveal>
          <Kicker>04 · Experience</Kicker>
          <h2 className="h2">Before this</h2>
          <div style={{ marginTop: 36, borderTop: "1px solid var(--color-divider)" }}>
            {experience.map((role) => (
              <div
                key={role.company}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 180px) minmax(0, 1fr)",
                  gap: 24,
                  padding: "24px 0",
                  borderBottom: "1px solid var(--color-divider)",
                }}
              >
                <div
                  className="mono dimmer"
                  style={{ fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}
                >
                  {role.period}
                  <br />
                  {role.location}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: ".01em",
                    }}
                  >
                    {role.company}
                  </div>
                  <div className="mono dim" style={{ fontSize: 13, margin: "2px 0 8px" }}>
                    {role.title}
                    {role.team ? ` · ${role.team}` : ""}
                  </div>
                  <p className="body dim" style={{ fontSize: 15, margin: 0 }}>
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <TagRow items={highlights} />
          </div>
        </section>

        {/* ── 05 stack ────────────────────────────────────────────────── */}
        <section className="sec" id="stack" data-reveal>
          <Kicker>05 · Stack</Kicker>
          <h2 className="h2">What I work in</h2>
          <div className="stack-grid" style={{ marginTop: 36 }}>
            {stack.map((group) => (
              <div key={group.label}>
                <div
                  className="mono"
                  style={{
                    fontSize: 12,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    paddingBottom: 10,
                    borderBottom: "1px solid var(--color-divider)",
                    marginBottom: 14,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {group.label}
                  {group.evidence ? (
                    <Link
                      href={group.evidence.href}
                      className="dimmer"
                      style={{ textDecoration: "none", marginLeft: "auto" }}
                    >
                      {group.evidence.label}
                    </Link>
                  ) : null}
                </div>
                <TagRow items={group.items} />
              </div>
            ))}
          </div>
        </section>

        {/* ── 06 contact ──────────────────────────────────────────────── */}
        <section className="sec" id="contact" data-reveal style={{ paddingBottom: 88 }}>
          <Kicker>06 · Contact</Kicker>
          <h2 className="h2">Get in touch</h2>
          <p className="body" style={{ fontSize: 19, lineHeight: 1.45, margin: "18px 0 32px" }}>
            Open to conversations about freight infrastructure, telematics, privacy protocols, and
            hard backend problems.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {contactEmail ? (
              <a className="btn btn-primary" href={`mailto:${contactEmail}`} style={{ padding: "10px 18px", fontSize: 15 }}>
                Email ↗
              </a>
            ) : (
              <span
                className="btn btn-secondary mono"
                style={{
                  padding: "10px 18px",
                  fontSize: 13,
                  borderStyle: "dashed",
                  color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
                }}
              >
                email — add address
              </span>
            )}
            {socials.map((s) => (
              <a
                key={s.href}
                className="btn btn-secondary"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "10px 18px", fontSize: 15 }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
