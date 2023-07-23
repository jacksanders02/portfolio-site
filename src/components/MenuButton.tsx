import React, { MouseEventHandler } from "react";
import { motion } from 'framer-motion';

export default function MenuButton({
  clickAction,
  menuOpenState,
  className
}: {
  clickAction: MouseEventHandler<HTMLElement>;
  menuOpenState: boolean;
  className?: string;
}): React.ReactElement {

  const topVariants = {
    open: {
      rotate: 45,
      translateY: 2
    },

    closed: {
      rotate: 0,
      translateY: 0
    }
  }

  const midVariants = {
    open: {
      opacity: 0,
      translateX: -2
    },

    closed: {
      opacity: 1,
      translateX: 0
    }
  }

  const lowVariants = {
    open: {
      rotate: -45,
      translateY: -2
    },

    closed: {
      rotate: 0,
      translateY: 0
    }
  }

  return (
    <motion.svg
      viewBox={`0 0 4 4`}
      overflow="visible"
      preserveAspectRatio="none"
      onClick={clickAction}
      className={className}
    >
      <motion.line
        x1="0"
        x2="4"
        y1="0"
        y2="0"
        variants={topVariants}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        animate={menuOpenState ? "open" : "closed"}
      />
      <motion.line
        x1="0"
        x2="4"
        y1="2"
        y2="2"
        variants={midVariants}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        animate={menuOpenState ? "open" : "closed"}
      />
      <motion.line
        x1="0"
        x2="4"
        y1="4"
        y2="4"
        variants={lowVariants}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        animate={menuOpenState ? "open" : "closed"}
      />
    </motion.svg>
    // <i className="bi bi-list hover-link dark:hover-link-dark cursor-pointer"
    //    onClick={clickAction}
    // />
  )
}