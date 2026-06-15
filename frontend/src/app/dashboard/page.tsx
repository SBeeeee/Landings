'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useBusiness } from '@/hooks/useBusiness';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const { business, fetchMyBusiness, publishBusiness, loading } = useBusiness();

  useEffect(() => {
    fetchMyBusiness();
  }, [fetchMyBusiness]);

  const handleTogglePublish = async () => {
    await publishBusiness();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Welcome back, {user?.username}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account Details</h2>
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-lg font-semibold text-white mb-6">{user?.email}</p>

          <Link href="/dashboard/setup" className="inline-block">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              {business ? 'Edit Business Details' : 'Setup Business Details'}
            </Button>
          </Link>
        </div>

        {business && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Site Status</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${business.isPublished ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
              <span className="text-lg text-white">
                {business.isPublished ? 'Published Live' : 'Draft Mode'}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleTogglePublish} 
                disabled={loading}
                className={business.isPublished ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}
              >
                {loading ? 'Updating...' : (business.isPublished ? 'Unpublish Site' : 'Publish Site')}
              </Button>
              
              {business.isPublished && (
                <Link href={`/${business.username}`} target="_blank" className="inline-block">
                  <Button variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white">
                    View Live Site
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
