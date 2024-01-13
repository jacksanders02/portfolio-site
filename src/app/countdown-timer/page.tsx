"use client";
import React, { useState } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { fontMono } from "@/app/fonts";
import { usePathname, useRouter } from "next/navigation";
import Countdown from "react-countdown";
import CountdownRenderer from "@/components/CountdownRenderer";

export default function CountdownTimer({
  searchParams
}: {
  searchParams: {t: string}
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  async function setTimer() {
    let time_seconds = Math.floor((new Date()).getTime() / 1000)

    if (isNaN(+(days)) || isNaN(+(hours)) || isNaN(+(minutes)) || isNaN(+(seconds))) {
      setErrorMessage("Please ensure all entered values are numbers!");
    } else {
      // Taking advantage of JS weirdness again for converting strings to ints
      time_seconds += 24*60*60*+days
      time_seconds += 60*60*+hours
      time_seconds += 60*+minutes
      time_seconds += +seconds

      router.push(`/countdown-timer?t=${time_seconds}`)
    }
  }

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");

  // JavaScript strangeness to convert string to number (stricter than parseInt)
  const time: number = +(searchParams.t);
  const endDate: Date = new Date(0)

  if (!isNaN(time)) {
    // Time exists, so initialise variables showing user countdown info
    endDate.setUTCSeconds(time)
  }

  return (
    <main>
      <PageContainer extraClasses={"items-center pt-0 pb-0"}>
        <PageTitle extraClasses={'fixed pt-5'}>Countdown Timer</PageTitle>
        {isNaN(time) && (
          <div className={`flex flex-col gap-6 items-center justify-center h-screen w-full`}>
            <p className={'text-xl sm:text-2xl lg:text-3xl text-center'}>
              Set a timer using the below inputs:
            </p>

            {errorMessage !== null && (
              <p className={`text-red-700 font-bold text-center`}>{errorMessage}</p>
            )}
            <div className={`${fontMono.className} text-xl sm:text-2xl lg:text-3xl flex flex-row gap-2 items-center`}>
              <input
                type={"text"}
                maxLength={4}
                placeholder={"DAYS"}
                onChange={(e) => setDays(e.target.value)}
                className={"w-20 text-center"}
              />
              -
              <input
                type={"text"}
                maxLength={2}
                placeholder={"HH"}
                onChange={(e) => setHours(e.target.value)}
                className={"w-10 text-center"}
              />
              :
              <input
                type={"text"}
                maxLength={2}
                placeholder={"MM"}
                onChange={(e) => setMinutes(e.target.value)}
                className={"w-10 text-center"}
              />
              :
              <input
                type={"text"}
                maxLength={2}
                placeholder={"SS"}
                onChange={(e) => setSeconds(e.target.value)}
                className={"w-10 text-center"}
              />
            </div>

            <button
              onClick={setTimer}
              className={"hover-button dark:hover-button-dark w-64 text-lg sm:text-xl lg:text-2xl mt-1.5"}
            >
              Set Timer
            </button>
          </div>
        )}
        {!isNaN(time) && (
          <div className={`flex flex-col gap-6 items-center justify-center h-screen w-full`}>
            <div className={`flex flex-col items-center`}>
              <Countdown
                date={time*1000}
                now={() => new Date().getTime()}
                className={`${fontMono.className} text-5xl sm:text-8xl lg:text-9xl`}
                renderer={CountdownRenderer}
              />
              <p className={`text-center`}>This timer will end at: {endDate.toString()}</p>
            </div>
            <a href={'/countdown-timer'} className={'hover-button dark:hover-button-dark w-max'}>Set a new timer</a>
            <div className={'flex flex-col items-center'}>
              <p>Link to this timer:</p>
              <p className={'underline text-center'}>https://www.jacksanders.uk{pathname}?t={time}</p>
            </div>
          </div>
        )}
      </PageContainer>
    </main>
  );
}