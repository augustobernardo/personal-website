# Portfolio — augustooliveira.dev.br

## Problem and objective

Recruiters and tech managers in Brazil need to understand, in about 60 seconds, who
Augusto Bernardo de Oliveira is, what he builds, which projects back that up, and how
to reach him. The site replaces scattered profiles (GitHub, LinkedIn, PDF résumé) with
one fast, trustworthy page.

## Audience and roles

- Primary: recruiters and engineering managers in Brazil, often on mobile.
- Secondary: other developers checking code and technical decisions.
- No accounts, roles or private areas.

## Initial release flows

1. Land on the page, read name, title and one-line pitch, and download the résumé PDF.
2. Scroll through About, Experience timeline, Projects (with expandable technical
   decisions), Stack and Contact.
3. Open GitHub, LinkedIn or e-mail from the hero or contact section.
4. Toggle light/dark theme; the choice persists in the browser only.

## MVP

Single-page site in Brazilian Portuguese with six sections: Hero, About, Experience,
Projects (3–4 cards), Stack and Contact. Typed content files in `src/content/`.

## Out of scope

Contact form, blog, analytics, cookies, CMS, i18n, any backend or database.

## Requirements

- Content uses only the facts provided by the owner; no invented metrics, employers,
  roles, testimonials or technologies. Missing items stay as `TODO` in code.
- WCAG AA: semantic HTML, visible focus, contrast, alt text, keyboard navigation,
  skip link.
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD `Person`, canonical
  URL `https://augustooliveira.dev.br`.
- No third-party analytics or cookies. Mobile first.
- Lighthouse ≥ 95 target in all four categories; CI fails below 90.

## Constraints and technical decisions

- Next.js 16 App Router, TypeScript strict, Tailwind CSS 4, pnpm, Node 24.
- `output: 'export'`: fully static, served by Cloudflare Workers Static Assets through Wrangler.
- No persistence: the toolkit default (Drizzle + PostgreSQL, Zod, Pino, server-only)
  is intentionally omitted because the site has no server and no data to store.
- Hosting: Cloudflare Workers with static assets and custom domain `augustooliveira.dev.br`.

## Assumptions and pending decisions

- Pending (owner): résumé PDF at `public/curriculo-augusto-bernardo.pdf`.
- Pending (owner): project images at `public/projects/<slug>.webp`.
- Pending (owner): technical decisions for Superheros API and Romanos Oito.
- Pending (client): authorization to publish the Romanos Oito card
  (`published: false` until then).

## Acceptance criteria

- `pnpm build:cloudflare` produces `out/index.html`, the generated `out/_headers`, all six sections, and no unpublished project.
- Lighthouse CI passes (≥ 90) on the static build; target ≥ 95.
- Wrangler deploys `out/` as Worker static assets, serves `404.html` with status 404, and applies
  the generated CSP and security headers from `out/_headers`.

## Next delivery

Add the résumé PDF and project images, fill the pending technical decisions, then deploy the
connected Worker from the `main` branch.

## Maintenance

Update this document when the objective, scope, constraints or acceptance criteria
change. Technical decisions and evidence belong in `docs/architecture.md` and
`docs/setup.md`.
