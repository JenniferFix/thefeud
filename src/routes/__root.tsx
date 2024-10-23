import * as React from 'react';
import '@/components/globals.css';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import Providers from '@/components/providers/Providers';
import Devtools from '@/components/providers/Devtools';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <Outlet />
      <Devtools />
      <Toaster />
    </Providers>
  );
}
