import Link from "next/link";
import { Fragment } from "react";
import type { CSSProperties } from "react";

import { Kicker } from "@/components/blueprint";
import type { Post } from "@/data/posts";

import { InView } from "./testimonials-with-verticalmarquee-utils/in-view";
import KineticTestimonial from "./testimonials-with-verticalmarquee-utils/kinetic-testimonials";

/**
 * The homepage "In public" section, the 21st.dev vertical marquee
 * testimonial block rebuilt on the site's blueprint system with no motion
 * library.
 *
 * The heading and the links stay on the page grid. The wall itself runs the
 * full width of the window between two hairlines, with ruled trails and the
 * grid's registration marks sitting on those hairlines, so it reads as one
 * wide sheet of the same drawing rather than a widget dropped in.
 *
 * The heading still blurs in word by word and the wall still rises in after
 * it, with CSS keyed off <InView>. Every card links to that post's own page.
 */
export default function TestimonialsVerticalMarquee({
  kicker,
  title,
  subtitle,
  posts,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  posts: readonly Post[];
}) {
  const words = title.split(" ");

  return (
    <InView className="kt">
      <div className="wrap">
        <div className="kt-head">
          <Kicker>{kicker}</Kicker>
          <h2 className="h2 kt-title">
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className="kt-w" style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <p className="body dim kt-sub" style={{ margin: "16px 0 0" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="kt-rise kt-band">
        <KineticTestimonial items={posts} maxColumns={7} minColumnWidth={260} speed={1} />
        {/* The grid's registration marks, on the band's hairlines at the
            content edges, tying the full width band back to the page. */}
        <div className="kt-marks" aria-hidden="true">
          <div className="wrap">
            <div className="kt-marks-box">
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="kt-foot kt-sub">
          <Link href="/posts" className="mono" style={{ fontSize: 13 }}>
            All {posts.length} posts →
          </Link>
          <span className="mono dimmer kt-hint">
            <span className="kt-hint-pointer">Scroll to turn it · rest the mouse on it to stop</span>
            <span className="kt-hint-touch">Scroll to turn it</span>
          </span>
        </div>
      </div>
    </InView>
  );
}
