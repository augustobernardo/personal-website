# Design

## Direction

Neobrutalism, on the owner's request (2026-11-19), after three rejected directions: the original
generic page, a two-column layout with a fixed sidebar, and the dark "inspection report"
(_laudo de vistoria_).

Idea: _a page of thick-outlined blocks on cream paper, each block one piece of proof, with status
marks slapped on as stickers — including the live sticker that checks this site's security headers
in the reader's browser._ Recruiters decide in about 60 seconds, so the order is fixed: who (name
card), proof that it is live (the sticker), facts, then projects with their drawn fragments.

Grounding: NN/g's guidance on neobrutalism (keep 2–3 bold colours, contrast still has to pass);
von Restorff (yellow is reserved for primary actions); Jakob's law (conventional header and native
controls); Hick (five nav links, one primary action per block); Fitts and WCAG 2.5.8 (every target
at least 44 × 44 px).

Style rules:

- Every block has a 3 px outline in `--line` and a hard offset shadow without blur. Small parts
  (chips, stickers, bubbles) use a 2 px outline.
- Three brand fills (yellow, blue, pink) plus semantic ok/bad/warn, which only appear in status
  marks. Fills always carry ink text.
- One corner radius (8 px) for cards and buttons; stickers are pills; chat bubbles keep their own
  rounding.
- Stickers and status marks are rotated 1–2.5°. Cards, text and grids are never rotated.
- Paper texture: a 22 px dot grid on the page background.
- Monospace (Space Mono) for chips, stickers, labels and the `data-ui` fragments. Labels are
  sentence case, never all caps.
- One column of sections, no sidebar, nothing sticks to the viewport.

## Page structure

| Order | Section            | Composition                                                                          |
| ----- | ------------------ | ------------------------------------------------------------------------------------ |
| 1     | Header             | Cream bar with a 3 px bottom rule: yellow "AO" block, five links, theme, one action  |
| 2     | Hero + `#sobre`    | Bento: name card, live sticker, facts card, blue About band                          |
| 3     | `#projetos`        | One outlined card per project: coloured title strip, status sticker, fragment, proof |
| 4     | `#experiencia`     | Heading and career-arc chips beside role cards; the current role has a yellow strip  |
| 5     | `#seguranca`       | Inverse band: fact stickers, heading, intro, recheck button; live panel card         |
| 6     | `#stack`           | Six group cards in a grid, coloured header strips, technologies as chips             |
| 7     | `#contato`         | Yellow band: heading, lead, the e-mail as a large pressable card, links              |
| 8     | Footer (`#rodape`) | Inverse band: name, live seal, back-to-top button, imprint                           |

Full-bleed sections are bands separated by a 3 px rule; content sits in a 1280 px container with
`--margin` gutters. Bands use 64 px vertical padding below 1024 px and 96 px from 1024 px. Cards are
32 px apart (48 px from 1024 px). Desktop grid: 12 columns, 24 px gap.

## Tokens (`src/app/globals.css`)

Light is the default: light values live on `:root`, dark values on `:root[data-theme="dark"]`.

| Token        | Light                  | Dark                      | Use                                          |
| ------------ | ---------------------- | ------------------------- | -------------------------------------------- |
| `--bg`       | `#FFF4DE`              | `#16130E`                 | Paper; fragment stage; text on inverse bands |
| `--surface`  | `#FFFFFF`              | `#262119`                 | Cards, secondary buttons, chips              |
| `--fg`       | `#111111`              | `#F7EEDC`                 | Text; inverse band fill                      |
| `--muted`    | `#4D4A44`              | `#C2B8A6`                 | Labels, captions (never on a fill)           |
| `--line`     | `#111111`              | `#F7EEDC`                 | Every outline and hard shadow                |
| `--focus`    | `#111111`              | `#F7EEDC`                 | Focus outline                                |
| `--dot`      | `rgb(17 17 17 / 0.13)` | `rgb(247 238 220 / 0.09)` | Dot-grid texture (decorative)                |
| `--chat-out` | `#D9F5E3`              | `#24412F`                 | Outgoing chat bubble                         |

Constant in both themes:

| Token          | Value     | Use                                                          |
| -------------- | --------- | ------------------------------------------------------------ |
| `--ink`        | `#111111` | Text and focus on every coloured fill                        |
| `--pop-yellow` | `#FFD23F` | Primary buttons, monogram, contact band, first card strip    |
| `--pop-blue`   | `#8CB4FF` | About band, second card strip                                |
| `--pop-pink`   | `#FF90BC` | Current career step, third card strip                        |
| `--ok`         | `#3FD97F` | `ok`, "Em produção", header `ativo`, complete stamp and seal |
| `--bad`        | `#FF6B5E` | `refazer`, header `ausente`, `'unsafe-inline'` flag          |
| `--warn`       | `#FFA53D` | `revisão`, "Em homologação", partial stamp                   |

Context classes change `--line` and `--focus` locally: `.on-fill` (ink text and focus on a fill),
`.fill-band` (also ink outlines, for the contact band), `.inverse` (band filled with `--fg`, text,
outlines and focus in `--bg`), `.on-panel` (a surface card inside an inverse band).

Shape and depth: outline 3 px (blocks) or 2 px (small parts); radius `--radius-nb` 8 px; hard
shadows 3 px (stickers), 4 px (buttons at rest), 6 px (button hover; cards below 768 px) and 8 px
(cards from 768 px). No blur anywhere. Page margin `--margin: clamp(1rem, 0.5rem + 2vw, 2rem)`.

Shared component classes: `.nb-card`, `.nb-btn` with `--primary` (yellow) and `--secondary`
(surface), `.nb-chip`, `.nb-sticker`, `.list-square`, `.type-display`, `.type-head`, `.type-title`,
`.wide`, `.semi-wide`.

Motion tokens: `--ease-out: cubic-bezier(0.2, 0, 0, 1)`, `--ease-in: cubic-bezier(0.3, 0, 1, 1)`,
`--dur-press: 90ms`, `--dur-fast: 140ms`, `--dur-base: 240ms`, `--dur-slap: 420ms`.

### Type

Archivo (variable: weight and width axes) for everything; Space Mono 400/700 for chips, stickers,
labels and `data-ui` fragments, loaded without preload. Both self-hosted through `next/font`. Width
is set with `font-variation-settings` (`.wide` = 125, `.semi-wide` = 112).

| Step             | Size                                       | Setting                        | Use                                      |
| ---------------- | ------------------------------------------ | ------------------------------ | ---------------------------------------- |
| `--step-display` | `clamp(2.25rem, 1.1rem + 6vw, 6.5rem)`     | 900, width 100, leading 0.88   | Name (`h1`), three authored lines        |
| `--step-head`    | `clamp(2rem, 1.2rem + 3.4vw, 4.5rem)`      | 900, width 125, leading 0.95   | Section `h2`, footer name                |
| `--step-email`   | `clamp(1.5rem, 0.9rem + 3vw, 4rem)`        | 800, leading 1.05              | Contact e-mail                           |
| `--step-title`   | `clamp(1.375rem, 1.1rem + 1.2vw, 2rem)`    | 800, width 112, leading 1.1    | Project and role `h3`, About `h2`, stats |
| `--step-lead`    | `clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)` | 500, leading 1.35              | Tagline, project result, contact lead    |
| `--step-body`    | `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`   | 400 (700 strong), leading 1.55 | Running text                             |
| `--step-small`   | `0.875rem`                                 | Space Mono 700                 | Chips, stickers, labels, captions        |

Nothing below 14 px. Buttons and nav: Archivo 700 at 1rem. Body text at most 65ch, tagline 34ch,
project result 40ch. Comparable numbers use `tabular-nums`.

## Contrast (WCAG 2.x)

| Pair                                   | Light                 | Dark                 |
| -------------------------------------- | --------------------- | -------------------- |
| fg / bg · surface · chat-out           | 17.31 · 18.88 · 16.29 | 16.07 · 13.86 · 9.73 |
| muted / bg · surface · chat-out        | 8.09 · 8.83 · 7.62    | 9.44 · 8.14 · 5.72   |
| Inverse band: bg on fg                 | 17.31                 | 16.07                |
| Outline: line / bg · surface           | 17.31 · 18.88         | 16.07 · 13.86        |
| ink / pop-yellow · pop-blue · pop-pink | 13.08 · 9.07 · 8.96   | same                 |
| ink / ok · bad · warn                  | 10.29 · 6.76 · 9.62   | same                 |

Fills against the light paper measure 1.3–2.6:1, so no fill stands alone: every filled shape has an
outline of at least 13.8:1. `--muted` never sits on a fill. Colour never carries meaning alone:
verdicts, header states and project statuses pair a fill with an icon and a word.

## Components

- **Header**: not sticky. From 1024 px one 72 px row (monogram, centred nav, theme toggle and
  primary action); below, the nav wraps on a second row. Primary action: "Baixar currículo" when
  `public/curriculo-augusto-bernardo.pdf` exists at build time (`src/lib/resume.ts`), otherwise
  "E-mail".
- **Buttons (`.nb-btn`)**: at rest, a 3 px outline and a 4 px shadow. On hover (pointer devices
  only) they rise 2 px and the shadow grows to 6 px. On press they move 4 px into their shadow,
  which drops to 0. Disabled (`aria-disabled`): dashed outline, no shadow, no movement.
- **Hero**: a bento grid. The name card (yellow role sticker, `h1`, specialty chips split from
  `profile.specialty`, tagline, actions) spans 8 columns and two rows. The **live sticker**
  (`SecurityStamp`) and the facts card sit in the 4 columns on the right. The blue About band spans
  the full width. From 768 to 1023 px the sticker and facts sit side by side under the name card;
  on phones everything stacks.
- **Live sticker (`SecurityStamp`)**: rotated -2.5°, with a dashed inner perforation. Filled `--ok`
  when every header is present, `--warn` when some are missing, and surface while loading, offline,
  without JavaScript or on a local build. A shield icon pairs with the state.
- **Projects**: one card per published project. The title strip cycles yellow, blue and pink and
  holds the `h3`, the status sticker and "Projeto corporativo" when it applies. The body puts the
  fragment (on the paper colour, as a stage) in 7 columns and the proof in 5, alternating sides per
  card. The proof shows the result, the "Decisões técnicas" chip and a square-bullet list, the
  technologies as chips, and "Código" and "Site no ar" as buttons.
- **Experience**: the heading and the career arc (chips, the current step pink, arrows pointing down
  when stacked) take 4 columns. Role cards take 8: role, company and a period chip in the head
  strip (yellow for the current role), then highlights and technology chips. Nothing collapses.
- **Security**: an inverse band. The left column holds three fact stickers, the heading, the intro
  and the "Conferir de novo" button. The right column holds the panel (`SecurityPanel`, `data-ui`),
  a surface card with a yellow hard shadow. Each header row shows its name, a state sticker (`ativo`
  in ok, `ausente` in bad, `não conferido` in white), a value summary and an explanation. HSTS is
  shown separately; the full CSP is behind `<details>`. DOM order is heading, intro, panel, button.
- **Stack**: six cards on a 1/2/3-column grid, each with a coloured header strip and technologies as
  chips.
- **Contact**: a yellow band with a visible "Contato" heading, the lead, and the e-mail as a large
  pressable card (broken after the `@` below 768 px), then the city and LinkedIn, GitHub (and
  Currículo) buttons.
- **Footer**: an inverse band with the name at head size, the live seal (`SecuritySeal`: a square
  outlined marker plus its label), a "Voltar ao início" primary button and the imprint.

## Imagery

No photographs. The pictures of this page are its real interface fragments, each marked `data-ui`:
the Telegram conversation (sample data, labelled), the classifier verdicts and figures, the auth
flow and the live headers panel, restyled as outlined windows, stickers and chips. A project
screenshot in `project.image` replaces its drawn fragment when it exists, framed with the 3 px
outline.

## Theme

- `data-theme` on `<html>`, set before paint by `THEME_SCRIPT`: `dark` only when
  `localStorage.theme` is `dark`, otherwise `light`. The script stays a constant string; the CSP hash
  is computed from the exported HTML at image build.
- Light is the default because the style depends on ink outlines and ink shadows on paper.
- Dark mode keeps the system: warm near-black paper, cream outlines and cream hard shadows, and the
  same saturated fills with ink text.
- Without JavaScript the page renders with the light tokens on `:root`.
- Tailwind dark variant: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.

## Motion

Two engines with separate jobs. CSS owns every state change (buttons, the live sticker, panel rows)
and the one hero entrance, so feedback never waits for a library. GSAP 3.15.1 with ScrollTrigger owns
the scroll choreography: one-shot, time-based reveals that work in every browser. The previous CSS
scroll-driven entrances (`animation-timeline: view()`) were scrubbed, so a slap followed scroll speed
and replayed backwards; they are removed, and their classes stay in the markup as GSAP hooks.

Loading. `MotionBoot` (a client component that renders nothing, mounted once in `page.tsx`) imports
the GSAP director after the `load` event and the next idle period. GSAP is never in the hydration
bundle, never on the LCP path, and never downloaded when `prefers-reduced-motion: reduce` matches at
start-up. All GSAP work runs inside one `gsap.matchMedia()` and is reverted on unmount or when the
reader switches to reduced motion. Budget: async chunk ≤ 55 KB gzip (about 48 KB estimated from the
package files), initial JavaScript + ≤ 2 KB, Lighthouse Performance ≥ 95.

Rules:

- Only `opacity` and transforms (`translate`, `scale`, `rotate`) animate, plus the button shadow and
  the live sticker's lift shadow.
- The exported HTML never holds a hidden state; without JavaScript everything is visible. GSAP hides
  only elements whose top is below 88 % of the viewport when it starts, and reveals each once when it
  reaches that line. Anything already on screen never animates. Focus or print reveals pending
  elements at once; fades use `opacity`, never `visibility`, so links stay in the Tab order.
- Every reveal clears its inline styles when it ends, so tilts (`rotate`) and button hover and press
  come back from their classes.
- The `h1`, chips, tagline, actions, facts and About never animate, so the LCP is never delayed.
- Tilts are static `rotate` values, never part of a keyframe, so reduced motion keeps them.
- No loops, no autoplay beyond one-shot entrances, no count-up numbers (counting from 0 would briefly
  claim "0 de 6 cabeçalhos ativos"), no 3D, nothing on the header, nav or theme toggle (used most).
- Staggers are capped so a group starts within 360 ms (480 ms for chat bubbles).

Slap: the sticker falls onto the paper from scale 1.25 (1.08 for elements wider than 240 px),
accelerating into the impact (`--ease-in`), fades in during the first 20 %, squashes to 1.04 × 0.96 at
55 % and settles with `--ease-out`; 420 ms in total (`--dur-slap`). GSAP eases: `power3.out` ≈
`--ease-out`, `power2.in` ≈ `--ease-in`.

| Element                                                           | Motion                                                 | Timing                                           | Trigger                 | Engine |
| ----------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ | ----------------------- | ------ |
| Button hover (pointer only)                                       | Rise 2 px, shadow 4 → 6 px                             | 140 ms `--ease-out`                              | Hover                   | CSS    |
| Button press                                                      | Sink 4 px into the shadow, shadow → 0                  | 90 ms `--ease-out`                               | Press                   | CSS    |
| Hero role sticker (`.hero-slap`)                                  | Slap                                                   | 420 ms                                           | Page load               | CSS    |
| Live sticker while checking                                       | Lift 3 px, shadow 8 → 11 px                            | 140 ms `--ease-out`                              | `data-state="loading"`  | CSS    |
| Live sticker when the result lands                                | The new sticker slaps; shield icon pops from scale 0.6 | 420 ms; icon 240 ms after a 260 ms delay         | Each real result        | CSS    |
| Security panel rows when a result arrives                         | Fade, 0.25 rem slide, mark from scale 0.6              | 240 ms `--ease-out`, 30 ms stagger               | Each real result        | CSS    |
| Recheck icon while loading                                        | Spin                                                   | 1 s linear, only while loading                   | Loading                 | CSS    |
| Section `h2`, footer name (`.in-word`)                            | Rise 24 px with fade                                   | 450 ms `power3.out`, 60 ms batch stagger         | Top at 88 %, once       | GSAP   |
| Card text, role and stack cards, flow, arc, links (`.in-seq > *`) | Rise 24 px with fade                                   | 400 ms `power3.out`, 60 ms stagger (cap 360 ms)  | Top at 88 %, once       | GSAP   |
| Chat bubbles                                                      | Slide 16 px from their own side with fade              | 350 ms `power3.out`, 120 ms stagger (cap 480 ms) | Top at 88 %, once       | GSAP   |
| Fragment, security panel (`.in-media`)                            | Settle from scale 0.97 with fade                       | 500 ms `power2.out`                              | Top at 88 %, once       | GSAP   |
| Status and fact stickers, contact e-mail (`.in-slap`)             | Slap                                                   | 420 ms, 100 ms delay + 90 ms per sticker         | Top at 88 %, once       | GSAP   |
| Hero live-sticker wrapper (`data-parallax="hero"`)                | Drifts up 40 px                                        | Scrubbed, `scrub: 0.5`                           | Scroll, from 0          | GSAP   |
| Security fact stickers (`data-parallax="float"`)                  | Float 20 → −20 px                                      | Scrubbed, `scrub: 0.5`                           | Scroll through the band | GSAP   |
| Anchor scrolling                                                  | `scroll-behavior: smooth`                              | Browser                                          | Anchor link             | CSS    |

Parallax runs only from 1024 px with a fine pointer. With `prefers-reduced-motion: reduce` nothing in
the table moves: GSAP is not loaded, the slaps and lift are off, colours still change and anchor
scrolling is `auto`.

Not used, on purpose: three.js (about 129 KB gzip for a lit 3D object that contradicts the flat,
hard-shadow language and would compete with the name for the reader's attention), Motion (a second
engine), `@gsap/react` (`useGSAP` needs GSAP in the hydration bundle; `matchMedia().revert()` in a
`useEffect` cleans up the same way) and GSAP plugins beyond ScrollTrigger.

## Accessibility

- Skip link "Pular para o conteúdo" is the first focusable element and targets `#conteudo`.
- One `h1` (the name). Sections are labelled regions with an `h2`; project names, roles and stack
  groups use `h3`; "Decisões técnicas" uses `h4`.
- Visible `:focus-visible` outline: 3 px solid `--focus`, offset 3 px; ink on fills, `--bg` on
  inverse bands.
- Interactive targets are at least 44 × 44 px. Chips are not interactive.
- External links say "(abre em nova aba)" and use `rel="noopener noreferrer"`.
- The security panel announces its result through one `role="status"` line; the list is
  `aria-busy` while loading. The sticker and the seal are not live regions.
- The chat fragment prefixes each message with "Você:" or "Bot:" for screen readers.
- Technologies lists carry a visually hidden "Tecnologias:" prefix.

## Empty and edge states

- No JavaScript: everything renders; the sticker shows the static line on surface, the panel lists
  the headers with the `curl -sI` command, and there is no recheck button.
- A project without `image` shows its drawn `visual`; without either, its proof spans the card.
- Without technical decisions, links or highlights, those blocks are not rendered; a role without
  highlights or tags is a head strip only.
- The résumé action renders only when the PDF exists at build time.
- Security: loading (surface sticker, disabled dashed button), local build without nginx (surface
  sticker, explanation), partial headers (warn sticker, `ausente` stickers), network error
  ("Conferir de novo").

## Breakpoints

Tailwind defaults. Check for horizontal overflow, the three `h1` lines and the contact e-mail at
320, 375, 768, 1024 and 1440 px in both themes (see `docs/quality.md`).
