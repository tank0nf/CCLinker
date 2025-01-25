import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAccessLogs } from '../../../hooks/useAccessLogs';
import { format } from 'date-fns';

export default function ClicksChart() {
  const { clicksByDate, loading } = useAccessLogs();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-80 bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-6">Clicks Over Time (Last 30 Days)</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clicksByDate}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              formatter={(value: number) => [`${value} clicks`, 'Clicks']}
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke="#3B82F6" 
              fillOpacity={1}
              fill="url(#colorClicks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}