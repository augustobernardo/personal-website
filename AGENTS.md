# personal-website (portfolio)

Single-page portfolio for augustooliveira.dev.br. Scope: `PRODUCT.md`.

## Product and stack

- Stack: Next.js 16.4.6 (App Router, `output: "export"`), React 19.3, TypeScript 5.9 strict,
  Tailwind CSS 4.3, lucide-react, Vitest 5. Node 24 (`.nvmrc`), pnpm 12.18 (`packageManager`).
- Production: Cloudflare Workers Static Assets (`wrangler.jsonc`) serves the Next.js export. The Docker/nginx setup remains for local validation only. No database, server runtime, or app secrets.
- Setup evidence and decisions: `docs/setup.md`.

## Canonical commands

Run `nvm use` first (Node 24).

- Install: `pnpm install --frozen-lockfile`
- Develop: `pnpm dev`
- Lint: `pnpm lint`; type-aware lint: `pnpm lint:typed` (about 2 min on /mnt/c)
- Types: `pnpm typecheck`
- Local lint rules: `pnpm lint:rules`
- Tests: `pnpm test`
- Build: `pnpm build` (static export to `out/`)
- Verify foundation: `pnpm check && pnpm build && node scripts/csp-hashes.mjs --self-test`
- Container: `docker build -t personal-website . && docker run --rm -p 8080:8080 personal-website`

## Working agreements

- Read relevant code and instructions before editing. State assumptions that affect behavior or scope.
- Complete the request with the smallest sufficient change. Reuse existing patterns, components, and dependencies.
- Preserve local changes, validation, error handling, security, accessibility, and explicit requirements.
- Do not create abstractions, architecture, options, dependencies, or features for unrequested needs.
- Run appropriate checks. Test relevant logic and regressions; trivial changes do not need tests that merely mirror the implementation.
- Do not turn assumptions into facts or pending integrations into simulated results.
- Continue authorized work. Ask only for essential information or actions outside the authorization.
- Publishing, messaging third parties, costs, and destructive actions require relevant authorization. Installing tools does not grant it.

## Project rules

- Content comes only from the owner. Never invent metrics, employers, roles, testimonials or
  technologies. Missing facts become `TODO(augusto)` comments in `src/content/*.ts`, never visible
  text on the page.
- Keep the site static: no API that needs a server (see
  `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`). Metadata route handlers use
  `export const dynamic = "force-static"`.
- The only inline script we author is `THEME_SCRIPT` in `src/app/layout.tsx`, and it must stay
  constant. The CSP allows inline scripts by hashes computed at image build
  (`scripts/csp-hashes.mjs`). Never add `'unsafe-inline'` to `script-src`.
- Every nginx `location` with its own `add_header` must `include /etc/nginx/security-headers.conf`.
- No analytics, cookies or runtime third-party requests. Add a dependency only with a stated reason.
- UI text in Brazilian Portuguese; code, comments, commits and repository docs in English.
- WCAG AA: one `h1`, ordered headings, visible focus, text contrast ≥ 4.5:1, `alt` text,
  `prefers-reduced-motion`.

## Execution continuity

- During authorized work, answer status questions and resume the remaining actions. Stop if the user asks to pause, cancels, or changes the objective.
- A blocker stops only dependent tasks. Complete independent tasks that remain safe and authorized.
- If an agent fails or its state becomes uncertain, confirm it has stopped before taking over its files.
- Do not repeat an identical attempt without new evidence.
- For unfinished multi-session work, keep a short handoff in the existing plan/task record. Do not turn temporary progress into permanent memory.

## Standards and documentation

- No persistence: the toolkit default (Drizzle + PostgreSQL, Zod, Pino, server-only) is omitted
  because the product has no server and no stored data. Revisit only if a feature needs one, and
  record it in `PRODUCT.md` and `docs/architecture.md`.
- Consult `node_modules/next/dist/docs/` and current official sources before changing stack or
  APIs. Record source, reason and outcome in `docs/setup.md`.
- `PRODUCT.md` owns scope; `docs/architecture.md`, structure and decisions; `docs/design.md`,
  interface; `docs/onboarding.md`, preparation; `docs/quality.md`, checks. Update the responsible
  document with each change without duplicating rules.
- Memory: canonical project knowledge lives in these versioned docs; see `docs/setup.md` § Memory.

## Tools and style

- **Ponytail:** full intensity for coding. `stop ponytail` disables it.
- **Caveman:** concise conversation in the user's language. Code, docs and commits use normal wording.
- **Superpowers:** use relevant skills and scale the workflow to scope.
- **Context7:** disabled by the owner on this machine; use `node_modules/next/dist/docs/` and
  official sources instead.
- **RTK:** active through the global hook; use `rtk proxy <command>` for raw output.
- **Graphify:** code graph in `graphify-out/` (git-ignored). Refresh with `graphify update .`.
  Exclusions in `.graphifyignore`.
- **agent-browser:** browser validation (responsive, axe, keyboard, theme, vitals). Run
  `agent-browser skills get core` first and use a named session.

## Skills for Next.js

Project-local copies in `.agents/skills/` and `.claude/skills/` (lock: `skills-lock.json`):

- `vercel-react-best-practices`: when writing or reviewing React/Next.js and performance.
- `vercel-composition-patterns`: for concrete component API decisions.
- `writing-guidelines`: documentation and prose review.
- `next-dev-loop`: runtime and browser feedback after Next.js changes.
- `next-bundle-optimizer`: evidence-based bundle audit.

Global, not duplicated locally: `web-design-guidelines`, `find-skills`, `tailwind-design-system`.
Installing skills does not execute their actions.

## Project capabilities

- Security review: project agent `portfolio-security` (read-only), plus the toolkit prompt recorded
  in `docs/quality.md`. Reports stay private.
- Not adopted: PostgreSQL skills (no database), shadcn (no UI kit), Sentry MCP (no service),
  Vercel deploy skills (hosting is Cloudflare Workers), `gh-fix-ci` (Codex workflow, not configured here).

## Delegation and review

- Specialist subagents live in `.claude/agents/`: `portfolio-frontend`, `portfolio-ux-ui-designer`,
  `portfolio-qa-unit`, `portfolio-qa-e2e`, `portfolio-code-reviewer`, `portfolio-security`,
  `portfolio-devops`. Use them instead of generic agents.
- One writer per file. The coordinator owns `package.json`, the lockfile and integration.
  `next build` writes `.next/` and `out/`, so never run two builds at once in this checkout; build
  Docker images from a clean clone while another worker edits `src/`.
- Code review: Codex plugin when available, otherwise `portfolio-code-reviewer`.

## Git and collaboration

- Conventional Commits in English; one logical change per commit.
- No push blockers, branch requirements or Git hooks are configured. Lint, types, tests and builds
  are explicit checks.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
