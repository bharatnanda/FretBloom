# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install      # install deps
pnpm dev          # start dev server (localhost:5173)
pnpm build        # production build → dist/
pnpm preview      # preview dist/ build (port binding may fail in sandbox)
```

No test runner configured. Verify changes via `pnpm build` and browser QA.

## Architecture

Single-page React + Vite app. All source lives in `src/`.

### Key files

- `src/App.jsx` — monolithic: layout shell, nav logic, all lesson data, all widget components (fretboard trainer, rhythm lab, audio playback, chord diagrams, TAB practice, theory quiz, practice timer). This is the primary file to read first.
- `src/styles.css` — all styling, CSS custom properties (`--space-*`, `--color-*`, theme vars), responsive breakpoints, mobile dock layout.
- `index.html` — metadata, OG tags, favicon links.
- `public/site.webmanifest` — PWA install metadata.

### State and persistence

All state is React local state inside `App.jsx`. Progress, notes, quiz state, lesson mode, and theme are persisted to `localStorage` (no external DB or backend).

### Audio

Synthesized via Web Audio API directly in `App.jsx`. No recorded samples — all tones are generated programmatically.

### Navigation model

Website-style shell: sticky top header, grouped top nav, centered content area, mobile bottom dock. Active section is tracked in a single `activeSection` state variable.

### Lesson gating

Lesson Mode gates some later tools to reduce beginner overload. Gate logic lives inline in `App.jsx`.

## Known Structural Debt

`src/App.jsx` is large and monolithic. Recommended split (not yet done):
1. Layout and navigation components
2. Lesson content data module
3. Widget components (fretboard trainer, rhythm lab, TAB practice, audio player, timer)
4. Diagram components (chord diagrams, fretboard visualization)

## Planned Next Work

1. Add a `site-intro` editorial hero section above the current dashboard section
2. Add a subtle texture/imagery pass (guitar close-up, warm grain overlay) — keep the learning app below it functional, not over-designed
3. Split `App.jsx` into the components listed above
