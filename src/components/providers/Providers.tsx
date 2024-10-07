'use client';
import React from 'react';
import ReactQueryClientProvider from './ReactQueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryClientProvider>{children}</ReactQueryClientProvider>;
};

export default Providers;
