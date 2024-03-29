import React from 'react';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import PageTitle from '@/components/PageTitle';
import CountdownInputClient from '@/app/countdown-timer/client/CountdownInputClient';
import CountdownClockClient from '@/app/countdown-timer/client/CountdownClockClient';

export default function CountdownTimer({
  searchParams,
}: {
  searchParams: { t: string };
}) {
  // JavaScript strangeness to convert string to number (stricter than parseInt)
  const time: number = +searchParams.t;
  const endDate: Date = new Date(0);

  if (!Number.isNaN(time)) {
    // Time exists, so initialise variables showing user countdown info
    endDate.setUTCSeconds(time);
  }

  return (
    <main className="flex items-stretch">
      <PageContainer extraClasses="items-center !mb-0">
        <PageTitle>Countdown Timer</PageTitle>
        <div
          className="flex flex-col gap-6 items-center justify-center text-xs md:text-lg flex-fill-space"
        >
          {Number.isNaN(time) && <CountdownInputClient />}
          {!Number.isNaN(time) && (
            <>
              <div className="flex flex-col items-center">
                <CountdownClockClient time={time} />
                <p className="text-center">
                  This timer will end at:
                  {' '}
                  {endDate.toString()}
                </p>
              </div>
              <Link
                href="/countdown-timer"
                className="hover-button dark:hover-button-dark w-max"
              >
                Set a new timer
              </Link>
              <div className="flex flex-col items-center">
                <p>Link to this timer:</p>
                <p className="underline text-center">
                  https://www.jacksanders.uk/countdown-timer?t=
                  {time}
                </p>
              </div>
            </>
          )}
        </div>
      </PageContainer>
    </main>
  );
}
