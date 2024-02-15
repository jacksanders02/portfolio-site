"use client";
import React, { useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { IResidenceEvilScore } from "@/helpers/db/schema";

/**
 * page.tsx
 */
export default function ResidenceEvil(): React.ReactNode {
  async function getScores(): Promise<IResidenceEvilScore[]> {
    return await fetch("/residence-evil/get-scores").then((r) => r.json());
  }

  const [score, setScore] = React.useState<string>("0");
  const iframe = React.useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    getScores().then((r: IResidenceEvilScore[]) => {
      if (iframe.current !== null) {
        iframe.current.contentWindow!.postMessage({
          type: "send_scores",
          scores: r
        })
      }
    });

    window.onmessage = e => {
      if (e.data instanceof Array) {
        let newScore = ""
        for (let i=0; i<e.data.length; i++) {
          let player = e.data[i];
          if ("name" in player && "score" in player) {
            newScore += ` ::::: ${player.name} - ${player.score}`;
          }
        }
        setScore(newScore);
      }
    }
  }, []);

  return (
    <main>
      <PageContainer>
        <div className={"flex flex-col gap-1"}>
          <PageTitle>Residence Evil</PageTitle>
          <p className={`text-center`}>
            A 2D procedurally generated platformer created in 42 hours for the ShefJamX hackathon.
          </p>
          <p className={`text-center`}>
            {score}
          </p>
          <iframe
            src={"residence_evil/residence_evil.html"}
            className={'h-[75vh] max-w-[75vw] aspect-square bg-transparent'}
            style={{colorScheme: "normal"}}
            ref={iframe}
          />
        </div>
      </PageContainer>
    </main>
  );
}
