import React from "react";
import Image from "next/image";
import { Project } from "@/helpers/types";
import { fontSerif } from "@/app/fonts";
import { Slide, Fade } from "react-awesome-reveal";
import { technologyIcons, technologyAlts } from "@/helpers/technologies";
import PaddedDiv from "@/components/PaddedDiv";

/**
 * Renders JSX for a project's technologies.
 * Just icons for all the used techs, with tooltips that appear when a user hovers over the icons
 * @param techs {string[]} A list of technologies used by the project
 */
function renderTechnologies(techs: string[]): React.JSX.Element[] {
  let i: number = 0;
  // Map each technology to a div containing both the icon and the tooltip
  return techs.map((technology: string) => {
    return (
      // Relative positioned div so that absolute tooltip is positioned relative to this (nearest positioned ancestor)
      <div
        className={"flex gap-1 z-10 technology-icon relative"}
        key={`technology_${i++}`}
      >
        <Image
          src={technologyIcons.get(technology) || 'technologies/notfound.svg'}
          alt={technologyAlts.get(technology) || 'A question mark, indicating that the technology icon was not found'}
          width={24}
          height={24}
          draggable={false}
        />
        <div
          className={
            "absolute top-[110%] tooltip text-on-background-dark bg-gray-600 after:border-b-gray-600 w-max"
          }
        >
          {technology}
        </div>
      </div>
    );
  });
}

/**
 * Renders JSX for any required buttons (if any)
 * @param proj {Project} The project to render buttons for
 */
function renderButtons(proj: Project): React.JSX.Element | string {
  // If no buttons needed, simply return
  if (!proj.writeupLink && !proj.demoLink && !proj.githubLink) {
    return "";
  }

  return (
    <div className={`flex flex-col min-[560px]:flex-row gap-4 items-center`}>
      {proj.demoLink && (
        <a
          className={`hover-button dark:hover-button-dark text-center lg:text-xl
                      flex items-center`}
          href={proj.demoLink}
          aria-label={`A link to a live version of ${proj.title}`}
        >
          <i className={`bi bi-joystick me-2`} />
          Demo
        </a>
      )}
      {proj.githubLink && (
        <a
          className={`hover-button dark:hover-button-dark text-center lg:text-xl
                      flex items-center`}
          href={proj.githubLink}
          aria-label={`The github link for ${proj.title}`}
        >
          <i className={`bi bi-github me-2`} />
          View on Github
        </a>
      )}
      {proj.writeupLink && (
        <a
          className={`hover-button dark:hover-button-dark text-center lg:text-xl
                      flex items-center`}
          href={proj.writeupLink}
          aria-label={`Read more about ${proj.title}`}
        >
          <i className={`bi bi-info-circle-fill me-2`} />
          Project Writeup
        </a>
      )}
    </div>
  );
}

/**
 * A card that shows details on a single project
 * @param project {Project} The project that this card should be for
 * @param className {String} class names to be applied
 * @constructor
 */
export default function ProjectCard({
  project,
  id
}: {
  project: Project;
  id?: string;
}): React.ReactElement {
  return (
    <PaddedDiv
      id={id}
      extraClasses={`flex flex-col 2xl:flex-row gap-8 2xl:gap-16`}
    >
      {/* Cascade fade animation so that image is visible before title/description */}
      <Fade cascade damping={0.33}>
        <Slide
          onVisibilityChange={(inView, entry) => {
            let target: Element = entry.target;
            if (inView && target.getBoundingClientRect().top < 0) {
              setTimeout(() => {
                target.classList.add("skip-animation");
              }, 10);
            }
          }}
        >
          <div
            className={`m-auto w-full 2xl:min-w-[450px] max-w-[500px] p-2 sm:p-4 bg-on-background-dark
                        border-2 border-colour-background-dark`}
          >
            <div className={"relative"}>
              <Image
                src={project.imageURL}
                alt={project.alt}
                width={500}
                height={500}
                draggable={false}
                className={`w-full h-auto`}
              />
              <div
                className={`absolute top-0 right-0 flex gap-3 p-2 bg-on-background-dark
                  rounded-bl-lg isolate items-center`}
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
          }}
          direction={"right"}
        >
          <div
            className={`flex flex-col gap-4 items-center 2xl:items-start text-center 2xl:text-left`}
          >
            <div>
              <h2 className={`${fontSerif.className} text-3xl lg:text-5xl tracking-wider`}>
                {project.title}
              </h2>
              {project.date && (
                <p className={`text-sm lg:text-base mt-2 underline`}>{project.date}</p>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: project.briefDescription }}
            />
            {renderButtons(project)}
          </div>
        </Slide>
      </Fade>
    </PaddedDiv>
  );
}
