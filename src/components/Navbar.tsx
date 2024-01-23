import React from "react";
import Socials from "./Socials";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar(): React.ReactElement {
  return (
    <nav
      className="fixed w-full top-0 px-8 py-4 flex justify-between items-center z-50 border-b-2 border-b-on-background
                    dark:border-b-on-background-dark
                    bg-colour-background dark:bg-colour-background-dark "
    >
      <Socials />
      <ThemeToggle />
    </nav>
  );
}
