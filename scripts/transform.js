// recuperar datos desde s3
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { writeFile } from 'fs/promises'
import path from 'path'
import omit from "lodash.omit";

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

async function main() {
  /* const themes = await getObject(`ddazal/${process.env.PROXY_DATABASE}/list_references.json`) */
  const data = {}
  const [themes, proxys, references, proxy_inputs, prooxy_value] = await Promise.all([
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/themes.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxies.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/list_references.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxy_inputs.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxy_values.json`)
  ])
  data.general = {}
  data.tabs = []
  data.proxy_inputs = proxy_inputs.map(item => { return { ...omit(item, ["rcd___id"]), changed: false } })
  data.proxy_values = prooxy_value.map(item => { return { ...omit(item, ["rcd___id"]), changed: false } })

  // TODO: transformar a template
  let counter = true
  let counter2 = true
  let tmp = {}
  let tmp2 = {}
  let tab = ''
  themes.map(((item, i) => {
    if (item.section === 'general') {
      data.general[item.variable] = item.value
    } else {
      const lengt_tab = item.section.split('/')
      if (lengt_tab.length === 2) {
        if (counter) {
          tmp = {}
          tmp[item.variable] = item.value
          counter = false
        } else {
          tmp[item.variable] = item.value
          tmp.tables = []
          tmp.list = item.value === 'references' ? references.map(item => omit(item, ["rcd___id"])) : []
          data.tabs.push(tmp)
          counter = true
        }
      } else {
        if (counter2) {
          tmp2 = {}
          tab = lengt_tab[3]
          tmp2[item.variable] = item.value
          counter2 = false
        } else {
          if (tab === themes[i + 1].section.split('/')[3]) {
            tmp2[item.variable] = item.value
          } else {
            tmp2[item.variable] = item.value
            tmp2.changed = false
            tmp2.rows = proxys.map(item => omit(item, ["rcd___id"])).filter(item => item.type === tab + '_impact')
            data.tabs[0].tables.push(tmp2)
            counter2 = true
          }
        }
      }
    }
  }))
  // Guardar en filesystem
  await writeFile(path.join(process.cwd(), 'public', 'data', 'test.json'), JSON.stringify(data))
}

main().catch(err => {
  console.error(err);
  process.exit(1)
})
