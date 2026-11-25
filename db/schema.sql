-- FARM.RAJ PostgreSQL migration target (production).
-- Demo runs on data/db.json with identical entity shapes.
CREATE TABLE IF NOT EXISTS schemes(
 id TEXT PRIMARY KEY, type TEXT NOT NULL, dept TEXT, category TEXT,
 name_hi TEXT, name_en TEXT, benefit_hi TEXT, benefit_en TEXT,
 eligibility JSONB, documents JSONB, deadline TEXT, apply_url TEXT,
 source TEXT, updated DATE, rules JSONB, status TEXT DEFAULT 'published',
 created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS lessons(
 id TEXT PRIMARY KEY, cat TEXT, title_hi TEXT, title_en TEXT,
 text_hi TEXT, text_en TEXT, steps_hi JSONB, steps_en JSONB,
 level TEXT, duration_min INT, status TEXT DEFAULT 'published', version INT DEFAULT 1);
CREATE TABLE IF NOT EXISTS feedback(
 id TEXT PRIMARY KEY, type TEXT, page TEXT, message TEXT, lang TEXT,
 district TEXT, contact TEXT, status TEXT DEFAULT 'new', created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS events(
 id BIGSERIAL PRIMARY KEY, ts TIMESTAMPTZ DEFAULT now(), event TEXT, page TEXT,
 lang TEXT, district TEXT, meta JSONB, is_demo BOOLEAN DEFAULT true);
CREATE TABLE IF NOT EXISTS documents(
 id TEXT PRIMARY KEY, owner_ref TEXT, filename TEXT, mime TEXT, size_bytes INT,
 doc_type TEXT, storage_key TEXT, sha256 TEXT, av_verdict TEXT, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS audit_log(
 id BIGSERIAL PRIMARY KEY, ts TIMESTAMPTZ DEFAULT now(), actor TEXT, action TEXT, detail TEXT);
CREATE TABLE IF NOT EXISTS users(
 id TEXT PRIMARY KEY, role TEXT NOT NULL, name TEXT, district TEXT, created_at TIMESTAMPTZ DEFAULT now());
