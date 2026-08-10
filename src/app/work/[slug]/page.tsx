import Link from "next/link";
import { notFound } from "next/navigation";

import { Evidence, Frame, Kicker, TagRow } from "@/components/blueprint";
import { Diagram } from "@/components/diagrams";
import { JsonLd } from "@/components/json-ld";
import { systemBySlug, systems } from "@/data/systems";
import { breadcrumbSchema, jsonLd, pageMeta, systemSchema } from "@/lib/seo";

/** Every system is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) return {};

  return pageMeta({
    title: system.seoTitle,
    description: system.seoDescription,
    path: `/work/${system.slug}`,
  });
}

/**
 * A system detail page.
 *
 * This is where the long-form `body` prose lives. The home page and the work
 * index both carry only `summary`, which is what lets those pages stay
 * spacious while these carry the depth a search engine can actually rank.
 */
export default async function SystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) notFound();

  return (
    <>
      <JsonLd
        data={jsonLd(
          systemSchema(system.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: system.name, path: `/work/${system.slug}` },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <p className="mono dimmer" style={{ fontSize: 12 }}>
            <Link href="/work" className="rowlink">
              ← Work
            </Link>
          </p>

          <Kicker>
            {system.domain} · {system.period}
          </Kicker>

          <h1 className="h2">{system.name}</h1>

          <p className="mono dim" style={{ fontSize: 13, marginTop: 4 }}>
            {system.context}
          </p>

          {system.evidence ? <Evidence items={system.evidence} className="mt-6" /> : null}
        </div>
      </section>

      <section className="sec">
        <div className="wrap wrap-prose">
          {system.body.map((paragraph, i) => (
            <p className="body" key={i} style={{ marginBottom: 16 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {system.diagram ? (
        <section className="sec">
          <div className="wrap">
            <h2 className="h3">Architecture</h2>
            <div style={{ marginTop: 20 }}>
              <Diagram kind={system.diagram} />
            </div>
          </div>
        </section>
      ) : null}

      {system.subItems?.length ? (
        <section className="sec">
          <div className="wrap">
            <h2 className="h3">What&rsquo;s in it</h2>
            <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
              {system.subItems.map((item) => (
                <Frame as="article" key={item.name}>
                  <div style={{ padding: 20 }}>
                    <h3 className="mono" style={{ fontSize: 15 }}>
                      {item.name}
                    </h3>
                    <p className="body" style={{ marginTop: 8 }}>
                      {item.description}
                    </p>
                  </div>
                </Frame>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <h2 className="h3">Stack</h2>
          <TagRow items={system.tags} className="mt-4" />

          <p style={{ marginTop: 32 }}>
            <Link href="/work" className="mono rowlink">
              ← All work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
