"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * AboutDropdown.tsx
 */
export default function AboutDropdown(): React.ReactNode {
  const [menuShown, setMenuShown] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const startHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMenuShown(true);
    setHovering(true);
  }

  const endHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMenuShown(false);
    setHovering(true);
  }

  const toggleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent click to hide when hovering
    if (!(hovering && menuShown)) {
      setMenuShown(!menuShown);
    }
  }

  const menuParentVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: `100%`,
    },
  }

  const menuVariants = {
    visible: {
      translateX: 0,
      transition: {
        duration: 0.25
      }
    },

    hidden: {
      translateX: `-110%`,
    },
  };

  return (
    <>
      <div
        className={`relative text-lg font-bold z-40 ${menuShown ? "text-on-background-dark" : ""} cursor-pointer
            transition-all duration-500`}
        onClick={toggleHover}
        onMouseEnter={startHover}
      >
        About
      </div>
      <motion.div
        className={`opacity-0 hover:opacity-100 fixed top-0 left-0 pt-16 pb-4 pl-4 pr-1 text-lg font-bold flex flex-col gap-4 z-30`}
        onMouseEnter={startHover}
        onMouseLeave={endHover}
        variants={menuParentVariants}
        transition={{ staggerChildren: 0.15 }}
        animate={menuShown ? "visible" : "hidden"}
      >
        <motion.a href={'/about-me'} className={`inverse-hover-link-dark w-max`} variants={menuVariants}>About Me</motion.a>
        <motion.a
          className="bi bi-instagram inverse-hover-link-dark text-3xl"
          href="https://www.instagram.com/jacksanders02/"
          key="instagram"
          aria-label="Link to my Instagram Page"
          variants={menuVariants}
        />
        <motion.a
          className="bi bi-linkedin inverse-hover-link-dark text-3xl"
          href="https://www.linkedin.com/in/jacksanders02/"
          key="linkedin"
          aria-label="Link to my LinkedIn Page"
          variants={menuVariants}
        />
        <motion.a
          className="bi bi-github inverse-hover-link-dark text-3xl"
          href="https://github.com/jacksanders02"
          key="github"
          aria-label="Link to my GitHub Page"
          variants={menuVariants}
        />
      </motion.div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen opacity-0 ${menuShown ? 'opacity-75' : 'pointer-events-none'} z-20
            bg-on-background transition-opacity duration-1000`}
      >

      </div>
    </>
  );
}