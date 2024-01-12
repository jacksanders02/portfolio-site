// Constants dictating size of the map
export let rowNum: number;
export let colNum: number;
export let map: AStarNode[][];

/**
 * Initialises and draws map after user inputs a size
 * @param cols the number of columns in the maze.
 * @param rows the number of rows in the maze.
 */
function initialiseMap(cols: number, rows: number): boolean {

    colNum = cols;
    rowNum = rows;

    // Create map as an empty array, and populate that with empty arrays
    map = new Array(colNum);

    for (let i=0; i<map.length; i++) {
        map[i] = new Array(rowNum);
    }

    try {
        generateMaze();
        return true;
    } catch(e) {
        // In case the map size is such that a recursion error is thrown
        map = [];
        redrawCanvas();
        return false;
        sizeInput.style.display = null;

        // Inform the user of the error, and how to resolve it
        errorText.innerText = "An error occurred while generating the map." +
            " Try again, or try a smaller value for side length.";

        /* Remove event listeners to prevent the user from starting a search
         in an empty maze (will soft-lock the application).
         */
        startButton.removeEventListener("click", initAStar);
        screenshotButton.removeEventListener("click", savePNG);
    }
}

// Save a screenshot of the map as a png
function savePNG() {
    const link = document.createElement('a');

    for (let col of map) {
        for (let node of col) {
            if (node.fill === "green") {
                node.fill = "white";
            }
        }
    }

    redrawCanvas();

    link.download = 'map.png';
    link.href = mapCanvas.toDataURL();
    link.click();

    for (let col of map) {
        for (let node of col) {
            if (node.fill === "white") {
                node.fill = "green";
            }
        }
    }

    redrawCanvas();

    link.download = 'map-solution.png';
    link.href = mapCanvas.toDataURL();
    link.click();
    link.remove();
}



// Adding event listeners
generateButton.addEventListener("click", initialiseMap, false);