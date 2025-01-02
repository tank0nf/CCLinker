import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type ProfileForm = z.infer<typeof schema>;

export default function ProfileSettings() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const { error } = await supabase.auth.updateUser({ email: data.email });
      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}