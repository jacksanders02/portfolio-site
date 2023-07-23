"use client";
import React from "react";
import dynamic from "next/dynamic";
const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});
import ExpandedSocials from "@/components/ExpandedSocials";

/**
 * Creates links to my social media accounts/about me page
 * @constructor
 */
export default function Socials(): React.ReactElement {
  return (
    <div>
      <MediaQuery maxWidth={1199}>
        <div className="flex items-center gap-6 text-3xl">
          <i className="bi bi-list hover-link dark:hover-link-dark cursor-pointer" />
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1200}>
        <ExpandedSocials />
      </MediaQuery>
    </div>
  );
}
