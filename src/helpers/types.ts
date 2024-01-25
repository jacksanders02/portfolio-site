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
 * Project type, used to store details about one of my projects
 */
export type Project = {
  imageURL: string;
  alt: string;
  title: string;
  keyTechnologies: string[];
  briefDescription: string;
  date?: string;
  writeupLink?: string;
  demoLink?: string;
  githubLink?: string;
};

/**
 * Module type, used to store details about one of my modules
 */
export type Module = {
  name: string;
  description: string;
  grade: string;
  year: number;
};

/**
 * Coordinate type, used in the maze generator
 */
export type Coordinate = [number, number];
