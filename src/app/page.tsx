import Link from "next/link";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { ContactPanel } from "@/components/contact-panel";
import { ContributionsTable } from "@/components/contributions-table";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { Portrait } from "@/components/portrait";
import { TitleBlock } from "@/components/title-block";
import TestimonialsVerticalMarquee from "@/components/ui/testimonials-with-verticalmarquee";
import { securityLede } from "@/data/contributions";
import { experience, highlights } from "@/data/experience";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { results } from "@/data/results";
import { contactEmail, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { systems } from "@/data/systems";
import { getContributions } from "@/lib/github";
import { jsonLd, profilePageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

/* Next parses segment config statically, so this has to be a literal, an
   imported binding (even a `const`) fails the build with "Invalid segment
   configuration export". Keep in sync with GITHUB_REVALIDATE_SECONDS in
   src/lib/github.ts, which controls the fetch-level cache. */
export const revalidate = 3600;

/**
 * The overview.
 *
 * Every section here is a summary that links onward, the full prose,
 * diagrams and tables live on the detail routes. That split is deliberate:
 * it's what keeps this page scannable in one pass instead of asking a reader
 * to wade through long-form case studies before reaching the contact
 * section.
 */
export default async function HomePage() {
  const { items, counts } = await getContributions();

  // The overview shows the merged work only; the full table (with the open
  // PRs and the status filter) is one click away.
  const featured = items.filter((c) => c.status === "merged").slice(0, 5);

  return (
    <main id="main">
      {/* Person and WebSite come from the layout; this marks the homepage as
          being about that person rather than merely mentioning them. */}
      <JsonLd data={jsonLd(profilePageSchema())} />
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
              <Link
                className="btn btn-secondary"
                href="/resume"
                style={{ padding: "10px 18px", fontSize: 15 }}
              >
                Read the resume
              </Link>
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
                  email: add address
                </span>
              )}
            </div>
          </div>

          <Portrait />
          <TitleBlock />
        </header>

        {/* ── 01 results ──────────────────────────────────────────────── */}
        <section className="sec" id="results" data-reveal>
          <Kicker>01 · Results</Kicker>
          <h2 className="h2">What changed because I was there</h2>
          <div style={{ marginTop: 36, borderTop: "1px solid var(--color-divider)" }}>
            {results.map((r) => {
              const inner = (
                <>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 600,
                      fontSize: 22,
                      letterSpacing: ".01em",
                      lineHeight: 1.25,
                      maxWidth: "46ch",
                    }}
                  >
                    {r.claim}
                  </div>
                  <span className="mono dimmer" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                    {r.where} · {r.proof.label} →
                  </span>
                </>
              );
              return r.proof.external ? (
                <a className="rowlink" href={r.proof.href} key={r.claim} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <Link className="rowlink" href={r.proof.href} key={r.claim}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 02 building now ─────────────────────────────────────────── */}
        <section className="sec" id="building-now" data-reveal>
          <Kicker>02 · Recent work</Kicker>
          <h2 className="h2">Two founding roles and a studio</h2>
          <p className="body dim" style={{ margin: "16px 0 44px" }}>
            Different markets, same job. I get brought in where something is broken, find what
            it actually is, and ship the system that fixes it.
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
                    Read the full story →
                  </Link>
                </div>
              </Frame>
            ))}
          </div>
        </section>

        {/* ── 03 selected work ────────────────────────────────────────── */}
        <section className="sec" id="work" data-reveal>
          <Kicker>03 · Built on my own</Kicker>
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

        {/* ── 04 open source ──────────────────────────────────────────── */}
        <section className="sec" id="open-source" data-reveal>
          <Kicker>04 · Open source</Kicker>
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

        {/* ── 05 experience ───────────────────────────────────────────── */}
        <section className="sec" id="experience" data-reveal>
          <Kicker>05 · Experience</Kicker>
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

        {/* ── 06 stack ────────────────────────────────────────────────── */}
        <section className="sec" id="stack" data-reveal>
          <Kicker>06 · Skills</Kicker>
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

        {/* ── 07 in public ────────────────────────────────────────────── */}
        {/* Social proof sits last, after every section of actual work and
            right before the ask, so it backs the case instead of making it. */}
        <section className="sec" id="in-public" data-reveal>
          <TestimonialsVerticalMarquee
            kicker="07 · In public"
            title="Where I think out loud"
            subtitle="Posts from X and LinkedIn on AI agents, crypto infrastructure and the bugs that taught me something. Every card opens the full post, with a link to the original."
            posts={posts}
          />
        </section>

        {/* ── 08 contact ──────────────────────────────────────────────── */}
        <section className="sec" id="contact" data-reveal style={{ paddingBottom: 88 }}>
          <Kicker>08 · Contact</Kicker>
          <h2 className="h2">Get in touch</h2>
          <p className="body" style={{ fontSize: 19, lineHeight: 1.45, margin: "18px 0 32px" }}>
            Open to forward deployed and founding roles in the US, UK and UAE, or remote. Got a
            problem where the hard part is figuring out what is actually broken? I would love to
            hear about it.
          </p>
          <ContactPanel />
        </section>
      </div>
    </main>
  );
}
