# FretBloom

A beginner-focused PWA for self-learning acoustic guitar. Short daily sessions, guided progression, and enough theory to understand what you're playing — not just copy it.

## Features

- **Lesson Mode** — phased guided path that unlocks tools as you progress
- **Visual Lessons** — guitar anatomy, chord diagrams, notation vs TAB
- **Chords And TAB** — beginner chord gallery with finger-number guidance, melody drills
- **Audio And Fretboard** — ear training, fretboard note drills (two modes)
- **Rhythm Lab** — metronome, strumming patterns, chord progression playback
- **Practice Planner** — 20-minute daily session checklist and timer
- **12-Week Roadmap** — structured learning journey with milestones
- **Theory Lab** — flashcards and quiz
- **Song Starter Pack** — first real songs to learn and play
- **Notes** — journal your practice sessions
- Installable as a PWA — works offline, add to home screen

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 + Vite 7 |
| Styling | Plain CSS, CSS custom properties |
| Audio | Web Audio API (synthesized tones, no samples) |
| PWA / offline | `vite-plugin-pwa` + Workbox (full precache) |
| Persistence | `localStorage` (Supabase cloud sync planned) |

## Run Locally

```bash
pnpm install
pnpm dev        # localhost:5173
pnpm build      # production build → dist/
pnpm preview    # preview dist/ build
```

## Project Structure

```
src/
  App.jsx           — layout shell, all state, SPA navigation
  styles.css        — all styling, theming, responsive, mobile dock
  data.js           — all lesson/content data (static)
  audio.js          — Web Audio API helpers, fretboard trainer logic
  hooks.js          — usePersistentState hook
  components/
    ui.jsx          — Section, Card, CheckItem, SimpleLessonCard
    diagrams.jsx    — guitar anatomy, chord, notation diagrams
    NavIcon.jsx     — stroke SVG icons keyed by section ID
    BrandLogo.jsx   — circular SVG brand mark
    ChordCard.jsx   — chord shape card
    TabSongCard.jsx — TAB practice card
    FretboardTrainer.jsx
    SiteIntro.jsx   — editorial hero section
public/
  android-chrome-192.png / android-chrome-512.png
  apple-touch-icon.png
  favicon.svg / favicon-64.png
  og-card.png       — social preview image
  site.webmanifest  — superseded by vite-plugin-pwa at build time
vite.config.js      — Vite + PWA plugin config
```

## Navigation Model

Single-page app with state-driven view switching — no router library. `activeSectionId` determines which of 13 sections renders. All `href="#section-id"` anchors in content are intercepted via event delegation.

**Mobile:** fixed bottom dock (Home / Lessons / Practice / Progress / More) + full-page menu overlay for all sections.

## PWA

Built with `vite-plugin-pwa`. The production build generates:

- `dist/sw.js` — Workbox service worker
- `dist/manifest.webmanifest` — PWA manifest
- Full offline precache of all assets (~586 KiB, 19 entries)

Install prompt appears automatically on supported browsers.

## Planned: Auth + Cloud

| Feature | Planned approach |
|---|---|
| Auth | Supabase (email + Google OAuth) |
| Progress sync | Supabase Postgres (replace localStorage) |
| Push reminders | Web Push API + Supabase Edge Functions |
| Gamification | XP, streaks, badges — Supabase |
| Hosting | Vercel (auto-deploy from GitHub) |

## Brand Assets

`FretBloom` — *Fret* ties to guitar, *Bloom* suggests gradual growth over rushed mastery.

Icons, touch icons, Android icons, and OG card are in `public/`.
