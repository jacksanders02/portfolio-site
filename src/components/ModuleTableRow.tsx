import React from 'react';
import ExpandButton from '@/components/ExpandButton';
import { IModule } from '@/helpers/db/schema';

/**
 * ModuleTableRow.tsx
 * Creates a row of the module tables displayed on my 'about me' page
 */
export default function ModuleTableRow({
  module,
}: {
  module: IModule;
}): React.ReactNode {
  const ebRef = React.useRef<ExpandButton>(null);
  return (
    <button
      type="button"
      aria-label="Expand module information"
      className="flex flex-col w-full items-center lg:contents cursor-pointer hover-link dark:hover-link-dark"
      onClick={ebRef.current?.toggleOpen}
    >
      <p
        dangerouslySetInnerHTML={{ __html: module.name }}
        className="max-lg:text-center max-lg:text-xl max-lg:font-bold max-lg:underline"
      />
      <p className="text-right max-lg:grade-prefix">{module.grade}</p>

      {/* @ts-ignore custom prop error */}
      <ExpandButton ref={ebRef} moduleDescription={module.description} />
    </button>
  );
}
