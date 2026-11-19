# Design

## Direction

Clean and professional, for recruiters reading on a phone. One column, generous spacing, one
accent color, no decoration that competes with the content. The reading order is name and title,
then the call to action (résumé, GitHub, LinkedIn, e-mail), then About, Experience, Projects,
Stack and Contact.

## Tokens (`src/app/globals.css`)

| Token                   | Light     | Dark      |
| ----------------------- | --------- | --------- |
| `--bg`                  | `#fafaf9` | `#0c0a09` |
| `--surface`             | `#ffffff` | `#1c1917` |
| `--fg`                  | `#1c1917` | `#fafaf9` |
| `--muted`               | `#57534e` | `#a8a29e` |
| `--border` (decorative) | `#d6d3d1` | `#44403c` |
| `--accent`              | `#1d4ed8` | `#60a5fa` |
| `--on-accent`           | `#ffffff` | `#0c0a09` |

Font: Geist (sans) through `next/font`, self-hosted at build time.

## Contrast (WCAG 2.x)

| Pair               | Light | Dark  |
| ------------------ | ----- | ----- |
| fg / bg            | 16.74 | 18.92 |
| fg / surface       | 17.49 | 16.74 |
| muted / bg         | 7.30  | 7.83  |
| muted / surface    | 7.63  | 6.93  |
| accent / bg        | 6.42  | 7.77  |
| accent / surface   | 6.70  | 6.88  |
| on-accent / accent | 6.70  | 7.77  |

Card borders are decorative (1.43:1 and 1.92:1). The theme button border uses `--muted` to meet
the 3:1 non-text contrast.

## Theme

- `data-theme` on `<html>`, set before paint by `THEME_SCRIPT` from `localStorage.theme` or
  `prefers-color-scheme`.
- Tailwind dark variant: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- Without JavaScript, `@media (prefers-color-scheme: dark)` applies to `:root:not([data-theme])`.

## Accessibility

- Skip link "Pular para o conteúdo" is the first focusable element and targets `#conteudo`.
- One `h1`; each section is a labelled region with an `h2`; items use `h3`.
- Visible `:focus-visible` outline; touch targets of at least 44 px.
- External links say "(abre em nova aba)" and use `rel="noopener noreferrer"`.
- Technical decisions use native `<details>`/`<summary>`, so they work by keyboard.
- Section entrance animation (`rise`, 0.6 s) and smooth scrolling turn off under
  `prefers-reduced-motion: reduce`.

## Empty states

- A project without `image` shows `public/projects/placeholder.svg`.
- A project without technical decisions hides the `<details>` block.
- The résumé button links to `/curriculo-augusto-bernardo.pdf`, which returns 404 until the PDF is
  added.

## Breakpoints

Tailwind defaults. Verified without horizontal overflow at 320, 375, 768, 1024 and 1440 px.
