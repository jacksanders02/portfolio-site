import React from "react";

/**
 * Creates links to my social media accounts/about me page
 * @constructor
 */
export default function SocialLinks(): React.ReactElement[] {
  return [
    <a
      className="bi bi-instagram hover-link dark:hover-link-dark"
      href="https://www.instagram.com/jacksanders02/"
      key="instagram"
      aria-label="Link to my Instagram Page"
    />,
    <a
      className="bi bi-linkedin hover-link dark:hover-link-dark"
      href="https://www.linkedin.com/in/jacksanders02/"
      key="linkedin"
      aria-label="Link to my LinkedIn Page"
    />,
    <a
      className="bi bi-github hover-link dark:hover-link-dark"
      href="https://github.com/jacksanders02"
      key="github"
      aria-label="Link to my GitHub Page"
    />,
  ];
}
