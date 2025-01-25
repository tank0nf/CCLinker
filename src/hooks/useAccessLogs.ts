import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AccessLog } from '../types';
import { format, startOfDay, subDays } from 'date-fns';

interface ClicksByDate {
  date: string;
  clicks: number;
}

export function useAccessLogs() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('access_logs')
        .select('*, links(short_id, original_url)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('access_logs_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'access_logs' 
        }, 
        () => {
          fetchLogs();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Get clicks for the last 30 days
  const clicksByDate = Array.from({ length: 30 }, (_, i) => {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const clicks = logs.filter(log => 
      format(startOfDay(new Date(log.created_at)), 'yyyy-MM-dd') === date
    ).length;
    return { date, clicks };
  }).reverse();

  return {
    logs,
    loading,
    error,
    clicksByDate,
    refetch: fetchLogs,
  };
}