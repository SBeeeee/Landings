'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  /** Where to send unauthenticated users. Defaults to /login */
  redirectTo?: string;
}

/**
 * Wraps any page or layout that requires an authenticated session.
 *
 * Behaviour:
 *  - While the session check is in-flight (initialized === false) → renders
 *    a full-screen spinner so the protected content never flashes.
 *  - Once initialized:
 *      • logged in  → renders children normally.
 *      • not logged in → hard-replaces to `redirectTo` (no history entry,
 *        so the back button won't loop the user back to the protected page).
 *
 * No localStorage. Auth state lives entirely in the HTTP-only cookie that
 * the backend sets, and in Redux (rehydrated on mount by AuthInitializer).
 */
export default function PrivateRoute({
  children,
  redirectTo = '/login',
}: PrivateRouteProps) {
  const { isLoggedIn, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [initialized, isLoggedIn, redirectTo, router]);

  // Session check still in-flight — show nothing (or a spinner) to prevent
  // the protected UI from flashing before the redirect fires.
  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
      </div>
    );
  }

  // Initialized but not logged in — redirect is queued, render nothing
  // so the protected content never appears even for one frame.
  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
