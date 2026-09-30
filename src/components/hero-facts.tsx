import Link from "next/link";

import { home, site } from "@/data/site";

/**
 * Three quick facts under the hero, what I work on, what I have shipped and
 * where I am, with the time zones I can work across, the thing a recruiter in
 * another country checks first. Deliberately unboxed, just a hairline and space, so the hero
 * has one framed thing (the portrait) instead of a grid of boxes. The first
 * two jump to the matching section further down this same page.
 */
export function HeroFacts() {
  return (
    <dl className="facts">
      <div className="fact">
        <dt className="fact-label">Focus</dt>
        <dd>
          <Link className="fact-value" href="/#stack">
            Distributed systems, AI agents, crypto
          </Link>
          <span className="fact-sub">Backends, integrations and data pipelines</span>
        </dd>
      </div>

      <div className="fact">
        <dt className="fact-label">Shipped</dt>
        <dd>
          <Link className="fact-value" href="/#building-now">
            {site.proof[0]}
          </Link>
          <span className="fact-sub">Zcash Zebra security fixes · ex-Nethermind</span>
        </dd>
      </div>

      <div className="fact">
        <dt className="fact-label">Based in</dt>
        <dd>
          <span className="fact-value">{site.location}</span>
          <span className="fact-sub">
            {home.zoneLabel}, {home.utcOffset}
          </span>
          <span className="fact-sub fact-hours">{home.workHours}</span>
        </dd>
      </div>
    </dl>
  );
}
