import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import PageTitle from '@/components/PageTitle';
import { fontSerif } from '@/app/fonts';

function Project({
  name,
  imageLink,
  imageAlt,
  description,
  downloadLink,
  demoLink,
}: {
  name: string;
  imageLink: string;
  imageAlt: string;
  description: string;
  downloadLink?: string;
  demoLink?: string;
}): React.ReactNode {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="aspect-square flex items-center justify-center max-w-[66vw]">
        <Image src={imageLink} alt={imageAlt} height={500} width={500} />
      </div>
      <h2 className={`${fontSerif.className} text-3xl`}>{name}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }} />

      {downloadLink && (
        <Link
          href={downloadLink}
          target={`${downloadLink.startsWith('/') ? '_self' : '_blank'}` /* Open external links in new tab */}
          className="hover-button dark:hover-button-dark"
        >
          <i className="bi bi-download me-2" />
          Download it here!
        </Link>
      )}

      {demoLink && (
        <Link
          href={demoLink}
          target={`${demoLink.startsWith('/') ? '_self' : '_blank'}` /* Open external links in new tab */}
          className="hover-button dark:hover-button-dark"
        >
          <i className="bi bi-joystick me-2" />
          Try it out for yourself!
        </Link>
      )}
    </div>
  );
}

/**
 * page.tsx
 */
export default function page(): React.ReactNode {
  return (
    <main>
      <PageContainer>
        <div className="flex flex-col gap-1">
          <PageTitle>Projects</PageTitle>
          <p className="text-center">
            A collection (in no particular order) of things I&apos;ve made: webapps, downloadable
            programs, and everything in between.
          </p>
          <div className="mt-16 grid lg:grid-cols-2 2xl:grid-cols-3 gap-24">
            <Project
              name="Residence Evil"
              imageLink="/all-projects/residence-evil.png"
              imageAlt="A screenshot of the game 'Residence Evil'"
              description={'This game was made over the span of 48 hours by me and three friends, '
                + "during the SheffJamX hackathon, where the prompt was 'go big or go home'. We initially "
                + 'thought of a wholesome metaphorical interpretation: a game in which the player must leave '
                + "home and 'go big' in the world, before deciding that it would be funnier if, while running "
                + 'away from home, your home ran after you.'}
              demoLink="/residence-evil"
              downloadLink="https://www.lexaloffle.com/bbs/?tid=140170"
            />
            <Project
              name="Maze Generator & Solver"
              imageLink="/all-projects/maze-solver.png"
              imageAlt="A screenshot of my maze solver"
              description={"This was one of my oldest 'good' projects, made in vanilla HTML/CSS/JavaScript "
                + 'back when I first learnt about the A* algorithm and wanted to make something cool with it. '
                + 'It sort of just sat about for a few years until I finally got round to rewriting it in '
                + 'Next.js so that it can be hosted on this website, where it is available to anybody who may '
                + 'want to try it out.'}
              demoLink="/maze-generator"
            />
            <Project
              name="Very Secure Website"
              imageLink="/all-projects/very-secure.png"
              imageAlt="A screenshot of the words 'Very Secure Website'"
              description={'This website was made by me and a friend over the course of 24 hours, for the '
                + "HackSheffield8 hackathon (which we won!). It functions (just about) as a 'hack the box'-style teaching tool "
                + 'for first-year students who want to experiment with (and learn how to prevent) a variety '
                + 'of common vulnerabilities, such as authentication/access control failures, shoddy cryptography, '
                + "and, everyone's favourite, "
                + "<a href='https://xkcd.com/327/' target='_blank' class='underline hover-link dark:hover-link-dark'>SQL injections</a>."}
              demoLink="https://www.pleasedonothack.us"
            />
            <Project
              name="Shareable Countdown Timer"
              imageLink="/all-projects/countdown.png"
              imageAlt="A screenshot of my countdown timer"
              description={'The idea for this arose during a conversation with my girlfriend, in which she said she would listen '
                + "to a song that I sent in '14 min and 33 sec'. Naturally, being the precise, always-on-time*, person that "
                + "I am, I searched 'shareable online timer', clicked the first option, and set a timer. However, unbeknownst "
                + 'to me, this timer did not take timezones into account. My version, however, has a simple, no-fuss interface, '
                + 'and does take timezones into account, meaning you can share your timer across the globe with no issue whatsoever.'}
              demoLink="/countdown-timer"
            />
            <Project
              name="Perceptron Learning Algorithm Visualiser"
              imageLink="/projects/PLA-vis/perceptron-run.png"
              imageAlt="A screenshot of the visualiser"
              description={'This was a quick project that I did with a friend after the winter exam period in our second year of '
                + "university. In our 'Data Driven Computing' module, we learnt about this algorithm, and how (relatively) simple "
                + 'it is for a single-layer perceptron to draw a decision boundary between two linearly-separable classes. In '
                + 'order to further our understanding of this algorithm, we decided to collaborate on a highly-customisable '
                + 'visualiser for this algorithm. Users have the option of adding their own custom dataset, slowing '
                + 'down/speeding up the algorithm, and seeing how the weights update in realtime.'}
              downloadLink="https://github.com/kj-collabs/simple-linear-perceptron"
            />
            <Project
              name="NotifReminders"
              imageLink="/all-projects/notif-reminders.png"
              imageAlt="The logo of my NotifReminders app"
              description={'This is a very simple app that I made, which can be used to write reminders directly to your '
                + 'notifications. Prior to creating this, I found that an effective way to remind myself to do something '
                + 'as soon as possible (buy bread, etc.) was to set a reminder for 1 minute into the future, wait for it to pop '
                + 'up, and simply leave it in my notifications bar. However, this was far from an ideal process, not least '
                + 'because it simply resulted in an calendar that is constantly cluttered with mundane reminders. To combat '
                + 'this, I decided to write this simple android app (sorry iOS users, call me when you can sideload apps**), '
                + 'which I still use regularly to this day.'}
              downloadLink="https://github.com/jacksanders02/NotifReminders"
            />
          </div>
          <p className="mt-14 text-center">* I lied</p>
          <p className="text-center">
            **
            {' '}
            <Link
              href="https://www.theverge.com/2024/1/25/24050200/apple-third-party-app-stores-allowed-iphone-ios-europe-digital-markets-act"
              target="_blank"
              className="underline hover-link dark:hover-link-dark"
            >
              Turns out iPhone users
              {' '}
              <span className="italic">can</span>
              {' '}
              now sideload apps (yay!). However, only in the EU (😢).
            </Link>
          </p>
        </div>
      </PageContainer>
    </main>
  );
}
