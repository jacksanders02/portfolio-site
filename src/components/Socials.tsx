"use client";
import React, { MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import SocialLinks from "@/components/SocialLinks";
import { motion, useAnimate } from "framer-motion";
import MenuButton from "@/components/MenuButton";
import { usePathname } from "next/navigation";
const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

/**
 * Creates links to my social media accounts/about me page
 * @constructor
 */
export default function Socials(): React.ReactElement {
  const [menuExpanded, setMenuExpanded] = React.useState<boolean>(false);

  const menuVariants = {
    visible: {
      opacity: 1,
      translateX: 0,
    },

    hidden: (i: number) => ({
      opacity: 0,
      translateX: `${100 * (-1 + (i % 2) * 2)}%`,
    }),
  };

  const tabletMenuVariants = {
    visible: {
      translateX: 0,
    },

    hidden: {
      translateX: `-110%`,
    },
  };

  const handleClick: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    setMenuExpanded(!menuExpanded);
  };

  const path: string = usePathname();

  return (
    <div className={`flex items-center gap-6 text-3xl pointer-events-auto`}>
      <MediaQuery maxWidth={849}>
        <MenuButton
          clickAction={handleClick}
          menuOpenState={menuExpanded}
          className={`cursor-pointer hover-link dark:hover-link-dark w-7 h-6`}
        />
        <motion.div
          className={`absolute w-full h-[300%] flex flex-col left-0 top-[100%] items-center pointer-events-none`}
          transition={{staggerChildren: 0.15}}
          initial={"hidden"}
          animate={menuExpanded ? "visible" : "hidden"}
        >
          <motion.div
            className={`menu-item-left flex w-full justify-around flex-1 items-center
                        bg-colour-background dark:bg-colour-background-dark
                        border-t-2 border-b-[1px] border-on-background
                        dark:border-on-background-dark pointer-events-auto`}
            custom={0}
            variants={menuVariants}
          >
            <SocialLinks />
          </motion.div>
          <motion.div
            className={`menu-item-right flex-1 flex items-center border-b-2 w-full justify-center
                        bg-colour-background dark:bg-colour-background-dark
                        border-b-on-background dark:border-b-on-background-dark pointer-events-auto`}
            custom={1}
            variants={menuVariants}
          >
            {path === "/" ? (
              <a
                className={`hover-link dark:hover-link-dark text-lg underline`}
                href={`/about-me`}
              >
                About Me
              </a>
            ) : (
              <a
                className={`hover-link dark:hover-link-dark text-lg underline`}
                href={`/`}
              >
                Main Page
              </a>
            )}
          </motion.div>
          <motion.div
            className={`menu-item-right flex-1 flex items-center border-b-2 w-full justify-center
                        bg-colour-background dark:bg-colour-background-dark
                        border-b-on-background dark:border-b-on-background-dark pointer-events-auto`}
            custom={2}
            variants={menuVariants}
          >
            {path === "/other" ? (
              <a className={`hover-link dark:hover-link-dark text-lg underline`}
                 href={`/about-me`}
              >
                About Me
              </a>
            ) : (
              <a
                className={`hover-link dark:hover-link-dark text-lg underline`}
                href={`/other`}
              >
                My Smaller Projects (Typically Webapps)
              </a>
            )}
          </motion.div>
        </motion.div>
      </MediaQuery>
      <MediaQuery minWidth={850}>
        <SocialLinks />
        <div
          className={`self-stretch border-r-2 border-on-background 
                      dark:border-on-background-dark`}
        />
        {path === "/" ? (
          <a className={`hover-link dark:hover-link-dark text-lg underline`}
             href={`/about-me`}
          >
            About Me
          </a>
        ) : (
          <a
            className={`hover-link dark:hover-link-dark text-lg underline`}
            href={`/`}
          >
            Homepage
          </a>
        )}

        <div
          className={`self-stretch border-r-2 border-on-background 
                      dark:border-on-background-dark`}
        />

        {path === "/other" ? (
          <a className={`hover-link dark:hover-link-dark text-lg underline`}
             href={`/about-me`}
          >
            About Me
          </a>
        ) : (
          <a
            className={`hover-link dark:hover-link-dark text-lg underline`}
            href={`/other`}
          >
            My Smaller Projects (Typically Webapps)
          </a>
        )}
      </MediaQuery>
    </div>
  );
}
