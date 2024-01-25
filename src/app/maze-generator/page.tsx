import React from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Metadata } from "next";
import MazeGeneratorClient from "@/app/maze-generator/client/MazeGeneratorClient";

export const metadata: Metadata = {
  title: "JS Maze Generator",
};

export default function AStar(): React.ReactNode {
  return (
    <main>
      <PageContainer>
        <PageTitle>Maze Generator & Solver</PageTitle>
        <MazeGeneratorClient />
      </PageContainer>
    </main>
  );
}
