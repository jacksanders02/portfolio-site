import React from "react";

export default function PageContainer({
  children,
  id,
  extraClasses,
  isProjectDisplay
}: {
  children: React.ReactNode;
  id?: string;
  extraClasses?: string;
  isProjectDisplay?: boolean;
}): React.ReactElement {
  return (
    <div
      id={id ? id : ""}
      className={
        `md:w-[60%] min-[1200px]:max-2xl:w-[50%] ${extraClasses ? extraClasses : ""}
         ${!isProjectDisplay && 'm-auto mt-20 md:mt-0 p-8 flex flex-col gap-6'}`
      }
    >
      {children}
    </div>
  );
}