'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Welcome back, {user?.username}. Start by submitting your business details.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-gray-400">Email</p>
        <p className="text-lg font-semibold text-white">{user?.email}</p>

        <Link href="/dashboard/setup" className="mt-6 inline-block">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
