"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClick() {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  }

  return (
    <div className={"flex items-center p-8 gap-6 text-3xl"}>
      <i
        className="bi bi-sun-fill hover-link dark:hover-link-dark"
        onClick={handleClick}
      />
    </div>
  );
}
