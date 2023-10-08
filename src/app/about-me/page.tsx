import React from "react";
import PageContainer from "@/components/PageContainer";
import { fontSerif } from "@/app/fonts";
import Image from "next/image";

export default function AboutMe(): React.ReactNode {
  return (
    <main>
      <PageContainer extraClasses={`m-auto mt-20 md:mt-0 p-8 flex flex-col gap-6`}>
        <h1
          className={`${fontSerif.className} text-5xl sm:text-6xl lg:text-7xl 
                      text-center mb-2`}
        >
          About Me
        </h1>
        <div className={'max-lg:flex flex-col items-center gap-6'}>
          <div
            className={`relative w-[250px] md:w-[350px] aspect-square 
                        lg:float-right rounded-full overflow-clip m-2`}
            style={{ shapeOutside: "circle()" }}
          >
            <Image
              src={"/profile-photo.jpg"}
              alt={"A photo of young, brown-haired man (me), sitting on a pile of logs in front of a field of tulips."}
              fill
            />
          </div>
          <p className={"max-lg:text-center"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad eligendi error harum laboriosam possimus quasi reiciendis tempore. Consequuntur eius facere fugiat, quas quisquam rem tempore. Accusamus autem iusto quae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores debitis illum maxime minima molestiae obcaecati sunt tempore totam. Dolores eligendi enim impedit ipsam itaque magni obcaecati, porro unde velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus deserunt, dignissimos doloribus ducimus earum est eum harum illum incidunt ipsam magni nam, nesciunt perferendis similique vel velit voluptatem voluptatibus?
          </p>
        </div>
      </PageContainer>
    </main>
  )
}