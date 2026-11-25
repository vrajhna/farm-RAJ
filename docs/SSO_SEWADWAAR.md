# Rajasthan SSO + Raj Sewadwaar — implementation map

Source: `Raj_Sewadwaar_Standard_User_Manual_v2.0_15-09.pdf` (DoIT&C, 15-09-2026).
Portal (test): https://sewadwaartest.rajasthan.gov.in/ · Support: support.rajsewadwaar@rajasthan.gov.in, 0141-2925557.

## Manual → FARM.RAJ mapping
| Manual step | Implementation |
|---|---|
| §3 Login with govt SSO ID | `GET /api/sso/login` → 302 to SSO authorize (OAuth2 + PKCE S256, `state` HMAC). Active when `RAJ_SSO_CLIENT_ID/SECRET` set; else returns this checklist |
| §9 App → Create New App → Client ID | `SEWADWAAR_CLIENT_ID` in `.env`; status at `GET /api/sewa/status` |
| §10 API Products → plan → subscribe App | Manual action on portal; subscription state mirrored as `pending/configured` (Consumer Dashboard §7 is the record) |
| §8 Gateway calls carry `?clientID=` | `sewaGet(path, params)` helper appends `clientID` automatically |
| Token exchange + userinfo | `GET /api/sso/callback`: server-side code exchange, `HttpOnly SameSite=Lax` `FSESSION` cookie, 12h expiry, audit `sso/*` |
| Logout | `GET /api/sso/logout` clears cookie |
| Consumer Dashboard statuses | Surfaced as badges: Approved / Rejected / Pending / Partial (manual §7) |

## What the panel will see today
Services → **"Rajasthan SSO se login"** button. Without dept credentials it opens the
exact 6-step Sewadwaar checklist from the manual (portal link included) — never a fake login.
With credentials in `.env`, the same button performs the real redirect flow.

## To activate (dept provides)
1. SSO registration letter → `RAJ_SSO_CLIENT_ID`, `RAJ_SSO_CLIENT_SECRET`, confirm `RAJ_SSO_ISSUER` + `RAJ_SSO_AUTH_PATH`, set `RAJ_SSO_REDIRECT` to the panel domain + `/api/sso/callback`.
2. Sewadwaar portal → Create App → `SEWADWAAR_CLIENT_ID`; subscribe the needed API product/plan.
3. UAT on test portal, then point `SEWADWAAR_API_BASE` at production.
