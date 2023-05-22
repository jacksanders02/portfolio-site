"use client";
import CentredMain from "@/components/centred-main";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fontSerif, fontSans } from "@/helpers/font-helpers";
import { spline } from "@georgedoescode/spline";
import { genPoints, nextPointStep, Point } from "@/helpers/noisy-circle";

export default function Home(): React.ReactNode {
  const blobPathRef: React.Ref<SVGPathElement> = useRef<SVGPathElement>(null);

  const points: Point[] = genPoints(200, 200);

  let noiseStep: number = 0.005;

  useEffect(() => {
    (function animate() {
      if (blobPathRef.current === null) {
        return;
      }

      blobPathRef.current.setAttribute("d", spline(points, 1, true));

      for (let point of points) {
        const newCoords: { x: number; y: number } = nextPointStep(point);
        point.x = newCoords.x;
        point.y = newCoords.y;
        point.noiseX += noiseStep;
        point.noiseY += noiseStep;
      }

      requestAnimationFrame(animate);
    })();
  }, [noiseStep, points]);

  function increaseNoiseStep(): void {
    noiseStep = 0.015;
  }

  function resetNoiseStep(): void {
    noiseStep = 0.0075;
  }

  return (
    <CentredMain extraClasses={"p-8"}>
      <div className={`z-20 pointer-events-none`}>
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
      </div>

      <svg
        viewBox="0 0 200 200"
        className={`absolute z-10 h-48 blur-lg sm:h-72 sm:blur-xl lg:h-96 
                        lg:blur-2xl xl:h-[30rem] xl:blur-3xl aspect-square 
                        fill-accent dark:fill-accent-dark`}
      >
        <path
          ref={blobPathRef}
          d=""
          onMouseEnter={increaseNoiseStep}
          onMouseLeave={resetNoiseStep}
        ></path>
      </svg>
    </CentredMain>
  );
}
