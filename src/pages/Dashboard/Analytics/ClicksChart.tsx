import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAccessLogs } from '../../../hooks/useAccessLogs';
import { format } from 'date-fns';

export default function ClicksChart() {
  const { clicksByDate } = useAccessLogs();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-6">Clicks Over Time</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clicksByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke="#3B82F6" 
              fill="#93C5FD" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}