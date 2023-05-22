import { createNoise2D, NoiseFunction2D } from "simplex-noise";

export type Point = {
  x: number;
  y: number;

  originX: number;
  originY: number;

  noiseX: number;
  noiseY: number;

  range: number;
};

export function genPoints(svgWidth: number, svgHeight: number): Point[] {
  let points: Point[] = [];

  const nPoints: number = 8;
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

export function nextPointStep(point: Point): { x: number; y: number } {
  const noiseVal = noiseGen(point.noiseX, point.noiseY); // Between -1 and 1

  const newX = point.originX + noiseVal * point.range;
  const newY = point.originY + noiseVal * point.range;

  return { x: newX, y: newY };
}

const noiseGen: NoiseFunction2D = createNoise2D();
