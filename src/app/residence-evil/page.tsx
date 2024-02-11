import React from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";

/**
 * page.tsx
 */
export default function ResidenceEvil(): React.ReactNode {
  return (
    <main>
      <PageContainer>
        <div className={"flex flex-col gap-1"}>
          <PageTitle>Residence Evil</PageTitle>
          <p className={`text-center`}>
            A 2D procedurally generated platformer created in 42 hours for the ShefJamX hackathon.
          </p>
          <iframe
            src={"residence_evil/residence_evil.html"}
            className={'aspect-square max-w-[85vw] max-h-[85vh]'}
          />
        </div>
      </PageContainer>
    </main>
  );
}
