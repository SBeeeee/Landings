'use client';

import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import PrivateRoute from '@/utils/PrivateRoute';
import Button from '@/components/ui/Button';

const OverviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

const SetupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const navItemClass = (active: boolean) =>
    [
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
      active ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/8 hover:text-white',
      isCollapsed ? 'justify-center' : '',
    ].join(' ');

  return (
    <PrivateRoute>
      <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
        <div className="min-h-screen bg-gray-950 text-white md:flex">
        <aside
          className={`flex w-full flex-col border-b border-white/10 bg-gray-950/90 p-4 transition-all duration-300 md:min-h-screen md:border-b-0 md:border-r ${
            isCollapsed ? 'md:w-20 md:p-4' : 'md:w-80 md:p-6'
          }`}
        >
          <div className={`mb-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && <span className="font-semibold text-white">Menu</span>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </button>
          </div>

          <div
            className={`rounded-xl border border-white/10 bg-white/5 ${
              isCollapsed ? 'flex justify-center p-2' : 'p-4'
            }`}
          >
            {isCollapsed ? (
              <UserIcon />
            ) : (
              <div className="overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-gray-500">Logged in as</p>
                <p className="mt-2 text-lg font-semibold text-white truncate">{user?.username}</p>
                <p className="truncate text-sm text-gray-400">{user?.email}</p>
              </div>
            )}
          </div>

          <nav className="mt-6 space-y-2">
            <Link
              href="/dashboard"
              className={navItemClass(pathname === '/dashboard')}
              title="Overview"
            >
              <OverviewIcon />
              {!isCollapsed && <span>Overview</span>}
            </Link>
            <Link
              href="/dashboard/setup"
              className={navItemClass(pathname === '/dashboard/setup')}
              title="Business Setup"
            >
              <SetupIcon />
              {!isCollapsed && <span>Business Setup</span>}
            </Link>
          </nav>

          <div className="mt-6 md:mt-auto md:pt-6">
            <Button
              variant="ghost"
              className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
              {!isCollapsed && <span className="ml-3 truncate">Logout</span>}
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 transition-all duration-300 sm:p-6 md:p-10">{children}</main>
        </div>
      </SidebarContext.Provider>
    </PrivateRoute>
  );
}
