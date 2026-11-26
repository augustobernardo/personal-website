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
von Restorff (yellow is reserved for primary actions and "current"); Jakob's law (conventional sticky
header, hamburger on mobile, native controls); Hick (five nav links, one primary action per block); Fitts and WCAG 2.5.8 (every target
at least 44 × 44 px).

Style rules:

- Every block has a 3 px outline in `--line` and a hard offset shadow without blur. Small parts
  (chips, stickers, bubbles) use a 2 px outline.
- Colour follows **60-20-10 + ink** (see Colour proportion): neutral paper and surfaces, one
  secondary hue (blue), one accent (yellow), plus semantic ok/bad/warn, which only appear in status
  marks. Fills always carry ink text.
- One corner radius (8 px) for cards and buttons; stickers are pills; chat bubbles keep their own
  rounding.
- Stickers and status marks are rotated 1–2.5°. Cards, text and grids are never rotated.
- Paper texture: a 22 px dot grid on the page background.
- Monospace (Space Mono) only for data: technology chips, period chips, status and verdict
  stickers, header names and the `data-ui` fragments. Labels and running text use Archivo.
  Labels are sentence case, never all caps.
- One column of sections, no sidebar. Only the header sticks to the viewport; from 1024 px the
  Experience career arc and the Security left column are sticky inside their sections.

## Page structure

| Order | Section            | Composition                                                                            |
| ----- | ------------------ | -------------------------------------------------------------------------------------- |
| 1     | Header             | Sticky paper bar, 3 px bottom rule: ink "AO" block, five links or menu, theme, action  |
| 2     | Hero + `#sobre`    | Bento: name card, live sticker, facts strip, blue About band                           |
| 3     | `#projetos`        | One outlined card per project: blue title strip, status sticker, fragment, proof       |
| 4     | `#experiencia`     | Heading and career-arc chips beside role cards; the current role has a yellow strip    |
| 5     | `#seguranca`       | Inverse band: sticky column (fact stickers, heading, intro); live panel, recheck below |
| 6     | `#stack`           | One outlined block, one row per group: group name beside its technology chips          |
| 7     | `#contato`         | Blue band (deep tint in dark): heading, lead, the e-mail as a yellow card, links       |
| 8     | Footer (`#rodape`) | Inverse band: name, live seal, back-to-top button, imprint                             |

Full-bleed sections are bands separated by a 3 px rule; content sits in a 1280 px container with
`--margin` gutters. Bands use 64 px vertical padding below 1024 px and 96 px from 1024 px. Cards are
32 px apart (48 px from 1024 px). Desktop grid: 12 columns, 24 px gap.

## Tokens (`src/app/globals.css`)

Light is the default: light values live on `:root`, dark values on `:root[data-theme="dark"]`.

| Token        | Light                  | Dark                      | Use                                      |
| ------------ | ---------------------- | ------------------------- | ---------------------------------------- |
| `--bg`       | `#F7F3EA`              | `#121212`                 | Paper; text on inverse bands             |
| `--surface`  | `#FFFFFF`              | `#1F1F1F`                 | Cards, secondary buttons, chips          |
| `--fg`       | `#111111`              | `#F2F2F2`                 | Text; inverse band fill                  |
| `--muted`    | `#4D4A44`              | `#B8B8B8`                 | Labels, captions (never on a fill)       |
| `--line`     | `#111111`              | `#F2F2F2`                 | Every outline and hard shadow            |
| `--focus`    | `#111111`              | `#F2F2F2`                 | Focus outline                            |
| `--dot`      | `rgb(17 17 17 / 0.13)` | `rgb(242 242 242 / 0.09)` | Dot-grid texture (decorative)            |
| `--tint`     | `#DCE6FB`              | `#1C2638`                 | Soft secondary: project fragment stage   |
| `--chat-out` | `#D9F5E3`              | `#1F3A2A`                 | Outgoing chat bubble                     |
| `--scrim`    | `rgb(17 17 17 / 0.45)` | `rgb(0 0 0 / 0.6)`        | Behind the open mobile menu (decorative) |

Constant in both themes:

| Token          | Value     | Use                                                                                                           |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `--ink`        | `#111111` | Text and focus on every coloured fill                                                                         |
| `--pop-yellow` | `#FFD23F` | Accent: primary buttons, contact e-mail card, current role and career step                                    |
| `--pop-blue`   | `#8CB4FF` | Secondary: About and contact bands, every card strip, role sticker, labels, active nav link, open menu button |
| `--ok`         | `#3FD97F` | `ok`, "Em produção", header `ativo`, complete stamp and seal                                                  |
| `--bad`        | `#FF6B6B` | `refazer`, header `ausente`, `'unsafe-inline'` flag                                                           |
| `--warn`       | `#FF8F45` | `revisão`, "Em homologação", partial stamp                                                                    |

`--pop-pink` was removed (2026-11-19). The favicon (`src/app/icon.svg`) stays yellow.

### Colour proportion (60-20-10 + ink)

The owner asked for "60 20 10". The classic rule is 60-30-10; here the missing 10 is the ink layer
(text, 3 px outlines, hard shadows, inverse bands), which measured 16.9 % of the light page and is
part of the style. Roles:

| Share | Role      | Colours                                      | Where                                                                                                   |
| ----- | --------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 60 %  | Dominant  | `--bg`, `--surface`                          | Page, cards, secondary buttons, chips, panels                                                           |
| 20 %  | Secondary | `--pop-blue` (fill), `--tint` (soft, themed) | Bands, strips, labels, role sticker, fact stickers (with white), active and open states, fragment stage |
| 10 %  | Accent    | `--pop-yellow` (+ small state fills)         | Primary actions, the contact e-mail, "current" (role strip, career step)                                |
| ~10 % | Ink       | `--fg`/`--ink`/`--line`                      | Text, outlines, shadows, inverse bands, monogram                                                        |

Rules: a new coloured element picks its role first, never a hue. Yellow never fills a band, label or
decoration. Measured before the change (nine 1440 px light screenshots): paper 33.5 %, surface
26.2 %, ink 16.9 %, yellow 7.3 %, ok 5.4 %, blue 4.3 %, chat 3.2 %, pink 2.4 % — the accent was the
largest hue and no secondary existed. Target after: dominant 55–62 %, secondary 17–23 %, accent plus
states about 10 %, ink 14–17 %.

Measured on 2026-11-24 (filled area at 1440 px, light): paper and surface 63.6 %, blue 11.9 %,
tint 8.3 %, ink fills 13.8 %, yellow 2.0 %, states 0.3 %. Text selection uses `--pop-yellow` with
ink text (`::selection`) in both themes.

Context classes change `--line` and `--focus` locally: `.on-fill` (ink text and focus on a fill),
`.fill-band` (the contact band: `--pop-blue` fill with ink text, outlines and focus in light;
`--tint` fill with `--fg` text, outlines and focus in dark, so the dark page has no full-width
light field and the yellow e-mail card is the only bright shape in the section), `.inverse` (band filled with `--fg`, text,
outlines and focus in `--bg`), `.on-panel` (a surface card inside an inverse band).

Shape and depth: outline 3 px (blocks) or 2 px (small parts); radius `--radius-nb` 8 px; hard
shadows 3 px (stickers), 4 px (buttons at rest), 6 px (button hover; cards below 768 px) and 8 px
(cards from 768 px). No blur anywhere. Page margin `--margin: clamp(1rem, 0.5rem + 2vw, 2rem)`.

Shared component classes: `.nb-card`, `.nb-btn` with `--primary` (yellow) and `--secondary`
(surface), `.nb-chip`, `.nb-sticker`, `.list-square`, `.type-display`, `.type-head`, `.type-title`,
`.wide`, `.semi-wide`; navigation: `.site-header`, `.menu`, `.menu-toggle`, `.menu-icon`, `.menu-panel`,
`.menu-scrim`.

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

Measured with the WCAG 2.x relative-luminance formula (light 2026-11-19, dark 2026-11-25). Text needs 4.5:1, outlines and
focus 3:1.

| Pair                                          | Light                         | Dark                          |
| --------------------------------------------- | ----------------------------- | ----------------------------- |
| fg / bg · surface · tint · chat-out           | 17.05 · 18.88 · 15.07 · 16.29 | 16.73 · 14.72 · 13.56 · 11.05 |
| muted / bg · surface · tint · chat-out        | 7.97 · 8.83 · 7.04 · 7.62     | 9.44 · 8.31 · 7.65 · 6.24     |
| Inverse band: bg on fg                        | 17.05                         | 16.73                         |
| Outline and focus: line / bg · surface · tint | 17.05 · 18.88 · 15.07         | 16.73 · 14.72 · 13.56         |
| ink / pop-yellow · pop-blue · white           | 13.08 · 9.07 · 18.88          | same                          |
| ink / ok · warn · bad                         | 10.29 · 8.33 · 6.80           | same                          |
| Contact band (dark): fg · line / tint         | —                             | 13.56 · 13.56                 |
| Selection: ink / pop-yellow                   | 13.08                         | 13.08                         |

Lowest text pair: 7.04 light, 6.24 dark. Fills against the light paper measure 1.3–2.6:1, so no fill
stands alone: every filled shape has an outline of at least 13:1. `--muted` never sits on a fill. Colour never carries meaning alone:
verdicts, header states and project statuses pair a fill with an icon and a word.

## Components

- **Header** (`Header` server component + `HeaderNav` client component): sticky at the top
  (`z-index: 40`), paper bar with a 3 px bottom rule; `html` has `scroll-padding-top: 5.5rem` so
  anchors land below it. Monogram: 44 px surface square (white in light, graphite in dark) with `--fg` letters and outline, links to `#conteudo`.
  Primary action: "Baixar currículo" when `public/curriculo-augusto-bernardo.pdf` exists at build
  time (`src/lib/resume.ts`), otherwise "E-mail"; it is the only yellow element in the bar.
  - From 1024 px: one 72 px row (monogram, centred nav, theme toggle, primary action). Below: a 64 px
    row (monogram, theme toggle, primary action from 640 px, hamburger).
  - Active section: an `IntersectionObserver` on the five sections (a line at 40 % of the viewport)
    marks the link with `aria-current="true"`; one shared blue pill slides to it (`--dur-base`,
    `--ease-out`; instant with reduced motion). None in the hero, "Contato" at the page bottom.
    On hover an inactive link shows the same 2 px outline as the pill, without the blue fill.
  - Hide on scroll (only without reduced motion): hides after scrolling down more than 8 px past
    72 px, returns on scrolling up more than 8 px, and always shows while the menu is open or focus
    is inside it.
  - Mobile menu: a native `<details>`/`<summary>` (`.menu`, 44 px hamburger, name "Menu"; the
    browser exposes expanded/collapsed) rendered on the server, so it opens without JavaScript and
    nothing shifts at hydration. The hamburger turns into an X and opens a sheet under the bar over
    a scrim: five 56 px links with an arrow (the active one blue) and, below 640 px, the primary
    action at full width. Page scroll lock is CSS (`html:has(.menu[open])` below 1024 px). With
    JavaScript: `#conteudo` and `#rodape` are `inert`, Tab wraps between the toggle and the sheet,
    Esc or a click on the scrim closes and returns focus to the toggle, choosing a link closes it,
    and widening past 1024 px closes it. Without JavaScript the links navigate but the sheet stays
    open until the toggle is pressed.
- **Buttons (`.nb-btn`)**: at rest, a 3 px outline and a 4 px shadow. On hover (pointer devices
  only) they rise 2 px and the shadow grows to 6 px. On press they move 4 px into their shadow,
  which drops to 0. Disabled (`aria-disabled`): dashed outline, no shadow, no movement.
- **Hero**: a bento grid. The name card (`h1` in three authored lines, the role as a title-size
  line under it, specialty chips split from `profile.specialty`, tagline, actions) spans 8 columns.
  The **live sticker** (`SecurityStamp`) sits in the 4 columns on the right, vertically centred on
  the paper beside the card. The facts card spans the full width with the six facts in three
  columns, then the blue About band. From 768 to 1023 px the sticker and facts sit side by side
  under the name card; on phones everything stacks. Below 640 px the e-mail action is full width
  and the other actions share the next row.
- **Live sticker (`SecurityStamp`)**: rotated -2.5°, with a dashed inner perforation. Filled `--ok`
  when every header is present, `--warn` when some are missing, and surface while loading, offline,
  without JavaScript or on a local build. A shield icon pairs with the state. The label "Este site,
  conferido agora" is Archivo, with right padding that clears the shield icon.
- **Projects**: one card per published project. The blue title strip holds the `h3`, the status sticker and "Projeto corporativo" when it applies. The body puts the
  fragment (on `--tint`, as a stage) in 7 columns and the proof in 5, alternating sides per
  card. The proof shows the result, the "Decisões técnicas" heading (`h4`, Archivo 800 at body size, semi-wide) and a square-bullet list, the
  technologies as chips, and "Código" and "Site no ar" as buttons.
- **Experience**: the heading and the career arc (chips, the current step yellow, arrows pointing down
  when stacked) take 4 columns. Role cards take 8: role, company and a period chip in the head
  strip (yellow for the current role), then highlights and technology chips. Nothing collapses.
  From 1024 px the career arc is sticky (`top: 6rem`) and follows the role cards.
- **Security**: an inverse band. From 1024 px the left column (three fact stickers, blue, white,
  blue; the heading; the intro) is sticky (`top: 6rem`) and the right column holds the panel
  (`SecurityPanel`, `data-ui`), a surface card with a blue hard shadow, with the "Conferir de novo"
  button under it. Each header row shows its name, a state sticker (`ativo` in ok, `ausente` in
  bad, `não conferido` in white), a value summary and an explanation at body size; below 640 px the
  state sticker sits under the name and names wrap only where they must. HSTS is shown separately;
  the full CSP is behind `<details>`. DOM order is fact stickers, heading, intro, panel, button.
- **Stack**: one outlined block with a 3 px rule between groups. Each row puts the group name
  (`h3`, title size) in 3 columns and its technologies as chips in 9; below 1024 px the name sits
  above the chips.
- **Contact**: a blue band (a deep `--tint` band in dark) with a visible "Contato" heading, the lead, and the e-mail as a large
  yellow (primary) pressable card (broken after the `@` below 768 px), then the city and LinkedIn, GitHub (and
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
- Dark mode keeps the system: neutral graphite paper (no hue cast), light grey outlines and hard shadows, the
  same saturated fills with ink text, and a deep blue `--tint` that carries light text.
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
- The `h1`, the role line, chips, tagline, actions, facts and About never animate, so the LCP is
  never delayed.
- Tilts are static `rotate` values, never part of a keyframe, so reduced motion keeps them.
- No loops, no autoplay beyond one-shot entrances, no count-up numbers (counting from 0 would briefly
  claim "0 de 6 cabeçalhos ativos"), no 3D. The header, nav and theme toggle (used most) get no
  reveal and no decoration: only the functional CSS motion of the sticky header and the mobile menu
  in the table.
- Staggers are capped so a group starts within 360 ms (480 ms for chat bubbles).

Slap: the sticker falls onto the paper from scale 1.25 (1.08 for elements wider than 240 px),
accelerating into the impact (`--ease-in`), fades in during the first 20 %, squashes to 1.04 × 0.96 at
55 % and settles with `--ease-out`; 420 ms in total (`--dur-slap`). GSAP eases: `power3.out` ≈
`--ease-out`, `power2.in` ≈ `--ease-in`.

| Element                                                           | Motion                                                  | Timing                                                          | Trigger                 | Engine |
| ----------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- | ----------------------- | ------ |
| Button hover (pointer only)                                       | Rise 2 px, shadow 4 → 6 px                              | 140 ms `--ease-out`                                             | Hover                   | CSS    |
| Button press                                                      | Sink 4 px into the shadow, shadow → 0                   | 90 ms `--ease-out`                                              | Press                   | CSS    |
| Live sticker while checking                                       | Lift 3 px, shadow 8 → 11 px                             | 140 ms `--ease-out`                                             | `data-state="loading"`  | CSS    |
| Live sticker when the result lands                                | The new sticker slaps; shield icon pops from scale 0.6  | 420 ms; icon 240 ms after a 260 ms delay                        | Each real result        | CSS    |
| Security panel rows when a result arrives                         | Fade, 0.25 rem slide, mark from scale 0.6               | 240 ms `--ease-out`, 30 ms stagger                              | Each real result        | CSS    |
| Recheck icon while loading                                        | Spin                                                    | 1 s linear, only while loading                                  | Loading                 | CSS    |
| Section `h2`, footer name (`.in-word`)                            | Rise 24 px with fade                                    | 450 ms `power3.out`, 60 ms batch stagger                        | Top at 88 %, once       | GSAP   |
| Card text, role and stack cards, flow, arc, links (`.in-seq > *`) | Rise 24 px with fade                                    | 400 ms `power3.out`, 60 ms stagger (cap 360 ms)                 | Top at 88 %, once       | GSAP   |
| Chat bubbles                                                      | Slide 16 px from their own side with fade               | 350 ms `power3.out`, 120 ms stagger (cap 480 ms)                | Top at 88 %, once       | GSAP   |
| Fragment, security panel (`.in-media`)                            | Settle from scale 0.97 with fade                        | 500 ms `power2.out`                                             | Top at 88 %, once       | GSAP   |
| Status and fact stickers, contact e-mail (`.in-slap`)             | Slap                                                    | 420 ms, 100 ms delay + 90 ms per sticker                        | Top at 88 %, once       | GSAP   |
| Hero live-sticker wrapper (`data-parallax="hero"`)                | Drifts up 40 px                                         | Scrubbed, `scrub: 0.5`                                          | Scroll, from 0          | GSAP   |
| Security fact stickers (`data-parallax="float"`)                  | Float 20 → −20 px                                       | Scrubbed, `scrub: 0.5`                                          | Scroll through the band | GSAP   |
| Anchor scrolling                                                  | `scroll-behavior: smooth`                               | Browser                                                         | Anchor link             | CSS    |
| Header hide / show                                                | Slide up out of view / back                             | Hide 140 ms `--ease-in`; show 240 ms `--ease-out`               | Scroll direction        | CSS    |
| Hamburger hover (pointer only)                                    | Middle bar shrinks to 60 % (preview of the collapse)    | 140 ms `--ease-out`                                             | Hover                   | CSS    |
| Hamburger to X                                                    | Middle bar collapses, outer bars rotate 45° 40 ms later | 140 / 240 ms `--ease-out`; back 140 ms `--ease-in`              | `aria-expanded`         | CSS    |
| Mobile menu sheet and scrim                                       | Sheet fades in from 0.5 rem above; scrim fades          | 240 ms `--ease-out`; close 140 ms `--ease-in`                   | Open / close            | CSS    |
| Mobile menu links                                                 | Fade and rise 0.5 rem                                   | 240 ms `--ease-out`, 30 ms stagger (max 150 ms); close together | Open                    | CSS    |

Parallax runs only from 1024 px with a fine pointer. With `prefers-reduced-motion: reduce` nothing in
the table moves (the header never hides; the menu and the X appear at once): GSAP is not loaded, the slaps and lift are off, colours still change and anchor
scrolling is `auto`.

Not used, on purpose: three.js (about 129 KB gzip for a lit 3D object that contradicts the flat,
hard-shadow language and would compete with the name for the reader's attention), Motion (a second
engine), `@gsap/react` (`useGSAP` needs GSAP in the hydration bundle; `matchMedia().revert()` in a
`useEffect` cleans up the same way) and GSAP plugins beyond ScrollTrigger.

## Accessibility

- Skip link "Pular para o conteúdo" is the first focusable element and targets `#conteudo`.
- Navigation: one `nav "Seções"` exposed at a time (desktop row or mobile sheet); the active link has
  `aria-current="true"`; the menu button keeps the name "Menu" and reports its state through
  `aria-expanded`; focus behaviour of the open menu is in Components › Header.
- One `h1` (the name). Sections are labelled regions with an `h2`; project names, roles and stack
  groups use `h3`; "Decisões técnicas" uses `h4`.
- Visible `:focus-visible` outline: 3 px solid `--focus`, offset 3 px; ink on fills, `--bg` on
  inverse bands. The offset puts the ring on the surface around the control, so `--focus` comes
  from that context, never from the control's own fill: the yellow primary button and the open menu
  button do not override it (an ink ring around them vanished on the dark page and on the light
  inverse band).
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
