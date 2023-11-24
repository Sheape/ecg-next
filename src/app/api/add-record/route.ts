import { getXataClient } from "@/xata";

export async function POST(req) {
  const xataClient = getXataClient();
  const req_json = await req.json();
  const record = req_json;

  const xataRecord = await xataClient.db.ecg.create(record);
  return new Response(JSON.stringify({ message: "Succesfully added record to the database" }));
}
