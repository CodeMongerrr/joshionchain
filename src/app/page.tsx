import Link from "next/link";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { ContactPanel } from "@/components/contact-panel";
import { CopyEmail } from "@/components/copy-email";
import { Door } from "@/components/door";
import { HeroPosts } from "@/components/hero-posts";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { Portrait } from "@/components/portrait";
import { HeroFacts } from "@/components/hero-facts";
import { earlier, roles } from "@/data/experience";
import { postTrails } from "@/data/posts";
import { projects } from "@/data/projects";
import { results } from "@/data/results";
import { contactEmail, resumePdf, site, socials } from "@/data/site";
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
  const [left, right] = postTrails();

  return (
    <main id="main">
      {/* Person and WebSite come from the layout; this marks the homepage as
          being about that person rather than merely mentioning them. */}
      <JsonLd data={jsonLd(profilePageSchema())} />
      <LegacyHashRedirect />

      {/* ── hero ──────────────────────────────────────────────────────── */}
      {/* The whole first screen. On laptop and wider screens the hero sits
          between two trails of posts from X and LinkedIn and fills the
          screen under the bar, so everything in it is seen without a scroll. */}
      <div className="hero-stage">
        <div className="wrap hero-center">
          <header className="hero-grid">
            <div className="hero-copy">
              <span className="hero-status">
                <i aria-hidden="true" />
                {site.statusPill}
              </span>

              <h1 className="hero-name">{site.name}</h1>

              <p className="body hero-tagline">{site.tagline}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Get in touch
                </a>
                <a className="hero-textlink" href={resumePdf.href} download={resumePdf.filename}>
                  Download the resume ↓
                </a>
              </div>

              <div className="mono hero-socials">
                {socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                ))}
                {contactEmail ? (
                  <span className="hero-email">
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    <CopyEmail email={contactEmail} className="inline-copy mono" />
                  </span>
                ) : null}
              </div>
            </div>

            <Portrait />
            <HeroFacts />
          </header>
        </div>
        <HeroPosts left={left} right={right} />
      </div>

      <div className="wrap">

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
          <Kicker>02 · Work</Kicker>
          <h2 className="h2">Founding roles, Nethermind and a studio</h2>
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
                  {/* Ended roles say so, quietly, so a past role carries the
                      same weight without reading as current. */}
                  {/present/i.test(s.period) ? null : <span className="past-role">Past role</span>}
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
            summary="A DEX built for a client in Japan, a healthcare platform in Dubai, and the early roles that came first."
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


        {/* ── 05 contact ──────────────────────────────────────────────── */}
        <section className="sec" id="contact" data-reveal style={{ paddingBottom: 88 }}>
          <Kicker>05 · Contact</Kicker>
          <h2 className="h2">Get in touch</h2>
          <p className="body" style={{ fontSize: 19, lineHeight: 1.45, margin: "18px 0 32px" }}>
            Open to new roles, and to problems where the hard part is figuring out what is
            actually broken. I would love to hear about yours.
          </p>
          <ContactPanel />
        </section>
      </div>
    </main>
  );
}
