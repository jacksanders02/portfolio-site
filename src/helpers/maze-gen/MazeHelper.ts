import AStarNode from "@/helpers/maze-gen/AStarNode";

export default class MazeHelper {
  map: AStarNode[][];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  /**
   * Initialises the MazeHelper
   */
  constructor(canvas: HTMLCanvasElement, cols: number, rows: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.map = new Array(rows);

    // Initialise map with empty nodes
    for (let i=0; i<rows; i++) {
      this.map[i] = new Array(cols);
      for (let j=0; j<cols; j++) {
        this.map[i][j] = new AStarNode(j, i, this.ctx.canvas.width / cols,
                                             this.ctx.canvas.height / rows);
        // Set walls all true
        this.map[i][j].walls = [true,true, true, true];
      }
    }

    this.redrawCanvas();

  }

  /**
   * Clears the canvas and redraws all nodes
   */
  redrawCanvas() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let row of this.map) {
      for (let node of row) {
        node.draw(this.ctx);
      }
    }
  }
}