-- Create subsubcategories table
CREATE TABLE IF NOT EXISTS subsubcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subcategory_id uuid NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(subcategory_id, slug)
);

-- Enable RLS
ALTER TABLE subsubcategories ENABLE ROW LEVEL SECURITY;

-- Policies for subsubcategories
CREATE POLICY "Allow public read access to subsubcategories"
  ON subsubcategories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage subsubcategories"
  ON subsubcategories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial subsubcategories
WITH 
  tables_id AS (SELECT id FROM subcategories WHERE slug = 'tables'),
  chaises_id AS (SELECT id FROM subcategories WHERE slug = 'chaises'),
  canapes_id AS (SELECT id FROM subcategories WHERE slug = 'canapes'),
  luminaires_id AS (SELECT id FROM subcategories WHERE slug = 'luminaires'),
  son_id AS (SELECT id FROM subcategories WHERE slug = 'son'),
  lumiere_id AS (SELECT id FROM subcategories WHERE slug = 'lumiere'),
  video_id AS (SELECT id FROM subcategories WHERE slug = 'video'),
  structure_id AS (SELECT id FROM subcategories WHERE slug = 'structure'),
  arcade_id AS (SELECT id FROM subcategories WHERE slug = 'arcade'),
  casino_id AS (SELECT id FROM subcategories WHERE slug = 'casino'),
  sport_id AS (SELECT id FROM subcategories WHERE slug = 'sport'),
  enfants_id AS (SELECT id FROM subcategories WHERE slug = 'enfants'),
  stands_id AS (SELECT id FROM subcategories WHERE slug = 'stands'),
  banderoles_id AS (SELECT id FROM subcategories WHERE slug = 'banderoles'),
  totems_id AS (SELECT id FROM subcategories WHERE slug = 'totems'),
  drapeaux_id AS (SELECT id FROM subcategories WHERE slug = 'drapeaux')
INSERT INTO subsubcategories (subcategory_id, name, slug, order_index)
SELECT tables_id.id, 'Tables rondes', 'tables-rondes', 1 FROM tables_id
UNION ALL
SELECT tables_id.id, 'Tables rectangulaires', 'tables-rectangulaires', 2 FROM tables_id
UNION ALL
SELECT chaises_id.id, 'Chaises pliantes', 'chaises-pliantes', 1 FROM chaises_id
UNION ALL
SELECT chaises_id.id, 'Chaises design', 'chaises-design', 2 FROM chaises_id
UNION ALL
SELECT canapes_id.id, 'Canapés cuir', 'canapes-cuir', 1 FROM canapes_id
UNION ALL
SELECT canapes_id.id, 'Canapés tissu', 'canapes-tissu', 2 FROM canapes_id
UNION ALL
SELECT luminaires_id.id, 'Lampes sur pied', 'lampes-sur-pied', 1 FROM luminaires_id
UNION ALL
SELECT luminaires_id.id, 'Suspensions', 'suspensions', 2 FROM luminaires_id;