"use client";
import React, { useEffect, useRef } from "react";

/**
 * Creates an element with variable scroll speed, to create a parallax effect.
 * Uses 'top' style, as that is far easier to keep track of than translating the
 * element.
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
  // Set up refs used in scroll handler

  // Stores div that the parallax effect should be applied to
  const divRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Stores the y-location (in vh) that the div starts at
  const startTop: React.MutableRefObject<number> = useRef(0);

  // Stores the amount (in % of height) that the div is transformed after placement
  const transformedTopChange: React.MutableRefObject<number> = useRef(0);

  className = typeof className === "undefined" ? "" : className;

  // Set initial values of startTop and transformedTopChange when rendered
  useEffect(() => {
    if (divRef.current === null) {
      return;
    }

    // offsetTop = position before transform, clientRect().top = position after
    transformedTopChange.current =
      (divRef.current.offsetTop - divRef.current.getBoundingClientRect().top) /
      divRef.current.clientHeight;

    // Use offset as, when setting 'top' property, translate is applied after
    startTop.current =
      (divRef.current.offsetTop / document.documentElement.clientHeight) * 100;

    const scrollHandler = () => handleScroll(divRef.current)

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => window.removeEventListener("scroll", scrollHandler)

    // It's annoying to have a function down here, but for some reason if it's
    // anywhere else, ESLint throws several hundred errors about divRef
    function handleScroll(elem: HTMLDivElement | null) {
      if (elem === null) {
        return;
      }

      // Calculate all top values in vh to make responsive
      let nextTop: number =
        startTop.current -
        (window.scrollY / document.documentElement.clientHeight) *
          100 *
          parallaxSpeed;

      // Convert translate amount to vh (initially stored as % of elem height)
      const translateVH: number =
        ((transformedTopChange.current * elem.clientHeight) /
          document.documentElement.clientHeight) *
        100;

      // If user wants this element to stick to the top of the screen,
      // ensure nextTop is always greater than/equal to translateVH
      nextTop = nextTop < translateVH && stickToTop ? translateVH : nextTop;

      // Use animate rather than style.top to avoid firefox warning
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
