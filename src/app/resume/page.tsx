import { Kicker, TagRow } from "@/components/blueprint";
import { JsonLd } from "@/components/json-ld";
import { PrintButton } from "@/components/print-button";
import { Rich } from "@/components/rich";
import { roles } from "@/data/experience";
import {
  resumeEducation,
  resumeOpenSource,
  resumeProjects,
  resumeSummary,
  type ResumeEntry,
} from "@/data/resume";
import { contactEmail, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { breadcrumbSchema, jsonLd, pageMeta, personSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resume",
  description:
    "Resume of Aditya Joshi, forward deployed founding engineer. BatteryFlow, BharatTruck, Gusto Development and Nethermind, both Zcash Zebra v6.2.2 security fixes, MEV Shield, and skills across distributed systems, AI engineering and Web3 security.",
  path: "/resume",
});

/**
 * The resume as HTML, word for word with the PDF. Recruiters can read it
 * without downloading anything, crawlers and agents can index it, and the
 * print stylesheet turns it into a clean PDF.
 */

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="body" style={{ marginTop: 12, paddingLeft: 18, display: "grid", gap: 8 }}>
      {items.map((b) => (
        <li key={b}>
          <Rich text={b} />
        </li>
      ))}
    </ul>
  );
}

function Head({
  name,
  href,
  sub,
  period,
}: {
  name: string;
  href?: string;
  sub: string;
  period: string;
}) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px" }}>
        <h3 className="h3">{href ? <a href={href}>{name}</a> : name}</h3>
        <span className="mono dimmer" style={{ fontSize: 12, marginLeft: "auto" }}>
          {period}
        </span>
      </div>
      <p className="mono dim" style={{ fontSize: 13, marginTop: 4 }}>
        {sub}
      </p>
    </>
  );
}

function Entry({ e }: { e: ResumeEntry }) {
  return (
    <div style={{ marginTop: 24 }}>
      <Head name={e.name} href={e.href} sub={e.meta} period={e.period} />
      <Bullets items={e.bullets} />
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={jsonLd(
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap-prose">
          <Kicker>Resume</Kicker>
          <h1 className="h2">{site.name}</h1>
          <p className="body" style={{ marginTop: 10 }}>
            {site.role} · {site.location} · Open to relocation (US, UK, UAE)
          </p>
          <p
            className="mono"
            style={{ fontSize: 13, marginTop: 12, display: "flex", flexWrap: "wrap", gap: "6px 18px" }}
          >
            {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : null}
            {socials.map((s) => (
              <a key={s.href} href={s.href} rel="me">
                {s.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            ))}
          </p>
          <div style={{ marginTop: 20 }}>
            <PrintButton />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          <h2 className="h3">Summary</h2>
          <p className="body" style={{ marginTop: 12 }}>
            <Rich text={resumeSummary} />
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          <h2 className="h3">Technical skills</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            {stack.map((g) => (
              <div key={g.label}>
                <p className="mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
                  {g.label}
                </p>
                <TagRow items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          <h2 className="h3">Experience</h2>
          {roles.map((r) => (
            <div style={{ marginTop: 24 }} key={r.company}>
              <Head
                name={r.company}
                href={r.companyUrl}
                sub={`${r.title} · ${r.what} · ${r.location}`}
                period={r.period}
              />
              <Bullets items={r.bullets} />
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          <h2 className="h3">Open source</h2>
          {resumeOpenSource.map((e) => (
            <Entry e={e} key={e.name} />
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap-prose">
          <h2 className="h3">Projects</h2>
          {resumeProjects.map((e) => (
            <Entry e={e} key={e.name} />
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 88 }}>
        <div className="wrap-prose">
          <h2 className="h3">Education</h2>
          <div style={{ marginTop: 16 }}>
            <Head
              name={resumeEducation.school}
              sub={`${resumeEducation.degree} · ${resumeEducation.location}`}
              period={resumeEducation.period}
            />
          </div>
        </div>
      </section>
    </>
  );
}
