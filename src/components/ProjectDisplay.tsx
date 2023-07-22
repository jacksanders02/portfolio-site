import React from "react";
import projectsJSON from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/helpers/types";

function renderProjects(projectArray: Project[]): React.ReactElement[] {
  return projectArray.map((project: Project, i: number) => (
    <ProjectCard project={project} key={`project-${i}`} />
  ));
}

export default function ProjectDisplay(): React.ReactElement {
  const projects: Project[] = projectsJSON["projects"]
  return (
    <div
      className="flex flex-col gap-32 items-center justify-center overflow-clip relative p-8 isolate">
      {renderProjects(projects)}
    </div>
  );
}
