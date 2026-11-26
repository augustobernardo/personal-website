# Architecture

## Shape

A single static page. `next build` with `output: "export"` writes HTML, CSS, JS, RSC payloads and
metadata files to `out/`. `scripts/csp-hashes.mjs` adds Cloudflare's `_headers` file. Wrangler
serves the export as Worker static assets. There is no server code, database, API or application
secret.

```
src/content/*.ts -> src/components/*.tsx -> src/app/page.tsx -> next build -> out/
                                                                      |
scripts/csp-hashes.mjs -> out/_headers -> Wrangler -> Worker static assets
```

## Layout

| Path                                                                 | Role                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/content/`                                                       | Typed copy: `profile`, `experience`, `projects` (`published` flag), `stack`. Only place with text |
| `src/content/types.ts`                                               | Content types shared by data and components                                                       |
| `src/components/`                                                    | Server components per section; `ThemeToggle` is the only client component                         |
| `src/app/layout.tsx`                                                 | `<html lang="pt-BR">`, theme script, skip link, header/footer, JSON-LD                            |
| `src/app/page.tsx`                                                   | Section order                                                                                     |
| `src/app/not-found.tsx`                                              | 404 page (exported as `404.html`)                                                                 |
| `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg` | Metadata files, all `force-static`                                                                |
| `src/lib/seo.ts`                                                     | `siteMetadata` (metadataBase, Open Graph, Twitter) and `personJsonLd`                             |
| `src/lib/format.ts`                                                  | `formatMonth`, `formatPeriod` for pt-BR month labels without `Intl`                               |
| `scripts/csp-hashes.mjs`                                             | Generates nginx CSP and Cloudflare `_headers` from inline script hashes in `out/`                 |
| `nginx.conf`                                                         | Server block: headers, cache policy, 404, gzip                                                    |
| `eslint-rules/`                                                      | Toolkit quality rules (350-line ceiling, no `console` in `src/`)                                  |

## Decisions

| Decision                                                    | Reason                                                                                            | Revisit when                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Static export, no persistence                               | Nothing to store or compute per request; smallest attack surface; Cloudflare serves static assets | A feature needs server data (contact form, CMS)                 |
| Toolkit core (Drizzle, pg, Zod, Pino, server-only) omitted  | They serve server code that does not exist here                                                   | Same as above                                                   |
| Content in typed TS files                                   | Owner edits copy without touching layout; types catch missing fields                              | Content grows beyond one page                                   |
| CSP by hashes, computed after export                        | Static export inlines scripts; nonces need a server; Cloudflare reads `_headers`                  | Next.js offers a static-friendly alternative for inline scripts |
| `style-src 'unsafe-inline'`                                 | React emits `style` attributes; CSS cannot run script                                             | React/Next stop emitting inline styles                          |
| Constant `THEME_SCRIPT` before paint                        | No theme flash; constant keeps the hash stable                                                    | Theme logic changes (rebuild updates the hash anyway)           |
| `next/image` with `unoptimized: true`                       | Default loader needs a server                                                                     | An image CDN is adopted                                         |
| `location = /opengraph-image` with `default_type image/png` | The exported file has no extension                                                                | Next.js exports it with an extension                            |
| HSTS at Cloudflare only                                     | Avoid two sources of truth for HSTS                                                               | Cloudflare no longer terminates site traffic                    |
| Lighthouse CI only on `index.html`                          | 404 pages are `noindex`, so their SEO score is low by design                                      | More indexable pages are added                                  |
