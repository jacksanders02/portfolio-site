import React from "react";
import Socials from "./Socials";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar(): React.ReactElement {
  return (
    <nav
      className="fixed w-full top-0 p-4 pb-16 flex justify-between items-center z-50
                    bg-gradient-to-b from-55% from-colour-background dark:from-colour-background-dark"
    >
      <Socials />
      <ThemeToggle />
    </nav>
  );
}
