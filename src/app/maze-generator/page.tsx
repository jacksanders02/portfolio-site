"use client"

import React, { useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import MazeHelper from "@/helpers/maze-gen/MazeHelper";
import PageSubTitle from "@/components/PageSubTitle";
import { validateNaturalNumber } from "@/helpers/inputValidators";
import { startServer } from "next/dist/server/lib/start-server";
import { set } from "zod";
import { search } from "@/helpers/maze-gen/AStar";

export default function AStar(): React.ReactNode {
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

  const [searchStarted, setSearchStarted] = React.useState(false);
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
    let windowWidth: number = window.innerWidth;
    let windowHeight: number = window.innerHeight;

    /* Changes canvas size depending on window aspect ratio (avoids using CSS as
      that will change the canvas size during the running of the program.
     */
    if (windowWidth < 750) {
      canvas.height = canvas.width = windowWidth * 0.9 + 1;
    } else if (windowWidth < 1000) {
      canvas.height = canvas.width = windowWidth * 0.9 + 1;
    } else if (windowWidth < windowHeight ){
      canvas.height = canvas.width = windowWidth * 0.75 + 1;
    } else {
      canvas.height = canvas.width = windowHeight * 0.75 + 1;
    }

    // Scale canvas dimensions depending on dimensions of maze, to ensure each cell is a square
    if (cols < rows) {
      canvas.width *= (cols / rows)
    } else {
      canvas.height *= (rows / cols)
    }
  }

  return (
    <main>
      <PageContainer>
        <PageTitle>Maze Generator & Solver</PageTitle>
        <h1 className={`text-xl sm:text-2xl lg:text-3xl text-center`}>
          {instructions[stage]}
        </h1>
        <div className={"flex flex-col items-center gap-8"}>
          {stage == 0 && (
            <>
              <div className="absolute-top flex flex-col items-center gap-1">
                <p className={`text-red-700 font-bold text-center`}>{errorMessage}</p>
                <div className={"grid grid-cols-3 grid-rows-2 gap-2 auto-cols-min"}>
                  <label htmlFor="map-size-input" className={`w-max col-span-2`}>
                    Maze Width:{" "}
                  </label>
                  <input
                    className={"w-12 text-center"}
                    type="text"
                    onBeforeInput={validateNaturalNumber}
                    ref={widthInputRef}
                    maxLength={4}
                  />
                  <label htmlFor="map-size-input" className={`w-max col-span-2`}>
                    Maze Height:{" "}
                  </label>
                  <input
                    className={"w-12 text-center"}
                    type="text"
                    onBeforeInput={validateNaturalNumber}
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
                  className={`hover-button dark:hover-button-dark ${searchStarted ? "hidden" : ""}`}
                  onClick={initialiseMap}
                >
                  Generate Maze
                </button>
              </div>
            </>
          )}

          {stage == 1 && (
            <div className={`flex flex-row gap-6 w-1/2`}>
              <button
                className={`hover-button dark:hover-button-dark flex-1`}
                onClick={() => { setStage(0) }}
              >
                Generate New Maze
              </button>
              <button
                className={`hover-button dark:hover-button-dark flex-1`}
                onClick={startSearch}
              >
                Solve Maze
              </button>
            </div>
          )}

          {stage == 4 && (
            <div className={`flex flex-row gap-6 w-1/2`}>
              <button
                className={`hover-button dark:hover-button-dark flex-1`}
                onClick={() => { setStage(0) }}
              >
                Generate New Maze
              </button>
              <button
                className={`hover-button dark:hover-button-dark flex-1`}
                onClick={startSearch}
              >
                Solve Maze Again
              </button>
            </div>
          )}

          <canvas
            id="maze-area"
            className={`border-2 border-on-background dark:border-0 ${stage == 0 ? "hidden" : ""}`}
            ref={canvasRef}
          />
        </div>
      </PageContainer>
    </main>
  );
}