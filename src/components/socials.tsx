"use client";
import React, { useEffect } from "react";
import MediaQuery from "react-responsive";
import ExpandedSocials from "@/components/expandedSocials";

export default function Socials(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
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
  } else {
    return (<ExpandedSocials />)
  }
}
