import { NextResponse } from "next/server";

import { posts } from "@/data/posts";

/**
 * Posts used to have pages of their own here. Every card now opens the
 * original on X or LinkedIn, so an old address, from a search result or a
 * shared link, goes straight to that original too. Anything unknown goes
 * home, where the posts live now.
 */
export function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const post = posts.find((p) => p.slug === slug);
    return NextResponse.redirect(post ? post.url : new URL("/", request.url), 307);
  });
}
