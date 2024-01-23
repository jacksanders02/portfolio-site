import React from "react";
import Image from "next/image";
import { fontSerif } from "@/app/fonts";

/**
 * Footer.tsx
 */
export default function Footer(): React.ReactNode {
  return (
    <footer className={"flex justify-center items-center"}>
      <div
        className={`p-4 border-t-2 border-on-background dark:border-on-background-dark w-max flex flex-col items-center`}
      >
        <p className={`${fontSerif.className} text-3xl sm:text-4xl lg:text-5xl text-center italic mb-4`}>JS</p>
        <p>
          Built by myself using <a href={'nextjs.com'} className={'hover-link dark:hover-link-dark underline'}>Next.js</a> along
          with <a href={'tailwindcss.com'} className={'hover-link dark:hover-link-dark underline'}>Tailwind</a>.
          Deployed with <a href={'vercel.com'} className={'hover-link dark:hover-link-dark underline'}>Vercel.</a>
        </p>
      </div>
    </footer>
  );
}