import React from "react";

export default function PaddedDiv({
  children,
  id,
  extraClasses
}: {
  children: React.ReactNode;
  id?: string;
  extraClasses?: string;
}): React.ReactElement {
  return (
    <div
      id={id ? id : ""}
      className={`md:w-[60%] min-[1200px]:max-2xl:w-[50%] 
                  ${extraClasses ? extraClasses : ""}`}
    >
      {children}
    </div>
  );
}