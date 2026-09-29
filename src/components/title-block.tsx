import Link from "next/link";

import { Frame } from "@/components/blueprint";
import { CopyEmail } from "@/components/copy-email";
import { roles } from "@/data/experience";
import { contactEmail, home, mailto, site } from "@/data/site";

/**
 * The hero's title block, the box in the corner of an engineering drawing
 * that says what it is, who drew it and where to find them. Four answers a
 * visitor wants before scrolling, now, before, where, and how to reach me.
 *
 * Every value comes from the data files, so it can't drift from the resume.
 */
export function TitleBlock() {
  const [current, previous] = roles;
  const nethermind = roles.find((r) => r.company === "Nethermind");
  const email = contactEmail ? mailto() : null;

  return (
    <Frame className="tblock">
      <dl className="tblock-grid">
        <div className="tcell">
          <dt className="tlabel">Now</dt>
          <dd>
            <Link className="tvalue" href={current.slug ? `/work/${current.slug}` : "/work"}>
              {current.company}
            </Link>
            <span className="tsub">{current.title}</span>
          </dd>
        </div>

        <div className="tcell">
          <dt className="tlabel">Before</dt>
          <dd>
            <Link className="tvalue" href="/about">
              {previous.company}
              {nethermind ? ` · ${nethermind.company}` : null}
            </Link>
            <span className="tsub">
              {previous.title}
              {nethermind ? ` · ${nethermind.title}` : null}
            </span>
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
