"use client";
import React from "react";
import { Theme } from "react-daisyui";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <Theme dataTheme="aqua">{children}</Theme>
    </RecoilRoot>
  );
};

export default Providers;
