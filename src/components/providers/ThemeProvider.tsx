"use client";
import { Theme } from "react-daisyui";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <Theme dataTheme="aqua">{children}</Theme>;
};

export default ThemeProvider;
