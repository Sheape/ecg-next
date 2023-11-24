'use server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const request = await req.json()
  const { fileName, fileType } = request;

  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
      secretAccessKey: process.env.CLOUDFLARE_ACCESS_TOKEN,
    },
  });

  const uuid = uuidv4()
  const key = `${uuid}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: "heartread",
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return new Response(JSON.stringify({ recordId: uuid, url: url }));
}
