import { ImageResponse } from "next/og";

import { site } from "@/data/site";

/**
 * The social card, generated at build time rather than shipped as a binary.
 *
 * Keeping it as code means it can never drift from the copy in site.ts, the
 * headline and tagline here are the same strings the page renders. Next reuses
 * this for `twitter:image` too, so one file covers every share surface.
 *
 * Deliberately typographic: no photograph, no logo, nothing that needs an
 * asset pipeline or an art pass to look intentional.
 */
export const runtime = "nodejs";
export const alt = `${site.name}, ${site.role}. ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111214",
          padding: 72,
          // The accent rule along the top edge is the one piece of brand here.
          borderTop: "10px solid #5980a6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              color: "#94bce3",
              textTransform: "uppercase",
            }}
          >
            {site.domain}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              color: "#fafafa",
              marginTop: 24,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.35,
              color: "#a8a8ac",
              marginTop: 28,
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 24,
            color: "#77777c",
            borderTop: "1px solid #2c2c30",
            paddingTop: 28,
          }}
        >
          <span>{site.role}</span>
          <span>·</span>
          <span>{site.domains.join(" · ")}</span>
        </div>
      </div>
    ),
    size,
  );
}
