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
});

type CreateLinkForm = z.infer<typeof schema>;

export default function CreateLink() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateLinkForm>({
    resolver: zodResolver(schema),
  });

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
      });

      if (error) throw error;
      
      toast.success('Link created successfully');
      reset();
    } catch (error) {
      toast.error('Failed to create link');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-6">Create New Link</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Original URL</label>
          <input
            {...register('originalUrl')}
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com"
          />
          {errors.originalUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.originalUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expires At</label>
          <input
            {...register('expiresAt')}
            type="datetime-local"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Access Count</label>
          <input
            {...register('maxAccess')}
            type="number"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Secret Word</label>
          <input
            {...register('secretWord')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Optional secret word for access"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Whitelist</label>
          <input
            {...register('whitelist')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Comma-separated email addresses"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Link
        </button>
      </form>
    </div>
  );
}