import PaddedDiv from "@/components/PaddedDiv";
import { fontSerif } from "@/app/fonts";
import Image from "next/image";

/**
 * More information about my systems design project
 * @constructor
 */
export default function SystemsDesignWriteup() {
  return (
    <main>
      <PaddedDiv extraClasses={`m-auto mt-20 md:mt-0 p-8 flex flex-col gap-6`}>
        <div className={`flex flex-col gap-2 mb-2`}>
          <h1
            className={`${fontSerif.className} text-5xl sm:text-6xl lg:text-7xl 
                      text-center mb-2`}
          >
            Systems Design Project
          </h1>

          <h2
            className={`${fontSerif.className} text-xl sm:text-2xl lg:text-3xl text-center mb-2`}
          >
            Individual Grade Achieved: 79%
          </h2>
        </div>

        <p className={`text-center`}>
          For this project, my team and I were tasked with creating a system that could be used in a fictional bike company, with the idea that customers would look around the warehouse, making notes of which parts they would like for their bike (IKEA-style) before ordering their bike at a tablet somewhere in the warehouse. From here, their order would be stored in the database, and marked as &lsquo;pending&rsquo;. Customers would then proceed to a checkout, where a staff member would load up their order, take payment from the customer, and confirm their order. The order would then be assembled & shipped, after which it would be marked as &lsquo;complete&rsquo;.
          <br className={`mb-2`} />
          Since the database for this project was hosted on university servers when we were developing it, minimising the number of SQL queries (and therefore connections to the database) was crucial to maintaining a high level of system performance. This issue was most prevalent on the &lsquo;Track Orders&rsquo; page, where queries to 8 different tables were needed (Orders, Customers, Addresses, OrderComponents, Components, Brands, Handlebars, FrameSets, Wheels). I managed to massively increase the performance of this page by creating an OrderInfo model that combined all of those queries into one large one, containing a lot of inner & left joins, which made just one query to the remote database, increasing the performance as less time was wasted in establishing connections to the database.
        </p>

        <div className={'flex flex-col gap-1 items-center'}>
          <div className={`relative w-[100%] aspect-[1.86] border-2 border-colour-background-dark`}> {/* Image Container */}
            <Image
              src={"/projects/systems-design/freshly-opened.png"}
              alt={`The default screen for my systems design project. On the left is a list of bike frames, next to an empty receipt.`}
              fill
            />
          </div>
          <p className={`text-center`}>The default screen for my team&apos;s systems design project</p>
        </div>

        <div className={'flex flex-col gap-1 items-center'}>
          <video
            autoPlay
            loop
            muted
            className={`relative w-[100%] border-2 border-colour-background-dark`}
          >
            <source src={"/projects/systems-design/placing-order.mp4"} type={`video/mp4`} />
            Your browser does not support the video tag :(
          </video>
          <p className={`text-center`}>
            An example of how a user would place an order
          </p>
        </div>

        <p className={`text-center`}>
          During this project, I was responsible for the bike builder page, as well as the overall design of the program. In order to keep a consistent design across pages made by different members of the team, I made a variety of helper classes - for example a &lsquo;Fonts&rsquo; class, that stored all of the fonts used across the program, and made it easy to access them, rather than having to load the font in each file that used it.
          <br className={`mb-2`} />
          I also implemented threading into the component loader, in order to load all of the bike components from the database without locking user input. This drastically improved performance as, before implementing threading, the system would freeze for roughly 10-15 seconds after placing an order, as it repopulated the JTables on the left with components & their updated quantities.
        </p>

        <div className={'flex flex-col gap-1 items-center'}>
          <video
            autoPlay
            loop
            muted
            className={`relative w-[100%] border-2 border-colour-background-dark`}
          >
            <source src={"/projects/systems-design/staff-procedure.mp4"} type={`video/mp4`} />
            Your browser does not support the video tag :(
          </video>
          <p className={`text-center`}>An example of how a staff member might use the system.</p>
        </div>

        <p className={`text-center`}>
          The staff workflow was also a responsibility of mine during the course of this project. First off, to keep staff logins secure, I developed a PasswordHash helper class, which implements the <a className={`underline hover-link dark:hover-link-dark`} href={`https://en.wikipedia.org/wiki/PBKDF2`}>PBKDF2-HMAC-SHA512</a> key derivation function in order to hash the passwords of members of staff members before they are stored in the database.
          <br className={`mb-2`} />
          I also created a class that could display a list of orders as shown in the above video. Orders are collapsed by default to allow staff members to quickly scan for the order number/customer name that they are looking for, before being able to expand the order to show all of the details, or to action the order. This class was reused by the team member who programmed the &lsquo;Track Orders&rsquo; page, since the functionality for that is essentially the same, although the buttons to action an order are not displayed, instead replaced by an option to delete pending orders.
        </p>
      </PaddedDiv>
    </main>
  )
}