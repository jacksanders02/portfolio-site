import React from 'react';
import { fontSerif } from '@/app/fonts';

export default function PageSubTitle({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <h2
      className={`${fontSerif.className} text-xl sm:text-2xl lg:text-3xl text-center`}
    >
      {children}
    </h2>
  );
}
