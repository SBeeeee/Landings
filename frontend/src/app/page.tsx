"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user, initialized, restoreSession, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      restoreSession();
    }
  }, [initialized, restoreSession]);

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login");
    }
  }, [initialized, user, router]);

  const handleLogout = async () => {
    await logout();
  };

  if (!initialized || (initialized && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-500/20"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background glowing orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-gray-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Landings</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
                <span className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
                <span className="hover:text-white transition-colors cursor-pointer">Analytics</span>
                <span className="hover:text-white transition-colors cursor-pointer">Settings</span>
              </div>

              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium text-white">{user.username}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-lg font-bold text-gray-300">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Sign out"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>


    </div>
  );
}