"use client";
import React, { useEffect, useRef } from "react";
import { genPoints, nextPointStep, Point } from "@/helpers/noisy-circle";
import { spline } from "@georgedoescode/spline";

export default function RandomBlob({
  svgWidth,
  svgHeight,
  className,
}: {
  svgWidth: number;
  svgHeight: number;
  className?: string;
}): React.ReactElement {
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
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={className}>
      <path
        ref={blobPathRef}
        d=""
        onMouseEnter={increaseNoiseStep}
        onMouseLeave={resetNoiseStep}
      ></path>
    </svg>
  );
}
