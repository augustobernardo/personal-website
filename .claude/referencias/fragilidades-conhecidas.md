# Known weaknesses

Confirmed security weaknesses of this project, numbered. Agents read this before auditing and
cite the number instead of reporting a known item as new. Concrete details stay here, never in
the vault or code comments.

## 1. Admin panel reachable without Cloudflare Access (out of scope since 2026-11-25)

- Found: 2026-11-19, Codex review and security audit. Severity: medium.
- Closed for this project: the site moved to Cloudflare Workers Static Assets and no longer runs
  on that server. The panel still serves other projects, so it is tracked in the owner's private
  notes, not in this public repository.

## 2. nginx 1.30.6 behind upstream security release (fixed 2026-11-19)

- Found: 2026-11-19, security audit. nginx 1.30.7 (2026-11-18) fixes 9 CVEs.
- Reachability: none in this configuration (no TLS, HTTP/2/3, resolver, alias, mail or stream).
- Fixed: runtime moved to the official `nginx:1.30.7-alpine` (by digest), made non-root in the
  Dockerfile, before the unprivileged variant shipped. Trivy 0.76.2 reports no fixable CRITICAL.
  Previously planned:
  Dependabot (docker) should propose it.

## 3. Absolute redirects leaked the container port (fixed)

- Found and fixed: 2026-11-19 (`absolute_redirect off`, commit `50f649f`).
