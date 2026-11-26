# augustooliveira.dev.br

Personal portfolio of Augusto Bernardo de Oliveira, Full Stack Developer (TypeScript · Angular ·
NestJS). It is a single page in Brazilian Portuguese, built so that a recruiter can learn in about
60 seconds who he is, what he builds, which projects back that up and how to reach him.

## Stack

| Layer     | Choice                                                                                    |
| --------- | ----------------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript strict                                      |
| Output    | `output: 'export'`: plain HTML, CSS and JS in `out/`, no Node server in production        |
| Styling   | Tailwind CSS 4, design tokens in `src/app/globals.css`, Geist via `next/font`             |
| Icons     | `lucide-react`                                                                            |
| Tests     | Vitest for content and helpers, axe and keyboard checks with agent-browser, Lighthouse CI |
| Runtime   | Cloudflare Workers Static Assets, deployed with Wrangler                                  |
| Tooling   | pnpm, Node 24 (`.nvmrc`), ESLint (toolkit quality rules), Prettier                        |

## Technical decisions

- **Static export.** The site has no data to store and no requests to handle, so it ships as files.
  This removes the server attack surface and lets Cloudflare serve the exported files directly. The usual
  toolkit core (Drizzle, PostgreSQL, Zod, Pino) is intentionally not installed.
- **Content as typed data.** All copy lives in `src/content/*.ts`. Components only render it, so
  text changes never touch layout. A project card stays hidden until `published: true`.
- **CSP without `unsafe-inline` for scripts.** Next.js inlines bootstrap scripts, and nonces need
  a server. After export, `scripts/csp-hashes.mjs` hashes executable inline scripts and writes
  Cloudflare's `out/_headers` file. `style-src` keeps `'unsafe-inline'` because React emits style
  attributes. CSS cannot execute scripts.
- **Theme without a flash.** A constant inline script sets `data-theme` before paint, using the
  saved choice or `prefers-color-scheme`. It is constant on purpose so that its hash stays stable.
  Without JavaScript the CSS media query still applies.
- **No tracking.** There are no analytics, cookies or third-party requests at runtime. Fonts are
  self-hosted at build time.
- **Headers at Cloudflare.** The generated `_headers` file sets CSP, MIME sniffing protection,
  referrer policy, permissions policy, frame protection and opener isolation. Cloudflare handles
  HSTS at the edge.
- **Caching.** `/_next/static/` is immutable for a year. HTML uses `no-cache`, so deployments
  become visible immediately.

More detail: [`docs/architecture.md`](docs/architecture.md).

## Run locally

Requirements: Node 24 and pnpm 12 (`corepack enable` picks the version from `package.json`).

```bash
nvm use                       # Node 24 from .nvmrc
pnpm install --frozen-lockfile
pnpm dev                      # http://localhost:3000
pnpm check                    # lint, typecheck, tests, lint-rule self-check
pnpm lint:typed               # type-aware lint (slower)
pnpm build                    # static export to out/
```

Cloudflare deployment build:

```bash
pnpm build:cloudflare
```

For an optional local nginx preview, build and run the Docker image:

```bash
docker build -t personal-website .
docker run --rm -p 8080:8080 personal-website
```

## Editing content

| What                                          | File                                                           |
| --------------------------------------------- | -------------------------------------------------------------- |
| Name, title, tagline, links, about            | `src/content/profile.ts`                                       |
| Experience timeline                           | `src/content/experience.ts`                                    |
| Projects (`published` flag, decisions, links) | `src/content/projects.ts`                                      |
| Stack groups                                  | `src/content/stack.ts`                                         |
| Résumé                                        | `public/curriculo-augusto-bernardo.pdf`                        |
| Project images (16:9)                         | `public/projects/<slug>.webp`, then set `image` on the project |

## Quality gates (CI)

`.github/workflows/ci.yml` runs on every pull request and every push to `main`. All actions are
pinned by commit SHA and scanner tool images (`tools/ci/*/Dockerfile`) by digest, with
`permissions: contents: read`.

1. `pnpm install --frozen-lockfile`
2. Lint, type-aware lint, typecheck, tests, lint-rule self-check, the Cloudflare build
   (`pnpm build:cloudflare`) and `wrangler deploy --dry-run`
3. Lighthouse CI on the static build; any category below 90 fails
4. `pnpm audit --prod --audit-level high`
5. gitleaks over the full history (pinned image)
6. actionlint and zizmor over `.github/workflows`
7. Docker build, a Trivy scan that fails on fixable CRITICAL findings, and a Trivy secret scan

Cloudflare Workers Builds deploys commits pushed to its configured production branch. GitHub Actions
runs quality and security checks independently; protect `main` and require these checks before
merging so only reviewed commits reach production.

CodeQL (`codeql.yml`) and Dependabot (npm, GitHub Actions, Docker; weekly) are also configured.

## Lighthouse results

Lighthouse 13.6.0 on Windows (Edge, headless) against `wrangler dev` serving `out/` with the
generated `_headers`, 2026-11-25:

| Profile | Performance | Accessibility | Best Practices | SEO | LCP   | CLS | TBT   |
| ------- | ----------- | ------------- | -------------- | --- | ----- | --- | ----- |
| Mobile  | 90          | 100           | 100            | 100 | 2.9 s | 0   | 30 ms |
| Desktop | 100         | 100           | 100            | 100 | 0.7 s | 0   | 0 ms  |

The local antivirus (Kaspersky) injects a script into every page it sees, so local mobile
performance runs low; CI runs Lighthouse CI on a clean runner and fails any category below 90.

## Deploy

Cloudflare Workers Builds connects the existing Worker to this GitHub repository and deploys the
static export. Configure the Worker once in **Workers & Pages → your Worker → Settings → Builds**:

1. Select the repository `augustobernardo/personal-website` and production branch `main`.
2. Set the root directory to the repository root.
3. Set the build command to `pnpm build:cloudflare`.
4. Set the deploy command to `pnpm exec wrangler deploy`.
5. Confirm the Worker name matches `personal-website` in `wrangler.jsonc`.
6. Add `augustooliveira.dev.br` as a custom domain and enable the `www` redirect in Cloudflare.
7. Under **SSL/TLS → Edge Certificates**, turn on HSTS. `_headers` does not send it, so Cloudflare
   stays the single source (see `docs/architecture.md`).

The build exports Next.js files to `out/`, generates `out/_headers` with CSP hashes and security
headers, then Wrangler deploys the directory as static assets. Wrangler returns the exported
`404.html` with a 404 status for missing paths. No runtime, environment variable or API token is
needed in application code. `wrangler.jsonc` turns observability off (no request logs, so no
visitor IPs are stored) and disables the `*.workers.dev` and per-version preview URLs, so the
custom domain is the only public origin. In the dashboard, keep **Web Analytics** (automatic
setup) off: the CSP blocks its beacon and the site promises no analytics.

The existing Docker and nginx files remain for local preview and validation. They are not used in
production after this migration.

## Security

See [`SECURITY.md`](SECURITY.md). Report vulnerabilities through GitHub private vulnerability
reporting.

## Project docs

[`PRODUCT.md`](PRODUCT.md) (scope) · [`AGENTS.md`](AGENTS.md) (agent instructions) ·
[`docs/architecture.md`](docs/architecture.md) · [`docs/design.md`](docs/design.md) ·
[`docs/onboarding.md`](docs/onboarding.md) · [`docs/quality.md`](docs/quality.md) ·
[`docs/setup.md`](docs/setup.md)
