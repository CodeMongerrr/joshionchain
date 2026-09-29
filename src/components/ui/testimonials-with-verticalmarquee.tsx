import Link from "next/link";
import { Fragment } from "react";
import type { CSSProperties } from "react";

import { Frame, Kicker } from "@/components/blueprint";
import type { Post } from "@/data/posts";

import { InView } from "./testimonials-with-verticalmarquee-utils/in-view";
import KineticTestimonial from "./testimonials-with-verticalmarquee-utils/kinetic-testimonials";

/**
 * The homepage "In public" section. It is the 21st.dev vertical marquee
 * testimonial block, rebuilt on the site's blueprint system so it needs no
 * motion library.
 *
 * The heading still blurs in word by word and the marquee still rises in
 * after it, with CSS keyed off <InView> instead of motion's whileInView. Every
 * card is a link to that post's own page, which carries the post in full and
 * the link out to the original.
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
      <p className="body dim kt-sub" style={{ margin: "16px 0 44px" }}>
        {subtitle}
      </p>

      <div className="kt-rise">
        <Frame className="kt-frame">
          <KineticTestimonial
            items={posts}
            desktopColumns={3}
            tabletColumns={2}
            mobileColumns={1}
            speed={1}
          />
        </Frame>
      </div>

      <p className="kt-sub" style={{ marginTop: 24 }}>
        <Link href="/posts" className="mono" style={{ fontSize: 13 }}>
          All {posts.length} posts →
        </Link>
      </p>
    </InView>
  );
}
