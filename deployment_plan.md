# Deployment Plan

## Current State

- Version: `0.0.1`
- Build: `pnpm build` → `dist/` — passes clean
- PWA: fully offline, service worker generated, installable on iOS and Android
- Auth/backend: not yet integrated — all state in `localStorage`

---

## Phase 1 — Ship the Static PWA

### Step 1: GitHub

```bash
git init
git add .
git commit -m "feat: FretBloom v0.0.1 — initial release"
git branch -M main
# Create repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/fretbloom.git
git push -u origin main
```

### Step 2: Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the `fretbloom` GitHub repo
3. Vercel auto-detects Vite — confirm settings:
   - **Framework:** Vite
   - **Build command:** `pnpm build`
   - **Output directory:** `dist`
   - **Install command:** `pnpm install`
4. Deploy → get a live URL (e.g. `fretbloom.vercel.app`)

### Step 3: Custom domain (optional)

- Buy `fretbloom.app` or similar
- Add in Vercel → Domains → point DNS records as instructed

### Verify after deploy

- [ ] App loads at the live URL
- [ ] `manifest.webmanifest` is served correctly
- [ ] "Add to Home Screen" prompt appears on mobile
- [ ] App works offline after first load (DevTools → Network → Offline)
- [ ] iOS: Add to Home Screen → opens in standalone mode
- [ ] Android: Chrome install banner appears

---

## Phase 2 — Auth + Cloud Progress Sync

### Stack

| Layer | Service | Notes |
|---|---|---|
| Auth | Supabase Auth | Email + Google OAuth |
| Database | Supabase Postgres | Replaces localStorage |
| API | Supabase JS SDK | Direct from React, no separate server |

### Supabase setup

1. Create project at [supabase.com](https://supabase.com)
2. Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Add to Vercel environment variables:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### Schema

```sql
create table profiles (
  id uuid references auth.users primary key,
  name text,
  guitar_type text,
  created_at timestamptz default now()
);

create table progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  check_id text not null,
  completed_at timestamptz default now(),
  unique(user_id, check_id)
);

create table streaks (
  user_id uuid references profiles(id) primary key,
  current_streak int default 0,
  longest_streak int default 0,
  last_practice_at timestamptz
);
```

### Code changes needed

- Install `@supabase/supabase-js`
- Add `src/supabase.js` — initialise client with env vars
- Replace `usePersistentState` with Supabase read/write where appropriate
- Add login/signup screen (gate app behind auth)
- Migrate existing `localStorage` data to Supabase on first login

---

## Phase 3 — Push Notifications + Reminders

### Stack

| Layer | Service |
|---|---|
| Push delivery | Web Push API + VAPID keys |
| Subscription storage | Supabase `push_subs` table |
| Scheduling | Supabase Edge Functions + `pg_cron` |

### Schema addition

```sql
create table push_subs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  subscription jsonb not null,
  created_at timestamptz default now()
);
```

### Flow

1. User grants notification permission in app
2. Browser generates a push subscription object
3. App POSTs it to Supabase `push_subs`
4. Supabase Edge Function runs on cron (e.g. 6pm daily):
   - Queries users who haven't practiced today
   - Calls Web Push API with VAPID keys to send reminder
5. Service worker receives push event → shows notification

### VAPID keys

```bash
npx web-push generate-vapid-keys
# Add VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY to Vercel env vars
```

---

## Phase 4 — Gamification

### XP system

- Check completion: +10 XP
- Quiz correct answer: +15 XP
- Practice session completed: +25 XP
- 7-day streak: +100 XP bonus

### Badges

| Badge | Trigger |
|---|---|
| First Chord | Complete first chord check |
| Week 1 Done | Complete all Week 1–2 milestones |
| 7-Day Streak | 7 consecutive practice days |
| Quiz Master | Score 100% on theory quiz |
| Full Bloom | Complete all 12 weeks |

### Schema addition

```sql
create table xp (
  user_id uuid references profiles(id) primary key,
  total_xp int default 0,
  level int default 1
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);
```

### Notification on badge unlock

- Edge Function triggered on `badges` table insert via Supabase webhook
- Sends Web Push: "You earned the Week 1 Done badge 🎸"

---

## Environment Variables Summary

| Variable | Used in | Phase |
|---|---|---|
| `VITE_SUPABASE_URL` | React app | 2 |
| `VITE_SUPABASE_ANON_KEY` | React app | 2 |
| `VAPID_PUBLIC_KEY` | React app + Edge Function | 3 |
| `VAPID_PRIVATE_KEY` | Edge Function only | 3 |

---

## Build Order

1. ✅ Static PWA — `pnpm build` passes, offline ready
2. ⬜ GitHub repo + Vercel deploy
3. ⬜ Supabase project + schema
4. ⬜ Auth flow in app
5. ⬜ Progress sync (replace localStorage)
6. ⬜ Push subscription + daily reminder
7. ⬜ XP + streaks
8. ⬜ Badges + unlock notifications
