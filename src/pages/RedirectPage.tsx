import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  secretWord: z.string().optional(),
});

type AccessForm = z.infer<typeof schema>;

export default function RedirectPage() {
  const { shortId } = useParams<{ shortId: string }>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AccessForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AccessForm) => {
    try {
      setLoading(true);
      
      // Get link details
      const { data: link, error: linkError } = await supabase
        .from('links')
        .select('*')
        .eq('short_id', shortId)
        .single();

      if (linkError) throw linkError;

      // Validate access
      if (link.whitelist && !link.whitelist.includes(data.email)) {
        throw new Error('Email not in whitelist');
      }

      if (link.secret_word && link.secret_word !== data.secretWord) {
        throw new Error('Invalid secret word');
      }

      if (link.max_access && link.access_count >= link.max_access) {
        throw new Error('Maximum access limit reached');
      }

      if (link.expires_at && new Date(link.expires_at) < new Date()) {
        throw new Error('Link has expired');
      }

      // Log access
      await supabase.from('access_logs').insert({
        link_id: link.id,
        accessed_by: `${data.name} (${data.email})`,
      });

      // Update access count
      await supabase
        .from('links')
        .update({ access_count: link.access_count + 1 })
        .eq('id', link.id);

      // Redirect to original URL
      window.location.href = link.original_url;
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Protected Link
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Secret Word (if required)
              </label>
              <input
                {...register('secretWord')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.secretWord && (
                <p className="mt-1 text-sm text-red-600">{errors.secretWord.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Verifying...' : 'Access Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}