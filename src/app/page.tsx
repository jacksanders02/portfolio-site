"use client";
import CentredMain from "@/components/centred-main";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { toggleTheme } from "@/helpers/global-functions";

export default function Home(): React.ReactNode {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) { return null; }

  return (
    <CentredMain>
      <h1 onClick={() => setTheme(toggleTheme(theme))}>Home Page!</h1>
    </CentredMain>
  );
}
