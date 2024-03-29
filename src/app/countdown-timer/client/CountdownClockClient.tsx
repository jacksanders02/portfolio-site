'use client';

import React from 'react';
import Countdown from 'react-countdown';
import { fontMono } from '@/app/fonts';
import CountdownRenderer from '@/components/CountdownRenderer';

/**
 * CountdownClockClient.tsx
 */
export default function CountdownClockClient({
  time,
}: {
  time: number;
}): React.ReactNode {
  return (
    <Countdown
      date={time * 1000}
      now={() => new Date().getTime()}
      className={`${fontMono.className} text-4xl md:text-8xl lg:text-9xl`}
      renderer={CountdownRenderer}
    />
  );
}
