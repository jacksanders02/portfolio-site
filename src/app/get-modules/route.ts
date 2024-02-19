import DBUtils from '@/helpers/db/DBUtils';
import { IModuleCollection } from '@/helpers/db/schema';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(): Promise<Response> {
  await DBUtils.openConnection();
  const mcs: IModuleCollection[] = await DBUtils.readModules();

  return new Response(JSON.stringify(mcs), { status: 200 });
}
