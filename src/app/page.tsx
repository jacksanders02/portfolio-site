"use client";
import CentredMain from "@/components/centred-main";
import React from "react";
import { motion } from "framer-motion";
import { fontSerif, fontSans } from "@/helpers/font-helpers";

export default function Home(): React.ReactNode {
  return (
    <CentredMain>
      <div>
        <motion.div
          initial={{ y: 100, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <h1 className={`${fontSerif.className} text-9xl text-center mb-2`}>
            Jack Sanders
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className={`${fontSans.className} text-xl text-center`}>
            Student of computer science, hobbyist full-stack software engineer
          </h2>
        </motion.div>
      </div>

      <div className="oval bg-accent dark:bg-accent-dark"></div>
    </CentredMain>
  );
}
