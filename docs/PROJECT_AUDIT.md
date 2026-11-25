# PROJECT AUDIT — FARM.RAJ (new build, 2026-11-25)

Workspace `/home/yuvraj/Downloads/farm-RAJ` was **empty** (no repo, no Angular, no prior prototype).

## v1.1 bug-fix audit (same day) — real problems found and fixed
1. **Critical rendering bug:** `hi()` helper returned the function itself instead of Hindi text
   — every Hindi string stringified an arrow function. Fixed + verified.
2. **Dead sub-routes:** `/education/crops|soil|…`, `/schemes/rajasthan|central`,
   `/library/videos|guides`, `/my-farm/documents`, `/admin/schemes|chatbot|users|settings|audit-logs`
   all rendered in-app 404. All now route to real pages.
3. **Education search bug:** searches sent `cat=undefined` → zero results. Fixed (category preserved).
4. **Languages:** only HI/EN existed. Now 8: Hindi, English, Marwari, Bagri, Mewari,
   Dhundhari, Harauti, Mewati (UI chrome full; chat fully dialectal in Marwari/Bagri,
   simple-Hindi fallback for the rest — documented).
5. **No photos:** now full photo hero (farmer/tractor/field), photo category cards,
   news thumbnails, low-bandwidth photo-off mode, offline-safe fallbacks.
6. **Fake download:** library button only toasted. Now downloads a real readable file (Blob).
7. **Scheme navigation:** added department + category filters and Rajasthan/Centre shortcuts.
8. **Admin gaps:** added schemes / chatbot / users / settings tabs; audit-logs path.
9. **Tests:** 12 passing (rules, API smoke, news, dept filter, dialect chat, fallback).
10. **Server:** `listen` guarded by `require.main` so tests can require the app safely.Decision: build a **working product immediately** instead of scaffolding a heavy framework with no content.

## What was built (v1.0.0)
- `server.js` — zero-dependency Node.js application platform: REST APIs, rules engine v1.0,
  chat retrieval, rate limiting, signed demo/admin tokens, private document validation,
  analytics pipeline, audit log, static PWA hosting + SPA fallback.
- `public/` — mobile-first Hindi-first PWA (index, styles, app.js router, manifest, service worker).
- `data/db.json` — file DB (auto-seeded); `db/schema.sql` — PostgreSQL production target.
- `tests/` — node:test suite (eligibility, chat, API).
- Independent routes: `/ /education /schemes /chat /library /weather /mandi /crop-calendar
  /soil /pest-help /livestock /marketplace /my-farm /services /feedback /about
  /admin /analytics /pitch` — all refresh-safe (server SPA fallback).

## Responsive
CSS mobile-first; verified layout bands 360 / 390 / 768 / desktop via fluid grid
(2-col ≤420px, 3-col base, 6-col ≥760px), 44px+ touch targets, large-text toggle.

## Known limits (see DEMO_LIMITATIONS.md)
Live SSO/Jan Aadhaar/Raj Kisan status APIs, IMD/Agmarknet live feeds, AV-vendor verdict,
and SMS/DBT actions are **pending authorization** — adapters + status endpoints exist,
demo uses clearly-marked synthetic data.
