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
    <thead className={className}>
      <tr>
        <th colSpan={3} className={`${fontSerif.className} text-center  text-xl sm:text-2xl lg:text-3xl`}>Year {year}</th>
      </tr>
      <tr>
        <th className={'underline text-left text-md sm:text-lg lg:text-xl'}>Module Name</th>
        <th className={'underline text-left text-md sm:text-lg lg:text-xl'}>Module Description</th>
        <th className={'underline text-left text-md sm:text-lg lg:text-xl'}>Grade</th>
      </tr>
    </thead>
  )
}