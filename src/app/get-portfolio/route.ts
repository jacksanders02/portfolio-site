import { NextRequest } from 'next/server';

type Instrument = {
  ticker: string;
  type: string;
  workingScheduleId: number;
  isin: string;
  currencyCode: string;
  name: string;
  shortName: string;
  minTradeQuantity: number;
  maxOpenQuantity: number;
  addedOn: string;
};

// The URL to get all instruments
const INSTRUMENTS_API: string = 'https://live.trading212.com/api/v0/equity/metadata/instruments';
// The URL to get user's portfolio
const PORTFOLIO_API: string = 'https://live.trading212.com/api/v0/equity/portfolio';

const instrumentErrors = {
  401: 'API key was rejected! Please ensure you entered it correctly.',
  403: "Couldn't access instruments! Please ensure you have 'metadata' enabled for your API key.",
  408: 'Request timed out! Please try again later.',
  429: 'Too many requests! Please wait a minute before trying again.',
};

// Don't need 401 or 429 here, as the first instrument request will catch these
const portfolioErrors = {
  403: "Couldn't access your portfolio! Please ensure you have 'portfolio' enabled for your API key.",
  408: 'Request timed out! Please try again later.',
};

export default async function GET(request: NextRequest) {
  const auth = request.nextUrl.searchParams.get('auth');

  if (auth === null) {
    return new Response(
      JSON.stringify({
        message: instrumentErrors['401'],
      }),
      { status: 401 },
    );
  }

  // Get all instruments that API key can access
  const instrumentResponse = await fetch(INSTRUMENTS_API, {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      Authorization: auth,
      'Content-Type': 'application/json',
    }),
  });

  // Issue accessing all instruments
  if (instrumentResponse.status in instrumentErrors) {
    // Create new return object containing t212 response JSON
    return new Response(
      JSON.stringify({
        // @ts-ignore (status will always be one that is in instrumentErrors)
        message: instrumentErrors[instrumentResponse.status],
      }),
      { status: instrumentResponse.status },
    );
  }

  // Build map of all instruments & metadata (T212 ticker -> {})
  const instrumentData: Instrument[] = await instrumentResponse.json();
  const tickersToInstruments: Map<string, Instrument> = new Map();
  instrumentData.forEach((i: Instrument) => {
    tickersToInstruments.set(i.ticker, i);
  });

  // Now can get user's portfolio
  const portfolioResponse = await fetch(PORTFOLIO_API, {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      Authorization: auth,
      'Content-Type': 'application/json',
    }),
  });

  // Same error handling as with the instruments
  if (instrumentResponse.status in portfolioErrors) {
    // Create new return object containing t212 response JSON
    return new Response(
      JSON.stringify({
        // @ts-ignore (status will always be one that is in portfolioErrors)
        message: portfolioErrors[portfolioResponse.status],
      }),
      { status: portfolioResponse.status },
    );
  }

  const portfolioData = await portfolioResponse.json();

  // Sort portfolio data by quantity
  portfolioData.sort(
    (a: { quantity: number }, b: { quantity: number }): number => a.quantity - b.quantity,
  );

  const totalShares = portfolioData
    .map((a: { quantity: number }) => a.quantity)
    .reduce((a: number, b: number) => a + b);

  // Array of labels, array of shares, and array of values (for pie charts)
  const shareLabels: string[] = [];
  const shares: number[] = [];

  // How many shares are held in 'other'
  let otherTotal: number = 0;

  portfolioData.forEach((i: { quantity: number; ticker: string; }) => {
    // If less than 1% of total portfolio, add to 'other'
    if (i.quantity / totalShares <= 0.01) {
      otherTotal += i.quantity;
    } else {
      const t212Ticker = i.ticker;
      const companyName = tickersToInstruments.get(t212Ticker)!.name;
      shareLabels.push(companyName);
      shares.push(i.quantity);
    }
  });

  shareLabels.unshift('Other');
  shares.unshift(otherTotal);

  // Create new return object containing t212 response JSON
  return new Response(
    JSON.stringify({
      shareLabels,
      shares,
    }),
    { status: 200 },
  );
}
