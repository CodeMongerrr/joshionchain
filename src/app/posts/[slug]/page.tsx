import Link from "next/link";
import { notFound } from "next/navigation";

import { Kicker } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { ReachOut } from "@/components/reach-out";
import { PostCard } from "@/components/ui/testimonials-with-verticalmarquee-utils/post-card";
import { formatPostDate, platformLabel, postBySlug, posts } from "@/data/posts";
import { socials } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMeta, postSchema } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return pageMeta({
    title: post.title,
    description: post.note,
    path: `/posts/${post.slug}`,
  });
}

/**
 * Where a card from the "In public" marquee lands. The post in full, dressed
 * as its platform, with the context around it and the way out to the
 * original.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  // Two more picks to keep reading, then the way out to the live feeds. No
  // previous and next that loop back round, which would show where the
  // picks run out.
  const i = posts.indexOf(post);
  const more = [posts[(i + 1) % posts.length], posts[(i + 2) % posts.length]];
  const feed = socials.find((s) => s.label === platformLabel[post.platform]);
  const platform = platformLabel[post.platform];

  return (
    <>
      <JsonLd
        data={jsonLd(
          postSchema(post.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts" },
            { name: post.title, path: `/posts/${post.slug}` },
          ]),
        )}
      />

      {/* Laid out like the homepage hero, the words on the left and the post
          on the right as the page's registered figure, the way the portrait
          sits there. On a long post the left column stays in view. */}
      <section className="sec sec-first">
        <div className="wrap post-hero">
          <div className="post-lead">
            <p className="mono dimmer" style={{ fontSize: 12 }}>
              <Link href="/posts" className="rowlink">
                ← All posts
              </Link>
            </p>

            <Kicker>
              Posted on {platform} · {formatPostDate(post.date)}
            </Kicker>
            <h1 className="post-title">{post.title}</h1>
            <p className="body dim" style={{ margin: 0 }}>
              {post.note}
            </p>

            {post.response ? (
              <div className="post-reply">
                <p className="mono dimmer" style={{ fontSize: 12, margin: "0 0 6px" }}>
                  {post.response.name} replied
                </p>
                <p className="body" style={{ margin: "0 0 8px" }}>
                  {post.response.summary}
                </p>
                <a
                  className="mono"
                  style={{ fontSize: 13 }}
                  href={post.response.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the reply on X ↗
                </a>
              </div>
            ) : null}

            <div className="post-actions">
              <a
                className="btn btn-primary"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "10px 18px", fontSize: 15 }}
              >
                Open on {platform} ↗
              </a>
              {post.related ? (
                <Link
                  className="btn btn-secondary"
                  href={post.related.href}
                  style={{ padding: "10px 18px", fontSize: 15 }}
                >
                  {post.related.label} →
                </Link>
              ) : null}
            </div>
          </div>

          <figure className="post-figure">
            <figcaption className="figcap">As posted on {platform}</figcaption>
            <div className="post-figure-card">
              <PostCard post={post} variant="full" />
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
            </div>
          </figure>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <ReachOut
            prompt="Thinking about the same problems? I would love to hear from you."
            subject={`About your post, ${post.title}`}
          />

          <h2 className="h3" style={{ marginTop: 56 }}>
            Keep reading
          </h2>
          <div style={{ borderTop: "1px solid var(--color-divider)", marginTop: 16 }}>
            {more.map((p) => (
              <Link className="rowlink" href={`/posts/${p.slug}`} key={p.slug}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: ".01em",
                    }}
                  >
                    {p.title}
                  </div>
                  <p className="body dim" style={{ fontSize: 15, margin: "4px 0 0" }}>
                    {p.note}
                  </p>
                </div>
                <span className="mono dimmer" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                  On {platformLabel[p.platform]} →
                </span>
              </Link>
            ))}
            {feed ? (
              <a className="rowlink" href={feed.href} target="_blank" rel="noopener noreferrer">
                <div
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: ".01em",
                  }}
                >
                  Everything else I post on {feed.label}
                </div>
                <span className="mono dimmer" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                  Follow ↗
                </span>
              </a>
            ) : null}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link href="/#in-public" className="mono rowlink">
              ← Back to the overview
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
