# ARCHITECTURE — FARM.RAJ

## Farmer experience (PWA)
Mobile web, Hindi-first, accessible: `public/` — no build step, works offline (service worker),
voice input (Web Speech), read-aloud (TTS), large-text toggle, low-bandwidth (no CDN deps).

## Application platform (`server.js`, zero-dep Node)
API gateway + auth + business rules + content + search + audit:
- REST under `/api/*`, OpenAPI in `docs/openapi.json`
- Eligibility rules engine (`checkEligibility`, RULES_VERSION v1.0)
- Chat retrieval (`chatAnswer`: verified KB, confidence, escalation, no invented doses/benefits)
- Sessions: HMAC-signed tokens (demo-farmer, admin roles), server-side verification, expiry
- Rate limiting (chat 20/min, eligibility 30/min per IP), input caps, MIME+magic-byte upload checks
- File DB `data/db.json` → PostgreSQL via `db/schema.sql`; private uploads in `data/uploads/` (never static-served)

## AI model gateway (`aiConfig` / `metaChat` in server.js)
- **Provider: Meta Model API (dev.meta.ai), server-side keys only.** `META_API_KEY`
  (+ `META_API_URL=https://api.meta.ai/v1/chat/completions`, `META_MODEL=muse-spark-1.3`,
  `META_VISION_MODEL=muse-spark-1.3`) in `.env`. Docs: https://dev.meta.ai/docs.
  Keys never reach the frontend — `/api/ai/status` reports only engine name + `keyConfigured`.
- **Chat:** with key → Muse Spark (versioned prompts, verified-KB facts injected,
  low reasoning effort, generous token budget since reasoning shares it, 45s timeout,
  history, request logging, KB fallback on any null/failure). Without key → verified
  local KB in Hindi/dialects. Every reply carries `engine` (`meta:*` / `local-kb`).
- **Crop Doctor:** photo (downscaled in-browser, never stored) → Muse Spark vision
  (`image_url` base64 part); identifies crop + likely issues with confidence % + IPM steps,
  never pesticide doses, always escalates to officer/KCC.
- **Scheme finder** (`/api/schemes/finder`): deterministic rules engine `matchSchemes()` is
  ALWAYS the source of truth (ranked `top`); the Meta model only adds `aiNotes` explanation.
  Chat detects "find schemes for me" intent and runs the rules engine inline.
- **Safety:** no invented doses/benefits/URLs (prompt-enforced + deterministic base), rate limits,
  audit log (`ai/*` events), no PII in prompts.

## Data flow
Farmer PWA → `/api/*` → rules/content services → file DB / private store → audit log + analytics events.
Admin (`/admin`, role-gated) → CMS CRUD → content versioning. Analytics (`/analytics`) reads
aggregate events only (no PII; `demo:true` separated).

## Angular migration map (when dept standardises on Angular)
| Current module | Angular target |
|---|---|
| `pHome/pEdu/...` page fns | lazy feature modules (`LearnModule`, `SchemesModule`…) |
| `api()` helper | `ApiService` + interceptors |
| `T` dict | `@ngx-translate` hi/en bundles |
| canvas charts | `AdminAnalyticsModule` charts |
| file DB | NestJS + Prisma → PostgreSQL (`db/schema.sql` is the contract) |
Routing paths are already Angular-compatible.
