import React from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import PageTitle from '@/components/PageTitle';
import ModuleTables from '@/app/about-me/client/ModuleTables';

export default function AboutMe(): React.ReactNode {
  return (
    <main>
      <PageContainer>
        <PageTitle>About Me</PageTitle>
        <div className="max-lg:flex flex-col items-center gap-6">
          <div className="overflow-hidden">
            <div
              className={`relative w-[250px] md:w-[350px] aspect-square 
                        lg:float-right rounded-full overflow-clip m-auto mb-6 lg:m-2`}
              style={{ shapeOutside: 'circle()' }}
            >
              <Image
                src="/profile-photo.jpg"
                alt="A photo of young, brown-haired man (me), sitting on a pile of logs in front of a field of tulips."
                fill
                sizes="(max-width: 768px) 250px, 350px"
              />
            </div>
            <p className="max-lg:text-center mb-4">
              I&apos;m Jack Sanders, a third-year student at the University of
              Sheffield, studying for an MComp degree in Computer Science. Over
              the course of this degree I have undertaken a variety of projects
              - some of which are displayed on this website. Alongside my
              computer science degree, I am also in my second year of a
              three-year course in Dutch, which will massively expand my
              personal horizons and afford me many future opportunities, both in
              the UK and abroad.
              <br className="mb-2" />
              While my degree has massively developed my technical ability, I
              would say that it has also provided me with the opportunity to
              develop my soft skills - for example my ability to work
              effectively in a team. Prior to coming to university I had never
              worked in a software engineering team, much less led one, but now
              I feel perfectly comfortable working alongside others, sharing
              ideas, and even taking the lead when necessary.
              <br className="mb-2" />
              During my third year, I had the opportunity to work as a
              demonstrator on one of the first-year modules, Java Programming.
              My responsibilities in this role included attending first-year lab
              classes and then generally being on-hand to help with any
              java-related issues that they may have, from setup issues, to
              debugging complex pieces of code. This both helped me to reinforce
              my java knowledge (which is helpful, as there are no java modules
              in third year), and also developed my ability to effectively share
              my knowledge with other people when they ask for help.
            </p>
          </div>

          <div className="clear-right mt-8 mb-8 text-center lg:text-left">
            <p>
              Studying Dutch at university has become an unexpectedly big part
              of my studies. Initially, I took it as a non-credit module
              alongside my degree - meaning time management became a crucial
              skill that I learnt over the course of my second year. However, I
              now take it as one of my modules, meaning it counts towards my
              final degree classification
              <br className="mb-2" />
              As part of my dutch studies, I was asked to take part in a
              promotional video for the university&apos;s Languages for all
              program, which you can watch either below, or on the
              {' '}
              <a
                href="https://www.sheffield.ac.uk/languages-for-all/choose-language/dutch"
                className="underline hover-link dark:hover-link-dark"
              >
                Languages for All Dutch Course&apos;s homepage
              </a>
              . At first, this was a daunting prospect, as I had never been on
              film like this before, and the prospect of being one of the first
              things that prospective Dutch students would see when they looked
              on the course website was, admittedly, slightly scary. However, I
              ultimately decided that I needed to push myself out of my comfort
              zone to enable more personal growth, and this was a golden
              opportunity to do just that. A decision that was made all the
              simpler thanks to the wholly supportive atmosphere surrounding
              Dutch at the University of Sheffield (from incredible teachers to
              a community-like class). Overall, I am very thankful that I
              decided to study Dutch - as well as teaching me a useful new
              skill, I have also managed to develop my confidence and
              self-belief, both of which will serve me very well in future.
            </p>

            <div className="w-full lg:w-2/3 aspect-video m-auto mt-4">
              <iframe
                className="w-full h-full"
                title="Dutch at the University of Sheffield"
                src="https://www.youtube-nocookie.com/embed/Yt1lXzREX14?origin=https%3A%2F%2Fjacksanders.uk"
                allowFullScreen
              />
            </div>
          </div>

          <ModuleTables />
        </div>
      </PageContainer>
    </main>
  );
}
