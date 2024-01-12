// Functions that can be used by all scripts
// Check if coordinates are equal (arr1 === arr2 checks references, not content)
export function equalCoords(arr1: [number, number], arr2: [number, number]): boolean {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

// Check if coordinates are invalid due to being out-of-bounds
export function invalidCoords(coords: [number, number], maxCol: number, maxRow: number): boolean {
  return coords[0] < 0 || coords[0] >= maxCol || coords[1] < 0 || coords[1] >= maxRow;
}

// Returns a random integer between two values
export function randInt(lower: number, upper: number) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

// Selects and returns a random element from a given array
export function randChoice(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Adds two coordinates together, and returns the result
export function addCoords(coord1: [number, number], coord2: [number, number]): [number, number] {
  return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}

export function pythagoras(node: [number, number], finish: [number, number]): number {
  return Math.sqrt((finish[1] - node[1]) ** 2 + (finish[0] - node[0]) ** 2)
}