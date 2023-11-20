"use client";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement } from "chart.js";
import { fontSerif } from "@/app/fonts";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";

export default function DividendDashboard() {
  Chart.register(PieController, ArcElement)

  const [portfolio, setPortfolio] = useState(null);
  const [keySubmitted, setSubmitted] = useState(false);
  const [key, setKey] = useState<string | null>(null);

  async function submitAPIKey() {
    if (key !== null) {
      setSubmitted(true);
      fetch(`get-portfolio?auth=${key}`)
        .then(res => res.json())
        .then(data => {
          setPortfolio(data);
        })
    }
  }

  return (
    <main>
      <PageContainer extraClasses={'items-center'}>
        <PageTitle>Portfolio Overview</PageTitle>
        {!keySubmitted && (
          <form onSubmit={submitAPIKey} className={"w-96 flex flex-col"}>
            <input
              type={"text"}
              placeholder={"Trading212 API Key..."}
              onChange={(e) => setKey(e.target.value)}
            />
            <button type={"submit"}>Enter API Key</button>
          </form>
        )}
        {keySubmitted && portfolio === null && (
          <p>Loading...</p>
        )}
        {portfolio !== null && (
          <div className={'w-[80vmin] h-[80vmin]'}>
            <Pie
              data={{
                labels: portfolio["tickers"],
                datasets: [
                  {
                    label: "# of Shares",
                    data: portfolio["shares"],
                    backgroundColor: 'rgb(255, 0, 0)',
                    hoverOffset: 200
                  },
                ],
              }}
              options={{
                radius: '66%'
              }}
            />
          </div>
        )}
      </PageContainer>
    </main>
  )
}