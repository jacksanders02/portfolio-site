"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { fontSerif } from "@/app/fonts";
import RandomBlob from "@/components/RandomBlob";
import { Parallax } from "react-scroll-parallax";
import ScrollHelper from "@/components/ScrollHelper";
import ProjectDisplay from "@/components/ProjectDisplay";
import MediaParallax from "@/components/MediaParallax";

/**
 * Index page
 * @constructor
 */
export default function Home(): React.ReactNode {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });
  return (
    <main>
      <div className={"w-full h-screen"}>
        <div
          className={`absolute left-[50%] top-[50%] translate-y-[-50%] 
                    translate-x-[-50%] vertical-stack-children`}
        >
          <MediaParallax>
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
                className={`text-sm sm:text-base lg:text-xl text-center`}
              >
                Student of computer science, hobbyist full-stack software
                engineer
              </h2>
            </motion.div>
          </MediaParallax>
          <Parallax className={`m-auto z-10`} speed={15} rotateZ={[0, 360]}>
            <RandomBlob
              svgWidth={200}
              svgHeight={200}
              baseNoiseStep={0.33}
              className={`h-48 blur-1 dark:blur-2
                  sm:h-72 sm:blur-2 sm:dark:blur-3
                  lg:h-96 lg:blur-3 lg:dark:blur-4
                  xl:h-[30rem] xl:blur-4 xl:dark:blur-5
                  aspect-square fill-accent dark:fill-accent-dark`}
            />
          </Parallax>
        </div>
      </div>

      <ProjectDisplay />
      <div className={"fixed bottom-0 p-8"}>
        <ScrollHelper />
      </div>
    </main>
  );
}
