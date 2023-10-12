import React from "react";
import { fontSerif } from "@/app/fonts";

export default function ModuleTableHeader({
  year,
  className
}: {
  year: number;
  className?: string;
}): React.ReactNode {
  return (
    <>
      <h3
        className={`${fontSerif.className} underline text-center mt-10 text-xl sm:text-2xl lg:text-3xl col-span-3`}>
        Year {year}
      </h3>
      <p className={'bold underline text-left text-md lg:text-xl hidden lg:block'}>Module Name</p>
      <p className={'bold underline text-right text-md lg:text-xl hidden lg:block'}>Grade</p>
      <div />
    </>
  )
}