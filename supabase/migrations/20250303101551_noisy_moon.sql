/*
  # Create pages table

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, not null, unique)
      - `content` (text)
      - `status` (text, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `pages` table
    - Add policies for authenticated users to manage pages
    - Add policies for anonymous users to read published pages
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to read published pages
CREATE POLICY "Anyone can read published pages"
  ON pages
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Policy for authenticated users to manage pages
CREATE POLICY "Authenticated users can insert pages"
  ON pages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages"
  ON pages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages"
  ON pages
  FOR DELETE
  TO authenticated
  USING (true);