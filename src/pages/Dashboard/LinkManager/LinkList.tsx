import { useState, useEffect } from 'react';
import { useLinks } from '../../../hooks/useLinks';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function LinkList() {
  const { links, loading, refetch } = useLinks();
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('links')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'links' }, () => {
        refetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Link deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const downloadQR = (shortId: string) => {
    const canvas = document.getElementById(`qr-${shortId}`) as HTMLCanvasElement;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-${shortId}.png`;
    link.href = url;
    link.click();
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Your Links</h3>
        <div className="space-y-6">
          {links.map((link) => (
            <div key={link.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {new URL(link.original_url).hostname}
                    </h4>
                    <p className="text-sm text-gray-500 break-all">{link.original_url}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Short URL</p>
                      <a
                        href={`${window.location.origin}/r/${link.short_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        {window.location.origin}/r/{link.short_id}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created</p>
                      <p className="text-sm text-gray-900">
                        {format(new Date(link.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                      <p className="text-sm text-gray-900">{link.access_count}</p>
                    </div>
                    {link.max_access && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Click Limit</p>
                        <p className="text-sm text-gray-900">{link.max_access}</p>
                      </div>
                    )}
                    {link.expires_at && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Expires</p>
                        <p className="text-sm text-gray-900">
                          {format(new Date(link.expires_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { date: link.created_at, clicks: 0 },
                          { date: new Date().toISOString(), clicks: link.access_count }
                        ]}
                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) => format(new Date(date), 'MMM d')}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setSelectedQR(link.short_id)}
                  >
                    <QRCodeSVG
                      id={`qr-${link.short_id}`}
                      value={`${window.location.origin}/r/${link.short_id}`}
                      size={96}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadQR(link.short_id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <span className="material-icons">Download</span>
                      QR
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <span className="material-icons">Delete</span>
                      Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSelectedQR(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <QRCodeSVG
                value={`${window.location.origin}/r/${selectedQR}`}
                size={256}
              />
              <button
                onClick={() => {
                  downloadQR(selectedQR);
                  setSelectedQR(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <span className="material-icons">Download</span>
                QR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
