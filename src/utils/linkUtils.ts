import { customAlphabet } from 'nanoid';
import { supabase } from '../lib/supabase';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

export async function generateShortId(): Promise<string> {
  while (true) {
    const shortId = nanoid();
    const { data } = await supabase
      .from('links')
      .select('id')
      .eq('short_id', shortId)
      .single();

    if (!data) return shortId;
  }
}