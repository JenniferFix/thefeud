'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactQueryClientProvider from './ReactQueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </ReactQueryClientProvider>
  );
};

export default Providers;
