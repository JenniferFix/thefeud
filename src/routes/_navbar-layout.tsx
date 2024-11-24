import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Navbar from '@/components/header/Navbar';

export const Route = createFileRoute('/_navbar-layout')({
  component: NavigationLayout,
});

function NavigationLayout() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
