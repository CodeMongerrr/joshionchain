import Image from "next/image";

/**
 * Hero portrait — hairline frame with registration marks, photograph shown as
 * shot.
 *
 * The design system's `duotone` class is deliberately not applied here: it
 * washes the image with the accent colour, and the photograph reads better
 * unmodified.
 *
 * The source is the 3000×3000 square carried over from the previous site;
 * next/image crops it to the design's 4:5 and serves AVIF/WebP at the right
 * size. Swapping in a purpose-shot 4:5 portrait means replacing the file at
 * public/profile.jpeg — nothing here changes.
 */
export function Portrait() {
  return (
    <figure
      className="hero-portrait blueprint"
      style={{ margin: 0, aspectRatio: "4 / 5", width: "100%", position: "relative" }}
    >
      <Image
        src="/profile.jpeg"
        alt="Aditya Joshi"
        fill
        sizes="(max-width: 1000px) 300px, 380px"
        style={{ objectFit: "cover" }}
        priority
      />
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </figure>
  );
}
