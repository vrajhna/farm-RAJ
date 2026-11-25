# FARM.RAJ — Canva Pitch Deck Pack (copy-paste ready)
Vrajhna Technologies Pvt. Ltd. · Challenge: Revamp of Dept. of Agriculture Web Portal
Applied: 31 Aug 2026 · **Ask: ₹27,00,000** · Status: evaluation

## How to build in Canva (10 min)
Template: green/earth "Agriculture pitch" · Fonts: large Hindi-capable (Noto Sans/Tiro Devanagari) ·
16:9 · 15 slides · each slide = heading + 3 bullets + 1 visual cue below.

---

**S1 — Title**
🌾 FARM.RAJ — खेती की हर जानकारी, हर किसान के लिए।
Sub: Rajasthan's farmer-first digital front door · by Vrajhna Technologies Pvt. Ltd.
Visual: homepage screenshot on a phone mockup.

**S2 — The problem (government's own 4 gaps)**
1. Poor mobile experience — current portal unusable on cheap phones
2. Schemes hard to find & understand — farmers miss benefits
3. No SSO / application-status integration
4. No usage analytics, no structured feedback
Visual: 4 red ❌ icons.

**S3 — Our answer (one line)**
FARM.RAJ doesn't replace Raj Kisan / Jan Aadhaar — it becomes their **easy front door**.
Existing systems stay the systems of record. We integrate, translate, and guide.
Visual: diagram — Farmer → FARM.RAJ → Raj Kisan / Jan Aadhaar / IMD / Agmarknet.

**S4 — Live product, not slides (QR to site)**
https://farm-raj.vrajhna.workers.dev — working today: 35 lessons, 15 schemes,
Hindi AI assistant (Meta Muse Spark), Crop Doctor (photo diagnosis), mandi/weather,
8 Rajasthani languages. **QR code of the URL here.**

**S5 — Learn hub (the biggest free agri library)**
35 lessons: crops, soil, seeds, irrigation, organic, pest, harvest, **all animals**
(Gir, Murrah, Sirohi, Marwari sheep, camel, poultry), **all machinery**, **business/export**
(FPO, e-NAM, PMFME, APEDA), **Rajasthan warrior heritage** (Pratap, Tejaji, Bishnoi, johad-baori).
Photos + steps + audio + guides + related lessons. Visual: lesson screenshots.

**S6 — Schemes made simple**
State + Centre filters, department + category filters, versioned eligibility engine,
documents checklist, official apply links, source + date on every scheme.
**No approval ever promised.** Visual: eligibility-check screenshot.

**S7 — AI assistant (Meta Muse Spark, server-side)**
Streams answers in Hindi/Marwari/Bagri, checks schemes inline ("mere liye yojana batao"),
Crop Doctor diagnoses leaf photos with confidence %, web search with citations.
Keys never touch the phone. Visual: chat screenshot with engine badge.

**S8 — For everyone who can't read**
Big photo buttons, voice input, read-aloud, large text, low-bandwidth photo-off mode,
8 languages: हिंदी, English, मारवाड़ी, बागड़ी, मेवाड़ी, ढूंढाड़ी, हाड़ौती, मेवाती.
Visual: language menu + voice screenshot.

**S9 — SSO / Jan Aadhaar — honest integration**
OAuth2+PKCE adapter + Raj Sewadwaar consumer flow (manual v2.0 mapped step-by-step).
Today: real login button + setup checklist; activates fully on dept credentials + UAT.
**We never fake a government login.** Visual: services-page SSO card.

**S10 — Department side (admin + analytics)**
Role-based CMS (draft→review→publish, versioned), scheme records, feedback inbox,
audit logs; separate analytics dashboard (pages, schemes, chat ratings, districts —
**no personal farmer data**, demo vs live separated). Visual: analytics screenshot.

**S11 — Security**
Zero-dependency backend, server-side secrets, rate limits, validated private uploads
(MIME+magic bytes, AV-vendor ready), HMAC sessions, audit trails, HTTPS everywhere.

**S12 — ₹27,00,000 budget (12 months)**
| Head | ₹ |
|---|---|
| Product + AI + app stores (Android/iOS/Huawei, Win/Mac/Linux) | 8,00,000 |
| Churu field office (rent, setup, field staff) | 4,00,000 |
| Local employment — 6 youth + 4 women (content, support, training) | 5,00,000 |
| Dept integrations + UAT + security audit | 3,00,000 |
| Dialect content + audio studio | 2,00,000 |
| Marketing (radio, melas, CSC, WhatsApp, social) | 3,00,000 |
| Ops + contingency | 2,00,000 |
| **Total** | **27,00,000** |

**S13 — Churu field office + local employment**
Office near mandi belt; hire locally: 2 agri graduates (content/validation), 2 support
(Hindi/Marwari/Bagri/Shekhawati), 4 women (audio lessons, SHG outreach, CSC training),
1 coordinator. Farmers trained at CSCs, schools, melas. Visual: map pin Churu + team grid.

**S14 — Reach everywhere**
PWA today → Play Store + Apple App Store + Huawei AppGallery (PWABuilder/Bubblewrap),
Windows/macOS/Linux desktop (PWA/Electron), CSC kiosks, IVR/WhatsApp next.
Marketing: All India Radio spots, mandi hoardings, Kisan mela demos, YouTube Shorts in dialects.

**S15 — The ask**
₹27L pilot → 6-month dept pilot in 2 districts → SSO + Raj Kisan live integration →
statewide rollout. **Vrajhna Technologies builds, staffs, trains, and maintains — everything from our side.**
Contact + QR + "Live demo now" button.

## Tech stack (1 line for Q&A)
Node.js (zero-dep) · PWA frontend · Meta Muse Spark (`api.meta.ai/v1`) · file DB → PostgreSQL ·
Cloudflare Workers + Railway · OAuth2/OIDC + Sewadwaar adapters.
