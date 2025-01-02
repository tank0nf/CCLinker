import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import LinkManager from './LinkManager';
import Analytics from './Analytics';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="links/*" element={<LinkManager />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}