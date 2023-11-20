'use server'

export const runtime = 'nodejs'
import { getXataClient } from "@/xata";
import { withSession } from "@clerk/nextjs";

export async function POST(req){
  const xataClient = getXataClient();

  const req_json = await req.json();
  const { userId } = req_json;
}
