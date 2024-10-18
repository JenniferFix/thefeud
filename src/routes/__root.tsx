import * as React from 'react';
import '@/components/globals.css';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/store';
import useSupabase from '@/hooks/useSupabase';
import Providers from '@/components/providers/Providers';
import Devtools from '@/components/providers/Devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const supabase = useSupabase();
  const updateSession = useAuthStore((state) => state.updateSession);
  const updateUser = useAuthStore((state) => state.updateUser);
  const session = useAuthStore((state) => state.session);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    supabase.auth.getUser().then((value) => updateUser(value?.data.user));
  }, [session]);

  return (
    <Providers>
      <Outlet />
      <Devtools />
    </Providers>
  );
}
