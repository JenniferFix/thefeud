import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Navbar from '@/components/header/Navbar';

export const Route = createFileRoute('/_navbar-layout')({
  component: NavigationLayout,
});

function NavigationLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="h-full">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
