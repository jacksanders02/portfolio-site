"use client"

import React, { useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import MazeHelper from "@/helpers/maze-gen/MazeHelper";
import PageSubTitle from "@/components/PageSubTitle";
import { validateNaturalNumber } from "@/helpers/inputValidators";

export default function AStar(): React.ReactNode {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = React.useRef(null);
  const generateButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);
  const startButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);
  const saveButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);
  const sizeInputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

  function initialiseMap(): void {
    if (canvasRef.current && sizeInputRef.current) {
      let sideLength: number = parseInt(sizeInputRef.current.value);
      let maze: MazeHelper = new MazeHelper(canvasRef.current, sideLength, sideLength);
    }
  }

  /**
   * Resize canvas based on window dimensions
   */
  function resetCanvasSize(canvas: HTMLCanvasElement) {
    /* Retrieve items on canvas from GameGlobals - javascript scripts all
     share the same namespace, making this possible.
     */
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    /* Changes canvas size depending on window aspect ratio (avoids using CSS as
      that will change the canvas size during the running of the program.
     */
    if (windowWidth < 750) {
      canvas.height = canvas.width = windowWidth * 0.9 + 1;
    } else if (windowWidth < 1000) {
      canvas.height = canvas.width = windowWidth * 0.66 + 1;
    } else if (windowWidth * 0.45 < windowHeight * 0.9 ){
      canvas.height = canvas.width = windowWidth * 0.45 + 1;
    } else {
      canvas.height = canvas.width = windowHeight * 0.9 + 1;
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      resetCanvasSize(canvasRef.current);
    }
  }, [canvasRef, generateButtonRef, startButtonRef, saveButtonRef])

  return (
    <main>
      <PageContainer
        extraClasses={`m-auto mt-20 md:mt-0 p-8 flex flex-col gap-6`}
      >
        <PageTitle>Maze Generator & Solver</PageTitle>
        <div className={"flex flex-col items-center gap-8 mt-16"}>
          <PageSubTitle>
            Generate a Maze for the A* Algorithm to Solve
          </PageSubTitle>
          <div id="map-size" className="absolute-top">
            <label htmlFor="map-size-input">
              Desired Side Length of Maze:{" "}
            </label>
            <input
              className={"w-min"}
              type="text"
              onBeforeInput={validateNaturalNumber}
              ref={sizeInputRef}
            />
            <p id="error-text"></p>
          </div>
          <div
            className={
              "w-11/12 md:w-2/3 flex gap-6 items-center justify-evenly"
            }
          >
            <button
              id="generate-maze"
              className={"hover-button dark:hover-button-dark"}
              onClick={initialiseMap}
            >
              Generate New Maze
            </button>

            <button
              id="start-search"
              className={"hover-button dark:hover-button-dark"}
              ref={startButtonRef}
            >
              Start Search
            </button>

            <button
              id="save-png"
              className={"hover-button dark:hover-button-dark"}
            >
              Save Maze as .PNG
            </button>
          </div>
          <canvas id="maze-area" ref={canvasRef}></canvas>
        </div>
      </PageContainer>
    </main>
  );
}