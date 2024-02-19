import AStarNode from '@/helpers/maze-gen/AStarNode';
import { Coordinate } from '@/helpers/types';
import {
  addCoords,
  invalidCoords,
  randChoice,
  randInt,
} from '@/helpers/coordinateHelper';

export const directions: [Coordinate, string][] = [
  [[0, 1], 'EW'],
  [[1, 0], 'SN'],
  [[0, -1], 'WE'],
  [[-1, 0], 'NS'],
];

export default class MazeHelper {
  map: AStarNode[][];

  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  startCoords: Coordinate;

  finishCoords: Coordinate;

  /**
   * Initialises the MazeHelper
   */
  constructor(canvas: HTMLCanvasElement, cols: number, rows: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.translate(0.5, 0.5);

    this.map = new Array(rows);
    this.startCoords = [0, 0];
    this.finishCoords = [0, 0];

    // Initialise map with empty nodes
    for (let i = 0; i < rows; i++) {
      this.map[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.map[i][j] = new AStarNode(
          j,
          i,
          this.ctx.canvas.width / cols,
          this.ctx.canvas.height / rows,
        );
        // Set walls all true
        this.map[i][j].walls = [true, true, true, true];
      }
    }

    const startCoords: Coordinate = [randInt(0, rows), randInt(0, cols)];

    const startNode: AStarNode = this.map[startCoords[0]][startCoords[1]];

    this.pickRandomNeighbour(startNode);
  }

  /**
   * Clears the canvas and redraws all nodes
   */
  redrawCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.beginPath();
    this.map.forEach((row: AStarNode[]) => {
      row.forEach((node: AStarNode) => {
        node.draw(this.ctx);
      });
    });

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  /**
   * Entry point for map creation, using the recursive backtracing algorithm
   */
  pickRandomNeighbour(currentNode: AStarNode) {
    // Parent will be null for the start node and only the start node.
    if (!currentNode.parent && currentNode.visited) {
      this.redrawCanvas();
      return;
    }

    currentNode.visit();

    const validDirections: [Coordinate, string][] = [];
    directions.forEach((direction: [Coordinate, string]) => {
      const newCoords: Coordinate = addCoords(direction[0], currentNode.coords);
      if (
        !invalidCoords(newCoords, this.map[0].length, this.map.length)
        && !this.map[newCoords[0]][newCoords[1]].visited
      ) {
        validDirections.push(direction);
      }
    });

    if (validDirections.length === 0) {
      this.pickRandomNeighbour(currentNode.parent!);
      return;
    }

    const direction = randChoice(validDirections);
    const neighbourCoords: Coordinate = addCoords(
      direction[0],
      currentNode.coords,
    );
    const neighbour: AStarNode = this.map[neighbourCoords[0]][neighbourCoords[1]];

    neighbour.parent = currentNode;
    currentNode.removeWall(direction[1][0]);
    neighbour.removeWall(direction[1][1]);

    this.pickRandomNeighbour(neighbour);
  }

  findMouseOnCanvas(event: MouseEvent): Coordinate {
    const rect: DOMRect = this.canvas.getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;
    return [y, x];
  }

  findClickedNode(coords: Coordinate): AStarNode {
    const x: number = Math.floor(
      coords[1] / (this.ctx.canvas.width / this.map[0].length),
    );
    const y: number = Math.floor(
      coords[0] / (this.ctx.canvas.height / this.map.length),
    );

    return this.map[y][x];
  }

  /**
   * Sets the finish node for the A* algorithm
   */
  setFinish(event: MouseEvent) {
    const finishNode: AStarNode = this.findClickedNode(
      this.findMouseOnCanvas(event),
    );
    finishNode.fill = 'red';
    this.redrawCanvas();

    this.finishCoords = finishNode.coords;

    document.dispatchEvent(new Event('finish-selected'));
  }

  /**
   * Sets the start node for the A* algorithm
   */
  setStart(event: MouseEvent) {
    const coords = this.findMouseOnCanvas(event);
    const startNode: AStarNode = this.findClickedNode(coords);
    startNode.fill = '#66FF66';
    this.redrawCanvas();

    this.startCoords = startNode.coords;

    document.dispatchEvent(new Event('start-selected'));
  }
}
