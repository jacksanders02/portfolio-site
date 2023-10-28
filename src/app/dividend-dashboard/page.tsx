"use client";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement } from "chart.js";

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

  if (!keySubmitted)
    return (
      <main className={"m-auto"}>
        <form onSubmit={submitAPIKey} className={"flex flex-col"}>
          <input
            type={"text"}
            placeholder={"Trading212 API Key..."}
            onChange={(e) => setKey(e.target.value)}
          />
          <button type={"submit"}>Enter API Key</button>
        </form>
      </main>
    );

  if (portfolio === null) return <p>Loading...</p>;
  return (
    <main>
      <h1>Dividend Dashboard</h1>
      <div className={'w-1/4 h-1/4 m-auto'}>
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
    </main>
  );
}