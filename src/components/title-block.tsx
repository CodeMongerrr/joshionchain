import Link from "next/link";

import { Frame } from "@/components/blueprint";
import { CopyEmail } from "@/components/copy-email";
import { contactEmail, home, mailto, site } from "@/data/site";

/**
 * The hero's title block, the box in the corner of an engineering drawing
 * that says what it is, who drew it and where to find them. Four answers a
 * visitor wants before scrolling, what I work on, what I have shipped, where
 * I am and how to reach me.
 *
 * Deliberately not tied to one employer or one kind of role. The first two
 * cells jump to the matching section further down this same page.
 */
export function TitleBlock() {
  const email = contactEmail ? mailto() : null;

  return (
    <Frame className="tblock">
      <dl className="tblock-grid">
        <div className="tcell">
          <dt className="tlabel">Focus</dt>
          <dd>
            <Link className="tvalue" href="/#stack">
              Distributed systems, AI agents, crypto
            </Link>
            <span className="tsub">Backends, integrations and data pipelines</span>
          </dd>
        </div>

        <div className="tcell">
          <dt className="tlabel">Shipped</dt>
          <dd>
            <Link className="tvalue" href="/#building-now">
              {site.proof[0]}
            </Link>
            <span className="tsub">Zcash Zebra security fixes · ex-Nethermind</span>
          </dd>
        </div>

        <div className="tcell">
          <dt className="tlabel">Based in</dt>
          <dd>
            <span className="tvalue">{site.location}</span>
            <span className="tsub">India Standard Time ({home.zoneLabel})</span>
          </dd>
        </div>

        <div className="tcell">
          <dt className="tlabel">Reach me</dt>
          <dd>
            {contactEmail && email ? (
              <>
                <a className="tvalue" href={email}>
                  {contactEmail}
                </a>
                <CopyEmail email={contactEmail} className="tcopy mono" />
              </>
            ) : (
              <Link className="tvalue" href="/#contact">
                Contact
              </Link>
            )}
          </dd>
        </div>
      </dl>
    </Frame>
  );
}
