import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from '../types';

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select(`
          *,
          access_logs (
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();

    // Set up real-time subscription
    const subscription = supabase
      .channel('links_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'links' 
        }, 
        () => {
          fetchLinks();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const totalClicks = links.reduce((sum, link) => sum + link.access_count, 0);
  const activeLinks = links.filter(link => {
    if (!link.expires_at) return true;
    return new Date(link.expires_at) > new Date();
  }).length;

  return {
    links,
    loading,
    error,
    totalClicks,
    activeLinks,
    refetch: fetchLinks,
  };
}