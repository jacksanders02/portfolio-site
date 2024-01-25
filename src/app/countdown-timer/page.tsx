import React from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import CountdownInputClient from "@/app/countdown-timer/client/CountdownInputClient";
import CountdownClockClient from "@/app/countdown-timer/client/CountdownClockClient";

export default function CountdownTimer({
  searchParams
}: {
  searchParams: {t: string}
}) {
  // JavaScript strangeness to convert string to number (stricter than parseInt)
  const time: number = +(searchParams.t);
  const endDate: Date = new Date(0);

  if (!isNaN(time)) {
    // Time exists, so initialise variables showing user countdown info
    endDate.setUTCSeconds(time)
  }

  return (
    <main>
      <PageContainer extraClasses={"items-center !pt-0 !pb-0 !mt-0 !mb-0"}>
        <PageTitle extraClasses={'pt-5 mt-16'}>Countdown Timer</PageTitle>
        {isNaN(time) && (
          <CountdownInputClient />
        )}
        {!isNaN(time) && (
          <div className={`flex flex-col gap-6 items-center justify-center h-screen w-full text-xs md:text-lg`}>
            <div className={`flex flex-col items-center`}>
              <CountdownClockClient time={time} />
              <p className={`text-center`}>This timer will end at: {endDate.toString()}</p>
            </div>
            <a href={'/countdown-timer'} className={'hover-button dark:hover-button-dark w-max'}>Set a new timer</a>
            <div className={'flex flex-col items-center'}>
              <p>Link to this timer:</p>
              <p className={'underline text-center'}>https://www.jacksanders.uk/countdown-timer?t={time}</p>
            </div>
          </div>
        )}
      </PageContainer>
    </main>
  );
}