/*
  # Create categories and subcategories tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, not null, unique)
      - `order` (integer, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subcategories`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text, not null)
      - `slug` (text, not null)
      - `order` (integer, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage categories
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for subcategories
CREATE POLICY "Allow public read access to subcategories"
  ON subcategories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage subcategories"
  ON subcategories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data from PRODUCT_CATEGORIES
INSERT INTO categories (name, slug, order_index)
VALUES 
  ('Mobilier & Déco', 'mobilier', 1),
  ('Technique', 'technique', 2),
  ('Jeux & Animation', 'jeux', 3),
  ('Signalétique', 'signaletique', 4);

-- Insert initial subcategories
WITH mobilier_id AS (SELECT id FROM categories WHERE slug = 'mobilier'),
     technique_id AS (SELECT id FROM categories WHERE slug = 'technique'),
     jeux_id AS (SELECT id FROM categories WHERE slug = 'jeux'),
     signaletique_id AS (SELECT id FROM categories WHERE slug = 'signaletique')
INSERT INTO subcategories (category_id, name, slug, order_index)
SELECT mobilier_id.id, 'Tables', 'tables', 1 FROM mobilier_id
UNION ALL
SELECT mobilier_id.id, 'Chaises', 'chaises', 2 FROM mobilier_id
UNION ALL
SELECT mobilier_id.id, 'Canapés', 'canapes', 3 FROM mobilier_id
UNION ALL
SELECT mobilier_id.id, 'Luminaires', 'luminaires', 4 FROM mobilier_id
UNION ALL
SELECT technique_id.id, 'Sonorisation', 'son', 1 FROM technique_id
UNION ALL
SELECT technique_id.id, 'Éclairage', 'lumiere', 2 FROM technique_id
UNION ALL
SELECT technique_id.id, 'Vidéo', 'video', 3 FROM technique_id
UNION ALL
SELECT technique_id.id, 'Structure', 'structure', 4 FROM technique_id
UNION ALL
SELECT jeux_id.id, 'Jeux d''arcade', 'arcade', 1 FROM jeux_id
UNION ALL
SELECT jeux_id.id, 'Casino', 'casino', 2 FROM jeux_id
UNION ALL
SELECT jeux_id.id, 'Sport', 'sport', 3 FROM jeux_id
UNION ALL
SELECT jeux_id.id, 'Enfants', 'enfants', 4 FROM jeux_id
UNION ALL
SELECT signaletique_id.id, 'Stands', 'stands', 1 FROM signaletique_id
UNION ALL
SELECT signaletique_id.id, 'Banderoles', 'banderoles', 2 FROM signaletique_id
UNION ALL
SELECT signaletique_id.id, 'Totems', 'totems', 3 FROM signaletique_id
UNION ALL
SELECT signaletique_id.id, 'Drapeaux', 'drapeaux', 4 FROM signaletique_id; 