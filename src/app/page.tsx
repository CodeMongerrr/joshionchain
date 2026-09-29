import Link from "next/link";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { ContactPanel } from "@/components/contact-panel";
import { Door } from "@/components/door";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { Portrait } from "@/components/portrait";
import { TitleBlock } from "@/components/title-block";
import TestimonialsVerticalMarquee from "@/components/ui/testimonials-with-verticalmarquee";
import { earlier, roles } from "@/data/experience";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { results } from "@/data/results";
import { resumePdf, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { systems } from "@/data/systems";
import { jsonLd, profilePageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

/**
 * The overview.
 *
 * Every section here is a summary that links onward, the full prose,
 * diagrams and tables live on the detail routes. That split is deliberate:
 * it's what keeps this page scannable in one pass instead of asking a reader
 * to wade through long-form case studies before reaching the contact
 * section. The long lists (every past role, every upstream PR) sit behind
 * doors, one click away and impossible to miss.
 */
export default function HomePage() {
  // Past roles for the experience door, the ones without a /work page of their own.
  const pastCompanies = [...roles.filter((r) => !r.slug), ...earlier].map((r) => r.company);

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
            {/* The proof in one scannable line. The title block below carries
                the rest, so nothing here needs a paragraph. */}
            <div style={{ margin: "0 0 30px" }}>
              <Evidence items={site.proof} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn-primary" href="#contact" style={{ padding: "10px 18px", fontSize: 15 }}>
                Get in touch
              </a>
              <a
                className="btn btn-secondary"
                href={resumePdf.href}
                download={resumePdf.filename}
                style={{ padding: "10px 18px", fontSize: 15 }}
              >
                Download the resume ↓
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
              <Frame as="article" className="frame-link card" key={s.slug}>
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
                    {s.name}
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
                  {/* One link per card, stretched over all of it by .card-cta, so
                      the whole card clicks through and the button says where. */}
                  <Link
                    href={`/work/${s.slug}`}
                    className="btn btn-primary card-cta"
                    aria-label={`Read the full ${s.name} story`}
                  >
                    Read the full story →
                  </Link>
                </div>
              </Frame>
            ))}
          </div>

          <Door
            href="/experience"
            kicker="Experience"
            title="Before this"
            summary="Ethereum core infrastructure at Nethermind, a DEX for a client in Japan, and the early roles that came first."
            items={pastCompanies}
            action="See the experience"
          />
        </section>

        {/* ── 03 selected work ────────────────────────────────────────── */}
        <section className="sec" id="work" data-reveal>
          <Kicker>03 · Built on my own</Kicker>
          <h2 className="h2">Selected projects</h2>
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

          <Door
            href="/open-source"
            kicker="Open source"
            title="Merged upstream"
            summary="Both security fixes in Zcash Zebra v6.2.2, plus merged work in librustzcash, ZecHub and ethereum.org."
            items={["Zcash Zebra", "librustzcash", "ZecHub", "ethereum.org"]}
            action="See the contributions"
          />
        </section>

        {/* ── 04 stack ────────────────────────────────────────────────── */}
        <section className="sec" id="stack" data-reveal>
          <Kicker>04 · Skills</Kicker>
          <h2 className="h2">What I work in</h2>
          {/* One line per group, like the spec table on a drawing, so the whole
              stack reads in a glance instead of a wall of chips. */}
          <dl className="spec">
            {stack.map((group) => (
              <div className="spec-row" key={group.label}>
                <dt className="spec-label">{group.label}</dt>
                <dd className="spec-items">{group.items.join(" · ")}</dd>
                <dd className="spec-proof">
                  {group.evidence ? (
                    <Link href={group.evidence.href} className="mono">
                      {group.evidence.label.replace(/^→\s*/, "")} →
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>

      </div>

      {/* ── 05 in public ────────────────────────────────────────────────── */}
      {/* Social proof sits last, after every section of actual work and right
          before the ask, so it backs the case instead of making it. It is the
          one section that runs the full width of the window, so it lives
          outside .wrap and puts the grid back around its own heading. */}
      <section className="sec-bleed" id="in-public" data-reveal>
        <TestimonialsVerticalMarquee
          kicker="05 · In public"
          title="Where I think out loud"
          subtitle="A few picks from what I post on X and LinkedIn, on AI agents, crypto infrastructure and the bugs that taught me something. Open any card to read it in full."
          posts={posts}
        />
      </section>

      <div className="wrap">
        {/* ── 06 contact ──────────────────────────────────────────────── */}
        <section className="sec" id="contact" data-reveal style={{ paddingBottom: 88 }}>
          <Kicker>06 · Contact</Kicker>
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
