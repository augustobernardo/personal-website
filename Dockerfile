# Base images pinned by digest (resolved 2026-11-19). Bump deliberately.
# node:24-alpine (Node 24.22.3)
FROM node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS build
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
# Nonces are impossible on a static host, so allow inline scripts by hash.
RUN node scripts/csp-hashes.mjs out /tmp/csp.conf

# Official nginx 1.30.7 (resolved 2026-11-19): fixes CRITICAL CVEs in 1.30.6 before the
# unprivileged variant shipped. Made non-root here; config stays root-owned and read-only.
FROM nginx:1.30.7-alpine@sha256:bef154735288bc38d99fac41ae63730684bcc661503673a04a0f9bc526ba8598
RUN sed -i '/^user /d; s,^pid .*,pid /tmp/nginx.pid;,' /etc/nginx/nginx.conf \
 && sed -i '/^http {/a\    client_body_temp_path /tmp/client_temp;\n    proxy_temp_path /tmp/proxy_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;' /etc/nginx/nginx.conf \
 && chown -R 101:101 /var/cache/nginx
COPY --from=build /app/out /usr/share/nginx/html
COPY --from=build /tmp/csp.conf /etc/nginx/csp.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY <<'EOT' /etc/nginx/security-headers.conf
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), interest-cohort=()" always;
add_header X-Frame-Options "DENY" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
include /etc/nginx/csp.conf;
EOT
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO /dev/null http://127.0.0.1:8080/ || exit 1
