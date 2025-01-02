import React from 'react';
import { useLinks } from '../../../hooks/useLinks';
import { QRCodeSVG } from 'qrcode.react';

export default function LinkList() {
  const { links, loading } = useLinks();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Your Links</h3>
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Short URL: {window.location.origin}/r/{link.short_id}
                  </p>
                  <p className="text-sm text-gray-500">Original: {link.original_url}</p>
                  <p className="text-sm text-gray-500">
                    Clicks: {link.access_count}
                    {link.max_access && ` / ${link.max_access}`}
                  </p>
                  {link.expires_at && (
                    <p className="text-sm text-gray-500">
                      Expires: {new Date(link.expires_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <QRCodeSVG
                    value={`${window.location.origin}/r/${link.short_id}`}
                    size={64}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}