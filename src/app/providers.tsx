// app/providers.jsx

"use client";

import { ThemeProvider } from "next-themes";
import { ParallaxProvider } from "react-scroll-parallax";
import React from "react";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ParallaxProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ParallaxProvider>
  );
}
