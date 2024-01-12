"use client";
import React, { useState } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { fontMono } from "@/app/fonts";
import { usePathname, useRouter } from "next/navigation";
import Countdown from "react-countdown";

export default function CountdownTimer({
  searchParams
}: {
  searchParams: {t: string}
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  async function setTimer() {
    let time_seconds = Math.floor((new Date()).getTime() / 1000)
    if (isNaN(+(days + '.')) || isNaN(+(hours+'.')) || isNaN(+(minutes+'.')) || isNaN(+(seconds+'.'))) {
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

  return (
    <main>
      <PageContainer extraClasses={"items-center"}>
        <PageTitle>Countdown Timer</PageTitle>
        {isNaN(time) && (
          <>
            <p>Set a timer using the inputs below:</p>

            {errorMessage !== null && (
              <p className={`text-red-700 font-bold text-center`}>{errorMessage}</p>
            )}
            <div className={`${fontMono.className} text-xl flex flex-row gap-2 items-center h-8`}>
              <input
                type={"text"}
                maxLength={4}
                placeholder={"DAYS"}
                onChange={(e) => setDays(e.target.value)}
                className={"w-16 text-center"}
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
              className={"hover-button dark:hover-button-dark w-64"}
            >
              Set Timer
            </button>
          </>
        )}
        {!isNaN(time) && (
          <div className={`flex flex-col gap-6 items-center`}>
            <Countdown
              date={time*1000}
              now={() => new Date().getTime()}
              className={`${fontMono.className} text-9xl mt-32`}
            />
            <a href={'/countdown-timer'} className={'hover-button dark:hover-button-dark w-max'}>Set a new timer</a>
            <div className={'flex flex-col items-center'}>
              <p>Link to this timer:</p>
              <p className={'underline'}>https://www.jacksanders.uk{pathname}?t={time}</p>
            </div>
          </div>
        )}
      </PageContainer>
    </main>
  );
}