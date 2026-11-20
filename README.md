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
| Runtime   | official `nginx` 1.30.7 made non-root (uid 101, port 8080), images pinned by digest       |
| Tooling   | pnpm, Node 24 (`.nvmrc`), ESLint (toolkit quality rules), Prettier                        |

## Technical decisions

- **Static export.** The site has no data to store and no requests to handle, so it ships as files.
  This removes the server attack surface and makes hosting a plain nginx container. The usual
  toolkit core (Drizzle, PostgreSQL, Zod, Pino) is intentionally not installed.
- **Content as typed data.** All copy lives in `src/content/*.ts`. Components only render it, so
  text changes never touch layout. A project card stays hidden until `published: true`.
- **CSP without `unsafe-inline` for scripts.** Next.js inlines bootstrap scripts, and nonces need
  a server. At image build time, `scripts/csp-hashes.mjs` hashes every executable inline script in
  `out/**/*.html`. nginx then sends a `script-src` made of those hashes. `style-src` keeps
  `'unsafe-inline'` because React emits `style` attributes. CSS cannot execute script, so the
  remaining risk is low.
- **Theme without a flash.** A constant inline script sets `data-theme` before paint, using the
  saved choice or `prefers-color-scheme`. It is constant on purpose so that its hash stays stable.
  Without JavaScript the CSS media query still applies.
- **No tracking.** There are no analytics, cookies or third-party requests at runtime. Fonts are
  self-hosted at build time.
- **Headers at the edge of the container.** nginx sends `Content-Security-Policy`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` and
  `Cross-Origin-Opener-Policy` on every response, including 404 and static files. HSTS is set in
  Cloudflare, not duplicated here.
- **Caching.** `/_next/static/` is immutable for a year. HTML and RSC payloads are `no-cache`, so a
  deploy is visible immediately.

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

Container, same as production:

```bash
docker build -t personal-website .
docker run --rm -p 8080:8080 personal-website   # http://localhost:8080
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
pinned by commit SHA, with `permissions: contents: read`.

1. `pnpm install --frozen-lockfile`
2. Lint, type-aware lint, typecheck, tests, lint-rule self-check, build
3. Lighthouse CI on the static build; any category below 90 fails
4. `pnpm audit --prod --audit-level high`
5. gitleaks over the full history
6. Docker build and a Trivy scan that fails on fixable CRITICAL findings

CodeQL (`codeql.yml`) and Dependabot (npm, GitHub Actions, Docker; weekly) are also configured.

## Lighthouse results

Local run on 2026-11-19 with `@lhci/cli@0.16.1` (3 runs, desktop defaults, `index.html`):

| Performance | Accessibility | Best Practices | SEO |
| ----------- | ------------- | -------------- | --- |
| 97–99       | 100           | 100            | 100 |

## Deploy

The site runs on a Contabo VPS managed by Easypanel, behind Cloudflare. CI does not deploy
anything.

### 1. Easypanel app

1. Create a project, then an **App** service.
2. Set the source to GitHub repository `augustobernardo/personal-website`, branch `main`, built from
   the `Dockerfile` at the repository root.
3. Under **Domains**, add `augustooliveira.dev.br` with HTTPS on, pointing to container port
   **8080**.
4. Deploy. Turn on auto-deploy only if you accept that a push to `main` goes live before CI
   finishes. Otherwise deploy manually after CI is green.

### 2. Cloudflare (zone `augustooliveira.dev.br`)

1. Add DNS records with the proxy on (orange cloud):
   - `A @` to the VPS IP.
   - `CNAME www` to `augustooliveira.dev.br`.
2. Under **SSL/TLS**, set the mode to **Full (strict)**. The origin needs a valid certificate: the
   one Easypanel issues, or a Cloudflare Origin CA certificate installed in Easypanel if issuance
   fails behind the proxy.
3. Under **Edge Certificates**, turn on HSTS. The container does not send it.
4. Under **Rules**, add a redirect rule from `www.augustooliveira.dev.br/*` to
   `https://augustooliveira.dev.br/${1}` with a 301 that keeps the query string.

### 3. Move the Easypanel panel off `gutolabs.com.br`

Today the root of `gutolabs.com.br` serves the Easypanel admin panel to the internet. Move the
panel to a subdomain behind Cloudflare Access, so only you can reach the login page.

> **Warning:** follow these steps in order, and keep SSH access open the whole time. A mistake in
> the Access policy or the firewall can lock you out of the panel. Your fallback is an SSH tunnel:
> `ssh -L 3000:localhost:3000 <user>@<vps>`, then open `http://localhost:3000`.

1. In Cloudflare DNS (zone `gutolabs.com.br`), add `A painel` to the VPS IP with the proxy on.
2. In Cloudflare **Zero Trust > Access > Applications**, create a **Self-hosted** application for
   `painel.gutolabs.com.br`. Add an **Allow** policy that matches only your e-mail address, using
   one-time PIN or GitHub login. Keep the session short, for example 24 h.
3. Turn on two-factor authentication for the Easypanel account.
4. In Easypanel settings, change the panel domain to `painel.gutolabs.com.br` and wait for the
   certificate.
5. In a private browser window, open `https://painel.gutolabs.com.br`. Confirm that the Access
   login appears first, and that the panel loads after you log in.
6. Remove the panel from the root of `gutolabs.com.br`. Then point the root at your tools, or
   redirect it.
7. On the VPS firewall, close direct access to the panel port (3000 by default). Allow 80/443
   **only** from the [Cloudflare IP ranges](https://www.cloudflare.com/ips/), and SSH only from
   your IPs. This step is required. Access protects only traffic that passes through Cloudflare;
   if 80/443 stay open to the world, anyone can reach the panel hostname on the VPS IP directly.
   As an alternative, use a Cloudflare Tunnel and close 80/443 entirely.
   Docker-published ports bypass UFW and the iptables INPUT chain, so enforce the rule in the
   provider firewall (Contabo) or in the `DOCKER-USER` chain, not with UFW alone. Block port 3000
   in the same place.
8. From a machine outside Cloudflare, confirm that both direct paths fail (time out or are
   refused):
   - `curl -m 10 http://<vps-ip>:3000`
   - `curl -m 10 -k --resolve painel.gutolabs.com.br:443:<vps-ip> https://painel.gutolabs.com.br`
9. Keep the Cloudflare IP list current; Cloudflare publishes changes at the same URL.

## Security

See [`SECURITY.md`](SECURITY.md). Report vulnerabilities through GitHub private vulnerability
reporting.

## Project docs

[`PRODUCT.md`](PRODUCT.md) (scope) · [`AGENTS.md`](AGENTS.md) (agent instructions) ·
[`docs/architecture.md`](docs/architecture.md) · [`docs/design.md`](docs/design.md) ·
[`docs/onboarding.md`](docs/onboarding.md) · [`docs/quality.md`](docs/quality.md) ·
[`docs/setup.md`](docs/setup.md)
