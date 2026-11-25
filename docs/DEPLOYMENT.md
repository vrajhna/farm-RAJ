# DEPLOYMENT

## Demo (2 minutes)
```bash
node server.js            # or: npm start  (needs only Node 18+, zero npm deps)
# open http://localhost:3000
```
Admin: password `admin123` (demo only).

## Production path
1. `cp .env.example .env` and set `SESSION_SECRET`, `ADMIN_PASSWORD`, SSO/Jan Aadhaar keys.
2. Provision PostgreSQL and apply `db/schema.sql`; point API layer at it (entities match `data/db.json`).
3. Put S3-compatible private bucket for `data/uploads`; add AV-vendor webhook → `av_verdict`.
4. Reverse-proxy (TLS, secure headers, CORS allowlist dept origins), process manager (systemd/PM2).
5. Register OAuth/OIDC with Rajasthan SSO; fill `RAJ_SSO_*`; run UAT; flip `/api/sso/status`.
6. Sign off official scheme PDFs/lesson content; replace `SCHEMES`/`LESSONS` seed + `LIBRARY` files.
7. Back up `data/` (or Postgres) daily; ship audit logs to SIEM.

## Interview demo checklist (16 steps, ~12 min)
1 Home 2 HI/EN toggle 3 /education search 4 read lesson + 🔊 5 /schemes filter
6 /schemes/pm-kisan official link 7 /schemes/eligibility run 8 /chat ask in Hindi
9 sources + rating 10 /services pending-auth badges 11 demo farmer login 12 upload doc (private)
13 /my-farm diary 14 /admin (admin123) publish draft 15 /analytics demo-vs-live
16 /feedback submit. No dead buttons — every control above is wired.
