'use client';
import React from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="FeudTheme">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
