import Link from "next/link";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/data/projects";
import { systems } from "@/data/systems";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Production systems in freight logistics, EV fleet telematics, and Zcash infrastructure — plus selected open-source projects in Go, Rust, and Solidity.",
  path: "/work",
});

/**
 * The work index.
 *
 * Systems get full cards because they're the current, load-bearing work;
 * projects get compact rows because they're supporting evidence. That
 * asymmetry is the whole point — a uniform grid would flatten the hierarchy
 * and make a 2024 side project look equal to a platform in production.
 */
export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <Kicker>Work</Kicker>
          <h1 className="h2">Systems and projects</h1>
          <p className="body dim wrap-prose">
            Three systems currently in production across three different
            markets, and the open-source projects behind the protocol work.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h3">Building now</h2>

          <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
            {systems.map((s) => (
              <Frame as="article" key={s.slug}>
                <div style={{ padding: 24 }}>
                  <p className="mono dimmer" style={{ fontSize: 12 }}>
                    {s.domain} · {s.period}
                  </p>

                  <h3 className="h3" style={{ marginTop: 8 }}>
                    <Link href={`/work/${s.slug}`} className="frame-link">
                      {s.name}
                    </Link>
                  </h3>

                  <p className="mono dim" style={{ fontSize: 13, marginTop: 4 }}>
                    {s.context}
                  </p>

                  <p className="body" style={{ marginTop: 12 }}>
                    {s.summary}
                  </p>

                  {s.evidence ? <Evidence items={s.evidence} className="mt-4" /> : null}
                  <TagRow items={s.tags} className="mt-4" />

                  <p style={{ marginTop: 16 }}>
                    <Link href={`/work/${s.slug}`} className="mono rowlink">
                      Read more about {s.name} →
                    </Link>
                  </p>
                </div>
              </Frame>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h3">Selected projects</h2>
          <p className="body dim wrap-prose" style={{ marginTop: 8 }}>
            Deliberately capped at four. Each one is public and readable.
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            {projects.map((p) => (
              <Frame as="article" key={p.slug}>
                <div style={{ padding: 20 }}>
                  <p className="mono dimmer" style={{ fontSize: 12 }}>
                    {p.language} · {p.repo}
                  </p>

                  <h3 className="h3" style={{ marginTop: 8 }}>
                    <Link href={`/projects/${p.slug}`} className="frame-link">
                      {p.title}
                    </Link>
                  </h3>

                  <p className="body" style={{ marginTop: 8 }}>
                    {p.summary}
                  </p>

                  <TagRow items={p.tags} className="mt-4" />
                </div>
              </Frame>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
