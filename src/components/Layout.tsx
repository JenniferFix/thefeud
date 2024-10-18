import React from 'react';
import Providers from '@/components/providers/Providers';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Navbar from '@/components/header/Navbar';

export default function RootLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
