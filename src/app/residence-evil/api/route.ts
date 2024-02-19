import { NextRequest } from 'next/server';
import DBUtils from '@/helpers/db/DBUtils';
import { IResidenceEvilScore } from '@/helpers/db/schema';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const scores: IResidenceEvilScore[] = await DBUtils.readScores();

  return new Response(JSON.stringify(scores), { status: 200 });
}

export async function POST(req: NextRequest) {
  await DBUtils.openConnection();

  const js = await req.json();

  const successArray: boolean[] = await DBUtils.postScores(js.scores);
  const success: boolean = successArray.every((e) => e);

  return new Response(JSON.stringify({
    successArray,
  }), { status: success ? 200 : 500 });
}
