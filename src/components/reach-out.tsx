import { CopyEmail } from "@/components/copy-email";
import { contactEmail, mailto, socials } from "@/data/site";

/**
 * The closing line on every detail page. Whoever read this far is the person
 * most likely to write, so the way to do it sits right here instead of back
 * on the homepage.
 */
export function ReachOut({ prompt, subject }: { prompt: string; subject?: string }) {
  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const email = mailto({ subject });

  return (
    <div className="reach-strip">
      <p className="body" style={{ margin: 0 }}>
        {prompt}
      </p>
      <div className="reach-actions">
        {contactEmail && email ? (
          <>
            <a className="btn btn-primary" href={email}>
              Email me ↗
            </a>
            <CopyEmail email={contactEmail} />
          </>
        ) : null}
        {linkedin ? (
          <a className="btn btn-secondary" href={linkedin.href} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}
