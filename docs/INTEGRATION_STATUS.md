# INTEGRATION STATUS — what is real vs pending

| Integration | Status | Evidence |
|---|---|---|
| Rajasthan SSO (OAuth/OIDC) | ⏳ PENDING authorization | `GET /api/sso/status`; login UI in `/services` links only to `sso.rajasthan.gov.in`, no fake login |
| Jan Aadhaar | ⏳ PENDING (API key + approval) | eligibility asks for Jan Aadhaar as input only; never calls govt API |
| Raj Kisan (apply + status) | ⏳ PENDING (API access + UAT) | `/services/application-status` links to `rajkisan.rajasthan.gov.in` as system of record |
| IMD weather live feed | ⏳ PENDING | `/api/weather` returns dated demo-pattern advisories, labelled |
| Agmarknet live prices | ⏳ PENDING | `/api/mandi` returns dated demo-pattern prices, labelled; verify at agmarknet.gov.in |
| AV malware-scan vendor | ⏳ PENDING | uploads quarantined conceptually; MIME+magic-byte checks live |
| SMS / DBT / e-Sign | ⏳ OUT OF SCOPE for demo | no such buttons exist; no fake success messages |
| Demo farmer mode | ✅ WORKING (synthetic) | `/api/auth/demo-login` issues `demo:true` HMAC tokens, UI-badged 🧪 |
| Admin CMS + analytics + feedback | ✅ WORKING | role-gated APIs with audit log |

**Rule: nothing claims to be a live government transaction.** Every pending item is badged in UI and API.
Blockers for pilot: dept IdP registration, Jan Aadhaar/Raj Kisan API credentials + UAT, official content sign-off, AV vendor, hosting + secrets vault.
