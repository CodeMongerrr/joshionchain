import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { site, socials } from "@/data/site";
import { jsonLd, personSchema, websiteSchema } from "@/lib/seo";

import "./globals.css";

/* Self-hosted through next/font: no render-blocking request to Google, and
   `display: swap` plus a matching fallback keeps the font swap from shifting
   layout. */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    // Every sub-page reads "<page>, Aditya Joshi" without repeating itself.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Aditya Joshi",
    "JoshiOnChain",
    "Forward Deployed Engineer",
    "Founding Engineer",
    "Distributed systems",
    "AI agents",
    "Crypto infrastructure",
    "Zcash",
    "Nethermind",
  ],
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    firstName: "Aditya",
    lastName: "Joshi",
    username: site.handle,
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@JoshiOnChain",
    creator: "@JoshiOnChain",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f3" },
    { media: "(prefers-color-scheme: dark)", color: "#17181a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <ThemeScript />
        {socials.map((s) => (
          <link key={s.href} rel="me" href={s.href} />
        ))}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Reveal />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <JsonLd data={jsonLd(personSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
