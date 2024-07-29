// recuperar datos desde s3
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { writeFile } from 'fs/promises'
import path from 'path'

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: 'uploads.dskt.ch',
    Key: key,
  });

  const { Body } = await client.send(command);

  const contents = await Body?.transformToString();
  const data = JSON.parse(contents || "") || [];

  return data
}

const themes = await getObject(`ddazal/${process.env.PROXY_DATABASE}/themes.json`)

// TODO: transformar a template

// Guardar en filesystem
await writeFile(path.join(process.cwd(), 'public', 'data', 'format_.json'), JSON.stringify(themes))
