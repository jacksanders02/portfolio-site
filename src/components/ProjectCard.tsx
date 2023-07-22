import React, { MouseEventHandler, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { Project, Technology } from "@/helpers/types";
import {fontSans, fontSerif} from "@/helpers/fontHelpers";
import { Slide, Fade } from "react-awesome-reveal";

function renderTechnologies(techs: Technology[]) {
  let i: number = 0;
  return techs.map(technology => {
      return (
        <div className={"flex gap-1 z-10 technology-icon relative"} key={`technology_${i++}`}>
          <Image
            src={technology.iconURL}
            alt={technology.alt}
            width={24}
            height={24}
            draggable={false}
          />
          <div className={"absolute top-[110%] tooltip text-on-background-dark bg-gray-600 after:border-b-gray-600"}>
            {technology.name}
          </div>
        </div>
      );
    }
  )
}

export default function ProjectCard({
  project,
  className,
}: {
  project: Project;
  nProject: number;
  className?: string;
}): React.ReactElement {
  return (
    <div className={`flex flex-row gap-16 pl-[20%] pe-[20%]`}>
      <Fade cascade damping={0.33}>
        <Slide triggerOnce>
          <div
            className={`p-4 bg-on-background-dark ${fontSans.className}`}
          >
            <div className={"relative"}>
              <Image
                src={project.imageURL}
                alt={project.alt}
                width={350}
                height={350}
                draggable={false}
                className={`min-w-[250px] h-auto`}
              />
              <div
                className={`absolute top-0 right-0 flex gap-3 p-2 bg-on-background-dark
                  rounded-bl-lg isolate`}
              >
                {renderTechnologies(project.keyTechnologies)}
              </div>
            </div>
          </div>
        </Slide>
        <Slide direction={"right"} triggerOnce>
          <div>
            <h2 className={`${fontSerif.className} text-5xl tracking-wider mb-4`}>{project.title}</h2>
            <p dangerouslySetInnerHTML={{__html: project.fullDescription}}></p>
          </div>
        </Slide>
      </Fade>
    </div>
  );
}
