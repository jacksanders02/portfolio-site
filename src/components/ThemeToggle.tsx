"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [dataTheme, setDataTheme] = React.useState<string>("dark");

  useEffect(() => {
    setMounted(true);
    // Detect system theme, and set initial theme accordingly
    let isDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Only update if html element doesn't have a theme class already
    // Prevents theme changing back to default on page change
    let htmlClasses = document.getElementsByTagName("html")[0].classList

    // Set data theme to default, so theme toggle position matches actual theme
    if (htmlClasses.contains("light")) {
      setDataTheme("light");
    } else if(htmlClasses.contains("dark")) {
      setDataTheme("dark");
    } else {
      setTheme(isDark.matches ? "dark" : "light");
      setDataTheme(isDark.matches ? "dark" : "light");
    }
  }, [setTheme]);

  function handleClick() {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark");
      setDataTheme(theme === "dark" ? "light" : "dark");
    }
  }

  return (
    <div
      className={
        "theme-switch bg-colour-background-dark dark:bg-colour-background relative isolate pointer-events-auto"
      }
      data-theme={dataTheme}
      onClick={handleClick}
    >
      <div
        className={`w-full absolute left-0 pe-[8px] ps-[8px] flex justify-between items-center z-10 text-sm
                        text-colour-background dark:text-colour-background-dark`}
      >
        <i className="bi bi-sun-fill" />
        <i className="bi bi-moon-fill" />
      </div>
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className={`bg-colour-background dark:bg-colour-background-dark z-20`}
      />
    </div>
  );
}
