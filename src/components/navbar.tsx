import React from "react";
import Socials from "./socials";
import ThemeToggle from "@/components/themeToggle";

export default function Navbar(): React.ReactElement {
  return (
    <div className="fixed w-full top-0 p-8 flex justify-between items-center">
      <Socials />
      <ThemeToggle />
    </div>
  );
}
