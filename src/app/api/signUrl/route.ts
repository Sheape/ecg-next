export const runtime = "edge";

export async function POST(req) {
  const request = await req.json()
  const { file, url } = request;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type
    },
    body: file
  })

  return new Response(JSON.stringify({ status: "Ok" }));
}
