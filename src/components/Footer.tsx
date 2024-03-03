import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fontSerif } from '@/app/fonts';

/**
 * Footer.tsx
 */
export default function Footer(): React.ReactNode {
  return (
    <footer className="flex justify-center items-center">
      <div
        className="p-4 border-t-2 border-on-background dark:border-on-background-dark w-max flex flex-col items-center text-center gap-4"
      >
        <p
          className={`${fontSerif.className} text-3xl sm:text-4xl lg:text-5xl text-center italic`}
        >
          JS
        </p>
        <p>
          Built by myself using
          {' '}
          <Link
            href="https://nextjs.org"
            target="_blank"
            className="hover-link dark:hover-link-dark underline"
          >
            Next.js
          </Link>
          {' '}
          and
          {' '}
          <Link
            href="https://tailwindcss.com"
            target="_blank"
            className="hover-link dark:hover-link-dark underline"
          >
            Tailwind
          </Link>
          . Deployed with
          {' '}
          <Link
            href="https://vercel.com"
            target="_blank"
            className="hover-link dark:hover-link-dark underline"
          >
            Vercel
          </Link>
          .
        </p>
        <div className="flex flex-row gap-4">
          <Link href="https://notbyai.fyi/" target="_blank">
            <Image
              src="/not-by-ai/by-human-white.svg"
              alt="Badge indicating that this page was not written by AI"
              width={150}
              height={100}
            />
          </Link>
          <Link href="https://notbyai.fyi/" target="_blank">
            <Image
              src="/not-by-ai/door-mensen-white.svg"
              alt="Badge indicating that this page was not written by AI"
              width={150}
              height={100}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
