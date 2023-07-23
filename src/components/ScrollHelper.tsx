"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Creates a small button, indicating to the user that there is more content
 * further down the page.
 * @constructor
 */
export default function ScrollHelper(): React.ReactElement {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [projects, setProjects] = React.useState<Element[]>([]);

  useEffect(() => {
    setMounted(true);
    let projectsElement = document.getElementById("projects") || {
      children: {},
    };
    setProjects(Object.values(projectsElement.children));
  }, []);

  /**
   * Scrolls window to the next project
   */
  function handleClick() {
    if (mounted) {
      let firstBottomHalf: number = window.scrollY;
      let i: number = 0;
      let navElem: Element = document.getElementsByTagName("nav")[0];

      // Find first project that is more than halfway down the viewport
      while (projects.length > i && firstBottomHalf === window.scrollY) {
        let clientY = projects[i].getBoundingClientRect().top;
        if (clientY > window.innerHeight / 2) {
          firstBottomHalf = clientY + window.scrollY - 25;
        }

        i++;
      }

      if (window.innerWidth < 768) {
        firstBottomHalf -= navElem.getBoundingClientRect().height;
      }

      window.scrollTo({ top: firstBottomHalf, behavior: "smooth" });
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className="bi bi-arrow-down-circle-fill hover-link dark:hover-link-dark
                text-5xl bg-colour-background dark:bg-colour-background-dark rounded-full"
      onClick={handleClick}
    />
  );
}
