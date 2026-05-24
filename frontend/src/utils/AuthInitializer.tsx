'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Mounts once at the app root (inside the Redux Provider).
 * Fires GET /users/me to rehydrate the session from the HTTP-only cookie.
 * Sets auth.initialized = true regardless of success or 401, so the rest
 * of the app knows the auth check has completed.
 *
 * Renders nothing — purely a side-effect component.
 */
export default function AuthInitializer() {
  const { restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  return null;
}
