// app/providers.jsx

"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import {ParallaxProvider} from "react-scroll-parallax";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ParallaxProvider>
        {children}
      </ParallaxProvider>
    </ThemeProvider>
  );
}
