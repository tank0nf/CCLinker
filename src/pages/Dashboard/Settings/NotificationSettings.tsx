import React from 'react';
import { useForm } from 'react-hook-form';

export default function NotificationSettings() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailNotifications: true,
      accessAlerts: true,
      weeklyReport: false,
    },
  });

  const onSubmit = async (data: any) => {
    // TODO: Implement notification settings update
    console.log(data);
  };

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('emailNotifications')}
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Email Notifications</label>
                <p className="text-gray-500">Receive notifications about link access and updates.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('accessAlerts')}
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Access Alerts</label>
                <p className="text-gray-500">Get notified when someone accesses your links.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('weeklyReport')}
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Weekly Report</label>
                <p className="text-gray-500">Receive weekly analytics report for your links.</p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}