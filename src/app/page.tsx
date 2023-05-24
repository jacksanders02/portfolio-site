"use client";
import React from "react";
import { motion } from "framer-motion";
import { fontSerif, fontSans } from "@/helpers/fontHelpers";
import RandomBlob from "@/components/RandomBlob";
import Parallax from "@/components/Parallax";
import ScrollHelper from "@/components/ScrollHelper";

/**
 * Index page
 * @constructor
 */
export default function Home(): React.ReactNode {
  return (
    <main>
      <div className={"w-full h-screen"} >
        <Parallax
          parallaxSpeed={1}
          stickToTop={true}
          className={`z-20 pointer-events-none fixed left-[50%] top-[50%]
                    translate-y-[-50%] translate-x-[-50%]`}
        >
          <motion.div
            initial={{ y: 100, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h1
              className={`${fontSerif.className} text-7xl sm:text-8xl lg:text-9xl text-center mb-2`}
            >
              Jack Sanders
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2
              className={`${fontSans.className} text-sm sm:text-base lg:text-xl text-center`}
            >
              Student of computer science, hobbyist full-stack software engineer
            </h2>
          </motion.div>
        </Parallax>
        <Parallax
          parallaxSpeed={2}
          stickToTop={false}
          className={`fixed left-[50%] top-[50%] translate-y-[-50%] 
                    translate-x-[-50%]`}
        >
          <RandomBlob
            svgWidth={200}
            svgHeight={200}
            baseNoiseStep={0.0075}
            className={`z-10 h-48 blur-lg sm:h-72 sm:blur-xl lg:h-96 lg:blur-2xl 
                    xl:h-[30rem] xl:blur-3xl aspect-square fill-accent 
                    dark:fill-accent-dark`}
          />
        </Parallax>
      </div>

      <div className={"w-full h-screen"} />
      <div className={"fixed bottom-0 p-8"}>
        <ScrollHelper />
      </div>
    </main>
  );
}
