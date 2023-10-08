import PaddedDiv from "@/components/PaddedDiv";
import { fontSerif } from "@/app/fonts";
import Image from "next/image";

/**
 * More information about my software hut project
 * @constructor
 */
export default function SoftwareHutWriteup() {
  return (
    <main>
      <PaddedDiv extraClasses={`m-auto mt-20 md:mt-0 p-8 flex flex-col gap-6`}>
        <div className={`flex flex-col gap-2 mb-2`}>
          <h1
            className={`${fontSerif.className} text-5xl sm:text-6xl lg:text-7xl 
                      text-center mb-2`}
          >
            Software Hut Project
          </h1>

          <h2
            className={`${fontSerif.className} text-xl sm:text-2xl lg:text-3xl text-center mb-2`}
          >
            Individual Grade Achieved: 95%
          </h2>

          <h2
            className={`${fontSerif.className} text-xl sm:text-2xl lg:text-3xl text-center`}
          >
            Software Hut Prize (Client Awarded)
          </h2>
        </div>

        <p className={`text-center`}>For this project, my team and I were tasked with creating a system that our client could &lsquo;interrogate for data&rsquo; about various golf courses. During the course of our weekly client meetings, we captured his requirements in the form of story cards and mockup diagrams. The outline of the system is as follows: there are two main roles - map creators and regular users. The role of map creators is to create detailed maps of the holes of golf courses, which can then be utilised by regular users in optimising their golf game in a data-driven manner, using the <a className={`underline hover-link dark:hover-link-dark`} href={`https://www.golfmonthly.com/features/the-game/what-is-strokes-gained-185460`}>strokes gained</a> metric.</p>

        <div className={'flex flex-col gap-1 items-center'}>
          <div className={`relative w-[100%] aspect-[1.86] border-2 border-colour-background-dark`}> {/* Image Container */}
            <Image
              src={"/projects/software-hut/login-page.png"}
              alt={`The login page of my software hut project. A faint outline of
                    a golf course is visible next to the login form.`}
              fill
            />
          </div>
          <p className={`text-center`}>The login page of my team&apos;s software hut project</p>
        </div>

        <div className={'flex flex-col gap-1 items-center'}>
          <video
            autoPlay
            loop
            muted
            className={`relative w-[100%] border-2 border-colour-background-dark`}
          >
            <source src={"/projects/software-hut/map-creation.mp4"} type={`video/mp4`} />
            Your browser does not support the video tag :(
          </video>
          <p className={`text-center`}>
            An example of how a map creator might use the system.
          </p>
        </div>

        <p className={`text-center`}>
          My main role in the project was programming the map interactions - such as the above page. In order to do this I used <a className={`underline hover-link dark:hover-link-dark`} href={`leafletjs.com`}>Leaflet</a> to create the base map, and <a className={`underline hover-link dark:hover-link-dark`} href={`geoman.io`}>Leaflet Geoman</a> to allow the map creator to draw on the map. Using geoman, I was able to create a variety of different custom polygon drawing controls - one for each of the terrain types that we agreed on with our client. These are all styled with custom CSS to create the look of our application, using SCSS variables for all of the terrain colours, in order to keep a consistent look between what is displayed on the sidebar, and what is drawn on the map. Map creators can also change the &lsquo;tag&rsquo; of the map (for example, from &lsquo;In Development&rsquo; to &lsquo;Complete&rsquo;). This will control what regular users can see, as they are only permitted to view courses that are marked as &lsquo;Complete&rsquo;. Once done, they can save their changes, which will be written to the database. I used the <a className={`underline hover-link dark:hover-link-dark`} href={`https://overpass-turbo.eu/`}>Overpass Turbo API</a> to pre-populate the database with the locations and outlines of every golf course that is marked on openstreetmap, meaning the only thing that map creators had to do was draw the detail on the holes.
          <br className={`mb-2`} />
          I also wrote the page for users to annotate the map, which is identical to this one and therefore is not shown on this page. The only difference between this and the annotation page is the fact that when a user presses the save button, the map is not saved to the global &lsquo;courses&rsquo; database, but rather to the user&apos;s own &lsquo;annotations&rsquo; table within the database.
        </p>

        <div className={'flex flex-col gap-1 items-center'}>
          <video
            autoPlay
            loop
            muted
            className={`relative w-[100%] border-2 border-colour-background-dark`}
          >
            <source src={"/projects/software-hut/user-optimal.mp4"} type={`video/mp4`} />
            Your browser does not support the video tag :(
          </video>
          <p className={`text-center`}>An example of how a user might use the system.</p>
        </div>

        <p className={`text-center`}>
          Programming the above page was another of my responsibilities over the course of the project, as it was mainly map interaction. Users can select their starting point, and then click around on the map to see how many strokes they would gain/lose if their shot followed the displayed white line. They can also toggle their shot dispersion for a specific club (the script for this was written by one of my teammates), to see whether their selected aiming point is realistic for them. The main part of this page, which was initially set by our client as a most-likely unreachable target, is the shot optimisation aspect. As shown in the above video, users can click on a button which will run an algorithm to determine their best shot from their current position, and have that displayed on the map.
          <br className={`mb-2`} />
          The algorithm that I wrote for this essentially takes a random sample of points across the user&apos;s dispersion for a club (1 point for every square metre), calculates the average strokes gained for each aiming point within a 150&deg; cone, centered on the hole (as it is highly unlikely that the optimal shot will be outside of that range, and limiting the search range speeds up the algorithm massively), and outputs the club/aim point combination that produces the best average strokes gained. The algorithm also takes into account trees - if the shot being checked starts or ends less than 20m from a tree that that the line of the shot intersects, it is assumed that that tree will be blocking the shot, and therefore that shot is discarded. However, this only works if a tree has been marked on the map - either by the map creators, or by the user themselves in their annotations. The 20m threshold is somewhat arbitrary - it is the distance that a ball would need to travel to clear a 20m high tree, assuming the ball is travelling at 45&deg;. This could be improved by allowing the map creator to change the height of the trees that they are marking, and then checking the shot line against individual tree heights, rather than assuming that all trees are 20m tall.
        </p>
      </PaddedDiv>
    </main>
  )
}