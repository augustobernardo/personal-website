# Quality

## Gates

| Check                                                                     | Command                                           | Where                   |
| ------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------- |
| Lint (toolkit rules, 350-line ceiling, no `console` in `src/`)            | `pnpm lint`                                       | local, CI               |
| Type-aware lint (`no-floating-promises`, `no-misused-promises` as errors) | `pnpm lint:typed`                                 | local, CI               |
| Types                                                                     | `pnpm typecheck` (`next typegen && tsc --noEmit`) | local, CI               |
| Unit tests (content invariants, date formatting)                          | `pnpm test`                                       | local, CI               |
| Lint rule self-check                                                      | `pnpm lint:rules`                                 | local, CI               |
| Build                                                                     | `pnpm build`                                      | local, CI               |
| CSP script self-test                                                      | `node scripts/csp-hashes.mjs --self-test`         | local                   |
| Lighthouse ≥ 0.9 per category on `index.html`                             | `pnpm exec lhci autorun`                          | local, CI               |
| Production dependency audit                                               | `pnpm audit --prod --audit-level high`            | local, CI               |
| Secrets over full history                                                 | gitleaks                                          | CI; locally before push |
| Image scan (fixable CRITICAL fails)                                       | Trivy                                             | CI                      |
| Static analysis                                                           | CodeQL `javascript-typescript`                    | CI, weekly              |

`pnpm check` runs lint, typecheck, test and lint:rules. Neither `check` nor `build` touches the
network or a database.

Lighthouse needs Chrome. Locally, point `CHROME_PATH` at a Chrome binary (for example the one
agent-browser installs under `~/.agent-browser/browsers/`).

## Browser checklist (agent-browser)

Run against `out/` served on a free port, or against the container.

- No horizontal overflow at 320, 375, 768, 1024 and 1440 px
  (`document.documentElement.scrollWidth === innerWidth`).
- `a11y --tags wcag2a,wcag2aa,wcag21aa,best-practice` reports 0 violations in light and dark.
- The first Tab focuses the skip link; Enter moves focus to `#conteudo`.
- The theme toggle switches `data-theme`, updates its `aria-label` and persists after reload.
- `<details>` opens with the keyboard.
- With `reduced-motion`, section animation is `none`.
- On the container: no CSP violations in the console, and the theme toggle still hydrates.

Specialist: `portfolio-qa-e2e`.

## Container checks

```bash
docker build -t personal-website:local .
docker run -d --rm -p 18080:8080 --name pw-local personal-website:local
curl -sI http://localhost:18080/                  # 200, no-cache, security headers, CSP hashes
curl -sI http://localhost:18080/opengraph-image   # Content-Type: image/png
curl -s -o /dev/null -w '%{http_code}' http://localhost:18080/missing   # 404
docker exec pw-local id                           # uid=101(nginx)
docker stop pw-local
```

## Security review

- Project agent: `portfolio-security` (read-only; skill `seguranca`). It runs at the end of every
  executed plan and on changes to `layout.tsx`, `nginx.conf`, `Dockerfile`,
  `scripts/csp-hashes.mjs`, `.github/**` or dependencies.
- Toolkit prompt: `docs/prompts/13-security-review.md` from
  `https://github.com/soumatheusgomes/vibe-coding-toolkit`, revision
  `7ef68dd7b00ddfc5cd464458855e4ab66dd2128f`. Invoke it by pasting its Prompt block with a
  repository or diff target. To update, fetch the same path at a newer revision and record the new
  revision here.
- Reports are private: keep them outside the repository or in an ignored path. Confirmed findings
  go to `.claude/referencias/fragilidades-conhecidas.md`.
- No findings is not a security guarantee.

## Code review

Codex plugin (`adversarial-review`) when available; otherwise `portfolio-code-reviewer`.

## Harness

Native method adaptation of the toolkit's Harness2 workflow: run the relevant cases from the
toolkit's `docs/07-harness-evaluation.md` on disposable copies when the agent setup (instructions,
agents, skills) changes materially, and compare against the same cases. Results: `docs/setup.md`.
