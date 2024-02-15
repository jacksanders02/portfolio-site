import DBConnection from "@/helpers/db/DBConnection";
import { IResidenceEvilScore } from "@/helpers/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  let db: DBConnection = new DBConnection();
  let scores: IResidenceEvilScore[] = await db.readScores();

  return new Response(JSON.stringify(scores), { status: 200 });
}
