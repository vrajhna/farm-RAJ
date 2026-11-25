# DEMO LIMITATIONS (read before the panel)

1. All mandi/weather/prices/news are **dated demo-pattern data** — verify live at agmarknet.gov.in / IMD.
2. Scheme benefits/conditions summarise public scheme docs; deadlines change — always use the
   official apply link on each scheme page.
3. Eligibility is **indicative** (rules v1.0); final decision rests with the department.
4. Chat gives advisory-only answers with sources; pesticide doses/diagnoses/finance must be
   confirmed with local officers / KCC 1800-180-1551.
   **Meta key (Nov 25): a live dev.meta.ai key is loaded server-side for the demo**
   (endpoint https://api.meta.ai/v1, model muse-spark-1.3 — verified working for
   text chat + vision). The key is in `.env` only (never frontend, never logged) —
   ROTATE/DELETE it after the interview.
5. **Crop Doctor (/crop-doctor):** photo → Meta vision identifies crop + likely issues with
   confidence %, IPM steps, no pesticide doses. Photos are downscaled in-browser, never stored,
   never include faces/Aadhaar. Works fully once the model endpoint accepts the key.
5. **Languages:** UI chrome is fully translated in Hindi, English, Marwari, Bagri, Mewari,
   Dhundhari, Harauti, Mewati. Chat answers are fully dialectal in Marwari + Bagri;
   Mewari/Dhundhari/Harauti/Mewati fall back to simple Hindi (closest written form) —
   dialect packs v1, community review pending. TTS uses hi-IN for all Devanagari languages.
   Lesson/scheme bodies stay in Hindi/English (source-accurate) with audio read-aloud.
6. Demo login = synthetic identity (badged 🧪). Admin password `admin123` is demo-only.
7. Uploads are validated + private; AV-vendor verdict is pending in production.
8. Marketplace listings are demo-seeded; phones masked.
9. Analytics mixes seeded demo events (`demo:true`) with live session events — labelled separately.
