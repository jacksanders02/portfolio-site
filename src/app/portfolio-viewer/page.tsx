"use client";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement, Tooltip, Title } from "chart.js";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";

export default function DividendDashboard() {
  type portfolio = {tickers: string[]; shares: number[]}
  Chart.register(PieController, ArcElement, Tooltip, Title)

  const [portfolio, setPortfolio] = useState<portfolio | null>(null);
  const [keySubmitted, setSubmitted] = useState<boolean>(false);
  const [key, setKey] = useState<string | null>(null);

  async function submitAPIKey() {
    if (key !== null) {
      setSubmitted(true);
      fetch(`get-portfolio?auth=${key}`)
        .then(res => res.json())
        .then((data: portfolio) => {
          setPortfolio(data);
        })
    }
  }

  return (
    <main>
      <PageContainer extraClasses={"items-center"}>
        <PageTitle>Portfolio Overview</PageTitle>
        {!keySubmitted && (
          <form
            onSubmit={submitAPIKey}
            className={"w-96 flex flex-col items-center gap-6 mt-16"}
          >
            <input
              type={"text"}
              placeholder={"Trading212 API Key..."}
              onChange={(e) => setKey(e.target.value)}
              className={"w-full p-2"}
            />
            <button
              type={"submit"}
              className={"hover-button dark:hover-button-dark w-1/2"}
            >
              Enter API Key
            </button>
          </form>
        )}
        {keySubmitted && (
          <div className={"flex flex-col items-center mt-6"}>
            <p className={'text-xl'}>Portfolio Breakdown (By # of Shares)</p>
            <div
              className={"w-[80vmin] h-[80vmin] flex items-center justify-center"}
            >
              {portfolio === null && <p>Loading...</p>}
              {portfolio !== null && (
                //<p>{JSON.stringify(portfolio)}</p>
                <Pie
                  data={{
                    labels: portfolio.tickers,
                    datasets: [
                      {
                        label: "# of Shares",
                        data: portfolio.shares,
                        backgroundColor: [
                          'rgb(248,100,100)',
                          'rgb(111,193,111)',
                          'rgb(36,91,186)'
                        ],
                        hoverOffset: 100
                      },
                    ],
                  }}
                  options={{
                    radius: '80%'
                  }}
                />
              )}
            </div>
          </div>
        )}
      </PageContainer>
    </main>
  );
}