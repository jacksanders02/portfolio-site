import React from "react";
import Socials from "./Socials";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar(): React.ReactElement {
  return (
    <div className="fixed w-full top-0 p-8 flex justify-between items-center z-50 border-b-2 border-b-accent
                    dark:border-b-accent-dark md:border-none
                    bg-colour-background dark:bg-colour-background-dark md:bg-transparent md:dark:bg-transparent">
      <Socials />
      <ThemeToggle />
    </div>
  );
}
