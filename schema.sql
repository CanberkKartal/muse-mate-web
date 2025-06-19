-- MuseMate Database Schema
-- Run this script in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core domain tables
CREATE TABLE museums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  official_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  museum_id UUID NOT NULL REFERENCES museums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  floor INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE key_objects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  museum_id UUID NOT NULL REFERENCES museums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tour_sections (
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (tour_id, section_id)
);

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating updated_at columns
CREATE TRIGGER update_museums_updated_at
BEFORE UPDATE ON museums
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at
BEFORE UPDATE ON sections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_objects_updated_at
BEFORE UPDATE ON key_objects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tours_updated_at
BEFORE UPDATE ON tours
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX idx_sections_museum_id ON sections(museum_id);
CREATE INDEX idx_key_objects_section_id ON key_objects(section_id);
CREATE INDEX idx_tours_user_id ON tours(user_id);
CREATE INDEX idx_tours_museum_id ON tours(museum_id);
CREATE INDEX idx_tour_sections_tour_id ON tour_sections(tour_id);
CREATE INDEX idx_tour_sections_section_id ON tour_sections(section_id);

-- Row Level Security (RLS) policies
ALTER TABLE museums ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_sections ENABLE ROW LEVEL SECURITY;

-- Public read access for museums, sections, and key_objects
CREATE POLICY "Museums are viewable by everyone" ON museums
  FOR SELECT USING (true);

CREATE POLICY "Sections are viewable by everyone" ON sections
  FOR SELECT USING (true);

CREATE POLICY "Key objects are viewable by everyone" ON key_objects
  FOR SELECT USING (true);

-- Tours are only accessible by the user who created them
CREATE POLICY "Users can view their own tours" ON tours
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tours" ON tours
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tours" ON tours
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tours" ON tours
  FOR DELETE USING (auth.uid() = user_id);

-- Tour sections follow the same policy as tours
CREATE POLICY "Users can view their own tour sections" ON tour_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tours 
      WHERE tours.id = tour_sections.tour_id 
      AND tours.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own tour sections" ON tour_sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM tours 
      WHERE tours.id = tour_sections.tour_id 
      AND tours.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own tour sections" ON tour_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM tours 
      WHERE tours.id = tour_sections.tour_id 
      AND tours.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own tour sections" ON tour_sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM tours 
      WHERE tours.id = tour_sections.tour_id 
      AND tours.user_id = auth.uid()
    )
  );