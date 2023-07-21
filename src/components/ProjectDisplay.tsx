import React from "react";
import projectsJSON from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/helpers/types";

function renderProjects(projectArray: Project[]): React.ReactElement[] {
  let i: number = 0;
  return projectArray.map(project => (
    <ProjectCard project={project} nProject={i++} key={`project-${i}`} />
  ));
}

export default function ProjectDisplay(): React.ReactElement {
  const projects: Project[] = projectsJSON["projects"]
  return (
    <div
      className="flex items-center justify-center overflow-clip relative
              w-full h-screen p-8 isolate">
      {renderProjects(projects)}
    </div>
  );
}
