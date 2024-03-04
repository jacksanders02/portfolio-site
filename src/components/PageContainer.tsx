import React from 'react';

export default function PageContainer({
  children,
  id,
  extraClasses,
  isProjectCard,
}: {
  children: React.ReactNode;
  id?: string;
  extraClasses?: string;
  isProjectCard?: boolean;
}): React.ReactElement {
  return (
    <div
      id={id || ''}
      className={`md:w-[66%] ${
        extraClasses || ''
      }
         ${!isProjectCard && 'm-auto mt-16 p-8 flex flex-col gap-6'}`}
    >
      {children}
    </div>
  );
}
