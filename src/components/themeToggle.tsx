"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only generate HTML if mounted by client, so that theme change can work
  if (!mounted) {
    return <i className="bi bi-sun-fill" />;
  }

  return (
    <div className={"flex items-center gap-6 text-3xl"}>
      <i
        className="bi bi-sun-fill hover-link dark:hover-link-dark"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
}
