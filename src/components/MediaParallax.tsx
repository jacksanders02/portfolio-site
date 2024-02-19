'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Parallax } from 'react-scroll-parallax';

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
});

/**
 * A responsive parallax for the hero section.
 * On smaller heights, the list of projects sometimes catches up to the website title,
 * so the best solution is to start with the parallax being faster, and then slow it down
 * as the screen size increases.
 * @param children {React.JSX.Element[]} The elements that should go inside the Parallax
 * @constructor
 */
export default function MediaParallax({
  children,
}: {
  children: React.JSX.Element[];
}): React.ReactElement {
  return (
    <div className="pointer-events-none m-auto z-20">
      <MediaQuery maxHeight={849}>
        <Parallax speed={-15}>{children}</Parallax>
      </MediaQuery>
      <MediaQuery minHeight={850} maxHeight={999}>
        <Parallax speed={-20}>{children}</Parallax>
      </MediaQuery>
      <MediaQuery minHeight={1000}>
        <Parallax speed={-25}>{children}</Parallax>
      </MediaQuery>
    </div>
  );
}
