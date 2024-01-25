import DBConnection from "@/helpers/db/DBConnection";
import { IModuleCollection } from "@/helpers/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  let db: DBConnection = new DBConnection();
  let mcs: IModuleCollection[] = await db.readModules();

  return new Response(JSON.stringify(mcs), { status: 200 });
}
