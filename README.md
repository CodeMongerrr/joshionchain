# joshionchain.com

Personal site for Aditya Joshi — [joshionchain.com](https://www.joshionchain.com)

A static-first Next.js site with one dynamic seam: the open-source page keeps
itself current against the GitHub API so merged pull requests appear without a
deploy.

```
Next.js 16 (App Router)  ·  React 19  ·  TypeScript  ·  Tailwind CSS 4
```

## Why it's built this way

**Content is data, not markup.** Every string on the site lives in `src/data/`.
Components read from there and render; none of them contain copy. Editing the
site is editing a typed object, and a typo in a slug is a build error rather
than a broken page.

**Static by default, dynamic only where it earns it.** All 15 routes prerender.
The single exception is the contributions data, revalidated hourly via ISR — and
even that degrades to a hand-curated list if GitHub is unreachable, so a rate
limit can never blank the page or fail a build.

**Overview and depth are separate pages.** The home page carries `summary`
fields and links onward; the long-form `body` prose lives on detail routes. That
split is what keeps the front page scannable while still giving search engines
substantial, uniquely-titled pages to index.

## Structure

```
src/
├── app/
│   ├── page.tsx                 Overview — summaries, links onward
│   ├── work/                    Index + a detail page per system
│   ├── projects/[slug]/         Open-source project detail
│   ├── open-source/             Contributions, refreshed from GitHub
│   ├── about/                   Bio, past roles, stack, contact
│   ├── opengraph-image.tsx      Social card, generated from site.ts
│   ├── icon.tsx                 Favicon, generated
│   ├── sitemap.ts               Derived from the same data the pages render
│   └── robots.ts
├── components/                  Presentational; no copy lives here
├── data/                        Every string on the site
└── lib/
    ├── github.ts                Live contribution sync, soft-failing
    └── seo.ts                   Metadata builders and JSON-LD schemas
```

## Running locally

```bash
npm install
npm run dev
```

Environment variables are all optional — the site builds and runs with none of
them set. Copy `.env.example` to `.env.local` to enable the extras:

| Variable | Effect when unset |
| --- | --- |
| `GITHUB_TOKEN` | Contributions fall back to the curated list |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics never loads; no request is made |
| `NEXT_PUBLIC_POSTHOG_HOST` | Defaults to `https://us.i.posthog.com` |

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

CI runs all three on every push and pull request. It deliberately does not
deploy — hosting builds from its own Git integration, which keeps the pipeline
portable between platforms.

## SEO

Handled as a property of the routing rather than a plugin:

- One canonical URL per route, no trailing-slash duplicates
- Unique `title` and `description` per page, driven by `seoTitle` / `seoDescription` in the data files
- JSON-LD `Person`, `WebSite`, `CreativeWork`, `SoftwareSourceCode`, and `BreadcrumbList` graphs
- `sitemap.xml` generated from the same arrays the pages map over, so a new entry cannot be omitted
- Social cards generated at build time from the live copy

## License

All rights reserved. The code is public to read; the writing, design, and
personal content are not licensed for reuse.
