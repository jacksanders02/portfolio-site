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

  let tickers: string[] = []
  let shares: number[] = []

  for (let i in data) {
    let instrument = data[i];
    tickers.push(instrument['ticker']);
    shares.push(instrument['quantity']);
  }

  // Create new return object containing t212 response JSON
  return new Response(JSON.stringify({ tickers: tickers, shares: shares }), {
    status: 200,
  });
}