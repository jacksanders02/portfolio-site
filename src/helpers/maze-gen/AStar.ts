import { equalCoords, pythagoras, addCoords, invalidCoords} from "@/helpers/coordinateHelper";
import { Coordinate } from "@/helpers/types";
import AStarNode from "@/helpers/maze-gen/AStarNode";
import MazeHelper from "@/helpers/maze-gen/MazeHelper";

// N, E, S, W
const directions: Coordinate[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export function search(mh: MazeHelper) {
    const startCoords: Coordinate = mh.startCoords;
    const goalCoords: Coordinate = mh.finishCoords;

    const startNode: AStarNode = mh.map[startCoords[0]][startCoords[1]]

    // Initialise open list with just starting node
    const openList: AStarNode[] = [startNode];
    const closedList: AStarNode[] = [];
    let currentNode: AStarNode = openList[0];

    while (openList.length > 0) {
        // Remove node with lowest f-cost from the openList, and set as current
        currentNode = openList.shift()!;

        // If current node is finish, break loop
        if (equalCoords(currentNode.coords, goalCoords)) {
            break;
        }

        let validNeighbours: Coordinate[] = [];
        for (let i=0; i<directions.length; i++) {
            if (!currentNode.walls[i] &&
                  !invalidCoords(addCoords(currentNode.coords, directions[i]), mh.map[0].length, mh.map.length)) {
                validNeighbours.push(directions[i]);
            }
        }

        // Check every neighbour of the current node
        for (let neighbour of validNeighbours) {
            let neighbourCoords: Coordinate = addCoords(neighbour, currentNode.coords);

            // Calculate g cost of current neighbour
            let travelled: number = currentNode.g + pythagoras(currentNode.coords, neighbourCoords);

            let inOpen: boolean = false;
            let inClosed: boolean = false;

            // Check if current neighbour is in openList
            for (let node of openList) {
                if (equalCoords(node.coords, neighbourCoords)) {
                    // If in open list, but new path has a lower g cost,
                    // change the node in open list to reflect the better values
                    if (node.g > travelled) {
                        node.parent = currentNode;
                        node.g = travelled;
                        node.f = travelled + pythagoras(neighbourCoords, goalCoords);
                    }
                    inOpen = true;
                    break;
                }
            }

            if (!inOpen) {
                // Check if neighbour in closed list
                for (let i=0; i<closedList.length; i++) {
                    // If in closed list, but new path has a lower g cost,
                    // remove the node from closed list, to be added to the
                    // open list later
                    if (equalCoords(closedList[i].coords, neighbourCoords)) {
                        if (closedList[i].g > travelled) {
                            closedList.splice(i, 1);
                        } else {
                            inClosed = true;
                        }
                        break;
                    }
                }
            }

            // If current neighbour is neither in the open list or the
            // closed list, add it to the open list, ensuring that the list
            // remains sorted with lowest f costs at the start.
            if (!inOpen && !inClosed) {
                let neighbour = mh.map[neighbourCoords[0]][neighbourCoords[1]];
                neighbour.parent = currentNode;
                neighbour.g = travelled;
                neighbour.f = travelled + pythagoras(neighbourCoords, goalCoords);
                if (openList.length === 0) {
                    openList.push(neighbour);
                }
                let oLength = openList.length;
                for (let i=0; i<oLength; i++) {
                    if (!openList[i] || openList[i].f > travelled + pythagoras(neighbourCoords, goalCoords)) {
                        openList.splice(i, 0, neighbour);
                        break;
                    } else if (i === oLength - 1) {
                        openList.push(neighbour);
                        break;
                    }
                }
            }
        }
        // Add current node to closed list
        closedList.push(currentNode);
    }

    // If current node is the finish node, solution is found!
    // If not, then there is no valid path between the two nodes.
    if (equalCoords(currentNode.coords, goalCoords)) {
        while (currentNode.parent) {
            if (!equalCoords(currentNode.parent.coords, startCoords)) {
                currentNode.parent.fill = "green";
            }
            currentNode = currentNode.parent;
        }
        mh.redrawCanvas();
        document.dispatchEvent(new Event("maze-solved"));
    } else {
        document.dispatchEvent(new Event("maze-not-solved"));
    }
}