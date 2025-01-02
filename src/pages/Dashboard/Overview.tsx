import React from 'react';
import { useLinks } from '../../hooks/useLinks';
import StatsCard from '../../components/StatsCard';

export default function Overview() {
  const { links, totalClicks, activeLinks } = useLinks();

  const stats = [
    { name: 'Total Links', value: links.length },
    { name: 'Active Links', value: activeLinks },
    { name: 'Total Clicks', value: totalClicks },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.name} {...stat} />
        ))}
      </div>
    </div>
  );
}