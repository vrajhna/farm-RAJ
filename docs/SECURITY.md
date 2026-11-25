# SECURITY — FARM.RAJ v1.0

- AuthN/Z: HMAC-signed server-verified tokens with expiry; admin role gate on CMS/feedback/audit/docs;
  demo-farmer tokens carry `demo:true` and grant no govt privilege.
- No fake SSO: no screen mimics Rajasthan SSO/Jan Aadhaar credential entry.
- Input: body caps (1–4MB), field length caps, type coercion; upload MIME allowlist + magic-byte
  verification + 5MB cap; uploads stored outside static root, served only with valid token.
- Injection/XSS: JSON file DB (no SQL in demo); PostgreSQL target uses parameterised access;
  frontend renders via `esc()`; no `innerHTML` with unescaped user input except through `esc()`.
- CSRF: state-changing APIs expect JSON + Bearer tokens (no cookie session in demo);
  production: SameSite=strict secure cookies + nonce (adapter hook in `/services` docs).
- Abuse: per-IP rate limits (chat/eligibility), audit log (`DB.audit`, `/api/admin/audit`).
- Secrets: server-only (`SESSION_SECRET`, `ADMIN_PASSWORD` via env); no keys in frontend.
- Headers/CORS: `*` CORS on read APIs for demo; tighten to dept origins in production (see DEPLOYMENT.md).
- PII: analytics aggregates only; phone numbers masked in marketplace; documents private + access-logged.
- Vuln surface: **zero npm dependencies** — no supply-chain deps to audit.
- Backups: `data/` directory snapshot; retention/deletion policy configurable in `server.js` `saveDB`.
