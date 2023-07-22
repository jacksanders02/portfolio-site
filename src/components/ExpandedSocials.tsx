import React from "react";

export default function ExpandedSocials(): React.ReactElement {
  return (
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
        about me
      </a>
    </div>
  );
}
