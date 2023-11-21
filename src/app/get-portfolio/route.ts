import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let auth = request.nextUrl.searchParams.get('auth');

  if (auth === null) return null;

  let req = new NextRequest('https://live.trading212.com/api/v0/equity/portfolio', {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      'Authorization': auth,
      'Content-Type': 'application/json'
    })
  })

  const res = await fetch(req);
  const data = await res.json();
  data.sort((a: {'quantity': number}, b: {'quantity': number}): number => a['quantity'] - b['quantity']);

  const totalShares = data.map((a: {quantity: number}) => a['quantity']).reduce((a: number, b: number) => a+b);

  let tickers: string[] = [];
  let shares: number[] = [];

  let otherTotal = 0;

  for (let i in data) {
    let instrument = data[i];

    // If less than 1% of total portfolio, add to 'other'
    if (instrument['quantity'] / totalShares <= 0.01 ) {
      otherTotal += instrument['quantity'];
    } else {
      tickers.push(instrument['ticker']);
      shares.push(instrument['quantity']);
    }
  }

  tickers.unshift('Other');
  shares.unshift(otherTotal);

  // Create new return object containing t212 response JSON
  return new Response(JSON.stringify({ tickers: tickers, shares: shares }), {
    status: 200,
  });
}