"use client"

import React from "react";
import { motion } from "framer-motion";

export default class ExpandButton extends React.Component {
  state = {
    open: false
  }

  variants = {
    open: {
      rotate: 180
    },

    closed: {
      rotate: 0
    },
  };

  descVariants = {
    open: {
      display: "block"
    },

    closed: {
      display: "none"
    },
  };

  toggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    // @ts-ignore
    const { moduleDescription } = this.props;
    return (
      <>
        <motion.svg
          viewBox={`0 0 8 7`}
          overflow="visible"
          preserveAspectRatio="none"
          className={'w-5 h-3'}
          variants={this.variants}
          animate={this.state.open ? "open" : "closed"}
        >
          <line
            x1="0"
            x2="4"
            y1="0"
            y2="7"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="8"
            x2="4"
            y1="0"
            y2="7"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>
        <motion.p
          className={'col-span-3 overflow-hidden text-center lg:text-left'}
          dangerouslySetInnerHTML={{ __html: moduleDescription }}
          variants={this.descVariants}
          animate={this.state.open ? "open" : "closed"}
          initial={"closed"}
        />
      </>
    )
  }
}