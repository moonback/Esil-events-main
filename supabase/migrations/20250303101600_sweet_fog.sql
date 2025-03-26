/*
  # Create quote requests table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key)
      - `first_name` (text, not null)
      - `last_name` (text, not null)
      - `company` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `event_date` (date, not null)
      - `event_duration` (text, not null)
      - `description` (text, not null)
      - `items` (jsonb, not null)
      - `status` (text, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `quote_requests` table
    - Add policies for anonymous users to insert quote requests
    - Add policies for authenticated users to manage quote requests
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_date date NOT NULL,
  event_duration text NOT NULL,
  description text NOT NULL,
  items jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to insert quote requests
CREATE POLICY "Anyone can insert quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for authenticated users to manage quote requests
CREATE POLICY "Authenticated users can read quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update quote requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quote requests"
  ON quote_requests
  FOR DELETE
  TO authenticated
  USING (true);