import React from 'react';
import { useLinks } from '../../../hooks/useLinks';
import StatsCard from '../../../components/StatsCard';

export default function AnalyticsOverview() {
  const { links, totalClicks, activeLinks } = useLinks();
  
  const stats = [
    { name: 'Total Links', value: links.length },
    { name: 'Active Links', value: activeLinks },
    { name: 'Total Clicks', value: totalClicks },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}