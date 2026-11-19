# Base images pinned by digest (resolved 2026-11-19). Bump deliberately.
# node:24-alpine (Node 24.22.3)
FROM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS build
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
# Nonces are impossible on a static host, so allow inline scripts by hash.
RUN node scripts/csp-hashes.mjs out /tmp/csp.conf

# nginx-unprivileged 1.30.6 (stable), runs as uid 101 on 8080
FROM nginxinc/nginx-unprivileged:1.30.6-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03
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
