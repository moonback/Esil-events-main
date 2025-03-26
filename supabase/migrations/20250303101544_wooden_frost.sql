/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `reference` (text, not null)
      - `category` (text, not null)
      - `description` (text)
      - `price_ht` (numeric, not null)
      - `price_ttc` (numeric, not null)
      - `images` (text array)
      - `colors` (text array)
      - `technical_specs` (jsonb)
      - `technical_doc_url` (text)
      - `video_url` (text)
      - `related_products` (text array)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `products` table
    - Add policies for authenticated users to manage products
    - Add policies for anonymous users to read products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  reference text NOT NULL,
  category text NOT NULL,
  description text,
  price_ht numeric NOT NULL,
  price_ttc numeric NOT NULL,
  images text[],
  colors text[],
  technical_specs jsonb,
  technical_doc_url text,
  video_url text,
  related_products text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to read products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon
  USING (true);

-- Policy for authenticated users to manage products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);