# Admin Panel Guide — FARM.RAJ department side (2 min to learn)

Login: `/admin` · demo password `RajFarm2026!Dept` on live (`admin123` local).
Pick a role (super-admin / dept-admin / content-editor / reviewer / district-officer / analytics-viewer).
**Yes — it is fully usable today:** every tab below reads/writes the real backend.

## Tabs
- **dashboard** — counts (lessons/schemes/feedback/docs/events) + role table (who can do what).
- **content** — publish flow: pick lesson/scheme → Hindi+English titles → body/benefit → Save draft.
  Drafts go live instantly in demo; production adds review→approve→publish + version history.
- **schemes** — all 15 scheme records with type, official source, updated date. Click any ID to see the farmer view.
- **chatbot** — recent farmer questions + rating events; escalation rule (low-confidence → 1800-180-1551).
- **analytics** — jumps to the live `/analytics` dashboard.
- **feedback** — structured inbox (type/page/message/district/contact). Reply workflow = production step.
- **users** — 6 roles with permissions matrix (demo counts: 1 super-admin, 3 dept-admin, 8 editors, 4 reviewers, 41 district officers, 6 viewers).
- **audit-logs** — every login, upload, publish, eligibility check. Tamper-evident, newest first.
- **settings** — rules version, integration statuses, upload policy, language packs, retention.

## Analytics — what is it for / what is used most
Measures (no personal data, ever): page views, popular lessons, scheme searches + detail views,
eligibility checks, apply-link clicks, chatbot questions + ratings, feedback volume,
device split, language split, district aggregates. Seeded demo events are labelled
`demo:true` and excluded from production reporting.
**How to read it:** biggest page bar = most-used section → put new content there;
top scheme views = demand signal for camps; falling chat ratings = content gap to fix;
district map = where to run the next training mela (e.g., Churu first).

## Test the platform fast (5-minute loop)
1. `/` → language मारवाड़ी → search "गेहूं" → read lesson + 🔊
2. `/schemes` → filter Rajasthan → open PMFBY → official link opens
3. `/schemes/finder` → 2-acre profile → top-6 + AI note (engine `meta:`)
4. `/chat` → "mere liye yojana batao" → streaming + sources + ⏱ time
5. `/crop-doctor` → leaf photo → diagnosis + confidence %
6. `/my-farm` → demo login → diary + upload PDF → ask PDF a question
7. `/admin` → publish a draft → see it in `/education`
8. `/analytics` → confirm your 7 steps appear (live, not seeded)
9. `/feedback` → submit → check it in admin inbox
