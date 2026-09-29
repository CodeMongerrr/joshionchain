import Link from "next/link";

import { contactEmail, site, socials } from "@/data/site";

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
        <Link href="/experience">Experience</Link>
        <Link href="/open-source">Open source</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/about">About</Link>
      </nav>
      <span className="mono dimmer" style={{ fontSize: 12, marginLeft: "auto" }}>
        {site.domain}
      </span>
    </footer>
  );
}
