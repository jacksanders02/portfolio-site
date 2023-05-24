/**
 * Contains helper functions to create the blob in @components/RandomBlob.tsx
 */

import { createNoise2D, NoiseFunction2D } from "simplex-noise";

/**
 * Point type, used to store the array of points that make up the blob
 */
export type Point = {
  x: number;
  y: number;

  originX: number;
  originY: number;

  noiseX: number;
  noiseY: number;

  range: number;
};

/**
 * Generates an initial set of 8 points, within a given bounding box.
 * @param svgWidth {number} the width of the SVG bounding box
 * @param svgHeight {number} the height of the SVG bounding box
 */
export function genPoints(svgWidth: number, svgHeight: number): Point[] {
  let points: Point[] = [];

  const nPoints: number = 8;

  // Set radius such that it will create a circle that always fits within the
  // SVG, no matter the dimensions
  const r: number = Math.min(svgWidth / 2 - 15, svgHeight / 2 - 15);
  const step: number = (Math.PI * 2) / nPoints;

  for (let i: number = 0; i < nPoints; i++) {
    const theta: number = step * i;

    const x: number = svgWidth / 2 + Math.cos(theta) * r;
    const y: number = svgHeight / 2 + Math.sin(theta) * r;

    points.push({
      x: x,
      y: y,

      originX: x,
      originY: y,

      noiseX: Math.random() * 1000,
      noiseY: Math.random() * 1000,

      range: Math.min(svgWidth / 10, svgHeight / 10),
    });
  }

  return points;
}

/**
 * Calculates the next coordinates of a point, given its 'noise coordinates'
 * @param point {Point} the point to get the simplex noise value of
 */
export function nextPointStep(point: Point): { x: number; y: number } {
  const noiseVal = noiseGen(point.noiseX, point.noiseY); // Between -1 and 1

  // Map noise output to be within the acceptable range of the origin
  const newX = point.originX + noiseVal * point.range;
  const newY = point.originY + noiseVal * point.range;

  return { x: newX, y: newY };
}

// Used to generate noise values
const noiseGen: NoiseFunction2D = createNoise2D();
