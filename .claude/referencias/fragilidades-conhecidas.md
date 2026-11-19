# Known weaknesses

Confirmed security weaknesses of this project, numbered. Agents read this before auditing and
cite the number instead of reporting a known item as new. Concrete details stay here, never in
the vault or code comments.

## 1. Easypanel panel reachable without Cloudflare Access (open)

- Found: 2026-11-19, Codex review and security audit. Severity: medium.
- Where: production VPS. The panel is served on the root of the tools domain today, and the
  origin accepts 80/443 from anywhere.
- Risk: the login page is exposed to brute force or a future Easypanel CVE. Cloudflare Access
  does not help while the origin is reachable directly.
- Fix: the owner runs the runbook in `README.md` § "Move the Easypanel panel". It moves the panel
  to a subdomain, adds 2FA, and limits 80/443 to Cloudflare ranges in the provider firewall or
  `DOCKER-USER`. Close after the direct-IP checks in step 8 fail as expected.

## 2. nginx 1.30.6 behind upstream security release (open, low)

- Found: 2026-11-19, security audit. nginx 1.30.7 (2026-11-18) fixes 9 CVEs.
- Reachability: none in this configuration (no TLS, HTTP/2/3, resolver, alias, mail or stream).
- Fix: bump `nginxinc/nginx-unprivileged` to `1.30.7-alpine` by digest when the image ships;
  Dependabot (docker) should propose it.

## 3. Absolute redirects leaked the container port (fixed)

- Found and fixed: 2026-11-19 (`absolute_redirect off`, commit `50f649f`).
