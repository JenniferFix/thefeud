"use client";
import React from "react";
import { Theme } from "react-daisyui";
import { RecoilRoot } from "recoil";
import ReactQueryClientProvider from "./ReactQueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <RecoilRoot>
        <Theme dataTheme="aqua">{children}</Theme>
      </RecoilRoot>
    </ReactQueryClientProvider>
  );
};

export default Providers;
