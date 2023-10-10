import React from "react";
import PageContainer from "@/components/PageContainer";
import { fontSerif } from "@/app/fonts";
import Image from "next/image";
import modulesJSON from "@/data/modules.json";
import { Module } from "@/helpers/types";
import ModuleTableHeader from "@/components/ModuleTableHeader";

/**
 * Splits an array of all modules into an indexable object of modules separated by year
 * @param allModules {Module[]}: a list of all modules to split
 */
function splitModules(allModules: Module[]): {[key: number]: Module[]} {
  const modules: {[key: number]: Module[]} = {1: [], 2: [], 3: [], 4: []}

  allModules.forEach(module => {
    modules[module.year].push(module);
  })

  return modules
}

function buildTableRows(modules: Module[], year: number): React.ReactNode {
  return modules.map((module: Module, i: number) => (
    <tr key={`module-${i}-year${year}`}>
      <td dangerouslySetInnerHTML={{ __html: module.name }} />
      <td dangerouslySetInnerHTML={{ __html: module.description }} />
      <td>{module.grade}</td>
    </tr>
  ));
}

export default function AboutMe(): React.ReactNode {
  const modulesByYear: {[key: number]: Module[]} = splitModules(modulesJSON["modules"]);
  return (
    <main>
      <PageContainer extraClasses={`m-auto mt-20 md:mt-0 p-8 flex flex-col gap-6`}>
        <h1
          className={`${fontSerif.className} text-5xl sm:text-6xl lg:text-7xl 
                      text-center mb-4`}
        >
          About Me
        </h1>
        <div className={'max-lg:flex flex-col items-center gap-6'}>
          <div className={'overflow-hidden'}>
            <div
              className={`relative w-[250px] md:w-[350px] aspect-square 
                        lg:float-right rounded-full overflow-clip m-2`}
              style={{ shapeOutside: "circle()" }}
            >
              <Image
                src={"/profile-photo.jpg"}
                alt={"A photo of young, brown-haired man (me), sitting on a pile of logs in front of a field of tulips."}
                fill
                sizes={`(max-width: 768px) 250px, 350px`}
              />
            </div>
            <p className={"max-lg:text-center mb-4"}>
              I&apos;m Jack Sanders, a third-year student at the University of Sheffield, studying for an MComp degree in Computer Science. Over the course of this degree I have undertaken a variety of projects - some of which are displayed on this website. Alongside my computer science degree, I am also in my second year of a three-year course in Dutch, which will massively expand my personal horizons and afford me many future opportunities, both in the UK and abroad.
              <br className={`mb-2`} />
              While my degree has massively developed my technical ability, I would say that it has also provided me with the opportunity to develop my soft skills even - for example my ability to work effectively in a team. Prior to coming to university I had never worked in a software engineering team, much less led one, but now I feel perfectly comfortable working alongside others, sharing ideas, and even taking the lead when necessary.
            </p>
          </div>

          <div className={'clear-right mt-8 mb-8'}>
            <p>
              As part of my dutch studies, I was asked to take part in a promotional video for the university&apos;s Languages for all program, which you can watch either below, or on the <a href={'https://www.sheffield.ac.uk/languages-for-all/choose-language/dutch'} className={`underline hover-link dark:hover-link-dark`}>Languages for All Dutch Course&apos;s homepage</a>. At first, this was a daunting prospect, as I had never been on film like this before, and the prospect of being one of the first things that prospective Dutch students would see when they looked on the course website was, admittedly, slightly scary. However, I ultimately decided that I needed to push myself out of my comfort zone to enable more personal growth, and this was a golden opportunity to do just that. Overall, I am very thankful that I decided to study Dutch - as well as teaching me a useful new skill, I have also managed to develop my confidence and self-belief, both of which will serve me very well in future.
            </p>

            <div className={`w-1/2 aspect-video m-auto mt-4`}>
              <iframe className={`w-full h-full`}
                      title={`Dutch at the University of Sheffield`}
                      src="https://www.youtube-nocookie.com/embed/Yt1lXzREX14?origin=https%3A%2F%2Fjacksanders.uk"
                      allowFullScreen
              />
            </div>
          </div>

          <div className={`w-full clear-right`}>
            <h2 className={`${fontSerif.className} text-2xl sm:text-3xl lg:text-4xl text-center mb-2`}>Academic Achievements</h2>
            {
              // Build a table header + body combo for each year that has modules inputted
              Object.keys(modulesByYear)
                .map(year => parseInt(year))
                .filter(year => modulesByYear[year].length > 0)
                .map(year => (
                  <table className={`w-full border-separate border-spacing-x-6 border-spacing-y-3`} key={`year-${year}`}>
                    <ModuleTableHeader year={year} />
                    <tbody>
                    {buildTableRows(modulesByYear[year], year)}
                    </tbody>
                  </table>
                ))
            }
          </div>
        </div>
      </PageContainer>
    </main>
  )
}