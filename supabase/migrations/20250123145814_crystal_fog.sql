/*
  # Add Decoy Page Features

  1. New Columns
    - `use_decoy` (boolean) - Whether to use a decoy page
    - `decoy_type` (text) - Type of decoy page (e.g., 'youtube')
    - `decoy_passphrase` (text) - Passphrase to access the real URL
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add use_decoy column
ALTER TABLE links ADD COLUMN IF NOT EXISTS use_decoy boolean DEFAULT false;

-- Add decoy_type column
ALTER TABLE links ADD COLUMN IF NOT EXISTS decoy_type text DEFAULT 'youtube';

-- Add decoy_passphrase column
ALTER TABLE links ADD COLUMN IF NOT EXISTS decoy_passphrase text;