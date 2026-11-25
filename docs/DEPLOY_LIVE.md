# Go LIVE — Railway (backend) + Cloudflare Pages (frontend)

Code is on GitHub: **github.com/vrajhna/farm-RAJ** (branch `main`).

## A. Backend on Railway (~5 min, free tier)
1. Open https://railway.app/new → **Deploy from GitHub repo** → select `vrajhna/farm-RAJ`.
2. Railway auto-detects Node (nixpacks). Start command is already `node server.js`
   (`Procfile` + `railway.json` committed).
3. **Variables** tab → add (copy from `.env.example`; NEVER commit real keys):
   - `PORT=3000` (Railway injects its own `PORT` — the app reads `process.env.PORT`, fine)
   - `ADMIN_PASSWORD=` → strong demo password
   - `SESSION_SECRET=` → long random string
   - `META_API_KEY=` → dev.meta.ai key (for live Meta answers; omit for local-KB mode)
   - `META_API_URL=https://api.meta.ai/v1/chat/completions`
   - `META_MODEL=muse-spark-1.3` · `META_VISION_MODEL=muse-spark-1.3`
4. **Settings → Networking → Generate Domain** → you get
   `https://farm-raj-production-XXXX.up.railway.app`. Open `/api/health` — expect `{"ok":true}`.
5. Note the URL as `BACK` for step B. (`data/` JSON DB resets on redeploy — PostgreSQL move is in `db/schema.sql` for pilot.)

## B. Frontend on Cloudflare Pages (~5 min, free)
1. Edit `public/config.js` line 3 → `window.FR_API='https://YOUR-BACKEND.up.railway.app';`
   commit + push (or set after first deploy and redeploy).
2. Open https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** →
   select `vrajhna/farm-RAJ` → framework preset **None** →
   **Build command:** *(empty)* · **Output directory:** `public`.
3. Deploy → you get `https://farm-raj.pages.dev`. Open it — chat/schemes call Railway automatically.
4. Custom domain (optional): Pages → Custom domains → add department domain.

## C. Verify live (2 min)
- `BACK/api/health` → ok:true · `BACK/api/ai/status` → engine meta (key set) or local-kb
- Frontend: home → language → chat streams tokens → `/crop-doctor` photo → `/schemes/finder`
- No `.env` is in git (`.gitignore` covers it) — keys live only in Railway Variables.

## After the interview
Railway Variables → delete `META_API_KEY` (or rotate at dev.meta.ai). Redeploy.
