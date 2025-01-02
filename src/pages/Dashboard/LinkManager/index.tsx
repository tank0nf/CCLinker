import React from 'react';
import CreateLink from './CreateLink';
import LinkList from './LinkList';

export default function LinkManager() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Link Management</h1>
      <CreateLink />
      <LinkList />
    </div>
  );
}