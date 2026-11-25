# 🌾 FARM.RAJ — खेती की हर जानकारी, हर किसान के लिए

**Proposed farmer-first platform for the Rajasthan Innovation Challenge**
(Dept. of Agriculture portal revamp) — by **WebStudio / Vrajhna Technologies Pvt. Ltd.**

## Run (needs only Node 18+, zero npm dependencies)
```bash
node server.js        # → http://localhost:3000
npm test              # 16 tests
```

## Meta AI (dev.meta.ai — active, backend only)
```bash
cp .env.example .env
# edit .env → META_API_KEY=paste-your-dev.meta.ai-key
node server.js
```
With the key, chat + `/schemes/finder` + `/crop-doctor` are answered by Muse Spark
(engine badge flips green `meta:`). Without it, everything still works on the verified
local knowledge base. Keys NEVER touch the frontend. **Delete `.env` after the interview.**

## Learn hub (35 lessons and growing)
Crops • soil • seeds • irrigation • organic • pest • harvest • **all animals**
(Gir/Tharparkar/Rathi cow, Murrah buffalo, Sirohi goat, Marwari/Chokla sheep,
camel, backyard poultry) • **all machinery** (tractor, combine, sprayer, solar pump,
custom hiring) • **business & export** (FPO, e-NAM, PMFME, APEDA/IEC, grading-branding)
• **Rajasthan warrior heritage** (Pratap/Sanga/Durgadas, Tejaji-Gogaji, Bishnoi-Khejri,
johad-baori water legacy, Marwari trade, Shekhawati art) — all with photos,
step-by-step process, audio read-aloud, downloadable guides, related lessons.

## Routes (all working, refresh-safe)
`/` `/education` (+8 category pages) `/schemes` (+rajasthan/central/eligibility) `/chat`
`/library` (+videos/guides) `/weather` `/mandi` `/crop-calendar` `/soil` `/pest-help`
`/livestock` `/marketplace` `/my-farm` (+documents) `/services` (+application-status)
`/feedback` `/about` `/admin/*` (dashboard/content/schemes/chatbot/analytics/feedback/
users/audit-logs/settings) `/analytics` `/pitch`

8 languages: हिंदी • English • मारवाड़ी • बागड़ी • मेवाड़ी • ढूंढाड़ी • हाड़ौती • मेवाती.
Photos: Rajasthan/Indian farm imagery (CDN with offline fallback) + 🖼️ low-bandwidth mode.

Demo login: farmer mode in `/my-farm` (synthetic 🧪) · Admin: `admin123` (demo only).

## Docs
`docs/PROJECT_AUDIT.md` · `ARCHITECTURE.md` · `INTEGRATION_STATUS.md` · `SECURITY.md` ·
`DEMO_LIMITATIONS.md` · `DEPLOYMENT.md` (+ interview checklist) · `openapi.json`
PostgreSQL target: `db/schema.sql` · Env: `.env.example`
