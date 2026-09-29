import { contactEmail, home, site, socials } from "@/data/site";

/**
 * A contact card. Tapping it on a phone opens "Add to contacts" with my
 * name, title, email, site and profiles filled in, which beats copying
 * them one at a time out of a browser.
 *
 * vCard 3.0, the version every phone and mail app reads. Built from the same
 * data as the site, so it can't go stale on its own.
 */
export const dynamic = "force-static";

// vCard text values escape backslashes, commas and semicolons.
const esc = (v: string) => v.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Joshi;Aditya;;;",
    `FN:${esc(site.name)}`,
    `TITLE:${esc(site.role)}`,
    contactEmail ? `EMAIL;TYPE=INTERNET,PREF:${contactEmail}` : null,
    `URL:${site.url}`,
    ...socials.map((s) => `X-SOCIALPROFILE;TYPE=${s.label.toLowerCase()}:${s.href}`),
    `ADR;TYPE=WORK:;;;${esc(home.city)};;;India`,
    `NOTE:${esc(site.tagline)}`,
    "END:VCARD",
  ].filter(Boolean);

  return new Response(`${lines.join("\r\n")}\r\n`, {
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": 'attachment; filename="aditya-joshi.vcf"',
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
