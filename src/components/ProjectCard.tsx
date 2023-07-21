import React, { MouseEventHandler, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { Project, Technology } from "@/helpers/types";
import { fontSans } from "@/helpers/fontHelpers";
import { RotateContext } from "@/contexts/RotationContext";

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
  const rotateX: React.MutableRefObject<number> = useRef<number>(0);
  let dragging = false;
  let startOffset = 0;

  useEffect(() => {
    if (cardRef.current !== null) {
      const rect = cardRef.current.getBoundingClientRect();
      rotateX.current = cardRef.current.offsetLeft + rect.width / 2;
    }
  })

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center p-4 absolute bg-on-background-dark 
              right-[60%] xl:right-[66%] top-[40%] xl:top-auto min-w-fit
              ${fontSans.className}`}
    >
      <div className={"relative"}>
        <Image
          src={project.imageURL}
          alt={project.alt}
          width={350}
          height={350}
          draggable={false}
          className={`h-auto`}
        />
        <div
          className={`absolute top-0 right-0 flex gap-3 p-2 bg-on-background-dark
                rounded-bl-lg isolate`}
        >
          {renderTechnologies(project.keyTechnologies)}
        </div>
      </div>
      <h3 className={`text-xl font-bold`}>{project.title}</h3>
      {/* In case I forget to add a caption to a project */}
      {typeof project.caption !== "undefined" && project.caption.length > 0 ? (
        <h4>{project.caption}</h4>
      ) : (
        ""
      )}
    </div>
  );
}
