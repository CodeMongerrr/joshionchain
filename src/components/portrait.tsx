import Image from "next/image";

/**
 * Hero portrait, hairline frame with registration marks, photograph shown as
 * shot.
 *
 * The design system's `duotone` class is deliberately not applied here: it
 * washes the image with the accent colour, and the photograph reads better
 * unmodified.
 *
 * The source is the 3000×3000 square carried over from the previous site.
 * Beside the hero text the frame takes the height of that text, so its top
 * and bottom edges line up with the first and last lines, and the photo is
 * cropped to fit (see .hero-portrait). next/image serves AVIF/WebP at the
 * right size. Swapping in another portrait means replacing the file at
 * public/profile.jpeg, nothing here changes.
 */
export function Portrait() {
  return (
    <figure className="hero-portrait blueprint">
      <Image
        src="/profile.jpeg"
        alt="Aditya Joshi"
        fill
        sizes="(max-width: 700px) 360px, 300px"
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
