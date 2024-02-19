import {
  equalCoords,
  pythagoras,
  addCoords,
  invalidCoords,
} from '@/helpers/coordinateHelper';
import { Coordinate } from '@/helpers/types';
import AStarNode from '@/helpers/maze-gen/AStarNode';
import MazeHelper from '@/helpers/maze-gen/MazeHelper';

// N, E, S, W
const directions: Coordinate[] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export default function search(mh: MazeHelper) {
  const { startCoords } = mh;
  const goalCoords: Coordinate = mh.finishCoords;

  const startNode: AStarNode = mh.map[startCoords[0]][startCoords[1]];

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

    const validNeighbours: Coordinate[] = [];
    for (let i = 0; i < directions.length; i++) {
      if (
        !currentNode.walls[i]
        && !invalidCoords(
          addCoords(currentNode.coords, directions[i]),
          mh.map[0].length,
          mh.map.length,
        )
      ) {
        validNeighbours.push(directions[i]);
      }
    }

    // Prevent unsafe references to currentNode in forEach
    const cNode: AStarNode = currentNode;
    // Check every neighbour of the current node
    validNeighbours.forEach((neighbour: Coordinate) => {
      const neighbourCoords: Coordinate = addCoords(
        neighbour,
        cNode.coords,
      );

      // Calculate g cost of current neighbour
      const travelled: number = cNode.g + pythagoras(cNode.coords, neighbourCoords);

      let inOpen: boolean = false;
      let inClosed: boolean = false;

      // Check if current neighbour is in openList
      openList.some((node: AStarNode) => {
        if (equalCoords(node.coords, neighbourCoords)) {
          // If in open list, but new path has a lower g cost,
          // change the node in open list to reflect the better values
          if (node.g > travelled) {
            node.parent = cNode;
            node.g = travelled;
            node.f = travelled + pythagoras(neighbourCoords, goalCoords);
          }
          inOpen = true;
          return true; // Returning true ends the iteration of 'some()' function
        }

        return false;
      });

      if (!inOpen) {
        // Check if neighbour in closed list
        for (let i = 0; i < closedList.length; i++) {
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
        const neighbourNode: AStarNode = mh.map[neighbourCoords[0]][neighbourCoords[1]];
        neighbourNode.parent = cNode;
        neighbourNode.g = travelled;
        neighbourNode.f = travelled + pythagoras(neighbourCoords, goalCoords);
        if (openList.length === 0) {
          openList.push(neighbourNode);
        }
        const oLength = openList.length;
        for (let i = 0; i < oLength; i++) {
          if (
            !openList[i]
            || openList[i].f > travelled + pythagoras(neighbourCoords, goalCoords)
          ) {
            openList.splice(i, 0, neighbourNode);
            break;
          } else if (i === oLength - 1) {
            openList.push(neighbourNode);
            break;
          }
        }
      }
    });

    // Add current node to closed list
    closedList.push(cNode);
  }

  // If current node is the finish node, solution is found!
  // If not, then there is no valid path between the two nodes.
  if (equalCoords(currentNode.coords, goalCoords)) {
    mh.redrawCanvas();

    mh.ctx.beginPath();
    mh.ctx.strokeStyle = 'green';
    mh.ctx.lineWidth = currentNode.width > 4 ? 4 : 1;
    mh.ctx.moveTo(
      currentNode.topLeft[0] + currentNode.width / 2,
      currentNode.topLeft[1] + currentNode.height / 2,
    );

    while (currentNode.parent) {
      const pr = currentNode.parent;
      mh.ctx.lineTo(
        pr.topLeft[0] + pr.width / 2,
        pr.topLeft[1] + pr.height / 2,
      );
      currentNode = currentNode.parent;
    }

    mh.ctx.stroke();

    document.dispatchEvent(new Event('maze-solved'));
  } else {
    document.dispatchEvent(new Event('maze-not-solved'));
  }
}
