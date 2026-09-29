import Image from "next/image";
import type { ReactNode } from "react";

import { formatPostDate, platformLabel, type Post } from "@/data/posts";
import { site, socials } from "@/data/site";

/**
 * One post, dressed as the platform it came from. X posts borrow X's card
 * (16px radius, Chirp-style system stack, blue mentions, black in dark mode),
 * LinkedIn posts borrow LinkedIn's (8px radius, the "in" mark, the headline
 * under the name). Both follow the site's light and dark toggle.
 *
 * The whole card is one link straight to the original post, in a new tab.
 * There is no page of our own in between.
 *
 * No hooks and no server-only imports, so client components can render it.
 */

const xProfile = socials.find((s) => s.label === "X")!;

export function PostCard({
  post,
  duplicate = false,
}: {
  post: Post;
  /** A loop copy in a scrolling trail. Clickable, but hidden from assistive tech and the tab order. */
  duplicate?: boolean;
}) {
  const isX = post.platform === "x";
  const platform = platformLabel[post.platform];
  const date = formatPostDate(post.date);

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`pc pc-${post.platform}`}
      data-platform={post.platform}
      aria-label={`${post.title}, ${platform} post from ${date}, opens in a new tab`}
      aria-hidden={duplicate ? true : undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      <span className="pc-head">
        <Image
          className="pc-avatar"
          src="/profile.jpeg"
          alt=""
          width={isX ? 40 : 48}
          height={isX ? 40 : 48}
          sizes={isX ? "40px" : "48px"}
        />
        {isX ? (
          <span className="pc-id">
            <span className="pc-name">
              <span className="pc-name-text">{xProfile.handle}</span>
              <VerifiedBadge />
            </span>
            {/* Like X, the handle gives way before the date does. */}
            <span className="pc-dim pc-byline">
              <span className="pc-handle">@{xProfile.handle}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{date}</time>
            </span>
          </span>
        ) : (
          <span className="pc-id">
            <span className="pc-name">{site.name}</span>
            <span className="pc-dim pc-headline">{site.role}</span>
            <span className="pc-dim pc-meta">
              <time dateTime={post.date}>{date}</time> · <GlobeIcon />
            </span>
          </span>
        )}
        {isX ? <XLogo /> : <LinkedInLogo />}
      </span>

      {post.replyTo ? (
        <span className="pc-dim pc-replying">
          Replying to <span className="pc-link">@{post.replyTo.handle}</span>
        </span>
      ) : null}

      <span className="pc-text pc-clamp">{richText(post.text)}</span>

      {post.quote ? (
        <span className="pc-quote">
          <span className="pc-quote-by">
            <span className="pc-name">{post.quote.name}</span>{" "}
            <span className="pc-dim">@{post.quote.handle}</span>
          </span>
          <span className="pc-quote-title">{post.quote.title}</span>
        </span>
      ) : null}

      {post.response ? <span className="pc-dim pc-response">↳ {post.response.name} replied</span> : null}

      <span className="pc-open" aria-hidden="true">
        Open on {platform} ↗
      </span>
    </a>
  );
}

/**
 * Colours mentions, hashtags and links the way each platform does. They stay
 * spans, because the whole card is already a link and links can't nest.
 */
function richText(text: string): ReactNode[] {
  return text.split(/(https?:\/\/\S+|@\w{1,15}|#\w+)/g).map((part, i) =>
    i % 2 === 0 ? (
      part
    ) : (
      <span className="pc-link" key={i}>
        {part}
      </span>
    ),
  );
}

function VerifiedBadge() {
  return (
    <svg className="pc-verified" viewBox="0 0 22 22" aria-label="Verified account" role="img">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg className="pc-logo" viewBox="0 0 24 24" aria-label="Posted on X" role="img">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg className="pc-logo" viewBox="0 0 24 24" aria-label="Posted on LinkedIn" role="img">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="pc-globe" viewBox="0 0 16 16" aria-label="Public post" role="img">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm4.9 6h-2.02a11.3 11.3 0 0 0-.9-3.87A5.02 5.02 0 0 1 12.9 7zM8 13c-.5-.6-1.3-2.1-1.47-4h2.94C9.3 10.9 8.5 12.4 8 13zm-1.47-6C6.7 5.1 7.5 3.6 8 3c.5.6 1.3 2.1 1.47 4H6.53zm-.51-3.87A11.3 11.3 0 0 0 5.12 7H3.1a5.02 5.02 0 0 1 2.92-3.87zM3.1 9h2.02c.1 1.37.42 2.7.9 3.87A5.02 5.02 0 0 1 3.1 9zm6.88 3.87c.48-1.17.8-2.5.9-3.87h2.02a5.02 5.02 0 0 1-2.92 3.87z" />
    </svg>
  );
}
