import DBConnection from "@/helpers/db/DBConnection";
import { IResidenceEvilScore } from "@/helpers/db/schema";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  let db: DBConnection = new DBConnection();
  let scores: IResidenceEvilScore[] = await db.readScores();

  return new Response(JSON.stringify(scores), { status: 200 });
}

export async function POST(req: NextRequest) {
  let js = await req.json();
  let db: DBConnection = new DBConnection();

  let successArray: boolean[] = await db.postScores(js.scores);
  let success: boolean = successArray.every(e => e);

  return new Response(JSON.stringify({
    successArray: successArray
  }), { status: success ? 200 : 500 } );
}