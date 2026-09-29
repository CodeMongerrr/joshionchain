import Link from "next/link";

import { Kicker } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/ui/testimonials-with-verticalmarquee-utils/post-card";
import { posts } from "@/data/posts";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Posts",
  description:
    "Selected posts by Aditya Joshi on X and LinkedIn, on AI agents, agent payments, Zcash and finding what is actually broken in production systems.",
  path: "/posts",
});

/**
 * Every post at once, still. The homepage marquee is the lively version; this
 * is the one that works for reading, for keyboards and for crawlers. The
 * platform filter is pure CSS, same as the open-source status filter.
 */
export default function PostsPage() {
  const counts = {
    x: posts.filter((p) => p.platform === "x").length,
    linkedin: posts.filter((p) => p.platform === "linkedin").length,
  };

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
          <h1 className="h2">Posts</h1>
          <p className="body dim" style={{ marginTop: 16 }}>
            Selected posts from X and LinkedIn. Each one opens here with its context, and links
            to the original.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap pgrid">
          {/* Pure-CSS filtering via :has(), works with JavaScript disabled. */}
          <div className="seg" role="group" aria-label="Filter posts by platform">
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-all" defaultChecked />
              All {posts.length}
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-x" />X {counts.x}
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="postfilter" id="pf-li" />
              LinkedIn {counts.linkedin}
            </label>
          </div>

          <div className="pgrid-cols">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
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
