import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from '@/components/header/Navbar';

export default function RootLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="h-full">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
