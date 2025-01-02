import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AccessLog } from '../types';
import { format, startOfDay } from 'date-fns';

interface ClicksByDate {
  date: string;
  clicks: number;
}

export function useAccessLogs() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('access_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const clicksByDate = logs.reduce<ClicksByDate[]>((acc, log) => {
    const date = format(startOfDay(new Date(log.created_at)), 'yyyy-MM-dd');
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.clicks += 1;
    } else {
      acc.push({ date, clicks: 1 });
    }
    
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));

  return {
    logs,
    loading,
    error,
    clicksByDate,
    refetch: fetchLogs,
  };
}