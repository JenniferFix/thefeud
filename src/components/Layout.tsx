import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from '@/components/header/Navbar';

export default function RootLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
