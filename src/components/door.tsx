import Link from "next/link";

import { Corners } from "@/components/blueprint";

/**
 * A door to a page that holds what the homepage only summarises.
 *
 * The homepage is the overview a visitor skims in one pass, so anything long
 * (every past role, every upstream PR) lives on its own page, and the way in
 * has to be impossible to miss. The whole card is the link, tinted with the
 * accent and framed like everything else, with a real button on the right
 * rather than a small text link at the end of a section.
 */
export function Door({
  href,
  kicker,
  title,
  summary,
  items,
  action,
}: {
  href: string;
  kicker: string;
  title: string;
  summary: string;
  /** A few names that show what is behind the door. */
  items?: readonly string[];
  action: string;
}) {
  return (
    <Link href={href} className="frame door">
      <Corners />
      <span className="door-text">
        <span className="kick">{kicker}</span>
        <span className="door-title">{title}</span>
        <span className="door-summary">{summary}</span>
        {items ? (
          <span className="door-items">
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        ) : null}
      </span>
      <span className="btn btn-primary door-action">{action} →</span>
    </Link>
  );
}
