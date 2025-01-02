import React from 'react';
import AnalyticsOverview from './AnalyticsOverview';
import ClicksChart from './ClicksChart';
import AccessLogs from './AccessLogs';

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      <AnalyticsOverview />
      <ClicksChart />
      <AccessLogs />
    </div>
  );
}