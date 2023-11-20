import React from "react";
import { fontSerif } from "@/app/fonts";

export default function PageTitle({
  children,
  extraClasses
}: {
  children: React.ReactNode;
  extraClasses?: string;
}): React.ReactElement {
  return (
    <h1
      className={`${fontSerif.className} text-5xl sm:text-6xl lg:text-7xl 
                      text-center mb-2 ${extraClasses}`}
    >
      {children}
    </h1>
  );
}