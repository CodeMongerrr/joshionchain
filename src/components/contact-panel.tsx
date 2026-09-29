import { Frame } from "@/components/blueprint";
import { CopyEmail } from "@/components/copy-email";
import { LocalTime } from "@/components/local-time";
import { contactEmail, contactTopics, mailto, socials } from "@/data/site";

/**
 * Everything someone needs to reach me, in one place, with no dead ends.
 *
 * The address is printed in full and has a copy button, because a mailto
 * link alone fails silently on desktops without a mail app. The topic
 * buttons open an email already addressed and titled, the local time sets
 * expectations across time zones, and the contact card saves me to a phone
 * in one tap.
 */
export function ContactPanel() {
  return (
    <Frame className="reach">
      <div className="reach-main">
        {contactEmail ? (
          <>
            <span className="kick">Email</span>
            <a className="reach-email" href={mailto() ?? undefined}>
              {contactEmail}
            </a>
            <div className="reach-actions">
              <a className="btn btn-primary" href={mailto() ?? undefined}>
                Write an email ↗
              </a>
              <CopyEmail email={contactEmail} />
            </div>
          </>
        ) : null}
        <LocalTime className="mono dimmer reach-time" />
      </div>

      <div className="reach-side">
        {contactEmail ? (
          <>
            <span className="kick">Start an email about</span>
            <div className="reach-actions">
              {contactTopics.map((t) => (
                <a className="btn btn-secondary" href={mailto(t) ?? undefined} key={t.label}>
                  {t.label} ↗
                </a>
              ))}
            </div>
          </>
        ) : null}

        <span className="kick" style={{ marginTop: contactEmail ? 26 : 0 }}>
          Or find me on
        </span>
        <div className="reach-actions">
          {socials.map((s) => (
            <a
              key={s.href}
              className="btn btn-secondary"
              href={s.href}
              target="_blank"
              rel="me noopener noreferrer"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
        <a className="mono reach-card" href="/aditya-joshi.vcf" download>
          Save my contact card
        </a>
      </div>
    </Frame>
  );
}
