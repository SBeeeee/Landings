'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';
import AuthInitializer from '@/utils/AuthInitializer';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      {/* Fires GET /users/me once on mount to rehydrate the cookie session */}
      <AuthInitializer />
      {children}
    </ReduxProvider>
  );
}
