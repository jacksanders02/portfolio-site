"use client";
import React, { useEffect } from "react";
import MediaQuery from "react-responsive";

export default function Socials(): React.ReactElement {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  });

  if (mounted) {
    return (
      <div>
        <MediaQuery maxWidth={1199}>
          <div className="flex items-center gap-6 text-3xl">
            <i className="bi bi-list hover-link dark:hover-link-dark cursor-pointer" />
          </div>
        </MediaQuery>
        <MediaQuery minWidth={1200}>
          <div className="flex items-center gap-6 text-3xl">
            <a
              className="bi bi-instagram hover-link dark:hover-link-dark"
              href="https://www.instagram.com/jacksanders02/"
            />
            <a
              className="bi bi-linkedin hover-link dark:hover-link-dark"
              href="https://www.linkedin.com/in/jack-sanders-05915423a/"
            />
            <a
              className="bi bi-github hover-link dark:hover-link-dark"
              href="https://github.com/JSanders02"
            />
            <div
              className={`self-stretch border-r-2 border-on-background 
                      dark:border-on-background-dark`}
            />
            <a className={`hover-link dark:hover-link-dark text-lg underline`}>
              more about me
            </a>
          </div>
        </MediaQuery>
      </div>
    );
  }
}
