-- ═══════════════════════════════════════════════════════════════
-- Portfolio CMS Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ═══════════════════════════════════════════════════════════════

-- Site Config (single row)
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  year TEXT NOT NULL,
  location TEXT NOT NULL,
  timezone TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cal_link TEXT NOT NULL,
  resume_link TEXT NOT NULL,
  available_date TEXT NOT NULL,
  address TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bio (single row)
CREATE TABLE bio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intro TEXT NOT NULL,
  current_text TEXT NOT NULL,
  award TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social Links
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Nav Links
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0
);

-- Stats
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  start_val INT NOT NULL DEFAULT 0,
  end_val INT NOT NULL,
  suffix TEXT NOT NULL DEFAULT '',
  breakdown JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  description TEXT,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  image TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0
);

-- Brand Logos
CREATE TABLE brand_logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  src TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Feature Flags
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read" ON bio FOR SELECT USING (true);
CREATE POLICY "Public read" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public read" ON nav_links FOR SELECT USING (true);
CREATE POLICY "Public read" ON services FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON brand_logos FOR SELECT USING (true);
CREATE POLICY "Public read" ON feature_flags FOR SELECT USING (true);

-- Authenticated full access for all tables
CREATE POLICY "Auth full access" ON site_config FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON bio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON nav_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON brand_logos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON feature_flags FOR ALL USING (auth.role() = 'authenticated');
