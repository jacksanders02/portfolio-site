import { Coordinate } from "@/helpers/types";

export default class AStarNode {
    coords: Coordinate;
    topLeft: number[];
    width: number;
    height: number;
    parent: null|AStarNode;
    walls: boolean[];
    visited: boolean;
    g: number;
    f: number;
    fill: string;

    constructor(x: number, y: number, width: number, height: number) {
        this.coords = [y, x];
        this.topLeft = [x * width, y * height];
        this.width = width;
        this.height = height;
        this.parent = null;
        this.walls = [true, true, true, true]; // [TOP, RIGHT, BOTTOM, LEFT]
        this.visited = false;

        this.g = 0;
        this.f = 0;

        this.fill = "rgba(0, 0, 0, 0)";
    }

    removeWall(direction: string) {
        switch (direction) {
            case "N":
                this.walls[0] = false;
                break;
            case "E":
                this.walls[1] = false;
                break;
            case "S":
                this.walls[2] = false;
                break;
            case "W":
                this.walls[3] = false;
                break;
            default:
                console.log("Something broke");
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fillRect(this.topLeft[0], this.topLeft[1], this.width, this.height);
        }

        ctx.beginPath()

        ctx.lineWidth = 2;

        // Top
        if (this.walls[0]) {
            ctx.moveTo(this.topLeft[0], this.topLeft[1]);
            ctx.lineTo(this.topLeft[0] + this.width, this.topLeft[1]);
        }

        // Right
        if (this.walls[1]) {
            ctx.moveTo(this.topLeft[0] + this.width, this.topLeft[1]);
            ctx.lineTo(this.topLeft[0] + this.width, this.topLeft[1] + this.height);
        }

        // Bottom
        if (this.walls[2]) {
            ctx.moveTo(this.topLeft[0] + this.width, this.topLeft[1] + this.height);
            ctx.lineTo(this.topLeft[0], this.topLeft[1] + this.height);
        }

        // Left
        if (this.walls[3]) {
            ctx.moveTo(this.topLeft[0], this.topLeft[1] + this.height);
            ctx.lineTo(this.topLeft[0], this.topLeft[1]);
        }

        ctx.stroke();
    }

    visit() {
        this.visited = true;
    }
}