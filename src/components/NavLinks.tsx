import React from "react";
import AboutDropdown from "@/components/AboutDropdown";

/**
 * Creates links to my social media accounts/about me page
 * @constructor
 */
export default function NavLinks(): React.ReactElement {
  return (
    <div className={`flex items-center gap-6 text-3xl pointer-events-auto`}>
      <AboutDropdown />

      <div
        className={`self-stretch border-r-2 border-on-background 
                    dark:border-on-background-dark`}
      />

      <a
        className={`hover-link dark:hover-link-dark text-lg font-bold`}
        href={`/`}
      >
        Home
      </a>
    </div>
  );
}
