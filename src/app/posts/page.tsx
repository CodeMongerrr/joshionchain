import Link from "next/link";

import { Kicker } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { ReachOut } from "@/components/reach-out";
import { PostCard } from "@/components/ui/testimonials-with-verticalmarquee-utils/post-card";
import { posts } from "@/data/posts";
import { socials } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Posts",
  description:
    "Selected posts by Aditya Joshi on X and LinkedIn, on AI agents, agent payments, Zcash and finding what is actually broken in production systems.",
  path: "/posts",
});

/**
 * The picks, still. The homepage wall is the lively version; this is the one
 * that works for reading, for keyboards and for crawlers. The platform filter
 * is pure CSS, same as the open-source status filter.
 *
 * No counts anywhere on purpose. This is a handful chosen from an ongoing
 * feed, so the page points at the feeds rather than presenting itself as the
 * whole archive.
 */
export default function PostsPage() {
  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <Kicker>In public</Kicker>
          <h1 className="h2">A few picks</h1>
          <p className="body dim" style={{ marginTop: 16 }}>
            A handful of posts from X and LinkedIn that show how I think. Each one opens here with
            its context and a link to the original. The rest of what I post lives on both.
          </p>
          <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 20 }}>
            {socials
              .filter((s) => s.label !== "GitHub")
              .map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  style={{ fontSize: 13 }}
                >
                  Follow on {s.label} ↗
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap pgrid">
          {/* Pure-CSS filtering via :has(), works with JavaScript disabled. */}
          <div className="seg" role="group" aria-label="Filter posts by platform">
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-all" defaultChecked />
              All
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-x" />X
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-li" />
              LinkedIn
            </label>
          </div>

          <div className="pgrid-cols">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <ReachOut prompt="Thinking about the same problems? I would love to hear from you." />

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
