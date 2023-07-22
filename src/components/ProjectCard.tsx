import React from "react";
import Image from "next/image";
import { Project, Technology } from "@/helpers/types";
import {fontSans, fontSerif} from "@/helpers/fontHelpers";
import { Slide, Fade } from "react-awesome-reveal";

/**
 * Renders JSX for a project's technologies.
 * Just icons for all of the used techs, with tooltips that appear when a user hovers over the icons
 * @param techs {Technology[]} A list of technologies used by the project
 */
function renderTechnologies(techs: Technology[]): React.JSX.Element[] {
  let i: number = 0;
  // Map each technology to a div containing both the icon and the tooltip
  return techs.map((technology: Technology) => {
      return (
        // Relative positioned div so that absolute tooltip is positioned relative to this (nearest positioned ancestor)
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

/**
 * Renders JSX for any required buttons (if any)
 * @param proj {Project} The project to render buttons for
 */
function renderButtons(proj: Project): React.JSX.Element | string{
  // If no buttons needed, simply return
  if (!proj.writeupLink && !proj.demoLink) {
    return "";
  }

  return (
    <div className={`flex flex-col min-[560px]:flex-row gap-4`}>
      {proj.demoLink && <a className={`hover-button dark:hover-button-dark text-center`} href={proj.demoLink}>
          <i className={`bi bi-joystick me-2`} />
          View Demo
      </a>}
      {proj.writeupLink && <a className={`hover-button dark:hover-button-dark text-center`} href={proj.writeupLink}>
          <i className={`bi bi-file-text-fill me-2`} />
          Read Writeup
      </a>}
    </div>
  )
}

/**
 * A card that shows details on a single project
 * @param project {Project} The project that this card should be for
 * @param className {String} class names to be applied
 * @constructor
 */
export default function ProjectCard({
  project,
  id,
  className,
}: {
  project: Project;
  id?: string;
  className?: string;
}): React.ReactElement {
  return (
    <div id={id ? id : ""} className={`flex flex-col 2xl:flex-row gap-8 2xl:gap-16 w-[60%] min-[1200px]:max-2xl:w-[50%]`}>
      {/* Cascade fade animation so that image is visible before title/description */ }
      <Fade cascade damping={0.33}>
        <Slide
          onVisibilityChange={(inView, entry) => {
              let target: Element = entry.target;
              if (inView && target.getBoundingClientRect().top < 0) {
                setTimeout(() => {
                  target.classList.add("skip-animation");
                }, 10);
              }
            }
          }
        >
          <div
            className={
              `m-auto w-full 2xl:min-w-[300px] max-w-[350px] p-2 sm:p-4 bg-on-background-dark ${fontSans.className}`
            }
          >
            <div className={"relative"}>
              <Image
                src={project.imageURL}
                alt={project.alt}
                width={350}
                height={350}
                draggable={false}
                className={`w-full h-auto`}
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
        <Slide
          onVisibilityChange={(inView, entry) => {
              let target: Element = entry.target;
              if (inView && target.getBoundingClientRect().top < 0) {
                setTimeout(() => {
                  target.classList.add("skip-animation");
                }, 10);
              }
            }
          }
          direction={"right"}
        >
          <div className={`flex flex-col gap-4 items-center 2xl:items-start text-center 2xl:text-left`}>
            <h2 className={`${fontSerif.className} text-5xl tracking-wider`}>{project.title}</h2>
            <div dangerouslySetInnerHTML={{__html: project.shortDescription}} />
            {renderButtons(project)}
          </div>
        </Slide>
      </Fade>
    </div>
  );
}
