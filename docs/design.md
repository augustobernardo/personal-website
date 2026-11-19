# Design

## Direction

The page is the object: an inspection report (_laudo de vistoria_), the document the owner's daily
work produces (a vehicle-inspection platform, a photo classifier that returns `ok`, `refazer` or
`revisão`, API security audits). Recruiters decide in about 60 seconds, so the report's manners do
the work: one sheet on a dark ground with the name, aligned fields, and a verification stamp; the
projects filed behind it as folders; the rest of the page as further pieces of the same stationery.

Idea: _on this page, the inspection report becomes the page itself, and the stamp for this site is
checked live in the reader's browser._ The live thing is the existing same-origin `HEAD /` check of
the site's security headers, shown as the stamp on the sheet and in full in the security section.

Art direction was dealt by the `design-taste-frontend` skill: direction "The page is the object"
(seed `40587505`), type Schibsted Grotesk, palette proportions of "Orange and black" re-coloured
from the subject. Redraws: hero (the dealt one needed a room photograph and was a 50/50 sticky
split, which the owner rejected) and contact (the dealt one needed a photograph of the place).

There is one column of reading: no sidebar, and nothing sticks to the viewport.

House rules: no eyebrow labels, no tiny uppercase tracked labels, no visible 01/02/03 numbering, no
hairline rules or 1 px outlined boxes, no gradients, no shadows at rest, no blur. Surfaces are
separated by tone steps. Monospace appears only inside real interface fragments marked `data-ui`
(headers panel, auth-flow chips). Every heading fits in two lines at every width. One corner radius
for page elements: none (square). Fragments keep their own conventions (chat bubbles are rounded).

## Page structure

| Order | Section            | Composition                                                                    |
| ----- | ------------------ | ------------------------------------------------------------------------------ |
| 1     | Header             | Plain bar: monogram, five section links, theme toggle, one primary action      |
| 2     | Sheet (`#sobre`)   | The report on the ground, cropped by the viewport bottom; stamp; fields; About |
| 3     | `#projetos`        | Full-bleed folder bands with tabs, fragment left, result and decisions right   |
| 4     | `#experiencia`     | One giant word, career arc, filled bars per role (newest first)                |
| 5     | `#seguranca`       | Split field: live headers panel left, facts, heading, intro and recheck right  |
| 6     | `#stack`           | A printed card, slightly tilted, cut by the section's bottom edge              |
| 7     | `#contato`         | Stamp-coloured field with the e-mail set as display type                       |
| 8     | Footer (`#rodape`) | The back of the sheet: scalloped top edge, name, live seal, imprint            |

Neighbouring sections never share a layout. Sections are 160 px apart on desktop and 96 px on
phones; nothing inside a section is further apart than 64 px.

## Tokens (`src/app/globals.css`)

Dark is the default: dark values live on `:root`, light values on `:root[data-theme="light"]`.

| Token         | Dark      | Light     | Use                                                         |
| ------------- | --------- | --------- | ----------------------------------------------------------- |
| `--bg`        | `#050f16` | `#dde3da` | Ground behind the sheet; stage behind fragments             |
| `--surface`   | `#11202a` | `#ffffff` | The sheet, band 1, security field, stack card, footer panel |
| `--surface-2` | `#16262f` | `#eef1ea` | Band 2, experience bars, secondary buttons, neutral stamp   |
| `--surface-3` | `#1c2f39` | `#e3e8df` | Band 3, secondary button hover                              |
| `--fg`        | `#eef2ec` | `#0b151c` | Main text; the recheck button fill                          |
| `--muted`     | `#a3b3ba` | `#4a5660` | Field labels, periods, captions, stack lines                |
| `--accent`    | `#bef264` | `#3f6212` | Verified: primary action, `ok`, active header, current role |
| `--on-accent` | `#050f16` | `#ffffff` | Text on accent                                              |
| `--stamp`     | `#bef264` | `#bef264` | Stamp when every header is active; contact field            |
| `--on-stamp`  | `#050f16` | `#050f16` | Text and focus ring on the stamp colour                     |
| `--danger`    | `#f87171` | `#b91c1c` | `refazer`, missing header, partial stamp number             |
| `--warn`      | `#fbbf24` | `#92400e` | `revisão`, "Em homologação"                                 |
| `--chat-out`  | `#1f3a2a` | `#e3eed3` | Outgoing bubble in the chat fragment                        |

Page margin `--margin: clamp(1rem, 0.5rem + 2vw, 2rem)`. Desktop grid: 12 columns, 24 px gap.
The sheet, the Projects heading and the Experience column share the column-3 left edge.

Motion tokens: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-in: cubic-bezier(0.3, 0, 1, 1)`,
`--dur-press: 120ms`, `--dur-fast: 160ms`, `--dur-base: 240ms`, `--dur-stamp: 360ms`.

### Type

Schibsted Grotesk for everything (variable, self-hosted through `next/font`); Geist Mono only inside
`data-ui` fragments, loaded without preload. Five sizes:

| Step             | Size                                         | Use                                                    |
| ---------------- | -------------------------------------------- | ------------------------------------------------------ |
| `--step-display` | `clamp(2.25rem, 0.9rem + 5vw, 5.5rem)`       | Name (`h1`, two authored lines), "Experiência", e-mail |
| `--step-head`    | `clamp(2rem, 1.3rem + 3.2vw, 4rem)`          | Section `h2`, footer name                              |
| `--step-lead`    | `clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)`   | Role line, project result, tab names, stack lines      |
| `--step-body`    | `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)` | Running text, field values                             |
| `--step-small`   | `0.875rem`                                   | Field labels, periods, captions, nav, imprint          |

Display and head: weight 800, tracking -0.05em, leading 0.92. Text: 400 (600 for labels, nav and
buttons), leading 1.5, tracking -0.01em. Nothing below 14 px. Comparable numbers use
`tabular-nums`.

## Contrast (WCAG 2.x)

| Pair                                          | Dark                          | Light                         |
| --------------------------------------------- | ----------------------------- | ----------------------------- |
| fg / bg · surface · surface-2 · surface-3     | 17.07 · 14.68 · 13.71 · 12.24 | 14.12 · 18.45 · 16.17 · 14.82 |
| muted / bg · surface · surface-2 · surface-3  | 8.94 · 7.69 · 7.18 · 6.41     | 5.76 · 7.52 · 6.59 · 6.05     |
| accent / bg · surface · surface-2 · surface-3 | 14.80 · 12.72 · 11.89 · 10.61 | 5.42 · 7.08 · 6.20 · 5.69     |
| danger / bg · surface · surface-2 · surface-3 | 6.99 · 6.01 · 5.61 · 5.01     | 4.95 · 6.47 · 5.67 · 5.20     |
| warn / bg · surface · surface-2 · surface-3   | 11.58 · 9.95 · 9.30 · 8.30    | 5.43 · 7.09 · 6.21 · 5.70     |
| on-stamp / stamp                              | 14.80                         | 14.80                         |
| fg · muted / chat-out                         | 10.93 · 5.72                  | 15.32 · 6.25                  |

Surface steps are decorative (dark 1.16 / 1.07 / 1.12, light 1.31 / 1.14 / 1.09). The focus
outline uses `--accent`; on stamp-coloured surfaces (`.on-stamp`) it switches to `--on-stamp`.
Colour never carries meaning alone: verdicts, header states and project statuses pair a mark with
a word.

## Components

- **Header**: not sticky. ≥ 1024 one 72 px row; below, a second row with the nav that wraps instead
  of scrolling. Primary action: "Baixar currículo" when `public/curriculo-augusto-bernardo.pdf`
  exists at build time (`src/lib/resume.ts`), otherwise "E-mail".
- **Sheet (`Hero`)**: `h1` name on two authored lines; role, specialty and tagline; the
  **stamp** (`SecurityStamp`), a tear-off stub with a perforated edge (6 px round dotted border in
  the sheet colour); six report fields (`profile.facts`); links (E-mail, GitHub, LinkedIn,
  Currículo when present); the About paragraph under an `h2` set at lead size, as a field of the
  report. At 1440 × 900 the viewport crops the sheet so the page visibly continues.
- **Projects**: one band per published project, full bleed, fills cycling surface, surface-2,
  surface-3. The `h3` sits in a shouldered tab (`clip-path`) rising 44 px above the band and
  overlapping the previous band (the folder pile). A status line (`project.status`) sits in the
  band's top strip. Body: the screenshot or drawn fragment (`ProjectVisual`, on the ground colour
  as a stage) left, and result, technical decisions (always visible), technologies and links right.
  Bands do not stick: a sticky band taller than the viewport would hide its own bottom.
- **Experience**: the word "Experiência" at display size, the career arc line, then one filled bar
  per role with role, company and period (current period in accent), highlights and technologies.
  Nothing collapses.
- **Security**: a full-bleed field. The panel (`SecurityPanel`, `data-ui`) reads the response
  headers and lists each with state, value summary and explanation; HSTS (set by Cloudflare) is
  shown separately; the full CSP is behind `<details>`. The right column holds three facts, the
  heading, the intro and the "Conferir de novo" action cell (`SecurityRecheck`). DOM order is
  heading → intro → panel → button; the grid places the panel on the left.
- **Stack**: a card in the sheet colour, tilted 1.5° (1° on phones), centred, technologies printed
  as lines separated by middots under each group name; the section clips the card through its empty
  bottom padding.
- **Contact**: a stamp-coloured field with a short lead line, the e-mail at display size (one line
  from 768 px, broken after the `@` below), the city at the bottom left and LinkedIn, GitHub (and
  Currículo) at the bottom right. Its `h2` "Contato" is visually hidden.
- **Footer**: the back of the sheet. Scalloped top edge drawn by an inline SVG (12 arcs, 6 on
  phones); the name again at head size; the live seal (`SecuritySeal`); "Voltar ao início"; the
  imprint.

## Imagery

No photographs. The pictures of this page are its real interface fragments, each marked `data-ui`:
the Telegram conversation (sample data, labelled), the classifier verdicts and figures, the auth
flow and the live headers panel. Open-licence photographs of Vila Velha exist, but a landmark photo
proves nothing to a recruiter and brings share-alike credit upkeep; they were left out on purpose.
A project screenshot in `project.image` replaces its drawn fragment when it exists.

## Theme

- `data-theme` on `<html>`, set before paint by `THEME_SCRIPT`: `light` only when
  `localStorage.theme` is `light`, otherwise `dark`.
- Without JavaScript the page renders with the dark tokens on `:root`.
- Tailwind dark variant: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- The stamp and the contact field keep the lime fill and dark ink in both themes.

## Motion

Only `transform` and `opacity` animate. Section entrances are CSS scroll-driven animations
(`animation-timeline: view()`), so they need no script; browsers without support, and
`prefers-reduced-motion: reduce`, show the content static.

| Element                                   | Motion                                     | Timing                                           | Reduced motion |
| ----------------------------------------- | ------------------------------------------ | ------------------------------------------------ | -------------- |
| Stamp when a header check lands           | Fade in from scale 1.06 (signature)        | 360 ms `--ease-out`, replays on each real result | None           |
| Project tab                               | Rise 1 rem                                 | Scroll, `entry 0%`–`40%`                         | None           |
| Fragment, security panel                  | Settle from scale 0.97                     | Scroll, `entry 10%`–`55%`                        | None           |
| Band text, experience bars, chat bubbles  | Rise 1.5 rem, staggered by `--i` (max 7)   | Scroll, `entry 15%`–`55%`, +6 % per item         | None           |
| Section words (Projetos, Experiência, …)  | Rise 1.5 rem                               | Scroll, `entry 0%`–`50%`                         | None           |
| Stack card                                | Rise 2.5 rem while settling into its tilt  | Scroll, `entry 0%`–`70%`                         | None           |
| Contact e-mail                            | Rises out of a mask                        | Scroll, `entry 20%`–`cover 45%`                  | None           |
| Security panel rows when a result arrives | Fade, 0.25 rem slide, mark from scale 0.6  | 240 ms `--ease-out`, 30 ms stagger               | None           |
| Buttons                                   | Press `scale(0.97)`; hover tone or opacity | 120 ms press, 160 ms hover                       | Colour only    |
| Anchor scrolling                          | `scroll-behavior: smooth`                  | Browser                                          | `auto`         |

The sheet (name, role, fields) never animates, so the LCP is not delayed. No loops, no autoplay.

## Accessibility

- Skip link "Pular para o conteúdo" is the first focusable element and targets `#conteudo`.
- One `h1` (the name). Sections are labelled regions with an `h2`; project names and roles use
  `h3`; the decisions label and stack groups use `h4`/`h3` inside their section.
- Visible `:focus-visible` outline; interactive targets at least 44 × 44 px.
- External links say "(abre em nova aba)" and use `rel="noopener noreferrer"`.
- The security panel announces its result through one `role="status"` line; the list is
  `aria-busy` while loading. The stamp and the seal are not live regions.
- The chat fragment prefixes each message with "Você:" or "Bot:" for screen readers.
- Technologies lists carry a visually hidden "Tecnologias:" prefix.

## Empty and edge states

- No JavaScript: everything renders; the stamp shows the static line, the panel lists the headers
  with the `curl -sI` command, and there is no recheck button.
- A project without `image` shows its drawn `visual`; without either, its text spans the band.
- Without technical decisions, links or highlights, those blocks are not rendered.
- The résumé action renders only when the PDF exists at build time.
- Security: loading, local build without nginx (grey stamp, explanation), partial headers (grey
  stamp, number in `--danger`), network error ("Conferir de novo").

## Breakpoints

Tailwind defaults. Check for horizontal overflow and two-line headings at 320, 375, 768, 1024 and
1440 px in both themes (see `docs/quality.md`).
