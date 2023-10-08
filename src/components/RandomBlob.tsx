import React, { useEffect, useRef } from "react";
import { genPoints, nextPointStep } from "@/helpers/noisyCircle";
import { spline } from "@georgedoescode/spline";
import { Point } from "@/helpers/types";

/**
 * Creates a random blob svg, using simplex noise & Catmull-Rom splines
 * Adapted from: https://georgefrancis.dev/writing/build-a-smooth-animated-blob-with-svg-and-js/
 * @param svgWidth {number} the width of the SVG's bounding box
 * @param svgHeight {number} the height of the SVG's bounding box
 * @param baseNoiseStep {number} the initial 'speed' of the animation (smaller = slower)
 * @param className {string} any classes to apply to the SVG
 * @constructor
 */
export default function RandomBlob({
  svgWidth,
  svgHeight,
  baseNoiseStep,
  className,
}: {
  svgWidth: number;
  svgHeight: number;
  baseNoiseStep: number;
  className?: string;
}): React.ReactElement {
  // Store a reference to the path element
  const blobPathRef: React.Ref<SVGPathElement> = useRef<SVGPathElement>(null);

  // Initialise the points
  const points: Point[] = genPoints(200, 200);

  // Higher number = faster movement
  let noiseStep: number = baseNoiseStep;

  useEffect(() => {
    let prevFrame: number;
    // Run animation function infinitely when rendered
    function animate(
      elem: SVGPathElement,
      timestamp: number,
      req: (time: number) => void
    ) {
      if (typeof prevFrame === "undefined") {
        prevFrame = timestamp;
      }

      let sinceLastFrame: number = (timestamp - prevFrame) / 1000;

      // Use 'spline' method of @georgedoescode/spline to create a Catmull-Rom
      // spline joining all points
      elem.setAttribute("d", spline(points, 1, true));

      for (let point of points) {
        const newCoords: { x: number; y: number } = nextPointStep(point);
        point.x = newCoords.x;
        point.y = newCoords.y;
        point.noiseX += noiseStep * sinceLastFrame;
        point.noiseY += noiseStep * sinceLastFrame;
      }

      prevFrame = timestamp;
      requestAnimationFrame(req);
    }

    if (blobPathRef.current === null) {
      return;
    }

    const elem: SVGPathElement = blobPathRef.current;

    const animateRequest = (timestamp: number) =>
      animate(elem, timestamp, animateRequest);
    requestAnimationFrame(animateRequest);
  }, [noiseStep, points]);

  // Returns an svg containing the animated path.
  // Animation will speed up on hover
  return (
    <div>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={`overflow-visible ${className}`}>
        <defs>
          <filter id={"blur1"} x={"-50%"} y={"-50%"} width={"200%"} height={"200%"}>
            <feGaussianBlur in={"SourceGraphic"} stdDeviation={15} />
          </filter>
          <filter id={"blur2"} x={"-50%"} y={"-50%"} width={"200%"} height={"200%"}>
            <feGaussianBlur in={"SourceGraphic"} stdDeviation={15} />
          </filter>
          <filter id={"blur3"} x={"-50%"} y={"-50%"} width={"200%"} height={"200%"}>
            <feGaussianBlur in={"SourceGraphic"} stdDeviation={20} />
          </filter>
          <filter id={"blur4"} x={"-50%"} y={"-50%"} width={"200%"} height={"200%"}>
            <feGaussianBlur in={"SourceGraphic"} stdDeviation={25} />
          </filter>
          <filter id={"blur5"} x={"-50%"} y={"-50%"} width={"200%"} height={"200%"}>
            <feGaussianBlur in={"SourceGraphic"} stdDeviation={30} />
          </filter>
        </defs>
        <path
          ref={blobPathRef}
          d=""
          onMouseEnter={(): number => (noiseStep = baseNoiseStep * 2)}
          onMouseLeave={(): number => (noiseStep = baseNoiseStep)}
          className={"overflow-visible"}
        ></path>
      </svg>
    </div>
  );
}
