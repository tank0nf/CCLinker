import React from 'react';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

export default function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="space-y-6">
        <ProfileSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}