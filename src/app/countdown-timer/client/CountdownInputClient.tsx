'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fontMono } from '@/app/fonts';

/**
 * CountdownInputClient.tsx
 */
export default function CountdownInputClient(): React.ReactNode {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [days, setDays] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  const router = useRouter();

  async function setTimer() {
    let timeSeconds = Math.floor(new Date().getTime() / 1000);

    if (Number.isNaN(+days) || Number.isNaN(+hours)
        || Number.isNaN(+minutes) || Number.isNaN(+seconds)) {
      setErrorMessage('Please ensure all entered values are numbers!');
    } else {
      // Taking advantage of JS weirdness again for converting strings to ints
      timeSeconds += 24 * 60 * 60 * +days;
      timeSeconds += 60 * 60 * +hours;
      timeSeconds += 60 * +minutes;
      timeSeconds += +seconds;

      router.push(`/countdown-timer?t=${timeSeconds}`);
    }
  }

  return (
    <>
      <p className="text-xl sm:text-2xl lg:text-3xl text-center">
        Set a timer using the below inputs:
      </p>

      {errorMessage !== null && (
        <p className="text-red-700 font-bold text-center">{errorMessage}</p>
      )}
      <div
        className={`${fontMono.className} text-xl sm:text-2xl lg:text-3xl flex flex-row gap-2 items-center`}
      >
        <input
          type="text"
          maxLength={4}
          placeholder="DAYS"
          onChange={(e) => setDays(e.target.value)}
          className="w-20 text-center"
        />
        -
        <input
          type="text"
          maxLength={2}
          placeholder="HH"
          onChange={(e) => setHours(e.target.value)}
          className="w-10 text-center"
        />
        :
        <input
          type="text"
          maxLength={2}
          placeholder="MM"
          onChange={(e) => setMinutes(e.target.value)}
          className="w-10 text-center"
        />
        :
        <input
          type="text"
          maxLength={2}
          placeholder="SS"
          onChange={(e) => setSeconds(e.target.value)}
          className="w-10 text-center"
        />
      </div>

      <button
        type="submit"
        onClick={setTimer}
        className="hover-button dark:hover-button-dark w-64 text-lg sm:text-xl lg:text-2xl mt-1.5"
      >
        Set Timer
      </button>
    </>
  );
}
