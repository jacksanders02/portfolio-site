// Functions that can be used by all scripts
// Check if coordinates are equal (arr1 === arr2 checks references, not content)
import { Coordinate } from "@/helpers/types";

export function equalCoords(arr1: Coordinate, arr2: Coordinate): boolean {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

// Check if coordinates are invalid due to being out-of-bounds
export function invalidCoords(
  coords: Coordinate,
  maxCol: number,
  maxRow: number
): boolean {
  return (
    coords[0] < 0 || coords[0] >= maxRow || coords[1] < 0 || coords[1] >= maxCol
  );
}

// Returns a random integer between two values
export function randInt(lower: number, upper: number) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

// Selects and returns a random element from a given array
export function randChoice(arr: any[]): any {
  return arr[randInt(0, arr.length)];
}

// Adds two coordinates together, and returns the result
export function addCoords(coord1: Coordinate, coord2: Coordinate): Coordinate {
  return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}

export function pythagoras(node: Coordinate, finish: Coordinate): number {
  return Math.sqrt((finish[1] - node[1]) ** 2 + (finish[0] - node[0]) ** 2);
}
