// Author: Jack Sanders

/* This function is used to make the canvas responsive, by making the size of
 the canvas respond to the screen size. Also, it will alter the position and
  size of objects that have been drawn onto the canvas by the main game script.
 */

function resetCanvasSize() {
    /* Function to automatically resize the canvas when the page is
     loaded/reloaded/resized, to take up the maximum space possible - makes
      game responsive, even while running.
     */
    /* Retrieve items on canvas from GameGlobals - javascript scripts all
     share the same namespace, making this possible.
     */
    let canvas = document.getElementById('maze-area');
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    /* Select every element that isn't the canvas (or the navbar, as that
     shouldn't impact the height of the canvas.
     */
    let notCanvas = document.querySelectorAll('body>*:not(#container)');
    let elementsHeight = 0;

    // Get total height of all elements that aren't the canvas.
    for (let i=0; i<notCanvas.length; i++) {
        elementsHeight += notCanvas[i].offsetHeight;
    }

    /* Changes canvas size depending on window size (avoids using CSS as
      that will change the canvas size during the running of the program.
     */
    if (windowWidth < 750) {
        canvas.height = canvas.width = windowWidth * 0.9 + 1;
    } else if (windowWidth < 1000) {
        canvas.height = canvas.width = windowWidth * 0.66 + 1;
    } else if (windowWidth * 0.45 < (windowHeight - elementsHeight) * 0.9 ){
        canvas.height = canvas.width = windowWidth * 0.45 + 1;
    } else {
        canvas.height = canvas.width = (windowHeight - elementsHeight) * 0.9 + 1;
    }
}

// Runs every time the window is resized
function resizeAction() {
    // Timer means canvas can only be resized a maximum of once ever half second
    // Prevents thousands of calculations running every second, slowing the page
    if (timer === false) {
        /* If timer is not running, start it */
        timer = window.setTimeout(resetCanvasSize, 500);
    } else {
        /* If timer is running but window is still being resized, reset it */
        window.clearTimeout(timer)
        timer = window.setTimeout(resetCanvasSize, 500);
    }
}

let timer = false;

/* Add event listeners for load and resize, so that the canvas is refreshed
 every time the page is loaded, reloaded, or resized.
 */
window.addEventListener('load', resetCanvasSize);
//window.addEventListener('resize', resizeAction);