# Design

## Direction

A two-column portfolio for recruiters who decide in about 60 seconds. On desktop, a sticky left
column holds the identity (name, title, one-line pitch, actions, section navigation); the right
column scrolls through the evidence. On mobile, both collapse into one column.

The personality comes from proof, not decoration: the site reads its own HTTP security headers live
and shows them in a panel, backing the pitch "levo segurança para o dia a dia". The accent color
means "verified": it marks what passed a check (active header, `ok` verdict, active nav item) and
the primary action.

Reading order: name and title, actions (résumé or e-mail, GitHub, LinkedIn), About with Stack,
Experience, Projects, Security, Contact.

House rules: no eyebrow labels, no tiny uppercase tracked labels, no 1px decorative borders, no
gradients, no shadows on resting elements, no blur. Surfaces are separated by tone steps. Monospace
appears only inside technical fragments marked `data-ui` (headers panel, token chips).

## Tokens (`src/app/globals.css`)

Dark is the default: dark values live on `:root`, light values on `:root[data-theme="light"]`.

| Token         | Dark      | Light     | Use                                          |
| ------------- | --------- | --------- | -------------------------------------------- |
| `--bg`        | `#0c0a09` | `#fafaf9` | Page background                              |
| `--surface`   | `#1c1917` | `#eeece9` | Panels, fragments, tags                      |
| `--surface-2` | `#292524` | `#e2dfdb` | Elements inside panels (bot bubble, chips)   |
| `--fg`        | `#fafaf9` | `#1c1917` | Main text                                    |
| `--muted`     | `#a8a29e` | `#57534e` | Secondary text, inactive nav                 |
| `--accent`    | `#bef264` | `#3f6212` | Verified: primary action, active nav, checks |
| `--on-accent` | `#0c0a09` | `#ffffff` | Text on accent                               |
| `--danger`    | `#f87171` | `#b91c1c` | `refazer` verdict, missing header            |
| `--warn`      | `#fbbf24` | `#92400e` | `revisão` verdict                            |
| `--chat-out`  | `#1f3a2a` | `#e3eed3` | Outgoing bubble in the chat fragment         |

Motion tokens: `--ease-out: cubic-bezier(0, 0, 0, 1)`, `--ease-in: cubic-bezier(0.3, 0, 1, 1)`,
`--dur-press: 100ms`, `--dur-fast: 150ms`, `--dur-base: 200ms`.

Fonts: Geist (sans) for everything; Geist Mono only in `data-ui` fragments, loaded without preload.
Both self-hosted at build time through `next/font`.

### Type scale

| Role                                | Size                           | Weight  | Line height |
| ----------------------------------- | ------------------------------ | ------- | ----------- |
| Name (`h1`), two fixed lines        | `clamp(2rem, 10.5cqi, 3.5rem)` | 600     | 1.0         |
| Section `h2`                        | 1.5rem                         | 600     | 1.25        |
| Profile title, project name (`h3`)  | 1.25rem                        | 500/600 | 1.3         |
| Lead (pitch, About, contact e-mail) | 1.125rem                       | 400     | 1.6         |
| Body                                | 1rem                           | 400     | 1.65        |
| Small (tags, periods, captions)     | 0.875rem                       | 400/500 | 1.5         |

Nothing below 14 px. Comparable numbers use `tabular-nums`. The name sizes against its column
(`@container`), so "Augusto Bernardo" always fits one line.

### Spacing and shape

Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Sections are 64 px apart on mobile and 96 px on
desktop; heading to content 32 px; projects 64 px apart. One radius, 4 px, for buttons, tags and
panels; chat bubbles (12 px) and status dots (round) follow the interface they depict.

## Contrast (WCAG 2.x)

| Pair                              | Dark                  | Light                 |
| --------------------------------- | --------------------- | --------------------- |
| fg / bg · surface · surface-2     | 18.92 · 16.74 · 14.52 | 16.74 · 14.83 · 13.17 |
| muted / bg · surface · surface-2  | 7.83 · 6.93 · 6.01    | 7.30 · 6.47 · 5.74    |
| accent / bg · surface · surface-2 | 15.12 · 13.39 · 11.61 | 6.78 · 6.00 · 5.33    |
| danger / bg · surface · surface-2 | 7.14 · 6.32 · 5.48    | 6.19 · 5.49 · 4.87    |
| warn / bg · surface · surface-2   | 11.83 · 10.48 · 9.09  | 6.79 · 6.01 · 5.34    |
| on-accent / accent                | 15.12                 | 7.08                  |
| fg / chat-out · muted / chat-out  | 11.85 · 4.91          | 14.52 · 6.33          |

Surface steps are decorative (1.13 to 1.30). The focus outline uses `--accent` (≥ 6.78:1 on `--bg`).
Color never carries meaning alone: verdicts and header states pair an icon with a word.

## Layout

| Width  | Layout                                                                                                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| < 640  | One column, 16 px gutters. Intro block (name, title, pitch, actions, seal and theme toggle). No section nav; section `h2` sticks to the top while its section scrolls.     |
| ≥ 640  | 24 px gutters; classifier stats in three columns.                                                                                                                          |
| ≥ 768  | One column, max 44rem, centered, 32 px gutters. Experience shows the period in a 9rem left column.                                                                         |
| ≥ 1024 | Two columns, max 80rem, `4fr / 5fr`, 64 px gap, 48 px gutters. Left column sticky at full viewport height when the viewport is at least 720 px tall; otherwise it scrolls. |
| ≥ 1280 | 96 px gap, 64 px gutters.                                                                                                                                                  |

## Components

- **Left column (`Hero`)**: `h1` name, title, pitch, one primary action (résumé when the PDF exists,
  otherwise e-mail) plus secondary GitHub, LinkedIn and e-mail, section nav (desktop), security seal
  and theme toggle.
- **Section nav (`SectionNav`)**: five in-page links (Sobre, Experiência, Projetos, Segurança,
  Contato). An `IntersectionObserver` band marks the active section with `aria-current="location"`
  and an accent bar; the footer marks Contato at the end of the page. Without JavaScript the links
  work and nothing is marked.
- **Experience**: a career arc line (Estágio SAP, ABAP e Fiori, Full Stack), then a timeline, newest
  first, with period, role, company, highlights and technology tags.
- **Projects**: one column. Each project shows its screenshot when `image` exists, otherwise a drawn
  fragment of the product (`visual`): an illustrative Telegram conversation for EconomizaAI, the
  three verdicts and real figures for the photo classifier, and the authentication flow for
  Superheros API. Fragments are labelled as illustrations where the content is sample data.
- **Security panel**: a same-origin `HEAD /` request reads the response headers and shows each one
  with its state, a short value summary (CSP script hashes and `'unsafe-inline'`, number of disabled
  permissions) and a plain-language explanation. The count covers the six headers set by nginx;
  HSTS comes from Cloudflare and is shown separately. The seal in the left column summarizes the
  same result and links to the panel.
- **Contact**: the e-mail address as the main contact link, then LinkedIn and GitHub.

## Theme

- `data-theme` on `<html>`, set before paint by `THEME_SCRIPT`: `light` only when
  `localStorage.theme` is `light`, otherwise `dark`.
- Without JavaScript the page renders with the dark tokens on `:root`.
- Tailwind dark variant: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.

## Motion

Only `transform`, `opacity` and colors animate. Everything has a `prefers-reduced-motion: reduce`
fallback.

| Element                          | Motion                                         | Timing                                         | Reduced motion       |
| -------------------------------- | ---------------------------------------------- | ---------------------------------------------- | -------------------- |
| Project, experience item, panel  | Fade and rise 1.5rem, scroll-driven (`view()`) | `entry 0%` to `entry 60%`, linear              | None, content static |
| Active nav bar                   | `scaleY` 0 to 1                                | 200 ms `--ease-out` in, 150 ms `--ease-in` out | Color only           |
| Nav hover                        | Bar `scaleY` 0 to 0.5                          | 200 ms `--ease-out`                            | None                 |
| Links and buttons                | Color, background, opacity                     | 150 ms `--ease-out`                            | Kept (color only)    |
| Button press                     | `scale(0.98)`                                  | 100 ms `--ease-out`                            | None                 |
| Panel rows when a result arrives | Fade, 0.25rem slide, mark scales from 0.6      | 200 ms `--ease-out`, 30 ms stagger, ≤ 380 ms   | None                 |
| Anchor scrolling                 | `scroll-behavior: smooth`                      | Browser                                        | `auto`               |

The name and pitch never animate, so the LCP is not delayed. Browsers without scroll-driven
animations show content without the entrance. No loops, no autoplay.

## Accessibility

- Skip link "Pular para o conteúdo" is the first focusable element and targets `#conteudo`.
- One `h1`; each section is a labelled region with an `h2`; items use `h3`; Stack groups use `h4`.
- Visible `:focus-visible` outline in `--accent`; interactive targets at least 44 × 44 px, except
  links inside sentences.
- External links say "(abre em nova aba)" and use `rel="noopener noreferrer"`.
- Technical decisions and the full CSP use native `<details>`/`<summary>`.
- The security panel announces its result through one `role="status"` line; the list is
  `aria-busy` while loading. The seal is not a live region, to avoid double announcements.
- The chat fragment prefixes each message with "Você:" or "Bot:" for screen readers.

## Empty and edge states

- A project without `image` shows its drawn `visual`; without either, it shows text only. There is
  no placeholder image.
- A project without technical decisions hides the `<details>` block.
- An experience item without highlights or tags hides those lists.
- The résumé button renders only when `public/curriculo-augusto-bernardo.pdf` exists at build
  time; without it, e-mail becomes the primary action.
- Security panel states: without JavaScript it lists the headers and the `curl -sI` command to check
  them; while loading it says so; on a local build without nginx it explains that no headers are
  expected; on a network error it offers "Conferir de novo".

## Breakpoints

Tailwind defaults plus a `tall` variant (`min-height: 45rem`) for the sticky column. Check for
horizontal overflow at 320, 375, 768, 1024 and 1440 px (see `docs/quality.md`).
