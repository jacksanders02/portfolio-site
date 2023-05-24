"use client";
import React, { useEffect } from "react";

/**
 * Creates a small button, indicating to the user that there is more content
 * further down the page.
 * @constructor
 */
export default function ScrollIndicator(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClick() {
    if (mounted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  return (
    <i
      className="bi bi-arrow-down-circle-fill hover-link dark:hover-link-dark
                  text-5xl"
      onClick={handleClick}
    />
  );
}
