/*
  # Initial Schema Setup for CCLinker

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `original_url` (text)
      - `short_id` (text, unique)
      - `password` (text, nullable)
      - `secret_word` (text, nullable)
      - `whitelist` (text[], nullable)
      - `access_count` (integer)
      - `max_access` (integer, nullable)
      - `expires_at` (timestamptz, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `access_logs`
      - `id` (uuid, primary key)
      - `link_id` (uuid, foreign key to links)
      - `accessed_by` (text)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamptz)

    - `access_requests`
      - `id` (uuid, primary key)
      - `link_id` (uuid, foreign key to links)
      - `requester_name` (text)
      - `requester_email` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  original_url text NOT NULL,
  short_id text UNIQUE NOT NULL,
  password text,
  secret_word text,
  whitelist text[],
  access_count integer DEFAULT 0,
  max_access integer,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create access_logs table
CREATE TABLE IF NOT EXISTS access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES links ON DELETE CASCADE NOT NULL,
  accessed_by text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create access_requests table
CREATE TABLE IF NOT EXISTS access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES links ON DELETE CASCADE NOT NULL,
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for links table
CREATE POLICY "Users can create links"
  ON links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own links"
  ON links FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own links"
  ON links FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own links"
  ON links FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for access_logs table
CREATE POLICY "Users can view own link logs"
  ON access_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = access_logs.link_id
      AND links.user_id = auth.uid()
    )
  );

-- Create policies for access_requests table
CREATE POLICY "Users can view own link requests"
  ON access_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = access_requests.link_id
      AND links.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create access requests"
  ON access_requests FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_access_requests_updated_at
  BEFORE UPDATE ON access_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();