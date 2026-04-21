# साथ — Saath MVP

> Plan your wedding with clarity, confidence, and community.

A lightweight Next.js prototype for the Saath AI-powered wedding planning platform, built for speed and demo-readiness.

---

## What's built

| Feature | Status | Notes |
|---|---|---|
| Onboarding (3-step) | ✅ | Name, date/location/guests, budget + vibe |
| Social polling feed | ✅ | Create polls, vote, comment |
| Mock vendor recommendations | ✅ | 10 vendors, AI-style vibe matching |
| Responsive design | ✅ | Mobile-first, soft/dreamy aesthetic |
| Auth | 🟡 Mock | Profile stored in localStorage |
| Real backend | 🔜 | Supabase schema ready in `/supabase/schema.sql` |

---

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with a custom blush/rose/gold palette
- **Fonts**: Playfair Display + Inter (Google Fonts)
- **State / Persistence**: `localStorage` (zero-config, no backend needed)
- **Icons**: Lucide React
- **Images**: Unsplash (remote patterns configured)
- **Future backend**: Supabase (Postgres + Auth + Realtime)

---

## Quickstart

```bash
# 1. Install dependencies
cd saath-mvp
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

No environment variables required — the app runs entirely on localStorage.

---

## Folder structure

```
saath-mvp/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + fonts
│   │   ├── page.tsx            # Redirect to /onboarding or /feed
│   │   ├── onboarding/
│   │   │   └── page.tsx        # 3-step onboarding form
│   │   ├── feed/
│   │   │   └── page.tsx        # Social polling feed
│   │   └── vendors/
│   │       └── page.tsx        # Mock vendor recommendations
│   ├── components/
│   │   ├── Nav.tsx             # Sticky nav bar
│   │   ├── PollCard.tsx        # Poll card with voting + comments
│   │   ├── CreatePollModal.tsx # Modal to create new polls
│   │   └── VendorCard.tsx      # Vendor listing card
│   └── lib/
│       ├── types.ts            # TypeScript types
│       ├── storage.ts          # localStorage CRUD helpers
│       └── mockData.ts         # Seed polls + mock vendors
├── supabase/
│   └── schema.sql              # Production DB schema (when ready)
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## Upgrading to Supabase

When you're ready to move off localStorage:

1. Create a project at [supabase.com](https://supabase.com)
2. Run `/supabase/schema.sql` in the SQL editor
3. Copy your project URL and anon key to `.env.local` (see `.env.local.example`)
4. Replace `localStorage` calls in `src/lib/storage.ts` with Supabase client calls

---

## Design system

| Token | Value | Usage |
|---|---|---|
| `blush` | `#F5E6E8` | Backgrounds, tags |
| `ivory` | `#FDFAF8` | Page background |
| `mauve` | `#D4B8C4` | Secondary text, borders |
| `rose` | `#C97A9A` | Active states, CTAs |
| `gold` | `#C9A96E` | Accents, stars |
| `bark` | `#7B3D5E` | Primary text, buttons |

---

## Roadmap (V2 suggestions)

- [ ] Real auth (Supabase Auth or Google OAuth)
- [ ] Image upload for polls (Supabase Storage)
- [ ] Budget tracker + allocation tool
- [ ] Vendor enquiry / contact form
- [ ] Cohort matching (group brides by date/location)
- [ ] AI recommendations via OpenAI (replace simple tag matching)
- [ ] Push notifications for poll activity
