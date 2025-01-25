import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { generateShortId } from '../../../utils/linkUtils';

const schema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  expiresAt: z.string().optional(),
  maxAccess: z.string().optional(),
  secretWord: z.string().optional(),
  whitelist: z.string().optional(),
  useDecoy: z.boolean().optional(),
});

type CreateLinkForm = z.infer<typeof schema>;

export default function CreateLink() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<CreateLinkForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      useDecoy: false,
    }
  });

  const useDecoy = watch('useDecoy');

  const onSubmit = async (data: CreateLinkForm) => {
    try {
      const shortId = await generateShortId();
      const { error } = await supabase.from('links').insert({
        user_id: user?.id,
        original_url: data.originalUrl,
        short_id: shortId,
        secret_word: data.secretWord || null,
        whitelist: data.whitelist ? data.whitelist.split(',').map(email => email.trim()) : null,
        max_access: data.maxAccess ? parseInt(data.maxAccess) : null,
        expires_at: data.expiresAt || null,
        use_decoy: data.useDecoy || false,
        decoy_type: data.useDecoy ? 'youtube' : null,
        decoy_passphrase: data.secretWord || null, // Use the same secret word as decoy passphrase
      });

      if (error) throw error;
      
      toast.success('Link created successfully');
      reset();
    } catch (error) {
      toast.error('Failed to create link');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Link</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original URL
          </label>
          <input
            {...register('originalUrl')}
            type="url"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="https://example.com"
          />
          {errors.originalUrl && (
            <p className="mt-2 text-sm text-red-600">{errors.originalUrl.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expires At
            </label>
            <input
              {...register('expiresAt')}
              type="datetime-local"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Access Count
            </label>
            <input
              {...register('maxAccess')}
              type="number"
              min="1"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Unlimited if empty"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secret Word {useDecoy && <span className="text-gray-500">(Will also be used as decoy passphrase)</span>}
          </label>
          <input
            {...register('secretWord')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Optional secret word for access"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Whitelist
          </label>
          <input
            {...register('whitelist')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Comma-separated email addresses"
          />
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
          <input
            {...register('useDecoy')}
            type="checkbox"
            id="useDecoy"
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition"
          />
          <div>
            <label htmlFor="useDecoy" className="text-sm font-medium text-gray-900">
              Enable YouTube Decoy Page
            </label>
            <p className="text-sm text-gray-500">
              Redirect users to a YouTube-like page. They must enter the secret word in the search bar to access the real URL.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Link'}
        </button>
      </form>
    </div>
  );
}