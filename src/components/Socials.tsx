"use client";
import React, { MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";
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

  const menubgVariants = {
    visible: {
      display: "flex",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },

    hidden: {
      display: "none",
      transition: {
        when: "afterChildren",
      },
    },
  };

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
    let display: string = (e.currentTarget.nextElementSibling as HTMLElement)
      .style.display;

    setMenuExpanded(display === "none");
  };

  const path: string = usePathname();

  return (
    <div className={`flex items-center gap-6 text-3xl`}>
      <MediaQuery maxWidth={767}>
        <MenuButton
          clickAction={handleClick}
          menuOpenState={menuExpanded}
          className={`cursor-pointer hover-link dark:hover-link-dark w-7 h-6`}
        />
        <motion.div
          className={`absolute w-full h-[150%] flex-col left-0 top-[100%] items-center`}
          data-expanded={menuExpanded}
          variants={menubgVariants}
          initial={"hidden"}
          animate={menuExpanded ? "visible" : "hidden"}
        >
          <motion.div
            className={`menu-item-left flex w-full justify-around flex-1 items-center
                        bg-colour-background dark:bg-colour-background-dark
                        border-t-2 border-b-[1px] border-on-background
                        dark:border-on-background-dark`}
            custom={0}
            variants={menuVariants}
          >
            <SocialLinks />
          </motion.div>
          <motion.div
            className={`menu-item-right flex-1 flex items-center border-b-2 w-full justify-center
                        bg-colour-background dark:bg-colour-background-dark
                        border-b-on-background dark:border-b-on-background-dark`}
            custom={1}
            variants={menuVariants}
          >
            {path === "/" ? (
              <a
                className={`hover-link dark:hover-link-dark text-lg underline`}
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
        </motion.div>
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={1199}>
        <MenuButton
          clickAction={handleClick}
          menuOpenState={menuExpanded}
          className={`cursor-pointer hover-link dark:hover-link-dark w-7 h-6`}
        />
        <motion.div
          className={`absolute flex-col gap-4 left-0 top-[100%] items-center`}
          data-expanded={menuExpanded}
          variants={menubgVariants}
          initial={"hidden"}
          animate={menuExpanded ? "visible" : "hidden"}
        >
          {SocialLinks().map((link: React.ReactElement, n: number) => (
            <motion.div
              key={`social-link-${n}`}
              className={`flex items-center justify-center ps-8 pe-8`}
              variants={tabletMenuVariants}
            >
              {link}
            </motion.div>
          ))}
          <motion.div
            className={`flex items-center justify-center`}
            variants={tabletMenuVariants}
          >
            {path === "/" ? (
              <a
                className={`hover-link dark:hover-link-dark text-lg underline`}
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
        </motion.div>
      </MediaQuery>
      <MediaQuery minWidth={1200}>
        <SocialLinks />
        <div
          className={`self-stretch border-r-2 border-on-background 
                      dark:border-on-background-dark`}
        />
        {path === "/" ? (
          <a className={`hover-link dark:hover-link-dark text-lg underline`}>
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
      </MediaQuery>
    </div>
  );
}
