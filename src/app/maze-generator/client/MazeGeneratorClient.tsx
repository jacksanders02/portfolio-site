"use client";
import React from "react";
import MazeHelper from "@/helpers/maze-gen/MazeHelper";
import { search } from "@/helpers/maze-gen/AStar";

export default function MazeGeneratorClient() {
  const instructions: {[stage: number]: string} = {
    0: "Generate a maze using the below inputs:",
    1: "",
    2: "Click anywhere on the maze to set your start point.",
    3: "Click anywhere on the maze to set your end point.",
    4: "",
  };

  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = React.useRef(null);
  const widthInputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const heightInputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

  const [maze, setMaze] = React.useState<MazeHelper | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [stage, setStage] = React.useState<number>(0);

  function initialiseMap(): void {
    if (canvasRef.current && widthInputRef.current && heightInputRef.current) {
      let width: number = +widthInputRef.current.value;
      let height: number = +heightInputRef.current.value;
      setErrorMessage("");

      if (isNaN(width + height) || width < 2 || height < 2) {
        setErrorMessage("Please ensure that you have entered only numbers, and that both width & height are greater than 1.");
        return;
      }

      resetCanvasSize(canvasRef.current, width, height);
      try {
        setMaze(new MazeHelper(canvasRef.current, width, height));
        setStage(1);
      } catch (_e) {
        setErrorMessage("Recursion error occurred - please try again with a smaller maze.")
      }
    }
  }

  function startListener(ev: MouseEvent): void {
    maze!.setStart(ev);
  }

  function finishListener(ev: MouseEvent): void {
    maze!.setFinish(ev);
  }

  function startSearch(): void {
    if (canvasRef.current) {
      setStage(2);

      // Clear parents of all nodes (they were set when generating the map)
      // ALso clear map colouring
      for (let row of maze!.map) {
        for (let node of row) {
          node.parent = null;
          node.lineTo = null;
          node.fill = "white";
        }
      }

      maze!.redrawCanvas();

      canvasRef.current!.addEventListener("click", startListener)
      document.addEventListener("start-selected", startSelectedCallback)
    }
  }

  function startSelectedCallback(ev: Event): void {
    if (canvasRef.current) {
      setStage(3);
      canvasRef.current!.removeEventListener("click", startListener)
      canvasRef.current!.addEventListener("click", finishListener)
      document.removeEventListener("start-selected", startSelectedCallback)
      document.addEventListener("finish-selected", finishSelectedCallback)
    }
  }

  function finishSelectedCallback(ev: Event): void {
    if (canvasRef.current) {
      setStage(4);
      canvasRef.current!.removeEventListener("click", finishListener)
      document.removeEventListener("finish-selected", finishSelectedCallback)

      search(maze!);
    }
  }

  /**
   * Resize canvas based on window dimensions & number of rows/cols in the maze
   */
  function resetCanvasSize(canvas: HTMLCanvasElement, cols: number, rows: number) {
    let widthLim: number = Math.round(window.screen.width * 0.8);
    let heightLim: number = Math.round(window.screen.height * 0.66);
    let aspectRatio = cols / rows;

    /* Changes canvas size depending on window aspect ratio (avoids using CSS as
      that will change the canvas size during the running of the program.
     */
    if (widthLim < heightLim) {
      canvas.width = widthLim;
      canvas.height = canvas.width / aspectRatio

      if (canvas.height > heightLim) {
        canvas.height = heightLim;
        canvas.width = canvas.height * aspectRatio
      }
    } else {
      canvas.height = heightLim;
      canvas.width = canvas.height * aspectRatio

      if (canvas.width > widthLim) {
        canvas.width = widthLim;
        canvas.height = canvas.width / aspectRatio
      }
    }
  }

  return (
    <div className={"flex flex-col items-center gap-8"}>
      {instructions[stage].length > 0 && (
        <h1 className={`text-xl sm:text-2xl lg:text-3xl text-center h-12`}>
          {instructions[stage]}
        </h1>
      )}
      {stage == 0 && (
        <>
          <div className="absolute-top flex flex-col items-center gap-1">
            <p className={`text-red-700 font-bold text-center`}>{errorMessage}</p>
            <div className={"grid grid-cols-3 grid-rows-2 gap-2 auto-cols-min"}>
              <label htmlFor="map-size-input" className={`w-max col-span-2`}>
                Maze Width:{" "}
              </label>
              <input
                className={"w-16 text-center border-2 border-on-background dark:border-on-background-dark"}
                type="tel"
                ref={widthInputRef}
                maxLength={4}
              />
              <label htmlFor="map-size-input" className={`w-max col-span-2`}>
                Maze Height:{" "}
              </label>
              <input
                className={"w-16 text-center border-2 border-on-background dark:border-on-background-dark"}
                type="tel"
                ref={heightInputRef}
                maxLength={4}
              />
            </div>
          </div>
          <div
            className={
              "w-11/12 md:w-2/3 flex gap-6 items-center justify-evenly"
            }
          >
            <button
              id="generate-maze"
              className={`hover-button dark:hover-button-dark`}
              onClick={initialiseMap}
            >
              Generate Maze
            </button>
          </div>
        </>
      )}

      {(stage == 1 || stage == 4) && (
        <div className={`flex flex-row gap-6 w-full lg:w-3/4 2xl:w-1/2 h-12`}>
          <button
            className={`hover-button dark:hover-button-dark flex-1`}
            onClick={() => { setStage(0) }}
          >
            New Maze
          </button>
          <button
            className={`hover-button dark:hover-button-dark flex-1`}
            onClick={startSearch}
          >
            Solve {stage == 4 ? "Again" : "Maze"}
          </button>
        </div>
      )}

      <canvas
        id="maze-area"
        className={`border-2 border-on-background dark:border-0 ${stage == 0 ? "hidden" : ""} block`}
        ref={canvasRef}
      />
    </div>
  )
}