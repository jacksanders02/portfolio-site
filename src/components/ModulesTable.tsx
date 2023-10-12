"use client"
import modulesJSON from "@/data/modules.json";
import { Module } from "@/helpers/types";
import ModuleTableHeader from "@/components/ModuleTableHeader";
import { fontSerif } from "@/app/fonts";
import React, { useRef } from "react";
import ExpandButton from "@/components/ExpandButton";

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

function buildTableRows(modules: Module[]): React.ReactNode {
  return modules.map((module: Module, i: number) => {
    const expandRef: React.MutableRefObject<ExpandButton | null> = useRef(null);
    // @ts-ignore
    return (
      <>
        <div
          className={`flex flex-col w-full items-center lg:contents cursor-pointer hover-link dark:hover-link-dark`}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            expandRef.current?.toggleOpen();
          }}
        >
          <p
            dangerouslySetInnerHTML={{ __html: module.name }}
            className={
              "max-lg:text-center max-lg:text-xl max-lg:font-bold max-lg:underline"
            }
          />
          <p className={"text-right max-lg:grade-prefix"}>{module.grade}</p>
          {/* @ts-ignore custom prop error */}
          <ExpandButton ref={expandRef} moduleDescription={module.description}/>
        </div>

        <div
          className={
            "col-span-3 border-b-2 border-on-background dark:border-on-background-dark"
          }
        />
      </>
    );
  });
}

export default function ModulesTable(): React.ReactNode {
  const modulesByYear: {[key: number]: Module[]} = splitModules(modulesJSON["modules"]);

  return (
    <div className={`w-full clear-right`}>
      <h2 className={`${fontSerif.className} text-2xl sm:text-3xl lg:text-4xl text-center mb-2`}>Academic Achievements</h2>
      {
        // Build a table header + body combo for each year that has modules inputted
        Object.keys(modulesByYear)
          .map(year => parseInt(year))
          .filter(year => modulesByYear[year].length > 0)
          .reverse()
          .map(year => (
            <div className={`w-full flex flex-col items-center lg:grid grid-cols-[6fr_max-content_max-content] gap-2`} key={`year-${year}`}>
              <ModuleTableHeader year={year} />
              {buildTableRows(modulesByYear[year])}
            </div>
          ))
      }
    </div>
  )
}