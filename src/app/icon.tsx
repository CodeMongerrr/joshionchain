import { ImageResponse } from "next/og";

/**
 * Favicon, generated rather than committed as a binary so it stays in step
 * with the accent colour in globals.css.
 *
 * A monogram, not a glyph: at 32px anything more detailed turns to mud in a
 * browser tab.
 */
export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5980a6",
          color: "#ffffff",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        AJ
      </div>
    ),
    size,
  );
}
