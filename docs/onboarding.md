# Onboarding

## Prerequisites

- Node 24 (`nvm use` reads `.nvmrc`).
- pnpm 12.18 through Corepack (`corepack enable`); the version comes from `packageManager`.
- Docker, only to build or run the production image.
- Optional: agent-browser (global, pnpm) for browser checks; gitleaks before any push.

No `.env` file is needed. `.env.example` is empty on purpose.

## First run

```bash
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm dev            # http://localhost:3000
```

## Daily loop

1. Edit copy in `src/content/*.ts`, or components in `src/components/`.
2. Run `pnpm check` (lint, typecheck, tests, rule self-check).
3. Run `pnpm build` and open `out/index.html` through any static server, or run the container.
4. For UI changes, run the browser checklist in `docs/quality.md`.

## Notes for this machine

- The repository lives on `/mnt/c` under WSL. File I/O is slow: `pnpm install` takes about 2 min
  and `pnpm lint:typed` about 2 min.
- Lighthouse run from WSL can create `C:\Users\...\lighthouse.*` folders inside the repository,
  because of the Windows `LOCALAPPDATA` path. Delete them; they are not project files.
- Never run two `next build` processes in the same checkout at once.
