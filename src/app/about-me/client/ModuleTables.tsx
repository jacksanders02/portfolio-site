'use client';

import React, { Fragment, useEffect } from 'react';
import { fontSerif } from '@/app/fonts';
import ModuleTableHeader from '@/components/ModuleTableHeader';
import { IModule, IModuleCollection } from '@/helpers/db/schema';
import ModuleTableRow from '@/components/ModuleTableRow';

const STAGE_SORT = ['A-Level', 'Year 1', 'Year 2', 'Year 3', 'Year 4'];
function mcCompareFunction(
  mc1: IModuleCollection,
  mc2: IModuleCollection,
): number {
  return (
    STAGE_SORT.indexOf(mc2.stage.toString())
    - STAGE_SORT.indexOf(mc1.stage.toString())
  );
}

function buildTableRows(mc: IModuleCollection): React.ReactNode {
  return mc.modules.map((module: IModule) => (
    <Fragment key={`${module.name}`}>
      <ModuleTableRow module={module} />
      <div
        className="col-span-3 border-b-2 border-on-background dark:border-on-background-dark"
      />
    </Fragment>
  ));
}

/**
 * ModuleTables.tsx
 */
export default function ModuleTables(): React.ReactNode {
  const [tables, setTables] = React.useState<React.ReactNode[]>([]);

  async function getModules(): Promise<IModuleCollection[]> {
    return fetch('/get-modules').then((r) => r.json());
  }

  useEffect(() => {
    getModules().then((r: IModuleCollection[]) => {
      setTables(
        r.sort(mcCompareFunction).map((mc: IModuleCollection) => (
          <div
            className="w-full flex flex-col items-center lg:grid grid-cols-[6fr_max-content_max-content] gap-2"
            key={mc.stage.toString()}
          >
            <ModuleTableHeader stage={mc.stage.toString()} />
            {buildTableRows(mc)}
          </div>
        )),
      );
    });
  }, []);

  return (
    <div className="w-full clear-right">
      <h2
        className={`${fontSerif.className} text-2xl sm:text-3xl lg:text-4xl text-center mb-2`}
      >
        Academic Achievements
      </h2>
      {(tables.length > 0 && tables) || (
        <p className="mt-10 w-full flex flex-col items-center text-xl">
          Loading...
        </p>
      )}
    </div>
  );
}
