'use client';

import React, { useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import PageTitle from '@/components/PageTitle';
import { IResidenceEvilScore } from '@/helpers/db/schema';

/**
 * page.tsx
 */
export default function ResidenceEvil(): React.ReactNode {
  const iframe = React.useRef<HTMLIFrameElement | null>(null);

  async function getScores(): Promise<IResidenceEvilScore[]> {
    return fetch('/residence-evil/api').then((r) => r.json());
  }

  async function postScores(scores: IResidenceEvilScore[]) {
    return fetch('/residence-evil/api', {
      method: 'POST',
      body: JSON.stringify({
        scores,
      }),
    });
  }

  useEffect(() => {
    getScores().then((r: IResidenceEvilScore[]) => {
      if (iframe.current !== null) {
        iframe.current.contentWindow!.postMessage({
          type: 'send_scores',
          scores: r,
        });
      }
    });

    window.onmessage = (e) => {
      if (e.data.type === 'new_scores' && 'scores' in e.data) {
        // There are new high scores, post to global leaderboard
        const newScores: IResidenceEvilScore[] = e.data.scores as IResidenceEvilScore[];
        postScores(newScores).then((r) => r);
      }
    };
  }, []);

  return (
    <main>
      <PageContainer>
        <div className="flex flex-col items-center gap-1">
          <PageTitle>Residence Evil</PageTitle>
          <p className="text-center">
            A 2D procedurally generated platformer created in 42 hours for the ShefJamX hackathon.
          </p>
          <iframe
            title="Residence Evil"
            src="residence_evil/residence_evil.html"
            className="h-[75vh] max-w-[75vw] aspect-square bg-transparent"
            style={{ colorScheme: 'normal' }}
            ref={iframe}
          />
        </div>
      </PageContainer>
    </main>
  );
}
