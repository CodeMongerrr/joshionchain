import { contactEmail, resumePdf, site, socials } from "@/data/site";

export function SiteFooter() {
  return (
    <footer
      className="wrap"
      style={{
        borderTop: "1px solid var(--color-divider)",
        padding: "28px clamp(20px,5vw,56px) 44px",
        display: "flex",
        flexWrap: "wrap",
        gap: "12px 28px",
        alignItems: "baseline",
      }}
    >
      <span className="mono dimmer" style={{ fontSize: 12 }}>
        {site.credential}
      </span>
      <nav
        className="mono"
        style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", fontSize: 12 }}
        aria-label="Footer"
      >
        {socials.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="me noopener noreferrer">
            {s.label}
          </a>
        ))}
        {contactEmail ? <a href={`mailto:${contactEmail}`}>Email</a> : null}
        {/* No links to other pages here. Every page opens from the landing
            page and leads back to it, so the footer only carries ways to
            reach me and the resume as a file. */}
        <a href={resumePdf.href} download={resumePdf.filename}>
          Resume PDF
        </a>
      </nav>
      <span className="mono dimmer" style={{ fontSize: 12, marginLeft: "auto" }}>
        {site.domain}
      </span>
    </footer>
  );
}
