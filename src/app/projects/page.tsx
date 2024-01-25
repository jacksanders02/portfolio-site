import React from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";

/**
 * page.tsx
 */
export default function page(): React.ReactNode {
  return (
    <main>
      <PageContainer>
        <div className={"flex flex-col gap-1"}>
          <PageTitle>Projects</PageTitle>
          <p className={`text-center`}>
            A collection of things I&apos;ve made: webapps, downloadable
            programs, and everything in between.
          </p>
        </div>
      </PageContainer>
    </main>
  );
}
