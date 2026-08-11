import Link from "next/link";
import { notFound } from "next/navigation";

import { Kicker, TagRow } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { projectBySlug, projects } from "@/data/projects";
import { breadcrumbSchema, jsonLd, pageMeta, projectSchema } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return pageMeta({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={jsonLd(
          projectSchema(project.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/projects/${project.slug}` },
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

          <Kicker>{project.language}</Kicker>
          <h1 className="h2">{project.title}</h1>

          <p className="mono dim" style={{ fontSize: 13, marginTop: 4 }}>
            {project.repo}
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          {project.body.map((paragraph, i) => (
            <p className="body" key={i} style={{ marginBottom: 16 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <TagRow items={project.tags} />

          <p style={{ marginTop: 24 }}>
            <a
              className="btn btn-secondary mono"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              View source on GitHub →
            </a>
          </p>

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
