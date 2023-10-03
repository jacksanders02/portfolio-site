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
 * Technology type to support the Project type
 */
export type Technology = {
  name: string;
  iconURL: string;
  alt: string;
};

/**
 * Project type, used to store details about one of my projects
 */
export type Project = {
  imageURL: string;
  alt: string;
  title: string;
  caption?: string;
  keyTechnologies: Technology[];
  briefDescription: string;
  writeupLink?: string;
  demoLink?: string;
  githubLink?: string;
};
