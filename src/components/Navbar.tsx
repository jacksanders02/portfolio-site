"use client"
import React from "react";
import Socials from "./Socials";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar(): React.ReactElement {
  return (
    <nav
      className="fixed w-full top-0 p-8 flex justify-between items-center z-50 border-b-2 border-b-on-background
                    dark:border-b-on-background-dark md:border-none md:pointer-events-none
                    bg-colour-background dark:bg-colour-background-dark md:bg-transparent md:dark:bg-transparent"
    >
      <Socials />
      <ThemeToggle />
    </nav>
  );
}
