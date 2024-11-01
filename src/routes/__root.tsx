import * as React from 'react';
import '@/components/globals.css';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import Devtools from '@/components/providers/Devtools';
import { Toaster } from '@/components/ui/sonner';
import type { AuthContext } from '@/supabaseauth';
import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  auth: AuthContext | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Devtools />
      <Toaster />
    </React.Fragment>
  );
}
