import { File } from '@web-std/file'

export async function POST(req) {
  const request = await req.formData()

  const file_stream = request.get('file');
  const fileName = request.get('fileName');
  const blob = new Blob([file_stream], { type: 'application/octet-stream' });
  const file = new File([blob], fileName, { type: 'application/octet-stream' });
  const url = request.get('url');
  const fileType = request.get('fileType');

  console.log(file)

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': fileType
    },
    body: file
  })

  return new Response(JSON.stringify({ status: "Ok" }));
}
