import React, { useRef } from "react";
import Image from "next/image";
import { Project, Technology } from "@/helpers/types";
import { fontSans } from "@/helpers/fontHelpers";

function renderTechnologies(techs: Technology[]) {
  let i: number = 0;
  return techs.map(technology => {
      return (
        <div className={"flex gap-1 z-10"} key={`technology_${i++}`}>
          <Image
            src={technology.iconURL}
            alt={technology.alt}
            width={24}
            height={24}
            draggable={false}
          />
        </div>
      );
    }
  )
}

export default function ProjectCard({
  project,
  nProject,
  className,
}: {
  project: Project;
  nProject: number;
  className?: string;
}): React.ReactElement {
  const cardRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  function onMouseOver() {
    if (cardRef.current === null) {
      return;
    }

    cardRef.current.style.zIndex = "1001";
  }

  function onMouseLeave() {
    if (cardRef.current === null) {
      return;
    }

    cardRef.current.style.zIndex = `${1000 - nProject}`;
  }

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center justify-center p-4 absolute
        bg-secondary dark:bg-secondary-dark border-4 rounded-lg right-[60%] 
        xl:right-[66%] top-[40%] xl:top-auto
        border-accent dark:border-accent-dark min-w-fit project-card
        ${fontSans.className}`}
      style={{ rotate: `${5 * nProject}deg`, zIndex: `${1000-nProject}` }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div className={"relative"}>
        <Image
          src={project.imageURL}
          alt={project.alt}
          width={512}
          height={512}
          draggable={false}
          className={`rounded-lg border-2 border-accent dark:border-accent-dark h-auto`
          }
        />
        <div
          className={`absolute top-0 right-0 flex gap-3 p-2 bg-secondary dark:bg-secondary-dark
                rounded-bl-lg border-b-2 border-l-2 border-b-accent border-l-accent
                dark:border-b-accent-dark dark:border-l-accent-dark isolate
                border-t-2 border-t-secondary dark:border-t-secondary-dark`}
        >
          {/* Stop image border from showing underneath this div when card
            * is rotated
            */}
          <div className={`-z-1 absolute h-full w-full bg-secondary dark:bg-secondary-dark -top-1 -right-1`} />
          {renderTechnologies(project.keyTechnologies)}
        </div>
      </div>
      <h3 className={`text-xl font-bold`}>{project.title}</h3>
      {/* In case I forget to add a caption to a project */}
      {typeof project.caption !== "undefined" && project.caption.length > 0 ?
        <h4>{project.caption}</h4> : ""
      }
    </div>
  );
}
