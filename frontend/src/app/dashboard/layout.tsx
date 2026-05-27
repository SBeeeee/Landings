'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import PrivateRoute from '@/utils/PrivateRoute';
import Button from '@/components/ui/Button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const navItemClass = (active: boolean) =>
    [
      'block rounded-lg px-3 py-2 text-sm transition-colors',
      active ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/8 hover:text-white',
    ].join(' ');

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-950 text-white md:flex">
        <aside className="w-full border-b border-white/10 bg-gray-950/90 p-4 md:min-h-screen md:w-80 md:border-b-0 md:border-r md:p-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">Logged in as</p>
            <p className="mt-2 text-lg font-semibold text-white">{user?.username}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <nav className="mt-6 space-y-2">
            <Link href="/dashboard" className={navItemClass(pathname === '/dashboard')}>
              Overview
            </Link>
            <Link
              href="/dashboard/setup"
              className={navItemClass(pathname === '/dashboard/setup')}
            >
              Business Setup
            </Link>
          </nav>

          <div className="mt-6 md:mt-auto md:pt-6">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-10">{children}</main>
      </div>
    </PrivateRoute>
  );
}
