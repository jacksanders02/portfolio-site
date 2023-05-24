"use client";
import React, { useEffect, useRef } from "react";

/**
 * Creates an element with variable scroll speed, to create a parallax effect
 * @param parallaxSpeed {number} the speed at which this element should scroll
 *                                where 1 = normal speed, 2 = double speed, etc.
 * @param stickToTop {boolean} whether the element should stick to the top of
 *                             the screen
 * @param className {string} (optional) any classes to apply to the element
 * @param children {React.ReactNode} any children of the element
 * @constructor
 */
export default function Parallax({
  parallaxSpeed,
  stickToTop,
  className,
  children,
}: {
  parallaxSpeed: number;
  stickToTop: boolean;
  className?: string;
  children: React.ReactNode;
}): React.ReactElement {
  const divRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const startTop: React.MutableRefObject<number> = useRef(0);
  const transformedTopChange: React.MutableRefObject<number> = useRef(0);

  className = typeof className === "undefined" ? "" : className;

  useEffect(() => {
    if (divRef.current === null) {
      return;
    }

    startTop.current =
      (divRef.current.offsetTop / document.documentElement.clientHeight) * 100;

    transformedTopChange.current =
      (divRef.current.offsetTop - divRef.current.getBoundingClientRect().top) /
      divRef.current.clientHeight;

    document.addEventListener("scroll", () => handleScroll(divRef.current));
    function handleScroll(elem: HTMLDivElement | null) {
      if (elem === null) {
        return;
      }

      let nextTop: number =
        startTop.current -
        (window.scrollY / document.documentElement.clientHeight) *
          100 *
          parallaxSpeed;

      // Transform translate amount to vh (initially stored as % of elem height)
      const translateVH: number =
        ((transformedTopChange.current * elem.clientHeight) /
          document.documentElement.clientHeight) *
        100;

      nextTop = nextTop < translateVH && stickToTop ? translateVH : nextTop;

      elem.animate(
        {
          top: `${nextTop}vh`,
        },
        { duration: 0, fill: "forwards" }
      );
    }
  }, [divRef, parallaxSpeed, stickToTop]);

  return (
    <div className={`${className}`} ref={divRef}>
      {children}
    </div>
  );
}
