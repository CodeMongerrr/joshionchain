import Link from "next/link";

import { Kicker, TagRow } from "@/components/blueprint";
import { Door } from "@/components/door";
import { JsonLd } from "@/components/json-ld";
import { Portrait } from "@/components/portrait";
import { bio } from "@/data/about";
import { earlier, roles } from "@/data/experience";
import { contactEmail, site, socials } from "@/data/site";
import { stack } from "@/data/stack";
import { breadcrumbSchema, jsonLd, pageMeta, personSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "About Aditya Joshi, a forward deployed founding engineer in Mumbai. Built BharatTruck alone, fixes hard problems at BatteryFlow, wrote both Zcash Zebra v6.2.2 security fixes, builds with Jino Labs, and is open to roles in the US, UK and UAE.",
  path: "/about",
});

export default function AboutPage() {
  const pastCompanies = [...roles.filter((r) => !r.slug), ...earlier].map((r) => r.company);

  return (
    <>
      <JsonLd
        data={jsonLd(
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />

      <section className="sec sec-first">
        <div className="wrap">
          <Kicker>About</Kicker>
          <h1 className="h2">{site.name}</h1>

          <div className="hero-grid" style={{ marginTop: 24 }}>
            <div>
              {bio.map((p, i) => (
                <p className={i === 0 ? "body" : "body dim"} key={p} style={{ marginTop: i === 0 ? 0 : 12 }}>
                  {p}
                </p>
              ))}
              <p className="mono dimmer" style={{ fontSize: 12, marginTop: 20 }}>
                {site.credential}
              </p>
            </div>
            <Portrait />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {/* The full list lives on /experience now. One door here instead of
              a second copy to read through. */}
          <Door
            href="/experience"
            kicker="Previously"
            title="Before this"
            summary="Ethereum core infrastructure at Nethermind, a DEX for a client in Japan, and the early roles that came first. Current work lives under Work."
            items={pastCompanies}
            action="See the experience"
          />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h3">Stack</h2>

          <div className="stack-grid" style={{ marginTop: 24 }}>
            {stack.map((group) => (
              <div key={group.label}>
                <h3 className="mono" style={{ fontSize: 14 }}>
                  {group.label}
                </h3>
                <TagRow items={group.items} className="mt-4" />
                {group.evidence ? (
                  <p style={{ marginTop: 8 }}>
                    <Link href={group.evidence.href} className="mono rowlink dimmer">
                      {group.evidence.label}
                    </Link>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="contact" style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <h2 className="h3">Contact</h2>
          <p className="body dim" style={{ marginTop: 8 }}>
            Open to forward deployed and founding roles in the US, UK and
            UAE, or remote, and to hard problems where the first job is
            figuring out what is actually broken.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            {contactEmail ? (
              <a className="btn btn-primary" href={`mailto:${contactEmail}`}>
                Email
              </a>
            ) : null}
            {socials.map((s) => (
              <a
                key={s.label}
                className="btn btn-secondary mono"
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
