'use client';

import PrivateRoute from '@/utils/PrivateRoute';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-8 flex flex-col gap-2">
          <p className="text-gray-400 text-sm">Username</p>
          <p className="text-white font-semibold">{user?.username}</p>
          <p className="text-gray-400 text-sm mt-3">Email</p>
          <p className="text-white font-semibold">{user?.email}</p>
        </div>
      </div>
    </PrivateRoute>
  );
}
