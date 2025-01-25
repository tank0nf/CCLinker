import React from 'react';
import { useLinks } from '../../../hooks/useLinks';
import { useAccessLogs } from '../../../hooks/useAccessLogs';
import StatsCard from '../../../components/StatsCard';

export default function AnalyticsOverview() {
  const { links, totalClicks, activeLinks } = useLinks();
  const { logs } = useAccessLogs();
  
  // Calculate today's clicks
  const today = new Date().toISOString().split('T')[0];
  const todayClicks = logs.filter(log => 
    log.created_at.startsWith(today)
  ).length;

  const stats = [
    { name: 'Total Links', value: links.length },
    { name: 'Active Links', value: activeLinks },
    { name: 'Total Clicks', value: totalClicks },
    { name: "Today's Clicks", value: todayClicks },
    { name: 'Average Clicks per Link', value: links.length ? Math.round(totalClicks / links.length) : 0 },
    { name: 'Links Created Today', value: links.filter(link => link.created_at.startsWith(today)).length },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}